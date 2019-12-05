import { VisibilityLevel } from "../types";

interface AccessParams {
  isAuthor: boolean;
  isModerator: boolean;
}

export function canAccessWithVisibility(visibility: VisibilityLevel, { isAuthor, isModerator }: AccessParams) {
  switch(visibility) {
    case VisibilityLevel.REJECTED:
    case VisibilityLevel.SCHEDULED:
    case VisibilityLevel.MODERATED: {
      return isAuthor || isModerator;
    }
    case VisibilityLevel.DRAFT: {
      return isAuthor;
    }
    case VisibilityLevel.DELETED: {
      return isModerator;
    }
  }

  return true;
}