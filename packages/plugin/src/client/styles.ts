export const lanStyles = `
.dshLanSettings { display: grid; gap: 12px; min-width: 0; }
.dshLanSettings form, .dshLanListener { display: grid; gap: 12px; }
.dshLanFields { display: grid; grid-template-columns: minmax(0, 1fr) minmax(80px, .4fr); gap: 12px; }
.dshLanSettings label { display: grid; gap: 6px; min-width: 0; font-size: 13px; }
.dshLanSettings input { box-sizing: border-box; width: 100%; min-width: 0; padding: 8px 10px; color: inherit; background: var(--dsw-alias-bg-layer-3); border: 1px solid var(--dsw-alias-border-l2); border-radius: 8px; font: inherit; }
.dshLanSettings input[type=checkbox] { width: auto; }
.dshLanSettings button { font: inherit; font-weight: 500; color: inherit; border: 1px solid var(--dsw-alias-border-l2); background: transparent; border-radius: 8px; padding: 6px 10px; }
.dshLanSettings button:disabled { opacity: .5; }
.dshLanActions, .dshLanRow { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.dshLanRow { justify-content: space-between; }
.dshLanRow > span { min-width: 0; overflow-wrap: anywhere; }
.dshLanRow strong { font-weight: 500; }
.dshLanSettings strong { font-weight: 500; }
.dshLanSettings button:focus-visible, .dshLanSettings input:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.dshLanSettings button:not(:disabled):hover { background: var(--dsw-alias-interactive-bg-hover); cursor: pointer; }
.dshLanSettings [role=progressbar] { display: block; width: 20px; height: 20px; margin: 20px auto; border: 2px solid var(--dsw-alias-border-l2); border-top-color: var(--dsw-alias-brand-primary); border-radius: 50%; animation: dshLanSpin 1s linear infinite; }
@keyframes dshLanSpin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .dshLanSettings [role=progressbar] { animation: none; } }
.dshLanSettings p { margin: 0; font-size: 13px; }
.dshLanSettings > p:last-child { min-height: 20px; }
.dshLanSettings ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
.dshLanManager { margin-block: 12px; }
.dshLanManager summary { cursor: pointer; margin-bottom: 12px; font-weight: 500; }
@media (max-width: 520px) { .dshLanFields { grid-template-columns: minmax(0, 1fr); } }
`
