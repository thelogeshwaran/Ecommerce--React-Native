import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { UserType } from "../context/UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      country: "",
      mobileNo: "",
      houseNo: "",
      street: "",
      landmark: "",
      postalCode: "",
    },
  });

  const { userId } = useContext(UserType);
  const navigation = useNavigation();

  const onSubmit = (data) => {
    console.log("userId", userId, data);
    axios
      .post("http://localhost:8000/addresses", { userId, address: data })
      .then(() => {
        reset();
        Alert.alert("Success", "Address has been added Successfully", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to add address");
        console.log("error", error);
      });
  };
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

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Add a new Address
          </Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="India"
                placeholderTextColor={"black"}
                style={styles.textInput}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="country"
          />
          {errors?.country && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.inputLabel}>Full name (First and last name)</Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="enter your name"
                placeholderTextColor={"black"}
                style={styles.textInput}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="name"
          />
          {errors?.name && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.inputLabel}>Mobile number</Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Mobile No"
                placeholderTextColor={"black"}
                style={styles.textInput}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                textInput="number"
              />
            )}
            name="mobileNo"
          />
          {errors?.mobileNo && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.inputLabel}>
            Flat, House No, Building, Company
          </Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder=""
                placeholderTextColor={"black"}
                style={styles.textInput}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="houseNo"
          />
          {errors?.houseNo && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.inputLabel}>Area, Street, sector, village</Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder=""
                placeholderTextColor={"black"}
                style={styles.textInput}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="street"
          />
          {errors?.street && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.inputLabel}>Landmark</Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Eg near airport"
                placeholderTextColor={"black"}
                style={styles.textInput}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="landmark"
          />
          {errors?.landmark && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.inputLabel}>Pincode</Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter Pincode"
                placeholderTextColor={"black"}
                style={styles.textInput}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="postalCode"
          />
          {errors?.postalCode && (
            <Text style={styles.errorText}>This is required.</Text>
          )}
        </View>

        <Pressable style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
          <Text style={{ fontWeight: "bold" }}>Add Address</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
  },
  submitBtn: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFC72C",
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginTop: 3,
  },
});
