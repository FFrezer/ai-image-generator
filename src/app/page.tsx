"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrl(null);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt || "sunset" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "API request failed.");
        return;
      }

      if (!data.url) {
        setError("No image returned from API.");
        return;
      }

      setImageUrl(data.url);
    } catch (err) {
      console.error(err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">AI Image Generator</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:text-indigo-600">Home</a>
          <a href="#generate" className="hover:text-indigo-600">Generate</a>
          <a href="#features" className="hover:text-indigo-600">Features</a>
          <Link
            href="/Contact"
            className="inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-indigo-50">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-indigo-600">
          Transform Text Prompts into Stunning Images
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Generate high-quality images instantly with simple text prompts. Perfect for portfolios, presentations, and inspiration.
        </p>
        <button
          onClick={() => document.getElementById("generate")?.scrollIntoView({ behavior: "smooth" })}
          className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-lg transition"
        >
          Start Generating
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-8 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-white">
          <h3 className="text-xl font-semibold mb-2">Fast & Simple</h3>
          <p className="text-gray-600">Get instant image results with minimal setup.</p>
        </div>
        <div className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-white">
          <h3 className="text-xl font-semibold mb-2">Customizable Prompts</h3>
          <p className="text-gray-600">Control the style, mood, and content easily.</p>
        </div>
        <div className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-white">
          <h3 className="text-xl font-semibold mb-2">Reliable & Free</h3>
          <p className="text-gray-600">Powered by Unsplash API for fast, reliable images.</p>
        </div>
      </section>

      {/* Image Generator Section */}
      <section id="generate" className="flex flex-col items-center py-16 px-4">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">Generate Your Image</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter a prompt like 'sunset over ocean'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-72 sm:w-96"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? <span className="animate-pulse">Generating...</span> : "Generate"}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {imageUrl && (
          <div className="mt-6 w-full max-w-3xl rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageUrl}
              alt="Generated"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-gray-100 text-center text-gray-600 text-sm space-y-2">
        <p>© {new Date().getFullYear()} AI Image Generator |
           <Link href="/Contact" className="text-indigo-600 font-semibold hover:underline">
          Contact Us
        </Link>
         </p>
      </footer>
    </div>
  );
}
