# AGENTS.md

## Commands
- **Build**: `npm run build` (Chrome) / `npm run build:firefox` (Firefox)
- **Dev**: `npm run dev` (Chrome) / `npm run dev:firefox` (Firefox)
- **Type check**: `npm run compile`
- **Package**: `npm run zip` (Chrome) / `npm run zip:firefox` (Firefox)
- **Test**: No testing framework configured

## Code Style
- **Imports**: Relative paths with `../`, group external then internal imports
- **Types**: PascalCase interfaces in `lib/types.ts`, explicit typing required
- **Naming**: camelCase variables/functions, PascalCase components/types
- **Formatting**: 2 spaces, no semicolons, single quotes, trailing commas
- **Error handling**: Try-catch with specific Error throws, no console logging
- **Async**: Async/await pattern, Promise.all for concurrent operations
- **React**: React 19 with JSX transform, functional components with hooks
- **Architecture**: Service classes with static methods, separation of concerns