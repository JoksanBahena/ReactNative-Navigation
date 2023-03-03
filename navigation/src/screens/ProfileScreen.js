import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigation.navigate("indexS");
  };
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button
        title="Cerrar sesion"
        onPress={logout}
        buttonStyle={styles.button}
        titleStyle={styles.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomColor: "#e3e3e3",
    marginTop: 30,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 17,
  },
});
