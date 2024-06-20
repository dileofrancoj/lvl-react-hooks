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