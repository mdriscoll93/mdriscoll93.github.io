# Copilot instructions

## Repository summary
- This repository is currently a **minimal GitHub Pages site**. It has no application source tree yet; the main tracked root files are `README.md`, `LICENSE`, and `.gitignore`.
- There is **no** tracked `package.json`, `Gemfile`, `_config.yml`, test suite, lint config, build script, or repo-defined workflow file at this time.
- GitHub Pages is still active: GitHub runs a **managed** workflow named `pages-build-deployment` that builds the repository root with Jekyll and deploys it.

## Validated project layout
- Root files:
  - `README.md` — placeholder site content (`# mdriscoll93.github.io` / `take 2`)
  - `LICENSE` — MIT license
  - `.gitignore` — GitHub Pages/Jekyll ignores
- `.gitignore` intentionally ignores `_site/`, `.sass-cache/`, `.jekyll-cache/`, `.jekyll-metadata`, `/vendor`, and `Gemfile.lock`. Do not commit those artifacts.
- The repository currently does not track any workflow files under `.github/workflows/`; the `.github/` directory only contains this instructions file.

## Build, test, lint, and run guidance
- **Bootstrap:** none. There is no package manager manifest or lockfile to install from.
- **Build:** no repo-local build command is defined.
- **Test:** no automated tests are defined.
- **Lint:** no linter is configured.
- **Run locally:** no local dev server command is configured.
- **Always verify first that this is still true** before adding tooling or searching widely; if new manifests appear in a future branch, follow them instead.

## Validated commands and outcomes
- Repository inventory:
  - `pwd && ls -la && git ls-tree -r --name-only HEAD`
  - This confirmed the repo is intentionally tiny and has no hidden source/config tree beyond Git metadata.
- Available runtimes in the cloud-agent sandbox:
  - `ruby --version` → `ruby 3.2.3`
  - `node --version` → `v22.23.2`
  - `npm --version` → `10.9.8`
  - `docker --version` → `28.0.4`
- Missing tools in the default sandbox:
  - `bundle --version` fails with `bundle: command not found`
  - `jekyll --version` fails with `jekyll: command not found`
- Reliable local validation for this repo today:
  - `git diff --check`
  - Manual review of edited Markdown/text files

## GitHub Pages / CI facts
- The authoritative validation is the GitHub-managed workflow `pages-build-deployment`.
- Recent successful build logs showed:
  - action: `actions/jekyll-build-pages@v1`
  - container: `ghcr.io/actions/jekyll-build-pages:v1.0.13`
  - source: `.`
  - destination: `_site`
  - configuration: `Configuration file: none`
  - stack: `github-pages v232`, `jekyll v3.10.0`, theme `jekyll-theme-primer`
- The managed workflow currently runs jobs named `build`, `report-build-status`, and `deploy`.
- If CI/build investigation is needed, inspect the `build` job logs first; that is where Jekyll errors surface.

## Important local build pitfalls already observed
- Attempting to run the Pages container **without** `GITHUB_WORKSPACE` set caused Jekyll to treat `/` as the source and fail with:
  - `Permission denied @ rb_sysopen - /dev/core`
- Retrying with the correct relative inputs and `GITHUB_WORKSPACE=/github/workspace` got further, but still failed in this sandbox because `jekyll-github-metadata` tried to call the GitHub API and hit:
  - `GET https://api.github.com/orgs/mdriscoll93: 403 - Blocked by DNS monitoring proxy`
- Because of that, **do not spend time trying to force a local Jekyll build in the cloud-agent sandbox** unless the task specifically adds local Jekyll tooling or you know GitHub API access is available. Prefer pushing the minimal change and using the GitHub Pages workflow result.

## How to work efficiently here
- Expect most valid changes to be small edits to root-level content or future GitHub Pages/Jekyll files.
- Do not assume a Node, Ruby, or test-based application exists; check the root tree first.
- Do not commit `_site`, caches, `vendor`, or `Gemfile.lock`.
- Trust these instructions first and only search further if they are incomplete or contradicted by the current branch contents.
