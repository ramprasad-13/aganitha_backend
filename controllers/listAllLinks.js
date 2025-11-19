import LinkModel from '../models/Link.js'; 

/**
 * GET /api/links
 * Lists all links for the dashboard, sorted by creation date.
 */
const listAllLinks = async (req, res) => {
    try {
        // Query the database to retrieve all documents
        const links = await LinkModel.find()
            // Select only the fields required for the dashboard table,
            // omitting unnecessary data and the internal MongoDB _id if preferred.
            .select('shortCode targetUrl totalClicks lastClickedAt createdAt')
            // Sort by creation date descending (newest first)
            .sort({ createdAt: -1 }); 

        // Return the list of links with a 200 OK status
        return res.status(200).json(links);
        
    } catch (error) {
        console.error('❌ Error listing all links:', error);
        // Return a generic 500 error for unexpected server issues
        return res.status(500).json({ message: 'Internal Server Error while fetching links.' });
    }
};

export default listAllLinks;