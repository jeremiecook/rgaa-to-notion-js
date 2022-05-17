# RGAA to Notion

## Installation

```
git clone git@github.com:jeremiecook/rgaa-to-notion-js.git
git submodule init
git submodule update

yarn install
```

### Configuration

Créer un fichier `.env`

```
NOTION_API_KEY=
NOTION_DATABASE_RULES=
NOTION_DATABASE_TESTS=
RULES_PATH=./rules/src/rgaa/criteres/
```

## Utilisation

```
yarn run start
```