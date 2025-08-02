import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new NextResponse("Gemini API key not configured", { status: 500 });
    }

    if (!messages || !Array.isArray(messages)) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // Prepare Gemini API request
    const geminiApiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
      apiKey;

    // Gemini expects prompt as array of "parts", each with `text`
    // We'll join all messages into one prompt for simplicity, separating user and model roles
    const promptText = messages
      .map(
        (msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
      )
      .join("\n");

    const geminiBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: promptText }],
        },
      ],
    };

    const response = await axios.post(geminiApiUrl, geminiBody, {
      headers: { "Content-Type": "application/json" },
    });

    // Gemini’s response text is at response.data.candidates[0].content.parts[0].text
    const text =
      response.data &&
      response.data.candidates &&
      response.data.candidates[0] &&
      response.data.candidates[0].content &&
      response.data.candidates[0].content.parts &&
      response.data.candidates[0].content.parts[0]
        ? response.data.candidates[0].content.parts[0].text
        : "Gemini did not return a response.";

    // The frontend expects: { role: "assistant", content: ... }
    return NextResponse.json({ role: "assistant", content: text });
  } catch (err) {
    console.log("[GEMINI_CONVERSATION_ERROR]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req) {
//   try {
//     // const { userId } = auth();
//     const body = await req.json();
//     const { messages } = body;

//     // if (!userId) {
//     //   return new NextResponse("Unauthorized", { status: 401 });
//     // }

//     if (!openai.apiKey) {
//       return new NextResponse("OpenAI API key not configured", { status: 500 });
//     }

//     if (!messages) {
//       return new NextResponse("Message are Required", { status: 400 });
//     }

//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages,
//     });

//     return NextResponse.json(response.choices[0].message);
//   } catch (err) {
//     console.log("[CONVERSATION_ERROR", err);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
