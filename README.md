# 🔗 TinyLink URL Shortener - Backend (Express/Mongoose)

This directory contains the Node.js/Express backend API for the TinyLink application. It handles the core link creation, click tracking, link statistics, and redirection logic.

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* MongoDB Atlas or a local MongoDB instance.
* A dedicated database user and connection URI.

### 🛠️ Installation

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd tiny-link/backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root of the **backend directory** and populate it with your database connection details and port:

    ```env
    PORT=5000
    MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/TinyLinkDB?retryWrites=true&w=majority"
    ```

### ▶️ Running the Server

Start the server in development mode (using a tool like `nodemon` is recommended, or just `node server.js`):

```bash
node server.js
