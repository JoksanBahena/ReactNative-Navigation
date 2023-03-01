import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();
  console.log(navigation);
  const aRegistro = () => {
    navigation.navigate("registerS")
  }
  return (
    <View>
      <Image
        source={require("../../assets/img/capi.png")}
        style={styles.logo}
      />
      <Text>Formulario</Text>
      <View>
        <Text onPress={aRegistro}>Registrate</Text>
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
});
