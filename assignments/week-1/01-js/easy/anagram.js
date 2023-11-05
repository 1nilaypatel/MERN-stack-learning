/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  //  \s removes spaces, and //g replace replace it the string we give here it is empty
  let cleanedStr1 =  str1.replace(/\s/g, '').toLowerCase(); 
  let cleanedStr2 =  str2.replace(/\s/g, '').toLowerCase();

  // breaking the string into character arrays
  let charArray1 = cleanedStr1.split('');
  let charArray2 = cleanedStr2.split('');

  // sorting it
  charArray1.sort();
  charArray2.sort();

  // converting the character array into string 
  let sortedStr1 = charArray1.join('');
  let sortedStr2 = charArray2.join('');

  if(sortedStr1 === sortedStr2) return true;
  else return false;
}

module.exports = isAnagram;
