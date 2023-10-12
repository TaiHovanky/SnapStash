"use client"

import { deleteImage } from "@/app/actions";

const DeleteButton = ({ imgId }: { imgId: string }) => {
  const handleDeleteClick = async () => {
    await deleteImage(imgId);
    console.log('Image deleted');
  }

  return (
    <button type="submit" onClick={handleDeleteClick} className="p-2 border border-black rounded-md mt-4">
      Delete
    </button>
  )
}

export default DeleteButton;