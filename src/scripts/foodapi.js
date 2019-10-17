// console.log("wassssup")

// // .then means AFTER the thing prior loads first, THEN


// //making a call to database.json
// fetch("http://localhost:8088/food")
//     .then(foods => {
//         console.log("foods", foods)
//         //parse results of fetch request to json/javascript
//         return foods.json()
//     })

//     .then(parsedFoods => {
//         // display json data in console table
//         console.table(parsedFoods)
//     });




//     // // as a normal function
//     // .then(parsedFoods => {
//     //     console.table(parsedFoods)
//     // })

//     // .then(function (taco) {
//     //     console.table(taco)
//     // });

// Original Fetch Call
// fetch("http://localhost:8088/food")
//     //parse fetch request results to javascript
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         parsedFoods.forEach(food => {
//             console.log(food);
//             const foodAsHTML = foodFactory(food)
//             addFoodToDom(foodAsHTML)
//         })

//     })

// Practice: Displaying Foods

const foodFactory = (obj) => {
    return `
    <div class="food-item">
    <h1>${obj.name}</h1>
    <p>Category: ${obj.category}</p>
    <p>Ethnicity: ${obj.ethnicity}</p>
    <p>Ingredients: ${obj.ingredients}</p>
    <p>Country of Origin: ${obj.countries}</p>
    <p>Calories (in kcal): ${obj.calories}</p>
    <p>Fat per Serving: ${obj.fatServing}</p>
    <p>Sugars per Serving: ${obj.sugarsServing}</p>
    </div>`
}

let foodInput = ""

const addFoodToDom = (food) => {
    foodInput += food;
    // console.log(foodInput)
    document.querySelector(".foodList").innerHTML = foodInput;
}


fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log("food", food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }

                    if (productInfo.product.countries) {
                        food.countries = productInfo.product.countries
                    } else {
                        food.countries = "no country of origin listed"
                    }

                    if (productInfo.product.nutriments.energy_serving) {
                        food.calories = productInfo.product.nutriments.energy_serving
                    } else {
                        food.calories = "n/a"
                    }

                    if (productInfo.product.nutriments.fat_serving) {
                        food.fatServing = productInfo.product.nutriments.fat_serving
                    } else {
                        food.fatServing = "n/a"
                    }

                    if (productInfo.product.nutriments.sugars_serving) {
                        food.sugarServing = productInfo.product.nutriments.sugars_serving
                    } else {
                        food.sugarServing = "n/a"
                    }

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representation to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })