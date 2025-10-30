import { FloatingButton } from "@/components/FloatingButton";
import { Header } from "@/components/header";
import { store } from "@/redux/store";
import { useTheme } from "@/utils/styles";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

const reduxStore = store

export default function Index() {
  const theme = useTheme()[0];

  return (
    <Provider store={reduxStore}>
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Header />
        <Text style={[styles.textStyle, { color: theme.textColor }]}>Edit app/index.tsx to edit this screen. BOP</Text>
        <FloatingButton />
      </View>
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
