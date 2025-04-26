"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    const output = data?.output?.[0] || data?.urls?.get;

    if (output) setImageUrl(output);
  };

  return (
    <main>
      <h1>AI Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt like 'sunset over ocean'"
      />
      <button onClick={handleGenerate}>Generate</button>

      {imageUrl && <img src={imageUrl} alt="Generated image" width={400} />}
    </main>
  );
}
