import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-elements";
import * as ImagePiker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProfileInfo(props) {
  const { setTextLoading, setVisibleLoading } = props;
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  const [photo, setPhoto] = useState(photoURL);

  const changePhoto = async () => {
    const result = await ImagePiker.launchImageLibraryAsync({
      mediaTypes: ImagePiker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
    });
    if (!result.canceled) uploadPhoto(result.uri);
  };

  const uploadPhoto = async (uri) => {
    setTextLoading("Cargando foto...");
    setVisibleLoading(true);
    
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const refStorage = ref(storage, `imgProfile/${uid}`);
    uploadBytes(refStorage, blob).then((snapshot) => {
      updatePhoto(snapshot.metadata.fullPath);
    });
  };

  const updatePhoto = async (imgPath) => {
    setTextLoading("Actualizando foto...");

    const storage = getStorage();
    const refImg = ref(storage, imgPath);
    const urlImg = await getDownloadURL(refImg);

    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: urlImg });
    setPhoto(urlImg);

    setVisibleLoading(false);
  };
  return (
    <View style={styles.viewPhoto}>
      <Avatar
        size="large"
        rounded={true}
        icon={{ type: "material", name: "person" }}
        containerStyle={styles.avatar}
        source={{ uri: photo }}
      >
        <Avatar.Accessory size={28} onPress={changePhoto} />
      </Avatar>
      <View>
        <Text style={styles.nameUser}>{displayName || "USUARIO"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#9dc09d",
    marginHorizontal: 10,
    marginTop: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  avatar: {
    marginRight: 20,
    backgroundColor: "#416864",
  },
  nameUser: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
