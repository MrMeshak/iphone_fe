export type CalcOperation = '-' | '+' | '/' | '*' | '(' | ')';
export type CalcToken = number | '-' | '+' | '/' | '*' | '(' | ')';
export type PostFixCalcOperation = '-' | '+' | '/' | '*';
export type PostFixCalcToken = number | '+' | '-' | '/' | '*';

export const operatorPrecedence = {
  ')': 0,
  '(': 0,
  '+': 1,
  '-': 1,
  '/': 2,
  '*': 2,
};
