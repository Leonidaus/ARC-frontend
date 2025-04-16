# ARC Frontend

## Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Leonidaus/ARC-frontend.git
cd ARC-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration:
# - REACT_APP_API_URL
# - REACT_APP_ADMIN_USERNAME
# - REACT_APP_ADMIN_PASSWORD
```

4. Run development server:
```bash
npm start
```

## Development

The app will run on [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API endpoint | `https://api.example.com/dev` |
| `REACT_APP_ADMIN_USERNAME` | Admin login username | `admin` |
| `REACT_APP_ADMIN_PASSWORD` | Admin login password | `password123` |

## Build

To build for production:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Deployment

1. Build the project
2. Upload the `build` folder to your hosting service

## Security Notes

- Never commit `.env` file
- Keep credentials secure
- Change default admin password