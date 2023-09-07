import { CalcToken } from './calculator.model';

export function toInFixCalcArr(calcStrArr: string[]) {
  const inFixCalcArr: CalcToken[] = calcStrArr.map((token) => {
    if (
      token === '+' ||
      token === '-' ||
      token === '/' ||
      token === '*' ||
      token === '(' ||
      token === ')'
    ) {
      return token;
    }
    return Number(token);
  });
  console.log('inFixArr:', inFixCalcArr);
  return inFixCalcArr;
}
