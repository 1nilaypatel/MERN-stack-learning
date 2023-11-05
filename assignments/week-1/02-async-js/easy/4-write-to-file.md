## Write to a file
Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.

 <!--

    CODE -> 
    
    const fs = require('fs');

    const dataToWrite = 'This is the data that will be written to the file.\n';

    fs.writeFile('output.txt', dataToWrite, (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
        } else {
            console.log('Data has been written to the file successfully.');
        }
    });

 
  -->