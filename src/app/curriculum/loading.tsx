import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {[1, 2].map((section) => (
            <div key={section} className="space-y-6">
                 <Skeleton className="h-8 w-32" />
                 <div className="space-y-6">
                    {[1, 2].map((item) => (
                        <div key={item} className="space-y-3 border rounded-xl p-6">
                            <div className="flex justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-48" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <Skeleton className="h-6 w-24" />
                            </div>
                            <Skeleton className="h-16 w-full" />
                        </div>
                    ))}
                 </div>
            </div>
        ))}
      </div>
    </div>
  )
}
