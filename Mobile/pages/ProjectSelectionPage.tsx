import { useAppSelector } from "@/redux/store"
import { Text, View } from "react-native"

interface ProjectSelectionPageProps {
}

export const ProjectSelectionPage = (props: ProjectSelectionPageProps) => {
  const selectedProjectPath = useAppSelector(state => state.applicationReducer.currentProjectPath)

  return (
    <View>
      <Text>Project Selection Page</Text>

    </View>
  )
}