import { dirname } from "@tauri-apps/api/path"
import { open } from "@tauri-apps/plugin-dialog"
import { readDir } from "@tauri-apps/plugin-fs"
import { platform, type Platform } from "@tauri-apps/plugin-os"
import { useCallback, useEffect, useState } from "react"
import { setCurrentProjectPath } from "src/redux/slices/application"
import { useAppDispatch, useAppSelector } from "src/redux/store"

export const ANDROID_STORAGE_PATH = "/storage/emulated/0/Documents/docs/notes/data"

export type FileBrowserEntry = {
  name: string
  isDirectory: boolean
  isFile: boolean
  isSymlink: boolean
  path: string
}

type FileOpenResult =
  | { kind: "directory"; path: string }
  | { kind: "file"; path: string }
  | null

type UseFileBrowserResult = {
  currentPath: string | null
  entries: FileBrowserEntry[]
  loading: boolean
  errorMessage: string | null
  platformName: Platform
  selectProjectFolder: () => Promise<void>
  refreshEntries: () => Promise<void>
  openEntry: (entry: FileBrowserEntry) => Promise<FileOpenResult>
  goUpOneLevel: () => Promise<void>
}

const normalizePathValue = (value: string | null | undefined): string | null => {
  if (!value || value.length === 0) {
    return null
  }

  return value
}

const composeChildPath = (parent: string, child: string): string => {
  if (!parent) {
    return child
  }

  const separator = parent.includes("\\") ? "\\" : "/"
  const trimmedParent = parent.endsWith(separator) ? parent.slice(0, -1) : parent

  if (trimmedParent.length === 0 && separator === "/") {
    return `${separator}${child}`
  }

  return `${trimmedParent}${separator}${child}`
}

const sortEntries = (entries: FileBrowserEntry[]): FileBrowserEntry[] => {
  return [...entries].sort((a, b) => {
    if (a.isDirectory !== b.isDirectory) {
      return a.isDirectory ? -1 : 1
    }

    return a.name.localeCompare(b.name)
  })
}

export const useFileBrowser = (): UseFileBrowserResult => {
  const dispatch = useAppDispatch()
  const currentProjectPath = useAppSelector((state) => state.applicationReducer.currentProjectPath)
  const [entries, setEntries] = useState<FileBrowserEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [platformName] = useState<Platform>(() => platform())

  const persistPath = useCallback((nextPath: string | null) => {
    const normalizedNext = normalizePathValue(nextPath)
    const normalizedCurrent = normalizePathValue(currentProjectPath)

    if (normalizedNext === normalizedCurrent) {
      return
    }

    dispatch(setCurrentProjectPath(normalizedNext))
  }, [currentProjectPath, dispatch])

  const readEntries = useCallback(async (pathToRead: string) => {
    setLoading(true)
    setErrorMessage(null)

    try {
      const result = await readDir(pathToRead)
      const mappedEntries = result.map<FileBrowserEntry>((entry) => ({
        name: entry.name,
        isDirectory: entry.isDirectory,
        isFile: entry.isFile,
        isSymlink: entry.isSymlink,
        path: composeChildPath(pathToRead, entry.name),
      }))

      setEntries(sortEntries(mappedEntries))
    } catch (dirError) {
      const message = dirError instanceof Error ? dirError.message : "Unable to read directory"
      setErrorMessage(message)
      setEntries([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!currentProjectPath) {
      setEntries([])
      return
    }

    void readEntries(currentProjectPath)
  }, [currentProjectPath, readEntries])

  useEffect(() => {
    if (!currentProjectPath && platformName === "android") {
      persistPath(ANDROID_STORAGE_PATH)
    }
  }, [currentProjectPath, platformName, persistPath])

  const selectProjectFolder = useCallback(async () => {
    const directory = await open({ multiple: false, directory: true })
    const resolvedPath = Array.isArray(directory) ? directory[0] : directory

    if (typeof resolvedPath === "string") {
      persistPath(resolvedPath)
    }
  }, [persistPath])

  const refreshEntries = useCallback(async () => {
    if (!currentProjectPath) {
      return
    }

    await readEntries(currentProjectPath)
  }, [currentProjectPath, readEntries])

  const goUpOneLevel = useCallback(async () => {
    if (!currentProjectPath) {
      return
    }

    try {
      const parentDirectory = await dirname(currentProjectPath)

      if (!parentDirectory || parentDirectory === currentProjectPath || parentDirectory === ".") {
        persistPath(null)
        return
      }

      persistPath(parentDirectory)
    } catch (dirError) {
      const message = dirError instanceof Error ? dirError.message : "Unable to navigate to parent directory"
      setErrorMessage(message)
    }
  }, [currentProjectPath, persistPath])

  const openEntry = useCallback(
    async (entry: FileBrowserEntry): Promise<FileOpenResult> => {
      if (!currentProjectPath) {
        return null
      }

      const entryPath = entry.path || composeChildPath(currentProjectPath, entry.name)

      if (entry.isDirectory) {
        persistPath(entryPath)
        return { kind: "directory", path: entryPath }
      }

      return { kind: "file", path: entryPath }
    },
    [currentProjectPath, dispatch, persistPath],
  )

  return {
    currentPath: currentProjectPath ?? null,
    entries,
    loading,
    errorMessage,
    platformName,
    selectProjectFolder,
    refreshEntries,
    openEntry,
    goUpOneLevel,
  }
}
