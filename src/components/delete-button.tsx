"use client"

import { deleteImage } from "@/app/actions";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useShowToast } from "@/hooks/useShowToast";
import { ServerActionResult } from "@/types/server-action-result.type";

const DeleteButton = ({ imgId }: { imgId: string }) => {
  const { showToast } = useShowToast();

  const handleDeleteClick = async () => {
    const result: ServerActionResult = await deleteImage(imgId);
    showToast(result);
  }

  return (
    <Button size="icon" className="absolute z-30 top-0 right-0" onClick={handleDeleteClick}>
      <Trash2 className="h-6 w-6" />
    </Button>
  )
}

export default DeleteButton;