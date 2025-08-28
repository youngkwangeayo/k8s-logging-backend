import fs from 'fs';
import path from 'path';
import { K8sLogModel } from './k8slog.model.js';

const LOG_BASE_DIR = process.env.LOG_BASE_DIR;


/**
 * 
 * @param {K8sLogModel} content 
 */
function writeLogFluentBitFormat( content ) {
  if ( LOG_BASE_DIR == null ) throw new Error("LOG_BASE_DIR NOT NULL");
  if ( content.container_name == null ) throw new Error("container_name NOT NULL");
  if ( content.pod_name == null ) throw new Error("pod_name NOT NULL");
  if ( content.stream == null ) throw new Error("stream NOT NULL");
  if ( content.time== null ) throw new Error("time NOT NULL");


  const logDir = path.join(LOG_BASE_DIR, content.container_name); // /var/log/logging_backend/podname
  const logFileName = getLogFileName(content.stream);
  const logEntry = `${content.time} [${content.pod_name}] ${content.stream} "${content.log}"\n`;

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  };

  fs.appendFileSync( path.join(logDir, logFileName), logEntry);
};



export {
  writeLogFluentBitFormat,
  LOG_BASE_DIR
};




// *********************************************
// *      PRIVE METHODE                       *
// *********************************************


function ensureLogDirectory(appName) {
  const logDir = path.join(LOG_BASE_DIR, appName);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  return logDir;
}

function formatTimestamp() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleDateString('en-US', { month: 'short' });
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  return `[${day}/${month}/${year}:${hours}:${minutes}:${seconds}.${milliseconds} +0900]`;
}

function getLogFileName( logType = 'stdout') {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${logType}-${year}${month}${day}.log`;
}
