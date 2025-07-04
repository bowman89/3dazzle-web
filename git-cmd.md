git checkout main
git pull                 # friskeste main
git merge feature/...    # eller brug PR på GitHub
# test lokalt hvis nødvendigt
git push                 # skubber merged main
git branch -d feature/...  # sletter lokal branch
git push origin --delete feature/...  # sletter remote branch\```  

---

## 6. DNS & Deployment (Vercel)

- **DNS**: A-record `@` → `76.76.21.21`; CNAME `www` → `<vercel-dns-alias>`
- **Deployment**: Vercel bygger `npm run build` → `dist/` og deployer til både `main` og dine custom domains.

**Kun én host**: Efter du flytter DNS til Vercel, behøver du ikke FTP/Simple.com længere.

---

## 7. Opsummering: Hurtig-git-kommandoer

```bash
# Hent seneste kode
git checkout main
git pull

# Start feature
git checkout -b feature/ny-feature

# Stage + commit
git add .
git commit -m "Beskriv ændring"

# Push til GitHub
git push -u origin feature/ny-feature  # første gang
git push                             # efterfølgende

# Når klar til production
git checkout main
git pull
git merge feature/ny-feature
git push

# Slet feature-branch
git branch -d feature/ny-feature
git push origin --delete feature/ny-feature