import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Input } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "react-native-toast-message";
import { getAuth, updateProfile } from "firebase/auth";

export default function ChangeNameForm(props) {
  const { close, onReload } = props;
  const formik = useFormik({
    initialValues: {
      displayName: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string().required("Username requerido"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, {
          displayName: formValue.displayName,
        });
        onReload();
        close();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el username :(",
        });
      }
    },
  });
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Username"
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        containerStyle={styles.input}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar username"
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
