import { calculate } from '../calculate';

describe('calculator - calculate', () => {
  describe('When calculationStr is invalid', () => {
    describe('- calculationStr is empty', () => {
      it('[""] (empty string) should return ICalcEmptyCalcStr', () => {
        const calculationStr = '';
        const result = calculate(calculationStr);
        const expected = {
          __typename: 'ICalcEmptyCalcStr',
        };
        expect(result).toMatchObject(expected);
      });
    });

    describe.each([
      [
        'invalid chars',
        '(1+a)*b',
        {
          __typename: 'ICalcInvalidCalcStr',
        },
      ],
    ])(
      '- calculationStr contains invalid characters',
      (note, calcuationStr, expected) => {
        it(`[${calcuationStr}] (${note}) should return ICalcInvalidStr`, () => {
          expect(calculate(calcuationStr)).toMatchObject(expected);
        });
      }
    );
    //prettier-ignore
    describe.each([
      ['opening bracket before closing bracket', '1+2))*(3', { __typename: 'ICalcInvalidCalcStr' }],
      ['opening brackets > closing brackets','(1+2)*(3', { __typename: 'ICalcInvalidCalcStr',},],
      ['closing brackets > opening brackets','(1+2)*3)', {__typename: 'ICalcInvalidCalcStr',},],
    ])(
      '- calculationStr has unbalanced brackets',
      (note, calcuationStr, expected) => {
        it(`[${calcuationStr}] (${note}) should return ICalcInvalidCalcStr'`, () => {
          expect(calculate(calcuationStr)).toMatchObject(expected);
        });
      }
    );

    describe.each([
      [' ** ', '1**2', { __typename: 'ICalcInvalidCalcStr' }],
      [' */ ', '1*/2', { __typename: 'ICalcInvalidCalcStr' }],
      [' *) ', '(3+2*)', { __typename: 'ICalcInvalidCalcStr' }],
      [' // ', '1//2', { __typename: 'ICalcInvalidCalcStr' }],
      [' /* ', '1/*2', { __typename: 'ICalcInvalidCalcStr' }],
      [' /) ', '(3+2/)', { __typename: 'ICalcInvalidCalcStr' }],
      [' -* ', '(3-/)', { __typename: 'ICalcInvalidCalcStr' }],
      [' -/ ', '(3-/2)', { __typename: 'ICalcInvalidCalcStr' }],
      [' -) ', '(3+2-)', { __typename: 'ICalcInvalidCalcStr' }],
      [' +* ', '(3+*2)', { __typename: 'ICalcInvalidCalcStr' }],
      [' +/ ', '(3+/2)', { __typename: 'ICalcInvalidCalcStr' }],
      [' +) ', '(3+2+)', { __typename: 'ICalcInvalidCalcStr' }],
      [' (* ', '(*3*5)', { __typename: 'ICalcInvalidCalcStr' }],
      [' (/ ', '(/3*5)', { __typename: 'ICalcInvalidCalcStr' }],
      [' () ', '1*()', { __typename: 'ICalcInvalidCalcStr' }],
      [' .. ', '1..3', { __typename: 'ICalcInvalidCalcStr' }],
      [' .* ', '1.*3', { __typename: 'ICalcInvalidCalcStr' }],
      [' ./ ', '1./3', { __typename: 'ICalcInvalidCalcStr' }],
      [' .+ ', '1.+4', { __typename: 'ICalcInvalidCalcStr' }],
      [' .( ', '1.(4)', { __typename: 'ICalcInvalidCalcStr' }],
      [' .) ', '(1.)*4', { __typename: 'ICalcInvalidCalcStr' }],
    ])(
      '- calculationStr contains invalid operations',
      (note, calcuationStr, expected) => {
        it(`[${calcuationStr}] (${note}) should return ICalcInvalidCalcStr`, () => {
          expect(calculate(calcuationStr)).toMatchObject(expected);
        });
      }
    );

    describe.each([
      [
        'multiple decimal points',
        '(1.345.4*123..)',
        { __typename: 'ICalcInvalidCalcStr' },
      ],
    ])(
      '- calculationStr contains multiple decimal points within a single number',
      (note, calculationStr, expected) => {
        it(`[${note}] (${calculationStr} should return ICalcInvalidStr`, () => {
          expect(calculate(calculationStr)).toMatchObject(expected);
        });
      }
    );
  });

  describe('When calculationStr is valid', () => {
    //prettier-ignore
    describe.each([
      ['-2*3*5', { __typename: 'ICalcSuccess', result: -2*3*5}],
      ['-6-2*3', { __typename: 'ICalcSuccess', result: -6-2*3}],
      ['4-8*-1', { __typename: 'ICalcSuccess', result: 4-8*-1}],
      ['-3/-1+7*-2', {__typename: 'ICalcSuccess', result: -3/-1+7*-2}],
      ['6*-2-10/-5', {__typename: 'ICalcSuccess', result: 6*-2-10/-5}],
      ['4+8*-2/16', {__typename: 'ICalcSuccess', result: 4+8*-2/16}],
      ['20-10/-5*2', {__typename: 'ICalcSuccess', result: 20-10/-5*2}],
      ['0*-3+2*-30', {__typename: 'ICalcSuccess', result: 0*-3+2*-30}],
      ['35-10/-2+0', {__typename: 'ICalcSuccess', result: 35-10/-2+0}],
      ['3*(2-4)', {__typename: 'ICalcSuccess', result: 3*(2-4) }],
      ['(7--1)*3', {__typename: 'ICalcSuccess', result: (7 - -1)*3 }],
      ['(-8+-2)/-5', {__typename: 'ICalcSuccess', result: (-8+ -2) / -5 }],
      ['40/(8--2)+3', {__typename: 'ICalcSuccess', result: 40/(8- -2) +3 }],
      ['0*(38--4)*-6', {__typename: 'ICalcSuccess', result: 0*(38- -4)* -6}],
      ['-6*(-1+3)/-4', {__typename: 'ICalcSuccess', result: -6*(-1+3)/-4}],
      ['(-2+1)*(8--3)', {__typename: 'ICalcSuccess', result: (-2+1)*(8- -3)}],
      ['(-6-4)/(50/-10)', {__typename: 'ICalcSuccess', result: (-6-4)/(50/-10)}],
      ['-2*(8-7*-2)', {__typename: 'ICalcSuccess', result: -2*(8-7*-2) }],
      ['(3--2*2)/7', {__typename: 'ICalcSuccess', result:(3- -2*2)/7 }],
      ['-4*(2--6/6)', {__typename: 'ICalcSuccess', result: -4*(2- -6/6)}],
      ['-5/(1-3*2)', {__typename: 'ICalcSuccess', result: -5/(1-3*2) }],
    ])('- mixed set of valid equations containing whole numbers', (calcStr, calcResult) => {
      it(`[${calcStr}] should return ICalcSuccess with correct result`, () => {
        expect(calculate(calcStr)).toMatchObject(calcResult);
      });
    });
  });
});
