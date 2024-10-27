import otpGenerator from "otp-generator";

/**
 * Generate a unique one-time password (OTP)
 * @param {number} size - The length of the OTP, defaults to 6
 * @returns {string} - A randomly generated OTP
 */
const getUniqueOneTimePassword = (size: number = 6): string => {
  return otpGenerator.generate(size, {
    digits: true,
    lowerCaseAlphabets: true, // Use lowercase alphabets instead
    upperCaseAlphabets: false, // Use uppercase alphabets if needed
    specialChars: false,
  });
};

/**
 * Convert a string to Title Case
 * @param {string} text - The input text to be converted
 * @returns {string} - The text in Title Case format
 */
const titleCase = (text: string): string => {
  let newText = "";
  let textTemp = text.toLowerCase();
  textTemp = textTemp.charAt(0).toUpperCase() + textTemp.slice(1);

  for (let i = 0; i < textTemp.length; i++) {
    if (textTemp[i] === " ") {
      newText += ` ${textTemp[i + 1].toUpperCase()}`;
      i++;
    } else {
      newText += textTemp[i];
    }
  }

  return newText;
};

export { getUniqueOneTimePassword, titleCase };
