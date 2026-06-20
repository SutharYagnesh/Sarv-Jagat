import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogNotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-6">Blog Post Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        The blog post you are looking for does not exist or has been removed.
      </p>
      <Link href="/blog">
        <Button>Return to Blog</Button>
      </Link>
    </div>
  );
}