import {PizzaActions, PizzaActionTypes, PizzaState} from "../../types/pizza";

const initialState: PizzaState = {
  dishes: null,
  error: null,
  loading: false
}

export const PizzaReducer = (state = initialState, action: PizzaActions): PizzaState => {
  switch (action.type) {
    case PizzaActionTypes.FETCH_DISHES:
      return {...state, loading: true}
    case PizzaActionTypes.FETCH_ERROR_DISHES:
      return {...state, loading: false, error: action.payload}
    case PizzaActionTypes.FETCH_SUCCESS_DISHES:
      return {...state, loading: false, dishes: action.payload}
    default:
      return state
  }
}