import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import PokemonCard from "./PokemonCard";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=62&offset=${offset}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const pokemonWithImages = await Promise.all(
        data.results.map(async (pokemon, index) => {
          const pokemonNumber = offset + index + 1;
          const pokemonResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          const pokemonData = await pokemonResponse.json();
          return {
            name: pokemon.name,
            imgUrl: pokemonData.sprites.other["official-artwork"].front_default,
            number: pokemonNumber,
          };
        })
      );
      setFilteredPokemon(pokemonWithImages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchPokemon();
    } else {
      const filtered = filteredPokemon.filter((pokemon) =>
        pokemon.name.includes(searchTerm.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  }, [searchTerm]);

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  const renderItem = ({ item, index }) => (
    <PokemonCard name={item.name} imgUrl={item.imgUrl} number={item.number} />
  );

  const goToNextPage = () => {
    if (!loading) {
      setOffset(offset + 62);
      flatListRef.current.scrollToIndex({ index: 0 });
    }
  };

  const goToPrevPage = () => {
    if (offset >= 62 && !loading) {
      setOffset(offset - 62);
      flatListRef.current.scrollToIndex({ index: 0 });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pokemon..."
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={filteredPokemon}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={loading && <Text>Cargando...</Text>}
        style={{ flex: 1 }}
      />
      <View style={styles.pagination}>
        <TouchableOpacity
          style={styles.button}
          onPress={goToPrevPage}
          disabled={offset === 0 || loading}
        >
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={goToNextPage}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    flexGrow: 1,
    paddingBottom: 0,
  },
  search: {
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    height: 30,
    marginBottom: 20,
  },
  searchInput: {
    color: "black",
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 10,
    flexGrow: 1,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default SearchBar;
