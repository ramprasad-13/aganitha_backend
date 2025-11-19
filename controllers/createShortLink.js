import Link from '../models/Link.js';
import { generateUniqueCode } from '../utils/uniqueCode.js'; // Use the robust unique generator

// NOTE: You can also handle customCode and collision (409) here, 
// as per the assignment's original requirement.

const createShortLink = async (req, res) => {
    console.log('req body',req.body)
    const { targetUrl, customCode } = req.body;

    console.log('target url here',targetUrl)
    try {
        // --- 1. Basic Input Validation ---
        if (!targetUrl) {
            return res.status(400).json({ error: 'Target URL is required.' });
        }
        
        // --- 2. Check if the targetUrl is already shorted ---
        // Find by the field name: targetUrl
        const existingLink = await Link.findOne({ targetUrl: targetUrl });
        
        if (existingLink) {
            // If found, return the existing short code (200 OK)
            return res.status(200).json({
            shortCode: existingLink.shortCode,
            targetUrl: existingLink.targetUrl,
            message: `URL already shortened! Existing code: /${existingLink.shortCode}` // <-- CLEARER MESSAGE
        });
        }
        
        let finalCode;

        if (customCode) {
            // --- 3. Handle Custom Code ---
            const codeExists = await Link.findOne({ shortCode: customCode });

            if (codeExists) {
                // Assignment requirement: 409 Conflict if code exists
                return res.status(409).json({ error: 'Custom short code already exists.' });
            }
            finalCode = customCode;

        } else {
            // --- 4. Generate Unique Code ---
            finalCode = await generateUniqueCode(); // Use the imported, robust utility
        }

        // --- 5. Create New Short Link ---
        const newLink = await Link.create({
            shortCode: finalCode,
            targetUrl: targetUrl // Mongoose will validate the format here
        });

        // --- 6. Success Response (201 Created) ---
        return res.status(201).json(newLink);

    } catch (error) {
        // Handle Mongoose validation errors (e.g., invalid URL format, code regex fail)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        
        console.error('Error creating short link:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default createShortLink;