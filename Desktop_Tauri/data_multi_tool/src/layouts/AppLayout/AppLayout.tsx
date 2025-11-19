import { Outlet } from "react-router-dom"
import styles from "./AppLayout.module.scss"

const AppLayout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
