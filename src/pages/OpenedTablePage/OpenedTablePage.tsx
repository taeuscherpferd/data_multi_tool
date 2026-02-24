import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IconButton } from "src/components/IconButton/IconButton";
import { useAppSelector } from "src/redux/store";
import styles from "./OpenedTablePage.module.scss";

const OpenedTablePage = () => {
  const navigate = useNavigate()
  const currentProjectPath = useAppSelector((state) => state.applicationReducer.currentProjectPath)
  const projName = currentProjectPath?.slice(currentProjectPath?.lastIndexOf("/") + 1)

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <IconButton icon={<MdOutlineArrowBackIosNew size={20} />} onClick={() => navigate(-1)} />
        <p className={styles.label}>{projName}</p>
        <IconButton icon={<GiHamburgerMenu size={20} />} />
      </header>
    </section>
  )
}

export default OpenedTablePage
