import { evaluatePostFixCalcArr } from './evaluatePostFixCalcArr';
import { isValidCalcStr } from './isValidCalcStr';
import { splitCalcStr } from './splitCalcStr';
import { toPostFixCalcArr } from './toPostFixCalcArr';

export interface ICalcError {
  __typename: 'ICalcError';
}

export interface ICalcEmptyCalcStr {
  __typename: 'ICalcEmptyCalcStr';
}

export interface ICalcInvalidCalcStr {
  __typename: 'ICalcInvalidCalcStr';
}

export interface ICalcSuccess {
  __typename: 'ICalcSuccess';
  result: number | undefined;
}

export type CalcResult =
  | ICalcSuccess
  | ICalcError
  | ICalcInvalidCalcStr
  | ICalcEmptyCalcStr;

export function calculate(calcStr: string): CalcResult {
  if (calcStr === '') {
    return { __typename: 'ICalcEmptyCalcStr' };
  }

  if (!isValidCalcStr(calcStr)) {
    return { __typename: 'ICalcInvalidCalcStr' };
  }

  const result = evaluatePostFixCalcArr(
    toPostFixCalcArr(splitCalcStr(calcStr))
  );

  console.log('calculationResult:', result);

  return {
    __typename: 'ICalcSuccess',
    result: result,
  };
}
