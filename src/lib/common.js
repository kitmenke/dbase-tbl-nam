import { abbreviations } from '../lib/abbreviations.js';

function convertWord(w, convertUnknownWords) {
    let word = w.trim().toUpperCase();
    if (abbreviations.hasOwnProperty(word)) {
        return abbreviations[word];
    } else if (convertUnknownWords) {
        return word.replace(/[AEIOU]/g, '');
    } else {
        return '?';
    }
}

function convertLine(line, isUppercase, convertUnknownWords){
    let words = line.trim().split(' ');
    let result = words.map(word => convertWord(word, convertUnknownWords)).join('_');
    return isUppercase ? result.toUpperCase() : result.toLowerCase();
}

function convert(inputText, isUppercase, convertUnknownWords){
    let lines = inputText.split('\n');
    return lines.map(line => convertLine(line, isUppercase, convertUnknownWords)).join('\n');
}

export { convert };