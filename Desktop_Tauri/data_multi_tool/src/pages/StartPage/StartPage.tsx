import { open } from "@tauri-apps/plugin-dialog"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { setCurrentProjectPath } from "src/redux/slices/application"
import { useAppDispatch, useAppSelector } from "src/redux/store"
import styles from "./StartPage.module.scss"

const StartPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentProjectPath = useAppSelector((state) => state.applicationReducer.currentProjectPath)

  useEffect(() => {
    if (currentProjectPath) {
      navigate("/project/")
    }
  })

  const onOpenProject = async () => {
    const selectedProjectPath = await open({
      multiple: false,
      directory: true,
      title: "Select Project Directory",
    })

    dispatch(setCurrentProjectPath(selectedProjectPath))
    navigate("/project/")
  }

  const onCreateNewProject = () => {
    throw new Error("Not implemented yet")
  }

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h2>{"Welcome!"}</h2>
        <p>
          {"Choose a project to open."}
        </p>
        <div className={styles.statusList}>
          <div>
            <dt>{"Recent projects:"}</dt>
            <dd>{currentProjectPath ?? "Not selected yet"}</dd>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={onOpenProject}>{"Open a Project"}</button>
          <button type="button" onClick={onCreateNewProject}>
            {"Create a New Project"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default StartPage
