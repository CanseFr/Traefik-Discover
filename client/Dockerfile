# Utilisez une image de base Node.js
FROM node:14

# Créez un répertoire de travail
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application
COPY ../client .

# Construisez l'application
RUN npm run build

# Exposez le port de l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
