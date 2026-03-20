import { Skeleton } from "@/components/ui/skeleton";

export const EbookCardSkeleton = () => (
  <div className="overflow-hidden rounded-md border border-border bg-card">
    <Skeleton className="aspect-[2/3] w-full" />
    <div className="p-2 space-y-1.5">
      <Skeleton className="h-2 w-12" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-2 w-16" />
    </div>
  </div>
);
