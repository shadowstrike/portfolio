# Dark Mode Implementation Guide

## Overview
Light and dark mode support has been added to the entire portfolio website.

## Features

### 🎨 Color Themes
- **Light Mode** (default): Clean white background with dark text
- **Dark Mode**: Dark gray background (#0F0F0F) with light text

### 🔄 Theme Toggle
- Icon button in navigation bar
- Sun icon for light mode
- Moon icon for dark mode
- Smooth transitions between themes

### 💾 Persistence
- User's theme preference saved in localStorage
- Automatically loads saved preference on page load
- Preference persists across all pages

## How It Works

### CSS Variables
Theme colors are defined as CSS custom properties in `:root` (light mode) and `[data-theme="dark"]` (dark mode):

```css
:root {
    --color-bg: #FFFFFF;
    --color-text: #1A1A1A;
    --color-accent: #0066FF;
    /* ... */
}

[data-theme="dark"] {
    --color-bg: #0F0F0F;
    --color-text: #E5E5E5;
    --color-accent: #4D94FF;
    /* ... */
}
```

### JavaScript
Theme switching logic in `js/script.js`:
- Checks localStorage for saved theme
- Applies theme on page load
- Toggles theme when button clicked
- Saves preference to localStorage

### HTML
Theme toggle button added to navigation on all pages:
```html
<button class="theme-toggle" id="theme-toggle">
    <!-- Sun and moon icons -->
</button>
```

## Pages Updated

✅ **Homepage** - index.html
✅ **Project Pages** (6 files)
- project-artifacts.html
- project-savepoint.html
- project-flinksql.html
- project-multik8s.html
- project-session.html
- project-cmf.html

✅ **Demo Pages** (2 files)
- carousel-demo.html
- pattern-demo.html

## Dark Mode Colors

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | #FFFFFF | #0F0F0F |
| Text | #1A1A1A | #E5E5E5 |
| Text Light | #666666 | #A0A0A0 |
| Border | #E5E5E5 | #2A2A2A |
| Accent | #0066FF | #4D94FF |
| Card Background | #FAFAFA | #1A1A1A |

## Patterns
Background patterns automatically adjust for dark mode:
- Dots pattern uses white instead of black
- Reduced opacity for better visibility
- Grid and diagonal patterns also inverted

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses localStorage (IE11+ supported)
- CSS custom properties (all modern browsers)

## Customization

### Change Colors
Edit CSS variables in `css/styles.css`:
```css
[data-theme="dark"] {
    --color-accent: #YOUR_COLOR;
}
```

### Disable Dark Mode
Remove the theme toggle button from navigation and the theme initialization code from `js/script.js`.

### Set Default Theme
Change in `js/script.js`:
```javascript
const currentTheme = localStorage.getItem('theme') || 'dark'; // Change to 'dark'
```

## Accessibility
- Button has `aria-label="Toggle theme"`
- High contrast ratios maintained in both modes
- Visual icons clearly indicate current theme state

## Testing
1. Open any page on the website
2. Click the sun/moon icon in the navigation
3. Verify theme changes
4. Refresh page - theme should persist
5. Navigate to another page - theme should remain consistent

---

**Implementation Date:** March 21, 2026
**Status:** ✅ Fully functional across all pages
