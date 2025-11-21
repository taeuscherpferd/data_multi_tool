import { GiHamburgerMenu } from "react-icons/gi"
import styles from "./HeaderWithSearch.module.scss"

interface HeaderWithSearchProps {
  searchQuery: string
  onSearchChange: (newQuery: string) => void
}

export const HeaderWithSearch = ({ searchQuery, onSearchChange }: HeaderWithSearchProps) => {
  return (
    <div className={styles.headerWrapper}>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search..."
        className={styles.searchInput}
      />
      <button className={styles.hamburgerMenu}>
        <GiHamburgerMenu />
      </button>
    </div>
  )
}
// <input
//   type="search"
//   value={searchQuery}
//   onChange={handleSearchChange}
//   placeholder="Search within this directory"
// />