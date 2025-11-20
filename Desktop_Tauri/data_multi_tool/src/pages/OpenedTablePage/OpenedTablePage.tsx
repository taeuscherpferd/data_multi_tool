import { BsLayoutSidebar } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "src/redux/store"
import styles from "./OpenedTablePage.module.scss"

const OpenedTablePage = () => {
  const navigate = useNavigate()
  const currentProjectPath = useAppSelector((state) => state.applicationReducer.currentProjectPath)
  const projName = currentProjectPath?.slice(currentProjectPath?.lastIndexOf("/") + 1)

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <button type="button" className={styles.backButton} onClick={() => navigate(-1)}><BsLayoutSidebar /></button>
        <div>
          <p className={styles.label}>{projName}</p>
        </div>
      </header>

      <div className={styles.editorShell}>
      </div>
    </section>
  )
}

export default OpenedTablePage
