---
name: GRIT
colors:
  surface: '#fafaf5'
  surface-dim: '#dadad5'
  surface-bright: '#fafaf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4ef'
  surface-container: '#eeeee9'
  surface-container-high: '#e8e8e4'
  surface-container-highest: '#e2e3de'
  on-surface: '#1a1c19'
  on-surface-variant: '#45474c'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f1f1ec'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#555e74'
  primary: '#01081a'
  on-primary: '#ffffff'
  primary-container: '#172033'
  on-primary-container: '#7f879f'
  inverse-primary: '#bdc6e0'
  secondary: '#476800'
  on-secondary: '#ffffff'
  secondary-container: '#b6f249'
  on-secondary-container: '#4b6d00'
  tertiary: '#09002e'
  on-tertiary: '#ffffff'
  tertiary-container: '#21006e'
  on-tertiary-container: '#8b70ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2fc'
  primary-fixed-dim: '#bdc6e0'
  on-primary-fixed: '#121b2e'
  on-primary-fixed-variant: '#3e475b'
  secondary-fixed: '#b9f54c'
  secondary-fixed-dim: '#9ed830'
  on-secondary-fixed: '#131f00'
  on-secondary-fixed-variant: '#354e00'
  tertiary-fixed: '#e6deff'
  tertiary-fixed-dim: '#cabeff'
  on-tertiary-fixed: '#1c0062'
  on-tertiary-fixed-variant: '#4918c8'
  background: '#fafaf5'
  on-background: '#1a1c19'
  surface-variant: '#e2e3de'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1.25rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system drives a supportive, gamified youth career and self-discovery mobile experience. Designed specifically for teens, young adults, and secondary students navigating life choices, it replaces anxiety-inducing career quizzes with playful agency, curiosity, and momentum.

The design movement combines **Modern Tactile Gamification** with crisp **Youth-Focused Neo-Minimalism**:
- **Confidence without Intimidation**: Deep navy anchors structural weight and seriousness, while energetic electric lime injects momentum, accomplishment, and optimism.
- **Friendly & Approachable Architecture**: Highly rounded containers (20px to 32px radii), generous tap targets, tactile pill-shaped interactive elements, and punchy visual feedback.
- **Supportive Tone**: Microcopy and visual accents celebrate exploratory leaps rather than rigid decisions, using soft purple badges for curiosity, streaks, and milestone achievements.

## Colors

The palette establishes an immediate high-contrast dynamic between deep midnight tones, energetic hyper-lime accents, and comforting warm neutral canvases.

- **Primary Deep Navy (`#172033`)**: The structural core used for primary brand surfaces, high-priority dark action buttons, navigation chrome, and prominent headlines. A deeper shade (`#10141F`) is applied for ultra-crisp body copy and dark mode contrast.
- **Secondary Electric Lime (`#B7F34A`)**: The hero accent color for major primary CTAs, active selection borders, progress bar meters, celebration banners, and interactive states.
- **Tertiary Exploration Purple (`#7C5CFC`)**: Reserved for discovery indicators, career stream tags, XP/achievement medals, AI coach highlights, and secondary illustration accents.
- **Neutral Canvas (`#F7F7F2`)**: An organic, soft warm-tinted off-white background that prevents glare and screen fatigue during prolonged mobile exploration.
- **Surface Pure White (`#FFFFFF`)**: Bright, clean surface card planes layered over the off-white ground to establish immediate scannable hierarchy.
- **Muted Slate (`#6B7280`) & Border Tint (`#E5E7EB`)**: Supportive mid-tones for auxiliary descriptors, inactive tab icons, and subtle dividers.

## Typography

The design system standardizes on **Plus Jakarta Sans** across all roles. Its geometric build, open counters, rounded apexes, and generous x-height convey a fresh, warm, and highly legible tone tailored to youth audiences.

- **Display & Large Headlines**: Set with an ultra-bold weight (`800`) and tight negative tracking (`-0.02em` to `-0.03em`) to deliver strong editorial voice and motivating prompts (e.g., "You don't have to know your future yet").
- **Key Highlight Words**: Frequently combined with inline background pill highlights or color tints in Electric Lime (`#B7F34A`) or Purple (`#7C5CFC`) to emphasize dynamic keywords within headlines.
- **Body & Explanatory Copy**: Maintained at medium weight (`500`) for enhanced scannability and reading comfort on mobile screens.
- **Micro-labels & Badges**: Utilize semi-bold to bold weights (`600`–`700`) with uppercase or tight metrics for stats, day streaks, and badge labels.

## Layout & Spacing

