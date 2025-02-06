const sharp = require('sharp');
const glob = require('fast-glob');
const path = require('path');
const fs = require('fs').promises;

async function optimizeImages() {
  try {
    // Find all images in the src/images directory
    const images = await glob(['src/images/**/*.{jpg,jpeg,png,webp}']);

    for (const image of images) {
      const outputPath = image.replace(/\.(jpg|jpeg|png)$/, '.webp');
      
      // Skip if the file is already a .webp
      if (image === outputPath) continue;

      console.log(`Optimizing: ${image}`);

      await sharp(image)
        .webp({ quality: 80 })
        .toFile(outputPath);

      // Get file sizes for comparison
      const originalSize = (await fs.stat(image)).size;
      const optimizedSize = (await fs.stat(outputPath)).size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);

      console.log(`Saved ${savings}% on ${path.basename(image)}`);
    }

    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages(); 