# Cost Katana Documentation - React Version

A beautiful, modern documentation site built with React 18 and TailwindCSS 3.3 for Cost Katana - the world's first AI-powered cost optimization platform.

## 🚀 Features

- **⚡ Lightning Fast**: Built with Vite for instant HMR and optimized builds
- **🎨 Beautiful UI**: Modern design with TailwindCSS 3.3
- **🌙 Dark Mode**: Automatic dark mode support with system preference detection
- **📱 Responsive**: Mobile-first design that works on all devices
- **🔍 Smart Search**: Fuzzy search powered by Fuse.js with keyboard shortcuts
- **📝 Markdown Support**: Full markdown rendering with syntax highlighting
- **✨ Animations**: Smooth transitions with Framer Motion
- **🎯 SEO Optimized**: React Helmet for meta tags and SEO
- **📊 Code Highlighting**: Beautiful code blocks with copy functionality
- **🔥 Hot Toast**: Elegant notifications with react-hot-toast

## 🛠️ Tech Stack

- **React 18**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **TailwindCSS 3.3**: Utility-first CSS framework
- **Vite**: Next generation frontend tooling
- **React Router v6**: Client-side routing
- **Framer Motion**: Production-ready animations
- **React Markdown**: Markdown rendering with plugins
- **Fuse.js**: Lightweight fuzzy-search library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
docs/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx       # Main layout with sidebar
│   │   ├── SearchModal.tsx  # Global search functionality
│   │   ├── MarkdownContent.tsx # Markdown renderer
│   │   └── ...
│   ├── pages/              # Documentation pages
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── getting-started/ # Getting started section
│   │   ├── features/       # Features documentation
│   │   ├── api/           # API documentation
│   │   └── ...
│   ├── utils/             # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
├── tailwind.config.js   # Tailwind configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies and scripts
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom primary colors
      }
    }
  }
}
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/Layout.tsx`

### Markdown Content

Pages can use embedded markdown or load from external files:

```typescript
import MarkdownContent from '../components/MarkdownContent';

const MyPage = () => {
  const content = `# My Documentation`;
  return <MarkdownContent content={content} />;
};
```

## 🔥 Key Features

### Dark Mode
- Automatic system preference detection
- Manual toggle in header
- Persisted in localStorage

### Search (⌘K)
- Global fuzzy search
- Keyboard navigation
- Instant results
- Categories and filtering

### Code Blocks
- Syntax highlighting for multiple languages
- One-click copy functionality
- Dark theme for better readability

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly navigation
- Optimized for all screen sizes

## 📱 Mobile Experience

- Hamburger menu for navigation
- Swipe gestures support
- Optimized touch targets
- Fast loading on mobile networks

## 🚀 Performance

- Code splitting with React.lazy
- Route-based chunking
- Optimized images
- Minimal bundle size
- Fast initial load

## 🔧 Development

```bash
# Run development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## 📈 SEO & Meta Tags

Each page includes:
- Custom title and description
- Open Graph tags
- Twitter cards
- Canonical URLs
- Structured data

## 🌐 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Netlify
```bash
netlify deploy --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Credits

Built with ❤️ by the Cost Katana team

---

## 🔗 Links

- **Website**: [costkatana.com](https://costkatana.com)
- **GitHub**: [github.com/Hypothesize-Tech/cost-katana](https://github.com/Hypothesize-Tech/cost-katana)
- **Support**: abdul@hypothesize.tech
