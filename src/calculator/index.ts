import { actions } from './calcStore/calcStore.js';

document.querySelector('#calcBtn1')?.addEventListener('click', (e: Event) => {
  actions.appendCalcStr('1');
});

document.querySelector('#calcBtn2')?.addEventListener('click', (e: Event) => {
  actions.appendCalcStr('2');
});

document.querySelector('#calcBtn3')?.addEventListener('click', (e: Event) => {
  actions.appendCalcStr('3');
});

document.querySelector('#calcBtn4')?.addEventListener('click', (e: Event) => {
  actions.appendCalcStr('4');
});

document.querySelector('#calcBtn5')?.addEventListener('click', (e: Event) => {
  actions.appendCalcStr('5');
});

document.querySelector('#calcBtn6')?.addEventListener('click', (e: Event) => {
  actions.appendCalcStr('6');
});

document.querySelector('#calcBtn7')?.addEventListener('click', (e: Event) => {
  actions.appendCalcStr('7');
});

document.querySelector('#calcBtn8')?.addEventListener('click', (e: Event) => {
  actions.appendCalcStr('8');
});

document.querySelector('#calcBtn9')?.addEventListener('click', (e: Event) => {
  actions.appendCalcStr('9');
});

document.querySelector('#calcBtn0')?.addEventListener('click', (e: Event) => {
  actions.appendCalcStr('0');
});
document.querySelector('#calcBtnDot')?.addEventListener('click', (e: Event) => {
  actions.appendCalcStr('.');
});

document
  .querySelector('#calcBtnDivide')
  ?.addEventListener('click', (e: Event) => {
    actions.appendCalcStr('/');
  });
document
  .querySelector('#calcBtnMultiply')
  ?.addEventListener('click', (e: Event) => {
    actions.appendCalcStr('*');
  });
document
  .querySelector('#calcBtnPlus')
  ?.addEventListener('click', (e: Event) => {
    actions.appendCalcStr('+');
  });
document
  .querySelector('#calcBtnMinus')
  ?.addEventListener('click', (e: Event) => {
    actions.appendCalcStr('-');
  });

document
  .querySelector('#calcBtnEquals')
  ?.addEventListener('click', (e: Event) => {
    actions.evaluateCalcStr();
  });

document
  .querySelector('#calcBtnLBracket')
  ?.addEventListener('click', (e: Event) => {
    actions.appendCalcStr('(');
  });

document
  .querySelector('#calcBtnRBracket')
  ?.addEventListener('click', (e: Event) => {
    actions.appendCalcStr(')');
  });

document
  .querySelector('#calcBtnClear')
  ?.addEventListener('click', (e: Event) => {
    actions.clearCalcStr();
  });

document
  .querySelector('#calcBtnDelete')
  ?.addEventListener('click', (e: Event) => {
    actions.backSpaceCalcStr();
  });
