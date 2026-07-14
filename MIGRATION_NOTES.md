# ادغام بک‌اند در Next.js (بلاگیتو)

این پروژه دیگه نیازی به سرور Express جدا نداره. تمام منطق بک‌اند (احراز هویت، پست‌ها،
کامنت‌ها، دسته‌بندی‌ها و آپلود فایل) داخل خود Next.js با استفاده از Route Handlers
(پوشه‌ی `app/api`) پیاده‌سازی شده.

## چی اضافه شده؟

- `lib/db.js` — اتصال Mongoose با کش (برای جلوگیری از چند کانکشن روی هات‌ریلود)
- `lib/models/*` — همون مدل‌های Mongoose قبلی (User, Post, Comment, Category)
- `lib/auth.js` — تولید/خواندن JWT از کوکی‌ها (accessToken / refreshToken)
- `lib/upload.js` — ذخیره‌ی فایل‌های آپلودی (کاور پست، آواتار) داخل `public/uploads`
- `lib/validators/*`, `lib/sanitizeHtml.js`, `lib/comments.js`, `lib/transformPost.js`,
  `lib/utils.js` — پورت مستقیم منطق کنترلرهای اکسپرس قبلی
- `app/api/user/*`, `app/api/post/*`, `app/api/comment/*`, `app/api/category/*` —
  دقیقا معادل روت‌های اکسپرس قبلی (`/api/user/signup`, `/api/post/list`, ...)

## چی تغییر نکرده (عمدا)؟

لایه‌ی fetch سمت فرانت (`api/callAPI.js` و همه‌ی `*Services.js` و `hooks/*`) دست‌نخورده
باقی مونده. چون همون endpointها رو صدا می‌زنن (`user/signup`, `post/list`, ...)، فقط کافیه
`NEXT_PUBLIC_BASE_URL` به آدرس داخلی خود سایت اشاره کنه (`/api`). این یعنی همه‌ی
کامپوننت‌ها، هوک‌ها و فرم‌های ادمین بدون تغییر کار می‌کنن.

## چیزهایی که ساده‌سازی شدن

- کوکی‌ها دیگه با یک لایه‌ی HMAC اضافه (signed cookie اکسپرس) امضا نمی‌شن؛ چون خود JWT
  از قبل امضا و قابل‌اعتماده، این لایه‌ی اضافه حذف شد و نیازی به `COOKIE_PARSER_SECRET_KEY`
  نیست.
- آدرس عکس‌ها (`avatarUrl`, `coverImageUrl`) به‌جای دامنه‌ی جدا (`SERVER_URL`)، مسیر نسبی
  (`/uploads/...`) هستن، چون فایل‌ها حالا داخل `public/uploads` خود Next.js سرو میشن.

## قبل از اجرا

1. `npm install` (پکیج‌های جدید: mongoose, bcryptjs, jsonwebtoken, joi, http-errors,
   http-status-codes, sanitize-html, slugify, date-fns به package.json اضافه شدن)
2. مقادیر `.env.development` رو چک کنید — `MONGODB_URI` باید به همون دیتابیسی که قبلا
   بک‌اند استفاده می‌کرد وصل بشه (داده‌ها دست‌نخورده می‌مونن، چیزی مهاجرت نمی‌خواد).
3. فایل‌های آپلودی قبلی (آواتارها و کاور پست‌ها) از `backend/uploads` به
   `public/uploads` کپی شدن (۱۳ مگابایت، ۱۳۳ فایل) — همون مسیرهایی که توی دیتابیس
   ذخیره شدن الان دقیقا زیر `public/uploads` قرار دارن.
4. برای دیپلوی روی پروداکشن، `NEXT_PUBLIC_BASE_URL` رو در `.env.production` به
   دامنه‌ی واقعی سایت + `/api` تغییر بدید (چون از سمت سرور خود Next هم به‌عنوان
   self-fetch صدا زده میشه، باید absolute باشه).

## نکته‌ی مهم درباره‌ی آپلود فایل روی هاست

فایل‌ها با `fs.writeFile` مستقیم روی دیسک (`public/uploads`) ذخیره میشن. این روش **فقط
روی هاستی که فایل‌سیستم persistent داره** (مثل یک سرور/کانتینر همیشه‌روشن روی Liara یا
هر VPS) درست کار می‌کنه. اگه بعدا خواستید روی یک پلتفرم serverless (مثل Vercel بدون
دیسک persistent) دیپلوی کنید، باید این بخش رو به یک سرویس آبجکت استوریج (مثل S3 یا
Liara Object Storage) تغییر بدید — چون فایل‌سیستم اونجا موقتیه.

## بک‌اند قدیمی

پوشه‌ی بک‌اند اکسپرس دیگه لازم نیست اجرا بشه. اگه می‌خواید کامل حذفش کنید یا برای مدتی
نگه دارید تا مطمئن بشید همه‌چیز درست کار می‌کنه، به خودتون بستگی داره.
