"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    // Extract headings from HTML content
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = content
    const headingElements = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6")

    const extractedHeadings = Array.from(headingElements).map((heading, index) => {
      const id = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `heading-${index}`
      return {
        id,
        text: heading.textContent || "",
        level: Number.parseInt(heading.tagName.charAt(1)),
      }
    })

    setHeadings(extractedHeadings)

    // Add IDs to actual headings in the DOM after component mounts
    setTimeout(() => {
      const actualHeadings = document.querySelectorAll(
        "article h1, article h2, article h3, article h4, article h5, article h6",
      )
      actualHeadings.forEach((heading, index) => {
        if (extractedHeadings[index]) {
          heading.id = extractedHeadings[index].id
        }
      })
    }, 100)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" },
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Table of Contents</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <nav className="space-y-1">
          {headings.map(({ id, text, level }) => (
            <button
              key={id}
              onClick={() => scrollToHeading(id)}
              className={cn(
                "block w-full text-left text-sm py-1 px-2 rounded transition-colors hover:bg-gray-100",
                level === 2 && "pl-2",
                level === 3 && "pl-4",
                level === 4 && "pl-6",
                activeId === id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground",
              )}
            >
              {text}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
