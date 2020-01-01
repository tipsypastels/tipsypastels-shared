export const EDITOR_FONT_SIZES = '1 2 3 4 5 6 7';
export const EDITOR_FONT_OPTIONS = [
  "Abril Fatface",
  "Alegreya Sans SC",
  "Amatic SC",
  "Arvo",
  "Audiowide",
  "Bangers",
  "Berkshire Swash",
  "Brawler",
  "Bubbler One",
  "Cabin Sketch",
  "Carter One",
  "Catamaran",
  "Century Gothic",
  "Cinzel",
  "Diplomata",
  "Dosis",
  "Finger Paint",
  "Flamenco",
  "Francois One",
  "Frijole",
  "Geo",
  "Germania One",
  "Gloria Hallelujah",
  "Griffy",
  "Handlee",
  "IM Fell English SC",
  "Itim",
  "Jim Nightshade",
  "Josefin Slab",
  "Just Me Again Down Here",
  "Kaushan Script",
  "Lato",
  "Lobster Two",
  "Maven Pro",
  "Merriweather",
  "Metrophobic",
  "Michroma",
  "Monofett",
  "Montserrat",
  "Noto Sans JP",
  "Noto Serif",
  "Noto Serif JP",
  "Nunito",
  "Open Sans",
  "Oswald",
  "Pathway Gothic One",
  "Play",
  "Poiret One",
  "Poppins",
  "Press Start 2P",
  "Raleway",
  "Roboto",
  "Rock Salt",
  "Satisfy",
  "Shadows Into Light",
  "Slackey",
  "Source Code Pro",
  "Source Sans Pro",
  "Special Elite",
  "Titillium Web",
  "Uncial Antiqua",
  "Voltaire",
  "Yanone Kaffeesatz"
];

export const REACTION_OPTIONS = {
  "like": {
    "active": "Liked",
    "fa": "thumbs-up"
  },
  "love": {
    "active": "Loved",
    "fa": "heart"
  },
  "laugh": {
    "active": "Laughing",
    "fa": "grin-squint-tears"
  },
  "surprise": {
    "active": "Surprised",
    "fa": "surprise"
  },
  "sad": {
    "active": "Sad",
    "fa": "sad-tear"
  },
  "angry": {
    "active": "Angry",
    "fa": "angry"
  }
};

export const CODE_BLOCK_LANGUAGES = [
  "bash",
  "cpp",
  "cs",
  "css",
  "java",
  "javascript",
  "json",
  "makefile",
  "markdown",
  "php",
  "plaintext",
  "python",
  "ruby",
  "scss",
  "sql",
  "yaml"
];
export const CODE_BLOCK_ALIASES = {
  "c": "cpp",
  "js": "javascript",
  "ts": "typescript",
  "html": "php",
};

export const ALLOWED_ATTACHMENT_TYPES = [
  "asm",
  "bin",
  "c",
  "css",
  "doc",
  "docx",
  "gif",
  "h",
  "ics",
  "ips",
  "jpg",
  "json",
  "m4a",
  "mov",
  "mp3",
  "pdf",
  "png",
  "psd",
  "s",
  "txt",
  "xlsx",
  "zip",
];

export const SWEAR_FILTER_CENSORED_WORDS = {
  cunt:   { pokemon: 'cloyster' },
  shit:   { pokemon: 'muk', unless: 'bullshit' },
  pussy:  { pokemon: 'cloyster' },
  bitch:  { pokemon: 'rattata' },
  nigger: { pokemon: 'jirachi' },
  fag:    { pokemon: 'hag', unless: 'cofagrigus' },
  fuck:   { pokemon: 'psyduck'},
};

export const POSTS_PER_PAGE = 25;
export const THREADS_PER_PAGE = 50;