import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Icon, ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../common/Modal";
import ChangeNameForm from "./ChangeNameForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeEmailForm from "./ChangeEmailForm";

export default function ProfileOptions(props) {
  const [showModal, setShowModal] = useState(false);
  const [conteined, setConteined] = useState(true);

  const { reload } = props;

  const onClose = () => setShowModal((prevState) => !prevState);

  const selectComponent = (key) => {
    if (key === "displayName") {
      setConteined(<ChangeNameForm close={onClose} onReload={reload} />);
    }

    if (key === "password") {
      setConteined(<ChangePasswordForm close={onClose} />);
    }

    if (key === "email") {
      setConteined(<ChangeEmailForm close={onClose} />);
    }
    onClose();
  };

  const optionsMenu = getOptionsMenu(selectComponent);

  return (
    <View style={styles.container}>
      {map(optionsMenu, (option, index) => (
        <ListItem key={index} onPress={option.onPress}>
          <Icon
            type={option.typeIcon}
            name={option.nameIconLeft}
            color={option.colorIcon}
          />
          <ListItem.Content>
            <ListItem.Title>{option.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={option.typeIcon}
            name={option.nameIconRight}
            color={option.colorIcon}
          />
        </ListItem>
      ))}
      <Modal visible={showModal} close={onClose}>
        {conteined}
      </Modal>
    </View>
  );
}

function getOptionsMenu(selectComponent) {
  return [
    {
      title: "Cambiar nombre",
      typeIcon: "material-community",
      nameIconLeft: "account-circle",
      colorIcon: "#ccc",
      nameIconRight: "chevron-right",
      onPress: () => selectComponent("displayName"),
    },
    {
      title: "Cambiar contraseña",
      typeIcon: "material-community",
      nameIconLeft: "lock-reset",
      colorIcon: "#ccc",
      nameIconRight: "chevron-right",
      onPress: () => selectComponent("password"),
    },
    {
      title: "Cambiar email",
      typeIcon: "material-community",
      nameIconLeft: "email-sync-outline",
      colorIcon: "#ccc",
      nameIconRight: "chevron-right",
      onPress: () => selectComponent("email"),
    },
  ];
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    borderBottomLeftRadius: 15,
  },
});
