import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ShowDetails } from "../Tabs/ShowDetails";
import { ShowCast} from "../Tabs/ShowCast";
import { ShowMore } from "../Tabs/ShowMore";

export const LatestDetail = ({ route }) => {
  const { data } = route.params;
  const [selectedTab, setSelectedTab] = useState("");

  const SelectedTab = () => {
    switch (selectedTab) {
      case "A":
        return <ShowDetails data={data} />;
      case "B":
        return <ShowCast data={data} />;
      case "C":
        return <ShowMore data={data} />;
      default:
        return <View></View>;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          resizeMethod="scale"
          source={{ uri: `${data.Images[1]}` }}
          style={styles.imageStyle}
        />
      </View>

      <View style={styles.detailsView}>
        <View style={styles.mainInfoView}>
          <TouchableOpacity onPress={() => setSelectedTab("A")}>
            <Text
              style={[
                styles.infoStyle,
                { color: selectedTab == "A" ? "#A020F0" : "#fff" },
              ]}
            >
              Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("B")}>
            <Text
              style={[
                styles.infoStyle,
                { color: selectedTab == "B" ? "#A020F0" : "#fff" },
              ]}
            >
              Cast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("C")}>
            <Text
              style={[
                styles.infoStyle,
                { color: selectedTab == "C" ? "#A020F0" : "#fff" },
              ]}
            >
              More
            </Text>
          </TouchableOpacity>
        </View>
        {SelectedTab()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageView: {
    width: "100%",
    height: "45%",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  detailsView: {
    backgroundColor: "#000",
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopColor: "#fff",
    borderTopWidth: 3,
  },
  mainInfoView: {
    marginTop: 10,
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  infoStyle: {
    fontSize: 25,
    fontFamily: "Oswald_400Regular",
  },
});