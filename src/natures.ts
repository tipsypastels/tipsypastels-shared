export const NATURE_ICONS = {
  hardy: 'meh',
  lonely: 'frown',
  brave: 'angry',
  adamant: 'angry',
  naughty: 'grin-wink',
  bold: 'meh',
  docile: 'grin',
  relaxed: 'grin-alt',
  impish: 'grin-tongue-squint',
  lax: 'smile',
  timid: 'flushed',
  hasty: 'tired',
  serious: 'meh',
  jolly: 'laugh',
  naive: 'surprise',
  modest: 'smile-beam',
  mild: 'smile',
  quiet: 'meh-blank',
  bashful: 'flushed',
  rash: 'tired',
  calm: 'meh-blank',
  gentle: 'smile-beam',
  sassy: 'kiss-wink-heart',
  careful: 'grimace',
  quirky: 'grin-beam-sweat',
}

export const NATURES = Object.keys(NATURE_ICONS) as Nature[];

export type Nature = keyof typeof NATURE_ICONS;