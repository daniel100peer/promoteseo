---
layout: page
title: "Core Web Vitals: Google's Page Experience Metrics"
title_he: "Core Web Vitals: מדדי חוויית הדף של Google"
description: "Core Web Vitals measure loading speed, interactivity, and visual stability through LCP, INP, and CLS. Learn the current thresholds, optimization techniques, measurement tools, and how these metrics affect search rankings."
description_he: "Core Web Vitals מודדים מהירות טעינה, אינטראקטיביות ויציבות ויזואלית באמצעות LCP, INP ו-CLS. למדו את הסף הנוכחי, טכניקות אופטימיזציה, כלי מדידה וכיצד מדדים אלה משפיעים על דירוגי חיפוש."
permalink: /core-web-vitals/
---

<div class="content-en" markdown="1">

Core Web Vitals are a set of three specific metrics that Google uses to evaluate the real-world user experience of every web page. They measure loading performance, interactivity, and visual stability. Since their introduction as a ranking signal, these metrics have become a non-negotiable part of [technical SEO](../technical-seo/) and [website optimization](../website-optimization/). Understanding what they measure, where the thresholds sit, and how to improve each one determines whether your site passes or fails Google's page experience assessment.

## The Three Metrics

Google currently tracks three Core Web Vitals. Each metric targets a distinct aspect of user experience, and each has three performance bands: good, needs improvement, and poor.

### Largest Contentful Paint (LCP)

LCP measures loading performance. Specifically, it records the time from when the user initiates a page load to when the largest visible content element finishes rendering in the viewport. That element is typically a hero image, a video poster, or a large block of text. LCP captures what users perceive as the page being ready.

**Thresholds:** A good score is 2.5 seconds or less. Between 2.5 and 4.0 seconds needs improvement. Anything above 4.0 seconds is poor.

LCP is the hardest individual metric to pass. Only 67.6% of origins achieve a good LCP score, making it the most common bottleneck for sites trying to pass all three metrics.

### Interaction to Next Paint (INP)

INP measures responsiveness. It tracks every interaction a user makes with the page throughout its entire lifecycle, including clicks, taps, and keyboard inputs, and reports the worst-case latency (with outliers excluded). The measurement includes three phases: input delay (time before the event handler runs), processing time (time to execute the event handler), and presentation delay (time for the browser to paint the visual update).

**Thresholds:** A good score is 200 milliseconds or less. Between 200 and 500 milliseconds needs improvement. Anything above 500 milliseconds is poor.

INP replaced First Input Delay (FID) as an official Core Web Vital on March 12, 2024. The change was significant. FID only measured the delay of the first interaction on a page and ignored processing time entirely. INP captures every interaction and includes the full pipeline from input to visual update. The transition caused approximately a 5% drop in mobile pass rates, as pages that passed FID by handling the first click quickly but struggled with subsequent interactions were newly exposed. At the origin level, 85.6% of sites currently pass INP.

### Cumulative Layout Shift (CLS)

CLS measures visual stability. It quantifies how much page content shifts unexpectedly during the loading process. Every time a visible element moves from one rendered frame to the next without being triggered by user input, a layout shift score is calculated based on the fraction of the viewport affected and the distance the element moved. CLS aggregates the worst window of layout shifts during the page session.

**Thresholds:** A good score is 0.1 or less. Between 0.1 and 0.25 needs improvement. Anything above 0.25 is poor.

Layout shifts frustrate users because they cause misclicks, lost reading position, and a general sense that the page is unreliable. The most common causes are images without explicit dimensions, dynamically injected advertisements, and web fonts that trigger text reflow.

## How Core Web Vitals Affect Rankings

Core Web Vitals are a confirmed [Google ranking factor](../google-ranking-factors/), but their weight is modest relative to content relevance and backlink authority. They function primarily as a tiebreaker. When two pages are equally relevant to a query and equally authoritative, the one with better page experience metrics will rank higher.

The data supports this. Pages in position 1 are approximately 10% more likely to pass all three Core Web Vitals than pages in position 9. The correlation is real but not dominant. However, during major [algorithm updates](../google-algorithm-updates/), poor Core Web Vitals amplify losses. Sites with failing metrics experienced 20-30% more severe traffic drops during Google's December 2025 core update compared to sites with passing scores.

