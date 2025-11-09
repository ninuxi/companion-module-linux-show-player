import { InstanceBase, runEntrypoint, InstanceStatus, Regex } from '@companion-module/base'

class LinuxShowPlayerInstance extends InstanceBase {
  // Default presets: Start/Stop/Pause/Resume for cues 1..5
  static presets = (() => {
    const presets = []
    for (let i = 1; i <= 5; i++) {
      presets.push(
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Start Cue ${i}`,
          style: { text: `▶ Cue ${i}`, size: '18', color: '#FFFFFF', bgcolor: '#2ECC40' },
          steps: [{ down: [{ actionId: 'start_cue', options: { cue_id: `${i}` } }], up: [] }],
          feedbacks: [],
        },
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Stop Cue ${i}`,
          style: { text: `■ Cue ${i}`, size: '18', color: '#FFFFFF', bgcolor: '#FF4136' },
          steps: [{ down: [{ actionId: 'stop_cue', options: { cue_id: `${i}` } }], up: [] }],
          feedbacks: [],
        },
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Pause Cue ${i}`,
          style: { text: `⏸ Cue ${i}`, size: '18', color: '#111111', bgcolor: '#FFDC00' },
          steps: [{ down: [{ actionId: 'pause_cue', options: { cue_id: `${i}` } }], up: [] }],
          feedbacks: [],
        },
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Resume Cue ${i}`,
          style: { text: `▶▶ Cue ${i}`, size: '18', color: '#FFFFFF', bgcolor: '#0074D9' },
          steps: [{ down: [{ actionId: 'resume_cue', options: { cue_id: `${i}` } }], up: [] }],
          feedbacks: [],
        }
      )
    }
    return presets
  })()

  constructor(internal) {
    super(internal)
    this.config = { host: '127.0.0.1', port: 9999 }
  }

  async init(config) {
    this.config = config
    this.updateStatus(InstanceStatus.Ok)
    this.updateActions()
    this.updateFeedbacks()
  }

  async configUpdated(config) {
    this.config = config
    this.updateStatus(InstanceStatus.Ok)
    this.updateActions()
    this.updateFeedbacks()
  }

  async destroy() {
    // nothing to clean up
  }

  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'Target IP', width: 8, default: '127.0.0.1', regex: Regex.IP },
      { type: 'textinput', id: 'port', label: 'Target Port', width: 4, default: '9999', regex: Regex.PORT },
    ]
  }

  updateActions() {
    this.setActionDefinitions({
      start_cue: {
        name: 'Start Cue',
        options: [{ type: 'textinput', id: 'cue_id', label: 'Cue ID', default: '1' }],
        callback: async (action) => {
          this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/start`, [])
        },
      },
      stop_cue: {
        name: 'Stop Cue',
        options: [{ type: 'textinput', id: 'cue_id', label: 'Cue ID', default: '1' }],
        callback: async (action) => {
          this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/stop`, [])
        },
      },
      pause_cue: {
        name: 'Pause Cue',
        options: [{ type: 'textinput', id: 'cue_id', label: 'Cue ID', default: '1' }],
        callback: async (action) => {
          this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/pause`, [])
        },
      },
      resume_cue: {
        name: 'Resume Cue',
        options: [{ type: 'textinput', id: 'cue_id', label: 'Cue ID', default: '1' }],
        callback: async (action) => {
          this.oscSend(this.config.host, this.config.port, `/cue/${action.options.cue_id}/resume`, [])
        },
      },
    })
  }

  updateFeedbacks() {
    this.setFeedbackDefinitions({})
  }
}

runEntrypoint(LinuxShowPlayerInstance, [])


import { InstanceBase, runEntrypoint, InstanceStatus, SomeCompanionConfigField, Regex } from '@companion-module/base'

class LinuxShowPlayerInstance extends InstanceBase<{ host: string; port: number }, {}> {
  static presets = (() => {
    const presets = []
    for (let i = 1; i <= 5; i++) {
      presets.push(
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Start Cue ${i}`,
          style: {
            text: `▶ Cue ${i}`,
            size: '18',
            color: '#FFFFFF',
            bgcolor: '#2ECC40',
          },
          steps: [
            {
              down: [{ actionId: 'start_cue', options: { cue_id: `${i}` } }],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Stop Cue ${i}`,
          style: {
            text: `■ Cue ${i}`,
            size: '18',
            color: '#FFFFFF',
            bgcolor: '#FF4136',
          },
          steps: [
            {
              down: [{ actionId: 'stop_cue', options: { cue_id: `${i}` } }],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Pause Cue ${i}`,
          style: {
            text: `⏸ Cue ${i}`,
            size: '18',
            color: '#FFFFFF',
            bgcolor: '#FFDC00',
          },
          steps: [
            {
              down: [{ actionId: 'pause_cue', options: { cue_id: `${i}` } }],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Resume Cue ${i}`,
          style: {
            text: `▶▶ Cue ${i}`,
            size: '18',
            color: '#FFFFFF',
            bgcolor: '#0074D9',
          },
          steps: [
            {
              down: [{ actionId: 'resume_cue', options: { cue_id: `${i}` } }],
              up: [],
            },
          ],
          feedbacks: [],
        }
      )
    }
    return presets
  })()

  config = {
    host: '127.0.0.1',
    port: 9999,
  }
}

runEntrypoint(LinuxShowPlayerInstance, [])
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
        regex: Regex.IP,
      },
      {
        type: 'textinput',
        id: 'port',
        label: 'Target Port',
        width: 4,
        default: '9999',
        regex: Regex.PORT,
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


  static presets = (() => {
    const presets = []
    for (let i = 1; i <= 5; i++) {
      presets.push(
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Start Cue ${i}`,
          style: {
            text: `▶ Cue ${i}`,
            size: '18',
            color: '#FFFFFF',
            bgcolor: '#2ECC40',
          },
          steps: [
            {
              down: [{ actionId: 'start_cue', options: { cue_id: `${i}` } }],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Stop Cue ${i}`,
          style: {
            text: `■ Cue ${i}`,
            size: '18',
            color: '#FFFFFF',
            bgcolor: '#FF4136',
          },
          steps: [
            {
              down: [{ actionId: 'stop_cue', options: { cue_id: `${i}` } }],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Pause Cue ${i}`,
          style: {
            text: `⏸ Cue ${i}`,
            size: '18',
            color: '#FFFFFF',
            bgcolor: '#FFDC00',
          },
          steps: [
            {
              down: [{ actionId: 'pause_cue', options: { cue_id: `${i}` } }],
              up: [],
            },
          ],
          feedbacks: [],
        },
        {
          type: 'button',
          category: 'Linux Show Player',
          name: `Resume Cue ${i}`,
          style: {
            text: `▶▶ Cue ${i}`,
            size: '18',
            color: '#FFFFFF',
            bgcolor: '#0074D9',
          },
          steps: [
            {
              down: [{ actionId: 'resume_cue', options: { cue_id: `${i}` } }],
              up: [],
            },
          ],
          feedbacks: [],
        }
      )
    }
    return presets
  })()

runEntrypoint(LinuxShowPlayerInstance, [])