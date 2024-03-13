// Importing the Express framework
import express from 'express'

// Importing the generateUploadURL function from './s3.js' file
import { generateUploadURL } from './s3.js'

// Creating an instance of the Express application
const app = express()

// Configuring Express to serve static files from the 'front' directory
app.use(express.static('front'))

// Handling GET requests to the '/s3Url' endpoint
app.get('/s3Url', async (req, res) => {
  // Generating an upload URL asynchronously
  const url = await generateUploadURL()

  // Sending the generated URL as a JSON response
  res.send({ url })
})

// Starting the Express server, listening on port 8080
app.listen(8080, () => console.log("listening on port 8080"))
