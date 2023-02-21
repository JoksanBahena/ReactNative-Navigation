import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function IndexScreen(props) {
  console.log(props);
  const { navigation } = props;
  return (
    <View>
      <Text>IndexScreen</Text>
      <Button
        title="Ir a Detalles"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="ir a información"
        onPress={() => navigation.navigate("Information")}
      />
      <Button
        title="ir a inicio sesion"
        onPress={() => navigation.navigate("Details",{screen: "loginS"})}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
