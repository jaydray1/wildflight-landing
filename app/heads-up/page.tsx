"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface LaserShot {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface Alien {
  id: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  scale: number;
  progress: number; // 0 to 1
  isHit: boolean;
  hitTime?: number;
}

// 3D Alien Component
function AlienModel({ scale }: { scale: number }) {
  const group = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const { scene, animations } = useGLTF("/images/alien.glb");

  // Clone the scene for this instance
  const clonedScene = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (group.current && animations.length > 0) {
      // Clone the scene
      clonedScene.current = scene.clone();
      group.current.add(clonedScene.current);

      // Create animation mixer for this instance
      mixer.current = new THREE.AnimationMixer(clonedScene.current);

      // Play all animations
      animations.forEach((clip) => {
        const action = mixer.current!.clipAction(clip);
        action.reset().play();
        action.setLoop(THREE.LoopRepeat, Infinity);
      });
    }

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current = null;
      }
      if (clonedScene.current && group.current) {
        group.current.remove(clonedScene.current);
      }
    };
  }, [scene, animations]);

  // Update animation mixer each frame
  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return (
    <group ref={group} scale={scale * 0.01} rotation={[0, Math.PI, 0]} />
  );
}

export default function HeadsUpPage() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [laserShots, setLaserShots] = useState<LaserShot[]>([]);
  const [aliens, setAliens] = useState<Alien[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const alienIdRef = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const alienSpawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const alienAnimationFrameRef = useRef<number | null>(null);

  // Get or create shared audio context
  const getAudioContext = (): AudioContext | null => {
    if (!audioContextRef.current) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return null;
        audioContextRef.current = new AudioContextClass();
      } catch (error) {
        console.debug('Audio not available');
        return null;
      }
    }

    // Resume if suspended (browsers often suspend audio contexts until user interaction)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    return audioContextRef.current;
  };

  // Ambient bass soundtrack
  useEffect(() => {
    const audioContext = getAudioContext();
    if (!audioContext) return;

    const oscillators: OscillatorNode[] = [];
    const constantSources: ConstantSourceNode[] = [];
    const gainNodes: GainNode[] = [];
    let masterGain: GainNode | null = null;

    const startAmbientSound = () => {
      try {
        const now = audioContext.currentTime;

        // Master gain for overall volume control
        masterGain = audioContext.createGain();
        const baseMasterGain = 0.12;

        // Slow breathing/swelling LFO (7-8 seconds period = ~0.14Hz)
        const breathingLFO = audioContext.createOscillator();
        breathingLFO.frequency.setValueAtTime(1/7.5, now); // ~0.133Hz (7.5 second period)
        breathingLFO.type = 'sine';
        const breathingLFOGain = audioContext.createGain();
        breathingLFOGain.gain.setValueAtTime(0.25, now); // Modulate master gain by ±25%

        // Constant source for base master gain
        const masterConstantSource = audioContext.createConstantSource();
        masterConstantSource.offset.setValueAtTime(baseMasterGain, now);

        // Connect both constant and breathing LFO to master gain
        masterConstantSource.connect(masterGain.gain);
        breathingLFO.connect(breathingLFOGain);
        breathingLFOGain.connect(masterGain.gain);

        // Mute gain node for pause/resume (after master gain)
        const muteGain = audioContext.createGain();
        muteGain.gain.setValueAtTime(isPaused ? 0 : 1, now);
        masterGainRef.current = muteGain;

        // Add low-pass filter on master for warmth
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, now);
        filter.Q.setValueAtTime(1, now);

        // Connect: master gain -> mute gain -> filter -> destination
        masterGain.connect(muteGain);
        muteGain.connect(filter);
        filter.connect(audioContext.destination);

        // Store breathing LFO and constant source for cleanup
        oscillators.push(breathingLFO);
        constantSources.push(masterConstantSource);

        // Base frequency: 40Hz (deep sub-bass)
        const baseFreq = 40;

        // Fundamental tone (40Hz) - deep bass foundation (primary focus)
        const osc1 = audioContext.createOscillator();
        osc1.frequency.setValueAtTime(baseFreq, now);
        osc1.type = 'sine';
        const gain1 = audioContext.createGain();
        gain1.gain.setValueAtTime(1.0, now); // Full volume - primary focus
        osc1.connect(gain1);
        gain1.connect(masterGain);
        oscillators.push(osc1);
        gainNodes.push(gain1);

        // Apply subtle LFO modulation to base frequency for organic movement
        const baseLFO = audioContext.createOscillator();
        const baseLFOGain = audioContext.createGain();
        baseLFO.frequency.setValueAtTime(0.08, now);
        baseLFOGain.gain.setValueAtTime(1.5, now);
        baseLFO.type = 'sine';
        baseLFO.connect(baseLFOGain);
        baseLFOGain.connect(osc1.frequency);
        oscillators.push(baseLFO);

        // Dune-inspired Perfect 5th harmonic (7 semitones = 2^(7/12) ratio)
        const perfectFifthFreq = baseFreq * Math.pow(2, 7/12); // ~59.94Hz
        const osc5th = audioContext.createOscillator();
        osc5th.frequency.setValueAtTime(perfectFifthFreq, now);
        osc5th.type = 'sine';

        // Bandpass filter for vocal/throaty quality at 400Hz
        const bandpassFilter = audioContext.createBiquadFilter();
        bandpassFilter.type = 'bandpass';
        bandpassFilter.frequency.setValueAtTime(400, now);
        bandpassFilter.Q.setValueAtTime(20, now); // High Q for sharp resonance

        // Gain node for the 5th (will be modulated by LFO)
        const gain5th = audioContext.createGain();
        const baseGain5th = 0.2; // 20% volume base level

        // Create constant source for base gain
        const constantSource = audioContext.createConstantSource();
        constantSource.offset.setValueAtTime(baseGain5th, now);

        // Slow-moving LFO for drifting volume effect (0.1-0.5Hz)
        const driftLFO = audioContext.createOscillator();
        driftLFO.frequency.setValueAtTime(0.3, now); // 0.3Hz (middle of 0.1-0.5Hz range)
        driftLFO.type = 'sine';
        const driftLFOGain = audioContext.createGain();
        driftLFOGain.gain.setValueAtTime(0.08, now); // Modulate by ±8% for subtle drift

        // Connect both constant and LFO to gain parameter (they add together)
        // Result: baseGain5th + (LFO * modulation) = 0.2 ± 0.08 = 0.12 to 0.28
        constantSource.connect(gain5th.gain);
        driftLFO.connect(driftLFOGain);
        driftLFOGain.connect(gain5th.gain);

        // Connect: osc5th -> bandpass -> gain5th -> master
        osc5th.connect(bandpassFilter);
        bandpassFilter.connect(gain5th);
        gain5th.connect(masterGain);

        oscillators.push(osc5th);
        oscillators.push(driftLFO);
        constantSources.push(constantSource);
        gainNodes.push(gain5th);

        // Unison layer with 15 cents detune for metallic beating effect
        // 15 cents = 2^(15/1200) = ~1.00873 ratio
        const detuneRatio = Math.pow(2, 15/1200);
        const unisonFreq = baseFreq * detuneRatio; // ~40.35Hz (15 cents sharp)
        const oscUnison = audioContext.createOscillator();
        oscUnison.frequency.setValueAtTime(unisonFreq, now);
        oscUnison.type = 'sine';
        const gainUnison = audioContext.createGain();
        gainUnison.gain.setValueAtTime(0.2, now); // 20% volume
        oscUnison.connect(gainUnison);
        gainUnison.connect(masterGain);
        oscillators.push(oscUnison);
        gainNodes.push(gainUnison);

        // Start all oscillators and constant sources
        oscillators.forEach(osc => osc.start(now));
        constantSources.forEach(cs => cs.start(now));
      } catch (error) {
        console.debug('Ambient audio not available');
      }
    };

    // Start the ambient sound
    startAmbientSound();

    // Cleanup: stop oscillators but keep audio context alive
    return () => {
      oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
      constantSources.forEach(cs => {
        try {
          cs.stop();
          cs.disconnect();
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
      gainNodes.forEach(gain => {
        try {
          gain.disconnect();
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
      if (masterGain) {
        try {
          masterGain.disconnect();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
      masterGainRef.current = null;
      // Note: We don't close the shared audio context here - it's used by other sounds
      // It will be closed when the component unmounts via a separate effect if needed
    };
  }, []);

  // Handle pause/resume for audio
  useEffect(() => {
    if (masterGainRef.current) {
      const now = masterGainRef.current.context.currentTime;
      if (isPaused) {
        masterGainRef.current.gain.setValueAtTime(0, now);
      } else {
        masterGainRef.current.gain.setValueAtTime(1, now);
      }
    }
  }, [isPaused]);

  // Cleanup audio context on component unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    };
  }, []);

  // Sound generation functions
  const playLaserSound = () => {
    try {
      const audioContext = getAudioContext();
      if (!audioContext) return;

      const now = audioContext.currentTime;

      // Layer 1: Sharp initial crack (high frequency snap)
      const crackOsc = audioContext.createOscillator();
      const crackGain = audioContext.createGain();
      const crackFilter = audioContext.createBiquadFilter();

      crackOsc.connect(crackFilter);
      crackFilter.connect(crackGain);
      crackGain.connect(audioContext.destination);

      crackOsc.frequency.setValueAtTime(2000, now);
      crackOsc.frequency.exponentialRampToValueAtTime(500, now + 0.05);
      crackOsc.type = 'sawtooth';

      crackFilter.type = 'bandpass';
      crackFilter.frequency.setValueAtTime(1500, now);
      crackFilter.Q.setValueAtTime(2, now);

      crackGain.gain.setValueAtTime(0, now);
      crackGain.gain.linearRampToValueAtTime(0.4, now + 0.001);
      crackGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

      crackOsc.start(now);
      crackOsc.stop(now + 0.08);

      // Layer 2: Deep thunder rumble (very low frequency)
      const rumbleOsc1 = audioContext.createOscillator();
      const rumbleOsc2 = audioContext.createOscillator();
      const rumbleGain = audioContext.createGain();
      const rumbleFilter = audioContext.createBiquadFilter();

      rumbleOsc1.connect(rumbleFilter);
      rumbleOsc2.connect(rumbleFilter);
      rumbleFilter.connect(rumbleGain);
      rumbleGain.connect(audioContext.destination);

      // Two oscillators for richer, more chaotic sound
      rumbleOsc1.frequency.setValueAtTime(60, now);
      rumbleOsc1.frequency.exponentialRampToValueAtTime(35, now + 0.3);
      rumbleOsc1.type = 'sawtooth';

      rumbleOsc2.frequency.setValueAtTime(45, now);
      rumbleOsc2.frequency.exponentialRampToValueAtTime(25, now + 0.25);
      rumbleOsc2.type = 'square';

      rumbleFilter.type = 'lowpass';
      rumbleFilter.frequency.setValueAtTime(150, now);
      rumbleFilter.frequency.exponentialRampToValueAtTime(80, now + 0.3);

      rumbleGain.gain.setValueAtTime(0, now);
      rumbleGain.gain.linearRampToValueAtTime(0.6, now + 0.03);
      rumbleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      rumbleOsc1.start(now);
      rumbleOsc2.start(now);
      rumbleOsc1.stop(now + 0.4);
      rumbleOsc2.stop(now + 0.4);

    } catch (error) {
      // Silently fail if audio is not supported
      console.debug('Audio not available');
    }
  };

  const playImpactSound = () => {
    try {
      const audioContext = getAudioContext();
      if (!audioContext) return;

      // Create multiple oscillators for a richer explosion sound
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Low frequency explosion
      osc1.frequency.setValueAtTime(150, audioContext.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
      osc1.type = 'sawtooth';

      // Higher frequency component
      osc2.frequency.setValueAtTime(400, audioContext.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.15);
      osc2.type = 'square';

      // Low-pass filter for explosion effect
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, audioContext.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.2);

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      osc1.start(audioContext.currentTime);
      osc2.start(audioContext.currentTime);
      osc1.stop(audioContext.currentTime + 0.25);
      osc2.stop(audioContext.currentTime + 0.25);
    } catch (error) {
      // Silently fail if audio is not supported
      console.debug('Audio not available');
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as percentage of viewport
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let firingInterval: NodeJS.Timeout | null = null;
    let isFiring = false;

    // Fire a single shot
    const fireShot = (x: number, y: number) => {
      const newShot: LaserShot = {
        id: Date.now() + Math.random(), // Use timestamp + random for unique ID
        x,
        y,
        timestamp: Date.now(),
      };
      setLaserShots((prev) => [...prev, newShot]);

      // Check for alien hits
      let alienHit = false;
      setAliens((prevAliens) => {
        return prevAliens.map((alien) => {
          if (alien.isHit) return alien; // Already hit, skip

          // Calculate distance between shot target and alien position
          const dx = alien.currentX - x;
          const dy = alien.currentY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Hit detection: check if shot is within alien's hit radius (scaled by size)
          // Hit radius gets larger as alien gets closer (bigger scale)
          const hitRadius = 4 * alien.scale; // Scale hit radius with alien size

          if (distance < hitRadius) {
            // Alien hit! Mark as hit and play explosion sound
            alienHit = true;
            playImpactSound(); // Use impact sound for alien explosion
            return { ...alien, isHit: true, hitTime: Date.now() };
          }
          return alien;
        });
      });

      // Play laser sound immediately
      playLaserSound();

      // Play impact sound slightly delayed (simulating travel time) - only if no alien hit
      if (!alienHit) {
        setTimeout(() => {
          playImpactSound();
        }, 50);
      }

      // Remove shot after animation completes (200ms)
      setTimeout(() => {
        setLaserShots((prev) => prev.filter((shot) => shot.id !== newShot.id));
      }, 200);
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // Only left mouse button

      isFiring = true;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      // Fire immediately
      fireShot(x, y);

      // Set up machine gun mode - fire every 100ms while holding
      firingInterval = setInterval(() => {
        if (isFiring) {
          // Use current mouse position from state
          fireShot(mousePosition.x, mousePosition.y);
        }
      }, 100); // 10 shots per second
    };

    const handleMouseUp = () => {
      isFiring = false;
      if (firingInterval) {
        clearInterval(firingInterval);
        firingInterval = null;
      }
    };

    // Also handle mouse leave to stop firing if mouse leaves window
    const handleMouseLeave = () => {
      isFiring = false;
      if (firingInterval) {
        clearInterval(firingInterval);
        firingInterval = null;
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (firingInterval) {
        clearInterval(firingInterval);
      }
    };
  }, [mousePosition.x, mousePosition.y]);

  // Alien management - spawn and animate aliens
  useEffect(() => {
    if (isPaused) {
      // Clear any running intervals/frames when paused
      if (alienSpawnIntervalRef.current) {
        clearInterval(alienSpawnIntervalRef.current);
        alienSpawnIntervalRef.current = null;
      }
      if (alienAnimationFrameRef.current) {
        cancelAnimationFrame(alienAnimationFrameRef.current);
        alienAnimationFrameRef.current = null;
      }
      return;
    }

    // Spawn initial aliens
    const spawnAlien = () => {
      const startOffsetX = (Math.random() - 0.5) * 10; // -5 to 5
      const startOffsetY = (Math.random() - 0.5) * 10; // -5 to 5
      const newAlien: Alien = {
        id: alienIdRef.current++,
        startX: 50 + startOffsetX,
        startY: 50 + startOffsetY,
        currentX: 50 + startOffsetX,
        currentY: 50 + startOffsetY,
        scale: 0.2,
        progress: 0,
        isHit: false,
      };
      setAliens((prev) => [...prev, newAlien]);
    };

    // Spawn initial batch
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        if (!isPaused) spawnAlien();
      }, i * 1000);
    }

    // Continue spawning aliens periodically
    alienSpawnIntervalRef.current = setInterval(() => {
      if (!isPaused) {
        spawnAlien();
      }
    }, 2000);

    // Animate aliens
    const animateAliens = () => {
      if (isPaused) return;

      setAliens((prevAliens) => {
        return prevAliens
          .map((alien) => {
            if (alien.isHit) {
              // Remove hit aliens after explosion animation (500ms)
              if (alien.hitTime && Date.now() - alien.hitTime > 500) {
                return null;
              }
              return alien;
            }

            // Update progress and scale (alien moving towards camera)
            const newProgress = Math.min(alien.progress + 0.016, 1); // ~60fps
            const newScale = 0.2 + newProgress * 2.8; // Scale from 0.2 to 3.0

            // Position stays the same (they grow but stay centered at spawn point)
            return {
              ...alien,
              progress: newProgress,
              scale: newScale,
              currentX: alien.startX,
              currentY: alien.startY,
            };
          })
          .filter((alien): alien is Alien => alien !== null);
      });

      alienAnimationFrameRef.current = requestAnimationFrame(animateAliens);
    };

    alienAnimationFrameRef.current = requestAnimationFrame(animateAliens);

    return () => {
      if (alienSpawnIntervalRef.current) {
        clearInterval(alienSpawnIntervalRef.current);
        alienSpawnIntervalRef.current = null;
      }
      if (alienAnimationFrameRef.current) {
        cancelAnimationFrame(alienAnimationFrameRef.current);
        alienAnimationFrameRef.current = null;
      }
    };
  }, [isPaused]);

  // Laser fires from bottom right (user's perspective - where they'd hold the gun)
  const laserOrigin = { x: 65, y: 75 };

  const calculateAngle = (originX: number, originY: number, targetX: number, targetY: number) => {
    // Calculate angle in degrees from origin to target using percentages
    const dx = targetX - originX;
    const dy = targetY - originY;
    // Use viewport aspect ratio approximation (assuming ~16:9)
    const aspectRatio = 16 / 9;
    const adjustedDy = dy * aspectRatio;
    const angle = Math.atan2(adjustedDy, dx) * (180 / Math.PI);
    return angle;
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden cursor-none">
      {/* Background Space Scene - Space Tunnel Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/space-tunnel.png"
            alt="Space tunnel viewport"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Optional overlay for darker/more atmospheric feel */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Animated Aliens moving towards camera */}
        {aliens.map((alien) => {
          if (alien.isHit && alien.hitTime) {
            // Show explosion effect
            const timeSinceHit = Date.now() - alien.hitTime;
            const explosionScale = Math.min(timeSinceHit / 200, 2); // Scale up to 2x
            const explosionOpacity = Math.max(1 - timeSinceHit / 500, 0);

            return (
              <div
                key={alien.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${alien.currentX}%`,
                  top: `${alien.currentY}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 15,
                }}
              >
                {/* Explosion effect */}
                <div
                  className="absolute"
                  style={{
                    width: `${40 * explosionScale}px`,
                    height: `${40 * explosionScale}px`,
                    background: `radial-gradient(circle, rgba(255,255,255,${explosionOpacity}) 0%, rgba(255,200,0,${explosionOpacity * 0.9}) 20%, rgba(255,100,0,${explosionOpacity * 0.7}) 40%, rgba(255,0,0,${explosionOpacity * 0.3}) 60%, transparent 80%)`,
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
                {/* Explosion particles */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                  <div
                    key={idx}
                    className="absolute"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${20 * explosionScale}px)`,
                      width: '6px',
                      height: '6px',
                      background: `rgba(255,200,0,${explosionOpacity * 0.9})`,
                      borderRadius: '50%',
                      boxShadow: `0 0 8px rgba(255,200,0,${explosionOpacity})`,
                    }}
                  />
                ))}
              </div>
            );
          }

          // Normal alien rendering with 3D model
          const alienSize = Math.max(80 * alien.scale, 40); // Minimum size
          return (
            <div
              key={alien.id}
              className="absolute pointer-events-none"
              style={{
                left: `${alien.currentX}%`,
                top: `${alien.currentY}%`,
                transform: 'translate(-50%, -50%)',
                width: `${alienSize}px`,
                height: `${alienSize}px`,
                opacity: 1 - (alien.progress * 0.3), // Fade slightly as it gets closer
              }}
            >
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ width: '100%', height: '100%', background: 'transparent' }}
                gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
              >
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <directionalLight position={[-5, -5, -5]} intensity={0.4} />
                <Suspense fallback={null}>
                  <AlienModel scale={alien.scale} />
                </Suspense>
              </Canvas>
            </div>
          );
        })}

        {/* Laser Shots */}
        {laserShots.map((shot) => {
          // Laser fires from center of screen (where reticle is) to where user clicked/aimed
          const originX = laserOrigin.x;
          const originY = laserOrigin.y;
          const angle = calculateAngle(originX, originY, shot.x, shot.y);

          // Calculate distance using viewport-relative units (vw/vh approximation)
          const dx = shot.x - originX;
          const dy = shot.y - originY;
          // Use viewport width as base for distance calculation
          const distanceVw = Math.sqrt(dx * dx + (dy * dy * (16/9))) * 1.5; // Scale factor for better visual

          return (
            <div key={shot.id} className="absolute inset-0 pointer-events-none">
              {/* Laser beam */}
              <div
                className="absolute origin-left"
                style={{
                  left: `${originX}%`,
                  top: `${originY}%`,
                  width: `${Math.max(distanceVw, 20)}vw`,
                  height: '3px',
                  transform: `rotate(${angle}deg) translateY(-50%)`,
                  background: 'linear-gradient(90deg, rgba(255,0,0,0.8) 0%, rgba(255,100,0,0.9) 50%, rgba(255,0,0,0.8) 100%)',
                  boxShadow: '0 0 10px rgba(255,0,0,0.8), 0 0 20px rgba(255,100,0,0.6), 0 0 30px rgba(255,0,0,0.4)',
                  zIndex: 10,
                  animation: 'laserFade 200ms ease-out',
                }}
              />
              {/* Muzzle flash at origin (center where reticle is) */}
              <div
                className="absolute"
                style={{
                  left: `${originX}%`,
                  top: `${originY}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '20px',
                  height: '20px',
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,200,0,0.8) 30%, rgba(255,100,0,0.4) 60%, transparent 100%)',
                  borderRadius: '50%',
                  animation: 'muzzleFlash 100ms ease-out',
                  zIndex: 11,
                }}
              />
              {/* Impact explosion at target (where reticle was pointing) */}
              <div
                className="absolute"
                style={{
                  left: `${shot.x}%`,
                  top: `${shot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '40px',
                  height: '40px',
                  background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,200,0,0.9) 20%, rgba(255,100,0,0.7) 40%, rgba(255,0,0,0.3) 60%, transparent 80%)',
                  borderRadius: '50%',
                  animation: 'impactExplosion 200ms ease-out',
                  zIndex: 11,
                }}
              />
              {/* Impact particles */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((particleAngle, idx) => (
                <div
                  key={idx}
                  className="absolute"
                  style={{
                    left: `${shot.x}%`,
                    top: `${shot.y}%`,
                    transform: `translate(-50%, -50%) rotate(${particleAngle}deg) translateX(20px)`,
                    width: '4px',
                    height: '4px',
                    background: 'rgba(255,200,0,0.9)',
                    borderRadius: '50%',
                    boxShadow: '0 0 6px rgba(255,200,0,1)',
                    animation: 'particleFade 200ms ease-out',
                    animationDelay: `${idx * 10}ms`,
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* Pause Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-4 right-4 z-50 px-4 py-2 pointer-events-auto"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 200, 0, 0.5)',
          color: 'rgba(255, 200, 0, 0.8)',
          fontFamily: 'var(--font-roboto-mono), monospace',
          fontSize: '12px',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
          e.currentTarget.style.color = 'rgba(255, 200, 0, 1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
          e.currentTarget.style.color = 'rgba(255, 200, 0, 0.8)';
        }}
      >
        {isPaused ? '▶ PLAY' : '⏸ PAUSE'}
      </button>

      {/* HUD Overlay - Ultra-Realistic Military AR Interface */}
      <div className="absolute inset-0 pointer-events-none lens-distortion" style={{ fontFamily: 'var(--font-roboto-mono), monospace' }}>
        {/* Lens distortion/chromatic aberration at edges */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 50% at top left, rgba(255, 200, 0, 0.05) 0%, transparent 70%), radial-gradient(ellipse 80% 50% at top right, rgba(0, 255, 200, 0.05) 0%, transparent 70%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* Top telemetry bar - Ultra-thin, transparent */}
        <div
          className="absolute top-4 left-0 right-0"
          style={{
            borderBottom: '1px solid rgba(255, 200, 0, 0.5)',
          }}
        >
          <div className="flex justify-between items-center px-8 py-2">
            <div className="text-xs font-mono font-normal tracking-tight" style={{ color: 'rgba(255, 200, 0, 0.6)' }}>
              <span className="animate-subtleFlicker">STATUS: ENGAGED</span>
              <span className="ml-6" style={{ color: 'rgba(255, 80, 80, 0.7)' }}>HOSTILES: {aliens.filter(a => !a.isHit).length}</span>
            </div>
            <div className="text-xs font-mono font-normal" style={{ color: 'rgba(255, 200, 0, 0.5)' }}>
              <span className="animate-dataJitter">SOL-2471.3.15</span> | SYS_OK
            </div>
          </div>
        </div>

        {/* Targeting box - Four corner brackets tracking reticle */}
        <div
          className="absolute transition-all duration-75 ease-out pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Top-left bracket */}
          <div
            className="absolute"
            style={{
              left: '-24px',
              top: '-24px',
              width: '16px',
              height: '16px',
              borderTop: '1px solid rgba(255, 200, 0, 0.6)',
              borderLeft: '1px solid rgba(255, 200, 0, 0.6)',
            }}
          />
          {/* Top-right bracket */}
          <div
            className="absolute"
            style={{
              right: '-24px',
              top: '-24px',
              width: '16px',
              height: '16px',
              borderTop: '1px solid rgba(255, 200, 0, 0.6)',
              borderRight: '1px solid rgba(255, 200, 0, 0.6)',
            }}
          />
          {/* Bottom-left bracket */}
          <div
            className="absolute"
            style={{
              left: '-24px',
              bottom: '-24px',
              width: '16px',
              height: '16px',
              borderBottom: '1px solid rgba(255, 200, 0, 0.6)',
              borderLeft: '1px solid rgba(255, 200, 0, 0.6)',
            }}
          />
          {/* Bottom-right bracket */}
          <div
            className="absolute"
            style={{
              right: '-24px',
              bottom: '-24px',
              width: '16px',
              height: '16px',
              borderBottom: '1px solid rgba(255, 200, 0, 0.6)',
              borderRight: '1px solid rgba(255, 200, 0, 0.6)',
            }}
          />
        </div>

        {/* Left panel - Telemetry data */}
        <div
          className="absolute top-24 left-4"
          style={{
            border: '1px solid rgba(255, 200, 0, 0.4)',
            padding: '12px',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="text-xs font-mono font-normal mb-3" style={{ color: 'rgba(255, 200, 0, 0.5)', letterSpacing: '0.05em' }}>
            TARGET DATA
          </div>
          <div className="space-y-1.5 text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <div>
              RANGE: <span className="animate-dataJitter" style={{ color: 'rgba(255, 200, 0, 0.8)' }}>847m</span>
            </div>
            <div>
              AZIMUTH: <span style={{ color: 'rgba(255, 200, 0, 0.8)' }}>042°</span>
            </div>
            <div>
              ELEVATION: <span style={{ color: 'rgba(255, 200, 0, 0.8)' }}>-12°</span>
            </div>
            <div className="mt-3 pt-2" style={{ borderTop: '1px solid rgba(255, 200, 0, 0.2)' }}>
              <div style={{ color: 'rgba(255, 80, 80, 0.8)' }}>
                BIOSIGNS: {aliens.filter(a => !a.isHit).length}
              </div>
              <div className="mt-1 text-[10px]" style={{ color: 'rgba(255, 200, 0, 0.5)' }}>
                CLASS: XENOMORPH
              </div>
            </div>
          </div>
        </div>

        {/* Right panel - Weapon systems */}
        <div
          className="absolute top-24 right-4"
          style={{
            border: '1px solid rgba(255, 200, 0, 0.4)',
            padding: '12px',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <div className="text-xs font-mono font-normal mb-3" style={{ color: 'rgba(255, 200, 0, 0.5)', letterSpacing: '0.05em' }}>
            SYSTEMS
          </div>
          <div className="space-y-1.5 text-xs font-mono" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <div>
              WEAPON: <span style={{ color: 'rgba(255, 200, 0, 0.8)' }}>PLASMA</span>
            </div>
            <div>
              STATUS: <span style={{ color: 'rgba(200, 255, 200, 0.8)' }}>READY</span>
            </div>
            <div className="mt-3 pt-2" style={{ borderTop: '1px solid rgba(255, 200, 0, 0.2)' }}>
              <div style={{ color: 'rgba(200, 255, 200, 0.8)' }}>
                LIFE SUPPORT: 100%
              </div>
              <div className="mt-1" style={{ color: 'rgba(200, 255, 200, 0.8)' }}>
                COMMS: ACTIVE
              </div>
            </div>
          </div>
        </div>

        {/* Bottom telemetry bar */}
        <div
          className="absolute bottom-4 left-0 right-0"
          style={{
            borderTop: '1px solid rgba(255, 200, 0, 0.5)',
          }}
        >
          <div className="flex justify-between items-center px-8 py-2 text-xs font-mono font-normal" style={{ color: 'rgba(255, 200, 0, 0.5)' }}>
            <div>
              <div>COORD: X-2847 Y-912 Z-33</div>
              <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255, 200, 0, 0.4)' }}>ACAMAR PRIME</div>
            </div>
            <div className="text-right">
              <div className="animate-dataJitter">PULSE: 127 BPM</div>
              <div className="text-[10px] mt-0.5" style={{ color: 'rgba(200, 255, 200, 0.6)' }}>VITALS: NOMINAL</div>
            </div>
            <div className="text-right">
              <div>TIME: 23:47:12</div>
              <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255, 200, 0, 0.4)' }}>MISSION: 04:32:15</div>
            </div>
          </div>
        </div>

        {/* Corner frame brackets - Ultra-thin */}
        <div
          className="absolute top-0 left-0 w-16 h-16"
          style={{
            borderTop: '1px solid rgba(255, 200, 0, 0.4)',
            borderLeft: '1px solid rgba(255, 200, 0, 0.4)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-16 h-16"
          style={{
            borderTop: '1px solid rgba(255, 200, 0, 0.4)',
            borderRight: '1px solid rgba(255, 200, 0, 0.4)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-16 h-16"
          style={{
            borderBottom: '1px solid rgba(255, 200, 0, 0.4)',
            borderLeft: '1px solid rgba(255, 200, 0, 0.4)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-16 h-16"
          style={{
            borderBottom: '1px solid rgba(255, 200, 0, 0.4)',
            borderRight: '1px solid rgba(255, 200, 0, 0.4)',
          }}
        />
      </div>
    </div>
  );
}
