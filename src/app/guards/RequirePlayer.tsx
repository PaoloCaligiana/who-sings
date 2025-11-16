import { Navigate } from "react-router-dom";

import type { JSX } from "react";
import { getCurrentPlayer } from "../../storage/playerStorage";

export function RequirePlayer({ children }: { children: JSX.Element }) {
  const player = getCurrentPlayer();
  if (!player) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
