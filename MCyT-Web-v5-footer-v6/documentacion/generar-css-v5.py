"""Regenerar los estilos v5, sin npm ni ejecución de Python en el hosting."""
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit, unquote
import posixpath, re

project = Path(__file__).resolve().parent.parent
site = project / 'mcyc' if (project / 'mcyc').is_dir() else project
folder = site / 'assets/css'

def rebase(text, source):
    def change(match):
        quote, value = match[1], match[2]
        parts = urlsplit(value)
        if parts.scheme or parts.netloc or value.startswith(('#','data:')): return match[0]
        target = (source.parent / unquote(parts.path)).resolve()
        if not target.is_file(): raise ValueError(f'Recurso faltante en {source}: {value}')
        relative = posixpath.relpath(target.as_posix(), folder.as_posix())
        return 'url(' + quote + urlunsplit(('', '', relative, parts.query, parts.fragment)) + quote + ')'
    return re.sub(r'''url\(\s*(["']?)([^"'\s)]+)\1\s*\)''',change,text)

base = folder / 'style.css'
text = base.read_text()
pattern = re.compile(r'''@import\s+url\(\s*(["'])(.*?)\1\s*\)\s*;''',re.S)
imports = list(pattern.finditer(text))
assert len(imports) == 10
parts = []
for match in imports:
    source = (folder / match[2]).resolve()
    parts.append('/* '+source.relative_to(site).as_posix()+' */\n'+rebase(source.read_text(),source))
parts.append('/* Estilo original general */\n'+rebase(pattern.sub('',text),base))
override = folder / 'ajustes-visual-v5.css'
parts.append('/* Revisión v5: composición y movimiento */\n'+rebase(override.read_text(),override))
(folder / 'ministerio-2026-v5.css').write_text('/* CSS institucional completo v5, sin @import. */\n\n'+'\n\n'.join(parts)+'\n')
(folder / 'marca-2026-v5.css').write_text('/* Identidad y ajustes de portales v5. */\n'+(folder/'marca-2026.css').read_text()+'\n'+override.read_text())
print('CSS v5 generados: estructura original, paleta actual y ajustes limitados.')
