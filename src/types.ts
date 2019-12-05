import { REACTION_OPTIONS } from './config';

export type ReactionName = keyof typeof REACTION_OPTIONS;

export enum VisibilityLevel {
  REJECTED = -3,
  SCHEDULED = -2,
  DRAFT = -1,
  MODERATED = 0,
  VISIBLE = 1,
  DELETED = 2,
}