import os, glob
from PIL import Image

output_dir = 'C:/Users/jaysu/.gemini/antigravity/brain/b138cc42-f518-46c6-b470-2804edb4b519/badges'
os.makedirs(output_dir, exist_ok=True)

# Find all photoshoot files
files = glob.glob('public/uploads/*20260501*.png') + glob.glob('public/uploads/product-10hp-8bar*.png')

# Group by session / key
processed = set()
for f in sorted(files):
    bn = os.path.basename(f)
    # Get session key
    key = None
    if 'product-10hp-8bar' in bn:
        key = '10hp_fixed'
    elif '20260501_' in bn:
        # e.g. 1_20260501_143452 or 4_20260501_143452 or 7_20260501_143452
        parts = bn.split('20260501_')
        prefix = parts[0][:2]
        ts = parts[1][:6]
        key = f"{prefix}_{ts}"
    
    if key and key not in processed:
        processed.add(key)
        try:
            im = Image.open(f)
            # Badge area on left door
            w, h = im.size
            # Crop upper-left door area
            crop_box = (int(w * 0.0), int(h * 0.08), int(w * 0.35), int(h * 0.35))
            badge = im.crop(crop_box)
            badge_path = os.path.join(output_dir, f"{key}.png")
            badge.save(badge_path)
            print(f"Saved {key}.png from {bn} ({w}x{h})")
        except Exception as e:
            print(f"Error {bn}: {e}")
