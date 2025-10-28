# Architecture Documentation

## CLEAN Architecture Implementation

This project follows CLEAN Architecture principles to ensure maintainability, testability, and scalability.

### Layers Overview

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Components, Pages, UI)          │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│         Application Layer               │
│  (Use Cases, Business Logic)            │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│         Domain Layer                    │
│  (Entities, Repository Interfaces)      │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│       Infrastructure Layer              │
│  (API, Redux, External Services)        │
└─────────────────────────────────────────┘
```

## 1. Domain Layer (`src/domain/`)

The innermost layer containing business entities and repository interfaces.

### Entities (`src/domain/entities/`)

Core business objects that represent the domain model:

```typescript
// SwamiJi.ts
export interface SwamiJi {
  id: string;
  name: { en: string; hi: string; };
  title: { en: string; hi: string; };
  bio: { en: string; hi: string; };
  teachings: Teaching[];
  quotes: Quote[];
  // ...
}
```

**Principles:**
- Pure TypeScript interfaces/types
- No framework dependencies
- Business rules only
- Language-agnostic data structures

### Repositories (`src/domain/repositories/`)

Interfaces defining data access contracts:

```typescript
// ISwamiJiRepository.ts
export interface ISwamiJiRepository {
  getSwamiJiInfo(): Promise<SwamiJi>;
  getTeachings(): Promise<Teaching[]>;
  getQuotes(): Promise<Quote[]>;
  getEvents(): Promise<Event[]>;
}
```

**Principles:**
- Define "what" not "how"
- Implementation-agnostic
- Dependency inversion

## 2. Application Layer (`src/application/`)

Contains business logic and use cases.

### Use Cases (`src/application/useCases/`)

Implement specific business operations:

```typescript
export class GetSwamiJiInfoUseCase {
  constructor(private repository: ISwamiJiRepository) {}

  async execute(): Promise<SwamiJi> {
    return await this.repository.getSwamiJiInfo();
  }
}
```

**Principles:**
- Single Responsibility
- Orchestrate business logic
- Independent of UI and infrastructure
- Testable in isolation

### Services (`src/application/services/`)

Application-level services for complex operations.

## 3. Infrastructure Layer (`src/infrastructure/`)

Implements interfaces from domain layer and provides external integrations.

### API (`src/infrastructure/api/`)

Repository implementations:

```typescript
export class MockSwamiJiRepository implements ISwamiJiRepository {
  async getSwamiJiInfo(): Promise<SwamiJi> {
    // Implementation details
  }
}
```

**Features:**
- Implements domain repository interfaces
- Can be easily swapped (mock ↔ real API)
- No business logic

### Redux (`src/infrastructure/redux/`)

State management setup:

```typescript
// store.ts
export const store = configureStore({
  reducer: {
    swamiJi: swamiJiReducer,
    language: languageReducer,
    ui: uiReducer,
  },
});
```

**Structure:**
- `store.ts`: Redux store configuration
- `hooks.ts`: Typed Redux hooks
- `slices/`: Feature-based state slices

### i18n (`src/infrastructure/i18n/`)

Internationalization configuration for EN/HI support.

## 4. Presentation Layer (`src/presentation/`)

React components and UI logic.

### Components (`src/presentation/components/`)

Reusable UI components:

```typescript
export const HeroSection: React.FC = () => {
  // Parallax and animation logic
  return (
    <motion.div>
      {/* Component JSX */}
    </motion.div>
  );
};
```

**Types:**
- **Smart Components**: Connected to Redux, handle data
- **Presentational Components**: Pure UI, receive props
- **Layout Components**: Page structure
- **Animation Components**: Reusable animations

### Pages (`src/presentation/pages/`)

Next.js pages that compose components.

## Data Flow

```
User Action
    ↓
Component (Presentation)
    ↓
Redux Action/Hook
    ↓
API Call
    ↓
Use Case (Application)
    ↓
Repository Interface (Domain)
    ↓
Repository Implementation (Infrastructure)
    ↓
Data Source (API/Database)
    ↓
Back through layers
    ↓
Component Re-render
```

## Redux State Management

### State Structure

```typescript
{
  swamiJi: {
    info: SwamiJi | null,
    teachings: Teaching[],
    quotes: Quote[],
    events: Event[],
    loading: boolean,
    error: string | null
  },
  language: {
    current: 'en' | 'hi'
  },
  ui: {
    isMobileMenuOpen: boolean,
    activeSection: string,
    scrollProgress: number,
    isScrolled: boolean
  }
}
```

### Async Actions

```typescript
// Thunk for async operations
export const fetchSwamiJiInfo = createAsyncThunk(
  'swamiJi/fetchInfo',
  async () => {
    const response = await fetch('/api/swamiji/info');
    return response.json();
  }
);
```

## Animation System

### Framer Motion Integration

1. **Parallax Effects**: Using `useScroll` and `useTransform`
2. **Entrance Animations**: `initial`, `animate`, `exit` props
3. **Hover Effects**: `whileHover`, `whileTap`
4. **Scroll Triggers**: `whileInView` with viewport detection

### Custom Animations

Defined in `tailwind.config.js`:

```javascript
animation: {
  'fade-in': 'fadeIn 0.8s ease-in-out',
  'slide-up': 'slideUp 0.6s ease-out',
  'float': 'float 3s ease-in-out infinite',
  'glow': 'glow 2s ease-in-out infinite',
}
```

## Internationalization (i18n)

### Translation Files

```
public/locales/
├── en/
│   └── common.json
└── hi/
    └── common.json
