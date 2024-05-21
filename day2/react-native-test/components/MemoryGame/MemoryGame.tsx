import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, flipCard, resetFlips, markAsMatched, resetGame } from '../../redux/gameSlice';
import { AppDispatch, RootState } from '../../redux/store';


const MemoryGame: React.FC = () => {
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
    <View style={styles.container}>
      
      <View style={styles.content}>
        {!gameStarted ? (
          <View style={styles.startButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setGameStarted(true)}>
              <Text style={styles.buttonText}>PLAY!</Text>
            </TouchableOpacity>
            <Text>Click "Play!" to start! The cards will be shown for 1.5 seconds, memorize the pairs and match them!</Text>
          </View>
        ) : gameWon ? (
          <View style={styles.winMessage}>
            <Text>You win!</Text>
            <TouchableOpacity style={styles.button} onPress={() => {
              dispatch(resetGame());
              setGameStarted(false);
            }}>
              <Text style={styles.buttonText}>Click to try again</Text>
            </TouchableOpacity>
          </View>
        ) : status === 'loading' ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.cardsContainer}>
            {cards.map((card) => (
              <TouchableOpacity key={card.id} style={styles.card} onPress={() => handleCardClick(card.id)}>
                {card.flipped || card.matched ? (
                  <Image source={{ uri: card.image }} style={styles.cardImage} />
                ) : (
                  <View style={styles.cardBack}>
                    <Text style={styles.cardBackText}>?</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    marginTop: 60, // To avoid the fixed navbar
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  startButtonContainer: {
    alignItems: 'center',
  },
  winMessage: {
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cardBack: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a0d1af',
    borderRadius: 10,
  },
  cardBackText: {
    fontSize: 32,
    color: '#fff',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default MemoryGame;
