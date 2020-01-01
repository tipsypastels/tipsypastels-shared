import { SwearFilter } from "../types";
import { SWEAR_FILTER_CENSORED_WORDS } from "../config";
import { replaceWithMatchingCapitalization } from "./string";
import { asArray } from "./array";

const CENSORED_WORDS_ARRAY = Object.keys(SWEAR_FILTER_CENSORED_WORDS);

const REGEX = new RegExp(
  `\\b([\\w]*(${CENSORED_WORDS_ARRAY.join('|')})[\\w]*)\\b`, 'gi'
);

export function censorSwears(text: string, filter: SwearFilter): string {
  if (filter === 'disabled') {
    return text;
  }

  return text.replace(REGEX, (_, word, swear) => {
    const swearLower = swear.toLowerCase();
    const wordLower = word.toLowerCase();
    const entry = SWEAR_FILTER_CENSORED_WORDS[swearLower];

    if (entry.unless && asArray(entry.unless).indexOf(wordLower) > -1) {
      return word;
    }

    switch (filter) {
      case 'pokemon': {
        return replaceWithMatchingCapitalization(
          word, swear, entry.pokemon,
        );
      }

      case 'asterisks': {
        return singleCharCensor('*', word, swear);
      }

      case 'hearts': {
        return singleCharCensor('♥', word, swear);
      }
    }
  });
}

function singleCharCensor(char: string, word: string, swear: string) {
  return word.replace(swear, char.repeat(swear.length));
}