# ENAFOR - Espace Carriere

## Site de Recrutement de l'Entreprise Nationale de Forage

### Structure du Projet

```
enafor-recrutement/
├── index.html          # Page d'accueil
├── about.html          # Qui Sommes-Nous
├── offres.html         # Appels d'Offres
├── postuler.html       # Formulaire de Candidature
├── admin.html          # Tableau de Bord Admin
├── css/
│   └── style.css       # Styles principaux
├── js/
│   └── main.js         # JavaScript principal
├── images/             # Images (a ajouter)
├── .htaccess           # Configuration securite
├── robots.txt          # Directives robots
├── sitemap.xml         # Plan du site
└── README.md           # Ce fichier
```

### Fonctionnalites

- **Page d'accueil** : Presentation ENAFOR, statistiques, activites, valeurs
- **Qui Sommes-Nous** : Histoire, vision, mission, direction, certifications
- **Appels d'Offres** : Liste filtrable avec recherche et pagination
- **Postuler** : Formulaire complet avec upload de fichiers
- **Admin** : Tableau de bord avec gestion des offres et candidatures

### Technologies

- HTML5 / CSS3 / JavaScript (vanilla)
- LocalStorage pour la persistance des donnees
- Font Awesome pour les icones
- Google Fonts (Montserrat + Open Sans)

### Installation Locale

1. Telecharger le dossier `enafor-recrutement`
2. Ouvrir `index.html` dans un navigateur
3. Pour l'admin : `admin@enafor.dz` / `admin123`

### Hebergement

Uploader tous les fichiers sur votre serveur web (Apache recommande).
Le fichier `.htaccess` configure la securite et les en-tetes HTTP.

### SEO

- Meta tags optimises sur chaque page
- Sitemap.xml pour les moteurs de recherche
- Robots.txt pour guider les crawlers
- Schema.org microdata recommande

### Securite

- Headers de securite (CSP, XSS, etc.)
- Protection contre le directory browsing
- HTTPS force
- Validation des formulaires cote client

---
© 2026 ENAFOR - Entreprise Nationale de Forage
