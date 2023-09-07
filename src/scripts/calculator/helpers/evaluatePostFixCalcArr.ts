import { PostFixCalcToken } from './calculator.model';

export function evaluatePostFixCalcArr(postFixCalcArr: PostFixCalcToken[]) {
  const stack: number[] = [];

  for (const token of postFixCalcArr) {
    if (typeof token === 'number') {
      stack.push(token);
      continue;
    }

    const num2 = stack.pop();
    const num1 = stack.pop();

    if (num1 === undefined || num2 === undefined) {
      continue;
    }

    if (token === '+') {
      stack.push(num1 + num2);
      continue;
    }

    if (token === '-') {
      stack.push(num1 - num2);
      continue;
    }

    if (token === '*') {
      stack.push(num1 * num2);
      continue;
    }

    if (token === '/') {
      stack.push(num1 / num2);
      continue;
    }
  }

  return stack.pop();
}
