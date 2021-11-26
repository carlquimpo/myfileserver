import fs from 'fs';

// Validate specified file exist
const validateFile = (filePath, defaultData) => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err != null) {
      // create file that does not exist
      jsonWriter(filePath, defaultData);
    }
  });
};

// Reads specified json file and returns json object
const jsonReader = (filePath) => {
  try {
    const jsonString = fs.readFileSync(filePath);
    const object = JSON.parse(jsonString);

    return object;
  }
  catch (err) {
    console.error(`Unable to read ${filePath}.`, err);
    throw err.message;
  }
};

// Writes json object into a specified json file 
const jsonWriter = (filePath, object) => {
  try {
    const jsonString = JSON.stringify(object, null, 2);

    fs.writeFileSync(filePath, jsonString);
    
    return true;
  }
  catch (err) {
    console.error(`Unable to write ${filePath}.`, err);
    throw err.message;
  }
};

// Delete specified file
const removeFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
  }
  catch (err) {
    console.error(`Unable to remove ${filePath}.`, err);
    throw err.message;
  }
};

// Generate key based on specified length
const keyGenerator = (length) => {
  var ret = "";
  while (ret.length < length) {
    ret += Math.random().toString(16).substring(2);
  }
  return ret.substring(0, length);
};

export { validateFile, jsonReader, jsonWriter, removeFile, keyGenerator };