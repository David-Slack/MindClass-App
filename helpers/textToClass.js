/**
 * Takes in a title or other text and transforms to safe for class string
 * @param text
 * @returns {string}
 */
export function textToClass(text){
    return text
        .toLowerCase() // Lower case all letters
        .replace(/\//g, "") // Remove slashes
        .replace(/\\/g, '') // Remove backslashes
        .replace(/\s/g, '_') // Spaces to underscores
        .replace(/\W/g, '') // Remove non-alphanumeric chars
        .replace(/_/g, '-'); // Underscores to dashes
}
