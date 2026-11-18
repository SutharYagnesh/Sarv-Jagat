import json
from datetime import datetime

with open('scripts/all_blobs.json', 'r', encoding='utf-8') as f:
    blobs = json.load(f)

with open('scripts/all_db_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

with open('scripts/all_db_blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

print("=== ALL PRODUCTS AND NEARBY BLOBS ===")
for p in products:
    p_created = datetime.fromisoformat(p['createdAt'].replace('Z', '+00:00'))
    nearby = []
    for b in blobs:
        b_time = datetime.fromisoformat(b['uploadedAt'].replace('Z', '+00:00'))
        diff_s = (b_time - p_created).total_seconds()
        if -3600 <= diff_s <= 300:
            nearby.append((diff_s, b['pathname'], b['size']))
    nearby.sort(key=lambda x: abs(x[0]))
    print(f"{p['slug']} | createdAt: {p['createdAt']} | nearby: {len(nearby)}")
    for d, name, sz in nearby[:4]:
        print(f"   diff: {int(d)}s | {name} | {sz} bytes")