The practical takeaway: Core Web Vitals will not single-handedly push a mediocre page to the top of results, but they protect strong pages from unnecessary ranking erosion and give an edge when competing against equally relevant content.

## Current Pass Rates

Overall pass rates remain below 60%. On desktop, 57.1% of origins pass all three Core Web Vitals. On mobile, that number drops to 49.7%. The gap exists because mobile devices have weaker processors, slower network connections, and smaller viewports that amplify layout shift issues.

WordPress sites fare worse. Only 44% of WordPress sites on mobile pass all three metrics. The gap stems from theme bloat, plugin overhead, and render-blocking resources that are common in the WordPress ecosystem.

## Business Impact Beyond Rankings

The performance benefits of passing Core Web Vitals extend well beyond [SEO](../seo/) rankings. Sites that pass all three metrics see 24% lower bounce rates on average. In retail, a 0.1-second improvement in page load time has been shown to boost conversion rates by 8.4% and average order value by 9.2%.

Case studies reinforce the pattern. Rakuten 24, a major Japanese e-commerce platform, improved their Core Web Vitals and recorded a 53% increase in revenue per visitor alongside a 33% improvement in conversion rate. These are not marginal gains. For any site where revenue depends on user engagement, Core Web Vitals optimization has direct financial returns.

## Measuring Core Web Vitals

### Field Data vs. Lab Data

Google uses field data (real user measurements) to determine Core Web Vitals scores for ranking purposes. The Chrome User Experience Report (CrUX) collects field data from opted-in Chrome users and reports the 75th percentile over a rolling 28-day window. This means your ranking assessment reflects the experience of actual visitors to your site, not synthetic tests.

Lab data, generated by tools like Lighthouse, simulates page loads under controlled conditions. Lab data is valuable for debugging specific performance issues but does not directly influence rankings. One critical distinction: INP cannot be measured in a lab environment because it requires real user interactions across the full page lifecycle.

### Tools for Measurement

**PageSpeed Insights** combines both field data (from CrUX) and lab data (from Lighthouse) for any public URL. It is the single most useful tool for a quick Core Web Vitals assessment because it shows both what real users experience and what specific technical issues to fix.

**Google Search Console Core Web Vitals Report** provides a site-wide view of CWV performance, grouping URLs by status (good, needs improvement, poor) and identifying which metric is failing for each group. This is the best starting point for a systematic [SEO audit](../seo-audit/) of page experience.

**Chrome DevTools Performance Panel** allows detailed profiling of page load and interaction behavior. Following the deprecation of the Web Vitals browser extension in February 2025, the Performance panel in DevTools became the primary local debugging tool for Core Web Vitals issues.

**Lighthouse** runs automated audits against a local or staging instance. It measures LCP and CLS in lab conditions and provides actionable recommendations. It cannot measure INP directly but identifies long tasks and JavaScript execution patterns that contribute to poor INP.

**CrUX Dashboard and API** provide programmatic access to field data for trend analysis across time. The dashboard is useful for tracking whether optimization efforts are moving the 28-day rolling p75 in the right direction.

## Optimizing LCP

LCP failures are almost always caused by slow resource delivery or render-blocking dependencies. The optimization path focuses on getting the largest content element visible as quickly as possible.

**Preload the LCP resource.** If the LCP element is an image, use `<link rel="preload">` to tell the browser to fetch it before it discovers the element in the HTML. This eliminates the delay between HTML parsing and image download.

**Inline critical CSS.** Render-blocking stylesheets delay LCP because the browser will not paint content until CSS is loaded and parsed. Inline the CSS required for above-the-fold content and defer the rest.

**Use modern image formats.** WebP and AVIF deliver significantly smaller file sizes than JPEG or PNG at equivalent quality. Smaller files transfer faster, directly reducing LCP.

**Do not lazy-load the LCP element.** Lazy loading delays image fetching until the element enters the viewport. For the LCP element, which is typically above the fold, lazy loading adds unnecessary delay.

