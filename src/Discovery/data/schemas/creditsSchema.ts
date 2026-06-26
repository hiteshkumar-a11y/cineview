import { z } from "zod";

export const castMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
});

export const creditsSchema = z.object({
  cast: z.array(castMemberSchema),
});

export type CastMember = z.infer<
  typeof castMemberSchema
>;