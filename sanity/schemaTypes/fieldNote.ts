export default {
  name: 'fieldNote',
  title: 'Field Note',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle that appears below the title',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      description: 'Short description that appears in the article list',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Technical', value: 'Technical' },
          { title: 'Roasting Notes', value: 'Roasting Notes' },
          { title: 'Field Guides', value: 'Field Guides' },
          { title: 'Batch Logs', value: 'Batch Logs' },
        ],
      },
    },
    {
      name: 'techSpecs',
      title: 'Tech Specs (Metadata)',
      type: 'object',
      description: 'Technical specifications for expedition-grade posts',
      fields: [
        {
          name: 'expedition',
          title: 'Expedition',
          type: 'string',
          description: 'e.g., "North Face Solo Trek / Alpine Start"',
        },
        {
          name: 'roaster',
          title: 'Roaster',
          type: 'string',
          description: 'e.g., "Aillio Bullet R1 V2"',
        },
        {
          name: 'bean',
          title: 'The Bean',
          type: 'string',
          description: 'e.g., "Ethiopian Yirgacheffe (High Density)"',
        },
        {
          name: 'targetProfile',
          title: 'Target Profile',
          type: 'string',
          description: 'e.g., "Ultralight / High Clarity / Peak Caffeine"',
        },
      ],
    },
    {
      name: 'gearList',
      title: 'Gear List',
      type: 'array',
      description: 'List of gear/equipment used',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Item',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'details',
              title: 'Details',
              type: 'string',
              description: 'Specs or details about the item',
            },
          ],
          preview: {
            select: {
              title: 'item',
              subtitle: 'details',
            },
          },
        },
      ],
    },
    {
      name: 'associatedGuide',
      title: 'Associated Guide',
      type: 'reference',
      to: [{ type: 'guide' }],
      description: 'Link to a related brew guide',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark this article as featured (will show at top of list)',
      initialValue: false,
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Featured image for the article',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, subtitle, media, publishedAt }: any) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No date';
      return {
        title,
        subtitle: `${subtitle || 'Field Note'} • ${date}`,
        media,
      };
    },
  },
};

