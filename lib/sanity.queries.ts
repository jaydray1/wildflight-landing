import { client } from './sanity';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export interface FieldNote {
  _id: string;
  title: string;
  subtitle?: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  publishedAt: string;
  category?: string;
  featured?: boolean;
  content: any; // Portable Text
  mainImage?: any; // Sanity image
  techSpecs?: {
    expedition?: string;
    roaster?: string;
    bean?: string;
    targetProfile?: string;
  };
  gearList?: Array<{
    item: string;
    details?: string;
  }>;
  associatedGuide?: Guide | null;
}

export interface Guide {
  _id: string;
  title: string;
  type: 'drip' | 'espresso' | 'milk';
  slug: {
    current: string;
  };
  specs?: {
    ratio?: string;
    grind?: string;
    waterTemp?: string;
    brewTime?: string;
  };
  steps?: Array<{
    stepTitle: string;
    instruction: string;
  }>;
}

export async function getFieldNotes(): Promise<FieldNote[]> {
  return await client.fetch(
    `*[_type == "fieldNote"] | order(publishedAt desc) {
      _id,
      title,
      subtitle,
      slug,
      excerpt,
      publishedAt,
      category,
      featured,
      mainImage,
      techSpecs,
      gearList
    }`
  );
}

export async function getFieldNoteBySlug(slug: string): Promise<FieldNote | null> {
  const query = `*[_type == "fieldNote" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    excerpt,
    publishedAt,
    category,
    featured,
    content,
    mainImage,
    techSpecs,
    gearList,
    associatedGuide-> {
      _id,
      title,
      type,
      slug,
      specs,
      steps
    }
  }`;
  
  return await client.fetch(query, { slug });
}

export async function getFeaturedFieldNote(): Promise<FieldNote | null> {
  const query = `*[_type == "fieldNote" && featured == true][0] {
    _id,
    title,
    subtitle,
    slug,
    excerpt,
    publishedAt,
    category,
    featured,
    mainImage,
    techSpecs,
    gearList
  }`;
  
  return await client.fetch(query);
}

export async function getGuides(): Promise<Guide[]> {
  return await client.fetch(
    `*[_type == "guide"] | order(title asc) {
      _id,
      title,
      type,
      slug,
      specs,
      steps
    }`
  );
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const query = `*[_type == "guide" && slug.current == $slug][0] {
    _id,
    title,
    type,
    slug,
    specs,
    steps
  }`;
  
  return await client.fetch(query, { slug });
}

export async function getGuideByType(type: 'drip' | 'espresso' | 'milk'): Promise<Guide | null> {
  const query = `*[_type == "guide" && type == $type][0] {
    _id,
    title,
    type,
    slug,
    specs,
    steps
  }`;
  
  return await client.fetch(query, { type });
}

