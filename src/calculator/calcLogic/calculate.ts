import { evaluatePostFixCalcArr } from './evaluatePostFixCalcArr.js';
import { isValidCalcStr } from './isValidCalcStr.js';
import { splitCalcStr } from './splitCalcStr.js';
import { toPostFixCalcArr } from './toPostFixCalcArr.js';

export interface ICalcError {
  __typename: 'ICalcError';
  calcStr: string;
}

export interface ICalcEmptyCalcStr {
  __typename: 'ICalcEmptyCalcStr';
  calcStr: string;
}

export interface ICalcInvalidCalcStr {
  __typename: 'ICalcInvalidCalcStr';
  calcStr: string;
}

export interface ICalcSuccess {
  __typename: 'ICalcSuccess';
  calcStr: string;
  result: number | undefined;
}

export type CalcResult =
  | ICalcSuccess
  | ICalcError
  | ICalcInvalidCalcStr
  | ICalcEmptyCalcStr;

export function calculate(calcStr: string): CalcResult {
  if (calcStr === '') {
    return { __typename: 'ICalcEmptyCalcStr', calcStr: calcStr };
  }

  if (!isValidCalcStr(calcStr)) {
    return { __typename: 'ICalcInvalidCalcStr', calcStr: calcStr };
  }

  const result = evaluatePostFixCalcArr(
    toPostFixCalcArr(splitCalcStr(calcStr))
  );

  console.log('calculationResult:', result);

  return {
    __typename: 'ICalcSuccess',
    calcStr: calcStr,
    result: result,
  };
}
