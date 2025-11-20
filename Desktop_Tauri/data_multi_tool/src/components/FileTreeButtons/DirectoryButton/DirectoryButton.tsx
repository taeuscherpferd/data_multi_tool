import { FileBrowserEntry } from "src/hooks/useFileBrowser"
import styles from "../FileTreeButton.module.scss"

interface DirectoryButtonProps {
  entry: FileBrowserEntry
  isExpanded: boolean
  handleDirectoryClick: (entry: FileBrowserEntry) => Promise<void>
}

export const DirectoryButton = ({
  entry,
  isExpanded,
  handleDirectoryClick,
}: DirectoryButtonProps) => {
  return (
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
    </button>)
}