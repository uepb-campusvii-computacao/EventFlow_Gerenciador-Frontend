import SidebarContext from "@/context/Sidebar/SidebarContext";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import Confetti from 'react-confetti';
import { GrCycle } from "react-icons/gr";
import { toast } from "react-toastify";
import styles from './Raffle.module.css';

const Raffle = ({ data }) => {
  const [winner, setWinner] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(-1);
  const [showFadeIn, setShowFadeIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const { sidebarOpen } = useContext(SidebarContext);

  const containerRef = useRef(null);

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);

    return () => {
      window.removeEventListener('resize', updateContainerSize);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!isRunning) return;

    if (data.length === 0) {
      toast.error("Não há usuários para sortear.");
      setIsRunning(false);
      return;
    }

    const generateRandomIndices = () => {
      const maxIterations = Math.min(10, data.length);
      const indices = [];
      while (indices.length < maxIterations) {
        const randomIndex = Math.floor(Math.random() * data.length);
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex);
        }
      }
      return indices;
    };

    const indices = generateRandomIndices();
    let counter = 0;
    const interval = setInterval(() => {
      setShowFadeIn(false);
      setTimeout(() => {
        setCurrentUserIndex(indices[counter]);
        setShowFadeIn(true);
      }, 50);
      counter++;
      if (counter >= indices.length) {
        clearInterval(interval);        
        setWinner(data[indices[indices.length - 1]]);
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false)
          setIsRunning(false);
        }, 3000);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isRunning, data]);

  const startRaffle = () => {
    if (data.length === 0) {
      toast.error("Não há usuários para sortear.");
      return;
    }

    setIsRunning(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={containerRef}
        className={`relative w-full lg:w-8/12 text-center flex flex-col gap-4 justify-center items-center h-32 border border-gray-300 rounded-lg ${winner ? 'bg-green-500 text-gray-700' : 'bg-white text-gray-700'} shadow-md`}
      >
        {winner &&
          <p className={`text-xl font-bold`}>
            PARABÉNS 🎉🎉
          </p>
        }
        <p className={`text-xl font-bold ${showFadeIn && !winner ? styles.fadeIn : ""}`}>
          {winner ? winner.nome : currentUserIndex !== -1 ? data[currentUserIndex]?.nome : 'Sorteie algum inscrito!'}
        </p>
        {showConfetti && winner && (
          <Confetti
            width={containerSize.width}
            height={containerSize.height}
            recycle={false}
            numberOfPieces={500}
          />
        )}
      </div>
      <button
        onClick={startRaffle}
        className={`bg-indigo-500 text-white flex flex-row gap-1 items-center px-6 py-3 rounded-md ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isRunning}
      >
        <GrCycle size={24}/> Sortear Inscrito
      </button>
    </div>
  );
};

Raffle.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      uuid_user: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired,
      nome_cracha: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Raffle;