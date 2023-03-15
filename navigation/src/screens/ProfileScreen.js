import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import ProfileInfo from "../components/account/ProfileInfo";
import Loading from "../components/common/Loading";
import ProfileOptions from "../components/account/ProfileOptions";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [visibleLoading, setVisibleLoading] = useState(false);
  const [textLoanding, setTextLoading] = useState("");
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState)

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigation.navigate("indexS");
  };
  return (
    <View>
      <ProfileInfo
        setTextLoading={setTextLoading}
        setVisibleLoading={setVisibleLoading}
      />
      <ProfileOptions reload={onReload}/>
      <Button
        title="Cerrar sesion"
        onPress={logout}
        buttonStyle={styles.button}
        titleStyle={styles.title}
      />
      <Loading visible={visibleLoading} text={textLoanding} />
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
    marginHorizontal: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 17,
  },
});
