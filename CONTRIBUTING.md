# Contributing

Contributions to the Codebase website are welcome. Please follow the guidelines below to keep the codebase clean, consistent, and easy to maintain.

## 1. Create an Issue First

For major changes, new features, or significant UI modifications, create or discuss an issue before starting development.

For small fixes such as:
- Bug fixes
- Minor UI improvements
- Typographical corrections
- Content updates

you may directly create a branch and submit a Pull Request.

## 2. Fork / Clone the Repository

Clone the repository locally:

```bash
git clone <repository-url>
cd Codebase-Website-2025-2026
```

Install the dependencies:

```bash
npm install
```

## 3. Create a Separate Branch

Do not make changes directly on the `main` branch.

Create a branch for your work:

```bash
git checkout -b feature/feature-name
```

Use meaningful branch names based on the type of change.

Recommended naming convention:
- `feature/feature-name`
- `fix/bug-name`
- `refactor/component-name`
- `docs/documentation-change`
- `style/ui-change`

Examples:
- `feature/alumni-section`
- `fix/navbar-mobile`
- `style/hero-section`
- `docs/update-readme`

## 4. Follow the Existing Code Structure

Before adding a new component or page, check whether an existing component can be reused.

Keep files organized according to their purpose:
- `components/` → Reusable UI components
- `pages/` → Complete pages
- `sections/` → Major sections of a page
- `data/` → Static data and content
- `hooks/` → Custom React hooks

Avoid putting large amounts of unrelated logic inside `App.jsx` or individual page components.

## 5. Follow Consistent Coding Practices

When contributing:
- Use meaningful and descriptive variable/function names.
- Keep components focused on a single responsibility.
- Prefer reusable components over duplicated code.
- Remove unused imports and variables.
- Avoid unnecessary dependencies.
- Keep Tailwind classes organized and readable.
- Follow the existing coding style of the project.

Do not introduce a new library for functionality that can reasonably be implemented using the existing stack.

## 6. Test Your Changes

Before creating a Pull Request, make sure the project builds successfully:

```bash
npm run build
```

Also run:

```bash
npm run lint
```

Test the website locally:

```bash
npm run dev
```

Check your changes on different screen sizes, especially:
- Desktop
- Tablet
- Mobile

For UI changes, make sure existing pages and components are not unintentionally affected.

## 7. Commit Guidelines

Write clear and meaningful commit messages.

Recommended format:
`type: short description`

Examples:
- `feat: add alumni section`
- `fix: resolve mobile navbar issue`
- `style: improve hero section spacing`
- `refactor: simplify team component`
- `docs: update contribution guidelines`

Avoid vague commit messages such as:
- `update`
- `changes`
- `final`
- `new`
- `fix stuff`

## 8. Push Your Branch

After making and testing your changes:

```bash
git add .
git commit -m "feat: add alumni section"
git push origin feature/alumni-section
```

## 9. Create a Pull Request

Open a Pull Request against the `main` branch.

Your Pull Request should:
- Have a clear title.
- Explain what was changed.
- Explain why the change was needed.
- Mention any relevant issue.
- Include screenshots/GIFs for significant UI changes.
- Mention any known limitations or remaining work.

Example PR title:
`feat: add alumni section`

## 10. Pull Request Review

All significant changes should be reviewed before being merged into `main`.

During review:
- Be open to suggestions.
- Explain technical decisions when necessary.
- Address requested changes.
- Keep discussions focused on improving the project.

Do not merge your own Pull Request without the required approval from the project maintainers.

## 11. Keep main Stable

The `main` branch represents the stable version of the website.

Avoid pushing unfinished or experimental code directly to `main`.

Use feature branches for development and merge them through Pull Requests.

## 12. Do Not Commit Secrets

Never commit sensitive information such as:
- API keys
- Passwords
- Access tokens
- Private credentials
- `.env` files containing secrets

Use environment variables for sensitive configuration.

If an environment variable is required, document its name and purpose without exposing its value.

## Contribution Checklist

Before submitting a Pull Request, make sure:

- [ ] I created a separate branch for my changes.
- [ ] My changes follow the existing project structure.
- [ ] I tested the website locally.
- [ ] `npm run build` completes successfully.
- [ ] `npm run lint` completes successfully.
- [ ] I checked the changes on mobile and desktop where applicable.
- [ ] I removed unused code and imports.
- [ ] I did not commit secrets or sensitive information.
- [ ] My commit messages are clear and descriptive.
- [ ] My Pull Request clearly explains the changes.
- [ ] I added screenshots for significant UI changes.
