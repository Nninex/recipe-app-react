import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import Favorites from "./components/Favorites";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch example recipes when the component mounts
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken") // Example query
      .then((response) => {
        setRecipes(response.data.meals || []);
      });
  }, []);

  const handleSearch = (query) => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => {
        setRecipes(response.data.meals || []);
      });
  };

  const handleAddToFavorites = (recipe) => {
    setFavorites([...favorites, recipe]);
  };

  const handleRemoveFromFavorites = (id) => {
    setFavorites(favorites.filter((recipe) => recipe.idMeal !== id));
  };

  return (
    <Router>
      <div className="app">
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<RecipeList recipes={recipes} />} />
          <Route
            path="/recipe/:id"
            element={<RecipeDetail onAddToFavorites={handleAddToFavorites} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onRemove={handleRemoveFromFavorites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
