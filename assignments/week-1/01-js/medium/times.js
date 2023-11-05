/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

function calculateTime(n) {
    // Get the current time in milliseconds before the calculation
    const startTime = Date.now();

    // Calculate the sum from 1 to n
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    // Get the current time in milliseconds after the calculation
    const endTime = Date.now();

    // Calculate the elapsed time in seconds
    const elapsedTimeInSeconds = (endTime - startTime) / 1000;

    return elapsedTimeInSeconds;
}
  // Test the function for different values of n
    console.log("Time to calculate sum from 1 to 100: " + calculateTime(100) + " seconds");
    console.log("Time to calculate sum from 1 to 100000: " + calculateTime(100000) + " seconds");
    console.log("Time to calculate sum from 1 to 1000000000: " + calculateTime(1000000000) + " seconds");