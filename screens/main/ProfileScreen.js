import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";

const ProfileScreen = () => {
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackgraund}
        source={require("../../assets/image/bigfon.png")}
      >
        <View
          style={{
            ...styles.pageContainer,
            width: dimensions,
          }}
        >
          <View
            style={{
              ...styles.photo,
              left: dimensions / 2 - 60,
            }}
          ></View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Ім'я</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBackgraund: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pageContainer: {
    backgroundColor: "#fff",

    justifyContent: "flex-start",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 32,
    marginTop: 147,
    minHeight: 665,
  },
  header: {
    marginTop: 92,
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-reg",
  },
  photo: {
    position: "absolute",
    top: -60,

    width: 120,
    height: 120,

    borderRadius: 16,

    backgroundColor: "#F6F6F6",
  },
});

export default ProfileScreen;
