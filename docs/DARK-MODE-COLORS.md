# Dark Mode Color Palette

## Background Shades (Layered Depth)

The dark mode uses multiple shades of black/gray to create visual depth and hierarchy:

### Primary Backgrounds
- **Base Background**: `#0A0A0A` - Deepest black, used for body
- **Section Alt 1**: `#0D0D0D` - About section
- **Section Alt 2**: `#121212` - Hero gradient end, project cards
- **Card Background**: `#161616` - Default card color
- **Card Elevated**: `#1A1A1A` - Skills cards, hover states

### Borders & Dividers
- **Primary Border**: `#2D2D2D` - Main borders
- **Secondary Border**: `#2A2A2A` - Subtle dividers
- **Interactive Border**: `#3A3A3A` - Filter buttons
- **Accent Border**: `#333333` - Skills cards

## Text Colors
- **Primary Text**: `#E8E8E8` - Main content
- **Secondary Text**: `#9CA3AF` - Lighter text, descriptions
- **Accent**: `#5B9FFF` - Links, buttons
- **Accent Hover**: `#7AB3FF` - Interactive states

## Section Backgrounds

| Section | Background | Pattern |
|---------|-----------|---------|
| Hero | Gradient `#0A0A0A → #121212` | Dots (white 8%) |
| Work | `#161616` | Grid (white 5%) + dark overlay |
| About | `#0D0D0D` | Inherited dots |
| Contact | `#161616` | Dots + gradient overlay (accent 8%) |

## Inverted Patterns

Patterns are inverted from light mode (black → white):

```css
/* Light Mode */
--pattern-dots: rgba(0, 0, 0, 0.03)

/* Dark Mode */
--pattern-dots: rgba(255, 255, 255, 0.08)
```

### Pattern Opacity
- **Dots**: 8% white
- **Grid**: 5% white
- **Diagonal**: 4% white

## Component-Specific

### Project Cards
- Default: `#121212`
- Hover: `#1A1A1A`
- Border: `#2A2A2A`

### Skills Cards
- Background: `#1A1A1A`
- Border: `#333333`
- Shadow: `rgba(0, 0, 0, 0.3)`

### Filter Buttons
- Background: `#0D0D0D`
- Border: `#3A3A3A`
- Active: `#5B9FFF` (accent)

### Profile Image
- Border: `#1F1F1F`
- Shadow: `rgba(0, 0, 0, 0.5)`

## Shadows (Enhanced Depth)

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5)
```

Deeper shadows than light mode for better depth perception.

## Gradient Overlays

### Work Section
```css
linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))
```

### Contact Section
```css
linear-gradient(135deg, rgba(91, 159, 255, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)
```

## Design Philosophy

1. **Layered Depth**: Multiple shades create visual hierarchy
2. **Subtle Contrast**: Small differences (5-10% lightness) between layers
3. **Inverted Patterns**: White patterns at low opacity for texture
4. **Enhanced Shadows**: Deeper shadows for depth in dark environment
5. **Warmer Accents**: Slightly lighter blue (#5B9FFF) for better visibility

## Accessibility

- All text maintains WCAG AA contrast ratios
- Primary text: 13.5:1 contrast
- Secondary text: 7.2:1 contrast
- Interactive elements have clear focus states

---

**Color Palette Range**: `#0A0A0A` (darkest) → `#3A3A3A` (lightest background element)
