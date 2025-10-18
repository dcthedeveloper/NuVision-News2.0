import { Badge } from "@/components/ui/badge";
import { memo } from "react";

interface CategoryTagProps {
  category: string;
}

export const CategoryTag = memo(({ category }: CategoryTagProps) => {
  return (
    <Badge variant="secondary" className="font-medium uppercase text-xs tracking-wide">
      {category}
    </Badge>
  );
});
