import mongoose from "mongoose";

// Define the regular expression for the short code convention
// [A-Za-z0-9]{6,8} - 6 to 8 characters, alphanumeric
const SHORT_CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

const LinkSchema = new mongoose.Schema(
    {
        shortCode: {
            type: String,
            required: [true, 'Short code is required.'],
            unique: true, // Ensures global uniqueness across all documents
            trim: true,
            // Indexed for fast lookups during redirect and uniqueness checks
            index: true, 
            // Custom validation to enforce the length and character set rule
            validate: {
                validator: function(v) {
                    return SHORT_CODE_REGEX.test(v);
                },
                message: props => `${props.value} is not a valid short code format. Must be 6-8 alphanumeric characters.`
            }
        },
        targetUrl: {
            type: String,
            required: [true, 'Target URL is required.'],
            // Indexed for potentially fast lookups (optional but helpful)
            index: true, 
            trim: true,
            // Basic URL validation
            // Note: For production, you might use a dedicated URL validation library like 'validator' here
            validate: {
                validator: function(v) {
                    // Simple check for basic http/https structure
                    return /^(http|https):\/\/[^ "]+$/.test(v);
                },
                message: props => `${props.value} is not a valid URL.`
            }
        },
        totalClicks: {
            type: Number,
            required: true,
            default: 0
        },
        lastClickedAt: {
            type: Date,
            default: null // Explicitly setting the default to null is clear
        }
    },
    {
        // Mongoose automatically handles 'createdAt' and 'updatedAt' fields
        timestamps: true 
    }
);

// Mongoose will pluralize 'Link' to 'links' for the collection name
const LinkModel = mongoose.model('Link', LinkSchema);

export default LinkModel;