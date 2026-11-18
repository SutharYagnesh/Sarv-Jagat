import json

with open('scripts/all_db_blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

print(f"Total blogs: {len(blogs)}")
for i, b in enumerate(blogs):
    img = b.get('imageUrl') or (b.get('images', [])[0] if b.get('images') else 'NONE')
    print(f"[{i+1}] {b['slug']} => {img}")
