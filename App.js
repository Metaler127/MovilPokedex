import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navbar from "./component/navbar";
import SearchBar from "./component/searchbar";
import PokemonList from "./component/pokemonList";
import PokemonCard from "./component/PokemonCard";
import { useState } from "react";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navbar title={"Pokedex"} />
      <SearchBar />
      <PokemonList searchTerm={searchTerm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#464646",
  },
  content: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 20,
  },

  SearchBar: {
    fontSize: 40,
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginTop: "5%",
  },
});
