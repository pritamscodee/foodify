## Foodify – Vercel Deployment Guide

This app is a **Vite + React** project and can be deployed to Vercel without changing any existing source files. Follow the steps below.

---

### 1. Verify the app builds locally

Run these commands in the `foodify` folder:

```bash
npm install
npm run build
```

If `npm run build` succeeds, you are ready to deploy.

---

### 2. Create `vercel.json` (for SPA routing)

Because this app uses client-side routing (via `react-router`), Vercel should always fall back to `index.html` for unknown routes.  
Create a file named **`vercel.json`** in the root of the `foodify` project (same folder as `package.json`) with this content:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/.*",
      "dest": "/index.html"
    }
  ]
}
```

This tells Vercel to:

- **Build** using `npm run build` (detected automatically for Vite).
- **Serve** static files from the `dist` directory.
- **Fallback** all non-file routes to `index.html` so React Router can handle them.

> Note: Vercel will auto-detect Vite as the framework. The `@vercel/static-build` builder is managed by Vercel; you do **not** need to install it in `package.json`.

---

### 3. Connect the repo to Vercel

1. Go to `https://vercel.com` and log in (or sign up).
2. Click **"Add New…" → "Project"**.
3. Choose your Git provider (GitHub / GitLab / Bitbucket) and **import the `foodify` repo**.
4. On the **project configuration** screen:
   - **Framework Preset**: select **Vite** (if not auto-detected).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

Vercel will install dependencies, run the build, and deploy the `dist` folder as a static site.

---

### 4. Environment variables (if needed)

If your app uses API keys or other secrets:

1. In Vercel, open your project.
2. Go to **Settings → Environment Variables**.
3. Add each variable (for example `VITE_API_URL`) and its value.
4. Redeploy (or trigger a new deploy by pushing a commit).

In Vite, environment variables for the browser must start with `VITE_` and are accessed via `import.meta.env.VITE_YOUR_VAR_NAME`.

---

### 5. Production checks

After deployment:

- Visit the Vercel-provided URL.
- Test **all routes** (including nested ones) to confirm they work and don’t 404.
- If you later add new routes or pages, no extra Vercel changes are needed as long as you keep using client-side routing.

---

### What this guide changed

- No existing code or configuration files were modified.
- All suggested configuration (such as `vercel.json`) is provided **only in this markdown file** so you can copy it manually into your project.

