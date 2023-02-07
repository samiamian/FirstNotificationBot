/**
 * Adaptive Card data model. Properties can be referenced in an adaptive card via the `${var}`
 * Adaptive Card syntax.
 */
export interface CardData {
  appName: string;
  motivation: string;
  profileImage: string;
  name: string;
  createdUtc: string;
}
