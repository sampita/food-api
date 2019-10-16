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


// Practice: Displaying Foods

const foodFactory = (obj) => {
    return `
    <div class="food-item">
    <h1>${obj.name}</h1>
    <p>${obj.category}</p>
    <p>${obj.ethnicity}</p>
    </div>`
}

let foodInput = ""
const addFoodToDom = (food) => {
    foodInput += food;
    console.log(foodInput)
    document.querySelector(".foodList").innerHTML = foodInput;
}

fetch("http://localhost:8088/food")
    //parse fetch request results to javascript
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            // console.log(food);
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
        })

    })