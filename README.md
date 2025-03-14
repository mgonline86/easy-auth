# Easy Auth

## Clone the repo

```sh
git clone https://github.com/mgonline86/easy-auth.git
```

## Install Turborepo globally
```sh
npm install turbo --global
```

## Install Dependencies

```sh
cd easy-auth
npm install
```

## Creat .env files at apps/api and apps/web
- `apps/api/.env`
```
DATABASE_URL=

FRONTEND_URL=

JWT_SECRET=
JWT_EXPIRES_IN=7d
```

- `apps/web/.env`
```
API_URL=
SESSION_SECRET_KEY=
```

# Generate Prisma client
```sh
cd apps/api
npx prisma generate
```

## Run the app
```sh
cd ..
npm run dev
```

## Technologies
- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [Shadcn UI](https://shadcn.com/)