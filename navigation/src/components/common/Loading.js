import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";

export default function Loading(props) {
  const { visible, text } = props;

  return (
    <Overlay isVisible={visible} overlayStyle={styles.overlay}>
      <View style={styles.viewLoad}>
        <ActivityIndicator size="large" color="black" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

Loading.defaultProps = {
  visible: false,
};

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 250,
    backgroundColor: "#fff",
    borderColor: "#333",
    borderWidth: 0.5,
    borderRadius: 15,
  },
  viewLoad: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    textTransform: "uppercase",
    marginVertical: 5,
  },
});
