import json
from datetime import datetime

with open('scripts/all_blobs.json', 'r', encoding='utf-8') as f:
    blobs = json.load(f)

with open('scripts/all_db_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

with open('scripts/all_db_blogs.json', 'r', encoding='utf-8') as f:
    blogs = json.load(f)

# Build a timeline of all uploads and document creations
timeline = []

for b in blobs:
    t = datetime.fromisoformat(b['uploadedAt'].replace('Z', '+00:00'))
    timeline.append({
        'type': 'blob',
        'time': t,
        'name': b['pathname'],
        'size': b['size'],
        'url': b['url'],
        'data': b
    })

for p in products:
    t = datetime.fromisoformat(p['createdAt'].replace('Z', '+00:00'))
    timeline.append({
        'type': 'product',
        'time': t,
        'name': p['title'],
        'slug': p['slug'],
        'data': p
    })

for b in blogs:
    t = datetime.fromisoformat(b['createdAt'].replace('Z', '+00:00'))
    timeline.append({
        'type': 'blog',
        'time': t,
        'name': b.get('title', ''),
        'slug': b['slug'],
        'data': b
    })

timeline.sort(key=lambda x: x['time'])

# Now let's trace through the timeline:
# When blobs are uploaded, they belong to the next document created within 10 minutes!
current_blobs = []
results = []

for item in timeline:
    if item['type'] == 'blob':
        current_blobs.append(item)
    elif item['type'] in ('product', 'blog'):
        # Find blobs that occurred in the 10 minutes prior to this document creation
        matched = []
        doc_time = item['time']
        for cb in current_blobs:
            diff = (doc_time - cb['time']).total_seconds()
            if 0 <= diff <= 600:
                matched.append(cb)
        results.append({
            'doc_type': item['type'],
            'title': item['name'],
            'slug': item['slug'],
            'doc_time': item['time'].isoformat(),
            'matched_blobs': [(b['name'], b['size'], int((doc_time - b['time']).total_seconds())) for b in matched]
        })
        # clear matched blobs so they don't get double assigned if separated
        # (keep unmatched ones)
        matched_names = set(b['name'] for b in matched)
        current_blobs = [cb for cb in current_blobs if cb['name'] not in matched_names]

with open('scripts/timeline_correlation.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print(f"Processed timeline. Results saved to scripts/timeline_correlation.json")
prods_with_matches = sum(1 for r in results if r['doc_type'] == 'product' and len(r['matched_blobs']) > 0)
blogs_with_matches = sum(1 for r in results if r['doc_type'] == 'blog' and len(r['matched_blobs']) > 0)
print(f"Products matched: {prods_with_matches} / {len(products)}")
print(f"Blogs matched: {blogs_with_matches} / {len(blogs)}")
