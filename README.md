# 🎄 Liste au Père Noël Magique

Une application React festive pour gérer sa liste de cadeaux, animée et assistée par l'IA Gemini.

## 🚀 Comment installer ce projet sur ton ordinateur

1. **Télécharger les fichiers** : Assure-toi d'avoir tous les fichiers du projet dans un dossier.
2. **Installer Node.js** : Si ce n'est pas fait, télécharge et installe [Node.js](https://nodejs.org/).
3. **Installer les dépendances** :
   Ouvre ton terminal dans le dossier du projet et lance la commande :
   ```bash
   npm install
   ```
4. **Lancer l'application** :
   ```bash
   npm run dev
   ```
5. **Ouvrir le navigateur** : Clique sur le lien qui s'affiche (généralement `http://localhost:5173`).

## 🔑 Clé API Gemini

Pour que la fonctionnalité "Magic Elf" (description automatique) fonctionne, tu dois créer un fichier `.env` à la racine du projet et y ajouter ta clé API Google Gemini :

```env
VITE_API_KEY=ta_cle_api_ici
```

(Note : Dans le code actuel, l'API Key est gérée via `process.env.API_KEY`. Si tu utilises Vite localement, assure-toi d'adapter la configuration pour utiliser `import.meta.env.VITE_API_KEY` ou configure ton environnement correctement).

## 🛠 Technologies utilisées

- **React** : Framework UI
- **Tailwind CSS** : Styles (via CDN dans ce projet pour simplicité, ou installable via npm)
- **Framer Motion** : Animations fluides
- **Canvas Confetti** : Effets de fête
- **Google GenAI SDK** : Génération de texte par IA

Joyeux Noël ! 🎅
