export const ROLE_ROUTE_MAP: {
  pattern: RegExp;
  roles: string[];
}[] = [
  {
    pattern: /^\/rewards\/history\/me(\/.*)?$/,
    roles: ['USER', 'OPERATOR', 'ADMIN', 'AUDITOR'],
  },
  {
    pattern: /^\/rewards\/history(\/.*)?$/,
    roles: ['AUDITOR', 'OPERATOR', 'ADMIN'],
  },
  { pattern: /^\/rewards\/claim$/, roles: ['USER', 'OPERATOR', 'ADMIN'] },
  { pattern: /^\/rewards(\/.*)?$/, roles: ['OPERATOR', 'ADMIN'] },
  { pattern: /^\/events(\/.*)?$/, roles: ['OPERATOR', 'ADMIN'] },
  { pattern: /^\/admin(\/.*)?$/, roles: ['ADMIN'] },
];
