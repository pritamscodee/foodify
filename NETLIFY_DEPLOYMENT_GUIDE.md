## Foodify – Netlify Deployment Guide

This app is a **Vite + React** project located in the **`foodify/`** subfolder of your repo.  
Below are the steps and config you need to deploy it to **Netlify** without changing any existing source files.

---

### 1. Verify the app builds locally

From the `foodify` folder (the one that contains `package.json`):

```bash
cd foodify
npm install
npm run build
```

If `npm run build` finishes successfully, you are ready to deploy.

---

### 2. Netlify settings for a subfolder project

When you connect the GitHub repo (`pritamscodee/foodify`) to Netlify, the React app lives in the `foodify/` subfolder, so you must set:

- **Base directory**: `foodify`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

Netlify will then:

1. `cd` into `foodify`
2. Run `npm install`
3. Run `npm run build`
4. Serve the static files from `foodify/dist`

---

### 3. SPA routing with `netlify.toml`

Because the app uses client-side routing (via `react-router`), you need a fallback route so that refreshing on any path (e.g. `/menu`, `/cart`) loads `index.html`.

Create a file named **`netlify.toml`** inside the **`foodify/`** folder (same place as `package.json`) with the following content:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

What this does:

- **`[build]`**: tells Netlify to run `npm run build` and publish the `dist` folder.
- **`[[redirects]]`**: redirects every route to `index.html` so React Router can handle it, while still returning status `200`.

> If you set the Netlify UI **Base directory** to `foodify`, the `build.command` and `build.publish` in `netlify.toml` will still be relative to that directory (`dist`).

---

### 4. Connect GitHub repo to Netlify

1. Go to `https://app.netlify.com` and log in or sign up.
2. Click **"Add new site" → "Import an existing project"**.
3. Connect your **GitHub** account and select the repo `pritamscodee/foodify`.
4. In the configuration form:
   - **Base directory**: `foodify`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**.

Netlify will start the first deploy and build your Vite app.

---

### 5. Environment variables (if needed)

If your app needs any environment variables (for APIs, etc.):

1. In Netlify, open your site’s dashboard.
2. Go to **Site settings → Environment variables** (or **Site configuration → Environment** depending on UI version).
3. Add each variable (for example `VITE_API_URL`) and set its value.
4. Trigger a new deploy.

In Vite, browser-exposed environment variables must start with `VITE_` and are accessed as `import.meta.env.VITE_SOME_NAME`.

---

### 6. Production checks

After Netlify finishes deploying:

- Open the Netlify URL (e.g. `https://your-site-name.netlify.app`).
- Navigate through all routes (home, menu, cart, etc.).
- Refresh the page on a non-root route to confirm the SPA redirect (`/* → /index.html`) works.

---

### What this guide changed

- No existing code or config files were modified.
- All Netlify-specific configuration (including the `netlify.toml` contents) is provided **only in this markdown file**, so you can copy it into your project manually.

