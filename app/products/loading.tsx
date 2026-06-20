import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
      <p className="text-lg font-medium text-gray-600 animate-pulse">Loading Products...</p>
    </div>
  )
}
