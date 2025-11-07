# Companion Module: Linux Show Player (LSP)

Control [Linux Show Player](https://github.com/FrancescoCeruti/linux-show-player) from a Bitfocus Companion button surface via OSC.

## Features

* Trigger a specific cue by number
* Play/Pause current cue
* Stop current cue
* Next / Previous cue navigation
* Designed for quick expansion (add more OSC paths easily)

## Installation

1. Install this module (when published) from the Companion Module Store OR add the repository to a local dev environment.
2. Add a new instance of "Linux Show Player" in Companion.
3. Configure Host (IP of the machine running LSP) and Port (default 8000).
4. Create buttons using the provided actions.

## Configuration Fields

| Field | Description |
|-------|-------------|
| Host  | IP or hostname where Linux Show Player runs |
| Port  | OSC UDP port (default 8000) |

Ensure that each cue in LSP has OSC enabled (Acquire checkbox) and that LSP is set to listen on the same port.

## Provided Actions

| Action | Description |
|--------|-------------|
| Trigger Cue | Start a cue by number (sends `/cue/<n>/start`) |
| Play/Pause | Toggle playback of current cue |
| Stop | Stop current playing cue |
| Next Cue | Advance to next cue |
| Previous Cue | Go back to previous cue |

## Roadmap / Ideas

* Feedback for current / selected cue
* Cue list polling & dynamic variables
* Labels reflecting cue names

## Development

```bash
npm install
npm run build
```

During development:

```bash
npm run dev
```

This compiles `main.ts` to `dist/main.js` (entrypoint referenced by `companion/manifest.json`).

## Publish (Maintainer Notes)

1. Update version in `package.json` & `companion/manifest.json`
2. `npm run build`
3. `git commit -am "release: vX.Y.Z"`
4. `git tag vX.Y.Z && git push --tags`
5. `npm publish`

## License

MIT © 2025 ninuxi
