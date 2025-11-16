import { ChangeEvent, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FileEntryList } from "src/components/FileEntryList/FileEntryList"
import { useFileBrowser } from "src/hooks/useFileBrowser"
import styles from "./SelectProjectPage.module.scss"

const SelectProjectPage = () => {
  const navigate = useNavigate()
  const { currentPath, entries, loading, errorMessage, selectProjectFolder, refreshEntries, openEntry, goUpOneLevel } = useFileBrowser()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEntries = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return entries
    }

    return entries.filter((entry) => entry.name.toLowerCase().includes(normalizedQuery))
  }, [entries, searchQuery])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleEntryClick = async (entry: (typeof entries)[number]) => {
    const result = await openEntry(entry)

    if (result?.kind === "file") {
      navigate("/project/open")
    }
  }

  return (
    <section className={styles.wrapper}>
      <header className={styles.toolbar}>
        <div>
          <p className={styles.toolbarLabel}>Current path</p>
          <code className={styles.pathValue}>{currentPath ?? "Select a directory"}</code>
        </div>
        <div className={styles.toolbarActions}>
          <button type="button" onClick={selectProjectFolder}>
            Select Directory
          </button>
          <button type="button" onClick={goUpOneLevel} disabled={!currentPath}>
            Up One Level
          </button>
          <button type="button" onClick={refreshEntries} disabled={!currentPath}>
            Refresh
          </button>
        </div>
      </header>

      <div className={styles.searchRow}>
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search within this directory"
        />
        <button type="button" onClick={() => navigate("/project/open")} disabled={!currentPath}>
          Go to Open File View
        </button>
      </div>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <div className={styles.listPanel}>
        <FileEntryList
          entries={filteredEntries}
          loading={loading}
          emptyMessage={searchQuery ? "No matches for this search" : "This directory is empty"}
          onEntryClick={handleEntryClick}
        />
      </div>
    </section>
  )
}

export default SelectProjectPage
