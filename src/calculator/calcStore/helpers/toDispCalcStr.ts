export function toDisplayCalcStr(calcStr: string) {
  return calcStr.replace(/[*]/g, '×').replace(/[/]/g, '÷');
}
