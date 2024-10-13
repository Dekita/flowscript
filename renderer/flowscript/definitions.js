
// EVENT
export { default as runFlowScript } from './nodes/event/runFlowScript';

// CONSOLE
export { default as logWildcard } from './nodes/console/logWildcard';

// LOGIC
export { default as checkCondition } from './nodes/logic/checkCondition';
export { default as evaluateCode } from './nodes/logic/evaluateJavaScript';
export { default as loopNumTimes } from './nodes/logic/loopNumTimes';
export { default as loopArray } from './nodes/logic/loopArray';
export { default as loopObjectProperties } from './nodes/logic/loopObjectProperties';

// BOOLEAN
export { default as literalBoolean } from './nodes/boolean/createBoolean';

// STRING
export { default as literalString } from './nodes/string/createString';
export { default as toUpperCase } from './nodes/string/toUpperCase';
export { default as toLowerCase } from './nodes/string/toLowerCase';
export { default as toCapitalized } from './nodes/string/toCapitalized';
export { default as toString } from './nodes/string/toString';

// NUMBER
export { default as literalNumber } from './nodes/number/createNumber';
export { default as getInfinity } from './nodes/number/getInfinity';
export { default as restrictNumber } from './nodes/number/restrictNumber';
export { default as randomInteger } from './nodes/number/randomInteger';
export { default as randomFloat } from './nodes/number/randomFloat';
export { default as isSafeInteger } from './nodes/number/isSafeInteger';
export { default as isFinite } from './nodes/number/isFiniteNumber';
export { default as isNumber } from './nodes/number/isNumber';
export { default as parseInteger } from './nodes/number/parseInteger';
export { default as parseFloat } from './nodes/number/parseFloat';

// OBJECT
export { default as literalObject } from './nodes/object/createObject';
export { default as mergeObjects } from './nodes/object/mergeObjects';
export { default as setProperty } from './nodes/object/setProperty';
export { default as getProperty } from './nodes/object/getProperty';
export { default as removeProperty } from './nodes/object/removeProperty';

// IMAGE
export { default as createImage } from './nodes/image/createImage';

// JSON
export { default as parseJSON } from './nodes/json/stringToObject';
export { default as stringifyJSON } from './nodes/json/objectToString';


// OPENAI/GPT
export { default as speakWithGPT } from './nodes/gpt/speakWithGPT';
export { default as generateImageWithDalle } from './nodes/gpt/generateWithDalle';


// ARRAY

// FUNCTION

// MATH

// DATE

// TIME

// export { default as addNumbers } from './nodes/number/addNumbers';
// export { default as subtractNumbers } from './nodes/number/subtractNumbers';
// export { default as multiplyNumbers } from './nodes/number/multiplyNumbers';
// export { default as divideNumbers } from './nodes/number/divideNumbers';

