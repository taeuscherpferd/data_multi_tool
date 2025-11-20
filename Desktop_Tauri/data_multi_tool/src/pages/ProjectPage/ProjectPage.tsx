import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FileTree } from "src/components/FileTree/FileTree"
import { HeaderWithSearch } from "src/components/HeaderWithSearch/HeaderWithSearch"
import { useFileBrowser } from "src/hooks/useFileBrowser"
import { useReturnToHomeIfNoProj } from "src/hooks/useReturnToHomeIfNoProj"
import { setCurrentProjectPath } from "src/redux/slices/application"
import { useAppDispatch } from "src/redux/store"
import styles from "./ProjectPage.module.scss"

export const ProjectPage = () => {
  useReturnToHomeIfNoProj()
  const { currentPath, entries, loading, openEntry, errorMessage, refreshEntries } = useFileBrowser()
  const [searchQuery, setSearchQuery] = useState("")

  const currentDirectory = currentPath?.slice(currentPath?.lastIndexOf("/") + 1)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const filteredEntries = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return entries
    }

    return entries.filter((entry) => entry.name.toLowerCase().includes(normalizedQuery))
  }, [entries, searchQuery])

  const handleSearchChange = (newQuery: string) => {
    setSearchQuery(newQuery)
  }

  const onCloseProject = async () => {
    dispatch(setCurrentProjectPath(null))
    navigate("/")
  }

  const handleFileClick = async (entry: (typeof entries)[number]) => {
    const result = await openEntry(entry)

    if (result?.kind === "file") {
      navigate("/project/open")
    }
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.toolbar}>
        <span className={styles.projectName}>{currentDirectory}</span>
        <HeaderWithSearch searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <div className={styles.toolbarActions}>
          <button type="button" onClick={() => void refreshEntries()} disabled={!currentPath}>
            {"Refresh"}
          </button>
          <button type="button" onClick={onCloseProject}>
            {"Close"}
          </button>
        </div>
      </header>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <div className={styles.listPanel}>
        <FileTree
          rootPath={currentPath}
          entries={filteredEntries}
          loading={loading}
          emptyMessage={searchQuery ? "No matches for this search" : "This directory is empty"}
          onFileSelect={handleFileClick}
        />
      </div>
    </div>
  )
}

