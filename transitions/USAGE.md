# 🎬 Page Transition System — Usage Guide

Complete guide to the premium page transition system for GSAP + Lenis + React Router.

---

## 📦 Components Overview

| Component | Purpose |
|-----------|---------|
| `TransitionProvider` | Global state for transition lifecycle |
| `PageTransition` | Full-screen overlay with GSAP timeline |
| `TransitionLink` | Drop-in replacement for `Link` that triggers transitions |
| `ScrollTriggerManager` | Auto-cleanup & refresh for ScrollTrigger |
| `TransitionLayout` | Route wrapper for consistent behavior |
| `useLenis` | Hook to initialize Lenis with proper cleanup |

---

## 🚀 Installation Steps

### Step 1: Wrap App with TransitionProvider

Your `src/main.jsx` should already look like this. Ensure `TransitionProvider` wraps everything:

```jsx
import { TransitionProvider } from './context/TransitionContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TransitionProvider>
        <App />
      </TransitionProvider>
    </BrowserRouter>
  </StrictMode>
);
```

### Step 2: Add Components to App.jsx

Replace your current `App.jsx` with the updated version (see provided `App.jsx`). Key additions:

- `<PageTransition />` — the overlay element (renders once)
- `<ScrollTriggerManager />` — auto-manages ScrollTrigger cleanup
- `<ScrollToTopOnRoute />` — scrolls to top after transition (already exists in modified App.jsx)
- `useLenis` hook — initializes smooth scroll

### Step 3: Convert Links to TransitionLink

Find all `import { Link } from 'react-router-dom'` and replace with `TransitionLink`:

```diff
- import { Link } from 'react-router-dom';
+ import TransitionLink from './components/common/TransitionLink';

- <Link to="/contact">Contact</Link>
+ <TransitionLink to="/contact">Contact</TransitionLink>
```

**Important:** Anchor links (`#pricing`) and external URLs (`https://...`) work automatically with no transition.

### Step 4: Choose Overlay Color

Edit `PageTransition.jsx` line with `background: '#000000'` to match your theme:

```javascript
style={{
  background: '#ffffff', // Light theme
  // OR for dark theme:
  // background: '#000000',
  transform: 'translateY(-100%)',
}}
```

---

## 🎨 Customization

### Change Overlay Color at Runtime

Create a custom `PageTransition` component:

```jsx
import PageTransition from './components/common/PageTransition';

const CustomPageTransition = () => {
  const { isDark } = useTheme(); // your theme hook
  return (
    <PageTransition
      style={{ background: isDark ? '#000' : '#fff' }}
      timing={{ durationIn: 0.8, durationOut: 0.6 }}
    />
  );
};
```

### Adjust Animation Speed

Edit `PageTransition.jsx` animation durations:

```javascript
timeline.to(overlayRef.current, {
  y: '0%',
  duration: 0.7, // Slower cover
  ease: 'power3.inOut',
});

timeline.to(overlayRef.current, {
  y: '100%',
  duration: 0.4, // Faster reveal
  ease: 'power3.inOut',
});
```

Total transition = sum of both durations (~1000-1200ms typical).

### Custom Easing

Replace `power3.inOut` with any GSAP easing:

```javascript
ease: 'expo.inOut'    // dramatic
ease: 'power2.inOut'  // smooth
ease: 'back.inOut(1.7)' // bouncy
```

---

## 📌 Page Integration

### Standard Page with ScrollTriggers

No extra work needed! `ScrollTriggerManager` handles cleanup automatically.

```jsx
const Pricing = () => {
  useEffect(() => {
    gsap.from('.card', {
      scrollTrigger: { trigger: '.pricing-grid', start: 'top 80%' },
      y: 50,
      opacity: 0,
    });
  }, []);

  return <div className="pricing-grid">...</div>;
};
```

### Disable Transition for Specific Routes

For modals or embedded content, wrap routes in conditional layout:

