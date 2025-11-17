# 📋 Portfolio Integration Guide - Dino Runner Game

This guide will help you add the Dino Runner game to your portfolio website.

## 🎯 Quick Links

| Item | Link |
|------|------|
| **GitHub Repository** | https://github.com/ieoquda/dino-runner-game |
| **Live Game** | https://ieoquda.github.io/dino-runner-game/ |
| **Game Name** | Dino Runner - Endless Adventure |

## 📝 Project Description

A fast-paced, endless dinosaur runner game with smooth animations, sound effects, and progressive difficulty. Features unlimited scoring, high score tracking, and offline support.

### Key Features to Highlight:
- **Endless Gameplay**: Play indefinitely with unlimited scoring
- **Progressive Difficulty**: Speed increases by 0.5x every 100 points
- **High FPS Animations**: Smooth 60+ FPS rendering with particle effects
- **Sound Effects**: Jump and collision audio using Web Audio API
- **Offline Support**: Works completely without internet
- **High Score Persistence**: Automatic localStorage saving
- **Responsive Design**: Works on desktop and mobile

## 🏗️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Canvas**: HTML5 Canvas API
- **Audio**: Web Audio API
- **Storage**: Browser localStorage

## 📊 Game Statistics

| Metric | Value |
|--------|-------|
| **Target FPS** | 60+ frames per second |
| **Canvas Size** | 800x400 pixels |
| **Obstacle Types** | 2 (Cacti, Birds) |
| **Speed Multiplier** | 0.5x every 100 points |
| **Base Speed** | 6 pixels/frame |
| **Gravity** | 0.6 pixels/frame² |

## 🎨 Portfolio Card Template

Use this HTML/Markdown snippet to add the game to your portfolio:

### HTML Version
```html
<div class="portfolio-project">
  <h3>🦖 Dino Runner - Endless Adventure</h3>
  <p>A fast-paced endless dinosaur runner game with smooth animations, sound effects, and progressive difficulty.</p>
  
  <h4>Features:</h4>
  <ul>
    <li>Endless gameplay with unlimited scoring</li>
    <li>Speed increases by 0.5x every 100 points</li>
    <li>Smooth 60+ FPS animations and particle effects</li>
    <li>Jump and collision sound effects</li>
    <li>High score tracking with localStorage</li>
    <li>Offline-capable with no external dependencies</li>
    <li>Responsive design for desktop and mobile</li>
  </ul>
  
  <h4>Technologies:</h4>
  <p>React 19 • TypeScript • Tailwind CSS • HTML5 Canvas • Web Audio API</p>
  
  <h4>Links:</h4>
  <ul>
    <li><a href="https://github.com/ieoquda/dino-runner-game">View on GitHub</a></li>
    <li><a href="https://ieoquda.github.io/dino-runner-game/">Play Game</a></li>
  </ul>
</div>
```

### Markdown Version
```markdown
## 🦖 Dino Runner - Endless Adventure

A fast-paced endless dinosaur runner game with smooth animations, sound effects, and progressive difficulty.

### Features
- Endless gameplay with unlimited scoring
- Speed increases by 0.5x every 100 points
- Smooth 60+ FPS animations and particle effects
- Jump and collision sound effects
- High score tracking with localStorage
- Offline-capable with no external dependencies
- Responsive design for desktop and mobile

### Technologies
React 19 • TypeScript • Tailwind CSS • HTML5 Canvas • Web Audio API

### Links
- [View on GitHub](https://github.com/ieoquda/dino-runner-game)
- [Play Game](https://ieoquda.github.io/dino-runner-game/)
```

## 🚀 Enabling GitHub Pages

To make the game playable at `https://ieoquda.github.io/dino-runner-game/`:

1. Go to your repository: https://github.com/ieoquda/dino-runner-game
2. Click **Settings** (gear icon)
3. Scroll to **Pages** section
4. Under "Build and deployment":
   - Select **Source**: `Deploy from a branch`
   - Select **Branch**: `main`
   - Select **Folder**: `/root` (or `/` if available)
5. Click **Save**
6. Wait 1-2 minutes for the site to build
7. Your game will be live at: https://ieoquda.github.io/dino-runner-game/

## 📱 Testing Before Adding to Portfolio

1. **Desktop Testing**:
   - Test on Chrome, Firefox, Safari, Edge
   - Verify keyboard controls (SPACE, UP ARROW)
   - Check high score persistence

2. **Mobile Testing**:
   - Test on iOS Safari and Android Chrome
   - Verify touch controls (tap to jump)
   - Check responsive layout

3. **Performance**:
   - Monitor FPS counter (should be 60+)
   - Test on slower devices
   - Verify offline functionality

## 💡 Portfolio Presentation Ideas

### Project Title Options
- "Dino Runner - Endless Adventure Game"
- "Dinosaur Runner: A High-Performance Game"
- "Dino Runner: Full-Stack Game Development"

### Talking Points
1. **Technical Achievement**: Built with React and Canvas for high-performance rendering
2. **User Experience**: Smooth animations at 60+ FPS with sound effects
3. **Game Design**: Progressive difficulty system that keeps players engaged
4. **Offline Support**: Fully functional without internet connection
5. **Data Persistence**: Automatic high score tracking using localStorage

### Metrics to Highlight
- **Performance**: 60+ FPS consistent rendering
- **Compatibility**: Works on all modern browsers (desktop & mobile)
- **Code Quality**: TypeScript for type safety
- **User Engagement**: Endless gameplay with unlimited scoring

## 📞 Support & Updates

If you want to add more features to the game later, consider:
- Leaderboard system (with backend)
- Multiple difficulty modes
- Power-ups and special items
- Sound volume controls
- Theme switcher (dark/light mode)
- Mobile-specific optimizations

## 🎓 Learning Resources

This project demonstrates:
- **React Hooks**: useState, useRef, useEffect
- **Canvas API**: Drawing, animations, collision detection
- **Web Audio API**: Sound generation and playback
- **Performance Optimization**: RequestAnimationFrame, efficient rendering
- **Game Development**: Game loops, physics, collision detection
- **TypeScript**: Type-safe game state management

---

**Good luck with your portfolio! 🎉**
