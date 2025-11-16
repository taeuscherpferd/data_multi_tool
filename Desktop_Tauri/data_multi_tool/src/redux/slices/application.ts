import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ApplicationState = {
  currentProjectPath: string | null
  currentFilePath: string | null
  value: number
}

const initialState: ApplicationState = {
  currentProjectPath: null,
  currentFilePath: null,
  value: 0,
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1
    },
    decrement(state) {
      state.value -= 1
    },
    setValue(state, action: PayloadAction<number>) {
      state.value = action.payload
    },
    setCurrentProjectPath(state, action: PayloadAction<string | null>) {
      state.currentProjectPath = action.payload
    },
    setCurrentFilePath(state, action: PayloadAction<string | null>) {
      state.currentFilePath = action.payload
    },
  },
})

export const { increment, decrement, setValue, setCurrentProjectPath, setCurrentFilePath } = applicationSlice.actions
export const applicationReducer = applicationSlice.reducer