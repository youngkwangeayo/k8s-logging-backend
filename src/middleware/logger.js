function requestLogger(req, res, next) {
  const start = Date.now();
  console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}  - body:${req.body}`,req.body);

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
}

export default requestLogger;