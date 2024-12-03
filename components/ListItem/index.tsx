import { TouchableOpacity, useColorScheme } from "react-native";

import { createStyles } from "./styles";

type ListItemProps = {
  onPress?: () => void;
  children: React.ReactNode;
  style: any;
};

export default function ListItem({ onPress, children, style }: ListItemProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
}
