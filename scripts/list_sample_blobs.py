import json

with open('scripts/timeline_correlation.json', 'r', encoding='utf-8') as f:
    tl = json.load(f)

blog_tl = [item for item in tl if item['doc_type'] == 'blog']
count = 0
for b in blog_tl:
    if b['matched_blobs']:
        print(f"{b['slug']}:")
        for mb in b['matched_blobs']:
            print(f"   {mb[0]} ({mb[1]} bytes, uploaded {mb[2]}s before doc)")
        count += 1
        if count >= 25: break
