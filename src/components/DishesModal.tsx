import React, {FC, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {Button, Dialog, Modal, Paragraph, TextInput} from "react-native-paper";
import {useActions} from "../hooks/useActions";

interface DishesModalProps {
  selectedDishPrice: number,
  setSelectedDishPrice: any,
  selectedDishTitle: string,
  setSelectedDishTitle: any,
  amountModal: boolean,
  setAmountModal: any
}

const DishesModal: FC<DishesModalProps> = (
  {
    selectedDishPrice, setSelectedDishTitle, setSelectedDishPrice, selectedDishTitle, amountModal, setAmountModal
  }) => {
  const [amount, setAmount] = useState('')
  const [dialog, setDialod] = useState(false)
  const {AddOrderCart, AddOrderPrice} = useActions()
  const toDefault = () => {
    setAmountModal(false)
    setSelectedDishTitle('')
    setSelectedDishPrice(0)
  }
  return (
    <View>
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
  amountModal: {
    backgroundColor: '#fff',
    height: 150,
    marginTop: 300
  }
})

export default DishesModal;