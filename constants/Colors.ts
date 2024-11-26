const tintColorLight = "#000";
const tintColorDark = "#fff";

const mainColor = "#39D320";

export const Colors = {
  mainColor,
  error: "#f44336",
  light: {
    text: "#11181C",
    lightText: "#7A7F83",
    background: "#fff",
    tint: tintColorLight,
    icon: "#4F4F4F",
    tabIconDefault: "#4F4F4F",
    tabIconSelected: "#000",
    tabBackground: mainColor,
    border: "#E5E5E5",
    backgroundSecondary: "#f2f2f2",
  },
  dark: {
    text: "#fff",
    lightText: "#7A7F83",
    background: "#121212",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: mainColor,
    tabBackground: "#121212",
    border: "#303030",
    backgroundSecondary: "#282828",
  },
};
