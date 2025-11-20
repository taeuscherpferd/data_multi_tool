import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { platform } from "@tauri-apps/plugin-os"
import { ANDROID_STORAGE_PATH } from "src/hooks/useFileBrowser"

let currentPlatform = "web"
if (window && (window as any).__TAURI_IPC__) {
  currentPlatform = platform()
}

type ApplicationState = {
  currentProjectPath: string | null
}

const initialState: ApplicationState = {
  currentProjectPath: currentPlatform === "android" ? ANDROID_STORAGE_PATH : null,
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setCurrentProjectPath(state, action: PayloadAction<string | null>) {
      state.currentProjectPath = action.payload
    },
  },
})

export const { setCurrentProjectPath } = applicationSlice.actions
export const applicationReducer = applicationSlice.reducer