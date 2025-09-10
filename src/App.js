import React, { useState, useEffect } from 'react';

const PlayerDashboard = () => {
  const [sparkles, setSparkles] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('entry'); // 'entry', 'teamSetup', 'dashboard'
  const [gameCode, setGameCode] = useState('');
  const [teamName, setTeamName] = useState('');
  const [isBuzzed, setIsBuzzed] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Sparkle background effect
  useEffect(() => {
    const createSparkle = () => {
      const shapes = ['✦', '•', '·', '*', '✧', '⋆', '◦'];
      const sparkle = {
        id: Math.random() * 100000,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: Math.random() < 0.4 ? 6 : Math.random() < 0.7 ? 10 : 14
      };

      setSparkles(prev => [...prev, sparkle]);

      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
      }, 250);
    };

    for(let i = 0; i < 5; i++) {
      setTimeout(createSparkle, i * 50);
    }

    const interval = setInterval(createSparkle, 100);
    return () => clearInterval(interval);
  }, []);

  // Handle game code submission
  const handleJoinGame = async () => {
    if (gameCode.length !== 6) return;
    setIsJoining(true);
    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);
      setCurrentScreen('teamSetup');
    }, 800);
  };

  // Handle team name submission
  const handleSubmitTeam = async () => {
    if (!teamName.trim() || teamName.length > 60) return;
    setIsJoining(true);
    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);
      setCurrentScreen('dashboard');
    }, 800);
  };

  // Handle buzzer press
  const handleBuzzerPress = () => {
    if (isBuzzed) return;
    setIsBuzzed(true);
    // Play buzz sound (will work when deployed with actual audio file)
    try {
      new Audio('/buzzer.mp3').play().catch(() => {});
    } catch (e) {}
  };

  // Handle name change
  const handleChangeName = () => {
    setCurrentScreen('teamSetup');
    setIsBuzzed(false);
  };

  // Handle exit game
  const handleExitGame = () => {
    setCurrentScreen('entry');
    setGameCode('');
    setTeamName('');
    setIsBuzzed(false);
  };

  const renderEntryScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-12 text-center">
        <img 
          src="/logo.png" 
          alt="Buzz Game Logo" 
          className="w-32 h-32 mx-auto mb-4 rounded-2xl shadow-2xl"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div className="text-6xl font-bold text-white hidden">
          🎯 BUZZ GAME 🎯
        </div>
      </div>

      {/* Game Code Entry */}
      <div className="w-full max-w-sm space-y-6">
        <input
          type="text"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value.toUpperCase().slice(0, 6))}
          className="w-full h-16 text-center text-3xl font-bold bg-purple-600 text-white border-4 border-yellow-400 rounded-2xl shadow-2xl placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-cyan-400 transition-all"
          placeholder="Enter 6-digit game code"
          maxLength={6}
        />
        
        <button
          onClick={handleJoinGame}
          disabled={gameCode.length !== 6 || isJoining}
          className={`w-full h-16 text-2xl font-bold rounded-2xl border-4 border-yellow-400 shadow-2xl transition-all transform ${
            gameCode.length === 6 && !isJoining
              ? 'bg-cyan-400 text-blue-900 hover:scale-95 hover:shadow-xl hover:bg-cyan-300 active:scale-90'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed opacity-50'
          }`}
        >
          {isJoining ? 'JOINING...' : '⭐️ JOIN GAME ⭐️'}
        </button>
      </div>
    </div>
  );

  const renderTeamSetupScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-8 text-center">
        <img 
          src="/logo.png" 
          alt="Buzz Game Logo" 
          className="w-24 h-24 mx-auto mb-2 rounded-xl shadow-xl"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div className="text-4xl font-bold text-white hidden">
          🎯 BUZZ GAME 🎯
        </div>
      </div>

      <h1 className="text-3xl font-bold text-white mb-8 text-center">ENTER TEAM NAME</h1>

      {/* Team Name Entry */}
      <div className="w-full max-w-sm space-y-6">
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value.slice(0, 60))}
          className="w-full h-16 text-center text-2xl font-bold bg-purple-600 text-white border-4 border-yellow-400 rounded-2xl shadow-2xl placeholder-purple-200 focus:outline-none focus:ring-4 focus:ring-cyan-400 transition-all"
          placeholder="Team Name"
          maxLength={60}
        />
        
        <div className="text-right text-purple-200 text-sm">
          {teamName.length}/60
        </div>

        <button
          onClick={handleSubmitTeam}
          disabled={!teamName.trim() || isJoining}
          className={`w-full h-16 text-2xl font-bold rounded-2xl border-4 border-yellow-400 shadow-2xl transition-all transform ${
            teamName.trim() && !isJoining
              ? 'bg-cyan-400 text-blue-900 hover:scale-95 hover:shadow-xl hover:bg-cyan-300 active:scale-90'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed opacity-50'
          }`}
        >
          {isJoining ? 'SUBMITTING...' : 'SUBMIT'}
        </button>
      </div>
    </div>
  );

  const renderDashboardScreen = () => (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <img 
          src="/logo.png" 
          alt="Buzz Game Logo" 
          className="w-20 h-20 mx-auto mb-2 rounded-xl shadow-xl"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div className="text-3xl font-bold text-white hidden mb-2">
          🎯 BUZZ GAME 🎯
        </div>
        <h1 className="text-2xl font-bold text-white">TEAM DASHBOARD</h1>
      </div>

      {/* Team Info Box - MUCH SMALLER & PURPLE */}
      <div className="bg-purple-700 border-4 border-yellow-400 rounded-2xl p-4 mb-6 shadow-2xl">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-1">⭐️ {teamName} ⭐️</h2>
          <p className="text-purple-100 text-lg mb-3">ARE HERE TO PLAY! 🎉</p>
          <div className="flex space-x-2">
            <button
              onClick={handleChangeName}
              className="flex-1 bg-blue-600 text-white font-bold py-2 px-3 rounded-lg border-2 border-blue-400 shadow-lg hover:scale-95 hover:shadow-xl hover:bg-blue-500 transition-all transform active:scale-90 text-sm"
            >
              CHG NAME
            </button>
            <button
              onClick={handleExitGame}
              className="flex-1 bg-violet-700 text-white font-bold py-2 px-3 rounded-lg border-2 border-violet-500 shadow-lg hover:scale-95 hover:shadow-xl hover:bg-violet-600 transition-all transform active:scale-90 text-sm"
            >
              EXIT
            </button>
          </div>
        </div>
      </div>

      {/* GIANT 3D Buzzer Button - BIGGER & DOMINATES SCREEN */}
      <div className="flex-1 flex items-center justify-center mb-6">
        <button
          onClick={handleBuzzerPress}
          disabled={isBuzzed}
          className={`w-80 h-80 rounded-full text-center font-bold transition-all transform p-1 ${
            isBuzzed
              ? 'bg-green-500 text-white scale-95 hover:bg-green-400'
              : 'bg-yellow-400 text-blue-900 hover:scale-105 hover:bg-yellow-300 active:scale-95'
          }`}
          style={{
            boxShadow: isBuzzed 
              ? 'inset 0 8px 0 rgba(255,255,255,0.2), 0 4px 10px rgba(0,0,0,0.3)'
              : 'inset 0 -8px 0 rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.3)'
          }}
        >
          {isBuzzed ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-3xl mb-2">🔥 YOU'RE IN! 🔥</div>
              <div className="text-lg leading-tight">WAIT FOR HOST TO CALL ON YOU</div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-2xl leading-tight mb-1">GET READY TO</div>
              <div className="text-2xl leading-tight mb-2">GET IN THE GAME!</div>
              <div className="text-4xl">🚨 BUZZ IN 🚨</div>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Button - BIGGER TEXT, SMALLER PADDING */}
      <button className="w-full bg-violet-700 text-white font-bold py-2 px-4 rounded-2xl border-4 border-yellow-400 shadow-2xl hover:scale-95 hover:shadow-xl hover:bg-violet-600 transition-all transform active:scale-90 text-xl">
        💎 JOIN FREQUENT FUN PROGRAM 💎
      </button>
    </div>
  );

  return (
    <div 
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#1e3a8a' }}
    >
      {/* Sparkle Background */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          style={{
            position: 'absolute',
            left: sparkle.x + '%',
            top: sparkle.y + '%',
            color: 'white',
            fontSize: sparkle.size + 'px',
            textShadow: '0 0 4px rgba(255,255,255,0.8)',
            animation: 'quickFlash 0.25s ease-out',
            pointerEvents: 'none'
          }}
        >
          {sparkle.shape}
        </div>
      ))}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes quickFlash {
          0% { opacity: 0; transform: scale(0.2); }
          35% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(0.5); }
        }
      `}} />

      {/* Screen Content */}
      {currentScreen === 'entry' && renderEntryScreen()}
      {currentScreen === 'teamSetup' && renderTeamSetupScreen()}
      {currentScreen === 'dashboard' && renderDashboardScreen()}
    </div>
  );
};

export default PlayerDashboard;
