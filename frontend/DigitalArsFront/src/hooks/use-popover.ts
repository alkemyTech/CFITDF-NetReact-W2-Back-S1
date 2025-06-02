// src/hooks/use-popover.ts
import { useCallback, useRef, useState } from 'react';

export function usePopover<T extends HTMLElement>() {
  const anchorRef = useRef<T | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    anchorRef,
    open,
    handleOpen,
    handleClose,
  };
}
