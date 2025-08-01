import { abbreviations } from '../lib/abbreviations.js';

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

// Find the best fuzzy match for a word
function findFuzzyMatch(word, maxDistance = 2) {
    const wordUpper = word.toUpperCase();
    let bestMatch = null;
    let bestDistance = Infinity;
    let bestScore = 0;
    
    const keys = Object.keys(abbreviations);
    
    for (const key of keys) {
        // Strategy 1: Exact substring match (highest priority)
        if (key.includes(wordUpper) || wordUpper.includes(key)) {
            const lengthDiff = Math.abs(key.length - wordUpper.length);
            if (lengthDiff < bestDistance || (lengthDiff === bestDistance && key.length > bestMatch?.length)) {
                bestMatch = key;
                bestDistance = lengthDiff;
                bestScore = 100;
            }
            continue;
        }
        
        // Strategy 2: Levenshtein distance (for typos)
        const distance = levenshteinDistance(wordUpper, key);
        if (distance <= maxDistance) {
            const maxLen = Math.max(wordUpper.length, key.length);
            const similarity = (maxLen - distance) / maxLen;
            const score = similarity * 90;
            
            if (distance < bestDistance || (distance === bestDistance && score > bestScore)) {
                bestMatch = key;
                bestDistance = distance;
                bestScore = score;
            }
        }
    }
    
    // Strategy 3: Prefix matching (for partial words)
    if (!bestMatch || bestScore < 50) {
        for (const key of keys) {
            if (key.startsWith(wordUpper) || wordUpper.startsWith(key)) {
                const score = Math.min(wordUpper.length, key.length) / Math.max(wordUpper.length, key.length) * 80;
                if (score > bestScore) {
                    bestMatch = key;
                    bestScore = score;
                }
            }
        }
    }
    
    return bestMatch;
}

function convertWord(w, chkFuzzyMatch) {
    let word = w.trim().toUpperCase();
    
    // First try exact match
    if (abbreviations.hasOwnProperty(word)) {
        return {
            result: abbreviations[word],
            matchType: 'exact',
            original: word,
            matched: word
        };
    }
    
    if (chkFuzzyMatch) {
        // Try fuzzy match
        const fuzzyMatch = findFuzzyMatch(word);
        if (fuzzyMatch) {
            return {
                result: abbreviations[fuzzyMatch],
                matchType: 'fuzzy',
                original: word,
                matched: fuzzyMatch
            };
        }
    }
    
    return {
        result: '?',
        matchType: 'none',
        original: word,
        matched: null
    };
}

// Updated functions to handle match information
function convertLine(line, isUppercase, chkFuzzyMatch){
    let words = line.trim().split(' ');
    let wordResults = words.map(word => convertWord(word, chkFuzzyMatch));
    let result = wordResults.map(wr => wr.result).join('_');
    let fuzzyMatches = wordResults.filter(wr => wr.matchType === 'fuzzy');
    
    return {
        result: isUppercase ? result.toUpperCase() : result.toLowerCase(),
        fuzzyMatches: fuzzyMatches
    };
}

function convert(inputText, isUppercase, chkFuzzyMatch){
    let lines = inputText.split('\n');
    let lineResults = lines.map(line => convertLine(line, isUppercase, chkFuzzyMatch));
    let result = lineResults.map(lr => lr.result).join('\n');
    let allFuzzyMatches = lineResults.flatMap(lr => lr.fuzzyMatches);
    
    return {
        result: result,
        fuzzyMatches: allFuzzyMatches
    };
}

export { convert };