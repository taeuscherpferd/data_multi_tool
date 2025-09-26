import { ipcRenderer } from 'electron'
import { useEffect } from 'react'
import styles from './StartPage.module.scss'

interface StartPageProps {
}

export const StartPage = (props: StartPageProps) => {
  const onOpenWorkspace = () => {
    window.electron.ipcRenderer.send('SelectWorkspace')
    // ipcRenderer.send('SelectWorkspace')
  }

  useEffect(() => {
    const SelectedWorkspaceHandler = (arg: any) => {
      alert(arg)
    }
    ipcRenderer.on('SelectedWorkspace', (_event, arg) => {
      SelectedWorkspaceHandler(true)
    })
    return () => { }
  }, [])

  return (
    <div className={styles.StartPage}>
      <span>{"Data Multi-Tool"}</span>
      <span>{"What would you like to do?"}</span>
      <button>{"Create a new workspace"}</button>
      <button onClick={onOpenWorkspace}>{"Open an existing workspace"}</button>
    </div>
  )
}