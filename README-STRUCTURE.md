# Repository structure proposal (ohana-lab + ryuddi)

This repo currently hosts the Ohana Lab static site at the root.
To make managing shared works simpler across Ohana Lab and a personal portfolio ("ryuddi"), use a shared content store and sibling site folders.

Proposed top-level layout (in-repo, pre-split):

repo-root/
  content/               # Shared works (assets + metadata)
    projects/
      <project-id>/
        images/          # Optional project images
        videos/          # Optional project videos
        meta.yml         # Title, year, tags, etc.
    projects/index.json  # Hand-authored list for static rendering

  site_ohana/            # Ohana Lab site files (migrated)
  site_ryuddi/           # Personal portfolio (new)
  assets/                # Optional shared CSS/JS if needed later

Why this layout:
- Single source of truth for works in `content/`.
- Two sites (Ohana and ryuddi) are views over the same content.
- Keeps future automation/opening a generator route straightforward.

Suggested migration (staged):
1) Create `content/` and `site_ryuddi/` (done).
2) Move Ohana Lab files into `site_ohana/` preserving paths (done).
3) Update cross-links: ryuddi → `../site_ohana/`, ohana → `../site_ryuddi/` (done).
4) Maintain a manifest at `content/projects/index.json` for static listings (in use).
5) When splitting repos, see MIGRATION_SPLIT.md for submodule setup.

Editing flow for new works:
- Add a folder under `content/projects/<project-id>/` with images/videos.
- Create `meta.yml` for per-work details.
- Append an entry to `content/projects/index.json` for listing pages.

Notes:
- This commit adds `content/` scaffold and a minimal `site_ryuddi/` that renders from `content/projects/index.json`.
- No existing files were moved; migration to `site_ohana/` can be done later with review.
