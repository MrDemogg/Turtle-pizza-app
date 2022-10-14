import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {Card, Title, Button} from "react-native-paper";
import OrdersModal from "./OrdersModal";
import DishesModal from "./DishesModal";
const Dishes = () => {
  const {dishes, error, loading, order} = useTypedSelector(state => state.pizza)
  const {FetchDishes} = useActions()
  const [ordersModal, setOrdersModal] = useState(false)
  const [selectedDishPrice, setSelectedDishPrice] = useState(0)
  const [selectedDishTitle, setSelectedDishTitle] = useState('')
  const [amountModal, setAmountModal] = useState(false)
  useEffect(() => {
    FetchDishes()
  }, [])
  return (
    <View>
      <View style={styles.nav}><Text style={styles.navTitle}>Turtle Pizza</Text></View>
      {error
        ? <Text>{error}</Text>
        : <View>{loading
          ? <ActivityIndicator />
          : <View>
            {dishes
              ? <View><ScrollView>
                <View style={styles.scroll}>
                  {dishes.map(dish =>
                    <Card style={{marginTop: 20, width: '100%', height: 340}} key={dish.id}>
                      <Card.Cover source={{ uri: `${dish.img}` }} />
                      <Card.Title title={dish.title}/>
                      <Card.Content>
                        <Title>Price: {dish.price} руб.</Title>
                        <Card.Actions>
                          <Button onPress={() => {
                            setSelectedDishPrice(dish.price)
                            setSelectedDishTitle(dish.title)
                            setAmountModal(true)
                          }}>Select</Button>
                        </Card.Actions>
                      </Card.Content>
                    </Card>
                  )}
                </View>
              </ScrollView><View
                style={{position: 'absolute', width: '100%', height: 50, backgroundColor: '#212529', bottom: 195}}
              >
                <Text style={{color: '#fff', fontSize: 28}}>Order total: {order.totalPrice}</Text>
                <Button
                  style={{position: 'relative', bottom: 35, width: 200, left: 210}}
                  mode="contained" onPress={() => setOrdersModal(true)}>Checkout</Button>
                </View></View>
              : <Text>Блюд не найдено</Text>
            }
          </View>
        }
        </View>
      }
      <OrdersModal setVisible={setOrdersModal} visible={ordersModal}/>
      <DishesModal
        selectedDishPrice={selectedDishPrice}
        setSelectedDishPrice={setSelectedDishPrice}
        selectedDishTitle={selectedDishTitle}
        setSelectedDishTitle={setSelectedDishTitle}
        amountModal={amountModal}
        setAmountModal={setAmountModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 66,
    backgroundColor: '#212529'
  },
  navTitle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
  },
  scroll: {
    flex: 1, paddingBottom: 240
  },
})

export default Dishes;