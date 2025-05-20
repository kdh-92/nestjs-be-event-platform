# nestjs-be-event-platform

## 실행방법

nvm use 실행 시 Node.js 18 자동 적용
./server.sh or sh server.sh 실행 (docker compose 실행)

> 도커만 실행되어있으면 서버 자동 실행

서비스 Flow

- http://localhost:3000 (gateway server)

  - /auth/login, /auth/signup Public()으로 실행 - auth:3001 서버로 요청
  - 회원가입 & 로그인 처리 (로그인 성공 시 access token 발행)

- 나머지 url은 gateway 서버 - proxy.controller에 JwtAuthGuard, RolesGuard 적용
  - 권한 관련 부분은 ROLE_ROUTE_MAP 설정에 따라 url 별 권한 추가
  - 추가 url 및 권한 설정은 위 파일에서 수정

# MSA Server

## gateway

- role-route.map.ts : role에 따른 접근 허용 패턴 관리
- proxy.controller.ts : @Public(), JwtAuthGuard, RolesGuard 적용 관리

## event

> 조건 안에 조건을 계층적으로 구성하여 무한 중첩 가능한 구조
> 이벤트 조건 다양한 시나리오 대응 구조

- 단일 조건: [A]
- AND 조건: [A, B]
- OR 조건: [A, B] + operator: 'OR'
- 복합 조건: [[A OR B] AND C]

---

서비스 내 서비스 호출 부분 고도화

- 내부 API Key를 통해 서비스 전용 인증 토큰 사용해서 호출 구조

# API

## Auth

### 회원가입 (/auth/signup)

{
"email": "d1@d.com",
"password": "test11",
"role": "OPERATOR" // USER, OPERATOR, ADMIN, AUDITOR 중에 하나 입력 (role 미 입력시 기본 USER)
}

### 로그인 (/auth/login)

{
"email": "d1@d.com",
"password": "test11",
}

## Event & Reward

### 이벤트 (/events)

- 조회: GET /events/:id
- 전체 조회: GET /events
- 생성: POST /events
- 이벤트 보상 업데이트: /events/rewards/:id

### 보상 (/rewards)

- 내 보상 신청 조회: GET /rewards/history/me
- 전체 보상 조회: GET /rewards/history
- 보상 신청: POST /rewards/claim/:id (eventId)
