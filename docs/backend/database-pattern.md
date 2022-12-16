# Database Pattern

This template uses [Prisma](https://www.prisma.io/) as its ORM. There are many alternatives but I believe Prisma is the best, no contest.

Out of the box this template only comes with a `settings` database table which are used to store the shop-level settings for a particular store.

The only other customization I have made to the prisma instance is to add logs to all queries. Because of this, when using prisma, you must import it from `/backend/web/prisma/index.js` for use throughout your application.

!> INCORRECT:
```js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
```

?> CORRECT: `import prisma from "../../../prisma/index.js";` (path will be different but you get the picture)

# Gotchas

!> Since this is technically 2 different applications, to run prisma-cli commands you need to `cd` into `web/backend` to use `npx prisma YOUR_COMMAND`