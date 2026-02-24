import { GiHamburgerMenu } from "react-icons/gi"
import { IconButton } from "src/components/IconButton/IconButton"
import styles from "./HeaderWithSearch.module.scss"

interface HeaderWithSearchProps {
  searchQuery: string
  onSearchChange: (newQuery: string) => void
  onMenuClick?: () => void
}

export const HeaderWithSearch = ({ searchQuery, onSearchChange, onMenuClick }: HeaderWithSearchProps) => {
  return (
    <div className={styles.headerWrapper}>
      <IconButton icon={<GiHamburgerMenu size={20} />} onClick={onMenuClick} />
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search..."
        className={styles.searchInput}
      />
    </div>
  )
}
