import { RouterProvider } from "react-router-dom"
import appRouter from "src/routes/router"
import "./App.scss"

function App() {
  return <RouterProvider router={appRouter} />
}

export default App
