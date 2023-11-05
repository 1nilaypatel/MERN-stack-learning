## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman
```


<!-- 

const fs = require('fs');

// Define the file path
const filePath = 'example.txt';

// Read the file content
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Remove extra spaces
    const cleanedContent = data.replace(/\s+/g, ' ');

    //  Write the cleaned content back to the file
    fs.writeFile(filePath, cleanedContent, 'utf8', (writeErr) => {
        if (writeErr) {
        console.error('Error writing to the file:', writeErr);
        } else {
        console.log('File has been cleaned and updated successfully.');
        }
    });
});


 -->