// Function to calculate the time elapsed since a given date
export const timeSince = (date) => {
  // Calculate the difference in seconds between the current date and the provided date
  const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

  // Calculate the interval in years
  let interval = seconds / 31536000;

  // If the interval is greater than 1 year, return the time in years
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }

  // Calculate the interval in months
  interval = seconds / 2592000;

  // If the interval is greater than 1 month, return the time in months
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }

  // Calculate the interval in days
  interval = seconds / 86400;

  // If the interval is greater than 1 day, return the time in days
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }

  // Calculate the interval in hours
  interval = seconds / 3600;

  // If the interval is greater than 1 hour, return the time in hours
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }

  // Calculate the interval in minutes
  interval = seconds / 60;

  // If the interval is greater than 1 minute, return the time in minutes
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }

  // If the time is less than a minute, return the time in seconds
  return Math.floor(seconds) + " seconds";
};
