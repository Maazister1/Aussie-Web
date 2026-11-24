// Generates SVG logos for the (fictional) client brands into assets/logos/
const fs = require('fs');
const path = require('path');
const OUT = path.join(process.argv[2], 'assets', 'logos');
fs.mkdirSync(OUT, { recursive: true });

const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

const logo = (w, icon, text) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 64" width="${w}" height="64">${icon}${text}</svg>`;

const LOGOS = {
  'bondi-bakehouse': logo(250,
    `<circle cx="30" cy="26" r="12" fill="#FF6101"/><path d="M6 40c6-5 12-5 18 0s12 5 18 0 12-5 18 0" stroke="#03215C" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M6 50c6-5 12-5 18 0s12 5 18 0" stroke="#03215C" stroke-width="4" fill="none" stroke-linecap="round" opacity=".5"/>`,
    `<text x="72" y="32" font-family="${SANS}" font-size="22" font-weight="800" fill="#03215C" letter-spacing="-.5">bondi</text><text x="72" y="52" font-family="${SERIF}" font-style="italic" font-size="17" fill="#FF6101">bakehouse</text>`),

  'harbour-legal': logo(250,
    `<path d="M6 46 Q32 6 58 46" stroke="#03215C" stroke-width="5" fill="none"/><path d="M6 46h52" stroke="#03215C" stroke-width="5"/><path d="M16 46V34M24 46V25M32 46V22M40 46V25M48 46V34" stroke="#03215C" stroke-width="2.5"/>`,
    `<text x="72" y="33" font-family="${SERIF}" font-size="21" font-weight="700" fill="#03215C" letter-spacing="3">HARBOUR</text><text x="73" y="51" font-family="${SANS}" font-size="11" font-weight="600" fill="#0644BD" letter-spacing="7">LEGAL</text>`),

  'koala-fitness': logo(220,
    `<circle cx="14" cy="20" r="10" fill="#5B6B7A"/><circle cx="50" cy="20" r="10" fill="#5B6B7A"/><circle cx="14" cy="20" r="5" fill="#C9D3DC"/><circle cx="50" cy="20" r="5" fill="#C9D3DC"/><circle cx="32" cy="34" r="18" fill="#7A8B99"/><ellipse cx="32" cy="38" rx="6" ry="8" fill="#120902"/><circle cx="24" cy="30" r="2.5" fill="#120902"/><circle cx="40" cy="30" r="2.5" fill="#120902"/>`,
    `<text x="64" y="42" font-family="${SANS}" font-size="27" font-weight="800" fill="#120902" letter-spacing="-1">koala</text><text x="140" y="42" font-family="${SANS}" font-size="27" font-weight="300" fill="#24665A" letter-spacing="-1">fit</text>`),

  'outback-coffee': logo(260,
    `<ellipse cx="30" cy="32" rx="18" ry="24" fill="#3B2A1E" transform="rotate(25 30 32)"/><path d="M22 12 C36 24 24 40 38 52" stroke="#E9C9A5" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    `<text x="64" y="34" font-family="${SANS}" font-size="22" font-weight="900" fill="#3B2A1E" letter-spacing="2">OUTBACK</text><text x="65" y="52" font-family="${SANS}" font-size="11" font-weight="600" fill="#D96E34" letter-spacing="5.2">COFFEE CO.</text>`),

  'surf-coast-realty': logo(260,
    `<path d="M8 30 L32 10 L56 30" stroke="#0644BD" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M6 44c7-6 13-6 20 0s13 6 20 0 9-4 12-2" stroke="#249AFF" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    `<text x="70" y="36" font-family="${SANS}" font-size="23" font-weight="700" fill="#03215C" letter-spacing="-.5">surfcoast</text><text x="71" y="53" font-family="${SANS}" font-size="11" font-weight="500" fill="#249AFF" letter-spacing="6">REALTY</text>`),

  'wattle-co': logo(220,
    `<g fill="#EEBD19"><circle cx="20" cy="20" r="8"/><circle cx="38" cy="16" r="7"/><circle cx="30" cy="34" r="9"/><circle cx="48" cy="32" r="6"/><circle cx="16" cy="40" r="6"/></g><path d="M30 44 V60" stroke="#3F4B3C" stroke-width="3" stroke-linecap="round"/>`,
    `<text x="66" y="42" font-family="${SERIF}" font-size="28" font-style="italic" fill="#3F4B3C">Wattle &amp; Co.</text>`),

  'southern-cross-dental': logo(280,
    `<g fill="#0A8F86"><path d="M32 4l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.5-6.2 4.5 2.3-7.3-6.1-4.5h7.6z"/><circle cx="12" cy="32" r="4"/><circle cx="52" cy="28" r="4"/><circle cx="32" cy="54" r="5"/><circle cx="42" cy="40" r="2.5"/></g>`,
    `<text x="70" y="32" font-family="${SANS}" font-size="19" font-weight="700" fill="#03215C">Southern Cross</text><text x="71" y="51" font-family="${SANS}" font-size="12" font-weight="500" fill="#0A8F86" letter-spacing="5">DENTAL</text>`),

  'kangaroo-kids': logo(240,
    `<circle cx="18" cy="24" r="14" fill="#FF6101"/><circle cx="44" cy="20" r="10" fill="#0644BD"/><circle cx="38" cy="46" r="12" fill="#66BB5D"/><circle cx="14" cy="50" r="7" fill="#EEBD19"/>`,
    `<text x="66" y="40" font-family="${SANS}" font-size="25" font-weight="800" fill="#03215C" letter-spacing="-1">roo</text><text x="114" y="40" font-family="${SANS}" font-size="25" font-weight="800" fill="#FF6101" letter-spacing="-1">kids</text>`),

  'red-centre-tours': logo(260,
    `<circle cx="40" cy="20" r="10" fill="#EEBD19"/><path d="M4 50 C10 34 20 30 32 30 S52 34 60 50 Z" fill="#C2410C"/><path d="M2 52h60" stroke="#7C2D12" stroke-width="3" stroke-linecap="round"/>`,
    `<text x="72" y="35" font-family="${SANS}" font-size="22" font-weight="800" fill="#7C2D12" letter-spacing="1">RED CENTRE</text><text x="73" y="52" font-family="${SANS}" font-size="11" font-weight="600" fill="#C2410C" letter-spacing="8">TOURS</text>`),

  'byron-botanicals': logo(260,
    `<path d="M32 58 C10 46 8 20 32 6 C56 20 54 46 32 58 Z" fill="#24665A"/><path d="M32 58 V18 M32 30 l-9-7 M32 40 l10-8 M32 48 l-8-6" stroke="#D4FFCF" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
    `<text x="68" y="34" font-family="${SERIF}" font-size="22" fill="#24665A">Byron</text><text x="69" y="52" font-family="${SANS}" font-size="11" font-weight="600" fill="#79BF71" letter-spacing="4.5">BOTANICALS</text>`)
};

for (const [name, svg] of Object.entries(LOGOS)) {
  fs.writeFileSync(path.join(OUT, name + '.svg'), svg);
}
console.log('logos:', Object.keys(LOGOS).length);
