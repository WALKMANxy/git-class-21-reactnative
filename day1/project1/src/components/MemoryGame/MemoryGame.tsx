// src/components/MemoryGame/MemoryGame.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacters,
  flipCard,
  resetFlips,
  markAsMatched,
  resetGame,
} from "../../redux/gameSlice";
import { AppDispatch, RootState } from "../../redux/store";
import "./MemoryGame.scss";
import Logo from "../../public/logo.png";

export const MemoryGame: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, status } = useSelector((state: RootState) => state.game);
  const [gameStarted, setGameStarted] = useState<Boolean>(false);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);

  const gameWon = cards.every((card) => card.matched);

  useEffect(() => {
    if (gameStarted) {
      dispatch(fetchCharacters());
    }
  }, [dispatch, gameStarted]);

  useEffect(() => {
    // Automatically flip all cards back after they've been shown for 6 seconds
    let timer: ReturnType<typeof setTimeout>;
    if (gameStarted && cards.length) {
      timer = setTimeout(() => {
        dispatch(resetFlips());
        setFlippedCards([]);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [cards.length, dispatch, gameStarted]);

  const handleCardClick = (id: string) => {
    if (!flippedCards.includes(id) && flippedCards.length < 2) {
      dispatch(flipCard(id));
      const newFlippedCards = [...flippedCards, id];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        const firstCard = cards.find((card) => card.id === newFlippedCards[0]);
        const secondCard = cards.find((card) => card.id === newFlippedCards[1]);
        if (firstCard && secondCard && firstCard.name === secondCard.name) {
          dispatch(markAsMatched([firstCard.id, secondCard.id]));
        }

        setTimeout(() => {
          dispatch(resetFlips());
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="memory-game">
      {!gameStarted ? (
        <div className="start-button-container">
          <button onClick={() => setGameStarted(true)}>Play!</button>
          <p>
            Click "Play!" to start! The cards will be shown for 6 seconds,
            memorize the pairs and match them!
          </p>
        </div>
      ) : gameWon ? (
        <div className="win-message">
          <h2>You win!</h2>
          <button
            onClick={() => {
              dispatch(resetGame());
              setGameStarted(false); // Optionally reset gameStarted to require the user to click "Play!" again
            }}
          >
            Click to try again
          </button>
        </div>
      ) : status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <div className="cards-container">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`card ${card.flipped ? "flipped" : ""} ${
                card.matched ? "matched" : ""
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              {card.flipped || card.matched ? (
                <>
                  <img
                    src={card.image}
                    alt={card.name}
                    className="card-front"
                  />
                  {/* <div className="logo-front">
                    <img src={Logo} alt="Logo" />
                  </div> */}
                </>
              ) : (
                <div className="card-back">
                  <div className="logo-back">
                    <img src={Logo} alt="Logo" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
