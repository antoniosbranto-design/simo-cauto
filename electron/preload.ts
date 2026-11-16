
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('simoVPN', {
  getStatus: () => ipcRenderer.invoke('vpn:get-status'),
  selectConfig: () => ipcRenderer.invoke('vpn:select-config'),
  connect: () => ipcRenderer.invoke('vpn:connect'),
  disconnect: () => ipcRenderer.invoke('vpn:disconnect')
})
