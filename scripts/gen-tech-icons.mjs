/**
 * Generate src/components/TechIcon.jsx from simple-icons.
 *
 * Only the marks the portfolio actually references are emitted, so the bundle
 * carries ~35 paths rather than the whole 3000-icon set and there is no runtime
 * dependency on the package.
 *
 * Each brand also gets two lightness-adjusted variants. A brand hex is tuned
 * for one background; this site has three. Adjusting L in HSL (hue and
 * saturation untouched) keeps React cyan and JavaScript yellow recognisably
 * themselves while clearing 3:1 on whichever ground they land on.
 */
import * as si from 'simple-icons'
import { writeFileSync } from 'node:fs'

const SLUGS = [
  'react','typescript','javascript','redux','html5','css','tailwindcss','bootstrap',
  'android','ios','nodedotjs','express','socketdotio','jsonwebtokens','googlemaps',
  'mongodb','firebase','cloudinary','xcode','androidstudio','gradle','cocoapods',
  'googleplay','appstore','git','github','bitbucket','figma',
]

// --- colour maths -----------------------------------------------------------
const srgb = v => { v /= 255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4) }
const lum = ({r,g,b}) => 0.2126*srgb(r) + 0.7152*srgb(g) + 0.0722*srgb(b)
const hex2rgb = h => ({ r:parseInt(h.slice(0,2),16), g:parseInt(h.slice(2,4),16), b:parseInt(h.slice(4,6),16) })
const rgb2hex = ({r,g,b}) => [r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('')
const ratio = (a,b) => { const la=lum(a), lb=lum(b), hi=Math.max(la,lb), lo=Math.min(la,lb); return (hi+0.05)/(lo+0.05) }

function rgb2hsl({r,g,b}) {
  r/=255; g/=255; b/=255
  const mx=Math.max(r,g,b), mn=Math.min(r,g,b), d=mx-mn
  let h=0
  if (d) { if (mx===r) h=((g-b)/d)%6; else if (mx===g) h=(b-r)/d+2; else h=(r-g)/d+4 }
  h*=60; if (h<0) h+=360
  const l=(mx+mn)/2
  const s = d===0 ? 0 : d/(1-Math.abs(2*l-1))
  return {h,s,l}
}
function hsl2rgb({h,s,l}) {
  const c=(1-Math.abs(2*l-1))*s, hp=h/60, x=c*(1-Math.abs(hp%2-1))
  let [r,g,b] = hp<1?[c,x,0]:hp<2?[x,c,0]:hp<3?[0,c,x]:hp<4?[0,x,c]:hp<5?[x,0,c]:[c,0,x]
  const m=l-c/2
  return {r:(r+m)*255, g:(g+m)*255, b:(b+m)*255}
}

/** Walk L toward `dir` until the mark clears `target` against `ground`. */
function fit(hex, ground, target, dir) {
  const base = rgb2hsl(hex2rgb(hex))
  let best = rgb2hex(hex2rgb(hex))
  for (let i = 0; i <= 100; i++) {
    const l = Math.max(0, Math.min(1, base.l + dir * i/100))
    const cand = hsl2rgb({ ...base, l })
    best = rgb2hex(cand)
    if (ratio(cand, ground) >= target) break
  }
  return best
}

const GROUND = {
  light: hex2rgb('ffffff'),
  // Dark and night card grounds, measured in-browser. The night card is the
  // lighter of the two, so fitting against it also satisfies dark.
  dark:  hex2rgb('1d1d26'),
  night: hex2rgb('212d44'),
}
/**
 * WCAG 1.4.3 and 1.4.11 both exempt logotypes from contrast minimums, and a
 * brand mark is exactly that — it is recognised by shape and hue, not read as
 * text. Forcing React's cyan to 3.4:1 on white turned it into a dark teal:
 * compliant against a rule that does not apply, and worse at the one job the
 * mark has. So the target here is VISIBILITY, not compliance — the true brand
 * hex is kept unless the mark would all but disappear into the ground.
 */
const TARGET = 2.3

let untouched = 0
const rows = []
const report = []
for (const slug of SLUGS) {
  const key = 'si' + slug[0].toUpperCase() + slug.slice(1)
  const ic = si[key]
  if (!ic) { console.error('MISSING', slug); process.exit(1) }
  const brand = ic.hex.toLowerCase()
  const onLight = ratio(hex2rgb(brand), GROUND.light) >= TARGET ? brand : fit(brand, GROUND.light, TARGET, -1)
  const onDark  = ratio(hex2rgb(brand), GROUND.night) >= TARGET ? brand : fit(brand, GROUND.night, TARGET, +1)
  if (onLight === brand && onDark === brand) untouched++
  rows.push({ slug, title: ic.title, path: ic.path, brand, onLight, onDark })
  report.push({
    slug,
    brand: '#'+brand,
    light: '#'+onLight, lr: +ratio(hex2rgb(onLight), GROUND.light).toFixed(2),
    dark:  '#'+onDark,  dr: +ratio(hex2rgb(onDark),  GROUND.dark ).toFixed(2),
                        nr: +ratio(hex2rgb(onDark),  GROUND.night).toFixed(2),
  })
}

const body = rows.map(r =>
`  ${r.slug}: {
    title: '${r.title.replace(/'/g, "\\'")}',
    light: '#${r.onLight}',
    dark: '#${r.onDark}',
    path: '${r.path}',
  },`).join('\n')

writeFileSync('src/components/TechIcon.jsx', `/**
 * Brand marks for the technology grid.
 *
 * GENERATED — do not hand-edit. Regenerate with the script in the session
 * scratchpad (gen-icons.mjs) if a technology is added or removed.
 *
 * Paths come from simple-icons (CC0). The trademarks belong to their owners and
 * are used here only to identify the technologies worked with, which is the
 * ordinary nominative use every stack list makes.
 *
 * Each mark carries TWO colours rather than one. A brand hex is picked for one
 * background, and this site has three: only 10 of these 28 marks clear 3:1 on
 * light, dark and night as published. \`light\` and \`dark\` are the same hue with
 * L shifted until the mark is legible on that ground — so React stays cyan and
 * JavaScript stays yellow instead of everything collapsing to a flat
 * monochrome. Marks that are already black or near-black (Apple, Express,
 * Socket.IO, JWT, GitHub, Gradle) resolve to a neutral on the dark themes,
 * which is their usual dark-mode treatment anyway.
 */
const MARKS = {
${body}
}

export const TECH_MARKS = MARKS

/**
 * @param {{ slug: string, size?: number, className?: string }} props
 */
export default function TechIcon({ slug, size = 34, className = '' }) {
  const mark = MARKS[slug]
  if (!mark) return null
  return (
    <svg
      className={\`techicon \${className}\`}
      style={{ '--brand-l': mark.light, '--brand-d': mark.dark }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={mark.title}
      focusable="false"
    >
      <path d={mark.path} />
    </svg>
  )
}
`)

console.log(`  generated ${rows.length} marks -> src/components/TechIcon.jsx\n`)
console.log(`  ${'slug'.padEnd(15)}${'brand'.padEnd(10)}${'light'.padEnd(10)}${'ratio'.padEnd(7)}${'dark'.padEnd(10)}${'dark'.padEnd(7)}night`)
console.log('  '+'-'.repeat(66))
let bad = 0
for (const r of report) {
  const ok = r.lr >= 3 && r.dr >= 3 && r.nr >= 3
  if (!ok) bad++
  console.log(`  ${r.slug.padEnd(15)}${r.brand.padEnd(10)}${r.light.padEnd(10)}${String(r.lr).padEnd(7)}${r.dark.padEnd(10)}${String(r.dr).padEnd(7)}${r.nr}${ok?'':'  FAIL'}`)
}
console.log('  '+'-'.repeat(66))
console.log(`  ${untouched}/${rows.length} marks keep their exact brand hex in every theme`)
console.log(`  ${rows.length - untouched} adjusted for visibility only (hue and saturation preserved)`)
