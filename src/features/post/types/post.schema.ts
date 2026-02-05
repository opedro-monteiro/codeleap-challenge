import z from "zod";

export const postFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(100, "Title must be at most 100 characters."),
  content: z
    .string()
    .min(1, "Content is required.")
    .max(2000, "Content must be at most 2000 characters."),
});
export type PostFormData = z.infer<typeof postFormSchema>;

export const createPostSchema = z.object({
  username: z.string(),
  title: z.string(),
  content: z.string(),
});
export type createPostFormData = z.infer<typeof createPostSchema>;

export const editPostSchema = z.object({
  title: z.string(),
  content: z.string(),
});
export type editPostFormData = z.infer<typeof editPostSchema>;

export const getPostSchema = z.object({
  id: z.string(),
  username: z.string(),
  created_datetime: z.string(),
  title: z.string(),
  content: z.string()
})

export type getPostFormData = z.infer<typeof getPostSchema>;



