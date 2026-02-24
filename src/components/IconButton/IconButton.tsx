import styles from './IconButton.module.scss'

interface IconButtonProps {
  icon: React.ReactNode
  onClick?: () => void
}

export const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>{icon}</button>
  )
}