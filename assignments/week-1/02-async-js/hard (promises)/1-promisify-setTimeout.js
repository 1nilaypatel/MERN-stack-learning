/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/


function wait(n) {
    // Create a Promise that resolves after n milliseconds
    return new Promise((resolve) => {
        // Use setTimeout to simulate the passage of time
        setTimeout(() => {
            // Resolve the Promise after n milliseconds
            resolve(`Waited for ${n} seconds`);
        }, n * 1000); // Convert seconds to milliseconds
    });
}
    
    // Example usage:
    wait(3).then((message) => {
      console.log(message); // This will be executed after waiting for 3 seconds
    }).catch((error) => {
      console.error('Error:', error); // Handle any errors during the waiting period
    });


    // The wait function takes a parameter n, representing the number of seconds to wait.

    // It returns a new Promise that takes a callback function with two parameters: resolve and reject.
    
    // Inside the Promise, setTimeout is used to simulate the passage of time. After n seconds (converted to milliseconds), the resolve function is called.
    
    // The resolve function returns a message indicating that the wait is completed.
    
    // The wait function is used by calling it with a specified number of seconds (e.g., wait(3)).
    
    // The .then method is used to handle the resolved value (the message) when the Promise is fulfilled. In this example, it logs the message to the console.
    
    // The .catch method is used to handle any errors that might occur during the waiting period.
    
    // Now, when you call wait(3), it will return a Promise that resolves after waiting for 3 seconds. You can adjust the argument to wait to change the waiting time.