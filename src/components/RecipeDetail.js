import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./recipeDetail.css";

const RecipeDetail = ({ onAddToFavorites }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        setRecipe(response.data.meals[0]);
      });
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-detail">
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>Ingredients</h3>
      <ul>
        {Object.keys(recipe)
          .filter((key) => key.includes("Ingredient") && recipe[key])
          .map((key) => (
            <ul key={key}>{recipe[key]}</ul>
          ))}
      </ul>
      <h3>Instructions</h3>
      <ul>{recipe.strInstructions}</ul>
      <p>
        <strong>Cooking Time:</strong> {recipe.strCookTime || "N/A"}
      </p>
      <button onClick={() => onAddToFavorites(recipe)}>Add to Favorites</button>
    </div>
  );
};

export default RecipeDetail;
