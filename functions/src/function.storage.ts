import * as Functions from 'firebase-functions';
import mkdirp from 'mkdirp-promise';
import admin from './services';
import path from 'path';
import os from 'os';
import fs from 'fs';

const spawn = require('child-process-promise').spawn;

export const fileChange = Functions.storage.object().onFinalize(async(object:any) => {
  const { bucket, name: __filename, contentType } = object
    
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return;
  }

  if (object.contentType.startsWith('image/jpeg')) {
    console.log('Already a JPEG.');
    return;
  }

  const storageBucket = admin.storage().bucket(bucket);

  const JPEG_EXTENSION = '.jpeg';
  const baseFileName = path.basename(__filename, path.extname(__filename));
  const fileDir = path.dirname(__filename);
  const JPEGFilePath = path.normalize(path.format({ dir: fileDir, name: baseFileName, ext: JPEG_EXTENSION }));
  const tempLocalFile = path.join(os.tmpdir(), __filename);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath);
  
  try {
    // Create the temp directory where the storage file will be downloaded.
    await mkdirp(tempLocalDir);
    // Download file from bucket.
    await storageBucket.file(__filename).download({destination: tempLocalFile});
    console.log('The file has been downloaded to', tempLocalFile);
    // Convert the image to JPEG using ImageMagick.
    await spawn('convert', [tempLocalFile, tempLocalJPEGFile]);
    console.log('JPEG image created at', tempLocalJPEGFile);

    if (path.basename(__filename).includes('renamed-')) {
      console.log('File has been renamed already.');
      return;
    }
    
    // Uploading the JPEG image.
    await storageBucket.upload(tempLocalJPEGFile, {
      destination: 'renamed-' + JPEGFilePath,
      metadata: { contentType: 'image/jpeg' }
    });
    console.log('JPEG image uploaded to Storage at', JPEGFilePath);
    // Once the image has been converted delete the local files to free up disk space.
    fs.unlinkSync(tempLocalJPEGFile);
    fs.unlinkSync(tempLocalFile);

  } catch(err) {
    console.error(err);
  }
});
