import AWS from 'aws-sdk';

export const storeFile = (fileBuffer: Buffer, fileId: string) => new Promise((resolve, reject) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params: any = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileId,
    Body: fileBuffer
  };

  s3.upload(params, (err: any, data: any) => {
    if (err) {
      return reject(err)
    }
    return resolve(data.location);
  });
});

/**
 * Retrieves the pinned file from the S3 bucket
 * @param {string} fileId ID of the pinned file from the database
 * @returns 
 */
export const readFileFromS3 = (fileId: string) => new Promise((resolve, reject) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params: any = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileId,
  };

  s3.getObject(params, (err: any, data: AWS.S3.GetObjectOutput) => {
    if (err) {
      return reject(err)
    }
    return resolve(data.Body);
  });
});

/**
 * Deletes the pinned file from the S3 bucket
 * @param {string} fileId ID of the pinned file from the database
 * @returns 
 */
 export const deleteFileFromS3 = (fileId: string) => new Promise((resolve, reject) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params: any = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileId,
  };

  s3.deleteObject(params, (err: any, data: AWS.S3.GetObjectOutput) => {
    if (err) {
      return reject(err);
    }
    return resolve(data.Body);
  });
});