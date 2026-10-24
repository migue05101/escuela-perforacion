#!/bin/sh
# Empaqueta la app como paquete SCORM 1.2 (para cargarla en Moodle u otra plataforma LMS).
# Uso: sh scorm/package.sh  → dist/escuela-perforacion-scorm12.zip
cd "$(dirname "$0")/.."
sh src/build.sh
mkdir -p dist && rm -f dist/escuela-perforacion-scorm12.zip
cp scorm/imsmanifest.xml imsmanifest.xml
zip -q -9 dist/escuela-perforacion-scorm12.zip imsmanifest.xml index.html Worker.gltf
rm imsmanifest.xml
echo "Listo: dist/escuela-perforacion-scorm12.zip"
