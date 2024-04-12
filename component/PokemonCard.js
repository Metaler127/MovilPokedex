import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const PokemonCard = React.memo(
  ({ name, imgUrl, number }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.number}>{number}</Text>
        <Image source={{ uri: imgUrl }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.name === nextProps.name &&
      prevProps.imgUrl === nextProps.imgUrl &&
      prevProps.number === nextProps.number
    );
  }
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  number: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
});

export default PokemonCard;
