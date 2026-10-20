# Plateforme collaborative OCP — Frontend

Application web de collaboration interne : gestion des utilisateurs, départements, équipes, projets Kanban, documents, messagerie et notifications.

## Stack

- React 19, TypeScript et Vite
- React Router
- Axios pour les appels HTTP
- STOMP/WebSocket pour les mises à jour temps réel

## Prérequis

- Node.js 20 ou une version LTS plus récente
- npm
- L'API Gateway disponible localement (par défaut : `http://localhost:9000`)

## Démarrage local

```bash
npm ci
npm run dev
```

L'application est servie par Vite, habituellement sur `http://localhost:5173`.

## Configuration

Créez un fichier `.env.local` pour modifier les valeurs locales. Ne versionnez jamais de jeton, mot de passe ou clé dans ce fichier.

```env
VITE_API_URL=http://localhost:9000/api
# Facultatif : sinon l'URL WebSocket est déduite de VITE_API_URL.
VITE_WS_URL=ws://localhost:9000/ws
```

## Commandes utiles

```bash
npm run dev          # développement avec rechargement à chaud
npm run build        # vérification TypeScript et build de production
npm run lint         # analyse statique
npm run test:session # tests Node de session
```

## Routes principales

- `/dashboard` : administration
- `/users`, `/departments`, `/teams` : référentiels d'organisation
- `/projects` : projets et Kanban
- `/documents`, `/messages`, `/notifications` : collaboration

L'accès aux routes est contrôlé selon le rôle connecté (administrateur, directeur, manager ou employé).

## Contribution

Avant une pull request, exécutez `npm run lint` et `npm run build`. Gardez les changements ciblés, ajoutez une description claire et ne commitez aucun fichier d'environnement ou secret.
