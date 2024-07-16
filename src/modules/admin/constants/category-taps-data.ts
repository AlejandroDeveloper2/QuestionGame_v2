import { Emoji, EmojiQuite, EmojiSurpriseAlt, Star } from "iconoir-react";

import { Difficulty } from "@admin/types/data-types";
import { Tap } from "@core/types/data-types";

const categoryTapsData: Tap<Difficulty>[] = [
  { label: "Todas", Icon: Star, tapId: "Todas" },
  { label: "Básico", Icon: Emoji, tapId: "Basico" },
  { label: "Intermedio", Icon: EmojiQuite, tapId: "Intermedio" },
  { label: "Experto", Icon: EmojiSurpriseAlt, tapId: "Experto" },
];
export default categoryTapsData;
