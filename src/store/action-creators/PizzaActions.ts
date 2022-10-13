import {Dispatch} from "redux";
import {PizzaActions, PizzaActionTypes} from "../../types/pizza";
import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref} from "firebase/database";

export const FetchDishes = () => {
  return async (dispatch: Dispatch<PizzaActions>) => {
    try {
      dispatch({type: PizzaActionTypes.FETCH_DISHES})
      const firebaseConfig = {
        apiKey: "AIzaSyDM3wwBqFN2W2kKSou8n_hN5__eNxF70yE",
        authDomain: "turtle-pizza-69d09.firebaseapp.com",
        databaseURL: "https://turtle-pizza-69d09-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "turtle-pizza-69d09",
        storageBucket: "turtle-pizza-69d09.appspot.com",
        messagingSenderId: "1084253055868",
        appId: "1:1084253055868:web:de9385e5f212bc628f52f9",
        measurementId: "G-4X9G12CP1H"
      };
      let myApp = initializeApp(firebaseConfig);
      const db = getDatabase();
      const starCountRef = ref(db, 'dishes');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        dispatch({
          type: PizzaActionTypes.FETCH_SUCCESS_DISHES,
          payload: data
        })
      });
    } catch (e) {
      dispatch({
        type: PizzaActionTypes.FETCH_ERROR_DISHES,
        payload: 'Неожиданная ошибка :('
      })
    }
  }
}