import { generateObject } from "ai";
import z from "zod";

const postGenerationSchema = z.object({
  title: z
    .string()
    .describe("A concise, engaging post title (max 100 characters)"),
  content: z
    .string()
    .describe("The full post content (max 2000 characters)"),
});

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await generateObject({
    model: "google/gemini-2.0-flash-lite",
    schema: postGenerationSchema,
    messages: [
      {
        role: "system",
        content: `You are a creative content writer. Generate a blog post based on the user's prompt.
          Rules:
          - The title must be concise and engaging (max 100 characters)
          - The content should be well-written, informative and engaging (max 2000 characters)
          - Write in the same language as the user's prompt
          - Do not use markdown formatting in the content`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    maxOutputTokens: 1024,
  });

  return Response.json(result.object);
}
