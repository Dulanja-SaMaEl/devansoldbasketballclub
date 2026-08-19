# 🚀 GOOGLE SEARCH CONSOLE & SEO SETUP GUIDE
**Website:** Devans Old Basketball Club  
**Production Domain:** `https://olddevansbasketball.com`  

---

## 1. Overview

This document provides step-by-step instructions for site administrators to connect the **Devans Old Basketball Club** platform to Google Search Console, submit the dynamic XML sitemap, monitor search performance, and maintain optimal organic search rankings.

---

## 2. Google Search Console Setup Steps

### Step 1: Add Property in Search Console
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Sign in with the official club Google account (`contact@devansbasketball.lk` or administrator account).
3. Click **Add Property**.
4. Choose **Domain** property type and enter:
   `olddevansbasketball.com`

### Step 2: Domain Verification via Spaceship DNS
1. Copy the **TXT record** provided by Google Search Console (e.g., `google-site-verification=xxxx...`).
2. Log into your **Spaceship Domain Dashboard**.
3. Navigate to **DNS Manager** for `olddevansbasketball.com`.
4. Add a new **TXT Record**:
   * **Host / Name:** `@`
   * **Value:** `google-site-verification=xxxx...`
   * **TTL:** `3600`
5. Save changes and return to Google Search Console. Click **Verify**.

*(Alternative HTML Tag verification method: You can also place the Google verification META tag into `frontend/index.html` or through the Admin Settings panel).*

### Step 3: Submit XML Sitemap
1. In Search Console, select `https://olddevansbasketball.com`.
2. Go to **Indexing** ➔ **Sitemaps** in the left sidebar.
3. In the "Add a new sitemap" field, enter:
   `sitemap.xml`
4. Click **Submit**.
5. Verify that the status shows **"Success"** and that discovered URLs match public pages and detail routes.

### Step 4: Request Immediate Indexing for Primary Pages
1. Use the top **URL Inspection** bar in Search Console.
2. Enter the following URLs one by one:
   * `https://olddevansbasketball.com/`
   * `https://olddevansbasketball.com/history`
   * `https://olddevansbasketball.com/achievements`
   * `https://olddevansbasketball.com/legends`
   * `https://olddevansbasketball.com/generations`
   * `https://olddevansbasketball.com/gallery`
   * `https://olddevansbasketball.com/stories`
   * `https://olddevansbasketball.com/news`
   * `https://olddevansbasketball.com/events`
   * `https://olddevansbasketball.com/about`
   * `https://olddevansbasketball.com/contact`
3. Click **Request Indexing** for each primary URL.

---

## 3. Recommended Monthly SEO Workflow

Follow this monthly routine to maintain search engine health and increase organic impressions:

```text
Google Search Console
        ↓
Performance Tab (Filter: Last 28 Days)
        ↓
Inspect Search Queries & Clicks
        ↓
Identify High-Impression / Low-CTR Keywords
        ↓
Optimize Meta Descriptions & Heading Text in Admin CMS
        ↓
Review Core Web Vitals & Page Indexing Report
```

### Key Metrics to Monitor:
1. **Total Clicks & Total Impressions:** Track growth in organic discovery for terms like "Maliyadeva basketball" or "Devans Old Basketball".
2. **Average CTR (Click-Through Rate):** Aim for > 5% on brand queries and > 2% on sports history queries.
3. **Average Position:** Monitor rankings for key terms.
4. **Page Indexing Status:** Ensure zero "Not Indexed" errors exist for valid public pages.
5. **Core Web Vitals:** Confirm LCP (Largest Contentful Paint) remains under 2.5s and CLS (Cumulative Layout Shift) stays under 0.1.

---

## 4. Robots & Sitemap Locations

* **Robots.txt:** `https://olddevansbasketball.com/robots.txt`
* **XML Sitemap:** `https://olddevansbasketball.com/sitemap.xml`
* **Admin Disallow:** `/admin`, `/api` are automatically blocked from indexing.
