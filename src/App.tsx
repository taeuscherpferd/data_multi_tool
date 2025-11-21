import { RouterProvider } from "react-router-dom"
import appRouter from "src/routes/router"
import "./App.css"

function App() {
  return <RouterProvider router={appRouter} />
}

export default App
