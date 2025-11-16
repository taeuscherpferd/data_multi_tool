import { useCallback, useEffect, useState } from "react"

type SettingsFormState = {
  autoOpenLastProject: boolean
  enableFilePreview: boolean
  confirmBeforeDeletion: boolean
}

const SETTINGS_STORAGE_KEY = "data-multi-tool:settings"

const defaultSettings: SettingsFormState = {
  autoOpenLastProject: true,
  enableFilePreview: true,
  confirmBeforeDeletion: true,
}

const readStoredSettings = (): SettingsFormState => {
  if (typeof window === "undefined" || !window.localStorage) {
    return defaultSettings
  }

  try {
    const rawValue = window.localStorage.getItem(SETTINGS_STORAGE_KEY)

    if (!rawValue) {
      return defaultSettings
    }

    const parsedValue = JSON.parse(rawValue) as Partial<SettingsFormState>
    return {
      ...defaultSettings,
      ...parsedValue,
    }
  } catch {
    return defaultSettings
  }
}

const persistSettings = (settings: SettingsFormState): void => {
  if (typeof window === "undefined" || !window.localStorage) {
    return
  }

  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // Silently ignore storage issues to avoid blocking the UI.
  }
}

export const useSettingsForm = () => {
  const [settings, setSettings] = useState<SettingsFormState>(() => readStoredSettings())

  useEffect(() => {
    setSettings(readStoredSettings())
  }, [])

  const updateSetting = useCallback(<K extends keyof SettingsFormState>(key: K, value: SettingsFormState[K]) => {
    setSettings((previous) => {
      const nextState: SettingsFormState = {
        ...previous,
        [key]: value,
      }

      persistSettings(nextState)
      return nextState
    })
  }, [])

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings)
    persistSettings(defaultSettings)
  }, [])

  return {
    settings,
    updateSetting,
    resetSettings,
  }
}
