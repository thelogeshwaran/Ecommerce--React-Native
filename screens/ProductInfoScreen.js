import {
  ScrollView,
  StyleSheet,
  Pressable,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
  Text,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../redux/CartReducer";

const ProductInfoScreen = () => {
  const route = useRoute();
  const item = route?.params;
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const navigation = useNavigation();
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
    <ScrollView style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <Ionicons
            style={{ paddingLeft: 10 }}
            name="search-outline"
            size={24}
            color="black"
          />
          <TextInput placeholder="Search a Product" />
        </Pressable>
        <Ionicons
          name="mic"
          size={24}
          color="black"
          onPress={() => AsyncStorage.setItem("authToken", undefined)}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item?.carouselImages?.map((item, index) => (
          <ImageBackground
            source={{ uri: item }}
            style={{ width, height, marginTop: 25, resizeMode: "contain" }}
            key={index}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "white",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  20% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <SimpleLineIcons name="share" size={24} color="black" />
              </View>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                marginTop: "auto",
                marginLeft: 20,
              }}
            >
              <Ionicons name="md-heart-outline" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.title}</Text>

        <Text style={{ fontSize: 18, fontWeight: "800", marginTop: 5 }}>
          ₹ {item?.price}
        </Text>
      </View>

      <View style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={{ flexDirection: "row", padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontWeight: "bold" }}>{item?.color}</Text>
      </View>

      <View style={{ flexDirection: "row", padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontWeight: "bold" }}>{item?.size}</Text>
      </View>

      <View style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={{ padding: 10, gap: 5 }}>
        <Text style={{ fontWeight: "bold" }}>Total: ₹{item?.price} </Text>
        <Text style={{ color: "#00CED1" }}>
          FREE delivery Tomorrow by 3 PM. Order within 7hours
        </Text>
      </View>

      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <SimpleLineIcons name="location-pin" size={24} color="black" />
        <Text style={{ fontWeight: "500", fontSize: 15 }}>
          Deliver to Logesh - Banglore - 6006660
        </Text>
      </View>

      <Text style={{ marginHorizontal: 10, color: "green", fontWeight: "500" }}>
        IN Stock
      </Text>

      <Pressable
        onPress={() => addToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text>{addedToCart ? `Added to Cart` : `Add to Cart`}</Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "#FFAC1C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
