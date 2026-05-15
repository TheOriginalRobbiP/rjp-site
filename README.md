# rjp.digital

Personal portfolio site for a web developer specializing in Astro.js and legacy site modernization.

## Tech Stack

- **Framework:** [Astro 5](https://astro.build)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com)
- **Deployment:** Docker + nginx (optimized for Dokploy)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is configured for Docker-based deployment via Dokploy.

### Docker Build

```bash
# Build the image
docker build -t rjp-digital .

# Run locally
docker run -p 8080:80 rjp-digital
```

Then visit `http://localhost:8080`

### Dokploy Setup

1. Push this repo to GitHub/GitLab
2. In Dokploy, create a new Docker application
3. Connect your Git repository
4. Set port to `80`
5. Deploy

## Project Structure

```
/
├── public/
│   └── images/
│       └── hero.jpg        # Hero background image
├── src/
│   ├── components/         # Astro components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   └── styles/
│       └── global.css      # Theme configuration
├── Dockerfile              # Multi-stage Docker build
├── nginx.conf              # Production nginx config
└── package.json
```

## License

All rights reserved.
