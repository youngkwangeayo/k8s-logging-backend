import { Router } from 'express';
import logService from '../service/log.service.js';
import { APIError, APIResponse } from '../model/apiresponse.model.js';
import { K8sFluentBitLogModel } from '../lib/fluentbit-log/k8slog.model.js';

const router = Router();

// 추후 큐에넣고 백그라운드로 쓰가
router.post('/', async (req, res, next) => {
  
  let k8sFBLog = null;
  try { k8sFBLog = new K8sFluentBitLogModel( req.body );}
  catch (error) { return next( APIError.build().setStatus(400).setMessage("required fields: appName, podId, message") ); }
  

  try {
    console.log('Calling logService.saveLog with:', k8sFBLog);
    await logService.saveLog(k8sFBLog);

    const apiResponse = APIResponse.build().setMsg("Log entry saved successfully");
    res.send( apiResponse );
      
  } catch (error) { return next(error); };

});



router.get('/:appName', async (req, res, next) => {
  try {
    const { appName } = req.params;
    const result = await logService.getAppLogs(appName);
    
    const apiResponse = APIResponse.build().setData(result).setMsg("App logs retrieved successfully");
    res.send(apiResponse);
  } catch (error) { 
    return next(error); 
  }
});

router.get('/:appName/:fileName', async (req, res, next) => {
  try {
    const { appName, fileName } = req.params;
    const result = await logService.getLogFile(appName, fileName);
    
    const apiResponse = APIResponse.build().setData(result).setMsg("Log file retrieved successfully");
    res.send(apiResponse);
  } catch (error) { 
    return next(error); 
  }
});

export default router;