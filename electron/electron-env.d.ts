
/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ROOT: string
    VITE_PUBLIC: string
  }
}

interface SimovpnStatus {
  installed: boolean
  running: boolean
  interfaces: string[]
  message: string
}

interface SimovpnConfigResult {
  cancelled: boolean
  valid: boolean
  fileName?: string
  message: string
}

interface SimovpnActionResult {
  success: boolean
  message: string
}

interface Window {
  simoVPN: {
    getStatus: () => Promise<SimovpnStatus>
    selectConfig: () => Promise<SimovpnConfigResult>
    connect: () => Promise<SimovpnActionResult>
    disconnect: () => Promise<SimovpnActionResult>
  }
}

