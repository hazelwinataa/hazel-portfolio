# Panduan Lengkap Membuat Website Portofolio — Hazel Novero Winata

Panduan ini dirancang untuk Windows + Visual Studio Code + Next.js + GitHub + Vercel. Website awal berisi **31 entri proyek dari dokumen persyaratan** dan **9 Featured Projects**, dengan arsip proyek, pencarian, filter multi-tag, sorting, halaman detail, dan desain responsif.

> **Penting:** 31 entri merupakan inventaris awal dari dokumen yang kamu berikan, bukan konfirmasi bahwa semua tautan, gambar, tahun, dan hasilnya sudah diverifikasi secara independen. Cek kembali notebook, laporan, dan repository asli sebelum membagikannya untuk rekrutmen. Tahun dan link yang belum diketahui sengaja dibiarkan kosong.

## Tahap A — Membuat dan menyiapkan akun GitHub

**Langkah 1.** Buka https://github.com melalui Chrome/Edge. Tekan **Sign in** (jika sudah punya akun) atau **Sign up** (jika belum punya). Verifikasi email dan masuk kembali.

**Langkah 2.** Klik foto profil di kanan atas → **Your profile**. Perbaiki foto, nama tampilan profesional, bio singkat, lokasi umum, dan tautan LinkedIn jika sesuai. Catat **username GitHub**. Contoh pola URL: `https://github.com/USERNAME-KAMU`.

**Langkah 3.** Nyalakan **two-factor authentication** untuk keamanan akun. Jangan pernah memberikan password, recovery codes, atau token pribadi kepada siapa pun.

**Langkah 4.** Repo portfolio sebaiknya **Public** supaya recruiter bisa melihat kode websitenya. Namun file rahasia, dataset sensitif, kunci API, dan data pribadi pihak lain tidak boleh diunggah.

## Tahap B — Menyiapkan aplikasi di Windows

**Langkah 5.** Instal:

- Visual Studio Code: https://code.visualstudio.com/download
- Node.js LTS: https://nodejs.org/en/download (gunakan versi yang sesuai dengan Next.js)
- Git for Windows: https://git-scm.com/downloads/win

**Langkah 6.** Buka VS Code → menu **Terminal → New Terminal**. Jalankan perintah berikut:

```powershell
node -v
npm -v
git --version
```

Pastikan semuanya menghasilkan nomor versi. Jika muncul pesan `not recognized`, tutup terminal/VS Code, buka lagi, atau periksa instalasi dan PATH.

**Langkah 7.** Atur identitas commit Git menggunakan nama dan email milikmu:

```powershell
git config --global user.name "Hazel Novero Winata"
git config --global user.email "EMAIL_GITHUB_KAMU"
```

Alamat email yang dipakai untuk commit bisa menggunakan alamat GitHub `noreply` apabila ingin menyembunyikan email pribadi. Ini hanya identitas commit, bukan proses login.

## Tahap C — Membuat project website

**Langkah 8.** Di terminal PowerShell VS Code:

```powershell
cd $HOME\Documents
npx create-next-app@latest hazel-portfolio --yes
cd hazel-portfolio
code .
```

Perintah tersebut membuat fondasi Next.js. Jika Next.js bertanya pengaturan, gunakan TypeScript, ESLint, dan App Router. Template ini menggunakan CSS biasa untuk styling agar sederhana, jadi tidak membutuhkan konfigurasi Tailwind tambahan.

**Langkah 9.** Unduh ZIP starter `hazel-portfolio-starter.zip` yang disediakan bersamaan dengan panduan. Ekstrak ZIP di Downloads. Buka folder hasil ekstraknya. **Salin semua isi di dalam folder tersebut**, lalu **paste ke folder `Documents\hazel-portfolio`** yang dibuat di langkah 8. Bila Windows meminta konfirmasi, pilih **Replace the files in the destination**. Jangan sampai terbentuk `hazel-portfolio\hazel-portfolio-starter\app`.

Alternatif: kalau belum membuat proyek via create-next-app, ekstrak ZIP langsung menjadi folder `hazel-portfolio`, buka folder tersebut di VS Code, lalu lanjut ke langkah 10.

**Langkah 10.** Pastikan struktur utamanya seperti ini:

```text
hazel-portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── projects/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   └── ProjectExplorer.tsx
├── data/
│   └── projects.json
├── lib/
│   ├── projects.ts
│   └── site.ts
├── public/
│   └── images/
├── package.json
└── README.md
```

**Langkah 11.** Instal library dan jalankan website:

```powershell
npm install
npm run dev
```

Buka http://localhost:3000. Jika port 3000 sedang dipakai, Next.js mungkin menawarkan port lain. Periksa alamat yang tampil di terminal.