**Implement server-side rendering.** Client-side rendered pages require JavaScript to execute before content appears. SSR delivers fully rendered HTML in the initial response, allowing LCP to occur without waiting for JavaScript frameworks to bootstrap.

**Use a CDN.** Serving assets from geographically distributed edge servers reduces network latency. This directly improves Time to First Byte, which is a prerequisite for fast LCP.

**Preload fonts.** If the LCP element is text styled with a web font, preload the font file to avoid invisible text or font-swap layout shifts.

## Optimizing INP

INP optimization targets the responsiveness of event handlers and the browser's ability to paint updates quickly after user interaction.

**Break long tasks.** Any JavaScript task that runs longer than 50 milliseconds blocks the main thread and delays input processing. Break heavy computations into smaller chunks using `requestIdleCallback`, `setTimeout`, or the newer `scheduler.yield()` API.

**Yield to the main thread.** After processing critical logic in an event handler, yield control back to the browser so it can paint the visual update before continuing non-essential work. This reduces presentation delay.

**Optimize event handlers.** Minimize the work performed inside click, tap, and keyboard event handlers. Defer non-visual work like analytics calls and state synchronization to after the visual update.

**Reduce DOM size.** Large DOM trees increase the time the browser needs to recalculate styles and perform layout after state changes. Keeping the DOM under 1,500 elements significantly improves interaction responsiveness.

**Minimize third-party scripts.** Advertising, analytics, and social media scripts compete for main thread time. Audit third-party scripts regularly and remove or defer those that are not essential.

## Optimizing CLS

CLS optimization is fundamentally about reserving space for dynamic content before it arrives.

**Set explicit dimensions on images and videos.** The `width` and `height` attributes (or CSS `aspect-ratio`) allow the browser to allocate the correct amount of space before the media file loads. Without them, content below the media shifts when the file arrives.

**Reserve space for ads and embeds.** Advertising slots and third-party embeds are among the most common causes of layout shift. Use CSS `min-height` on their containers to prevent content displacement when the ad loads.

**Use font-display: swap or optional.** Web fonts that block rendering cause layout shifts when the fallback font is replaced by the web font. The `swap` value shows fallback text immediately and swaps when the font loads. The `optional` value only uses the web font if it loads very quickly, eliminating the shift entirely.

**Avoid injecting content above the fold.** Banners, notification bars, and cookie consent overlays that push page content down after initial render cause significant layout shifts. If these elements are necessary, reserve their space in the initial layout or use overlay positioning that does not displace other content.

## Core Web Vitals and Mobile SEO

[Mobile SEO](../mobile-seo/) is where Core Web Vitals matter most. Mobile devices have less processing power, more variable network conditions, and smaller viewports where layout shifts are more disruptive. The 7.4-percentage-point gap between desktop (57.1%) and mobile (49.7%) pass rates reflects these challenges.

Given that Google uses mobile-first indexing, the mobile Core Web Vitals scores are what matter for ranking. Desktop performance is irrelevant if mobile performance fails. Every optimization effort should be tested and validated on mobile devices and throttled network conditions.

## Integrating Core Web Vitals into SEO Workflow

Core Web Vitals monitoring should be a standing component of [SEO reporting and analytics](../seo-reporting-analytics/). Use the [SEO tools](../seo-tools/) that connect to CrUX field data to track trends over time. Include CWV checks in every [SEO audit](../seo-audit/). When evaluating [competitors](../seo-competitor-analysis/), compare their Core Web Vitals scores against yours to identify where page experience might be creating a ranking gap.

Treat Core Web Vitals not as a one-time fix but as a performance standard that requires ongoing maintenance. Every new feature, ad placement, or third-party script has the potential to regress metrics. Continuous monitoring catches regressions before they compound into ranking losses.

## Sources

