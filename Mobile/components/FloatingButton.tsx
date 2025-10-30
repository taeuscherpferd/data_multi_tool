import { useTheme } from "@/utils/styles";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

interface FloatingButtonProps {
  onPress?: () => void;
}

export const FloatingButton = ({ onPress }: FloatingButtonProps) => {
  const theme = useTheme()[0];
  return (
    <Pressable onPress={onPress} style={[styles.floatingButton, { backgroundColor: theme.primaryColor }]}>
      <Ionicons name="add-circle-outline" size={40} color="black" />
    </Pressable >
  )
}

const styles = StyleSheet.create({
  floatingButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 30,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
    boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.1)",

  },
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 16
  }
});
