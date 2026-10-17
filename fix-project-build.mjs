// STANDARD LIBRARY
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// PROJECT PATHS
const root = process.cwd();
const detailPath = path.join(root, "app", "projects", "[slug]", "page.tsx");
const helperPath = path.join(root, "lib", "project-card-content.ts");
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const bundledHelperPath = path.join(scriptDir, "project-card-content.ts");

// PRECONDITIONS
if (!fs.existsSync(detailPath)) {
  console.error("ERROR: app/projects/[slug]/page.tsx tidak ditemukan.");
  console.error("Jalankan script ini dari root folder hazel-portfolio, bukan dari folder Downloads.");
  process.exit(1);
}

let source = fs.readFileSync(detailPath, "utf8");
const targetKey = '"/images/waste-material-classification/class-distribution.svg": {';
const oldLookup = "const visual = visualDescriptions[filename];";
const newLookup = "const visual = visualDescriptions[src] ?? visualDescriptions[filename];";

// FIX DUPLICATE VISUAL KEY
const originalWasteKey = /(^[\t ]*)"class-distribution\.svg":\s*\{(\r?\n[\t ]*title:\s*"Six waste categories and class imbalance",)/m;
const hasAlreadyRenamedKey = source.includes(targetKey);
const foundOriginalWasteKey = originalWasteKey.test(source);

if (!foundOriginalWasteKey && !hasAlreadyRenamedKey) {
  console.error("ERROR: blok 'Six waste categories and class imbalance' tidak ditemukan dalam format yang diharapkan.");
  console.error("File belum diubah. Kirim app/projects/[slug]/page.tsx terbaru untuk diperiksa.");
  process.exit(1);
}

const lookupIsOld = source.includes(oldLookup);
const lookupIsNew = source.includes(newLookup);
if (!lookupIsOld && !lookupIsNew) {
  console.error("ERROR: lokasi pencarian caption gambar tidak cocok dengan versi yang diperiksa.");
  console.error("File belum diubah.");
  process.exit(1);
}

let updated = source;
if (foundOriginalWasteKey) {
  updated = updated.replace(originalWasteKey, (_whole, indent, rest) => `${indent}${targetKey}${rest}`);
}
if (lookupIsOld) {
  updated = updated.replace(oldLookup, newLookup);
}

// VALIDATE BEFORE WRITING
const duplicateObjectKey = /^\s*"class-distribution\.svg":\s*\{/gm;
const originalKeyCount = [...updated.matchAll(duplicateObjectKey)].length;
if (originalKeyCount !== 1 || !updated.includes(targetKey) || !updated.includes(newLookup)) {
  console.error("ERROR: hasil validasi tidak sesuai; file tidak diubah.");
  process.exit(1);
}

if (updated !== source) {
  const backupPath = `${detailPath}.before-duplicate-fix.bak`;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(detailPath, backupPath);
  }
  fs.writeFileSync(detailPath, updated, "utf8");
  console.log("OK: duplikasi class-distribution.svg sudah diperbaiki.");
  console.log("OK: visualDescriptions sekarang mendahulukan path gambar lengkap.");
  console.log("Backup: app/projects/[slug]/page.tsx.before-duplicate-fix.bak");
} else {
  console.log("OK: perbaikan duplikasi sudah ada. Tidak ada perubahan pada page.tsx.");
}

// RESTORE MISSING PROJECT CARD HELPER IF NEEDED
if (!fs.existsSync(helperPath)) {
  if (!fs.existsSync(bundledHelperPath)) {
    console.warn("PERINGATAN: lib/project-card-content.ts belum ada dan file pendamping tidak ditemukan.");
    console.warn("Unduh file lib/project-card-content.ts dari paket Project Cards sebelumnya.");
  } else {
    fs.mkdirSync(path.dirname(helperPath), { recursive: true });
    fs.copyFileSync(bundledHelperPath, helperPath);
    console.log("OK: lib/project-card-content.ts yang sebelumnya hilang sudah dipulihkan.");
  }
} else {
  console.log("OK: lib/project-card-content.ts tersedia.");
}

console.log("SELESAI: sekarang jalankan npm.cmd run build.");
