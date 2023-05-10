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
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [securePassword, setSecurePassword] = useState(true);

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
                paddingBottom: isShowKeyboard ? 32 : 144,
                height: isShowKeyboard ? 250 : 490,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerText}>Увійти</Text>
              </View>
              <View style={{ marginTop: 32 }}>
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
                <Text style={styles.buttonTitle}>Увійти</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  ...styles.naviButon,
                  display: isShowKeyboard ? "none" : "flex",
                }}
                onPress={() => navigation.navigate("register")}
                activeOpacity={0.8}
              >
                <Text style={styles.naviButonTitle}>
                  Немає аккаунта? Зареєструватися
                </Text>
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
    marginTop: 32,

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
