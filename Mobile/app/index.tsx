import { Header } from "@/components/header";
import { useTheme } from "@/utils/styles";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const theme = useTheme()[0];

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Header />
      <Text style={[styles.textStyle, { color: theme.textColor }]}>Edit app/index.tsx to edit this screen. BOOP</Text>
    </View>
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
