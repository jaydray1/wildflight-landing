import { type SchemaTypeDefinition } from 'sanity'
import fieldNote from './fieldNote'
import guide from './guide'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [fieldNote, guide],
}
