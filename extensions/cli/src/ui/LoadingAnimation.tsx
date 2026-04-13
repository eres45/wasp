import { Text } from "ink";
import React, { useEffect, useState } from "react";

const BRAILLE_BY_DENSITY: { [key: number]: string[] } = {
  0: ["â €"], // No dots
  1: ["â ", "â ‚", "â „", "â ˆ", "â ", "â  ", "â¡€", "â¢€"], // 1 dot
  2: ["â ƒ", "â …", "â ‰", "â ‘", "â ¡", "â Š", "â ’", "â ”"], // 2 dots
  3: ["â ‡", "â ‹", "â ", "â •", "â £", "â ±", "â ª", "â œ"], // 3 dots
  4: ["â ", "â —", "â ›", "â ", "â §", "â ¯", "â ³", "â µ"], // 4 dots
  5: ["â Ÿ", "â «", "â ­", "â ·", "â ½", "â ¾", "â »", "â º"], // 5 dots
  6: ["â ¿", "â¡·", "â¡¾", "â¡»", "â¡¯", "â¡§", "â¢¿", "â£·"], // 6 dots
  7: ["â£¿", "â£¾", "â£½", "â£»", "â£¯", "â£§", "â£", "â¡¿"], // 7 dots
  8: ["â£¿"], // All dots (8)
};

// Function to generate frame with specific dot density
const generateDensityFrame = (dotCount: number): string => {
  const chars = BRAILLE_BY_DENSITY[Math.min(8, Math.max(0, dotCount))];
  return Array.from(
    { length: 3 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
};

// Helper function to generate eased static fade animation with full timing control
const generateEasedStaticFade = (
  timingCurve: number[] = [3, 3, 2, 1, 1, 1, 2, 3, 3],
): string[] => {
  const frames: string[] = [];

  // timingCurve[0] = frames at density 8
  // timingCurve[1] = frames at density 7
  // timingCurve[2] = frames at density 6
  // ... and so on
  // timingCurve[8] = frames at density 0

  // Going down (8 -> 0)
  for (let density = 8; density >= 0; density--) {
    const frameCount = timingCurve[8 - density];
    for (let i = 0; i < frameCount; i++) {
      frames.push(generateDensityFrame(density));
    }
  }

  // Going up (1 -> 8) - skip 0 to avoid double-holding at the bottom
  for (let density = 1; density <= 8; density++) {
    const frameCount = timingCurve[8 - density];
    for (let i = 0; i < frameCount; i++) {
      frames.push(generateDensityFrame(density));
    }
  }

  return frames;
};

// Usage examples:

// Default ease-in-ease-out
const TIMING_CURVE = [3, 3, 2, 1, 1, 0, 1, 2, 3];
const STATIC_FADE = [
  ...generateEasedStaticFade(TIMING_CURVE),
  ...generateEasedStaticFade(TIMING_CURVE),
  ...generateEasedStaticFade(TIMING_CURVE),
  ...generateEasedStaticFade(TIMING_CURVE),
];

const SPINNER: string | string[] = STATIC_FADE;

interface LoadingAnimationProps {
  visible?: boolean;
  color?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  visible = true,
  color = "green",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationChars =
    typeof SPINNER === "string" ? (SPINNER as string).split("") : SPINNER;

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animationChars.length);
    }, 150);

    return () => clearInterval(interval);
  }, [visible, animationChars.length]);

  if (!visible) return null;

  return <Text color={color}>{animationChars[currentIndex]}</Text>;
};

export { LoadingAnimation };
