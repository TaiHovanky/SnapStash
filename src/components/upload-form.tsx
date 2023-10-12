"use client"

import SubmitButton from "./submit-button"
import { Input } from "./ui/input"
import { addImage } from "@/app/actions"
import { useShowToast } from "@/hooks/useShowToast"
import { ServerActionResult } from "@/types/server-action-result.type"

const UploadForm = () => {
  const { showToast } = useShowToast();

  const uploadFormAction = async (formData: FormData) => {
    const result: ServerActionResult = await addImage(formData);
    showToast(result);
  }

  return (
    <form action={uploadFormAction} className="flex flex-row">
      <Input
        type="file"
        id="fileAttachment"
        name="fileAttachment"
        className="mr-4 cursor-pointer"
        accept=".png, .jpg, .jpeg, .raw, .tiff, .bmp, .svg, .webp"
      />
      <SubmitButton />
    </form>
  )
}

export default UploadForm;