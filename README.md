# AnimeTopia

Aplikasi streaming anime dengan Astro.js dan MySQL sebagai database.

## Fitur Utama

- Daftar anime ongoing dan completed
- Sistem login dan registrasi pengguna
- Riwayat tontonan
- Pencarian anime

## Teknologi yang Digunakan

- Frontend: Astro.js dengan Tailwind CSS
- Backend: Express.js 
- Database: MySQL

## Cara Memulai

### Prasyarat

- Node.js (versi 16 atau lebih tinggi)
- NPM 
- XAMPP atau MySQL server

### Langkah 1: Setup Database

1. Jalankan XAMPP dan aktifkan MySQL dan Apache
2. Buka phpMyAdmin (biasanya di http://localhost/phpmyadmin)
3. Buat database baru bernama `anime_app`
4. Import file `src/pages/anime_app.sql` ke database tersebut

### Langkah 2: Install Dependencies

```bash
npm install
```

### Langkah 3: Jalankan Server API

```bash
npm run server
```

Server API akan berjalan di http://localhost:8000

### Langkah 4: Jalankan Aplikasi Frontend

Dalam terminal terpisah, jalankan:

```bash
npm run dev
```

Aplikasi frontend akan berjalan di http://localhost:4321

## Struktur Aplikasi

- `server.js` - Backend API server dengan Express.js
- `src/` - Kode aplikasi frontend
  - `components/` - Komponen UI yang dapat digunakan kembali
  - `layouts/` - Layout halaman
  - `pages/` - Halaman aplikasi
  - `utils/` - Utilitas dan fungsi helper
    - `auth.js` - Fungsi-fungsi autentikasi

## API Endpoints

- `GET /` - Endpoint test server
- `GET /api/ongoing` - Mendapatkan daftar anime ongoing
- `GET /api/completed` - Mendapatkan daftar anime completed 
- `POST /api/login` - Login pengguna
- `POST /api/register` - Registrasi pengguna baru

## Catatan Penting

- Pastikan XAMPP/MySQL server berjalan sebelum menjalankan aplikasi
- Server backend dan frontend harus berjalan bersamaan

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
"# AnimeTopia" 
"# AnimeTopia" 
