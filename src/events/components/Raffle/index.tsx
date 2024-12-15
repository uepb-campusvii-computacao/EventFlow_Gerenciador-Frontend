import { createRef, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { toast } from 'react-toastify';
import { GrCycle } from 'react-icons/gr';

import { useSidebarContext } from '../../../core/hooks/useSidebarContext';
import { ISubscribersEntity } from '../../domain/entities/subscribersEntity';

import styles from './styles.module.css';

interface RaffleProps {
  data: ISubscribersEntity[];
}

export function Raffle({ data }: RaffleProps) {
  const [winner, setWinner] = useState<ISubscribersEntity | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(-1);
  const [showFadeIn, setShowFadeIn] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const { sidebarOpen } = useSidebarContext();

  const containerRef = createRef<HTMLDivElement>();

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
      toast.error('Não há usuários para sortear.');
      setIsRunning(false);
      return;
    }

    const generateRandomIndices = () => {
      const maxIterations = Math.min(10, data.length);
      const indices: number[] = [];

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
          setShowConfetti(false);
          setIsRunning(false);
        }, 3000);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isRunning, data]);

  const startRaffle = () => {
    if (data.length === 0) {
      toast.error('Não há usuários para sortear.');
      return;
    }

    setIsRunning(true);
    setWinner(null);
  };

  return (
    <div className='flex flex-col items-center gap-8'>
      <div
        ref={containerRef}
        className={`relative flex h-32 w-full flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 text-center lg:w-8/12 ${winner ? 'bg-green-500 text-gray-700' : 'bg-white text-gray-700'} shadow-md`}
      >
        {winner && <p className={`text-xl font-bold`}>PARABÉNS 🎉🎉</p>}
        <p
          className={`text-xl font-bold ${showFadeIn && !winner ? styles.fadeIn : ''}`}
        >
          {winner
            ? winner.nome
            : currentUserIndex !== -1
              ? data[currentUserIndex]?.nome
              : 'Sorteie algum inscrito!'}
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
        className={`flex flex-row items-center gap-1 rounded-md bg-indigo-500 px-6 py-3 text-white ${isRunning ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={isRunning}
      >
        <GrCycle size={24} /> Sortear Inscrito
      </button>
    </div>
  );
}
