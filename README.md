# 🦖 Dino Runner - Endless Adventure Game

A fast-paced, endless dinosaur runner game inspired by the classic Chrome offline game. Jump over obstacles, survive as long as you can, and beat your high score!

## 🎮 Features

- **Endless Gameplay**: Play indefinitely with unlimited scoring
- **Progressive Difficulty**: Game speed increases by 0.5x multiplier every 100 points
- **Smooth Animations**: High FPS rendering with fluid dinosaur and obstacle animations
- **Sound Effects**: Jump and collision sounds using Web Audio API
- **Visual Effects**: Screen shake on collision and particle effects
- **High Score Tracking**: Automatically saves your best score using localStorage
- **Offline Support**: Works completely offline without internet connection
- **Responsive Design**: Works on desktop and mobile browsers
- **Keyboard & Touch Controls**: Jump using SPACE, UP ARROW, or click/tap

## 🚀 Quick Start

### Play Online
Visit the live game at: [GitHub Pages Link](https://yourusername.github.io/dino-runner-game/)

### Run Locally

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dino-runner-game.git
cd dino-runner-game
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 How to Play

- **Start Game**: Press `SPACE` or `UP ARROW` to begin
- **Jump**: Press `SPACE`, `UP ARROW`, or click/tap the canvas
- **Avoid Obstacles**: Jump over green cacti and red flying birds
- **Score Points**: Your score increases as you survive longer
- **Speed Increases**: Every 100 points, the game speed increases by 0.5x
- **Game Over**: Collision with any obstacle ends the game
- **Restart**: Press `SPACE` to play again

## 📊 Game Mechanics

| Feature | Details |
|---------|---------|
| **Base Speed** | 6 pixels per frame |
| **Speed Multiplier** | Increases by 0.5x every 100 points |
| **Gravity** | 0.6 pixels per frame² |
| **Jump Power** | -12 pixels per frame (upward velocity) |
| **Obstacle Spawn** | Decreases as score increases (min 60 frames) |
| **Obstacle Types** | Cacti (ground) and Birds (flying) |

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Canvas Rendering**: HTML5 Canvas API
- **Audio**: Web Audio API
- **Storage**: Browser localStorage

## 📁 Project Structure

```
dino-runner-game/
├── client/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx     # Main game component
│   │   ├── components/      # Reusable UI components
│   │   ├── App.tsx          # App router and layout
│   │   ├── main.tsx         # React entry point
│   │   └── index.css        # Global styles
│   └── index.html           # HTML template
├── README.md                # This file
├── package.json             # Project dependencies
└── vite.config.ts          # Vite configuration
```

## 🎨 Visual Design

- **Color Scheme**: Bright, retro-inspired colors
- **Dinosaur**: Green gradient body with animated legs
- **Obstacles**: Green cacti with spikes and red flying birds
- **Background**: Light blue gradient with animated ground pattern
- **UI**: Semi-transparent HUD showing score, speed, and high score

## 🔊 Audio Features

- **Jump Sound**: 600 Hz sine wave beep (100ms)
- **Collision Sound**: 200 Hz sine wave beep (200ms)
- **Volume**: Automatically adjusted for comfortable gameplay

## 💾 Data Persistence

Your high score is automatically saved in browser localStorage under the key `dinoHighScore`. This persists across browser sessions.

## 🚀 Deployment

### Deploy to GitHub Pages

1. Update the `homepage` field in `package.json`:
```json
"homepage": "https://yourusername.github.io/dino-runner-game"
```

2. Build the project:
```bash
npm run build
```

3. Deploy using GitHub Pages:
```bash
npm run deploy
```

Or manually push the `dist` folder to the `gh-pages` branch.

## 📱 Browser Support

- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance

- **Target FPS**: 60+ frames per second
- **Canvas Size**: 800x400 pixels
- **Optimizations**: RequestAnimationFrame for smooth rendering, efficient collision detection, particle pooling

## 🐛 Known Issues

None currently. Please report any bugs by opening an issue on GitHub.

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests with improvements.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Credits

Inspired by the classic Google Chrome offline dinosaur game. Built with React, TypeScript, and Tailwind CSS.

---

**Made with ❤️ for dinosaur game enthusiasts**

Enjoy the game and see how high you can score! 🦖🏃
