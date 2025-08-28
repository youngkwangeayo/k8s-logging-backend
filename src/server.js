import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';

import requestLogger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import logsRouter from './routes/log.router.js';


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Fluent-bit Log Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      healthz: '/healthz',
      ping: '/ping',
      logs: '/logs'
    }
  });
});

app.get('/healthz', (req, res) => {
  res.status(200).send();
});

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

app.use('/logs', logsRouter);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Fluent-bit log backend server running on port ${PORT}`);
  // test1();
});

// test1();
// function test1(){
//   // const baseDir = process.cwd();
//   const baseDir = "/var/log";
//   const dir = "logging_backend";
//   const fullPath = `${baseDir}/${dir}`;
  
//   if (!fs.existsSync(fullPath)) {
//     fs.mkdirSync(fullPath, { recursive: true });
//   }
  
//   const now = new Date();
//   const dateTime = now.toISOString().replace(/\D/g, '');
//   const fileName = `test${dateTime}.txt`;
//   const filePath = `${fullPath}/${fileName}`;
  
//   fs.writeFileSync(filePath, 'hello');
//   console.log(`Created file: ${filePath}`);
// }