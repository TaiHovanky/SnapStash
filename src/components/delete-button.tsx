"use client"

import { deleteImage } from "@/app/actions";
import { Button } from "./ui/button";

const DeleteButton = ({ imgId }: { imgId: string }) => {
  const handleDeleteClick = async () => {
    await deleteImage(imgId);
  }

  return (
    <Button type="submit" onClick={handleDeleteClick}>
      Delete
    </Button>
  )
}

export default DeleteButton;