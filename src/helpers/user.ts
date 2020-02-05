import { MARK_AS_ONLINE_LENGTH } from "../config";

export function markAsOnline({ lastOnlineAt }: { lastOnlineAt: number }) {
  if (!lastOnlineAt) {
    return false;
  }

  return (Date.now() - lastOnlineAt) <= MARK_AS_ONLINE_LENGTH;
}