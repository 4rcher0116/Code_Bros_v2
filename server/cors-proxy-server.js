const corsAnywhere = require('cors-anywhere');

// Set up CORS Anywhere's options
const corsOptions = {
  // Whitelist specific origins (e.g., your React app's origin)
  originWhitelist: ['http://localhost:3000'],
};

// Create the CORS Anywhere server
const server = corsAnywhere.createServer(corsOptions);

// Define the port to run the proxy server on
const PORT = process.env.PORT || 8080;

// Start the server
server.listen(PORT, () => {
  console.log(`CORS Anywhere proxy is running on port ${PORT}`);
});
