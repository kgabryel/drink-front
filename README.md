# drink-front

## Wymagania
- Docker (v20.10+ z wbudowanym Compose v2)

## Struktura repo
- `src/` – kod źródłowy aplikacji
- `docker/` – środowisko dockerowe
- `Jenkinsfile` – CI/CD pipeline
- `*.sh` – skrypty pomocnicze (lint, prettier, stylelint, typecheck, uruchamianie)

## Uruchamianie (Docker)
```
cd docker
docker compose up -d
```

## Wejście do kontenera Vue:
```
docker exec -it vue bash
```

## Instalacja
```
docker exec -it vue bash
npm ci
```

## Skrypty pomocnicze
- `lint.sh` – Sprawdza błędy lintingu (eslint)
- `lint-fix.sh` – Automatycznie poprawia błędy lintingu (eslint --fix)
- `prettier.sh` – Formatuje cały projekt przy użyciu prettier
- `serve.sh` – Uruchamia aplikację lokalnie (npm run dev)
- `stylelint.sh` – Sprawdza błędy w stylach SCSS (stylelint)
- `stylelint-fix.sh` – Automatycznie poprawia błędy w SCSS (stylelint --fix)
- `typecheck.sh` – Wykonuje statyczne sprawdzenie typów (vue-tsc --noEmit)