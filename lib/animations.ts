/**
 * Shared animation utilities for the About page
 */

// Easing function for smooth transitions (ease-in-out cubic)
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Calculate opacity for scene transitions based on scroll progress
 * @param progress - Current scroll progress (0-1)
 * @param sceneWindow - [start, end] tuple defining the scene's active range
 * @param overlapSize - Size of transition overlap (default: 0.1)
 * @returns Opacity value (0-1)
 */
export function calculateSceneOpacity(
  progress: number,
  sceneWindow: [number, number],
  overlapSize = 0.1
): number {
  const [start, end] = sceneWindow;
  const isFirstScene = start === 0;
  const enterStart = isFirstScene ? 0 : start - overlapSize;
  const enterEnd = start + overlapSize;
  const exitStart = end - overlapSize;
  const exitEnd = end + overlapSize;

  if (progress < enterStart) {
    return 0;
  } else if (progress < enterEnd) {
    if (isFirstScene) {
      return 1;
    }
    const t = (progress - enterStart) / (enterEnd - enterStart);
    return easeInOutCubic(t);
  } else if (progress < exitStart) {
    return 1;
  } else if (progress < exitEnd) {
    const t = (progress - exitStart) / (exitEnd - exitStart);
    return 1 - easeInOutCubic(t);
  } else {
    return 0;
  }
}
