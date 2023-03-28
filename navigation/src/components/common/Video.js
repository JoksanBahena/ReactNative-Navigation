import { StyleSheet, Text, View } from "react-native";
import React from "react";
import YoutubeIframe from "react-native-youtube-iframe";

export default function Video(props) {
  const { video } = props;
  return (
    <View>
      <YoutubeIframe height={230} play={true} videoId={video} />
    </View>
  );
}

const styles = StyleSheet.create({});