## Tahap D — Mengganti identitas dan konten portofolio

**Langkah 12. Profil dan kontak.** Buka `lib/site.ts`. Ubah deskripsi profesional sesuai kondisimu. Isi `githubUrl`, `linkedinUrl`, `email`, dan `resumeUrl` dengan alamat yang valid. Contoh **format** (bukan alamat aktual):

```typescript
githubUrl: "https://github.com/USERNAME-KAMU",
linkedinUrl: "https://www.linkedin.com/in/USERNAME-KAMU/",
email: "EMAIL_PROFESIONAL_KAMU",
resumeUrl: "/resume.pdf",
```

Untuk `resumeUrl`, simpan PDF CV publik bernama `resume.pdf` langsung ke dalam folder `public/`. Jangan memublikasikan nomor identitas, alamat lengkap, nomor ponsel pribadi jika tidak ingin publik, atau informasi sensitif lainnya.

**Langkah 13. Skills.** Buka `app/page.tsx` lalu cari variabel `skillGroups`. Hapus skill yang tidak benar-benar kamu kuasai, tambahkan skill terverifikasi, dan urutkan sesuai internship yang ditargetkan. Hindari mencantumkan alat yang baru pernah dilihat sekali sebagai keahlian tinggi.

**Langkah 14. Inventaris proyek.** Buka `data/projects.json`. Seluruh halaman membaca dari file ini. Setiap proyek punya `slug`, `title`, `description`, `roleTags`, `courseTags`, `models`, `methodology`, `results`, `githubUrl`, `demoUrl`, `reportUrl`, `year`, `image`, dan `gallery`.

Untuk setiap proyek, cek file aslinya lalu lengkapi data yang memang ada. Contoh nilai setelah validasi:

```json
{
  "year": 2026,
  "githubUrl": "https://github.com/USERNAME-KAMU/NAMA-REPO",
  "demoUrl": "",
  "reportUrl": "",
  "image": "/images/nama-proyek.png",
  "gallery": ["/images/grafik-hasil.png"]
}
```

Jangan mengganti seluruh objek hanya dengan contoh singkat itu; cukup edit properti yang ada. `2026` di atas adalah **contoh format**, bukan fakta mengenai tahun proyek.

**Langkah 15. Tambahkan gambar dan hasil pendukung.** Simpan PNG/JPG yang layak ditampilkan di `public/images/`, misalnya `public/images/credit-score-confusion-matrix.png`. Pada field `image`, tulis `/images/credit-score-confusion-matrix.png`. Pada `gallery`, masukkan beberapa path lokal. Gunakan tangkapan layar asli dan hilangkan data sensitif. Jangan unggah data pasien atau data pelanggan mentah yang tidak memiliki izin publikasi.

**Langkah 16. Pilih Featured Projects.** Pada setiap objek `data/projects.json`, ubah `"featured": true` untuk proyek terbaik (sekitar 6–9) dan `false` untuk sisanya. Saat ini starter mengaktifkan 9 Featured Projects. Semua proyek, baik featured maupun tidak, tetap tampil di `/projects`.

**Langkah 17. Isi setiap case study.** Untuk 6–9 proyek terkuat, usahakan ada konteks masalah, tujuan, dataset, preprocessing, pemilihan model/metode, evaluasi, hasil yang dapat dibuktikan, keterbatasan, dan pembelajaran. Urutan yang disarankan:

1. Problem / business context.
2. Dataset dan asalnya.
3. Data cleaning serta preprocessing.
4. Feature engineering jika dilakukan.
5. Model atau metode dan alasan pemilihannya.
6. Metrik beserta nilai validasi/test yang benar.
7. Visualisasi atau screenshot output.
8. Keterbatasan dan pekerjaan lanjutan.
9. Repository kode, notebook, laporan, atau demo publik bila tersedia.

**Langkah 18. Periksa archive filter.** Buka http://localhost:3000/projects. Coba:

- Role: `Data Engineer`.
- Course: `Model Deployment`.
- Pastikan hanya proyek yang memiliki **kedua jenis tag** yang tampil.
- Coba dua role sekaligus: pencocokan **OR** di dalam grup role.
- Coba `Search Projects` untuk `MLflow`, `Gower`, `SSIM`, `FastAPI`, dan `BNPL`.
- Periksa angka jumlah proyek berubah sesuai hasil filter.
- Klik beberapa kartu dan pastikan membuka URL `/projects/slug-proyek` yang benar.

