// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from "./ui/button";

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className="inline-block"
      disabled={pending}
    >
      {pending ? 'Uploading...' : 'Upload'}
    </Button>
  )
}

export default SubmitButton;