import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginScreen from "./LoginScreen";
import Loading from "../components/common/Loading";

export default function IndexScreen(props) {
  const { navigation } = props;
  const [session, setSession] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setSession(user ? true : false)
    });
  }, []);

  if (session === null) {
    return <Loading text={"Validando sesión"} />;
  }

  return session ? (
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
        onPress={() => navigation.navigate("Details", { screen: "loginS" })}
      />
    </View>
  ) : (
    <LoginScreen />
  );
}
