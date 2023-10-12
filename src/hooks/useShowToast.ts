import { useToast } from "@/components/ui/use-toast";
import { ServerActionResult } from "@/types/server-action-result.type";

/**
 * Custom hook that shows a toast notification
 * @returns {showToast} function that shows a toast notification 
 * based on the result of a server action
 */
export const useShowToast = () => {
  const { toast } = useToast();

  const showToast = (result: ServerActionResult) => {
    const { error, description, title } = result;

    toast({
      variant: error ? 'destructive' : 'default',
      title,
      description
    });
  }
  
  return { showToast };
}