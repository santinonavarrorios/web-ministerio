"""Regenerar los CSS completos. No se ejecuta en el hosting ni requiere npm."""
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit, unquote
import posixpath, re

project = Path(__file__).resolve().parent.parent
site = project / 'mcyc' if (project / 'mcyc').is_dir() else project
folder = site / 'assets/css'
destination = folder / 'ministerio-2026-v3.css'

def rebase(text, source):
    def replacement(match):
        quote, value = match[1], match[2]
        parts = urlsplit(value)
        if parts.scheme or parts.netloc or value.startswith(('#', 'data:')):
            return match[0]
        target = (source.parent / unquote(parts.path)).resolve()
        if not target.is_file():
            raise ValueError(f'Recurso faltante en {source}: {value}')
        relative = posixpath.relpath(target.as_posix(), folder.as_posix())
        return 'url(' + quote + urlunsplit(('', '', relative, parts.query, parts.fragment)) + quote + ')'
    return re.sub(r'''url\(\s*(["']?)([^"'\s)]+)\1\s*\)''', replacement, text)

base = folder / 'style.css'
text = base.read_text()
pattern = re.compile(r'''@import\s+url\(\s*(["'])(.*?)\1\s*\)\s*;''', re.S)
imports = list(pattern.finditer(text))
assert len(imports) == 10
parts = []
for match in imports:
    source = (folder / match[2]).resolve()
    parts.append('/* ' + source.relative_to(site).as_posix() + ' */\n' + rebase(source.read_text(), source))
parts.append('/* Estilo general */\n' + rebase(pattern.sub('', text), base))
for name in ['marca-2026.css', 'ajustes-visual-v3.css']:
    source = folder / name
    parts.append('/* ' + name + ' */\n' + rebase(source.read_text(), source))
destination.write_text('/* CSS institucional completo v3, sin importaciones externas. */\n\n' + '\n\n'.join(parts) + '\n')
portal = folder / 'marca-2026-v3.css'
portal.write_text('/* Identidad institucional y ajustes v3 para portales. */\n' +
                  (folder / 'marca-2026.css').read_text() + '\n' +
                  (folder / 'ajustes-visual-v3.css').read_text())
print('CSS v3 regenerados: diez secciones, estilo general, identidad y ajustes visuales.')
