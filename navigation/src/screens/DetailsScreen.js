import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-native-snap-carousel";

export default function DetailsScreen(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const carousel = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

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

  const renderItem = () => {
    return (
      <View style={styles.card}>
        <Text>HOLA</Text>
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
          layout="default"
          ref={carousel}
          sliderWidth={400}
          itemWidth={400}
          onSnapToItem={(index) => setActiveIndex({ activeIndex: index })}
          data={data}
          renderItem={renderItem}
        />
      </ImageBackground>
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
    opacity: 0.90
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
    borderColor: "#ddad"
  },
});
