// server talking to another server

function logResponseBody(jsonBody){
    console.log(jsonBody);
}

function callbackFn(result){
    result.json().then(logResponseBody)
}

let sendObj = {
    method : "GET",
};

fetch("http://localhost:3000/handleSum?counter=10", sendObj).then(callbackFn);