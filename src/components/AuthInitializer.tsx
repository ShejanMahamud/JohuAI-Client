"use client";

import { useAuthStore } from "@/app/stores/authStore";
import { useEffect } from "react";

export default function AuthInitializer() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return null;
}
