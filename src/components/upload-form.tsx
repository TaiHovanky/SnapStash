"use client"

import { addImage, findImages } from "@/app/actions"
// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Upload
    </button>
  )
}

export const UploadForm = () => {
  const [state, formAction] = useFormState(addImage, null);

  return (
    <form action={formAction}>
      <input type="file" placeholder="Search images" id="fileAttachment" name="fileAttachment" />
      <SubmitButton />
    </form>
  )
}