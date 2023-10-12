"use client"

import { addImage } from "@/app/actions"
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useShowToast } from "@/hooks/useShowToast"
import { ServerActionResult } from "@/types/server-action-result.type"

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className="inline-block"
      disabled={pending}
    >
      Upload
    </Button>
  )
}

export const UploadForm = () => {
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
      />
      <SubmitButton />
    </form>
  )
}