import fs from 'fs';
import path from 'path';
import { APIError } from '../model/apiresponse.model.js';
import { K8sFluentBitLogModel } from '../lib/fluentbit-log/k8slog.model.js';
import { writeLogFluentBitFormat } from '../lib/fluentbit-log/k8slog.js';


class LogService {

  
  /**
   * @param {K8sFluentBitLogModel} k8sFBLogs 
   * @returns 
   */
  async saveLog(k8sFBLogs) {
    if ( !k8sFBLogs )  throw APIError.build().setStatus(500).setMessage("Missing required fields: appName, podId, message");

    
    for( let k8sFBLog of k8sFBLogs.logs) writeLogFluentBitFormat(k8sFBLog);
  };



  async getAppLogs(appName) {
    const logDir = path.join("/var/log/logging_backend", appName);
    
    if (!fs.existsSync(logDir)) {
      throw new Error('App log directory not found');
    }
    
    const files = fs.readdirSync(logDir)
      .filter(file => file.endsWith('.log'))
      .map(file => ({
        name: file,
        path: path.join(logDir, file),
        size: fs.statSync(path.join(logDir, file)).size,
        modified: fs.statSync(path.join(logDir, file)).mtime
      }));
    
    return {
      appName,
      logDirectory: logDir,
      files
    };
  }

  async getLogFile(appName, fileName) {
    const filePath = path.join(LOG_BASE_DIR, appName, fileName);
    
    if (!fs.existsSync(filePath)) {
      throw new Error('Log file not found');
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    return {
      appName,
      fileName,
      content: content.split('\n').filter(line => line.trim() !== '')
    };
  }
};


export default new LogService();