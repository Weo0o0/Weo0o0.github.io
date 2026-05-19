# AGENTS.md

## Cursor Cloud specific instructions

This is a Jekyll-based personal tech blog using the Minimal Mistakes theme (v4.26.2).

### Services

| Service | Command | Notes |
|---------|---------|-------|
| Jekyll dev server | `bundle exec jekyll serve --host 0.0.0.0 --port 4000` | Main dev server, site at http://localhost:4000/ |

### Key commands

- **Build site**: `bundle exec jekyll build`
- **Serve locally**: `bundle exec jekyll serve --host 0.0.0.0 --port 4000`
- **Minify JS** (only if editing JS files): `npm install && bundle exec rake js`

### Non-obvious caveats

- Ruby gems are installed to `vendor/bundle` (local path) via `bundle config set --local path 'vendor/bundle'`. This avoids permission issues with the system gem directory.
- The Sass deprecation warnings during build are expected and come from the upstream Minimal Mistakes theme's Susy grid vendor code — they do not affect functionality.
- There is no Gemfile.lock committed — `bundle install` resolves dependencies fresh each time.
- The `docs/` and `test/` directories are from the upstream Minimal Mistakes theme and are excluded from the Jekyll build via `_config.yml`.
- Blog content is in `_posts/` (Korean-language posts on security, databases, Python, etc.).
- No linter is configured in this project. The main quality check is `bundle exec jekyll build` succeeding without errors.
- No automated test suite exists. Validation is done via successful site build and manual inspection.
