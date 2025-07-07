# Projektoverblik & Workflow

Denne fil guider dig gennem hele din udviklingsproces, trin for trin, som en helt nybegynder.

---

## 1. Projektstruktur i VS Code

Når du åbner mappen `3dazzle-web` i VS Code, ser du typisk denne struktur:

```
3dazzle-web/         ← projektets rodmappe
├── public/           ← statiske filer (f.eks. favicon, `vite.svg`)
├── src/              ← al din React-kode
│   ├── App.jsx       ← hoved-komponenten: her starter din side
│   ├── main.jsx      ← forbinder App.jsx med HTML-siden
│   ├── assets/       ← grafik, billeder og logoer
│   └── ...           ← andre komponenter og styles
├── dist/             ← færdigbyggede filer (rediger aldrig her)
├── package.json      ← beskriver dine afhængigheder og scripts
├── vite.config.js    ← konfiguration for Vite
└── WORKFLOW.md       ← denne guide
```

> **Tip:** Rediger kun i `src/`, når du laver kode-ændringer.

---

## 2. Ændringer i sider og komponenter

Når du vil tilføje en ny side (fx en "Kontakt"-side) eller opdatere en eksisterende komponent (fx en header), følger du disse trin:

1. **Opdater din "live" kode**

   ```bash
   git checkout main      # skift til den seneste live-version
   git pull               # hent den nyeste kode fra GitHub
   ```

2. **Opret en midlertidig kopi, før du begynder**

   ```bash
   git checkout -b page/kontakt  # lav en kopi kaldet "page/kontakt"
   ```

   * Denne kopi er dit arbejdsområde, hvor du kan eksperimentere, uden at røre den stabile live-kode.
   * Navngiv kopien efter, hvad du arbejder på: `page/nyt-afsnit`, `comp/footer`, osv.

3. **Rediger side eller komponent**

   * Opret eller opdatér filer i `src/`, f.eks.:

     * `src/pages/Kontakt.jsx` for en ny side
     * `src/components/Header.jsx` for et UI-element

4. **Se resultat lokalt**

   ```bash
   npm run dev             # starter Vite på http://localhost:5173
   ```

   * Test din nye side eller komponent i browseren.

5. **Gem dine ændringer**

   ```bash
   git add src/            # marker alle ændringer i src/
   git commit -m "Tilføj Kontakt-side"
   ```

6. **Send din kopi til GitHub**

   ```bash
   git push -u origin page/kontakt
   ```

   * `-u` fortæller Git, at `page/kontakt` på GitHub hører til din lokale kopi.
   * Fremover kan du blot skrive `git push`.

---

## 3. Gør det til "live" kode

Når din nye side eller opdatering er klar, skal den samles med den virkelige, live-kode:

1. **Gå tilbage til main**

   ```bash
   git checkout main
   git pull               # hent de seneste ændringer igen
   ```
2. **Flet din kopi ind i main**

   ```bash
   git merge page/kontakt  # samler dine ændringer ind i main
   ```
3. **Send main til GitHub**

   ```bash
   git push                # live-koden opdateres på GitHub
   ```

> Når GitHub's `main` opdateres, kører Vercel automatisk en ny build og deploy.

---

## 4. Ryd op i kopier

Efter du har samlet dine ændringer, kan du fjerne din midlertidige kopi:

```bash
git branch -d page/kontakt            # sletter den lokale kopi
git push origin --delete page/kontakt # sletter kopien på GitHub
```

---

## 5. Deployment og DNS (Vercel)

* **Hvordan det virker**: Når du pusher til `main`, bygger Vercel med `npm run build` og deployer `dist/` til dit site.
* **DNS-indstillinger**:

  * A-record (`@`) peger på `76.76.21.21`
  * CNAME (`www`) peger på dit Vercel-alias (kopier fra Vercel)

> Herefter sker alt via Git + Vercel. Du behøver ikke længere FTP.

---

## 6. Hurtigt overblik: Kommandoer

```bash
# 1) Opdater live-kode
git checkout main
git pull

# 2) Lav ny kopi til arbejde (fx ny side)
git checkout -b page/kontakt

# 3) Rediger src/ og test lokalt
npm run dev

# 4) Gem og send kopien
git add src/
git commit -m "Tilføj Kontakt-side"
git push -u origin page/kontakt

# 5) Når klar til live:
git checkout main
git pull
git merge page/kontakt
git push

# 6) Oprydning:
git branch -d page/kontakt
git push origin --delete page/kontakt
```

> Gem `WORKFLOW.md` i roden, så du altid har din guide klar. 🚀
