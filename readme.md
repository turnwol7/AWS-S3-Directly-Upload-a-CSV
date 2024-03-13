# AWS App to directly upload to S3

This app allows the user to directly upload a CSV file to a S3 bucket.

The Node.js server GETs a signedURL from the AWS S3 bucket using a policy and a user identity and gives that link to the user to allow them to directly upload to the bucket.

You will also need your own secret keys from the policy and user with I did not include here.

Set up a policy and user and put the secret keys in a .env file to use them.

To run:  

npm install  
node back/server.js  