const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://api.spoonacular.com/recipes/complexSearch',
  params: {
    includeIngredients: 'beetroot, cabbage, cheddar',
    sortDirection: 'asc',
    diet: 'vegetarian',
    ignorePantry: 'true',
    sort: 'max-used-ingredients',
    type: 'main course',
    number: '5',
  },
  headers: {
    'X-API-Key': '426bb09bb5df41a78f7ae049b5ecc1f9',
  }
};

axios.request(options).then(function (response) {
  const arr = response.data.results;
  let recipes = "";

  for (let i = 0; i < arr.length; i++) {
    recipes += arr[i].title + ', ';
  }
  console.log(recipes);
  var title = response.data.results[0].title.replace(/ +/g, '-').toLowerCase()
  var id = response.data.results[0].id
  console.log('https://spoonacular.com/recipes/' + title + '-' + id)
  
  const ingeredientReq = {
    method: 'GET',
    url: `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json`,
    headers: {
      'X-API-Key': '426bb09bb5df41a78f7ae049b5ecc1f9',
    }
  };

  axios.request(ingeredientReq).then(function (response) {
    const arr = response.data.ingredients;
    let ingredients = "";

    for (let i = 0; i < arr.length; i++) {
      ingredients += arr[i].name + ', ';
    }
    console.log(ingredients); 


  }).catch(function (error) {
    console.error(error);
  });
}).catch(function (error) {
	console.error(error);
});
