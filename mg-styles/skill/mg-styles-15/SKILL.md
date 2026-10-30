---
name: mg-styles-15
description: يسوي فيديو موشن جرافيك ١٠ ثواني بالكود بواحد من ١٥ ستايل جاهز من مكتبة mg-styles-15 (Flat Vector، Line Art، Isometric 2.5D، 3D Render، Frame-by-Frame، Collage، Liquid، Shape Morph، Bauhaus، 80s Synthwave/VHS، Aurora/Glassmorphism، Variety Captions، Sticker Explainer، Pixel Art، Cyberpunk HUD). استخدمه عند "ستايل موشن"، "إنترو بستايل"، "بستايل Cyberpunk HUD"، "Synthwave"، "Pixel Art"، "Isometric"، "إنترو للريل"، "mg-styles"، "ايش الستايلات اللي عندك"، أو لما يبي كل ريل بشكل مختلف. مو لتعديل فيديو مصوّر (هذا talking-head-ad-editor)، ولا لستايلات الأفلام المرسومة مثل الألوان المائية والزيتي (هذي lemo-opuscar).
---

# ١٥ ستايل موشن جرافيك (mg-styles-15)

مكتبة [Vincentwei1021/mg-styles-15](https://github.com/Vincentwei1021/mg-styles-15) (رخصة MIT). فيها ١٥ ستايل، ولكل ستايل برومبت كامل، وفيلم مرجعي، وكوده. الصورة كلها كود (SVG وCanvas وWebGL وThree.js)، والموسيقى والمؤثرات تتولد بالكود بعد. ما فيه توليد صور ولا فيديو بالذكاء الاصطناعي ولا كريدت.

## ١. جهّز المكتبة

1. شغّل `sh "<مجلد السكل>/scripts/setup.sh"`. أول مرة ينزّل المكتبة في `~/mg-styles-15` على كومت محدد تمت مراجعته (من غير مجلد الأفلام الجاهزة، حجمه ٤٢٠ ميغا). آخر سطر يطبع `MG=<المسار>` وقبله `CHROME=<المسار>`.
2. شغّل `sh "<مجلد السكل>/scripts/setup.sh" deps` بالخلفية من البداية لأنه ياخذ دقايق: ينصّب حزم npm وحزم بايثون للصوت في `$MG/.venv`.
3. لو طبع `! missing:` بلّغ المستخدم بالناقص (Node 22+ أو ffmpeg أو Chrome). لا تنصّب برامج نظام بنفسك.

## ٢. اختيار الستايل

| # | الملف | الستايل | يناسب |
|---|---|---|---|
| 01 | `01-flat-vector` | Flat Vector | إعلان تطبيق، شرح خدمة |
| 02 | `02-line-art` | Line Art | براند فاخر، هوية بسيطة |
| 03 | `03-isometric` | Isometric 2.5D | شرح نظام أو مدينة أو مراحل |
| 04 | `04-3d-render` | 3D Render (C4D/Blender) | منتج، لوقو (يحتاج Blender) |
| 05 | `05-cel-boil` | Frame-by-Frame / Line Boil | إحساس يدوي ودافي |
| 06 | `06-collage` | Collage / Cut-out | مجلة، ثقافة، أخبار |
| 07 | `07-liquid` | Liquid Motion | مشروبات، عناية، انتقالات ناعمة |
| 08 | `08-morph` | Shape Morph | لوقو يتحول، فكرة وحدة بأشكال |
| 09 | `09-bauhaus` | Geometric Bauhaus | تصميم، معارض، على الإيقاع |
| 10 | `10-synthwave` | 80s Synthwave / VHS | ريترو، ألعاب، موسيقى |
| 12 | `12-aurora-glass` | Aurora & Glassmorphism | تقنية، AI، SaaS |
| 18 | `18-hanazi` | Variety Captions (عمودي 9:16) | كابشن برامج منوعات، ريلز |
| 19 | `19-paperclip` | Sticker Explainer | شرح علمي أو معلومة |
| 20 | `20-pixel` | Pixel Art / 8-bit | ألعاب، نوستالجيا |
| 22 | `22-hud` | Cyberpunk HUD / FUI | تقنية، أمن، إنترو قوي |

لو المستخدم ما حدد ستايل، اقترح عليه ٣ من الجدول تناسب موضوعه، وارسل له رابط المعاينة: `https://vincentwei1021.github.io/mg-styles-15/#<الملف>`. لو طلب «ايش الستايلات اللي عندك»، اعرض الجدول.

## ٣. سؤال واحد بس

اسأل مرة وحدة فقط عن الأشياء اللي تغيّر الشغل:
- **الموضوع والنص**: اسم البراند أو المنتج، والجملة الرئيسية.
- **المقاس**: الافتراضي للريلز عمودي 1080×1920، والأصلي 1920×1080.
- **الألوان** لو عنده هوية.

الافتراضي: ١٠ ثواني، 30fps، موسيقى مولّدة بالكود.

## ٤. ركّب البرومبت

1. اقرأ `$MG/prompts/<الملف>.md` وخذ البلوك اللي تحت «提示词» (البرومبت بالإنجليزي).
2. غيّر **Creative seed** بس: القصة والبراند والنص والألوان. وغيّر **Output** لو المقاس عمودي.
3. **Signature features** لا تلمسها، لأنها اللي تخلي الستايل ينعرف من أول نظرة.
4. النص العربي: استخدم خط عربي برخصة مفتوحة (OFL) مثل IBM Plex Sans Arabic أو Cairo أو Tajawal، وخل `dir="rtl"`. وتأكد إن الحروف متصلة في الستيل قبل ما ترندر الفيلم كامل.
5. احفظ البرومبت النهائي في `<المشروع>/prompt.md`، والمشروع يكون في `$MG/demos/<اسم-قصير>/` عشان المسارات `/assets/...` و`/node_modules/...` تشتغل.

## ٥. اشتغل على البرومبت

نفّذ البرومبت كأنه موجّه لك. اقرأ كود الفيلم المرجعي `$MG/demos/<الملف>/` عشان تتعلم منه التقنيات، بس لا تنسخ نصوصه.

الصفحة لازم تعرّف `window.DEMO = { width, height, fps, duration }` و`window.renderAt = async (t) => {...}`، وبعدها `window.__ready = true`. الصورة لازم تعتمد على الوقت `t` بس: لا تستخدم `requestAnimationFrame`، والعشوائي يكون بـ seed ثابت.

- **الصوت**: `$MG/.venv/bin/python <المشروع>/audio.py` يطلّع `<المشروع>/out/audio.wav`. استخدم `$MG/lib/audio/mgaudio` (اقرأ `$MG/lib/audio/README.md`)، والمؤثرات تكون على نفس توقيتات `cues.json`.
- **ستيلز للفحص**: `cd "$MG" && MG_CHROME="$CHROME" node harness/render.mjs demos/<اسم> --stills 1,4,8`. افتح الصور وشيّك على الحروف العربية، وإن ما فيه نص طالع برا الإطار، وإن المنطقة الآمنة في العمودي فاضية (فوق ١٢٪ وتحت ٢٠٪).
- **الرندر**: `cd "$MG" && MG_CHROME="$CHROME" node harness/render.mjs demos/<اسم>`، والناتج في `demos/<اسم>/out/video.mp4`. في لينكس بدون GPU لو WebGL ما اشتغل، جرّب `MG_GPU_ARGS="--no-sandbox --use-angle=swiftshader"`.

## ٦. المراجعة والتسليم

1. قيّم الفيلم بنفسك على `$MG/rubric.md`، وصلّح أسوأ ٣ مشاكل، ورندر مرة ثانية. سوّ جولتين على الأكثر.
2. انسخ `video.mp4` و`prompt.md` لمجلد المستخدم، وقل له مكانهم.
3. لو بيكمل عليه بالمونتاج (يحطه إنترو لريل مثلاً)، سلّم الملف لسكل `talking-head-ad-editor`.
