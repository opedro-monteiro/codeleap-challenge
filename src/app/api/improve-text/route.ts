import { streamText } from "ai";

export async function POST(req: Request) {
  const { text }: { text: string } = await req.json();

  const result = streamText({
    model: "google/gemini-2.0-flash-lite",
    messages: [
      {
        role: "system",
        content: `
          You are an assistant specialized in improving texts written by users.
          Rewrite the text following these rules:
          - Preserve the original meaning
          - Correct grammatical, spelling, and punctuation errors
          - Make the text clearer, more natural, and more professional
          - Add new information to complement what the user says
          - If you notice that something is missing or incomplete, supplement the text accordingly
        `,
      },
      {
        role: "user",
        content: text,
      },
    ],
    maxOutputTokens: 512,
  });

  return result.toTextStreamResponse();
}
