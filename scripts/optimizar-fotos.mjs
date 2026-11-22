// Genera las fotos optimizadas de la invitación a partir de los originales.
// Uso: node scripts/optimizar-fotos.mjs
//
// Originales (pesados, de celular): fotos-originales/
// Salida: public/img/pareja.jpg y public/img/galeria/NN.jpg (+ miniaturas NN-mini.jpg)
// Para cambiar el orden, las fotos o los textos de las polaroids, edita src/data/galeria.json
import sharp from 'sharp';
import { readFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'fotos-originales');
const OUT = join(ROOT, 'public/img');
const W = 800;
const H = 1000; // 4:5

// Recorta a 4:5 respetando el punto de interés (fx, fy de 0 a 1)
async function crop(file, out, { fx = 0.5, fy = 0.5, w = W, h = H, quality = 80 } = {}) {
	const img = sharp(join(SRC, file)).rotate();
	const { width, height } = await img.metadata();
	const ratio = w / h;
	let cw = width;
	let ch = Math.round(width / ratio);
	if (ch > height) {
		ch = height;
		cw = Math.round(height * ratio);
	}
	const left = Math.min(Math.max(Math.round(width * fx - cw / 2), 0), width - cw);
	const top = Math.min(Math.max(Math.round(height * fy - ch / 2), 0), height - ch);
	await img
		.extract({ left, top, width: cw, height: ch })
		.resize(w, h)
		.modulate({ saturation: 1.04 })
		.jpeg({ quality, progressive: true, mozjpeg: true })
		.toFile(out);
}

const data = JSON.parse(await readFile(join(ROOT, 'src/data/galeria.json'), 'utf8'));
const dir = join(OUT, 'galeria');
await mkdir(dir, { recursive: true });

// Limpia las fotos generadas anteriormente
for (const f of await readdir(dir)) if (f.endsWith('.jpg')) await unlink(join(dir, f));

// Foto principal (polaroid de la dedicatoria)
await crop(data.principal.archivo, join(OUT, 'pareja.jpg'), { ...data.principal, quality: 82 });

for (const [i, foto] of data.fotos.entries()) {
	const n = String(i + 1).padStart(2, '0');
	await crop(foto.archivo, join(dir, `${n}.jpg`), foto);
	await crop(foto.archivo, join(dir, `${n}-mini.jpg`), { ...foto, w: 96, h: 120, quality: 70 });
}

console.log(`Listo: foto principal + ${data.fotos.length} fotos de galería.`);
