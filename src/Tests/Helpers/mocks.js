export const drinkMock = {
    drinks: [{
        "idDrink": "13837",
        "strDrink": "Kir Royale",
        "strDrinkAlternate": null,
        "strTags": null,
        "strVideo": null,
        "strCategory": "Ordinary Drink",
        "strIBA": null,
        "strAlcoholic": "Alcoholic",
        "strGlass": "Champagne Flute",
        "strInstructions": "Pour Creme de cassis in glass, gently pour champagne on top",
        "strInstructionsES": null,
        "strInstructionsDE": "Creme de Cassis in ein Glas geben, vorsichtig Champagner darüber gießen.",
        "strInstructionsFR": null,
        "strInstructionsIT": "Versare la Creme de cassis nel bicchiere, versai sopra delicatamente lo champagne",
        "strInstructionsZH-HANS": null,
        "strInstructionsZH-HANT": null,
        "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/yt9i7n1504370388.jpg",
        "strIngredient1": "Creme de Cassis",
        "strIngredient2": "Champagne",
        "strIngredient3": null,
        "strIngredient4": null,
        "strIngredient5": null,
        "strIngredient6": null,
        "strIngredient7": null,
        "strIngredient8": null,
        "strIngredient9": null,
        "strIngredient10": null,
        "strIngredient11": null,
        "strIngredient12": null,
        "strIngredient13": null,
        "strIngredient14": null,
        "strIngredient15": null,
        "strMeasure1": "1 part ",
        "strMeasure2": "5 parts ",
        "strMeasure3": null,
        "strMeasure4": null,
        "strMeasure5": null,
        "strMeasure6": null,
        "strMeasure7": null,
        "strMeasure8": null,
        "strMeasure9": null,
        "strMeasure10": null,
        "strMeasure11": null,
        "strMeasure12": null,
        "strMeasure13": null,
        "strMeasure14": null,
        "strMeasure15": null,
        "strImageSource": null,
        "strImageAttribution": null,
        "strCreativeCommonsConfirmed": "No",
        "dateModified": "2017-09-02 17:39:48"
    }]
};
export const mealMock = {
    meals: [{
        "idMeal": "53060",
        "strMeal": "Burek",
        "strDrinkAlternate": null,
        "strCategory": "Side",
        "strArea": "Croatian",
        "strInstructions": "Fry the finely chopped onions and minced meat in oil. Add the salt and pepper. Grease a round baking tray and put a layer of pastry in it. Cover with a thin layer of filling and cover this with another layer of filo pastry which must be well coated in oil. Put another layer of filling and cover with pastry. When you have five or six layers, cover with filo pastry, bake at 200ºC/392ºF for half an hour and cut in quarters and serve.",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
        "strTags": "Streetfood, Onthego",
        "strYoutube": "https://www.youtube.com/watch?v=YsJXZwE5pdY",
        "strIngredient1": "Filo Pastry",
        "strIngredient2": "Minced Beef",
        "strIngredient3": "Onion",
        "strIngredient4": "Oil",
        "strIngredient5": "Salt",
        "strIngredient6": "Pepper",
        "strIngredient7": "",
        "strIngredient8": "",
        "strIngredient9": "",
        "strIngredient10": "",
        "strIngredient11": "",
        "strIngredient12": "",
        "strIngredient13": "",
        "strIngredient14": "",
        "strIngredient15": "",
        "strIngredient16": "",
        "strIngredient17": "",
        "strIngredient18": "",
        "strIngredient19": "",
        "strIngredient20": "",
        "strMeasure1": "1 Packet",
        "strMeasure2": "150g",
        "strMeasure3": "150g",
        "strMeasure4": "40g",
        "strMeasure5": "Dash",
        "strMeasure6": "Dash",
        "strMeasure7": " ",
        "strMeasure8": " ",
        "strMeasure9": " ",
        "strMeasure10": " ",
        "strMeasure11": " ",
        "strMeasure12": " ",
        "strMeasure13": " ",
        "strMeasure14": " ",
        "strMeasure15": " ",
        "strMeasure16": " ",
        "strMeasure17": " ",
        "strMeasure18": " ",
        "strMeasure19": " ",
        "strMeasure20": " ",
        "strSource": "https://www.visit-croatia.co.uk/croatian-cuisine/croatian-recipes/",
        "strImageSource": null,
        "strCreativeCommonsConfirmed": null,
        "dateModified": null
    }]
};
export const favoriteDrink = {
    "image": "https://www.thecocktaildb.com/images/media/drink/yt9i7n1504370388.jpg",
    "name": "Kir Royale",
    "id": "13837",
    "alcoholicOrNot": "Alcoholic",
    "category": "Ordinary Drink",
    "type": "drink",
    "nationality": ""
};

export const doneDrinkMock = {
    "image": "https://www.thecocktaildb.com/images/media/drink/yt9i7n1504370388.jpg",
    "name": "Kir Royale",
    "id": "13837",
    "alcoholicOrNot": "Alcoholic",
    "category": "Ordinary Drink",
    "type": "drink",
    "nationality": "",
    "tags": "",
    "doneDate": new Date().toLocaleDateString(),
};

export const storageDrinkIngredientsMock =  { drinks: { '13837': [] } }

export const doneMealMock = {
        "image": "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
        "name": "Burek",
        "id": "53060",
        "alcoholicOrNot": "",
        "category": "Side",
        "type": "food",
        "nationality": "Croatian",
        "tags": [
            "Streetfood",
            " Onthego"
        ],
        "doneDate": new Date().toLocaleDateString(),
};

export const mockDrinkFetch = () => {
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(drinkMock),
        }));
};

export const mockMealFetch = () => {
    jest.spyOn(global, 'fetch')
        .mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(mealMock),
        }));
};