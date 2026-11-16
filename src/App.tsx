
import { useState } from 'react'
import './App.css'
import PCBoost from './PCBoost'

const modules = [
  {
    id: 'boost',
    icon: '🚀',
    title: 'PC BOOST',
    description: 'Ottimizzazione e manutenzione del PC',
    tag: 'OPTIMIZER',
  },
  {
    id: 'cleaner',
    icon: '🧹',
    title: 'CLEANER',
    description: 'Pulizia dei file temporanei',
    tag: 'CLEANUP',
  },
  {
    id: 'startup',
    icon: '⚡',
    title: 'STARTUP',
    description: 'Gestione dei programmi all’avvio',
    tag: 'PERFORMANCE',
  },
  {
    id: 'gaming',
    icon: '🎮',
    title: 'GAMING',
    description: 'Impostazioni dedicate al gaming',
    tag: 'GAMING',
  },
  {
    id: 'system',
    icon: '💻',
    title: 'SYSTEM',
    description: 'Informazioni e diagnostica del sistema',
    tag: 'DIAGNOSTICS',
  },
  {
    id: 'tweaks',
    icon: '⚙️',
    title: 'WINDOWS TWEAKS',
    description: 'Personalizzazione delle impostazioni Windows',
    tag: 'TWEAKS',
  },
]

type ModuleId = (typeof modules)[number]['id']
type Page = 'dashboard' | ModuleId

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')

  const selectedModule = modules.find((item) => item.id === page)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <div className="brand-text">
            <strong>SIMO<span>.CAUTO</span></strong>
            <small>PC OPTIMIZER</small>
          </div>
        </div>

        <div className="sidebar-label">MENU PRINCIPALE</div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${page === 'dashboard' ? 'active' : ''}`}
            onClick={() => setPage('dashboard')}
          >
            <span>▦</span>
            Dashboard
          </button>

          {modules.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${page === item.id ? 'active' : ''}`}
              onClick={() => setPage(item.id)}
            >
              <span>{item.icon}</span>
              {item.title}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="status-dot" />
          <span>SIMO.CAUTO ONLINE</span>
          <small>VERSION 1.0.0</small>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="topbar-label">SIMO.CAUTO</span>
            <span className="topbar-separator">/</span>
            <span>{page === 'dashboard' ? 'Dashboard' : selectedModule?.title}</span>
          </div>

          <div className="topbar-status">
            <span className="status-dot" />
            SYSTEM READY
          </div>
        </header>

        {page === 'boost' ? (
          <PCBoost />
        ) : page === 'dashboard' ? (
          <div className="page-content">
            <div className="welcome-banner">
              <div>
                <div className="eyebrow">WELCOME TO SIMO.CAUTO</div>
                <h1>Il controllo del tuo PC.</h1>
                <p>
                  Tutti gli strumenti essenziali per la manutenzione
                  e l'ottimizzazione del tuo computer.
                </p>
                <button
                  className="primary-button"
                  onClick={() => setPage('boost')}
                >
                  APRI PC BOOST →
                </button>
              </div>

              <div className="welcome-graphic">⚡</div>
            </div>

            <div className="dashboard-heading">
              <div>
                <div className="eyebrow">I TUOI STRUMENTI</div>
                <h2>Optimizer Center</h2>
              </div>
              <span className="module-count">06 MODULI</span>
            </div>

            <div className="module-grid">
              {modules.map((item) => (
                <button
                  key={item.id}
                  className="module-card"
                  onClick={() => setPage(item.id)}
                >
                  <div className="module-card-top">
                    <div className="module-icon">{item.icon}</div>
                    <span className="module-arrow">↗</span>
                  </div>

                  <span className="module-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </button>
              ))}
            </div>

            <div className="dashboard-footer">
              <span>SIMO.CAUTO © 2026</span>
              <span>BUILT FOR YOUR PC</span>
            </div>
          </div>
        ) : (
          <div className="page-content">
            <section className="module-page-heading">
              <div className="module-page-icon">
                {selectedModule?.icon}
              </div>
              <div>
                <div className="eyebrow">SIMO.CAUTO / OPTIMIZER</div>
                <h1>{selectedModule?.title}</h1>
                <p>{selectedModule?.description}</p>
              </div>
            </section>

            <section className="coming-panel">
              <div className="coming-icon">⚙️</div>
              <span className="coming-label">IN DEVELOPMENT</span>
              <h2>Modulo in sviluppo</h2>
              <p>
                Stiamo preparando gli strumenti di questo modulo.
                Sarà disponibile in un prossimo aggiornamento.
              </p>
              <button
                className="primary-button"
                onClick={() => setPage('dashboard')}
              >
                ← TORNA ALLA DASHBOARD
              </button>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}




