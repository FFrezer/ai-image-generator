// app/api/generate/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.IMAGEN_API_KEY;
  const { prompt } = await req.json();

  // Validate prompt presence
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  try {
    // Call Replicate API
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "stability-ai/sdxl",
        input: { prompt },
      }),
    });

    // Check if response is okay (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData?.detail || "Failed to generate image." }, { status: response.status });
    }

    // Parse and return the result
    const data = await response.json();
    return NextResponse.json(data);

  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
