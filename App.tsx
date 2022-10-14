import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import {Provider} from "react-redux";
import {store} from "./src/store";
import Dishes from "./src/components/Dishes";

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <Dishes/>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}
