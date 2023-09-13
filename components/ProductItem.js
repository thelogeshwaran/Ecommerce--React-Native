import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../redux/CartReducer";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const [addedToCart, setAddedToCart] = useState(false);

  const cart = useSelector((state) => state.cart.cart);
  console.log("carts", cart);

  const addToCart = (product) => {
    setAddedToCart(true);
    dispatch(addtoCart(product));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        source={{ uri: item?.image }}
        style={{ width: 150, height: 150, resizeMode: "contain" }}
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          ₹ {item?.price}
        </Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>

      <Pressable
        onPress={() => addToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          alignItems: "center",
          padding: 10,
          borderRadius: 20,
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>{addedToCart ? `Added to Cart` : `Add to Cart`}</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
