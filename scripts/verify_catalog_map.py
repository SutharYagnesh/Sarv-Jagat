import os, glob

# Let's map every photoshoot timestamp to its exact badge:
# We know:
# RF = Fixed Speed
# RV = Variable Speed (VFD/VSD)

# Let's catalog all photoshoot files in public/uploads:
uploads = glob.glob('public/uploads/*20260501*.png') + glob.glob('public/uploads/product-10hp-8bar*.png')

# Let's create an exact dictionary of model specs to image sets:
# For each HP + Pressure + Speed (fixed/vfd)
catalog_map = {
    # 10 HP Fixed
    ('10', '8', 'fixed'): [
        '/uploads/product-10hp-8bar-1-1793802970199.png',
        '/uploads/product-10hp-8bar-2-1793802970205.png',
        '/uploads/product-10hp-8bar-3-1793802970208.png'
    ],
    ('10', '10', 'fixed'): [
        '/uploads/product-10hp-8bar-1-1793802970199.png',
        '/uploads/product-10hp-8bar-2-1793802970205.png',
        '/uploads/product-10hp-8bar-3-1793802970208.png'
    ],
    ('10', '13', 'fixed'): [
        '/uploads/product-10hp-8bar-1-1793802970199.png',
        '/uploads/product-10hp-8bar-2-1793802970205.png',
        '/uploads/product-10hp-8bar-3-1793802970208.png'
    ],
    
    # 10 HP VFD (SJ-RV-10 8 BAR from 153153)
    ('10', '8', 'vfd'): [
        '/uploads/1_20260501_153153_0000.png',
        '/uploads/2_20260501_153154_0001.png',
        '/uploads/3_20260501_153154_0002.png'
    ],
    ('10', '10', 'vfd'): [
        '/uploads/4_20260501_153154_0003.png',
        '/uploads/5_20260501_153154_0004.png',
        '/uploads/6_20260501_153154_0005.png'
    ],
    ('10', '13', 'vfd'): [
        '/uploads/7_20260501_152056_0006.png',
        '/uploads/8_20260501_152056_0007.png',
        '/uploads/9_20260501_152057_0008.png'
    ],

    # 15 HP Fixed
    ('15', '8', 'fixed'): [
        '/uploads/1_20260501_142154_0000.png',
        '/uploads/2.png',
        '/uploads/3_20260501_142154_0002.png'
    ],
    ('15', '10', 'fixed'): [
        '/uploads/1_20260501_142154_0000.png',
        '/uploads/2.png',
        '/uploads/3_20260501_142154_0002.png'
    ],
    ('15', '13', 'fixed'): [
        '/uploads/1_20260501_142054_0000.png',
        '/uploads/2_20260501_142054_0001.png',
        '/uploads/3_20260501_142054_0002.png'
    ],

    # 15 HP VFD (SJ-RV-15 8/10/13 from 153412)
    ('15', '8', 'vfd'): [
        '/uploads/1_20260501_153412_0000.png',
        '/uploads/2_20260501_153412_0001.png',
        '/uploads/3_20260501_153412_0002.png'
    ],
    ('15', '10', 'vfd'): [
        '/uploads/4_20260501_153412_0003.png',
        '/uploads/5_20260501_153412_0004.png',
        '/uploads/6_20260501_153412_0005.png'
    ],
    ('15', '13', 'vfd'): [
        '/uploads/7_20260501_153412_0006.png',
        '/uploads/8_20260501_153412_0007.png',
        '/uploads/9_20260501_153413_0008.png'
    ],

    # 20 HP Fixed (SJ-RF-20 8/10/13 from 142632, 142738, 142940)
    ('20', '8', 'fixed'): [
        '/uploads/1_20260501_142632_0000.png',
        '/uploads/2_20260501_142632_0001.png',
        '/uploads/3_20260501_142632_0002.png'
    ],
    ('20', '10', 'fixed'): [
        '/uploads/1_20260501_142738_0000.png',
        '/uploads/2_20260501_142738_0001.png',
        '/uploads/3_20260501_142738_0002.png'
    ],
    ('20', '13', 'fixed'): [
        '/uploads/1_20260501_142940_0000.png',
        '/uploads/2_20260501_142941_0001.png',
        '/uploads/3_20260501_142941_0002.png'
    ],

    # 20 HP VFD (SJ-RV-20 8 BAR from 153653)
    ('20', '8', 'vfd'): [
        '/uploads/1_20260501_153653_0000.png',
        '/uploads/2_20260501_153654_0001.png',
        '/uploads/3_20260501_153654_0002.png'
    ],
    ('20', '10', 'vfd'): [
        '/uploads/4_20260501_153654_0003.png',
        '/uploads/5_20260501_153654_0004.png',
        '/uploads/6_20260501_153654_0005.png'
    ],
    ('20', '13', 'vfd'): [
        '/uploads/7_20260501_153654_0006.png',
        '/uploads/8_20260501_153654_0007.png',
        '/uploads/9_20260501_153654_0008.png'
    ],

    # 25 HP Fixed (SJ-RF-25 8/10/13 from 143314, 143152, 143047)
    ('25', '8', 'fixed'): [
        '/uploads/1_20260501_143314_0000.png',
        '/uploads/2_20260501_143314_0001.png',
        '/uploads/3_20260501_143314_0002.png'
    ],
    ('25', '10', 'fixed'): [
        '/uploads/1_20260501_143152_0000.png',
        '/uploads/2_20260501_143152_0001.png',
        '/uploads/3_20260501_143152_0002.png'
    ],
    ('25', '13', 'fixed'): [
        '/uploads/1_20260501_143047_0000.png',
        '/uploads/2_20260501_143047_0001.png',
        '/uploads/3_20260501_143047_0002.png'
    ],

    # 25 HP VFD (SJ-RV-25 8 BAR from 153904)
    ('25', '8', 'vfd'): [
        '/uploads/1_20260501_153904_0000.png',
        '/uploads/2_20260501_153905_0001.png',
        '/uploads/3_20260501_153905_0002.png'
    ],
    ('25', '10', 'vfd'): [
        '/uploads/1_20260501_153904_0000.png',
        '/uploads/2_20260501_153905_0001.png',
        '/uploads/3_20260501_153905_0002.png'
    ],
    ('25', '13', 'vfd'): [
        '/uploads/7_20260501_153654_0006.png',
        '/uploads/8_20260501_153654_0007.png',
        '/uploads/9_20260501_153654_0008.png'
    ],

    # 30 HP Fixed (SJ-RF-30 8/10/13 from 143452, 143601, 143735)
    ('30', '8', 'fixed'): [
        '/uploads/1_20260501_143452_0000.png',
        '/uploads/2_20260501_143452_0001.png',
        '/uploads/3_20260501_143452_0002.png'
    ],
    ('30', '10', 'fixed'): [
        '/uploads/1_20260501_143601_0000.png',
        '/uploads/2_20260501_143601_0001.png',
        '/uploads/3_20260501_143601_0002.png'
    ],
    ('30', '13', 'fixed'): [
        '/uploads/1_20260501_143735_0000.png',
        '/uploads/2_20260501_143735_0001.png',
        '/uploads/3_20260501_143736_0002.png'
    ],

    # 30 HP VFD (from 153904 or 154142)
    ('30', '8', 'vfd'): [
        '/uploads/1_20260501_153904_0000.png',
        '/uploads/2_20260501_153905_0001.png',
        '/uploads/3_20260501_153905_0002.png'
    ],
    ('30', '10', 'vfd'): [
        '/uploads/1_20260501_153904_0000.png',
        '/uploads/2_20260501_153905_0001.png',
        '/uploads/3_20260501_153905_0002.png'
    ],
    ('30', '13', 'vfd'): [
        '/uploads/7_20260501_153905_0006.png',
        '/uploads/8_20260501_153905_0007.png',
        '/uploads/9_20260501_153905_0008.png'
    ],

    # 40 HP Fixed (SJ-RF-40 8 BAR from 144508)
    ('40', '8', 'fixed'): [
        '/uploads/1_20260501_144508_0000.png',
        '/uploads/2_20260501_144508_0001.png',
        '/uploads/3_20260501_144508_0002.png'
    ],
    ('40', '10', 'fixed'): [
        '/uploads/1_20260501_144508_0000.png',
        '/uploads/2_20260501_144508_0001.png',
        '/uploads/3_20260501_144508_0002.png'
    ],
    ('40', '13', 'fixed'): [
        '/uploads/1_20260501_144508_0000.png',
        '/uploads/2_20260501_144508_0001.png',
        '/uploads/3_20260501_144508_0002.png'
    ],

    # 40 HP VFD (from 144508 4/5/6 or 7/8/9)
    ('40', '8', 'vfd'): [
        '/uploads/4_20260501_144508_0003.png',
        '/uploads/5_20260501_144509_0004.png',
        '/uploads/6_20260501_144509_0005.png'
    ],
    ('40', '10', 'vfd'): [
        '/uploads/4_20260501_144508_0003.png',
        '/uploads/5_20260501_144509_0004.png',
        '/uploads/6_20260501_144509_0005.png'
    ],
    ('40', '13', 'vfd'): [
        '/uploads/7_20260501_144509_0006.png',
        '/uploads/8_20260501_144509_0007.png',
        '/uploads/9_20260501_144509_0008.png'
    ],

    # 50 HP Fixed (SJ-RF-50 8 BAR from 145132)
    ('50', '8', 'fixed'): [
        '/uploads/1_20260501_145132_0000.png',
        '/uploads/2_20260501_145133_0001.png',
        '/uploads/3_20260501_145133_0002.png'
    ],
    ('50', '10', 'fixed'): [
        '/uploads/4_20260501_145133_0003.png',
        '/uploads/5_20260501_145133_0004.png',
        '/uploads/6_20260501_145133_0005.png'
    ],
    ('50', '13', 'fixed'): [
        '/uploads/7_20260501_145133_0006.png',
        '/uploads/8_20260501_145133_0007.png',
        '/uploads/9_20260501_145133_0008.png'
    ],

    # 50 HP VFD (from 154438)
    ('50', '8', 'vfd'): [
        '/uploads/1_20260501_154438_0000 (1).png',
        '/uploads/2_20260501_154438_0001 (1).png',
        '/uploads/3_20260501_154438_0002 (1).png'
    ],
    ('50', '10', 'vfd'): [
        '/uploads/4_20260501_154438_0003.png',
        '/uploads/5_20260501_154438_0004.png',
        '/uploads/6_20260501_154438_0005.png'
    ],
    ('50', '13', 'vfd'): [
        '/uploads/7_20260501_154438_0006 (1).png',
        '/uploads/8_20260501_154438_0007 (2).png',
        '/uploads/9_20260501_154438_0008 (2).png'
    ],

    # 60 HP Fixed (SJ-RF-60 8 BAR from 145509)
    ('60', '8', 'fixed'): [
        '/uploads/1_20260501_145509_0000.png',
        '/uploads/2_20260501_145509_0001.png',
        '/uploads/3_20260501_145510_0002.png'
    ],
    ('60', '10', 'fixed'): [
        '/uploads/4_20260501_145510_0003.png',
        '/uploads/5_20260501_145510_0004.png',
        '/uploads/6_20260501_145510_0005.png'
    ],
    ('60', '13', 'fixed'): [
        '/uploads/7_20260501_145510_0006.png',
        '/uploads/8_20260501_145510_0007.png',
        '/uploads/9_20260501_145510_0008.png'
    ],

    # 60 HP VFD (from 154719)
    ('60', '8', 'vfd'): [
        '/uploads/1_20260501_154719_0000 (3).png',
        '/uploads/2_20260501_154719_0001 (3).png',
        '/uploads/3_20260501_154719_0002 (3).png'
    ],
    ('60', '10', 'vfd'): [
        '/uploads/4_20260501_154719_0003.png',
        '/uploads/5_20260501_154719_0004.png',
        '/uploads/6_20260501_154719_0005.png'
    ],
    ('60', '13', 'vfd'): [
        '/uploads/1_20260501_154719_0000 (3).png',
        '/uploads/2_20260501_154719_0001 (3).png',
        '/uploads/3_20260501_154719_0002 (3).png'
    ],

    # 75 HP Fixed (SJ-RF-75 8 BAR from 145822)
    ('75', '8', 'fixed'): [
        '/uploads/1_20260501_145822_0000.png',
        '/uploads/2_20260501_145822_0001.png',
        '/uploads/3_20260501_145822_0002.png'
    ],
    ('75', '10', 'fixed'): [
        '/uploads/4_20260501_145822_0003.png',
        '/uploads/5_20260501_145823_0004.png',
        '/uploads/6_20260501_145823_0005.png'
    ],
    ('75', '13', 'fixed'): [
        '/uploads/7_20260501_145823_0006.png',
        '/uploads/8_20260501_145823_0007.png',
        '/uploads/9_20260501_145823_0008.png'
    ],

    # 75 HP VFD (from 155008)
    ('75', '8', 'vfd'): [
        '/uploads/1_20260501_155007_0000.png',
        '/uploads/2_20260501_155008_0001.png',
        '/uploads/3_20260501_155008_0002.png'
    ],
    ('75', '10', 'vfd'): [
        '/uploads/4_20260501_155008_0003.png',
        '/uploads/5_20260501_155008_0004.png',
        '/uploads/6_20260501_155008_0005.png'
    ],
    ('75', '13', 'vfd'): [
        '/uploads/7_20260501_155008_0006.png',
        '/uploads/8_20260501_155008_0007.png',
        '/uploads/9_20260501_155008_0008.png'
    ],

    # 100 HP Fixed (SJ-RF-100 8 BAR from 150425 & sj-RF-10 8 bar_150506)
    ('100', '8', 'fixed'): [
        '/uploads/1_20260501_150425_0000 (1).png',
        '/uploads/sj-RF-10 8 bar_20260501_150506_0000.png',
        '/uploads/3_20260501_150425_0002 (1).png'
    ],
    ('100', '10', 'fixed'): [
        '/uploads/4_20260501_150425_0003.png',
        '/uploads/5_20260501_150425_0004.png',
        '/uploads/6_20260501_150425_0005.png'
    ],
    ('100', '13', 'fixed'): [
        '/uploads/7_20260501_150425_0006.png',
        '/uploads/8_20260501_150425_0007.png',
        '/uploads/9_20260501_150425_0008.png'
    ],

    # 100 HP VFD (from 155259)
    ('100', '8', 'vfd'): [
        '/uploads/1_20260501_155259_0000.png',
        '/uploads/2_20260501_155259_0001.png',
        '/uploads/3_20260501_155259_0002.png'
    ],
    ('100', '10', 'vfd'): [
        '/uploads/1_20260501_155259_0000.png',
        '/uploads/2_20260501_155259_0001.png',
        '/uploads/3_20260501_155259_0002.png'
    ],
    ('100', '13', 'vfd'): [
        '/uploads/7_20260501_155259_0006.png',
        '/uploads/8_20260501_155259_0007.png',
        '/uploads/9_20260501_155259_0008.png'
    ],

    # 120 HP Fixed (SJ-RF-120 8 BAR from 151107)
    ('120', '8', 'fixed'): [
        '/uploads/1_20260501_151107_0000.png',
        '/uploads/2_20260501_151107_0001.png',
        '/uploads/3_20260501_151107_0002.png'
    ],
    ('120', '10', 'fixed'): [
        '/uploads/4_20260501_151107_0003.png',
        '/uploads/5_20260501_151107_0004.png',
        '/uploads/6_20260501_151107_0005.png'
    ],
    ('120', '13', 'fixed'): [
        '/uploads/7_20260501_151107_0006.png',
        '/uploads/8_20260501_151107_0007.png',
        '/uploads/9_20260501_151108_0008 (1).png'
    ],

    # 120 HP VFD (from 155610)
    ('120', '8', 'vfd'): [
        '/uploads/1_20260501_155610_0000.png',
        '/uploads/2_20260501_155610_0001.png',
        '/uploads/3_20260501_155610_0002.png'
    ],
    ('120', '10', 'vfd'): [
        '/uploads/1_20260501_155610_0000.png',
        '/uploads/2_20260501_155610_0001.png',
        '/uploads/3_20260501_155610_0002.png'
    ],
    ('120', '13', 'vfd'): [
        '/uploads/7_20260501_155610_0006.png',
        '/uploads/8_20260501_155610_0007.png',
        '/uploads/9_20260501_155610_0008 (1).png'
    ],

    # 150 HP Fixed (SJ-RF-150 8 BAR from 151352 / 151353)
    ('150', '8', 'fixed'): [
        '/uploads/1_20260501_151352_0000.png',
        '/uploads/2_20260501_151353_0001.png',
        '/uploads/3_20260501_151353_0002.png'
    ],
    ('150', '10', 'fixed'): [
        '/uploads/4_20260501_151353_0003.png',
        '/uploads/5_20260501_151353_0004.png',
        '/uploads/6_20260501_151353_0005 (1).png'
    ],
    ('150', '13', 'fixed'): [
        '/uploads/7_20260501_151353_0006.png',
        '/uploads/8_20260501_151353_0007.png',
        '/uploads/9_20260501_151353_0008.png'
    ],

    # 150 HP VFD (from 155855)
    ('150', '8', 'vfd'): [
        '/uploads/1_20260501_155610_0000.png',
        '/uploads/2_20260501_155610_0001.png',
        '/uploads/3_20260501_155610_0002.png'
    ],
    ('150', '10', 'vfd'): [
        '/uploads/4_20260501_155855_0003.png',
        '/uploads/5_20260501_155855_0004.png',
        '/uploads/6_20260501_155855_0005.png'
    ],
    ('150', '13', 'vfd'): [
        '/uploads/7_20260501_155610_0006 (1).png',
        '/uploads/8_20260501_155610_0007 (1).png',
        '/uploads/9_20260501_155610_0008 (1).png'
    ],

    # 175 HP Fixed (SJ-RF-175 8 BAR from 151708)
    ('175', '8', 'fixed'): [
        '/uploads/1_20260501_151708_0000.png',
        '/uploads/2_20260501_151708_0001.png',
        '/uploads/3_20260501_151708_0002.png'
    ],
    ('175', '10', 'fixed'): [
        '/uploads/4_20260501_151708_0003.png',
        '/uploads/5_20260501_151708_0004.png',
        '/uploads/6_20260501_151708_0005.png'
    ],
    ('175', '13', 'fixed'): [
        '/uploads/7_20260501_151708_0006.png',
        '/uploads/8_20260501_151709_0007.png',
        '/uploads/9_20260501_151709_0008.png'
    ],

    # 175 HP VFD (from 160235)
    ('175', '8', 'vfd'): [
        '/uploads/1_20260501_160234_0000.png',
        '/uploads/2_20260501_160235_0001.png',
        '/uploads/3_20260501_160235_0002.png'
    ],
    ('175', '10', 'vfd'): [
        '/uploads/4_20260501_160235_0003.png',
        '/uploads/5_20260501_160235_0004.png',
        '/uploads/6_20260501_160235_0005.png'
    ],
    ('175', '13', 'vfd'): [
        '/uploads/7_20260501_160235_0006.png',
        '/uploads/8_20260501_160235_0007.png',
        '/uploads/9_20260501_160235_0008.png'
    ],

    # 220 HP Fixed (SJ-RF-220 8 BAR from 152056)
    ('220', '8', 'fixed'): [
        '/uploads/1_20260501_152056_0000.png',
        '/uploads/2_20260501_152056_0001.png',
        '/uploads/3_20260501_152056_0002.png'
    ],
    ('220', '10', 'fixed'): [
        '/uploads/4_20260501_152056_0003.png',
        '/uploads/5_20260501_152056_0004.png',
        '/uploads/6_20260501_152056_0005.png'
    ],
    ('220', '13', 'fixed'): [
        '/uploads/7_20260501_152056_0006.png',
        '/uploads/8_20260501_152056_0007.png',
        '/uploads/9_20260501_152057_0008.png'
    ],

    # 220 HP VFD (from 160540)
    ('220', '8', 'vfd'): [
        '/uploads/1_20260501_160540_0000.png',
        '/uploads/2_20260501_160540_0001.png',
        '/uploads/3_20260501_160540_0002.png'
    ],
    ('220', '10', 'vfd'): [
        '/uploads/4_20260501_160540_0003.png',
        '/uploads/5_20260501_160540_0004.png',
        '/uploads/6_20260501_160540_0005.png'
    ],
    ('220', '13', 'vfd'): [
        '/uploads/7_20260501_160540_0006.png',
        '/uploads/8_20260501_160540_0007.png',
        '/uploads/9_20260501_160540_0008.png'
    ]
}

# Verify every single mapped file exists on disk
missing = []
for k, flist in catalog_map.items():
    for f in flist:
        disk_path = os.path.join('public', f.replace('/', os.sep).lstrip(os.sep))
        if not os.path.exists(disk_path):
            missing.append((k, f, disk_path))

print(f"Total catalog specifications mapped: {len(catalog_map)}")
print(f"Total missing files: {len(missing)}")
if missing:
    for m in missing[:10]:
        print("  Missing:", m)
else:
    print("ALL MAPPED PRODUCT PHOTOS EXIST 100% ON DISK!")
