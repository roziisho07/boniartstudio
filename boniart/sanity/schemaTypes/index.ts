import { type SchemaTypeDefinition } from "sanity";
import { about } from "./about";
import { contact } from "./contact";
import { inSituMedia } from "./inSituMedia";
import { newsPress } from "./newsPress";
import { painting } from "./painting";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [about, contact, inSituMedia, newsPress, painting],
};
