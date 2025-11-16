import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "src/redux/store"
import styles from "./OpenFilePage.module.scss"

const OpenFilePage = () => {
  const navigate = useNavigate()
  const currentProjectPath = useAppSelector((state) => state.applicationReducer.currentProjectPath)
  const currentFilePath = useAppSelector((state) => state.applicationReducer.currentFilePath)

  const fileName = useMemo(() => {
    if (!currentFilePath) {
      return null
    }

    const separator = currentFilePath.includes("\\") ? "\\" : "/"
    const segments = currentFilePath.split(separator)
    return segments.length > 0 ? segments[segments.length - 1] : currentFilePath
  }, [currentFilePath])

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <p className={styles.label}>Project</p>
          <code className={styles.path}>{currentProjectPath ?? "Select a project from the browser"}</code>
        </div>
        <div>
          <p className={styles.label}>File</p>
          <code className={styles.path}>{currentFilePath ?? "Choose a file to start editing"}</code>
        </div>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => navigate("/project/select")}>Open File Browser</button>
          <button type="button" onClick={() => navigate("/settings")}>Settings</button>
        </div>
      </header>

      <div className={styles.editorShell}>
        {currentFilePath ? (
          <div className={styles.previewPane}>
            <h3>{fileName}</h3>
            <p>
              This is where the primary application features will operate. Use this space to render previews, editors, table
              views, or any domain-specific tooling that belongs to the selected file.
            </p>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Select a file from the browser to load it here.</p>
            <button type="button" onClick={() => navigate("/project/select")}>Browse Files</button>
          </div>
        )}
      </div>
    </section>
  )
}

export default OpenFilePage
