# Cara Tools

A minimal Angular 21 application. Calendar functionality will be added later.

## Run locally

Install Node.js 24, then run:

```powershell
npm install
npm start
```

Open the localhost URL shown by Angular. `npm run build` produces the static site in `dist/cara-tools/browser`.

## Publish on GitHub Pages

1. Create a GitHub repository named `cara-tools`.
2. Add that repository as this local Git repository's `origin`, then push `main`.
3. In the GitHub repository, choose **Settings → Pages → Build and deployment → GitHub Actions**.

The workflow builds the app on every push to `main` and publishes the static files. For a normal project repository, the URL is `https://<username>.github.io/cara-tools/`.

This app currently has no routing or user-data storage. If data is added later, browser `localStorage` is usually more suitable than cookies for device-local tool settings; neither provides account sync.
