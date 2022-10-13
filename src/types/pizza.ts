export enum PizzaActionTypes {
  FETCH_DISHES = "FETCH_DISHES",
  FETCH_SUCCESS_DISHES = "FETCH_SUCCESS_DISHES",
  FETCH_ERROR_DISHES = "FETCH_ERROR_DISHES"
}

export interface PizzaState {
  error: null | string,
  loading: boolean,
  dishes: any[] | null
}

interface FetchDishes {
  type: PizzaActionTypes.FETCH_DISHES
}

interface FetchSuccessDishes {
  type: PizzaActionTypes.FETCH_SUCCESS_DISHES,
  payload: any[]
}

interface FetchErrorDishes {
  type: PizzaActionTypes.FETCH_ERROR_DISHES,
  payload: string
}

export type PizzaActions = FetchDishes | FetchSuccessDishes | FetchErrorDishes