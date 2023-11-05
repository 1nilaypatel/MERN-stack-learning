/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str){
  let cleanedStr = str.replace(/\s/g, '').toLowerCase();
  let l = 0;
  let r = cleanedStr.length - 1;
  while(l < r){
      while(!isAlphabet(cleanedStr[l])) l++;
      while(!isAlphabet(cleanedStr[r])) r--;
      if(cleanedStr[l] != cleanedStr[r]) return false;
      l++;
      r--;
  }
  return true;
}

function isAlphabet(char){
  return (char >= 'a' && char <= 'z');
}

module.exports = isPalindrome;
