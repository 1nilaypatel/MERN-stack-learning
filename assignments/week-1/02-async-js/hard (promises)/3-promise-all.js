/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */

function waitOneSecond() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Promise resolved after 1 second');
            resolve('One Second');
        }, 1000);
    });
}
    
function waitTwoSecond() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Promise resolved after 2 seconds');
            resolve('Two Seconds');
        }, 2000);
    });
}

function waitThreeSecond() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Promise resolved after 3 seconds');
            resolve('Three Seconds');
        }, 3000);
    });
}
    
function calculateTime() {
    const startTime = new Date();
    Promise.all([waitOneSecond(), waitTwoSecond(), waitThreeSecond()]).then (results => {
        const endTime = new Date();
        const totalTime = endTime - startTime;
        console.log(`All promises resolved in ${totalTime} milliseconds`);
        console.log('Results:', results);
    }).catch(error => {
        console.error('Error:', error);
    });
}

// Example usage:
calculateTime();

//   waitOneSecond, waitTwoSecond, and waitThreeSecond functions return promises that resolve after 1, 2, and 3 seconds, respectively, using setTimeout.

// The calculateTime function records the start time using new Date() before calling Promise.all with the three functions.

// Promise.all waits for all promises to resolve and then calculates the total time taken.

// After all promises are resolved, the total time and results are printed.

// The example usage at the end demonstrates how to use the calculateTime function.

// This code uses the asynchronous nature of JavaScript to handle delays without blocking the main thread, providing a more efficient and responsive solution.