#!/bin/sh
# Une las partes de src/ en un solo index.html en la raíz del repositorio.
cd "$(dirname "$0")"
{
  printf '<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
  printf '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'
  cat head.html
  echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>'
  echo '<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>'
  echo '<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/utils/SkeletonUtils.js"></script>'
  echo '<script>'; echo '"use strict";'
  for f in config.js data.js engine.js models.js details.js cut.js cabin.js well.js hands.js modules.js roles.js explore.js perf.js store.js scorm.js cert_rigpass.js cert_dit.js cert.js app.js; do [ -f "$f" ] && cat "$f"; done | grep -v '^"use strict";$'
  echo '</script>'
  printf '</body>\n</html>\n'
} > ../index.html
