# Module 03: Authentication & Authorization

## Overview

Implement secure authentication using NextAuth.js v5 with multiple providers, session management, and role-based access control.

**Duration**: 4 hours  
**Level**: Intermediate  
**Prerequisites**: Modules 01-02 completed

---

## Learning Objectives

1. Set up NextAuth.js v5 (Auth.js)
2. Configure OAuth providers (Google, GitHub)
3. Implement email/password auth
4. Manage sessions and JWT
5. Create protected routes and middleware
6. Implement role-based access control (RBAC)

---

## Module Structure

### [01 - NextAuth Setup](./content/01-nextauth-setup.md)
- Install NextAuth.js v5
- Configure auth route handler
- Environment variables
- Basic session

### [02 - OAuth Providers](./content/02-providers.md)
- Google OAuth
- GitHub OAuth
- Credentials provider (email/password)
- Custom login pages

### [03 - Session Management](./content/03-sessions.md)
- Session strategies (JWT vs Database)
- Reading sessions in components
- Session callbacks
- Token refresh

### [04 - Protected Routes](./content/04-protected-routes.md)
- Middleware for route protection
- Server-side auth checks
- Client-side auth state
- Redirect handling

### [05 - Role-Based Access Control](./content/05-rbac.md)
- User roles (admin, user, moderator)
- Permission checking
- Protected API routes
- Admin dashboards

---

## What You'll Build

**Authentication System** with:
- Google & GitHub login
- Email/password auth
- User dashboard
- Admin panel
- Protected routes
- Role-based permissions

---

## Navigation

- [← Previous Module](../02-fullstack-development/README.md)
- [→ Section 01](./content/01-nextauth-setup.md)
- [📝 Exercise](./EXERCISE.md)
