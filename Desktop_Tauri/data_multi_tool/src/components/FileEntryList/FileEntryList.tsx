import type { FileBrowserEntry } from "src/hooks/useFileBrowser"
import styles from "./FileEntryList.module.scss"

type FileEntryListProps = {
  entries: FileBrowserEntry[]
  loading: boolean
  emptyMessage?: string
  onEntryClick: (entry: FileBrowserEntry) => void
}

export const FileEntryList = ({ entries, loading, emptyMessage = "No files found", onEntryClick }: FileEntryListProps) => {
  if (loading) {
    return <div className={styles.stateMessage}>Loading files…</div>
  }

  if (entries.length === 0) {
    return <div className={styles.stateMessage}>{emptyMessage}</div>
  }

  return (
    <ul className={styles.list}>
      {entries.map((entry) => (
        <li key={entry.path}>
          <button
            type="button"
            className={styles.entryButton}
            onClick={() => onEntryClick(entry)}
            aria-label={entry.isDirectory ? `Open directory ${entry.name}` : `Open file ${entry.name}`}
          >
            <span className={styles.entryName}>{entry.name}</span>
            <span className={entry.isDirectory ? styles.directoryBadge : styles.fileBadge}>
              {entry.isDirectory ? "Directory" : "File"}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
