import Link from '../models/Link.js'; // Ensure the .js extension

const deleteLink = async (req, res) => {
    const { code } = req.params;

    try {
        // 1. Attempt the deletion in a single atomic operation.
        // The result object will contain 'deletedCount'.
        const result = await Link.deleteOne({ shortCode: code });

        // 2. Check if a document was actually deleted.
        if (result.deletedCount === 0) {
            // If no document was matched and deleted, it means the link wasn't found (404).
            return res.status(404).json({ message: 'Link not found or already deleted.' });
        }

        // 3. Respond with 204 No Content for success, as required by the assignment.
        return res.status(204).send();

    } catch (error) {
        console.error(`Error in deleting link for code ${code}:`, error);
        // Return a generic 500 error for unexpected server issues
        return res.status(500).json({ message: 'Error in deleting Link' });
    }
};

export default deleteLink;