export default {
  name: 'guide',
  title: 'Brew Guide',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Drip', value: 'drip' },
          { title: 'Espresso', value: 'espresso' },
          { title: 'Milk', value: 'milk' },
        ],
      },
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
      name: 'specs',
      title: 'Specs',
      type: 'object',
      fields: [
        {
          name: 'ratio',
          title: 'Ratio',
          type: 'string',
          description: 'e.g., "1:15" or "18g coffee to 270g water"',
        },
        {
          name: 'grind',
          title: 'Grind',
          type: 'string',
          description: 'e.g., "Medium-fine" or "Fine"',
        },
        {
          name: 'waterTemp',
          title: 'Water Temp',
          type: 'string',
          description: 'e.g., "200-205°F" or "93-96°C"',
        },
        {
          name: 'brewTime',
          title: 'Brew Time',
          type: 'string',
          description: 'e.g., "2:30-3:00" or "25-30 seconds"',
        },
      ],
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'stepTitle',
              title: 'Step Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'instruction',
              title: 'Instruction',
              type: 'text',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'stepTitle',
              subtitle: 'instruction',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
    prepare({ title, subtitle }: any) {
      const typeLabels: Record<string, string> = {
        drip: 'Drip',
        espresso: 'Espresso',
        milk: 'Milk',
      };
      return {
        title,
        subtitle: typeLabels[subtitle] || subtitle,
      };
    },
  },
};

