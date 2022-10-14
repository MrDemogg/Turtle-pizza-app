import React, {FC} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {IconButton, MD3Colors, Modal, Button} from "react-native-paper";
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
  const {RemoveOrderDish} = useActions()
  const postOrder = () => {
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
      if (snapshot.exists()) {
        const oldSnapshot = snapshot.val()
        const postOrder = {key: uuid.v4(), totalPrice: order.totalPrice, cart: order.cart}
        const newSnapshot = [...oldSnapshot, postOrder]
        set(ref(db, 'orders'), newSnapshot).then()
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  if (error) {
    return <Text style={{textAlign: 'center', marginTop: 50, fontSize: 35}}>{error}</Text>
  }
  return (
    <Modal style={styles.modal} visible={visible} onDismiss={() => setVisible(false)}>
      <View style={styles.modalPosition}>
        <Text style={styles.title}>Your Order:</Text>
          {order.cart.length > 0
            ? <View style={styles.modalContainer}>
              {order.cart.map((dish: any) =>
                <View key={dish.title} style={styles.dishInfo}>
                  <Text style={{fontSize: 20}}>{dish.title} x{dish.amount}</Text>
                  <Text style={{fontSize: 18}}>{dish.price} руб.</Text>
                  <IconButton
                    icon='delete'
                    iconColor={MD3Colors.primary50}
                    size={20}
                    onPress={() => RemoveOrderDish(dish.title)}
                  />
                </View>
              )}
            </View>
            : <Text style={{fontSize: 30, ...styles.dishInfo}}>В корзине пусто</Text>
          }
        <Text style={{fontSize: 27}}>Delivery: 150 руб.</Text>
        <Text style={{fontSize: 29}}>Total: {order.totalPrice} руб.</Text>
        <View style={styles.buttons}>
          <Button onPress={() => setVisible(false)} mode="contained" icon='close'>Cancel</Button>
          <Button onPress={() => postOrder()} mode="contained" icon='check'>Cancel</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    height: 400,
    width: '100%'
  },
  modalPosition: {
    position: 'relative',
    top: 100
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    position: 'absolute',
    top: -230
  },
  modalContainer: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: '#000'
  },
  dishInfo: {
    width: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    top: -120
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'relative',
    top: 20
  }
})

export default OrdersModal;