# Design Brief: 19 Studio

**Purpose**: Professional hair salon booking interface where clients confidently select services, stylists, and appointment times. Premium yet approachable.

**Tone**: Refined minimalist luxury — editorial magazine meets booking platform. Modern, trustworthy, warm.

**Differentiation**: Warm taupe accent colors on refined charcoal/cream palette. Service cards with price callouts. Interactive calendar grid. Multi-step booking flow with progress indication. Admin dashboard for appointment management.

## Palette

| Token               | Light (OKLCH)    | Dark (OKLCH)     | Purpose                         |
|:------------------|:----------------|:----------------|:--------------------------------|
| Primary            | 0.32 0.05 250   | 0.75 0.08 55    | Buttons, main actions           |
| Accent (Warm)      | 0.68 0.08 55    | 0.75 0.08 55    | Highlights, prices, focus       |
| Background         | 0.98 0.01 85    | 0.15 0.01 250   | Page background                 |
| Card               | 0.985 0 0       | 0.2 0.01 250    | Service/booking cards           |
| Muted              | 0.92 0.01 85    | 0.25 0.01 250   | Secondary sections, dividers    |
| Destructive        | 0.58 0.18 25    | 0.65 0.18 25    | Cancel, delete actions          |

## Typography

| Layer    | Font           | Usage                                   |
|:---------|:---------------|:----------------------------------------|
| Display  | General Sans   | Headings, hero, service titles          |
| Body     | DM Sans        | Body copy, form labels, descriptions    |
| Mono     | Geist Mono     | Time slots, reference codes, times      |

## Structural Zones

| Zone        | Treatment                                | Contrast                      |
|:----------|:----------------------------------------|:------------------------------|
| Header      | `bg-card` border-b, charcoal text       | Elevated above content        |
| Hero        | `bg-background`, service cards overlay | Warm accent on pricing        |
| Main Flow   | `bg-background`, `bg-card` sections    | Card elevation, 2px border    |
| Sidebar     | `bg-muted/30`, subtle accent highlights| Low contrast, supportive role |
| Footer      | `bg-muted/20` border-t                  | Minimal visual weight         |
| Admin Table | `bg-card`, alternating `bg-muted/10`   | High contrast for readability |

## Spacing & Rhythm

- **Grid**: 8px base unit (16px gaps standard)
- **Dense**: 8px (forms, lists)
- **Comfortable**: 16px (card padding, sections)
- **Spacious**: 24px (section dividers, hero spacing)
- **Type Scale**: 12, 14, 16, 18, 24, 32, 40px

## Component Patterns

- **Buttons**: Primary (accent bg), Secondary (outline), Danger (destructive)
- **Cards**: `bg-card` with `border border-border`, `rounded-md` (8px), shadow-sm on hover
- **Forms**: `bg-input` fields, clear labels, inline validation
- **Calendar**: Grid layout, disabled dates muted, selected date accent highlight
- **Status Badge**: `bg-muted` text, destructive for cancellations, success for completed

## Motion

- **Default**: `transition-smooth` (0.3s cubic-bezier)
- **Interactions**: Buttons scale 98% on hover, cards lift shadow on focus
- **Page**: Fade in on load, no bouncing

## Dark Mode

Color temperature preserved: warm accents shift from taupe (L:0.68) to warm amber (L:0.75) in dark mode. Background contrast maintained (L diff >0.7). Borders and inputs use cooler blue-hues in dark.

## Constraints

- No gradients (solid colors only)
- Border radius: 0px (inputs), 8px (cards/buttons), 12px (large containers)
- Max shadow: 4px blur (subtle depth)
- Fonts load via woff2 (swap display, lazy body)
- Mobile-first responsive breakpoints
