import { useToast } from "@/components/ui/use-toast";
import { ServerActionResult } from "@/types/server-action-result.type";

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