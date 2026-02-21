/**
 * DragonBallGame.tsx
 * 
 * This is a React Component - a reusable piece of UI
 * 
 * Key React Concepts Used:
 * 1. useState - Manages component state (data that can change)
 * 2. useEffect - Runs code when component loads or state changes
 * 3. useRef - References DOM elements directly
 * 4. Event Handlers - Functions that respond to user actions
 */

import { useState, useEffect, useRef } from 'react';
import './DragonBallGame.css';

/**
 * Main Game Component
 * This is a "function component" - the modern way to write React components
 */
function DragonBallGame() {
  // ==========================================
  // STATE - Data that changes over time
  // ==========================================
  
  /**
   * useState Hook Pattern:
   * const [value, setValue] = useState(initialValue)
   * 
   * - value: Current state value
   * - setValue: Function to update the state
   * - initialValue: What value starts as
   */
  
  // Game state: 'menu' | 'playing' | 'gameover'
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  
  // Time remaining (in seconds)
  const [timeLeft, setTimeLeft] = useState(30);
  
  // Current score
  const [score, setScore] = useState(0);
  
  // What the user is currently typing
  const [currentInput, setCurrentInput] = useState('');
  
  /**
   * Sets in JavaScript/TypeScript:
   * - Like an array, but only stores unique values
   * - Perfect for tracking which characters have been guessed
   */
  const [guessedCharacters, setGuessedCharacters] = useState<Set<string>>(new Set());
  
  // Array of mistakes (wrong guesses)
  const [mistakes, setMistakes] = useState<Array<{input: string, reason: string}>>([]);
  
  // Feedback message shown to user
  const [message, setMessage] = useState('');
  
  // List of all valid characters (loaded from JSON)
  const [characters, setCharacters] = useState<string[]>([]);
  
  // Game settings
  const [settings, setSettings] = useState({
    initialTime: 30,
    timeIncrement: 5
  });
  
  const [showSettings, setShowSettings] = useState(false);
  
  // ==========================================
  // REFS - Direct references to DOM elements
  // ==========================================
  
  /**
   * useRef creates a reference that persists across renders
   * - inputRef: References the text input so we can focus it
   * - timerRef: Holds the interval ID for our countdown timer
   * - characterMapRef: Holds the lookup map (doesn't need to trigger re-renders)
   */
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);
  const characterMapRef = useRef(new Map<string, string>());

  // ==========================================
  // EFFECTS - Side effects that run at specific times
  // ==========================================
  
  /**
   * Effect #1: Load character data when component mounts
   * 
   * useEffect Hook Pattern:
   * useEffect(() => { code }, [dependencies])
   * 
   * - Empty array [] means: "Run once when component first loads"
   * - If array has values, run when those values change
   */
  useEffect(() => {
    // fetch() is the browser API for making HTTP requests
    fetch('/dragonball_characters.json')
      .then(res => res.json())  // Convert response to JSON
      .then(data => {
        // Save characters to state
        setCharacters(data.characters);
        
        /**
         * Build a "lookup map" for fast character matching
         * 
         * Why? Users might type "goku" or "Goku" or "GOKU"
         * We normalize all names and create a map:
         * "goku" -> "Goku"
         * "vegeta" -> "Vegeta"
         * etc.
         */
        const map = new Map<string, string>();
        data.characters.forEach((char: string) => {
          const normalized = normalize(char);
          if (!map.has(normalized)) {
            map.set(normalized, char);
          }
        });
        characterMapRef.current = map;
      })
      .catch(err => {
        console.error('Failed to load characters:', err);
        setMessage('Error loading character data. Please refresh the page.');
      });
  }, []); // Empty array = run once on mount

  /**
   * Effect #2: Timer countdown
   * 
   * This runs whenever gameState or timeLeft changes
   */
  useEffect(() => {
    // Only run timer when actively playing and time remains
    if (gameState === 'playing' && timeLeft > 0) {
      /**
       * setInterval runs a function repeatedly
       * setInterval(function, milliseconds)
       */
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          // prev is the current value of timeLeft
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Run every 1000ms (1 second)
      
      /**
       * Cleanup function - runs when effect is removed
       * This prevents memory leaks by clearing the interval
       */
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [gameState, timeLeft]);

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================

  /**
   * Normalize a string for comparison
   * "Goku Black" -> "gokublack"
   * 
   * Why? So "goku black", "Goku Black", "GOKU BLACK" all match
   */
  const normalize = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')  // Remove non-alphanumeric
      .trim();
  };

  /**
   * Check if a character name overlaps with already guessed names
   * Example: If "Goku" is guessed, "Goku Black" overlaps
   */
  const hasOverlap = (newChar: string, guessedSet: Set<string>): string | null => {
    const newNormalized = normalize(newChar);
    
    for (const guessed of guessedSet) {
      const guessedNormalized = normalize(guessed);
      
      // Check if one contains the other
      if (newNormalized.includes(guessedNormalized) || 
          guessedNormalized.includes(newNormalized)) {
        return guessed;
      }
    }
    return null;
  };

  // ==========================================
  // GAME LOGIC FUNCTIONS
  // ==========================================

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(settings.initialTime);
    setScore(0);
    setGuessedCharacters(new Set());
    setMistakes([]);
    setCurrentInput('');
    setMessage('');
    
    // Focus the input after a brief delay (ensures DOM is ready)
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const endGame = () => {
    setGameState('gameover');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  /**
   * Handle form submission (when user presses Enter)
   * 
   * Event Handlers in React:
   * - Receive an event object (e)
   * - e.preventDefault() stops default browser behavior
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // Prevent page reload
    
    if (!currentInput.trim()) return;
    
    const normalized = normalize(currentInput);
    const matchedCharacter = characterMapRef.current.get(normalized);
    
    // Validation #1: Is it a valid character?
    if (!matchedCharacter) {
      setMistakes(prev => [...prev, {
        input: currentInput,
        reason: 'Not a Dragon Ball character'
      }]);
      setMessage(`❌ "${currentInput}" is not a recognized Dragon Ball character`);
      setCurrentInput('');
      return;
    }
    
    // Validation #2: Already guessed?
    if (guessedCharacters.has(matchedCharacter)) {
      setMistakes(prev => [...prev, {
        input: currentInput,
        reason: 'Already guessed'
      }]);
      setMessage(`❌ "${matchedCharacter}" already guessed!`);
      setCurrentInput('');
      return;
    }
    
    // Validation #3: Does it overlap?
    const overlap = hasOverlap(matchedCharacter, guessedCharacters);
    if (overlap) {
      setMistakes(prev => [...prev, {
        input: currentInput,
        reason: `Overlaps with "${overlap}"`
      }]);
      setMessage(`❌ "${matchedCharacter}" overlaps with "${overlap}"`);
      setCurrentInput('');
      return;
    }
    
    // ✅ Valid answer! Update state
    setGuessedCharacters(prev => new Set([...prev, matchedCharacter]));
    setScore(prev => prev + 1);
    setTimeLeft(prev => prev + settings.timeIncrement);
    setMessage(`✓ ${matchedCharacter}`);
    setCurrentInput('');
  };

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================

  const resetSettings = () => {
    setSettings({
      initialTime: 30,
      timeIncrement: 5
    });
  };

  const copyResults = () => {
    const text = `Dragon Ball Character Game 🐉\nScore: ${score}\n\nCharacters named:\n${Array.from(guessedCharacters).join(', ')}`;
    navigator.clipboard.writeText(text);
    setMessage('✓ Copied to clipboard!');
  };

  const copyList = () => {
    const text = Array.from(guessedCharacters).join('\n');
    navigator.clipboard.writeText(text);
    setMessage('✓ List copied to clipboard!');
  };

  // ==========================================
  // RENDER - What gets displayed
  // ==========================================
  
  /**
   * JSX - JavaScript XML
   * - Looks like HTML but is actually JavaScript
   * - {} lets you embed JavaScript expressions
   * - className instead of class (because class is a JS keyword)
   * - Event handlers use camelCase: onClick, onChange
   */
  return (
    <div className="dragonball-game">
      <header className="game-header">
        <h1>🐉 Dragon Ball Character Challenge</h1>
        <p className="subtitle">Name as many Dragon Ball characters as you can!</p>
      </header>

      {/* Conditional Rendering: Show different content based on gameState */}
      
      {/* MENU SCREEN */}
      {gameState === 'menu' && (
        <div className="menu-screen">
          <div className="rules">
            <h2>How to Play</h2>
            <ul>
              <li>Type Dragon Ball character names as fast as you can</li>
              <li>You start with {settings.initialTime} seconds</li>
              <li>Get +{settings.timeIncrement} seconds for each correct character</li>
              <li>No overlapping names (e.g., "Goku" and "Goku Black" both can't be used)</li>
              <li>When time runs out, game over!</li>
            </ul>
          </div>

          <button className="start-button" onClick={startGame}>
            Start Game
          </button>

          <button 
            className="settings-button"
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️ Settings
          </button>

          {showSettings && (
            <div className="settings-panel">
              <h3>Game Settings</h3>
              <div className="setting-row">
                <label>Initial time (seconds):</label>
                <input
                  type="number"
                  min="10"
                  max="120"
                  value={settings.initialTime}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    initialTime: parseInt(e.target.value) || 30
                  }))}
                />
              </div>
              <div className="setting-row">
                <label>Time bonus (seconds):</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.timeIncrement}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    timeIncrement: parseInt(e.target.value) || 5
                  }))}
                />
              </div>
              <button onClick={resetSettings}>Reset to Defaults</button>
            </div>
          )}

          <div className="game-info">
            <p>Character database: {characters.length} characters loaded</p>
          </div>
        </div>
      )}

      {/* PLAYING SCREEN */}
      {gameState === 'playing' && (
        <div className="playing-screen">
          <div className="game-stats">
            <div className="stat">
              <div className="stat-label">Score</div>
              <div className="stat-value">{score}</div>
            </div>
            <div className="stat timer">
              <div className="stat-label">Time</div>
              <div className={`stat-value ${timeLeft <= 10 ? 'low-time' : ''}`}>
                {timeLeft}s
              </div>
            </div>
          </div>

          {/* Form with controlled input */}
          <form onSubmit={handleSubmit} className="input-form">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type a character name..."
              className="character-input"
              autoComplete="off"
              autoFocus
            />
          </form>

          {message && (
            <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="guessed-list">
            <h3>Characters Named ({guessedCharacters.size})</h3>
            <div className="character-tags">
              {/* Array.from converts Set to Array so we can use .map */}
              {Array.from(guessedCharacters).map(char => (
                <span key={char} className="character-tag">{char}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GAME OVER SCREEN */}
      {gameState === 'gameover' && (
        <div className="gameover-screen">
          <h2>Game Over! 🐉</h2>
          <div className="final-score">
            <div className="score-display">
              <div className="score-number">{score}</div>
              <div className="score-label">characters named</div>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={copyResults}>📋 Copy Summary</button>
            <button onClick={copyList}>📝 Copy List</button>
            <button onClick={startGame} className="primary">Try Again</button>
          </div>

          <div className="results-section">
            <h3>Your Characters ({guessedCharacters.size})</h3>
            <div className="character-list">
              {Array.from(guessedCharacters).sort().map(char => (
                <div key={char} className="result-item">{char}</div>
              ))}
            </div>
          </div>

          {mistakes.length > 0 && (
            <div className="mistakes-section">
              <h3>Mistakes ({mistakes.length})</h3>
              <div className="mistakes-list">
                {mistakes.map((mistake, i) => (
                  <div key={i} className="mistake-item">
                    <span className="mistake-input">"{mistake.input}"</span>
                    <span className="mistake-reason">{mistake.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <footer className="game-footer">
        <p>Inspired by <a href="https://rose.systems/animalist/" target="_blank" rel="noopener noreferrer">Animalist</a></p>
        <p>Character data from <a href="https://dragonball.fandom.com/" target="_blank" rel="noopener noreferrer">Dragon Ball Wiki</a></p>
      </footer>
    </div>
  );
}

export default DragonBallGame;
