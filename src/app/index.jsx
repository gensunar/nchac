import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { store } from "../store/store";
import { Provider } from "react-redux";

export default function Index() {
  return (
    // <Provider store={store}>
      <Redirect href={"/(tabs)/home"} />
    // </Provider>
  );
}