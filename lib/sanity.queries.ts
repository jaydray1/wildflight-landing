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
    gearList
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

