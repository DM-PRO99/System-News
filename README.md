# Sistema de Novedades

Aplicación web moderna para registrar, visualizar y gestionar novedades o peticiones. Construida con **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **MongoDB Atlas**, **TailwindCSS v4**, **shadcn/ui**, **NextAuth** y animaciones con **Framer Motion**.

## ✨ Características principales
- **Landing pública** con formulario validado en tiempo real para registrar novedades.
- **Panel administrativo protegido** (rol `admin`) con filtro por estado, buscador y paginación.
- **CRUD completo** de novedades: creación, edición de datos y estado, eliminación con confirmación.
- **Estadísticas dinámicas** por estado y tarjetas de resumen.
- **UI moderna y responsive** con modo oscuro, animaciones suaves y toasts de feedback.
- **Protección de rutas** vía middleware + NextAuth (Credenciales).
- **Persistencia** en MongoDB Atlas con timestamps automáticos (`createdAt`, `updatedAt`).
- **Refrescado automático** del dashboard (SWR con polling) listo para integrar WebSockets o Pusher.

## 🧱 Arquitectura
```
src/
 ├─ app/
 │   ├─ (páginas públicas y protegidas)
 │   ├─ api/
 │   │   └─ novedades/ (REST CRUD)
 │   └─ admin/
 ├─ components/
 │   ├─ admin/ (tablero, modal, stats)
 │   ├─ ui/ (shadcn/ui)
 │   └─ ... (Navbar, formularios, providers)
 ├─ context/
 ├─ lib/ (conexión MongoDB, auth options)
 ├─ models/ (Mongoose schemas)
 ├─ types/ (tipos compartidos NextAuth & dominio)
 └─ utils/ (validaciones con Zod)
```

## 🛠️ Requisitos previos
- Node.js 18.18 o superior (recomendado LTS más reciente).
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y base de datos creada.
- Variables de entorno configuradas (ver siguiente sección).

## ⚙️ Variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto con:

```
# MongoDB
MONGODB_URI=your-mongodb-atlas-connection-string
MONGODB_DB=sistema_novedades # opcional, por defecto usa este nombre

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_un_secreto_seguro
ADMIN_EMAIL=admin@empresa.com
ADMIN_PASSWORD_HASH=$2a$10$hashGeneradoPorBcrypt
```

> 🔐 **Contraseña de admin**: genera un hash seguro con bcrypt.
>
> ```bash
> node -e "console.log(require('bcryptjs').hashSync('TuPasswordSuperSegura', 10))"
> ```
>
> Copia el resultado en `ADMIN_PASSWORD_HASH`.

En producción (Vercel) define las mismas variables en la sección de Environment Variables.

## 🚀 Puesta en marcha local
```bash
# 1. Instala dependencias
yarn install # o npm install

# 2. Arranca el servidor en modo desarrollo
npm run dev

# 3. Abre la app
disponible en http://localhost:3000
```

## 🧭 Flujo funcional
1. **Usuarios públicos** registran novedades desde `/`.
2. Los datos se guardan con estado inicial `Pendiente` y generan un toast de confirmación.
3. **Administradores** inician sesión en `/login` (NextAuth Credenciales).
4. Panel `/admin` protegido por middleware muestra estadísticas, tabla y cards responsive.
5. Se pueden editar datos/estado vía modal, cambiar estado inline o eliminar con confirmación.
6. Todas las acciones generan feedback visual mediante toasts y animaciones.

## 🧪 Extensibilidad y mejoras sugeridas
- Integrar **WebSockets / Pusher** para notificaciones en tiempo real.
- Añadir **exportaciones** (CSV / XLSX) desde el panel.
- Configurar **pruebas** con Playwright o Vitest + Testing Library.
- Conectar con servicios de notificación (correo, SMS) tras cambios de estado.

## ☁️ Despliegue en Vercel
1. Haz fork o sube el repositorio a tu cuenta de GitHub.
2. Crea un nuevo proyecto en [Vercel](https://vercel.com/new) y selecciona el repo.
3. Define las variables de entorno (`MONGODB_URI`, `MONGODB_DB`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`).
4. Deploy ➜ Vercel ejecutará automáticamente `npm run build` y `npm start`.

## 🤝 Scripts disponibles
- `npm run dev` – servidor de desarrollo con HMR.
- `npm run build` – build optimizada para producción.
- `npm run start` – arranca la app en modo producción.
- `npm run lint` – ejecuta ESLint.

## 📄 Licencia
Proyecto entregado como plantilla base. Ajusta o agrega la licencia que necesites antes de publicar.
