import { useNavigate } from "react-router-dom"
import { useAppSelector } from "src/redux/store"
import styles from "./OpenFilePage.module.scss"

const OpenFilePage = () => {
  const navigate = useNavigate()
  const currentProjectPath = useAppSelector((state) => state.applicationReducer.currentProjectPath)


  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <p className={styles.label}>Project</p>
          <code className={styles.path}>{currentProjectPath ?? "Select a project from the browser"}</code>
        </div>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => navigate("/project/select")}>Open File Browser</button>
          <button type="button" onClick={() => navigate("/settings")}>Settings</button>
        </div>
      </header>

      <div className={styles.editorShell}>
      </div>
    </section>
  )
}

export default OpenFilePage
