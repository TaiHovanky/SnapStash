"use client"

import { Trash2 } from "lucide-react";
import { deleteImage } from "@/app/actions";
import { Button } from "./ui/button";
import { useShowToast } from "@/hooks/useShowToast";
import { ServerActionResult } from "@/types/server-action-result.type";
import { useState } from "react";

const DeleteButton = ({ imgId }: { imgId: string }) => {
  const { showToast } = useShowToast();
  // Because this button isn't part of a form, I can't use useFormStatus
  const [pending, setPending] = useState<boolean>(false);

  const handleDeleteClick = async () => {
    setPending(true);
    const result: ServerActionResult = await deleteImage(imgId);
    setPending(false);
    showToast(result);
  }

  return (
    <Button
      size="icon"
      aria-label="Delete image"
      className="absolute z-30 top-0 right-0"
      disabled={pending}
      onClick={handleDeleteClick}
    >
      <Trash2 className="h-6 w-6" />
    </Button>
  )
}

export default DeleteButton;