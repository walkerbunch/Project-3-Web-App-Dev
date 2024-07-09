import "./styles.css";
import { useState, useEffect } from "react";
import Title from "./Title";

export default function App() {
  const [drink, setDrink] = useState("");
  const [loading, setLoading] = useState(false);

  const getRandomDrink = () => {
    setLoading(true);
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        if (r.drinks && r.drinks.length > 0) {
          const drinkData = r.drinks[0];
          const ingredients = [];
          const measurements = [];
          for (let i = 1; i <= 15; i++) {
            if (drinkData[`strIngredient${i}`]) {
              ingredients.push(drinkData[`strIngredient${i}`]);
              measurements.push(drinkData[`strMeasure${i}`]);
            } else {
              break;
            }
          }
          setDrink({
            name: drinkData.strDrink,
            instructions: drinkData.strInstructions,
            ingredients: ingredients,
            measurements: measurements,
            thumbnail: drinkData.strDrinkThumb,
          });
        } else {
          console.error("Bad or invalid response from API");
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error("Error getting drink: ", e);
        setLoading(false);
      });
  };

  useEffect(() => {
    getRandomDrink();
  }, []);

  return (
    <div className="App">
      <Title text="What drink should I make?" />
      <button onClick={getRandomDrink}>Press to Find a Random Drink!</button>
      {loading ? (
        <p>Loading drink. . . </p>
      ) : (
        <div>
          {drink && (
            <div>
              <h2>You should make: {drink.name}!</h2>
              <img src={drink.thumbnail} alt={drink.name} width={"45%"} />
              <h3>Ingredients:</h3>
              <ul>
                {drink.ingredients.map((ingredient, index) => (
                  <li>
                    <span>
                      {drink.measurements[index]} {ingredient}
                    </span>
                  </li>
                ))}
              </ul>
              <h3 class="instructions">Instructions:</h3>
              <p>{drink.instructions}</p>
            </div>
          )}
        </div>
      )}
      <footer>
        <a
          href="https://github.com/walkerbunch/Project-3-Web-App-Dev"
          target="_blank"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
