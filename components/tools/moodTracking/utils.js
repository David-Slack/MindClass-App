// components/tools/MoodTracking/utils.js

export const getEmoji = (mood) => {
    if (mood === -1) return "🤔";
    const emoji = [
        "😢", "🙁", "😐", "🙂", "😄"
    ];
    return emoji[mood - 1];
};

export const getSaying = (mood) => {
    if (mood === -1) return "No mood recorded yet";
    const saying = [
        "Feeling awful",
        "Feeling down",
        "Feeling fine",
        "Feeling good",
        "Feeling great"
    ];
    return saying[mood - 1];
};

export const MOOD_SCALE = [1, 2, 3, 4, 5]; // Explicitly define the mood scale
export const DEFAULT_MOOD_VALUE = 4;
export const DATE_FORMAT = 'DD/MM/YYYY';
