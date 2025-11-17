import { Outlet } from "react-router-dom"
import styles from "./AppLayout.module.scss"

const AppLayout = () => {
  return (
    <div className={styles.layout}>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
