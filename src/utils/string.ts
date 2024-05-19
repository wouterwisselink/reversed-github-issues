import { DateTime } from 'luxon';

export const stripHtmlAndTruncate = (input: string, length: number = 200): string => {
    const strippedString = input.replace(/<[^>]*>/g, '');
    if (strippedString.length <= length) return strippedString;
    return strippedString.slice(0, length) + '...';
};

export const parseDateTime = (input: string): string => {
    const dateTime = DateTime.fromISO(input);
    const time = dateTime.toFormat('h:mm a');
    const relative = dateTime.toRelative({
        base: DateTime.now(),
        style: 'long'
    });
    
    return relative ?? `${dateTime.toLocaleString()}, at ${time}`;
}

export const capitalizeFirstLetter = (input: string): string => {
    if (input.length === 0) return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
};