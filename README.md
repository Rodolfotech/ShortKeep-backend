# ShortKeep Backend

Backend para guardar y organizar YouTube Shorts. Construido con **NestJS**, **Prisma** (MySQL) y **JWT**.

## Requisitos

- Node.js 18+
- MySQL
- YouTube Data API v3 key

## Configuración

1. Clona el repo e instala dependencias:

```bash
npm install
```

2. Crea un archivo `.env` en la raíz:

```env
DATABASE_URL="mysql://user:password@localhost:3306/shortkeep_bd"
JWT_SECRET="tu-secret"
JWT_EXPIRES_IN="7d"
YOUTUBE_API_KEY="tu-api-key"
```

3. Ejecuta las migraciones de Prisma:

```bash
npx prisma migrate dev
```

## Levantar el servidor

```bash
# Desarrollo con hot-reload
npm run start:dev

# Producción
npm run build && npm run start:prod
```

El servidor arranca en `http://localhost:3000`.

### CORS

Los CORS ya están habilitados globalmente en `main.ts`. Si tu frontend corre en otro puerto/dominio (ej. Next.js en puerto 3000 o Vercel), no deberías tener bloqueos. Si necesitas restringir orígenes específicos, edita `app.enableCors()` en `src/main.ts`:

```ts
app.enableCors({
  origin: ['http://localhost:3000', 'https://tudominio.vercel.app'],
  credentials: true,
});
```

## Documentación Swagger

Una vez corriendo, la documentación interactiva de todos los endpoints está disponible en:

```
http://localhost:3000/docs
```

## Endpoints principales

### Auth (`/auth`)
- `POST /auth/register` — Registrar usuario
- `POST /auth/login` — Iniciar sesión (devuelve JWT)

### Shorts (`/shorts`) — Requiere JWT
- `POST /shorts` — Guardar un short desde URL
- `GET /shorts` — Listar shorts (filtros: `?categoria=`, `?tag=`, `?q=`, `?visto=`, `?sort=`)
- `GET /shorts/:id` — Detalle
- `PATCH /shorts/:id` — Actualizar
- `DELETE /shorts/:id` — Eliminar
- `PATCH /shorts/:id/visto` — Alternar visto/no visto

### Channels (`/channels`) — Requiere JWT
- `POST /channels` — Agregar canal de YouTube para seguir
- `GET /channels` — Listar canales seguidos
- `GET /channels/latest/shorts` — Explorar últimos videos de tus canales
- `GET /channels/:id` — Detalle
- `DELETE /channels/:id` — Dejar de seguir
- `POST /channels/:id/sync` — Sincronizar shorts del canal

## Tareas automáticas

Cada 12 horas se sincronizan todos los canales para traer shorts nuevos.

## Usuario por defecto (desarrollo)

#Email : rodorock@shortkeep.app 
#Contraseña :shortKeep
#Usuario : rodorock 

