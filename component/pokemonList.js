import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const PokemonList = ({ searchTerm }) => {
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (searchTerm.trim() === "") {
        setFilteredPokemon([]);
        return;
      }

      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const filtered = data.results.filter((pokemon) =>
          pokemon.name.includes(searchTerm.toLowerCase())
        );
        const pokemonWithImages = await Promise.all(
          filtered.map(async (pokemon) => {
            const pokemonResponse = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            const pokemonData = await pokemonResponse.json();
            return {
              name: pokemon.name,
              imgUrl:
                pokemonData.sprites.other["official-artwork"].front_default,
            };
          })
        );
        setFilteredPokemon(pokemonWithImages);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setFilteredPokemon([]);
      }
    };

    fetchPokemon();
  }, [searchTerm]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={filteredPokemon}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  text: {
    color: "black",
  },
});

export default PokemonList;
