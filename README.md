# Hooks

npx vite-bundle-visualizer

yarn add -D eslint-plugin-simple-import-sort eslint-plugin-react-hooks

npx husky-init && yarn

## Lint staged

El proceso de linting cobra sentido cuando haces un commit en el repo.
Aplicar el proceso de linting sobre los files a commitear (staged)

```
    yarn add -D lint-staged
```

Creamos el archivo .lintstagedrc

```
{
    "*.ts": ["eslint --fix"]
}
```

```
    yarn add -D vitest @testing-library/react @testing-library/dom jsdom
```

## Changeset

Es una herramienta para manejar versionado y changelogs enfocado en paquetes multirepo

### Changelog
Es un registro de los cambios. Es un archivo que lista todos los cambios hechos a un proyecto desde la versión que se agrega.

- Brindar claridad y organización
- Usuarios finales (devs o producto, managers)

Funcionar como documentación complementaria
