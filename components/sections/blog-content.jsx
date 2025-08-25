"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Calendar, Clock, User } from "lucide-react";

export function BlogContent({ post }) {
  const [copied, setCopied] = useState(false);
  
  // Parse author if it's a string
  let author = post.author;
  if (typeof author === "string") {
    try {
      author = JSON.parse(author);
    } catch (e) {
      author = { name: post.authorName || "Unknown Author" };
    }
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Author and metadata */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={author?.avatar || "/placeholder-user.jpg"} alt={author?.name} />
                <AvatarFallback>{author?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{author?.name}</p>
                {author?.company && <p className="text-sm text-muted-foreground">{author.company}</p>}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.publishedAt)}
              </div>
              {post.readTime && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime} min read
                </div>
              )}
            </div>
          </div>

          {/* Featured image */}
          {post.imageUrl && (
            <div className="mb-10 rounded-lg overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto object-cover"
                style={{ maxHeight: "500px" }}
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-10" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(post.tags) ? (
                  post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline" className="text-sm">
                    {post.tags}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="border-t pt-6 mt-10">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              {copied ? "Link Copied!" : "Share This Post"}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}