// Function to parse video duration from a format like "PT1H30M45S" to "1:30:45"
export const parseVideoDuration = (duration) => {

  if (duration === "P0D") {
    return "Live"; // or any other representation for live videos
  }

  // Remove the "PT" prefix and replace "H", "M", and "S" with colons, then split by colons
  const durationParts = duration
    .replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "")
    .split(":");

  // Check if the duration has hours, minutes, and seconds
  if (durationParts.length === 3) {
    // Format the duration as "hours:minutes:seconds", adding leading zeros if needed
    return `${durationParts[0]}:${
      parseInt(durationParts[1]) < 10 ? `0${durationParts[1]}` : durationParts[1]
    }:${
      parseInt(durationParts[2]) < 10 ? `0${durationParts[2]}` : durationParts[2]
    }`;
  }

  // Check if the duration has minutes and seconds
  if (durationParts.length === 2) {
    // Format the duration as "minutes:seconds", adding leading zeros if needed
    return `${durationParts[0]}:${
      parseInt(durationParts[1]) < 10 ? `0${durationParts[1]}` : durationParts[1]
    }`;
  }

  // Check if the duration has only seconds
  if (durationParts.length === 1) {
    // Format the duration as "0:seconds", adding leading zeros if needed
    return `0:${
      parseInt(durationParts[0]) < 10 ? `0${durationParts[0]}` : durationParts[0]
    }`;
  }

  // Return an empty string if the duration format is not recognized
  return "";
};
