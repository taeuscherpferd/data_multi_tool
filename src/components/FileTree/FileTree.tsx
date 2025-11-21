import { readDir } from "@tauri-apps/plugin-fs"
import { useCallback, useEffect, useState } from "react"
import { DirectoryButton } from "src/components/FileTreeButtons/DirectoryButton/DirectoryButton"
import { FileButton } from "src/components/FileTreeButtons/FileButton/FileButton"
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
      const mappedEntries = entriesInDirectory.filter(x => x.isDirectory || x.name.endsWith(".csv")).map<FileBrowserEntry>((entry) => ({
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
          let childContent = null

          if (isLoading) {
            childContent = <div className={styles.stateMessage}>{"Loading…"}</div>
          } else if (errorMessage) {
            childContent = (
              <div className={`${styles.stateMessage} ${styles.errorMessage}`}>{errorMessage}</div>
            )
          } else if (childEntries.length === 0) {
            childContent = <div className={styles.stateMessage}>{"This directory is empty"}</div>
          } else {
            childContent = renderChildren(childEntries, depth + 1)
          }

          return (
            <li key={entry.path}>
              <div className={styles.nodeRow} style={{ paddingLeft: `${depth * 0.15}rem` }}>
                {entry.isDirectory ? (
                  <DirectoryButton
                    entry={entry}
                    isExpanded={isExpanded}
                    handleDirectoryClick={handleDirectoryClick}
                  />
                ) : (
                  <FileButton entry={entry} onFileSelect={onFileSelect} />
                )}
              </div>

              {entry.isDirectory && isExpanded && (
                <div className={styles.childContainer}>
                  {childContent}
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
    return <div className={styles.stateMessage}>{"Select a project directory to browse files."}</div>
  }

  if (loading) {
    return <div className={styles.stateMessage}>{"Loading files…"}</div>
  }

  if (entries.length === 0) {
    return <div className={styles.stateMessage}>{emptyMessage}</div>
  }

  return <div className={styles.treeContainer}>{renderChildren(entries)}</div>
}
