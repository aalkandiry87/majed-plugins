# بروتوكول اللوحة

**اللوحة:** «مكتب الشركة»: https://claude.ai/artifact/LHTFA14RUfin4d1L2F5wGX
**المعرّف (slug):** `9c29b555-5570-4a8b-833e-8c96bf0d42fc`
**المصدر:** [board/index.html](board/index.html)

اللوحة خاصة بالمالك. الكتابة عليها للمالك بس، والجلسات تكتب باسم حسابه عن طريق أدوات `db_write` / `db_query` / `db_get` مع الـ slug أعلاه.

## الجداول الأربعة

### `staff/<id>`: الموظفين
المعرّفات: `ceo`، `sales`، `scout`، `content`، `production`، `publishing`
```json
{ "name": "…", "emoji": "…", "role": "…",
  "status": "يشتغل | فاضي | متوقف", "current": "المهمة الحالية بجملة",
  "xp": 0, "updatedAt": "ISO" }
```

### `tasks/<id>`: المهام
```json
{ "title": "…", "owner": "<staff id>",
  "stage": "backlog | doing | review | done", "priority": "عادي | عالي",
  "due": "الخميس 5 نوفمبر", "blocked": false, "link": "https://…",
  "createdAt": "ISO", "updatedAt": "ISO", "by": "<staff id | owner>" }
```

### `events/<id>`: الأحداث (سجل اللي صار)
```json
{ "at": "ISO", "who": "<staff id | owner>",
  "type": "start | done | blocked | need | approved | rejected | xp | note | publish",
  "text": "جملة وحدة", "ref": "<task أو need id>" }
```

### `needs/<id>`: ينتظرك (قرارات وموافقات المالك)
```json
{ "title": "سؤال واحد واضح", "from": "<staff id>",
  "kind": "نشر | إرسال | صرف | دفع | إعدادات | قرار | معلومة",
  "detail": "وش بالضبط", "cost": "التكلفة إن وُجدت", "recommend": "الخيار المقترح",
  "link": "https://…", "status": "pending | approved | rejected",
  "createdAt": "ISO", "resolvedAt": "", "ownerNote": "" }
```

## متى يحدّث كل قسم اللوحة

| اللحظة | وش يكتب |
|---|---|
| بداية الجلسة | `staff/<id>`: status = يشتغل، وcurrent = المهمة · event من نوع `start` |
| بدأ مهمة | `tasks`: stage = doing |
| توقف | `tasks`: blocked = true · `staff`: status = متوقف · event من نوع `blocked` فيه السبب |
| يحتاج المالك | need جديد (status = pending) · event من نوع `need` |
| خلّص وينتظر مراجعة | `tasks`: stage = review · event |
| المدير اعتمد | `tasks`: stage = done مع link · event من نوع `done` |
| نفّذ شي موافَق عليه | event من نوع `publish` (أو حسب النوع) فيه `ref` = رقم need |
| نهاية الجلسة | `staff`: status = فاضي، وcurrent = "" · التقرير بالصيغة المعتمدة |
| ختام اليوم (المدير) | يحدّث `xp` لكل قسم · event من نوع `xp` لكل تغيير |

## قواعد الكتابة
1. **اقرأ قبل ما تكتب.** أي تعديل على مستند موجود يحتاج `ifVersion` من آخر قراءة.
2. **عملية وحدة لكل مستند في كل مرة.** ما نكتب على نفس المستند من جلستين بنفس الوقت.
3. **المعرّفات:** `t###` للمهام، و`n###` لـ «ينتظرك»، و`e<التاريخ>-<رقم>` للأحداث. مثال: `e20261102-01`.
4. **الأوقات** تنكتب ISO بتوقيت UTC، واللوحة تعرضها بتوقيت الكويت وبنظام 12 ساعة. أي وقت مكتوب في النص (`title`، `text`، `due`) يكون بنظام 12 ساعة.
5. **ولا قسم يغيّر `status` في needs.** هذا للمالك بس، من أزرار اللوحة.
6. **قبل أي نشر أو إرسال أو صرف:** نقرأ `needs/<id>` ونتأكد إن status = `approved` لنفس العملية بالضبط. إذا ما فيه موافقة، ما ننفذ.
7. **ما نكتب أسرار** (كلمات سر، أو مفاتيح، أو أرقام بطاقات) في اللوحة أبدًا.
8. **التنظيف:** في المراجعة الشهرية، الأحداث اللي عمرها أكثر من 30 يوم تنحفظ في `work/archive/` وتنحذف. حد اللوحة 25,000 مستند.

## مثال: قسم النشر يرفع بوست للموافقة
```
db_write(ops=[
  {op:"set", path:"needs/n004", data:{title:"نشر ريل «قهوة وفكرة: 7» الأحد 6:00 PM", from:"publishing",
    kind:"نشر", detail:"الكابشن: …", recommend:"وافق", link:"https://…", cost:"",
    status:"pending", createdAt:"…", resolvedAt:"", ownerNote:""}},
  {op:"set", path:"events/e20261108-01", data:{at:"…", who:"publishing", type:"need", text:"رفعت ريل الأحد للموافقة", ref:"n004"}}
])
```
بعدها ينتظر لين يصير `needs/n004.status == "approved"`، وبعدين يجدول. الموافقة هذي تخص هذا البوست بس.
