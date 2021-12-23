
export default function isNumber(n: string): boolean { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 