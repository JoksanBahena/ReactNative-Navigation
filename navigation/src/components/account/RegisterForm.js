import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input, Button, Icon } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RegisterForm() {
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
    onSubmit: (data) => {
      
    },
  });
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
        secureTextEntry={true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name="eye-outline"
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Repetir contraseña"
        secureTextEntry={true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name="eye-outline"
            iconStyle={styles.icon}
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
    marginLeft: 20
  },
});
