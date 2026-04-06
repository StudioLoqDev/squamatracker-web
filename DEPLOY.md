# Déploiement SquamaTracker Web

## Prérequis
- [ ] Compte Neon (neon.tech) — base de données PostgreSQL gratuite
- [ ] Compte Vercel (vercel.com)
- [ ] Compte Resend (resend.com) — emails
- [ ] Compte PostHog (posthog.com) — analytics

---

## Étape 1 : Base de données Neon

1. Créer un projet sur neon.tech
2. Copier les deux URLs de connexion :
   - **DATABASE_URL** : `postgresql://...?sslmode=require` (pooler)
   - **DIRECT_URL** : `postgresql://...?sslmode=require` (direct)
3. Remplir `.env.local` avec ces valeurs

## Étape 2 : Mot de passe admin

```bash
node -e "const b = require('bcryptjs'); b.hash('TON_MOT_DE_PASSE', 12).then(console.log)"
```
Copier le hash dans `ADMIN_PASSWORD_HASH` du `.env.local`

## Étape 3 : Migration et seed en local

```bash
cd "site web squamatracker/squamatracker-web"
~/Library/pnpm/pnpm prisma migrate dev --name init
~/Library/pnpm/pnpm prisma db seed
```

## Étape 4 : Clé Resend

1. Créer compte sur resend.com
2. Générer une API Key
3. Remplir `RESEND_API_KEY` dans `.env.local`
4. Changer le `from:` dans `src/lib/email.ts` vers ton domaine vérifié

## Étape 5 : PostHog

1. Créer compte sur posthog.com (EU)
2. Copier la Project API Key
3. Remplir `NEXT_PUBLIC_POSTHOG_KEY` dans `.env.local`

## Étape 6 : Git + GitHub

```bash
cd "site web squamatracker/squamatracker-web"
git init
git add .
git commit -m "feat: SquamaTracker website initial"
# Créer repo sur github.com, puis :
git remote add origin https://github.com/TON_USER/squamatracker-web.git
git push -u origin main
```

## Étape 7 : Déploiement Vercel

1. Aller sur vercel.com → New Project → Import depuis GitHub
2. Sélectionner `squamatracker-web`
3. Dans **Environment Variables**, ajouter toutes les variables :

```
DATABASE_URL=<neon_pooler_url>
DIRECT_URL=<neon_direct_url>
NEXTAUTH_SECRET=0cb34bebd6435a11380661907df25b9d4865cb8fcfaef105dcd27f5310979def
NEXTAUTH_URL=https://squamatracker-web.vercel.app (ou ton domaine)
ADMIN_EMAIL=ton@email.com
ADMIN_PASSWORD_HASH=<bcrypt_hash>
RESEND_API_KEY=re_xxxxxx
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com
```

4. Cliquer **Deploy**

## Étape 8 : Migration en production

Après le premier déploiement :
```bash
DATABASE_URL=<prod_url> ~/Library/pnpm/pnpm prisma migrate deploy
DATABASE_URL=<prod_url> ~/Library/pnpm/pnpm prisma db seed
```

## Étape 9 : Domaine custom (optionnel)

Dans Vercel → Settings → Domains → Add Domain
Configurer les DNS chez ton registrar.

---

## Checklist finale

- [ ] Site accessible sur URL Vercel
- [ ] Login `/admin/login` fonctionne
- [ ] Formulaire idées → email reçu
- [ ] Formulaire contact → email reçu
- [ ] Base de données peuplée (seed)
- [ ] Analytics PostHog actif
- [ ] Domaine custom configuré
