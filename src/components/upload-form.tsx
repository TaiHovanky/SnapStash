"use client"

import SubmitButton from "./submit-button"
import { Input } from "./ui/input"
import { addImage } from "@/app/actions"
import { useShowToast } from "@/hooks/useShowToast"
import { ServerActionResult } from "@/types/server-action-result.type"
import { useState } from "react"

const UploadForm = () => {
  const { showToast } = useShowToast();
  /* While the server action is relying on form data,
  this file state is used to enable/disable the submit button */
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Updating the file state helps us to enable/disable the submit button
    if (e.target && e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  }

  const uploadFormAction = async (formData: FormData) => {
    const result: ServerActionResult = await addImage(formData);
    showToast(result);
  }

  return (
    <form action={uploadFormAction} className="flex flex-row">
      <Input
        type="file"
        id="fileAttachment"
        aria-label="Upload image"
        name="fileAttachment"
        className="mr-4 cursor-pointer"
        accept=".png, .jpg, .jpeg, .raw, .tiff, .bmp, .svg, .webp"
        onChange={handleFileChange}
      />
      <SubmitButton disabled={!file} />
    </form>
  )
}

export default UploadForm;