## Reading the contents of a file

Write code to read contents of a file and print it to the console. 
You can use the fs library to as a black box, the goal is to understand async tasks. 
Try to do an expensive operation below the file read and see how it affects the output. 
Make the expensive operation more and more expensive and see how it affects the output. 

SOLUTION ->

<!-- 
    reading the file is an asynchronous task 
    and when we perform a very expensive task the main thread will be busy and
    will not take the asynchronous taks even if it is completed eary
    it will only check the callback queue when the main thread is free

    CODE -> 

    const fs = require('fs');

    function callback(err, data){
        console.log(data);
    }

    fs.readFile('a.txt', 'utf8', callback);

 -->