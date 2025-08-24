import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

export function BlogCard({ post }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/blog/${post.slug}`}>
          <div className="relative overflow-hidden">
            <img
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90 text-foreground">
                {post.category}
              </Badge>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground line-clamp-3 leading-relaxed">{post.excerpt}</p>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime || 0} min read</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src={post.author?.avatar || "/placeholder-user.jpg"}
                  alt={post.author?.name || "Author"}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs">{post.author?.name || "Unknown Author"}</span>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}
