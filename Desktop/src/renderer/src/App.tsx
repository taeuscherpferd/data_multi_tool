import { StartPage } from "@renderer/Pages/StartPage/StartPage"

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      {/* <div>{"dude"}</div> */}
      <StartPage />
    </>
  )
}

export default App
