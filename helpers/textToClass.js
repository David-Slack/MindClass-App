/**
 * Takes in a title or other text and transforms to safe for class string
 * @param text
 * @returns {string}
 */
export function textToClass(text){
    return text
        .toLowerCase() // Lower case all letters
        .replace(/\s/g, '_') // Spaces to underscores
        .replace(/_/g, '-') // Underscores to dashes
        .replace(/\//g, " ") // Remove slashes
        .replace(/\\/g, '') // Backslashes to spaces
        //.replace(/\W/g, '') // Remove non-alphanumeric chars
    ;
}
