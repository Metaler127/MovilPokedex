import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Navbar = ({ title }) => {
  return (
    <View style={styles.navbar}>
      <Image
        source={require("../assets/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "120%",
    marginTop: "-5%",
    backgroundColor: "#6F0085",
    paddingTop: 45,
    paddingBottom: 20,
    paddingHorizontal: "15%",
  },
  logo: {
    width: 50,
    height: 50,
    paddingLeft: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default Navbar;
