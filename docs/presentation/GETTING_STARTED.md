# Installation et build du frontend

## Préparer l'environnement

Utiliser Node.js 22.12 ou supérieur et npm. Le package Vite installé déclare `^20.19.0 || >=22.12.0` comme contrainte Node. La procédure ci-dessous utilise la famille 22 ou ultérieure.

```powershell
git clone https://github.com/FATIMA-BOUSMITI/Platform-collaboration-ocp-frontend.git
cd Platform-collaboration-ocp-frontend
npm ci
```

`npm ci` utilise le lockfile du dépôt. Ne pas remplacer automatiquement les dépendances pour résoudre un problème de démarrage.

## Connecter le backend

Configurer `.env.local` :

```dotenv
VITE_API_URL=http://localhost:9000/api
VITE_WS_URL=ws://localhost:9000/ws
```

Lancer les services selon [la procédure backend](https://github.com/FATIMA-BOUSMITI/Platform-collaboration-ocp-backend/blob/master/docs/presentation/RUNNING.md). Le navigateur appelle directement l'API Gateway ; son origine doit être autorisée par CORS.

```powershell
npm run dev
```

Vite utilise habituellement le port 5173. Vérifier l'adresse affichée dans le terminal si ce port est occupé. Ne pas démarrer une deuxième instance sur un port différent sans vérifier CORS.

## Comptes et rôles

Les formulaires publics sont accessibles sans compte. Les espaces protégés nécessitent un utilisateur existant et ses rôles réels. Ne pas injecter de faux token dans le stockage du navigateur pour présenter une démonstration comme authentifiée.

Les routes principales sont `/dashboard`, `/director`, `/manager`, `/employee`, `/users`, `/departments`, `/teams`, `/roles`, `/permissions`, `/projects`, `/kanban`, `/documents`, `/messages` et `/notifications`. L'accès dépend du rôle connecté.

## Produire le build

```powershell
npm run test:session
npm run lint
npm run build
npm run preview
```

Le build est généré dans `dist/`. Fournir l'URL API avant la compilation et configurer le serveur statique pour renvoyer `index.html` sur les routes de l'application.

## Diagnostic

| Symptôme | Vérifications utiles |
| --- | --- |
| API inaccessible | Adresse `VITE_API_URL`, Gateway et services démarrés, CORS |
| Connexion 401 | Compte QA et mot de passe actuels ; ne pas deviner de nouveaux identifiants |
| Profil 504 | Disponibilité du service utilisateur et de sa base, délais Gateway |
| Projets 500 | Réponse et logs privés du service projets ; conserver l'erreur dans les résultats QA |
| Erreur de route au rafraîchissement | Fallback SPA vers `index.html` côté hébergement |

Les logs et tokens de session ne doivent pas être copiés dans les captures publiques. Les exemples de cette documentation ne contiennent aucun identifiant réel.
