console.log("wassssup")

// .then means AFTER the thing prior loads first, THEN

fetch("http://localhost:8088/food")
    .then(foods => {
        console.log("foods", foods)
        //parse results of fetch request to json/javascript
        return foods.json()
    })

    .then(parsedFoods => {
        // display json data in console table
        console.table(parsedFoods)
    });




    // // as a normal function
    // .then(parsedFoods => {
    //     console.table(parsedFoods)
    // })

    // .then(function (taco) {
    //     console.table(taco)
    // });