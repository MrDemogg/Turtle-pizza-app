export enum PizzaActionTypes {
  FETCH_DISHES = "FETCH_DISHES",
  FETCH_SUCCESS_DISHES = "FETCH_SUCCESS_DISHES",
  FETCH_ERROR_DISHES = "FETCH_ERROR_DISHES",
  ADD_ORDER_PRICE = "ADD_ORDER_PRICE",
  ADD_ORDER_CART = "ADD_ORDER_CART",
  REMOVE_ORDER_DISH = "REMOVE_ORDER_DISH"
}

export interface PizzaState {
  error: null | string,
  loading: boolean,
  dishes: any[] | null,
  order: any
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

interface AddOrderCart {
  type: PizzaActionTypes.ADD_ORDER_CART,
  payload: any
}

interface AddOrderPrice {
  type: PizzaActionTypes.ADD_ORDER_PRICE,
  payload: number
}

interface RemoveOrderDish {
  type: PizzaActionTypes.REMOVE_ORDER_DISH,
  payload: string
}

export type PizzaActions = FetchDishes | FetchSuccessDishes | FetchErrorDishes | AddOrderPrice | AddOrderCart | RemoveOrderDish