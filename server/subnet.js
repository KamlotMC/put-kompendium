/**
 * Pure IPv4 subnetting engine for Exam Question #60 & interactive binary calculator.
 */

export function parseIpv4(ipStr) {
  if (typeof ipStr !== 'string') return null;
  const parts = ipStr.trim().split('.');
  if (parts.length !== 4) return null;
  let num = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p)) return null;
    const v = Number(p);
    if (v < 0 || v > 255) return null;
    num = ((num << 8) | v) >>> 0;
  }
  return num >>> 0;
}

export function intToIpv4(num) {
  const u = num >>> 0;
  return [(u >>> 24) & 255, (u >>> 16) & 255, (u >>> 8) & 255, u & 255].join('.');
}

export function intToBinaryOctets(num) {
  const u = num >>> 0;
  return [
    ((u >>> 24) & 255).toString(2).padStart(8, '0'),
    ((u >>> 16) & 255).toString(2).padStart(8, '0'),
    ((u >>> 8) & 255).toString(2).padStart(8, '0'),
    (u & 255).toString(2).padStart(8, '0'),
  ].join('.');
}

export function prefixToMaskInt(prefix) {
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) return null;
  if (prefix === 0) return 0;
  return (0xffffffff << (32 - prefix)) >>> 0;
}

export function maskStrToPrefix(maskStr) {
  if (typeof maskStr === 'number' && Number.isInteger(maskStr) && maskStr >= 0 && maskStr <= 32) {
    return maskStr;
  }
  const s = String(maskStr ?? '').trim();
  if (/^\/?\d{1,2}$/.test(s)) {
    const p = Number(s.replace('/', ''));
    return p >= 0 && p <= 32 ? p : null;
  }
  const maskInt = parseIpv4(s);
  if (maskInt === null) return null;
  const bin = maskInt.toString(2).padStart(32, '0');
  if (!/^1*0*$/.test(bin)) return null; // must be contiguous 1s followed by 0s
  return bin.indexOf('0') === -1 ? 32 : bin.indexOf('0');
}

export function classifyIpv4(ipInt) {
  const first = (ipInt >>> 24) & 255;
  const second = (ipInt >>> 16) & 255;

  let ipClass = 'E';
  if (first < 128) ipClass = 'A';
  else if (first < 192) ipClass = 'B';
  else if (first < 224) ipClass = 'C';
  else if (first < 240) ipClass = 'D (Multicast)';
  else ipClass = 'E (Specjalne)';

  let scope = 'Publiczny';
  if (first === 10) scope = 'Prywatny (RFC 1918 — 10.0.0.0/8)';
  else if (first === 172 && second >= 16 && second <= 31) scope = 'Prywatny (RFC 1918 — 172.16.0.0/12)';
  else if (first === 192 && second === 168) scope = 'Prywatny (RFC 1918 — 192.168.0.0/16)';
  else if (first === 127) scope = 'Loopback (127.0.0.0/8)';
  else if (first === 169 && second === 254) scope = 'Link-Local APIPA (169.254.0.0/16)';
  else if (first >= 224 && first <= 239) scope = 'Multicast (klasa D)';

  return { ipClass, scope };
}

