import AWS from 'aws-sdk';
import environment from '../../config/environment';

export const uploadFile = async (filename: string, file: any) => {
  const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: environment.AWS_REGION });

  const data = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: filename,
      Body: file,
      //ContentType: mimeType//geralmente se acha sozinho
    })
    .promise();

  return data.Location;
};
