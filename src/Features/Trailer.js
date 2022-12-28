import * as ScreenOrientation from "expo-screen-orientation";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { ResizeMode } from "expo-av";
import { setStatusBarHidden } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import VideoPlayer from "expo-video-player";
import { Searchbar } from "react-native-paper";
import movieTrailer from "movie-trailer";

export const Trailer = () => {
  const [video, setVideo] = useState("BigBuckBunny");
  const [videoURL, setVideoURL] = useState("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
  const [inFullscreen2, setInFullsreen2] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const refVideo2 = useRef(null);
  const refScrollView = useRef(null);

  const handleSearch = (video) => {
    movieTrailer(video
      ).then((res) => {
      setVideoURL(res);
      
    })
    .catch(error=>{
      console.log("error with movie trailer: " + error)
    })
  };

  useEffect(() => {
    handleSearch(video);
  }, [video]);

  return (
    <ScrollView
      scrollEnabled={!inFullscreen2}
      ref={refScrollView}
      onContentSizeChange={() => {
        if (inFullscreen2) {
          refScrollView.current.scrollToEnd({ animated: true });
        }
      }}
      style={styles.container}
    >
      <View style={styles.searchBarView}>
        <Searchbar
          placeholder="Search movie trailers"
          onChangeText={(text) => setVideo(text)}
          value={video}
          style={{ backgroundColor: "#808080" }}
          inputStyle={{ color: "#fff" }}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleStyle}>{video.toLocaleUpperCase()}</Text>
        </View>

        <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: ResizeMode.COVER,
            source: {
              uri: `${videoURL}`,
            },
            ref: refVideo2,
          }}
          fullscreen={{
            inFullscreen: inFullscreen2,
            enterFullscreen: async () => {
              setStatusBarHidden(true, "fade");
              setInFullsreen2(!inFullscreen2);
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
              );
              refVideo2.current.setStatusAsync({
                shouldPlay: true,
              });
            },
            exitFullscreen: async () => {
              setStatusBarHidden(false, "fade");
              setInFullsreen2(!inFullscreen2);
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.DEFAULT
              );
            },
          }}
          mute={{
            enterMute: () => setIsMute(!isMute),
            exitMute: () => setIsMute(!isMute),
            isMute,
          }}
          style={{
            videoBackgroundColor: "#ffff",
            height: inFullscreen2 ? Dimensions.get("window").width : 250,
            width: inFullscreen2 ? Dimensions.get("window").height : 400,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  searchBarView: {
    marginBottom: "40%",
    marginTop: 20,
  },
  text: {
    marginTop: 36,
    marginBottom: 12,
  },
  titleView:{
    alignItems:"center",
    justifyContent:"center",
    paddingBottom:10
  },
  titleStyle:{
    color: "#fff",
    fontSize:15,
    fontFamily:"Lato_400Regular" 
  }
});
