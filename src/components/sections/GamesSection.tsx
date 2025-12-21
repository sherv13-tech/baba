import { useState } from "react";
import { motion } from "framer-motion";

type Game = "coloring" | "puzzle" | "qa" | null;

const GamesSection = () => {
    const [activeGame, setActiveGame] = useState<Game>(null);

    return (
        <div className="py-8">
            <h2 className="text-3xl font-bold text-love-pink text-center mb-6">
                🎮 Games for You
            </h2>
            <div className="flex justify-center gap-4 flex-wrap">
                <button
                    onClick={() => setActiveGame("coloring")}
                    className="px-6 py-3 rounded-xl bg-pink-200 hover:bg-pink-300 transition"
                >
                    🌸 Coloring
                </button>
                <button
                    onClick={() => setActiveGame("puzzle")}
                    className="px-6 py-3 rounded-xl bg-pink-200 hover:bg-pink-300 transition"
                >
                    🧩 Puzzle
                </button>
                <button
                    onClick={() => setActiveGame("qa")}
                    className="px-6 py-3 rounded-xl bg-pink-200 hover:bg-pink-300 transition"
                >
                    🔥 Spicy Q&A
                </button>
            </div>

            {/* Full screen modal */}
            {activeGame && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full h-full max-w-5xl p-6 relative overflow-auto shadow-xl">
                        <button
                            onClick={() => setActiveGame(null)}
                            className="absolute top-4 right-4 text-love-pink font-bold text-2xl"
                        >
                            ✕
                        </button>

                        {activeGame === "coloring" && <ColoringModal />}
                        {activeGame === "puzzle" && <PuzzleModal />}
                        {activeGame === "qa" && <QAModal />}
                    </div>
                </div>
            )}
        </div>
    );
};

// -------------------- COLORING MODAL --------------------
const ColoringModal = () => {
    const colors = ["#ff8fab", "#ffd6a5", "#cdb4db", "#bde0fe", "#ffb347"];
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [colored, setColored] = useState<(string | null)[]>([null, null, null, null]);
    const complete = colored.every((c) => c !== null);

    const fillPetal = (i: number) => {
        if (!colored[i]) {
            const newColored = [...colored];
            newColored[i] = selectedColor;
            setColored(newColored);
        }
    };

    return (
        <div className="text-center mt-8">
            <h3 className="text-3xl font-bold text-love-pink mb-4">🌸 Color the Flower</h3>
            {!complete ? (
                <>
                    <div className="flex justify-center gap-3 mb-6">
                        {colors.map((c) => (
                            <button
                                key={c}
                                style={{ backgroundColor: c }}
                                onClick={() => setSelectedColor(c)}
                                className={`w-12 h-12 rounded-full border-4 ${selectedColor === c ? "border-love-pink" : "border-white"
                                    }`}
                            />
                        ))}
                    </div>
                    <svg viewBox="0 0 300 300" className="mx-auto w-80">
                        {[0, 1, 2, 3].map((i) => (
                            <circle
                                key={i}
                                cx={150 + Math.cos(i * Math.PI / 2) * 70}
                                cy={150 + Math.sin(i * Math.PI / 2) * 70}
                                r="50"
                                fill={colored[i] ?? "#f1f1f1"}
                                onClick={() => fillPetal(i)}
                                className="cursor-pointer transition"
                            />
                        ))}
                        <circle cx="150" cy="150" r="35" fill="#ffe066" />
                    </svg>
                </>
            ) : (
                <div>
                    <p className="text-xl font-semibold mb-4">ETO PUDAY MO DINIDILAAN KO</p>
                    <img
                        src="/assets/t2.gif"
                        className="rounded-xl mx-auto"
                    />
                </div>
            )}
        </div>
    );
};

// -------------------- PUZZLE MODAL --------------------
const PuzzleModal = () => {
  const pieces = [0, 1, 2, 3]; // 4 pieces

  // shuffle pieces so they appear randomly at start
  const shuffledPieces = pieces
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // state for placed pieces (index = slot, value = piece number)
  const [placed, setPlaced] = useState<(number | null)[]>([null, null, null, null]);

  // state for draggable pieces left to drag
  const [availablePieces, setAvailablePieces] = useState<number[]>(shuffledPieces);

  // check if all placed correctly
  const isComplete = placed.every((p, i) => p === i);

  const handleDrop = (slotIndex: number, piece: number) => {
    // only allow drop if slot is empty
    if (placed[slotIndex] === null) {
      const newPlaced = [...placed];
      newPlaced[slotIndex] = piece;
      setPlaced(newPlaced);

      // remove from available pieces
      setAvailablePieces(availablePieces.filter((p) => p !== piece));
    }
  };

  return (
    <div className="text-center mt-8">
      <h3 className="text-3xl font-bold text-love-pink mb-4">🧩 Puzzle</h3>

      {!isComplete ? (
        <div className="flex flex-col items-center gap-6">
          {/* draggable pieces */}
          <div className="flex gap-4 flex-wrap justify-center">
            {availablePieces.map((p) => (
              <img
                key={p}
                src={`/assets/cute_cat${p}.png`}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("piece", String(p))}
                className="w-40 h-40 object-cover rounded-xl cursor-grab"
              />
            ))}
          </div>

          {/* 2x2 puzzle grid */}
          <div className="grid grid-cols-2 gap-2 w-[350px] h-[350px]">
            {placed.map((piece, slotIndex) => (
              <div
                key={slotIndex}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) =>
                  handleDrop(slotIndex, Number(e.dataTransfer.getData("piece")))
                }
                className="w-full h-full border-2 border-dashed border-love-pink rounded-xl flex items-center justify-center bg-white"
              >
                {piece !== null && (
                  <img
                    src={`/assets/cute_cat${piece}.png`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Completed full picture
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-xl font-semibold mb-4">Congrats! SAYONG SAYO NA YAN, LAMUNIN MO 😘</p>
          <div className="w-[350px] h-[350px] flex items-center justify-center">
            <img
              src="/assets/t1.jpg"
              className="w-full h-full object-cover rounded-xl"
              alt="Completed Puzzle"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------- Q&A MODAL --------------------
const QAModal = () => {
  const questions = [
    { q: "Ilang inches?", options: ["3", "4", "5", "6"], points: [1, 2, 3, 4] },
    { q: "Gaano kasarap?", options: ["1", "2", "3", "4", "5"], points: [1, 1, 2, 3, 4] },
    { q: "Rate my charm", options: ["1", "2", "3", "4", "5"], points: [1, 1, 2, 3, 4] },
    { q: "Gusto mo ba ng kiss?", options: ["Oo", "Hindi"], points: [3, 0] },
    { q: "Mas gusto mo ako o chocolate?", options: ["Ako", "Chocolate"], points: [2, 1] },
  ];

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const done = index >= questions.length;

  const answer = (pts: number) => {
    setScore(score + pts);
    setIndex(index + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center p-4">
      <h3 className="text-4xl font-bold text-love-pink mb-4">🔥 Spicy Q&A</h3>

      {!done ? (
        <>
          <p className="text-2xl font-semibold mb-6">{questions[index].q}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {questions[index].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => answer(questions[index].points[i])}
                className="px-8 py-4 rounded-xl bg-pink-200 hover:bg-pink-300 transition text-xl font-medium"
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-3xl font-semibold mb-4">Score: {score}</p>
          <img
            src={score >= 5 ? "/assets/t2.gif" : "/assets/t1.jpg"}
            className="rounded-xl w-80 h-80 object-cover"
            alt="Q&A Result"
          />
        </div>
      )}
    </div>
  );
};

export default GamesSection;
