"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SpecsTable({ specifications }) {
  const [copiedRow, setCopiedRow] = useState(null)
  const { toast } = useToast()

  const copyToClipboard = async (key, value) => {
    try {
      await navigator.clipboard.writeText(`${key}: ${value}`)
      setCopiedRow(key)
      toast({
        title: "Copied to clipboard",
        description: `${key}: ${value}`,
      })
      setTimeout(() => setCopiedRow(null), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  if (!specifications || Object.keys(specifications).length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No specifications available</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Specification</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Value</th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(specifications).map(([key, value], index) => (
            <tr key={key} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
              <td className="py-3 px-4 font-medium text-foreground">{key}</td>
              <td className="py-3 px-4 text-muted-foreground">{value}</td>
              <td className="py-3 px-4">
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(key, value)} className="h-8 w-8 p-0">
                  {copiedRow === key ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">Copy specification</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
