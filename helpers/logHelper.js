import moment from 'moment';
import { validateFile, jsonReader, jsonWriter } from '../helpers/fileHelper';

// Type of logs
const logType = {
  upload: "upload",
  download: "download",
  delete: "delete",
  cleanup: "cleanup"
};

// File path of the log data
const logsFilePath = './data/logs.json';

// Validate file exist for data logs
validateFile(logsFilePath, []);

// Get activity logs
const logs = () => {
  try {
    // read logs data file
    return jsonReader(logsFilePath);
  }
  catch (err) {
    // validate file exist for data logs
    validateFile(logsFilePath, []);

    return [];
  }
};

// Create log activity in the log data file
const logAction = (publicKey, type, ipAddress) => {
  try {
    let logList = logs();

    // create log data
    logList.push({
      publicKey: publicKey,
      type: type,
      ipAddress: ipAddress,
      date: moment.utc().format('L LTS')
    });
  
    // update log data file
    jsonWriter(logsFilePath, logList);
  }
  catch (err) {
    console.error(`Unable to log activity.`, err);
  }
};

export { logType, logs, logAction };