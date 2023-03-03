import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Button, Icon } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm() {
  const navigation = useNavigation();
  const [password, setPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email no valido")
        .required("Email obligatorio"),
      password: Yup.string().required("Contraseña obligatoria"),
      repeatPassword: Yup.string()
        .required("Confirmar contraseña obligatorio")
        .oneOf([Yup.ref("password")], "Contraseñas no coinciden"),
    }),
    validateOnChange: false,
    onSubmit: async (data) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        navigation.navigate("indexS");
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al registrar la cuenta :(",
        });
      }
    },
  });
  const showPass = () => {
    setPassword(!password);
  };
  const showPassRepeat = () => {
    setRepeatPassword(!repeatPassword);
  };
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
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
      <Input
        placeholder="Repetir contraseña"
        secureTextEntry={repeatPassword ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={repeatPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showPassRepeat}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="Registrar"
        containerStyle={styles.containerBtn}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
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
