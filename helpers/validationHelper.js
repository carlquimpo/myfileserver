import _ from 'underscore';
import moment from 'moment';
import { logs, logType} from './logHelper';
import settings from './settingsHelper';

// Validation to check if ip address has reached upload limit set in the dailyUploadLimit settings
const reachedUploadLimit = (ipAddress) => {
  const logList = _.filter(logs(), (log) => {
    return log.type == logType.upload && 
      log.ipAddress == ipAddress && 
      moment().utc().isSame(log.date);
  });

  return logList.length > settings().dailyUploadLimit;
};

// Validation to check if ip address has reached download limit set in the dailyDownloadLimit settings
const reachedDownloadLimit = (ipAddress) => {
  const logList = _.filter(logs(), (log) => {
    return log.type == logType.download && 
      log.ipAddress == ipAddress && 
      moment().utc().isSame(log.date);
  });

  return logList.length > settings().dailyDownloadLimit;
};

export { reachedUploadLimit, reachedDownloadLimit };