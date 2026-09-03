import { html, raw } from '../lib/html.mjs';
import { header } from './partials/header.mjs';
import { footer } from './partials/footer.mjs';

export const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Public+Sans:ital,wght@0,300..800;1,300..800&display=swap';

export function layout({ page, title, body }) {
  const fullTitle = page.id === 'index' ? 'Mục lục bản demo tecotec.us' : `${title} · tecotec.us (bản nháp)`;
  const description = page.dek || page.purpose || `${title}. Bản demo nội bộ của website trưng bày tranh Việt Nam của Tecotec New York LLC, chưa phát hành.`;
  const doc = html`<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">
<meta name="description" content="${description}">
<title>${fullTitle}</title>
<link rel="icon" href="assets/img/mark-TECOTEC-Group.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${raw(FONTS_URL.replace(/&/g, '&amp;'))}">
<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body data-page="${page.id}">
${header(page)}
<main class="page" id="main">
${body}
</main>
${footer()}
<script src="assets/js/main.js"></script>
</body>
</html>
`;
  return String(doc);
}
