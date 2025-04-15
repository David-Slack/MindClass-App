/**
 * Takes in a timestamp like 2024-08-19T16:51:05+0100
 * and outputs the time ago, Today at TIME, Yesterday at TIME
 * or a formatted date time like
 * @param dateParam String
 * @param ago Boolean
 * @param format String 'short' || 'medium' || 'long'
 * @return {string}
 */
export function formatDate(dateParam, ago=true, format='medium') {
    if (!dateParam) {
        return '';
    }

    const date = new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const hoursAgo = date.getHours();
    const minutesAgo = date.getMinutes();

    if(ago){
        if (seconds < 5) {
            return 'now';
        } else if (seconds < 60) {
            return `${ seconds } seconds ago`;
        } else if (seconds < 90) {
            return 'about a minute ago';
        } else if (minutes < 60) {
            return `${ minutes } minutes ago`;
        } else if (isToday) {
            return `Today at ${ hoursAgo }:${ minutesAgo < 10 ? '0' : ''}${minutesAgo}`;
        } else if (isYesterday) {
            return `Yesterday at ${ hoursAgo }:${ minutesAgo < 10 ? '0' : ''}${minutesAgo}`;
        }
    }

    let options;

    if(format==='short'){ // e.g. July 2023
        options = {
            year: 'numeric',
            month: 'long'
        };
    }else if(format==='medium'){ // e.g. 25 July 2024
        options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
    }else{ // e.g. Thursday, 25 July 2024
        options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
    }
    return  date.toLocaleDateString('en-GB', options);
}
