import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../components/account/LoginForm";

export default function LoginScreen() {
  const navigation = useNavigation();
  const aRegistro = () => {
    navigation.navigate("registerS");
  };
  return (
    <View>
      <Image
        source={require("../../assets/img/capi.png")}
        style={styles.logo}
      />
      <View style={styles.contentForm}>
        <LoginForm />
        <Text style={styles.text}>
          ¿Aun uno tienes cuenta?
          <Text onPress={aRegistro} style={styles.textBtn}> Registrate</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    heigth: 150,
    resizeMode: "contain",
    marginTop: 20,
  },
  contentForm: {
    marginHorizontal: 30,
  },
  text: {
    marginTop: 15,
    textAlign: "center",
  },
  textBtn: {
    fontWeight: "bold",
    color: "#0d5bd7"
  },
});
