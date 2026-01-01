# Sanity CMS Setup for Field Notes

## Quick Start

1. **Create a `.env.local` file** in the root directory with your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

**Where to find these values:**
- **Project ID**: Found in your Sanity dashboard at https://sanity.io/manage → Select your project → The Project ID is shown at the top or in the API section
- **Dataset**: Usually `production` by default. You can find it in:
  - Your Sanity Studio config file (look for `dataset: 'production'`)
  - Sanity dashboard → Your project → API section
  - Or check your API endpoint URL: `https://[projectId].api.sanity.io/...` (the dataset name is in the path)

If you're not sure, `production` is the most common default dataset name.

2. **Set up your Sanity Schema** - You'll need to create a `fieldNote` document type in your Sanity Studio with these fields:

- `title` (string)
- `slug` (slug) - used for the URL
- `excerpt` (text, optional)
- `publishedAt` (datetime)
- `category` (string, optional)
- `featured` (boolean, optional) - marks an article as featured
- `content` (array/portableText) - the main article content
- `mainImage` (image, optional) - featured image

3. **Example Sanity Schema** (sanity/schemas/fieldNote.ts):

```typescript
export default {
  name: 'fieldNote',
  title: 'Field Note',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Technical', value: 'Technical'},
          {title: 'Roasting Notes', value: 'Roasting Notes'},
          {title: 'Field Guides', value: 'Field Guides'},
          {title: 'Batch Logs', value: 'Batch Logs'},
        ],
      },
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark this article as featured (will show at top of list)',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'code'
        }
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
}
```

## Features

- **Dynamic Field Notes**: All articles are fetched from Sanity CMS
- **Portable Text**: Rich text content is rendered using Portable Text
- **Featured Articles**: Mark articles as featured to show at the top
- **Categories**: Organize articles by category
- **Image Support**: Featured images are automatically optimized

## Next Steps

1. Install and configure Sanity Studio if you haven't already
2. Add the fieldNote schema to your Sanity project
3. Create your first Field Note article in Sanity
4. The articles will automatically appear on `/intel`

