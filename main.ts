
import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'

class LinuxShowPlayerInstance extends InstanceBase<{ host: string; port: number }, {}> {
  config = {
    host: '127.0.0.1',
    port: 8000,
  }

  async init(config: { host: string; port: number }): Promise<void> {
    this.config = config
    this.updateStatus(InstanceStatus.Ok)
    this.updateActions()
    this.updateFeedbacks()
  }

  async configUpdated(config: { host: string; port: number }): Promise<void> {
    this.config = config
    this.updateStatus(InstanceStatus.Ok)
  }

  async destroy(): Promise<void> {
    // No cleanup needed
  }

  getConfigFields(): SomeCompanionConfigField[] {
    return [
      {
        type: 'textinput',
        id: 'host',
        label: 'Target IP',
        width: 8,
        default: '127.0.0.1',
      },
      {
        type: 'number',
        id: 'port',
        label: 'Target Port',
        width: 4,
        default: 8000,
        min: 1,
        max: 65535,
      },
    ]
  }

  updateActions(): void {
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
          this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/start`, [])
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
          this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/stop`, [])
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
          this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/pause`, [])
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
          this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/resume`, [])
        },
      },
    })
  }

  updateFeedbacks(): void {
    this.setFeedbackDefinitions({})
  }
}

runEntrypoint(LinuxShowPlayerInstance, [])