**Langkah 19. Periksa halaman di ponsel.** Gunakan DevTools Chrome: tekan `F12` atau `Ctrl+Shift+I`, lalu klik ikon perangkat untuk responsive view. Cek tampilan pada layar sekitar 375 px, 768 px, dan desktop. Pastikan navigasi tidak menutupi konten, tombol dapat ditekan, dan teks tidak terpotong.

**Langkah 20. Validasi sebelum upload.** Hentikan dev server dengan `Ctrl+C`, lalu:

```powershell
npm run build
```

Build wajib selesai tanpa error. Jika gagal, cek pesan error di terminal sebelum melanjutkan deployment. Aplikasi ini belum bergantung pada API key atau database eksternal.

## Tahap E — Mengunggah ke GitHub

**Langkah 21.** Masuk ke https://github.com. Klik tanda **+** di kanan atas → **New repository** (atau klik **New** di halaman Repositories).

Isi:

- **Repository name:** `hazel-portfolio`
- **Description:** `Data Science & Analytics Portfolio — Projects, Case Studies, and Technical Work`
- **Visibility:** `Public`
- **Initialize repository with README:** jangan dicentang jika akan mengikuti instruksi Git di bawah (folder lokal sudah memiliki README).
- **Add .gitignore:** pilih none/kosong karena sudah ada dalam starter.

Klik **Create repository** dan catat alamat `https://github.com/USERNAME-KAMU/hazel-portfolio`.

**Langkah 22.** Kembali ke VS Code, buka terminal **di dalam folder `hazel-portfolio`**. Jalankan:

```powershell
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/USERNAME-KAMU/hazel-portfolio.git
git push -u origin main
```

Ganti `USERNAME-KAMU` dengan username sebenarnya tanpa tanda kurung atau tanda `< >`. Jika muncul halaman sign-in, ikuti autentikasi browser resmi GitHub. **Jangan masukkan password akun GitHub sebagai password HTTPS Git** karena GitHub sudah tidak menerima password akun untuk Git push.

Jika muncul `remote origin already exists`, jalankan:

```powershell
git remote set-url origin https://github.com/USERNAME-KAMU/hazel-portfolio.git
git push -u origin main
```

Jika muncul `nothing to commit`, berarti belum ada perubahan sejak commit terakhir; itu bukan kesalahan.

**Langkah 23.** Refresh halaman repository GitHub. Pastikan `app`, `components`, `data`, `lib`, `public`, `package.json`, dan `README.md` terlihat. Pastikan `.env` dan `node_modules` tidak masuk repository. Jika muncul, hentikan dan lakukan cleanup sebelum publikasi.

## Tahap F — Menjadikan website online melalui Vercel

**Langkah 24.** Buka https://vercel.com. Buat akun atau klik **Log in** menggunakan GitHub. Izinkan akses hanya ke repository yang kamu perlukan bila diberi pilihan.

**Langkah 25.** Dari dashboard pilih **Add New... → Project**, lalu **Import** repository `hazel-portfolio`. Jika repo tidak muncul, buka pengaturan akses GitHub/Vercel lalu izinkan repo tersebut.

**Langkah 26.** Gunakan pengaturan standar:

- Framework Preset: **Next.js**.
- Root Directory: `./` (atau default root).
- Build Command: otomatis Next.js.
- Environment Variables: tidak perlu untuk starter.

Klik **Deploy**.

**Langkah 27.** Setelah deployment sukses, Vercel menampilkan alamat publik berpola `https://nama-project.vercel.app`. Alamat yang sebenarnya diberikan Vercel, jadi **jangan menebaknya**.

**Langkah 28.** Buka URL Vercel menggunakan incognito atau perangkat lain. Pastikan:

- Homepage berhasil dibuka.
- `/projects` menampilkan 31 entri.
- Detail proyek bisa dibuka langsung dari URL.
- Search/filter bekerja.
- Tampilan ponsel layak dipakai.
- Link CV/kontak yang kamu isi tidak rusak.
- Tidak ada data rahasia yang terekspos.

**Langkah 29.** Jika ingin domain pribadi, beli domain resmi lewat registrar yang kamu pilih lalu buka Vercel → **Project Settings → Domains**. Tambahkan domain dan ikuti instruksi DNS yang diberikan Vercel. Ini **opsional**; domain `vercel.app` sudah dapat digunakan.

## Tahap G — Menghubungkan portofolio ke CV dan LinkedIn

**Langkah 30.** Pada CV, tulis salah satu dari:

- `Portfolio: https://URL-VERCEL-KAMU`
- `GitHub: https://github.com/USERNAME-KAMU`
- `LinkedIn: https://www.linkedin.com/in/USERNAME-KAMU/`

Simpan sebagai hyperlink agar recruiter bisa membukanya langsung.

