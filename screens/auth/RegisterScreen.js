import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";

import { useDispatch } from "react-redux";
import { authCreateUser } from "../../redux/auth/authOperations";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function RegisterScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [securePassword, setSecurePassword] = useState(true);

  const dispatch = useDispatch();

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

  const onSubmit = () => {
    console.log(state);
    dispatch(authCreateUser(state));
    setState(initialState);
    hideKeyboard();
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          hideKeyboard();
        }}
      >
        <ImageBackground
          style={styles.imageBackgraund}
          source={require("../../assets/image/bigfon.png")}
        >
          <KeyboardAvoidingView
          // behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.inputForm,
                paddingBottom: isShowKeyboard ? 32 : 78,
                height: isShowKeyboard ? 375 : 550,
                width: dimensions,
              }}
            >
              <View
                style={{
                  ...styles.photo,
                  left: dimensions / 2 - 60,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    right: -12,
                    bottom: 14,
                    width: 24,
                    height: 24,
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: "#FF6C00",
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ height: 13, with: 13 }}
                    source={require("../../assets/image/Union.png")}
                  ></Image>
                </View>
              </View>
              <View style={styles.header}>
                <Text style={styles.headerText}>Реєстрація</Text>
              </View>
              <View style={{ marginTop: 32 }}>
                <TextInput
                  placeholder="Логін"
                  placeholderTextColor={"#BDBDBD"}
                  value={state.name}
                  style={styles.textInput}
                  textAlign={"left"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, name: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  placeholder="Адресса електронної пошти"
                  placeholderTextColor={"#BDBDBD"}
                  value={state.email}
                  style={styles.textInput}
                  textAlign={"left"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  placeholder="Пароль"
                  placeholderTextColor={"#BDBDBD"}
                  value={state.password}
                  style={styles.textInput}
                  textAlign={"left"}
                  secureTextEntry={securePassword}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  style={styles.buttonSecure}
                  onPress={() => {
                    setSecurePassword(!securePassword);
                  }}
                >
                  <Text style={styles.buttonSecureTitle}>Показати</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  display: isShowKeyboard ? "none" : "flex",
                }}
                activeOpacity={0.8}
                onPress={() => {
                  onSubmit();
                }}
              >
                <Text style={styles.buttonTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.naviButon,
                  display: isShowKeyboard ? "none" : "flex",
                }}
                onPress={() => navigation.navigate("login")}
                activeOpacity={0.8}
              >
                <Text style={styles.naviButonTitle}>Вже є аккаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBackgraund: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
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
  inputForm: {
    backgroundColor: "#fff",

    justifyContent: "flex-start",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  photo: {
    position: "absolute",
    top: -60,

    width: 120,
    height: 120,

    borderRadius: 16,

    backgroundColor: "#F6F6F6",
  },

  textInput: {
    height: 50,

    marginHorizontal: 16,
    paddingHorizontal: 16,

    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",

    fontFamily: "Roboto-reg",
  },
  button: {
    marginTop: 43,
    marginHorizontal: 16,

    height: 50,

    borderRadius: 25,

    justifyContent: "center",
    alignItems: "center",
    // ...Platform.select({
    //   ios: {
    //     backgroundColor: "transparent",
    //     borderColor: "#f0f8ff",
    //   },
    //   android: {
    backgroundColor: "#FF6C00",
    //     borderColor: "transparent",
    //   },
    // }),
  },
  buttonTitle: {
    // color: Platform.OS === "ios" ? "#4169e1" : "#f0f8ff",
    color: "#FFFFFF",

    fontSize: 16,
    fontFamily: "Roboto-reg",
    textAlign: "center",
  },
  buttonSecure: {
    position: "absolute",

    top: 12,
    right: 32,
  },
  buttonSecureTitle: {
    color: "#1B4371",

    fontFamily: "Roboto-reg",
    fontSize: 16,
  },

  naviButon: {
    alignItems: "center",

    marginTop: 16,
  },
  naviButonTitle: {
    color: "#1B4371",

    fontFamily: "Roboto-reg",
    fontSize: 16,
  },
});
