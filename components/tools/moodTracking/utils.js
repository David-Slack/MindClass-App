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

export const MOOD_SCALE = [1, 2, 3, 4, 5];
export const DEFAULT_MOOD_VALUE = 4;
export const DATE_FORMAT = 'DD/MM/YYYY';

export const MOOD_COLORS_BACKGROUND = [
    "rgba(255, 99, 132, 0.4)",
    "rgba(255, 159, 64, 0.4)",
    "rgba(255, 205, 86, 0.4)",
    "rgba(75, 192, 192, 0.4)",
    "rgba(115, 171, 132, 0.4)",
];

export const MOOD_COLORS_BORDER = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgba(115, 171, 132)",
];

export const WEEKLY_GRAPH_BACKGROUND_COLOR = MOOD_COLORS_BACKGROUND[4]; // Was "rgba(102, 222, 147, 0.5)";
export const WEEKLY_GRAPH_BORDER_COLOR = MOOD_COLORS_BORDER[4]; // Was "rgb(102, 222, 147)";
