import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const DefaultPostScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  //   console.log(posts);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 32,
          marginBottom: 32,
          backgroundColor: "#fff",
          flexDirection: "row",
        }}
      >
        <View style={styles.photoProfile}></View>
        <View style={styles.containerProfile}>
          <Text style={styles.nameProfile}>Ім'я</Text>
          <Text style={styles.emailProfile}>Емайл адресса</Text>
        </View>
      </View>
      <FlatList
        style={{ backgroundColor: "#fff" }}
        data={posts}
        keyExtractor={(item, index) => {
          index.toString();
        }}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image source={{ uri: item.photo }} style={styles.imageList} />

            <View style={styles.containerItem}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Comments", item.location)}
                >
                  <Text style={styles.commentTitle}>
                    <FontAwesome name="comment-o" size={20} color="black" />0
                  </Text>
                </TouchableOpacity>
                {item.place ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Map", item.location)}
                  >
                    <Text style={styles.locationTitle}>
                      <AntDesign name="enviromento" size={20} color="color" />
                      {item.place.city}, {item.place.country}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{ ...styles.locationTitle, color: "f00" }}>
                    <AntDesign name="enviromento" size={20} color="color" />
                    No geoposition
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  photoProfile: {
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    height: 60,
    width: 60,
  },
  containerProfile: {
    marginLeft: 8,
    justifyContent: "center",
  },
  nameProfile: {
    color: "#212121",
    fontSize: 13,
    fontFamily: "Roboto-reg",
  },
  emailProfile: {
    color: "rgba(33, 33, 33, 0.8)",
    fontSize: 11,
    fontFamily: "Roboto-reg",
  },
  imageList: {
    borderRadius: 8,
    marginHorizontal: 16,
    height: 240,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  containerItem: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Roboto-reg",
    color: "#212121",
  },
  commentTitle: {
    fontSize: 16,
    fontFamily: "Roboto-reg",
    color: "#BDBDBD",
  },
  locationTitle: {
    marginLeft: 50,
    fontSize: 16,
    fontFamily: "Roboto-reg",
    color: "#212121",
  },
});

export default DefaultPostScreen;
