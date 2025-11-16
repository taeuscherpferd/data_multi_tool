import { NavLink, Outlet } from "react-router-dom"
import styles from "./AppLayout.module.scss"

const navigationLinks = [
  { label: "Start", to: "/" },
  { label: "Select Project", to: "/project/select" },
  { label: "Open File", to: "/project/open" },
  { label: "Settings", to: "/settings" },
]

const AppLayout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Data Multi Tool</p>
          <h1 className={styles.title}>Project Workspace</h1>
          <p className={styles.subtitle}>Navigate between project setup, browsing, editing, and configuration.</p>
        </div>
        <nav className={styles.nav}>
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`.trim()
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
