import json

with open('scripts/timeline_correlation.json', 'r', encoding='utf-8') as f:
    timeline = json.load(f)

print(f"Total entries in timeline: {len(timeline)}")

prods = [t for t in timeline if t['doc_type'] == 'product']
print(f"Products in timeline: {len(prods)}")

for p in prods:
    mb = p['matched_blobs']
    mb_str = ', '.join([f"{b[0]} ({b[2]}s)" for b in mb]) if mb else "NO MATCH"
    print(f"{p['slug']} => {mb_str}")
