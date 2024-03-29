import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";

export default function ChangeEmailForm(props) {
  const { close, onReload } = props;
  const [password, setPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      newEmail: "",
      password: "",
    },
    validationSchema: Yup.object({
      newEmail: Yup.string().required("Email obligatorio"),
      password: Yup.string().required("Contraseña oblgatoria"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const user = getAuth().currentUser;
        const credentials = EmailAuthProvider.credential(
          user.email,
          formValue.password
        );
        reauthenticateWithCredential(user, credentials);
        console.log(formValue.newEmail);
        await updateEmail(user, formValue.newEmail);
        onReload();
        close();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el email :(",
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
        placeholder="Email nuevo"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "email-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("newEmail", text)}
        errorMessage={formik.errors.newEmail}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: password ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar email"
        titleStyle={{ color: "#fff" }}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    paddingVertical: 10,
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    width: "95%",
    marginTop: 15,
  },
  btnStyle: {
    backgroundColor: "#333",
    borderRadius: 15,
  },
});
