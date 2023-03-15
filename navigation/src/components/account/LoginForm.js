import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Button, Icon } from "react-native-elements";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function LoginForm() {
  const [password, setPassword] = useState(false);
  const Navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email no válido")
        .required("Email obligatorio"),

      password: Yup.string().required("Contraseña oblgatoria"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        Navigation.navigate("indexS");
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "La cuenta no existe",
          text2: "Campos inválidos",
          visibilityTime: 4000,
          autoHide: 400,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    },
  });

  const showPass = () => {
    setPassword(!password);
  };
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Correo"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        // errorMessage={Formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={password ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showPass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title={"Iniciar Sesión"}
        containerStyle={styles.containerBtn}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    marginTop: 30,
  },
  input: {
    width: "100%",
    marginTop: 20,
  },
  icon: {
    color: "#c1c1c1",
  },
  containerBtn: {
    width: "95%",
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#0D5BD7",
    marginLeft: 20,
    borderRadius: 15,
  },
});
