import os

uploads = os.listdir('public/uploads')
print(f"Total files in public/uploads: {len(uploads)}")

oil_free = [f for f in uploads if 'oil' in f.lower() and 'free' in f.lower()]
screw = [f for f in uploads if 'screw' in f.lower()]
piston = [f for f in uploads if 'piston' in f.lower()]
dryer = [f for f in uploads if 'dryer' in f.lower()]
tank = [f for f in uploads if 'tank' in f.lower() or 'receiver' in f.lower()]
filter_files = [f for f in uploads if 'filter' in f.lower()]
industry = [f for f in uploads if 'ind' in f.lower() or 'textile' in f.lower() or 'food' in f.lower()]
whatsapp = [f for f in uploads if 'whatsapp' in f.lower()]
customer = [f for f in uploads if f.startswith('SJ_COM_') or f.startswith('SJ_') or f.startswith('SARV')]

print("\n--- OIL FREE ---")
for f in oil_free: print(" ", f)

print("\n--- DRYER ---")
for f in dryer: print(" ", f)

print("\n--- TANK ---")
for f in tank: print(" ", f)

print("\n--- FILTER ---")
for f in filter_files: print(" ", f)

print("\n--- WHATSAPP ---")
for f in whatsapp: print(" ", f)

print("\n--- AUTHENTIC SJ CUSTOMER / STUDIO ---")
for f in customer[:20]: print(" ", f)
