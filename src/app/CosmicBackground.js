// CosmicBackground.js
"use client";
import React, { useMemo } from "react";
import Image from "next/image";

// URLs mapping to the original cosmic themes
const COSMIC_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=60&w=1920", // Jan: Pillars
  "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=60&w=1920", // Feb: Binary
  "https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&q=60&w=1920", // Mar: Proto
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=60&w=1920", // Apr: TON618
  "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&q=60&w=1920", // May: Helix Nebula
  "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=60&w=1920", // Jun: Solar Max
  "https://images.unsplash.com/photo-1417577097439-425fb7dec05e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ymx1ZSUyMHN0YXJ8ZW58MHx8MHx8fDA%3D", // Jul: Blue Hyper
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=60&w=1920", // Aug: Supernova
  "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?auto=format&fit=crop&q=60&w=1920", // Sep: Andromeda
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=60&w=1920", // Oct: Pulsar
  "https://upload.wikimedia.org/wikipedia/commons/e/e3/The_Horsehead_Nebula_IC434.jpg", // Nov: Dark Nebula
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=60&w=1920", // Dec: CMB
];

export default function CosmicBackground({ monthIndex }) {
  // Memoize the image URL calculation to prevent unnecessary renders
  const imageUrl = useMemo(() => {
    // Basic bounds checking for the array
    const normalizedIndex = isNaN(monthIndex) ? 0 : monthIndex % 12;
    return COSMIC_BACKGROUNDS[normalizedIndex] || COSMIC_BACKGROUNDS[0];
  }, [monthIndex]);

  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none">
      <Image
        src={imageUrl}
        alt="Monthly cosmic background theme"
        fill
        className="object-cover transition-opacity duration-1000" // Optional: slow fade for image change
        sizes="100vw"
        priority // Preloads the background image for better performance
        unoptimized // Allows using unsplash URLs directly with Next/Image component
      />
    </div>
  );
}