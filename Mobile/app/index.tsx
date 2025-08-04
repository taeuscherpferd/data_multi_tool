import { Text, View } from "react-native";
import {Header} from "@/components/header";

export default function Index() {
  return (
    <View style={styles.container} >
      <Header />
      <Text style={styles.textStyle}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // You can replace this with your theme color
  },
  textStyle: {
    color: "#fff", // You can replace this with your theme color
    fontSize: 16,
  }
};
