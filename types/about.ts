import { ReactNode } from "react";

/**
 * Theme label data for scene dividers
 */
export type ThemeLabel = {
  zh: string;
  en: string;
  pinyin?: string;
};

/**
 * Scene data for the About page pinned stage
 */
export type Scene = {
  id: string;
  theme: ThemeLabel;
  leftContent: ReactNode;
  rightContent: ReactNode;
};

/**
 * Scene window tuple [start, end] representing the active range (0-1)
 */
export type SceneWindow = [number, number];
