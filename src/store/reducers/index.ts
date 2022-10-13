import {combineReducers} from "redux";
import {PizzaReducer} from "./PizzaReducer";

export const rootReducers = combineReducers({
  pizza: PizzaReducer
})

export type RootState = ReturnType<typeof rootReducers>