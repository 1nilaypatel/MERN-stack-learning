/* 
steps 
-> npm init -y
-> make index.js
-> npm install express
-> go on expressjs site and bring code 
*/


const express = require('express')
const app = express()
const port = 3000

app.get('/handleSum', (req, res) => {
    let counter = req.query.counter;
    let calculatedSum = calculateSum(counter);
    
    var ans = "The sum is " + calculatedSum;
    res.send(ans);
})

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