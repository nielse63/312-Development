
export default (str) => {
  const lowerCaseString = str
    .replace(/-|_/g, ' ')
    .toLowerCase();
  const words = lowerCaseString.split(' ');
  const newSentenceArray = [];
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    newSentenceArray.push(word.charAt(0).toUpperCase() + word.slice(1));
  }
  return newSentenceArray.join(' ');
};
