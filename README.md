# Swami Ji Official Website 🕉️

A beautiful, spiritual website for an Indian Swami Ji/Saint/Guruji built with Next.js, featuring parallax design, text micro animations, and multi-lingual support (English & Hindi).

## 🎨 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **CLEAN Architecture**: Separation of concerns with Domain, Application, Infrastructure, and Presentation layers
- **State Management**: Redux Toolkit for global state
- **Multi-lingual**: Full support for English (EN) and Hindi (HI) with i18next
- **Parallax Design**: Smooth scrolling effects with Framer Motion
- **Text Animations**: Beautiful micro-animations for text and UI elements
- **Responsive Design**: Mobile-first approach, works on all devices
- **Custom Theme**: Sacred colors - Orange Red (#ff4d00), Gold (#ffc100), Light Orange (#ff7400)

## 🏗️ Project Structure (CLEAN Architecture)

```
swamiji-website/
├── src/
│   ├── domain/              # Business logic layer
│   │   ├── entities/        # Core business entities
│   │   └── repositories/    # Repository interfaces
│   ├── application/         # Application layer
│   │   ├── useCases/        # Business use cases
│   │   └── services/        # Application services
│   ├── infrastructure/      # External services layer
│   │   ├── api/             # API implementations
│   │   ├── redux/           # State management
│   │   │   ├── store.ts
│   │   │   ├── hooks.ts
│   │   │   └── slices/
│   │   └── i18n/            # Internationalization
│   └── presentation/        # UI layer
│       ├── components/      # React components
│       ├── pages/           # Next.js pages
│       ├── styles/          # Global styles
│       └── hooks/           # Custom hooks
├── public/
│   ├── locales/
│   │   ├── en/
│   │   └── hi/
│   └── images/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── next-i18next.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd swamiji-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Tech Stack

### Core
- **Next.js 14**: React framework with SSR/SSG
- **TypeScript**: Type-safe development
- **React 18**: UI library

### State Management
- **Redux Toolkit**: Modern Redux
- **React Redux**: React bindings

### Internationalization
- **next-i18next**: i18n for Next.js
- **react-i18next**: React i18n

### Animations
- **Framer Motion**: Advanced animations
- **react-intersection-observer**: Scroll-triggered animations

### Styling
- **Tailwind CSS**: Utility-first CSS
- **Custom Animations**: Keyframe animations

## 🎨 Color Theme

```css
Primary Orange: #ff4d00
Gold: #ffc100
Light Orange: #ff7400
White: #FFFFFF
```

## 🌐 Multi-lingual Support

The website supports two languages:
- **English (EN)**: Default language
- **Hindi (HI)**: हिन्दी support with Devanagari script

Translation files are located in:
- `public/locales/en/common.json`
- `public/locales/hi/common.json`

## 🎭 Components

### Main Components

1. **Navigation**: Responsive navbar with language switcher
2. **HeroSection**: Parallax hero with animations
3. **TeachingsSection**: Grid of teachings with hover effects
4. **QuotesSection**: Carousel with animated quotes
5. **EventsSection**: Upcoming events showcase
6. **AboutSection**: Swami Ji biography
7. **Footer**: Contact and social links

### Animation Components

1. **AnimatedText**: Word-by-word text animation
2. **AnimatedLetters**: Letter-by-letter animation
3. **GradientText**: Animated gradient text

## 🔄 State Management

Redux slices:
- **swamiJiSlice**: Swami Ji data (info, teachings, quotes, events)
- **languageSlice**: Language preferences
- **uiSlice**: UI state (menu, scroll, active section)

## 🎯 CLEAN Architecture Benefits

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Testability**: Easy to unit test business logic
3. **Maintainability**: Clear structure makes updates easier
4. **Scalability**: Easy to add new features
5. **Independence**: UI can change without affecting business logic

## 🔌 API Routes

All API routes are located in `src/pages/api/swamiji/`:
- `/api/swamiji/info` - Swami Ji information
- `/api/swamiji/teachings` - Get all teachings
- `/api/swamiji/quotes` - Get inspirational quotes
- `/api/swamiji/events` - Get upcoming events

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    orange: '#ff4d00',
    gold: '#ffc100',
    light: '#ff7400',
  },
}
```

### Adding Translations

Add keys to translation files in `public/locales/[lang]/common.json`

### Adding New Sections

1. Create component in `src/presentation/components/`
2. Import in `src/pages/index.tsx`
3. Add translations if needed

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔐 Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Other Platforms

```bash
npm run build
npm start
```

## 📄 License

This project is private and confidential.

## 🙏 Credits

Developed with dedication for spiritual enlightenment.

Om Shanti 🕉️
