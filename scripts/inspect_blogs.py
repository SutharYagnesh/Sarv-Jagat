import json

with open('scripts/timeline_correlation.json', 'r', encoding='utf-8') as f:
    tl = json.load(f)

for item in tl:
    slug = item.get('slug', '')
    if 'oil-free' in slug:
        print(f"Slug: {slug}")
        print(f"  Created: {item.get('createdAt')}")
        print(f"  Matched blobs: {item.get('matched_blobs')}")
