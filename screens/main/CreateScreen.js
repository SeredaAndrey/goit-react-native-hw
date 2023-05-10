import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
const shortid = require("shortid");

const CreateScreen = ({ navigation }) => {
  const [state, setState] = useState([]);
  const [camera, setCamera] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setState((prevState) => ({ ...prevState, location: location.coords }));
      let nameLocations = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setState((prevState) => ({ ...prevState, place: nameLocations[0] }));
    })();
  }, [state.location]);

  const takePhoto = async () => {
    const photosnap = await camera.takePictureAsync();
    setState((prevState) => ({ ...prevState, photo: photosnap.uri }));
  };
  const sendPhoto = () => {
    if (state.photo) {
      const shortId = shortid.generate();
      setState((prevState) => ({ ...prevState, postKey: shortId }));
      navigation.navigate("defaultScreen", state);
      setState([]);
    }
  };
  const openMap = () => {};

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {state.photo && (
          <Image
            style={styles.takePhotoContainer}
            source={{ uri: state.photo }}
          />
        )}
        <TouchableOpacity
          style={styles.cameraButtonContainer}
          onPress={takePhoto}
        >
          <MaterialIcons name="photo-camera" size={24} color="#fff" />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity style={styles.createButton} activeOpacity={0.8}>
        <Text style={styles.createButtonText}>Завантажити фото</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 32 }}>
        <TextInput
          placeholder="Назва"
          placeholderTextColor={"#BDBDBD"}
          value={state.title}
          style={styles.textInput}
          textAlign={"left"}
          onChangeText={(value) => {
            setState((prevState) => ({ ...prevState, title: value }));
          }}
        />
      </View>
      <TouchableOpacity
        onPress={openMap}
        style={styles.geoposition}
        activeOpacity={0.8}
      >
        <Text style={styles.geopositionText}>
          <AntDesign name="enviromento" size={20} color="color" />
          {state.place && state.place.city},{" "}
          {state.place && state.place.country}
        </Text>
      </TouchableOpacity>
      {state.photo ? (
        <TouchableOpacity
          onPress={sendPhoto}
          style={styles.sendButton}
          activeOpacity={0.8}
        >
          <Text style={styles.sendButtonText}>Опублікувати</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.sendButtonUnactive} activeOpacity={0.8}>
          <Text style={styles.sendButtonTextUnactive}>Опублікувати</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    marginHorizontal: 16,
    marginTop: 32,
    height: 240,
    justifyContent: "center",

    alignItems: "center",
    borderRadius: 8,
  },
  cameraButtonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    color: "#ff0000",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 150,
    height: 100,
  },
  geopositionButton: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  createButton: {
    marginTop: 8,
    marginLeft: 16,
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: "Roboto-reg",
    color: "#BDBDBD",
  },
  sendButton: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonUnactive: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto-reg",
  },
  sendButtonTextUnactive: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-reg",
  },
  geoposition: {
    height: 50,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  geopositionText: {
    color: "#BDBDBD",
    fontFamily: "Roboto-reg",
  },
  textInput: {
    height: 50,
    marginHorizontal: 16,
    paddingHorizontal: 16,

    borderColor: "#E8E8E8",
    borderBottomWidth: 1,

    fontFamily: "Roboto-reg",
  },
});

export default CreateScreen;
