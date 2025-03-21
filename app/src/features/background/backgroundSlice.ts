import { createSlice } from '@reduxjs/toolkit';

interface BackgroundState {
  color: string; 
}

const initialState: BackgroundState = {
  color: 'bg-white', 
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    setBackgroundColor: (state, action) => {
      state.color = action.payload; 
    },
  },
});

export const { setBackgroundColor } = backgroundSlice.actions;
export default backgroundSlice.reducer;