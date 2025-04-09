export function minutesToHoursMinutes(m){
    const hours = Math.trunc(m/60);
    const minutes = m % 60;

    return `${hours}h ${minutes}m`;
}