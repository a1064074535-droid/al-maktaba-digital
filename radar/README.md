# رادار المكتبة الرقمية — ملفات المشروع

منصة تسويق تيك توك لخدمات «المكتبة الرقمية» العشرين، تعمل عبر Metricool.

## المكونات
- `platform.html` — مصدر صفحة المنصة (منشورة كـ Artifact: https://claude.ai/artifact/U8ZCZtomadJnV4FpKoMRUk). الصور في `cards/` تُرفع معها باسم `cards/svc-NN.jpg`.
- `render-cards.js` — مولّد بطاقات الخدمات (1080×1920) بنسق كحلي وذهبي.
- `qr/NN.svg` — رموز QR تفتح واتساب 0545888559 برقم الخدمة.
- `../cards/svc-NN.jpg` — البطاقات النهائية؛ رابطها العام:
  `https://raw.githubusercontent.com/a1064074535-droid/al-maktaba-digital/marketing-assets/cards/svc-NN.jpg`

## إعادة توليد البطاقات (في أي جلسة سحابية)
```bash
mkdir -p fonts && cd fonts
npm pack @fontsource/cairo @fontsource/ibm-plex-sans-arabic lucide-static@0.460.0
for f in *.tgz; do mkdir -p ${f%.tgz} && tar xzf $f -C ${f%.tgz}; done
# render-cards.js يتوقع: fonts/fontsource-cairo-*/package/files ، fonts/lucide-static-*/package/icons
# و fonts/fontsource-ibm-plex-sans-arabic-5.3.0/files (فك هذه الحزمة بحيث يصبح المسار كذلك)
cd .. && cp -r qr . && node render-cards.js        # أو: node render-cards.js 1,5,18
```
الناتج في `cards2/`؛ انسخه إلى `cards/` وادفع الفرع.

## الأتمتة
- مهمة مجدولة كل خميس 20:13 بتوقيت الرياض: «الطيار الآلي — خطة تيك توك الأسبوعية» تجدول ٧ منشورات للأسبوع التالي وتسجلها في قاعدة بيانات المنصة (campaign_log).
- Metricool brandId: 5662015 · المنطقة الزمنية Asia/Riyadh.
- لخدمات 1–8 و15–18: سطر «خدمة مستقلة غير تابعة لأي جهة حكومية، لا نضمن القبول».
