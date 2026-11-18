import json

with open('scripts/timeline_correlation.json', 'r', encoding='utf-8') as f:
    timeline = json.load(f)

# Find the specific items from user's screenshots:
# 1. Fixed Speed 10 HP (screenshot 1)
# 2. Fixed Speed 15 HP (screenshot 1)
# 3. Variable Speed 10 HP (screenshot 3)
# 4. Variable Speed 15 HP (screenshot 3)
# 5. Blog 1.5 HP Oil-Free Reciprocating Air Compressor (screenshot 4)
# 6. Blog 100-Litre Air Receiver Tank at 8 Bar (screenshot 2)
# 7. Blog 40 CFM Refrigerated Air Dryer (screenshot 2 & 4)

queries = [
    '10-hp-screw-air-compressor-fixed-speed-8-bar-sj',
    '15-hp-screw-air-compressor-fixed-speed-8-bar-sj',
    '10-hp-screw-air-compressor-variable-speed-8-bar-sj',
    '15-hp-screw-air-compressor-variable-speed-8-bar-sj',
    '1-5-hp-oil-free-reciprocating-air-compressor-50-liter-tank-aluminium-body-electromagnetic-valve-electronics-industry-sarv-jagat-corporation',
    '100-litre-air-receiver-tank-at-8-bar-backup-time-explained',
    '40-cfm-refrigerated-air-dryer-16-bar-230v-single-phase-pre-after-filter-metal-mould-powder-coating-industry-sarv-jagat-corporation'
]

for item in timeline:
    for q in queries:
        if q in item['slug']:
            print(f"=== {item['doc_type'].upper()}: {item['title']} ===")
            print(f"Slug: {item['slug']}")
            print(f"Time: {item['doc_time']}")
            print(f"Matched blobs: {item['matched_blobs']}")
