---
name: authentic-web-design
description: Design guidance for creating authentic, human-crafted web interfaces that avoid the generic AI-generated look. Tailwind CSS focused.
---

## Purpose

This skill helps create web designs that feel intentional, refined, and human-made—avoiding the templated, over-polished aesthetic common in AI-generated interfaces.

## Core Philosophy

- **Content drives layout** — Design around what you're communicating, not around a template
- **Intentional imperfection** — Subtle asymmetry and variation feel more human than pixel-perfect grids
- **Restraint over decoration** — Every visual element should earn its place
- **Context-appropriate choices** — Match the brand and audience, not trends

Reference: These principles align with [Refactoring UI](https://www.refactoringui.com/) by Adam Wathan and Steve Schoger.

---

## Typography

**Font Selection**
- Avoid overly geometric or "startup-friendly" fonts (Inter, Poppins are overused)
- Consider: `font-serif` for editorial feel, or distinctive sans-serifs like Söhne, Satoshi, or General Sans
- Pair fonts by weight contrast, not just style (e.g., light heading + medium body)

**Tailwind Recommendations**
```
text-base leading-relaxed      /* Body text: 16px, 1.625 line-height */
text-lg leading-7              /* Comfortable reading */
tracking-tight                 /* Headings benefit from tighter tracking */
text-gray-700 dark:text-gray-300  /* Softer than pure black/white */
```

**Hierarchy**
- Use font-weight and size together—don't rely on size alone
- Limit yourself to 3-4 distinct text styles per page
- Body text: `text-gray-600` or `text-gray-700`, not `text-gray-900`

---

## Color

**Avoid These Clichés**
- Saturated purple-to-blue gradients ("SaaS purple")
- Pure black backgrounds (`bg-black`)
- Neon accent colors without purpose

**Better Approaches**
- Tinted neutrals: `bg-slate-50`, `bg-stone-100`, `bg-zinc-900`
- Muted, considered accents: `text-amber-600`, `bg-emerald-700`
- Subtle gradients using similar hues: `from-slate-50 to-gray-100`

**Tailwind Recommendations**
```
bg-stone-50                    /* Warm light background */
bg-zinc-900 text-zinc-100      /* Warm dark mode */
border-gray-200/60             /* Subtle, semi-transparent borders */
```

---

## Spacing & Layout

**Whitespace**
- Be generous—cramped layouts feel cheap
- Sections need room to breathe: `py-24` or `py-32`, not `py-8`
- Asymmetric spacing creates visual interest

**Grid Breaking**
- Not everything needs 12 columns
- Try `max-w-2xl` for content, `max-w-5xl` for wider sections
- Let content width vary by purpose

**Tailwind Recommendations**
```
max-w-2xl mx-auto              /* Readable content width */
space-y-16                     /* Generous vertical rhythm */
gap-8 lg:gap-12                /* Breathing room in grids */
px-6 lg:px-8                   /* Consistent horizontal padding */
```

**Anti-Patterns**
- Avoid identical section heights throughout
- Don't default to 3-column card grids
- Skip the "bento box" layout unless it serves content

---

## Visual Details

**Shadows**
- Subtle and diffused, not harsh drop shadows
- Use layered shadows for depth

```
shadow-sm                      /* Subtle lift */
shadow-lg shadow-gray-900/5    /* Soft, tinted shadow */
```

**Border Radius**
- Match brand personality—not everything needs `rounded-2xl`
- Sharp corners can feel premium: `rounded-none` or `rounded-sm`
- Be consistent within a design system

**Borders**
- Thin, low-contrast borders feel refined: `border border-gray-200/50`
- Avoid thick colored borders unless intentional

---

## Imagery & Graphics

- Avoid generic stock photos (especially diverse-team-at-whiteboard)
- Custom illustrations > icon libraries when possible
- Photography should have consistent treatment (color grade, crop style)
- Consider `grayscale` or `sepia` filters for cohesion

---

## Motion & Interaction

**Principles**
- Animation should be purposeful, not decorative
- Subtle is better: `duration-200` or `duration-300`
- Avoid bounce effects unless brand-appropriate

**Tailwind Recommendations**
```
transition-colors duration-200    /* Smooth color changes */
hover:translate-y-[-2px]          /* Subtle lift on hover */
ease-out                          /* Natural deceleration */
```

**Anti-Patterns**
- Don't animate everything on scroll
- Avoid "playful" micro-interactions that don't match tone
- Skip parallax effects unless they serve a purpose

---

## Common AI-Generated Patterns to Avoid

1. **Hero sections** with gradient blobs, floating 3D shapes, or "AI mesh" backgrounds
2. **Overuse of glassmorphism** (`backdrop-blur`) without purpose
3. **Generic testimonial carousels** with circular avatars
4. **Symmetric icon grids** with vague feature descriptions
5. **Cookie-cutter footer layouts** with excessive link columns
6. **Placeholder-feeling content** ("Lorem ipsum" energy even with real text)

---

## Quick Checklist

Before finalizing a design, ask:

- [ ] Would I know this wasn't a template if I saw it fresh?
- [ ] Does the typography feel considered, not default?
- [ ] Is there visual variety, or does every section feel the same?
- [ ] Are colors muted and intentional, not saturated and generic?
- [ ] Does whitespace feel generous, not cramped?
- [ ] Are interactive elements subtle and purposeful?

---

## References

- [Refactoring UI](https://www.refactoringui.com/) — Foundational design principles for developers
- [Typewolf](https://www.typewolf.com/) — Font pairing inspiration
- [Tailwind UI](https://tailwindui.com/) — Well-crafted component examples (use as reference, not templates)
