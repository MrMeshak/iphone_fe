import {
  CalcOperation,
  CalcToken,
  PostFixCalcOperation,
  PostFixCalcToken,
  operatorPrecedence,
} from './calculator.model';
import { toInFixCalcArr } from './toInFixCalcArr';

export function toPostFixCalcArr(calcArr: string[]) {
  const inFixCalcArr: CalcToken[] = toInFixCalcArr(calcArr);
  const queue: PostFixCalcToken[] = [];
  const stack: CalcOperation[] = [];

  for (const token of inFixCalcArr) {
    console.log('stack and queue', stack, queue);
    if (typeof token === 'number') {
      shuntNumber(queue, token);
      continue;
    }

    if (token === '(') {
      shuntOpeningBracket(stack);
      continue;
    }

    if (token === ')') {
      shuntClosingBracket(stack, queue);
      continue;
    }

    if (token === '+' || token === '-' || token === '*' || token === '/') {
      shuntMathOperation(stack, queue, token);
      continue;
    }
  }

  const postFixCalcArr = queue.concat(
    stack.reverse() as PostFixCalcOperation[]
  );
  console.log('postFixArr:', postFixCalcArr);
  return postFixCalcArr;
}

function shuntNumber(queue: CalcToken[], num: number) {
  queue.push(num);
}

function shuntOpeningBracket(stack: CalcOperation[]) {
  stack.push('(');
}

function shuntClosingBracket(stack: CalcOperation[], queue: CalcToken[]) {
  let prevOperation: CalcOperation | undefined = stack.pop();

  while (prevOperation && prevOperation !== '(') {
    queue.push(prevOperation);
    prevOperation = stack.pop();
  }
}

function shuntMathOperation(
  stack: CalcOperation[],
  queue: CalcToken[],
  operation: PostFixCalcOperation
) {
  if (stack.length === 0) {
    stack.push(operation);
    return;
  }

  let prevOperation: CalcOperation | undefined = stack[stack.length - 1];
  while (
    prevOperation &&
    operatorPrecedence[prevOperation] >= operatorPrecedence[operation]
  ) {
    stack.pop();
    queue.push(prevOperation);
    prevOperation = stack[stack.length - 1];
  }
  stack.push(operation);
}