```

### Usage in Components

```typescript
const { t, i18n } = useTranslation('common');
const currentLang = i18n.language as 'en' | 'hi';

// Access translations
t('nav.home') // "Home" or "मुख्य पृष्ठ"

// Access multilingual data
data.title[currentLang]
```

### Language Switching

```typescript
const toggleLanguage = () => {
  const newLang = currentLanguage === 'en' ? 'hi' : 'en';
  i18n.changeLanguage(newLang);
};
```

## Styling System

### Tailwind CSS

Utility-first CSS with custom theme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        orange: '#ff4d00',
        gold: '#ffc100',
        light: '#ff7400',
      }
    }
  }
}
```

### Custom CSS

Global styles in `globals.css`:
- Font imports (Poppins, Noto Sans Devanagari)
- Custom scrollbar
- Animation keyframes
- Utility classes

## Performance Optimizations

1. **Code Splitting**: Next.js automatic code splitting
2. **Image Optimization**: Next.js Image component
3. **Lazy Loading**: React lazy() for heavy components
4. **Memoization**: useMemo, useCallback for expensive operations
5. **Server-Side Rendering**: Next.js SSR for initial load

## Testing Strategy

### Unit Tests
- Domain entities: Pure logic testing
- Use cases: Mock repository testing
- Utilities: Pure function testing

### Integration Tests
- API routes: Request/response testing
- Redux slices: Action/reducer testing

### E2E Tests
- User flows: Cypress/Playwright
- Multi-language: Language switching flows

## Security Considerations

1. **Input Validation**: Validate all user inputs
2. **XSS Prevention**: React automatic escaping
3. **CSRF Protection**: Next.js built-in protection
4. **API Rate Limiting**: Implement rate limiting on API routes
5. **Environment Variables**: Sensitive data in .env files

## Deployment

### Build Process

```bash
npm run build  # Creates optimized production build
npm start      # Starts production server
```

### Environment-Specific Configs

- Development: `.env.local`
- Production: `.env.production`

## Extending the Application

### Adding a New Feature

1. **Define Entity** (Domain Layer)
   ```typescript
   // src/domain/entities/NewFeature.ts
   export interface NewFeature { }
   ```

2. **Create Repository Interface** (Domain Layer)
   ```typescript
   // src/domain/repositories/INewFeatureRepository.ts
   export interface INewFeatureRepository { }
   ```

3. **Implement Use Case** (Application Layer)
   ```typescript
   // src/application/useCases/NewFeatureUseCases.ts
   export class GetNewFeatureUseCase { }
   ```

4. **Implement Repository** (Infrastructure Layer)
   ```typescript
   // src/infrastructure/api/NewFeatureRepository.ts
   export class NewFeatureRepository implements INewFeatureRepository { }
   ```

5. **Create Redux Slice** (Infrastructure Layer)
   ```typescript
   // src/infrastructure/redux/slices/newFeatureSlice.ts
   export const newFeatureSlice = createSlice({ });
   ```

6. **Build UI Components** (Presentation Layer)
   ```typescript
   // src/presentation/components/NewFeatureComponent.tsx
   export const NewFeatureComponent: React.FC = () => { };
   ```

7. **Add Translations**
   ```json
   // public/locales/en/common.json
   // public/locales/hi/common.json
   ```

## Best Practices

1. **Keep layers independent**: Each layer should only depend on inner layers
2. **Use interfaces**: Define contracts in domain layer
3. **Type everything**: Leverage TypeScript for safety
4. **Component composition**: Small, reusable components
5. **State management**: Keep state close to where it's used
6. **Performance**: Measure before optimizing
7. **Accessibility**: Use semantic HTML and ARIA labels
8. **Documentation**: Keep this doc updated

## Troubleshooting

### Common Issues

1. **Build Errors**: Check TypeScript errors, missing dependencies
2. **Translation Missing**: Verify translation keys in JSON files
3. **Animation Glitches**: Check Framer Motion props and transitions
4. **Redux State Not Updating**: Verify action dispatching and reducers

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [CLEAN Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**Last Updated**: 2025
**Maintainer**: Development Team
