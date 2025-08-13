'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SnakeGameProps {
  onClose: () => void;
}

const BOARD_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const CELL_SIZE = 20;

export default function SnakeGame({ onClose }: SnakeGameProps) {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 10, y: 10 });
    setDirection({ x: 1, y: 0 }); // Começa movendo para direita
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted || direction.x === 0 && direction.y === 0) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { 
        x: newSnake[0].x + direction.x, 
        y: newSnake[0].y + direction.y 
      };

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true);
        setGameStarted(false);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameStarted(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameStarted, generateFood]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      if (!gameStarted && !gameOver) return;
      
      e.preventDefault();
      
      switch (e.key) {
        case 'ArrowUp':
          setDirection(prev => prev.y !== 1 ? { x: 0, y: -1 } : prev);
          break;
        case 'ArrowDown':
          setDirection(prev => prev.y !== -1 ? { x: 0, y: 1 } : prev);
          break;
        case 'ArrowLeft':
          setDirection(prev => prev.x !== 1 ? { x: -1, y: 0 } : prev);
          break;
        case 'ArrowRight':
          setDirection(prev => prev.x !== -1 ? { x: 1, y: 0 } : prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver, onClose]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [moveSnake, gameStarted, gameOver]);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div 
        className="bg-black/80 backdrop-blur-lg border border-purple-700/30 rounded-xl p-6 max-w-lg w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition text-sm font-bold z-10"
        >
          ✕
        </button>

        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-purple-200 mb-2">🐍 Snake Game</h3>
          <p className="text-purple-300">Score: {score}</p>
        </div>

        {/* Game Board */}
        <div className="flex justify-center mb-4">
          <div 
            className="border-2 border-purple-600 bg-gray-900 relative"
            style={{
              width: BOARD_SIZE * CELL_SIZE,
              height: BOARD_SIZE * CELL_SIZE
            }}
          >
            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={index}
                className={`absolute ${index === 0 ? 'bg-purple-400' : 'bg-purple-600'} rounded-sm`}
                style={{
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                  width: CELL_SIZE - 1,
                  height: CELL_SIZE - 1
                }}
              />
            ))}
            
            {/* Food */}
            <div
              className="absolute bg-red-500 rounded-full animate-pulse"
              style={{
                left: food.x * CELL_SIZE + 2,
                top: food.y * CELL_SIZE + 2,
                width: CELL_SIZE - 4,
                height: CELL_SIZE - 4
              }}
            />
          </div>
        </div>

        {/* Game Controls */}
        {!gameStarted && !gameOver && (
          <div className="text-center">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition mb-3"
            >
              🎮 Iniciar Jogo
            </button>
            <p className="text-purple-300 text-sm">Use as setas para controlar a cobrinha</p>
          </div>
        )}

        {gameOver && (
          <div className="text-center">
            <p className="text-red-400 mb-3 text-lg">💀 Game Over!</p>
            <p className="text-purple-300 mb-4">Pontuação Final: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
            >
              🔄 Jogar Novamente
            </button>
          </div>
        )}

        {gameStarted && !gameOver && (
          <div className="text-center">
            <p className="text-purple-300 text-sm">Use as setas ↑ ↓ ← → para mover</p>
            <p className="text-purple-400 text-xs mt-1">ESC para sair</p>
          </div>
        )}
      </div>
    </div>
  );
}
