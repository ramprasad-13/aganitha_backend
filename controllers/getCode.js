import Link from '../models/Link.js';

// The assignment specifies a 302 redirect.
const REDIRECT_STATUS_CODE = 302; 
const NOT_FOUND_STATUS_CODE = 404;

const getCode = async (req, res) => {
    const { code } = req.params;

    try {
        // 1. Find and update the document atomically in a single database operation.
        // This is more efficient and safer for concurrent updates than find(), modify, and save().
        const updatedLink = await Link.findOneAndUpdate(
            { shortCode: code },
            { 
                // Increment the totalClicks field
                $inc: { totalClicks: 1 }, 
                // Set the lastClickedAt time to the current time
                $set: { lastClickedAt: new Date() } 
            },
            { 
                new: true // Return the updated document
            }
        );

        // 2. Check if the link was found (updatedLink will be null if not found)
        if (!updatedLink) {
            // Requirement: If code is not found, return 404
            return res.status(NOT_FOUND_STATUS_CODE).json({ 
                error: 'Link not found',
                message: `The short code /${code} does not exist or has been deleted.` 
            });
        }

        // 3. Perform the 302 redirect
        // Requirement: Visiting /{code} performs an HTTP 302 redirect
        return res.status(REDIRECT_STATUS_CODE).redirect(updatedLink.targetUrl);

    } catch (error) {
        console.error(`Error processing redirect for code /${code}:`, error);
        // Return a generic 500 error for unexpected server issues
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default getCode;