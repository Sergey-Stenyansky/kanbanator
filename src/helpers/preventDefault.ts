import { SyntheticEvent } from "react";

export function withPreventDefault<EVENT extends SyntheticEvent>(
  callback?: (event: EVENT) => void
) {
  return function (event: EVENT) {
    event.preventDefault();
    callback?.(event);
    return event;
  };
}

export const preventDefault = withPreventDefault();
