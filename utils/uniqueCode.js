// In utils/uniqueCode.js or where you put the complex logic

import Link from '../models/Link.js'; 
import generateRandomCode from './generateRandomCode.js'; // Assuming this generates a random string

/**
 * Generates a guaranteed unique short code by checking the database.
 */
export const generateUniqueCode = async (length = 7) => {
    let code = '';
    let found = null;
    let attempts = 0;
    const MAX_ATTEMPTS = 5;

    do {
        // 1. Generate a random code
        code = generateRandomCode(length); // Assume generateRandomCode takes length

        // 2. Check the database for existence
        found = await Link.findOne({ shortCode: code });
        
        attempts++;

        if (attempts > MAX_ATTEMPTS) {
            // Failsafe to prevent endless loops in case of extreme collision
            throw new Error('Failed to generate a unique short code after multiple attempts.');
        }

    } while (found); // Loop while a duplicate is found

    return code;
};