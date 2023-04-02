export default function getRecipes(ingredients) {
    const axios = require("axios");
require('dotenv').config()

const options = {
  method: 'GET',
  url: 'https://api.spoonacular.com/recipes/complexSearch',
  params: {
    diet: '',
    includeIngredients: 'potatoes, cabbage, pastry',
    type: 'main course',
    fillIngredients: true,
    sort: 'min-missing-ingredients',
    number: '5',
  },
  headers: {
    'X-API-Key': process.env.SPOONACULAR_API,
    'Content-Type': 'application/json',
  }
};

axios.request(options).then(function (response) {
  const arr = response.data.results;
  return arr;
}).catch(function (error) {
	console.error(error);
});

  }
  