'use client';

import { useState } from 'react';

export default function PrototypePage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setImageUrl(''); // clear old image

    // Generate new random image URL
    const newUrl = `https://picsum.photos/800/600?random=${Date.now()}`;
    console.log('Generated image URL:', newUrl); // debug log

    // Slight delay so loading indicator shows
    setTimeout(() => {
      setImageUrl(newUrl);
      setLoading(false);
    }, 300);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-white text-gray-800 px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">🚀 AI Image Generator</h1>

      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type anything (optional)..."
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleGenerate}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Generate Image
        </button>
      </div>

      {loading && (
        <p className="mt-6 text-purple-500 text-lg animate-pulse">Loading image...</p>
      )}

      {imageUrl && !loading && (
        <img
          src={imageUrl}
          alt="Generated"
          className="mt-6 max-w-full rounded shadow-lg"
          onError={() => console.error('Image failed to load:', imageUrl)}
        />
      )}
    </main>
  );
}
