// To store active session IDs (sid)
export const activeSessions = new Set();

// Log in
export function addSession(sid) {
  activeSessions.add(sid);
}

// Log out
export function removeSession(sid) {
  activeSessions.delete(sid);
}

// Check
export function isSessionActive(sid) {
  return activeSessions.has(sid);
}
