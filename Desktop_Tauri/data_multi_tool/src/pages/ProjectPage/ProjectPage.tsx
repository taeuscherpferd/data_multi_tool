import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FileEntryList } from "src/components/FileEntryList/FileEntryList"
import { HeaderWithSearch } from "src/components/HeaderWithSearch/HeaderWithSearch"
import { useFileBrowser } from "src/hooks/useFileBrowser"
import { setCurrentProjectPath } from "src/redux/slices/application"
import { useAppDispatch } from "src/redux/store"
import styles from "./ProjectPage.module.scss"

export const ProjectPage = () => {
  const { currentPath, entries, loading, openEntry, goUpOneLevel } = useFileBrowser()
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
    console.log("Project closed")
  }

  const handleEntryClick = async (entry: (typeof entries)[number]) => {
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
          <button type="button" onClick={goUpOneLevel} disabled={!currentPath}>
            Up One Level
          </button>
          <button type="button" onClick={onCloseProject}>
            {"Close"}
          </button>
        </div>
      </header>

      <div className={styles.listPanel}>
        <FileEntryList
          entries={filteredEntries}
          loading={loading}
          emptyMessage={searchQuery ? "No matches for this search" : "This directory is empty"}
          onEntryClick={handleEntryClick}
        />
      </div>
    </div>
  )
}

