import { useCallback, useEffect, useState } from "react"
import { readDir } from "@tauri-apps/plugin-fs"
import { composeChildPath, sortEntries, type FileBrowserEntry } from "src/hooks/useFileBrowser"
import styles from "./FileTree.module.scss"

type FileTreeProps = {
  rootPath: string | null
  entries: FileBrowserEntry[]
  loading: boolean
  emptyMessage?: string
  onFileSelect: (entry: FileBrowserEntry) => void
}

type ChildrenMap = Record<string, FileBrowserEntry[]>
type ErrorMap = Record<string, string>

export const FileTree = ({
  rootPath,
  entries,
  loading,
  emptyMessage = "No files found",
  onFileSelect,
}: FileTreeProps) => {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set())
  const [childrenByPath, setChildrenByPath] = useState<ChildrenMap>({})
  const [loadingByPath, setLoadingByPath] = useState<Set<string>>(new Set())
  const [errorsByPath, setErrorsByPath] = useState<ErrorMap>({})

  useEffect(() => {
    setExpandedPaths(new Set())
    setChildrenByPath({})
    setErrorsByPath({})
  }, [rootPath])

  useEffect(() => {
    if (!rootPath) {
      return
    }

    setChildrenByPath((prev) => ({ ...prev, [rootPath]: sortEntries(entries) }))
  }, [entries, rootPath])

  const toggleExpanded = (path: string, nextExpanded: boolean) => {
    setExpandedPaths((prev) => {
      const updated = new Set(prev)

      if (nextExpanded) {
        updated.add(path)
      } else {
        updated.delete(path)
      }

      return updated
    })
  }

  const loadChildren = useCallback(async (directory: FileBrowserEntry) => {
    setLoadingByPath((prev) => new Set(prev).add(directory.path))
    setErrorsByPath((prev) => {
      const { [directory.path]: _removed, ...rest } = prev
      return rest
    })

    try {
      const entriesInDirectory = await readDir(directory.path)
      const mappedEntries = entriesInDirectory.map<FileBrowserEntry>((entry) => ({
        name: entry.name,
        isDirectory: entry.isDirectory,
        isFile: entry.isFile,
        isSymlink: entry.isSymlink,
        path: composeChildPath(directory.path, entry.name),
      }))

      setChildrenByPath((prev) => ({ ...prev, [directory.path]: sortEntries(mappedEntries) }))
    } catch (dirError) {
      const message = dirError instanceof Error ? dirError.message : "Unable to read directory"
      setErrorsByPath((prev) => ({ ...prev, [directory.path]: message }))
      setChildrenByPath((prev) => ({ ...prev, [directory.path]: [] }))
    } finally {
      setLoadingByPath((prev) => {
        const updated = new Set(prev)
        updated.delete(directory.path)
        return updated
      })
    }
  }, [])

  const handleDirectoryClick = useCallback(
    async (entry: FileBrowserEntry) => {
      const isExpanded = expandedPaths.has(entry.path)

      if (isExpanded) {
        toggleExpanded(entry.path, false)
        return
      }

      if (!childrenByPath[entry.path]) {
        await loadChildren(entry)
      }

      toggleExpanded(entry.path, true)
    },
    [childrenByPath, expandedPaths, loadChildren],
  )

  const renderChildren = useCallback(
    (items: FileBrowserEntry[], depth = 0) => (
      <ul className={styles.nodeList}>
        {items.map((entry) => {
          const isExpanded = expandedPaths.has(entry.path)
          const isLoading = loadingByPath.has(entry.path)
          const childEntries = childrenByPath[entry.path] ?? []
          const errorMessage = errorsByPath[entry.path]

          return (
            <li key={entry.path}>
              <div className={styles.nodeRow} style={{ paddingLeft: `${depth * 0.75}rem` }}>
                {entry.isDirectory ? (
                  <button
                    type="button"
                    className={styles.directoryButton}
                    onClick={() => void handleDirectoryClick(entry)}
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} directory ${entry.name}`}
                  >
                    <span className={styles.chevron} aria-hidden>
                      {isExpanded ? "▾" : "▸"}
                    </span>
                    <span className={styles.nodeName}>{entry.name}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.fileButton}
                    onClick={() => onFileSelect(entry)}
                    aria-label={`Open file ${entry.name}`}
                  >
                    <span className={styles.fileBullet} aria-hidden />
                    <span className={styles.nodeName}>{entry.name}</span>
                  </button>
                )}
              </div>

              {entry.isDirectory && isExpanded && (
                <div className={styles.childContainer}>
                  {isLoading ? (
                    <div className={styles.stateMessage}>Loading…</div>
                  ) : errorMessage ? (
                    <div className={`${styles.stateMessage} ${styles.errorMessage}`}>{errorMessage}</div>
                  ) : childEntries.length === 0 ? (
                    <div className={styles.stateMessage}>This directory is empty</div>
                  ) : (
                    renderChildren(childEntries, depth + 1)
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    ),
    [childrenByPath, errorsByPath, expandedPaths, handleDirectoryClick, loadingByPath, onFileSelect],
  )

  if (!rootPath) {
    return <div className={styles.stateMessage}>Select a project directory to browse files.</div>
  }

  if (loading) {
    return <div className={styles.stateMessage}>Loading files…</div>
  }

  if (entries.length === 0) {
    return <div className={styles.stateMessage}>{emptyMessage}</div>
  }

  return <div className={styles.treeContainer}>{renderChildren(entries)}</div>
}
