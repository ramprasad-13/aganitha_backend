import LinkModel from '../models/Link.js'; // Ensure the .js extension is correct

const linkStats = async (req, res) => {
    const { code } = req.params;

    try {
        // --- 1. AWAIT the Mongoose query result ---
        const findLink = await LinkModel.findOne({ shortCode: code })
            // Optional: Specify fields to ensure only necessary data is sent
            .select('shortCode targetUrl totalClicks lastClickedAt createdAt'); 

        // --- 2. Check if the link was NOT found ---
        if (!findLink) {
            // Assignment requires 404 if the code is not found
            return res.status(404).json({ message: 'Code is not found or deleted.' });
        }

        // --- 3. Respond with the found link object ---
        // Pass the document directly to .json()
        return res.status(200).json(findLink); 

    } catch (error) {
        console.error(`Error in getting link stats for code ${code}:`, error);
        // Return a generic 500 error for unexpected server issues
        return res.status(500).json({ message: 'Error in getting Link stats' });
    }
};

export default linkStats;