import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import {Provider} from "react-redux";
import {store} from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}
