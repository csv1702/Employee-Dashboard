# MERN Employee Dashboard

Live Demo: https://mern-employee-dashboard.netlify.app/

Demo Video: https://drive.google.com/file/d/1SZaC2wFH5b8_dCAmxsR-ijpkZzBdedLq/view?usp=sharing

A responsive employee dashboard built with React + Vite. It includes login, employee listing, profile details, salary chart, map view, and webcam photo capture.

## Features

- Demo login flow with protected routes
- Employee dashboard from API data
- Employee detail page
- Salary bar chart (Recharts)
- Employee location map (React Leaflet)
- Webcam capture and preview flow

## Demo Credentials

- Username: `testuser`
- Password: `Test123`

## Tech Stack

- React 19
- Vite 7
- React Router
- Zustand
- Axios
- Tailwind CSS 4
- Recharts
- React Leaflet

## Project Structure

```text
mern-employee-dashboard/
|- client/               # React frontend
|- netlify.toml          # Netlify build + SPA redirect config
|- .gitignore
```

## Run Locally

### 1) Install dependencies

```bash
cd client
npm install
```

### 2) Start development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## API

The app currently uses this base URL in `client/src/services/api.js`:

- `https://backend.jotish.in/backend_dev`

If needed, update the API base URL there before deployment.

## Deployment (Netlify)

This repo is already configured for Netlify using `netlify.toml`:

- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: `/* -> /index.html`

Current deployed URL:

- https://mern-employee-dashboard.netlify.app/

## Author

Chandra Shekhar Verma