- [web.dev -- Core Web Vitals](https://web.dev/articles/vitals) -- Google's official documentation on Core Web Vitals definitions, thresholds, and measurement guidance.
- [Google Search Central -- Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) -- Search-specific guidance on how Core Web Vitals factor into page experience ranking.
- [DebugBear -- 2025 in Web Performance Review](https://www.debugbear.com/blog/2025-in-web-performance) -- Annual review of web performance trends including pass rate data and the INP transition impact.
- [Digital Applied -- Core Web Vitals 2026 Optimization Guide](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide) -- Comprehensive optimization strategies for all three metrics with current best practices.
- [NitroPack -- Most Important Core Web Vitals Metrics 2026](https://nitropack.io/blog/most-important-core-web-vitals-metrics/) -- Analysis of metric importance, business impact statistics, and pass rate benchmarks.
- [Hostingstep -- Core Web Vitals Stats](https://hostingstep.com/core-web-vitals-stats/) -- Statistical overview of Core Web Vitals pass rates across platforms and devices.

</div>

<div class="content-he" markdown="1">

Core Web Vitals הם קבוצה של שלושה מדדים ספציפיים שבהם Google משתמש כדי להעריך את חוויית המשתמש בעולם האמיתי של כל דף אינטרנט. הם מודדים ביצועי טעינה, אינטראקטיביות ויציבות ויזואלית. מאז שהוצגו כאות דירוג, מדדים אלה הפכו לחלק בלתי נפרד מ[SEO טכני](../technical-seo/) ו[אופטימיזציית אתרים](../website-optimization/). הבנת מה הם מודדים, היכן נמצאים ספי הביצועים וכיצד לשפר כל אחד מהם קובעת אם האתר שלכם עובר או נכשל בהערכת חוויית הדף של Google.

## שלושת המדדים

Google עוקב כיום אחר שלושה Core Web Vitals. כל מדד מתמקד בהיבט שונה של חוויית המשתמש, ולכל אחד שלוש רמות ביצועים: טוב, דורש שיפור וגרוע.

### Largest Contentful Paint (LCP)

LCP מודד ביצועי טעינה. באופן ספציפי, הוא מתעד את הזמן מרגע שהמשתמש מתחיל טעינת דף ועד שאלמנט התוכן הגלוי הגדול ביותר מסיים רינדור בתוך חלון הצפייה. אלמנט זה הוא בדרך כלל תמונת hero, פוסטר וידאו או בלוק טקסט גדול. LCP לוכד את מה שהמשתמשים תופסים כרגע שבו הדף מוכן.

**ספים:** ציון טוב הוא 2.5 שניות או פחות. בין 2.5 ל-4.0 שניות דורש שיפור. מעל 4.0 שניות נחשב גרוע.

LCP הוא המדד הבודד הקשה ביותר לעבור. רק 67.6% מהמקורות משיגים ציון LCP טוב, מה שהופך אותו לצוואר הבקבוק הנפוץ ביותר עבור אתרים שמנסים לעבור את כל שלושת המדדים.

### Interaction to Next Paint (INP)

INP מודד תגובתיות. הוא עוקב אחר כל אינטראקציה שהמשתמש מבצע עם הדף לאורך כל מחזור החיים שלו, כולל לחיצות, הקשות וקלטי מקלדת, ומדווח על ההשהיה הגרועה ביותר (עם הסרת ערכים חריגים). המדידה כוללת שלושה שלבים: עיכוב קלט (זמן לפני שהמטפל באירוע מתחיל לרוץ), זמן עיבוד (זמן לביצוע המטפל באירוע) ועיכוב הצגה (זמן שלוקח לדפדפן לצייר את העדכון החזותי).

**ספים:** ציון טוב הוא 200 מילישניות או פחות. בין 200 ל-500 מילישניות דורש שיפור. מעל 500 מילישניות נחשב גרוע.

INP החליף את First Input Delay (FID) כ-Core Web Vital רשמי ב-12 במרץ 2024. השינוי היה משמעותי. FID מדד רק את העיכוב של האינטראקציה הראשונה בדף והתעלם מזמן העיבוד לחלוטין. INP לוכד כל אינטראקציה וכולל את הצינור המלא מקלט ועד עדכון חזותי. המעבר גרם לירידה של כ-5% בשיעורי העברה במובייל, כאשר דפים שעברו FID בזכות טיפול מהיר בלחיצה הראשונה אך התקשו עם אינטראקציות עוקבות נחשפו לראשונה. ברמת המקור, 85.6% מהאתרים עוברים כיום INP.

### Cumulative Layout Shift (CLS)

CLS מודד יציבות ויזואלית. הוא מכמת כמה תוכן הדף זז באופן בלתי צפוי במהלך תהליך הטעינה. בכל פעם שאלמנט גלוי זז ממסגרת רינדור אחת לאחרת ללא הפעלה על ידי קלט משתמש, מחושב ציון הזזת פריסה על בסיס החלק של חלון הצפייה שהושפע והמרחק שהאלמנט נע. CLS מצרף את חלון ההזזות הגרוע ביותר במהלך הפגישה בדף.

**ספים:** ציון טוב הוא 0.1 או פחות. בין 0.1 ל-0.25 דורש שיפור. מעל 0.25 נחשב גרוע.

הזזות פריסה מתסכלות משתמשים כי הן גורמות ללחיצות שגויות, אובדן מיקום קריאה ותחושה כללית שהדף אינו אמין. הגורמים הנפוצים ביותר הם תמונות ללא מידות מפורשות, פרסומות שמוזרקות באופן דינמי וגופנים באינטרנט שגורמים לזרימה מחדש של טקסט.

## כיצד Core Web Vitals משפיעים על דירוגים

Core Web Vitals הם [גורם דירוג](../google-ranking-factors/) מאושר של Google, אך המשקל שלהם צנוע ביחס לרלוונטיות תוכן וסמכות קישורים נכנסים. הם מתפקדים בעיקר כשובר שוויון. כאשר שני דפים רלוונטיים באותה מידה לשאילתה ובעלי סמכות שווה, זה עם מדדי חוויית דף טובים יותר ידורג גבוה יותר.

הנתונים תומכים בכך. דפים במיקום 1 הם בערך 10% יותר סבירים לעבור את כל שלושת ה-Core Web Vitals מאשר דפים במיקום 9. המתאם אמיתי אך לא דומיננטי. עם זאת, במהלך [עדכוני אלגוריתם](../google-algorithm-updates/) גדולים, Core Web Vitals גרועים מגבירים הפסדים. אתרים עם מדדים כושלים חוו ירידות תנועה חמורות ב-20-30% יותר במהלך עדכון הליבה של Google בדצמבר 2025 בהשוואה לאתרים עם ציונים עוברים.

המסקנה המעשית: Core Web Vitals לא ידחפו לבד דף בינוני לראש התוצאות, אך הם מגנים על דפים חזקים מפני שחיקת דירוג מיותרת ונותנים יתרון כשמתחרים מול תוכן רלוונטי באותה מידה.

## שיעורי עברה נוכחיים

שיעורי העברה הכוללים נשארים מתחת ל-60%. בדסקטופ, 57.1% מהמקורות עוברים את כל שלושת ה-Core Web Vitals. במובייל, המספר יורד ל-49.7%. הפער קיים כי מכשירים ניידים בעלי מעבדים חלשים יותר, חיבורי רשת משתנים יותר וחלונות צפייה קטנים יותר שבהם הזזות פריסה מפריעות יותר.

אתרי WordPress בעלי ביצועים גרועים יותר. רק 44% מאתרי WordPress במובייל עוברים את כל שלושת המדדים. הפער נובע מנפח תבניות, עומס תוספים ומשאבים חוסמי רינדור שנפוצים באקוסיסטם של WordPress.

## השפעה עסקית מעבר לדירוגים

יתרונות הביצועים של עמידה ב-Core Web Vitals חורגים הרבה מעבר לדירוגי [SEO](../seo/). אתרים שעוברים את כל שלושת המדדים רואים שיעורי נטישה נמוכים ב-24% בממוצע. בקמעונאות, שיפור של 0.1 שניות בזמן טעינת הדף הוכח כמגביר שיעורי המרה ב-8.4% וערך הזמנה ממוצע ב-9.2%.

מקרי בוחן מחזקים את הדפוס. Rakuten 24, פלטפורמת מסחר אלקטרוני יפנית גדולה, שיפרה את ה-Core Web Vitals שלה ורשמה עלייה של 53% בהכנסה למבקר לצד שיפור של 33% בשיעור ההמרה. אלה אינם רווחים שוליים. עבור כל אתר שבו ההכנסה תלויה במעורבות משתמשים, לאופטימיזציית Core Web Vitals יש תשואות כלכליות ישירות.

## מדידת Core Web Vitals

### נתוני שדה לעומת נתוני מעבדה

Google משתמש בנתוני שדה (מדידות משתמשים אמיתיים) כדי לקבוע ציוני Core Web Vitals לצורך דירוג. דוח חוויית המשתמש של Chrome (CrUX) אוסף נתוני שדה ממשתמשי Chrome שהסכימו ומדווח על האחוזון ה-75 על פני חלון מתגלגל של 28 יום. משמעות הדבר שהערכת הדירוג שלכם משקפת את החוויה של מבקרים אמיתיים באתר שלכם, לא בדיקות סינתטיות.

נתוני מעבדה, שנוצרים על ידי כלים כמו Lighthouse, מדמים טעינות דפים בתנאים מבוקרים. נתוני מעבדה חשובים לאיתור באגים בבעיות ביצועים ספציפיות אך אינם משפיעים ישירות על דירוגים. הבחנה קריטית אחת: INP לא ניתן למדידה בסביבת מעבדה כי הוא דורש אינטראקציות משתמש אמיתיות לאורך כל מחזור החיים של הדף.

### כלי מדידה

**PageSpeed Insights** משלב גם נתוני שדה (מ-CrUX) וגם נתוני מעבדה (מ-Lighthouse) עבור כל URL ציבורי. זהו הכלי השימושי ביותר להערכה מהירה של Core Web Vitals כי הוא מראה גם מה משתמשים אמיתיים חווים וגם אילו בעיות טכניות ספציפיות לתקן.

**דוח Core Web Vitals ב-Google Search Console** מספק תצוגה כוללת של ביצועי CWV ברחבי האתר, מקבץ כתובות URL לפי סטטוס (טוב, דורש שיפור, גרוע) ומזהה איזה מדד נכשל לכל קבוצה. זאת נקודת ההתחלה הטובה ביותר ל[ביקורת SEO](../seo-audit/) שיטתית של חוויית דף.

**פאנל הביצועים ב-Chrome DevTools** מאפשר פרופילינג מפורט של טעינת דף והתנהגות אינטראקציה. לאחר ההוצאה משימוש של תוסף Web Vitals לדפדפן בפברואר 2025, פאנל הביצועים ב-DevTools הפך לכלי ניפוי הבאגים המקומי העיקרי עבור בעיות Core Web Vitals.

**Lighthouse** מריץ ביקורות אוטומטיות כנגד מופע מקומי או staging. הוא מודד LCP ו-CLS בתנאי מעבדה ומספק המלצות מעשיות. הוא לא יכול למדוד INP ישירות אך מזהה משימות ארוכות ודפוסי ביצוע JavaScript שתורמים ל-INP גרוע.

**לוח הבקרה וה-API של CrUX** מספקים גישה פרוגרמטית לנתוני שדה לניתוח מגמות לאורך זמן. לוח הבקרה שימושי למעקב אחר האם מאמצי אופטימיזציה מזיזים את האחוזון ה-75 המתגלגל של 28 יום בכיוון הנכון.

## אופטימיזציית LCP

כשלונות LCP נגרמים כמעט תמיד על ידי מסירת משאבים איטית או תלויות חוסמות רינדור. נתיב האופטימיזציה מתמקד בהפיכת אלמנט התוכן הגדול ביותר לגלוי מהר ככל האפשר.

**טעינה מוקדמת של משאב ה-LCP.** אם אלמנט ה-LCP הוא תמונה, השתמשו ב-`<link rel="preload">` כדי להורות לדפדפן לאחזר אותו לפני שהוא מגלה את האלמנט ב-HTML. זה מבטל את העיכוב בין ניתוח HTML להורדת התמונה.

**הטמעת CSS קריטי.** גיליונות סגנון חוסמי רינדור מעכבים LCP כי הדפדפן לא יצייר תוכן עד שה-CSS נטען ומנותח. הטמיעו את ה-CSS הנדרש לתוכן מעל הקפל ודחו את השאר.

**שימוש בפורמטי תמונה מודרניים.** WebP ו-AVIF מספקים קבצים קטנים משמעותית מ-JPEG או PNG באיכות שוות ערך. קבצים קטנים יותר מועברים מהר יותר, מה שמפחית ישירות את ה-LCP.

**אל תטענו עצלנית את אלמנט ה-LCP.** טעינה עצלנית מעכבת את אחזור התמונה עד שהאלמנט נכנס לחלון הצפייה. עבור אלמנט ה-LCP, שנמצא בדרך כלל מעל הקפל, טעינה עצלנית מוסיפה עיכוב מיותר.

**הטמיעו רינדור בצד השרת.** דפים עם רינדור בצד הלקוח דורשים הפעלת JavaScript לפני שתוכן מופיע. SSR מספק HTML מרונדר מלא בתגובה הראשונית, מה שמאפשר ל-LCP להתרחש ללא המתנה לאתחול מסגרות JavaScript.

**השתמשו ב-CDN.** הגשת נכסים משרתי קצה מבוזרים גיאוגרפית מפחיתה השהיית רשת. זה משפר ישירות את Time to First Byte, שהוא תנאי מוקדם ל-LCP מהיר.

**טעינה מוקדמת של גופנים.** אם אלמנט ה-LCP הוא טקסט מעוצב בגופן אינטרנט, טענו מראש את קובץ הגופן כדי להימנע מטקסט בלתי נראה או הזזות פריסה בהחלפת גופן.

## אופטימיזציית INP

אופטימיזציית INP מכוונת לתגובתיות של מטפלי אירועים וליכולת הדפדפן לצייר עדכונים במהירות לאחר אינטראקציית משתמש.

**פירוק משימות ארוכות.** כל משימת JavaScript שרצה יותר מ-50 מילישניות חוסמת את ה-thread הראשי ומעכבת עיבוד קלט. פרקו חישובים כבדים לחלקים קטנים יותר באמצעות `requestIdleCallback`, `setTimeout` או ה-API החדש יותר `scheduler.yield()`.

**ויתור ל-thread הראשי.** לאחר עיבוד לוגיקה קריטית במטפל אירוע, העבירו שליטה חזרה לדפדפן כדי שיוכל לצייר את העדכון החזותי לפני המשך עבודה לא חיונית. זה מפחית עיכוב הצגה.

**אופטימיזציית מטפלי אירועים.** צמצמו את העבודה המבוצעת בתוך מטפלי אירועי לחיצה, הקשה ומקלדת. דחו עבודה לא חזותית כמו קריאות אנליטיקה וסנכרון מצב לאחר העדכון החזותי.

**הקטנת גודל ה-DOM.** עצי DOM גדולים מגדילים את הזמן שהדפדפן צריך לחישוב מחדש של סגנונות וביצוע פריסה לאחר שינויי מצב. שמירה על DOM מתחת ל-1,500 אלמנטים משפרת משמעותית את תגובתיות האינטראקציה.

**צמצום סקריפטים של צד שלישי.** סקריפטים של פרסום, אנליטיקה ומדיה חברתית מתחרים על זמן ה-thread הראשי. בדקו סקריפטים של צד שלישי באופן קבוע והסירו או דחו את אלה שאינם חיוניים.

## אופטימיזציית CLS

אופטימיזציית CLS מבוססת באופן יסודי על שמירת מקום לתוכן דינמי לפני שהוא מגיע.

**הגדרת מידות מפורשות לתמונות וסרטונים.** תכונות `width` ו-`height` (או CSS `aspect-ratio`) מאפשרות לדפדפן להקצות את הכמות הנכונה של מקום לפני שקובץ המדיה נטען. בלעדיהם, תוכן מתחת למדיה זז כשהקובץ מגיע.

**שמירת מקום לפרסומות והטמעות.** חריצי פרסום והטמעות צד שלישי הם בין הגורמים הנפוצים ביותר להזזת פריסה. השתמשו ב-CSS `min-height` על הקונטיינרים שלהם כדי למנוע הזזת תוכן כשהפרסומת נטענת.

**שימוש ב-font-display: swap או optional.** גופני אינטרנט שחוסמים רינדור גורמים להזזות פריסה כשגופן ה-fallback מוחלף בגופן האינטרנט. הערך `swap` מציג טקסט fallback מיד ומחליף כשהגופן נטען. הערך `optional` משתמש בגופן האינטרנט רק אם הוא נטען מהר מאוד, מה שמבטל את ההזזה לחלוטין.

**הימנעו מהזרקת תוכן מעל הקפל.** באנרים, סרגלי התראות וחלונות הסכמת עוגיות שדוחפים תוכן דף למטה לאחר הרינדור הראשוני גורמים להזזות פריסה משמעותיות. אם אלמנטים אלה נחוצים, שמרו את מקומם בפריסה הראשונית או השתמשו במיקום שכבת-על שאינו מזיז תוכן אחר.

## Core Web Vitals ו-SEO למובייל

[SEO למובייל](../mobile-seo/) הוא המקום שבו Core Web Vitals חשובים ביותר. למכשירים ניידים כוח עיבוד נמוך יותר, תנאי רשת משתנים יותר וחלונות צפייה קטנים יותר שבהם הזזות פריסה מפריעות יותר. הפער של 7.4 נקודות אחוז בין דסקטופ (57.1%) למובייל (49.7%) בשיעורי העברה משקף אתגרים אלה.

בהתחשב בכך ש-Google משתמש באינדוקס mobile-first, ציוני ה-Core Web Vitals במובייל הם מה שחשוב לדירוג. ביצועי דסקטופ אינם רלוונטיים אם ביצועי המובייל נכשלים. כל מאמץ אופטימיזציה צריך להיבדק ולהיות מאומת במכשירים ניידים ובתנאי רשת מוגבלים.

## שילוב Core Web Vitals בתהליך העבודה של SEO

ניטור Core Web Vitals צריך להיות מרכיב קבוע ב[דיווח וניתוח SEO](../seo-reporting-analytics/). השתמשו ב[כלי SEO](../seo-tools/) שמתחברים לנתוני שדה של CrUX כדי לעקוב אחר מגמות לאורך זמן. כללו בדיקות CWV בכל [ביקורת SEO](../seo-audit/). בעת הערכת [מתחרים](../seo-competitor-analysis/), השוו את ציוני ה-Core Web Vitals שלהם מול שלכם כדי לזהות היכן חוויית דף עשויה ליצור פער דירוג.

התייחסו ל-Core Web Vitals לא כתיקון חד-פעמי אלא כסטנדרט ביצועים שדורש תחזוקה מתמשכת. כל תכונה חדשה, מיקום פרסומת או סקריפט צד שלישי עלולים לגרום לנסיגה במדדים. ניטור מתמשך תופס נסיגות לפני שהן מצטברות להפסדי דירוג.

## מקורות

- [web.dev -- Core Web Vitals](https://web.dev/articles/vitals) -- התיעוד הרשמי של Google על הגדרות Core Web Vitals, ספים והנחיות מדידה.
- [Google Search Central -- Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) -- הנחיות ספציפיות לחיפוש על אופן השפעת Core Web Vitals על דירוג חוויית דף.
- [DebugBear -- 2025 in Web Performance Review](https://www.debugbear.com/blog/2025-in-web-performance) -- סקירה שנתית של מגמות ביצועי אינטרנט כולל נתוני שיעורי עברה והשפעת מעבר ל-INP.
- [Digital Applied -- Core Web Vitals 2026 Optimization Guide](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide) -- אסטרטגיות אופטימיזציה מקיפות לכל שלושת המדדים עם שיטות עבודה מומלצות נוכחיות.
- [NitroPack -- Most Important Core Web Vitals Metrics 2026](https://nitropack.io/blog/most-important-core-web-vitals-metrics/) -- ניתוח חשיבות מדדים, סטטיסטיקות השפעה עסקית ומדדי שיעורי עברה.
- [Hostingstep -- Core Web Vitals Stats](https://hostingstep.com/core-web-vitals-stats/) -- סקירה סטטיסטית של שיעורי עברה של Core Web Vitals בפלטפורמות ומכשירים שונים.

</div>
