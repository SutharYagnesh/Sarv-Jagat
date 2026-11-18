import json

with open('scripts/timeline_correlation.json', 'r', encoding='utf-8') as f:
    timeline = json.load(f)

blogs = [t for t in timeline if t['doc_type'] == 'blog']
print(f"Total blogs in timeline: {len(blogs)}")

matched_count = 0
for b in blogs:
    mb = b['matched_blobs']
    if mb:
        matched_count += 1
        print(f"BLOG: {b['slug']}")
        print(f"  Title: {b['title']}")
        print(f"  Matched: {mb}")

print(f"Blogs with matched blobs: {matched_count} / {len(blogs)}")
