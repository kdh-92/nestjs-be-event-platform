# nestjs-be-event-platform

## 실행방법

nvm use 실행 시 Node.js 18 자동 적용

./server.sh or sh server.sh 실행 (docker compose 실행)

---

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