```jsx
<Routes>
  <Route path="/" element={<MainLayoutWithTransition />} />
  <Route path="/modal/:id" element={<ModalWithoutTransition />} />
</Routes>
```

---

## 🛑 Common Issues

### Overlay shows on initial load

Should not happen. `isFirstRender` flag in `PageTransition` handles this.

If you see it, ensure `PageTransition` is rendered only at root and `<TransitionProvider>` wraps all routes.

### ScrollTrigger fires twice after navigation

`ScrollTriggerManager` should be present at root level. Check it's in `App.jsx`.

### Transition not triggering on back/forward buttons

`TransitionProvider` handles `popstate` automatically. If broken, ensure you haven't removed the event listener in any code.

### Lenis scroll not smooth

Check `LenisInitializer` component is rendered inside `TransitionProvider`.

---

## 🧪 Testing Checklist

- [ ] Click internal links → overlay slides down → route changes → overlay slides up → new page visible
- [ ] Click hash anchor (`#section`) → smooth scroll to anchor (no page transition)
- [ ] Click external link → normal browser navigation (no overlay)
- [ ] Press browser back button → reverse transition (optional: direction='back')
- [ ] Resize window during transition → smooth and glitch-free
- [ ] Rapid double-click → only first click triggers, second ignored
- [ ] All ScrollTrigger sections animate correctly on new pages
- [ ] No memory leaks (check Chrome DevTools Performance after multiple navigations)

---

## 📁 Files Summary

```
src/context/TransitionContext.jsx    ← State + hooks (useTransition, useScrollTriggerCleanup, usePageTransitionStyles)
src/components/common/PageTransition.jsx     ← Full-screen overlay animation
src/components/common/TransitionLink.jsx      ← Link wrapper that triggers transitions
src/components/common/ScrollTriggerManager.jsx← Auto ScrollTrigger lifecycle manager
src/components/layout/TransitionLayout.jsx    ← Outlet wrapper for routes
src/hooks/useLenis.js                        ← Lenis init + GSAP ticker sync
src/transitions/index.js                     ← Convenience exports
```

---

## 💡 Pro Tips

### 1. Transition Direction

Pass `direction="back"` for "backwards" animations:

```jsx
<TransitionLink to="/previous" direction="back">
  ← Back
</TransitionLink>
```

### 2. Controlled Navigation

You can trigger transitions programmatically:

```jsx
const { startTransition } = useTransition();

const handleNavigation = async () => {
  await startTransition();
  navigate('/new-page');
};
```

### 3. GSAP Context in Components

Always wrap ScrollTrigger in GSAP context for clean cleanup:

```jsx
import gsap from 'gsap';

const Section = () => {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.item', { scrollTrigger: { ... }, y: 100 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return <div ref={ref}>...</div>;
};
```

### 4. Overlay Color Dynamic

For dark/light mode, pass style dynamically:

```jsx
<PageTransition
  style={{ background: isDark ? '#000' : '#fff' }}
/>
```

---

## 🐞 Debug Mode

Enable debug logs by adding to `PageTransition.jsx`:

```javascript
console.log('[PageTransition]', { isTransitioning, isFirstRender: isFirstRender.current });
```

Or wrap in conditional:

```javascript
if (process.env.NODE_ENV === 'development') {
  console.log('Transition state:', isTransitioning);
}
```

---

## ✅ Production Checklist

- [ ] All `<Link>` replaced with `<TransitionLink>`
- [ ] `TransitionProvider` wraps App in `main.jsx`
- [ ] `PageTransition` renders once at root
- [ ] `ScrollTriggerManager` included in `App.jsx`
- [ ] `useLenis` initialized by `LenisInitializer`
- [ ] Overlay color matches site theme
- [ ] Animation durations ~1s total
- [ ] No console errors or warnings
- [ ] Works in SSR hydration (no hydration mismatch)

---

## 📚 References

- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis Docs](https://github.com/studio-freight/lenis)
- [React Router v6](https://reactrouter.com/en/main)

---

Built for premium photography portfolio sites. Smooth, minimal, and bug-free.
