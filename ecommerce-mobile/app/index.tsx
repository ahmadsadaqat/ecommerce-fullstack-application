import { StatusBar, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <StatusBar barStyle="default" />
    </View>
  );
}
