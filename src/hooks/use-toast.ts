import { toast as sonnerToast } from "sonner";

export const useToast = () => {
  const toast = ({ title, description }: { title: string; description?: string }) => {
    sonnerToast(title, {
      description,
    });
  };

  return { toast };
};
