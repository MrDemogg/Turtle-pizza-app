import {Dispatch} from "redux";
import {PizzaActions, PizzaActionTypes} from "../../types/pizza";
import {getDatabase, onValue, ref} from "firebase/database";
import {initializeApp} from "firebase/app";

export const FetchDishes = () => {
  return async (dispatch: Dispatch<PizzaActions>) => {
    try {
      dispatch({type: PizzaActionTypes.FETCH_DISHES})
      const firebaseConfig = {
        databaseURL: 'https://turtle-pizza-69d09-default-rtdb.europe-west1.firebasedatabase.app/'
      }
      const app = initializeApp(firebaseConfig)
      const database = getDatabase(app)
      const db = getDatabase();
      const starCountRef = ref(db, 'dishes');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        dispatch({
          type: PizzaActionTypes.FETCH_SUCCESS_DISHES,
          payload: data
        })
      })
    } catch (e) {
      dispatch({
        type: PizzaActionTypes.FETCH_ERROR_DISHES,
        payload: 'Неожиданная ошибка :('
      })
    }
  }
}