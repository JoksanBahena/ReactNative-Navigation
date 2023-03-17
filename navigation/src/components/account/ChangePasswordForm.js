import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export default function ChangePasswordForm(props) {
  const { close } = props;
  const [password, setPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Contraseña actual oblgatoria"),
      newPassword: Yup.string().required("Contraseña nueva oblgatoria"),
      repeatNewPassword: Yup.string()
        .required("Repetir contraseña oblgatoria")
        .oneOf([Yup.ref("newPassword")], "La nueva contraseña deben coincidir"),
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
        await updatePassword(user, formValue.newPassword);
        close();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar la contraseña :(",
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
        placeholder="Contraseña actual"
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
      <Input
        placeholder="Contraseña nueva"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: password ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Confirmar contraseña nueva"
        secureTextEntry={password ? false : true}
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: password ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: showPass,
        }}
        onChangeText={(text) => formik.setFieldValue("repeatNewPassword", text)}
        errorMessage={formik.errors.repeatNewPassword}
      />
      <Button
        title="Cambiar contraseña"
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
