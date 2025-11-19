import crypto from 'crypto';

// Define the character set
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const length = 7; // The desired length of your short code

function generateRandomCode(len) {
    let result = '';
    // Generate a buffer of random bytes
    const randomBytes = crypto.randomBytes(len);

    for (let i = 0; i < len; i++) {
        // Use the modulus operator to map the byte value 
        // to an index within the 'characters' string length.
        const randomIndex = randomBytes[i] % characters.length;
        result += characters[randomIndex];
    }
    return result;
}

//const shortCode = generateRandomCode(length);
//console.log(shortCode); // e.g., "H4xY3v2"

export default generateRandomCode;