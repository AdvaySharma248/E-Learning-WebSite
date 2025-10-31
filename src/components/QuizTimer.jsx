import { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

const QuizTimer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert minutes to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isWarning = timeLeft <= 300; // Last 5 minutes

  return (
    <div className={`quiz-timer ${isWarning ? 'warning' : ''}`}>
      {isWarning && <AlertCircle size={20} />}
      <Clock size={20} />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};

export default QuizTimer;
