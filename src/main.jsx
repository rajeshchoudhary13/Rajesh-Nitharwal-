import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

/* Base layers first, component layers second.
   Order matters: importing App before these would pull in the eagerly-loaded
   component stylesheets (navbar.css, hero.css) ahead of the base ones, so
   `global.css` / `ui.css` would win every specificity tie against the very
   components they are meant to sit underneath. */
import './styles/tokens.css'
import './styles/global.css'
import './styles/ui.css'
import './styles/effects.css'

import App from './App.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

/* Layout primitives, then the editorial layer — both after App on purpose.

   The section stylesheets are imported by the section components, i.e. during
   App's module evaluation above, so importing these two here is the only way to
   guarantee they come after all of them in the cascade without resorting to
   !important on every rule.

   Order between the two matters as well: layout.css owns grid shape and spacing,
   editorial.css owns material and geometry, and editorial stays the last word —
   so it is imported second, exactly as its own header promises. */
import './styles/layout.css'
import './styles/compose.css'
import './styles/editorial.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
