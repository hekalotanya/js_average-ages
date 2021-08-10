'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const men = people.filter(person => person.sex === 'm');

  let menNew = men;

  if (arguments.length > 1) {
    menNew = men.filter(person => (Math.ceil(person.died / 100)) === century);
  }

  const callback = (value, x) => value + (x.died - x.born);

  const sum = menNew.reduce(callback, 0);

  const average = sum / menNew.length;

  return average;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = people.filter(person => person.sex === 'f');

  let womenNew = women;

  if (arguments.length > 1) {
    womenNew = women.filter(person => {
      for (const i of people) {
        if (i.mother === person.name) {
          return person;
        }
      }
    });
  }

  const callback = (value, x) => value + (x.died - x.born);

  const sum = womenNew.reduce(callback, 0);

  const average = sum / womenNew.length;

  return average;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const women = people.filter(person => person.sex === 'f');

  const children = people.filter(person =>
    onlyWithSon
      ? people.some(mother => person.mother === mother.name)
        && person.sex === 'm'
      : people.some(mother => person.mother === mother.name));

  const callback = (value, person) => {
    for (const i of women) {
      if (person.mother === i.name) {
        return (value + (person.born - i.born));
      }
    }
  };

  const age = children.reduce(callback, 0);

  const average = age / children.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
