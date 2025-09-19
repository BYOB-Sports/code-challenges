"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="outlined" sx={{ mb: 3 }} onClick={() => router.back()}>
      ← Back
    </Button>
  );
}