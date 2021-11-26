import { validateFile, jsonReader } from '../helpers/fileHelper';

// Defaut app settings
const defaultSettings = {
  dailyUploadLimit: 5,
  dailyDownloadLimit: 5,
  cleanInactiveFilesInDays: 5,
  cleanUpSchedule: "* * 23 * * *"
};

// File path of the app settings
const settingsFilePath = './config/settings.json';

// Get app settings
const settings = () => {
  try {
    // read app settings file
    return jsonReader(settingsFilePath);
  }
  catch (err) {
    // validate file exist for settings
    validateFile(settingsFilePath, defaultSettings);

    return defaultSettings;
  }
};

export default settings;