export function analyzeIpv4Subnet(ipStr, maskInput) {
  const ipInt = parseIpv4(ipStr);
  const prefix = maskStrToPrefix(maskInput);
  if (ipInt === null || prefix === null) {
    return null;
  }

  const maskInt = prefixToMaskInt(prefix);
  const wildcardInt = (~maskInt) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const hostBits = 32 - prefix;
  const totalAddresses = Math.pow(2, hostBits);
  let usableHosts = 0;
  let firstHost = null;
  let lastHost = null;

  if (prefix <= 30) {
    usableHosts = totalAddresses - 2;
    firstHost = intToIpv4((networkInt + 1) >>> 0);
    lastHost = intToIpv4((broadcastInt - 1) >>> 0);
  } else if (prefix === 31) {
    usableHosts = 2; // RFC 3021 point-to-point
    firstHost = intToIpv4(networkInt);
    lastHost = intToIpv4(broadcastInt);
  } else {
    usableHosts = 1; // /32 single host route
    firstHost = intToIpv4(networkInt);
    lastHost = intToIpv4(networkInt);
  }

  const maskOctets = [
    (maskInt >>> 24) & 255,
    (maskInt >>> 16) & 255,
    (maskInt >>> 8) & 255,
    maskInt & 255,
  ];
  const ipOctets = [
    (ipInt >>> 24) & 255,
    (ipInt >>> 16) & 255,
    (ipInt >>> 8) & 255,
    ipInt & 255,
  ];

  let interestingOctetIdx = maskOctets.findIndex((o) => o !== 255);
  if (interestingOctetIdx === -1) interestingOctetIdx = 3;
  const interestingMaskVal = maskOctets[interestingOctetIdx];
  const blockStep = interestingMaskVal === 255 ? 1 : 256 - interestingMaskVal;
  const interestingIpVal = ipOctets[interestingOctetIdx];
  const netOctetVal = Math.floor(interestingIpVal / blockStep) * blockStep;
  const bcOctetVal = netOctetVal + blockStep - 1;

  const { ipClass, scope } = classifyIpv4(ipInt);

  const steps = [
    `Maska /${prefix} w zapisie dziesiętnym to ${intToIpv4(maskInt)}. Liczba bitów hosta wynosi h = 32 − ${prefix} = ${hostBits}.`,
    `Pierwszy oktet maski różny od 255 to oktet nr ${interestingOctetIdx + 1} (wartość ${interestingMaskVal}). Krok bloku wynosi Δ = 256 − ${interestingMaskVal} = ${blockStep}.`,
    `W oktecie nr ${interestingOctetIdx + 1} wartość adresu IP (${interestingIpVal}) mieści się w bloku wielokrotności ${blockStep}: [${netOctetVal} .. ${bcOctetVal}].`,
    `Adres sieci (IP AND Maska, bity hosta = 0): ${intToIpv4(networkInt)}.`,
    `Adres rozgłoszeniowy (bity hosta = 1): ${intToIpv4(broadcastInt)}.`,
    prefix <= 30
      ? `Liczba użytecznych hostów: 2^${hostBits} − 2 = ${totalAddresses} − 2 = ${usableHosts} (zakres od ${firstHost} do ${lastHost}).`
      : `Przypadek specjalny /${prefix}: użytecznych adresów = ${usableHosts} (${firstHost} – ${lastHost}).`,
  ];

  return {
    ip: intToIpv4(ipInt),
    prefix,
    cidr: `${intToIpv4(ipInt)}/${prefix}`,
    mask: intToIpv4(maskInt),
    wildcard: intToIpv4(wildcardInt),
    network: intToIpv4(networkInt),
    broadcast: intToIpv4(broadcastInt),
    firstHost,
    lastHost,
    hostBits,
    totalAddresses,
    usableHosts,
    ipClass,
    scope,
    interestingOctet: interestingOctetIdx + 1,
    blockStep,
    binary: {
      ip: intToBinaryOctets(ipInt),
      mask: intToBinaryOctets(maskInt),
      network: intToBinaryOctets(networkInt),
      broadcast: intToBinaryOctets(broadcastInt),
    },
    steps,
  };
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateSubnetExercise(difficulty = 'exam') {
  let prefix;
  let o1, o2, o3, o4;

  if (difficulty === 'easy') {
    // Classic /24 .. /30 on 192.168.x.y
    const pool = [24, 25, 26, 27, 28, 29, 30];
    prefix = pool[randInt(0, pool.length - 1)];
    o1 = 192;
    o2 = 168;
    o3 = randInt(1, 200);
    o4 = randInt(1, 254);
  } else if (difficulty === 'medium') {
    // /17 .. /23 across 172.16-31.x.y or 10.x.y.z
    prefix = randInt(17, 23);
    if (Math.random() < 0.5) {
      o1 = 172;
      o2 = randInt(16, 31);
    } else {
      o1 = 10;
      o2 = randInt(0, 200);
    }
    o3 = randInt(1, 250);
    o4 = randInt(1, 254);
  } else if (difficulty === 'hard') {
    // Wide range /9 .. /30 including second octet splits
    const pool = [10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30];
    prefix = pool[randInt(0, pool.length - 1)];
    o1 = [10, 145, 150, 172, 192, 203][randInt(0, 5)];
    o2 = o1 === 172 ? randInt(16, 31) : o1 === 192 ? 168 : randInt(1, 254);
    o3 = randInt(1, 254);
    o4 = randInt(1, 254);
  } else {
    // 'exam' — realistic MiKC exam distribution (/20 .. /30)
    const pool = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    prefix = pool[randInt(0, pool.length - 1)];
    const choice = randInt(0, 2);
    if (choice === 0) {
      o1 = 192; o2 = 168; o3 = randInt(1, 254); o4 = randInt(1, 254);
    } else if (choice === 1) {
      o1 = 172; o2 = randInt(16, 31); o3 = randInt(1, 254); o4 = randInt(1, 254);
    } else {
      o1 = 10; o2 = randInt(0, 250); o3 = randInt(1, 254); o4 = randInt(1, 254);
    }
  }

  // Ensure generated host IP isn't accidentally the exact network or broadcast address
  let ipStr = `${o1}.${o2}.${o3}.${o4}`;
  let sol = analyzeIpv4Subnet(ipStr, prefix);
  if (ipStr === sol.network || ipStr === sol.broadcast) {
    const fixedInt = ((parseIpv4(sol.network) + 1) >>> 0);
    ipStr = intToIpv4(fixedInt);
    sol = analyzeIpv4Subnet(ipStr, prefix);
  }

  const showDecimalMask = Math.random() < 0.5;
  return {
    difficulty,
    ip: sol.ip,
    prefix: sol.prefix,
    mask: sol.mask,
    promptDisplay: showDecimalMask ? `${sol.ip}  (maska ${sol.mask})` : `${sol.ip}/${sol.prefix}`,
    maskFormat: showDecimalMask ? 'decimal' : 'cidr',
  };
}
