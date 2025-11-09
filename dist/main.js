"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("@companion-module/base");
class LinuxShowPlayerInstance extends base_1.InstanceBase {
    constructor() {
        super(...arguments);
        this.config = {
            host: '127.0.0.1',
            port: 9999,
        };
    }
    async init(config) {
        this.config = config;
        this.updateStatus(base_1.InstanceStatus.Ok);
        this.updateActions();
        this.updateFeedbacks();
    }
    async configUpdated(config) {
        this.config = config;
        this.updateStatus(base_1.InstanceStatus.Ok);
    }
    async destroy() {
        // No cleanup needed
    }
    getConfigFields() {
        return [
            {
                type: 'textinput',
                id: 'host',
                label: 'Target IP',
                width: 8,
                default: '127.0.0.1',
                regex: base_1.Regex.IP,
            },
            {
                type: 'textinput',
                id: 'port',
                label: 'Target Port',
                width: 4,
                default: '9999',
                regex: base_1.Regex.PORT,
            },
        ];
    }
    updateActions() {
        this.setActionDefinitions({
            start_cue: {
                name: 'Start Cue',
                options: [
                    {
                        type: 'textinput',
                        id: 'cue_id',
                        label: 'Cue ID',
                        default: '1',
                    },
                ],
                callback: async (action) => {
                    this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/start`, []);
                },
            },
            stop_cue: {
                name: 'Stop Cue',
                options: [
                    {
                        type: 'textinput',
                        id: 'cue_id',
                        label: 'Cue ID',
                        default: '1',
                    },
                ],
                callback: async (action) => {
                    this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/stop`, []);
                },
            },
            pause_cue: {
                name: 'Pause Cue',
                options: [
                    {
                        type: 'textinput',
                        id: 'cue_id',
                        label: 'Cue ID',
                        default: '1',
                    },
                ],
                callback: async (action) => {
                    this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/pause`, []);
                },
            },
            resume_cue: {
                name: 'Resume Cue',
                options: [
                    {
                        type: 'textinput',
                        id: 'cue_id',
                        label: 'Cue ID',
                        default: '1',
                    },
                ],
                callback: async (action) => {
                    this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/resume`, []);
                },
            },
        });
    }
    updateFeedbacks() {
        this.setFeedbackDefinitions({});
    }
}
(0, base_1.runEntrypoint)(LinuxShowPlayerInstance, []);
//# sourceMappingURL=main.js.map