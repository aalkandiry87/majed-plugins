# بلقنات ماجد الزعابي

مكان واحد لكل البلقنات. تضيفه مرة وحدة، وأي تحديث يوصلك لحاله.

| البلقن | شنو فيه |
|---|---|
| [`content-engine-v5`](content-engine) | مصنع المحتوى: هويتك، لوحة أخبار، كاروسيل بغلاف مصمم من الخبر، تعريب بوستات انستقرام، نشر بأمر واحد عبر بلوتاتو، ووكلاء: استوديو إعلان المنتجات ومدير الجودة. (مو المنصة الكاملة — هذي أدوات الكاروسيل والنشر بس.) |
| `majed-video` | 6 سكلات فيديو: ريل من فيديو كلام، موشن 3D، بودكاست، مونتاج على الإيقاع، أغلفة وثمبنيل، ودافنشي ريزولف. المصدر: [majedphotos/video-ad-editor](https://github.com/majedphotos/video-ad-editor). |
| [`majed-live-stage`](live-stage) | شاشة العرض الحي: عرض يمشي بصوتك، المشاهد تطلع لما تقول عباراتها، وهايكو يرسم وأنت تتكلم، وتصويت الجمهور بالباركود. ومعه سكل يبني العرض ويفحصه. |

### سكلات موشن خارجية (مراجَعة ومثبّتة على نسخة محددة)

| البلقن | شنو فيه | المصدر |
|---|---|---|
| `xilo-opus-video` | مخرج فيديو بالكود: يعطيك ٣ أفكار ولكل وحدة معاينة، تختار وحدة ويبني الفيديو | [Kianzzz/xilo-opus-video](https://github.com/Kianzzz/xilo-opus-video) (MIT) |
| `hyperframes` | موشن جرافيك من HTML تبع HeyGen: توصف الإعلان ويطلّع لك الفيديو (٧ سكلات) | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) (Apache-2.0) |
| [`majed-mg-styles`](mg-styles) | ١٥ ستايل موشن جاهز (Cyberpunk HUD، Synthwave، Pixel Art…)، فيديو ١٠ ثواني على موضوعك | [Vincentwei1021/mg-styles-15](https://github.com/Vincentwei1021/mg-styles-15) (MIT) |
| `lemo-opuscar` | ٥٩ ستايل فيلم مرسوم بالكود (زيتي، ألوان مائية، ياباني)، بي رول بدون كريدت | [lemomo-ai/lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) (MIT) |

كل وحدة مثبّتة على كومت تمت مراجعته (`sha` بملف المتجر). عشان تحدّثها، راجع التغييرات وغيّر الـ`sha`. وتحتاج على جهازك: Node.js 22+ و FFmpeg و Python 3.11+ و Chrome. سكل `majed-video` يحوّل لها لحاله لما تطلب ستايل بالاسم.

## التثبيت

<p align="center"><img src="assets/add-marketplace.gif" width="300" alt="شلون تضيف الماركت بليس"></p>

**من claude.ai أو تطبيق الديسكتوب** (يوصل الويب والديسكتوب والجوال):
1. Customize ← Plugins ← Add ← Add marketplace
2. اكتب: `majedphotos/majed-plugins`
3. فعّل **Sync automatically**، وأضف البلقن اللي تبيه.

**من الطرفية (Claude Code):**
```bash
claude plugin marketplace add majedphotos/majed-plugins
claude plugin install content-engine-v5@majed-plugins
claude plugin install majed-video@majed-plugins
claude plugin install majed-live-stage@majed-plugins
claude plugin install xilo-opus-video@majed-plugins
claude plugin install hyperframes@majed-plugins
claude plugin install majed-mg-styles@majed-plugins
claude plugin install lemo-opuscar@majed-plugins
```

## ملاحظات
- المهارات والأوامر تظهر بكل التطبيقات. الوكلاء (agents) تشتغل بـCowork وClaude Code بس.
- شاشة العرض الحي تحتاج لابتوب فيه كروم وبايثون، وكلود كود مسجّل دخول عشان هايكو.
- رسم الفيديو (ffmpeg، كروم، دافنشي) يحتاج جهاز. على الجوال يقرا التعليمات ويستخدم بدائل السحابة حسب سكل الفيديو.
- التحديث: كل نسخة جديدة لازم يرتفع رقمها بـ`plugin.json` (وإلا ما يوصل أحد التحديث).
