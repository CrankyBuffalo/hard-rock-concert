// The concert scene: one SVG string, built from small drawing helpers.

const f = v => String(Math.round(v * 10) / 10)

function rng(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const BEAMS = {
  red: '#ff2a2a',
  amber: '#ffb020',
  violet: '#b44cff',
  cyan: '#33d6ff',
  white: '#fff0d8',
  green: '#46ff7a',
}

const INK = '#050206'

function defs() {
  const beamGradients = Object.entries(BEAMS)
    .map(
      ([k, c]) =>
        `<linearGradient id="g-${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity="0.55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>`,
    )
    .join('')

  return `<defs>
${beamGradients}
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060209"/><stop offset="0.6" stop-color="#17081c"/><stop offset="1" stop-color="#3d0c18"/></linearGradient>
<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ff4a2a" stop-opacity="0.5"/><stop offset="1" stop-color="#ff4a2a" stop-opacity="0"/></radialGradient>
<radialGradient id="halo-r" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ff3a3a" stop-opacity="0.5"/><stop offset="1" stop-color="#ff3a3a" stop-opacity="0"/></radialGradient>
<radialGradient id="halo-v" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#a64cff" stop-opacity="0.5"/><stop offset="1" stop-color="#a64cff" stop-opacity="0"/></radialGradient>
<radialGradient id="halo-a" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffb020" stop-opacity="0.45"/><stop offset="1" stop-color="#ffb020" stop-opacity="0"/></radialGradient>
<radialGradient id="halo-w" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff0d8" stop-opacity="0.45"/><stop offset="1" stop-color="#fff0d8" stop-opacity="0"/></radialGradient>
<linearGradient id="flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffe27a"/><stop offset="0.45" stop-color="#ff8a1f"/><stop offset="1" stop-color="#e0201b" stop-opacity="0"/></linearGradient>
<linearGradient id="curtain" x1="0" y1="0" x2="0.16" y2="0" spreadMethod="repeat"><stop offset="0" stop-color="#2a0710"/><stop offset="0.5" stop-color="#5a0f1c"/><stop offset="1" stop-color="#2a0710"/></linearGradient>
<linearGradient id="shade-l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.7"/></linearGradient>
<linearGradient id="shade-r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0.7"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b0a16"/><stop offset="0.5" stop-color="#2d0f1d"/><stop offset="1" stop-color="#12060f"/></linearGradient>
<linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a0a24"/><stop offset="0.5" stop-color="#150820"/><stop offset="1" stop-color="#4a0c12"/></linearGradient>
<linearGradient id="eq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd24a"/><stop offset="0.5" stop-color="#ff5a2a"/><stop offset="1" stop-color="#b3122a"/></linearGradient>
<linearGradient id="brass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a5a1a"/><stop offset="0.5" stop-color="#e8c25a"/><stop offset="1" stop-color="#7a5a1a"/></linearGradient>
<linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8e8f0"/><stop offset="0.5" stop-color="#6a6a78"/><stop offset="1" stop-color="#2a2a34"/></linearGradient>
<linearGradient id="burst" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb347"/><stop offset="0.55" stop-color="#c2410c"/><stop offset="1" stop-color="#3a0d08"/></linearGradient>
<linearGradient id="redbody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e11d2e"/><stop offset="1" stop-color="#7a0713"/></linearGradient>
<linearGradient id="blackbody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a2630"/><stop offset="1" stop-color="#0a080c"/></linearGradient>
<linearGradient id="whitebody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4efe6"/><stop offset="1" stop-color="#a9a396"/></linearGradient>
<radialGradient id="vig" cx="0.5" cy="0.45" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.6"/></radialGradient>
<linearGradient id="fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9a0c0" stop-opacity="0"/><stop offset="1" stop-color="#d9a0c0" stop-opacity="0.28"/></linearGradient>
<pattern id="px" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="1" fill="#000" opacity="0.4"/><rect width="1" height="8" fill="#000" opacity="0.4"/></pattern>
<pattern id="cloth" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 5L5 0" stroke="#2a1f2c" stroke-width="1"/></pattern>
<clipPath id="screenclip"><rect x="430" y="205" width="740" height="225"/></clipPath>
</defs>`
}

const STYLE = `<style>
.beam{transform-origin:0 0;animation:sway 7s ease-in-out infinite alternate}
@keyframes sway{from{transform:rotate(calc(var(--sway) * -1))}to{transform:rotate(var(--sway))}}
.bob{animation:bob 1.2s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.wave{transform-box:fill-box;transform-origin:50% 100%;animation:wave 1.3s ease-in-out infinite alternate}
@keyframes wave{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
.cab{transform-box:fill-box;transform-origin:50% 100%;animation:thump 0.9s ease-out infinite}
@keyframes thump{0%{transform:scale(1.012)}35%{transform:scale(0.996)}100%{transform:scale(1)}}
.flame{transform-box:fill-box;transform-origin:50% 100%;animation:flicker 1.1s ease-in-out infinite alternate}
@keyframes flicker{from{transform:scale(1,0.8);opacity:0.75}to{transform:scale(1,1.12);opacity:1}}
.spark{animation:rise 4s linear infinite;opacity:0}
@keyframes rise{0%{transform:translate(0,0);opacity:0}12%{opacity:0.9}100%{transform:translate(var(--dx),-420px);opacity:0}}
.jam{transform-box:fill-box;transform-origin:50% 100%;animation:jam 1.8s ease-in-out infinite alternate}
@keyframes jam{from{transform:rotate(calc(var(--tilt) * -1))}to{transform:rotate(var(--tilt))}}
.bang{transform-origin:0px -152px;animation:bang 0.9s ease-in-out infinite alternate}
@keyframes bang{from{transform:rotate(-9deg)}to{transform:rotate(11deg)}}
.strum{transform-origin:-12px -148px;animation:strum 0.34s ease-in-out infinite alternate}
@keyframes strum{from{transform:rotate(-5deg)}to{transform:rotate(5deg)}}
.neon{animation:neon 3.4s ease-in-out infinite alternate}
@keyframes neon{from{opacity:0.7}to{opacity:1}}
.arm{animation:arm 0.42s ease-in-out infinite alternate}
@keyframes arm{from{transform:rotate(-14deg)}to{transform:rotate(12deg)}}
.cym{transform-box:fill-box;transform-origin:50% 50%;animation:cym 1.2s ease-in-out infinite alternate}
@keyframes cym{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
.haze{animation:haze 12s ease-in-out infinite alternate}
@keyframes haze{from{opacity:0.3;transform:translateX(-40px)}to{opacity:0.6;transform:translateX(40px)}}
.pulse{animation:pulse 2.4s ease-in-out infinite alternate}
@keyframes pulse{from{opacity:0.45}to{opacity:1}}
.glint{animation:glint 1.3s ease-in-out infinite alternate}
@keyframes glint{from{opacity:0.55}to{opacity:1}}
.eq{transform-box:fill-box;transform-origin:50% 100%;animation:eq 1s ease-in-out infinite alternate}
@keyframes eq{from{transform:scaleY(0.18)}to{transform:scaleY(1)}}
.scan{animation:scan 9s linear infinite}
@keyframes scan{from{transform:translateX(-200px)}to{transform:translateX(200px)}}
.surf{animation:surf 70s linear infinite}
@keyframes surf{from{transform:translateX(-250px)}to{transform:translateX(1850px)}}
.flag{transform-origin:1262px 714px;animation:flag 1.6s ease-in-out infinite alternate}
@keyframes flag{from{transform:skewY(-5deg)}to{transform:skewY(6deg)}}
.lens{animation:glint 2.2s ease-in-out infinite alternate}
</style>`

function beam(x, y, color, sway, dur, delay, spread, len) {
  return `<g transform="translate(${x} ${y})"><g class="beam" style="--sway:${sway}deg;animation-duration:${dur}s;animation-delay:-${delay}s"><polygon points="-4,0 4,0 ${spread},${len} -${spread},${len}" fill="url(#g-${color})"/></g></g>`
}

function can(x, y, color) {
  const c = BEAMS[color]

  return `<g transform="translate(${x} ${y})"><path d="M-3 -4V-20M3 -4V-20" stroke="#2a2030" stroke-width="2"/><rect x="-13" y="-4" width="26" height="30" rx="5" fill="#15101a" stroke="#3a2a40" stroke-width="2"/><rect x="-9" y="22" width="18" height="6" rx="2" fill="#0c070f"/><circle cy="30" r="22" fill="${c}" opacity="0.16"/><circle class="lens" cy="30" r="9" fill="${c}"/></g>`
}

function truss(x1, x2, y) {
  let d = ''
  let up = true

  for (let x = x1; x <= x2; x += 28) {
    d += `${x === x1 ? 'M' : 'L'}${x} ${up ? y : y + 26}`
    up = !up
  }

  return `<path d="M${x1} ${y}H${x2}M${x1} ${y + 26}H${x2}" stroke="#40324a" stroke-width="4"/><path d="${d}" stroke="#2c2232" stroke-width="2.5" fill="none"/>`
}

function pa(x, w, top, n) {
  let out = `<path d="M${x + 10} 0V${top}M${x + w - 10} 0V${top}" stroke="#2a2030" stroke-width="2"/>`

  for (let i = 0; i < n; i++) {
    const y = top + i * 52
    out += `<rect x="${x}" y="${y}" width="${w}" height="50" rx="4" fill="#0b070d" stroke="#2a1c2c" stroke-width="2"/><rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="38" rx="2" fill="url(#cloth)"/><circle cx="${x + w / 2}" cy="${y + 25}" r="11" fill="#130a15" stroke="#2a1c2c" stroke-width="2"/>`
  }

  return out
}

function curtains() {
  return `<rect x="0" y="0" width="130" height="640" fill="url(#curtain)"/><rect x="1470" y="0" width="130" height="640" fill="url(#curtain)"/>
<rect x="60" y="0" width="70" height="640" fill="url(#shade-l)"/><rect x="1470" y="0" width="70" height="640" fill="url(#shade-r)"/>
<path d="M0 0H140V64Q105 100 70 64Q35 100 0 64Z" fill="#1c050c"/><path d="M1460 0H1600V64Q1565 100 1530 64Q1495 100 1460 64Z" fill="#1c050c"/>`
}

function screen() {
  let bars = ''

  for (let i = 0; i < 28; i++) {
    const dur = (0.7 + ((i * 37) % 11) / 10).toFixed(2)
    const delay = ((i * 53) % 17) / 10

    bars += `<rect class="eq" x="${452 + i * 25}" y="340" width="16" height="86" fill="url(#eq)" style="animation-duration:${dur}s;animation-delay:-${delay}s"/>`
  }

  return `<rect x="420" y="195" width="760" height="245" rx="6" fill="#0a040c" stroke="#2a1a30" stroke-width="6"/>
<g clip-path="url(#screenclip)">
<rect x="430" y="205" width="740" height="225" fill="url(#screen)"/>
<g class="scan"><rect x="560" y="205" width="60" height="225" fill="#ff2a5a" opacity="0.12"/><rect x="900" y="205" width="90" height="225" fill="#8a3cff" opacity="0.12"/></g>
<circle cx="800" cy="300" r="96" fill="none" stroke="#ff2a2a" stroke-width="3" opacity="0.5"/>
<circle class="pulse" cx="800" cy="300" r="78" fill="none" stroke="#ff6a4a" stroke-width="6" opacity="0.7"/>
<path d="M780 232L742 316H790L764 392L850 292H802L826 232Z" fill="#ff5a3a" stroke="#ffd2a0" stroke-width="3" stroke-linejoin="round" class="neon"/>
<path d="M560 300H680M920 300H1040M590 330H690M910 330H1010" stroke="#ff2a2a" stroke-width="3" opacity="0.35"/>
${bars}
<rect x="430" y="205" width="740" height="225" fill="url(#px)"/>
</g>`
}

function cab(x, y, w, h) {
  const spk = [
    [w * 0.3, h * 0.3],
    [w * 0.7, h * 0.3],
    [w * 0.3, h * 0.7],
    [w * 0.7, h * 0.7],
  ]
    .map(([cx, cy]) => `<circle cx="${f(x + cx)}" cy="${f(y + cy)}" r="${f(w * 0.17)}" fill="#0a060c" opacity="0.7"/>`)
    .join('')

  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#0e090f" stroke="#2a1c2c" stroke-width="3"/><rect x="${x + 7}" y="${y + 7}" width="${w - 14}" height="${h - 14}" fill="#150e18"/><rect x="${x + 7}" y="${y + 7}" width="${w - 14}" height="${h - 14}" fill="url(#cloth)"/>${spk}<rect x="${x + 7}" y="${y + 7}" width="${w - 14}" height="${h - 14}" fill="none" stroke="#b8932f" stroke-width="2.5"/><path d="M${x} ${y + 12}V${y}H${x + 12}M${x + w - 12} ${y}H${x + w}V${y + 12}M${x} ${y + h - 12}V${y + h}H${x + 12}M${x + w - 12} ${y + h}H${x + w}V${y + h - 12}" stroke="#7a7a86" stroke-width="2" fill="none"/>`
}

function head(x, y, w) {
  let knobs = ''

  for (let i = 0; i < 8; i++) {
    knobs += `<circle cx="${f(x + 18 + i * ((w - 40) / 7))}" cy="${y + 24}" r="4.5" fill="#d9b24a" stroke="#6a5214" stroke-width="1"/>`
  }

  return `<rect x="${x}" y="${y}" width="${w}" height="40" rx="3" fill="#0e090f" stroke="#2a1c2c" stroke-width="3"/><rect x="${x + 6}" y="${y + 5}" width="${w - 12}" height="30" rx="2" fill="#16101a" stroke="#b8932f" stroke-width="1.5"/><rect x="${x + 14}" y="${y + 8}" width="${f(w * 0.3)}" height="9" fill="#e8e0cc" opacity="0.85"/>${knobs}<circle class="lens" cx="${x + w - 16}" cy="${y + 12}" r="3.5" fill="#ff2a2a"/>`
}

function ampStack(x, cabs, withHead, base) {
  const w = 132
  const ch = 100
  let out = `<g class="cab">`
  let y = base

  for (let i = 0; i < cabs; i++) {
    y -= ch
    out += cab(x, y, w, ch)
  }

  if (withHead) {
    y -= 40
    out += head(x, y, w)
  }

  return out + '</g>'
}

function monitor(x, y) {
  return `<g transform="translate(${x} ${y})"><path d="M0 0H70L62 -26L10 -36Z" fill="#0d080f" stroke="#2c1c2e" stroke-width="2.5"/><path d="M14 -28L58 -20" stroke="#3a2a40" stroke-width="2"/><circle cx="42" cy="-16" r="6" fill="#170d19"/></g>`
}

function drumKit() {
  const shell = (cx, cy, rx, ry, h) =>
    `<path d="M${cx - rx} ${cy}V${cy + h}A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + h}V${cy}Z" fill="#12090f" stroke="url(#chrome)" stroke-width="2"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#e8e2d4" stroke="url(#chrome)" stroke-width="3"/>`

  const cym = (cx, cy, rx, tilt, delay) =>
    `<g class="cym" style="animation-delay:-${delay}s"><path d="M${cx} ${cy}V${cy + 90}" stroke="#555" stroke-width="3"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="7" fill="url(#brass)" transform="rotate(${tilt} ${cx} ${cy})"/><ellipse cx="${cx}" cy="${cy - 1}" rx="${rx * 0.25}" ry="2" fill="#fff3c0" opacity="0.7" transform="rotate(${tilt} ${cx} ${cy})"/></g>`

  return `<rect x="640" y="598" width="320" height="24" fill="#140a16" stroke="#2c1a2e" stroke-width="2"/><rect x="640" y="612" width="320" height="3" fill="#ff2a2a" opacity="0.6" class="pulse"/>
<ellipse cx="800" cy="500" rx="170" ry="120" fill="url(#halo-r)" class="pulse"/>
${cym(668, 430, 50, -8, 0.2)}${cym(930, 436, 50, 8, 0.7)}${cym(1004, 472, 54, 4, 0.4)}
<path d="M642 520V596M638 596H650" stroke="#555" stroke-width="3"/><g class="cym"><ellipse cx="642" cy="510" rx="30" ry="5" fill="url(#brass)"/><ellipse cx="642" cy="517" rx="30" ry="5" fill="#a5822e"/></g>
<g transform="translate(800 466)"><circle cy="-14" r="13" fill="${INK}"/><path d="M-12 -16C-24 -4 -26 14 -18 24L18 24C26 14 24 -4 12 -16Z" fill="${INK}"/><path d="M-22 -2L22 -2L28 56L-28 56Z" fill="${INK}"/><g transform="translate(-24 4)"><g class="arm"><path d="M0 0L-24 26L-44 34" stroke="${INK}" stroke-width="9" stroke-linecap="round" fill="none"/><path d="M-44 34L-70 24" stroke="#e8d9b0" stroke-width="3" stroke-linecap="round"/></g></g><g transform="translate(24 4)"><g class="arm" style="animation-delay:-0.21s"><path d="M0 0L24 26L44 34" stroke="${INK}" stroke-width="9" stroke-linecap="round" fill="none"/><path d="M44 34L70 24" stroke="#e8d9b0" stroke-width="3" stroke-linecap="round"/></g></g></g>
<circle cx="800" cy="568" r="52" fill="#0e080f" stroke="url(#chrome)" stroke-width="5"/><circle cx="800" cy="568" r="38" fill="#1b0b16"/><path d="M800 540L806 561H828L810 573L817 594L800 581L783 594L790 573L772 561H794Z" fill="#ff2a2a" opacity="0.85"/>
${shell(748, 502, 32, 12, 22)}${shell(852, 502, 32, 12, 22)}
${shell(930, 556, 38, 14, 36)}<path d="M902 592L896 620M958 592L964 620" stroke="#555" stroke-width="3"/>
${shell(694, 548, 30, 10, 14)}<path d="M694 574V600" stroke="#555" stroke-width="3"/>`
}

function guitarBody(type) {
  if (type === 'v') {
    return {
      body: `<path d="M0 -9L-128 -62L-148 -49L-62 0L-148 49L-128 62L0 9Z" fill="url(#redbody)" stroke="#ffb0b0" stroke-width="1.5"/><rect x="-46" y="-9" width="7" height="18" fill="#d0d0d8"/><rect x="-32" y="-9" width="7" height="18" fill="#d0d0d8"/><rect x="-72" y="-10" width="6" height="20" fill="#9a9aa6"/><circle cx="-98" cy="-30" r="3.5" fill="#d9b24a"/><circle cx="-98" cy="30" r="3.5" fill="#d9b24a"/>`,
      neck: 125,
      head: 'M125 -8L158 -12L162 4L125 8Z',
    }
  }
  if (type === 'explorer') {
    return {
      body: `<path d="M0 -9L-45 -26L-82 -58L-100 -48L-86 -14L-128 14L-150 46L-132 54L-92 30L-60 36L-30 12L0 9Z" fill="url(#blackbody)" stroke="#8a8a96" stroke-width="1.5"/><rect x="-50" y="-8" width="7" height="16" fill="#e8e0cc"/><rect x="-36" y="-8" width="7" height="16" fill="#e8e0cc"/><rect x="-74" y="-6" width="6" height="18" fill="#9a9aa6"/><circle cx="-92" cy="8" r="3.5" fill="#d9b24a"/>`,
      neck: 125,
      head: 'M125 -8L160 -14L162 2L125 8Z',
    }
  }
  if (type === 'bass') {
    return {
      body: `<path d="M0 -9C-10 -22 -30 -26 -40 -22C-60 -42 -100 -44 -114 -22C-126 0 -114 28 -88 32C-70 34 -52 28 -40 24C-30 26 -10 18 0 9Z" fill="url(#whitebody)" stroke="#6a6a78" stroke-width="1.5"/><path d="M-30 -14C-24 -6 -24 6 -30 14L-70 20C-82 8 -82 -8 -70 -20Z" fill="#1a1216" opacity="0.8"/><rect x="-52" y="-10" width="8" height="20" fill="#c9c9d2"/><rect x="-72" y="-10" width="8" height="20" fill="#c9c9d2"/><rect x="-96" y="-8" width="8" height="16" fill="#8a8a96"/>`,
      neck: 170,
      head: 'M170 -7L200 -9L202 5L170 7Z',
    }
  }

  return {
    body: `<path d="M0 -10C-10 -26 -34 -34 -52 -30C-70 -50 -108 -52 -126 -34C-146 -14 -142 22 -122 38C-100 54 -62 50 -46 34C-26 30 -8 20 0 10Z" fill="url(#burst)" stroke="#ffd2a0" stroke-width="1.5"/><rect x="-58" y="-9" width="8" height="18" fill="#d0d0d8"/><rect x="-82" y="-9" width="8" height="18" fill="#d0d0d8"/><rect x="-108" y="-8" width="8" height="16" fill="#9a9aa6"/><circle cx="-92" cy="26" r="3.5" fill="#d9b24a"/><circle cx="-76" cy="30" r="3.5" fill="#d9b24a"/>`,
    neck: 125,
    head: 'M125 -8L158 -12L162 4L125 8Z',
  }
}

function guitar(type) {
  const g = guitarBody(type)
  let frets = ''

  for (let x = 14; x < g.neck; x += 15) {
    frets += `M${x} -5V5`
  }

  return `<g transform="translate(54 -118) rotate(-26) scale(0.9)">${g.body}<rect x="0" y="-6" width="${g.neck}" height="12" fill="#1c100b"/><rect x="0" y="-5" width="${g.neck}" height="10" fill="#3a2418"/><path d="${frets}" stroke="#a89880" stroke-width="1"/><path d="M-60 0H${g.neck + 30}" stroke="#d8d8e0" stroke-width="0.8" opacity="0.6"/><path d="${g.head}" fill="#1c100b" stroke="#6a5240" stroke-width="1"/><circle cx="${g.neck + 10}" cy="-6" r="2" fill="#c9c9d2"/><circle cx="${g.neck + 20}" cy="-7" r="2" fill="#c9c9d2"/><circle cx="${g.neck + 30}" cy="-8" r="2" fill="#c9c9d2"/></g>`
}

function player(x, scale, flip, type, tilt, wedge) {
  const hair = `<path d="M-10 -180C-44 -172 -54 -130 -36 -96C-28 -116 -16 -146 -8 -158Z" fill="${INK}"/><path d="M8 -180C30 -172 38 -140 30 -112C22 -130 16 -150 10 -160Z" fill="${INK}"/>`
  const frontLeg = wedge ? 'M8 -85L46 -72L58 -34' : 'M8 -85L30 -44L44 0'
  const wedgeShape = wedge ? `<path d="M34 0L104 0L94 -24L46 -34Z" fill="#0d080f" stroke="#3a2440" stroke-width="2.5"/>` : ''

  return `<g transform="translate(${x} 690) scale(${flip * scale} ${scale})">
<ellipse cx="0" cy="-90" rx="130" ry="110" fill="url(#halo-${type === 'v' ? 'a' : type === 'bass' ? 'v' : 'r'})" class="pulse"/>
${wedgeShape}
<g class="jam" style="--tilt:${tilt}deg">
<path d="M-6 -85L-26 -44L-36 0M${frontLeg.slice(1)}" stroke="${INK}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M-48 2H-24M${wedge ? '48 -30H72' : '28 2H56'}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
<path d="M-24 -152C-26 -128 -20 -100 -18 -84H18C20 -100 26 -128 24 -152Z" fill="${INK}"/>
<path d="M-18 -84H18V-76H-18Z" fill="#3a2a1a"/><rect x="-4" y="-84" width="8" height="8" fill="#b8932f"/>
<path d="M14 -148Q60 -112 90 -138" stroke="${INK}" stroke-width="10" stroke-linecap="round" fill="none"/>
${guitar(type)}
<path d="M-4 -152L-62 -66" stroke="#7a1520" stroke-width="5" opacity="0.9"/>
<g class="strum"><path d="M-12 -148Q-14 -118 20 -100" stroke="${INK}" stroke-width="10" stroke-linecap="round" fill="none"/></g>
<g class="bang"><circle cy="-170" r="14" fill="${INK}"/>${hair}</g>
</g></g>`
}

function singer() {
  return `<g transform="translate(800 690) scale(1.1)">
<ellipse cx="0" cy="-90" rx="140" ry="120" fill="url(#halo-w)" class="pulse"/>
<g class="jam" style="--tilt:2deg">
<path d="M34 0L28 -160" stroke="#333" stroke-width="4"/><path d="M28 -160Q24 -176 14 -174" stroke="#333" stroke-width="3" fill="none"/><ellipse cx="12" cy="-172" rx="7" ry="10" fill="#555" transform="rotate(50 12 -172)"/><path d="M26 0H46" stroke="#333" stroke-width="5" stroke-linecap="round"/>
<path d="M-6 -85L-28 -44L-34 0M6 -85L26 -44L24 0" stroke="${INK}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M-46 2H-22M10 2H40" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
<path d="M-24 -152C-26 -128 -20 -100 -18 -84H18C20 -100 26 -128 24 -152Z" fill="${INK}"/>
<path d="M-18 -84H18V-76H-18Z" fill="#3a2a1a"/><rect x="-5" y="-85" width="10" height="9" fill="#d9b24a"/>
<path d="M-16 -146Q-48 -176 -34 -222" stroke="${INK}" stroke-width="10" stroke-linecap="round" fill="none"/><circle cx="-34" cy="-228" r="8" fill="${INK}"/><path d="M-40 -234L-44 -246M-28 -234L-24 -246" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
<path d="M16 -146Q34 -134 24 -170" stroke="${INK}" stroke-width="10" stroke-linecap="round" fill="none"/>
<g class="bang"><circle cy="-170" r="14" fill="${INK}"/><path d="M-12 -182C-48 -176 -60 -126 -40 -88C-30 -112 -18 -146 -10 -160Z" fill="${INK}"/><path d="M10 -182C36 -174 44 -140 34 -108C24 -128 18 -150 12 -162Z" fill="${INK}"/></g>
</g></g>`
}

function flameJet(x, y, h, w, delay) {
  return `<g transform="translate(${x} ${y})"><path class="flame" style="animation-delay:-${delay}s" d="M${-w} 0C${-w * 1.4} ${-h * 0.35} ${-w * 0.3} ${-h * 0.56} 0 ${-h}C${w * 0.4} ${-h * 0.56} ${w * 1.4} ${-h * 0.35} ${w} 0Z" fill="url(#flame)"/><path class="flame" style="animation-delay:-${delay + 0.5}s" d="M${-w * 0.45} 0C${-w * 0.7} ${-h * 0.22} ${-w * 0.1} ${-h * 0.36} 0 ${-h * 0.6}C${w * 0.2} ${-h * 0.36} ${w * 0.7} ${-h * 0.22} ${w * 0.45} 0Z" fill="#ffe9a0" opacity="0.8"/></g>`
}

function sparks() {
  const r = rng(21)
  let out = ''

  for (let i = 0; i < 28; i++) {
    const x = r() < 0.5 ? 85 + r() * 50 : 1465 + r() * 50
    const dur = (3 + r() * 3).toFixed(1)
    const delay = (r() * 6).toFixed(1)
    const dx = ((r() - 0.5) * 80).toFixed(0)

    out += `<circle cx="${f(x)}" cy="650" r="${f(1.5 + r() * 2)}" fill="#ffb347" class="spark" style="--dx:${dx}px;animation-duration:${dur}s;animation-delay:-${delay}s"/>`
  }

  return out
}

function person(x, y, s, spec, r) {
  const fill = spec.fill
  const dur = (0.8 + r() * 0.8).toFixed(2)
  const delay = (r() * 2).toFixed(2)
  const bob = spec.bob ? ` class="bob" style="animation-duration:${dur}s;animation-delay:-${delay}s"` : ''
  const hr = 15 * s
  let g = `<g transform="translate(${f(x)} ${f(y)})"><g${bob}>`

  g += `<path d="M${f(-36 * s)} ${f(90 * s)}C${f(-36 * s)} ${f(10 * s)} ${f(-22 * s)} ${f(-4 * s)} 0 ${f(-4 * s)}C${f(22 * s)} ${f(-4 * s)} ${f(36 * s)} ${f(10 * s)} ${f(36 * s)} ${f(90 * s)}Z" fill="${fill}"/>`
  g += `<circle cy="${f(-20 * s)}" r="${f(hr)}" fill="${fill}"/>`

  if (r() < 0.45) {
    g += `<path d="M${f(-hr)} ${f(-22 * s)}C${f(-hr - 6 * s)} ${f(10 * s)} ${f(-hr - 2 * s)} ${f(26 * s)} ${f(-6 * s)} ${f(24 * s)}L${f(6 * s)} ${f(24 * s)}C${f(hr + 2 * s)} ${f(26 * s)} ${f(hr + 6 * s)} ${f(10 * s)} ${f(hr)} ${f(-22 * s)}Z" fill="${fill}"/>`
  }

  g += `<path d="M${f(-hr)} ${f(-22 * s)}A${f(hr)} ${f(hr)} 0 0 1 ${f(hr)} ${f(-22 * s)}" fill="none" stroke="${spec.rim}" stroke-width="${f(Math.max(1.5, 2 * s))}" opacity="${spec.rimOp}"/>`

  const arms = r() < spec.arms ? (r() < 0.35 ? 2 : 1) : 0
  const firstSide = r() < 0.5 ? -1 : 1

  for (let a = 0; a < arms; a++) {
    const side = a === 0 ? firstSide : -firstSide
    const sx = side * 22 * s
    const hx = side * (30 + r() * 14) * s
    const hy = (-70 - r() * 26) * s
    const k = r()

    g += `<g class="wave" style="animation-delay:-${(r() * 1.3).toFixed(2)}s"><path d="M${f(sx)} ${f(8 * s)}L${f(hx)} ${f(hy)}" stroke="${fill}" stroke-width="${f(11 * s)}" stroke-linecap="round"/>`

    if (k < 0.45) {
      g += `<circle cx="${f(hx)}" cy="${f(hy - 4 * s)}" r="${f(8 * s)}" fill="${fill}"/>`
    } else if (k < 0.7) {
      g += `<circle cx="${f(hx)}" cy="${f(hy - 4 * s)}" r="${f(8 * s)}" fill="${fill}"/><path d="M${f(hx - 4 * s)} ${f(hy - 8 * s)}L${f(hx - 7 * s)} ${f(hy - 20 * s)}M${f(hx + 4 * s)} ${f(hy - 8 * s)}L${f(hx + 7 * s)} ${f(hy - 20 * s)}" stroke="${fill}" stroke-width="${f(4 * s)}" stroke-linecap="round"/>`
    } else if (k < 0.86) {
      g += `<g class="glint"><circle cx="${f(hx)}" cy="${f(hy - 6 * s)}" r="${f(22 * s)}" fill="#cfe0ff" opacity="0.14"/></g><rect x="${f(hx - 5 * s)}" y="${f(hy - 22 * s)}" width="${f(10 * s)}" height="${f(16 * s)}" rx="${f(2 * s)}" fill="#dfeaff"/>`
    } else {
      g += `<g class="glint"><circle cx="${f(hx)}" cy="${f(hy - 14 * s)}" r="${f(18 * s)}" fill="#ff9a2a" opacity="0.18"/><ellipse cx="${f(hx)}" cy="${f(hy - 14 * s)}" rx="${f(3.5 * s)}" ry="${f(7.5 * s)}" fill="#ffb347"/></g><circle cx="${f(hx)}" cy="${f(hy - 4 * s)}" r="${f(7 * s)}" fill="${fill}"/>`
    }
    g += '</g>'
  }

  return g + '</g></g>'
}

function crowdRow(spec, seed) {
  const r = rng(seed)
  const step = 1700 / spec.n
  let out = ''

  for (let i = 0; i < spec.n; i++) {
    const x = (i + 0.5) * step - 50 + (r() - 0.5) * step * 0.6
    const s = spec.s * (0.9 + r() * 0.25)
    const y = spec.y + (r() - 0.5) * spec.jit

    out += person(x, y, s, spec, r)
  }

  return out
}

const ROWS = [
  { y: 724, s: 0.5, n: 40, jit: 8, fill: '#1f0e24', rim: '#ff4a5a', rimOp: 0.75, arms: 0.4, bob: false },
  { y: 756, s: 0.68, n: 30, jit: 10, fill: '#150a1b', rim: '#ff4a5a', rimOp: 0.6, arms: 0.5, bob: true },
  { y: 800, s: 0.95, n: 21, jit: 14, fill: '#0c0511', rim: '#d14aff', rimOp: 0.45, arms: 0.55, bob: true },
  { y: 862, s: 1.4, n: 13, jit: 18, fill: '#040207', rim: '#ff7a3a', rimOp: 0.3, arms: 0.5, bob: true },
]

function surfer() {
  let hands = ''

  for (let i = 0; i < 7; i++) {
    hands += `<path d="M${-60 + i * 20} 10V24" stroke="#0c0511" stroke-width="7" stroke-linecap="round"/><circle cx="${-60 + i * 20}" cy="26" r="6" fill="#0c0511"/>`
  }

  return `<g class="surf"><g transform="translate(0 742)"><ellipse rx="52" ry="11" fill="#07030a"/><circle cx="-56" cy="-8" r="10" fill="#07030a"/><path d="M-62 -14C-76 -8 -82 4 -78 14" stroke="#07030a" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M44 -2L74 -10L86 -22M44 4L78 6L92 0" stroke="#07030a" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M-20 -10L-6 -34M10 -9L28 -30" stroke="#07030a" stroke-width="7" stroke-linecap="round"/><path d="M-60 -11H50" stroke="#ff4a5a" stroke-width="1.5" opacity="0.5"/>${hands}</g></g>`
}

function flag() {
  return `<path d="M1262 820V712" stroke="#1a1018" stroke-width="4"/><g class="flag"><path d="M1262 714H1352L1336 744L1352 774H1262Z" fill="#8a0f1a"/><path d="M1300 726L1286 748H1304L1294 768L1322 742H1306L1316 726Z" fill="#ffd24a"/></g>`
}

function barrier() {
  let posts = ''

  for (let x = 0; x <= 1600; x += 100) {
    posts += `<path d="M${x} 706V724" stroke="#4a4a58" stroke-width="4"/>`
  }

  return `<rect x="0" y="708" width="1600" height="5" fill="#8a8a98"/><rect x="0" y="708" width="1600" height="1.5" fill="#fff" opacity="0.4"/>${posts}`
}

function build() {
  const stacksL = ampStack(138, 2, true, 650) + ampStack(278, 1, true, 650)
  const stacksR = ampStack(1330, 2, true, 650) + ampStack(1190, 1, true, 650)
  const truss1 = [230, 410, 590, 800, 1010, 1190, 1370]
  const canColors = ['red', 'violet', 'amber', 'white', 'amber', 'violet', 'red']
  const heads = [520, 660, 800, 940, 1080]
  const headColors = ['cyan', 'green', 'white', 'green', 'cyan']

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
${defs()}
${STYLE}
<rect width="1600" height="900" fill="url(#sky)"/>
<ellipse cx="800" cy="620" rx="820" ry="280" fill="url(#glow)"/>
${screen()}
${curtains()}
${pa(32, 70, 100, 6)}${pa(1498, 70, 100, 6)}
${truss(130, 1470, 62)}
${truss(380, 1220, 138)}
<path d="M130 62V0M1470 62V0M380 138V90M1220 138V90M800 62V0" stroke="#2a2030" stroke-width="2"/>
${truss1.map((x, i) => can(x, 90, canColors[i])).join('')}
${heads.map((x, i) => can(x, 168, headColors[i])).join('')}
<g opacity="0.85">
${truss1.map((x, i) => beam(x, 120, canColors[i], 14 + (i % 3) * 3, 7 + i, 1 + i * 0.9, 70 + (i % 2) * 20, 640)).join('')}
${heads.map((x, i) => beam(x, 198, headColors[i], 26, 5 + i * 1.4, i * 1.3, 22, 560)).join('')}
</g>
<g class="haze"><ellipse cx="500" cy="580" rx="540" ry="64" fill="#8a2a4a" opacity="0.5"/><ellipse cx="1150" cy="600" rx="540" ry="58" fill="#6a2a8a" opacity="0.5"/></g>
<rect x="0" y="598" width="1600" height="106" fill="url(#floor)"/>
<rect x="0" y="596" width="1600" height="5" fill="#2a1020"/>
<ellipse cx="800" cy="676" rx="300" ry="20" fill="#ffd0b0" opacity="0.14" class="pulse"/><ellipse cx="480" cy="680" rx="170" ry="14" fill="#ffb020" opacity="0.16" class="pulse"/><ellipse cx="1120" cy="680" rx="170" ry="14" fill="#b44cff" opacity="0.2" class="pulse"/>
${stacksL}${stacksR}
${drumKit()}
${monitor(380, 700)}${monitor(640, 700)}${monitor(890, 700)}${monitor(1140, 700)}
${player(330, 1.0, 1, 'les', 3, false)}
${player(520, 1.1, 1, 'v', 4, true)}
${player(1100, 1.05, -1, 'bass', 3, false)}
${player(1290, 1.08, -1, 'explorer', 5, false)}
${singer()}
<rect x="0" y="690" width="1600" height="16" fill="#1a0a16"/><rect x="0" y="692" width="1600" height="3" fill="#ff2a2a" opacity="0.8" class="pulse"/>
${flameJet(108, 650, 240, 36, 0)}${flameJet(1492, 650, 240, 36, 0.4)}${flameJet(630, 616, 130, 18, 0.7)}${flameJet(970, 616, 130, 18, 0.2)}
${sparks()}
${barrier()}
${crowdRow(ROWS[0], 11)}
${crowdRow(ROWS[1], 23)}
${surfer()}
${crowdRow(ROWS[2], 37)}
${flag()}
${crowdRow(ROWS[3], 51)}
<rect x="0" y="640" width="1600" height="260" fill="url(#fog)" class="haze"/>
<rect width="1600" height="900" fill="url(#vig)"/>
</svg>`
}

export const SCENE = build()
