import { FloatingButton } from "@/components/FloatingButton";
import { Header } from "@/components/header";
import { useTheme } from "@/utils/styles";
import { StyleSheet, Text, View } from "react-native";

export default function TablesPage() {
  const theme = useTheme()[0];

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Header />
      <Text style={[styles.textStyle, { color: theme.textColor }]}>Edit app/index.tsx to edit this screen. BOP</Text>
      <FloatingButton />
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