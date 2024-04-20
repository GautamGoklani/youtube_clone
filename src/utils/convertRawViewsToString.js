// Function to convert raw views to a string with appropriate suffix (B for billions, M for millions, K for thousands)
export const convertRawViewstoString = (labelValue, isSub = false) => {
  // Check if the absolute value of the input is greater than or equal to 1 billion
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(0) + "B"  // Convert to billions and fix the decimal places to 0
    : 
    // Check if the absolute value of the input is greater than or equal to 1 million
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(0) + "M"  // Convert to millions and fix the decimal places to 0
    : 
    // Check if the absolute value of the input is greater than or equal to 1 thousand
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(isSub ? 2 : 0) + "K"  // Convert to thousands and fix the decimal places accordingly (2 if isSub is true, 0 otherwise)
    : 
    // If none of the above conditions are met, just return the absolute value as a string
    Math.abs(Number(labelValue)).toString();
};
