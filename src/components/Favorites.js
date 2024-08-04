import React from 'react';

const Favorites = ({ favorites, onRemove }) => {
  return (
    <div className="favorites">
      <h2>Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <ul>
          {favorites.map((recipe) => (
            <li key={recipe.idMeal}>
              {recipe.strMeal}
              <button onClick={() => onRemove(recipe.idMeal)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
