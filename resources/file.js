import { getList, download, remove, upload } from '../services/fileService';

// Resource function to handle get list of uploaded file
const fileList = (req, res) => {
  // call file service to get list of uploaded file
  res.json(getList());
};

// Resource function to handle file download
const downloadFile = (req, res) => {
  const publicKey = req.params.publicKey;
  const ipAddress = req.ip;

  // check if publicKey param exist
  if (!publicKey) {
    return res.status(400).send('No file to downloaded.');
  }

  // call file service to download file
  const result = download(publicKey, ipAddress);

  // returns error response upon fail download
  if (result.error) {
    return res.status(500).send(result);
  }

  res.download(result.filePath);
};

// Resource function to handle file upload
const uploadFile = (req, res) => {
  const file = req.files.uploadFile;
  const ipAddress = req.ip;

  // check if file to upload exist
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No file to uploaded.');
  }

  // call file service to upload file
  const result = upload(file, ipAddress);

  // returns error response upon fail upload
  if (result.error) {
    return res.status(500).send(result);
  }

  res.json(result);
};

// Resource function to handle file delete
const deleteFile = (req, res) => {
  const privateKey = req.params.privateKey;
  const ipAddress = req.ip;

  // check if privateKey param exist
  if (!privateKey) {
    return res.status(400).send('No files to deleted.');
  }

  // call file service to remove file
  const result = remove(privateKey, ipAddress);

  // returns error response upon fail upload
  if (result.error) {
    return res.status(500).send(result);
  }

  res.json(result);
};

export { fileList, downloadFile, uploadFile, deleteFile };