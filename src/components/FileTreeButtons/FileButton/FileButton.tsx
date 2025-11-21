import { FileBrowserEntry } from 'src/hooks/useFileBrowser'
import styles from '../FileTreeButton.module.scss'

interface FileButtonProps {
  entry: FileBrowserEntry
  onFileSelect: (entry: FileBrowserEntry) => void
}

export const FileButton = ({ entry, onFileSelect }: FileButtonProps) => {
  return (
    <button
      type="button"
      className={styles.fileButton}
      onClick={() => onFileSelect(entry)}
      aria-label={`Open file ${entry.name}`}
    >
      <span className={styles.fileBullet} aria-hidden />
      <span className={styles.nodeName}>{entry.name}</span>
    </button>
  )
}