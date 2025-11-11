# Repository structure proposal (ohana-lab + ryuddi)

This repo currently hosts the Ohana Lab static site at the root.
To make managing shared works simpler across Ohana Lab and a personal portfolio ("ryuddi"), use a shared content store and sibling site folders.

Proposed top-level layout:

repo-root/
  content/               # Shared works (assets + metadata)
    projects/
      <project-id>/
        images/          # Optional project images
        videos/          # Optional project videos
        meta.yml         # Title, year, tags, etc.
    projects/index.json  # Hand-authored list for static rendering

  site_ohana/            # (future) Ohana Lab site files after migration
  site_ryuddi/           # Personal portfolio (new)
  assets/                # Optional shared CSS/JS if needed later

Why this layout:
- Single source of truth for works in `content/`.
- Two sites (Ohana and ryuddi) are views over the same content.
- Keeps future automation/opening a generator route straightforward.

Suggested migration (non-destructive, staged):
1) Create `content/` and `site_ryuddi/` alongside the current root site.
2) When ready, move current root Ohana Lab files into `site_ohana/` preserving paths.
3) Update internal links in both sites to reference `/content/...` paths for shared assets.
4) Maintain an easy-to-edit manifest at `content/projects/index.json` used by static HTML/JS.

Editing flow for new works:
- Add a folder under `content/projects/<project-id>/` with images/videos.
- Create `meta.yml` for per-work details.
- Append an entry to `content/projects/index.json` for listing pages.

Notes:
- This commit adds `content/` scaffold and a minimal `site_ryuddi/` that renders from `content/projects/index.json`.
- No existing files were moved; migration to `site_ohana/` can be done later with review.

