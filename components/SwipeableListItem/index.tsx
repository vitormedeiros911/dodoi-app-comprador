import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

import { ThemedText } from "../ThemedText";
import { createStyles } from "./styles";

type ListItemProps = {
  onEditPress?: () => void;
  onDeletePress: () => void;
  children?: React.ReactNode;
  style?: any;
};

export default function SwipeableListItem({
  children,
  style,
  onDeletePress,
  onEditPress,
}: ListItemProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const getRightContent = () => {
    return (
      <RectButton style={styles.rightContent} onPress={onDeletePress}>
        <Ionicons name="trash-outline" size={24} color={Colors.error} />
        <ThemedText
          style={[
            styles.text,
            {
              color: Colors.error,
            },
          ]}
        >
          Excluir
        </ThemedText>
      </RectButton>
    );
  };

  return (
    <Swipeable renderRightActions={getRightContent} friction={1.5}>
      <View style={[styles.container, style]}>{children}</View>
    </Swipeable>
  );
}
