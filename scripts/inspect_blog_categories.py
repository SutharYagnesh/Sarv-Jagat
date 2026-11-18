import json
import re

with open('scripts/all_db_blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

# Let's inspect the categories and keywords of all 160 blogs
categories = set()
for b in blogs:
    cat = b.get('category', 'Uncategorized')
    categories.add(cat)

print(f"Categories across 160 blogs: {categories}")
