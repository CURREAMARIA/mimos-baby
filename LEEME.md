# Mimos Baby · Cómo dejar la página en línea

Son 4 pasos y se hacen una sola vez. Después, todo lo manejas desde el panel.

- **Tienda (para las clientas):** `https://TU-PROYECTO.vercel.app`
- **Panel (solo tú):** `https://TU-PROYECTO.vercel.app/admin.html`

---

## Paso 1 · Supabase (la base de datos)

1. Entra a supabase.com y crea un **proyecto nuevo** llamado `mimos-baby`. No uses el de la lista de regalos, para que queden separados.
2. Ve a **SQL Editor → New query**, pega **todo** el archivo `supabase.sql` y dale **Run**. Eso crea las tablas, los permisos, la carpeta de fotos y los 102 productos.
3. Ve a **Authentication → Users → Add user → Create new user**:
   - Correo: `curreamaria@gmail.com` (si usas otro correo, cámbialo también en la primera parte de `supabase.sql`).
   - Una contraseña que recuerdes.
   - Marca **Auto Confirm User**.
4. En **Authentication → Sign In / Providers**, **desactiva "Allow new users to sign up"**. Así nadie más puede crearse una cuenta.
5. Ve a **Project Settings → API** y copia dos datos:
   - **Project URL**
   - **anon public key**

## Paso 2 · Configurar

Abre `config.js` y pega esos dos datos donde dice `PEGA_AQUI...`. Si prefieres, mándamelos y te devuelvo el archivo listo. La llave "anon" es pública y no es peligroso compartirla.

## Paso 3 · GitHub

1. En github.com, crea un repositorio nuevo llamado `mimos-baby`.
2. Toca **"uploading an existing file"** y arrastra **todos** los archivos y la carpeta `img`.
3. Dale **Commit changes**.

## Paso 4 · Vercel

1. En vercel.com, ve a **Add New → Project** e importa `mimos-baby`.
2. En Framework escoge **Other**, sin cambiar nada más, y dale **Deploy**.
3. Listo: Vercel te da el enlace. Si quieres otro nombre, lo cambias en **Settings → Domains**.

---

## Usar el panel

- **+ Nuevo:** subes la foto (el pantallazo sirve) y llenas nombre, marca, precio, costo, tallas, categoría y si es para niña, niño o unisex.
- **Ganancia:** al poner precio y costo, el panel te dice cuánto ganas y te sugiere el precio con 40%. Se pone en rojo si queda por debajo de tu regla.
- **Precio distinto por talla:** por ejemplo, si 12M vale más, solo llenas esa casilla.
- **Visible en la tienda:** desmárcalo para esconder algo sin borrarlo, por ejemplo cuando se agota.
- **Categorías:** creas nuevas (como "Pijamas"), les cambias el nombre o el orden.
- **El costo nunca lo ven las clientas.** Solo aparece en tu panel.

Los cambios se ven en la tienda apenas recargan la página.

## Promociones (botón "🎉 Promociones" del panel)

- **Anuncio al abrir la tienda:** escoge una plantilla (Playa, Navidad, Segunda compra, Baby shower…), cambia lo que quieras y mira la vista previa en vivo. Puedes poner estilo de color, emoji, número grande, código para copiar, cuenta regresiva con fecha de vencimiento, foto y a qué sección lleva el botón.
- **Descuento por monto:** por ejemplo, desde $200.000 un 10%. Arriba de la tienda sale una franja rosada y el carrito lo descuenta solo.
- **Códigos de descuento:** crea, por ejemplo, MIMOS2 con un 10% y se lo das a la clienta por WhatsApp. Ella lo escribe en el carrito. Puedes desactivarlo cuando quieras. Las clientas no pueden ver la lista de códigos.
- **Oferta en un producto:** en "Editar", llena "Precio antes". La tienda muestra ese precio tachado y la etiqueta "-X%".
- **Fotos extra:** en "Editar", toca "+ Agregar fotos". Sirve también para productos que ya existen.

Si ya habías creado la base de datos, vuelve a correr `supabase.sql` completo. No borra nada: solo agrega lo nuevo.
