import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MetricCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden border-0 bg-gradient-to-br from-gray-100 via-white to-gray-100/50 relative">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-5 rounded" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-8 w-20" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
          <Skeleton className="h-8 w-full mt-4" />
        </div>
      </CardContent>
    </Card>
  )
}
