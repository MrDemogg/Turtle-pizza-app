import React, {FC, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {IconButton, MD3Colors, Modal, Button, Dialog, Paragraph} from "react-native-paper";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {initializeApp} from "firebase/app";
import {getDatabase, ref, get, child, set} from "firebase/database";
import uuid from 'react-native-uuid'

interface OrdersModalProps {
  visible: boolean,
  setVisible: any
}

const OrdersModal: FC<OrdersModalProps> = ({visible, setVisible}) => {
  const {order, error} = useTypedSelector(state => state.pizza)
  const {RemoveOrderDish, SetOrder} = useActions()
  const [dialog, setDialog] = useState(false)
  const postOrder = () => {
    console.log('post')
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
    const dbRef = ref(getDatabase());
    get(child(dbRef, `orders`)).then((snapshot) => {
      console.log(snapshot)
      const postOrder = {key: uuid.v4(), totalPrice: order.totalPrice, cart: order.cart}
      if (snapshot.exists()) {
        const oldSnapshot = snapshot.val()
        console.log(oldSnapshot)
        const newSnapshot = [...oldSnapshot, postOrder]
        set(ref(db, 'orders'), newSnapshot).then()
      } else {
        set(ref(db, 'orders'), [postOrder]).then()
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  const toDefault = () => {
    setVisible(false)
    SetOrder({
      cart: [],
      totalPrice: 150
    })
  }

  if (error) {
    return <Text style={{textAlign: 'center', marginTop: 50, fontSize: 35}}>{error}</Text>
  }
  return (
    <Modal style={styles.modal} visible={visible} onDismiss={() => setVisible(false)}>
      <View style={styles.modalPosition}>
        <Text style={styles.title}>Your Order:</Text>
          {order.cart.length > 0
            ? <ScrollView style={styles.scroll}>
              {order.cart.map((dish: any) =>
                <View key={dish.title} style={styles.dishInfo}>
                  <Text style={{fontSize: 20}}>{dish.title} x{dish.amount}</Text>
                  <Text style={{fontSize: 18}}>{dish.price} руб.</Text>
                  <IconButton
                    icon={dish.amount > 1
                      ? 'repeat'
                      : 'delete'
                    }
                    iconColor={MD3Colors.primary50}
                    size={20}
                    onPress={() => RemoveOrderDish(dish.title)}
                  />
                </View>
              )}
              </ScrollView>
            : <Text style={{fontSize: 30, marginBottom: 50}}>В корзине пусто</Text>
          }
        <Text style={{fontSize: 27}}>Delivery: 150 руб.</Text>
        <Text style={{fontSize: 29}}>Total: {order.totalPrice} руб.</Text>
        <View style={styles.buttons}>
          <Button onPress={() => setVisible(false)} mode="contained" icon='close'>Cancel</Button>
          <Button onPress={() => {
            if (order.totalPrice > 150) {
              postOrder()
              toDefault()
            } else {
              setDialog(true)
            }
          }} mode="contained" icon='check'>Order</Button>
        </View>
      </View>
      <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
        <Dialog.Content>
          <Paragraph>Cart is empty</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDialog(false)}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%'
  },
  modalPosition: {
    position: 'relative',
    top: 0
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    position: 'absolute',
    top: -150
  },
  dishInfo: {
    width: '100%',
    height: 40,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'relative',
    top: 20
  },
  scroll: {
    width: '120%',
    height: 150,
    position: 'relative',
    bottom: 40,
    borderStyle: 'solid',
    borderColor: '#22B0A0',
    borderTopWidth: 2,
    borderBottomWidth: 2
  }
})

export default OrdersModal;