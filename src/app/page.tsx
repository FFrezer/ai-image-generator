/// app/page.tsx
"use client";

import { useState } from "react";
import Image from 'next/image';


export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrl(null);
    setError(null);
  
    const testPrompt = prompt || "sunset";
    const accessKey = "pJGLJb9OnEBY3O4ej5EQPfugqofos28aT1lvEA6s1O4";
  
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(testPrompt)}&client_id=${accessKey}`
      );
  
      const data = await response.json();
  
      console.log("Status:", response.status);
      console.log("Response Data:", data);
  
      if (!response.ok) {
        setError(data?.errors?.[0] || "API request failed.");
        return;
      }
  
      if (data && data.urls && data.urls.regular) {
        setImageUrl(data.urls.regular);
      } else {
        console.error("Image URL not found in response:", data);
        setError("No image returned from API.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };  
  

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🧠 AI Image Generator</h1>

      <input
        type="text"
        placeholder="Enter a prompt like 'sunset over ocean'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", marginRight: "0.5rem" }}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {imageUrl && (
  <Image
    src={imageUrl}
    alt="Generated"
    width={800}  // Adjust width/height to match your image or layout needs
    height={600}
    style={{ maxWidth: "100%", height: "auto" }}
  />
)}

    </div>
  );
}
