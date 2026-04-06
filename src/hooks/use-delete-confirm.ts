"use client";

import { useState } from "react";
import { CONFIRM_TIMEOUT } from "@/lib/constants";

export function useDeleteConfirm(timeout = CONFIRM_TIMEOUT) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const request = (id: string) => {
    setConfirmId(id);
    setTimeout(() => setConfirmId(null), timeout);
  };

  const clear = () => setConfirmId(null);

  return { confirmId, request, clear };
}
