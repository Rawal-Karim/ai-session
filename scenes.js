// Flat illustrations for the presentation. Rawal (blue jumper) appears in every scene.
(function () {
  const K = {
    ink: "#141414", wall: "#e8e8e3", floor: "#cfcfc8", white: "#ffffff", g1: "#c4c4bd", g2: "#94948d", g3: "#5d5d58",
    blue: "#2346d8", blueL: "#cdd6fb", yellow: "#f5d04a", s1: "#ecd3bc", s2: "#c99b78", s3: "#8e6447", hair: "#1d1d1d", night: "#232a4d",
  };
  const st = `stroke="${K.ink}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;

  // upper body; (x, y) is the top of the head
  function bust(x, y, s, o = {}) {
    const skin = o.skin || K.s2, shirt = o.shirt || K.g2, hair = o.hair || K.hair;
    const r = 26 * s;
    const hairPath = o.long
      ? `<path d="M${x - r - 4 * s},${y + 66 * s} L${x - r - 3 * s},${y + 24 * s} A${r + 3 * s},${r + 3 * s} 0 0 1 ${x + r + 3 * s},${y + 24 * s} L${x + r + 4 * s},${y + 66 * s} Z" fill="${hair}"/>`
      : `<path d="M${x - r - 1 * s},${y + 28 * s} A${r + 1 * s},${r + 1 * s} 0 0 1 ${x + r + 1 * s},${y + 24 * s} Q${x + 6 * s},${y + 8 * s} ${x - r - 1 * s},${y + 28 * s} Z" fill="${hair}"/>`;
    const collar = o.suit ? `<path d="M${x - 12 * s},${y + 60 * s} L${x},${y + 84 * s} L${x + 12 * s},${y + 60 * s} Z" fill="${K.white}"/><path d="M${x - 3 * s},${y + 66 * s} L${x + 3 * s},${y + 66 * s} L${x + 2 * s},${y + 84 * s} L${x - 2 * s},${y + 84 * s} Z" fill="${K.blue}"/>` : "";
    const tag = o.tag ? `<rect x="${x + 14 * s}" y="${y + 80 * s}" width="${22 * s}" height="${12 * s}" rx="${2 * s}" fill="${K.yellow}"/>` : "";
    return `${o.long ? hairPath : ""}
      <rect x="${x - 9 * s}" y="${y + 44 * s}" width="${18 * s}" height="${20 * s}" fill="${skin}"/>
      <path d="M${x - 50 * s},${y + 150 * s} L${x - 50 * s},${y + 94 * s} Q${x - 50 * s},${y + 62 * s} ${x - 18 * s},${y + 60 * s} L${x + 18 * s},${y + 60 * s} Q${x + 50 * s},${y + 62 * s} ${x + 50 * s},${y + 94 * s} L${x + 50 * s},${y + 150 * s} Z" fill="${shirt}" ${st}/>
      ${collar}${tag}
      <circle cx="${x}" cy="${y + r}" r="${r}" fill="${skin}" ${st}/>
      ${o.long ? "" : hairPath}
      <circle cx="${x - 8 * s}" cy="${y + 30 * s}" r="${2.6 * s}" fill="${K.ink}"/><circle cx="${x + 8 * s}" cy="${y + 30 * s}" r="${2.6 * s}" fill="${K.ink}"/>`;
  }
  // full figure; (x, feet) is the point between the feet
  function stand(x, feet, s, o = {}) {
    const top = feet - 220 * s;
    const pants = o.pants || K.g3;
    return `<rect x="${x - 22 * s}" y="${top + 140 * s}" width="${19 * s}" height="${80 * s}" fill="${pants}" ${st}/>
      <rect x="${x + 3 * s}" y="${top + 140 * s}" width="${19 * s}" height="${80 * s}" fill="${pants}" ${st}/>
      ${bust(x, top, s, o)}`;
  }
  const bubble = (x, y, w, h, text, size = 17, tail = "left") => {
    const tx = tail === "left" ? x + 30 : x + w - 30;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${K.white}" ${st}/>
      <path d="M${tx - 10},${y + h - 1.5} L${tx - 4},${y + h + 16} L${tx + 12},${y + h - 1.5}" fill="${K.white}" ${st}/>
      <rect x="${tx - 12}" y="${y + h - 5}" width="26" height="6" fill="${K.white}"/>
      <text x="${x + w / 2}" y="${y + h / 2 + size * 0.35}" text-anchor="middle" font-size="${size}" font-family="DM Sans, Arial, sans-serif" font-weight="600" fill="${K.ink}">${text}</text>`;
  };
  const RAWAL = { shirt: K.blue, skin: K.s2 };

  const SCENES = {
    fair: () => `
      <rect width="600" height="400" fill="${K.wall}"/><rect y="330" width="600" height="70" fill="${K.floor}"/>
      <path d="M0,28 Q300,70 600,28" fill="none" stroke="${K.g3}" stroke-width="2"/>
      ${Array.from({ length: 11 }, (_, i) => { const x = 18 + i * 54, y = 28 + Math.sin((i / 10) * Math.PI) * 21; return `<path d="M${x},${y} L${x + 32},${y + 2} L${x + 15},${y + 34} Z" fill="${[K.blue, K.white, K.yellow][i % 3]}" stroke="${K.ink}" stroke-width="2"/>`; }).join("")}
      <rect x="120" y="84" width="270" height="52" rx="6" fill="${K.blue}" ${st}/>
      <text x="255" y="119" text-anchor="middle" font-size="27" font-weight="700" letter-spacing="4" font-family="DM Sans, Arial, sans-serif" fill="${K.white}">CLUB FAIR</text>
      ${bust(185, 160, 0.95, RAWAL)}
      ${bust(300, 166, 0.92, { shirt: K.g1, skin: K.s1, long: true })}
      <rect x="95" y="282" width="290" height="62" rx="4" fill="${K.white}" ${st}/>
      <rect x="95" y="314" width="290" height="10" fill="${K.blue}"/>
      <path d="M118,344 V392 M362,344 V392" stroke="${K.ink}" stroke-width="4"/>
      <path d="M140,282 L150,254 L222,254 L232,282 Z" fill="${K.yellow}" ${st}/>
      <text x="186" y="274" text-anchor="middle" font-size="14" font-weight="700" font-family="DM Sans, Arial, sans-serif" fill="${K.ink}">REGISTER</text>
      <rect x="282" y="268" width="56" height="14" rx="2" fill="${K.g2}" ${st}/>
      ${stand(475, 392, 0.86, { shirt: K.g3, skin: K.s3 })}
      ${stand(548, 396, 0.78, { shirt: K.g1, skin: K.s1, long: true, pants: K.g2 })}
      ${bubble(380, 116, 205, 48, "Where do we register?", 16, "right")}`,

    desk: () => `
      <rect width="600" height="400" fill="#d9dbe4"/><rect y="320" width="600" height="80" fill="#c5c7cf"/>
      <rect x="40" y="40" width="170" height="130" rx="4" fill="${K.night}" ${st}/>
      <path d="M125,40 V170 M40,105 H210" stroke="${K.ink}" stroke-width="3"/>
      <circle cx="82" cy="74" r="16" fill="${K.yellow}"/><circle cx="90" cy="69" r="14" fill="${K.night}"/>
      <circle cx="170" cy="62" r="2.5" fill="#fff"/><circle cx="152" cy="140" r="2" fill="#fff"/><circle cx="72" cy="140" r="2" fill="#fff"/>
      <circle cx="520" cy="78" r="38" fill="${K.white}" ${st}/><path d="M520,78 V54 M520,78 L536,88" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>
      ${bust(400, 128, 1, RAWAL)}
      <rect x="200" y="282" width="390" height="18" fill="${K.g3}" ${st}/>
      <path d="M226,300 V398 M564,300 V398" stroke="${K.ink}" stroke-width="5"/>
      <path d="M318,280 L332,194 L470,194 L484,280 Z" fill="${K.g1}" ${st}/>
      <circle cx="401" cy="236" r="9" fill="${K.white}"/>
      <rect x="300" y="276" width="200" height="8" rx="3" fill="${K.g2}" ${st}/>
      <path d="M236,282 L246,236 M226,236 H266 L258,214 H234 Z" fill="${K.yellow}" ${st}/>
      <rect x="512" y="262" width="54" height="20" rx="2" fill="${K.white}" ${st} transform="rotate(-6 539 272)"/>`,

    library: () => `
      <rect width="600" height="400" fill="${K.wall}"/><rect y="330" width="600" height="70" fill="${K.floor}"/>
      <rect x="28" y="36" width="250" height="300" fill="${K.g3}" ${st}/>
      ${[0, 1, 2, 3].map((r) => { let x = 42; const y = 52 + r * 72; let s = ""; let i = 0;
        while (x < 252) { const w = 14 + ((r * 7 + i * 5) % 12), h = 46 + ((r * 3 + i * 7) % 16); const fill = [K.white, K.g1, K.blue, K.g2, K.yellow, K.white][(r + i) % 6];
          s += `<rect x="${x}" y="${y + 58 - h}" width="${w}" height="${h}" fill="${fill}" stroke="${K.ink}" stroke-width="2"/>`; x += w + 3; i++; }
        return s + `<rect x="36" y="${y + 58}" width="234" height="8" fill="${K.ink}"/>`; }).join("")}
      ${bust(440, 140, 1, RAWAL)}
      <rect x="300" y="290" width="290" height="16" fill="${K.g3}" ${st}/>
      <path d="M320,306 V396 M570,306 V396" stroke="${K.ink}" stroke-width="5"/>
      <path d="M368,288 L380,214 L500,214 L512,288 Z" fill="${K.g1}" ${st}/>
      <rect x="352" y="284" width="176" height="8" rx="3" fill="${K.g2}" ${st}/>
      <rect x="300" y="60" width="150" height="84" rx="10" fill="${K.white}" ${st}/>
      <path d="M318,84 H430 M318,102 H414 M318,120 H386" stroke="${K.g2}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="470" cy="70" r="26" fill="${K.yellow}" ${st}/>
      <text x="470" y="81" text-anchor="middle" font-size="32" font-weight="700" font-family="DM Sans, Arial, sans-serif" fill="${K.ink}">?</text>`,

    hotel: () => `
      <rect width="600" height="400" fill="#e2e7f6"/><rect y="340" width="600" height="60" fill="${K.floor}"/>
      <circle cx="510" cy="70" r="34" fill="${K.yellow}"/>
      <rect x="170" y="70" width="270" height="272" fill="${K.white}" ${st}/>
      <rect x="220" y="44" width="170" height="42" rx="4" fill="${K.ink}"/>
      <text x="305" y="73" text-anchor="middle" font-size="22" font-weight="700" letter-spacing="5" font-family="DM Sans, Arial, sans-serif" fill="${K.white}">HOTEL</text>
      ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${192 + c * 60}" y="${104 + r * 56}" width="38" height="36" fill="${(r + c) % 3 ? K.blueL : K.yellow}" stroke="${K.ink}" stroke-width="2"/>`).join("")).join("")}
      <rect x="276" y="274" width="58" height="68" fill="${K.blue}" ${st}/>
      <rect x="92" y="230" width="16" height="112" fill="${K.g3}" ${st}/>
      <circle cx="100" cy="200" r="58" fill="${K.g1}" ${st}/><circle cx="70" cy="226" r="34" fill="${K.g1}" ${st}/><circle cx="132" cy="222" r="36" fill="${K.g1}" ${st}/>
      <path d="M60,222 Q100,250 140,222" fill="${K.g1}" stroke="none"/>
      ${stand(510, 392, 0.8, RAWAL)}
      <rect x="532" y="250" width="22" height="36" rx="4" fill="${K.ink}" transform="rotate(12 543 268)"/>`,

    reception: () => `
      <rect width="600" height="400" fill="${K.wall}"/><rect y="330" width="600" height="70" fill="${K.floor}"/>
      <rect x="70" y="34" width="230" height="44" rx="4" fill="${K.ink}"/>
      <text x="185" y="63" text-anchor="middle" font-size="20" font-weight="700" letter-spacing="5" font-family="DM Sans, Arial, sans-serif" fill="${K.white}">RECEPTION</text>
      <rect x="330" y="40" width="120" height="76" rx="4" fill="${K.g1}" ${st}/>
      ${[0, 1, 2, 3].map((i) => `<circle cx="${352 + i * 26}" cy="62" r="4" fill="${K.ink}"/><rect x="${347 + i * 26}" y="70" width="10" height="${i % 2 ? 22 : 30}" rx="2" fill="${K.yellow}"/>`).join("")}
      ${bust(200, 128, 1, { ...RAWAL, tag: true })}
      <rect x="50" y="250" width="330" height="96" fill="${K.white}" ${st}/>
      <rect x="50" y="250" width="330" height="18" fill="${K.blue}" ${st}/>
      <rect x="272" y="196" width="78" height="54" rx="4" fill="${K.ink}"/>
      <rect x="282" y="205" width="58" height="34" fill="${K.blueL}"/>
      <path d="M90,250 Q104,226 118,250 Z" fill="${K.yellow}" ${st}/>
      <rect x="462" y="286" width="58" height="72" rx="6" fill="${K.g3}" ${st}/>
      <path d="M478,286 V272 H504 V286" fill="none" stroke="${K.ink}" stroke-width="4"/>
      ${stand(530, 392, 0.86, { shirt: K.g2, skin: K.s1, long: true, pants: K.g3 })}
      ${bubble(410, 96, 150, 48, "Room not ready!", 15, "right")}`,

    interview: () => `
      <rect width="600" height="400" fill="${K.wall}"/><rect y="330" width="600" height="70" fill="${K.floor}"/>
      <rect x="236" y="40" width="130" height="100" rx="4" fill="${K.blueL}" ${st}/><path d="M301,40 V140" stroke="${K.ink}" stroke-width="3"/>
      <path d="M520,330 L506,268 H566 L552,330 Z" fill="${K.white}" ${st}/>
      <path d="M536,268 Q510,220 520,190 M536,268 Q540,214 560,196 M536,268 Q530,230 546,206" fill="none" stroke="${K.ink}" stroke-width="7" stroke-linecap="round"/>
      ${bust(160, 132, 1, { shirt: K.ink, skin: K.s3, suit: true })}
      ${bust(410, 132, 1, RAWAL)}
      <rect x="90" y="282" width="400" height="16" fill="${K.g3}" ${st}/>
      <path d="M120,298 V396 M460,298 V396" stroke="${K.ink}" stroke-width="5"/>
      <rect x="200" y="270" width="70" height="12" fill="${K.white}" ${st} transform="rotate(-4 235 276)"/>
      ${bubble(48, 66, 150, 46, "Tell me about&#8230;", 15)}`,

    pair: () => `
      <rect width="600" height="400" fill="${K.wall}"/><rect y="330" width="600" height="70" fill="${K.floor}"/>
      ${stand(150, 380, 0.95, { shirt: K.g1, skin: K.s1, long: true, pants: K.g3 })}
      ${stand(450, 380, 0.95, RAWAL)}
      <path d="M232,150 C276,120 324,120 368,150" fill="none" stroke="${K.blue}" stroke-width="6" stroke-linecap="round"/>
      <path d="M348,128 L370,152 L342,162" fill="none" stroke="${K.blue}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M368,206 C324,236 276,236 232,206" fill="none" stroke="${K.blue}" stroke-width="6" stroke-linecap="round"/>
      <path d="M252,228 L230,204 L258,194" fill="none" stroke="${K.blue}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,

    coffee: () => `
      <rect width="600" height="400" fill="#2b2b2b"/>
      <ellipse cx="300" cy="330" rx="190" ry="26" fill="${K.g3}" ${st}/>
      <path d="M170,170 H430 V250 Q430,320 300,320 Q170,320 170,250 Z" fill="${K.white}" ${st}/>
      <rect x="170" y="200" width="260" height="26" fill="${K.blue}"/>
      <path d="M430,192 Q500,192 494,244 Q488,286 424,284" fill="none" stroke="${K.ink}" stroke-width="16"/>
      <path d="M430,192 Q500,192 494,244 Q488,286 424,284" fill="none" stroke="${K.white}" stroke-width="9"/>
      ${[240, 300, 360].map((x) => `<path d="M${x},150 Q${x - 18},120 ${x},94 Q${x + 18},68 ${x},40" fill="none" stroke="#e8e8e8" stroke-width="6" stroke-linecap="round" opacity=".75"/>`).join("")}`,
  };

  window.SCENES = (name) => `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">${SCENES[name]()}</svg>`;
})();
