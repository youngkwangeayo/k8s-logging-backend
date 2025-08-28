# Fluent-bit Log Backend

K8s에서 fluent-bit가 수집한 로그를 파일로 저장하는 백엔드 시스템

## 사용 스펙
- Node.js/Express
- PVC 볼륨 마운트 (`/log`)
- Pod 메타데이터 app 이름으로 폴더 생성

## API 엔드포인트

### POST /logs
로그 저장 API
```json
{
  "appName": "aiagent-api",
  "podId": "aiagent-api-7d4b8c9f4-xyz",
  "message": "app에서 출력한 내용",
  "stream": "stdout",
  "logType": "access"
}
```

### GET /logs/:appName
앱별 로그 파일 목록 조회

### GET /logs/:appName/:fileName  
특정 로그 파일 내용 조회

### GET /health
헬스체크

## 로그 파일 구조
```
/log/
├── aiagent-api/
│   ├── access-20250825.log
│   └── error-20250825.log
└── aiagent/
    └── access-20250825.log
```

## 로그 포맷
```
[25/Aug/2025:14:10:45.123 +0900] [podId] stdout "app에서 출력한내용"
```

## 실행 방법

### 로컬 개발
```bash
npm install
npm run dev
```

### Docker
```bash
docker build -f docker/Dockerfile -t fluent-bit-log-backend .
docker run -p 3000:3000 -v /var/log/aiagent-log:/log fluent-bit-log-backend
```

### Kubernetes
```bash
kubectl apply -f k8s/deployment.yaml
```# k8s-logging-backend
