// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from "./ui/button";

type SubmitButtonProps = {
  disabled: boolean;
}

const SubmitButton = ({ disabled }: SubmitButtonProps) => {
  // Using experimental hook to get the loading state of the form
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={disabled || pending}
      aria-label='Upload image'
      className="inline-block"
      disabled={disabled || pending}
    >
      {pending ? 'Uploading...' : 'Upload'}
    </Button>
  )
}

export default SubmitButton;