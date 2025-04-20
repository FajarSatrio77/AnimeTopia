// Script untuk mengkonversi SVG ke PNG
// Anda perlu menginstal sharp terlebih dahulu:
// npm install sharp

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SVG_PATH = path.join(__dirname, 'public', 'favicon.svg');
const PNG_PATH = path.join(__dirname, 'public', 'favicon.png');

// Mengkonversi SVG ke PNG dengan ukuran 32x32
async function convertSvgToPng() {
  try {
    // Baca file SVG
    const svgBuffer = fs.readFileSync(SVG_PATH);
    
    // Konversi ke PNG dengan ukuran yang berbeda
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(PNG_PATH);
      
    console.log('Konversi berhasil: favicon.svg -> favicon.png');
  } catch (error) {
    console.error('Error saat mengkonversi SVG ke PNG:', error);
  }
}

convertSvgToPng(); 