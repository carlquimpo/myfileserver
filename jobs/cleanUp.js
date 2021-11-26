import { env } from 'process';
import _ from 'underscore';
import moment from 'moment';
import { schedule } from 'node-cron';
import settings from '../helpers/settingsHelper';
import { getList } from '../services/fileService';
import { logs, logType } from '../helpers/logHelper';
import { remove } from '../services/fileService';

// Remove inactive files
const removeInactiveFiles = () => {
  try {
    const fileList = getList();
    const logsList = logs();

    // check each files in the file data
    _.each(fileList, (file) => {
      // get last log activity of the file
      const lastActivity = _.last(_.sortBy(_.filter(logsList, (log) => {
        return file.publicKey == log.publicKey &&
          log.type != logType.cleanup;
      }), 'date'));
      
      // check the number of days the file was inactive againts cleanInactiveFilesInDays setting
      if (lastActivity && moment.utc().diff(moment(lastActivity.date), 'days') >= settings().cleanInactiveFilesInDays) {
        console.log(`Clean up inactive file ${file.filename}.`);

        // clean up inactive file
        const result = remove(file.privateKey, 'file server', logType.cleanup);

        console.log(`${result.error && 'Fail' || 'Succeed'} clean up inactive file ${file.filename}.`);
      }
    });
  }
  catch (err) {
    console.log('Unable to clean up inactive file.', err.message);
  }  
};

// Run clean up job for inactive file scheduled on cleanUpSchedule settings
// Default to value of "* * 23 * * *" which is 11PM
const cleanUp = schedule(settings().cleanUpSchedule, () => {
  console.log(`########## Clean Up Job Started ${moment.utc().format('L LTS')} ##########`);

  removeInactiveFiles();

  console.log(`########## Clean Up Job Ended ${moment.utc().format('L LTS')} ##########`);
});

export default cleanUp;