import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: 180,
    margin: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden",
  },
  imageContainer: {
    padding: 14,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 12,
  },
  textContainer: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "medium",
    margin: 5,
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
  },
});
