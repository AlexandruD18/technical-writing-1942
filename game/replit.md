# 1942 - Arcade Shooter Game

## Overview

This is a modern web-based recreation of the classic 1942 vertical scrolling shooter game. The project features a React-based frontend with Three.js for 3D rendering, built on an Express backend with PostgreSQL database support. The game maintains the retro arcade feel while leveraging modern web technologies for smooth gameplay across desktop and mobile devices.

The application follows a full-stack architecture with clear separation between client and server, using TypeScript throughout for type safety and better developer experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Core Technologies:**
- React 18 with TypeScript for component-based UI
- Three.js (@react-three/fiber) for 3D game rendering
- Vite as the build tool and development server
- TailwindCSS with Radix UI components for styling

**Game Engine Design:**
The game uses a custom Entity-Component-System (ECS) pattern implemented through Zustand stores. The main game loop runs on requestAnimationFrame via React Three Fiber's `useFrame` hook, providing consistent 60 FPS gameplay.

**State Management:**
- Zustand stores manage game state (`use1942Game`) and audio state (`useAudio`)
- Game entities (player, enemies, bullets, power-ups) are stored as arrays of objects with position, velocity, and type data
- Game phases (menu, playing, paused, gameOver) control UI rendering and game logic flow

**3D Rendering:**
The game uses orthographic camera projection to maintain the classic 2D scrolling shooter feel while leveraging Three.js for efficient rendering. All game objects are simple geometric meshes (boxes) with emissive materials for the retro aesthetic.

**Controls:**
Keyboard controls (Arrow keys/WASD for movement, Space for shooting, Enter for pause) are handled via @react-three/drei's KeyboardControls. The architecture supports future touch controls for mobile devices.

### Backend Architecture

**Server Framework:**
Express.js server running on Node.js with TypeScript, configured for ESM modules. The server handles both API routes and static file serving.

**Development vs Production:**
- Development: Vite dev server runs in middleware mode for hot module replacement
- Production: Pre-built static assets served from `dist/public`

**API Structure:**
The backend follows a modular route registration pattern (`registerRoutes`), though currently minimal as game logic runs client-side. The structure supports future features like:
- High score persistence
- User authentication
- Multiplayer capabilities

**Session Management:**
Infrastructure exists for session handling (connect-pg-simple mentioned in package.json), indicating planned user session support.

### Data Storage

**Database:**
- PostgreSQL via Neon Database (@neondatabase/serverless)
- Drizzle ORM for type-safe database queries and schema management
- Schema defined in `shared/schema.ts` for cross-environment consistency

**Current Schema:**
A basic users table exists with id, username, and password fields. This suggests authentication features are planned or in development.

**Migration Strategy:**
Drizzle Kit handles schema migrations with push-based deployment (`npm run db:push`), storing migration files in the `./migrations` directory.

**Storage Abstraction:**
The `IStorage` interface in `server/storage.ts` provides an abstraction layer with both in-memory (`MemStorage`) and database implementations. This pattern enables:
- Easy testing with in-memory storage
- Seamless database integration
- Future storage backend switching

### External Dependencies

**Third-Party Services:**
- **Neon Database**: Serverless PostgreSQL hosting (connection via DATABASE_URL environment variable)

**Game Libraries:**
- **Three.js ecosystem**: @react-three/fiber, @react-three/drei, @react-three/postprocessing for 3D rendering and effects
- **GLSL shader support**: vite-plugin-glsl for custom shader loading (future graphics enhancements)

**UI Component Library:**
- **Radix UI**: Comprehensive set of unstyled, accessible components (30+ components including dialogs, dropdowns, navigation)
- **Lucide React**: Icon library for UI elements

**State & Data:**
- **Zustand**: Lightweight state management
- **TanStack Query**: Server state management (configured but minimal usage currently)
- **Zod**: Runtime type validation paired with Drizzle schemas

**Audio:**
Sound effects and background music loaded as static assets, managed through a custom audio store with mute/unmute capabilities.

**Development Tools:**
- **tsx**: TypeScript execution for development server
- **esbuild**: Production bundling for server code
- **Replit error overlay**: Development-time error visualization

**Asset Handling:**
Vite configured to handle game assets (GLTF/GLB models, audio files in MP3/OGG/WAV formats) for future content expansion.