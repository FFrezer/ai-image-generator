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
    setImageUrl(''); // Clear old image
    setError(''); // Reset error message
  
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${prompt}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();
  
      // Log the full response data for debugging
      console.log("Response data from Unsplash API:", data);
  
      // Check if data exists and if the structure matches what we expect
      if (Array.isArray(data) && data.length > 0 && data[0].urls && data[0].urls.regular) {
        // Set the image URL if the response is valid
        setImageUrl(data[0].urls.regular);
      } else {
        // If the image URL is not found, log the data
        console.error("Image URL not found in the response data:", data);
        setError('No image returned from API.');
      }
    } catch (error) {
      // Catch any errors and set error state
      console.error('Error fetching image:', error);
      setError('Failed to generate image. Please try again.');
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
