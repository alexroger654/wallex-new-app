export function countdownToTenMinutes(timestamp: string) {
    // Parse the timestamp as local time
    const parts = timestamp.split(/[- :]/); // Split into parts: [YYYY, MM, DD, HH, mm, ss]
    const targetTime = new Date(
        parseInt(parts[0], 10),  // Year
        parseInt(parts[1], 10) - 1, // Month (0-indexed)
        parseInt(parts[2], 10),  // Day
        parseInt(parts[3], 10),  // Hours
        parseInt(parts[4], 10),  // Minutes
        parseInt(parts[5], 10)   // Seconds
    ).getTime();

    console.log('Target Time (ms):', targetTime, 'Readable:', new Date(targetTime));

    const tenMinutesLater = targetTime + 10 * 60 * 1000; // Add 10 minutes in milliseconds
    console.log('10 Minutes Later (ms):', tenMinutesLater, 'Readable:', new Date(tenMinutesLater));

    const now = Date.now();
    console.log('Current Time (ms):', now, 'Readable:', new Date(now));

    const remainingTime = tenMinutesLater - now;
    console.log('Remaining Time (ms):', remainingTime);

    if (remainingTime <= 0) {
        return "Countdown finished!";
    }

    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return { minutes, seconds };
}
