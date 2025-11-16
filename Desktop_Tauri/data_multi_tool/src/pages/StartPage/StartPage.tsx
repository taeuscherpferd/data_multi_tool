import { useNavigate } from "react-router-dom"
import { useAppSelector } from "src/redux/store"
import styles from "./StartPage.module.scss"

const StartPage = () => {
  const navigate = useNavigate()
  const currentProjectPath = useAppSelector((state) => state.applicationReducer.currentProjectPath)
  const activeFilePath = useAppSelector((state) => state.applicationReducer.currentFilePath)

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h2>Welcome</h2>
        <p>
          Choose a project workspace to browse its files, open documents, and configure the experience. You can come back to this
          page anytime for quick navigation shortcuts.
        </p>
        <dl className={styles.statusList}>
          <div>
            <dt>Current project</dt>
            <dd>{currentProjectPath ?? "Not selected yet"}</dd>
          </div>
          <div>
            <dt>Active file</dt>
            <dd>{activeFilePath ?? "Open a file from the browser"}</dd>
          </div>
        </dl>
        <div className={styles.actions}>
          <button type="button" onClick={() => navigate("/project/select")}>Browse Projects</button>
          <button type="button" onClick={() => navigate("/project/open")} disabled={!activeFilePath}>
            Go to Open File View
          </button>
        </div>
      </div>
    </section>
  )
}

export default StartPage
