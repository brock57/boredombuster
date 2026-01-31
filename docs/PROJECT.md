# Boredom Buster - Project Manifest

## The Origin Story

Boredom Buster was born from a father-son vibe coding session. A 10-year-old had a vision: **a scrolling app for when you're bored** — you spin a wheel and it gives you ideas for things to do. There are achievements, chests with rewards, a shop for custom icons, and a premium tier to remove ads.

This is his first app, and it was built with the help of Claude Code in a single afternoon.

## The Vision (In His Own Words)

> It's a scrolling app for when you're bored. You scroll and then it pops up some ideas for you.
> There's going to be ads, so you can buy a premium ($5/month or $50/year).
> You could buy different icons for like $0.99.
> There are different achievements that you get, like "Do a hundred tasks on this app."
> You can get different chests and icons.

## Architecture

- **Type**: Progressive Web App (PWA)
- **Stack**: Vanilla HTML5, CSS3, JavaScript (no frameworks, no build tools)
- **UI Library**: Bootstrap 5 (CSS + JS bundle)
- **Storage**: localStorage for user progress persistence
- **Offline**: Service Worker with cache-first strategy
- **Deployment**: GitHub Pages (auto-deploys on push to `main`)
- **Audio**: Web Audio API (synthesized sounds, no audio files)

## Live URL

**https://brock57.github.io/boredombuster/**

## File Map

```
boredombuster/
├── index.html              # App shell - all 4 screens, overlays, nav
├── manifest.json           # PWA manifest (standalone, portrait, dark theme)
├── sw.js                   # Service worker (cache versioning, offline support)
├── css/
│   ├── app.css             # Custom dark neon theme, animations, all UI styles
│   ├── bootstrap.min.css   # Bootstrap 5
│   └── (other bootstrap files)
├── js/
│   ├── app.js              # All app logic: wheel, achievements, chests, sounds, PWA install
│   ├── bootstrap.bundle.min.js
│   └── (other bootstrap files)
├── icons/
│   ├── icon-192.png        # PWA icon (192x192) - "BB" with neon glow
│   ├── icon-512.png        # PWA icon (512x512) - "BB" with neon glow
│   └── generate-icons.html # Icon generator (canvas-based, for reference)
└── docs/
    ├── PROJECT.md           # This file
    └── description.md       # Original placeholder
```

## Current Features

### Core Mechanic
- **Wheel of Fortune spinner** with smooth 4-second animation (cubic ease-out)
- **4 categories**: Outdoor (green), Creative (magenta), Games (cyan), Funny (orange)
- **40 boredom buster ideas** (10 per category)
- Tick sound effects during spin, triumphant chime on result

### Gamification
- **10 achievements**: First Spin, 10/50/100 spins, Category Explorer, 4 Category Masters, Treasure Hunter
- **Chests**: Earned from achievements, contain secret ideas or special icons
- **6 chest rewards**: 3 secret activity ideas + 3 icon unlocks
- Achievement toast notifications with fanfare sound

### Monetization UI (Placeholder)
- Ad banner placeholders on Home and Spin screens
- Premium tier: $5/month or $50/year (saves $10/yr)
- Icon shop: 6 icons at $0.99 each

### PWA
- Installable on Android (native prompt) and iOS (Share > Add to Home Screen)
- Proactive install banner on first visit
- Offline support via service worker
- Dark themed standalone app (no browser chrome)

### Sound Effects
- Synthesized via Web Audio API (no audio files needed)
- Wheel tick sounds (speed matches wheel rotation)
- Result reveal chime (ascending C-E-G arpeggio)
- Chest open sparkle sound
- Achievement unlock fanfare

## Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Framework | None (vanilla JS) | First project, keep it simple, no build tools |
| Audio | Web Audio API synthesis | No files to load/cache, works offline, tiny footprint |
| Storage | localStorage | Simple, no backend needed for POC |
| Deployment | GitHub Pages | Free, auto-deploys, HTTPS for PWA |
| Icons | Python Pillow generated | Reproducible, no design tools needed |
| Theme | Dark + neon glow | Son chose "dark & cool, like a gaming app" |
| Spinner | Canvas-based wheel | Smooth animation, full control over rendering |

## Development Timeline

1. **Interview phase**: Defined categories, spinner style, achievements, chests, theme
2. **v1**: Built full app shell — home, spin, achievements, shop screens
3. **v2**: Added PWA support — manifest, service worker, icons, install banner
4. **v3**: Deployed to GitHub Pages, fixed paths for subdirectory hosting
5. **v4**: New BB icons with neon glow, install banner positioning fix
6. **v5**: Sound effects via Web Audio API, project manifest

---

## Future TODOs

### High Priority
- [ ] **Claude API integration** — Use the Anthropic API to generate personalized boredom buster ideas based on user preferences, weather, time of day, etc.
- [ ] **Track completed activities** — Let users mark ideas as "done" and keep a history log of activities they've completed
- [ ] **More categories and ideas** — Add categories like "Science", "Cooking", "Music", "Tech" with 10+ ideas each

### Medium Priority
- [ ] **Real payment integration** — Stripe or RevenueCat for premium subscriptions ($5/mo, $50/yr) and icon purchases ($0.99)
- [ ] **User accounts & cloud sync** — Firebase Auth + Firestore so progress syncs across devices
- [ ] **Social features** — Share ideas with friends, challenge friends to complete activities, leaderboards
- [ ] **Push notifications** — "Feeling bored? Time for a spin!" reminders

### Nice to Have
- [ ] **Animated chest opening** — Particle effects, glowing lights, dramatic reveal sequence
- [ ] **Haptic feedback** — Vibration on spin ticks and achievement unlocks (Navigator.vibrate API)
- [ ] **Dark/light theme toggle** — Some users might prefer a light theme
- [ ] **Activity difficulty ratings** — Easy, Medium, Hard tags on ideas
- [ ] **Favorites** — Let users save their favorite ideas for quick access
- [ ] **Custom ideas** — Users can add their own boredom buster ideas
- [ ] **Streaks** — Track daily usage streaks for bonus rewards
- [ ] **Seasonal content** — Holiday-themed ideas (Halloween challenges, summer activities, etc.)
- [ ] **Multiplayer mode** — "Spin for the group" where everyone does the same activity

## Contributing

This is a father-son learning project. Built with love, Claude Code, and a 10-year-old's imagination.
