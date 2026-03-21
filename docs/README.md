# Portfolio Website - Abhilash Bhattacharjee

A modern, minimalist portfolio showcasing design work on Confluent Platform Flink projects (2025-2026).

## Features

- **Clean, modern design** with minimalist aesthetic
- **Lightweight** - No frameworks, pure HTML/CSS/JavaScript
- **Responsive** - Works on desktop, tablet, and mobile
- **Fast loading** - Optimized CSS and minimal JavaScript
- **Accessible** - Semantic HTML and proper heading hierarchy
- **Easy to customize** - Well-organized CSS with CSS variables

## File Structure

```
portfolio-website/
├── index.html              # Homepage with project tiles
├── styles.css              # All styling (design system, components)
├── script.js               # Smooth scroll and interactions
├── project-savepoint.html  # Savepoint Management case study
├── project-flinksql.html   # FlinkSQL UI case study
├── project-multik8s.html   # Multi-K8s Support case study
├── project-session.html    # Session Clusters case study
├── project-artifacts.html  # Artifact Management case study
├── project-cmf.html        # CMF Program Overview
└── README.md              # This file
```

## How to Use

### Local Development

1. **Open in browser:**
   - Simply double-click `index.html` to open in your default browser
   - Or drag and drop `index.html` into browser window

2. **Use a local server (recommended for testing):**
   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # Then visit: http://localhost:8000
   ```

### Customization

#### Update Personal Information

**In `index.html`:**
- Line 11: Update navigation name
- Lines 22-25: Update hero title and subtitle
- Line 124: Update contact email
- Line 125: Update LinkedIn URL
- Line 133: Update copyright

**In all project pages:**
- Update navigation name in header
- Update footer copyright

#### Update Colors

**In `styles.css` (lines 15-26):**
```css
:root {
    --color-accent: #0066FF;        /* Change primary blue */
    --color-accent-hover: #0052CC;  /* Change hover state */
    --color-text: #1A1A1A;          /* Change text color */
    --color-bg: #FFFFFF;            /* Change background */
    /* ... more colors */
}
```

#### Add Project Images

Replace placeholder divs with actual images:

**In project pages, find:**
```html
<div class="image-placeholder">
    [Screenshot: Description]
</div>
```

**Replace with:**
```html
<img src="images/screenshot-name.png" alt="Description" style="width: 100%; border-radius: var(--radius-lg);">
```

**Create images folder:**
```bash
mkdir images
# Add your screenshots/diagrams to this folder
```

#### Update Typography

**In `styles.css` (lines 29-31):**
```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...
--font-mono: 'SF Mono', Monaco, 'Cascadia Code', ...
```

### Adding New Projects

1. **Copy an existing project page** (e.g., `project-savepoint.html`)
2. **Rename** to `project-yourproject.html`
3. **Update content:**
   - Change title, hero text, metadata
   - Update sections with your project details
   - Update breadcrumb navigation
4. **Add to homepage** (`index.html`):
   ```html
   <a href="project-yourproject.html" class="project-card">
       <!-- Card content -->
   </a>
   ```

## Design System

### Color Palette

- **Primary:** `#0066FF` (Accent blue)
- **Text:** `#1A1A1A` (Almost black)
- **Text Light:** `#666666` (Gray)
- **Background:** `#FFFFFF` (White)
- **Card Background:** `#FAFAFA` (Off-white)
- **Border:** `#E5E5E5` (Light gray)

### Spacing Scale

- `--space-xs`: 0.5rem (8px)
- `--space-sm`: 1rem (16px)
- `--space-md`: 1.5rem (24px)
- `--space-lg`: 2rem (32px)
- `--space-xl`: 3rem (48px)
- `--space-2xl`: 4rem (64px)
- `--space-3xl`: 6rem (96px)

### Typography Scale

- **Hero (H1):** 2rem - 3.5rem (responsive)
- **Section (H2):** 1.75rem - 2.5rem (responsive)
- **Subsection (H3):** 1.25rem - 1.5rem (responsive)
- **Body:** 16px base
- **Small:** 14px (0.875rem)

## Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)

Works on Internet Explorer 11 with minor visual differences.

## Performance

- **No external dependencies** - No jQuery, no React, no frameworks
- **CSS file:** ~15KB uncompressed
- **JavaScript file:** ~2KB uncompressed
- **Total page weight:** <20KB (excluding images)
- **Load time:** Sub-second on modern connections

## Deployment

### GitHub Pages

1. Create repository: `yourusername.github.io`
2. Push files to repository
3. Go to Settings → Pages
4. Select main branch
5. Visit: `https://yourusername.github.io`

### Netlify

1. Drag and drop `portfolio-website` folder to Netlify
2. Or connect GitHub repository
3. Deploy automatically

### Custom Domain

Add a `CNAME` file with your domain:
```
yourportfolio.com
```

Update DNS settings to point to GitHub Pages or Netlify.

## Accessibility

- ✅ Semantic HTML5
- ✅ Proper heading hierarchy
- ✅ Focus states for keyboard navigation
- ✅ Color contrast meets WCAG AA standards
- ✅ Responsive text sizing
- ⚠️ Add alt text to images when you replace placeholders

## Next Steps

1. **Add actual screenshots** - Replace placeholder divs with real images
2. **Add Figma files** - Export and embed Figma mockups
3. **Add diagrams** - Create architecture/flow diagrams
4. **Optimize images** - Compress screenshots (use TinyPNG or similar)
5. **Test responsive** - Check on mobile devices
6. **Add analytics** - Google Analytics or similar (if desired)
7. **SEO optimization** - Add meta descriptions, Open Graph tags

## Credits

Design and development by Abhilash Bhattacharjee
Portfolio content based on CP Flink design work at Confluent (2025-2026)

## License

Personal portfolio - All rights reserved.
