# Tao Te Ching Reader

A minimalist web application to read Ursula K. Le Guin's rendition of the Tao Te Ching.

## Features

- **Simple Navigation**: Forward/back buttons and arrow key support
- **Progress Persistence**: Your current chapter is saved to localStorage
- **Clean Typography**: Verse and commentary styled distinctly for readability
- **Responsive Design**: Optimized for all screen sizes

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Keyboard Shortcuts

- `←` (Left Arrow): Previous chapter
- `→` (Right Arrow): Next chapter

## Structure

- Chapter number and title displayed at top
- Verse text center-aligned in serif font
- Commentary (footnotes) below in smaller sans-serif font
- Navigation bar at bottom with chapter indicator

## Technology

- React 18 + TypeScript
- Vite
- CSS Modules
- localStorage for persistence
