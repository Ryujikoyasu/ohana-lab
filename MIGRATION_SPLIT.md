# Split to two repos + shared content

Goal: Separate Ohana Lab (`ohana-lab`) and Ryuddi (`ryuddi`) into distinct repos, with a shared `content` repo consumed as a submodule by both.

Current state (after prep):
- Ohana site lives in `site_ohana/`
- Ryuddi site lives in `site_ryuddi/`
- Shared data scaffold in `content/`

## 1) Create shared content repo

1. Create a new repo, e.g. `ohana-content`.
2. Move this repo's `content/` into that repo, preserving structure.
3. In both site repos, add it as a submodule at path `content/`.

```bash
git submodule add https://github.com/<you>/ohana-content.git content
git commit -m "Add content submodule"
```

## 2) Extract Ohana and Ryuddi into own repos

Option A: New repos and copy files
- New repo `ohana-lab`: copy `site_ohana/*` into the root of that repo.
- New repo `ryuddi`: copy `site_ryuddi/*` into the root of that repo.
- In each, add the `content` submodule (step 1-3).

Option B: History-preserving (advanced)
- Use `git filter-repo` or `git subtree split` to rewrite history for `site_ohana` and `site_ryuddi` directories.

## 3) Path conventions

- Always reference shared works via `/content/...` (root-relative) or `./content/...` (repo-relative) depending on hosting.
- Cross-links between the two sites should be absolute URLs post-split, e.g.:
  - From Ohana to portfolio: `https://<you>.github.io/ryuddi/`
  - From portfolio back to Ohana: `https://<you>.github.io/ohana-lab/`

## 4) Deploy

- GitHub Pages (per repo) or any static host.
- Verify fetches (if any) are same-origin or use CORS if cross-origin.

## 5) Checklist

- [ ] `content/` split to its own repo
- [ ] submodule added to both sites
- [ ] absolute cross-links set
- [ ] local dev uses simple HTTP server from repo root

