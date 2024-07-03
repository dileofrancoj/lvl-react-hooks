# Como generar un PR

1. Crear una rama a partir de una protected branch (master / main)
```
    git add .
    git commit -m "feat: my awesome feature"
    yarn changeset // va a generar el changeset file
    git commit -m "chore: add changeset"
    git push bla
```