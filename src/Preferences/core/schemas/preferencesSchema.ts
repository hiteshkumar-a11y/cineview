import { z } from "zod";

export const preferencesSchema = z.object({
  language: z.string(),
  theme: z.enum(["light", "dark"]),
  region: z.string(),
});

export type Preferences = z.infer<
  typeof preferencesSchema
>;