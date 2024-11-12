import React, { useState } from 'react';
import { TreasureBox } from './TreasureBox';
import { QuestionModal } from './QuestionModal';
import { ProgressBar } from './ProgressBar';
import { Trophy } from 'lucide-react';

const FULL_IMAGE_URL =
  'https://images.unsplash.com/photo-1682686581498-5e85c7228119?w=1200&auto=format&fit=crop&q=60';

const QUESTIONS = [
  {
    question: '1',
    answer: '9',
  },
  {
    question: '2',
    answer: 'Hi there!',
  },
  { question: '3', answer: 'firewall' },
  {
    question: '4',
    answer: 'cart',
  },
  {
    question: '5',
    answer: '4',
  },
  { question: '6', answer: 'BIG' },
  { question: '7', answer: 'ANANAB' },
  {
    question: '8',
    answer: 'Code',
  },
  { question: '9', answer: '5' },
];

interface ImagePuzzleProps {
  onComplete: () => void;
}

export function ImagePuzzle({ onComplete }: ImagePuzzleProps) {
  const [unlockedBoxes, setUnlockedBoxes] = useState<number[]>([]);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  const handleBoxClick = (index: number) => {
    if (!unlockedBoxes.includes(index)) {
      setSelectedBox(index);
    }
  };

  const handleCorrectAnswer = () => {
    if (selectedBox !== null) {
      setUnlockedBoxes([...unlockedBoxes, selectedBox]);
      setSelectedBox(null);
    }
  };

  const isGameComplete = unlockedBoxes.length === QUESTIONS.length;
  const isLastBox = unlockedBoxes.length === QUESTIONS.length - 1;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Phase 1: Unlock the Map
          </h1>
          <p className="text-gray-600">
            Solve the riddles to reveal pieces of the hidden map location!
          </p>
        </div>

        <ProgressBar current={unlockedBoxes.length} total={QUESTIONS.length} />

        <div className="grid grid-cols-3 gap-1 mb-8 bg-gray-300 p-1 rounded-lg shadow-xl aspect-square">
          {QUESTIONS.map((_, index) => (
            <TreasureBox
              key={index}
              index={index}
              isUnlocked={unlockedBoxes.includes(index)}
              onClick={() => handleBoxClick(index)}
              imageUrl={FULL_IMAGE_URL}
              row={Math.floor(index / 3)}
              col={index % 3}
              isLastBox={isLastBox && selectedBox === index}
            />
          ))}
        </div>

        {selectedBox !== null && (
          <QuestionModal
            question={QUESTIONS[selectedBox].question}
            answer={QUESTIONS[selectedBox].answer}
            isOpen={true}
            onClose={() => setSelectedBox(null)}
            onCorrectAnswer={handleCorrectAnswer}
          />
        )}

        {isGameComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-md">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Phase 1 Complete!
              </h2>
              <p className="text-gray-600 mb-6">
                You've unlocked the map location! Ready for the real treasure
                hunt?
              </p>
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={FULL_IMAGE_URL}
                  alt="Complete map"
                  className="w-full h-auto"
                />
              </div>
              <button
                onClick={onComplete}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Let's Go!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
