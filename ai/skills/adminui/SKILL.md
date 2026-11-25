---
name: antd-layout
description: Build, configure, and troubleshoot applications using @adminui-dev/antd-layout. Use when an agent needs to create or modify the AntdLayout shell, routes and menus, layout configuration, Container pages, localization, or theme skins.
---

# AdminUI antd-layout skill

Use this skill when working with the `@adminui-dev/antd-layout` package.

## Source of truth
1. Treat the application's installed package declarations and the matching published package version as the final authority for callable APIs.
2. Use the supplied docs snapshot in `docs-source/` for intended usage and concepts.
3. Read `references/api-verified.md` and `references/known-issues.md` before generating code involving localization or theme skins.
4. If repository `main` and the installed npm package differ, do not assume unreleased `main` APIs exist in the installed package.

## Package and imports
- Application-facing package: `@adminui-dev/antd-layout`.
- Prefer imports from that package for components, hooks, and types when they are publicly exported.
- Do not direct application users to import `ThemeSkin` from the implementation dependency `@adminui-dev/layout`; the core package re-exports its types.
- `setSkinConfig` is exported through the core package barrel. `defineThemeSkin` was not found in the current public barrel; do not import it unless the installed package declarations confirm it.

## Core composition
- Place `<AntdLayout />` in the application's layout route/component.
- Configure the route tree with React Router and provide the matching `menuData`.
- The documented menu root is a single object corresponding to the root route; children form the nested menu tree.
- `themeSkins` is documented as an array of skin definitions.
- `localeMessages` maps locale keys (for example `zh-CN`, `en-US`) to locale data.

## Hooks
- `useConfigState()` reads layout state such as `layoutConfig`, `locale`, `originalConfig`, `themeSkin`, `themeSkinMap`, `languages`, and `menuDataMap`.
- `useConfigAction()` exposes `setLayoutConfig` and `setLocale`.
- The documentation says container-related hooks require a page under `<Container />`; verify the installed version's declarations and runtime context before using them elsewhere.

## Configuration changes
- Use `setLayoutConfig({ ...layoutConfig, key: value })` in a descendant component where the layout context is available.
- Do not mutate `layoutConfig` directly.
- `disabledStorageConfig` is a prop on `<AntdLayout />`, not a `LayoutConfig` field in the supplied docs.
- Forced `locale` and `theme` props are documented as overriding values from `layoutConfig`; verify exact precedence against the installed version.

## Container
- `<Container />` is documented as an optional page wrapper, normally used once at the page root.
- Documented modes: `inline`, `box`, `panel`.
- Documented stretch values: `inline`, `auto`, `fill`.
- Avoid copying the supplied preview snippet verbatim until its `"inline "` option whitespace is corrected.

## Routing
- The docs use React Router Data Mode (`createBrowserRouter`) and `LazyPage` for lazy route components.
- Add a valid `fallback` to any React `<Suspense>` boundary. The supplied App example omits it and may fail TypeScript checking.

## Localization
- `LocaleMessage.antdLocale` must be an Ant Design `Locale` object according to current core source, not a string.
- Use the actual locale object imported from `antd/locale/...`.
- The menu i18n disable instruction in the supplied docs is contradictory; do not follow its `disabledLocale: false` instruction as written. See `known-issues.md`.

## Theme skins
- `ThemeSkin` can be imported as a type from `@adminui-dev/antd-layout`.
- The supplied custom-skin snippet declares `BackgroundElement` as a JSX element and then uses `<BackgroundElement />`; that is invalid. Either pass the element directly as `backgroundContent: BackgroundElement` (if the installed type supports it), or define a React component function and render that component.
- `setSkinConfig` is a public export in the current source. Do not rely on `defineThemeSkin` until its public export is verified.

## Quality checks
- Keep Chinese and English docs semantically aligned.
- Do not invent missing props or type fields.
- Prefer complete, type-checkable examples over ellipses when the example is meant to be copied.
- Run TypeScript against the user's installed package version after making changes.
