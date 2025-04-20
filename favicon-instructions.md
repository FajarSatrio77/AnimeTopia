# Instruksi Konversi Favicon

Favicon SVG Anda telah berhasil diperbarui. Untuk memastikan kompatibilitas maksimal dengan semua browser, disarankan untuk juga menyediakan favicon dalam format PNG.

## Cara Mengkonversi SVG ke PNG:

### Metode 1: Menggunakan Online Converter
1. Kunjungi salah satu situs web converter online seperti:
   - https://convertio.co/svg-png/
   - https://cloudconvert.com/svg-to-png
   - https://svgtopng.com/

2. Unggah file `public/favicon.svg`
3. Atur ukuran output ke 32x32 atau 64x64 piksel
4. Konversi dan unduh hasilnya
5. Simpan file PNG yang diunduh sebagai `public/favicon.png`

### Metode 2: Menggunakan Inkscape (Software Gratis)
1. Unduh dan instal Inkscape dari https://inkscape.org/
2. Buka file `public/favicon.svg` dengan Inkscape
3. Pilih File > Export PNG Image
4. Atur ukuran ekspor ke 32x32 piksel
5. Ekspor sebagai `public/favicon.png`

### Metode 3: Menggunakan Node.js dan Sharp
Jika Anda nyaman dengan Node.js, Anda dapat menggunakan script yang telah dibuat:

1. Instal sharp dengan perintah: `npm install sharp`
2. Jalankan script `node convert-favicon.js`

## Catatan Penting
- Favicon PNG sebaiknya berukuran 32x32 atau 64x64 piksel untuk kompatibilitas optimal
- File favicon.png harus ditempatkan di folder `public/` 
- Pastikan file PNG memiliki latar belakang transparan jika desain logo Anda membutuhkannya 