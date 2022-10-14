import {PizzaActions, PizzaActionTypes, PizzaState} from "../../types/pizza";

const initialState: PizzaState = {
  dishes: null,
  error: null,
  loading: false,
  order: {
    cart: [],
    totalPrice: 150
  }
}

export const PizzaReducer = (state = initialState, action: PizzaActions): PizzaState => {
  switch (action.type) {
    case PizzaActionTypes.FETCH_DISHES:
      return {...state, loading: true}
    case PizzaActionTypes.FETCH_ERROR_DISHES:
      return {...state, loading: false, error: action.payload}
    case PizzaActionTypes.FETCH_SUCCESS_DISHES:
      return {...state, loading: false, dishes: action.payload}
    case PizzaActionTypes.ADD_ORDER_CART:
      const newCart = [...state.order.cart]
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].title === action.payload[0].title) {
          newCart[i].amount += 1
          newCart[i].price += action.payload[1]
          return {...state, order: {...state.order, cart: newCart}}
        }
      }
      newCart.push(action.payload[0])
      return {...state, order: {...state.order, cart: newCart}}
    case PizzaActionTypes.ADD_ORDER_PRICE:
      const totalPrice = state.order.totalPrice + action.payload
      return {...state, order: {...state.order, totalPrice: totalPrice}}
    case PizzaActionTypes.REMOVE_ORDER_DISH:
      const selectedDish = state.order.cart.filter((dish: any) => dish.title === action.payload)
      const CartWithoutDish = state.order.cart.filter((dish: any) => dish.title !== action.payload)
      const removedTotalPrice = state.order.totalPrice - selectedDish[0].defaultPrice
      const removedPrice = selectedDish[0].price - selectedDish[0].defaultPrice
      console.log(selectedDish[0])
      if (selectedDish[0].amount > 1) {
        let index = 0
        for (let i = 0; i < state.order.cart.length; i++) {
          if (state.order.cart[i].title === action.payload) {
            index += i
          }
        }
        let oldAmount = state.order.cart[index].amount
        oldAmount--
        const newSelectedDish = {...state.order.cart[index], amount: oldAmount, price: removedPrice}
        console.log(newSelectedDish, state.order.cart[index], oldAmount)
        return {...state, order: {...state.order, cart: [...CartWithoutDish, newSelectedDish], totalPrice: removedTotalPrice}}
      }
      return {...state, order: {...state.order, cart: CartWithoutDish, totalPrice: removedTotalPrice}}
    case PizzaActionTypes.SET_ORDER:
      return {...state, order: action.payload}
    default:
      return state
  }
}