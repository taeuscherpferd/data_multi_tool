import { useAppSelector } from "@/redux/store"
import { Pressable, StyleSheet, Text, View } from "react-native"

interface ProjectSelectionPageProps {
}

export const ProjectSelectionPage = (props: ProjectSelectionPageProps) => {
  const selectedProjectPath = useAppSelector(state => state.applicationReducer.currentProjectPath)

  const handleSelectProject = () => {
    // Logic to open project selection dialog goes here
  }

  return (
    <View style={styles.container}>
      <Text>{"Select a project to begin"}</Text>
      <Pressable style={styles.selectProjectButton} onPress={handleSelectProject}>
        <Text>{"Select a project"}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectProjectButton: { marginTop: 20, padding: 10, backgroundColor: 'lightblue', borderRadius: 5 }

})