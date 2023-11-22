/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep(milliseconds) {
    // Record the current time
    const start = new Date().getTime();
    
    // Keep the thread busy until the specified time has passed
    while (new Date().getTime() - start < milliseconds) {
      // Busy-waiting
    }
}
// Example usage:
console.log('Start sleeping');
sleep(3000); // Sleep for 3 seconds
console.log('Awake now');

// The sleep function takes a parameter milliseconds, indicating the duration for which the thread should be halted.

// Inside the function, const start = new Date().getTime(); records the current time in milliseconds.

// The while loop keeps running until the difference between the current time and the recorded start time exceeds the specified milliseconds.

// During this time, the thread is essentially busy-waiting, not allowing any other tasks to be performed.

// Please note that using busy-waiting in a real-world application is discouraged due to its performance impact and blocking nature. In practice, asynchronous solutions like setTimeout or Promises are preferred.