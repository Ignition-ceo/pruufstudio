import { Skeleton } from "@/components/ui/skeleton";

type PageSkeletonVariant = "table" | "cards" | "detail" | "form";

interface PageSkeletonProps {
  variant?: PageSkeletonVariant;
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-9 w-32 rounded-full" />
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="flex items-center gap-4 px-4 py-3 bg-muted/40">
          {[120, 100, 160, 80, 90, 60].map((w, i) => (
            <Skeleton key={i} className="h-4" style={{ width: w }} />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-4 border-t border-border">
            {[120, 100, 160, 80, 90, 60].map((w, j) => (
              <Skeleton key={j} className="h-4" style={{ width: w + Math.random() * 30 }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CardsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-56" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-5 space-y-3" style={{ height: 200 }}>
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-28 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-72" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
      <div className="flex gap-4 border-b border-border pb-2">
        {["w-20", "w-24", "w-16"].map((w, i) => (
          <Skeleton key={i} className={`h-5 ${w}`} />
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="max-w-lg space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
      <Skeleton className="h-11 w-40 rounded-full" />
    </div>
  );
}

const variants: Record<PageSkeletonVariant, React.FC> = {
  table: TableSkeleton,
  cards: CardsSkeleton,
  detail: DetailSkeleton,
  form: FormSkeleton,
};

export function PageSkeleton({ variant = "table" }: PageSkeletonProps) {
  const Component = variants[variant];
  return (
    <div className="container mx-auto py-6 md:py-8 px-4 animate-in fade-in duration-300">
      <Component />
    </div>
  );
}
