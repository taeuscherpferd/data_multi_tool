import { ProjectSelectionPage } from "@/pages/ProjectSelectionPage";
import { store } from "@/redux/store";
import { useTheme } from "@/utils/styles";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";

const reduxStore = store

export default function Index() {
  const theme = useTheme()[0];

  return (
    <Provider store={reduxStore}>
      <ProjectSelectionPage />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 16
  }
});
