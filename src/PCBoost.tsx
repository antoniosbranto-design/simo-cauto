
import { useState } from 'react'

type Tool = {
  icon: string
  title: string
  description: string
  category: string
  script: string
  filename: string
  warning?: string
}

const tools: Tool[] = [
  {
    icon: '🧹',
    title: 'Temporary Cleaner',
    description:
      'Rimuove i file temporanei dell’utente più vecchi di 7 giorni.',
    category: 'CLEANUP',
    filename: 'SIMO-CAUTO-CLEANER.bat',
    script: `@echo off
title SIMO.CAUTO - TEMP CLEANER
color 0A
echo ======================================
echo       SIMO.CAUTO TEMP CLEANER
echo ======================================
echo.
echo Verranno eliminati i file temporanei
echo piu vecchi di 7 giorni nella cartella TEMP.
echo.
choice /c SN /n /m "Continuare? [S/N] "
if errorlevel 2 exit /b
forfiles /p "%TEMP%" /s /m * /d -7 /c "cmd /c if @isdir==FALSE del /f /q @path" 2>nul
echo.
echo Pulizia completata.
pause
`,
  },
  {
    icon: '🌐',
    title: 'DNS Flush',
    description:
      'Svuota la cache DNS di Windows per aggiornare le risoluzioni dei nomi.',
    category: 'NETWORK',
    filename: 'SIMO-CAUTO-DNS-FLUSH.bat',
    script: `@echo off
title SIMO.CAUTO - DNS FLUSH
color 0A
echo ======================================
echo          SIMO.CAUTO DNS FLUSH
echo ======================================
echo.
echo Questo comando svuota la cache DNS.
echo Non cancella password o dati personali.
echo.
choice /c SN /n /m "Continuare? [S/N] "
if errorlevel 2 exit /b
echo.
ipconfig /flushdns
echo.
echo Operazione terminata.
pause
`,
  },
  {
    icon: '💾',
    title: 'Disk Checker',
    description:
      'Visualizza lo spazio totale e disponibile delle unità disco.',
    category: 'DIAGNOSTICS',
    filename: 'SIMO-CAUTO-DISK-CHECKER.bat',
    script: `@echo off
title SIMO.CAUTO - DISK CHECKER
color 0A
echo ======================================
echo        SIMO.CAUTO DISK CHECKER
echo ======================================
echo.
powershell -NoProfile -Command "Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' | Select-Object DeviceID,@{Name='Totale GB';Expression={[math]::Round($_.Size/1GB,2)}},@{Name='Liberi GB';Expression={[math]::Round($_.FreeSpace/1GB,2)}} | Format-Table -AutoSize"
echo.
pause
`,
  },
  {
    icon: '📊',
    title: 'System Report',
    description:
      'Genera un rapporto testuale con informazioni sul computer.',
    category: 'SYSTEM',
    filename: 'SIMO-CAUTO-SYSTEM-REPORT.bat',
    script: `@echo off
title SIMO.CAUTO - SYSTEM REPORT
color 0A
echo Generazione rapporto di sistema...
systeminfo > "%USERPROFILE%\\Desktop\\SIMO-CAUTO-System-Report.txt"
echo.
echo Rapporto salvato sul Desktop.
pause
`,
  },
]

export default function PCBoost() {
  const [downloaded, setDownloaded] = useState<string | null>(null)

  function downloadTool(tool: Tool) {
    const blob = new Blob([tool.script], {
      type: 'text/plain;charset=utf-8',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = tool.filename
    link.click()

    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setDownloaded(tool.title)
  }

  return (
    <div className="page-content">
      <section className="module-page-heading">
        <div className="module-page-icon">🚀</div>
        <div>
          <div className="eyebrow">SIMO.CAUTO / OPTIMIZER</div>
          <h1>PC BOOST</h1>
          <p>Il centro di manutenzione e ottimizzazione del tuo PC.</p>
        </div>
      </section>

      <section className="boost-hero">
        <div>
          <span className="coming-label">SIMO.CAUTO OPTIMIZER</span>
          <h2>Prendi il controllo del tuo PC.</h2>
          <p>
            Strumenti semplici per la manutenzione e la diagnostica
            di Windows.
          </p>
        </div>
        <div className="boost-hero-icon">⚡</div>
      </section>

      <section className="boost-section">
        <div className="boost-section-heading">
          <div>
            <div className="eyebrow">OPTIMIZATION CENTER</div>
            <h2>Strumenti disponibili</h2>
          </div>
          <span className="module-count">04 STRUMENTI</span>
        </div>

        <div className="boost-tools-grid">
          {tools.map((tool) => (
            <article className="boost-tool-card" key={tool.title}>
              <div className="boost-tool-card-top">
                <div className="module-icon">{tool.icon}</div>
                <span className="module-tag">{tool.category}</span>
              </div>

              <h3>{tool.title}</h3>
              <p>{tool.description}</p>

              <button
                className="primary-button"
                onClick={() => downloadTool(tool)}
              >
                SCARICA STRUMENTO ↓
              </button>
            </article>
          ))}
        </div>

        {downloaded && (
          <div className="boost-success">
            ✓ {downloaded}: download preparato. Controlla il file prima
            di eseguirlo.
          </div>
        )}
      </section>

      <section className="bottom-info">
        <div className="info-icon">ⓘ</div>
        <div>
          <strong>Trasparenza e sicurezza</strong>
          <p>
            Gli strumenti vengono scaricati sul tuo computer e non
            vengono eseguiti automaticamente dal sito. Apri i file
            con Blocco note per controllare i comandi. Non avviarli
            come amministratore. Il DNS Flush può richiedere
            autorizzazioni aggiuntive su alcune configurazioni.
          </p>
        </div>
      </section>
    </div>
  )
}
