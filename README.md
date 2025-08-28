# Fluent-bit Log Backend

K8s에서 fluent-bit가 수집한 로그를 PVC 영구 스토리지에 저장하는 Node.js/Express 백엔드 시스템

## 프로젝트 개요
- **아키텍처**: Node.js/Express 기반 ESM 모듈 시스템
- **저장소**: PVC(Persistent Volume Claim)를 통한 영구 스토리지 (`/var/log/logging_backend`)
- **로그 구조**: Pod 메타데이터 app 이름으로 폴더 생성, 날짜별 로그 파일 분리
- **용량**: 10Gi gp3 스토리지

## API 엔드포인트

### 기본 엔드포인트
- `GET /` - API 정보 및 엔드포인트 목록
- `GET /health` - 상세 헬스체크
- `GET /healthz` - K8s 헬스체크용 (간단)
- `GET /ping` - 서버 응답 확인 (pong 반환)

### 로그 관련 엔드포인트

#### POST /logs
fluent-bit에서 로그 수신 및 저장
```json
{
  "appName": "aiagent-api",
  "podId": "aiagent-api-7d4b8c9f4-xyz", 
  "message": "app에서 출력한 내용",
  "stream": "stdout",
  "logType": "access"
}
```

#### GET /logs/:appName
앱별 로그 파일 목록 조회

#### GET /logs/:appName/:fileName  
특정 로그 파일 내용 조회

## 로그 저장 구조
```
/var/log/logging_backend/
├── aiagent-api/
│   ├── access-20250828.log
│   └── error-20250828.log
└── aiagent/
    └── access-20250828.log
```

## 로그 포맷
```
[28/Aug/2025:14:10:45.123 +0900] [aiagent-api-7d4b8c9f4-xyz] stdout "app에서 출력한내용"
```

## 프로젝트 구조
```
src/
├── server.js                    # 앱 구동 및 기본 엔드포인트
├── routes/
│   └── log.router.js           # 로그 관련 라우팅
├── service/
│   └── log.service.js          # 로그 비즈니스 로직 처리
├── middleware/
│   ├── logger.js               # 요청 로깅 미들웨어
│   └── errorHandler.js         # 중앙화된 에러 핸들링
├── model/
│   └── apiresponse.model.js    # API 응답 표준화 모델
└── lib/
    └── fluentbit-log/
        ├── k8slog.js          # 로그 유틸리티 함수
        └── k8slog.model.js    # K8s 로그 모델
```

## 기술 스택
- **Runtime**: Node.js 18 (Alpine Linux)
- **Framework**: Express.js 4.18+
- **Module System**: ESM (ES Modules)
- **Dependencies**: cors, dotenv
- **Dev Tools**: nodemon

## 실행 방법

### 로컬 개발
```bash
npm install
npm run dev    # 개발 모드 (nodemon)
npm start      # 프로덕션 모드
```

### Docker
```bash
docker buildx build --platform linux/amd64 -t logging_backend:0.0.1 .  
docker tag logging_backend:0.0.1 주소/logging_backend:0.0.1
docker push 주소/logging_backend:0.0.1    
```

### Kubernetes 배포
```bash
# namespace 생성
kubectl apply -f k8s_example/logging/namespace.yaml

# PVC 생성 (10Gi gp3 스토리지)
kubectl apply -f k8s_example/logging/logging-backend/logging-backend-pvc.yaml

# ConfigMap, Service, Deployment 배포
kubectl apply -f k8s_example/logging/logging-backend/
```

## K8s 리소스 구성
- **Namespace**: logging
- **PVC**: logging-backend-pvc (10Gi, gp3)
- **Deployment**: 1 replica, 리소스 제한 (100m-500m CPU, 128Mi-512Mi Memory)
- **Service**: ClusterIP 8080 포트
- **Volume Mount**: `/var/log/logging_backend` (PVC 연결)
- **Health Checks**: startup, readiness, liveness probe 구성

## 환경 변수
- `PORT`: 서버 포트 (기본값: 8080)
- `LOG_BASE_DIR`: 로그 저장 기본 디렉토리

## 아키텍처 패턴
```
Request → Router (라우팅) → Service (비즈니스 로직) → PVC Storage
                ↓ (에러 발생시)
            ErrorHandler (중앙 에러 처리)
```

## 특징
- **서비스 레이어 패턴**: 라우터는 라우팅만, 서비스는 비즈니스 로직 처리
- **중앙화된 에러 처리**: 모든 에러를 ErrorHandler 미들웨어에서 통합 관리
- **표준화된 응답**: APIResponse 모델을 통한 일관된 API 응답 형식
- **영구 스토리지**: PVC를 통한 Pod 재시작 시에도 로그 데이터 유지
