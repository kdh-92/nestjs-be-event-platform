export const ROLE_ROUTE_MAP: {
  pattern: RegExp;
  roles: string[];
}[] = [
  { pattern: /^\/rewards\/claim$/, roles: ['USER', 'OPERATOR', 'ADMIN'] },
  { pattern: /^\/rewards\/history$/, roles: ['AUDITOR', 'ADMIN'] },
  { pattern: /^\/rewards(\/.*)?$/, roles: ['OPERATOR', 'ADMIN'] },
  { pattern: /^\/events(\/.*)?$/, roles: ['OPERATOR', 'ADMIN'] },
  { pattern: /^\/admin(\/.*)?$/, roles: ['ADMIN'] },
];
