export function splitCalcStr(calculationStr: string) {
  const calcStr = '(' + calculationStr.replace(/\s/g, '') + ')';

  const calcStrArr = calcStr.split(/(?=[-+/*()])|(?<=[-+/*()])/g);

  console.log('calcSplitBefore:', calcStrArr);

  //Check and simplify unitary operators and implicit multiplication
  if (calcStrArr.length > 2) {
    for (let i = 1; i < calcStrArr.length - 1; i++) {
      //[operator] [+ or -] [number]  -->  [operator] [+number or -number]
      if (
        /(^[-+/*(]{1}$)/.test(calcStrArr[i - 1]) &&
        /^[-+]{1}$/.test(calcStrArr[i]) &&
        /[\d]/.test(calcStrArr[i + 1])
      ) {
        const numberStr = calcStrArr.splice(i + 1, 1)[0];
        calcStrArr[i] = calcStrArr[i].concat(numberStr);
        continue;
      }

      // [-] [number] [operator]  --> [+] [-number] [operator]  (important for order of operations)
      if (
        calcStrArr[i - 1] === '-' &&
        /[\d]/.test(calcStrArr[i]) &&
        /(^[-+/*()]{1}$)/.test(calcStrArr[i + 1])
      ) {
        const sign = calcStrArr.splice(i - 1, 1, '+')[0];
        calcStrArr[i] = sign + calcStrArr[i];
        continue;
      }

      //[operator] [-] [(] --> [operator] [-1] [*] [(]
      if (
        /^[-+/*(]{1}$/.test(calcStrArr[i - 1]) &&
        calcStrArr[i] === '-' &&
        calcStrArr[i + 1] === '('
      ) {
        calcStrArr.splice(i, 1, '-1', '*');
        continue;
      }

      //[operator] [+] [(] --> [operator] [(]
      if (
        /^[-+/*(]{1}$/.test(calcStrArr[i - 1]) &&
        calcStrArr[i] === '+' &&
        calcStrArr[i + 1] === '('
      ) {
        calcStrArr.splice(i, 1);
        continue;
      }

      //[number or )] [(] --> [number or )] [*] [(]
      if (/[\d)]/.test(calcStrArr[i - 1]) && calcStr[i] === '(') {
        calcStrArr.splice(i, 0, '*');
        continue;
      }
    }
  }

  console.log('calcSplit:', calcStrArr);
  return calcStrArr;
}
