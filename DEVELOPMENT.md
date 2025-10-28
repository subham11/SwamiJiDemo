# Development Guide 👨‍💻

## Quick Start

### 1. Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd swamiji-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 2. Project Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Development Workflow

### Creating a New Component

1. **Create the component file**
   ```typescript
   // src/presentation/components/MyComponent.tsx
   import React from 'react';
   import { motion } from 'framer-motion';
   
   interface MyComponentProps {
     title: string;
   }
   
   export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
     return (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
       >
         <h2>{title}</h2>
       </motion.div>
     );
   };
   ```

2. **Add translations**
   ```json
   // public/locales/en/common.json
   {
     "myComponent": {
       "title": "My Title"
     }
   }
   
   // public/locales/hi/common.json
   {
     "myComponent": {
       "title": "मेरा शीर्षक"
     }
   }
   ```

3. **Use the component**
   ```typescript
   import { MyComponent } from '@/presentation/components/MyComponent';
   
   <MyComponent title={t('myComponent.title')} />
   ```

### Adding New API Endpoint

1. **Create API route**
   ```typescript
   // src/pages/api/myEndpoint.ts
   import type { NextApiRequest, NextApiResponse } from 'next';
   
   export default async function handler(
     req: NextApiRequest,
     res: NextApiResponse
   ) {
     if (req.method === 'GET') {
       res.status(200).json({ data: 'response' });
     }
   }
   ```

2. **Create Redux slice (if needed)**
   ```typescript
   // src/infrastructure/redux/slices/mySlice.ts
   import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
   
   export const fetchMyData = createAsyncThunk(
     'my/fetchData',
     async () => {
       const response = await fetch('/api/myEndpoint');
       return response.json();
     }
   );
   ```

### Working with Animations

#### Basic Animation
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

#### Scroll-Triggered Animation
```typescript
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

#### Parallax Effect
```typescript
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

<motion.div style={{ y }}>
  Parallax Content
</motion.div>
```

### Multi-Language Content

#### In Components
```typescript
const { t, i18n } = useTranslation('common');
const currentLang = i18n.language as 'en' | 'hi';

// Simple translation
<h1>{t('hero.title')}</h1>

// Dynamic content
<p>{data.description[currentLang]}</p>
```

#### In Data Structures
```typescript
interface MultiLangText {
  en: string;
  hi: string;
}

const content: MultiLangText = {
  en: "Welcome",
  hi: "स्वागत है"
};
```

## Styling Guide

### Tailwind Classes
```typescript
// Standard classes
<div className="bg-primary-orange text-white p-4 rounded-lg">

// Responsive
<div className="text-sm md:text-base lg:text-lg">

// Hover effects
<button className="hover:bg-primary-light transition-colors">

// Custom animations
<div className="animate-float">
```

### Custom CSS
```css
/* globals.css */
.my-custom-class {
  @apply bg-gradient-to-r from-primary-orange to-primary-gold;
}
```

## State Management

### Using Redux
```typescript
import { useAppDispatch, useAppSelector } from '@/infrastructure/redux/hooks';

// In component
const dispatch = useAppDispatch();
const data = useAppSelector((state) => state.swamiJi.info);

// Dispatch action
dispatch(fetchSwamiJiInfo());
```

### Local State
```typescript
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);
```

## Code Organization

### File Naming
- Components: PascalCase (`HeroSection.tsx`)
- Utilities: camelCase (`useAnimations.ts`)
- Types: PascalCase (`SwamiJi.ts`)
- Constants: UPPER_SNAKE_CASE (`API_ROUTES.ts`)

### Import Order
```typescript
// 1. External libraries
import React from 'react';
import { motion } from 'framer-motion';

// 2. Internal modules
import { useAppSelector } from '@/infrastructure/redux/hooks';

// 3. Components
import { MyComponent } from '@/presentation/components/MyComponent';

// 4. Types
import type { SwamiJi } from '@/domain/entities/SwamiJi';

// 5. Styles
import styles from './styles.module.css';
```

## Testing

### Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### API Testing
```typescript
import { createMocks } from 'node-mocks-http';
import handler from './api/myEndpoint';

describe('/api/myEndpoint', () => {
  it('returns data', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});
```

## Performance Tips

1. **Use Next.js Image**
   ```typescript
   import Image from 'next/image';
   
   <Image
     src="/image.jpg"
     alt="Description"
     width={500}
     height={300}
     loading="lazy"
   />
   ```

2. **Code Splitting**
   ```typescript
   import dynamic from 'next/dynamic';
   
   const DynamicComponent = dynamic(
     () => import('@/presentation/components/Heavy'),
     { loading: () => <p>Loading...</p> }
   );
   ```

3. **Memoization**
   ```typescript
   const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
   const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
   ```

## Debugging

### Browser DevTools
- React DevTools: Inspect component tree
- Redux DevTools: Track state changes
- Network Tab: Monitor API calls

### Console Logging
```typescript
console.log('Data:', data);
console.table(array);
console.group('Group Name');
// logs
console.groupEnd();
```

### TypeScript Errors
- Check `tsconfig.json` settings
- Run `npm run build` to see all errors
- Use VSCode TypeScript server

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: add my feature"

# Push to remote
git push origin feature/my-feature

# Create Pull Request
```

### Commit Message Convention
```
feat: new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code restructuring
test: adding tests
chore: maintenance
```

## Common Issues

### Issue: Translations not showing
**Solution**: Check translation keys match in JSON files

### Issue: Animations not working
**Solution**: Ensure Framer Motion is properly installed and imported

### Issue: Build errors
**Solution**: 
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Port already in use
**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## Getting Help

1. Check documentation
2. Search existing issues
3. Ask in team chat
4. Create new issue with:
   - Description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/code

---

Happy Coding! 🚀
