# API facts verified against repository source

Checked against the current `main` branch of https://github.com/zhouwenqi/adminui-antd-layout during this audit.

## Public entry point

* `src/index.ts` re-exports values and types from `./components/index` and types from `./components/typings`.
* `src/components/typings.ts` re-exports types from `./AntdLayout/typings` and `@adminui-dev/layout`.
* `src/components/AntdLayout/index.tsx` imports `LayoutConfig`, `ThemeSkin`, `SkinType`, and related types from `@adminui-dev/layout`.
* Therefore `ThemeSkin` is available through the core package's type barrel.

## Confirmed public values

The current `src/components/index.ts` explicitly exports:

* `AntdLayout`, `Container`, `PageLoading`, `RouteLoading`, `LazyPage`
* `LazyAvatar`, `LazyImage`, `ToolbarIcon`
* `useConfigAction`, `useConfigState`, `useTheme`
* `FullScreenButton`, `hexToRgb`, `hexToRgbaString`, `useLazyImages`, `SpinImage`, `defaultConfig`
* Hooks `useAvatarPopover`, `useBrandPopover`, `useMainCollapsed`, `useContainerOutlet`
* Utility exports from `ColorUtil`, `MenuUtil`, `RouteUtil`, and `StringUtil` as shown in the barrel.

## Important export mismatch

* `setSkinConfig` is implemented and exported from `src/components/AntdLayout/common/StringUtil.ts`; `src/components/index.ts` uses `export \\\* from "./AntdLayout/common/StringUtil"`, so it is available through the core package public barrel.
* `defineThemeSkin` does not appear in the current public export barrel. Its documented availability/import path remains unverified and should not be taught as a core API until declarations confirm it.

## Locale type

`src/components/AntdLayout/typings.ts` defines:
`interface LocaleMessage extends LocaleMessageData { antdLocale: Locale }`
where `Locale` is imported from `antd/es/locale`.
The docs should not describe `antdLocale` as `string`.

## Package compatibility metadata

Current repository `main/package.json` reports:

* package version `1.8.8`
* peer dependencies: `@ant-design/colors >=7.2.1`, `antd >=6.1.1`, `nprogress >=0.2.0`, `react >=19.2.0`, `react-dom >=19.2.0`, `react-intl >=8.0.4`, `react-router >=7.11.0`, `react-router-dom >=7.11.0`.
* No `engines.node` field is present in that package.json.
This is repository `main` metadata, not proof that version 1.8.8 is published to npm.

