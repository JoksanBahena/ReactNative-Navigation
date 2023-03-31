import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-native-snap-carousel";
import { Icon, Rating } from "react-native-elements";
import Modal from "../components/common/Modal";
import Video from "../components/common/Video";
import Location from "../components/common/Location";

export default function DetailsScreen(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const carousel = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const onClose = () => setShowModal((prevState) => !prevState);

  const getPlaces = async () => {
    try {
      const response = await fetch(
        "http://192.168.62.185:3000/travel/api/place",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  const playVideo = (video) => {
    setRenderComponent(<Video video={video} />);
    setShowModal(true);
  };

  const showLocation = () => {
    setRenderComponent(<Location />);
    setShowModal(true);
  };

  const renderItem = ({ index, item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Image style={styles.img} source={{ uri: item.image }} />
        <Text style={styles.description}>{item.description}</Text>
        <Rating
          type="star"
          startingValue={parseFloat(item.rating)}
          fractions={1}
          readonly
          imageSize={30}
        />
        <Text style={styles.ratingText}>{item.rating}</Text>
        <View style={styles.icons}>
          <Icon
            type="material-community"
            name="youtube"
            color="red"
            size={50}
            onPress={() => playVideo(item.video)}
          />
          <Icon
            type="material-community"
            name="google-maps"
            color="green"
            size={50}
            onPress={showLocation}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={require("../../assets/img/capibaraFondo.jpg")}
      >
        <Carousel
          layout="tinder"
          ref={carousel}
          sliderWidth={400}
          itemWidth={400}
          onSnapToItem={(index) => setActiveIndex({ activeIndex: index })}
          data={data}
          renderItem={renderItem}
        />
      </ImageBackground>
      {renderComponent && (
        <Modal visible={showModal} close={onClose}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    height: "80%",
    padding: 40,
    marginTop: 50,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#ddad",
  },
  img: {
    height: "40%",
    width: "95%",
    borderRadius: 15,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  rating: {
    paddingVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "45%",
  },
});
