import { createHashRouter } from "react-router-dom"
import AppLayout from "src/layouts/AppLayout/AppLayout"
import OpenedTablePage from "src/pages/OpenedTablePage/OpenedTablePage"
import { ProjectPage } from "src/pages/ProjectPage/ProjectPage"
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
        path: "project/",
        element: <ProjectPage />,
      },
      {
        path: "project/:fileName",
        element: <OpenedTablePage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
])

export default appRouter
