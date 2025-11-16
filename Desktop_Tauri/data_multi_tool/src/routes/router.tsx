import { createHashRouter } from "react-router-dom"
import AppLayout from "src/layouts/AppLayout/AppLayout"
import OpenFilePage from "src/pages/OpenFilePage/OpenFilePage"
import SelectProjectPage from "src/pages/SelectProjectPage/SelectProjectPage"
import SettingsPage from "src/pages/SettingsPage/SettingsPage"
import StartPage from "src/pages/StartPage/StartPage"

export const appRouter = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <StartPage />,
      },
      {
        path: "project/select",
        element: <SelectProjectPage />,
      },
      {
        path: "project/open",
        element: <OpenFilePage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
])

export default appRouter
