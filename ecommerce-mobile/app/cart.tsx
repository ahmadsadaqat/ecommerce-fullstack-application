import { StatusBar, Text, View } from "react-native";

export default function CartScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Cart Screen</Text>
      <StatusBar barStyle="default" />
    </View>
  );
}
