import fs from 'node:fs';
import path from 'node:path';

const designDir = path.resolve('design');
const files = fs.readdirSync(designDir).filter(f => f.endsWith('.html'));

let updated = 0;
for (const file of files) {
  const filePath = path.join(designDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('fonts.googleapis.com')) {
    content = content.replace(
      /https:\/\/fonts\.googleapis\.com\/css2\?[^"]+/g,
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Inter:ital,wght@0,300..800;1,300..800&display=swap'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    updated++;
  }
}
console.log(`Đã cập nhật font link Inter cho ${updated} file HTML trong design/.`);