**Langkah 31.** Buka profil LinkedIn → **Add profile section** → jika tersedia **Recommended → Featured**, lalu tambahkan link website portofoliomu melalui opsi menambahkan link/media bila tersedia di akun. Antarmuka dan ketersediaan fitur dapat berubah sesuai akun. Alternatif yang tetap berguna adalah mencantumkan portofolio di bagian kontak/website atau pada proyek di LinkedIn.

**Langkah 32.** Jika kamu menambahkan sebuah project di bagian **Projects** LinkedIn, pastikan judul, deskripsi, teknologi, dan URL bukti sesuai case study portofolio. Jangan mengunggah beberapa versi proyek yang hasilnya saling bertentangan.

## Tahap H — Memperbarui website setelah sudah online

Setelah web online, **tidak perlu membuat akun/repo/Vercel baru setiap kali mengubah konten**.

**Langkah 33.** Buka folder portfolio di VS Code, ubah file yang diperlukan, dan cek lokal:

```powershell
npm run dev
```

**Langkah 34.** Hentikan server lalu validasi kembali:

```powershell
npm run build
```

**Langkah 35.** Unggah revisi ke GitHub:

```powershell
git add .
git commit -m "Update portfolio projects and case studies"
git push
```

Vercel biasanya otomatis memulai deployment baru dari branch produksi GitHub yang sudah terhubung. Periksa dashboard dan tes URL online setelah deployment selesai.

## Masalah umum dan solusinya

| Masalah | Penyebab yang sering terjadi | Solusi |
|---|---|---|
| `node is not recognized` | Node belum terpasang/PATH belum aktif | Instal Node.js LTS dan buka ulang VS Code |
| `npm run dev` gagal | Modul belum terinstal | Jalankan `npm install` di folder yang memiliki `package.json` |
| `Module not found` | File ZIP salah lokasi/ekstrak bersarang | Periksa `app`, `components`, `data`, dan `lib` sejajar dengan `package.json` |
| `git: command not found` | Git belum terinstal | Instal Git for Windows dan restart terminal |
| `Author identity unknown` | Identitas commit Git belum diatur | Jalankan `git config --global user.name ...` dan `user.email ...` |
| `remote origin already exists` | Remote GitHub sudah terdaftar | Gunakan `git remote set-url origin ...` |
| GitHub push ditolak | Repo remote berisi commit lain atau tidak punya akses | Pastikan alamat remote, login, dan lihat pesan Git sebelum mengambil tindakan; jangan gunakan `--force` tanpa memahami akibatnya |
| Vercel build failed | Error kode/dependency | Jalankan `npm run build` lokal dan baca build log Vercel |
| Gambar tidak tampil | Lokasi file/path salah | Pastikan file di `public/images/...` dan JSON memakai `/images/...` |
| Project belum tampil | Data JSON rusak/format salah | Cek tanda koma, tanda kutip, `slug` unik, dan properti wajib |
| Tahun “Not documented” | Tahun memang belum diisi | Masukkan tahun yang telah diverifikasi ke `data/projects.json` |
| Tombol Contact tidak ada | Link di `lib/site.ts` masih kosong | Isi email, GitHub, atau LinkedIn yang benar |

## Checklist sebelum dibagikan ke recruiter

- [ ] Nama, bio, jurusan/kampus, dan peran target akurat.
- [ ] Semua 31 entri diperiksa terhadap bukti atau disesuaikan jika perlu.
- [ ] Sekitar 6–9 Featured Projects dipilih karena kekuatan teknis dan relevansi.
- [ ] Setiap Featured Project punya case study bermakna dan tautan bukti jika tersedia.
- [ ] Tidak ada nilai evaluasi, ranking kompetisi, grade, ataupun business impact yang dikarang.
- [ ] Tidak ada dataset atau dokumen rahasia yang dipublikasikan.
- [ ] Filter peran dan mata kuliah, pencarian, dan pengurutan dapat dipakai.
- [ ] Website dapat digunakan pada ponsel dan desktop.
- [ ] `npm run build` sukses.
- [ ] GitHub repository Public hanya jika kontennya aman untuk publikasi.
- [ ] URL Vercel aktif dan telah diuji di perangkat lain.
- [ ] Portofolio dihubungkan ke CV dan LinkedIn bila fitur tersedia.

## Rujukan dokumentasi resmi

- Next.js Create App: https://nextjs.org/docs/app/api-reference/cli/create-next-app
- Next.js Installation: https://nextjs.org/docs/app/getting-started/installation
- GitHub: https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories
- Git local to GitHub: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github
- Vercel Git integration: https://vercel.com/docs/git/vercel-for-github
- LinkedIn: https://www.linkedin.com/help/linkedin/answer/a540837/adding-sections-to-your-profile
