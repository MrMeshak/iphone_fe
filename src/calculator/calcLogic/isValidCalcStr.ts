export function isValidCalcStr(calculationStr: string) {
  const calcStr = '(' + calculationStr.replace(/[\s]/g, '') + ')';
  console.log(calcStr);
  //check if string has any invalid characters
  if (/[^0-9-+*/)(.]/.test(calcStr)) {
    console.log('invalidCalcStr: has invalid characters');
    return false;
  }

  //check for invalid operators - '**', '*/', '*)', '//', '/*', '/)', '-*', '-/', '-)', '+*', '+/', '+)', '(*', '(/', '()', '..', '.*', './' , '.+', '.(' '.)'
  //check for invalid triple or more operators (+-/*.) in a row
  //prettier-ignore
  if (/(\*[*/)])|(\/[/*)])|(-[*/)])|(\+[*/)])|(\([*/)])|([-+/*.]{3,})|(\.[-+/*.()])/.test(calcStr)) {
    console.log('invalidCalcStr: has invalid operators');
    return false;
  }

  //check brackets balance
  let bracketBalCount = 0;
  for (let i = 0; i < calcStr.length; i++) {
    if (calcStr.charAt(i) === '(') {
      bracketBalCount++;
    } else if (calcStr.charAt(i) === ')') {
      bracketBalCount--;
      if (bracketBalCount < 0) {
        return false;
      }
    }
  }
  if (bracketBalCount !== 0) {
    return false;
  }

  //check if numbers valid numbers
  const sections = calcStr.split(/[-+*/()]{1,}/g);
  const hasNaN = sections.some((section) => section && isNaN(Number(section)));
  if (hasNaN) {
    return false;
  }

  return true;
}