The layout is built for native mobile screens using a responsive fluid 4-column grid framework bounded within safe-area insets:

- **Horizontal Margins**: Standardized at `20px` (`1.25rem`) on standard mobile displays, compressing to `16px` (`1rem`) on smaller devices.
- **Grid Gutters**: Set to `12px` to `16px` for dense multi-option grids (such as the 3x3 category exploration tiles or 4-up metric streaks).
- **Rhythm & Stacking**: Vertical module blocks maintain consistent `16px` to `24px` spacing intervals, allowing high information density while preserving breathing room around interactive decision cards.
- **Sticky Actions**: Full-width primary action buttons pin to the bottom safe zone with `16px` surrounding clearance, ensuring one-thumb ergonomics.

## Elevation & Depth

Visual hierarchy relies on crisp surface layering, active border contours, and subtle ambient shadows rather than heavy skeuomorphism:

- **Ground & Cards**: Pure white (`#FFFFFF`) containers sit directly on top of the neutral off-white (`#F7F7F2`) screen plane, isolated by ultra-soft ambient drop shadows: `0 4px 16px rgba(23, 32, 51, 0.05)`.
- **Selected & Interactive Cards**: Selected state modules discard faint outlines in favor of a vibrant `2px` solid `#B7F34A` perimeter stroke combined with a gentle lime ambient glow: `0 8px 24px rgba(183, 243, 74, 0.25)`.
- **Floating Bottom Navigation**: Elevated pill-dock or full-bleed bottom nav bar with `0 -4px 20px rgba(16, 20, 31, 0.04)` and faint top divider border (`#F0F0EB`).
- **Dark Mode Hero & Splash Surfaces**: Navy base (`#172033`) surfaces utilize tinted neon glows behind 3D companion characters, utilizing radial gradients extending from `#B7F34A` and `#7C5CFC` at 15–25% opacity.

## Shapes

The interface embraces a hyper-rounded, pill-shaped aesthetic to evoke approachability, playfulness, and youth-oriented warmth:

- **Pill Buttons & Tags**: Primary CTAs, tab switcher segments, and quick-filter tags utilize complete pill geometry (`rounded-full` / `9999px`).
- **Card Containers & Modules**: Feature prominent rounded corners (`20px` to `24px`), softening content tiles, mission trackers, and survey question blocks.
- **Icon Tiles & Avatars**: Feature super-ellipse roundedness (`16px` to `20px`), creating squircle-like physical toy-like touch points.

## Components

### Buttons & CTAs
- **Primary Electric Button**: Full pill geometry (`rounded-full`), `#B7F34A` surface, `#172033` bold label text (`label-lg`), height `54px`. Active tap scale effect `0.97`.
- **Dark Master Action**: Full pill geometry, `#172033` surface, `#FFFFFF` bold label text, height `54px`. Used for bottom progress steps ("Continue", "Next").
- **Subtle Ghost / Text Button**: Text with underlined accent or pill borderless container for secondary actions ("I already know what I want").

### Question & Exploration Cards
- **Single / Multi-Select Tile Cards**: Pure white surface, `20px` corner radius, internal padding `16px`. Default state has a `1px` subtle border `#F0F0EB`. Selected state applies a `2px` border in `#B7F34A` or dark navy `#172033` with an active fill or checkmark icon.
- **3x3 Activity Matrix Tiles**: Vertical layout cards containing a squircle icon container with vibrant pastel background (`#E8F2FF`, `#F3E8FF`, `#F4FEE2`), bold label underneath, and subtle selection ring.

### Metric Cards & Streak Counters
- **Stat Blocks**: White background, `16px` rounded corners, housing an icon at the top (fire streak, clipboard, grid, user icon) followed by bold metric number (`headline-md`) and muted label (`label-sm`).
- **Progress Ring / Journey Meter**: Circular and horizontal progress bars using `#172033` base tracks with dual gradient fills of `#B7F34A` and `#7C5CFC`.

### Segmented Tab Controls
- Dual or multi-option horizontal switcher enclosed in a neutral capsule (`#EBEBE6`), with the active option raised as a pure white or navy pill with smooth sliding motion.

### Bottom Navigation Bar
- Fixed clean white bottom bar housing 5 icon-and-label tabs. Active tab highlights in `#172033` with a small vibrant lime indicator dot or pill accent beneath the icon.

### Chat & AI Coach Bubbles
- GRIT Coach messages emerge from friendly character avatar nodes using soft pill-bubble cards (`#FFFFFF`), with pre-built quick-reply prompt pills lined up horizontally underneath.