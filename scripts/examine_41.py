import json

with open('scripts/all_db_blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

print(f"Total blogs: {len(blogs)}")
for b in blogs:
    imgs = b.get('images', [])
    img_u = b.get('imageUrl')
    if imgs or img_u:
        slug = b.get('slug')
        title = b.get('title')
        print(f"SLUG: {slug}")
        print(f"  Title: {title}")
        print(f"  imageUrl: {img_u}")
        print(f"  images: {imgs}")
        print(f"  createdAt: {b.get('createdAt')}")
