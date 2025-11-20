import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "src/redux/store"

export const useReturnToHomeIfNoProj = () => {
  const currentProjectPath = useAppSelector((state) => state.applicationReducer.currentProjectPath)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentProjectPath) {
      navigate("/")
    }
  })
}