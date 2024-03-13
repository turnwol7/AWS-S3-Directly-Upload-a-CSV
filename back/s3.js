// Importing necessary modules: dotenv for environment variables, aws-sdk for AWS operations,
// crypto for cryptographic functions, and promisify from util for converting callback-based
// functions to promise-based functions.
import dotenv from 'dotenv'
import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"

// Promisifying the randomBytes function from the crypto module to generate random bytes asynchronously.
const randomBytes = promisify(crypto.randomBytes)

// Loading environment variables from the .env file using dotenv.
dotenv.config()

// Extracting AWS configuration variables from environment variables.
const bucketregion = process.env.AWS_REGION
const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

// Creating an instance of the AWS S3 service using the provided credentials and region.
const s3 = new aws.S3({
  credentials: { 
    accessKeyId, 
    secretAccessKey 
  },
  region: bucketregion,
  signatureVersion: 'v4'
})

// Function to generate a signed upload URL for a file to be uploaded to the S3 bucket.
export async function generateUploadURL() {
  // Generating random bytes to create a unique image name for the file to be uploaded.
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  // Setting up parameters for the S3 upload, including the bucket name, key (file name), and expiration time.
  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  // Generating a signed upload URL with a validity period of 60 seconds using the putObject operation.
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  
  // Returning the generated upload URL.
  return uploadURL
}
