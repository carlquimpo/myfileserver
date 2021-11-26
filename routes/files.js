import { Router } from 'express';
import { fileList, downloadFile, uploadFile, deleteFile } from '../resources/file';

const router = Router();

// Route for getting list of uploaded files
// e.g. -> GET http://localhost:3000/files
router.get('/', fileList);

// Route for downloading files
// e.g. -> GET http://localhost:3000/files/e112ee86d5619d6ea6831781a6
router.get('/:publicKey', downloadFile);

// Route for uploading files
// e.g. -> POST http://localhost:3000/files
router.post('/', uploadFile);

// Route for deleting files
// e.g. -> DELETE http://localhost:3000/files/071506ef97c37352e9d281ef8e8c13b97c507758bfa72658e1512d5584
router.delete('/:privateKey', deleteFile);

export default router;