"use client"

import { addImage } from "@/app/actions"
// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending} className="inline-block">
      Upload
    </Button>
  )
}

export const UploadForm = () => {
  const [state, formAction] = useFormState(addImage, null);

  return (
    <form action={formAction} className="flex flex-row">
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