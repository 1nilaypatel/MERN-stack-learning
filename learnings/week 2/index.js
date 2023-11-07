/* 
steps 
-> npm init -y
-> make index.js
-> npm install express
-> go on expressjs site and bring basic boiler code 
-> npm install body-parser
*/


const express = require('express')
// added this after (npm install body-parser) and add (app.use(bodyParser.json());)
let bodyParser = require('body-parser') 
const app = express()
const port = 3000




// function middleWare1(req, res, next){ // request, response, next step
//     console.log("from inside middleware " + req.headers.counter);
//     // res.send("Error in middleWare"); // cannot send res if next is active, will have to put some condition
//     next();
// }

// app.use(middleWare1); // this initializes our use of middleWare before the main function is called

app.use(bodyParser.json()); // added a mew middleWare to extract the body when we do console.log(req.body)


function handleFirstRequest(req, res){
    // let counter = req.query.counter; // this is via query parameters

    // console.log(req.headers);
    // // in post man header section we clear url till handeSum and key -> counter and value -> 4
    // let counter = req.headers.counter; // this is via headers

    // console.log(req.body);
    // for this in body in postman click on raw -> JSON
    let counter = req.body.counter; // this is via body which we will use most of the time

    let calculatedSum = calculateSum(counter);
    var ans = "The sum is " + calculatedSum;
    res.send(ans);
}

// app.get('/handleSum', handleFirstRequest); // this can be accessed by the browser
app.post('/handleSum', handleFirstRequest); // this we check in postman 


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




function calculateSum(num){
    let sum = 0;
    for(let i = 1; i <= num; i++){
        sum += i;
    }
    return sum;
}

// let calculatedSum = calculateSum(100);
// console.log(calculatedSum);