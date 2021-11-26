import { env } from 'process';
import _ from 'underscore';
import { reachedUploadLimit, reachedDownloadLimit } from '../helpers/validationHelper';
import { validateFile, jsonReader, jsonWriter, removeFile, keyGenerator } from '../helpers/fileHelper';
import { logType, logAction } from '../helpers/logHelper';

// File path of the file data
const filesDataFilePath = './data/files.json';

// Validate file exist for data files
validateFile(filesDataFilePath, []);

// Get list of uploaded files
const getList = () => {
  try {
    // read file data file
    return jsonReader(filesDataFilePath);
  }
  catch (err) {
    return { error: 'Unable to get file list. Please try again.' };
  }
};

// Download an upload file
const download = (publicKey, ipAddress) => {
  try {
    // validate if download limit is reached
    if (reachedDownloadLimit(ipAddress)) {
      return { error: 'Reached daily download limit.' };
    }
    
    // get file data to download
    const file = _.first(_.filter(getList(), (file) => {
      return file.publicKey == publicKey;
    }));
  
    // check if file exist
    if (file == undefined) {
      return { error: 'File does not exist.' };
    }
  
    // log download activity
    logAction(file.publicKey, logType.download, ipAddress);
  
    return { filePath: env.FOLDER + `\\${file.filename}` };
  }
  catch (err) {
    return { error: 'Unable to download file. Please try again.' };
  }  
};

// Upload a new file
const upload = (file, ipAddress) => {
  try {
    // validate if upload limit is reached
    if (reachedUploadLimit(ipAddress)) {
      return { error: 'Reached daily upload limit.' };
    }
    
    // write file to the shared folder
    file.mv(env.FOLDER + `\\${file.name}`);

    const fileData = {
      publicKey: keyGenerator(26),
      privateKey: keyGenerator(58),
      filename: file.name
    };
    const fileList = getList();
    
    fileList.push(fileData);

    // update file data with the new uploaded file
    jsonWriter(filesDataFilePath, fileList);
    delete fileData.filename;

    // log upload activity
    logAction(fileData.publicKey, logType.upload, ipAddress);

    return fileData;
  }
  catch (err) {
    return { error: 'Unable to upload file. Please try again.' };
  }
};

// Delete an uploaded file
const remove = (privateKey, ipAddress, type = logType.delete) => {
  try {
    // get file data to delete
    const file = _.first(_.filter(getList(), (file) => {
      return file.privateKey == privateKey;
    }));
  
    // check if file exist
    if (file == undefined) {
      return { error: 'File does not exist.' };
    }

    // delete file
    removeFile(env.FOLDER + `\\${file.filename}`);
  
    // update file data with the deleted file
    jsonWriter(filesDataFilePath, _.filter(getList(), (file) => {
      return file.privateKey != privateKey;
    }));

    // log delete activity
    logAction(file.publicKey, type, ipAddress);

    return { isDeleted: true };
  }
  catch (err) {
    return { error: 'Unable to delete file. Please try again.' };
  }
};

export { getList, download, upload, remove };
