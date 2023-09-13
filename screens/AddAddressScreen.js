import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../context/UserContext";
import axios from "axios";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState([]);
  const { userId } = useContext(UserType);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/addresses/${userId}`
      );

      setAddress(response?.data?.addresses || []);
      console.log("address", response?.data?.addresses);
    } catch (e) {
      console.log("error ", e);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);

  console.log("address", address);

  return (
    <SafeAreaView>
      <ScrollView>
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
          <Ionicons name="mic" size={24} color="black" />
        </View>

        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold", padding: 10 }}>
            Your Addresses
          </Text>

          <Pressable
            onPress={() => navigation.navigate("AddAddress")}
            style={{
              borderWidth: 1,
              borderColor: "#D0D0D0",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              padding: 6,
            }}
          >
            <Text>Add a new Address</Text>
            <Feather name="chevron-right" size={24} color="black" />
          </Pressable>
        </View>

        <View>
          {address?.map((item, index) => (
            <Pressable style={styles.addressContainer} key={index}>
              <View style={styles.nameText}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {item?.name}
                </Text>
                <Ionicons name="location-sharp" size={24} color="red" />
              </View>

              <Text style={styles.addressLine}>{item?.houseNo}</Text>
              <Text style={styles.addressLine}>{item?.street}</Text>
              <Text style={styles.addressLine}>{item?.country}</Text>
              <Text style={styles.addressLine}>Phone No: {item?.mobileNo}</Text>
              <Text style={styles.addressLine}>
                Pin code: {item?.postalCode}
              </Text>

              <View style={styles.buttonGroup}>
                <Pressable>
                  <Text style={styles.button}>Edit</Text>
                </Pressable>
                <Pressable>
                  <Text style={styles.button}>Remove</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  addressContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    gap: 3,
  },
  nameText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressLine: {
    fontSize: 15,
    color: "#181818",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
  },
});
