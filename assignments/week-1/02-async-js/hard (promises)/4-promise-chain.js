/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Promise resolved after 1 second");
            resolve("One Second");
        }, 1000);
    });
}

function waitTwoSecond() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Promise resolved after 2 seconds");
            resolve("Two Seconds");
        }, 2000);
    });
}

function waitThreeSecond() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Promise resolved after 3 seconds");
            resolve("Three Seconds");
        }, 3000);
    });
}

function calculateTime() {
    const startTime = new Date();

    waitOneSecond().then(() => waitTwoSecond()).then(() => waitThreeSecond()).then(() => {
        const endTime = new Date();
        const totalTime = endTime - startTime;
        console.log(`All promises resolved sequentially in ${totalTime} milliseconds`);
    }).catch((error) => {
        console.error("Error:", error);
    });
}

// Example usage:
calculateTime();


// waitOneSecond, waitTwoSecond, and waitThreeSecond functions return promises that resolve after 1, 2, and 3 seconds, respectively, using setTimeout.

// The calculateTime function records the start time using new Date() before chaining the promises using .then() to ensure sequential execution.

// After all promises are resolved sequentially, the total time taken is calculated and printed.

// The example usage at the end demonstrates how to use the calculateTime function.

// This code demonstrates sequential execution of promises, where each subsequent promise starts after the previous one has resolved.