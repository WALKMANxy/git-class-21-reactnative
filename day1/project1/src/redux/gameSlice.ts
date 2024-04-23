// src/redux/gameSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { GameCard, GameState } from '../models/model'; // Assuming all types are exported from model.ts
import { RootState } from './store';

const initialState: GameState = {
  cards: [],
  status: 'idle',
  error: null,
};


const randomPage = () => Math.floor(Math.random() * 42) + 1;

// Fetching characters from a random page to add variety
export const fetchCharacters = createAsyncThunk<GameCard[], void, { state: RootState }>(
  'game/fetchCharacters', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${randomPage()}`);
      const characters = response.data.results;

      // Selecting 4 unique characters for the game and duplicating them for pairs
      const shuffled = characters.sort(() => Math.random() - 0.5).slice(0, 6);
      const gameCards: GameCard[] = [...shuffled, ...shuffled].map((char, index) => ({
        ...char,
        id: `${char.id}-${index}`, // Unique ID for each game card
        flipped: true, // Initially not flipped
        matched: false // Initially not matched
      })).sort(() => Math.random() - 0.5); // Shuffle the cards

      return gameCards;
    } catch (error) {
      return rejectWithValue('Failed to load characters');
    }
  }
);



const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGame: (state) => {
      state.cards = [];
      state.status = 'idle';
      state.error = null;
    },
    flipCard: (state, action) => {
      const cardIndex = state.cards.findIndex(card => card.id === action.payload);
      if (cardIndex !== -1) {
        state.cards[cardIndex].flipped = !state.cards[cardIndex].flipped;
      }
    },
    resetFlips: (state) => {
      state.cards.forEach(card => card.flipped = false);
    },
    markAsMatched: (state, action) => {
      action.payload.forEach((id: string) => {
        const card = state.cards.find(card => card.id === id);
        if (card) card.matched = true;
      });
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load characters';
        state.status = 'failed';
      });
  },
});

export const { flipCard, resetFlips, markAsMatched, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
