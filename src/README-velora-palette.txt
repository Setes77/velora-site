VELORA ESPORT - PALETTE APPLICATION GUIDE

=== CONTENU DU PACKAGE ===

✅ velora-palette-v1.json - Design tokens (Figma Tokens compatible)
✅ variables.css - Variables CSS prêtes à l'emploi  
✅ tailwind-velora-snippet.txt - Configuration Tailwind
✅ velora-swatches-600x200.png - Nuancier visuel avec hex
✅ velora-cmyk-guide.txt - Équivalences impression
✅ velora-contrast-report.txt - Audit accessibilité
✅ velora-color-changes.csv - Journal des modifications
✅ README-velora-palette.txt - Ce guide

=== IMPORT FIGMA TOKENS ===

1. Installer le plugin "Figma Tokens" 
2. Dans le plugin: Settings > Import > Select File
3. Choisir "velora-palette-v1.json"
4. Appliquer les tokens aux composants via le panel
5. Synchronisation: les tokens remplaceront les couleurs locales

=== ROLLBACK FIGMA ===

Si des pages "backup-colors-[date]" existent dans votre fichier:
1. Dupliquer les frames de backup
2. Remplacer les pages actuelles
3. Supprimer les Color Styles "Velora/*" si nécessaire
4. Ré-appliquer les couleurs d'origine via le panel Figma

=== UTILISATION WEB ===

CSS Variables:
```css
@import 'variables.css';
.mon-element { background: var(--velora-cyan); }
```

Tailwind:
```js
// Ajouter le snippet tailwind-velora-snippet.txt dans tailwind.config.js
// Utiliser: bg-velora-cyan, text-velora-light, etc.
```

=== RÈGLES DE COHÉRENCE ===

🎨 BACKGROUNDS: 
   - App global: --velora-bg (#110F16)
   - Cards/surfaces: --velora-dark (#2B2B4E)

💬 TEXTE:
   - Principal: #FFFFFF  
   - Secondaire: --velora-light (#D5B6C6)
   - JAMAIS d'accents (cyan/peach/mauve) pour du texte

🔘 BOUTONS:
   - Primary: bg cyan + text dark
   - Secondary: bg surface + border cyan
   - Hover: darkening des accents

🎭 ACCENTS:
   - CTA/Focus: cyan (#6CCFE6)
   - Badges/Alerts: peach (#EFB7A8)  
   - Hover/Links: mauve (#AA99AF)

🌈 GRADIENT:
   - Hero sections uniquement
   - Si texte: overlay rgba(17,15,22,0.6)

=== CONTRÔLE QUALITÉ ===

✅ Contraste minimal 4.5:1 pour texte normal
✅ Contraste minimal 3:1 pour texte large (18px+)
✅ Focus ring 2px minimum cyan
✅ Test daltonisme (cyan/mauve distinction)

=== MAINTENANCE ===

- Version actuelle: v1.0
- Date création: 2024
- Prochaine rev: ajout tokens spacing/typography
- Contact: équipe design Velora

=== EXPORT/PARTAGE ===

Ce package est autonome et peut être partagé avec:
- Développeurs (variables.css + tailwind snippet)
- Imprimeurs (velora-cmyk-guide.txt)
- Designers (velora-palette-v1.json)
- QA/Accessibilité (velora-contrast-report.txt)