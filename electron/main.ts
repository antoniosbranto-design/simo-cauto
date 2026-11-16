
import {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog
} from 'electron'

import path from 'node:path'
import fs from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

const execFileAsync = promisify(execFile)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const wireguardPath = 'C:\\Program Files\\WireGuard\\wireguard.exe'
const wgPath = 'C:\\Program Files\\WireGuard\\wg.exe'

let selectedConfigPath: string | null = null

function createWindow() {
  Menu.setApplicationMenu(null)

  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 650,
    title: 'SIMO.CAUTO',
    backgroundColor: '#080B09',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  // DEBUG TEMPORANEO
  win.webContents.openDevTools({ mode: 'right' })

  win.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
    console.error('Errore caricamento pagina:', errorCode, errorDescription)
  })

  win.webContents.on('preload-error', (_event, preloadPath, error) => {
    console.error('Errore Preload:', preloadPath, error)
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    void win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    void win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  return win
}

async function getVPNStatus() {
  try {
    await fs.access(wireguardPath)
    await fs.access(wgPath)

    const { stdout } = await execFileAsync(wgPath, ['show', 'interfaces'])

    const interfaces = stdout
      .trim()
      .split(/\s+/)
      .filter(Boolean)

    return {
      installed: true,
      running: interfaces.length > 0,
      interfaces,
      message: interfaces.length > 0
        ? 'Tunnel WireGuard rilevato'
        : 'WireGuard installato, nessun tunnel attivo'
    }
  } catch (error) {
    console.error('Errore verifica WireGuard:', error)

    return {
      installed: false,
      running: false,
      interfaces: [],
      message: 'WireGuard non trovato o non disponibile'
    }
  }
}

ipcMain.handle('vpn:get-status', async () => {
  return getVPNStatus()
})

ipcMain.handle('vpn:select-config', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Seleziona configurazione WireGuard',
    properties: ['openFile'],
    filters: [
      { name: 'WireGuard configuration', extensions: ['conf'] }
    ]
  })

  if (result.canceled || !result.filePaths[0]) {
    return {
      cancelled: true,
      valid: false,
      message: 'Selezione annullata'
    }
  }

  const filePath = result.filePaths[0]

  try {
    const content = await fs.readFile(filePath, 'utf8')

    if (
      !content.includes('[Interface]') ||
      !content.includes('[Peer]')
    ) {
      return {
        cancelled: false,
        valid: false,
        message: 'Configurazione WireGuard non valida'
      }
    }

    selectedConfigPath = filePath

    return {
      cancelled: false,
      valid: true,
      fileName: path.basename(filePath),
      message: 'Configurazione selezionata correttamente'
    }
  } catch (error) {
    console.error('Errore lettura configurazione:', error)

    return {
      cancelled: false,
      valid: false,
      message: 'Impossibile leggere il file'
    }
  }
})

// Connessione non ancora attivata
ipcMain.handle('vpn:connect', async () => {
  if (!selectedConfigPath) {
    return {
      success: false,
      message: 'Importa prima una configurazione WireGuard'
    }
  }

  return {
    success: false,
    message: 'Connessione non ancora implementata'
  }
})

// Disconnessione non ancora attivata
ipcMain.handle('vpn:disconnect', async () => {
  return {
    success: false,
    message: 'Gestione disconnessione non ancora implementata'
  }
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


