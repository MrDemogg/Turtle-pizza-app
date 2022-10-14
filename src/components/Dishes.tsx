import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {Card, Title, Button, Modal, TextInput, Dialog, Paragraph} from "react-native-paper";
import OrdersModal from "./OrdersModal";
const Dishes = () => {
  const {dishes, error, loading, order} = useTypedSelector(state => state.pizza)
  const {FetchDishes, AddOrderCart, AddOrderPrice} = useActions()
  const [amountModal, setAmountModal] = useState(false)
  const [amount, setAmount] = useState('')
  const [selectedDishPrice, setSelectedDishPrice] = useState(0)
  const [selectedDishTitle, setSelectedDishTitle] = useState('')
  const [dialog, setDialod] = useState(false)
  const [ordersModal, setOrdersModal] = useState(false)
  useEffect(() => {
    FetchDishes()
  }, [])
  const toDefault = () => {
    setAmountModal(false)
    setSelectedDishTitle('')
    setSelectedDishPrice(0)
  }
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
      }<OrdersModal setVisible={setOrdersModal} visible={ordersModal}/>
      <Modal style={styles.amountModal} visible={amountModal} onDismiss={() => setAmountModal(false)}>
      <View style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <TextInput value={amount} onChangeText={(value) => setAmount(value)} label='Amount:' />
        <Button onPress={() => {
          toDefault()
        }}>Cancel</Button>
        <Button onPress={() => {
          if (!isNaN(Number(amount))) {
            const price = Number(selectedDishPrice) * Number(amount)
            AddOrderCart({amount: Number(amount), price: price, title: selectedDishTitle})
            AddOrderPrice(price)
            toDefault()
          } else {
            setDialod(true)
          }
        }}>
          Add to cart
        </Button>
      </View>
    </Modal>
      <Dialog visible={dialog} onDismiss={() => setDialod(false)}>
        <Dialog.Content>
          <Paragraph>Amount must be integer</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDialod(false)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
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
  amountModal: {
    backgroundColor: '#fff',
    height: 150,
    marginTop: 300
  }
})

export default Dishes;