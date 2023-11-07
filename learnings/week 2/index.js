/* 
steps 
-> npm init -y
-> make index.js
-> npm install express
-> go on expressjs site and bring basic boiler code 
*/


const express = require('express')
const app = express()
const port = 3000

function handleFirstRequest(req, res){
    // let counter = req.query.counter; // this is via query parameters

    console.log(req.headers);
    // in post man header section we clear url till handeSum and key -> counter and value -> 4
    let counter = req.headers.counter; // this is via headers

    let calculatedSum = calculateSum(counter);
    var ans = "The sum is " + calculatedSum;
    res.send(ans);
}

// app.get('/handleSum', handleFirstRequest);
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