## Companion Module: Linux Show Player

[![npm version](https://img.shields.io/npm/v/companion-module-linux-show-player.svg)](https://www.npmjs.com/package/companion-module-linux-show-player)

Control [Linux Show Player](https://github.com/FrancescoCeruti/linux-show-player) from Bitfocus Companion via OSC.

### Features
- Start/Stop/Pause/Resume cue by number
- Simple configuration: Host/IP and Port (default 8000)

### Installation
```bash
npm install companion-module-linux-show-player
```
Add a new instance in Companion, configure Host and Port, and create buttons using the provided actions.

### Configuration
| Field | Description |
|-------|-------------|
| Host  | IP or hostname of LSP |
| Port  | OSC UDP port (default 8000) |

**Note:** If Companion and LSP sono sulla stessa macchina, la porta 8000 può andare in conflitto. Modifica la porta in LSP se necessario.

### Actions
| Action      | Description                                 |
|-------------|---------------------------------------------|
| Start Cue   | `/cue/<n>/start` - Start cue by number      |
| Stop Cue    | `/cue/<n>/stop` - Stop cue by number        |
| Pause Cue   | `/cue/<n>/pause` - Pause cue by number      |
| Resume Cue  | `/cue/<n>/resume` - Resume cue by number    |

### Development
```bash
npm install
npm run build
```
For local dev:
```bash
npm run dev
```

### License
MIT © 2025 ninuxi
* Cue list polling & dynamic variables
