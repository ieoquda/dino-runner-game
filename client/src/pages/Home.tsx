import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface GameState {
  score: number;
  gameOver: boolean;
  gameStarted: boolean;
  speed: number;
  speedMultiplier: number;
}

interface Obstacle {
  x: number;
  width: number;
  height: number;
  type: 'cactus' | 'bird';
  rotation?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const GROUND_HEIGHT = 100;
const DINO_WIDTH = 44;
const DINO_HEIGHT = 47;
const BASE_SPEED = 6;
const OBSTACLE_WIDTH = 24;
const OBSTACLE_HEIGHT = 42;
const GRAVITY = 0.6;
const JUMP_POWER = -12;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    gameOver: false,
    gameStarted: false,
    speed: BASE_SPEED,
    speedMultiplier: 1,
  });

  const gameRef = useRef({
    dino: { x: 50, y: CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT, width: DINO_WIDTH, height: DINO_HEIGHT, velocityY: 0, jumping: false, animationFrame: 0 },
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    score: 0,
    gameOver: false,
    gameStarted: false,
    speed: BASE_SPEED,
    speedMultiplier: 1,
    obstacleTimer: 0,
    obstacleInterval: 120,
    frameCount: 0,
    gravity: GRAVITY,
    jumpPower: JUMP_POWER,
    highScore: localStorage.getItem('dinoHighScore') ? parseInt(localStorage.getItem('dinoHighScore')!) : 0,
    lastFrameTime: 0,
    fps: 0,
    shakeIntensity: 0,
    shakeX: 0,
    shakeY: 0,
  });

  const audioRef = useRef<{ [key: string]: HTMLAudioElement }>({});

  const createBeepSound = (frequency: number, duration: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  useEffect(() => {
    audioRef.current = {
      jump: new Audio(),
      collision: new Audio(),
    };
  }, []);

  const playSound = (soundName: string) => {
    try {
      if (soundName === 'jump') {
        createBeepSound(600, 0.1);
      } else if (soundName === 'collision') {
        createBeepSound(200, 0.2);
      }
    } catch (e) {
      // Silently fail if audio can't play
    }
  };

  const createParticles = (x: number, y: number, color: string, count: number = 8) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 3 + Math.random() * 2;
      gameRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 30,
        maxLife: 30,
        color,
      });
    }
  };

  const startGame = () => {
    const currentHighScore = gameRef.current.highScore;
    gameRef.current = {
      dino: { x: 50, y: CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT, width: DINO_WIDTH, height: DINO_HEIGHT, velocityY: 0, jumping: false, animationFrame: 0 },
      obstacles: [],
      particles: [],
      score: 0,
      gameOver: false,
      gameStarted: true,
      speed: BASE_SPEED,
      speedMultiplier: 1,
      obstacleTimer: 0,
      obstacleInterval: 120,
      frameCount: 0,
      gravity: GRAVITY,
      jumpPower: JUMP_POWER,
      highScore: currentHighScore,
      lastFrameTime: 0,
      fps: 0,
      shakeIntensity: 0,
      shakeX: 0,
      shakeY: 0,
    };

    setGameState({
      score: 0,
      gameOver: false,
      gameStarted: true,
      speed: BASE_SPEED,
      speedMultiplier: 1,
    });
  };

  const handleJump = () => {
    if (!gameRef.current.gameStarted || gameRef.current.gameOver) return;

    const dino = gameRef.current.dino;
    if (!dino.jumping && dino.y >= CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT - 5) {
      dino.jumping = true;
      dino.velocityY = gameRef.current.jumpPower;
      playSound('jump');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && gameRef.current.gameStarted) {
        e.preventDefault();
        handleJump();
      }
      if (e.code === 'Space' && !gameRef.current.gameStarted) {
        e.preventDefault();
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const gameLoop = () => {
      const game = gameRef.current;

      if (!game.gameStarted) {
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.fillStyle = '#333';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('DINO RUNNER', CANVAS_WIDTH / 2, 100);

        ctx.font = '24px Arial';
        ctx.fillText('Press SPACE or UP ARROW to Start', CANVAS_WIDTH / 2, 200);

        ctx.font = '16px Arial';
        ctx.fillText('Jump over obstacles and survive!', CANVAS_WIDTH / 2, 250);
        ctx.fillText('Speed increases every 100 points', CANVAS_WIDTH / 2, 280);

        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }

      if (!game.gameOver) {
        game.speedMultiplier = 1 + Math.floor(game.score / 100) * 0.5;
        game.speed = BASE_SPEED * game.speedMultiplier;

        const dino = game.dino;
        if (dino.jumping) {
          dino.velocityY += game.gravity;
          dino.y += dino.velocityY;

          if (dino.y >= CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT) {
            dino.y = CANVAS_HEIGHT - GROUND_HEIGHT - DINO_HEIGHT;
            dino.velocityY = 0;
            dino.jumping = false;
          }
        }

        game.obstacleTimer++;
        if (game.obstacleTimer > game.obstacleInterval) {
          const obstacleType = Math.random() > 0.5 ? 'cactus' : 'bird';
          game.obstacles.push({
            x: CANVAS_WIDTH,
            width: OBSTACLE_WIDTH,
            height: OBSTACLE_HEIGHT,
            type: obstacleType,
          });
          game.obstacleTimer = 0;
          game.obstacleInterval = Math.max(60, 120 - Math.floor(game.score / 50) * 5);
        }

        game.obstacles = game.obstacles.filter((obstacle) => {
          obstacle.x -= game.speed;
          if (obstacle.type === 'bird') {
            obstacle.rotation = (obstacle.rotation || 0) + 0.1;
          }
          return obstacle.x > -obstacle.width;
        });

        for (const obstacle of game.obstacles) {
          const dinoLeft = dino.x + 5;
          const dinoRight = dino.x + dino.width - 5;
          const dinoTop = dino.y + 5;
          const dinoBottom = dino.y + dino.height - 5;

          const obstacleLeft = obstacle.x;
          const obstacleRight = obstacle.x + obstacle.width;
          const obstacleTop = CANVAS_HEIGHT - GROUND_HEIGHT - obstacle.height;
          const obstacleBottom = CANVAS_HEIGHT - GROUND_HEIGHT;

          if (
            dinoLeft < obstacleRight &&
            dinoRight > obstacleLeft &&
            dinoTop < obstacleBottom &&
            dinoBottom > obstacleTop
          ) {
            game.gameOver = true;
            game.shakeIntensity = 15;
            createParticles(obstacle.x + obstacle.width / 2, CANVAS_HEIGHT - GROUND_HEIGHT, obstacle.type === 'cactus' ? '#228B22' : '#FF6347', 12);
            if (game.score > game.highScore) {
              game.highScore = game.score;
              localStorage.setItem('dinoHighScore', game.score.toString());
            }
            playSound('collision');
            break;
          }
        }

        game.particles = game.particles.filter((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.2;
          particle.life--;
          return particle.life > 0;
        });

        if (game.shakeIntensity > 0) {
          game.shakeIntensity *= 0.9;
          game.shakeX = (Math.random() - 0.5) * game.shakeIntensity;
          game.shakeY = (Math.random() - 0.5) * game.shakeIntensity;
        } else {
          game.shakeX = 0;
          game.shakeY = 0;
        }
      }

      ctx.save();
      ctx.translate(game.shakeX, game.shakeY);

      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = '#333';
      ctx.fillRect(0, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, 4);
      for (let i = 0; i < CANVAS_WIDTH; i += 20) {
        ctx.fillRect(i - (game.speed * game.frameCount) % 20, CANVAS_HEIGHT - GROUND_HEIGHT + 10, 10, 2);
      }

      const dino = game.dino;
      ctx.save();
      ctx.translate(dino.x + dino.width / 2, dino.y + dino.height / 2);
      
      if (dino.jumping && dino.velocityY < 0) {
        ctx.rotate(-0.1);
      } else if (dino.jumping && dino.velocityY > 0) {
        ctx.rotate(0.1);
      }
      
      ctx.translate(-(dino.width / 2), -(dino.height / 2));
      
      const gradient = ctx.createLinearGradient(0, 0, 0, dino.height);
      gradient.addColorStop(0, '#7CFC00');
      gradient.addColorStop(1, '#228B22');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dino.width, dino.height);
      
      ctx.fillStyle = '#228B22';
      const legOffset = Math.sin(game.frameCount * 0.1) * 2;
      ctx.fillRect(8, dino.height - 8, 4, 8 + legOffset);
      ctx.fillRect(dino.width - 12, dino.height - 8, 4, 8 - legOffset);
      
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(dino.width - 8, 8, 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();

      for (const obstacle of game.obstacles) {
        ctx.save();
        
        if (obstacle.type === 'cactus') {
          ctx.fillStyle = '#228B22';
          const baseY = CANVAS_HEIGHT - GROUND_HEIGHT - obstacle.height;
          
          ctx.fillRect(obstacle.x + 4, baseY + 10, 16, obstacle.height - 10);
          
          ctx.fillRect(obstacle.x - 2, baseY + 15, 6, 8);
          ctx.fillRect(obstacle.x + 20, baseY + 20, 6, 8);
          
          ctx.fillStyle = '#1a6b1a';
          for (let i = 0; i < 3; i++) {
            ctx.fillRect(obstacle.x + 2, baseY + 15 + i * 10, 2, 4);
            ctx.fillRect(obstacle.x + 20, baseY + 15 + i * 10, 2, 4);
          }
        } else {
          ctx.translate(obstacle.x + obstacle.width / 2, CANVAS_HEIGHT - GROUND_HEIGHT - obstacle.height / 2);
          ctx.rotate(obstacle.rotation || 0);
          ctx.translate(-(obstacle.width / 2), -(obstacle.height / 2));
          
          ctx.fillStyle = '#FF6347';
          ctx.beginPath();
          ctx.ellipse(obstacle.width / 2, obstacle.height / 2, obstacle.width / 2, obstacle.height / 3, 0, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = '#DC143C';
          ctx.beginPath();
          ctx.moveTo(obstacle.width / 2, obstacle.height / 2);
          ctx.lineTo(obstacle.width, obstacle.height / 3);
          ctx.lineTo(obstacle.width, obstacle.height * 0.66);
          ctx.fill();
          
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(obstacle.width * 0.7, obstacle.height / 2 - 2, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }

      for (const particle of game.particles) {
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life / particle.maxLife;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, 300, 80);
      
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${game.score}`, 20, 30);
      ctx.fillText(`Speed: ${game.speedMultiplier.toFixed(1)}x`, 20, 55);
      ctx.fillText(`High: ${gameRef.current.highScore}`, 20, 80);

      if (game.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const pulse = Math.sin(game.frameCount * 0.05) * 0.1 + 0.9;
        ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, 150);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 32px Arial';
        ctx.fillText(`Final Score: ${game.score}`, CANVAS_WIDTH / 2, 220);
        
        if (game.score === game.highScore && game.score > 0) {
          ctx.font = 'bold 24px Arial';
          ctx.fillStyle = '#FFD700';
          ctx.fillText('NEW HIGH SCORE!', CANVAS_WIDTH / 2, 260);
        } else if (game.highScore > 0) {
          ctx.font = '18px Arial';
          ctx.fillStyle = '#aaa';
          ctx.fillText(`High Score: ${game.highScore}`, CANVAS_WIDTH / 2, 260);
        }

        ctx.font = '20px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('Press SPACE to Restart', CANVAS_WIDTH / 2, 310);
      }

      ctx.restore();

      setGameState({
        score: game.score,
        gameOver: game.gameOver,
        gameStarted: game.gameStarted,
        speed: game.speed,
        speedMultiplier: game.speedMultiplier,
      });

      const now = performance.now();
      if (game.lastFrameTime > 0) {
        game.fps = Math.round(1000 / (now - game.lastFrameTime));
      }
      game.lastFrameTime = now;

      ctx.fillStyle = '#666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`FPS: ${game.fps}`, CANVAS_WIDTH - 20, 20);

      game.frameCount++;

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50 p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🦖 Dino Runner</h1>
        <p className="text-gray-600">Endless Adventure Game</p>
      </div>

      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden border-4 border-gray-800">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="block bg-blue-50 cursor-pointer"
          onClick={handleJump}
        />
      </div>

      <div className="mt-6 text-center space-y-2">
        <p className="text-lg font-semibold text-gray-800">Current Score: {gameState.score}</p>
        <p className="text-gray-600">Speed Multiplier: {gameState.speedMultiplier.toFixed(1)}x</p>
        {gameState.gameOver && (
          <Button onClick={startGame} className="mt-4 gap-2">
            <RotateCcw size={18} /> Play Again
          </Button>
        )}
        {!gameState.gameStarted && !gameState.gameOver && (
          <Button onClick={startGame} className="mt-4" size="lg">
            Start Game
          </Button>
        )}
      </div>

      <div className="mt-8 max-w-2xl text-center text-sm text-gray-600">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">How to Play</h2>
        <ul className="space-y-1">
          <li>🎮 Press <kbd className="bg-gray-200 px-2 py-1 rounded">SPACE</kbd> or <kbd className="bg-gray-200 px-2 py-1 rounded">UP ARROW</kbd> to jump</li>
          <li>🌵 Avoid green cacti and red birds</li>
          <li>📈 Your score increases as you survive longer</li>
          <li>⚡ Game speed increases every 100 points (0.5x multiplier)</li>
          <li>🏃 Endless gameplay with unlimited scoring</li>
          <li>💾 Your high score is saved automatically</li>
          <li>🔊 Enjoy smooth animations and sound effects</li>
        </ul>
      </div>
    </div>
  );
}
