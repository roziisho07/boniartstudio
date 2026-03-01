import { type SchemaTypeDefinition } from 'sanity'
import { about } from './about'
import { contact } from './contact'
import { newsPress } from './newsPress'
import { painting } from './painting'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [about, contact, newsPress, painting],
}
