import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalStateType } from '@/types.ts';

const initialState: GlobalStateType = {
  cif: ''
};

type GlobalStatePayload = {
  dataKey: keyof GlobalStateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setGlobalState: (state: GlobalStateType, action: PayloadAction<GlobalStatePayload>) => {
      const { dataKey, data } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state[dataKey] = data;
    }
  }
});

export const { setGlobalState } = globalStateSlice.actions;

export default globalStateSlice.reducer;
