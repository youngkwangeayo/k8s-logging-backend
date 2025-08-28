import { APIError } from "../model/apiresponse.model.js";


function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // ---- error리턴은 cors 전체 허용 ----
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  // -------------------------------

  if (err instanceof APIError) return res.status(err.status).send(err);

  const apiError = APIError.build().setStatus(err.status || 500).setMessage('처리 중 에러가 발생했습니다.');
  res.status(apiError.status).send(apiError);
};

export default errorHandler;