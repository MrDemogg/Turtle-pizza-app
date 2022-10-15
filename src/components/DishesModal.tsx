import React, {FC, useState} from 'react';
import {StyleSheet, View, Text} from "react-native";
import {Button, Modal} from "react-native-paper";
import {useActions} from "../hooks/useActions";
import Slider from "@react-native-community/slider";

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
  const [amount, setAmount] = useState(1)
  const {AddOrderCart, AddOrderPrice} = useActions()
  const toDefault = () => {
    setAmountModal(false)
    setSelectedDishTitle('')
    setSelectedDishPrice(0)
  }
  return (
    <Modal style={styles.amountModal} visible={amountModal} onDismiss={() => setAmountModal(false)}>
      <View style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <View>
          <Text style={styles.titles}>Amount:</Text>
          <Text style={styles.titles}> {amount}</Text>
        </View>
        <Slider
          style={{width: '98%', height: 10}}
          minimumValue={1}
          maximumValue={5}
          value={amount}
          onValueChange={(value) => {
            const newAmount = parseInt(value.toString())
            setAmount(newAmount)
          }}
          minimumTrackTintColor="#1ddb8c"
          maximumTrackTintColor="#000000"
          tapToSeek={true}
        />
        <Button onPress={() => {
          toDefault()
        }}>Cancel</Button>
        <Button onPress={() => {
          const price = Number(selectedDishPrice) * amount
          AddOrderCart({
            amount: amount,
            price: price,
            title: selectedDishTitle,
            defaultPrice: Number(selectedDishPrice)},
            Number(selectedDishPrice))
          AddOrderPrice(price)
          toDefault()
        }}>
          Add to cart
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  amountModal: {
    backgroundColor: '#fff',
    height: 150,
    marginTop: 300
  },
  titles: {
    fontSize: 20,
    textAlign: 'center'
  }
})

export default DishesModal;