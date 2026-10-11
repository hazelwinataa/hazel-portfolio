# Hazel Novero Winata — Portfolio Starter

A functional, editable Next.js portfolio starter based on the 31-project inventory supplied by the owner. It provides 9 featured projects, an archive, role/course filters, search, sorting, and individual case-study routes.

## Quick start (Windows / VS Code)

1. Install Node.js LTS (Next.js compatible), Git, and Visual Studio Code.
2. Extract this ZIP to a directory named `hazel-portfolio`. If you already created a default Next.js project using `npx create-next-app@latest hazel-portfolio --yes`, replace its files with the contents of this starter ZIP (not a nested folder).
3. Open the project folder in VS Code.
4. Open Terminal and run:

   ```powershell
   npm install
   npm run dev
   ```

5. Open http://localhost:3000.
6. Check project filters: http://localhost:3000/projects.
7. Before sharing, replace the placeholder public contact details in `lib/site.ts` and edit verified data in `data/projects.json`.
8. Validate the production build with `npm run build`.

## Files you will edit most

| File | Purpose |
|---|---|
| `lib/site.ts` | Name, introduction, university, email, GitHub, LinkedIn, CV URL |
| `data/projects.json` | All 31 project records: add verified year, metrics, methodology, report/demo links |
| `app/page.tsx` | Homepage content, skills groupings, and featured-work rendering |
| `app/globals.css` | Responsive visual design |
| `app/projects/page.tsx` | Archive page |
| `components/ProjectExplorer.tsx` | Search, two independent filter groups, AND/OR behavior, sorting |
| `app/projects/[slug]/page.tsx` | Automatically generated detail pages |
| `public/` | Add `resume.pdf` and project images after removing private information |

## Filtering logic

- Within selected role tags: **OR**.
- Within selected course tags: **OR**.
- Between role selection, course selection, and search: **AND**.
- Search indexes project title, tools, models, methods, dataset, course, role, domain, and description.
- Mobile filter chips are horizontally scrollable.
- Project count recalculates automatically.

## Data integrity

The seed data contains 31 entries; 9 are marked featured. Unverified publication years, individual project repositories, live demos, and reports remain intentionally blank. Verify all claims and details against the relevant notebooks, reports, and public project outputs. Some entries represent collections of coursework or experiments rather than individual standalone projects. Replace any entry that does not match your actual project evidence.

`year` is `null` unless you provide a verified year, so newest/oldest sorting becomes meaningful only after populating those fields.

## Push to GitHub

Create an **empty** repository named `hazel-portfolio` under your account (do not create a README or `.gitignore` during remote-repository creation). Then in the project folder run:

```powershell
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/hazel-portfolio.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If a Git repository already exists, `git init` is harmless. If `origin` already exists, replace `git remote add origin ...` with `git remote set-url origin ...`. GitHub authentication can open a browser sign-in via Git Credential Manager; GitHub account passwords are not valid for Git HTTPS pushes.

## Deploy using Vercel

1. Visit https://vercel.com and sign in with GitHub.
2. Add New → Project → Import the `hazel-portfolio` repository.
3. Framework: Next.js; root directory: `./`; keep automatic build settings.
4. Deploy and verify your `*.vercel.app` URL.
5. Subsequent `git push` operations redeploy the connected project automatically.

## Privacy and security

Do not commit private student/patient records, credentials, API keys, raw protected datasets, `.env` files, or copyrighted certificates. Store public demo screenshots with identifying details removed. Use real project metrics only after checking the original evaluations.
