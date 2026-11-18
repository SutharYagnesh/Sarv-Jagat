import json, os

with open('scripts/all_blobs.json', 'r', encoding='utf-8') as f:
    blobs = json.load(f)

local_files = {}
for root, dirs, files in os.walk('public/uploads'):
    for fn in files:
        full = os.path.join(root, fn)
        sz = os.path.getsize(full)
        rel = '/' + os.path.relpath(full, 'public').replace('\\', '/')
        local_files[sz] = local_files.get(sz, []) + [(rel, fn)]

print(f"Total unique byte sizes in public/uploads: {len(local_files)}")

# Check how many blobs match local files by exact size
matched_blobs = 0
blob_to_local = {}

for b in blobs:
    sz = b['size']
    name = b['pathname']
    if sz in local_files:
        matched_blobs += 1
        # Pick the best local file
        candidates = local_files[sz]
        # Exact filename match?
        exact = [c[0] for c in candidates if c[1] == name]
        if exact:
            blob_to_local[b['url']] = exact[0]
            blob_to_local[b['pathname']] = exact[0]
        else:
            blob_to_local[b['url']] = candidates[0][0]
            blob_to_local[b['pathname']] = candidates[0][0]

print(f"Blobs matched to local files by exact byte size: {matched_blobs} / {len(blobs)}")
