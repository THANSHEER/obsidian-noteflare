var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/braces/lib/utils.js
var require_utils = __commonJS({
  "node_modules/braces/lib/utils.js"(exports) {
    "use strict";
    exports.isInteger = (num) => {
      if (typeof num === "number") {
        return Number.isInteger(num);
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isInteger(Number(num));
      }
      return false;
    };
    exports.find = (node, type) => node.nodes.find((node2) => node2.type === type);
    exports.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false)
        return false;
      if (!exports.isInteger(min) || !exports.isInteger(max))
        return false;
      return (Number(max) - Number(min)) / Number(step) >= limit;
    };
    exports.escapeNode = (block, n = 0, type) => {
      const node = block.nodes[n];
      if (!node)
        return;
      if (type && node.type === type || node.type === "open" || node.type === "close") {
        if (node.escaped !== true) {
          node.value = "\\" + node.value;
          node.escaped = true;
        }
      }
    };
    exports.encloseBrace = (node) => {
      if (node.type !== "brace")
        return false;
      if (node.commas >> 0 + node.ranges >> 0 === 0) {
        node.invalid = true;
        return true;
      }
      return false;
    };
    exports.isInvalidBrace = (block) => {
      if (block.type !== "brace")
        return false;
      if (block.invalid === true || block.dollar)
        return true;
      if (block.commas >> 0 + block.ranges >> 0 === 0) {
        block.invalid = true;
        return true;
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true;
        return true;
      }
      return false;
    };
    exports.isOpenOrClose = (node) => {
      if (node.type === "open" || node.type === "close") {
        return true;
      }
      return node.open === true || node.close === true;
    };
    exports.reduce = (nodes) => nodes.reduce((acc, node) => {
      if (node.type === "text")
        acc.push(node.value);
      if (node.type === "range")
        node.type = "text";
      return acc;
    }, []);
    exports.flatten = (...args) => {
      const result = [];
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          const ele = arr[i];
          if (Array.isArray(ele)) {
            flat(ele);
            continue;
          }
          if (ele !== void 0) {
            result.push(ele);
          }
        }
        return result;
      };
      flat(args);
      return result;
    };
  }
});

// node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/braces/lib/stringify.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = (ast, options = {}) => {
      const stringify = (node, parent = {}) => {
        const invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
        const invalidNode = node.invalid === true && options.escapeInvalid === true;
        let output = "";
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return "\\" + node.value;
          }
          return node.value;
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes) {
          for (const child of node.nodes) {
            output += stringify(child);
          }
        }
        return output;
      };
      return stringify(ast);
    };
  }
});

// node_modules/is-number/index.js
var require_is_number = __commonJS({
  "node_modules/is-number/index.js"(exports, module2) {
    "use strict";
    module2.exports = function(num) {
      if (typeof num === "number") {
        return num - num === 0;
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
      }
      return false;
    };
  }
});

// node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  "node_modules/to-regex-range/index.js"(exports, module2) {
    "use strict";
    var isNumber = require_is_number();
    var toRegexRange = (min, max, options) => {
      if (isNumber(min) === false) {
        throw new TypeError("toRegexRange: expected the first argument to be a number");
      }
      if (max === void 0 || min === max) {
        return String(min);
      }
      if (isNumber(max) === false) {
        throw new TypeError("toRegexRange: expected the second argument to be a number.");
      }
      let opts = { relaxZeros: true, ...options };
      if (typeof opts.strictZeros === "boolean") {
        opts.relaxZeros = opts.strictZeros === false;
      }
      let relax = String(opts.relaxZeros);
      let shorthand = String(opts.shorthand);
      let capture = String(opts.capture);
      let wrap = String(opts.wrap);
      let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result;
      }
      let a = Math.min(min, max);
      let b = Math.max(min, max);
      if (Math.abs(a - b) === 1) {
        let result = min + "|" + max;
        if (opts.capture) {
          return `(${result})`;
        }
        if (opts.wrap === false) {
          return result;
        }
        return `(?:${result})`;
      }
      let isPadded = hasPadding(min) || hasPadding(max);
      let state = { min, max, a, b };
      let positives = [];
      let negatives = [];
      if (isPadded) {
        state.isPadded = isPadded;
        state.maxLen = String(state.max).length;
      }
      if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1;
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
        a = state.a = 0;
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts);
      }
      state.negatives = negatives;
      state.positives = positives;
      state.result = collatePatterns(negatives, positives, opts);
      if (opts.capture === true) {
        state.result = `(${state.result})`;
      } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
        state.result = `(?:${state.result})`;
      }
      toRegexRange.cache[cacheKey] = state;
      return state.result;
    };
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
      let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
      let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
      return subpatterns.join("|");
    }
    function splitToRanges(min, max) {
      let nines = 1;
      let zeros = 1;
      let stop = countNines(min, nines);
      let stops = /* @__PURE__ */ new Set([max]);
      while (min <= stop && stop <= max) {
        stops.add(stop);
        nines += 1;
        stop = countNines(min, nines);
      }
      stop = countZeros(max + 1, zeros) - 1;
      while (min < stop && stop <= max) {
        stops.add(stop);
        zeros += 1;
        stop = countZeros(max + 1, zeros) - 1;
      }
      stops = [...stops];
      stops.sort(compare);
      return stops;
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return { pattern: start, count: [], digits: 0 };
      }
      let zipped = zip(start, stop);
      let digits = zipped.length;
      let pattern = "";
      let count = 0;
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i];
        if (startDigit === stopDigit) {
          pattern += startDigit;
        } else if (startDigit !== "0" || stopDigit !== "9") {
          pattern += toCharacterClass(startDigit, stopDigit, options);
        } else {
          count++;
        }
      }
      if (count) {
        pattern += options.shorthand === true ? "\\d" : "[0-9]";
      }
      return { pattern, count: [count], digits };
    }
    function splitToPatterns(min, max, tok, options) {
      let ranges = splitToRanges(min, max);
      let tokens = [];
      let start = min;
      let prev;
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i];
        let obj = rangeToPattern(String(start), String(max2), options);
        let zeros = "";
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop();
          }
          prev.count.push(obj.count[0]);
          prev.string = prev.pattern + toQuantifier(prev.count);
          start = max2 + 1;
          continue;
        }
        if (tok.isPadded) {
          zeros = padZeros(max2, tok, options);
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count);
        tokens.push(obj);
        start = max2 + 1;
        prev = obj;
      }
      return tokens;
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = [];
      for (let ele of arr) {
        let { string } = ele;
        if (!intersection && !contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
        if (intersection && contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
      }
      return result;
    }
    function zip(a, b) {
      let arr = [];
      for (let i = 0; i < a.length; i++)
        arr.push([a[i], b[i]]);
      return arr;
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0;
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val);
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + "9".repeat(len));
    }
    function countZeros(integer, zeros) {
      return integer - integer % Math.pow(10, zeros);
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ""] = digits;
      if (stop || start > 1) {
        return `{${start + (stop ? "," + stop : "")}}`;
      }
      return "";
    }
    function toCharacterClass(a, b, options) {
      return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str);
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded) {
        return value;
      }
      let diff = Math.abs(tok.maxLen - String(value).length);
      let relax = options.relaxZeros !== false;
      switch (diff) {
        case 0:
          return "";
        case 1:
          return relax ? "0?" : "0";
        case 2:
          return relax ? "0{0,2}" : "00";
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`;
        }
      }
    }
    toRegexRange.cache = {};
    toRegexRange.clearCache = () => toRegexRange.cache = {};
    module2.exports = toRegexRange;
  }
});

// node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  "node_modules/fill-range/index.js"(exports, module2) {
    "use strict";
    var util = require("util");
    var toRegexRange = require_to_regex_range();
    var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var transform = (toNumber) => {
      return (value) => toNumber === true ? Number(value) : String(value);
    };
    var isValidValue = (value) => {
      return typeof value === "number" || typeof value === "string" && value !== "";
    };
    var isNumber = (num) => Number.isInteger(+num);
    var zeros = (input) => {
      let value = `${input}`;
      let index = -1;
      if (value[0] === "-")
        value = value.slice(1);
      if (value === "0")
        return false;
      while (value[++index] === "0")
        ;
      return index > 0;
    };
    var stringify = (start, end, options) => {
      if (typeof start === "string" || typeof end === "string") {
        return true;
      }
      return options.stringify === true;
    };
    var pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === "-" ? "-" : "";
        if (dash)
          input = input.slice(1);
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
      }
      if (toNumber === false) {
        return String(input);
      }
      return input;
    };
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === "-" ? "-" : "";
      if (negative) {
        input = input.slice(1);
        maxLength--;
      }
      while (input.length < maxLength)
        input = "0" + input;
      return negative ? "-" + input : input;
    };
    var toSequence = (parts, options, maxLen) => {
      parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      let prefix = options.capture ? "" : "?:";
      let positives = "";
      let negatives = "";
      let result;
      if (parts.positives.length) {
        positives = parts.positives.map((v) => toMaxLen(String(v), maxLen)).join("|");
      }
      if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.map((v) => toMaxLen(String(v), maxLen)).join("|")})`;
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`;
      } else {
        result = positives || negatives;
      }
      if (options.wrap) {
        return `(${prefix}${result})`;
      }
      return result;
    };
    var toRange = (a, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a, b, { wrap: false, ...options });
      }
      let start = String.fromCharCode(a);
      if (a === b)
        return start;
      let stop = String.fromCharCode(b);
      return `[${start}-${stop}]`;
    };
    var toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true;
        let prefix = options.capture ? "" : "?:";
        return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
      }
      return toRegexRange(start, end, options);
    };
    var rangeError = (...args) => {
      return new RangeError("Invalid range arguments: " + util.inspect(...args));
    };
    var invalidRange = (start, end, options) => {
      if (options.strictRanges === true)
        throw rangeError([start, end]);
      return [];
    };
    var invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`);
      }
      return [];
    };
    var fillNumbers = (start, end, step = 1, options = {}) => {
      let a = Number(start);
      let b = Number(end);
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === true)
          throw rangeError([start, end]);
        return [];
      }
      if (a === 0)
        a = 0;
      if (b === 0)
        b = 0;
      let descending = a > b;
      let startString = String(start);
      let endString = String(end);
      let stepString = String(step);
      step = Math.max(Math.abs(step), 1);
      let padded = zeros(startString) || zeros(endString) || zeros(stepString);
      let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
      let toNumber = padded === false && stringify(start, end, options) === false;
      let format = options.transform || transform(toNumber);
      if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
      }
      let parts = { negatives: [], positives: [] };
      let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
          push(a);
        } else {
          range.push(pad(format(a, index), maxLen, toNumber));
        }
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return step > 1 ? toSequence(parts, options, maxLen) : toRegex(range, null, { wrap: false, ...options });
      }
      return range;
    };
    var fillLetters = (start, end, step = 1, options = {}) => {
      if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
        return invalidRange(start, end, options);
      }
      let format = options.transform || ((val) => String.fromCharCode(val));
      let a = `${start}`.charCodeAt(0);
      let b = `${end}`.charCodeAt(0);
      let descending = a > b;
      let min = Math.min(a, b);
      let max = Math.max(a, b);
      if (options.toRegex && step === 1) {
        return toRange(min, max, false, options);
      }
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        range.push(format(a, index));
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return toRegex(range, null, { wrap: false, options });
      }
      return range;
    };
    var fill = (start, end, step, options = {}) => {
      if (end == null && isValidValue(start)) {
        return [start];
      }
      if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options);
      }
      if (typeof step === "function") {
        return fill(start, end, 1, { transform: step });
      }
      if (isObject(step)) {
        return fill(start, end, 0, step);
      }
      let opts = { ...options };
      if (opts.capture === true)
        opts.wrap = true;
      step = step || opts.step || 1;
      if (!isNumber(step)) {
        if (step != null && !isObject(step))
          return invalidStep(step, opts);
        return fill(start, end, 1, step);
      }
      if (isNumber(start) && isNumber(end)) {
        return fillNumbers(start, end, step, opts);
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
    };
    module2.exports = fill;
  }
});

// node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  "node_modules/braces/lib/compile.js"(exports, module2) {
    "use strict";
    var fill = require_fill_range();
    var utils = require_utils();
    var compile = (ast, options = {}) => {
      const walk = (node, parent = {}) => {
        const invalidBlock = utils.isInvalidBrace(parent);
        const invalidNode = node.invalid === true && options.escapeInvalid === true;
        const invalid = invalidBlock === true || invalidNode === true;
        const prefix = options.escapeInvalid === true ? "\\" : "";
        let output = "";
        if (node.isOpen === true) {
          return prefix + node.value;
        }
        if (node.isClose === true) {
          console.log("node.isClose", prefix, node.value);
          return prefix + node.value;
        }
        if (node.type === "open") {
          return invalid ? prefix + node.value : "(";
        }
        if (node.type === "close") {
          return invalid ? prefix + node.value : ")";
        }
        if (node.type === "comma") {
          return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes && node.ranges > 0) {
          const args = utils.reduce(node.nodes);
          const range = fill(...args, { ...options, wrap: false, toRegex: true, strictZeros: true });
          if (range.length !== 0) {
            return args.length > 1 && range.length > 1 ? `(${range})` : range;
          }
        }
        if (node.nodes) {
          for (const child of node.nodes) {
            output += walk(child, node);
          }
        }
        return output;
      };
      return walk(ast);
    };
    module2.exports = compile;
  }
});

// node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  "node_modules/braces/lib/expand.js"(exports, module2) {
    "use strict";
    var fill = require_fill_range();
    var stringify = require_stringify();
    var utils = require_utils();
    var append = (queue = "", stash = "", enclose = false) => {
      const result = [];
      queue = [].concat(queue);
      stash = [].concat(stash);
      if (!stash.length)
        return queue;
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
      }
      for (const item of queue) {
        if (Array.isArray(item)) {
          for (const value of item) {
            result.push(append(value, stash, enclose));
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === "string")
              ele = `{${ele}}`;
            result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
          }
        }
      }
      return utils.flatten(result);
    };
    var expand = (ast, options = {}) => {
      const rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
      const walk = (node, parent = {}) => {
        node.queue = [];
        let p = parent;
        let q = parent.queue;
        while (p.type !== "brace" && p.type !== "root" && p.parent) {
          p = p.parent;
          q = p.queue;
        }
        if (node.invalid || node.dollar) {
          q.push(append(q.pop(), stringify(node, options)));
          return;
        }
        if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
          q.push(append(q.pop(), ["{}"]));
          return;
        }
        if (node.nodes && node.ranges > 0) {
          const args = utils.reduce(node.nodes);
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
          }
          let range = fill(...args, options);
          if (range.length === 0) {
            range = stringify(node, options);
          }
          q.push(append(q.pop(), range));
          node.nodes = [];
          return;
        }
        const enclose = utils.encloseBrace(node);
        let queue = node.queue;
        let block = node;
        while (block.type !== "brace" && block.type !== "root" && block.parent) {
          block = block.parent;
          queue = block.queue;
        }
        for (let i = 0; i < node.nodes.length; i++) {
          const child = node.nodes[i];
          if (child.type === "comma" && node.type === "brace") {
            if (i === 1)
              queue.push("");
            queue.push("");
            continue;
          }
          if (child.type === "close") {
            q.push(append(q.pop(), queue, enclose));
            continue;
          }
          if (child.value && child.type !== "open") {
            queue.push(append(queue.pop(), child.value));
            continue;
          }
          if (child.nodes) {
            walk(child, node);
          }
        }
        return queue;
      };
      return utils.flatten(walk(ast));
    };
    module2.exports = expand;
  }
});

// node_modules/braces/lib/constants.js
var require_constants = __commonJS({
  "node_modules/braces/lib/constants.js"(exports, module2) {
    "use strict";
    module2.exports = {
      MAX_LENGTH: 1e4,
      // Digits
      CHAR_0: "0",
      /* 0 */
      CHAR_9: "9",
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: "A",
      /* A */
      CHAR_LOWERCASE_A: "a",
      /* a */
      CHAR_UPPERCASE_Z: "Z",
      /* Z */
      CHAR_LOWERCASE_Z: "z",
      /* z */
      CHAR_LEFT_PARENTHESES: "(",
      /* ( */
      CHAR_RIGHT_PARENTHESES: ")",
      /* ) */
      CHAR_ASTERISK: "*",
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: "&",
      /* & */
      CHAR_AT: "@",
      /* @ */
      CHAR_BACKSLASH: "\\",
      /* \ */
      CHAR_BACKTICK: "`",
      /* ` */
      CHAR_CARRIAGE_RETURN: "\r",
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: "^",
      /* ^ */
      CHAR_COLON: ":",
      /* : */
      CHAR_COMMA: ",",
      /* , */
      CHAR_DOLLAR: "$",
      /* . */
      CHAR_DOT: ".",
      /* . */
      CHAR_DOUBLE_QUOTE: '"',
      /* " */
      CHAR_EQUAL: "=",
      /* = */
      CHAR_EXCLAMATION_MARK: "!",
      /* ! */
      CHAR_FORM_FEED: "\f",
      /* \f */
      CHAR_FORWARD_SLASH: "/",
      /* / */
      CHAR_HASH: "#",
      /* # */
      CHAR_HYPHEN_MINUS: "-",
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: "<",
      /* < */
      CHAR_LEFT_CURLY_BRACE: "{",
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: "[",
      /* [ */
      CHAR_LINE_FEED: "\n",
      /* \n */
      CHAR_NO_BREAK_SPACE: "\xA0",
      /* \u00A0 */
      CHAR_PERCENT: "%",
      /* % */
      CHAR_PLUS: "+",
      /* + */
      CHAR_QUESTION_MARK: "?",
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: ">",
      /* > */
      CHAR_RIGHT_CURLY_BRACE: "}",
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: "]",
      /* ] */
      CHAR_SEMICOLON: ";",
      /* ; */
      CHAR_SINGLE_QUOTE: "'",
      /* ' */
      CHAR_SPACE: " ",
      /*   */
      CHAR_TAB: "	",
      /* \t */
      CHAR_UNDERSCORE: "_",
      /* _ */
      CHAR_VERTICAL_LINE: "|",
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
      /* \uFEFF */
    };
  }
});

// node_modules/braces/lib/parse.js
var require_parse = __commonJS({
  "node_modules/braces/lib/parse.js"(exports, module2) {
    "use strict";
    var stringify = require_stringify();
    var {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      /* \ */
      CHAR_BACKTICK,
      /* ` */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_RIGHT_SQUARE_BRACKET,
      /* ] */
      CHAR_DOUBLE_QUOTE,
      /* " */
      CHAR_SINGLE_QUOTE,
      /* ' */
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE
    } = require_constants();
    var parse = (input, options = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      const opts = options || {};
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      if (input.length > max) {
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
      }
      const ast = { type: "root", input, nodes: [] };
      const stack = [ast];
      let block = ast;
      let prev = ast;
      let brackets = 0;
      const length = input.length;
      let index = 0;
      let depth = 0;
      let value;
      const advance = () => input[index++];
      const push = (node) => {
        if (node.type === "text" && prev.type === "dot") {
          prev.type = "text";
        }
        if (prev && prev.type === "text" && node.type === "text") {
          prev.value += node.value;
          return;
        }
        block.nodes.push(node);
        node.parent = block;
        node.prev = prev;
        prev = node;
        return node;
      };
      push({ type: "bos" });
      while (index < length) {
        block = stack[stack.length - 1];
        value = advance();
        if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
          continue;
        }
        if (value === CHAR_BACKSLASH) {
          push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
          continue;
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({ type: "text", value: "\\" + value });
          continue;
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          let next;
          while (index < length && (next = advance())) {
            value += next;
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++;
              continue;
            }
            if (next === CHAR_BACKSLASH) {
              value += advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--;
              if (brackets === 0) {
                break;
              }
            }
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({ type: "paren", nodes: [] });
          stack.push(block);
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== "paren") {
            push({ type: "text", value });
            continue;
          }
          block = stack.pop();
          push({ type: "text", value });
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
          const open = value;
          let next;
          if (options.keepQuotes !== true) {
            value = "";
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance();
              continue;
            }
            if (next === open) {
              if (options.keepQuotes === true)
                value += next;
              break;
            }
            value += next;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++;
          const dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
          const brace = {
            type: "brace",
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: []
          };
          block = push(brace);
          stack.push(block);
          push({ type: "open", value });
          continue;
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== "brace") {
            push({ type: "text", value });
            continue;
          }
          const type = "close";
          block = stack.pop();
          block.close = true;
          push({ type, value });
          depth--;
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0;
            const open = block.nodes.shift();
            block.nodes = [open, { type: "text", value: stringify(block) }];
          }
          push({ type: "comma", value });
          block.commas++;
          continue;
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          const siblings = block.nodes;
          if (depth === 0 || siblings.length === 0) {
            push({ type: "text", value });
            continue;
          }
          if (prev.type === "dot") {
            block.range = [];
            prev.value += value;
            prev.type = "range";
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true;
              block.ranges = 0;
              prev.type = "text";
              continue;
            }
            block.ranges++;
            block.args = [];
            continue;
          }
          if (prev.type === "range") {
            siblings.pop();
            const before = siblings[siblings.length - 1];
            before.value += prev.value + value;
            prev = before;
            block.ranges--;
            continue;
          }
          push({ type: "dot", value });
          continue;
        }
        push({ type: "text", value });
      }
      do {
        block = stack.pop();
        if (block.type !== "root") {
          block.nodes.forEach((node) => {
            if (!node.nodes) {
              if (node.type === "open")
                node.isOpen = true;
              if (node.type === "close")
                node.isClose = true;
              if (!node.nodes)
                node.type = "text";
              node.invalid = true;
            }
          });
          const parent = stack[stack.length - 1];
          const index2 = parent.nodes.indexOf(block);
          parent.nodes.splice(index2, 1, ...block.nodes);
        }
      } while (stack.length > 0);
      push({ type: "eos" });
      return ast;
    };
    module2.exports = parse;
  }
});

// node_modules/braces/index.js
var require_braces = __commonJS({
  "node_modules/braces/index.js"(exports, module2) {
    "use strict";
    var stringify = require_stringify();
    var compile = require_compile();
    var expand = require_expand();
    var parse = require_parse();
    var braces = (input, options = {}) => {
      let output = [];
      if (Array.isArray(input)) {
        for (const pattern of input) {
          const result = braces.create(pattern, options);
          if (Array.isArray(result)) {
            output.push(...result);
          } else {
            output.push(result);
          }
        }
      } else {
        output = [].concat(braces.create(input, options));
      }
      if (options && options.expand === true && options.nodupes === true) {
        output = [...new Set(output)];
      }
      return output;
    };
    braces.parse = (input, options = {}) => parse(input, options);
    braces.stringify = (input, options = {}) => {
      if (typeof input === "string") {
        return stringify(braces.parse(input, options), options);
      }
      return stringify(input, options);
    };
    braces.compile = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      return compile(input, options);
    };
    braces.expand = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      let result = expand(input, options);
      if (options.noempty === true) {
        result = result.filter(Boolean);
      }
      if (options.nodupes === true) {
        result = [...new Set(result)];
      }
      return result;
    };
    braces.create = (input, options = {}) => {
      if (input === "" || input.length < 3) {
        return [input];
      }
      return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
    };
    module2.exports = braces;
  }
});

// node_modules/picomatch/lib/constants.js
var require_constants2 = __commonJS({
  "node_modules/picomatch/lib/constants.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DEFAULT_MAX_EXTGLOB_RECURSION = 0;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    };
    var POSIX_REGEX_SOURCE = {
      __proto__: null,
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      DEFAULT_MAX_EXTGLOB_RECURSION,
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        __proto__: null,
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      SEP: path.sep,
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/picomatch/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    var path = require("path");
    var win32 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants2();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path.sep === "\\";
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1)
        return input;
      if (input[idx - 1] === "\\")
        return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  }
});

// node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/picomatch/lib/scan.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants2();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true)
            continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK)
            isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob)
          glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module2.exports = scan;
  }
});

// node_modules/picomatch/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/picomatch/lib/parse.js"(exports, module2) {
    "use strict";
    var constants = require_constants2();
    var utils = require_utils2();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var splitTopLevel = (input) => {
      const parts = [];
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let value = "";
      let escaped = false;
      for (const ch of input) {
        if (escaped === true) {
          value += ch;
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          value += ch;
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          value += ch;
          continue;
        }
        if (quote === 0) {
          if (ch === "[") {
            bracket++;
          } else if (ch === "]" && bracket > 0) {
            bracket--;
          } else if (bracket === 0) {
            if (ch === "(") {
              paren++;
            } else if (ch === ")" && paren > 0) {
              paren--;
            } else if (ch === "|" && paren === 0) {
              parts.push(value);
              value = "";
              continue;
            }
          }
        }
        value += ch;
      }
      parts.push(value);
      return parts;
    };
    var isPlainBranch = (branch) => {
      let escaped = false;
      for (const ch of branch) {
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (/[?*+@!()[\]{}]/.test(ch)) {
          return false;
        }
      }
      return true;
    };
    var normalizeSimpleBranch = (branch) => {
      let value = branch.trim();
      let changed = true;
      while (changed === true) {
        changed = false;
        if (/^@\([^\\()[\]{}|]+\)$/.test(value)) {
          value = value.slice(2, -1);
          changed = true;
        }
      }
      if (!isPlainBranch(value)) {
        return;
      }
      return value.replace(/\\(.)/g, "$1");
    };
    var hasRepeatedCharPrefixOverlap = (branches) => {
      const values = branches.map(normalizeSimpleBranch).filter(Boolean);
      for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j < values.length; j++) {
          const a = values[i];
          const b = values[j];
          const char = a[0];
          if (!char || a !== char.repeat(a.length) || b !== char.repeat(b.length)) {
            continue;
          }
          if (a === b || a.startsWith(b) || b.startsWith(a)) {
            return true;
          }
        }
      }
      return false;
    };
    var parseRepeatedExtglob = (pattern, requireEnd = true) => {
      if (pattern[0] !== "+" && pattern[0] !== "*" || pattern[1] !== "(") {
        return;
      }
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let escaped = false;
      for (let i = 1; i < pattern.length; i++) {
        const ch = pattern[i];
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          continue;
        }
        if (quote === 1) {
          continue;
        }
        if (ch === "[") {
          bracket++;
          continue;
        }
        if (ch === "]" && bracket > 0) {
          bracket--;
          continue;
        }
        if (bracket > 0) {
          continue;
        }
        if (ch === "(") {
          paren++;
          continue;
        }
        if (ch === ")") {
          paren--;
          if (paren === 0) {
            if (requireEnd === true && i !== pattern.length - 1) {
              return;
            }
            return {
              type: pattern[0],
              body: pattern.slice(2, i),
              end: i
            };
          }
        }
      }
    };
    var getStarExtglobSequenceOutput = (pattern) => {
      let index = 0;
      const chars = [];
      while (index < pattern.length) {
        const match = parseRepeatedExtglob(pattern.slice(index), false);
        if (!match || match.type !== "*") {
          return;
        }
        const branches = splitTopLevel(match.body).map((branch2) => branch2.trim());
        if (branches.length !== 1) {
          return;
        }
        const branch = normalizeSimpleBranch(branches[0]);
        if (!branch || branch.length !== 1) {
          return;
        }
        chars.push(branch);
        index += match.end + 1;
      }
      if (chars.length < 1) {
        return;
      }
      const source = chars.length === 1 ? utils.escapeRegex(chars[0]) : `[${chars.map((ch) => utils.escapeRegex(ch)).join("")}]`;
      return `${source}*`;
    };
    var repeatedExtglobRecursion = (pattern) => {
      let depth = 0;
      let value = pattern.trim();
      let match = parseRepeatedExtglob(value);
      while (match) {
        depth++;
        value = match.body.trim();
        match = parseRepeatedExtglob(value);
      }
      return depth;
    };
    var analyzeRepeatedExtglob = (body, options) => {
      if (options.maxExtglobRecursion === false) {
        return { risky: false };
      }
      const max = typeof options.maxExtglobRecursion === "number" ? options.maxExtglobRecursion : constants.DEFAULT_MAX_EXTGLOB_RECURSION;
      const branches = splitTopLevel(body).map((branch) => branch.trim());
      if (branches.length > 1) {
        if (branches.some((branch) => branch === "") || branches.some((branch) => /^[*?]+$/.test(branch)) || hasRepeatedCharPrefixOverlap(branches)) {
          return { risky: true };
        }
      }
      for (const branch of branches) {
        const safeOutput = getStarExtglobSequenceOutput(branch);
        if (safeOutput) {
          return { risky: true, safeOutput };
        }
        if (repeatedExtglobRecursion(branch) > max) {
          return { risky: true };
        }
      }
      return { risky: false };
    };
    var parse = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win32 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win32);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output)
          append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        token.startIndex = state.index;
        token.tokensIndex = tokens.length;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        const literal = input.slice(token.startIndex, state.index + 1);
        const body = input.slice(token.startIndex + 2, state.index);
        const analysis = analyzeRepeatedExtglob(body, opts);
        if ((token.type === "plus" || token.type === "star") && analysis.risky) {
          const safeOutput = analysis.safeOutput ? (token.output ? "" : ONE_CHAR) + (opts.capture ? `(${analysis.safeOutput})` : analysis.safeOutput) : void 0;
          const open = tokens[token.tokensIndex];
          open.type = "text";
          open.value = literal;
          open.output = safeOutput || utils.escapeRegex(literal);
          for (let i = token.tokensIndex + 1; i < tokens.length; i++) {
            tokens[i].value = "";
            tokens[i].output = "";
            delete tokens[i].suffix;
          }
          state.output = token.output + open.output;
          state.backtrack = true;
          push({ type: "paren", extglob: true, value, output: "" });
          decrement("parens");
          return;
        }
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".")
              prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const win32 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win32);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true)
          return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match)
              return;
            const source2 = create(match[1]);
            if (!source2)
              return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse;
  }
});

// node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/picomatch/lib/picomatch.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var scan = require_scan();
    var parse = require_parse2();
    var utils = require_utils2();
    var constants = require_constants2();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch2 of fns) {
            const state2 = isMatch2(str);
            if (state2)
              return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch: isMatch2, match, output } = picomatch.test(input, regex, options, { glob, posix });
        const result = { glob, state, regex, posix, input, output, match, isMatch: isMatch2 };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch2 === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
      const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
      return regex.test(path.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern))
        return pattern.map((p) => picomatch.parse(p, options));
      return parse(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true)
          throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module2.exports = picomatch;
  }
});

// node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/picomatch/index.js"(exports, module2) {
    "use strict";
    module2.exports = require_picomatch();
  }
});

// node_modules/micromatch/index.js
var require_micromatch = __commonJS({
  "node_modules/micromatch/index.js"(exports, module2) {
    "use strict";
    var util = require("util");
    var braces = require_braces();
    var picomatch = require_picomatch2();
    var utils = require_utils2();
    var isEmptyString = (v) => v === "" || v === "./";
    var hasBraces = (v) => {
      const index = v.indexOf("{");
      return index > -1 && v.indexOf("}", index) > -1;
    };
    var micromatch = (list, patterns, options) => {
      patterns = [].concat(patterns);
      list = [].concat(list);
      let omit = /* @__PURE__ */ new Set();
      let keep = /* @__PURE__ */ new Set();
      let items = /* @__PURE__ */ new Set();
      let negatives = 0;
      let onResult = (state) => {
        items.add(state.output);
        if (options && options.onResult) {
          options.onResult(state);
        }
      };
      for (let i = 0; i < patterns.length; i++) {
        let isMatch2 = picomatch(String(patterns[i]), { ...options, onResult }, true);
        let negated = isMatch2.state.negated || isMatch2.state.negatedExtglob;
        if (negated)
          negatives++;
        for (let item of list) {
          let matched = isMatch2(item, true);
          let match = negated ? !matched.isMatch : matched.isMatch;
          if (!match)
            continue;
          if (negated) {
            omit.add(matched.output);
          } else {
            omit.delete(matched.output);
            keep.add(matched.output);
          }
        }
      }
      let result = negatives === patterns.length ? [...items] : [...keep];
      let matches = result.filter((item) => !omit.has(item));
      if (options && matches.length === 0) {
        if (options.failglob === true) {
          throw new Error(`No matches found for "${patterns.join(", ")}"`);
        }
        if (options.nonull === true || options.nullglob === true) {
          return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
        }
      }
      return matches;
    };
    micromatch.match = micromatch;
    micromatch.matcher = (pattern, options) => picomatch(pattern, options);
    micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    micromatch.any = micromatch.isMatch;
    micromatch.not = (list, patterns, options = {}) => {
      patterns = [].concat(patterns).map(String);
      let result = /* @__PURE__ */ new Set();
      let items = [];
      let onResult = (state) => {
        if (options.onResult)
          options.onResult(state);
        items.push(state.output);
      };
      let matches = new Set(micromatch(list, patterns, { ...options, onResult }));
      for (let item of items) {
        if (!matches.has(item)) {
          result.add(item);
        }
      }
      return [...result];
    };
    micromatch.contains = (str, pattern, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      if (Array.isArray(pattern)) {
        return pattern.some((p) => micromatch.contains(str, p, options));
      }
      if (typeof pattern === "string") {
        if (isEmptyString(str) || isEmptyString(pattern)) {
          return false;
        }
        if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern)) {
          return true;
        }
      }
      return micromatch.isMatch(str, pattern, { ...options, contains: true });
    };
    micromatch.matchKeys = (obj, patterns, options) => {
      if (!utils.isObject(obj)) {
        throw new TypeError("Expected the first argument to be an object");
      }
      let keys = micromatch(Object.keys(obj), patterns, options);
      let res = {};
      for (let key of keys)
        res[key] = obj[key];
      return res;
    };
    micromatch.some = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch2 = picomatch(String(pattern), options);
        if (items.some((item) => isMatch2(item))) {
          return true;
        }
      }
      return false;
    };
    micromatch.every = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch2 = picomatch(String(pattern), options);
        if (!items.every((item) => isMatch2(item))) {
          return false;
        }
      }
      return true;
    };
    micromatch.all = (str, patterns, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      return [].concat(patterns).every((p) => picomatch(p, options)(str));
    };
    micromatch.capture = (glob, input, options) => {
      let posix = utils.isWindows(options);
      let regex = picomatch.makeRe(String(glob), { ...options, capture: true });
      let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);
      if (match) {
        return match.slice(1).map((v) => v === void 0 ? "" : v);
      }
    };
    micromatch.makeRe = (...args) => picomatch.makeRe(...args);
    micromatch.scan = (...args) => picomatch.scan(...args);
    micromatch.parse = (patterns, options) => {
      let res = [];
      for (let pattern of [].concat(patterns || [])) {
        for (let str of braces(String(pattern), options)) {
          res.push(picomatch.parse(str, options));
        }
      }
      return res;
    };
    micromatch.braces = (pattern, options) => {
      if (typeof pattern !== "string")
        throw new TypeError("Expected a string");
      if (options && options.nobrace === true || !hasBraces(pattern)) {
        return [pattern];
      }
      return braces(pattern, options);
    };
    micromatch.braceExpand = (pattern, options) => {
      if (typeof pattern !== "string")
        throw new TypeError("Expected a string");
      return micromatch.braces(pattern, { ...options, expand: true });
    };
    micromatch.hasBraces = hasBraces;
    module2.exports = micromatch;
  }
});

// src/core/settings.ts
var settings_exports = {};
__export(settings_exports, {
  DEFAULT_BACKUP_SETTINGS: () => DEFAULT_BACKUP_SETTINGS,
  DEFAULT_EXCLUDE_PATTERNS: () => DEFAULT_EXCLUDE_PATTERNS,
  DEFAULT_SETTINGS: () => DEFAULT_SETTINGS,
  createSiteProfile: () => createSiteProfile
});
function createSiteProfile(partial = {}) {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `site-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    githubRepo: "",
    githubBranch: "",
    cloudflareProject: "",
    siteUrl: "",
    publishScope: partial.publishScope || "vault",
    publishPaths: partial.publishPaths || [],
    authorName: "",
    sidebarTitle: "",
    siteDescription: "",
    excludePatterns: [...DEFAULT_EXCLUDE_PATTERNS],
    includeAttachments: true,
    isPublished: false,
    lastPublished: "",
    lastNoteCount: 0,
    lastPublishFailed: false,
    lastPublishError: "",
    hostingProvider: "cloudflare",
    ...partial
  };
}
var DEFAULT_EXCLUDE_PATTERNS, DEFAULT_BACKUP_SETTINGS, DEFAULT_SETTINGS;
var init_settings = __esm({
  "src/core/settings.ts"() {
    DEFAULT_EXCLUDE_PATTERNS = ["private/**", "*.private.md", "Templates/**"];
    DEFAULT_BACKUP_SETTINGS = {
      repository: "",
      repoVisibility: "private",
      backupOnChange: true,
      intervalMinutes: 60,
      lastBackupAttemptAt: "",
      lastBackupAt: "",
      lastBackupError: ""
    };
    DEFAULT_SETTINGS = {
      githubOwner: "",
      githubToken: "",
      cloudflareAccount: "",
      cloudflareToken: "",
      sites: [],
      activeSiteId: "",
      setupComplete: false,
      enableBackup: false,
      enablePublish: true,
      backup: { ...DEFAULT_BACKUP_SETTINGS },
      masterRepository: "",
      masterRepositoryPrivate: false,
      defaultViewLocation: "left"
    };
  }
});

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => NoteFlarePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian23 = require("obsidian");

// src/api/githubApi.ts
var import_obsidian = require("obsidian");
async function doRequest(url, options = {}) {
  const resp = await (0, import_obsidian.requestUrl)({
    url,
    method: options.method || "GET",
    headers: options.headers,
    body: options.body,
    throw: false
  });
  return {
    ok: resp.status >= 200 && resp.status < 300,
    status: resp.status,
    json: async () => resp.json,
    text: async () => resp.text
  };
}
var GITHUB_API = "https://api.github.com";
var BATCH_SIZE = 10;
var RATE_LIMIT_WAIT_MS = 6e4;
var GitHubApi = class {
  constructor(token, owner, repo, branch = "") {
    this.token = token;
    this.owner = owner;
    this.repo = repo.trim().replace(/\s+/g, "-");
    this.branch = branch;
  }
  get headers() {
    return {
      Authorization: `token ${this.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json"
    };
  }
  async getAuthenticatedUser() {
    const resp = await doRequest(`${GITHUB_API}/user`, { headers: this.headers });
    if (!resp.ok) {
      throw new Error("Invalid GitHub token or missing repo permission");
    }
    const data = await resp.json();
    return data == null ? void 0 : data.login;
  }
  /** The repo's default branch (e.g. `main`). */
  async getDefaultBranch() {
    const resp = await doRequest(`${GITHUB_API}/repos/${this.owner}/${this.repo}`, {
      headers: this.headers
    });
    if (!resp.ok) {
      throw new Error("Could not read repository info from GitHub. Check the token and repo name.");
    }
    const data = await resp.json();
    return (data == null ? void 0 : data.default_branch) || "main";
  }
  /**
   * Create an empty public repo, initialised with one commit on the default
   * branch (`main`). NoteFlare then commits the user's content plus a mdgarden
   * `package.json`/`mdgarden.config.json` on top — there's no template fork, so
   * there's no v4/v5 branch drift to manage. Idempotent: a 422 (already exists)
   * is treated as success so setup can be re-run.
   */
  async createRepo(privateRepo = false) {
    var _a, _b, _c;
    const resp = await doRequest(`${GITHUB_API}/user/repos`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: this.repo,
        private: privateRepo,
        auto_init: true,
        description: privateRepo ? "Private vault backup managed by NoteFlare" : "Published with NoteFlare (mdgarden)"
      })
    });
    if (resp.status === 422) {
      const errBody = await resp.json().catch(() => ({}));
      const ghMessage = (_a = errBody == null ? void 0 : errBody.message) != null ? _a : "";
      const errors = (_b = errBody == null ? void 0 : errBody.errors) != null ? _b : [];
      const alreadyExists = errors.some(
        (e) => {
          var _a2;
          return ((_a2 = e.message) != null ? _a2 : "").toLowerCase().includes("already exist");
        }
      ) || ghMessage.toLowerCase().includes("already exist");
      if (alreadyExists && await this.repoExists()) {
        return;
      }
      throw new Error(
        `A GitHub repository named "${this.repo}" already exists. Please choose a different site name and try again.`
      );
    }
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(`Failed to create GitHub repo: ${(_c = err.message) != null ? _c : "Unknown error"}`);
    }
  }
  /**
   * Configures GitHub Pages for the repository using GitHub Actions as the source.
   * This prevents the 404 error during the first deploy-pages action.
   */
  async enableGitHubPages() {
    const resp = await doRequest(`${GITHUB_API}/repos/${this.owner}/${this.repo}/pages`, {
      method: "POST",
      headers: {
        ...this.headers,
        Accept: "application/vnd.github.v3+json"
      },
      body: JSON.stringify({
        build_type: "workflow"
      })
    });
    if (!resp.ok && resp.status !== 409) {
      const text = await resp.text().catch(() => "");
      throw new Error(`Failed to enable GitHub Pages: ${resp.status} ${text}`);
    }
  }
  /**
   * Returns high-level repository metadata for the live status dashboard.
   * Returns null (never throws) so callers can fall back to cached data.
   */
  async getRepoInfo() {
    try {
      const resp = await doRequest(`${GITHUB_API}/repos/${this.owner}/${this.repo}`, {
        headers: this.headers
      });
      if (!resp.ok)
        return null;
      const data = await resp.json();
      return {
        htmlUrl: data.html_url || "",
        pushedAt: data.pushed_at || "",
        isPrivate: data.private || false,
        description: data.description || ""
      };
    } catch (e) {
      return null;
    }
  }
  /**
   * Returns the most recent workflow run for the given workflow file.
   * `workflowFile` is the filename under `.github/workflows/`, e.g. `deploy.yml`.
   * Returns null (never throws) on any error.
   */
  async getLatestWorkflowRun(workflowFile) {
    var _a;
    try {
      const resp = await doRequest(
        `${GITHUB_API}/repos/${this.owner}/${this.repo}/actions/workflows/${encodeURIComponent(workflowFile)}/runs?per_page=1`,
        { headers: this.headers }
      );
      if (!resp.ok)
        return null;
      const data = await resp.json();
      const run = (_a = data.workflow_runs) == null ? void 0 : _a[0];
      if (!run)
        return null;
      return {
        status: run.status || "",
        conclusion: run.conclusion || "",
        htmlUrl: run.html_url || "",
        createdAt: run.created_at || "",
        updatedAt: run.updated_at || ""
      };
    } catch (e) {
      return null;
    }
  }
  /**
   * Returns the tip commit info for a branch.
   * Returns null (never throws) on any error.
   */
  async getLatestCommit(branch) {
    const ref = branch || this.branch || "main";
    try {
      const resp = await doRequest(
        `${GITHUB_API}/repos/${this.owner}/${this.repo}/commits/${encodeURIComponent(ref)}`,
        { headers: this.headers }
      );
      if (!resp.ok)
        return null;
      const data = await resp.json();
      const commit = data.commit;
      const commitAuthor = commit == null ? void 0 : commit.author;
      return {
        sha: (data.sha || "").slice(0, 7),
        message: ((commit == null ? void 0 : commit.message) || "").split("\n")[0],
        date: (commitAuthor == null ? void 0 : commitAuthor.date) || "",
        author: (commitAuthor == null ? void 0 : commitAuthor.name) || "",
        htmlUrl: data.html_url || ""
      };
    } catch (e) {
      return null;
    }
  }
  /** Thin JSON wrapper around the GitHub REST API; throws with .status on error. */
  async gh(path, method, body) {
    var _a;
    const resp = await doRequest(`${GITHUB_API}${path}`, {
      method,
      headers: this.headers,
      body: body === void 0 ? void 0 : JSON.stringify(body)
    });
    if (!resp.ok) {
      const errBody = await resp.json().catch(() => ({}));
      const err = new Error((_a = errBody == null ? void 0 : errBody.message) != null ? _a : `GitHub request failed (${resp.status})`);
      err.status = resp.status;
      throw err;
    }
    return await resp.json();
  }
  /**
   * Upload every file as a SINGLE git commit via the Git Data API
   * (blobs → tree → commit → move branch ref), instead of one Contents-API PUT
   * per file. One commit means Cloudflare runs exactly one build per publish,
   * and there are no per-file SHA conflicts (the new tree is layered on the
   * current tree with `base_tree`), which kills the 409/422 errors entirely.
   */
  async commitFiles(files, message, onProgress, onRateLimit, mirrorPrefix = "", options) {
    const result = { success: true, uploaded: 0, noteCount: 0, failed: 0, errors: [], fixed: 0, issues: [] };
    if (files.length === 0)
      return result;
    try {
      const exists = await this.repoExists();
      if (!exists) {
        const isPrivate = (options == null ? void 0 : options.isPrivate) || false;
        await this.createRepo(isPrivate);
        const ready = await this.waitForRepo(3e4);
        if (!ready) {
          result.success = false;
          result.errors.push("Timed out waiting for repository creation on GitHub.");
          return result;
        }
      }
    } catch (e) {
      result.success = false;
      result.errors.push(`Failed to check or create repository: ${e.message}`);
      return result;
    }
    if (!this.branch) {
      result.success = false;
      result.errors.push("No branch specified. Run setup to detect the repository default branch.");
      return result;
    }
    const branch = this.branch;
    const refPath = `/repos/${this.owner}/${this.repo}/git/refs/heads/${encodeURIComponent(branch)}`;
    let headSha = null;
    let baseTreeSha = null;
    let branchExists = true;
    try {
      const ref = await this.gh(refPath, "GET");
      headSha = ref.object.sha;
      const headCommit = await this.gh(
        `/repos/${this.owner}/${this.repo}/git/commits/${headSha}`,
        "GET"
      );
      baseTreeSha = headCommit.tree.sha;
    } catch (err) {
      if (err.status === 404) {
        branchExists = false;
      } else {
        result.success = false;
        result.errors.push(`Could not read branch "${branch}": ${err.message}`);
        return result;
      }
    }
    const treeItems = [];
    let done = 0;
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      const batch = files.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (file) => {
          try {
            if (file.content === null) {
              treeItems.push({ path: file.path, mode: "100644", type: "blob", sha: null });
            } else {
              const sha = await this.createBlobWithRetry(file.content, onRateLimit);
              treeItems.push({ path: file.path, mode: "100644", type: "blob", sha });
            }
            result.uploaded++;
          } catch (err) {
            result.failed++;
            result.errors.push(`${file.path}: ${err.message}`);
          }
          done++;
          onProgress(done, files.length);
        })
      );
      if (i + BATCH_SIZE < files.length) {
        await new Promise((r) => window.setTimeout(r, 100));
      }
    }
    if (result.uploaded === 0) {
      result.success = false;
      return result;
    }
    if (result.failed > 0) {
      for (let index = treeItems.length - 1; index >= 0; index--) {
        if (treeItems[index].sha === null)
          treeItems.splice(index, 1);
      }
      if (treeItems.length === 0) {
        result.success = false;
        return result;
      }
    }
    if (mirrorPrefix && result.failed === 0 && baseTreeSha) {
      try {
        const full = await this.gh(
          `/repos/${this.owner}/${this.repo}/git/trees/${baseTreeSha}?recursive=1`,
          "GET"
        );
        const keep = new Set(files.map((f) => f.path));
        for (const entry of full.tree) {
          if (entry.type === "blob" && entry.path.startsWith(mirrorPrefix) && !keep.has(entry.path)) {
            treeItems.push({ path: entry.path, mode: "100644", type: "blob", sha: null });
          }
        }
      } catch (e) {
      }
    }
    try {
      const tree = await this.gh(
        `/repos/${this.owner}/${this.repo}/git/trees`,
        "POST",
        baseTreeSha ? { base_tree: baseTreeSha, tree: treeItems } : { tree: treeItems }
      );
      const commit = await this.gh(
        `/repos/${this.owner}/${this.repo}/git/commits`,
        "POST",
        headSha ? { message, tree: tree.sha, parents: [headSha] } : { message, tree: tree.sha, parents: [] }
      );
      result.commitSha = commit.sha;
      if (branchExists) {
        await this.gh(refPath, "PATCH", { sha: commit.sha, force: false });
      } else {
        await this.gh(`/repos/${this.owner}/${this.repo}/git/refs`, "POST", {
          ref: `refs/heads/${branch}`,
          sha: commit.sha
        });
      }
    } catch (err) {
      result.success = false;
      result.errors.push(`Commit failed: ${err.message}`);
      return result;
    }
    if (result.failed > 0)
      result.success = false;
    return result;
  }
  async createBlobWithRetry(base64Content, onRateLimit) {
    let lastErr = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const blob = await this.gh(
          `/repos/${this.owner}/${this.repo}/git/blobs`,
          "POST",
          { content: base64Content, encoding: "base64" }
        );
        return blob.sha;
      } catch (err) {
        lastErr = err;
        const status = lastErr.status;
        const msg = lastErr.message.toLowerCase();
        const rateLimited = status === 429 || status === 403 && (msg.includes("rate limit") || msg.includes("abuse") || msg.includes("secondary"));
        if (status === 404 || status === 401 || status === 403 && !rateLimited) {
          throw lastErr;
        }
        if (rateLimited) {
          await this.waitWithCountdown(RATE_LIMIT_WAIT_MS, onRateLimit);
        } else if (attempt < 2) {
          await new Promise((r) => window.setTimeout(r, 1e3 * Math.pow(2, attempt)));
        }
      }
    }
    throw lastErr != null ? lastErr : new Error("Blob creation failed");
  }
  async waitWithCountdown(ms, onTick) {
    if (!onTick) {
      await new Promise((r) => window.setTimeout(r, ms));
      return;
    }
    let secsLeft = Math.ceil(ms / 1e3);
    const interval = window.setInterval(() => {
      secsLeft--;
      if (secsLeft >= 0)
        onTick(secsLeft);
    }, 1e3);
    await new Promise((r) => window.setTimeout(r, ms));
    window.clearInterval(interval);
  }
  async repoExists() {
    const resp = await doRequest(
      `${GITHUB_API}/repos/${this.owner}/${this.repo}`,
      { headers: this.headers }
    );
    return resp.ok;
  }
  async isRepoPrivate() {
    const resp = await doRequest(
      `${GITHUB_API}/repos/${this.owner}/${this.repo}`,
      { headers: this.headers }
    );
    if (!resp.ok) {
      throw new Error("Could not verify backup storage privacy.");
    }
    const data = await resp.json();
    return data.private === true;
  }
  async waitForRepo(maxWaitMs = 3e4) {
    const start = Date.now();
    while (Date.now() - start < maxWaitMs) {
      if (await this.repoExists())
        return true;
      await new Promise((r) => window.setTimeout(r, 2e3));
    }
    return false;
  }
  /**
   * Fetch the flat file tree for the repository's internal storage reference.
   * Returns an array of { path, sha, type } objects for all blobs (files).
   * Used by BackupEngine to avoid re-uploading unchanged files.
   */
  async listTree(branch) {
    var _a;
    const ref = branch || this.branch || "main";
    const data = await this.gh(
      `/repos/${this.owner}/${this.repo}/git/trees/${encodeURIComponent(ref)}?recursive=1`,
      "GET"
    );
    return ((_a = data.tree) != null ? _a : []).filter((item) => item.type === "blob");
  }
  /**
   * Remove a site's entire sub-folder (`sites/<siteId>/`) from the master repo
   * in a single commit using null-SHA tree entries (the same mirror-deletion
   * mechanism used by publish). Does NOT delete the master repo — other sites
   * may still be living there. Best-effort: if the folder doesn't exist or the
   * repo is unreachable, this returns without throwing.
   */
  async deleteSiteFolder(siteId, branch) {
    const prefix = `sites/${siteId}/`;
    let headSha;
    let baseTreeSha;
    const refPath = `/repos/${this.owner}/${this.repo}/git/refs/heads/${encodeURIComponent(branch)}`;
    try {
      const ref = await this.gh(refPath, "GET");
      headSha = ref.object.sha;
      const headCommit = await this.gh(
        `/repos/${this.owner}/${this.repo}/git/commits/${headSha}`,
        "GET"
      );
      baseTreeSha = headCommit.tree.sha;
    } catch (e) {
      return;
    }
    let toDelete = [];
    try {
      const fullTree = await this.gh(
        `/repos/${this.owner}/${this.repo}/git/trees/${baseTreeSha}?recursive=1`,
        "GET"
      );
      toDelete = fullTree.tree.filter((item) => item.type === "blob" && item.path.startsWith(prefix)).map((item) => ({ path: item.path, mode: "100644", type: "blob", sha: null }));
    } catch (e) {
      return;
    }
    if (toDelete.length === 0)
      return;
    const tree = await this.gh(
      `/repos/${this.owner}/${this.repo}/git/trees`,
      "POST",
      { base_tree: baseTreeSha, tree: toDelete }
    );
    const commit = await this.gh(
      `/repos/${this.owner}/${this.repo}/git/commits`,
      "POST",
      { message: `NoteFlare: remove site ${siteId}`, tree: tree.sha, parents: [headSha] }
    );
    await this.gh(refPath, "PATCH", { sha: commit.sha, force: false });
  }
};

// src/api/cloudflareApi.ts
var import_obsidian2 = require("obsidian");
var CF_API = "https://api.cloudflare.com/client/v4";
var MDGARDEN_BUILD_COMMAND = "npm ci || npm install && npx mdgarden build";
var CloudflareApi = class {
  constructor(token, accountId) {
    this.token = token;
    this.accountId = accountId;
  }
  get headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json"
    };
  }
  async request(path, method = "GET", body) {
    var _a, _b, _c, _d;
    try {
      const resp = await (0, import_obsidian2.requestUrl)({
        url: `${CF_API}${path}`,
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : void 0,
        throw: false
      });
      const data = (_a = resp.json) != null ? _a : {};
      if (resp.status >= 400) {
        const message = (_d = (_c = (_b = data.errors) == null ? void 0 : _b[0]) == null ? void 0 : _c.message) != null ? _d : this.messageForStatus(resp.status);
        const err = new Error(message);
        err.status = resp.status;
        throw err;
      }
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message.toLowerCase().includes("failed to fetch")) {
        const fetchErr = new Error(
          "Could not reach Cloudflare. Check your internet connection, firewall, or proxy, then try again."
        );
        fetchErr.status = 500;
        throw fetchErr;
      }
      throw err;
    }
  }
  messageForStatus(status) {
    if (status === 401 || status === 403) {
      return "Cloudflare rejected this token. Create an Account API Token with Cloudflare Pages: Edit (and Workers Scripts: Edit) permissions.";
    }
    if (status === 404) {
      return "Cloudflare account or Pages project not found. Double-check the Account ID and project name.";
    }
    if (status >= 500) {
      return "Cloudflare is temporarily unavailable. Please try again in a moment.";
    }
    return "Cloudflare request failed.";
  }
  /**
   * Lists the accounts this token can reach and returns the first id.
   * Lets the wizard auto-detect the Account ID so the user never has to copy
   * the 32-character value out of the dashboard by hand. Requires the token to
   * include Account Settings: Read (bundled into our token template link).
   */
  async getAccountId() {
    var _a, _b;
    const data = await this.request("/accounts");
    const accounts = (_a = data.result) != null ? _a : [];
    const id = (_b = accounts[0]) == null ? void 0 : _b.id;
    if (!id) {
      throw new Error(
        'Could not read any Cloudflare account from this token. Add the "Account Settings: Read" permission, or paste your Account ID manually.'
      );
    }
    return id;
  }
  async createProject(name, githubOwner, repo, branch, rootDir = "") {
    var _a, _b;
    const data = await this.request(
      `/accounts/${this.accountId}/pages/projects`,
      "POST",
      {
        name,
        source: {
          type: "github",
          config: {
            owner: githubOwner,
            repo_name: repo,
            // The repo's default branch (main). Building a non-existent branch
            // yields a blank site / 522.
            production_branch: branch,
            deployments_enabled: true
          }
        },
        build_config: {
          build_command: MDGARDEN_BUILD_COMMAND,
          destination_dir: "public",
          root_dir: rootDir
        }
      }
    );
    const result = (_a = data.result) != null ? _a : {};
    const rawSubdomain = (_b = result.subdomain) != null ? _b : name;
    const subdomain = rawSubdomain.replace(/\.pages\.dev$/, "");
    return `${subdomain}.pages.dev`;
  }
  /**
   * Repair the build settings on an EXISTING project so a re-publish self-heals
   * a project that was created with a bad build command or wrong branch — the
   * user never has to edit the Cloudflare dashboard. Called every publish.
   * - build_command must install deps before `npx mdgarden build` (see above).
   * - production_branch must be the repo's real default branch (main) or
   *   Cloudflare builds a non-existent branch → blank site / 522.
   */
  async configureBuild(name, githubOwner, repo, branch, rootDir = "") {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      "PATCH",
      {
        build_config: {
          build_command: MDGARDEN_BUILD_COMMAND,
          destination_dir: "public",
          root_dir: rootDir
        },
        source: {
          type: "github",
          config: {
            owner: githubOwner,
            repo_name: repo,
            production_branch: branch,
            deployments_enabled: true
          }
        }
      }
    );
  }
  /**
   * Forces a fresh production build. Content commits normally trigger a build
   * via the git webhook, but firing this explicitly guarantees the latest notes
   * actually get deployed. Best-effort — the caller treats failure as non-fatal.
   */
  async triggerDeployment(name, branch) {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}/deployments`,
      "POST",
      branch ? { branch } : void 0
    );
  }
  async getProject(name) {
    var _a;
    const data = await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`
    );
    const result = data.result;
    const rawSubdomain = (_a = result == null ? void 0 : result.subdomain) != null ? _a : name;
    const subdomain = rawSubdomain.replace(/\.pages\.dev$/, "");
    return `${subdomain}.pages.dev`;
  }
  async enableDeployment(name) {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      "PATCH",
      {
        deployment_configs: { production: { deployment_enabled: true } }
      }
    );
  }
  /**
   * Pause a Cloudflare Pages deployment — takes the site offline without
   * deleting the project or any content. `enableDeployment` restores it.
   * This is the correct backend for "Unpublish".
   */
  async disableDeployment(name) {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      "PATCH",
      {
        deployment_configs: { production: { deployment_enabled: false } }
      }
    );
  }
  async deleteProject(name) {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      "DELETE"
    );
  }
  async listDeployments(name) {
    return this.request(
      `/accounts/${this.accountId}/pages/projects/${name}/deployments`
    );
  }
};

// src/publish/fileCollector.ts
var import_obsidian3 = require("obsidian");
var import_micromatch = __toESM(require_micromatch());

// src/core/constants.ts
var ATTACHMENT_EXTS = /* @__PURE__ */ new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "webp",
  "pdf"
]);
var NODE_VERSION = "24";
var MDGARDEN_VERSION = "latest";
var GITHUB_ACTIONS_WORKFLOW = `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Build all sites
        run: |
          mkdir -p build_output/sites
          found_sites=0
          for site_dir in sites/*/; do
            if [ -f "\${site_dir}package.json" ]; then
              echo "Building site in \${site_dir}..."
              (
                cd "\${site_dir}"
                npm ci || npm install
                npx mdgarden build
              )
              site_id=$(basename "\${site_dir}")
              cp -r "\${site_dir}public" "build_output/sites/\${site_id}"
              found_sites=$((found_sites + 1))
            fi
          done
          if [ "$found_sites" -eq 0 ]; then
            echo "No sites found to build."
            mkdir -p build_output
            echo "<h1>No sites published yet</h1>" > build_output/index.html
          else
            latest_site=""
            latest_time=0
            for site_dir in sites/*/; do
              if [ -f "\${site_dir}package.json" ]; then
                mtime=$(git log -1 --format="%ct" "\${site_dir}" 2>/dev/null || echo 0)
                if [ "$mtime" -gt "$latest_time" ]; then
                  latest_time="$mtime"
                  latest_site=$(basename "\${site_dir}")
                fi
              fi
            done
            if [ -z "$latest_site" ]; then
              latest_site=$(ls -1 build_output/sites | head -n 1)
            fi
            if [ -n "$latest_site" ]; then
              echo "Deploying '$latest_site' to root..."
              cp -r "sites/\${latest_site}/public/." build_output/
            fi
          fi
          mv build_output public
      - uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

// src/publish/fileCollector.ts
var FileCollector = class {
  constructor(app, site) {
    this.app = app;
    this.site = site;
    this.publishScope = site.publishScope || "vault";
    this.publishPaths = (site.publishPaths || []).map((p) => p.trim().replace(/^\/+|\/+$/g, "")).filter(Boolean);
  }
  async collect() {
    const result = [];
    if (this.publishScope === "selected") {
      const explicitFiles = /* @__PURE__ */ new Set();
      for (const path of this.publishPaths) {
        const abstractFile = this.app.vault.getAbstractFileByPath(path);
        if (abstractFile instanceof import_obsidian3.TFile) {
          if (abstractFile.extension === "md" && !this.isExcluded(abstractFile.path)) {
            if (!result.some((f) => f.path === abstractFile.path)) {
              result.push(abstractFile);
              explicitFiles.add(abstractFile.path);
            }
          }
        } else if (abstractFile instanceof import_obsidian3.TFolder) {
          const folderPrefix = path + "/";
          for (const file of this.app.vault.getFiles()) {
            if (file.path.startsWith(folderPrefix) && !this.isExcluded(file.path)) {
              if (file.extension === "md") {
                if (!result.some((f) => f.path === file.path)) {
                  result.push(file);
                }
              } else if (this.site.includeAttachments && ATTACHMENT_EXTS.has(file.extension.toLowerCase())) {
                if (!result.some((f) => f.path === file.path)) {
                  result.push(file);
                }
              }
            }
          }
        }
      }
      if (this.site.includeAttachments) {
        const extraAttachments = [];
        for (const file of result) {
          if (explicitFiles.has(file.path)) {
            const cache = this.app.metadataCache.getCache(file.path);
            const linksAndEmbeds = [
              ...(cache == null ? void 0 : cache.links) || [],
              ...(cache == null ? void 0 : cache.embeds) || []
            ];
            for (const item of linksAndEmbeds) {
              const destFile = this.app.metadataCache.getFirstLinkpathDest(item.link, file.path);
              if (destFile && ATTACHMENT_EXTS.has(destFile.extension.toLowerCase())) {
                if (!this.isExcluded(destFile.path) && !result.some((f) => f.path === destFile.path) && !extraAttachments.some((f) => f.path === destFile.path)) {
                  extraAttachments.push(destFile);
                }
              }
            }
          }
        }
        result.push(...extraAttachments);
      }
      return result;
    }
    for (const file of this.app.vault.getFiles()) {
      if (this.isExcluded(file.path))
        continue;
      if (file.extension === "md") {
        result.push(file);
      } else if (this.site.includeAttachments && ATTACHMENT_EXTS.has(file.extension.toLowerCase())) {
        result.push(file);
      }
    }
    return result;
  }
  async readAsBase64(file) {
    const buffer = await this.app.vault.readBinary(file);
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  isExcluded(path) {
    if (this.site.excludePatterns.length === 0)
      return false;
    return (0, import_micromatch.isMatch)(path, this.site.excludePatterns, { dot: true });
  }
};

// src/publish/transformer.ts
var import_obsidian5 = require("obsidian");

// src/publish/contentValidator.ts
var import_obsidian4 = require("obsidian");
var LEADING_BLOCK_RE = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)/;
function hasValidLeadingFrontmatter(raw) {
  const s = raw.replace(/^\ufeff/, "");
  const m = s.match(LEADING_BLOCK_RE);
  if (!m)
    return false;
  try {
    (0, import_obsidian4.parseYaml)(m[1]);
    return true;
  } catch (e) {
    return false;
  }
}
function looksLikeFrontmatterOpener(raw) {
  const stripped = raw.replace(/^\ufeff/, "").replace(/^[ \t\r\n]+/, "");
  return stripped.startsWith("---");
}
function inspectFrontmatter(raw) {
  if (hasValidLeadingFrontmatter(raw))
    return { status: "clean" };
  if (looksLikeFrontmatterOpener(raw)) {
    return { status: "fixed", reason: "stray or unparseable \u201C---\u201D at the top \u2014 would break the mdgarden build" };
  }
  return { status: "clean" };
}
function normalizeFrontmatter(raw, title) {
  if (hasValidLeadingFrontmatter(raw))
    return raw;
  const safeTitle = title.replace(/"/g, "'");
  return `---
title: "${safeTitle}"
---

${raw}`;
}

// src/publish/transformer.ts
var LEADING_BLOCK_RE2 = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)/;
var Transformer = class {
  transform(content, filePath, title) {
    var _a, _b;
    const noteTitle = (_b = title != null ? title : (_a = filePath.split("/").pop()) == null ? void 0 : _a.replace(/\.md$/, "")) != null ? _b : "Untitled";
    let result = normalizeFrontmatter(content, noteTitle);
    result = this.stripPrivateFrontmatter(result);
    return result;
  }
  /**
   * Remove `private`/`draft` keys from the leading frontmatter block. Parses the
   * block with Obsidian's YAML engine (robust against quoting/nesting) rather
   * than splitting lines. Assumes a valid leading block (guaranteed by
   * `normalizeFrontmatter` upstream); leaves content untouched otherwise.
   */
  stripPrivateFrontmatter(content) {
    var _a, _b;
    const m = content.match(LEADING_BLOCK_RE2);
    if (!m)
      return content;
    let data;
    try {
      data = (_a = (0, import_obsidian5.parseYaml)(m[1])) != null ? _a : {};
    } catch (e) {
      return content;
    }
    delete data.private;
    delete data.draft;
    const keys = Object.keys(data);
    const yaml = keys.length ? (0, import_obsidian5.stringifyYaml)(data).trimEnd() : "";
    const block = yaml ? `---
${yaml}
---` : `---
---`;
    const trailing = m[2] ? "\n" : "";
    return content.slice(0, m.index) + block + trailing + content.slice(((_b = m.index) != null ? _b : 0) + m[0].length);
  }
};

// src/publish/publisher.ts
var RECONNECT_HINT = `If the build can't start, reconnect Cloudflare to GitHub: install/authorize the "Cloudflare Workers and Pages" GitHub App for this repo.`;
function textToBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
var Publisher = class {
  constructor(settings, site, app, onProgress) {
    this.settings = settings;
    this.site = site;
    this.app = app;
    this.onProgress = onProgress;
  }
  /** Effective hosting provider for this site. */
  get hostingProvider() {
    return this.site.hostingProvider;
  }
  async publish() {
    var _a, _b;
    const repo = this.settings.masterRepository;
    let branch = this.site.githubBranch || "main";
    try {
      const probe = new GitHubApi(
        this.settings.githubToken,
        this.settings.githubOwner,
        repo
      );
      branch = await probe.getDefaultBranch();
      this.site.githubBranch = branch;
      const isPrivate = await probe.isRepoPrivate();
      this.settings.masterRepositoryPrivate = isPrivate;
    } catch (e) {
    }
    const github = new GitHubApi(
      this.settings.githubToken,
      this.settings.githubOwner,
      repo,
      branch
    );
    const collector = new FileCollector(this.app, this.site);
    const transformer = new Transformer();
    const uploadFilesMap = /* @__PURE__ */ new Map();
    const issues = [];
    let fixedCount = 0;
    const rootDir = `sites/${this.site.id}`;
    this.onProgress("Collecting files\u2026");
    const files = await collector.collect();
    for (const file of files) {
      let content;
      let repoPath;
      if (file.extension === "md") {
        const raw = await this.app.vault.read(file);
        const check = inspectFrontmatter(raw);
        if (check.status === "fixed") {
          fixedCount++;
          issues.push(`${file.path}: ${(_a = check.reason) != null ? _a : "frontmatter auto-fixed"}`);
        }
        const transformed = transformer.transform(raw, file.path, file.basename);
        content = textToBase64(transformed);
        repoPath = `${rootDir}/content/${file.path}`;
      } else {
        content = await collector.readAsBase64(file);
        repoPath = `${rootDir}/content/attachments/${file.name}`;
      }
      if (!uploadFilesMap.has(repoPath)) {
        uploadFilesMap.set(repoPath, { path: repoPath, content });
      }
    }
    uploadFilesMap.set(`${rootDir}/package.json`, {
      path: `${rootDir}/package.json`,
      content: textToBase64(this.buildPackageJson())
    });
    uploadFilesMap.set(`${rootDir}/mdgarden.config.json`, {
      path: `${rootDir}/mdgarden.config.json`,
      content: textToBase64(this.buildMdgardenConfig())
    });
    uploadFilesMap.set(`${rootDir}/.node-version`, {
      path: `${rootDir}/.node-version`,
      content: textToBase64(`${NODE_VERSION}
`)
    });
    if (this.hostingProvider === "github-pages") {
      uploadFilesMap.set(".github/workflows/deploy.yml", {
        path: ".github/workflows/deploy.yml",
        content: textToBase64(GITHUB_ACTIONS_WORKFLOW)
      });
    }
    const uploadFiles = Array.from(uploadFilesMap.values());
    this.onProgress(`Uploading 0/${uploadFiles.length}...`);
    const result = await github.commitFiles(
      uploadFiles,
      `NoteFlare: publish ${uploadFiles.length} files`,
      (done, total) => this.onProgress(`Uploading ${done}/${total}...`),
      (secsLeft) => this.onProgress(`Rate limited \u2014 ${secsLeft}s...`),
      // Mirror content/ so notes removed or excluded from the vault disappear
      // from the published site too.
      `${rootDir}/content/`,
      { isPrivate: this.settings.masterRepositoryPrivate || false }
    );
    result.fixed = fixedCount;
    result.issues = issues;
    result.noteCount = files.length;
    if (result.success && this.hostingProvider === "cloudflare") {
      const cloudflare = new CloudflareApi(
        this.settings.cloudflareToken,
        this.settings.cloudflareAccount
      );
      try {
        await cloudflare.enableDeployment(this.site.cloudflareProject);
      } catch (err) {
        const msg = err.message;
        const status = err.status;
        if (status === 404 || msg.toLowerCase().includes("project not found")) {
          try {
            await cloudflare.createProject(
              this.site.cloudflareProject,
              this.settings.githubOwner,
              repo,
              branch,
              rootDir
            );
          } catch (createErr) {
            result.errors.push(`Cloudflare recovery failed: ${createErr.message}`);
            result.success = false;
          }
        } else {
          result.errors.push(`Cloudflare: ${msg}`);
          result.success = false;
        }
      }
      if (result.success) {
        try {
          await cloudflare.configureBuild(
            this.site.cloudflareProject,
            this.settings.githubOwner,
            repo,
            branch,
            rootDir
          );
        } catch (err) {
          result.errors.push(`Cloudflare build config: ${err.message}`);
          result.success = false;
        }
      }
      if (result.success) {
        try {
          await cloudflare.triggerDeployment(this.site.cloudflareProject, branch);
        } catch (err) {
          result.errors.push(`Cloudflare build: ${err.message}. ${RECONNECT_HINT}`);
          result.success = false;
        }
      }
    }
    this.site.lastPublishFailed = !result.success;
    this.site.lastPublishError = result.success ? "" : (_b = result.errors[0]) != null ? _b : "Unknown error";
    return result;
  }
  /** package.json for the published repo so Cloudflare can `npx mdgarden build`. */
  buildPackageJson() {
    const pkg = {
      name: this.site.name || "my-mdgarden",
      private: true,
      scripts: { build: "mdgarden build" },
      dependencies: { mdgarden: MDGARDEN_VERSION }
    };
    return `${JSON.stringify(pkg, null, 2)}
`;
  }
  /** mdgarden.config.json generated from this site's profile (plugin-managed). */
  buildMdgardenConfig() {
    const vaultName = this.app.vault.getName();
    const host = this.site.siteUrl.replace(/^https?:\/\//, "");
    const config = {
      site: {
        title: this.site.sidebarTitle || this.site.name || vaultName,
        description: this.site.siteDescription || `Notes published from ${vaultName}`,
        baseUrl: host ? `https://${host}` : "",
        language: "en",
        author: this.site.authorName || ""
      },
      theme: { darkMode: "toggle" },
      nav: [
        { title: "Home", url: "/" },
        { title: "Tags", url: "/tags/" }
      ],
      features: {
        search: true,
        backlinks: true,
        tags: true,
        graph: true,
        math: true,
        syntaxHighlight: true,
        rss: true,
        sitemap: true
      },
      build: { contentDir: "content", outDir: "public" }
    };
    return `${JSON.stringify(config, null, 2)}
`;
  }
  async unpublish() {
    if (this.hostingProvider !== "cloudflare") {
      throw new Error("Unpublish via API is only supported for Cloudflare Pages sites.");
    }
    const cloudflare = new CloudflareApi(
      this.settings.cloudflareToken,
      this.settings.cloudflareAccount
    );
    await cloudflare.disableDeployment(this.site.cloudflareProject);
  }
};

// main.ts
init_settings();

// src/ui/settings/settingsTab.ts
var import_obsidian21 = require("obsidian");

// src/ui/settings/wizard/stepGitHub.ts
var import_obsidian6 = require("obsidian");

// src/ui/settings/settingsHelpers.ts
function createErrorEl(container) {
  const el = container.createEl("p", { cls: "setting-item-description" });
  el.setCssStyles({ color: "var(--text-error)" });
  el.hide();
  return el;
}
function showError(el, msg) {
  el.setText(msg);
  el.show();
}
function hideError(el) {
  el.hide();
}
function busy(btn, label) {
  btn.setDisabled(true).setButtonText(label);
}
function idle(btn, label) {
  btn.setDisabled(false).setButtonText(label);
}

// src/ui/settings/wizard/stepGitHub.ts
var GITHUB_TOKEN_URL = "https://github.com/settings/tokens/new?scopes=repo,workflow&description=NoteFlare";
function renderStepGitHub(tab, el) {
  const heading = new import_obsidian6.Setting(el);
  heading.setName("Connect GitHub");
  heading.setHeading();
  el.createEl("p", {
    cls: "setting-item-description",
    text: "GitHub stores your site and vault backup. Your token is encrypted in your OS keychain \u2014 never logged."
  });
  let tokenValue = tab.plugin.settings.githubToken;
  const tokenSetting = new import_obsidian6.Setting(el).setName("Personal access token");
  tokenSetting.descEl.appendText("Create one with ");
  tokenSetting.descEl.createEl("strong", { text: "repo" });
  tokenSetting.descEl.appendText(" + ");
  tokenSetting.descEl.createEl("strong", { text: "workflow" });
  tokenSetting.descEl.appendText(" scopes. ");
  tokenSetting.descEl.createEl("a", {
    text: "Create token \u2197",
    href: GITHUB_TOKEN_URL,
    attr: { target: "_blank", rel: "noopener" }
  });
  tokenSetting.addText((text) => {
    text.setPlaceholder("ghp_\u2026");
    text.inputEl.type = "password";
    text.setValue(tokenValue);
    text.onChange((v) => {
      tokenValue = v.trim();
    });
  });
  const errorEl = createErrorEl(el);
  new import_obsidian6.Setting(el).addButton((btn) => {
    btn.setButtonText("Verify & continue").setCta();
    btn.onClick(() => {
      void (async () => {
        if (!tokenValue)
          return showError(errorEl, "Please enter your GitHub token.");
        hideError(errorEl);
        busy(btn, "Verifying\u2026");
        try {
          const username = await new GitHubApi(tokenValue, "", "").getAuthenticatedUser();
          tab.plugin.settings.githubToken = tokenValue;
          tab.plugin.settings.githubOwner = username;
          await tab.plugin.saveSettings();
          tab.wizardStep = "hosting";
          tab.render();
        } catch (err) {
          const msg = err.message;
          showError(
            errorEl,
            /invalid/i.test(msg) ? "Token invalid or missing the repo scope. Check it and try again." : msg
          );
          idle(btn, "Verify & continue");
        }
      })();
    });
  });
}

// src/ui/settings/wizard/stepHosting.ts
var import_obsidian8 = require("obsidian");

// src/ui/settings/modals/helpers.ts
init_settings();
function buildCloudflareTokenUrl() {
  const perms = encodeURIComponent(JSON.stringify([
    { key: "page", type: "edit" },
    { key: "workers_scripts", type: "edit" },
    { key: "account_settings", type: "read" }
  ]));
  return `https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=${perms}&accountId=*&zoneId=all&name=NoteFlare`;
}
function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}
function cloudflareSetupHint(rawMessage, repoSlug) {
  const lower = rawMessage.toLowerCase();
  if (lower.includes("rejected this token") || lower.includes("permission") || lower.includes("authentication")) {
    return "Cloudflare rejected this token. Make sure it has the Cloudflare Pages: Edit permission, then try again.";
  }
  return `Couldn't create the Pages project. Most likely the Cloudflare GitHub App isn't authorized for ${repoSlug} yet \u2014 use \u201CAuthorize Cloudflare on GitHub\u201D, grant access to that repo, then try again. (Cloudflare said: ${rawMessage})`;
}
async function provisionSite(plugin, name, profileParams, hostingProvider = "github-pages") {
  const slug = slugify(name);
  if (!slug)
    throw new Error("Please enter a site name.");
  const owner = plugin.settings.githubOwner;
  const repo = plugin.settings.masterRepository;
  if (!repo)
    throw new Error("Please configure a Master Repository in settings first.");
  const site = createSiteProfile({
    name,
    hostingProvider,
    ...profileParams
  });
  const gh = new GitHubApi(plugin.settings.githubToken, owner, repo);
  await gh.createRepo();
  if (!await gh.waitForRepo(3e4)) {
    throw new Error("Repository creation timed out \u2014 please try again.");
  }
  if (hostingProvider === "github-pages") {
    try {
      await gh.enableGitHubPages();
    } catch (e) {
      console.warn("Could not auto-enable GitHub Pages:", e);
    }
  }
  let branch = "main";
  try {
    branch = await gh.getDefaultBranch();
  } catch (e) {
  }
  site.githubBranch = branch;
  site.githubRepo = repo;
  let siteUrl = "";
  if (hostingProvider === "github-pages") {
    siteUrl = `${owner}.github.io/${repo}`;
  } else {
    const cf = new CloudflareApi(plugin.settings.cloudflareToken, plugin.settings.cloudflareAccount);
    const rootDir = `sites/${site.id}`;
    const projectName = slugify(`${repo}-${slug}`);
    try {
      siteUrl = await cf.createProject(projectName, owner, repo, branch, rootDir);
      site.cloudflareProject = projectName;
    } catch (createErr) {
      try {
        siteUrl = await cf.getProject(projectName);
        site.cloudflareProject = projectName;
      } catch (e) {
        throw new Error(cloudflareSetupHint(createErr.message, `${owner}/${repo}`));
      }
    }
  }
  site.siteUrl = siteUrl;
  return site;
}

// src/ui/settings/modals/pathSuggestModal.ts
var import_obsidian7 = require("obsidian");
var PathSuggestModal = class extends import_obsidian7.FuzzySuggestModal {
  constructor(app, onChoose) {
    super(app);
    this.onChoose = onChoose;
    this.setPlaceholder("Search for a file or folder...");
  }
  getItems() {
    return this.app.vault.getAllLoadedFiles().filter(
      (f) => f.path !== "/" && !f.path.startsWith(".") && !f.path.includes("/.") && (f instanceof import_obsidian7.TFolder || f instanceof import_obsidian7.TFile && f.extension === "md")
    );
  }
  getItemText(item) {
    return item.path;
  }
  onChooseItem(item, _evt) {
    this.onChoose(item.path);
  }
};

// src/ui/settings/wizard/stepHosting.ts
var CLOUDFLARE_APP_URL = "https://github.com/apps/cloudflare-workers-and-pages/installations/new";
var CLOUDFLARE_TOKEN_URL = buildCloudflareTokenUrl();
function renderStepHosting(tab, el) {
  const heading = new import_obsidian8.Setting(el);
  heading.setName("Choose hosting & create your site");
  heading.setHeading();
  el.createEl("p", {
    cls: "setting-item-description",
    text: "Pick where NoteFlare should host your site. GitHub Pages is free and works out of the box. Cloudflare adds a global CDN and instant deploy controls."
  });
  let siteName = tab.pendingName || "my-notes";
  new import_obsidian8.Setting(el).setName("Site name").setDesc("Used for your repository and site address. Lowercase letters, numbers, and dashes.").addText((text) => {
    text.setPlaceholder("my-notes");
    text.setValue(siteName);
    text.onChange((v) => {
      siteName = v;
    });
  });
  let masterRepo = tab.plugin.settings.masterRepository || "noteflare-sites";
  new import_obsidian8.Setting(el).setName("GitHub repository name").setDesc("All your NoteFlare sites will live inside this single repository.").addText((text) => {
    text.setPlaceholder("noteflare-sites");
    text.setValue(masterRepo);
    text.onChange((v) => {
      masterRepo = v.trim();
      updateCfAppHint();
    });
  });
  let selectedProvider = tab.pendingProvider;
  new import_obsidian8.Setting(el).setName("Hosting provider").setDesc("GitHub Pages is free with no extra setup. Cloudflare Pages adds a CDN and real-time deploy controls (requires a free Cloudflare account).").addDropdown((d) => {
    d.addOption("github-pages", "GitHub Pages (free, no setup required)");
    d.addOption("cloudflare", "Cloudflare Pages (CDN, deploy controls)");
    d.setValue(selectedProvider);
    d.onChange((v) => {
      selectedProvider = v;
      tab.pendingProvider = selectedProvider;
      cfSection.setCssStyles({ display: selectedProvider === "cloudflare" ? "block" : "none" });
    });
  });
  let scope = tab.pendingScope;
  let paths = [...tab.pendingPaths];
  new import_obsidian8.Setting(el).setName("Publish scope").setDesc("Publish the entire vault or only selected files and folders.").addDropdown((d) => {
    d.addOption("vault", "Full vault");
    d.addOption("selected", "Selected files / folders");
    d.setValue(scope);
    d.onChange((v) => {
      scope = v;
      renderPaths();
    });
  });
  const pathsContainer = el.createDiv("noteflare-paths-container");
  const renderPaths = () => {
    pathsContainer.empty();
    if (scope === "vault") {
      pathsContainer.setCssStyles({ display: "none" });
      return;
    }
    pathsContainer.setCssStyles({ display: "block" });
    if (paths.length === 0) {
      pathsContainer.createEl("p", { text: "No items selected.", cls: "noteflare-muted" });
    } else {
      const list = pathsContainer.createEl("ul", { cls: "noteflare-path-list" });
      for (let i = 0; i < paths.length; i++) {
        const li = list.createEl("li");
        li.setCssStyles({ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" });
        li.createSpan({ text: paths[i] });
        const rb = li.createEl("button", { text: "\u2715" });
        rb.addEventListener("click", () => {
          paths.splice(i, 1);
          renderPaths();
        });
      }
    }
    const addRow = pathsContainer.createDiv();
    addRow.setCssStyles({ marginTop: "8px" });
    const addBtn = addRow.createEl("button", { text: "Browse vault\u2026" });
    addBtn.setCssStyles({ width: "100%" });
    addBtn.addEventListener("click", () => {
      new PathSuggestModal(tab.app, (p) => {
        if (!paths.includes(p)) {
          paths.push(p);
          renderPaths();
        }
      }).open();
    });
  };
  renderPaths();
  const cfSection = el.createDiv("nf-cf-section");
  cfSection.setCssStyles({ display: selectedProvider === "cloudflare" ? "block" : "none" });
  let cfToken = tab.plugin.settings.cloudflareToken;
  let cfAccount = tab.plugin.settings.cloudflareAccount;
  let cfAppHintEl = null;
  const updateCfAppHint = () => {
    if (cfAppHintEl) {
      cfAppHintEl.setText(
        `Grant the "Cloudflare Workers and Pages" app access to: ${tab.plugin.settings.githubOwner}/${masterRepo || "noteflare-sites"}`
      );
    }
  };
  new import_obsidian8.Setting(cfSection).setName("1. Create a Cloudflare API token").setDesc("Creates a token with Pages, Workers, and Account permissions pre-filled.").addButton((b) => {
    b.setButtonText("Create Token \u2197");
    b.onClick(() => {
      window.open(CLOUDFLARE_TOKEN_URL, "_blank");
    });
  });
  const cfAppSetting = new import_obsidian8.Setting(cfSection).setName("2. Authorize Cloudflare on GitHub").setDesc(`Grant the "Cloudflare Workers and Pages" app access to: ${tab.plugin.settings.githubOwner}/${masterRepo || "noteflare-sites"}`).addButton((b) => {
    b.setButtonText("Authorize \u2197");
    b.onClick(() => {
      window.open(CLOUDFLARE_APP_URL, "_blank");
    });
  });
  cfAppHintEl = cfAppSetting.descEl;
  new import_obsidian8.Setting(cfSection).setName("Cloudflare API token").setDesc("Stored encrypted in your OS keychain.").addText((t) => {
    t.setPlaceholder("Paste API token\u2026");
    t.inputEl.type = "password";
    t.setValue(cfToken);
    t.onChange((v) => {
      cfToken = v.trim();
    });
  });
  new import_obsidian8.Setting(cfSection).setName("Cloudflare account ID").setDesc("Optional \u2014 detected automatically from your token.").addText((t) => {
    t.setPlaceholder("Auto-detected");
    t.setValue(cfAccount);
    t.onChange((v) => {
      cfAccount = v.trim();
    });
  });
  const errorEl = createErrorEl(el);
  new import_obsidian8.Setting(el).addButton((back) => {
    back.setButtonText("Back");
    back.onClick(() => {
      tab.wizardStep = "github";
      tab.render();
    });
  }).addButton((btn) => {
    btn.setButtonText("Continue").setCta();
    btn.onClick(() => {
      void (async () => {
        const nameSlug = slugify(siteName);
        if (!nameSlug)
          return showError(errorEl, "Please enter a site name.");
        if (!masterRepo.trim())
          return showError(errorEl, "Please enter a repository name.");
        if (selectedProvider === "cloudflare" && !cfToken) {
          return showError(errorEl, "Please paste your Cloudflare API token.");
        }
        hideError(errorEl);
        busy(btn, "Setting up\u2026");
        try {
          tab.plugin.settings.masterRepository = masterRepo.trim();
          if (selectedProvider === "cloudflare") {
            let accountId = cfAccount;
            if (!accountId) {
              busy(btn, "Detecting Cloudflare account\u2026");
              accountId = await new CloudflareApi(cfToken, "").getAccountId();
            }
            tab.plugin.settings.cloudflareToken = cfToken;
            tab.plugin.settings.cloudflareAccount = accountId;
            await tab.plugin.saveSettings();
          }
          busy(btn, "Creating your site\u2026");
          const site = await provisionSite(
            tab.plugin,
            siteName,
            { publishScope: scope, publishPaths: paths },
            selectedProvider
          );
          tab.plugin.settings.sites.push(site);
          tab.plugin.settings.activeSiteId = site.id;
          tab.plugin.settings.enablePublish = true;
          await tab.plugin.saveSettings();
          tab.pendingName = siteName;
          tab.pendingScope = scope;
          tab.pendingPaths = paths;
          tab.pendingProvider = selectedProvider;
          tab.wizardStep = "backup";
          tab.render();
        } catch (err) {
          showError(errorEl, err.message);
          idle(btn, "Continue");
        }
      })();
    });
  });
}

// src/ui/settings/wizard/stepBackup.ts
var import_obsidian9 = require("obsidian");
function renderStepBackup(tab, el) {
  var _a;
  const heading = new import_obsidian9.Setting(el);
  heading.setName("Automatic backup (optional)");
  heading.setHeading();
  el.createEl("p", {
    cls: "setting-item-description",
    text: "NoteFlare can silently mirror your entire vault to a private GitHub repository. No manual steps \u2014 it runs in the background."
  });
  let enableBackup = tab.plugin.settings.enableBackup;
  let repoVisibility = (_a = tab.plugin.settings.backup.repoVisibility) != null ? _a : "private";
  new import_obsidian9.Setting(el).setName("Enable automatic backup").setDesc("Run a backup after vault changes and/or on a schedule.").addToggle((t) => {
    t.setValue(enableBackup);
    t.onChange((v) => {
      enableBackup = v;
      visibilitySection.setCssStyles({ display: v ? "block" : "none" });
    });
  });
  const visibilitySection = el.createDiv();
  visibilitySection.setCssStyles({ display: enableBackup ? "block" : "none" });
  new import_obsidian9.Setting(visibilitySection).setName("Backup repository visibility").setDesc("Private keeps your notes confidential. Public makes the repo visible on GitHub (not recommended for personal notes).").addDropdown((d) => {
    d.addOption("private", "\u{1F512} Private (recommended)");
    d.addOption("public", "\u{1F310} Public");
    d.setValue(repoVisibility);
    d.onChange((v) => {
      repoVisibility = v;
    });
  });
  const errorEl = createErrorEl(el);
  new import_obsidian9.Setting(el).addButton((back) => {
    back.setButtonText("Back");
    back.onClick(() => {
      tab.wizardStep = "hosting";
      tab.render();
    });
  }).addButton((btn) => {
    btn.setButtonText("Finish setup").setCta();
    btn.onClick(() => {
      void (async () => {
        hideError(errorEl);
        tab.plugin.settings.enableBackup = enableBackup;
        tab.plugin.settings.backup.repoVisibility = repoVisibility;
        if (enableBackup && !tab.plugin.settings.backup.repository) {
          tab.plugin.settings.backup.repository = tab.plugin.defaultBackupRepository();
        }
        tab.plugin.settings.setupComplete = true;
        await tab.plugin.saveSettings();
        tab.wizardStep = "done";
        tab.render();
      })();
    });
  });
}

// src/ui/settings/wizard/stepDone.ts
var import_obsidian10 = require("obsidian");
function renderStepDone(tab, el) {
  const site = tab.plugin.getActiveSite();
  const heading = new import_obsidian10.Setting(el);
  heading.setName("You're all set! \u{1F389}");
  heading.setHeading();
  const doneMsg = new import_obsidian10.Setting(el).setName(
    site ? "Your site is ready to publish" : "Automatic backup is ready"
  );
  if (site == null ? void 0 : site.siteUrl) {
    doneMsg.descEl.appendText("Your site will be live at: ");
    doneMsg.descEl.createEl("a", {
      text: `https://${site.siteUrl}`,
      href: `https://${site.siteUrl}`,
      attr: { target: "_blank", rel: "noopener" }
    });
  } else {
    doneMsg.setDesc("NoteFlare will protect your vault quietly using your chosen schedule.");
  }
  new import_obsidian10.Setting(el).addButton((later) => {
    later.setButtonText(site ? "I'll publish later" : "Open configuration");
    later.onClick(() => {
      void (async () => {
        tab.hasInitializedWizard = false;
        if (site)
          tab.closeSettings();
        else
          tab.render();
      })();
    });
  }).addButton((btn) => {
    btn.setButtonText(site ? "Publish now" : "Back up now").setCta();
    btn.onClick(() => {
      void (async () => {
        tab.hasInitializedWizard = false;
        tab.closeSettings();
        if (site)
          await tab.plugin.doPublish();
        else
          await tab.plugin.doBackup(false);
      })();
    });
  });
}

// src/ui/settings/wizard/wizardRenderer.ts
function renderWizard(tab, el) {
  renderWizardSteps(tab, el);
  if (tab.wizardStep === "github")
    renderStepGitHub(tab, el);
  else if (tab.wizardStep === "hosting")
    renderStepHosting(tab, el);
  else if (tab.wizardStep === "backup")
    renderStepBackup(tab, el);
  else
    renderStepDone(tab, el);
}
function renderWizardSteps(tab, el) {
  const steps = [
    { key: "github", label: "GitHub" },
    { key: "hosting", label: "Hosting" },
    { key: "backup", label: "Backup" },
    { key: "done", label: "Done" }
  ];
  const order = steps.map((s) => s.key);
  const currentIdx = order.indexOf(tab.wizardStep);
  const wrapper = el.createDiv("nf-wizard-steps");
  steps.forEach(({ label }, i) => {
    const dot = wrapper.createDiv("nf-step-dot");
    if (i < currentIdx)
      dot.addClass("completed");
    else if (i === currentIdx)
      dot.addClass("active");
    const labelEl = dot.createSpan("nf-step-label");
    labelEl.setText(label);
  });
}

// src/ui/settings/manage/connectionsSection.ts
var import_obsidian12 = require("obsidian");

// src/ui/settings/manage/restoreSection.ts
var import_obsidian11 = require("obsidian");

// src/core/vaultRegistry.ts
var REGISTRY_DIR = ".noteflare";
var REGISTRY_PATH = ".noteflare/registry.json";
var VaultRegistry = class _VaultRegistry {
  /** Load the registry from disk, returning an empty registry if not found. */
  static async load(app) {
    try {
      const raw = await app.vault.adapter.read(REGISTRY_PATH);
      const parsed = JSON.parse(raw);
      if (parsed.version === 1 && Array.isArray(parsed.entries)) {
        return parsed;
      }
    } catch (e) {
    }
    return { version: 1, entries: [] };
  }
  /** Write the registry to disk, creating the `.noteflare/` directory if needed. */
  static async save(app, registry) {
    try {
      const exists = await app.vault.adapter.exists(REGISTRY_DIR);
      if (!exists) {
        await app.vault.adapter.mkdir(REGISTRY_DIR);
      }
      await app.vault.adapter.write(REGISTRY_PATH, JSON.stringify(registry, null, 2));
    } catch (err) {
      console.warn("NoteFlare: could not write vault registry:", err);
    }
  }
  /**
   * Add or update a single site entry derived from a `SiteProfile`.
   * Called automatically by `saveSettings()` so the registry stays in sync.
   */
  static async upsert(app, site, masterRepository, githubOwner, masterRepositoryPrivate) {
    const registry = await _VaultRegistry.load(app);
    const entry = {
      id: site.id,
      name: site.name,
      masterRepository,
      githubOwner,
      githubBranch: site.githubBranch,
      cloudflareProject: site.cloudflareProject,
      siteUrl: site.siteUrl,
      hostingProvider: site.hostingProvider,
      lastPublished: site.lastPublished,
      masterRepositoryPrivate
    };
    const idx = registry.entries.findIndex((e) => e.id === site.id);
    if (idx >= 0) {
      registry.entries[idx] = entry;
    } else {
      registry.entries.push(entry);
    }
    await _VaultRegistry.save(app, registry);
  }
  /** Remove a site from the registry by ID. */
  static async remove(app, siteId) {
    const registry = await _VaultRegistry.load(app);
    registry.entries = registry.entries.filter((e) => e.id !== siteId);
    await _VaultRegistry.save(app, registry);
  }
  /**
   * Rebuild `SiteProfile` stubs from registry entries that aren't already in
   * `existingSiteIds`. Used during restore-after-reinstall: creates lightweight
   * profiles with no credential data (credentials come from the OS keychain via
   * the plugin's normal load path).
   */
  static buildRestoredProfiles(entries, existingSiteIds) {
    return entries.filter((e) => !existingSiteIds.has(e.id));
  }
};

// src/ui/settings/manage/restoreSection.ts
async function renderRestoreFromRegistry(tab, el) {
  const s = tab.plugin.settings;
  const registry = await VaultRegistry.load(tab.app);
  const existingIds = new Set(s.sites.map((site) => site.id));
  const orphaned = VaultRegistry.buildRestoredProfiles(registry.entries, existingIds);
  if (orphaned.length === 0)
    return;
  const restoreSection = el.createDiv("nf-restore-section");
  const restoreHeading = new import_obsidian11.Setting(restoreSection);
  restoreHeading.setName("Previous sites found");
  restoreHeading.setHeading();
  restoreSection.createEl("p", {
    cls: "setting-item-description",
    text: `NoteFlare found ${orphaned.length} site${orphaned.length === 1 ? "" : "s"} from a previous installation in your vault registry. Restore them to continue using your existing GitHub repos and Cloudflare projects.`
  });
  for (const entry of orphaned) {
    const label = `${entry.name || entry.masterRepository} \xB7 ${entry.hostingProvider === "cloudflare" ? "Cloudflare Pages" : "GitHub Pages"}` + (entry.siteUrl ? ` \xB7 ${entry.siteUrl}` : "");
    restoreSection.createEl("p", { cls: "setting-item-description", text: `\u2022 ${label}` });
  }
  const errorEl = createErrorEl(restoreSection);
  new import_obsidian11.Setting(restoreSection).addButton((b) => {
    b.setButtonText(`Restore ${orphaned.length} site${orphaned.length === 1 ? "" : "s"}`).setCta();
    b.onClick(() => {
      void (async () => {
        var _a;
        b.setDisabled(true).setButtonText("Restoring\u2026");
        errorEl.hide();
        try {
          for (const entry of orphaned) {
            s.masterRepository = s.masterRepository || entry.masterRepository;
            s.githubOwner = s.githubOwner || entry.githubOwner;
            s.masterRepositoryPrivate = s.masterRepositoryPrivate || entry.masterRepositoryPrivate || false;
            const { createSiteProfile: create } = await Promise.resolve().then(() => (init_settings(), settings_exports));
            const restoredSite = create({
              id: entry.id,
              name: entry.name,
              githubRepo: entry.masterRepository,
              githubBranch: entry.githubBranch,
              cloudflareProject: entry.cloudflareProject,
              siteUrl: entry.siteUrl,
              hostingProvider: entry.hostingProvider,
              lastPublished: entry.lastPublished,
              isPublished: !!entry.lastPublished
            });
            s.sites.push(restoredSite);
          }
          s.activeSiteId = s.activeSiteId || ((_a = s.sites[0]) == null ? void 0 : _a.id) || "";
          s.enablePublish = true;
          await tab.plugin.saveSettings();
          tab.render();
        } catch (err) {
          showError(errorEl, err.message);
          b.setDisabled(false).setButtonText(`Restore ${orphaned.length} site${orphaned.length === 1 ? "" : "s"}`);
        }
      })();
    });
  });
}

// src/ui/settings/manage/connectionsSection.ts
var CLOUDFLARE_APP_URL2 = "https://github.com/apps/cloudflare-workers-and-pages/installations/new";
var CLOUDFLARE_TOKEN_URL2 = buildCloudflareTokenUrl();
function renderConnectionsSection(tab, el) {
  const s = tab.plugin.settings;
  const connHeading = new import_obsidian12.Setting(el);
  connHeading.setName("Connections");
  connHeading.setHeading();
  const ghSetting = new import_obsidian12.Setting(el).setName("GitHub");
  if (s.githubToken && s.githubOwner) {
    ghSetting.setDesc(`Connected as @${s.githubOwner}`);
    ghSetting.addButton((b) => {
      b.setButtonText("Disconnect");
      b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
        void (async () => {
          s.githubToken = "";
          s.githubOwner = "";
          s.setupComplete = false;
          await tab.plugin.saveSettings();
          tab.hasInitializedWizard = false;
          tab.wizardStep = "github";
          tab.render();
        })();
      });
    });
  } else {
    ghSetting.setDesc("Not connected");
    ghSetting.addButton((b) => {
      b.setButtonText("Connect").setCta();
      b.onClick(() => {
        tab.hasInitializedWizard = false;
        tab.wizardStep = "github";
        tab.render();
      });
    });
  }
  const cfSetting = new import_obsidian12.Setting(el).setName("Cloudflare");
  if (s.cloudflareToken) {
    const accountHint = s.cloudflareAccount ? `Account: ${s.cloudflareAccount.slice(0, 8)}\u2026` : "Connected";
    cfSetting.setDesc(accountHint);
    cfSetting.addButton((b) => {
      b.setButtonText("Reconnect to GitHub");
      b.setTooltip("Open Cloudflare \u2194 GitHub App authorization if your builds are disconnected");
      b.onClick(() => {
        window.open(CLOUDFLARE_APP_URL2, "_blank");
      });
    });
    cfSetting.addButton((b) => {
      b.setButtonText("Disconnect");
      b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
        void (async () => {
          s.cloudflareToken = "";
          s.cloudflareAccount = "";
          await tab.plugin.saveSettings();
          tab.render();
        })();
      });
    });
  } else {
    cfSetting.setDesc("Not connected \u2014 required for Cloudflare Pages hosting");
    cfSetting.addButton((b) => {
      b.setButtonText("Connect");
      b.onClick(() => {
        tab.openCloudflareConnectFlow();
      });
    });
  }
  void renderRestoreFromRegistry(tab, el);
}
function openCloudflareConnectFlow(tab, containerEl) {
  const s = tab.plugin.settings;
  const heading = new import_obsidian12.Setting(containerEl);
  heading.setName("Connect Cloudflare");
  heading.setHeading();
  containerEl.createEl("p", {
    cls: "setting-item-description",
    text: "Two quick one-time steps in your browser:"
  });
  const cfSection = containerEl.createDiv();
  const repoSlug = `${s.githubOwner}/${s.masterRepository || "noteflare-sites"}`;
  new import_obsidian12.Setting(cfSection).setName("1. Create a Cloudflare API token").setDesc("Creates a token with Pages, Workers, and Account permissions pre-filled.").addButton((b) => {
    b.setButtonText("Create Token \u2197");
    b.onClick(() => {
      window.open(CLOUDFLARE_TOKEN_URL2, "_blank");
    });
  });
  new import_obsidian12.Setting(cfSection).setName("2. Authorize Cloudflare on GitHub").setDesc(`Grant the "Cloudflare Workers and Pages" app access to: ${repoSlug}`).addButton((b) => {
    b.setButtonText("Authorize \u2197");
    b.onClick(() => {
      window.open(CLOUDFLARE_APP_URL2, "_blank");
    });
  });
  let cfToken = "";
  let cfAccount = "";
  new import_obsidian12.Setting(cfSection).setName("Cloudflare API token").setDesc("Stored encrypted in your OS keychain.").addText((t) => {
    t.setPlaceholder("Paste API token\u2026");
    t.inputEl.type = "password";
    t.onChange((v) => {
      cfToken = v.trim();
    });
  });
  new import_obsidian12.Setting(cfSection).setName("Cloudflare account ID").setDesc("Optional \u2014 detected automatically from your token.").addText((t) => {
    t.setPlaceholder("Auto-detected");
    t.onChange((v) => {
      cfAccount = v.trim();
    });
  });
  const errorEl = createErrorEl(containerEl);
  new import_obsidian12.Setting(containerEl).addButton((back) => {
    back.setButtonText("Cancel");
    back.onClick(() => {
      tab.isCloudflareConnectFlowOpen = false;
      tab.render();
    });
  }).addButton((btn) => {
    btn.setButtonText("Save & connect").setCta();
    btn.onClick(() => {
      void (async () => {
        if (!cfToken)
          return showError(errorEl, "Please paste your Cloudflare API token.");
        hideError(errorEl);
        busy(btn, "Verifying\u2026");
        try {
          let accountId = cfAccount;
          if (!accountId) {
            busy(btn, "Detecting account\u2026");
            accountId = await new CloudflareApi(cfToken, "").getAccountId();
          }
          s.cloudflareToken = cfToken;
          s.cloudflareAccount = accountId;
          await tab.plugin.saveSettings();
          tab.isCloudflareConnectFlowOpen = false;
          tab.render();
        } catch (err) {
          showError(errorEl, err.message);
          idle(btn, "Save & connect");
        }
      })();
    });
  });
}

// src/ui/settings/manage/backupSection.ts
var import_obsidian13 = require("obsidian");
function renderBackupSection(tab, el) {
  var _a;
  const s = tab.plugin.settings;
  const backupHeading = new import_obsidian13.Setting(el);
  backupHeading.setName("Backup & Storage");
  backupHeading.setHeading();
  const backupRepoName = s.backup.repository || tab.plugin.defaultBackupRepository();
  const backupUrl = `https://github.com/${s.githubOwner}/${backupRepoName}`;
  new import_obsidian13.Setting(el).setName("GitHub repository").setDesc(`Publish repo: ${s.githubOwner}/${s.masterRepository || "noteflare-sites"} (your site source). Backup repo: ${s.githubOwner}/${backupRepoName} (your vault mirror, kept separate).`).addText((t) => {
    t.setValue(backupRepoName);
    t.setDisabled(true);
  });
  const linkSetting = new import_obsidian13.Setting(el).setName("View backup on GitHub").setDesc("Open your private vault mirror in the browser.");
  linkSetting.controlEl.createEl("a", {
    text: "Open Repository \u2197",
    href: backupUrl
  });
  (_a = linkSetting.controlEl.querySelector("a")) == null ? void 0 : _a.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(backupUrl);
  });
  new import_obsidian13.Setting(el).setName("Enable automatic backup").setDesc("Silently mirror your vault to a private GitHub repository in the background.").addToggle((toggle) => {
    toggle.setValue(s.enableBackup);
    toggle.onChange((value) => {
      void (async () => {
        s.enableBackup = value;
        if (value && !s.backup.repository) {
          s.backup.repository = tab.plugin.defaultBackupRepository();
        }
        await tab.plugin.saveSettings();
        tab.render();
      })();
    });
  });
  if (s.enableBackup) {
    new import_obsidian13.Setting(el).setName("Repository visibility").setDesc("Private keeps your notes confidential. Public makes the backup repo visible on GitHub.").addDropdown((d) => {
      var _a2;
      d.addOption("private", "\u{1F512} Private (recommended)");
      d.addOption("public", "\u{1F310} Public");
      d.setValue((_a2 = s.backup.repoVisibility) != null ? _a2 : "private");
      d.onChange((v) => {
        void (async () => {
          s.backup.repoVisibility = v;
          await tab.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian13.Setting(el).setName("Back up after changes").setDesc("Run a backup 30 seconds after vault files are modified.").addToggle((toggle) => {
      toggle.setValue(s.backup.backupOnChange);
      toggle.onChange((value) => {
        void (async () => {
          s.backup.backupOnChange = value;
          await tab.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian13.Setting(el).setName("Schedule").setDesc("Periodic backups run while Obsidian is open.").addDropdown((dropdown) => {
      dropdown.addOption("0", "Off");
      dropdown.addOption("15", "Every 15 minutes");
      dropdown.addOption("30", "Every 30 minutes");
      dropdown.addOption("60", "Every hour");
      dropdown.addOption("360", "Every 6 hours");
      dropdown.addOption("1440", "Daily");
      dropdown.setValue(String(s.backup.intervalMinutes));
      dropdown.onChange((value) => {
        void (async () => {
          s.backup.intervalMinutes = Number(value);
          await tab.plugin.saveSettings();
        })();
      });
    });
    const backupStatus = s.backup.lastBackupError ? `Needs attention: ${s.backup.lastBackupError}` : s.backup.lastBackupAt ? `Last backup: ${new Date(s.backup.lastBackupAt).toLocaleString()}` : "No backup has run yet.";
    new import_obsidian13.Setting(el).setName("Backup status").setDesc(backupStatus).addButton((button) => {
      button.setButtonText("Back up now").setCta();
      button.onClick(() => {
        void (async () => {
          button.setDisabled(true).setButtonText("Backing up\u2026");
          await tab.plugin.doBackup(false);
          tab.render();
        })();
      });
    });
  }
}

// src/ui/settings/manage/sitesSection.ts
var import_obsidian20 = require("obsidian");

// src/ui/settings/modals/addSiteModal.ts
var import_obsidian14 = require("obsidian");
var AddSiteModal = class extends import_obsidian14.Modal {
  constructor(app, plugin, onDone) {
    super(app);
    this.plugin = plugin;
    this.onDone = onDone;
  }
  onOpen() {
    this.titleEl.setText("Add a site");
    let name = "";
    let scope = "vault";
    let paths = [];
    let authorName = "";
    let sidebarTitle = "";
    let siteDescription = "";
    new import_obsidian14.Setting(this.contentEl).setName("Site name").setDesc("Used as the GitHub repository name and site identifier.").addText((t) => {
      t.setPlaceholder("my-blog");
      t.onChange((v) => {
        name = v;
      });
    });
    let hostingProvider = "github-pages";
    const cfConnected = !!this.plugin.settings.cloudflareToken;
    new import_obsidian14.Setting(this.contentEl).setName("Hosting provider").setDesc("Where to host this site.").addDropdown((d) => {
      d.addOption("github-pages", "GitHub Pages");
      if (cfConnected) {
        d.addOption("cloudflare", "Cloudflare Pages");
      }
      d.setValue(hostingProvider);
      d.onChange((v) => {
        hostingProvider = v;
      });
    });
    new import_obsidian14.Setting(this.contentEl).setName("Publish scope").setDesc("Configure what to publish: the entire vault or selected files/folders.").addDropdown((d) => {
      d.addOption("vault", "Full Vault");
      d.addOption("selected", "Selected Files/Folders");
      d.setValue("vault");
      d.onChange((v) => {
        scope = v;
        updateVisibility();
      });
    });
    const pathsContainer = this.contentEl.createDiv("noteflare-paths-container");
    const renderPaths = () => {
      pathsContainer.empty();
      if (scope === "vault") {
        pathsContainer.setCssStyles({ display: "none" });
        return;
      }
      pathsContainer.setCssStyles({ display: "block" });
      if (paths.length === 0) {
        pathsContainer.createEl("p", { text: "No files or folders selected.", cls: "noteflare-muted" });
      } else {
        const list = pathsContainer.createEl("ul", { cls: "noteflare-path-list" });
        for (let i = 0; i < paths.length; i++) {
          const li = list.createEl("li");
          li.setCssStyles({ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" });
          li.createSpan({ text: paths[i] });
          const removeBtn = li.createEl("button", { text: "\u2715" });
          removeBtn.addEventListener("click", () => {
            paths.splice(i, 1);
            renderPaths();
          });
        }
      }
      const addRow = pathsContainer.createDiv("noteflare-add-path-row");
      addRow.setCssStyles({ marginTop: "8px" });
      const addBtn = addRow.createEl("button", { text: "Browse Vault..." });
      addBtn.setCssStyles({ width: "100%" });
      addBtn.addEventListener("click", () => {
        new PathSuggestModal(this.app, (selectedPath) => {
          if (selectedPath.trim() && !paths.includes(selectedPath.trim())) {
            paths.push(selectedPath.trim());
            renderPaths();
          }
        }).open();
      });
    };
    const updateVisibility = () => {
      renderPaths();
    };
    new import_obsidian14.Setting(this.contentEl).setName("Author name").setDesc("Author name written to site metadata (optional).").addText((t) => {
      t.setPlaceholder("Your Name");
      t.onChange((v) => {
        authorName = v.trim();
      });
    });
    new import_obsidian14.Setting(this.contentEl).setName("Sidebar title").setDesc("Title shown in the sidebar (optional, defaults to site name).").addText((t) => {
      t.setPlaceholder("My Digital Garden");
      t.onChange((v) => {
        sidebarTitle = v.trim();
      });
    });
    new import_obsidian14.Setting(this.contentEl).setName("Site description").setDesc("Description of your site (optional).").addText((t) => {
      t.setPlaceholder("Notes and thoughts\u2026");
      t.onChange((v) => {
        siteDescription = v.trim();
      });
    });
    updateVisibility();
    const errorEl = this.contentEl.createEl("p", { cls: "setting-item-description" });
    errorEl.setCssStyles({ color: "var(--text-error)" });
    errorEl.hide();
    new import_obsidian14.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton((b) => {
      b.setButtonText("Create site").setCta();
      b.onClick(() => {
        void (async () => {
          if (!slugify(name)) {
            errorEl.setText("Please enter a site name.");
            errorEl.show();
            return;
          }
          errorEl.hide();
          b.setDisabled(true).setButtonText("Creating\u2026");
          try {
            const site = await provisionSite(this.plugin, name, {
              publishScope: scope,
              publishPaths: paths,
              authorName,
              sidebarTitle,
              siteDescription
            }, hostingProvider);
            this.plugin.settings.sites.push(site);
            this.plugin.settings.activeSiteId = site.id;
            await this.plugin.saveSettings();
            this.close();
            new import_obsidian14.Notice(`Site \u201C${site.name}\u201D created.`);
            this.onDone();
          } catch (err) {
            errorEl.setText(err.message);
            errorEl.show();
            b.setDisabled(false).setButtonText("Create site");
          }
        })();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/modals/removeSiteModal.ts
var import_obsidian15 = require("obsidian");
var RemoveSiteModal = class extends import_obsidian15.Modal {
  constructor(app, plugin, site, onDone) {
    super(app);
    this.plugin = plugin;
    this.site = site;
    this.onDone = onDone;
    this.deleting = false;
  }
  onOpen() {
    this.titleEl.setText("Delete this site?");
    const siteName = this.site.name || this.site.githubRepo || "Unnamed site";
    this.contentEl.createEl("p", {
      text: `"${siteName}" will be permanently deleted from NoteFlare.`
    });
    const summaryDiv = this.contentEl.createDiv();
    summaryDiv.setCssStyles({
      marginTop: "8px",
      padding: "10px 12px",
      borderLeft: "4px solid var(--text-warning)",
      backgroundColor: "var(--background-modifier-border)",
      borderRadius: "var(--radius-s)",
      marginBottom: "10px"
    });
    summaryDiv.createEl("strong", { text: "What will be deleted:" });
    const stepsList = summaryDiv.createEl("ul");
    stepsList.setCssStyles({ margin: "6px 0 0 0", paddingLeft: "1.2em" });
    const ghStep = stepsList.createEl("li");
    ghStep.setText("\u2705 Site folder removed from GitHub repository (via API)");
    if (this.site.hostingProvider === "cloudflare") {
      const cfStep = stepsList.createEl("li");
      cfStep.setText("\u2705 Cloudflare Pages project deleted (via API)");
    } else {
      stepsList.createEl("li").setText("\u26A0\uFE0F GitHub Pages deployment \u2014 NOT automatically removed. Disable it manually:");
      const manualNote = stepsList.createEl("li");
      manualNote.setCssStyles({ listStyleType: "none", paddingLeft: "1em", color: "var(--text-muted)", fontSize: "var(--font-ui-smaller)" });
      manualNote.setText("GitHub repo \u2192 Settings \u2192 Pages \u2192 Source \u2192 None \u2192 Save");
    }
    const progressEl = this.contentEl.createEl("p", { cls: "setting-item-description" });
    progressEl.hide();
    const errorEl = this.contentEl.createEl("p", { cls: "setting-item-description" });
    errorEl.setCssStyles({ color: "var(--text-error)" });
    errorEl.hide();
    new import_obsidian15.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton((b) => {
      b.setButtonText("Delete");
      b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
        void (async () => {
          var _a, _b;
          if (this.deleting)
            return;
          this.deleting = true;
          b.setDisabled(true).setButtonText("Deleting\u2026");
          errorEl.hide();
          progressEl.show();
          const s = this.plugin.settings;
          const gh = new GitHubApi(
            s.githubToken,
            s.githubOwner,
            s.masterRepository,
            this.site.githubBranch || "main"
          );
          if (this.site.hostingProvider === "cloudflare" && s.cloudflareToken) {
            try {
              progressEl.setText("Deleting Cloudflare Pages project\u2026");
              const cf = new CloudflareApi(s.cloudflareToken, s.cloudflareAccount);
              await cf.deleteProject(this.site.cloudflareProject);
            } catch (e) {
              console.warn("NoteFlare: could not delete Cloudflare project:", e);
            }
          }
          try {
            progressEl.setText("Removing site from GitHub repository\u2026");
            await gh.deleteSiteFolder(this.site.id, this.site.githubBranch || "main");
          } catch (e) {
            console.warn("NoteFlare: could not delete GitHub site folder:", e);
          }
          try {
            progressEl.setText("Updating vault registry\u2026");
            await VaultRegistry.remove(this.app, this.site.id);
          } catch (e) {
            console.warn("NoteFlare: could not update vault registry:", e);
          }
          try {
            const s2 = this.plugin.settings;
            s2.sites = s2.sites.filter((x) => x.id !== this.site.id);
            if (s2.activeSiteId === this.site.id) {
              s2.activeSiteId = (_b = (_a = s2.sites[0]) == null ? void 0 : _a.id) != null ? _b : "";
            }
            await this.plugin.saveSettings();
            this.close();
            new import_obsidian15.Notice(`Site "${siteName}" deleted.`);
            this.onDone();
          } catch (err) {
            errorEl.setText(err.message);
            errorEl.show();
            progressEl.hide();
            b.setDisabled(false).setButtonText("Delete");
            this.deleting = false;
          }
        })();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/modals/unpublishModals.ts
var import_obsidian16 = require("obsidian");
var UnpublishModal = class extends import_obsidian16.Modal {
  constructor(app, plugin, onDone) {
    super(app);
    this.plugin = plugin;
    this.onDone = onDone;
  }
  onOpen() {
    this.titleEl.setText("Unpublish your site?");
    this.contentEl.createEl("p", {
      text: "Your site will go offline. Files in GitHub remain untouched \u2014 you can re-publish any time."
    });
    new import_obsidian16.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton((b) => {
      b.setButtonText("Unpublish");
      b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
        void (async () => {
          this.close();
          await this.plugin.doUnpublish();
          this.onDone();
        })();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};
var GitHubPagesUnpublishModal = class extends import_obsidian16.Modal {
  constructor(app, pagesSettingsUrl) {
    super(app);
    this.pagesSettingsUrl = pagesSettingsUrl;
  }
  onOpen() {
    this.titleEl.setText("Disable GitHub Pages (Manual)");
    this.contentEl.createEl("p", {
      text: "GitHub Pages cannot be paused via the GitHub API. To take your site offline, follow these steps:"
    });
    const steps = this.contentEl.createEl("ol");
    steps.setCssStyles({ paddingLeft: "1.4em" });
    steps.createEl("li", { text: "Click the button below to open your repository Pages settings." });
    steps.createEl("li", { text: "Under \u201CSource\u201D, change the selection from \u201CGitHub Actions\u201D to \u201CNone\u201D." });
    steps.createEl("li", { text: "Click Save. Your site will be offline within a minute." });
    new import_obsidian16.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton((b) => {
      b.setButtonText("Open GitHub Pages settings \u2197").setCta();
      b.onClick(() => {
        window.open(this.pagesSettingsUrl, "_blank");
        this.close();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/modals/resetModal.ts
var import_obsidian17 = require("obsidian");
init_settings();
var ResetModal = class extends import_obsidian17.Modal {
  constructor(app, plugin, onDone) {
    super(app);
    this.plugin = plugin;
    this.onDone = onDone;
  }
  onOpen() {
    this.titleEl.setText("Reset NoteFlare?");
    this.contentEl.createEl("p", {
      text: "This clears all NoteFlare settings (tokens and every site). Your GitHub repos and Cloudflare projects will NOT be deleted."
    });
    new import_obsidian17.Setting(this.contentEl).addButton((b) => b.setButtonText("Cancel").onClick(() => this.close())).addButton((b) => {
      b.setButtonText("Reset");
      b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
        void (async () => {
          this.close();
          Object.assign(this.plugin.settings, {
            ...DEFAULT_SETTINGS,
            sites: [],
            backup: { ...DEFAULT_SETTINGS.backup }
          });
          await this.plugin.saveSettings();
          this.onDone();
        })();
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/modals/editSiteModal.ts
var import_obsidian19 = require("obsidian");

// src/ui/settings/modals/changeRepoModal.ts
var import_obsidian18 = require("obsidian");
init_settings();
var ChangeRepoModal = class extends import_obsidian18.Modal {
  constructor(app, plugin, site, onDone) {
    super(app);
    this.plugin = plugin;
    this.site = site;
    this.onDone = onDone;
  }
  onOpen() {
    this.titleEl.setText("Change Repository");
    let newRepo = "";
    new import_obsidian18.Setting(this.contentEl).setName("New repository name").setDesc("Enter the new GitHub repository name.").addText((t) => {
      t.setValue(this.site.githubRepo || this.plugin.settings.masterRepository);
      t.onChange((v) => {
        newRepo = v.trim();
      });
    });
    new import_obsidian18.Setting(this.contentEl).setName("Migrate or Create New").setDesc("Migrate will update this site. Create New will clone this profile for the new repo.").addButton((b) => b.setButtonText("Migrate").onClick(() => {
      if (!newRepo)
        return;
      this.site.githubRepo = newRepo;
      void this.plugin.saveSettings().then(() => {
        new import_obsidian18.Notice("Repository updated. Publish to provision the new repo.");
        this.close();
        this.onDone();
      });
    })).addButton((b) => b.setButtonText("Create New").setCta().onClick(() => {
      if (!newRepo)
        return;
      const newSite = createSiteProfile({
        ...this.site,
        name: `${this.site.name} (Copy)`,
        githubRepo: newRepo,
        cloudflareProject: "",
        siteUrl: "",
        isPublished: false,
        lastPublished: "",
        lastNoteCount: 0
      });
      this.plugin.settings.sites.push(newSite);
      void this.plugin.saveSettings().then(() => {
        new import_obsidian18.Notice("New site profile created.");
        this.close();
        this.onDone();
      });
    }));
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/modals/editSiteModal.ts
var EditSiteModal = class extends import_obsidian19.Modal {
  constructor(app, plugin, site, onDone) {
    super(app);
    this.plugin = plugin;
    this.site = site;
    this.onDone = onDone;
  }
  onOpen() {
    const s = this.site;
    this.titleEl.setText(`Settings for ${s.name || s.cloudflareProject || "Site"}`);
    this.render();
  }
  render() {
    this.contentEl.empty();
    const s = this.site;
    new import_obsidian19.Setting(this.contentEl).setName("Publishing rules").setHeading();
    new import_obsidian19.Setting(this.contentEl).setName("GitHub repository").setDesc("The repository linked to this site.").addText((t) => {
      t.setValue(s.githubRepo || this.plugin.settings.masterRepository);
      t.setDisabled(true);
    }).addButton((b) => b.setButtonText("Change Repo").onClick(() => {
      new ChangeRepoModal(this.app, this.plugin, s, () => this.render()).open();
    }));
    let updateVisibility;
    new import_obsidian19.Setting(this.contentEl).setName("Publish scope").setDesc("Configure what to publish: the entire vault or selected files/folders.").addDropdown((d) => {
      d.addOption("vault", "Full Vault");
      d.addOption("selected", "Selected Files/Folders");
      d.setValue(s.publishScope || "vault");
      d.onChange((v) => {
        void (async () => {
          s.publishScope = v;
          await this.plugin.saveSettings();
          updateVisibility();
        })();
      });
    });
    const pathsContainer = this.contentEl.createDiv("noteflare-paths-container");
    const renderPaths = () => {
      pathsContainer.empty();
      if ((s.publishScope || "vault") === "vault") {
        pathsContainer.setCssStyles({ display: "none" });
        return;
      }
      pathsContainer.setCssStyles({ display: "block" });
      const paths = s.publishPaths || [];
      if (paths.length === 0) {
        pathsContainer.createEl("p", { text: "No files or folders selected.", cls: "noteflare-muted" });
      } else {
        const list = pathsContainer.createEl("ul", { cls: "noteflare-path-list" });
        for (let i = 0; i < paths.length; i++) {
          const li = list.createEl("li");
          li.setCssStyles({ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" });
          li.createSpan({ text: paths[i] });
          const removeBtn = li.createEl("button", { text: "\u2715" });
          removeBtn.addEventListener("click", () => {
            void (async () => {
              var _a;
              (_a = s.publishPaths) == null ? void 0 : _a.splice(i, 1);
              await this.plugin.saveSettings();
              renderPaths();
            })();
          });
        }
      }
      const addRow = pathsContainer.createDiv("noteflare-add-path-row");
      addRow.setCssStyles({ marginTop: "8px" });
      const addBtn = addRow.createEl("button", { text: "Browse Vault..." });
      addBtn.setCssStyles({ width: "100%" });
      addBtn.addEventListener("click", () => {
        new PathSuggestModal(this.app, (selectedPath) => {
          void (async () => {
            if (selectedPath.trim()) {
              if (!s.publishPaths)
                s.publishPaths = [];
              if (!s.publishPaths.includes(selectedPath.trim())) {
                s.publishPaths.push(selectedPath.trim());
                await this.plugin.saveSettings();
                renderPaths();
              }
            }
          })();
        }).open();
      });
    };
    updateVisibility = () => {
      renderPaths();
    };
    updateVisibility();
    new import_obsidian19.Setting(this.contentEl).setName("Site Customization").setHeading();
    new import_obsidian19.Setting(this.contentEl).setName("Site name").setDesc("Internal name for this site.").addText((t) => {
      t.setValue(s.name || "");
      t.onChange((v) => {
        void (async () => {
          s.name = v.trim();
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).setName("Author name").setDesc("The author name written to the site metadata.").addText((t) => {
      t.setPlaceholder("Your Name");
      t.setValue(s.authorName || "");
      t.onChange((v) => {
        void (async () => {
          s.authorName = v.trim();
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).setName("Sidebar title").setDesc("Title shown in the sidebar. Defaults to the site name.").addText((t) => {
      t.setPlaceholder("My Digital Garden");
      t.setValue(s.sidebarTitle || "");
      t.onChange((v) => {
        void (async () => {
          s.sidebarTitle = v.trim();
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).setName("Site description").setDesc("Description of your site.").addText((t) => {
      t.setPlaceholder("Notes and thoughts\u2026");
      t.setValue(s.siteDescription || "");
      t.onChange((v) => {
        void (async () => {
          s.siteDescription = v.trim();
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).setName("Exclude patterns").setDesc("One glob per line. Matching files are not published (e.g. private/**, *.private.md).").addTextArea((area) => {
      area.setValue(s.excludePatterns.join("\n"));
      area.inputEl.rows = 4;
      area.onChange((v) => {
        void (async () => {
          s.excludePatterns = v.split("\n").map((x) => x.trim()).filter(Boolean);
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).setName("Include attachments").setDesc("Upload images and PDFs alongside your notes.").addToggle((toggle) => {
      toggle.setValue(s.includeAttachments);
      toggle.onChange((v) => {
        void (async () => {
          s.includeAttachments = v;
          await this.plugin.saveSettings();
        })();
      });
    });
    new import_obsidian19.Setting(this.contentEl).addButton((b) => b.setButtonText("Done").setCta().onClick(() => {
      this.close();
      this.onDone();
    }));
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/settings/manage/sitesSection.ts
function renderSitesSection(tab, el) {
  const s = tab.plugin.settings;
  if (s.enablePublish) {
    const sitesHeading = new import_obsidian20.Setting(el);
    sitesHeading.setName("Sites");
    sitesHeading.setHeading();
    new import_obsidian20.Setting(el).setName("Panel location").setDesc("Where the NoteFlare panel opens by default.").addDropdown((d) => {
      var _a;
      d.addOption("left", "Left sidebar");
      d.addOption("right", "Right sidebar");
      d.addOption("tab", "Main workspace tab");
      d.setValue((_a = s.defaultViewLocation) != null ? _a : "left");
      d.onChange((v) => {
        void (async () => {
          s.defaultViewLocation = v;
          await tab.plugin.saveSettings();
        })();
      });
    });
    if (s.sites.length === 0) {
      el.createEl("p", {
        cls: "setting-item-description",
        text: "No sites yet \u2014 add one to get started."
      });
    } else {
      for (const site of s.sites) {
        const isLive = site.isPublished;
        const providerLabel = site.hostingProvider === "cloudflare" ? "Cloudflare Pages" : "GitHub Pages";
        const statusText = site.lastPublished ? `Last published ${new Date(site.lastPublished).toLocaleString()} \xB7 ${site.lastNoteCount} notes` : "Not published yet";
        const siteSetting = new import_obsidian20.Setting(el).setName(site.name || site.cloudflareProject || "Site").setDesc(`${isLive ? "\u{1F7E2} Live" : "\u26AA Offline"} \xB7 ${providerLabel} \xB7 ${statusText}`);
        const cfConnected = !!tab.plugin.settings.cloudflareToken;
        siteSetting.addDropdown((d) => {
          d.addOption("github-pages", "GitHub Pages");
          if (cfConnected) {
            d.addOption("cloudflare", "Cloudflare Pages");
          }
          const storedProvider = site.hostingProvider || "github-pages";
          d.setValue(cfConnected ? storedProvider : "github-pages");
          d.onChange((v) => {
            void (async () => {
              site.hostingProvider = v;
              await tab.plugin.saveSettings();
              tab.render();
            })();
          });
        });
        if (site.siteUrl) {
          siteSetting.addExtraButton(
            (b) => b.setIcon("external-link").setTooltip("Open site").onClick(() => {
              window.open(`https://${site.siteUrl}`, "_blank");
            })
          );
        }
        siteSetting.addButton(
          (b) => b.setButtonText("Edit").onClick(() => {
            new EditSiteModal(tab.app, tab.plugin, site, () => tab.render()).open();
          })
        );
        siteSetting.addButton((b) => {
          b.setButtonText("Remove");
          b.buttonEl.addClass("mod-warning");
          b.onClick(() => {
            new RemoveSiteModal(tab.app, tab.plugin, site, () => tab.render()).open();
          });
        });
      }
    }
    new import_obsidian20.Setting(el).addButton(
      (b) => b.setButtonText("Add site").setCta().onClick(() => {
        new AddSiteModal(tab.app, tab.plugin, () => tab.render()).open();
      })
    );
  }
}

// src/ui/settings/settingsTab.ts
var NoteFlareSettingsTab = class extends import_obsidian21.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.isCloudflareConnectFlowOpen = false;
    this.hasInitializedWizard = false;
    // Pending config across wizard steps
    this.pendingName = "";
    this.pendingScope = "vault";
    this.pendingPaths = [];
    this.pendingProvider = "cloudflare";
    this.plugin = plugin;
    this.wizardStep = this.getInitialWizardStep();
  }
  getSettingDefinitions() {
    return [
      { id: "publish", name: "Publish", description: "Configure publishing to Cloudflare and GitHub Pages" },
      { id: "backup", name: "Automated Backup", description: "Configure automatic private repository backups" },
      { id: "connections", name: "Connections", description: "Manage connected GitHub and Cloudflare accounts" }
    ];
  }
  getInitialWizardStep() {
    const s = this.plugin.settings;
    if (s.githubToken && s.githubOwner)
      return "hosting";
    return "github";
  }
  display() {
    this.render();
  }
  render() {
    const { containerEl } = this;
    containerEl.empty();
    const s = this.plugin.settings;
    try {
      if (!s.setupComplete) {
        if (!this.hasInitializedWizard) {
          this.wizardStep = this.getInitialWizardStep();
          this.hasInitializedWizard = true;
        }
        renderWizard(this, containerEl);
      } else if (this.isCloudflareConnectFlowOpen) {
        openCloudflareConnectFlow(this, containerEl);
      } else {
        try {
          renderConnectionsSection(this, containerEl);
        } catch (e) {
          this.renderSectionError(containerEl, "Connections", e);
        }
        try {
          renderBackupSection(this, containerEl);
        } catch (e) {
          this.renderSectionError(containerEl, "Backup", e);
        }
        try {
          renderSitesSection(this, containerEl);
        } catch (e) {
          this.renderSectionError(containerEl, "Sites", e);
        }
      }
    } catch (err) {
      this.renderSectionError(containerEl, "Settings", err);
    }
    this.renderResetFooter(containerEl);
  }
  /** Display an inline error when a settings section fails to render. */
  renderSectionError(el, section, err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`NoteFlare: ${section} section render error:`, err);
    const p = el.createEl("p", { cls: "setting-item-description" });
    p.setText(`\u26A0 NoteFlare (${section}): ${msg}`);
    p.setCssStyles({ color: "var(--text-error)", marginBottom: "8px" });
  }
  openCloudflareConnectFlow() {
    this.isCloudflareConnectFlowOpen = true;
    this.render();
  }
  closeSettings() {
    var _a;
    const setting = this.app.setting;
    (_a = setting == null ? void 0 : setting.close) == null ? void 0 : _a.call(setting);
  }
  renderResetFooter(el) {
    const divider = el.createDiv("nf-reset-footer");
    const dangerHeading = new import_obsidian21.Setting(divider);
    dangerHeading.setName("Danger zone");
    dangerHeading.setHeading();
    const resetSetting = new import_obsidian21.Setting(divider);
    resetSetting.setName("Hard reset NoteFlare");
    resetSetting.setDesc(
      "Clears all NoteFlare data \u2014 tokens, every site, and all configuration. Your GitHub repos and Cloudflare projects are NOT deleted and can be reconnected any time."
    );
    resetSetting.addButton((b) => {
      b.setButtonText("Hard reset");
      b.buttonEl.addClass("mod-warning");
      b.onClick(
        () => new ResetModal(this.app, this.plugin, () => {
          this.wizardStep = "github";
          this.pendingName = "";
          this.pendingScope = "vault";
          this.pendingPaths = [];
          this.pendingProvider = "cloudflare";
          this.hasInitializedWizard = false;
          this.render();
        }).open()
      );
    });
  }
};

// src/ui/statusBar.ts
var StatusBar = class {
  constructor(el) {
    this.el = el;
  }
  setIdle() {
    this.set("NoteFlare: Not set up");
    this.el.title = "";
  }
  setUnpublished() {
    this.set("NoteFlare: Unpublished");
    this.el.title = "";
  }
  setPublishing(n, total) {
    this.set(`NoteFlare: Uploading ${n}/${total}...`);
  }
  setLive(noteCount, url) {
    this.set(`NoteFlare: Live \u2014 ${noteCount} notes \u2197`);
    this.el.title = url ? `https://${url}` : "";
  }
  setError(msg) {
    this.set(`NoteFlare: Error \u2014 ${msg}`);
  }
  setRateLimited(secsLeft) {
    this.set(`NoteFlare: Rate limited \u2014 ${secsLeft}s`);
  }
  setMessage(msg) {
    this.set(msg);
  }
  set(text) {
    this.el.textContent = text;
  }
};

// src/ui/noteflareView.ts
var import_obsidian22 = require("obsidian");
var VIEW_TYPE_NOTEFLARE = "noteflare-panel";
var CLOUDFLARE_APP_URL3 = "https://github.com/apps/cloudflare-workers-and-pages/installations/new";
function relativeTime(iso) {
  if (!iso)
    return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  if (isNaN(diffMs))
    return "";
  const mins = Math.floor(diffMs / 6e4);
  if (mins < 1)
    return "just now";
  if (mins < 60)
    return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)
    return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
var NoteFlareView = class extends import_obsidian22.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_NOTEFLARE;
  }
  getDisplayText() {
    return "NoteFlare";
  }
  getIcon() {
    var _a;
    return ((_a = this.plugin.getActiveSite()) == null ? void 0 : _a.isPublished) ? "cloud-check" : "cloud-upload";
  }
  async onOpen() {
    await this.render();
    const site = this.plugin.getActiveSite();
    if (site)
      void this.plugin.fetchLiveStatus(site);
  }
  async onClose() {
  }
  refresh() {
    void this.render();
  }
  async render() {
    const root = this.containerEl.children[1];
    root.empty();
    root.addClass("noteflare-view");
    const s = this.plugin.settings;
    if (!s.setupComplete) {
      root.createEl("p", {
        text: "Finish setup to publish your notes and protect your vault with automatic backups.",
        cls: "setting-item-description"
      });
      const setupBtn = root.createEl("button", { text: "Open setup", cls: "mod-cta" });
      setupBtn.setCssStyles({ marginTop: "10px" });
      setupBtn.addEventListener("click", () => this.plugin.openSettingsTab());
      return;
    }
    const content = root.createDiv({ cls: "noteflare-tab-content" });
    if (s.enablePublish) {
      await this.renderPublish(content);
    } else {
      const backup = content.createDiv();
      backup.createEl("h3", { text: "Your vault is protected" });
      backup.createEl("p", {
        text: s.backup.lastBackupAt ? `Last backup: ${new Date(s.backup.lastBackupAt).toLocaleString()}` : "Your first backup will run automatically.",
        cls: "setting-item-description"
      });
      const settingsButton = backup.createEl("button", { text: "Backup options", cls: "mod-cta" });
      settingsButton.setCssStyles({ marginTop: "10px" });
      settingsButton.addEventListener("click", () => this.plugin.openSettingsTab());
    }
  }
  async renderPublish(root) {
    var _a;
    const s = this.plugin.settings;
    const site = this.plugin.getActiveSite();
    if (!site) {
      root.createEl("p", {
        text: "No publish sites configured.",
        cls: "noteflare-muted"
      });
      const createBtn = root.createEl("button", { text: "Quick create site", cls: "mod-cta" });
      createBtn.addEventListener("click", () => {
        new AddSiteModal(this.app, this.plugin, () => this.refresh()).open();
      });
      return;
    }
    const isPublishing = !!this.plugin.publishInProgress[site.id];
    const hasFailed = site.lastPublishFailed && !isPublishing;
    const isLive = site.isPublished && !hasFailed;
    const live = (_a = this.plugin.liveStatus[site.id]) != null ? _a : null;
    new import_obsidian22.Setting(root).setName("Current site").addDropdown((d) => {
      for (const sp of s.sites) {
        d.addOption(sp.id, sp.name || sp.githubRepo);
      }
      d.setValue(site.id);
      d.onChange((id) => {
        void (async () => {
          s.activeSiteId = id;
          await this.plugin.saveSettings();
          void this.render();
        })();
      });
    }).addButton((b) => {
      b.setIcon("plus").setTooltip("Create another site").onClick(() => {
        new AddSiteModal(this.app, this.plugin, () => this.refresh()).open();
      });
    });
    this.renderStatusDashboard(root, site, isLive, hasFailed, isPublishing, live);
    if (site.hostingProvider === "cloudflare" && site.lastPublishError && /disconnect|git account/i.test(site.lastPublishError)) {
      const warnBanner = root.createDiv("nf-cf-warn-banner");
      warnBanner.createEl("strong", { text: "\u26A0 Cloudflare disconnected from GitHub" });
      warnBanner.createEl("p", {
        text: "Your last build failed because Cloudflare lost access to your GitHub repository. Click below to re-authorize, then publish again."
      });
      const reconnectBtn = warnBanner.createEl("button", { text: "Re-authorize Cloudflare \u2197", cls: "mod-cta" });
      reconnectBtn.addEventListener("click", () => {
        window.open(CLOUDFLARE_APP_URL3, "_blank");
      });
    }
    let updateVisibility;
    new import_obsidian22.Setting(root).setName("Publish scope").setDesc("Configure what to publish: the entire vault or selected files/folders.").addDropdown((d) => {
      d.addOption("vault", "Full Vault");
      d.addOption("selected", "Selected Files/Folders");
      d.setValue(site.publishScope || "vault");
      d.onChange((v) => {
        void (async () => {
          site.publishScope = v;
          updateVisibility();
          await this.plugin.saveSettings();
        })();
      });
    });
    const pathsContainer = root.createDiv("noteflare-paths-container");
    pathsContainer.setCssStyles({
      paddingLeft: "0",
      paddingRight: "0",
      paddingBottom: "1em"
    });
    const renderPaths = () => {
      pathsContainer.empty();
      if ((site.publishScope || "vault") === "vault") {
        pathsContainer.setCssStyles({ display: "none" });
        return;
      }
      pathsContainer.setCssStyles({ display: "block" });
      const addRow = pathsContainer.createDiv("noteflare-add-path-row");
      addRow.setCssStyles({ marginTop: "8px" });
      const addBtn = addRow.createEl("button", { text: "Browse Vault..." });
      addBtn.setCssStyles({ width: "100%" });
      addBtn.addEventListener("click", () => {
        new PathSuggestModal(this.app, (selectedPath) => {
          void (async () => {
            if (!site.publishPaths)
              site.publishPaths = [];
            if (!site.publishPaths.includes(selectedPath)) {
              site.publishPaths.push(selectedPath);
              await this.plugin.saveSettings();
              renderPaths();
            }
          })();
        }).open();
      });
      const paths = site.publishPaths || [];
      if (paths.length === 0) {
        const p = pathsContainer.createEl("p", { text: "No files or folders selected.", cls: "setting-item-description" });
        p.setCssStyles({ marginTop: "12px" });
      } else {
        const chipContainer = pathsContainer.createDiv();
        chipContainer.setCssStyles({
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "12px",
          maxHeight: "150px",
          overflowY: "auto",
          padding: "4px 0"
        });
        for (let i = 0; i < paths.length; i++) {
          const chip = chipContainer.createDiv();
          chip.setCssStyles({
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 8px",
            background: "var(--background-modifier-form-field)",
            border: "1px solid var(--background-modifier-border)",
            borderRadius: "var(--radius-s)",
            fontSize: "var(--font-ui-smaller)"
          });
          const iconSpan = chip.createSpan();
          const abstractFile = this.app.vault.getAbstractFileByPath(paths[i]);
          const isFolder = abstractFile && "children" in abstractFile;
          (0, import_obsidian22.setIcon)(iconSpan, isFolder ? "folder" : "file-text");
          iconSpan.setCssStyles({
            display: "flex",
            alignItems: "center",
            color: "var(--text-muted)",
            width: "14px",
            height: "14px"
          });
          chip.createSpan({ text: paths[i] });
          const removeBtn = chip.createSpan({ cls: "clickable-icon" });
          (0, import_obsidian22.setIcon)(removeBtn, "x");
          removeBtn.setCssStyles({
            display: "flex",
            alignItems: "center",
            padding: "0",
            width: "14px",
            height: "14px"
          });
          removeBtn.addEventListener("click", () => {
            void (async () => {
              var _a2;
              (_a2 = site.publishPaths) == null ? void 0 : _a2.splice(i, 1);
              await this.plugin.saveSettings();
              renderPaths();
            })();
          });
        }
      }
    };
    updateVisibility = () => {
      renderPaths();
    };
    updateVisibility();
    new import_obsidian22.Setting(root).setName("Advanced").setDesc("Configure metadata, styling, and exclusions for this site.").addButton((b) => {
      b.setButtonText("Edit").onClick(() => {
        new EditSiteModal(this.app, this.plugin, site, () => this.refresh()).open();
      });
    });
    this.renderActions(root, site, isLive, hasFailed, isPublishing);
  }
  /** Render the live status dashboard card. */
  renderStatusDashboard(root, site, isLive, hasFailed, isPublishing, live) {
    const card = root.createDiv("nf-status-card");
    card.setCssStyles({
      marginBottom: "12px",
      padding: "12px 14px",
      border: "1px solid var(--background-modifier-border)",
      borderRadius: "var(--radius-m)",
      backgroundColor: "var(--background-primary-alt)"
    });
    const headerRow = card.createDiv();
    headerRow.setCssStyles({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px"
    });
    let badgeEmoji = "\u26AA";
    let badgeText = "Offline";
    let badgeColor = "var(--text-muted)";
    if (isPublishing) {
      badgeEmoji = "\u{1F535}";
      badgeText = "Publishing\u2026";
      badgeColor = "var(--text-accent)";
    } else if (hasFailed) {
      badgeEmoji = "\u{1F534}";
      badgeText = "Last publish failed";
      badgeColor = "var(--text-error)";
    } else if (isLive) {
      if (live && !live.loading && live.workflowStatus === "completed") {
        if (live.workflowConclusion === "success") {
          badgeEmoji = "\u{1F7E2}";
          badgeText = "Live";
          badgeColor = "var(--text-success)";
        } else if (live.workflowConclusion === "failure") {
          badgeEmoji = "\u{1F534}";
          badgeText = site.hostingProvider === "cloudflare" ? "Build failed on Cloudflare" : "Build failed on GitHub";
          badgeColor = "var(--text-error)";
        } else if (live.workflowConclusion === "cancelled") {
          badgeEmoji = "\u{1F7E1}";
          badgeText = "Build cancelled";
          badgeColor = "var(--color-yellow)";
        }
      } else if (live && live.workflowStatus === "in_progress") {
        badgeEmoji = "\u{1F535}";
        badgeText = site.hostingProvider === "cloudflare" ? "Building on Cloudflare\u2026" : "Building on GitHub\u2026";
        badgeColor = "var(--text-accent)";
      } else {
        badgeEmoji = "\u{1F7E2}";
        badgeText = "Live";
        badgeColor = "var(--text-success)";
      }
    }
    const badgeEl = headerRow.createSpan();
    badgeEl.setCssStyles({ fontWeight: "600", color: badgeColor, fontSize: "var(--font-ui-medium)" });
    badgeEl.setText(`${badgeEmoji} ${badgeText}`);
    const refreshBtn = headerRow.createEl("button", { text: (live == null ? void 0 : live.loading) ? "\u2026" : "\u21BB Refresh" });
    refreshBtn.setCssStyles({ fontSize: "var(--font-ui-smaller)", padding: "2px 8px" });
    if (live == null ? void 0 : live.loading)
      refreshBtn.setAttr("disabled", "true");
    refreshBtn.addEventListener("click", () => {
      const s = this.plugin.getActiveSite();
      if (s)
        void this.plugin.fetchLiveStatus(s);
    });
    const grid = card.createDiv();
    grid.setCssStyles({
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "6px 16px",
      fontSize: "var(--font-ui-smaller)",
      color: "var(--text-muted)"
    });
    const addRow = (label, value, href) => {
      const labelEl = grid.createSpan({ text: label });
      labelEl.setCssStyles({ fontWeight: "500", color: "var(--text-normal)" });
      if (href && value) {
        const linkEl = grid.createEl("a", { text: value, href });
        linkEl.setCssStyles({ color: "var(--text-accent)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" });
        linkEl.addEventListener("click", (e) => {
          e.preventDefault();
          window.open(href, "_blank");
        });
      } else {
        const valEl = grid.createSpan({ text: value || "\u2014" });
        valEl.setCssStyles({ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" });
      }
    };
    addRow("Site URL", site.siteUrl ? site.siteUrl : "\u2014", site.siteUrl ? `https://${site.siteUrl.replace(/^https?:\/\//, "")}` : void 0);
    const hostLabel = site.hostingProvider === "cloudflare" ? "Cloudflare Pages" : site.hostingProvider === "github-pages" ? "GitHub Pages" : site.hostingProvider;
    addRow("Host", hostLabel);
    if (live && !live.loading) {
      addRow(
        "Repository",
        `${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`,
        live.repoHtmlUrl || `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`
      );
      addRow("Last push", live.repoPushedAt ? relativeTime(live.repoPushedAt) : "\u2014");
      if (live.commitSha) {
        addRow(
          "Last commit",
          `${live.commitSha}${live.commitMessage ? ` \u2014 ${live.commitMessage.slice(0, 40)}` : ""}`,
          live.commitSha ? `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}/commits` : void 0
        );
        addRow("Committed", relativeTime(live.commitDate));
      }
      if ((site.hostingProvider === "github-pages" || site.hostingProvider === "cloudflare") && live.workflowStatus) {
        const wfLabel = live.workflowStatus === "in_progress" ? "\u{1F504} Building\u2026" : live.workflowConclusion === "success" ? "\u2705 Passed" : live.workflowConclusion === "failure" ? "\u274C Failed" : live.workflowConclusion === "cancelled" ? "\u26D4 Cancelled" : live.workflowStatus;
        addRow("Build", wfLabel, live.workflowUrl || void 0);
        addRow("Build ran", relativeTime(live.workflowUpdatedAt));
      }
      if (live.fetchedAt) {
        const fetchedEl = card.createEl("p", { text: `Status fetched ${relativeTime(live.fetchedAt)}` });
        fetchedEl.setCssStyles({ margin: "8px 0 0 0", fontSize: "var(--font-ui-smaller)", color: "var(--text-faint)" });
      }
    } else if (live == null ? void 0 : live.loading) {
      const loadingEl = card.createEl("p", { text: "Fetching live status\u2026" });
      loadingEl.setCssStyles({ margin: "6px 0 0 0", fontSize: "var(--font-ui-smaller)", color: "var(--text-muted)" });
    } else {
      addRow(
        "Repository",
        `${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`,
        `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`
      );
      if (site.lastPublished) {
        addRow("Last published", relativeTime(site.lastPublished));
        addRow("Notes", String(site.lastNoteCount));
      }
    }
    if (hasFailed && site.lastPublishError) {
      const errEl = card.createEl("p", { text: `\u26A0 ${site.lastPublishError}` });
      errEl.setCssStyles({
        margin: "8px 0 0 0",
        fontSize: "var(--font-ui-smaller)",
        color: "var(--text-error)",
        wordBreak: "break-word"
      });
    }
    if (this.plugin.settings.enableBackup) {
      const backupEl = card.createEl("p");
      backupEl.setCssStyles({ margin: "8px 0 0 0", fontSize: "var(--font-ui-smaller)", color: "var(--text-muted)", borderTop: "1px solid var(--background-modifier-border)", paddingTop: "8px" });
      const backupText = this.plugin.settings.backup.lastBackupError ? `Backup: \u26A0 ${this.plugin.settings.backup.lastBackupError}` : this.plugin.settings.backup.lastBackupAt ? `Backup: \u2713 ${relativeTime(this.plugin.settings.backup.lastBackupAt)}` : "Backup: not run yet";
      backupEl.setText(backupText);
    }
  }
  /** Render the Publish / Unpublish / Delete action buttons. */
  renderActions(root, site, isLive, hasFailed, isPublishing) {
    const actionBox = root.createDiv("nf-actions-box");
    actionBox.setCssStyles({
      marginTop: "8px",
      padding: "12px",
      border: "1px solid var(--background-modifier-border)",
      backgroundColor: "var(--background-primary-alt)",
      borderRadius: "var(--radius-s)",
      marginBottom: "15px"
    });
    const actionHeading = new import_obsidian22.Setting(actionBox).setName("Actions").setHeading();
    actionHeading.settingEl.setCssStyles({ border: "none", padding: "0", marginBottom: "12px" });
    const actionSetting = new import_obsidian22.Setting(actionBox);
    actionSetting.settingEl.setCssStyles({ border: "none", padding: "0" });
    actionSetting.infoEl.setCssStyles({ display: "none" });
    actionSetting.controlEl.setCssStyles({
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      width: "100%"
    });
    const publishLabel = isPublishing ? "Publishing\u2026" : hasFailed ? "Republish" : isLive ? "Update" : "Publish";
    const hostingProvider = site.hostingProvider;
    actionSetting.addButton((b) => {
      b.setButtonText(publishLabel);
      if (isPublishing) {
        b.setDisabled(true);
      } else {
        b.setCta();
      }
      b.onClick(() => {
        void (async () => {
          b.setDisabled(true);
          b.setButtonText("Publishing\u2026");
          try {
            await this.plugin.doPublish();
          } finally {
            void this.render();
          }
        })();
      });
    }).addButton((b) => {
      if (hostingProvider === "cloudflare") {
        b.setButtonText("Unpublish");
        if (!isLive || isPublishing) {
          b.setDisabled(true);
        } else {
          b.buttonEl.addClass("mod-warning");
        }
        b.onClick(() => {
          new UnpublishModal(this.app, this.plugin, () => this.refresh()).open();
        });
      } else {
        b.setButtonText("Unpublish (Manual)");
        if (!isLive || isPublishing) {
          b.setDisabled(true);
        } else {
          b.buttonEl.addClass("mod-warning");
        }
        b.onClick(() => {
          void (async () => {
            site.isPublished = false;
            await this.plugin.saveSettings();
            new GitHubPagesUnpublishModal(
              this.app,
              `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}/settings/pages`
            ).open();
            this.refresh();
          })();
        });
      }
    }).addButton((b) => {
      const deleteTooltip = hostingProvider === "cloudflare" ? "Removes the Cloudflare Pages project (API) and the site folder from GitHub" : "Removes the site folder from GitHub. GitHub Pages link may remain \u2014 disable it manually in repo Settings \u2192 Pages";
      b.setButtonText("Delete");
      b.setTooltip(deleteTooltip);
      if (isPublishing)
        b.setDisabled(true);
      else
        b.buttonEl.addClass("mod-warning");
      b.onClick(() => {
        new RemoveSiteModal(this.app, this.plugin, site, () => {
          this.refresh();
        }).open();
      });
    });
  }
};

// src/core/secureStore.ts
function resolveSafeStorage() {
  var _a, _b, _c;
  try {
    const electron = require("electron");
    return (_c = (_b = electron.safeStorage) != null ? _b : (_a = electron.remote) == null ? void 0 : _a.safeStorage) != null ? _c : null;
  } catch (e) {
    return null;
  }
}
var safeStorage = resolveSafeStorage();
function isSecureStorageAvailable() {
  try {
    return !!safeStorage && safeStorage.isEncryptionAvailable();
  } catch (e) {
    return false;
  }
}
function encryptSecret(plain) {
  if (!plain)
    return "";
  if (!isSecureStorageAvailable()) {
    throw new Error("Secure storage is unavailable on this system.");
  }
  return safeStorage.encryptString(plain).toString("base64");
}
function decryptSecret(b64) {
  if (!b64)
    return "";
  if (!isSecureStorageAvailable())
    return "";
  try {
    return safeStorage.decryptString(Buffer.from(b64, "base64"));
  } catch (e) {
    return "";
  }
}

// src/backup/backupEngine.ts
var DEFAULT_IGNORE_PATTERNS = [
  ".DS_Store",
  "Thumbs.db",
  "desktop.ini",
  ".trash/",
  "node_modules/"
];
var BackupEngine = class {
  constructor(app, settings, onProgress = () => {
  }) {
    this.app = app;
    this.settings = settings;
    this.onProgress = onProgress;
  }
  async backup() {
    const result = { success: true, updated: 0, errors: [] };
    const { githubOwner, githubToken, backup } = this.settings;
    if (!githubToken || !githubOwner || !backup.repository) {
      return {
        success: false,
        updated: 0,
        errors: ["Backup is not configured. Open NoteFlare settings to finish setup."]
      };
    }
    try {
      const isPrivate = backup.repoVisibility !== "public";
      let github = new GitHubApi(githubToken, githubOwner, backup.repository, "main");
      const repositoryExists = await github.repoExists();
      if (!repositoryExists) {
        this.onProgress("Preparing backup storage\u2026");
        await github.createRepo(isPrivate);
        if (!await github.waitForRepo(3e4)) {
          throw new Error("Timed out while preparing backup storage.");
        }
      } else if (isPrivate && !await github.isRepoPrivate()) {
        throw new Error(
          "Backup stopped because its storage location is public. Rename that repository in GitHub or make it private, then try again."
        );
      }
      let branch = "main";
      try {
        branch = await github.getDefaultBranch();
      } catch (e) {
      }
      github = new GitHubApi(githubToken, githubOwner, backup.repository, branch);
      const localFiles = await this.collectLocalFiles();
      const remoteFiles = await this.getRemoteFiles(github);
      const uploads = [];
      for (const [path, local] of localFiles) {
        if (remoteFiles.get(path) !== local.sha) {
          uploads.push({ path, content: local.content });
        }
        remoteFiles.delete(path);
      }
      for (const path of remoteFiles.keys()) {
        const localFileExists = this.app.vault.getAbstractFileByPath(path) !== null;
        if (!this.isIgnored(path) && !localFileExists) {
          uploads.push({ path, content: null });
        }
      }
      if (uploads.length === 0)
        return result;
      const timestamp = (/* @__PURE__ */ new Date()).toLocaleString();
      const committed = await github.commitFiles(
        uploads,
        `NoteFlare backup \xB7 ${timestamp}`,
        (done, total) => this.onProgress(`Backing up ${done}/${total}\u2026`),
        void 0,
        "",
        { isPrivate: true }
      );
      result.success = committed.success;
      result.updated = committed.uploaded;
      result.errors = committed.errors;
    } catch (error) {
      result.success = false;
      result.errors.push(error instanceof Error ? error.message : "Backup failed.");
    }
    return result;
  }
  async collectLocalFiles() {
    const files = /* @__PURE__ */ new Map();
    for (const file of this.app.vault.getFiles()) {
      if (this.isIgnored(file.path))
        continue;
      try {
        const bytes = new Uint8Array(await this.app.vault.readBinary(file));
        files.set(file.path, {
          content: this.toBase64(bytes),
          sha: await this.computeGitBlobSha(bytes)
        });
      } catch (e) {
      }
    }
    return files;
  }
  async getRemoteFiles(github) {
    try {
      const tree = await github.listTree();
      return new Map(
        tree.filter((file) => !this.isIgnored(file.path)).map((file) => [file.path, file.sha])
      );
    } catch (error) {
      const status = error.status;
      if (status === 404 || error.message.includes("404"))
        return /* @__PURE__ */ new Map();
      throw error;
    }
  }
  isIgnored(path) {
    const configDir = this.app.vault.configDir;
    if (path === configDir || path.startsWith(`${configDir}/`))
      return true;
    return DEFAULT_IGNORE_PATTERNS.some((pattern) => {
      if (pattern.endsWith("/")) {
        return path === pattern.slice(0, -1) || path.startsWith(pattern);
      }
      return path === pattern || path.endsWith("/" + pattern);
    });
  }
  toBase64(bytes) {
    let binary = "";
    const chunkSize = 32768;
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
    }
    return btoa(binary);
  }
  async computeGitBlobSha(content) {
    const header = new TextEncoder().encode(`blob ${content.byteLength}\0`);
    const payload = new Uint8Array(header.length + content.length);
    payload.set(header);
    payload.set(content, header.length);
    const hash = await crypto.subtle.digest("SHA-1", payload);
    return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
};

// src/backup/backupScheduler.ts
var BackupScheduler = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.backupDebounceTimer = null;
  }
  registerAutomation() {
    const { app } = this.plugin;
    const queueAfterChange = () => {
      if (!this.plugin.settings.enableBackup || !this.plugin.settings.backup.backupOnChange)
        return;
      if (this.backupDebounceTimer !== null)
        window.clearTimeout(this.backupDebounceTimer);
      this.backupDebounceTimer = window.setTimeout(() => {
        this.backupDebounceTimer = null;
        void this.plugin.doBackup(true);
      }, 3e4);
    };
    this.plugin.registerEvent(app.vault.on("create", queueAfterChange));
    this.plugin.registerEvent(app.vault.on("modify", queueAfterChange));
    this.plugin.registerEvent(app.vault.on("delete", queueAfterChange));
    this.plugin.registerEvent(app.vault.on("rename", queueAfterChange));
    this.plugin.register(() => {
      if (this.backupDebounceTimer !== null)
        window.clearTimeout(this.backupDebounceTimer);
    });
    this.plugin.registerInterval(window.setInterval(() => {
      void this.runScheduledBackupIfDue();
    }, 6e4));
    app.workspace.onLayoutReady(() => void this.runScheduledBackupIfDue());
  }
  async runScheduledBackupIfDue() {
    const { settings } = this.plugin;
    const { backup } = settings;
    if (!settings.setupComplete || !settings.enableBackup || backup.intervalMinutes <= 0) {
      return;
    }
    const lastAttempt = backup.lastBackupAttemptAt ? new Date(backup.lastBackupAttemptAt).getTime() : 0;
    const intervalMs = backup.intervalMinutes * 60 * 1e3;
    if (!lastAttempt || Date.now() - lastAttempt >= intervalMs) {
      await this.plugin.doBackup(true);
    }
  }
};

// main.ts
var NoteFlarePlugin = class extends import_obsidian23.Plugin {
  constructor() {
    super(...arguments);
    this.ribbonEl = null;
    this.backupInProgress = false;
    /** In-progress publish tracking (in-memory only, cleared on success/fail). */
    this.publishInProgress = {};
    /** Live GitHub status cache (in-memory, refreshed on panel open/refresh). */
    this.liveStatus = {};
  }
  async onload() {
    await this.loadSettings();
    if (this.settings.githubToken && this.settings.githubOwner && this.settings.sites.length === 0) {
      const registry = await VaultRegistry.load(this.app);
      if (registry.entries.length > 0) {
        new import_obsidian23.Notice(
          `NoteFlare found ${registry.entries.length} previously configured site${registry.entries.length === 1 ? "" : "s"} in your vault. Open NoteFlare settings to restore them.`,
          1e4
        );
      }
    }
    if (!isSecureStorageAvailable()) {
      new import_obsidian23.Notice(
        "NoteFlare: secure token storage is unavailable on this system. Your tokens will not be saved between sessions \u2014 you may need to re-enter them.",
        1e4
      );
    }
    const statusEl = this.addStatusBarItem();
    this.statusBar = new StatusBar(statusEl);
    this.updateStatusBar();
    this.registerView(VIEW_TYPE_NOTEFLARE, (leaf) => new NoteFlareView(leaf, this));
    this.ribbonEl = this.addRibbonIcon(
      this.isActiveLive() ? "cloud-check" : "cloud-upload",
      "NoteFlare",
      () => void this.activateView()
    );
    this.updateRibbonIcon();
    this.addCommand({
      id: "open-panel",
      name: "Open panel",
      callback: () => void this.activateView()
    });
    this.addCommand({
      id: "publish",
      name: "Publish active site",
      callback: () => void this.doPublish()
    });
    this.addCommand({
      id: "unpublish",
      name: "Unpublish active site",
      callback: () => void this.doUnpublish()
    });
    this.addCommand({
      id: "backup-now",
      name: "Back up vault now",
      callback: () => void this.doBackup(false)
    });
    this.addSettingTab(new NoteFlareSettingsTab(this.app, this));
    new BackupScheduler(this).registerAutomation();
  }
  /** The currently-selected site, or the first one, or null when none exist. */
  getActiveSite() {
    var _a, _b;
    const { sites, activeSiteId } = this.settings;
    return (_b = (_a = sites.find((s) => s.id === activeSiteId)) != null ? _a : sites[0]) != null ? _b : null;
  }
  isActiveLive() {
    var _a, _b;
    return (_b = (_a = this.getActiveSite()) == null ? void 0 : _a.isPublished) != null ? _b : false;
  }
  /** Reveal the NoteFlare panel (creating it if needed in the configured location). */
  async activateView() {
    var _a, _b;
    const { workspace } = this.app;
    let leaf = (_a = workspace.getLeavesOfType(VIEW_TYPE_NOTEFLARE)[0]) != null ? _a : null;
    if (!leaf) {
      const loc = (_b = this.settings.defaultViewLocation) != null ? _b : "left";
      if (loc === "right") {
        leaf = workspace.getRightLeaf(false);
      } else if (loc === "tab") {
        leaf = workspace.getLeaf("tab");
      } else {
        leaf = workspace.getLeftLeaf(false);
      }
      if (!leaf)
        return;
      await leaf.setViewState({ type: VIEW_TYPE_NOTEFLARE, active: true });
    }
    void workspace.revealLeaf(leaf);
  }
  refreshView() {
    this.app.workspace.getLeavesOfType(VIEW_TYPE_NOTEFLARE).forEach((leaf) => {
      const view = leaf.view;
      if (view instanceof NoteFlareView)
        view.refresh();
    });
  }
  async doBackup(background = false) {
    var _a;
    if (this.backupInProgress) {
      if (!background)
        new import_obsidian23.Notice("A backup is already running.");
      return;
    }
    if (!this.settings.setupComplete || !this.settings.enableBackup) {
      if (!background) {
        this.openSettingsTab();
        new import_obsidian23.Notice("Enable private backup in NoteFlare settings first.");
      }
      return;
    }
    if (!this.settings.backup.repository) {
      this.settings.backup.repository = this.defaultBackupRepository();
    }
    this.backupInProgress = true;
    this.settings.backup.lastBackupAttemptAt = (/* @__PURE__ */ new Date()).toISOString();
    const engine = new BackupEngine(this.app, this.settings, (message) => {
      if (!background)
        this.statusBar.setMessage(`NoteFlare: ${message}`);
    });
    try {
      const result = await engine.backup();
      if (!result.success)
        throw new Error((_a = result.errors[0]) != null ? _a : "Backup failed.");
      this.settings.backup.lastBackupAt = (/* @__PURE__ */ new Date()).toISOString();
      this.settings.backup.lastBackupError = "";
      await this.saveSettings();
      if (!background) {
        const message = result.updated > 0 ? `Backup complete \xB7 ${result.updated} file${result.updated === 1 ? "" : "s"} updated` : "Backup is already up to date";
        new import_obsidian23.Notice(message, 5e3);
      }
    } catch (error) {
      const message = this.toUserMessage(error, "Backup failed.");
      this.settings.backup.lastBackupError = message;
      await this.saveSettings();
      if (!background) {
        this.statusBar.setError(message);
        new import_obsidian23.Notice(message, 8e3);
      } else {
        console.error(`NoteFlare background backup failed: ${message}`);
      }
    } finally {
      this.backupInProgress = false;
      if (!background)
        this.updateStatusBar();
    }
  }
  async doPublish() {
    const site = this.getActiveSite();
    if (!this.settings.setupComplete || !site) {
      this.openSettingsTab();
      new import_obsidian23.Notice("Add a site before publishing.");
      return;
    }
    if (this.publishInProgress[site.id])
      return;
    this.publishInProgress[site.id] = true;
    this.refreshView();
    const publisher = new Publisher(this.settings, site, this.app, (message) => {
      this.syncStatusFromProgress(message);
      this.refreshView();
    });
    try {
      const result = await publisher.publish();
      await this.applyPublishResult(site, result);
    } catch (err) {
      const message = this.toUserMessage(err, "Publishing failed. Review your setup and try again.");
      site.lastPublishFailed = true;
      site.lastPublishError = message;
      site.isPublished = false;
      this.statusBar.setError(message);
      new import_obsidian23.Notice(message, 8e3);
      await this.saveSettings();
    } finally {
      this.publishInProgress[site.id] = false;
      this.refreshView();
    }
  }
  async doUnpublish() {
    const site = this.getActiveSite();
    if (!this.settings.setupComplete || !site) {
      this.openSettingsTab();
      new import_obsidian23.Notice("Add a site first.");
      return;
    }
    const publisher = new Publisher(this.settings, site, this.app, (message) => {
      this.statusBar.setMessage(`NoteFlare: ${message}`);
    });
    this.statusBar.setMessage("NoteFlare: Taking your site offline...");
    try {
      await publisher.unpublish();
      site.isPublished = false;
      await this.saveSettings();
      this.updateStatusBar();
      new import_obsidian23.Notice("Your site is now offline. You can publish again any time.");
    } catch (err) {
      const message = this.toUserMessage(err, "Unpublish failed. Check your Cloudflare settings and try again.");
      this.statusBar.setError(message);
      new import_obsidian23.Notice(message, 8e3);
    }
  }
  async loadSettings() {
    const loaded = await this.loadData();
    const { settings } = migrateSettings(loaded);
    this.settings = settings;
  }
  async saveSettings() {
    const { githubToken, cloudflareToken, ...rest } = this.settings;
    const persisted = { ...rest };
    if (isSecureStorageAvailable()) {
      persisted.githubTokenEnc = githubToken ? encryptSecret(githubToken) : "";
      persisted.cloudflareTokenEnc = cloudflareToken ? encryptSecret(cloudflareToken) : "";
    }
    await this.saveData(persisted);
    for (const site of this.settings.sites) {
      void VaultRegistry.upsert(
        this.app,
        site,
        this.settings.masterRepository,
        this.settings.githubOwner,
        this.settings.masterRepositoryPrivate || false
      );
    }
    this.updateStatusBar();
    this.updateRibbonIcon();
    this.refreshView();
  }
  updateStatusBar() {
    if (!this.statusBar)
      return;
    const site = this.getActiveSite();
    if (!this.settings.setupComplete || !site) {
      this.statusBar.setIdle();
      return;
    }
    if (site.isPublished) {
      this.statusBar.setLive(site.lastNoteCount, site.siteUrl);
      return;
    }
    this.statusBar.setUnpublished();
  }
  updateRibbonIcon() {
    if (!this.ribbonEl)
      return;
    const live = this.isActiveLive();
    (0, import_obsidian23.setIcon)(this.ribbonEl, live ? "cloud-check" : "cloud-upload");
    this.ribbonEl.setAttribute(
      "aria-label",
      live ? "NoteFlare: Unpublish site" : "NoteFlare: Publish site"
    );
  }
  syncStatusFromProgress(message) {
    const uploadMatch = /Uploading (\d+)\/(\d+)/.exec(message);
    if (uploadMatch) {
      this.statusBar.setPublishing(Number(uploadMatch[1]), Number(uploadMatch[2]));
      return;
    }
    const rateMatch = /Rate limited(?:.*?)(\d+)s/.exec(message);
    if (rateMatch) {
      this.statusBar.setRateLimited(Number(rateMatch[1]));
      return;
    }
    this.statusBar.setMessage(`NoteFlare: ${message}`);
  }
  defaultBackupRepository() {
    const vaultName = this.app.vault.getName().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    return `${vaultName || "obsidian-vault"}-backup`;
  }
  async applyPublishResult(site, result) {
    var _a, _b;
    site.lastPublished = (/* @__PURE__ */ new Date()).toISOString();
    site.isPublished = result.success;
    site.lastNoteCount = result.noteCount;
    site.lastPublishFailed = !result.success;
    site.lastPublishError = result.success ? "" : (_a = result.errors[0]) != null ? _a : "Unknown error";
    await this.saveSettings();
    if (result.success) {
      this.statusBar.setLive(result.noteCount, site.siteUrl);
      const fixedNote = result.fixed > 0 ? ` (auto-fixed ${result.fixed} frontmatter issue${result.fixed === 1 ? "" : "s"})` : "";
      new import_obsidian23.Notice(`Published ${result.noteCount} file${result.noteCount === 1 ? "" : "s"} to ${site.siteUrl}${fixedNote}`, 6e3);
      void this.fetchLiveStatus(site);
      return;
    }
    const firstError = (_b = result.errors[0]) != null ? _b : "Publishing failed. Review your setup and try again.";
    this.statusBar.setError(firstError);
    new import_obsidian23.Notice(`Failed to publish: ${firstError}`, 8e3);
  }
  /**
   * Fetch live GitHub status for the given site and cache it in `liveStatus`.
   * The view calls this on open and on the Refresh button. Never throws.
   */
  async fetchLiveStatus(site) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    const repo = site.githubRepo || this.settings.masterRepository;
    if (!this.settings.githubToken || !this.settings.githubOwner || !repo) {
      this.liveStatus[site.id] = {
        ...(_a = this.liveStatus[site.id]) != null ? _a : {},
        loading: false,
        error: !repo ? "GitHub repository not configured." : "GitHub account not connected."
      };
      this.refreshView();
      return;
    }
    const branch = site.githubBranch || "main";
    const github = new GitHubApi(
      this.settings.githubToken,
      this.settings.githubOwner,
      repo,
      branch
    );
    this.liveStatus[site.id] = {
      ...(_b = this.liveStatus[site.id]) != null ? _b : {},
      loading: true
    };
    this.refreshView();
    try {
      const [repoInfo, workflowRun, latestCommit] = await Promise.all([
        github.getRepoInfo(),
        github.getLatestWorkflowRun("deploy.yml"),
        github.getLatestCommit(branch)
      ]);
      let cfWorkflowStatus = (_c = workflowRun == null ? void 0 : workflowRun.status) != null ? _c : "";
      let cfWorkflowConclusion = (_d = workflowRun == null ? void 0 : workflowRun.conclusion) != null ? _d : "";
      let cfWorkflowUrl = (_e = workflowRun == null ? void 0 : workflowRun.htmlUrl) != null ? _e : "";
      let cfWorkflowUpdatedAt = (_f = workflowRun == null ? void 0 : workflowRun.updatedAt) != null ? _f : "";
      if (site.hostingProvider === "cloudflare" && this.settings.cloudflareToken && this.settings.cloudflareAccount && site.cloudflareProject) {
        try {
          const cf = new CloudflareApi(this.settings.cloudflareToken, this.settings.cloudflareAccount);
          const cfDeployments = await cf.listDeployments(site.cloudflareProject);
          const latestCf = (_g = cfDeployments == null ? void 0 : cfDeployments.result) == null ? void 0 : _g[0];
          if (latestCf) {
            const status = latestCf.status;
            if (status === "queued" || status === "pending" || status === "in_progress") {
              cfWorkflowStatus = "in_progress";
              cfWorkflowConclusion = "";
            } else if (status === "success" || status === "active") {
              cfWorkflowStatus = "completed";
              cfWorkflowConclusion = "success";
            } else if (status === "failure" || status === "error") {
              cfWorkflowStatus = "completed";
              cfWorkflowConclusion = "failure";
            } else if (status === "canceled") {
              cfWorkflowStatus = "completed";
              cfWorkflowConclusion = "cancelled";
            } else {
              cfWorkflowStatus = "completed";
              cfWorkflowConclusion = "success";
            }
            cfWorkflowUrl = latestCf.url || "";
            cfWorkflowUpdatedAt = latestCf.modified_on || latestCf.created_on || "";
          }
        } catch (cfErr) {
          console.warn("NoteFlare: could not fetch Cloudflare status:", cfErr);
        }
      }
      this.liveStatus[site.id] = {
        loading: false,
        repoHtmlUrl: (_h = repoInfo == null ? void 0 : repoInfo.htmlUrl) != null ? _h : "",
        repoPushedAt: (_i = repoInfo == null ? void 0 : repoInfo.pushedAt) != null ? _i : "",
        workflowStatus: cfWorkflowStatus,
        workflowConclusion: cfWorkflowConclusion,
        workflowUrl: cfWorkflowUrl,
        workflowUpdatedAt: cfWorkflowUpdatedAt,
        commitSha: (_j = latestCommit == null ? void 0 : latestCommit.sha) != null ? _j : "",
        commitMessage: (_k = latestCommit == null ? void 0 : latestCommit.message) != null ? _k : "",
        commitDate: (_l = latestCommit == null ? void 0 : latestCommit.date) != null ? _l : "",
        fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
        error: ""
      };
    } catch (err) {
      this.liveStatus[site.id] = {
        ...(_m = this.liveStatus[site.id]) != null ? _m : {},
        loading: false,
        error: err instanceof Error ? err.message : "Status fetch failed"
      };
    }
    this.refreshView();
  }
  openSettingsTab() {
    var _a, _b;
    const setting = this.app.setting;
    (_a = setting == null ? void 0 : setting.open) == null ? void 0 : _a.call(setting);
    (_b = setting == null ? void 0 : setting.openTabById) == null ? void 0 : _b.call(setting, this.manifest.id);
  }
  toUserMessage(err, fallback) {
    const message = err instanceof Error ? err.message : "";
    return message || fallback;
  }
};
function migrateSettings(loaded) {
  var _a, _b, _c, _d, _e, _f;
  const settings = {
    ...DEFAULT_SETTINGS,
    sites: [],
    backup: { ...DEFAULT_BACKUP_SETTINGS }
  };
  if (!loaded)
    return { settings };
  const str = (v) => typeof v === "string" ? v : "";
  settings.githubOwner = str(loaded.githubOwner);
  settings.cloudflareAccount = str(loaded.cloudflareAccount);
  settings.masterRepository = str(loaded.masterRepository) || "noteflare-sites";
  settings.masterRepositoryPrivate = loaded.masterRepositoryPrivate === true;
  settings.setupComplete = loaded.setupComplete === true;
  settings.activeSiteId = str(loaded.activeSiteId);
  settings.enableBackup = loaded.enableBackup === true;
  settings.enablePublish = loaded.enablePublish !== false;
  const savedBackup = typeof loaded.backup === "object" && loaded.backup !== null ? loaded.backup : null;
  settings.backup = {
    ...DEFAULT_BACKUP_SETTINGS,
    ...savedBackup != null ? savedBackup : {},
    repository: (_a = savedBackup == null ? void 0 : savedBackup.repository) != null ? _a : "",
    repoVisibility: (_b = savedBackup == null ? void 0 : savedBackup.repoVisibility) != null ? _b : "private",
    backupOnChange: (_c = savedBackup == null ? void 0 : savedBackup.backupOnChange) != null ? _c : true,
    lastBackupAt: (_d = savedBackup == null ? void 0 : savedBackup.lastBackupAt) != null ? _d : ""
  };
  if (loaded.githubTokenEnc) {
    settings.githubToken = decryptSecret(str(loaded.githubTokenEnc));
  }
  if (loaded.cloudflareTokenEnc) {
    settings.cloudflareToken = decryptSecret(str(loaded.cloudflareTokenEnc));
  }
  if (Array.isArray(loaded.sites)) {
    settings.sites = loaded.sites.map((s) => {
      let publishScope = s.publishScope;
      let publishPaths = s.publishPaths;
      if (publishScope === "folder" || publishScope === "page") {
        publishScope = "selected";
        const legacyPath = s.publishPath;
        if (legacyPath && !publishPaths) {
          publishPaths = [legacyPath];
        }
      }
      let hostingProvider = s.hostingProvider;
      if (!hostingProvider) {
        const legacyTarget = s.deployTarget;
        hostingProvider = legacyTarget === "cloudflare" ? "cloudflare" : "github-pages";
      }
      const { deployTarget: _dt, ...rest } = s;
      return createSiteProfile({
        ...rest,
        publishScope: publishScope || "vault",
        publishPaths: publishPaths || [],
        hostingProvider
      });
    });
  }
  if (!settings.sites.some((s) => s.id === settings.activeSiteId)) {
    settings.activeSiteId = (_f = (_e = settings.sites[0]) == null ? void 0 : _e.id) != null ? _f : "";
  }
  return { settings };
}
/*! Bundled license information:

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

to-regex-range/index.js:
  (*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL2JyYWNlcy9saWIvdXRpbHMuanMiLCAibm9kZV9tb2R1bGVzL2JyYWNlcy9saWIvc3RyaW5naWZ5LmpzIiwgIm5vZGVfbW9kdWxlcy9pcy1udW1iZXIvaW5kZXguanMiLCAibm9kZV9tb2R1bGVzL3RvLXJlZ2V4LXJhbmdlL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9maWxsLXJhbmdlL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9icmFjZXMvbGliL2NvbXBpbGUuanMiLCAibm9kZV9tb2R1bGVzL2JyYWNlcy9saWIvZXhwYW5kLmpzIiwgIm5vZGVfbW9kdWxlcy9icmFjZXMvbGliL2NvbnN0YW50cy5qcyIsICJub2RlX21vZHVsZXMvYnJhY2VzL2xpYi9wYXJzZS5qcyIsICJub2RlX21vZHVsZXMvYnJhY2VzL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL2NvbnN0YW50cy5qcyIsICJub2RlX21vZHVsZXMvcGljb21hdGNoL2xpYi91dGlscy5qcyIsICJub2RlX21vZHVsZXMvcGljb21hdGNoL2xpYi9zY2FuLmpzIiwgIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL3BhcnNlLmpzIiwgIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL3BpY29tYXRjaC5qcyIsICJub2RlX21vZHVsZXMvcGljb21hdGNoL2luZGV4LmpzIiwgIm5vZGVfbW9kdWxlcy9taWNyb21hdGNoL2luZGV4LmpzIiwgInNyYy9jb3JlL3NldHRpbmdzLnRzIiwgIm1haW4udHMiLCAic3JjL2FwaS9naXRodWJBcGkudHMiLCAic3JjL2FwaS9jbG91ZGZsYXJlQXBpLnRzIiwgInNyYy9wdWJsaXNoL2ZpbGVDb2xsZWN0b3IudHMiLCAic3JjL2NvcmUvY29uc3RhbnRzLnRzIiwgInNyYy9wdWJsaXNoL3RyYW5zZm9ybWVyLnRzIiwgInNyYy9wdWJsaXNoL2NvbnRlbnRWYWxpZGF0b3IudHMiLCAic3JjL3B1Ymxpc2gvcHVibGlzaGVyLnRzIiwgInNyYy91aS9zZXR0aW5ncy9zZXR0aW5nc1RhYi50cyIsICJzcmMvdWkvc2V0dGluZ3Mvd2l6YXJkL3N0ZXBHaXRIdWIudHMiLCAic3JjL3VpL3NldHRpbmdzL3NldHRpbmdzSGVscGVycy50cyIsICJzcmMvdWkvc2V0dGluZ3Mvd2l6YXJkL3N0ZXBIb3N0aW5nLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tb2RhbHMvaGVscGVycy50cyIsICJzcmMvdWkvc2V0dGluZ3MvbW9kYWxzL3BhdGhTdWdnZXN0TW9kYWwudHMiLCAic3JjL3VpL3NldHRpbmdzL3dpemFyZC9zdGVwQmFja3VwLnRzIiwgInNyYy91aS9zZXR0aW5ncy93aXphcmQvc3RlcERvbmUudHMiLCAic3JjL3VpL3NldHRpbmdzL3dpemFyZC93aXphcmRSZW5kZXJlci50cyIsICJzcmMvdWkvc2V0dGluZ3MvbWFuYWdlL2Nvbm5lY3Rpb25zU2VjdGlvbi50cyIsICJzcmMvdWkvc2V0dGluZ3MvbWFuYWdlL3Jlc3RvcmVTZWN0aW9uLnRzIiwgInNyYy9jb3JlL3ZhdWx0UmVnaXN0cnkudHMiLCAic3JjL3VpL3NldHRpbmdzL21hbmFnZS9iYWNrdXBTZWN0aW9uLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tYW5hZ2Uvc2l0ZXNTZWN0aW9uLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tb2RhbHMvYWRkU2l0ZU1vZGFsLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tb2RhbHMvcmVtb3ZlU2l0ZU1vZGFsLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tb2RhbHMvdW5wdWJsaXNoTW9kYWxzLnRzIiwgInNyYy91aS9zZXR0aW5ncy9tb2RhbHMvcmVzZXRNb2RhbC50cyIsICJzcmMvdWkvc2V0dGluZ3MvbW9kYWxzL2VkaXRTaXRlTW9kYWwudHMiLCAic3JjL3VpL3NldHRpbmdzL21vZGFscy9jaGFuZ2VSZXBvTW9kYWwudHMiLCAic3JjL3VpL3N0YXR1c0Jhci50cyIsICJzcmMvdWkvbm90ZWZsYXJlVmlldy50cyIsICJzcmMvY29yZS9zZWN1cmVTdG9yZS50cyIsICJzcmMvYmFja3VwL2JhY2t1cEVuZ2luZS50cyIsICJzcmMvYmFja3VwL2JhY2t1cFNjaGVkdWxlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmlzSW50ZWdlciA9IG51bSA9PiB7XG4gIGlmICh0eXBlb2YgbnVtID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKG51bSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBudW0gPT09ICdzdHJpbmcnICYmIG51bS50cmltKCkgIT09ICcnKSB7XG4gICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIoTnVtYmVyKG51bSkpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogRmluZCBhIG5vZGUgb2YgdGhlIGdpdmVuIHR5cGVcbiAqL1xuXG5leHBvcnRzLmZpbmQgPSAobm9kZSwgdHlwZSkgPT4gbm9kZS5ub2Rlcy5maW5kKG5vZGUgPT4gbm9kZS50eXBlID09PSB0eXBlKTtcblxuLyoqXG4gKiBGaW5kIGEgbm9kZSBvZiB0aGUgZ2l2ZW4gdHlwZVxuICovXG5cbmV4cG9ydHMuZXhjZWVkc0xpbWl0ID0gKG1pbiwgbWF4LCBzdGVwID0gMSwgbGltaXQpID0+IHtcbiAgaWYgKGxpbWl0ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIWV4cG9ydHMuaXNJbnRlZ2VyKG1pbikgfHwgIWV4cG9ydHMuaXNJbnRlZ2VyKG1heCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuICgoTnVtYmVyKG1heCkgLSBOdW1iZXIobWluKSkgLyBOdW1iZXIoc3RlcCkpID49IGxpbWl0O1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIG5vZGUgd2l0aCAnXFxcXCcgYmVmb3JlIG5vZGUudmFsdWVcbiAqL1xuXG5leHBvcnRzLmVzY2FwZU5vZGUgPSAoYmxvY2ssIG4gPSAwLCB0eXBlKSA9PiB7XG4gIGNvbnN0IG5vZGUgPSBibG9jay5ub2Rlc1tuXTtcbiAgaWYgKCFub2RlKSByZXR1cm47XG5cbiAgaWYgKCh0eXBlICYmIG5vZGUudHlwZSA9PT0gdHlwZSkgfHwgbm9kZS50eXBlID09PSAnb3BlbicgfHwgbm9kZS50eXBlID09PSAnY2xvc2UnKSB7XG4gICAgaWYgKG5vZGUuZXNjYXBlZCAhPT0gdHJ1ZSkge1xuICAgICAgbm9kZS52YWx1ZSA9ICdcXFxcJyArIG5vZGUudmFsdWU7XG4gICAgICBub2RlLmVzY2FwZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGJyYWNlIG5vZGUgc2hvdWxkIGJlIGVuY2xvc2VkIGluIGxpdGVyYWwgYnJhY2VzXG4gKi9cblxuZXhwb3J0cy5lbmNsb3NlQnJhY2UgPSBub2RlID0+IHtcbiAgaWYgKG5vZGUudHlwZSAhPT0gJ2JyYWNlJykgcmV0dXJuIGZhbHNlO1xuICBpZiAoKG5vZGUuY29tbWFzID4+IDAgKyBub2RlLnJhbmdlcyA+PiAwKSA9PT0gMCkge1xuICAgIG5vZGUuaW52YWxpZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBicmFjZSBub2RlIGlzIGludmFsaWQuXG4gKi9cblxuZXhwb3J0cy5pc0ludmFsaWRCcmFjZSA9IGJsb2NrID0+IHtcbiAgaWYgKGJsb2NrLnR5cGUgIT09ICdicmFjZScpIHJldHVybiBmYWxzZTtcbiAgaWYgKGJsb2NrLmludmFsaWQgPT09IHRydWUgfHwgYmxvY2suZG9sbGFyKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKChibG9jay5jb21tYXMgPj4gMCArIGJsb2NrLnJhbmdlcyA+PiAwKSA9PT0gMCkge1xuICAgIGJsb2NrLmludmFsaWQgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChibG9jay5vcGVuICE9PSB0cnVlIHx8IGJsb2NrLmNsb3NlICE9PSB0cnVlKSB7XG4gICAgYmxvY2suaW52YWxpZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBub2RlIGlzIGFuIG9wZW4gb3IgY2xvc2Ugbm9kZVxuICovXG5cbmV4cG9ydHMuaXNPcGVuT3JDbG9zZSA9IG5vZGUgPT4ge1xuICBpZiAobm9kZS50eXBlID09PSAnb3BlbicgfHwgbm9kZS50eXBlID09PSAnY2xvc2UnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIG5vZGUub3BlbiA9PT0gdHJ1ZSB8fCBub2RlLmNsb3NlID09PSB0cnVlO1xufTtcblxuLyoqXG4gKiBSZWR1Y2UgYW4gYXJyYXkgb2YgdGV4dCBub2Rlcy5cbiAqL1xuXG5leHBvcnRzLnJlZHVjZSA9IG5vZGVzID0+IG5vZGVzLnJlZHVjZSgoYWNjLCBub2RlKSA9PiB7XG4gIGlmIChub2RlLnR5cGUgPT09ICd0ZXh0JykgYWNjLnB1c2gobm9kZS52YWx1ZSk7XG4gIGlmIChub2RlLnR5cGUgPT09ICdyYW5nZScpIG5vZGUudHlwZSA9ICd0ZXh0JztcbiAgcmV0dXJuIGFjYztcbn0sIFtdKTtcblxuLyoqXG4gKiBGbGF0dGVuIGFuIGFycmF5XG4gKi9cblxuZXhwb3J0cy5mbGF0dGVuID0gKC4uLmFyZ3MpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgY29uc3QgZmxhdCA9IGFyciA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZSA9IGFycltpXTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlKSkge1xuICAgICAgICBmbGF0KGVsZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZWxlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBmbGF0KGFyZ3MpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChhc3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCBzdHJpbmdpZnkgPSAobm9kZSwgcGFyZW50ID0ge30pID0+IHtcbiAgICBjb25zdCBpbnZhbGlkQmxvY2sgPSBvcHRpb25zLmVzY2FwZUludmFsaWQgJiYgdXRpbHMuaXNJbnZhbGlkQnJhY2UocGFyZW50KTtcbiAgICBjb25zdCBpbnZhbGlkTm9kZSA9IG5vZGUuaW52YWxpZCA9PT0gdHJ1ZSAmJiBvcHRpb25zLmVzY2FwZUludmFsaWQgPT09IHRydWU7XG4gICAgbGV0IG91dHB1dCA9ICcnO1xuXG4gICAgaWYgKG5vZGUudmFsdWUpIHtcbiAgICAgIGlmICgoaW52YWxpZEJsb2NrIHx8IGludmFsaWROb2RlKSAmJiB1dGlscy5pc09wZW5PckNsb3NlKG5vZGUpKSB7XG4gICAgICAgIHJldHVybiAnXFxcXCcgKyBub2RlLnZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGUudmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUudmFsdWUpIHtcbiAgICAgIHJldHVybiBub2RlLnZhbHVlO1xuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUubm9kZXMpIHtcbiAgICAgICAgb3V0cHV0ICs9IHN0cmluZ2lmeShjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShhc3QpO1xufTtcblxuIiwgIi8qIVxuICogaXMtbnVtYmVyIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1udW1iZXI+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEpvbiBTY2hsaW5rZXJ0LlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihudW0pIHtcbiAgaWYgKHR5cGVvZiBudW0gPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIG51bSAtIG51bSA9PT0gMDtcbiAgfVxuICBpZiAodHlwZW9mIG51bSA9PT0gJ3N0cmluZycgJiYgbnVtLnRyaW0oKSAhPT0gJycpIHtcbiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlID8gTnVtYmVyLmlzRmluaXRlKCtudW0pIDogaXNGaW5pdGUoK251bSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcbiIsICIvKiFcbiAqIHRvLXJlZ2V4LXJhbmdlIDxodHRwczovL2dpdGh1Yi5jb20vbWljcm9tYXRjaC90by1yZWdleC1yYW5nZT5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgSm9uIFNjaGxpbmtlcnQuXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBpc051bWJlciA9IHJlcXVpcmUoJ2lzLW51bWJlcicpO1xuXG5jb25zdCB0b1JlZ2V4UmFuZ2UgPSAobWluLCBtYXgsIG9wdGlvbnMpID0+IHtcbiAgaWYgKGlzTnVtYmVyKG1pbikgPT09IGZhbHNlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndG9SZWdleFJhbmdlOiBleHBlY3RlZCB0aGUgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBudW1iZXInKTtcbiAgfVxuXG4gIGlmIChtYXggPT09IHZvaWQgMCB8fCBtaW4gPT09IG1heCkge1xuICAgIHJldHVybiBTdHJpbmcobWluKTtcbiAgfVxuXG4gIGlmIChpc051bWJlcihtYXgpID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RvUmVnZXhSYW5nZTogZXhwZWN0ZWQgdGhlIHNlY29uZCBhcmd1bWVudCB0byBiZSBhIG51bWJlci4nKTtcbiAgfVxuXG4gIGxldCBvcHRzID0geyByZWxheFplcm9zOiB0cnVlLCAuLi5vcHRpb25zIH07XG4gIGlmICh0eXBlb2Ygb3B0cy5zdHJpY3RaZXJvcyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgb3B0cy5yZWxheFplcm9zID0gb3B0cy5zdHJpY3RaZXJvcyA9PT0gZmFsc2U7XG4gIH1cblxuICBsZXQgcmVsYXggPSBTdHJpbmcob3B0cy5yZWxheFplcm9zKTtcbiAgbGV0IHNob3J0aGFuZCA9IFN0cmluZyhvcHRzLnNob3J0aGFuZCk7XG4gIGxldCBjYXB0dXJlID0gU3RyaW5nKG9wdHMuY2FwdHVyZSk7XG4gIGxldCB3cmFwID0gU3RyaW5nKG9wdHMud3JhcCk7XG4gIGxldCBjYWNoZUtleSA9IG1pbiArICc6JyArIG1heCArICc9JyArIHJlbGF4ICsgc2hvcnRoYW5kICsgY2FwdHVyZSArIHdyYXA7XG5cbiAgaWYgKHRvUmVnZXhSYW5nZS5jYWNoZS5oYXNPd25Qcm9wZXJ0eShjYWNoZUtleSkpIHtcbiAgICByZXR1cm4gdG9SZWdleFJhbmdlLmNhY2hlW2NhY2hlS2V5XS5yZXN1bHQ7XG4gIH1cblxuICBsZXQgYSA9IE1hdGgubWluKG1pbiwgbWF4KTtcbiAgbGV0IGIgPSBNYXRoLm1heChtaW4sIG1heCk7XG5cbiAgaWYgKE1hdGguYWJzKGEgLSBiKSA9PT0gMSkge1xuICAgIGxldCByZXN1bHQgPSBtaW4gKyAnfCcgKyBtYXg7XG4gICAgaWYgKG9wdHMuY2FwdHVyZSkge1xuICAgICAgcmV0dXJuIGAoJHtyZXN1bHR9KWA7XG4gICAgfVxuICAgIGlmIChvcHRzLndyYXAgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gYCg/OiR7cmVzdWx0fSlgO1xuICB9XG5cbiAgbGV0IGlzUGFkZGVkID0gaGFzUGFkZGluZyhtaW4pIHx8IGhhc1BhZGRpbmcobWF4KTtcbiAgbGV0IHN0YXRlID0geyBtaW4sIG1heCwgYSwgYiB9O1xuICBsZXQgcG9zaXRpdmVzID0gW107XG4gIGxldCBuZWdhdGl2ZXMgPSBbXTtcblxuICBpZiAoaXNQYWRkZWQpIHtcbiAgICBzdGF0ZS5pc1BhZGRlZCA9IGlzUGFkZGVkO1xuICAgIHN0YXRlLm1heExlbiA9IFN0cmluZyhzdGF0ZS5tYXgpLmxlbmd0aDtcbiAgfVxuXG4gIGlmIChhIDwgMCkge1xuICAgIGxldCBuZXdNaW4gPSBiIDwgMCA/IE1hdGguYWJzKGIpIDogMTtcbiAgICBuZWdhdGl2ZXMgPSBzcGxpdFRvUGF0dGVybnMobmV3TWluLCBNYXRoLmFicyhhKSwgc3RhdGUsIG9wdHMpO1xuICAgIGEgPSBzdGF0ZS5hID0gMDtcbiAgfVxuXG4gIGlmIChiID49IDApIHtcbiAgICBwb3NpdGl2ZXMgPSBzcGxpdFRvUGF0dGVybnMoYSwgYiwgc3RhdGUsIG9wdHMpO1xuICB9XG5cbiAgc3RhdGUubmVnYXRpdmVzID0gbmVnYXRpdmVzO1xuICBzdGF0ZS5wb3NpdGl2ZXMgPSBwb3NpdGl2ZXM7XG4gIHN0YXRlLnJlc3VsdCA9IGNvbGxhdGVQYXR0ZXJucyhuZWdhdGl2ZXMsIHBvc2l0aXZlcywgb3B0cyk7XG5cbiAgaWYgKG9wdHMuY2FwdHVyZSA9PT0gdHJ1ZSkge1xuICAgIHN0YXRlLnJlc3VsdCA9IGAoJHtzdGF0ZS5yZXN1bHR9KWA7XG4gIH0gZWxzZSBpZiAob3B0cy53cmFwICE9PSBmYWxzZSAmJiAocG9zaXRpdmVzLmxlbmd0aCArIG5lZ2F0aXZlcy5sZW5ndGgpID4gMSkge1xuICAgIHN0YXRlLnJlc3VsdCA9IGAoPzoke3N0YXRlLnJlc3VsdH0pYDtcbiAgfVxuXG4gIHRvUmVnZXhSYW5nZS5jYWNoZVtjYWNoZUtleV0gPSBzdGF0ZTtcbiAgcmV0dXJuIHN0YXRlLnJlc3VsdDtcbn07XG5cbmZ1bmN0aW9uIGNvbGxhdGVQYXR0ZXJucyhuZWcsIHBvcywgb3B0aW9ucykge1xuICBsZXQgb25seU5lZ2F0aXZlID0gZmlsdGVyUGF0dGVybnMobmVnLCBwb3MsICctJywgZmFsc2UsIG9wdGlvbnMpIHx8IFtdO1xuICBsZXQgb25seVBvc2l0aXZlID0gZmlsdGVyUGF0dGVybnMocG9zLCBuZWcsICcnLCBmYWxzZSwgb3B0aW9ucykgfHwgW107XG4gIGxldCBpbnRlcnNlY3RlZCA9IGZpbHRlclBhdHRlcm5zKG5lZywgcG9zLCAnLT8nLCB0cnVlLCBvcHRpb25zKSB8fCBbXTtcbiAgbGV0IHN1YnBhdHRlcm5zID0gb25seU5lZ2F0aXZlLmNvbmNhdChpbnRlcnNlY3RlZCkuY29uY2F0KG9ubHlQb3NpdGl2ZSk7XG4gIHJldHVybiBzdWJwYXR0ZXJucy5qb2luKCd8Jyk7XG59XG5cbmZ1bmN0aW9uIHNwbGl0VG9SYW5nZXMobWluLCBtYXgpIHtcbiAgbGV0IG5pbmVzID0gMTtcbiAgbGV0IHplcm9zID0gMTtcblxuICBsZXQgc3RvcCA9IGNvdW50TmluZXMobWluLCBuaW5lcyk7XG4gIGxldCBzdG9wcyA9IG5ldyBTZXQoW21heF0pO1xuXG4gIHdoaWxlIChtaW4gPD0gc3RvcCAmJiBzdG9wIDw9IG1heCkge1xuICAgIHN0b3BzLmFkZChzdG9wKTtcbiAgICBuaW5lcyArPSAxO1xuICAgIHN0b3AgPSBjb3VudE5pbmVzKG1pbiwgbmluZXMpO1xuICB9XG5cbiAgc3RvcCA9IGNvdW50WmVyb3MobWF4ICsgMSwgemVyb3MpIC0gMTtcblxuICB3aGlsZSAobWluIDwgc3RvcCAmJiBzdG9wIDw9IG1heCkge1xuICAgIHN0b3BzLmFkZChzdG9wKTtcbiAgICB6ZXJvcyArPSAxO1xuICAgIHN0b3AgPSBjb3VudFplcm9zKG1heCArIDEsIHplcm9zKSAtIDE7XG4gIH1cblxuICBzdG9wcyA9IFsuLi5zdG9wc107XG4gIHN0b3BzLnNvcnQoY29tcGFyZSk7XG4gIHJldHVybiBzdG9wcztcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgcmFuZ2UgdG8gYSByZWdleCBwYXR0ZXJuXG4gKiBAcGFyYW0ge051bWJlcn0gYHN0YXJ0YFxuICogQHBhcmFtIHtOdW1iZXJ9IGBzdG9wYFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHJhbmdlVG9QYXR0ZXJuKHN0YXJ0LCBzdG9wLCBvcHRpb25zKSB7XG4gIGlmIChzdGFydCA9PT0gc3RvcCkge1xuICAgIHJldHVybiB7IHBhdHRlcm46IHN0YXJ0LCBjb3VudDogW10sIGRpZ2l0czogMCB9O1xuICB9XG5cbiAgbGV0IHppcHBlZCA9IHppcChzdGFydCwgc3RvcCk7XG4gIGxldCBkaWdpdHMgPSB6aXBwZWQubGVuZ3RoO1xuICBsZXQgcGF0dGVybiA9ICcnO1xuICBsZXQgY291bnQgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlnaXRzOyBpKyspIHtcbiAgICBsZXQgW3N0YXJ0RGlnaXQsIHN0b3BEaWdpdF0gPSB6aXBwZWRbaV07XG5cbiAgICBpZiAoc3RhcnREaWdpdCA9PT0gc3RvcERpZ2l0KSB7XG4gICAgICBwYXR0ZXJuICs9IHN0YXJ0RGlnaXQ7XG5cbiAgICB9IGVsc2UgaWYgKHN0YXJ0RGlnaXQgIT09ICcwJyB8fCBzdG9wRGlnaXQgIT09ICc5Jykge1xuICAgICAgcGF0dGVybiArPSB0b0NoYXJhY3RlckNsYXNzKHN0YXJ0RGlnaXQsIHN0b3BEaWdpdCwgb3B0aW9ucyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgY291bnQrKztcbiAgICB9XG4gIH1cblxuICBpZiAoY291bnQpIHtcbiAgICBwYXR0ZXJuICs9IG9wdGlvbnMuc2hvcnRoYW5kID09PSB0cnVlID8gJ1xcXFxkJyA6ICdbMC05XSc7XG4gIH1cblxuICByZXR1cm4geyBwYXR0ZXJuLCBjb3VudDogW2NvdW50XSwgZGlnaXRzIH07XG59XG5cbmZ1bmN0aW9uIHNwbGl0VG9QYXR0ZXJucyhtaW4sIG1heCwgdG9rLCBvcHRpb25zKSB7XG4gIGxldCByYW5nZXMgPSBzcGxpdFRvUmFuZ2VzKG1pbiwgbWF4KTtcbiAgbGV0IHRva2VucyA9IFtdO1xuICBsZXQgc3RhcnQgPSBtaW47XG4gIGxldCBwcmV2O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IG1heCA9IHJhbmdlc1tpXTtcbiAgICBsZXQgb2JqID0gcmFuZ2VUb1BhdHRlcm4oU3RyaW5nKHN0YXJ0KSwgU3RyaW5nKG1heCksIG9wdGlvbnMpO1xuICAgIGxldCB6ZXJvcyA9ICcnO1xuXG4gICAgaWYgKCF0b2suaXNQYWRkZWQgJiYgcHJldiAmJiBwcmV2LnBhdHRlcm4gPT09IG9iai5wYXR0ZXJuKSB7XG4gICAgICBpZiAocHJldi5jb3VudC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHByZXYuY291bnQucG9wKCk7XG4gICAgICB9XG5cbiAgICAgIHByZXYuY291bnQucHVzaChvYmouY291bnRbMF0pO1xuICAgICAgcHJldi5zdHJpbmcgPSBwcmV2LnBhdHRlcm4gKyB0b1F1YW50aWZpZXIocHJldi5jb3VudCk7XG4gICAgICBzdGFydCA9IG1heCArIDE7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodG9rLmlzUGFkZGVkKSB7XG4gICAgICB6ZXJvcyA9IHBhZFplcm9zKG1heCwgdG9rLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBvYmouc3RyaW5nID0gemVyb3MgKyBvYmoucGF0dGVybiArIHRvUXVhbnRpZmllcihvYmouY291bnQpO1xuICAgIHRva2Vucy5wdXNoKG9iaik7XG4gICAgc3RhcnQgPSBtYXggKyAxO1xuICAgIHByZXYgPSBvYmo7XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJQYXR0ZXJucyhhcnIsIGNvbXBhcmlzb24sIHByZWZpeCwgaW50ZXJzZWN0aW9uLCBvcHRpb25zKSB7XG4gIGxldCByZXN1bHQgPSBbXTtcblxuICBmb3IgKGxldCBlbGUgb2YgYXJyKSB7XG4gICAgbGV0IHsgc3RyaW5nIH0gPSBlbGU7XG5cbiAgICAvLyBvbmx5IHB1c2ggaWYgX2JvdGhfIGFyZSBuZWdhdGl2ZS4uLlxuICAgIGlmICghaW50ZXJzZWN0aW9uICYmICFjb250YWlucyhjb21wYXJpc29uLCAnc3RyaW5nJywgc3RyaW5nKSkge1xuICAgICAgcmVzdWx0LnB1c2gocHJlZml4ICsgc3RyaW5nKTtcbiAgICB9XG5cbiAgICAvLyBvciBfYm90aF8gYXJlIHBvc2l0aXZlXG4gICAgaWYgKGludGVyc2VjdGlvbiAmJiBjb250YWlucyhjb21wYXJpc29uLCAnc3RyaW5nJywgc3RyaW5nKSkge1xuICAgICAgcmVzdWx0LnB1c2gocHJlZml4ICsgc3RyaW5nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBaaXAgc3RyaW5nc1xuICovXG5cbmZ1bmN0aW9uIHppcChhLCBiKSB7XG4gIGxldCBhcnIgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSBhcnIucHVzaChbYVtpXSwgYltpXV0pO1xuICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcbiAgcmV0dXJuIGEgPiBiID8gMSA6IGIgPiBhID8gLTEgOiAwO1xufVxuXG5mdW5jdGlvbiBjb250YWlucyhhcnIsIGtleSwgdmFsKSB7XG4gIHJldHVybiBhcnIuc29tZShlbGUgPT4gZWxlW2tleV0gPT09IHZhbCk7XG59XG5cbmZ1bmN0aW9uIGNvdW50TmluZXMobWluLCBsZW4pIHtcbiAgcmV0dXJuIE51bWJlcihTdHJpbmcobWluKS5zbGljZSgwLCAtbGVuKSArICc5Jy5yZXBlYXQobGVuKSk7XG59XG5cbmZ1bmN0aW9uIGNvdW50WmVyb3MoaW50ZWdlciwgemVyb3MpIHtcbiAgcmV0dXJuIGludGVnZXIgLSAoaW50ZWdlciAlIE1hdGgucG93KDEwLCB6ZXJvcykpO1xufVxuXG5mdW5jdGlvbiB0b1F1YW50aWZpZXIoZGlnaXRzKSB7XG4gIGxldCBbc3RhcnQgPSAwLCBzdG9wID0gJyddID0gZGlnaXRzO1xuICBpZiAoc3RvcCB8fCBzdGFydCA+IDEpIHtcbiAgICByZXR1cm4gYHske3N0YXJ0ICsgKHN0b3AgPyAnLCcgKyBzdG9wIDogJycpfX1gO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gdG9DaGFyYWN0ZXJDbGFzcyhhLCBiLCBvcHRpb25zKSB7XG4gIHJldHVybiBgWyR7YX0keyhiIC0gYSA9PT0gMSkgPyAnJyA6ICctJ30ke2J9XWA7XG59XG5cbmZ1bmN0aW9uIGhhc1BhZGRpbmcoc3RyKSB7XG4gIHJldHVybiAvXi0/KDArKVxcZC8udGVzdChzdHIpO1xufVxuXG5mdW5jdGlvbiBwYWRaZXJvcyh2YWx1ZSwgdG9rLCBvcHRpb25zKSB7XG4gIGlmICghdG9rLmlzUGFkZGVkKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgbGV0IGRpZmYgPSBNYXRoLmFicyh0b2subWF4TGVuIC0gU3RyaW5nKHZhbHVlKS5sZW5ndGgpO1xuICBsZXQgcmVsYXggPSBvcHRpb25zLnJlbGF4WmVyb3MgIT09IGZhbHNlO1xuXG4gIHN3aXRjaCAoZGlmZikge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiAnJztcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gcmVsYXggPyAnMD8nIDogJzAnO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiByZWxheCA/ICcwezAsMn0nIDogJzAwJztcbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gcmVsYXggPyBgMHswLCR7ZGlmZn19YCA6IGAweyR7ZGlmZn19YDtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDYWNoZVxuICovXG5cbnRvUmVnZXhSYW5nZS5jYWNoZSA9IHt9O1xudG9SZWdleFJhbmdlLmNsZWFyQ2FjaGUgPSAoKSA9PiAodG9SZWdleFJhbmdlLmNhY2hlID0ge30pO1xuXG4vKipcbiAqIEV4cG9zZSBgdG9SZWdleFJhbmdlYFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdG9SZWdleFJhbmdlO1xuIiwgIi8qIVxuICogZmlsbC1yYW5nZSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvZmlsbC1yYW5nZT5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgdG9SZWdleFJhbmdlID0gcmVxdWlyZSgndG8tcmVnZXgtcmFuZ2UnKTtcblxuY29uc3QgaXNPYmplY3QgPSB2YWwgPT4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbCk7XG5cbmNvbnN0IHRyYW5zZm9ybSA9IHRvTnVtYmVyID0+IHtcbiAgcmV0dXJuIHZhbHVlID0+IHRvTnVtYmVyID09PSB0cnVlID8gTnVtYmVyKHZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG59O1xuXG5jb25zdCBpc1ZhbGlkVmFsdWUgPSB2YWx1ZSA9PiB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8ICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlICE9PSAnJyk7XG59O1xuXG5jb25zdCBpc051bWJlciA9IG51bSA9PiBOdW1iZXIuaXNJbnRlZ2VyKCtudW0pO1xuXG5jb25zdCB6ZXJvcyA9IGlucHV0ID0+IHtcbiAgbGV0IHZhbHVlID0gYCR7aW5wdXR9YDtcbiAgbGV0IGluZGV4ID0gLTE7XG4gIGlmICh2YWx1ZVswXSA9PT0gJy0nKSB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xuICBpZiAodmFsdWUgPT09ICcwJykgcmV0dXJuIGZhbHNlO1xuICB3aGlsZSAodmFsdWVbKytpbmRleF0gPT09ICcwJyk7XG4gIHJldHVybiBpbmRleCA+IDA7XG59O1xuXG5jb25zdCBzdHJpbmdpZnkgPSAoc3RhcnQsIGVuZCwgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBvcHRpb25zLnN0cmluZ2lmeSA9PT0gdHJ1ZTtcbn07XG5cbmNvbnN0IHBhZCA9IChpbnB1dCwgbWF4TGVuZ3RoLCB0b051bWJlcikgPT4ge1xuICBpZiAobWF4TGVuZ3RoID4gMCkge1xuICAgIGxldCBkYXNoID0gaW5wdXRbMF0gPT09ICctJyA/ICctJyA6ICcnO1xuICAgIGlmIChkYXNoKSBpbnB1dCA9IGlucHV0LnNsaWNlKDEpO1xuICAgIGlucHV0ID0gKGRhc2ggKyBpbnB1dC5wYWRTdGFydChkYXNoID8gbWF4TGVuZ3RoIC0gMSA6IG1heExlbmd0aCwgJzAnKSk7XG4gIH1cbiAgaWYgKHRvTnVtYmVyID09PSBmYWxzZSkge1xuICAgIHJldHVybiBTdHJpbmcoaW5wdXQpO1xuICB9XG4gIHJldHVybiBpbnB1dDtcbn07XG5cbmNvbnN0IHRvTWF4TGVuID0gKGlucHV0LCBtYXhMZW5ndGgpID0+IHtcbiAgbGV0IG5lZ2F0aXZlID0gaW5wdXRbMF0gPT09ICctJyA/ICctJyA6ICcnO1xuICBpZiAobmVnYXRpdmUpIHtcbiAgICBpbnB1dCA9IGlucHV0LnNsaWNlKDEpO1xuICAgIG1heExlbmd0aC0tO1xuICB9XG4gIHdoaWxlIChpbnB1dC5sZW5ndGggPCBtYXhMZW5ndGgpIGlucHV0ID0gJzAnICsgaW5wdXQ7XG4gIHJldHVybiBuZWdhdGl2ZSA/ICgnLScgKyBpbnB1dCkgOiBpbnB1dDtcbn07XG5cbmNvbnN0IHRvU2VxdWVuY2UgPSAocGFydHMsIG9wdGlvbnMsIG1heExlbikgPT4ge1xuICBwYXJ0cy5uZWdhdGl2ZXMuc29ydCgoYSwgYikgPT4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDApO1xuICBwYXJ0cy5wb3NpdGl2ZXMuc29ydCgoYSwgYikgPT4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDApO1xuXG4gIGxldCBwcmVmaXggPSBvcHRpb25zLmNhcHR1cmUgPyAnJyA6ICc/Oic7XG4gIGxldCBwb3NpdGl2ZXMgPSAnJztcbiAgbGV0IG5lZ2F0aXZlcyA9ICcnO1xuICBsZXQgcmVzdWx0O1xuXG4gIGlmIChwYXJ0cy5wb3NpdGl2ZXMubGVuZ3RoKSB7XG4gICAgcG9zaXRpdmVzID0gcGFydHMucG9zaXRpdmVzLm1hcCh2ID0+IHRvTWF4TGVuKFN0cmluZyh2KSwgbWF4TGVuKSkuam9pbignfCcpO1xuICB9XG5cbiAgaWYgKHBhcnRzLm5lZ2F0aXZlcy5sZW5ndGgpIHtcbiAgICBuZWdhdGl2ZXMgPSBgLSgke3ByZWZpeH0ke3BhcnRzLm5lZ2F0aXZlcy5tYXAodiA9PiB0b01heExlbihTdHJpbmcodiksIG1heExlbikpLmpvaW4oJ3wnKX0pYDtcbiAgfVxuXG4gIGlmIChwb3NpdGl2ZXMgJiYgbmVnYXRpdmVzKSB7XG4gICAgcmVzdWx0ID0gYCR7cG9zaXRpdmVzfXwke25lZ2F0aXZlc31gO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHBvc2l0aXZlcyB8fCBuZWdhdGl2ZXM7XG4gIH1cblxuICBpZiAob3B0aW9ucy53cmFwKSB7XG4gICAgcmV0dXJuIGAoJHtwcmVmaXh9JHtyZXN1bHR9KWA7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgdG9SYW5nZSA9IChhLCBiLCBpc051bWJlcnMsIG9wdGlvbnMpID0+IHtcbiAgaWYgKGlzTnVtYmVycykge1xuICAgIHJldHVybiB0b1JlZ2V4UmFuZ2UoYSwgYiwgeyB3cmFwOiBmYWxzZSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIGxldCBzdGFydCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoYSk7XG4gIGlmIChhID09PSBiKSByZXR1cm4gc3RhcnQ7XG5cbiAgbGV0IHN0b3AgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGIpO1xuICByZXR1cm4gYFske3N0YXJ0fS0ke3N0b3B9XWA7XG59O1xuXG5jb25zdCB0b1JlZ2V4ID0gKHN0YXJ0LCBlbmQsIG9wdGlvbnMpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3RhcnQpKSB7XG4gICAgbGV0IHdyYXAgPSBvcHRpb25zLndyYXAgPT09IHRydWU7XG4gICAgbGV0IHByZWZpeCA9IG9wdGlvbnMuY2FwdHVyZSA/ICcnIDogJz86JztcbiAgICByZXR1cm4gd3JhcCA/IGAoJHtwcmVmaXh9JHtzdGFydC5qb2luKCd8Jyl9KWAgOiBzdGFydC5qb2luKCd8Jyk7XG4gIH1cbiAgcmV0dXJuIHRvUmVnZXhSYW5nZShzdGFydCwgZW5kLCBvcHRpb25zKTtcbn07XG5cbmNvbnN0IHJhbmdlRXJyb3IgPSAoLi4uYXJncykgPT4ge1xuICByZXR1cm4gbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgcmFuZ2UgYXJndW1lbnRzOiAnICsgdXRpbC5pbnNwZWN0KC4uLmFyZ3MpKTtcbn07XG5cbmNvbnN0IGludmFsaWRSYW5nZSA9IChzdGFydCwgZW5kLCBvcHRpb25zKSA9PiB7XG4gIGlmIChvcHRpb25zLnN0cmljdFJhbmdlcyA9PT0gdHJ1ZSkgdGhyb3cgcmFuZ2VFcnJvcihbc3RhcnQsIGVuZF0pO1xuICByZXR1cm4gW107XG59O1xuXG5jb25zdCBpbnZhbGlkU3RlcCA9IChzdGVwLCBvcHRpb25zKSA9PiB7XG4gIGlmIChvcHRpb25zLnN0cmljdFJhbmdlcyA9PT0gdHJ1ZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIHN0ZXAgXCIke3N0ZXB9XCIgdG8gYmUgYSBudW1iZXJgKTtcbiAgfVxuICByZXR1cm4gW107XG59O1xuXG5jb25zdCBmaWxsTnVtYmVycyA9IChzdGFydCwgZW5kLCBzdGVwID0gMSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGxldCBhID0gTnVtYmVyKHN0YXJ0KTtcbiAgbGV0IGIgPSBOdW1iZXIoZW5kKTtcblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoYSkgfHwgIU51bWJlci5pc0ludGVnZXIoYikpIHtcbiAgICBpZiAob3B0aW9ucy5zdHJpY3RSYW5nZXMgPT09IHRydWUpIHRocm93IHJhbmdlRXJyb3IoW3N0YXJ0LCBlbmRdKTtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBmaXggbmVnYXRpdmUgemVyb1xuICBpZiAoYSA9PT0gMCkgYSA9IDA7XG4gIGlmIChiID09PSAwKSBiID0gMDtcblxuICBsZXQgZGVzY2VuZGluZyA9IGEgPiBiO1xuICBsZXQgc3RhcnRTdHJpbmcgPSBTdHJpbmcoc3RhcnQpO1xuICBsZXQgZW5kU3RyaW5nID0gU3RyaW5nKGVuZCk7XG4gIGxldCBzdGVwU3RyaW5nID0gU3RyaW5nKHN0ZXApO1xuICBzdGVwID0gTWF0aC5tYXgoTWF0aC5hYnMoc3RlcCksIDEpO1xuXG4gIGxldCBwYWRkZWQgPSB6ZXJvcyhzdGFydFN0cmluZykgfHwgemVyb3MoZW5kU3RyaW5nKSB8fCB6ZXJvcyhzdGVwU3RyaW5nKTtcbiAgbGV0IG1heExlbiA9IHBhZGRlZCA/IE1hdGgubWF4KHN0YXJ0U3RyaW5nLmxlbmd0aCwgZW5kU3RyaW5nLmxlbmd0aCwgc3RlcFN0cmluZy5sZW5ndGgpIDogMDtcbiAgbGV0IHRvTnVtYmVyID0gcGFkZGVkID09PSBmYWxzZSAmJiBzdHJpbmdpZnkoc3RhcnQsIGVuZCwgb3B0aW9ucykgPT09IGZhbHNlO1xuICBsZXQgZm9ybWF0ID0gb3B0aW9ucy50cmFuc2Zvcm0gfHwgdHJhbnNmb3JtKHRvTnVtYmVyKTtcblxuICBpZiAob3B0aW9ucy50b1JlZ2V4ICYmIHN0ZXAgPT09IDEpIHtcbiAgICByZXR1cm4gdG9SYW5nZSh0b01heExlbihzdGFydCwgbWF4TGVuKSwgdG9NYXhMZW4oZW5kLCBtYXhMZW4pLCB0cnVlLCBvcHRpb25zKTtcbiAgfVxuXG4gIGxldCBwYXJ0cyA9IHsgbmVnYXRpdmVzOiBbXSwgcG9zaXRpdmVzOiBbXSB9O1xuICBsZXQgcHVzaCA9IG51bSA9PiBwYXJ0c1tudW0gPCAwID8gJ25lZ2F0aXZlcycgOiAncG9zaXRpdmVzJ10ucHVzaChNYXRoLmFicyhudW0pKTtcbiAgbGV0IHJhbmdlID0gW107XG4gIGxldCBpbmRleCA9IDA7XG5cbiAgd2hpbGUgKGRlc2NlbmRpbmcgPyBhID49IGIgOiBhIDw9IGIpIHtcbiAgICBpZiAob3B0aW9ucy50b1JlZ2V4ID09PSB0cnVlICYmIHN0ZXAgPiAxKSB7XG4gICAgICBwdXNoKGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYW5nZS5wdXNoKHBhZChmb3JtYXQoYSwgaW5kZXgpLCBtYXhMZW4sIHRvTnVtYmVyKSk7XG4gICAgfVxuICAgIGEgPSBkZXNjZW5kaW5nID8gYSAtIHN0ZXAgOiBhICsgc3RlcDtcbiAgICBpbmRleCsrO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMudG9SZWdleCA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBzdGVwID4gMVxuICAgICAgPyB0b1NlcXVlbmNlKHBhcnRzLCBvcHRpb25zLCBtYXhMZW4pXG4gICAgICA6IHRvUmVnZXgocmFuZ2UsIG51bGwsIHsgd3JhcDogZmFsc2UsIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICByZXR1cm4gcmFuZ2U7XG59O1xuXG5jb25zdCBmaWxsTGV0dGVycyA9IChzdGFydCwgZW5kLCBzdGVwID0gMSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICgoIWlzTnVtYmVyKHN0YXJ0KSAmJiBzdGFydC5sZW5ndGggPiAxKSB8fCAoIWlzTnVtYmVyKGVuZCkgJiYgZW5kLmxlbmd0aCA+IDEpKSB7XG4gICAgcmV0dXJuIGludmFsaWRSYW5nZShzdGFydCwgZW5kLCBvcHRpb25zKTtcbiAgfVxuXG4gIGxldCBmb3JtYXQgPSBvcHRpb25zLnRyYW5zZm9ybSB8fCAodmFsID0+IFN0cmluZy5mcm9tQ2hhckNvZGUodmFsKSk7XG4gIGxldCBhID0gYCR7c3RhcnR9YC5jaGFyQ29kZUF0KDApO1xuICBsZXQgYiA9IGAke2VuZH1gLmNoYXJDb2RlQXQoMCk7XG5cbiAgbGV0IGRlc2NlbmRpbmcgPSBhID4gYjtcbiAgbGV0IG1pbiA9IE1hdGgubWluKGEsIGIpO1xuICBsZXQgbWF4ID0gTWF0aC5tYXgoYSwgYik7XG5cbiAgaWYgKG9wdGlvbnMudG9SZWdleCAmJiBzdGVwID09PSAxKSB7XG4gICAgcmV0dXJuIHRvUmFuZ2UobWluLCBtYXgsIGZhbHNlLCBvcHRpb25zKTtcbiAgfVxuXG4gIGxldCByYW5nZSA9IFtdO1xuICBsZXQgaW5kZXggPSAwO1xuXG4gIHdoaWxlIChkZXNjZW5kaW5nID8gYSA+PSBiIDogYSA8PSBiKSB7XG4gICAgcmFuZ2UucHVzaChmb3JtYXQoYSwgaW5kZXgpKTtcbiAgICBhID0gZGVzY2VuZGluZyA/IGEgLSBzdGVwIDogYSArIHN0ZXA7XG4gICAgaW5kZXgrKztcbiAgfVxuXG4gIGlmIChvcHRpb25zLnRvUmVnZXggPT09IHRydWUpIHtcbiAgICByZXR1cm4gdG9SZWdleChyYW5nZSwgbnVsbCwgeyB3cmFwOiBmYWxzZSwgb3B0aW9ucyB9KTtcbiAgfVxuXG4gIHJldHVybiByYW5nZTtcbn07XG5cbmNvbnN0IGZpbGwgPSAoc3RhcnQsIGVuZCwgc3RlcCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmIChlbmQgPT0gbnVsbCAmJiBpc1ZhbGlkVmFsdWUoc3RhcnQpKSB7XG4gICAgcmV0dXJuIFtzdGFydF07XG4gIH1cblxuICBpZiAoIWlzVmFsaWRWYWx1ZShzdGFydCkgfHwgIWlzVmFsaWRWYWx1ZShlbmQpKSB7XG4gICAgcmV0dXJuIGludmFsaWRSYW5nZShzdGFydCwgZW5kLCBvcHRpb25zKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3RlcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmaWxsKHN0YXJ0LCBlbmQsIDEsIHsgdHJhbnNmb3JtOiBzdGVwIH0pO1xuICB9XG5cbiAgaWYgKGlzT2JqZWN0KHN0ZXApKSB7XG4gICAgcmV0dXJuIGZpbGwoc3RhcnQsIGVuZCwgMCwgc3RlcCk7XG4gIH1cblxuICBsZXQgb3B0cyA9IHsgLi4ub3B0aW9ucyB9O1xuICBpZiAob3B0cy5jYXB0dXJlID09PSB0cnVlKSBvcHRzLndyYXAgPSB0cnVlO1xuICBzdGVwID0gc3RlcCB8fCBvcHRzLnN0ZXAgfHwgMTtcblxuICBpZiAoIWlzTnVtYmVyKHN0ZXApKSB7XG4gICAgaWYgKHN0ZXAgIT0gbnVsbCAmJiAhaXNPYmplY3Qoc3RlcCkpIHJldHVybiBpbnZhbGlkU3RlcChzdGVwLCBvcHRzKTtcbiAgICByZXR1cm4gZmlsbChzdGFydCwgZW5kLCAxLCBzdGVwKTtcbiAgfVxuXG4gIGlmIChpc051bWJlcihzdGFydCkgJiYgaXNOdW1iZXIoZW5kKSkge1xuICAgIHJldHVybiBmaWxsTnVtYmVycyhzdGFydCwgZW5kLCBzdGVwLCBvcHRzKTtcbiAgfVxuXG4gIHJldHVybiBmaWxsTGV0dGVycyhzdGFydCwgZW5kLCBNYXRoLm1heChNYXRoLmFicyhzdGVwKSwgMSksIG9wdHMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaWxsO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZmlsbCA9IHJlcXVpcmUoJ2ZpbGwtcmFuZ2UnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5jb25zdCBjb21waWxlID0gKGFzdCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IHdhbGsgPSAobm9kZSwgcGFyZW50ID0ge30pID0+IHtcbiAgICBjb25zdCBpbnZhbGlkQmxvY2sgPSB1dGlscy5pc0ludmFsaWRCcmFjZShwYXJlbnQpO1xuICAgIGNvbnN0IGludmFsaWROb2RlID0gbm9kZS5pbnZhbGlkID09PSB0cnVlICYmIG9wdGlvbnMuZXNjYXBlSW52YWxpZCA9PT0gdHJ1ZTtcbiAgICBjb25zdCBpbnZhbGlkID0gaW52YWxpZEJsb2NrID09PSB0cnVlIHx8IGludmFsaWROb2RlID09PSB0cnVlO1xuICAgIGNvbnN0IHByZWZpeCA9IG9wdGlvbnMuZXNjYXBlSW52YWxpZCA9PT0gdHJ1ZSA/ICdcXFxcJyA6ICcnO1xuICAgIGxldCBvdXRwdXQgPSAnJztcblxuICAgIGlmIChub2RlLmlzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHByZWZpeCArIG5vZGUudmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuaXNDbG9zZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc29sZS5sb2coJ25vZGUuaXNDbG9zZScsIHByZWZpeCwgbm9kZS52YWx1ZSk7XG4gICAgICByZXR1cm4gcHJlZml4ICsgbm9kZS52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS50eXBlID09PSAnb3BlbicpIHtcbiAgICAgIHJldHVybiBpbnZhbGlkID8gcHJlZml4ICsgbm9kZS52YWx1ZSA6ICcoJztcbiAgICB9XG5cbiAgICBpZiAobm9kZS50eXBlID09PSAnY2xvc2UnKSB7XG4gICAgICByZXR1cm4gaW52YWxpZCA/IHByZWZpeCArIG5vZGUudmFsdWUgOiAnKSc7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ2NvbW1hJykge1xuICAgICAgcmV0dXJuIG5vZGUucHJldi50eXBlID09PSAnY29tbWEnID8gJycgOiBpbnZhbGlkID8gbm9kZS52YWx1ZSA6ICd8JztcbiAgICB9XG5cbiAgICBpZiAobm9kZS52YWx1ZSkge1xuICAgICAgcmV0dXJuIG5vZGUudmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubm9kZXMgJiYgbm9kZS5yYW5nZXMgPiAwKSB7XG4gICAgICBjb25zdCBhcmdzID0gdXRpbHMucmVkdWNlKG5vZGUubm9kZXMpO1xuICAgICAgY29uc3QgcmFuZ2UgPSBmaWxsKC4uLmFyZ3MsIHsgLi4ub3B0aW9ucywgd3JhcDogZmFsc2UsIHRvUmVnZXg6IHRydWUsIHN0cmljdFplcm9zOiB0cnVlIH0pO1xuXG4gICAgICBpZiAocmFuZ2UubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBhcmdzLmxlbmd0aCA+IDEgJiYgcmFuZ2UubGVuZ3RoID4gMSA/IGAoJHtyYW5nZX0pYCA6IHJhbmdlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUubm9kZXMpIHtcbiAgICAgICAgb3V0cHV0ICs9IHdhbGsoY2hpbGQsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgcmV0dXJuIHdhbGsoYXN0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGZpbGwgPSByZXF1aXJlKCdmaWxsLXJhbmdlJyk7XG5jb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmNvbnN0IGFwcGVuZCA9IChxdWV1ZSA9ICcnLCBzdGFzaCA9ICcnLCBlbmNsb3NlID0gZmFsc2UpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgcXVldWUgPSBbXS5jb25jYXQocXVldWUpO1xuICBzdGFzaCA9IFtdLmNvbmNhdChzdGFzaCk7XG5cbiAgaWYgKCFzdGFzaC5sZW5ndGgpIHJldHVybiBxdWV1ZTtcbiAgaWYgKCFxdWV1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZW5jbG9zZSA/IHV0aWxzLmZsYXR0ZW4oc3Rhc2gpLm1hcChlbGUgPT4gYHske2VsZX19YCkgOiBzdGFzaDtcbiAgfVxuXG4gIGZvciAoY29uc3QgaXRlbSBvZiBxdWV1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZW0pIHtcbiAgICAgICAgcmVzdWx0LnB1c2goYXBwZW5kKHZhbHVlLCBzdGFzaCwgZW5jbG9zZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBlbGUgb2Ygc3Rhc2gpIHtcbiAgICAgICAgaWYgKGVuY2xvc2UgPT09IHRydWUgJiYgdHlwZW9mIGVsZSA9PT0gJ3N0cmluZycpIGVsZSA9IGB7JHtlbGV9fWA7XG4gICAgICAgIHJlc3VsdC5wdXNoKEFycmF5LmlzQXJyYXkoZWxlKSA/IGFwcGVuZChpdGVtLCBlbGUsIGVuY2xvc2UpIDogaXRlbSArIGVsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1dGlscy5mbGF0dGVuKHJlc3VsdCk7XG59O1xuXG5jb25zdCBleHBhbmQgPSAoYXN0LCBvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3QgcmFuZ2VMaW1pdCA9IG9wdGlvbnMucmFuZ2VMaW1pdCA9PT0gdW5kZWZpbmVkID8gMTAwMCA6IG9wdGlvbnMucmFuZ2VMaW1pdDtcblxuICBjb25zdCB3YWxrID0gKG5vZGUsIHBhcmVudCA9IHt9KSA9PiB7XG4gICAgbm9kZS5xdWV1ZSA9IFtdO1xuXG4gICAgbGV0IHAgPSBwYXJlbnQ7XG4gICAgbGV0IHEgPSBwYXJlbnQucXVldWU7XG5cbiAgICB3aGlsZSAocC50eXBlICE9PSAnYnJhY2UnICYmIHAudHlwZSAhPT0gJ3Jvb3QnICYmIHAucGFyZW50KSB7XG4gICAgICBwID0gcC5wYXJlbnQ7XG4gICAgICBxID0gcC5xdWV1ZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5pbnZhbGlkIHx8IG5vZGUuZG9sbGFyKSB7XG4gICAgICBxLnB1c2goYXBwZW5kKHEucG9wKCksIHN0cmluZ2lmeShub2RlLCBvcHRpb25zKSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChub2RlLnR5cGUgPT09ICdicmFjZScgJiYgbm9kZS5pbnZhbGlkICE9PSB0cnVlICYmIG5vZGUubm9kZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICBxLnB1c2goYXBwZW5kKHEucG9wKCksIFsne30nXSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVzICYmIG5vZGUucmFuZ2VzID4gMCkge1xuICAgICAgY29uc3QgYXJncyA9IHV0aWxzLnJlZHVjZShub2RlLm5vZGVzKTtcblxuICAgICAgaWYgKHV0aWxzLmV4Y2VlZHNMaW1pdCguLi5hcmdzLCBvcHRpb25zLnN0ZXAsIHJhbmdlTGltaXQpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdleHBhbmRlZCBhcnJheSBsZW5ndGggZXhjZWVkcyByYW5nZSBsaW1pdC4gVXNlIG9wdGlvbnMucmFuZ2VMaW1pdCB0byBpbmNyZWFzZSBvciBkaXNhYmxlIHRoZSBsaW1pdC4nKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHJhbmdlID0gZmlsbCguLi5hcmdzLCBvcHRpb25zKTtcbiAgICAgIGlmIChyYW5nZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmFuZ2UgPSBzdHJpbmdpZnkobm9kZSwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIHEucHVzaChhcHBlbmQocS5wb3AoKSwgcmFuZ2UpKTtcbiAgICAgIG5vZGUubm9kZXMgPSBbXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbmNsb3NlID0gdXRpbHMuZW5jbG9zZUJyYWNlKG5vZGUpO1xuICAgIGxldCBxdWV1ZSA9IG5vZGUucXVldWU7XG4gICAgbGV0IGJsb2NrID0gbm9kZTtcblxuICAgIHdoaWxlIChibG9jay50eXBlICE9PSAnYnJhY2UnICYmIGJsb2NrLnR5cGUgIT09ICdyb290JyAmJiBibG9jay5wYXJlbnQpIHtcbiAgICAgIGJsb2NrID0gYmxvY2sucGFyZW50O1xuICAgICAgcXVldWUgPSBibG9jay5xdWV1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoaWxkID0gbm9kZS5ub2Rlc1tpXTtcblxuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdjb21tYScgJiYgbm9kZS50eXBlID09PSAnYnJhY2UnKSB7XG4gICAgICAgIGlmIChpID09PSAxKSBxdWV1ZS5wdXNoKCcnKTtcbiAgICAgICAgcXVldWUucHVzaCgnJyk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2Nsb3NlJykge1xuICAgICAgICBxLnB1c2goYXBwZW5kKHEucG9wKCksIHF1ZXVlLCBlbmNsb3NlKSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQudmFsdWUgJiYgY2hpbGQudHlwZSAhPT0gJ29wZW4nKSB7XG4gICAgICAgIHF1ZXVlLnB1c2goYXBwZW5kKHF1ZXVlLnBvcCgpLCBjaGlsZC52YWx1ZSkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoaWxkLm5vZGVzKSB7XG4gICAgICAgIHdhbGsoY2hpbGQsIG5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBxdWV1ZTtcbiAgfTtcblxuICByZXR1cm4gdXRpbHMuZmxhdHRlbih3YWxrKGFzdCkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBhbmQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgTUFYX0xFTkdUSDogMTAwMDAsXG5cbiAgLy8gRGlnaXRzXG4gIENIQVJfMDogJzAnLCAvKiAwICovXG4gIENIQVJfOTogJzknLCAvKiA5ICovXG5cbiAgLy8gQWxwaGFiZXQgY2hhcnMuXG4gIENIQVJfVVBQRVJDQVNFX0E6ICdBJywgLyogQSAqL1xuICBDSEFSX0xPV0VSQ0FTRV9BOiAnYScsIC8qIGEgKi9cbiAgQ0hBUl9VUFBFUkNBU0VfWjogJ1onLCAvKiBaICovXG4gIENIQVJfTE9XRVJDQVNFX1o6ICd6JywgLyogeiAqL1xuXG4gIENIQVJfTEVGVF9QQVJFTlRIRVNFUzogJygnLCAvKiAoICovXG4gIENIQVJfUklHSFRfUEFSRU5USEVTRVM6ICcpJywgLyogKSAqL1xuXG4gIENIQVJfQVNURVJJU0s6ICcqJywgLyogKiAqL1xuXG4gIC8vIE5vbi1hbHBoYWJldGljIGNoYXJzLlxuICBDSEFSX0FNUEVSU0FORDogJyYnLCAvKiAmICovXG4gIENIQVJfQVQ6ICdAJywgLyogQCAqL1xuICBDSEFSX0JBQ0tTTEFTSDogJ1xcXFwnLCAvKiBcXCAqL1xuICBDSEFSX0JBQ0tUSUNLOiAnYCcsIC8qIGAgKi9cbiAgQ0hBUl9DQVJSSUFHRV9SRVRVUk46ICdcXHInLCAvKiBcXHIgKi9cbiAgQ0hBUl9DSVJDVU1GTEVYX0FDQ0VOVDogJ14nLCAvKiBeICovXG4gIENIQVJfQ09MT046ICc6JywgLyogOiAqL1xuICBDSEFSX0NPTU1BOiAnLCcsIC8qICwgKi9cbiAgQ0hBUl9ET0xMQVI6ICckJywgLyogLiAqL1xuICBDSEFSX0RPVDogJy4nLCAvKiAuICovXG4gIENIQVJfRE9VQkxFX1FVT1RFOiAnXCInLCAvKiBcIiAqL1xuICBDSEFSX0VRVUFMOiAnPScsIC8qID0gKi9cbiAgQ0hBUl9FWENMQU1BVElPTl9NQVJLOiAnIScsIC8qICEgKi9cbiAgQ0hBUl9GT1JNX0ZFRUQ6ICdcXGYnLCAvKiBcXGYgKi9cbiAgQ0hBUl9GT1JXQVJEX1NMQVNIOiAnLycsIC8qIC8gKi9cbiAgQ0hBUl9IQVNIOiAnIycsIC8qICMgKi9cbiAgQ0hBUl9IWVBIRU5fTUlOVVM6ICctJywgLyogLSAqL1xuICBDSEFSX0xFRlRfQU5HTEVfQlJBQ0tFVDogJzwnLCAvKiA8ICovXG4gIENIQVJfTEVGVF9DVVJMWV9CUkFDRTogJ3snLCAvKiB7ICovXG4gIENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVDogJ1snLCAvKiBbICovXG4gIENIQVJfTElORV9GRUVEOiAnXFxuJywgLyogXFxuICovXG4gIENIQVJfTk9fQlJFQUtfU1BBQ0U6ICdcXHUwMEEwJywgLyogXFx1MDBBMCAqL1xuICBDSEFSX1BFUkNFTlQ6ICclJywgLyogJSAqL1xuICBDSEFSX1BMVVM6ICcrJywgLyogKyAqL1xuICBDSEFSX1FVRVNUSU9OX01BUks6ICc/JywgLyogPyAqL1xuICBDSEFSX1JJR0hUX0FOR0xFX0JSQUNLRVQ6ICc+JywgLyogPiAqL1xuICBDSEFSX1JJR0hUX0NVUkxZX0JSQUNFOiAnfScsIC8qIH0gKi9cbiAgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVDogJ10nLCAvKiBdICovXG4gIENIQVJfU0VNSUNPTE9OOiAnOycsIC8qIDsgKi9cbiAgQ0hBUl9TSU5HTEVfUVVPVEU6ICdcXCcnLCAvKiAnICovXG4gIENIQVJfU1BBQ0U6ICcgJywgLyogICAqL1xuICBDSEFSX1RBQjogJ1xcdCcsIC8qIFxcdCAqL1xuICBDSEFSX1VOREVSU0NPUkU6ICdfJywgLyogXyAqL1xuICBDSEFSX1ZFUlRJQ0FMX0xJTkU6ICd8JywgLyogfCAqL1xuICBDSEFSX1pFUk9fV0lEVEhfTk9CUkVBS19TUEFDRTogJ1xcdUZFRkYnIC8qIFxcdUZFRkYgKi9cbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IHtcbiAgTUFYX0xFTkdUSCxcbiAgQ0hBUl9CQUNLU0xBU0gsIC8qIFxcICovXG4gIENIQVJfQkFDS1RJQ0ssIC8qIGAgKi9cbiAgQ0hBUl9DT01NQSwgLyogLCAqL1xuICBDSEFSX0RPVCwgLyogLiAqL1xuICBDSEFSX0xFRlRfUEFSRU5USEVTRVMsIC8qICggKi9cbiAgQ0hBUl9SSUdIVF9QQVJFTlRIRVNFUywgLyogKSAqL1xuICBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0UsIC8qIHsgKi9cbiAgQ0hBUl9SSUdIVF9DVVJMWV9CUkFDRSwgLyogfSAqL1xuICBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVQsIC8qIFsgKi9cbiAgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVCwgLyogXSAqL1xuICBDSEFSX0RPVUJMRV9RVU9URSwgLyogXCIgKi9cbiAgQ0hBUl9TSU5HTEVfUVVPVEUsIC8qICcgKi9cbiAgQ0hBUl9OT19CUkVBS19TUEFDRSxcbiAgQ0hBUl9aRVJPX1dJRFRIX05PQlJFQUtfU1BBQ0Vcbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG4vKipcbiAqIHBhcnNlXG4gKi9cblxuY29uc3QgcGFyc2UgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIH1cblxuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgbWF4ID0gdHlwZW9mIG9wdHMubWF4TGVuZ3RoID09PSAnbnVtYmVyJyA/IE1hdGgubWluKE1BWF9MRU5HVEgsIG9wdHMubWF4TGVuZ3RoKSA6IE1BWF9MRU5HVEg7XG4gIGlmIChpbnB1dC5sZW5ndGggPiBtYXgpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYElucHV0IGxlbmd0aCAoJHtpbnB1dC5sZW5ndGh9KSwgZXhjZWVkcyBtYXggY2hhcmFjdGVycyAoJHttYXh9KWApO1xuICB9XG5cbiAgY29uc3QgYXN0ID0geyB0eXBlOiAncm9vdCcsIGlucHV0LCBub2RlczogW10gfTtcbiAgY29uc3Qgc3RhY2sgPSBbYXN0XTtcbiAgbGV0IGJsb2NrID0gYXN0O1xuICBsZXQgcHJldiA9IGFzdDtcbiAgbGV0IGJyYWNrZXRzID0gMDtcbiAgY29uc3QgbGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgZGVwdGggPSAwO1xuICBsZXQgdmFsdWU7XG5cbiAgLyoqXG4gICAqIEhlbHBlcnNcbiAgICovXG5cbiAgY29uc3QgYWR2YW5jZSA9ICgpID0+IGlucHV0W2luZGV4KytdO1xuICBjb25zdCBwdXNoID0gbm9kZSA9PiB7XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ3RleHQnICYmIHByZXYudHlwZSA9PT0gJ2RvdCcpIHtcbiAgICAgIHByZXYudHlwZSA9ICd0ZXh0JztcbiAgICB9XG5cbiAgICBpZiAocHJldiAmJiBwcmV2LnR5cGUgPT09ICd0ZXh0JyAmJiBub2RlLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgcHJldi52YWx1ZSArPSBub2RlLnZhbHVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGJsb2NrLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgbm9kZS5wYXJlbnQgPSBibG9jaztcbiAgICBub2RlLnByZXYgPSBwcmV2O1xuICAgIHByZXYgPSBub2RlO1xuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIHB1c2goeyB0eXBlOiAnYm9zJyB9KTtcblxuICB3aGlsZSAoaW5kZXggPCBsZW5ndGgpIHtcbiAgICBibG9jayA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgIHZhbHVlID0gYWR2YW5jZSgpO1xuXG4gICAgLyoqXG4gICAgICogSW52YWxpZCBjaGFyc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX1pFUk9fV0lEVEhfTk9CUkVBS19TUEFDRSB8fCB2YWx1ZSA9PT0gQ0hBUl9OT19CUkVBS19TUEFDRSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXNjYXBlZCBjaGFyc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX0JBQ0tTTEFTSCkge1xuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWU6IChvcHRpb25zLmtlZXBFc2NhcGluZyA/IHZhbHVlIDogJycpICsgYWR2YW5jZSgpIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmlnaHQgc3F1YXJlIGJyYWNrZXQgKGxpdGVyYWwpOiAnXSdcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVCkge1xuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWU6ICdcXFxcJyArIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGVmdCBzcXVhcmUgYnJhY2tldDogJ1snXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCkge1xuICAgICAgYnJhY2tldHMrKztcblxuICAgICAgbGV0IG5leHQ7XG5cbiAgICAgIHdoaWxlIChpbmRleCA8IGxlbmd0aCAmJiAobmV4dCA9IGFkdmFuY2UoKSkpIHtcbiAgICAgICAgdmFsdWUgKz0gbmV4dDtcblxuICAgICAgICBpZiAobmV4dCA9PT0gQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICAgICAgYnJhY2tldHMrKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX0JBQ0tTTEFTSCkge1xuICAgICAgICAgIHZhbHVlICs9IGFkdmFuY2UoKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICAgICAgYnJhY2tldHMtLTtcblxuICAgICAgICAgIGlmIChicmFja2V0cyA9PT0gMCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyZW50aGVzZXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9MRUZUX1BBUkVOVEhFU0VTKSB7XG4gICAgICBibG9jayA9IHB1c2goeyB0eXBlOiAncGFyZW4nLCBub2RlczogW10gfSk7XG4gICAgICBzdGFjay5wdXNoKGJsb2NrKTtcbiAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTKSB7XG4gICAgICBpZiAoYmxvY2sudHlwZSAhPT0gJ3BhcmVuJykge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBibG9jayA9IHN0YWNrLnBvcCgpO1xuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICBibG9jayA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUXVvdGVzOiAnfFwifGBcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9ET1VCTEVfUVVPVEUgfHwgdmFsdWUgPT09IENIQVJfU0lOR0xFX1FVT1RFIHx8IHZhbHVlID09PSBDSEFSX0JBQ0tUSUNLKSB7XG4gICAgICBjb25zdCBvcGVuID0gdmFsdWU7XG4gICAgICBsZXQgbmV4dDtcblxuICAgICAgaWYgKG9wdGlvbnMua2VlcFF1b3RlcyAhPT0gdHJ1ZSkge1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoaW5kZXggPCBsZW5ndGggJiYgKG5leHQgPSBhZHZhbmNlKCkpKSB7XG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX0JBQ0tTTEFTSCkge1xuICAgICAgICAgIHZhbHVlICs9IG5leHQgKyBhZHZhbmNlKCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dCA9PT0gb3Blbikge1xuICAgICAgICAgIGlmIChvcHRpb25zLmtlZXBRdW90ZXMgPT09IHRydWUpIHZhbHVlICs9IG5leHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSArPSBuZXh0O1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExlZnQgY3VybHkgYnJhY2U6ICd7J1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0UpIHtcbiAgICAgIGRlcHRoKys7XG5cbiAgICAgIGNvbnN0IGRvbGxhciA9IHByZXYudmFsdWUgJiYgcHJldi52YWx1ZS5zbGljZSgtMSkgPT09ICckJyB8fCBibG9jay5kb2xsYXIgPT09IHRydWU7XG4gICAgICBjb25zdCBicmFjZSA9IHtcbiAgICAgICAgdHlwZTogJ2JyYWNlJyxcbiAgICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgICAgY2xvc2U6IGZhbHNlLFxuICAgICAgICBkb2xsYXIsXG4gICAgICAgIGRlcHRoLFxuICAgICAgICBjb21tYXM6IDAsXG4gICAgICAgIHJhbmdlczogMCxcbiAgICAgICAgbm9kZXM6IFtdXG4gICAgICB9O1xuXG4gICAgICBibG9jayA9IHB1c2goYnJhY2UpO1xuICAgICAgc3RhY2sucHVzaChibG9jayk7XG4gICAgICBwdXNoKHsgdHlwZTogJ29wZW4nLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJpZ2h0IGN1cmx5IGJyYWNlOiAnfSdcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gQ0hBUl9SSUdIVF9DVVJMWV9CUkFDRSkge1xuICAgICAgaWYgKGJsb2NrLnR5cGUgIT09ICdicmFjZScpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0eXBlID0gJ2Nsb3NlJztcbiAgICAgIGJsb2NrID0gc3RhY2sucG9wKCk7XG4gICAgICBibG9jay5jbG9zZSA9IHRydWU7XG5cbiAgICAgIHB1c2goeyB0eXBlLCB2YWx1ZSB9KTtcbiAgICAgIGRlcHRoLS07XG5cbiAgICAgIGJsb2NrID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21tYTogJywnXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfQ09NTUEgJiYgZGVwdGggPiAwKSB7XG4gICAgICBpZiAoYmxvY2sucmFuZ2VzID4gMCkge1xuICAgICAgICBibG9jay5yYW5nZXMgPSAwO1xuICAgICAgICBjb25zdCBvcGVuID0gYmxvY2subm9kZXMuc2hpZnQoKTtcbiAgICAgICAgYmxvY2subm9kZXMgPSBbb3BlbiwgeyB0eXBlOiAndGV4dCcsIHZhbHVlOiBzdHJpbmdpZnkoYmxvY2spIH1dO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ2NvbW1hJywgdmFsdWUgfSk7XG4gICAgICBibG9jay5jb21tYXMrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvdDogJy4nXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09IENIQVJfRE9UICYmIGRlcHRoID4gMCAmJiBibG9jay5jb21tYXMgPT09IDApIHtcbiAgICAgIGNvbnN0IHNpYmxpbmdzID0gYmxvY2subm9kZXM7XG5cbiAgICAgIGlmIChkZXB0aCA9PT0gMCB8fCBzaWJsaW5ncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldi50eXBlID09PSAnZG90Jykge1xuICAgICAgICBibG9jay5yYW5nZSA9IFtdO1xuICAgICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgICBwcmV2LnR5cGUgPSAncmFuZ2UnO1xuXG4gICAgICAgIGlmIChibG9jay5ub2Rlcy5sZW5ndGggIT09IDMgJiYgYmxvY2subm9kZXMubGVuZ3RoICE9PSA1KSB7XG4gICAgICAgICAgYmxvY2suaW52YWxpZCA9IHRydWU7XG4gICAgICAgICAgYmxvY2sucmFuZ2VzID0gMDtcbiAgICAgICAgICBwcmV2LnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBibG9jay5yYW5nZXMrKztcbiAgICAgICAgYmxvY2suYXJncyA9IFtdO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZXYudHlwZSA9PT0gJ3JhbmdlJykge1xuICAgICAgICBzaWJsaW5ncy5wb3AoKTtcblxuICAgICAgICBjb25zdCBiZWZvcmUgPSBzaWJsaW5nc1tzaWJsaW5ncy5sZW5ndGggLSAxXTtcbiAgICAgICAgYmVmb3JlLnZhbHVlICs9IHByZXYudmFsdWUgKyB2YWx1ZTtcbiAgICAgICAgcHJldiA9IGJlZm9yZTtcbiAgICAgICAgYmxvY2sucmFuZ2VzLS07XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ2RvdCcsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGV4dFxuICAgICAqL1xuXG4gICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gIH1cblxuICAvLyBNYXJrIGltYmFsYW5jZWQgYnJhY2VzIGFuZCBicmFja2V0cyBhcyBpbnZhbGlkXG4gIGRvIHtcbiAgICBibG9jayA9IHN0YWNrLnBvcCgpO1xuXG4gICAgaWYgKGJsb2NrLnR5cGUgIT09ICdyb290Jykge1xuICAgICAgYmxvY2subm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgaWYgKCFub2RlLm5vZGVzKSB7XG4gICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ29wZW4nKSBub2RlLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ2Nsb3NlJykgbm9kZS5pc0Nsb3NlID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoIW5vZGUubm9kZXMpIG5vZGUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICBub2RlLmludmFsaWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gZ2V0IHRoZSBsb2NhdGlvbiBvZiB0aGUgYmxvY2sgb24gcGFyZW50Lm5vZGVzIChibG9jaydzIHNpYmxpbmdzKVxuICAgICAgY29uc3QgcGFyZW50ID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICBjb25zdCBpbmRleCA9IHBhcmVudC5ub2Rlcy5pbmRleE9mKGJsb2NrKTtcbiAgICAgIC8vIHJlcGxhY2UgdGhlIChpbnZhbGlkKSBibG9jayB3aXRoIGl0J3Mgbm9kZXNcbiAgICAgIHBhcmVudC5ub2Rlcy5zcGxpY2UoaW5kZXgsIDEsIC4uLmJsb2NrLm5vZGVzKTtcbiAgICB9XG4gIH0gd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApO1xuXG4gIHB1c2goeyB0eXBlOiAnZW9zJyB9KTtcbiAgcmV0dXJuIGFzdDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2U7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL2xpYi9zdHJpbmdpZnknKTtcbmNvbnN0IGNvbXBpbGUgPSByZXF1aXJlKCcuL2xpYi9jb21waWxlJyk7XG5jb25zdCBleHBhbmQgPSByZXF1aXJlKCcuL2xpYi9leHBhbmQnKTtcbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9saWIvcGFyc2UnKTtcblxuLyoqXG4gKiBFeHBhbmQgdGhlIGdpdmVuIHBhdHRlcm4gb3IgY3JlYXRlIGEgcmVnZXgtY29tcGF0aWJsZSBzdHJpbmcuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IGJyYWNlcyA9IHJlcXVpcmUoJ2JyYWNlcycpO1xuICogY29uc29sZS5sb2coYnJhY2VzKCd7YSxiLGN9JywgeyBjb21waWxlOiB0cnVlIH0pKTsgLy89PiBbJyhhfGJ8YyknXVxuICogY29uc29sZS5sb2coYnJhY2VzKCd7YSxiLGN9JykpOyAvLz0+IFsnYScsICdiJywgJ2MnXVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHN0cmBcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuY29uc3QgYnJhY2VzID0gKGlucHV0LCBvcHRpb25zID0ge30pID0+IHtcbiAgbGV0IG91dHB1dCA9IFtdO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xuICAgIGZvciAoY29uc3QgcGF0dGVybiBvZiBpbnB1dCkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYnJhY2VzLmNyZWF0ZShwYXR0ZXJuLCBvcHRpb25zKTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAgICAgb3V0cHV0LnB1c2goLi4ucmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dC5wdXNoKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IFtdLmNvbmNhdChicmFjZXMuY3JlYXRlKGlucHV0LCBvcHRpb25zKSk7XG4gIH1cblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmV4cGFuZCA9PT0gdHJ1ZSAmJiBvcHRpb25zLm5vZHVwZXMgPT09IHRydWUpIHtcbiAgICBvdXRwdXQgPSBbLi4ubmV3IFNldChvdXRwdXQpXTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgd2l0aCB0aGUgZ2l2ZW4gYG9wdGlvbnNgLlxuICpcbiAqIGBgYGpzXG4gKiAvLyBicmFjZXMucGFyc2UocGF0dGVybiwgWywgb3B0aW9uc10pO1xuICogY29uc3QgYXN0ID0gYnJhY2VzLnBhcnNlKCdhL3tiLGN9L2QnKTtcbiAqIGNvbnNvbGUubG9nKGFzdCk7XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXR0ZXJuIEJyYWNlIHBhdHRlcm4gdG8gcGFyc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgYW4gQVNUXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmJyYWNlcy5wYXJzZSA9IChpbnB1dCwgb3B0aW9ucyA9IHt9KSA9PiBwYXJzZShpbnB1dCwgb3B0aW9ucyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJyYWNlcyBzdHJpbmcgZnJvbSBhbiBBU1QsIG9yIGFuIEFTVCBub2RlLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBicmFjZXMgPSByZXF1aXJlKCdicmFjZXMnKTtcbiAqIGxldCBhc3QgPSBicmFjZXMucGFyc2UoJ2Zvby97YSxifS9iYXInKTtcbiAqIGNvbnNvbGUubG9nKHN0cmluZ2lmeShhc3Qubm9kZXNbMl0pKTsgLy89PiAne2EsYn0nXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgaW5wdXRgIEJyYWNlIHBhdHRlcm4gb3IgQVNULlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgZXhwYW5kZWQgdmFsdWVzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5icmFjZXMuc3RyaW5naWZ5ID0gKGlucHV0LCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gc3RyaW5naWZ5KGJyYWNlcy5wYXJzZShpbnB1dCwgb3B0aW9ucyksIG9wdGlvbnMpO1xuICB9XG4gIHJldHVybiBzdHJpbmdpZnkoaW5wdXQsIG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBDb21waWxlcyBhIGJyYWNlIHBhdHRlcm4gaW50byBhIHJlZ2V4LWNvbXBhdGlibGUsIG9wdGltaXplZCBzdHJpbmcuXG4gKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIG1haW4gW2JyYWNlc10oI2JyYWNlcykgZnVuY3Rpb24gYnkgZGVmYXVsdC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgYnJhY2VzID0gcmVxdWlyZSgnYnJhY2VzJyk7XG4gKiBjb25zb2xlLmxvZyhicmFjZXMuY29tcGlsZSgnYS97YixjfS9kJykpO1xuICogLy89PiBbJ2EvKGJ8YykvZCddXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgaW5wdXRgIEJyYWNlIHBhdHRlcm4gb3IgQVNULlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgZXhwYW5kZWQgdmFsdWVzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5icmFjZXMuY29tcGlsZSA9IChpbnB1dCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgaW5wdXQgPSBicmFjZXMucGFyc2UoaW5wdXQsIG9wdGlvbnMpO1xuICB9XG4gIHJldHVybiBjb21waWxlKGlucHV0LCBvcHRpb25zKTtcbn07XG5cbi8qKlxuICogRXhwYW5kcyBhIGJyYWNlIHBhdHRlcm4gaW50byBhbiBhcnJheS4gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZVxuICogbWFpbiBbYnJhY2VzXSgjYnJhY2VzKSBmdW5jdGlvbiB3aGVuIGBvcHRpb25zLmV4cGFuZGAgaXMgdHJ1ZS4gQmVmb3JlXG4gKiB1c2luZyB0aGlzIG1ldGhvZCBpdCdzIHJlY29tbWVuZGVkIHRoYXQgeW91IHJlYWQgdGhlIFtwZXJmb3JtYW5jZSBub3Rlc10oI3BlcmZvcm1hbmNlKSlcbiAqIGFuZCBhZHZhbnRhZ2VzIG9mIHVzaW5nIFsuY29tcGlsZV0oI2NvbXBpbGUpIGluc3RlYWQuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IGJyYWNlcyA9IHJlcXVpcmUoJ2JyYWNlcycpO1xuICogY29uc29sZS5sb2coYnJhY2VzLmV4cGFuZCgnYS97YixjfS9kJykpO1xuICogLy89PiBbJ2EvYi9kJywgJ2EvYy9kJ107XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgcGF0dGVybmAgQnJhY2UgcGF0dGVyblxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2YgZXhwYW5kZWQgdmFsdWVzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5icmFjZXMuZXhwYW5kID0gKGlucHV0LCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICBpbnB1dCA9IGJyYWNlcy5wYXJzZShpbnB1dCwgb3B0aW9ucyk7XG4gIH1cblxuICBsZXQgcmVzdWx0ID0gZXhwYW5kKGlucHV0LCBvcHRpb25zKTtcblxuICAvLyBmaWx0ZXIgb3V0IGVtcHR5IHN0cmluZ3MgaWYgc3BlY2lmaWVkXG4gIGlmIChvcHRpb25zLm5vZW1wdHkgPT09IHRydWUpIHtcbiAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKEJvb2xlYW4pO1xuICB9XG5cbiAgLy8gZmlsdGVyIG91dCBkdXBsaWNhdGVzIGlmIHNwZWNpZmllZFxuICBpZiAob3B0aW9ucy5ub2R1cGVzID09PSB0cnVlKSB7XG4gICAgcmVzdWx0ID0gWy4uLm5ldyBTZXQocmVzdWx0KV07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBQcm9jZXNzZXMgYSBicmFjZSBwYXR0ZXJuIGFuZCByZXR1cm5zIGVpdGhlciBhbiBleHBhbmRlZCBhcnJheVxuICogKGlmIGBvcHRpb25zLmV4cGFuZGAgaXMgdHJ1ZSksIGEgaGlnaGx5IG9wdGltaXplZCByZWdleC1jb21wYXRpYmxlIHN0cmluZy5cbiAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGUgbWFpbiBbYnJhY2VzXSgjYnJhY2VzKSBmdW5jdGlvbi5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgYnJhY2VzID0gcmVxdWlyZSgnYnJhY2VzJyk7XG4gKiBjb25zb2xlLmxvZyhicmFjZXMuY3JlYXRlKCd1c2VyLXsyMDAuLjMwMH0vcHJvamVjdC17YSxiLGN9LXsxLi4xMH0nKSlcbiAqIC8vPT4gJ3VzZXItKDIwWzAtOV18MlsxLTldWzAtOV18MzAwKS9wcm9qZWN0LShhfGJ8YyktKFsxLTldfDEwKSdcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBwYXR0ZXJuYCBCcmFjZSBwYXR0ZXJuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBleHBhbmRlZCB2YWx1ZXMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmJyYWNlcy5jcmVhdGUgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAoaW5wdXQgPT09ICcnIHx8IGlucHV0Lmxlbmd0aCA8IDMpIHtcbiAgICByZXR1cm4gW2lucHV0XTtcbiAgfVxuXG4gIHJldHVybiBvcHRpb25zLmV4cGFuZCAhPT0gdHJ1ZVxuICAgID8gYnJhY2VzLmNvbXBpbGUoaW5wdXQsIG9wdGlvbnMpXG4gICAgOiBicmFjZXMuZXhwYW5kKGlucHV0LCBvcHRpb25zKTtcbn07XG5cbi8qKlxuICogRXhwb3NlIFwiYnJhY2VzXCJcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJyYWNlcztcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBXSU5fU0xBU0ggPSAnXFxcXFxcXFwvJztcbmNvbnN0IFdJTl9OT19TTEFTSCA9IGBbXiR7V0lOX1NMQVNIfV1gO1xuXG5jb25zdCBERUZBVUxUX01BWF9FWFRHTE9CX1JFQ1VSU0lPTiA9IDA7XG5cbi8qKlxuICogUG9zaXggZ2xvYiByZWdleFxuICovXG5cbmNvbnN0IERPVF9MSVRFUkFMID0gJ1xcXFwuJztcbmNvbnN0IFBMVVNfTElURVJBTCA9ICdcXFxcKyc7XG5jb25zdCBRTUFSS19MSVRFUkFMID0gJ1xcXFw/JztcbmNvbnN0IFNMQVNIX0xJVEVSQUwgPSAnXFxcXC8nO1xuY29uc3QgT05FX0NIQVIgPSAnKD89LiknO1xuY29uc3QgUU1BUksgPSAnW14vXSc7XG5jb25zdCBFTkRfQU5DSE9SID0gYCg/OiR7U0xBU0hfTElURVJBTH18JClgO1xuY29uc3QgU1RBUlRfQU5DSE9SID0gYCg/Ol58JHtTTEFTSF9MSVRFUkFMfSlgO1xuY29uc3QgRE9UU19TTEFTSCA9IGAke0RPVF9MSVRFUkFMfXsxLDJ9JHtFTkRfQU5DSE9SfWA7XG5jb25zdCBOT19ET1QgPSBgKD8hJHtET1RfTElURVJBTH0pYDtcbmNvbnN0IE5PX0RPVFMgPSBgKD8hJHtTVEFSVF9BTkNIT1J9JHtET1RTX1NMQVNIfSlgO1xuY29uc3QgTk9fRE9UX1NMQVNIID0gYCg/ISR7RE9UX0xJVEVSQUx9ezAsMX0ke0VORF9BTkNIT1J9KWA7XG5jb25zdCBOT19ET1RTX1NMQVNIID0gYCg/ISR7RE9UU19TTEFTSH0pYDtcbmNvbnN0IFFNQVJLX05PX0RPVCA9IGBbXi4ke1NMQVNIX0xJVEVSQUx9XWA7XG5jb25zdCBTVEFSID0gYCR7UU1BUkt9Kj9gO1xuXG5jb25zdCBQT1NJWF9DSEFSUyA9IHtcbiAgRE9UX0xJVEVSQUwsXG4gIFBMVVNfTElURVJBTCxcbiAgUU1BUktfTElURVJBTCxcbiAgU0xBU0hfTElURVJBTCxcbiAgT05FX0NIQVIsXG4gIFFNQVJLLFxuICBFTkRfQU5DSE9SLFxuICBET1RTX1NMQVNILFxuICBOT19ET1QsXG4gIE5PX0RPVFMsXG4gIE5PX0RPVF9TTEFTSCxcbiAgTk9fRE9UU19TTEFTSCxcbiAgUU1BUktfTk9fRE9ULFxuICBTVEFSLFxuICBTVEFSVF9BTkNIT1Jcbn07XG5cbi8qKlxuICogV2luZG93cyBnbG9iIHJlZ2V4XG4gKi9cblxuY29uc3QgV0lORE9XU19DSEFSUyA9IHtcbiAgLi4uUE9TSVhfQ0hBUlMsXG5cbiAgU0xBU0hfTElURVJBTDogYFske1dJTl9TTEFTSH1dYCxcbiAgUU1BUks6IFdJTl9OT19TTEFTSCxcbiAgU1RBUjogYCR7V0lOX05PX1NMQVNIfSo/YCxcbiAgRE9UU19TTEFTSDogYCR7RE9UX0xJVEVSQUx9ezEsMn0oPzpbJHtXSU5fU0xBU0h9XXwkKWAsXG4gIE5PX0RPVDogYCg/ISR7RE9UX0xJVEVSQUx9KWAsXG4gIE5PX0RPVFM6IGAoPyEoPzpefFske1dJTl9TTEFTSH1dKSR7RE9UX0xJVEVSQUx9ezEsMn0oPzpbJHtXSU5fU0xBU0h9XXwkKSlgLFxuICBOT19ET1RfU0xBU0g6IGAoPyEke0RPVF9MSVRFUkFMfXswLDF9KD86WyR7V0lOX1NMQVNIfV18JCkpYCxcbiAgTk9fRE9UU19TTEFTSDogYCg/ISR7RE9UX0xJVEVSQUx9ezEsMn0oPzpbJHtXSU5fU0xBU0h9XXwkKSlgLFxuICBRTUFSS19OT19ET1Q6IGBbXi4ke1dJTl9TTEFTSH1dYCxcbiAgU1RBUlRfQU5DSE9SOiBgKD86XnxbJHtXSU5fU0xBU0h9XSlgLFxuICBFTkRfQU5DSE9SOiBgKD86WyR7V0lOX1NMQVNIfV18JClgXG59O1xuXG4vKipcbiAqIFBPU0lYIEJyYWNrZXQgUmVnZXhcbiAqL1xuXG5jb25zdCBQT1NJWF9SRUdFWF9TT1VSQ0UgPSB7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgYWxudW06ICdhLXpBLVowLTknLFxuICBhbHBoYTogJ2EtekEtWicsXG4gIGFzY2lpOiAnXFxcXHgwMC1cXFxceDdGJyxcbiAgYmxhbms6ICcgXFxcXHQnLFxuICBjbnRybDogJ1xcXFx4MDAtXFxcXHgxRlxcXFx4N0YnLFxuICBkaWdpdDogJzAtOScsXG4gIGdyYXBoOiAnXFxcXHgyMS1cXFxceDdFJyxcbiAgbG93ZXI6ICdhLXonLFxuICBwcmludDogJ1xcXFx4MjAtXFxcXHg3RSAnLFxuICBwdW5jdDogJ1xcXFwtIVwiIyQlJlxcJygpXFxcXCorLC4vOjs8PT4/QFtcXFxcXV5fYHt8fX4nLFxuICBzcGFjZTogJyBcXFxcdFxcXFxyXFxcXG5cXFxcdlxcXFxmJyxcbiAgdXBwZXI6ICdBLVonLFxuICB3b3JkOiAnQS1aYS16MC05XycsXG4gIHhkaWdpdDogJ0EtRmEtZjAtOSdcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBERUZBVUxUX01BWF9FWFRHTE9CX1JFQ1VSU0lPTixcbiAgTUFYX0xFTkdUSDogMTAyNCAqIDY0LFxuICBQT1NJWF9SRUdFWF9TT1VSQ0UsXG5cbiAgLy8gcmVndWxhciBleHByZXNzaW9uc1xuICBSRUdFWF9CQUNLU0xBU0g6IC9cXFxcKD8hWyorP14ke30ofClbXFxdXSkvZyxcbiAgUkVHRVhfTk9OX1NQRUNJQUxfQ0hBUlM6IC9eW15AIVtcXF0uLCQqKz9ee30oKXxcXFxcL10rLyxcbiAgUkVHRVhfU1BFQ0lBTF9DSEFSUzogL1stKis/Ll4ke30ofClbXFxdXS8sXG4gIFJFR0VYX1NQRUNJQUxfQ0hBUlNfQkFDS1JFRjogLyhcXFxcPykoKFxcVykoXFwzKikpL2csXG4gIFJFR0VYX1NQRUNJQUxfQ0hBUlNfR0xPQkFMOiAvKFstKis/Ll4ke30ofClbXFxdXSkvZyxcbiAgUkVHRVhfUkVNT1ZFX0JBQ0tTTEFTSDogLyg/OlxcWy4qP1teXFxcXF1cXF18XFxcXCg/PS4pKS9nLFxuXG4gIC8vIFJlcGxhY2UgZ2xvYnMgd2l0aCBlcXVpdmFsZW50IHBhdHRlcm5zIHRvIHJlZHVjZSBwYXJzaW5nIHRpbWUuXG4gIFJFUExBQ0VNRU5UUzoge1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAnKioqJzogJyonLFxuICAgICcqKi8qKic6ICcqKicsXG4gICAgJyoqLyoqLyoqJzogJyoqJ1xuICB9LFxuXG4gIC8vIERpZ2l0c1xuICBDSEFSXzA6IDQ4LCAvKiAwICovXG4gIENIQVJfOTogNTcsIC8qIDkgKi9cblxuICAvLyBBbHBoYWJldCBjaGFycy5cbiAgQ0hBUl9VUFBFUkNBU0VfQTogNjUsIC8qIEEgKi9cbiAgQ0hBUl9MT1dFUkNBU0VfQTogOTcsIC8qIGEgKi9cbiAgQ0hBUl9VUFBFUkNBU0VfWjogOTAsIC8qIFogKi9cbiAgQ0hBUl9MT1dFUkNBU0VfWjogMTIyLCAvKiB6ICovXG5cbiAgQ0hBUl9MRUZUX1BBUkVOVEhFU0VTOiA0MCwgLyogKCAqL1xuICBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTOiA0MSwgLyogKSAqL1xuXG4gIENIQVJfQVNURVJJU0s6IDQyLCAvKiAqICovXG5cbiAgLy8gTm9uLWFscGhhYmV0aWMgY2hhcnMuXG4gIENIQVJfQU1QRVJTQU5EOiAzOCwgLyogJiAqL1xuICBDSEFSX0FUOiA2NCwgLyogQCAqL1xuICBDSEFSX0JBQ0tXQVJEX1NMQVNIOiA5MiwgLyogXFwgKi9cbiAgQ0hBUl9DQVJSSUFHRV9SRVRVUk46IDEzLCAvKiBcXHIgKi9cbiAgQ0hBUl9DSVJDVU1GTEVYX0FDQ0VOVDogOTQsIC8qIF4gKi9cbiAgQ0hBUl9DT0xPTjogNTgsIC8qIDogKi9cbiAgQ0hBUl9DT01NQTogNDQsIC8qICwgKi9cbiAgQ0hBUl9ET1Q6IDQ2LCAvKiAuICovXG4gIENIQVJfRE9VQkxFX1FVT1RFOiAzNCwgLyogXCIgKi9cbiAgQ0hBUl9FUVVBTDogNjEsIC8qID0gKi9cbiAgQ0hBUl9FWENMQU1BVElPTl9NQVJLOiAzMywgLyogISAqL1xuICBDSEFSX0ZPUk1fRkVFRDogMTIsIC8qIFxcZiAqL1xuICBDSEFSX0ZPUldBUkRfU0xBU0g6IDQ3LCAvKiAvICovXG4gIENIQVJfR1JBVkVfQUNDRU5UOiA5NiwgLyogYCAqL1xuICBDSEFSX0hBU0g6IDM1LCAvKiAjICovXG4gIENIQVJfSFlQSEVOX01JTlVTOiA0NSwgLyogLSAqL1xuICBDSEFSX0xFRlRfQU5HTEVfQlJBQ0tFVDogNjAsIC8qIDwgKi9cbiAgQ0hBUl9MRUZUX0NVUkxZX0JSQUNFOiAxMjMsIC8qIHsgKi9cbiAgQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUOiA5MSwgLyogWyAqL1xuICBDSEFSX0xJTkVfRkVFRDogMTAsIC8qIFxcbiAqL1xuICBDSEFSX05PX0JSRUFLX1NQQUNFOiAxNjAsIC8qIFxcdTAwQTAgKi9cbiAgQ0hBUl9QRVJDRU5UOiAzNywgLyogJSAqL1xuICBDSEFSX1BMVVM6IDQzLCAvKiArICovXG4gIENIQVJfUVVFU1RJT05fTUFSSzogNjMsIC8qID8gKi9cbiAgQ0hBUl9SSUdIVF9BTkdMRV9CUkFDS0VUOiA2MiwgLyogPiAqL1xuICBDSEFSX1JJR0hUX0NVUkxZX0JSQUNFOiAxMjUsIC8qIH0gKi9cbiAgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVDogOTMsIC8qIF0gKi9cbiAgQ0hBUl9TRU1JQ09MT046IDU5LCAvKiA7ICovXG4gIENIQVJfU0lOR0xFX1FVT1RFOiAzOSwgLyogJyAqL1xuICBDSEFSX1NQQUNFOiAzMiwgLyogICAqL1xuICBDSEFSX1RBQjogOSwgLyogXFx0ICovXG4gIENIQVJfVU5ERVJTQ09SRTogOTUsIC8qIF8gKi9cbiAgQ0hBUl9WRVJUSUNBTF9MSU5FOiAxMjQsIC8qIHwgKi9cbiAgQ0hBUl9aRVJPX1dJRFRIX05PQlJFQUtfU1BBQ0U6IDY1Mjc5LCAvKiBcXHVGRUZGICovXG5cbiAgU0VQOiBwYXRoLnNlcCxcblxuICAvKipcbiAgICogQ3JlYXRlIEVYVEdMT0JfQ0hBUlNcbiAgICovXG5cbiAgZXh0Z2xvYkNoYXJzKGNoYXJzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICchJzogeyB0eXBlOiAnbmVnYXRlJywgb3BlbjogJyg/Oig/ISg/OicsIGNsb3NlOiBgKSkke2NoYXJzLlNUQVJ9KWAgfSxcbiAgICAgICc/JzogeyB0eXBlOiAncW1hcmsnLCBvcGVuOiAnKD86JywgY2xvc2U6ICcpPycgfSxcbiAgICAgICcrJzogeyB0eXBlOiAncGx1cycsIG9wZW46ICcoPzonLCBjbG9zZTogJykrJyB9LFxuICAgICAgJyonOiB7IHR5cGU6ICdzdGFyJywgb3BlbjogJyg/OicsIGNsb3NlOiAnKSonIH0sXG4gICAgICAnQCc6IHsgdHlwZTogJ2F0Jywgb3BlbjogJyg/OicsIGNsb3NlOiAnKScgfVxuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBHTE9CX0NIQVJTXG4gICAqL1xuXG4gIGdsb2JDaGFycyh3aW4zMikge1xuICAgIHJldHVybiB3aW4zMiA9PT0gdHJ1ZSA/IFdJTkRPV1NfQ0hBUlMgOiBQT1NJWF9DSEFSUztcbiAgfVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCB3aW4zMiA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMic7XG5jb25zdCB7XG4gIFJFR0VYX0JBQ0tTTEFTSCxcbiAgUkVHRVhfUkVNT1ZFX0JBQ0tTTEFTSCxcbiAgUkVHRVhfU1BFQ0lBTF9DSEFSUyxcbiAgUkVHRVhfU1BFQ0lBTF9DSEFSU19HTE9CQUxcbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5leHBvcnRzLmlzT2JqZWN0ID0gdmFsID0+IHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWwpO1xuZXhwb3J0cy5oYXNSZWdleENoYXJzID0gc3RyID0+IFJFR0VYX1NQRUNJQUxfQ0hBUlMudGVzdChzdHIpO1xuZXhwb3J0cy5pc1JlZ2V4Q2hhciA9IHN0ciA9PiBzdHIubGVuZ3RoID09PSAxICYmIGV4cG9ydHMuaGFzUmVnZXhDaGFycyhzdHIpO1xuZXhwb3J0cy5lc2NhcGVSZWdleCA9IHN0ciA9PiBzdHIucmVwbGFjZShSRUdFWF9TUEVDSUFMX0NIQVJTX0dMT0JBTCwgJ1xcXFwkMScpO1xuZXhwb3J0cy50b1Bvc2l4U2xhc2hlcyA9IHN0ciA9PiBzdHIucmVwbGFjZShSRUdFWF9CQUNLU0xBU0gsICcvJyk7XG5cbmV4cG9ydHMucmVtb3ZlQmFja3NsYXNoZXMgPSBzdHIgPT4ge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoUkVHRVhfUkVNT1ZFX0JBQ0tTTEFTSCwgbWF0Y2ggPT4ge1xuICAgIHJldHVybiBtYXRjaCA9PT0gJ1xcXFwnID8gJycgOiBtYXRjaDtcbiAgfSk7XG59O1xuXG5leHBvcnRzLnN1cHBvcnRzTG9va2JlaGluZHMgPSAoKSA9PiB7XG4gIGNvbnN0IHNlZ3MgPSBwcm9jZXNzLnZlcnNpb24uc2xpY2UoMSkuc3BsaXQoJy4nKS5tYXAoTnVtYmVyKTtcbiAgaWYgKHNlZ3MubGVuZ3RoID09PSAzICYmIHNlZ3NbMF0gPj0gOSB8fCAoc2Vnc1swXSA9PT0gOCAmJiBzZWdzWzFdID49IDEwKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydHMuaXNXaW5kb3dzID0gb3B0aW9ucyA9PiB7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLndpbmRvd3MgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiBvcHRpb25zLndpbmRvd3M7XG4gIH1cbiAgcmV0dXJuIHdpbjMyID09PSB0cnVlIHx8IHBhdGguc2VwID09PSAnXFxcXCc7XG59O1xuXG5leHBvcnRzLmVzY2FwZUxhc3QgPSAoaW5wdXQsIGNoYXIsIGxhc3RJZHgpID0+IHtcbiAgY29uc3QgaWR4ID0gaW5wdXQubGFzdEluZGV4T2YoY2hhciwgbGFzdElkeCk7XG4gIGlmIChpZHggPT09IC0xKSByZXR1cm4gaW5wdXQ7XG4gIGlmIChpbnB1dFtpZHggLSAxXSA9PT0gJ1xcXFwnKSByZXR1cm4gZXhwb3J0cy5lc2NhcGVMYXN0KGlucHV0LCBjaGFyLCBpZHggLSAxKTtcbiAgcmV0dXJuIGAke2lucHV0LnNsaWNlKDAsIGlkeCl9XFxcXCR7aW5wdXQuc2xpY2UoaWR4KX1gO1xufTtcblxuZXhwb3J0cy5yZW1vdmVQcmVmaXggPSAoaW5wdXQsIHN0YXRlID0ge30pID0+IHtcbiAgbGV0IG91dHB1dCA9IGlucHV0O1xuICBpZiAob3V0cHV0LnN0YXJ0c1dpdGgoJy4vJykpIHtcbiAgICBvdXRwdXQgPSBvdXRwdXQuc2xpY2UoMik7XG4gICAgc3RhdGUucHJlZml4ID0gJy4vJztcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0cy53cmFwT3V0cHV0ID0gKGlucHV0LCBzdGF0ZSA9IHt9LCBvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3QgcHJlcGVuZCA9IG9wdGlvbnMuY29udGFpbnMgPyAnJyA6ICdeJztcbiAgY29uc3QgYXBwZW5kID0gb3B0aW9ucy5jb250YWlucyA/ICcnIDogJyQnO1xuXG4gIGxldCBvdXRwdXQgPSBgJHtwcmVwZW5kfSg/OiR7aW5wdXR9KSR7YXBwZW5kfWA7XG4gIGlmIChzdGF0ZS5uZWdhdGVkID09PSB0cnVlKSB7XG4gICAgb3V0cHV0ID0gYCg/Ol4oPyEke291dHB1dH0pLiokKWA7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbmNvbnN0IHtcbiAgQ0hBUl9BU1RFUklTSywgICAgICAgICAgICAgLyogKiAqL1xuICBDSEFSX0FULCAgICAgICAgICAgICAgICAgICAvKiBAICovXG4gIENIQVJfQkFDS1dBUkRfU0xBU0gsICAgICAgIC8qIFxcICovXG4gIENIQVJfQ09NTUEsICAgICAgICAgICAgICAgIC8qICwgKi9cbiAgQ0hBUl9ET1QsICAgICAgICAgICAgICAgICAgLyogLiAqL1xuICBDSEFSX0VYQ0xBTUFUSU9OX01BUkssICAgICAvKiAhICovXG4gIENIQVJfRk9SV0FSRF9TTEFTSCwgICAgICAgIC8qIC8gKi9cbiAgQ0hBUl9MRUZUX0NVUkxZX0JSQUNFLCAgICAgLyogeyAqL1xuICBDSEFSX0xFRlRfUEFSRU5USEVTRVMsICAgICAvKiAoICovXG4gIENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCwgIC8qIFsgKi9cbiAgQ0hBUl9QTFVTLCAgICAgICAgICAgICAgICAgLyogKyAqL1xuICBDSEFSX1FVRVNUSU9OX01BUkssICAgICAgICAvKiA/ICovXG4gIENIQVJfUklHSFRfQ1VSTFlfQlJBQ0UsICAgIC8qIH0gKi9cbiAgQ0hBUl9SSUdIVF9QQVJFTlRIRVNFUywgICAgLyogKSAqL1xuICBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUICAvKiBdICovXG59ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuY29uc3QgaXNQYXRoU2VwYXJhdG9yID0gY29kZSA9PiB7XG4gIHJldHVybiBjb2RlID09PSBDSEFSX0ZPUldBUkRfU0xBU0ggfHwgY29kZSA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSDtcbn07XG5cbmNvbnN0IGRlcHRoID0gdG9rZW4gPT4ge1xuICBpZiAodG9rZW4uaXNQcmVmaXggIT09IHRydWUpIHtcbiAgICB0b2tlbi5kZXB0aCA9IHRva2VuLmlzR2xvYnN0YXIgPyBJbmZpbml0eSA6IDE7XG4gIH1cbn07XG5cbi8qKlxuICogUXVpY2tseSBzY2FucyBhIGdsb2IgcGF0dGVybiBhbmQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIGhhbmRmdWwgb2ZcbiAqIHVzZWZ1bCBwcm9wZXJ0aWVzLCBsaWtlIGBpc0dsb2JgLCBgcGF0aGAgKHRoZSBsZWFkaW5nIG5vbi1nbG9iLCBpZiBpdCBleGlzdHMpLFxuICogYGdsb2JgICh0aGUgYWN0dWFsIHBhdHRlcm4pLCBgbmVnYXRlZGAgKHRydWUgaWYgdGhlIHBhdGggc3RhcnRzIHdpdGggYCFgIGJ1dCBub3RcbiAqIHdpdGggYCEoYCkgYW5kIGBuZWdhdGVkRXh0Z2xvYmAgKHRydWUgaWYgdGhlIHBhdGggc3RhcnRzIHdpdGggYCEoYCkuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBtID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiBjb25zb2xlLmxvZyhwbS5zY2FuKCdmb28vYmFyLyouanMnKSk7XG4gKiB7IGlzR2xvYjogdHJ1ZSwgaW5wdXQ6ICdmb28vYmFyLyouanMnLCBiYXNlOiAnZm9vL2JhcicsIGdsb2I6ICcqLmpzJyB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc3RyYFxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRva2VucyBhbmQgcmVnZXggc291cmNlIHN0cmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuY29uc3Qgc2NhbiA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcblxuICBjb25zdCBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSAxO1xuICBjb25zdCBzY2FuVG9FbmQgPSBvcHRzLnBhcnRzID09PSB0cnVlIHx8IG9wdHMuc2NhblRvRW5kID09PSB0cnVlO1xuICBjb25zdCBzbGFzaGVzID0gW107XG4gIGNvbnN0IHRva2VucyA9IFtdO1xuICBjb25zdCBwYXJ0cyA9IFtdO1xuXG4gIGxldCBzdHIgPSBpbnB1dDtcbiAgbGV0IGluZGV4ID0gLTE7XG4gIGxldCBzdGFydCA9IDA7XG4gIGxldCBsYXN0SW5kZXggPSAwO1xuICBsZXQgaXNCcmFjZSA9IGZhbHNlO1xuICBsZXQgaXNCcmFja2V0ID0gZmFsc2U7XG4gIGxldCBpc0dsb2IgPSBmYWxzZTtcbiAgbGV0IGlzRXh0Z2xvYiA9IGZhbHNlO1xuICBsZXQgaXNHbG9ic3RhciA9IGZhbHNlO1xuICBsZXQgYnJhY2VFc2NhcGVkID0gZmFsc2U7XG4gIGxldCBiYWNrc2xhc2hlcyA9IGZhbHNlO1xuICBsZXQgbmVnYXRlZCA9IGZhbHNlO1xuICBsZXQgbmVnYXRlZEV4dGdsb2IgPSBmYWxzZTtcbiAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XG4gIGxldCBicmFjZXMgPSAwO1xuICBsZXQgcHJldjtcbiAgbGV0IGNvZGU7XG4gIGxldCB0b2tlbiA9IHsgdmFsdWU6ICcnLCBkZXB0aDogMCwgaXNHbG9iOiBmYWxzZSB9O1xuXG4gIGNvbnN0IGVvcyA9ICgpID0+IGluZGV4ID49IGxlbmd0aDtcbiAgY29uc3QgcGVlayA9ICgpID0+IHN0ci5jaGFyQ29kZUF0KGluZGV4ICsgMSk7XG4gIGNvbnN0IGFkdmFuY2UgPSAoKSA9PiB7XG4gICAgcHJldiA9IGNvZGU7XG4gICAgcmV0dXJuIHN0ci5jaGFyQ29kZUF0KCsraW5kZXgpO1xuICB9O1xuXG4gIHdoaWxlIChpbmRleCA8IGxlbmd0aCkge1xuICAgIGNvZGUgPSBhZHZhbmNlKCk7XG4gICAgbGV0IG5leHQ7XG5cbiAgICBpZiAoY29kZSA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSCkge1xuICAgICAgYmFja3NsYXNoZXMgPSB0b2tlbi5iYWNrc2xhc2hlcyA9IHRydWU7XG4gICAgICBjb2RlID0gYWR2YW5jZSgpO1xuXG4gICAgICBpZiAoY29kZSA9PT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNFKSB7XG4gICAgICAgIGJyYWNlRXNjYXBlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoYnJhY2VFc2NhcGVkID09PSB0cnVlIHx8IGNvZGUgPT09IENIQVJfTEVGVF9DVVJMWV9CUkFDRSkge1xuICAgICAgYnJhY2VzKys7XG5cbiAgICAgIHdoaWxlIChlb3MoKSAhPT0gdHJ1ZSAmJiAoY29kZSA9IGFkdmFuY2UoKSkpIHtcbiAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfQkFDS1dBUkRfU0xBU0gpIHtcbiAgICAgICAgICBiYWNrc2xhc2hlcyA9IHRva2VuLmJhY2tzbGFzaGVzID0gdHJ1ZTtcbiAgICAgICAgICBhZHZhbmNlKCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNFKSB7XG4gICAgICAgICAgYnJhY2VzKys7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYnJhY2VFc2NhcGVkICE9PSB0cnVlICYmIGNvZGUgPT09IENIQVJfRE9UICYmIChjb2RlID0gYWR2YW5jZSgpKSA9PT0gQ0hBUl9ET1QpIHtcbiAgICAgICAgICBpc0JyYWNlID0gdG9rZW4uaXNCcmFjZSA9IHRydWU7XG4gICAgICAgICAgaXNHbG9iID0gdG9rZW4uaXNHbG9iID0gdHJ1ZTtcbiAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoc2NhblRvRW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChicmFjZUVzY2FwZWQgIT09IHRydWUgJiYgY29kZSA9PT0gQ0hBUl9DT01NQSkge1xuICAgICAgICAgIGlzQnJhY2UgPSB0b2tlbi5pc0JyYWNlID0gdHJ1ZTtcbiAgICAgICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfUklHSFRfQ1VSTFlfQlJBQ0UpIHtcbiAgICAgICAgICBicmFjZXMtLTtcblxuICAgICAgICAgIGlmIChicmFjZXMgPT09IDApIHtcbiAgICAgICAgICAgIGJyYWNlRXNjYXBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaXNCcmFjZSA9IHRva2VuLmlzQnJhY2UgPSB0cnVlO1xuICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb2RlID09PSBDSEFSX0ZPUldBUkRfU0xBU0gpIHtcbiAgICAgIHNsYXNoZXMucHVzaChpbmRleCk7XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICB0b2tlbiA9IHsgdmFsdWU6ICcnLCBkZXB0aDogMCwgaXNHbG9iOiBmYWxzZSB9O1xuXG4gICAgICBpZiAoZmluaXNoZWQgPT09IHRydWUpIGNvbnRpbnVlO1xuICAgICAgaWYgKHByZXYgPT09IENIQVJfRE9UICYmIGluZGV4ID09PSAoc3RhcnQgKyAxKSkge1xuICAgICAgICBzdGFydCArPSAyO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGFzdEluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMubm9leHQgIT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGlzRXh0Z2xvYkNoYXIgPSBjb2RlID09PSBDSEFSX1BMVVNcbiAgICAgICAgfHwgY29kZSA9PT0gQ0hBUl9BVFxuICAgICAgICB8fCBjb2RlID09PSBDSEFSX0FTVEVSSVNLXG4gICAgICAgIHx8IGNvZGUgPT09IENIQVJfUVVFU1RJT05fTUFSS1xuICAgICAgICB8fCBjb2RlID09PSBDSEFSX0VYQ0xBTUFUSU9OX01BUks7XG5cbiAgICAgIGlmIChpc0V4dGdsb2JDaGFyID09PSB0cnVlICYmIHBlZWsoKSA9PT0gQ0hBUl9MRUZUX1BBUkVOVEhFU0VTKSB7XG4gICAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICAgIGlzRXh0Z2xvYiA9IHRva2VuLmlzRXh0Z2xvYiA9IHRydWU7XG4gICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfRVhDTEFNQVRJT05fTUFSSyAmJiBpbmRleCA9PT0gc3RhcnQpIHtcbiAgICAgICAgICBuZWdhdGVkRXh0Z2xvYiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2NhblRvRW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgd2hpbGUgKGVvcygpICE9PSB0cnVlICYmIChjb2RlID0gYWR2YW5jZSgpKSkge1xuICAgICAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfQkFDS1dBUkRfU0xBU0gpIHtcbiAgICAgICAgICAgICAgYmFja3NsYXNoZXMgPSB0b2tlbi5iYWNrc2xhc2hlcyA9IHRydWU7XG4gICAgICAgICAgICAgIGNvZGUgPSBhZHZhbmNlKCk7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9SSUdIVF9QQVJFTlRIRVNFUykge1xuICAgICAgICAgICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gQ0hBUl9BU1RFUklTSykge1xuICAgICAgaWYgKHByZXYgPT09IENIQVJfQVNURVJJU0spIGlzR2xvYnN0YXIgPSB0b2tlbi5pc0dsb2JzdGFyID0gdHJ1ZTtcbiAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICBmaW5pc2hlZCA9IHRydWU7XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gQ0hBUl9RVUVTVElPTl9NQVJLKSB7XG4gICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgZmluaXNoZWQgPSB0cnVlO1xuXG4gICAgICBpZiAoc2NhblRvRW5kID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCkge1xuICAgICAgd2hpbGUgKGVvcygpICE9PSB0cnVlICYmIChuZXh0ID0gYWR2YW5jZSgpKSkge1xuICAgICAgICBpZiAobmV4dCA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSCkge1xuICAgICAgICAgIGJhY2tzbGFzaGVzID0gdG9rZW4uYmFja3NsYXNoZXMgPSB0cnVlO1xuICAgICAgICAgIGFkdmFuY2UoKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICAgICAgaXNCcmFja2V0ID0gdG9rZW4uaXNCcmFja2V0ID0gdHJ1ZTtcbiAgICAgICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2NhblRvRW5kID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAob3B0cy5ub25lZ2F0ZSAhPT0gdHJ1ZSAmJiBjb2RlID09PSBDSEFSX0VYQ0xBTUFUSU9OX01BUksgJiYgaW5kZXggPT09IHN0YXJ0KSB7XG4gICAgICBuZWdhdGVkID0gdG9rZW4ubmVnYXRlZCA9IHRydWU7XG4gICAgICBzdGFydCsrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMubm9wYXJlbiAhPT0gdHJ1ZSAmJiBjb2RlID09PSBDSEFSX0xFRlRfUEFSRU5USEVTRVMpIHtcbiAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgd2hpbGUgKGVvcygpICE9PSB0cnVlICYmIChjb2RlID0gYWR2YW5jZSgpKSkge1xuICAgICAgICAgIGlmIChjb2RlID09PSBDSEFSX0xFRlRfUEFSRU5USEVTRVMpIHtcbiAgICAgICAgICAgIGJhY2tzbGFzaGVzID0gdG9rZW4uYmFja3NsYXNoZXMgPSB0cnVlO1xuICAgICAgICAgICAgY29kZSA9IGFkdmFuY2UoKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb2RlID09PSBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTKSB7XG4gICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoaXNHbG9iID09PSB0cnVlKSB7XG4gICAgICBmaW5pc2hlZCA9IHRydWU7XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRzLm5vZXh0ID09PSB0cnVlKSB7XG4gICAgaXNFeHRnbG9iID0gZmFsc2U7XG4gICAgaXNHbG9iID0gZmFsc2U7XG4gIH1cblxuICBsZXQgYmFzZSA9IHN0cjtcbiAgbGV0IHByZWZpeCA9ICcnO1xuICBsZXQgZ2xvYiA9ICcnO1xuXG4gIGlmIChzdGFydCA+IDApIHtcbiAgICBwcmVmaXggPSBzdHIuc2xpY2UoMCwgc3RhcnQpO1xuICAgIHN0ciA9IHN0ci5zbGljZShzdGFydCk7XG4gICAgbGFzdEluZGV4IC09IHN0YXJ0O1xuICB9XG5cbiAgaWYgKGJhc2UgJiYgaXNHbG9iID09PSB0cnVlICYmIGxhc3RJbmRleCA+IDApIHtcbiAgICBiYXNlID0gc3RyLnNsaWNlKDAsIGxhc3RJbmRleCk7XG4gICAgZ2xvYiA9IHN0ci5zbGljZShsYXN0SW5kZXgpO1xuICB9IGVsc2UgaWYgKGlzR2xvYiA9PT0gdHJ1ZSkge1xuICAgIGJhc2UgPSAnJztcbiAgICBnbG9iID0gc3RyO1xuICB9IGVsc2Uge1xuICAgIGJhc2UgPSBzdHI7XG4gIH1cblxuICBpZiAoYmFzZSAmJiBiYXNlICE9PSAnJyAmJiBiYXNlICE9PSAnLycgJiYgYmFzZSAhPT0gc3RyKSB7XG4gICAgaWYgKGlzUGF0aFNlcGFyYXRvcihiYXNlLmNoYXJDb2RlQXQoYmFzZS5sZW5ndGggLSAxKSkpIHtcbiAgICAgIGJhc2UgPSBiYXNlLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gIH1cblxuICBpZiAob3B0cy51bmVzY2FwZSA9PT0gdHJ1ZSkge1xuICAgIGlmIChnbG9iKSBnbG9iID0gdXRpbHMucmVtb3ZlQmFja3NsYXNoZXMoZ2xvYik7XG5cbiAgICBpZiAoYmFzZSAmJiBiYWNrc2xhc2hlcyA9PT0gdHJ1ZSkge1xuICAgICAgYmFzZSA9IHV0aWxzLnJlbW92ZUJhY2tzbGFzaGVzKGJhc2UpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIHByZWZpeCxcbiAgICBpbnB1dCxcbiAgICBzdGFydCxcbiAgICBiYXNlLFxuICAgIGdsb2IsXG4gICAgaXNCcmFjZSxcbiAgICBpc0JyYWNrZXQsXG4gICAgaXNHbG9iLFxuICAgIGlzRXh0Z2xvYixcbiAgICBpc0dsb2JzdGFyLFxuICAgIG5lZ2F0ZWQsXG4gICAgbmVnYXRlZEV4dGdsb2JcbiAgfTtcblxuICBpZiAob3B0cy50b2tlbnMgPT09IHRydWUpIHtcbiAgICBzdGF0ZS5tYXhEZXB0aCA9IDA7XG4gICAgaWYgKCFpc1BhdGhTZXBhcmF0b3IoY29kZSkpIHtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICB9XG4gICAgc3RhdGUudG9rZW5zID0gdG9rZW5zO1xuICB9XG5cbiAgaWYgKG9wdHMucGFydHMgPT09IHRydWUgfHwgb3B0cy50b2tlbnMgPT09IHRydWUpIHtcbiAgICBsZXQgcHJldkluZGV4O1xuXG4gICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgc2xhc2hlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBjb25zdCBuID0gcHJldkluZGV4ID8gcHJldkluZGV4ICsgMSA6IHN0YXJ0O1xuICAgICAgY29uc3QgaSA9IHNsYXNoZXNbaWR4XTtcbiAgICAgIGNvbnN0IHZhbHVlID0gaW5wdXQuc2xpY2UobiwgaSk7XG4gICAgICBpZiAob3B0cy50b2tlbnMpIHtcbiAgICAgICAgaWYgKGlkeCA9PT0gMCAmJiBzdGFydCAhPT0gMCkge1xuICAgICAgICAgIHRva2Vuc1tpZHhdLmlzUHJlZml4ID0gdHJ1ZTtcbiAgICAgICAgICB0b2tlbnNbaWR4XS52YWx1ZSA9IHByZWZpeDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnNbaWR4XS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGRlcHRoKHRva2Vuc1tpZHhdKTtcbiAgICAgICAgc3RhdGUubWF4RGVwdGggKz0gdG9rZW5zW2lkeF0uZGVwdGg7XG4gICAgICB9XG4gICAgICBpZiAoaWR4ICE9PSAwIHx8IHZhbHVlICE9PSAnJykge1xuICAgICAgICBwYXJ0cy5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHByZXZJbmRleCA9IGk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZJbmRleCAmJiBwcmV2SW5kZXggKyAxIDwgaW5wdXQubGVuZ3RoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGlucHV0LnNsaWNlKHByZXZJbmRleCArIDEpO1xuICAgICAgcGFydHMucHVzaCh2YWx1ZSk7XG5cbiAgICAgIGlmIChvcHRzLnRva2Vucykge1xuICAgICAgICB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGRlcHRoKHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0pO1xuICAgICAgICBzdGF0ZS5tYXhEZXB0aCArPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLmRlcHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRlLnNsYXNoZXMgPSBzbGFzaGVzO1xuICAgIHN0YXRlLnBhcnRzID0gcGFydHM7XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNjYW47XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uc3RhbnRzXG4gKi9cblxuY29uc3Qge1xuICBNQVhfTEVOR1RILFxuICBQT1NJWF9SRUdFWF9TT1VSQ0UsXG4gIFJFR0VYX05PTl9TUEVDSUFMX0NIQVJTLFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTX0JBQ0tSRUYsXG4gIFJFUExBQ0VNRU5UU1xufSA9IGNvbnN0YW50cztcblxuLyoqXG4gKiBIZWxwZXJzXG4gKi9cblxuY29uc3QgZXhwYW5kUmFuZ2UgPSAoYXJncywgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIG9wdGlvbnMuZXhwYW5kUmFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5leHBhbmRSYW5nZSguLi5hcmdzLCBvcHRpb25zKTtcbiAgfVxuXG4gIGFyZ3Muc29ydCgpO1xuICBjb25zdCB2YWx1ZSA9IGBbJHthcmdzLmpvaW4oJy0nKX1dYDtcblxuICB0cnkge1xuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXcgKi9cbiAgICBuZXcgUmVnRXhwKHZhbHVlKTtcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXR1cm4gYXJncy5tYXAodiA9PiB1dGlscy5lc2NhcGVSZWdleCh2KSkuam9pbignLi4nKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBtZXNzYWdlIGZvciBhIHN5bnRheCBlcnJvclxuICovXG5cbmNvbnN0IHN5bnRheEVycm9yID0gKHR5cGUsIGNoYXIpID0+IHtcbiAgcmV0dXJuIGBNaXNzaW5nICR7dHlwZX06IFwiJHtjaGFyfVwiIC0gdXNlIFwiXFxcXFxcXFwke2NoYXJ9XCIgdG8gbWF0Y2ggbGl0ZXJhbCBjaGFyYWN0ZXJzYDtcbn07XG5cbmNvbnN0IHNwbGl0VG9wTGV2ZWwgPSBpbnB1dCA9PiB7XG4gIGNvbnN0IHBhcnRzID0gW107XG4gIGxldCBicmFja2V0ID0gMDtcbiAgbGV0IHBhcmVuID0gMDtcbiAgbGV0IHF1b3RlID0gMDtcbiAgbGV0IHZhbHVlID0gJyc7XG4gIGxldCBlc2NhcGVkID0gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBjaCBvZiBpbnB1dCkge1xuICAgIGlmIChlc2NhcGVkID09PSB0cnVlKSB7XG4gICAgICB2YWx1ZSArPSBjaDtcbiAgICAgIGVzY2FwZWQgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICB2YWx1ZSArPSBjaDtcbiAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnXCInKSB7XG4gICAgICBxdW90ZSA9IHF1b3RlID09PSAxID8gMCA6IDE7XG4gICAgICB2YWx1ZSArPSBjaDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChxdW90ZSA9PT0gMCkge1xuICAgICAgaWYgKGNoID09PSAnWycpIHtcbiAgICAgICAgYnJhY2tldCsrO1xuICAgICAgfSBlbHNlIGlmIChjaCA9PT0gJ10nICYmIGJyYWNrZXQgPiAwKSB7XG4gICAgICAgIGJyYWNrZXQtLTtcbiAgICAgIH0gZWxzZSBpZiAoYnJhY2tldCA9PT0gMCkge1xuICAgICAgICBpZiAoY2ggPT09ICcoJykge1xuICAgICAgICAgIHBhcmVuKys7XG4gICAgICAgIH0gZWxzZSBpZiAoY2ggPT09ICcpJyAmJiBwYXJlbiA+IDApIHtcbiAgICAgICAgICBwYXJlbi0tO1xuICAgICAgICB9IGVsc2UgaWYgKGNoID09PSAnfCcgJiYgcGFyZW4gPT09IDApIHtcbiAgICAgICAgICBwYXJ0cy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsdWUgKz0gY2g7XG4gIH1cblxuICBwYXJ0cy5wdXNoKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnRzO1xufTtcblxuY29uc3QgaXNQbGFpbkJyYW5jaCA9IGJyYW5jaCA9PiB7XG4gIGxldCBlc2NhcGVkID0gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBjaCBvZiBicmFuY2gpIHtcbiAgICBpZiAoZXNjYXBlZCA9PT0gdHJ1ZSkge1xuICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnXFxcXCcpIHtcbiAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKC9bPyorQCEoKVtcXF17fV0vLnRlc3QoY2gpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBub3JtYWxpemVTaW1wbGVCcmFuY2ggPSBicmFuY2ggPT4ge1xuICBsZXQgdmFsdWUgPSBicmFuY2gudHJpbSgpO1xuICBsZXQgY2hhbmdlZCA9IHRydWU7XG5cbiAgd2hpbGUgKGNoYW5nZWQgPT09IHRydWUpIHtcbiAgICBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICBpZiAoL15AXFwoW15cXFxcKClbXFxde318XStcXCkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgyLCAtMSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWlzUGxhaW5CcmFuY2godmFsdWUpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1xcXFwoLikvZywgJyQxJyk7XG59O1xuXG5jb25zdCBoYXNSZXBlYXRlZENoYXJQcmVmaXhPdmVybGFwID0gYnJhbmNoZXMgPT4ge1xuICBjb25zdCB2YWx1ZXMgPSBicmFuY2hlcy5tYXAobm9ybWFsaXplU2ltcGxlQnJhbmNoKS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCB2YWx1ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGEgPSB2YWx1ZXNbaV07XG4gICAgICBjb25zdCBiID0gdmFsdWVzW2pdO1xuICAgICAgY29uc3QgY2hhciA9IGFbMF07XG5cbiAgICAgIGlmICghY2hhciB8fCBhICE9PSBjaGFyLnJlcGVhdChhLmxlbmd0aCkgfHwgYiAhPT0gY2hhci5yZXBlYXQoYi5sZW5ndGgpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoYSA9PT0gYiB8fCBhLnN0YXJ0c1dpdGgoYikgfHwgYi5zdGFydHNXaXRoKGEpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IHBhcnNlUmVwZWF0ZWRFeHRnbG9iID0gKHBhdHRlcm4sIHJlcXVpcmVFbmQgPSB0cnVlKSA9PiB7XG4gIGlmICgocGF0dGVyblswXSAhPT0gJysnICYmIHBhdHRlcm5bMF0gIT09ICcqJykgfHwgcGF0dGVyblsxXSAhPT0gJygnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGJyYWNrZXQgPSAwO1xuICBsZXQgcGFyZW4gPSAwO1xuICBsZXQgcXVvdGUgPSAwO1xuICBsZXQgZXNjYXBlZCA9IGZhbHNlO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoID0gcGF0dGVybltpXTtcblxuICAgIGlmIChlc2NhcGVkID09PSB0cnVlKSB7XG4gICAgICBlc2NhcGVkID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICdcXFxcJykge1xuICAgICAgZXNjYXBlZCA9IHRydWU7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICdcIicpIHtcbiAgICAgIHF1b3RlID0gcXVvdGUgPT09IDEgPyAwIDogMTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChxdW90ZSA9PT0gMSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnWycpIHtcbiAgICAgIGJyYWNrZXQrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaCA9PT0gJ10nICYmIGJyYWNrZXQgPiAwKSB7XG4gICAgICBicmFja2V0LS07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoYnJhY2tldCA+IDApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaCA9PT0gJygnKSB7XG4gICAgICBwYXJlbisrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoID09PSAnKScpIHtcbiAgICAgIHBhcmVuLS07XG5cbiAgICAgIGlmIChwYXJlbiA9PT0gMCkge1xuICAgICAgICBpZiAocmVxdWlyZUVuZCA9PT0gdHJ1ZSAmJiBpICE9PSBwYXR0ZXJuLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHR5cGU6IHBhdHRlcm5bMF0sXG4gICAgICAgICAgYm9keTogcGF0dGVybi5zbGljZSgyLCBpKSxcbiAgICAgICAgICBlbmQ6IGlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGdldFN0YXJFeHRnbG9iU2VxdWVuY2VPdXRwdXQgPSBwYXR0ZXJuID0+IHtcbiAgbGV0IGluZGV4ID0gMDtcbiAgY29uc3QgY2hhcnMgPSBbXTtcblxuICB3aGlsZSAoaW5kZXggPCBwYXR0ZXJuLmxlbmd0aCkge1xuICAgIGNvbnN0IG1hdGNoID0gcGFyc2VSZXBlYXRlZEV4dGdsb2IocGF0dGVybi5zbGljZShpbmRleCksIGZhbHNlKTtcblxuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2gudHlwZSAhPT0gJyonKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnJhbmNoZXMgPSBzcGxpdFRvcExldmVsKG1hdGNoLmJvZHkpLm1hcChicmFuY2ggPT4gYnJhbmNoLnRyaW0oKSk7XG4gICAgaWYgKGJyYW5jaGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJyYW5jaCA9IG5vcm1hbGl6ZVNpbXBsZUJyYW5jaChicmFuY2hlc1swXSk7XG4gICAgaWYgKCFicmFuY2ggfHwgYnJhbmNoLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNoYXJzLnB1c2goYnJhbmNoKTtcbiAgICBpbmRleCArPSBtYXRjaC5lbmQgKyAxO1xuICB9XG5cbiAgaWYgKGNoYXJzLmxlbmd0aCA8IDEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzb3VyY2UgPSBjaGFycy5sZW5ndGggPT09IDFcbiAgICA/IHV0aWxzLmVzY2FwZVJlZ2V4KGNoYXJzWzBdKVxuICAgIDogYFske2NoYXJzLm1hcChjaCA9PiB1dGlscy5lc2NhcGVSZWdleChjaCkpLmpvaW4oJycpfV1gO1xuXG4gIHJldHVybiBgJHtzb3VyY2V9KmA7XG59O1xuXG5jb25zdCByZXBlYXRlZEV4dGdsb2JSZWN1cnNpb24gPSBwYXR0ZXJuID0+IHtcbiAgbGV0IGRlcHRoID0gMDtcbiAgbGV0IHZhbHVlID0gcGF0dGVybi50cmltKCk7XG4gIGxldCBtYXRjaCA9IHBhcnNlUmVwZWF0ZWRFeHRnbG9iKHZhbHVlKTtcblxuICB3aGlsZSAobWF0Y2gpIHtcbiAgICBkZXB0aCsrO1xuICAgIHZhbHVlID0gbWF0Y2guYm9keS50cmltKCk7XG4gICAgbWF0Y2ggPSBwYXJzZVJlcGVhdGVkRXh0Z2xvYih2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gZGVwdGg7XG59O1xuXG5jb25zdCBhbmFseXplUmVwZWF0ZWRFeHRnbG9iID0gKGJvZHksIG9wdGlvbnMpID0+IHtcbiAgaWYgKG9wdGlvbnMubWF4RXh0Z2xvYlJlY3Vyc2lvbiA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4geyByaXNreTogZmFsc2UgfTtcbiAgfVxuXG4gIGNvbnN0IG1heCA9XG4gICAgdHlwZW9mIG9wdGlvbnMubWF4RXh0Z2xvYlJlY3Vyc2lvbiA9PT0gJ251bWJlcidcbiAgICAgID8gb3B0aW9ucy5tYXhFeHRnbG9iUmVjdXJzaW9uXG4gICAgICA6IGNvbnN0YW50cy5ERUZBVUxUX01BWF9FWFRHTE9CX1JFQ1VSU0lPTjtcblxuICBjb25zdCBicmFuY2hlcyA9IHNwbGl0VG9wTGV2ZWwoYm9keSkubWFwKGJyYW5jaCA9PiBicmFuY2gudHJpbSgpKTtcblxuICBpZiAoYnJhbmNoZXMubGVuZ3RoID4gMSkge1xuICAgIGlmIChcbiAgICAgIGJyYW5jaGVzLnNvbWUoYnJhbmNoID0+IGJyYW5jaCA9PT0gJycpIHx8XG4gICAgICBicmFuY2hlcy5zb21lKGJyYW5jaCA9PiAvXlsqP10rJC8udGVzdChicmFuY2gpKSB8fFxuICAgICAgaGFzUmVwZWF0ZWRDaGFyUHJlZml4T3ZlcmxhcChicmFuY2hlcylcbiAgICApIHtcbiAgICAgIHJldHVybiB7IHJpc2t5OiB0cnVlIH07XG4gICAgfVxuICB9XG5cbiAgZm9yIChjb25zdCBicmFuY2ggb2YgYnJhbmNoZXMpIHtcbiAgICBjb25zdCBzYWZlT3V0cHV0ID0gZ2V0U3RhckV4dGdsb2JTZXF1ZW5jZU91dHB1dChicmFuY2gpO1xuICAgIGlmIChzYWZlT3V0cHV0KSB7XG4gICAgICByZXR1cm4geyByaXNreTogdHJ1ZSwgc2FmZU91dHB1dCB9O1xuICAgIH1cblxuICAgIGlmIChyZXBlYXRlZEV4dGdsb2JSZWN1cnNpb24oYnJhbmNoKSA+IG1heCkge1xuICAgICAgcmV0dXJuIHsgcmlza3k6IHRydWUgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyByaXNreTogZmFsc2UgfTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGlucHV0IHN0cmluZy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5jb25zdCBwYXJzZSA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIH1cblxuICBpbnB1dCA9IFJFUExBQ0VNRU5UU1tpbnB1dF0gfHwgaW5wdXQ7XG5cbiAgY29uc3Qgb3B0cyA9IHsgLi4ub3B0aW9ucyB9O1xuICBjb25zdCBtYXggPSB0eXBlb2Ygb3B0cy5tYXhMZW5ndGggPT09ICdudW1iZXInID8gTWF0aC5taW4oTUFYX0xFTkdUSCwgb3B0cy5tYXhMZW5ndGgpIDogTUFYX0xFTkdUSDtcblxuICBsZXQgbGVuID0gaW5wdXQubGVuZ3RoO1xuICBpZiAobGVuID4gbWF4KSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBJbnB1dCBsZW5ndGg6ICR7bGVufSwgZXhjZWVkcyBtYXhpbXVtIGFsbG93ZWQgbGVuZ3RoOiAke21heH1gKTtcbiAgfVxuXG4gIGNvbnN0IGJvcyA9IHsgdHlwZTogJ2JvcycsIHZhbHVlOiAnJywgb3V0cHV0OiBvcHRzLnByZXBlbmQgfHwgJycgfTtcbiAgY29uc3QgdG9rZW5zID0gW2Jvc107XG5cbiAgY29uc3QgY2FwdHVyZSA9IG9wdHMuY2FwdHVyZSA/ICcnIDogJz86JztcbiAgY29uc3Qgd2luMzIgPSB1dGlscy5pc1dpbmRvd3Mob3B0aW9ucyk7XG5cbiAgLy8gY3JlYXRlIGNvbnN0YW50cyBiYXNlZCBvbiBwbGF0Zm9ybSwgZm9yIHdpbmRvd3Mgb3IgcG9zaXhcbiAgY29uc3QgUExBVEZPUk1fQ0hBUlMgPSBjb25zdGFudHMuZ2xvYkNoYXJzKHdpbjMyKTtcbiAgY29uc3QgRVhUR0xPQl9DSEFSUyA9IGNvbnN0YW50cy5leHRnbG9iQ2hhcnMoUExBVEZPUk1fQ0hBUlMpO1xuXG4gIGNvbnN0IHtcbiAgICBET1RfTElURVJBTCxcbiAgICBQTFVTX0xJVEVSQUwsXG4gICAgU0xBU0hfTElURVJBTCxcbiAgICBPTkVfQ0hBUixcbiAgICBET1RTX1NMQVNILFxuICAgIE5PX0RPVCxcbiAgICBOT19ET1RfU0xBU0gsXG4gICAgTk9fRE9UU19TTEFTSCxcbiAgICBRTUFSSyxcbiAgICBRTUFSS19OT19ET1QsXG4gICAgU1RBUixcbiAgICBTVEFSVF9BTkNIT1JcbiAgfSA9IFBMQVRGT1JNX0NIQVJTO1xuXG4gIGNvbnN0IGdsb2JzdGFyID0gb3B0cyA9PiB7XG4gICAgcmV0dXJuIGAoJHtjYXB0dXJlfSg/Oig/ISR7U1RBUlRfQU5DSE9SfSR7b3B0cy5kb3QgPyBET1RTX1NMQVNIIDogRE9UX0xJVEVSQUx9KS4pKj8pYDtcbiAgfTtcblxuICBjb25zdCBub2RvdCA9IG9wdHMuZG90ID8gJycgOiBOT19ET1Q7XG4gIGNvbnN0IHFtYXJrTm9Eb3QgPSBvcHRzLmRvdCA/IFFNQVJLIDogUU1BUktfTk9fRE9UO1xuICBsZXQgc3RhciA9IG9wdHMuYmFzaCA9PT0gdHJ1ZSA/IGdsb2JzdGFyKG9wdHMpIDogU1RBUjtcblxuICBpZiAob3B0cy5jYXB0dXJlKSB7XG4gICAgc3RhciA9IGAoJHtzdGFyfSlgO1xuICB9XG5cbiAgLy8gbWluaW1hdGNoIG9wdGlvbnMgc3VwcG9ydFxuICBpZiAodHlwZW9mIG9wdHMubm9leHQgPT09ICdib29sZWFuJykge1xuICAgIG9wdHMubm9leHRnbG9iID0gb3B0cy5ub2V4dDtcbiAgfVxuXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIGlucHV0LFxuICAgIGluZGV4OiAtMSxcbiAgICBzdGFydDogMCxcbiAgICBkb3Q6IG9wdHMuZG90ID09PSB0cnVlLFxuICAgIGNvbnN1bWVkOiAnJyxcbiAgICBvdXRwdXQ6ICcnLFxuICAgIHByZWZpeDogJycsXG4gICAgYmFja3RyYWNrOiBmYWxzZSxcbiAgICBuZWdhdGVkOiBmYWxzZSxcbiAgICBicmFja2V0czogMCxcbiAgICBicmFjZXM6IDAsXG4gICAgcGFyZW5zOiAwLFxuICAgIHF1b3RlczogMCxcbiAgICBnbG9ic3RhcjogZmFsc2UsXG4gICAgdG9rZW5zXG4gIH07XG5cbiAgaW5wdXQgPSB1dGlscy5yZW1vdmVQcmVmaXgoaW5wdXQsIHN0YXRlKTtcbiAgbGVuID0gaW5wdXQubGVuZ3RoO1xuXG4gIGNvbnN0IGV4dGdsb2JzID0gW107XG4gIGNvbnN0IGJyYWNlcyA9IFtdO1xuICBjb25zdCBzdGFjayA9IFtdO1xuICBsZXQgcHJldiA9IGJvcztcbiAgbGV0IHZhbHVlO1xuXG4gIC8qKlxuICAgKiBUb2tlbml6aW5nIGhlbHBlcnNcbiAgICovXG5cbiAgY29uc3QgZW9zID0gKCkgPT4gc3RhdGUuaW5kZXggPT09IGxlbiAtIDE7XG4gIGNvbnN0IHBlZWsgPSBzdGF0ZS5wZWVrID0gKG4gPSAxKSA9PiBpbnB1dFtzdGF0ZS5pbmRleCArIG5dO1xuICBjb25zdCBhZHZhbmNlID0gc3RhdGUuYWR2YW5jZSA9ICgpID0+IGlucHV0Wysrc3RhdGUuaW5kZXhdIHx8ICcnO1xuICBjb25zdCByZW1haW5pbmcgPSAoKSA9PiBpbnB1dC5zbGljZShzdGF0ZS5pbmRleCArIDEpO1xuICBjb25zdCBjb25zdW1lID0gKHZhbHVlID0gJycsIG51bSA9IDApID0+IHtcbiAgICBzdGF0ZS5jb25zdW1lZCArPSB2YWx1ZTtcbiAgICBzdGF0ZS5pbmRleCArPSBudW07XG4gIH07XG5cbiAgY29uc3QgYXBwZW5kID0gdG9rZW4gPT4ge1xuICAgIHN0YXRlLm91dHB1dCArPSB0b2tlbi5vdXRwdXQgIT0gbnVsbCA/IHRva2VuLm91dHB1dCA6IHRva2VuLnZhbHVlO1xuICAgIGNvbnN1bWUodG9rZW4udmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IG5lZ2F0ZSA9ICgpID0+IHtcbiAgICBsZXQgY291bnQgPSAxO1xuXG4gICAgd2hpbGUgKHBlZWsoKSA9PT0gJyEnICYmIChwZWVrKDIpICE9PSAnKCcgfHwgcGVlaygzKSA9PT0gJz8nKSkge1xuICAgICAgYWR2YW5jZSgpO1xuICAgICAgc3RhdGUuc3RhcnQrKztcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ICUgMiA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRlLm5lZ2F0ZWQgPSB0cnVlO1xuICAgIHN0YXRlLnN0YXJ0Kys7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgaW5jcmVtZW50ID0gdHlwZSA9PiB7XG4gICAgc3RhdGVbdHlwZV0rKztcbiAgICBzdGFjay5wdXNoKHR5cGUpO1xuICB9O1xuXG4gIGNvbnN0IGRlY3JlbWVudCA9IHR5cGUgPT4ge1xuICAgIHN0YXRlW3R5cGVdLS07XG4gICAgc3RhY2sucG9wKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFB1c2ggdG9rZW5zIG9udG8gdGhlIHRva2VucyBhcnJheS4gVGhpcyBoZWxwZXIgc3BlZWRzIHVwXG4gICAqIHRva2VuaXppbmcgYnkgMSkgaGVscGluZyB1cyBhdm9pZCBiYWNrdHJhY2tpbmcgYXMgbXVjaCBhcyBwb3NzaWJsZSxcbiAgICogYW5kIDIpIGhlbHBpbmcgdXMgYXZvaWQgY3JlYXRpbmcgZXh0cmEgdG9rZW5zIHdoZW4gY29uc2VjdXRpdmVcbiAgICogY2hhcmFjdGVycyBhcmUgcGxhaW4gdGV4dC4gVGhpcyBpbXByb3ZlcyBwZXJmb3JtYW5jZSBhbmQgc2ltcGxpZmllc1xuICAgKiBsb29rYmVoaW5kcy5cbiAgICovXG5cbiAgY29uc3QgcHVzaCA9IHRvayA9PiB7XG4gICAgaWYgKHByZXYudHlwZSA9PT0gJ2dsb2JzdGFyJykge1xuICAgICAgY29uc3QgaXNCcmFjZSA9IHN0YXRlLmJyYWNlcyA+IDAgJiYgKHRvay50eXBlID09PSAnY29tbWEnIHx8IHRvay50eXBlID09PSAnYnJhY2UnKTtcbiAgICAgIGNvbnN0IGlzRXh0Z2xvYiA9IHRvay5leHRnbG9iID09PSB0cnVlIHx8IChleHRnbG9icy5sZW5ndGggJiYgKHRvay50eXBlID09PSAncGlwZScgfHwgdG9rLnR5cGUgPT09ICdwYXJlbicpKTtcblxuICAgICAgaWYgKHRvay50eXBlICE9PSAnc2xhc2gnICYmIHRvay50eXBlICE9PSAncGFyZW4nICYmICFpc0JyYWNlICYmICFpc0V4dGdsb2IpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gc3RhdGUub3V0cHV0LnNsaWNlKDAsIC1wcmV2Lm91dHB1dC5sZW5ndGgpO1xuICAgICAgICBwcmV2LnR5cGUgPSAnc3Rhcic7XG4gICAgICAgIHByZXYudmFsdWUgPSAnKic7XG4gICAgICAgIHByZXYub3V0cHV0ID0gc3RhcjtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IHByZXYub3V0cHV0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChleHRnbG9icy5sZW5ndGggJiYgdG9rLnR5cGUgIT09ICdwYXJlbicpIHtcbiAgICAgIGV4dGdsb2JzW2V4dGdsb2JzLmxlbmd0aCAtIDFdLmlubmVyICs9IHRvay52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAodG9rLnZhbHVlIHx8IHRvay5vdXRwdXQpIGFwcGVuZCh0b2spO1xuICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ3RleHQnICYmIHRvay50eXBlID09PSAndGV4dCcpIHtcbiAgICAgIHByZXYudmFsdWUgKz0gdG9rLnZhbHVlO1xuICAgICAgcHJldi5vdXRwdXQgPSAocHJldi5vdXRwdXQgfHwgJycpICsgdG9rLnZhbHVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRvay5wcmV2ID0gcHJldjtcbiAgICB0b2tlbnMucHVzaCh0b2spO1xuICAgIHByZXYgPSB0b2s7XG4gIH07XG5cbiAgY29uc3QgZXh0Z2xvYk9wZW4gPSAodHlwZSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IHsgLi4uRVhUR0xPQl9DSEFSU1t2YWx1ZV0sIGNvbmRpdGlvbnM6IDEsIGlubmVyOiAnJyB9O1xuXG4gICAgdG9rZW4ucHJldiA9IHByZXY7XG4gICAgdG9rZW4ucGFyZW5zID0gc3RhdGUucGFyZW5zO1xuICAgIHRva2VuLm91dHB1dCA9IHN0YXRlLm91dHB1dDtcbiAgICB0b2tlbi5zdGFydEluZGV4ID0gc3RhdGUuaW5kZXg7XG4gICAgdG9rZW4udG9rZW5zSW5kZXggPSB0b2tlbnMubGVuZ3RoO1xuICAgIGNvbnN0IG91dHB1dCA9IChvcHRzLmNhcHR1cmUgPyAnKCcgOiAnJykgKyB0b2tlbi5vcGVuO1xuXG4gICAgaW5jcmVtZW50KCdwYXJlbnMnKTtcbiAgICBwdXNoKHsgdHlwZSwgdmFsdWUsIG91dHB1dDogc3RhdGUub3V0cHV0ID8gJycgOiBPTkVfQ0hBUiB9KTtcbiAgICBwdXNoKHsgdHlwZTogJ3BhcmVuJywgZXh0Z2xvYjogdHJ1ZSwgdmFsdWU6IGFkdmFuY2UoKSwgb3V0cHV0IH0pO1xuICAgIGV4dGdsb2JzLnB1c2godG9rZW4pO1xuICB9O1xuXG4gIGNvbnN0IGV4dGdsb2JDbG9zZSA9IHRva2VuID0+IHtcbiAgICBjb25zdCBsaXRlcmFsID0gaW5wdXQuc2xpY2UodG9rZW4uc3RhcnRJbmRleCwgc3RhdGUuaW5kZXggKyAxKTtcbiAgICBjb25zdCBib2R5ID0gaW5wdXQuc2xpY2UodG9rZW4uc3RhcnRJbmRleCArIDIsIHN0YXRlLmluZGV4KTtcbiAgICBjb25zdCBhbmFseXNpcyA9IGFuYWx5emVSZXBlYXRlZEV4dGdsb2IoYm9keSwgb3B0cyk7XG5cbiAgICBpZiAoKHRva2VuLnR5cGUgPT09ICdwbHVzJyB8fCB0b2tlbi50eXBlID09PSAnc3RhcicpICYmIGFuYWx5c2lzLnJpc2t5KSB7XG4gICAgICBjb25zdCBzYWZlT3V0cHV0ID0gYW5hbHlzaXMuc2FmZU91dHB1dFxuICAgICAgICA/ICh0b2tlbi5vdXRwdXQgPyAnJyA6IE9ORV9DSEFSKSArIChvcHRzLmNhcHR1cmUgPyBgKCR7YW5hbHlzaXMuc2FmZU91dHB1dH0pYCA6IGFuYWx5c2lzLnNhZmVPdXRwdXQpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgY29uc3Qgb3BlbiA9IHRva2Vuc1t0b2tlbi50b2tlbnNJbmRleF07XG5cbiAgICAgIG9wZW4udHlwZSA9ICd0ZXh0JztcbiAgICAgIG9wZW4udmFsdWUgPSBsaXRlcmFsO1xuICAgICAgb3Blbi5vdXRwdXQgPSBzYWZlT3V0cHV0IHx8IHV0aWxzLmVzY2FwZVJlZ2V4KGxpdGVyYWwpO1xuXG4gICAgICBmb3IgKGxldCBpID0gdG9rZW4udG9rZW5zSW5kZXggKyAxOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRva2Vuc1tpXS52YWx1ZSA9ICcnO1xuICAgICAgICB0b2tlbnNbaV0ub3V0cHV0ID0gJyc7XG4gICAgICAgIGRlbGV0ZSB0b2tlbnNbaV0uc3VmZml4O1xuICAgICAgfVxuXG4gICAgICBzdGF0ZS5vdXRwdXQgPSB0b2tlbi5vdXRwdXQgKyBvcGVuLm91dHB1dDtcbiAgICAgIHN0YXRlLmJhY2t0cmFjayA9IHRydWU7XG5cbiAgICAgIHB1c2goeyB0eXBlOiAncGFyZW4nLCBleHRnbG9iOiB0cnVlLCB2YWx1ZSwgb3V0cHV0OiAnJyB9KTtcbiAgICAgIGRlY3JlbWVudCgncGFyZW5zJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG91dHB1dCA9IHRva2VuLmNsb3NlICsgKG9wdHMuY2FwdHVyZSA/ICcpJyA6ICcnKTtcbiAgICBsZXQgcmVzdDtcblxuICAgIGlmICh0b2tlbi50eXBlID09PSAnbmVnYXRlJykge1xuICAgICAgbGV0IGV4dGdsb2JTdGFyID0gc3RhcjtcblxuICAgICAgaWYgKHRva2VuLmlubmVyICYmIHRva2VuLmlubmVyLmxlbmd0aCA+IDEgJiYgdG9rZW4uaW5uZXIuaW5jbHVkZXMoJy8nKSkge1xuICAgICAgICBleHRnbG9iU3RhciA9IGdsb2JzdGFyKG9wdHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXh0Z2xvYlN0YXIgIT09IHN0YXIgfHwgZW9zKCkgfHwgL15cXCkrJC8udGVzdChyZW1haW5pbmcoKSkpIHtcbiAgICAgICAgb3V0cHV0ID0gdG9rZW4uY2xvc2UgPSBgKSQpKSR7ZXh0Z2xvYlN0YXJ9YDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuLmlubmVyLmluY2x1ZGVzKCcqJykgJiYgKHJlc3QgPSByZW1haW5pbmcoKSkgJiYgL15cXC5bXlxcXFwvLl0rJC8udGVzdChyZXN0KSkge1xuICAgICAgICAvLyBBbnkgbm9uLW1hZ2ljYWwgc3RyaW5nIChgLnRzYCkgb3IgZXZlbiBuZXN0ZWQgZXhwcmVzc2lvbiAoYC57dHMsdHN4fWApIGNhbiBmb2xsb3cgYWZ0ZXIgdGhlIGNsb3NpbmcgcGFyZW50aGVzaXMuXG4gICAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2UgbmVlZCB0byBwYXJzZSB0aGUgc3RyaW5nIGFuZCB1c2UgaXQgaW4gdGhlIG91dHB1dCBvZiB0aGUgb3JpZ2luYWwgcGF0dGVybi5cbiAgICAgICAgLy8gU3VpdGFibGUgcGF0dGVybnM6IGAvISgqLmQpLnRzYCwgYC8hKCouZCkue3RzLHRzeH1gLCBgKiovISgqLWRiZykuQChqcylgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBEaXNhYmxpbmcgdGhlIGBmYXN0cGF0aHNgIG9wdGlvbiBkdWUgdG8gYSBwcm9ibGVtIHdpdGggcGFyc2luZyBzdHJpbmdzIGFzIGAudHNgIGluIHRoZSBwYXR0ZXJuIGxpa2UgYCoqLyEoKi5kKS50c2AuXG4gICAgICAgIGNvbnN0IGV4cHJlc3Npb24gPSBwYXJzZShyZXN0LCB7IC4uLm9wdGlvbnMsIGZhc3RwYXRoczogZmFsc2UgfSkub3V0cHV0O1xuXG4gICAgICAgIG91dHB1dCA9IHRva2VuLmNsb3NlID0gYCkke2V4cHJlc3Npb259KSR7ZXh0Z2xvYlN0YXJ9KWA7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi5wcmV2LnR5cGUgPT09ICdib3MnKSB7XG4gICAgICAgIHN0YXRlLm5lZ2F0ZWRFeHRnbG9iID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdXNoKHsgdHlwZTogJ3BhcmVuJywgZXh0Z2xvYjogdHJ1ZSwgdmFsdWUsIG91dHB1dCB9KTtcbiAgICBkZWNyZW1lbnQoJ3BhcmVucycpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGYXN0IHBhdGhzXG4gICAqL1xuXG4gIGlmIChvcHRzLmZhc3RwYXRocyAhPT0gZmFsc2UgJiYgIS8oXlsqIV18Wy8oKVtcXF17fVwiXSkvLnRlc3QoaW5wdXQpKSB7XG4gICAgbGV0IGJhY2tzbGFzaGVzID0gZmFsc2U7XG5cbiAgICBsZXQgb3V0cHV0ID0gaW5wdXQucmVwbGFjZShSRUdFWF9TUEVDSUFMX0NIQVJTX0JBQ0tSRUYsIChtLCBlc2MsIGNoYXJzLCBmaXJzdCwgcmVzdCwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChmaXJzdCA9PT0gJ1xcXFwnKSB7XG4gICAgICAgIGJhY2tzbGFzaGVzID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIG07XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdCA9PT0gJz8nKSB7XG4gICAgICAgIGlmIChlc2MpIHtcbiAgICAgICAgICByZXR1cm4gZXNjICsgZmlyc3QgKyAocmVzdCA/IFFNQVJLLnJlcGVhdChyZXN0Lmxlbmd0aCkgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHFtYXJrTm9Eb3QgKyAocmVzdCA/IFFNQVJLLnJlcGVhdChyZXN0Lmxlbmd0aCkgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFFNQVJLLnJlcGVhdChjaGFycy5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlyc3QgPT09ICcuJykge1xuICAgICAgICByZXR1cm4gRE9UX0xJVEVSQUwucmVwZWF0KGNoYXJzLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdCA9PT0gJyonKSB7XG4gICAgICAgIGlmIChlc2MpIHtcbiAgICAgICAgICByZXR1cm4gZXNjICsgZmlyc3QgKyAocmVzdCA/IHN0YXIgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXI7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXNjID8gbSA6IGBcXFxcJHttfWA7XG4gICAgfSk7XG5cbiAgICBpZiAoYmFja3NsYXNoZXMgPT09IHRydWUpIHtcbiAgICAgIGlmIChvcHRzLnVuZXNjYXBlID09PSB0cnVlKSB7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXFxcL2csICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9cXFxcKy9nLCBtID0+IHtcbiAgICAgICAgICByZXR1cm4gbS5sZW5ndGggJSAyID09PSAwID8gJ1xcXFxcXFxcJyA6IChtID8gJ1xcXFwnIDogJycpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3V0cHV0ID09PSBpbnB1dCAmJiBvcHRzLmNvbnRhaW5zID09PSB0cnVlKSB7XG4gICAgICBzdGF0ZS5vdXRwdXQgPSBpbnB1dDtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBzdGF0ZS5vdXRwdXQgPSB1dGlscy53cmFwT3V0cHV0KG91dHB1dCwgc3RhdGUsIG9wdGlvbnMpO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2tlbml6ZSBpbnB1dCB1bnRpbCB3ZSByZWFjaCBlbmQtb2Ytc3RyaW5nXG4gICAqL1xuXG4gIHdoaWxlICghZW9zKCkpIHtcbiAgICB2YWx1ZSA9IGFkdmFuY2UoKTtcblxuICAgIGlmICh2YWx1ZSA9PT0gJ1xcdTAwMDAnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFc2NhcGVkIGNoYXJhY3RlcnNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJ1xcXFwnKSB7XG4gICAgICBjb25zdCBuZXh0ID0gcGVlaygpO1xuXG4gICAgICBpZiAobmV4dCA9PT0gJy8nICYmIG9wdHMuYmFzaCAhPT0gdHJ1ZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHQgPT09ICcuJyB8fCBuZXh0ID09PSAnOycpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICB2YWx1ZSArPSAnXFxcXCc7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY29sbGFwc2Ugc2xhc2hlcyB0byByZWR1Y2UgcG90ZW50aWFsIGZvciBleHBsb2l0c1xuICAgICAgY29uc3QgbWF0Y2ggPSAvXlxcXFwrLy5leGVjKHJlbWFpbmluZygpKTtcbiAgICAgIGxldCBzbGFzaGVzID0gMDtcblxuICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzBdLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgc2xhc2hlcyA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgc3RhdGUuaW5kZXggKz0gc2xhc2hlcztcbiAgICAgICAgaWYgKHNsYXNoZXMgJSAyICE9PSAwKSB7XG4gICAgICAgICAgdmFsdWUgKz0gJ1xcXFwnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLnVuZXNjYXBlID09PSB0cnVlKSB7XG4gICAgICAgIHZhbHVlID0gYWR2YW5jZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgKz0gYWR2YW5jZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuYnJhY2tldHMgPT09IDApIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIHdlJ3JlIGluc2lkZSBhIHJlZ2V4IGNoYXJhY3RlciBjbGFzcywgY29udGludWVcbiAgICAgKiB1bnRpbCB3ZSByZWFjaCB0aGUgY2xvc2luZyBicmFja2V0LlxuICAgICAqL1xuXG4gICAgaWYgKHN0YXRlLmJyYWNrZXRzID4gMCAmJiAodmFsdWUgIT09ICddJyB8fCBwcmV2LnZhbHVlID09PSAnWycgfHwgcHJldi52YWx1ZSA9PT0gJ1teJykpIHtcbiAgICAgIGlmIChvcHRzLnBvc2l4ICE9PSBmYWxzZSAmJiB2YWx1ZSA9PT0gJzonKSB7XG4gICAgICAgIGNvbnN0IGlubmVyID0gcHJldi52YWx1ZS5zbGljZSgxKTtcbiAgICAgICAgaWYgKGlubmVyLmluY2x1ZGVzKCdbJykpIHtcbiAgICAgICAgICBwcmV2LnBvc2l4ID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChpbm5lci5pbmNsdWRlcygnOicpKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSBwcmV2LnZhbHVlLmxhc3RJbmRleE9mKCdbJyk7XG4gICAgICAgICAgICBjb25zdCBwcmUgPSBwcmV2LnZhbHVlLnNsaWNlKDAsIGlkeCk7XG4gICAgICAgICAgICBjb25zdCByZXN0ID0gcHJldi52YWx1ZS5zbGljZShpZHggKyAyKTtcbiAgICAgICAgICAgIGNvbnN0IHBvc2l4ID0gUE9TSVhfUkVHRVhfU09VUkNFW3Jlc3RdO1xuICAgICAgICAgICAgaWYgKHBvc2l4KSB7XG4gICAgICAgICAgICAgIHByZXYudmFsdWUgPSBwcmUgKyBwb3NpeDtcbiAgICAgICAgICAgICAgc3RhdGUuYmFja3RyYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYWR2YW5jZSgpO1xuXG4gICAgICAgICAgICAgIGlmICghYm9zLm91dHB1dCAmJiB0b2tlbnMuaW5kZXhPZihwcmV2KSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGJvcy5vdXRwdXQgPSBPTkVfQ0hBUjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCh2YWx1ZSA9PT0gJ1snICYmIHBlZWsoKSAhPT0gJzonKSB8fCAodmFsdWUgPT09ICctJyAmJiBwZWVrKCkgPT09ICddJykpIHtcbiAgICAgICAgdmFsdWUgPSBgXFxcXCR7dmFsdWV9YDtcbiAgICAgIH1cblxuICAgICAgaWYgKHZhbHVlID09PSAnXScgJiYgKHByZXYudmFsdWUgPT09ICdbJyB8fCBwcmV2LnZhbHVlID09PSAnW14nKSkge1xuICAgICAgICB2YWx1ZSA9IGBcXFxcJHt2YWx1ZX1gO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5wb3NpeCA9PT0gdHJ1ZSAmJiB2YWx1ZSA9PT0gJyEnICYmIHByZXYudmFsdWUgPT09ICdbJykge1xuICAgICAgICB2YWx1ZSA9ICdeJztcbiAgICAgIH1cblxuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgIGFwcGVuZCh7IHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgd2UncmUgaW5zaWRlIGEgcXVvdGVkIHN0cmluZywgY29udGludWVcbiAgICAgKiB1bnRpbCB3ZSByZWFjaCB0aGUgY2xvc2luZyBkb3VibGUgcXVvdGUuXG4gICAgICovXG5cbiAgICBpZiAoc3RhdGUucXVvdGVzID09PSAxICYmIHZhbHVlICE9PSAnXCInKSB7XG4gICAgICB2YWx1ZSA9IHV0aWxzLmVzY2FwZVJlZ2V4KHZhbHVlKTtcbiAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG4gICAgICBhcHBlbmQoeyB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvdWJsZSBxdW90ZXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJ1wiJykge1xuICAgICAgc3RhdGUucXVvdGVzID0gc3RhdGUucXVvdGVzID09PSAxID8gMCA6IDE7XG4gICAgICBpZiAob3B0cy5rZWVwUXVvdGVzID09PSB0cnVlKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyZW50aGVzZXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJygnKSB7XG4gICAgICBpbmNyZW1lbnQoJ3BhcmVucycpO1xuICAgICAgcHVzaCh7IHR5cGU6ICdwYXJlbicsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSAnKScpIHtcbiAgICAgIGlmIChzdGF0ZS5wYXJlbnMgPT09IDAgJiYgb3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3Ioc3ludGF4RXJyb3IoJ29wZW5pbmcnLCAnKCcpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXh0Z2xvYiA9IGV4dGdsb2JzW2V4dGdsb2JzLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKGV4dGdsb2IgJiYgc3RhdGUucGFyZW5zID09PSBleHRnbG9iLnBhcmVucyArIDEpIHtcbiAgICAgICAgZXh0Z2xvYkNsb3NlKGV4dGdsb2JzLnBvcCgpKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAncGFyZW4nLCB2YWx1ZSwgb3V0cHV0OiBzdGF0ZS5wYXJlbnMgPyAnKScgOiAnXFxcXCknIH0pO1xuICAgICAgZGVjcmVtZW50KCdwYXJlbnMnKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNxdWFyZSBicmFja2V0c1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnWycpIHtcbiAgICAgIGlmIChvcHRzLm5vYnJhY2tldCA9PT0gdHJ1ZSB8fCAhcmVtYWluaW5nKCkuaW5jbHVkZXMoJ10nKSkge1xuICAgICAgICBpZiAob3B0cy5ub2JyYWNrZXQgIT09IHRydWUgJiYgb3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihzeW50YXhFcnJvcignY2xvc2luZycsICddJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWUgPSBgXFxcXCR7dmFsdWV9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluY3JlbWVudCgnYnJhY2tldHMnKTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdicmFja2V0JywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09ICddJykge1xuICAgICAgaWYgKG9wdHMubm9icmFja2V0ID09PSB0cnVlIHx8IChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ2JyYWNrZXQnICYmIHByZXYudmFsdWUubGVuZ3RoID09PSAxKSkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSwgb3V0cHV0OiBgXFxcXCR7dmFsdWV9YCB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5icmFja2V0cyA9PT0gMCkge1xuICAgICAgICBpZiAob3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihzeW50YXhFcnJvcignb3BlbmluZycsICdbJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUsIG91dHB1dDogYFxcXFwke3ZhbHVlfWAgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBkZWNyZW1lbnQoJ2JyYWNrZXRzJyk7XG5cbiAgICAgIGNvbnN0IHByZXZWYWx1ZSA9IHByZXYudmFsdWUuc2xpY2UoMSk7XG4gICAgICBpZiAocHJldi5wb3NpeCAhPT0gdHJ1ZSAmJiBwcmV2VmFsdWVbMF0gPT09ICdeJyAmJiAhcHJldlZhbHVlLmluY2x1ZGVzKCcvJykpIHtcbiAgICAgICAgdmFsdWUgPSBgLyR7dmFsdWV9YDtcbiAgICAgIH1cblxuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgIGFwcGVuZCh7IHZhbHVlIH0pO1xuXG4gICAgICAvLyB3aGVuIGxpdGVyYWwgYnJhY2tldHMgYXJlIGV4cGxpY2l0bHkgZGlzYWJsZWRcbiAgICAgIC8vIGFzc3VtZSB3ZSBzaG91bGQgbWF0Y2ggd2l0aCBhIHJlZ2V4IGNoYXJhY3RlciBjbGFzc1xuICAgICAgaWYgKG9wdHMubGl0ZXJhbEJyYWNrZXRzID09PSBmYWxzZSB8fCB1dGlscy5oYXNSZWdleENoYXJzKHByZXZWYWx1ZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVzY2FwZWQgPSB1dGlscy5lc2NhcGVSZWdleChwcmV2LnZhbHVlKTtcbiAgICAgIHN0YXRlLm91dHB1dCA9IHN0YXRlLm91dHB1dC5zbGljZSgwLCAtcHJldi52YWx1ZS5sZW5ndGgpO1xuXG4gICAgICAvLyB3aGVuIGxpdGVyYWwgYnJhY2tldHMgYXJlIGV4cGxpY2l0bHkgZW5hYmxlZFxuICAgICAgLy8gYXNzdW1lIHdlIHNob3VsZCBlc2NhcGUgdGhlIGJyYWNrZXRzIHRvIG1hdGNoIGxpdGVyYWwgY2hhcmFjdGVyc1xuICAgICAgaWYgKG9wdHMubGl0ZXJhbEJyYWNrZXRzID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSBlc2NhcGVkO1xuICAgICAgICBwcmV2LnZhbHVlID0gZXNjYXBlZDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHdoZW4gdGhlIHVzZXIgc3BlY2lmaWVzIG5vdGhpbmcsIHRyeSB0byBtYXRjaCBib3RoXG4gICAgICBwcmV2LnZhbHVlID0gYCgke2NhcHR1cmV9JHtlc2NhcGVkfXwke3ByZXYudmFsdWV9KWA7XG4gICAgICBzdGF0ZS5vdXRwdXQgKz0gcHJldi52YWx1ZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJyYWNlc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAneycgJiYgb3B0cy5ub2JyYWNlICE9PSB0cnVlKSB7XG4gICAgICBpbmNyZW1lbnQoJ2JyYWNlcycpO1xuXG4gICAgICBjb25zdCBvcGVuID0ge1xuICAgICAgICB0eXBlOiAnYnJhY2UnLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgb3V0cHV0OiAnKCcsXG4gICAgICAgIG91dHB1dEluZGV4OiBzdGF0ZS5vdXRwdXQubGVuZ3RoLFxuICAgICAgICB0b2tlbnNJbmRleDogc3RhdGUudG9rZW5zLmxlbmd0aFxuICAgICAgfTtcblxuICAgICAgYnJhY2VzLnB1c2gob3Blbik7XG4gICAgICBwdXNoKG9wZW4pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSAnfScpIHtcbiAgICAgIGNvbnN0IGJyYWNlID0gYnJhY2VzW2JyYWNlcy5sZW5ndGggLSAxXTtcblxuICAgICAgaWYgKG9wdHMubm9icmFjZSA9PT0gdHJ1ZSB8fCAhYnJhY2UpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUsIG91dHB1dDogdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgb3V0cHV0ID0gJyknO1xuXG4gICAgICBpZiAoYnJhY2UuZG90cyA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBhcnIgPSB0b2tlbnMuc2xpY2UoKTtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gYXJyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdG9rZW5zLnBvcCgpO1xuICAgICAgICAgIGlmIChhcnJbaV0udHlwZSA9PT0gJ2JyYWNlJykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcnJbaV0udHlwZSAhPT0gJ2RvdHMnKSB7XG4gICAgICAgICAgICByYW5nZS51bnNoaWZ0KGFycltpXS52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb3V0cHV0ID0gZXhwYW5kUmFuZ2UocmFuZ2UsIG9wdHMpO1xuICAgICAgICBzdGF0ZS5iYWNrdHJhY2sgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoYnJhY2UuY29tbWEgIT09IHRydWUgJiYgYnJhY2UuZG90cyAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvdXQgPSBzdGF0ZS5vdXRwdXQuc2xpY2UoMCwgYnJhY2Uub3V0cHV0SW5kZXgpO1xuICAgICAgICBjb25zdCB0b2tzID0gc3RhdGUudG9rZW5zLnNsaWNlKGJyYWNlLnRva2Vuc0luZGV4KTtcbiAgICAgICAgYnJhY2UudmFsdWUgPSBicmFjZS5vdXRwdXQgPSAnXFxcXHsnO1xuICAgICAgICB2YWx1ZSA9IG91dHB1dCA9ICdcXFxcfSc7XG4gICAgICAgIHN0YXRlLm91dHB1dCA9IG91dDtcbiAgICAgICAgZm9yIChjb25zdCB0IG9mIHRva3MpIHtcbiAgICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gKHQub3V0cHV0IHx8IHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAnYnJhY2UnLCB2YWx1ZSwgb3V0cHV0IH0pO1xuICAgICAgZGVjcmVtZW50KCdicmFjZXMnKTtcbiAgICAgIGJyYWNlcy5wb3AoKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBpcGVzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICd8Jykge1xuICAgICAgaWYgKGV4dGdsb2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZXh0Z2xvYnNbZXh0Z2xvYnMubGVuZ3RoIC0gMV0uY29uZGl0aW9ucysrO1xuICAgICAgfVxuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21tYXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJywnKSB7XG4gICAgICBsZXQgb3V0cHV0ID0gdmFsdWU7XG5cbiAgICAgIGNvbnN0IGJyYWNlID0gYnJhY2VzW2JyYWNlcy5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChicmFjZSAmJiBzdGFja1tzdGFjay5sZW5ndGggLSAxXSA9PT0gJ2JyYWNlcycpIHtcbiAgICAgICAgYnJhY2UuY29tbWEgPSB0cnVlO1xuICAgICAgICBvdXRwdXQgPSAnfCc7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAnY29tbWEnLCB2YWx1ZSwgb3V0cHV0IH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2xhc2hlc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnLycpIHtcbiAgICAgIC8vIGlmIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGdsb2IgaXMgXCIuL1wiLCBhZHZhbmNlIHRoZSBzdGFydFxuICAgICAgLy8gdG8gdGhlIGN1cnJlbnQgaW5kZXgsIGFuZCBkb24ndCBhZGQgdGhlIFwiLi9cIiBjaGFyYWN0ZXJzXG4gICAgICAvLyB0byB0aGUgc3RhdGUuIFRoaXMgZ3JlYXRseSBzaW1wbGlmaWVzIGxvb2tiZWhpbmRzIHdoZW5cbiAgICAgIC8vIGNoZWNraW5nIGZvciBCT1MgY2hhcmFjdGVycyBsaWtlIFwiIVwiIGFuZCBcIi5cIiAobm90IFwiLi9cIilcbiAgICAgIGlmIChwcmV2LnR5cGUgPT09ICdkb3QnICYmIHN0YXRlLmluZGV4ID09PSBzdGF0ZS5zdGFydCArIDEpIHtcbiAgICAgICAgc3RhdGUuc3RhcnQgPSBzdGF0ZS5pbmRleCArIDE7XG4gICAgICAgIHN0YXRlLmNvbnN1bWVkID0gJyc7XG4gICAgICAgIHN0YXRlLm91dHB1dCA9ICcnO1xuICAgICAgICB0b2tlbnMucG9wKCk7XG4gICAgICAgIHByZXYgPSBib3M7IC8vIHJlc2V0IFwicHJldlwiIHRvIHRoZSBmaXJzdCB0b2tlblxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdzbGFzaCcsIHZhbHVlLCBvdXRwdXQ6IFNMQVNIX0xJVEVSQUwgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb3RzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICcuJykge1xuICAgICAgaWYgKHN0YXRlLmJyYWNlcyA+IDAgJiYgcHJldi50eXBlID09PSAnZG90Jykge1xuICAgICAgICBpZiAocHJldi52YWx1ZSA9PT0gJy4nKSBwcmV2Lm91dHB1dCA9IERPVF9MSVRFUkFMO1xuICAgICAgICBjb25zdCBicmFjZSA9IGJyYWNlc1ticmFjZXMubGVuZ3RoIC0gMV07XG4gICAgICAgIHByZXYudHlwZSA9ICdkb3RzJztcbiAgICAgICAgcHJldi5vdXRwdXQgKz0gdmFsdWU7XG4gICAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG4gICAgICAgIGJyYWNlLmRvdHMgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKChzdGF0ZS5icmFjZXMgKyBzdGF0ZS5wYXJlbnMpID09PSAwICYmIHByZXYudHlwZSAhPT0gJ2JvcycgJiYgcHJldi50eXBlICE9PSAnc2xhc2gnKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlLCBvdXRwdXQ6IERPVF9MSVRFUkFMIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdkb3QnLCB2YWx1ZSwgb3V0cHV0OiBET1RfTElURVJBTCB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFF1ZXN0aW9uIG1hcmtzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICc/Jykge1xuICAgICAgY29uc3QgaXNHcm91cCA9IHByZXYgJiYgcHJldi52YWx1ZSA9PT0gJygnO1xuICAgICAgaWYgKCFpc0dyb3VwICYmIG9wdHMubm9leHRnbG9iICE9PSB0cnVlICYmIHBlZWsoKSA9PT0gJygnICYmIHBlZWsoMikgIT09ICc/Jykge1xuICAgICAgICBleHRnbG9iT3BlbigncW1hcmsnLCB2YWx1ZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJldiAmJiBwcmV2LnR5cGUgPT09ICdwYXJlbicpIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHBlZWsoKTtcbiAgICAgICAgbGV0IG91dHB1dCA9IHZhbHVlO1xuXG4gICAgICAgIGlmIChuZXh0ID09PSAnPCcgJiYgIXV0aWxzLnN1cHBvcnRzTG9va2JlaGluZHMoKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm9kZS5qcyB2MTAgb3IgaGlnaGVyIGlzIHJlcXVpcmVkIGZvciByZWdleCBsb29rYmVoaW5kcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChwcmV2LnZhbHVlID09PSAnKCcgJiYgIS9bIT08Ol0vLnRlc3QobmV4dCkpIHx8IChuZXh0ID09PSAnPCcgJiYgIS88KFshPV18XFx3Kz4pLy50ZXN0KHJlbWFpbmluZygpKSkpIHtcbiAgICAgICAgICBvdXRwdXQgPSBgXFxcXCR7dmFsdWV9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlLCBvdXRwdXQgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5kb3QgIT09IHRydWUgJiYgKHByZXYudHlwZSA9PT0gJ3NsYXNoJyB8fCBwcmV2LnR5cGUgPT09ICdib3MnKSkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3FtYXJrJywgdmFsdWUsIG91dHB1dDogUU1BUktfTk9fRE9UIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdxbWFyaycsIHZhbHVlLCBvdXRwdXQ6IFFNQVJLIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhjbGFtYXRpb25cbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJyEnKSB7XG4gICAgICBpZiAob3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgcGVlaygpID09PSAnKCcpIHtcbiAgICAgICAgaWYgKHBlZWsoMikgIT09ICc/JyB8fCAhL1shPTw6XS8udGVzdChwZWVrKDMpKSkge1xuICAgICAgICAgIGV4dGdsb2JPcGVuKCduZWdhdGUnLCB2YWx1ZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMubm9uZWdhdGUgIT09IHRydWUgJiYgc3RhdGUuaW5kZXggPT09IDApIHtcbiAgICAgICAgbmVnYXRlKCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsdXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJysnKSB7XG4gICAgICBpZiAob3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgcGVlaygpID09PSAnKCcgJiYgcGVlaygyKSAhPT0gJz8nKSB7XG4gICAgICAgIGV4dGdsb2JPcGVuKCdwbHVzJywgdmFsdWUpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKChwcmV2ICYmIHByZXYudmFsdWUgPT09ICcoJykgfHwgb3B0cy5yZWdleCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICdwbHVzJywgdmFsdWUsIG91dHB1dDogUExVU19MSVRFUkFMIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKChwcmV2ICYmIChwcmV2LnR5cGUgPT09ICdicmFja2V0JyB8fCBwcmV2LnR5cGUgPT09ICdwYXJlbicgfHwgcHJldi50eXBlID09PSAnYnJhY2UnKSkgfHwgc3RhdGUucGFyZW5zID4gMCkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3BsdXMnLCB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAncGx1cycsIHZhbHVlOiBQTFVTX0xJVEVSQUwgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQbGFpbiB0ZXh0XG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICdAJykge1xuICAgICAgaWYgKG9wdHMubm9leHRnbG9iICE9PSB0cnVlICYmIHBlZWsoKSA9PT0gJygnICYmIHBlZWsoMikgIT09ICc/Jykge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ2F0JywgZXh0Z2xvYjogdHJ1ZSwgdmFsdWUsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsYWluIHRleHRcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSAhPT0gJyonKSB7XG4gICAgICBpZiAodmFsdWUgPT09ICckJyB8fCB2YWx1ZSA9PT0gJ14nKSB7XG4gICAgICAgIHZhbHVlID0gYFxcXFwke3ZhbHVlfWA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hdGNoID0gUkVHRVhfTk9OX1NQRUNJQUxfQ0hBUlMuZXhlYyhyZW1haW5pbmcoKSk7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgdmFsdWUgKz0gbWF0Y2hbMF07XG4gICAgICAgIHN0YXRlLmluZGV4ICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFyc1xuICAgICAqL1xuXG4gICAgaWYgKHByZXYgJiYgKHByZXYudHlwZSA9PT0gJ2dsb2JzdGFyJyB8fCBwcmV2LnN0YXIgPT09IHRydWUpKSB7XG4gICAgICBwcmV2LnR5cGUgPSAnc3Rhcic7XG4gICAgICBwcmV2LnN0YXIgPSB0cnVlO1xuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgIHByZXYub3V0cHV0ID0gc3RhcjtcbiAgICAgIHN0YXRlLmJhY2t0cmFjayA9IHRydWU7XG4gICAgICBzdGF0ZS5nbG9ic3RhciA9IHRydWU7XG4gICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGxldCByZXN0ID0gcmVtYWluaW5nKCk7XG4gICAgaWYgKG9wdHMubm9leHRnbG9iICE9PSB0cnVlICYmIC9eXFwoW14/XS8udGVzdChyZXN0KSkge1xuICAgICAgZXh0Z2xvYk9wZW4oJ3N0YXInLCB2YWx1ZSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAocHJldi50eXBlID09PSAnc3RhcicpIHtcbiAgICAgIGlmIChvcHRzLm5vZ2xvYnN0YXIgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3VtZSh2YWx1ZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmlvciA9IHByZXYucHJldjtcbiAgICAgIGNvbnN0IGJlZm9yZSA9IHByaW9yLnByZXY7XG4gICAgICBjb25zdCBpc1N0YXJ0ID0gcHJpb3IudHlwZSA9PT0gJ3NsYXNoJyB8fCBwcmlvci50eXBlID09PSAnYm9zJztcbiAgICAgIGNvbnN0IGFmdGVyU3RhciA9IGJlZm9yZSAmJiAoYmVmb3JlLnR5cGUgPT09ICdzdGFyJyB8fCBiZWZvcmUudHlwZSA9PT0gJ2dsb2JzdGFyJyk7XG5cbiAgICAgIGlmIChvcHRzLmJhc2ggPT09IHRydWUgJiYgKCFpc1N0YXJ0IHx8IChyZXN0WzBdICYmIHJlc3RbMF0gIT09ICcvJykpKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAnc3RhcicsIHZhbHVlLCBvdXRwdXQ6ICcnIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNCcmFjZSA9IHN0YXRlLmJyYWNlcyA+IDAgJiYgKHByaW9yLnR5cGUgPT09ICdjb21tYScgfHwgcHJpb3IudHlwZSA9PT0gJ2JyYWNlJyk7XG4gICAgICBjb25zdCBpc0V4dGdsb2IgPSBleHRnbG9icy5sZW5ndGggJiYgKHByaW9yLnR5cGUgPT09ICdwaXBlJyB8fCBwcmlvci50eXBlID09PSAncGFyZW4nKTtcbiAgICAgIGlmICghaXNTdGFydCAmJiBwcmlvci50eXBlICE9PSAncGFyZW4nICYmICFpc0JyYWNlICYmICFpc0V4dGdsb2IpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICdzdGFyJywgdmFsdWUsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBzdHJpcCBjb25zZWN1dGl2ZSBgLyoqL2BcbiAgICAgIHdoaWxlIChyZXN0LnNsaWNlKDAsIDMpID09PSAnLyoqJykge1xuICAgICAgICBjb25zdCBhZnRlciA9IGlucHV0W3N0YXRlLmluZGV4ICsgNF07XG4gICAgICAgIGlmIChhZnRlciAmJiBhZnRlciAhPT0gJy8nKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdCA9IHJlc3Quc2xpY2UoMyk7XG4gICAgICAgIGNvbnN1bWUoJy8qKicsIDMpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJpb3IudHlwZSA9PT0gJ2JvcycgJiYgZW9zKCkpIHtcbiAgICAgICAgcHJldi50eXBlID0gJ2dsb2JzdGFyJztcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgcHJldi5vdXRwdXQgPSBnbG9ic3RhcihvcHRzKTtcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gcHJldi5vdXRwdXQ7XG4gICAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgICAgY29uc3VtZSh2YWx1ZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJpb3IudHlwZSA9PT0gJ3NsYXNoJyAmJiBwcmlvci5wcmV2LnR5cGUgIT09ICdib3MnICYmICFhZnRlclN0YXIgJiYgZW9zKCkpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gc3RhdGUub3V0cHV0LnNsaWNlKDAsIC0ocHJpb3Iub3V0cHV0ICsgcHJldi5vdXRwdXQpLmxlbmd0aCk7XG4gICAgICAgIHByaW9yLm91dHB1dCA9IGAoPzoke3ByaW9yLm91dHB1dH1gO1xuXG4gICAgICAgIHByZXYudHlwZSA9ICdnbG9ic3Rhcic7XG4gICAgICAgIHByZXYub3V0cHV0ID0gZ2xvYnN0YXIob3B0cykgKyAob3B0cy5zdHJpY3RTbGFzaGVzID8gJyknIDogJ3wkKScpO1xuICAgICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgICBzdGF0ZS5nbG9ic3RhciA9IHRydWU7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSBwcmlvci5vdXRwdXQgKyBwcmV2Lm91dHB1dDtcbiAgICAgICAgY29uc3VtZSh2YWx1ZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJpb3IudHlwZSA9PT0gJ3NsYXNoJyAmJiBwcmlvci5wcmV2LnR5cGUgIT09ICdib3MnICYmIHJlc3RbMF0gPT09ICcvJykge1xuICAgICAgICBjb25zdCBlbmQgPSByZXN0WzFdICE9PSB2b2lkIDAgPyAnfCQnIDogJyc7XG5cbiAgICAgICAgc3RhdGUub3V0cHV0ID0gc3RhdGUub3V0cHV0LnNsaWNlKDAsIC0ocHJpb3Iub3V0cHV0ICsgcHJldi5vdXRwdXQpLmxlbmd0aCk7XG4gICAgICAgIHByaW9yLm91dHB1dCA9IGAoPzoke3ByaW9yLm91dHB1dH1gO1xuXG4gICAgICAgIHByZXYudHlwZSA9ICdnbG9ic3Rhcic7XG4gICAgICAgIHByZXYub3V0cHV0ID0gYCR7Z2xvYnN0YXIob3B0cyl9JHtTTEFTSF9MSVRFUkFMfXwke1NMQVNIX0xJVEVSQUx9JHtlbmR9KWA7XG4gICAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG5cbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IHByaW9yLm91dHB1dCArIHByZXYub3V0cHV0O1xuICAgICAgICBzdGF0ZS5nbG9ic3RhciA9IHRydWU7XG5cbiAgICAgICAgY29uc3VtZSh2YWx1ZSArIGFkdmFuY2UoKSk7XG5cbiAgICAgICAgcHVzaCh7IHR5cGU6ICdzbGFzaCcsIHZhbHVlOiAnLycsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJpb3IudHlwZSA9PT0gJ2JvcycgJiYgcmVzdFswXSA9PT0gJy8nKSB7XG4gICAgICAgIHByZXYudHlwZSA9ICdnbG9ic3Rhcic7XG4gICAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG4gICAgICAgIHByZXYub3V0cHV0ID0gYCg/Ol58JHtTTEFTSF9MSVRFUkFMfXwke2dsb2JzdGFyKG9wdHMpfSR7U0xBU0hfTElURVJBTH0pYDtcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gcHJldi5vdXRwdXQ7XG4gICAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgICAgY29uc3VtZSh2YWx1ZSArIGFkdmFuY2UoKSk7XG4gICAgICAgIHB1c2goeyB0eXBlOiAnc2xhc2gnLCB2YWx1ZTogJy8nLCBvdXRwdXQ6ICcnIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIHNpbmdsZSBzdGFyIGZyb20gb3V0cHV0XG4gICAgICBzdGF0ZS5vdXRwdXQgPSBzdGF0ZS5vdXRwdXQuc2xpY2UoMCwgLXByZXYub3V0cHV0Lmxlbmd0aCk7XG5cbiAgICAgIC8vIHJlc2V0IHByZXZpb3VzIHRva2VuIHRvIGdsb2JzdGFyXG4gICAgICBwcmV2LnR5cGUgPSAnZ2xvYnN0YXInO1xuICAgICAgcHJldi5vdXRwdXQgPSBnbG9ic3RhcihvcHRzKTtcbiAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG5cbiAgICAgIC8vIHJlc2V0IG91dHB1dCB3aXRoIGdsb2JzdGFyXG4gICAgICBzdGF0ZS5vdXRwdXQgKz0gcHJldi5vdXRwdXQ7XG4gICAgICBzdGF0ZS5nbG9ic3RhciA9IHRydWU7XG4gICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHRva2VuID0geyB0eXBlOiAnc3RhcicsIHZhbHVlLCBvdXRwdXQ6IHN0YXIgfTtcblxuICAgIGlmIChvcHRzLmJhc2ggPT09IHRydWUpIHtcbiAgICAgIHRva2VuLm91dHB1dCA9ICcuKj8nO1xuICAgICAgaWYgKHByZXYudHlwZSA9PT0gJ2JvcycgfHwgcHJldi50eXBlID09PSAnc2xhc2gnKSB7XG4gICAgICAgIHRva2VuLm91dHB1dCA9IG5vZG90ICsgdG9rZW4ub3V0cHV0O1xuICAgICAgfVxuICAgICAgcHVzaCh0b2tlbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAocHJldiAmJiAocHJldi50eXBlID09PSAnYnJhY2tldCcgfHwgcHJldi50eXBlID09PSAncGFyZW4nKSAmJiBvcHRzLnJlZ2V4ID09PSB0cnVlKSB7XG4gICAgICB0b2tlbi5vdXRwdXQgPSB2YWx1ZTtcbiAgICAgIHB1c2godG9rZW4pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmluZGV4ID09PSBzdGF0ZS5zdGFydCB8fCBwcmV2LnR5cGUgPT09ICdzbGFzaCcgfHwgcHJldi50eXBlID09PSAnZG90Jykge1xuICAgICAgaWYgKHByZXYudHlwZSA9PT0gJ2RvdCcpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IE5PX0RPVF9TTEFTSDtcbiAgICAgICAgcHJldi5vdXRwdXQgKz0gTk9fRE9UX1NMQVNIO1xuXG4gICAgICB9IGVsc2UgaWYgKG9wdHMuZG90ID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSBOT19ET1RTX1NMQVNIO1xuICAgICAgICBwcmV2Lm91dHB1dCArPSBOT19ET1RTX1NMQVNIO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gbm9kb3Q7XG4gICAgICAgIHByZXYub3V0cHV0ICs9IG5vZG90O1xuICAgICAgfVxuXG4gICAgICBpZiAocGVlaygpICE9PSAnKicpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IE9ORV9DSEFSO1xuICAgICAgICBwcmV2Lm91dHB1dCArPSBPTkVfQ0hBUjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdXNoKHRva2VuKTtcbiAgfVxuXG4gIHdoaWxlIChzdGF0ZS5icmFja2V0cyA+IDApIHtcbiAgICBpZiAob3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdjbG9zaW5nJywgJ10nKSk7XG4gICAgc3RhdGUub3V0cHV0ID0gdXRpbHMuZXNjYXBlTGFzdChzdGF0ZS5vdXRwdXQsICdbJyk7XG4gICAgZGVjcmVtZW50KCdicmFja2V0cycpO1xuICB9XG5cbiAgd2hpbGUgKHN0YXRlLnBhcmVucyA+IDApIHtcbiAgICBpZiAob3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdjbG9zaW5nJywgJyknKSk7XG4gICAgc3RhdGUub3V0cHV0ID0gdXRpbHMuZXNjYXBlTGFzdChzdGF0ZS5vdXRwdXQsICcoJyk7XG4gICAgZGVjcmVtZW50KCdwYXJlbnMnKTtcbiAgfVxuXG4gIHdoaWxlIChzdGF0ZS5icmFjZXMgPiAwKSB7XG4gICAgaWYgKG9wdHMuc3RyaWN0QnJhY2tldHMgPT09IHRydWUpIHRocm93IG5ldyBTeW50YXhFcnJvcihzeW50YXhFcnJvcignY2xvc2luZycsICd9JykpO1xuICAgIHN0YXRlLm91dHB1dCA9IHV0aWxzLmVzY2FwZUxhc3Qoc3RhdGUub3V0cHV0LCAneycpO1xuICAgIGRlY3JlbWVudCgnYnJhY2VzJyk7XG4gIH1cblxuICBpZiAob3B0cy5zdHJpY3RTbGFzaGVzICE9PSB0cnVlICYmIChwcmV2LnR5cGUgPT09ICdzdGFyJyB8fCBwcmV2LnR5cGUgPT09ICdicmFja2V0JykpIHtcbiAgICBwdXNoKHsgdHlwZTogJ21heWJlX3NsYXNoJywgdmFsdWU6ICcnLCBvdXRwdXQ6IGAke1NMQVNIX0xJVEVSQUx9P2AgfSk7XG4gIH1cblxuICAvLyByZWJ1aWxkIHRoZSBvdXRwdXQgaWYgd2UgaGFkIHRvIGJhY2t0cmFjayBhdCBhbnkgcG9pbnRcbiAgaWYgKHN0YXRlLmJhY2t0cmFjayA9PT0gdHJ1ZSkge1xuICAgIHN0YXRlLm91dHB1dCA9ICcnO1xuXG4gICAgZm9yIChjb25zdCB0b2tlbiBvZiBzdGF0ZS50b2tlbnMpIHtcbiAgICAgIHN0YXRlLm91dHB1dCArPSB0b2tlbi5vdXRwdXQgIT0gbnVsbCA/IHRva2VuLm91dHB1dCA6IHRva2VuLnZhbHVlO1xuXG4gICAgICBpZiAodG9rZW4uc3VmZml4KSB7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSB0b2tlbi5zdWZmaXg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuLyoqXG4gKiBGYXN0IHBhdGhzIGZvciBjcmVhdGluZyByZWd1bGFyIGV4cHJlc3Npb25zIGZvciBjb21tb24gZ2xvYiBwYXR0ZXJucy5cbiAqIFRoaXMgY2FuIHNpZ25pZmljYW50bHkgc3BlZWQgdXAgcHJvY2Vzc2luZyBhbmQgaGFzIHZlcnkgbGl0dGxlIGRvd25zaWRlXG4gKiBpbXBhY3Qgd2hlbiBub25lIG9mIHRoZSBmYXN0IHBhdGhzIG1hdGNoLlxuICovXG5cbnBhcnNlLmZhc3RwYXRocyA9IChpbnB1dCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBvcHRzID0geyAuLi5vcHRpb25zIH07XG4gIGNvbnN0IG1heCA9IHR5cGVvZiBvcHRzLm1heExlbmd0aCA9PT0gJ251bWJlcicgPyBNYXRoLm1pbihNQVhfTEVOR1RILCBvcHRzLm1heExlbmd0aCkgOiBNQVhfTEVOR1RIO1xuICBjb25zdCBsZW4gPSBpbnB1dC5sZW5ndGg7XG4gIGlmIChsZW4gPiBtYXgpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYElucHV0IGxlbmd0aDogJHtsZW59LCBleGNlZWRzIG1heGltdW0gYWxsb3dlZCBsZW5ndGg6ICR7bWF4fWApO1xuICB9XG5cbiAgaW5wdXQgPSBSRVBMQUNFTUVOVFNbaW5wdXRdIHx8IGlucHV0O1xuICBjb25zdCB3aW4zMiA9IHV0aWxzLmlzV2luZG93cyhvcHRpb25zKTtcblxuICAvLyBjcmVhdGUgY29uc3RhbnRzIGJhc2VkIG9uIHBsYXRmb3JtLCBmb3Igd2luZG93cyBvciBwb3NpeFxuICBjb25zdCB7XG4gICAgRE9UX0xJVEVSQUwsXG4gICAgU0xBU0hfTElURVJBTCxcbiAgICBPTkVfQ0hBUixcbiAgICBET1RTX1NMQVNILFxuICAgIE5PX0RPVCxcbiAgICBOT19ET1RTLFxuICAgIE5PX0RPVFNfU0xBU0gsXG4gICAgU1RBUixcbiAgICBTVEFSVF9BTkNIT1JcbiAgfSA9IGNvbnN0YW50cy5nbG9iQ2hhcnMod2luMzIpO1xuXG4gIGNvbnN0IG5vZG90ID0gb3B0cy5kb3QgPyBOT19ET1RTIDogTk9fRE9UO1xuICBjb25zdCBzbGFzaERvdCA9IG9wdHMuZG90ID8gTk9fRE9UU19TTEFTSCA6IE5PX0RPVDtcbiAgY29uc3QgY2FwdHVyZSA9IG9wdHMuY2FwdHVyZSA/ICcnIDogJz86JztcbiAgY29uc3Qgc3RhdGUgPSB7IG5lZ2F0ZWQ6IGZhbHNlLCBwcmVmaXg6ICcnIH07XG4gIGxldCBzdGFyID0gb3B0cy5iYXNoID09PSB0cnVlID8gJy4qPycgOiBTVEFSO1xuXG4gIGlmIChvcHRzLmNhcHR1cmUpIHtcbiAgICBzdGFyID0gYCgke3N0YXJ9KWA7XG4gIH1cblxuICBjb25zdCBnbG9ic3RhciA9IG9wdHMgPT4ge1xuICAgIGlmIChvcHRzLm5vZ2xvYnN0YXIgPT09IHRydWUpIHJldHVybiBzdGFyO1xuICAgIHJldHVybiBgKCR7Y2FwdHVyZX0oPzooPyEke1NUQVJUX0FOQ0hPUn0ke29wdHMuZG90ID8gRE9UU19TTEFTSCA6IERPVF9MSVRFUkFMfSkuKSo/KWA7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlID0gc3RyID0+IHtcbiAgICBzd2l0Y2ggKHN0cikge1xuICAgICAgY2FzZSAnKic6XG4gICAgICAgIHJldHVybiBgJHtub2RvdH0ke09ORV9DSEFSfSR7c3Rhcn1gO1xuXG4gICAgICBjYXNlICcuKic6XG4gICAgICAgIHJldHVybiBgJHtET1RfTElURVJBTH0ke09ORV9DSEFSfSR7c3Rhcn1gO1xuXG4gICAgICBjYXNlICcqLionOlxuICAgICAgICByZXR1cm4gYCR7bm9kb3R9JHtzdGFyfSR7RE9UX0xJVEVSQUx9JHtPTkVfQ0hBUn0ke3N0YXJ9YDtcblxuICAgICAgY2FzZSAnKi8qJzpcbiAgICAgICAgcmV0dXJuIGAke25vZG90fSR7c3Rhcn0ke1NMQVNIX0xJVEVSQUx9JHtPTkVfQ0hBUn0ke3NsYXNoRG90fSR7c3Rhcn1gO1xuXG4gICAgICBjYXNlICcqKic6XG4gICAgICAgIHJldHVybiBub2RvdCArIGdsb2JzdGFyKG9wdHMpO1xuXG4gICAgICBjYXNlICcqKi8qJzpcbiAgICAgICAgcmV0dXJuIGAoPzoke25vZG90fSR7Z2xvYnN0YXIob3B0cyl9JHtTTEFTSF9MSVRFUkFMfSk/JHtzbGFzaERvdH0ke09ORV9DSEFSfSR7c3Rhcn1gO1xuXG4gICAgICBjYXNlICcqKi8qLionOlxuICAgICAgICByZXR1cm4gYCg/OiR7bm9kb3R9JHtnbG9ic3RhcihvcHRzKX0ke1NMQVNIX0xJVEVSQUx9KT8ke3NsYXNoRG90fSR7c3Rhcn0ke0RPVF9MSVRFUkFMfSR7T05FX0NIQVJ9JHtzdGFyfWA7XG5cbiAgICAgIGNhc2UgJyoqLy4qJzpcbiAgICAgICAgcmV0dXJuIGAoPzoke25vZG90fSR7Z2xvYnN0YXIob3B0cyl9JHtTTEFTSF9MSVRFUkFMfSk/JHtET1RfTElURVJBTH0ke09ORV9DSEFSfSR7c3Rhcn1gO1xuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gL14oLio/KVxcLihcXHcrKSQvLmV4ZWMoc3RyKTtcbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IGNyZWF0ZShtYXRjaFsxXSk7XG4gICAgICAgIGlmICghc291cmNlKSByZXR1cm47XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZSArIERPVF9MSVRFUkFMICsgbWF0Y2hbMl07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG91dHB1dCA9IHV0aWxzLnJlbW92ZVByZWZpeChpbnB1dCwgc3RhdGUpO1xuICBsZXQgc291cmNlID0gY3JlYXRlKG91dHB1dCk7XG5cbiAgaWYgKHNvdXJjZSAmJiBvcHRzLnN0cmljdFNsYXNoZXMgIT09IHRydWUpIHtcbiAgICBzb3VyY2UgKz0gYCR7U0xBU0hfTElURVJBTH0/YDtcbiAgfVxuXG4gIHJldHVybiBzb3VyY2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHNjYW4gPSByZXF1aXJlKCcuL3NjYW4nKTtcbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5jb25zdCBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuY29uc3QgaXNPYmplY3QgPSB2YWwgPT4gdmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbCk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hdGNoZXIgZnVuY3Rpb24gZnJvbSBvbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zLiBUaGVcbiAqIHJldHVybmVkIGZ1bmN0aW9uIHRha2VzIGEgc3RyaW5nIHRvIG1hdGNoIGFzIGl0cyBmaXJzdCBhcmd1bWVudCxcbiAqIGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIHN0cmluZyBpcyBhIG1hdGNoLiBUaGUgcmV0dXJuZWQgbWF0Y2hlclxuICogZnVuY3Rpb24gYWxzbyB0YWtlcyBhIGJvb2xlYW4gYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0aGF0LCB3aGVuIHRydWUsXG4gKiByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoKGdsb2JbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc3QgaXNNYXRjaCA9IHBpY29tYXRjaCgnKi4hKCphKScpO1xuICogY29uc29sZS5sb2coaXNNYXRjaCgnYS5hJykpOyAvLz0+IGZhbHNlXG4gKiBjb25zb2xlLmxvZyhpc01hdGNoKCdhLmInKSk7IC8vPT4gdHJ1ZVxuICogYGBgXG4gKiBAbmFtZSBwaWNvbWF0Y2hcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBgZ2xvYnNgIE9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMuXG4gKiBAcGFyYW0ge09iamVjdD19IGBvcHRpb25zYFxuICogQHJldHVybiB7RnVuY3Rpb249fSBSZXR1cm5zIGEgbWF0Y2hlciBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuY29uc3QgcGljb21hdGNoID0gKGdsb2IsIG9wdGlvbnMsIHJldHVyblN0YXRlID0gZmFsc2UpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZ2xvYikpIHtcbiAgICBjb25zdCBmbnMgPSBnbG9iLm1hcChpbnB1dCA9PiBwaWNvbWF0Y2goaW5wdXQsIG9wdGlvbnMsIHJldHVyblN0YXRlKSk7XG4gICAgY29uc3QgYXJyYXlNYXRjaGVyID0gc3RyID0+IHtcbiAgICAgIGZvciAoY29uc3QgaXNNYXRjaCBvZiBmbnMpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBpc01hdGNoKHN0cik7XG4gICAgICAgIGlmIChzdGF0ZSkgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5TWF0Y2hlcjtcbiAgfVxuXG4gIGNvbnN0IGlzU3RhdGUgPSBpc09iamVjdChnbG9iKSAmJiBnbG9iLnRva2VucyAmJiBnbG9iLmlucHV0O1xuXG4gIGlmIChnbG9iID09PSAnJyB8fCAodHlwZW9mIGdsb2IgIT09ICdzdHJpbmcnICYmICFpc1N0YXRlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHBhdHRlcm4gdG8gYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gIH1cblxuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgcG9zaXggPSB1dGlscy5pc1dpbmRvd3Mob3B0aW9ucyk7XG4gIGNvbnN0IHJlZ2V4ID0gaXNTdGF0ZVxuICAgID8gcGljb21hdGNoLmNvbXBpbGVSZShnbG9iLCBvcHRpb25zKVxuICAgIDogcGljb21hdGNoLm1ha2VSZShnbG9iLCBvcHRpb25zLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgY29uc3Qgc3RhdGUgPSByZWdleC5zdGF0ZTtcbiAgZGVsZXRlIHJlZ2V4LnN0YXRlO1xuXG4gIGxldCBpc0lnbm9yZWQgPSAoKSA9PiBmYWxzZTtcbiAgaWYgKG9wdHMuaWdub3JlKSB7XG4gICAgY29uc3QgaWdub3JlT3B0cyA9IHsgLi4ub3B0aW9ucywgaWdub3JlOiBudWxsLCBvbk1hdGNoOiBudWxsLCBvblJlc3VsdDogbnVsbCB9O1xuICAgIGlzSWdub3JlZCA9IHBpY29tYXRjaChvcHRzLmlnbm9yZSwgaWdub3JlT3B0cywgcmV0dXJuU3RhdGUpO1xuICB9XG5cbiAgY29uc3QgbWF0Y2hlciA9IChpbnB1dCwgcmV0dXJuT2JqZWN0ID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCB7IGlzTWF0Y2gsIG1hdGNoLCBvdXRwdXQgfSA9IHBpY29tYXRjaC50ZXN0KGlucHV0LCByZWdleCwgb3B0aW9ucywgeyBnbG9iLCBwb3NpeCB9KTtcbiAgICBjb25zdCByZXN1bHQgPSB7IGdsb2IsIHN0YXRlLCByZWdleCwgcG9zaXgsIGlucHV0LCBvdXRwdXQsIG1hdGNoLCBpc01hdGNoIH07XG5cbiAgICBpZiAodHlwZW9mIG9wdHMub25SZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9wdHMub25SZXN1bHQocmVzdWx0KTtcbiAgICB9XG5cbiAgICBpZiAoaXNNYXRjaCA9PT0gZmFsc2UpIHtcbiAgICAgIHJlc3VsdC5pc01hdGNoID0gZmFsc2U7XG4gICAgICByZXR1cm4gcmV0dXJuT2JqZWN0ID8gcmVzdWx0IDogZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzSWdub3JlZChpbnB1dCkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0cy5vbklnbm9yZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcHRzLm9uSWdub3JlKHJlc3VsdCk7XG4gICAgICB9XG4gICAgICByZXN1bHQuaXNNYXRjaCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHJldHVybk9iamVjdCA/IHJlc3VsdCA6IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0cy5vbk1hdGNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRzLm9uTWF0Y2gocmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybk9iamVjdCA/IHJlc3VsdCA6IHRydWU7XG4gIH07XG5cbiAgaWYgKHJldHVyblN0YXRlKSB7XG4gICAgbWF0Y2hlci5zdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgcmV0dXJuIG1hdGNoZXI7XG59O1xuXG4vKipcbiAqIFRlc3QgYGlucHV0YCB3aXRoIHRoZSBnaXZlbiBgcmVnZXhgLiBUaGlzIGlzIHVzZWQgYnkgdGhlIG1haW5cbiAqIGBwaWNvbWF0Y2goKWAgZnVuY3Rpb24gdG8gdGVzdCB0aGUgaW5wdXQgc3RyaW5nLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIC8vIHBpY29tYXRjaC50ZXN0KGlucHV0LCByZWdleFssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhwaWNvbWF0Y2gudGVzdCgnZm9vL2JhcicsIC9eKD86KFteL10qPylcXC8oW14vXSo/KSkkLykpO1xuICogLy8geyBpc01hdGNoOiB0cnVlLCBtYXRjaDogWyAnZm9vLycsICdmb28nLCAnYmFyJyBdLCBvdXRwdXQ6ICdmb28vYmFyJyB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgaW5wdXRgIFN0cmluZyB0byB0ZXN0LlxuICogQHBhcmFtIHtSZWdFeHB9IGByZWdleGBcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBtYXRjaGluZyBpbmZvLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5waWNvbWF0Y2gudGVzdCA9IChpbnB1dCwgcmVnZXgsIG9wdGlvbnMsIHsgZ2xvYiwgcG9zaXggfSA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgaW5wdXQgdG8gYmUgYSBzdHJpbmcnKTtcbiAgfVxuXG4gIGlmIChpbnB1dCA9PT0gJycpIHtcbiAgICByZXR1cm4geyBpc01hdGNoOiBmYWxzZSwgb3V0cHV0OiAnJyB9O1xuICB9XG5cbiAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IGZvcm1hdCA9IG9wdHMuZm9ybWF0IHx8IChwb3NpeCA/IHV0aWxzLnRvUG9zaXhTbGFzaGVzIDogbnVsbCk7XG4gIGxldCBtYXRjaCA9IGlucHV0ID09PSBnbG9iO1xuICBsZXQgb3V0cHV0ID0gKG1hdGNoICYmIGZvcm1hdCkgPyBmb3JtYXQoaW5wdXQpIDogaW5wdXQ7XG5cbiAgaWYgKG1hdGNoID09PSBmYWxzZSkge1xuICAgIG91dHB1dCA9IGZvcm1hdCA/IGZvcm1hdChpbnB1dCkgOiBpbnB1dDtcbiAgICBtYXRjaCA9IG91dHB1dCA9PT0gZ2xvYjtcbiAgfVxuXG4gIGlmIChtYXRjaCA9PT0gZmFsc2UgfHwgb3B0cy5jYXB0dXJlID09PSB0cnVlKSB7XG4gICAgaWYgKG9wdHMubWF0Y2hCYXNlID09PSB0cnVlIHx8IG9wdHMuYmFzZW5hbWUgPT09IHRydWUpIHtcbiAgICAgIG1hdGNoID0gcGljb21hdGNoLm1hdGNoQmFzZShpbnB1dCwgcmVnZXgsIG9wdGlvbnMsIHBvc2l4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0Y2ggPSByZWdleC5leGVjKG91dHB1dCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXNNYXRjaDogQm9vbGVhbihtYXRjaCksIG1hdGNoLCBvdXRwdXQgfTtcbn07XG5cbi8qKlxuICogTWF0Y2ggdGhlIGJhc2VuYW1lIG9mIGEgZmlsZXBhdGguXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoLm1hdGNoQmFzZShpbnB1dCwgZ2xvYlssIG9wdGlvbnNdKTtcbiAqIGNvbnNvbGUubG9nKHBpY29tYXRjaC5tYXRjaEJhc2UoJ2Zvby9iYXIuanMnLCAnKi5qcycpOyAvLyB0cnVlXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgaW5wdXRgIFN0cmluZyB0byB0ZXN0LlxuICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSBgZ2xvYmAgR2xvYiBwYXR0ZXJuIG9yIHJlZ2V4IGNyZWF0ZWQgYnkgWy5tYWtlUmVdKCNtYWtlUmUpLlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLm1hdGNoQmFzZSA9IChpbnB1dCwgZ2xvYiwgb3B0aW9ucywgcG9zaXggPSB1dGlscy5pc1dpbmRvd3Mob3B0aW9ucykpID0+IHtcbiAgY29uc3QgcmVnZXggPSBnbG9iIGluc3RhbmNlb2YgUmVnRXhwID8gZ2xvYiA6IHBpY29tYXRjaC5tYWtlUmUoZ2xvYiwgb3B0aW9ucyk7XG4gIHJldHVybiByZWdleC50ZXN0KHBhdGguYmFzZW5hbWUoaW5wdXQpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmICoqYW55Kiogb2YgdGhlIGdpdmVuIGdsb2IgYHBhdHRlcm5zYCBtYXRjaCB0aGUgc3BlY2lmaWVkIGBzdHJpbmdgLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIC8vIHBpY29tYXRjaC5pc01hdGNoKHN0cmluZywgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cocGljb21hdGNoLmlzTWF0Y2goJ2EuYScsIFsnYi4qJywgJyouYSddKSk7IC8vPT4gdHJ1ZVxuICogY29uc29sZS5sb2cocGljb21hdGNoLmlzTWF0Y2goJ2EuYScsICdiLionKSk7IC8vPT4gZmFsc2VcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IHN0ciBUaGUgc3RyaW5nIHRvIHRlc3QuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gcGF0dGVybnMgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJucyB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucykuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYW55IHBhdHRlcm5zIG1hdGNoIGBzdHJgXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5pc01hdGNoID0gKHN0ciwgcGF0dGVybnMsIG9wdGlvbnMpID0+IHBpY29tYXRjaChwYXR0ZXJucywgb3B0aW9ucykoc3RyKTtcblxuLyoqXG4gKiBQYXJzZSBhIGdsb2IgcGF0dGVybiB0byBjcmVhdGUgdGhlIHNvdXJjZSBzdHJpbmcgZm9yIGEgcmVndWxhclxuICogZXhwcmVzc2lvbi5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiBjb25zdCByZXN1bHQgPSBwaWNvbWF0Y2gucGFyc2UocGF0dGVyblssIG9wdGlvbnNdKTtcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBwYXR0ZXJuYFxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIHVzZWZ1bCBwcm9wZXJ0aWVzIGFuZCBvdXRwdXQgdG8gYmUgdXNlZCBhcyBhIHJlZ2V4IHNvdXJjZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5wYXJzZSA9IChwYXR0ZXJuLCBvcHRpb25zKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBhdHRlcm4pKSByZXR1cm4gcGF0dGVybi5tYXAocCA9PiBwaWNvbWF0Y2gucGFyc2UocCwgb3B0aW9ucykpO1xuICByZXR1cm4gcGFyc2UocGF0dGVybiwgeyAuLi5vcHRpb25zLCBmYXN0cGF0aHM6IGZhbHNlIH0pO1xufTtcblxuLyoqXG4gKiBTY2FuIGEgZ2xvYiBwYXR0ZXJuIHRvIHNlcGFyYXRlIHRoZSBwYXR0ZXJuIGludG8gc2VnbWVudHMuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoLnNjYW4oaW5wdXRbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc3QgcmVzdWx0ID0gcGljb21hdGNoLnNjYW4oJyEuL2Zvby8qLmpzJyk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICogeyBwcmVmaXg6ICchLi8nLFxuICogICBpbnB1dDogJyEuL2Zvby8qLmpzJyxcbiAqICAgc3RhcnQ6IDMsXG4gKiAgIGJhc2U6ICdmb28nLFxuICogICBnbG9iOiAnKi5qcycsXG4gKiAgIGlzQnJhY2U6IGZhbHNlLFxuICogICBpc0JyYWNrZXQ6IGZhbHNlLFxuICogICBpc0dsb2I6IHRydWUsXG4gKiAgIGlzRXh0Z2xvYjogZmFsc2UsXG4gKiAgIGlzR2xvYnN0YXI6IGZhbHNlLFxuICogICBuZWdhdGVkOiB0cnVlIH1cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBpbnB1dGAgR2xvYiBwYXR0ZXJuIHRvIHNjYW4uXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdpdGhcbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLnNjYW4gPSAoaW5wdXQsIG9wdGlvbnMpID0+IHNjYW4oaW5wdXQsIG9wdGlvbnMpO1xuXG4vKipcbiAqIENvbXBpbGUgYSByZWd1bGFyIGV4cHJlc3Npb24gZnJvbSB0aGUgYHN0YXRlYCBvYmplY3QgcmV0dXJuZWQgYnkgdGhlXG4gKiBbcGFyc2UoKV0oI3BhcnNlKSBtZXRob2QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGBzdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYHJldHVybk91dHB1dGAgSW50ZW5kZWQgZm9yIGltcGxlbWVudG9ycywgdGhpcyBhcmd1bWVudCBhbGxvd3MgeW91IHRvIHJldHVybiB0aGUgcmF3IG91dHB1dCBmcm9tIHRoZSBwYXJzZXIuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGByZXR1cm5TdGF0ZWAgQWRkcyB0aGUgc3RhdGUgdG8gYSBgc3RhdGVgIHByb3BlcnR5IG9uIHRoZSByZXR1cm5lZCByZWdleC4gVXNlZnVsIGZvciBpbXBsZW1lbnRvcnMgYW5kIGRlYnVnZ2luZy5cbiAqIEByZXR1cm4ge1JlZ0V4cH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLmNvbXBpbGVSZSA9IChzdGF0ZSwgb3B0aW9ucywgcmV0dXJuT3V0cHV0ID0gZmFsc2UsIHJldHVyblN0YXRlID0gZmFsc2UpID0+IHtcbiAgaWYgKHJldHVybk91dHB1dCA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBzdGF0ZS5vdXRwdXQ7XG4gIH1cblxuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgcHJlcGVuZCA9IG9wdHMuY29udGFpbnMgPyAnJyA6ICdeJztcbiAgY29uc3QgYXBwZW5kID0gb3B0cy5jb250YWlucyA/ICcnIDogJyQnO1xuXG4gIGxldCBzb3VyY2UgPSBgJHtwcmVwZW5kfSg/OiR7c3RhdGUub3V0cHV0fSkke2FwcGVuZH1gO1xuICBpZiAoc3RhdGUgJiYgc3RhdGUubmVnYXRlZCA9PT0gdHJ1ZSkge1xuICAgIHNvdXJjZSA9IGBeKD8hJHtzb3VyY2V9KS4qJGA7XG4gIH1cblxuICBjb25zdCByZWdleCA9IHBpY29tYXRjaC50b1JlZ2V4KHNvdXJjZSwgb3B0aW9ucyk7XG4gIGlmIChyZXR1cm5TdGF0ZSA9PT0gdHJ1ZSkge1xuICAgIHJlZ2V4LnN0YXRlID0gc3RhdGU7XG4gIH1cblxuICByZXR1cm4gcmVnZXg7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmcm9tIGEgcGFyc2VkIGdsb2IgcGF0dGVybi5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiBjb25zdCBzdGF0ZSA9IHBpY29tYXRjaC5wYXJzZSgnKi5qcycpO1xuICogLy8gcGljb21hdGNoLmNvbXBpbGVSZShzdGF0ZVssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhwaWNvbWF0Y2guY29tcGlsZVJlKHN0YXRlKSk7XG4gKiAvLz0+IC9eKD86KD8hXFwuKSg/PS4pW14vXSo/XFwuanMpJC9cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBzdGF0ZWAgVGhlIG9iamVjdCByZXR1cm5lZCBmcm9tIHRoZSBgLnBhcnNlYCBtZXRob2QuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGByZXR1cm5PdXRwdXRgIEltcGxlbWVudG9ycyBtYXkgdXNlIHRoaXMgYXJndW1lbnQgdG8gcmV0dXJuIHRoZSBjb21waWxlZCBvdXRwdXQsIGluc3RlYWQgb2YgYSByZWd1bGFyIGV4cHJlc3Npb24uIFRoaXMgaXMgbm90IGV4cG9zZWQgb24gdGhlIG9wdGlvbnMgdG8gcHJldmVudCBlbmQtdXNlcnMgZnJvbSBtdXRhdGluZyB0aGUgcmVzdWx0LlxuICogQHBhcmFtIHtCb29sZWFufSBgcmV0dXJuU3RhdGVgIEltcGxlbWVudG9ycyBtYXkgdXNlIHRoaXMgYXJndW1lbnQgdG8gcmV0dXJuIHRoZSBzdGF0ZSBmcm9tIHRoZSBwYXJzZWQgZ2xvYiB3aXRoIHRoZSByZXR1cm5lZCByZWd1bGFyIGV4cHJlc3Npb24uXG4gKiBAcmV0dXJuIHtSZWdFeHB9IFJldHVybnMgYSByZWdleCBjcmVhdGVkIGZyb20gdGhlIGdpdmVuIHBhdHRlcm4uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5tYWtlUmUgPSAoaW5wdXQsIG9wdGlvbnMgPSB7fSwgcmV0dXJuT3V0cHV0ID0gZmFsc2UsIHJldHVyblN0YXRlID0gZmFsc2UpID0+IHtcbiAgaWYgKCFpbnB1dCB8fCB0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gIH1cblxuICBsZXQgcGFyc2VkID0geyBuZWdhdGVkOiBmYWxzZSwgZmFzdHBhdGhzOiB0cnVlIH07XG5cbiAgaWYgKG9wdGlvbnMuZmFzdHBhdGhzICE9PSBmYWxzZSAmJiAoaW5wdXRbMF0gPT09ICcuJyB8fCBpbnB1dFswXSA9PT0gJyonKSkge1xuICAgIHBhcnNlZC5vdXRwdXQgPSBwYXJzZS5mYXN0cGF0aHMoaW5wdXQsIG9wdGlvbnMpO1xuICB9XG5cbiAgaWYgKCFwYXJzZWQub3V0cHV0KSB7XG4gICAgcGFyc2VkID0gcGFyc2UoaW5wdXQsIG9wdGlvbnMpO1xuICB9XG5cbiAgcmV0dXJuIHBpY29tYXRjaC5jb21waWxlUmUocGFyc2VkLCBvcHRpb25zLCByZXR1cm5PdXRwdXQsIHJldHVyblN0YXRlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgcmVndWxhciBleHByZXNzaW9uIGZyb20gdGhlIGdpdmVuIHJlZ2V4IHNvdXJjZSBzdHJpbmcuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoLnRvUmVnZXgoc291cmNlWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnN0IHsgb3V0cHV0IH0gPSBwaWNvbWF0Y2gucGFyc2UoJyouanMnKTtcbiAqIGNvbnNvbGUubG9nKHBpY29tYXRjaC50b1JlZ2V4KG91dHB1dCkpO1xuICogLy89PiAvXig/Oig/IVxcLikoPz0uKVteL10qP1xcLmpzKSQvXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc291cmNlYCBSZWd1bGFyIGV4cHJlc3Npb24gc291cmNlIHN0cmluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge1JlZ0V4cH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLnRvUmVnZXggPSAoc291cmNlLCBvcHRpb25zKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoc291cmNlLCBvcHRzLmZsYWdzIHx8IChvcHRzLm5vY2FzZSA/ICdpJyA6ICcnKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZGVidWcgPT09IHRydWUpIHRocm93IGVycjtcbiAgICByZXR1cm4gLyReLztcbiAgfVxufTtcblxuLyoqXG4gKiBQaWNvbWF0Y2ggY29uc3RhbnRzLlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbnBpY29tYXRjaC5jb25zdGFudHMgPSBjb25zdGFudHM7XG5cbi8qKlxuICogRXhwb3NlIFwicGljb21hdGNoXCJcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBpY29tYXRjaDtcbiIsICIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvcGljb21hdGNoJyk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgYnJhY2VzID0gcmVxdWlyZSgnYnJhY2VzJyk7XG5jb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgncGljb21hdGNoL2xpYi91dGlscycpO1xuXG5jb25zdCBpc0VtcHR5U3RyaW5nID0gdiA9PiB2ID09PSAnJyB8fCB2ID09PSAnLi8nO1xuY29uc3QgaGFzQnJhY2VzID0gdiA9PiB7XG4gIGNvbnN0IGluZGV4ID0gdi5pbmRleE9mKCd7Jyk7XG4gIHJldHVybiBpbmRleCA+IC0xICYmIHYuaW5kZXhPZignfScsIGluZGV4KSA+IC0xO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIHN0cmluZ3MgdGhhdCBtYXRjaCBvbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtbSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIC8vIG1tKGxpc3QsIHBhdHRlcm5zWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKG1tKFsnYS5qcycsICdhLnR4dCddLCBbJyouanMnXSkpO1xuICogLy89PiBbICdhLmpzJyBdXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5PHN0cmluZz59IGBsaXN0YCBMaXN0IG9mIHN0cmluZ3MgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheTxzdHJpbmc+fSBgcGF0dGVybnNgIE9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMgdG8gdXNlIGZvciBtYXRjaGluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2AgU2VlIGF2YWlsYWJsZSBbb3B0aW9uc10oI29wdGlvbnMpXG4gKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiBtYXRjaGVzXG4gKiBAc3VtbWFyeSBmYWxzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5jb25zdCBtaWNyb21hdGNoID0gKGxpc3QsIHBhdHRlcm5zLCBvcHRpb25zKSA9PiB7XG4gIHBhdHRlcm5zID0gW10uY29uY2F0KHBhdHRlcm5zKTtcbiAgbGlzdCA9IFtdLmNvbmNhdChsaXN0KTtcblxuICBsZXQgb21pdCA9IG5ldyBTZXQoKTtcbiAgbGV0IGtlZXAgPSBuZXcgU2V0KCk7XG4gIGxldCBpdGVtcyA9IG5ldyBTZXQoKTtcbiAgbGV0IG5lZ2F0aXZlcyA9IDA7XG5cbiAgbGV0IG9uUmVzdWx0ID0gc3RhdGUgPT4ge1xuICAgIGl0ZW1zLmFkZChzdGF0ZS5vdXRwdXQpO1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMub25SZXN1bHQpIHtcbiAgICAgIG9wdGlvbnMub25SZXN1bHQoc3RhdGUpO1xuICAgIH1cbiAgfTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdHRlcm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGlzTWF0Y2ggPSBwaWNvbWF0Y2goU3RyaW5nKHBhdHRlcm5zW2ldKSwgeyAuLi5vcHRpb25zLCBvblJlc3VsdCB9LCB0cnVlKTtcbiAgICBsZXQgbmVnYXRlZCA9IGlzTWF0Y2guc3RhdGUubmVnYXRlZCB8fCBpc01hdGNoLnN0YXRlLm5lZ2F0ZWRFeHRnbG9iO1xuICAgIGlmIChuZWdhdGVkKSBuZWdhdGl2ZXMrKztcblxuICAgIGZvciAobGV0IGl0ZW0gb2YgbGlzdCkge1xuICAgICAgbGV0IG1hdGNoZWQgPSBpc01hdGNoKGl0ZW0sIHRydWUpO1xuXG4gICAgICBsZXQgbWF0Y2ggPSBuZWdhdGVkID8gIW1hdGNoZWQuaXNNYXRjaCA6IG1hdGNoZWQuaXNNYXRjaDtcbiAgICAgIGlmICghbWF0Y2gpIGNvbnRpbnVlO1xuXG4gICAgICBpZiAobmVnYXRlZCkge1xuICAgICAgICBvbWl0LmFkZChtYXRjaGVkLm91dHB1dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbWl0LmRlbGV0ZShtYXRjaGVkLm91dHB1dCk7XG4gICAgICAgIGtlZXAuYWRkKG1hdGNoZWQub3V0cHV0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgcmVzdWx0ID0gbmVnYXRpdmVzID09PSBwYXR0ZXJucy5sZW5ndGggPyBbLi4uaXRlbXNdIDogWy4uLmtlZXBdO1xuICBsZXQgbWF0Y2hlcyA9IHJlc3VsdC5maWx0ZXIoaXRlbSA9PiAhb21pdC5oYXMoaXRlbSkpO1xuXG4gIGlmIChvcHRpb25zICYmIG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKG9wdGlvbnMuZmFpbGdsb2IgPT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbWF0Y2hlcyBmb3VuZCBmb3IgXCIke3BhdHRlcm5zLmpvaW4oJywgJyl9XCJgKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5ub251bGwgPT09IHRydWUgfHwgb3B0aW9ucy5udWxsZ2xvYiA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudW5lc2NhcGUgPyBwYXR0ZXJucy5tYXAocCA9PiBwLnJlcGxhY2UoL1xcXFwvZywgJycpKSA6IHBhdHRlcm5zO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXRjaGVzO1xufTtcblxuLyoqXG4gKiBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICovXG5cbm1pY3JvbWF0Y2gubWF0Y2ggPSBtaWNyb21hdGNoO1xuXG4vKipcbiAqIFJldHVybnMgYSBtYXRjaGVyIGZ1bmN0aW9uIGZyb20gdGhlIGdpdmVuIGdsb2IgYHBhdHRlcm5gIGFuZCBgb3B0aW9uc2AuXG4gKiBUaGUgcmV0dXJuZWQgZnVuY3Rpb24gdGFrZXMgYSBzdHJpbmcgdG8gbWF0Y2ggYXMgaXRzIG9ubHkgYXJndW1lbnQgYW5kIHJldHVybnNcbiAqIHRydWUgaWYgdGhlIHN0cmluZyBpcyBhIG1hdGNoLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBtbSA9IHJlcXVpcmUoJ21pY3JvbWF0Y2gnKTtcbiAqIC8vIG1tLm1hdGNoZXIocGF0dGVyblssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zdCBpc01hdGNoID0gbW0ubWF0Y2hlcignKi4hKCphKScpO1xuICogY29uc29sZS5sb2coaXNNYXRjaCgnYS5hJykpOyAvLz0+IGZhbHNlXG4gKiBjb25zb2xlLmxvZyhpc01hdGNoKCdhLmInKSk7IC8vPT4gdHJ1ZVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHBhdHRlcm5gIEdsb2IgcGF0dGVyblxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7RnVuY3Rpb259IFJldHVybnMgYSBtYXRjaGVyIGZ1bmN0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLm1hdGNoZXIgPSAocGF0dGVybiwgb3B0aW9ucykgPT4gcGljb21hdGNoKHBhdHRlcm4sIG9wdGlvbnMpO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiAqKmFueSoqIG9mIHRoZSBnaXZlbiBnbG9iIGBwYXR0ZXJuc2AgbWF0Y2ggdGhlIHNwZWNpZmllZCBgc3RyaW5nYC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5pc01hdGNoKHN0cmluZywgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cobW0uaXNNYXRjaCgnYS5hJywgWydiLionLCAnKi5hJ10pKTsgLy89PiB0cnVlXG4gKiBjb25zb2xlLmxvZyhtbS5pc01hdGNoKCdhLmEnLCAnYi4qJykpOyAvLz0+IGZhbHNlXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc3RyYCBUaGUgc3RyaW5nIHRvIHRlc3QuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYHBhdHRlcm5zYCBPbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zIHRvIHVzZSBmb3IgbWF0Y2hpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gYFtvcHRpb25zXWAgU2VlIGF2YWlsYWJsZSBbb3B0aW9uc10oI29wdGlvbnMpLlxuICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGFueSBwYXR0ZXJucyBtYXRjaCBgc3RyYFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLmlzTWF0Y2ggPSAoc3RyLCBwYXR0ZXJucywgb3B0aW9ucykgPT4gcGljb21hdGNoKHBhdHRlcm5zLCBvcHRpb25zKShzdHIpO1xuXG4vKipcbiAqIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gKi9cblxubWljcm9tYXRjaC5hbnkgPSBtaWNyb21hdGNoLmlzTWF0Y2g7XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2Ygc3RyaW5ncyB0aGF0IF8qKmRvIG5vdCBtYXRjaCBhbnkqKl8gb2YgdGhlIGdpdmVuIGBwYXR0ZXJuc2AuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IG1tID0gcmVxdWlyZSgnbWljcm9tYXRjaCcpO1xuICogLy8gbW0ubm90KGxpc3QsIHBhdHRlcm5zWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKG1tLm5vdChbJ2EuYScsICdiLmInLCAnYy5jJ10sICcqLmEnKSk7XG4gKiAvLz0+IFsnYi5iJywgJ2MuYyddXG4gKiBgYGBcbiAqIEBwYXJhbSB7QXJyYXl9IGBsaXN0YCBBcnJheSBvZiBzdHJpbmdzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGBwYXR0ZXJuc2AgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJuIHRvIHVzZSBmb3IgbWF0Y2hpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgIFNlZSBhdmFpbGFibGUgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgY2hhbmdpbmcgaG93IG1hdGNoZXMgYXJlIHBlcmZvcm1lZFxuICogQHJldHVybiB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2Ygc3RyaW5ncyB0aGF0ICoqZG8gbm90IG1hdGNoKiogdGhlIGdpdmVuIHBhdHRlcm5zLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLm5vdCA9IChsaXN0LCBwYXR0ZXJucywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIHBhdHRlcm5zID0gW10uY29uY2F0KHBhdHRlcm5zKS5tYXAoU3RyaW5nKTtcbiAgbGV0IHJlc3VsdCA9IG5ldyBTZXQoKTtcbiAgbGV0IGl0ZW1zID0gW107XG5cbiAgbGV0IG9uUmVzdWx0ID0gc3RhdGUgPT4ge1xuICAgIGlmIChvcHRpb25zLm9uUmVzdWx0KSBvcHRpb25zLm9uUmVzdWx0KHN0YXRlKTtcbiAgICBpdGVtcy5wdXNoKHN0YXRlLm91dHB1dCk7XG4gIH07XG5cbiAgbGV0IG1hdGNoZXMgPSBuZXcgU2V0KG1pY3JvbWF0Y2gobGlzdCwgcGF0dGVybnMsIHsgLi4ub3B0aW9ucywgb25SZXN1bHQgfSkpO1xuXG4gIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBpZiAoIW1hdGNoZXMuaGFzKGl0ZW0pKSB7XG4gICAgICByZXN1bHQuYWRkKGl0ZW0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gWy4uLnJlc3VsdF07XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gYHN0cmluZ2AgY29udGFpbnMgdGhlIGdpdmVuIHBhdHRlcm4uIFNpbWlsYXJcbiAqIHRvIFsuaXNNYXRjaF0oI2lzTWF0Y2gpIGJ1dCB0aGUgcGF0dGVybiBjYW4gbWF0Y2ggYW55IHBhcnQgb2YgdGhlIHN0cmluZy5cbiAqXG4gKiBgYGBqc1xuICogdmFyIG1tID0gcmVxdWlyZSgnbWljcm9tYXRjaCcpO1xuICogLy8gbW0uY29udGFpbnMoc3RyaW5nLCBwYXR0ZXJuWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKG1tLmNvbnRhaW5zKCdhYS9iYi9jYycsICcqYicpKTtcbiAqIC8vPT4gdHJ1ZVxuICogY29uc29sZS5sb2cobW0uY29udGFpbnMoJ2FhL2JiL2NjJywgJypkJykpO1xuICogLy89PiBmYWxzZVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHN0cmAgVGhlIHN0cmluZyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBgcGF0dGVybnNgIEdsb2IgcGF0dGVybiB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIGNoYW5naW5nIGhvdyBtYXRjaGVzIGFyZSBwZXJmb3JtZWRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhbnkgb2YgdGhlIHBhdHRlcm5zIG1hdGNoZXMgYW55IHBhcnQgb2YgYHN0cmAuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2guY29udGFpbnMgPSAoc3RyLCBwYXR0ZXJuLCBvcHRpb25zKSA9PiB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIGEgc3RyaW5nOiBcIiR7dXRpbC5pbnNwZWN0KHN0cil9XCJgKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHBhdHRlcm4pKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4uc29tZShwID0+IG1pY3JvbWF0Y2guY29udGFpbnMoc3RyLCBwLCBvcHRpb25zKSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGlzRW1wdHlTdHJpbmcoc3RyKSB8fCBpc0VtcHR5U3RyaW5nKHBhdHRlcm4pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHN0ci5pbmNsdWRlcyhwYXR0ZXJuKSB8fCAoc3RyLnN0YXJ0c1dpdGgoJy4vJykgJiYgc3RyLnNsaWNlKDIpLmluY2x1ZGVzKHBhdHRlcm4pKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1pY3JvbWF0Y2guaXNNYXRjaChzdHIsIHBhdHRlcm4sIHsgLi4ub3B0aW9ucywgY29udGFpbnM6IHRydWUgfSk7XG59O1xuXG4vKipcbiAqIEZpbHRlciB0aGUga2V5cyBvZiB0aGUgZ2l2ZW4gb2JqZWN0IHdpdGggdGhlIGdpdmVuIGBnbG9iYCBwYXR0ZXJuXG4gKiBhbmQgYG9wdGlvbnNgLiBEb2VzIG5vdCBhdHRlbXB0IHRvIG1hdGNoIG5lc3RlZCBrZXlzLiBJZiB5b3UgbmVlZCB0aGlzIGZlYXR1cmUsXG4gKiB1c2UgW2dsb2Itb2JqZWN0XVtdIGluc3RlYWQuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IG1tID0gcmVxdWlyZSgnbWljcm9tYXRjaCcpO1xuICogLy8gbW0ubWF0Y2hLZXlzKG9iamVjdCwgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc3Qgb2JqID0geyBhYTogJ2EnLCBhYjogJ2InLCBhYzogJ2MnIH07XG4gKiBjb25zb2xlLmxvZyhtbS5tYXRjaEtleXMob2JqLCAnKmInKSk7XG4gKiAvLz0+IHsgYWI6ICdiJyB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb2JqZWN0YCBUaGUgb2JqZWN0IHdpdGgga2V5cyB0byBmaWx0ZXIuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYHBhdHRlcm5zYCBPbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zIHRvIHVzZSBmb3IgbWF0Y2hpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgIFNlZSBhdmFpbGFibGUgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgY2hhbmdpbmcgaG93IG1hdGNoZXMgYXJlIHBlcmZvcm1lZFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIG9ubHkga2V5cyB0aGF0IG1hdGNoIHRoZSBnaXZlbiBwYXR0ZXJucy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5tYXRjaEtleXMgPSAob2JqLCBwYXR0ZXJucywgb3B0aW9ucykgPT4ge1xuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgZmlyc3QgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0Jyk7XG4gIH1cbiAgbGV0IGtleXMgPSBtaWNyb21hdGNoKE9iamVjdC5rZXlzKG9iaiksIHBhdHRlcm5zLCBvcHRpb25zKTtcbiAgbGV0IHJlcyA9IHt9O1xuICBmb3IgKGxldCBrZXkgb2Yga2V5cykgcmVzW2tleV0gPSBvYmpba2V5XTtcbiAgcmV0dXJuIHJlcztcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHNvbWUgb2YgdGhlIHN0cmluZ3MgaW4gdGhlIGdpdmVuIGBsaXN0YCBtYXRjaCBhbnkgb2YgdGhlIGdpdmVuIGdsb2IgYHBhdHRlcm5zYC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5zb21lKGxpc3QsIHBhdHRlcm5zWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnNvbGUubG9nKG1tLnNvbWUoWydmb28uanMnLCAnYmFyLmpzJ10sIFsnKi5qcycsICchZm9vLmpzJ10pKTtcbiAqIC8vIHRydWVcbiAqIGNvbnNvbGUubG9nKG1tLnNvbWUoWydmb28uanMnXSwgWycqLmpzJywgJyFmb28uanMnXSkpO1xuICogLy8gZmFsc2VcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGBsaXN0YCBUaGUgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgdG8gdGVzdC4gUmV0dXJucyBhcyBzb29uIGFzIHRoZSBmaXJzdCBtYXRjaCBpcyBmb3VuZC5cbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBgcGF0dGVybnNgIE9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMgdG8gdXNlIGZvciBtYXRjaGluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2AgU2VlIGF2YWlsYWJsZSBbb3B0aW9uc10oI29wdGlvbnMpIGZvciBjaGFuZ2luZyBob3cgbWF0Y2hlcyBhcmUgcGVyZm9ybWVkXG4gKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYW55IGBwYXR0ZXJuc2AgbWF0Y2hlcyBhbnkgb2YgdGhlIHN0cmluZ3MgaW4gYGxpc3RgXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2guc29tZSA9IChsaXN0LCBwYXR0ZXJucywgb3B0aW9ucykgPT4ge1xuICBsZXQgaXRlbXMgPSBbXS5jb25jYXQobGlzdCk7XG5cbiAgZm9yIChsZXQgcGF0dGVybiBvZiBbXS5jb25jYXQocGF0dGVybnMpKSB7XG4gICAgbGV0IGlzTWF0Y2ggPSBwaWNvbWF0Y2goU3RyaW5nKHBhdHRlcm4pLCBvcHRpb25zKTtcbiAgICBpZiAoaXRlbXMuc29tZShpdGVtID0+IGlzTWF0Y2goaXRlbSkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgZXZlcnkgc3RyaW5nIGluIHRoZSBnaXZlbiBgbGlzdGAgbWF0Y2hlc1xuICogYW55IG9mIHRoZSBnaXZlbiBnbG9iIGBwYXR0ZXJuc2AuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IG1tID0gcmVxdWlyZSgnbWljcm9tYXRjaCcpO1xuICogLy8gbW0uZXZlcnkobGlzdCwgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cobW0uZXZlcnkoJ2Zvby5qcycsIFsnZm9vLmpzJ10pKTtcbiAqIC8vIHRydWVcbiAqIGNvbnNvbGUubG9nKG1tLmV2ZXJ5KFsnZm9vLmpzJywgJ2Jhci5qcyddLCBbJyouanMnXSkpO1xuICogLy8gdHJ1ZVxuICogY29uc29sZS5sb2cobW0uZXZlcnkoWydmb28uanMnLCAnYmFyLmpzJ10sIFsnKi5qcycsICchZm9vLmpzJ10pKTtcbiAqIC8vIGZhbHNlXG4gKiBjb25zb2xlLmxvZyhtbS5ldmVyeShbJ2Zvby5qcyddLCBbJyouanMnLCAnIWZvby5qcyddKSk7XG4gKiAvLyBmYWxzZVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYGxpc3RgIFRoZSBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyB0byB0ZXN0LlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGBwYXR0ZXJuc2AgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJucyB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIGNoYW5naW5nIGhvdyBtYXRjaGVzIGFyZSBwZXJmb3JtZWRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhbGwgYHBhdHRlcm5zYCBtYXRjaGVzIGFsbCBvZiB0aGUgc3RyaW5ncyBpbiBgbGlzdGBcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5ldmVyeSA9IChsaXN0LCBwYXR0ZXJucywgb3B0aW9ucykgPT4ge1xuICBsZXQgaXRlbXMgPSBbXS5jb25jYXQobGlzdCk7XG5cbiAgZm9yIChsZXQgcGF0dGVybiBvZiBbXS5jb25jYXQocGF0dGVybnMpKSB7XG4gICAgbGV0IGlzTWF0Y2ggPSBwaWNvbWF0Y2goU3RyaW5nKHBhdHRlcm4pLCBvcHRpb25zKTtcbiAgICBpZiAoIWl0ZW1zLmV2ZXJ5KGl0ZW0gPT4gaXNNYXRjaChpdGVtKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiAqKmFsbCoqIG9mIHRoZSBnaXZlbiBgcGF0dGVybnNgIG1hdGNoXG4gKiB0aGUgc3BlY2lmaWVkIHN0cmluZy5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5hbGwoc3RyaW5nLCBwYXR0ZXJuc1ssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5hbGwoJ2Zvby5qcycsIFsnZm9vLmpzJ10pKTtcbiAqIC8vIHRydWVcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5hbGwoJ2Zvby5qcycsIFsnKi5qcycsICchZm9vLmpzJ10pKTtcbiAqIC8vIGZhbHNlXG4gKlxuICogY29uc29sZS5sb2cobW0uYWxsKCdmb28uanMnLCBbJyouanMnLCAnZm9vLmpzJ10pKTtcbiAqIC8vIHRydWVcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5hbGwoJ2Zvby5qcycsIFsnKi5qcycsICdmKicsICcqbyonLCAnKm8uanMnXSkpO1xuICogLy8gdHJ1ZVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gYHN0cmAgVGhlIHN0cmluZyB0byB0ZXN0LlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGBwYXR0ZXJuc2AgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJucyB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucykgZm9yIGNoYW5naW5nIGhvdyBtYXRjaGVzIGFyZSBwZXJmb3JtZWRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhbnkgcGF0dGVybnMgbWF0Y2ggYHN0cmBcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5hbGwgPSAoc3RyLCBwYXR0ZXJucywgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBhIHN0cmluZzogXCIke3V0aWwuaW5zcGVjdChzdHIpfVwiYCk7XG4gIH1cblxuICByZXR1cm4gW10uY29uY2F0KHBhdHRlcm5zKS5ldmVyeShwID0+IHBpY29tYXRjaChwLCBvcHRpb25zKShzdHIpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBtYXRjaGVzIGNhcHR1cmVkIGJ5IGBwYXR0ZXJuYCBpbiBgc3RyaW5nLCBvciBgbnVsbGAgaWYgdGhlIHBhdHRlcm4gZGlkIG5vdCBtYXRjaC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5jYXB0dXJlKHBhdHRlcm4sIHN0cmluZ1ssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5jYXB0dXJlKCd0ZXN0LyouanMnLCAndGVzdC9mb28uanMnKSk7XG4gKiAvLz0+IFsnZm9vJ11cbiAqIGNvbnNvbGUubG9nKG1tLmNhcHR1cmUoJ3Rlc3QvKi5qcycsICdmb28vYmFyLmNzcycpKTtcbiAqIC8vPT4gbnVsbFxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYGdsb2JgIEdsb2IgcGF0dGVybiB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtTdHJpbmd9IGBpbnB1dGAgU3RyaW5nIHRvIG1hdGNoXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgIFNlZSBhdmFpbGFibGUgW29wdGlvbnNdKCNvcHRpb25zKSBmb3IgY2hhbmdpbmcgaG93IG1hdGNoZXMgYXJlIHBlcmZvcm1lZFxuICogQHJldHVybiB7QXJyYXl8bnVsbH0gUmV0dXJucyBhbiBhcnJheSBvZiBjYXB0dXJlcyBpZiB0aGUgaW5wdXQgbWF0Y2hlcyB0aGUgZ2xvYiBwYXR0ZXJuLCBvdGhlcndpc2UgYG51bGxgLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5taWNyb21hdGNoLmNhcHR1cmUgPSAoZ2xvYiwgaW5wdXQsIG9wdGlvbnMpID0+IHtcbiAgbGV0IHBvc2l4ID0gdXRpbHMuaXNXaW5kb3dzKG9wdGlvbnMpO1xuICBsZXQgcmVnZXggPSBwaWNvbWF0Y2gubWFrZVJlKFN0cmluZyhnbG9iKSwgeyAuLi5vcHRpb25zLCBjYXB0dXJlOiB0cnVlIH0pO1xuICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKHBvc2l4ID8gdXRpbHMudG9Qb3NpeFNsYXNoZXMoaW5wdXQpIDogaW5wdXQpO1xuXG4gIGlmIChtYXRjaCkge1xuICAgIHJldHVybiBtYXRjaC5zbGljZSgxKS5tYXAodiA9PiB2ID09PSB2b2lkIDAgPyAnJyA6IHYpO1xuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmcm9tIHRoZSBnaXZlbiBnbG9iIGBwYXR0ZXJuYC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiAvLyBtbS5tYWtlUmUocGF0dGVyblssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhtbS5tYWtlUmUoJyouanMnKSk7XG4gKiAvLz0+IC9eKD86KFxcLltcXFxcXFwvXSk/KD8hXFwuKSg/PS4pW15cXC9dKj9cXC5qcykkL1xuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHBhdHRlcm5gIEEgZ2xvYiBwYXR0ZXJuIHRvIGNvbnZlcnQgdG8gcmVnZXguXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtSZWdFeHB9IFJldHVybnMgYSByZWdleCBjcmVhdGVkIGZyb20gdGhlIGdpdmVuIHBhdHRlcm4uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2gubWFrZVJlID0gKC4uLmFyZ3MpID0+IHBpY29tYXRjaC5tYWtlUmUoLi4uYXJncyk7XG5cbi8qKlxuICogU2NhbiBhIGdsb2IgcGF0dGVybiB0byBzZXBhcmF0ZSB0aGUgcGF0dGVybiBpbnRvIHNlZ21lbnRzLiBVc2VkXG4gKiBieSB0aGUgW3NwbGl0XSgjc3BsaXQpIG1ldGhvZC5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiBjb25zdCBzdGF0ZSA9IG1tLnNjYW4ocGF0dGVyblssIG9wdGlvbnNdKTtcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBwYXR0ZXJuYFxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1pY3JvbWF0Y2guc2NhbiA9ICguLi5hcmdzKSA9PiBwaWNvbWF0Y2guc2NhbiguLi5hcmdzKTtcblxuLyoqXG4gKiBQYXJzZSBhIGdsb2IgcGF0dGVybiB0byBjcmVhdGUgdGhlIHNvdXJjZSBzdHJpbmcgZm9yIGEgcmVndWxhclxuICogZXhwcmVzc2lvbi5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgbW0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiBjb25zdCBzdGF0ZSA9IG1tLnBhcnNlKHBhdHRlcm5bLCBvcHRpb25zXSk7XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgZ2xvYmBcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCB1c2VmdWwgcHJvcGVydGllcyBhbmQgb3V0cHV0IHRvIGJlIHVzZWQgYXMgcmVnZXggc291cmNlIHN0cmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5wYXJzZSA9IChwYXR0ZXJucywgb3B0aW9ucykgPT4ge1xuICBsZXQgcmVzID0gW107XG4gIGZvciAobGV0IHBhdHRlcm4gb2YgW10uY29uY2F0KHBhdHRlcm5zIHx8IFtdKSkge1xuICAgIGZvciAobGV0IHN0ciBvZiBicmFjZXMoU3RyaW5nKHBhdHRlcm4pLCBvcHRpb25zKSkge1xuICAgICAgcmVzLnB1c2gocGljb21hdGNoLnBhcnNlKHN0ciwgb3B0aW9ucykpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIHRoZSBnaXZlbiBicmFjZSBgcGF0dGVybmAuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHsgYnJhY2VzIH0gPSByZXF1aXJlKCdtaWNyb21hdGNoJyk7XG4gKiBjb25zb2xlLmxvZyhicmFjZXMoJ2Zvby97YSxiLGN9L2JhcicpKTtcbiAqIC8vPT4gWyAnZm9vLyhhfGJ8YykvYmFyJyBdXG4gKlxuICogY29uc29sZS5sb2coYnJhY2VzKCdmb28ve2EsYixjfS9iYXInLCB7IGV4cGFuZDogdHJ1ZSB9KSk7XG4gKiAvLz0+IFsgJ2Zvby9hL2JhcicsICdmb28vYi9iYXInLCAnZm9vL2MvYmFyJyBdXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgcGF0dGVybmAgU3RyaW5nIHdpdGggYnJhY2UgcGF0dGVybiB0byBwcm9jZXNzLlxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYCBBbnkgW29wdGlvbnNdKCNvcHRpb25zKSB0byBjaGFuZ2UgaG93IGV4cGFuc2lvbiBpcyBwZXJmb3JtZWQuIFNlZSB0aGUgW2JyYWNlc11bXSBsaWJyYXJ5IGZvciBhbGwgYXZhaWxhYmxlIG9wdGlvbnMuXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubWljcm9tYXRjaC5icmFjZXMgPSAocGF0dGVybiwgb3B0aW9ucykgPT4ge1xuICBpZiAodHlwZW9mIHBhdHRlcm4gIT09ICdzdHJpbmcnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuICBpZiAoKG9wdGlvbnMgJiYgb3B0aW9ucy5ub2JyYWNlID09PSB0cnVlKSB8fCAhaGFzQnJhY2VzKHBhdHRlcm4pKSB7XG4gICAgcmV0dXJuIFtwYXR0ZXJuXTtcbiAgfVxuICByZXR1cm4gYnJhY2VzKHBhdHRlcm4sIG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBFeHBhbmQgYnJhY2VzXG4gKi9cblxubWljcm9tYXRjaC5icmFjZUV4cGFuZCA9IChwYXR0ZXJuLCBvcHRpb25zKSA9PiB7XG4gIGlmICh0eXBlb2YgcGF0dGVybiAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIHJldHVybiBtaWNyb21hdGNoLmJyYWNlcyhwYXR0ZXJuLCB7IC4uLm9wdGlvbnMsIGV4cGFuZDogdHJ1ZSB9KTtcbn07XG5cbi8qKlxuICogRXhwb3NlIG1pY3JvbWF0Y2hcbiAqL1xuXG4vLyBleHBvc2VkIGZvciB0ZXN0c1xubWljcm9tYXRjaC5oYXNCcmFjZXMgPSBoYXNCcmFjZXM7XG5tb2R1bGUuZXhwb3J0cyA9IG1pY3JvbWF0Y2g7XG4iLCAiaW1wb3J0IHsgQmFja3VwU2V0dGluZ3MsIE5vdGVGbGFyZVNldHRpbmdzLCBTaXRlUHJvZmlsZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKiogRGVmYXVsdCBleGNsdWRlIGdsb2JzIGFwcGxpZWQgdG8gYSBicmFuZC1uZXcgc2l0ZS4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VYQ0xVREVfUEFUVEVSTlMgPSBbJ3ByaXZhdGUvKionLCAnKi5wcml2YXRlLm1kJywgJ1RlbXBsYXRlcy8qKiddO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9CQUNLVVBfU0VUVElOR1M6IEJhY2t1cFNldHRpbmdzID0ge1xuICByZXBvc2l0b3J5OiAnJyxcbiAgcmVwb1Zpc2liaWxpdHk6ICdwcml2YXRlJyxcbiAgYmFja3VwT25DaGFuZ2U6IHRydWUsXG4gIGludGVydmFsTWludXRlczogNjAsXG4gIGxhc3RCYWNrdXBBdHRlbXB0QXQ6ICcnLFxuICBsYXN0QmFja3VwQXQ6ICcnLFxuICBsYXN0QmFja3VwRXJyb3I6ICcnLFxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IE5vdGVGbGFyZVNldHRpbmdzID0ge1xuICBnaXRodWJPd25lcjogJycsXG4gIGdpdGh1YlRva2VuOiAnJyxcbiAgY2xvdWRmbGFyZUFjY291bnQ6ICcnLFxuICBjbG91ZGZsYXJlVG9rZW46ICcnLFxuICBzaXRlczogW10sXG4gIGFjdGl2ZVNpdGVJZDogJycsXG4gIHNldHVwQ29tcGxldGU6IGZhbHNlLFxuICBlbmFibGVCYWNrdXA6IGZhbHNlLFxuICBlbmFibGVQdWJsaXNoOiB0cnVlLFxuICBiYWNrdXA6IHsgLi4uREVGQVVMVF9CQUNLVVBfU0VUVElOR1MgfSxcbiAgbWFzdGVyUmVwb3NpdG9yeTogJycsXG4gIG1hc3RlclJlcG9zaXRvcnlQcml2YXRlOiBmYWxzZSxcbiAgZGVmYXVsdFZpZXdMb2NhdGlvbjogJ2xlZnQnLFxufTtcblxuLyoqIEJ1aWxkIGEgZnJlc2ggc2l0ZSBwcm9maWxlIHdpdGggc2Vuc2libGUgZGVmYXVsdHMuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2l0ZVByb2ZpbGUocGFydGlhbDogUGFydGlhbDxTaXRlUHJvZmlsZT4gPSB7fSk6IFNpdGVQcm9maWxlIHtcbiAgcmV0dXJuIHtcbiAgICBpZDpcbiAgICAgIHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmICdyYW5kb21VVUlEJyBpbiBjcnlwdG9cbiAgICAgICAgPyBjcnlwdG8ucmFuZG9tVVVJRCgpXG4gICAgICAgIDogYHNpdGUtJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDgpfWAsXG4gICAgbmFtZTogJycsXG4gICAgZ2l0aHViUmVwbzogJycsXG4gICAgZ2l0aHViQnJhbmNoOiAnJyxcbiAgICBjbG91ZGZsYXJlUHJvamVjdDogJycsXG4gICAgc2l0ZVVybDogJycsXG4gICAgcHVibGlzaFNjb3BlOiBwYXJ0aWFsLnB1Ymxpc2hTY29wZSB8fCAndmF1bHQnLFxuICAgIHB1Ymxpc2hQYXRoczogcGFydGlhbC5wdWJsaXNoUGF0aHMgfHwgW10sXG4gICAgYXV0aG9yTmFtZTogJycsXG4gICAgc2lkZWJhclRpdGxlOiAnJyxcbiAgICBzaXRlRGVzY3JpcHRpb246ICcnLFxuICAgIGV4Y2x1ZGVQYXR0ZXJuczogWy4uLkRFRkFVTFRfRVhDTFVERV9QQVRURVJOU10sXG4gICAgaW5jbHVkZUF0dGFjaG1lbnRzOiB0cnVlLFxuICAgIGlzUHVibGlzaGVkOiBmYWxzZSxcbiAgICBsYXN0UHVibGlzaGVkOiAnJyxcbiAgICBsYXN0Tm90ZUNvdW50OiAwLFxuICAgIGxhc3RQdWJsaXNoRmFpbGVkOiBmYWxzZSxcbiAgICBsYXN0UHVibGlzaEVycm9yOiAnJyxcbiAgICBob3N0aW5nUHJvdmlkZXI6ICdjbG91ZGZsYXJlJyxcbiAgICAuLi5wYXJ0aWFsLFxuICB9O1xufVxuIiwgImltcG9ydCB7IE5vdGljZSwgUGx1Z2luLCBzZXRJY29uLCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgUHVibGlzaGVyIH0gZnJvbSAnLi9zcmMvcHVibGlzaC9wdWJsaXNoZXInO1xuaW1wb3J0IHsgREVGQVVMVF9CQUNLVVBfU0VUVElOR1MsIERFRkFVTFRfU0VUVElOR1MsIGNyZWF0ZVNpdGVQcm9maWxlIH0gZnJvbSAnLi9zcmMvY29yZS9zZXR0aW5ncyc7XG5pbXBvcnQgeyBOb3RlRmxhcmVTZXR0aW5ncywgUHVibGlzaFJlc3VsdCwgU2l0ZVByb2ZpbGUgfSBmcm9tICcuL3NyYy9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE5vdGVGbGFyZVNldHRpbmdzVGFiIH0gZnJvbSAnLi9zcmMvdWkvc2V0dGluZ3Mvc2V0dGluZ3NUYWInO1xuaW1wb3J0IHsgU3RhdHVzQmFyIH0gZnJvbSAnLi9zcmMvdWkvc3RhdHVzQmFyJztcbmltcG9ydCB7IE5vdGVGbGFyZVZpZXcsIFZJRVdfVFlQRV9OT1RFRkxBUkUgfSBmcm9tICcuL3NyYy91aS9ub3RlZmxhcmVWaWV3JztcbmltcG9ydCB7IGRlY3J5cHRTZWNyZXQsIGVuY3J5cHRTZWNyZXQsIGlzU2VjdXJlU3RvcmFnZUF2YWlsYWJsZSB9IGZyb20gJy4vc3JjL2NvcmUvc2VjdXJlU3RvcmUnO1xuaW1wb3J0IHsgQmFja3VwRW5naW5lIH0gZnJvbSAnLi9zcmMvYmFja3VwL2JhY2t1cEVuZ2luZSc7XG5pbXBvcnQgeyBCYWNrdXBTY2hlZHVsZXIgfSBmcm9tICcuL3NyYy9iYWNrdXAvYmFja3VwU2NoZWR1bGVyJztcbmltcG9ydCB7IFZhdWx0UmVnaXN0cnkgfSBmcm9tICcuL3NyYy9jb3JlL3ZhdWx0UmVnaXN0cnknO1xuaW1wb3J0IHsgR2l0SHViQXBpIH0gZnJvbSAnLi9zcmMvYXBpL2dpdGh1YkFwaSc7XG5pbXBvcnQgeyBDbG91ZGZsYXJlQXBpIH0gZnJvbSAnLi9zcmMvYXBpL2Nsb3VkZmxhcmVBcGknO1xuXG5leHBvcnQgaW50ZXJmYWNlIExpdmVTaXRlU3RhdHVzIHtcbiAgbG9hZGluZzogYm9vbGVhbjtcbiAgcmVwb0h0bWxVcmw6IHN0cmluZztcbiAgcmVwb1B1c2hlZEF0OiBzdHJpbmc7XG4gIHdvcmtmbG93U3RhdHVzOiBzdHJpbmc7ICAgIC8vICdxdWV1ZWQnIHwgJ2luX3Byb2dyZXNzJyB8ICdjb21wbGV0ZWQnIHwgJydcbiAgd29ya2Zsb3dDb25jbHVzaW9uOiBzdHJpbmc7IC8vICdzdWNjZXNzJyB8ICdmYWlsdXJlJyB8ICdjYW5jZWxsZWQnIHwgJydcbiAgd29ya2Zsb3dVcmw6IHN0cmluZztcbiAgd29ya2Zsb3dVcGRhdGVkQXQ6IHN0cmluZztcbiAgY29tbWl0U2hhOiBzdHJpbmc7XG4gIGNvbW1pdE1lc3NhZ2U6IHN0cmluZztcbiAgY29tbWl0RGF0ZTogc3RyaW5nO1xuICBmZXRjaGVkQXQ6IHN0cmluZzsgLy8gSVNPIHRpbWVzdGFtcCBvZiBsYXN0IHN1Y2Nlc3NmdWwgZmV0Y2hcbiAgZXJyb3I6IHN0cmluZzsgICAgLy8gbm9uLWVtcHR5IGlmIGxhc3QgZmV0Y2ggZmFpbGVkXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGVGbGFyZVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHNldHRpbmdzITogTm90ZUZsYXJlU2V0dGluZ3M7XG4gIHN0YXR1c0JhciE6IFN0YXR1c0JhcjtcbiAgcHJpdmF0ZSByaWJib25FbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBiYWNrdXBJblByb2dyZXNzID0gZmFsc2U7XG4gIC8qKiBJbi1wcm9ncmVzcyBwdWJsaXNoIHRyYWNraW5nIChpbi1tZW1vcnkgb25seSwgY2xlYXJlZCBvbiBzdWNjZXNzL2ZhaWwpLiAqL1xuICBwdWJsaXNoSW5Qcm9ncmVzczogUmVjb3JkPHN0cmluZywgYm9vbGVhbj4gPSB7fTtcbiAgLyoqIExpdmUgR2l0SHViIHN0YXR1cyBjYWNoZSAoaW4tbWVtb3J5LCByZWZyZXNoZWQgb24gcGFuZWwgb3Blbi9yZWZyZXNoKS4gKi9cbiAgbGl2ZVN0YXR1czogUmVjb3JkPHN0cmluZywgTGl2ZVNpdGVTdGF0dXM+ID0ge307XG5cbiAgYXN5bmMgb25sb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG5cbiAgICAvLyBDaGVjayB0aGUgdmF1bHQgcmVnaXN0cnkgZm9yIHNpdGVzIHRoYXQgZXhpc3RlZCBiZWZvcmUgYSByZWluc3RhbGwuXG4gICAgLy8gSWYgY3JlZGVudGlhbHMgYXJlIHByZXNlbnQgYnV0IG5vIHNpdGVzIGFyZSBsb2FkZWQsIHRoZSB1c2VyIHByb2JhYmx5XG4gICAgLy8gcmVpbnN0YWxsZWQgdGhlIHBsdWdpbiBcdTIwMTQgc2hvdyBhIG5vdGljZSBwcm9tcHRpbmcgdGhlbSB0byByZXN0b3JlLlxuICAgIGlmICh0aGlzLnNldHRpbmdzLmdpdGh1YlRva2VuICYmIHRoaXMuc2V0dGluZ3MuZ2l0aHViT3duZXIgJiYgdGhpcy5zZXR0aW5ncy5zaXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IHJlZ2lzdHJ5ID0gYXdhaXQgVmF1bHRSZWdpc3RyeS5sb2FkKHRoaXMuYXBwKTtcbiAgICAgIGlmIChyZWdpc3RyeS5lbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmV3IE5vdGljZShcbiAgICAgICAgICBgTm90ZUZsYXJlIGZvdW5kICR7cmVnaXN0cnkuZW50cmllcy5sZW5ndGh9IHByZXZpb3VzbHkgY29uZmlndXJlZCBzaXRlJHtyZWdpc3RyeS5lbnRyaWVzLmxlbmd0aCA9PT0gMSA/ICcnIDogJ3MnfSBpbiB5b3VyIHZhdWx0LiBPcGVuIE5vdGVGbGFyZSBzZXR0aW5ncyB0byByZXN0b3JlIHRoZW0uYCxcbiAgICAgICAgICAxMDAwMCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWlzU2VjdXJlU3RvcmFnZUF2YWlsYWJsZSgpKSB7XG4gICAgICBuZXcgTm90aWNlKFxuICAgICAgICAnTm90ZUZsYXJlOiBzZWN1cmUgdG9rZW4gc3RvcmFnZSBpcyB1bmF2YWlsYWJsZSBvbiB0aGlzIHN5c3RlbS4gWW91ciB0b2tlbnMgd2lsbCBub3QgYmUgc2F2ZWQgYmV0d2VlbiBzZXNzaW9ucyBcdTIwMTQgeW91IG1heSBuZWVkIHRvIHJlLWVudGVyIHRoZW0uJyxcbiAgICAgICAgMTAwMDAsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXR1c0VsID0gdGhpcy5hZGRTdGF0dXNCYXJJdGVtKCk7XG4gICAgdGhpcy5zdGF0dXNCYXIgPSBuZXcgU3RhdHVzQmFyKHN0YXR1c0VsKTtcbiAgICB0aGlzLnVwZGF0ZVN0YXR1c0JhcigpO1xuXG4gICAgdGhpcy5yZWdpc3RlclZpZXcoVklFV19UWVBFX05PVEVGTEFSRSwgKGxlYWYpID0+IG5ldyBOb3RlRmxhcmVWaWV3KGxlYWYsIHRoaXMpKTtcblxuICAgIC8vIFRoZSByaWJib24gaWNvbiBvcGVucyB0aGUgcHVibGlzaGluZyBwYW5lbC5cbiAgICB0aGlzLnJpYmJvbkVsID0gdGhpcy5hZGRSaWJib25JY29uKFxuICAgICAgdGhpcy5pc0FjdGl2ZUxpdmUoKSA/ICdjbG91ZC1jaGVjaycgOiAnY2xvdWQtdXBsb2FkJyxcbiAgICAgICdOb3RlRmxhcmUnLFxuICAgICAgKCkgPT4gdm9pZCB0aGlzLmFjdGl2YXRlVmlldygpLFxuICAgICk7XG4gICAgdGhpcy51cGRhdGVSaWJib25JY29uKCk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICdvcGVuLXBhbmVsJyxcbiAgICAgIG5hbWU6ICdPcGVuIHBhbmVsJyxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB2b2lkIHRoaXMuYWN0aXZhdGVWaWV3KCksXG4gICAgfSk7XG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiAncHVibGlzaCcsXG4gICAgICBuYW1lOiAnUHVibGlzaCBhY3RpdmUgc2l0ZScsXG4gICAgICBjYWxsYmFjazogKCkgPT4gdm9pZCB0aGlzLmRvUHVibGlzaCgpLFxuICAgIH0pO1xuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ3VucHVibGlzaCcsXG4gICAgICBuYW1lOiAnVW5wdWJsaXNoIGFjdGl2ZSBzaXRlJyxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB2b2lkIHRoaXMuZG9VbnB1Ymxpc2goKSxcbiAgICB9KTtcbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICdiYWNrdXAtbm93JyxcbiAgICAgIG5hbWU6ICdCYWNrIHVwIHZhdWx0IG5vdycsXG4gICAgICBjYWxsYmFjazogKCkgPT4gdm9pZCB0aGlzLmRvQmFja3VwKGZhbHNlKSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgTm90ZUZsYXJlU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcbiAgICBcbiAgICBuZXcgQmFja3VwU2NoZWR1bGVyKHRoaXMpLnJlZ2lzdGVyQXV0b21hdGlvbigpO1xuICB9XG5cbiAgLyoqIFRoZSBjdXJyZW50bHktc2VsZWN0ZWQgc2l0ZSwgb3IgdGhlIGZpcnN0IG9uZSwgb3IgbnVsbCB3aGVuIG5vbmUgZXhpc3QuICovXG4gIGdldEFjdGl2ZVNpdGUoKTogU2l0ZVByb2ZpbGUgfCBudWxsIHtcbiAgICBjb25zdCB7IHNpdGVzLCBhY3RpdmVTaXRlSWQgfSA9IHRoaXMuc2V0dGluZ3M7XG4gICAgcmV0dXJuIHNpdGVzLmZpbmQoKHMpID0+IHMuaWQgPT09IGFjdGl2ZVNpdGVJZCkgPz8gc2l0ZXNbMF0gPz8gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgaXNBY3RpdmVMaXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldEFjdGl2ZVNpdGUoKT8uaXNQdWJsaXNoZWQgPz8gZmFsc2U7XG4gIH1cblxuICAvKiogUmV2ZWFsIHRoZSBOb3RlRmxhcmUgcGFuZWwgKGNyZWF0aW5nIGl0IGlmIG5lZWRlZCBpbiB0aGUgY29uZmlndXJlZCBsb2NhdGlvbikuICovXG4gIGFzeW5jIGFjdGl2YXRlVmlldygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHdvcmtzcGFjZSB9ID0gdGhpcy5hcHA7XG4gICAgbGV0IGxlYWY6IFdvcmtzcGFjZUxlYWYgfCBudWxsID0gd29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfTk9URUZMQVJFKVswXSA/PyBudWxsO1xuXG4gICAgaWYgKCFsZWFmKSB7XG4gICAgICBjb25zdCBsb2MgPSB0aGlzLnNldHRpbmdzLmRlZmF1bHRWaWV3TG9jYXRpb24gPz8gJ2xlZnQnO1xuICAgICAgaWYgKGxvYyA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICBsZWFmID0gd29ya3NwYWNlLmdldFJpZ2h0TGVhZihmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKGxvYyA9PT0gJ3RhYicpIHtcbiAgICAgICAgbGVhZiA9IHdvcmtzcGFjZS5nZXRMZWFmKCd0YWInKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlYWYgPSB3b3Jrc3BhY2UuZ2V0TGVmdExlYWYoZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKCFsZWFmKSByZXR1cm47XG4gICAgICBhd2FpdCBsZWFmLnNldFZpZXdTdGF0ZSh7IHR5cGU6IFZJRVdfVFlQRV9OT1RFRkxBUkUsIGFjdGl2ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgdm9pZCB3b3Jrc3BhY2UucmV2ZWFsTGVhZihsZWFmKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfTk9URUZMQVJFKS5mb3JFYWNoKChsZWFmKSA9PiB7XG4gICAgICBjb25zdCB2aWV3ID0gbGVhZi52aWV3O1xuICAgICAgaWYgKHZpZXcgaW5zdGFuY2VvZiBOb3RlRmxhcmVWaWV3KSB2aWV3LnJlZnJlc2goKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRvQmFja3VwKGJhY2tncm91bmQgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmJhY2t1cEluUHJvZ3Jlc3MpIHtcbiAgICAgIGlmICghYmFja2dyb3VuZCkgbmV3IE5vdGljZSgnQSBiYWNrdXAgaXMgYWxyZWFkeSBydW5uaW5nLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc2V0dGluZ3Muc2V0dXBDb21wbGV0ZSB8fCAhdGhpcy5zZXR0aW5ncy5lbmFibGVCYWNrdXApIHtcbiAgICAgIGlmICghYmFja2dyb3VuZCkge1xuICAgICAgICB0aGlzLm9wZW5TZXR0aW5nc1RhYigpO1xuICAgICAgICBuZXcgTm90aWNlKCdFbmFibGUgcHJpdmF0ZSBiYWNrdXAgaW4gTm90ZUZsYXJlIHNldHRpbmdzIGZpcnN0LicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5iYWNrdXAucmVwb3NpdG9yeSkge1xuICAgICAgdGhpcy5zZXR0aW5ncy5iYWNrdXAucmVwb3NpdG9yeSA9IHRoaXMuZGVmYXVsdEJhY2t1cFJlcG9zaXRvcnkoKTtcbiAgICB9XG5cbiAgICB0aGlzLmJhY2t1cEluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgIHRoaXMuc2V0dGluZ3MuYmFja3VwLmxhc3RCYWNrdXBBdHRlbXB0QXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgY29uc3QgZW5naW5lID0gbmV3IEJhY2t1cEVuZ2luZSh0aGlzLmFwcCwgdGhpcy5zZXR0aW5ncywgKG1lc3NhZ2UpID0+IHtcbiAgICAgIGlmICghYmFja2dyb3VuZCkgdGhpcy5zdGF0dXNCYXIuc2V0TWVzc2FnZShgTm90ZUZsYXJlOiAke21lc3NhZ2V9YCk7XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZW5naW5lLmJhY2t1cCgpO1xuICAgICAgaWYgKCFyZXN1bHQuc3VjY2VzcykgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJvcnNbMF0gPz8gJ0JhY2t1cCBmYWlsZWQuJyk7XG5cbiAgICAgIHRoaXMuc2V0dGluZ3MuYmFja3VwLmxhc3RCYWNrdXBBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgICAgIHRoaXMuc2V0dGluZ3MuYmFja3VwLmxhc3RCYWNrdXBFcnJvciA9ICcnO1xuICAgICAgYXdhaXQgdGhpcy5zYXZlU2V0dGluZ3MoKTtcblxuICAgICAgaWYgKCFiYWNrZ3JvdW5kKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSByZXN1bHQudXBkYXRlZCA+IDBcbiAgICAgICAgICA/IGBCYWNrdXAgY29tcGxldGUgXHUwMEI3ICR7cmVzdWx0LnVwZGF0ZWR9IGZpbGUke3Jlc3VsdC51cGRhdGVkID09PSAxID8gJycgOiAncyd9IHVwZGF0ZWRgXG4gICAgICAgICAgOiAnQmFja3VwIGlzIGFscmVhZHkgdXAgdG8gZGF0ZSc7XG4gICAgICAgIG5ldyBOb3RpY2UobWVzc2FnZSwgNTAwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnRvVXNlck1lc3NhZ2UoZXJyb3IsICdCYWNrdXAgZmFpbGVkLicpO1xuICAgICAgdGhpcy5zZXR0aW5ncy5iYWNrdXAubGFzdEJhY2t1cEVycm9yID0gbWVzc2FnZTtcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG4gICAgICBpZiAoIWJhY2tncm91bmQpIHtcbiAgICAgICAgdGhpcy5zdGF0dXNCYXIuc2V0RXJyb3IobWVzc2FnZSk7XG4gICAgICAgIG5ldyBOb3RpY2UobWVzc2FnZSwgODAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBOb3RlRmxhcmUgYmFja2dyb3VuZCBiYWNrdXAgZmFpbGVkOiAke21lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuYmFja3VwSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgaWYgKCFiYWNrZ3JvdW5kKSB0aGlzLnVwZGF0ZVN0YXR1c0JhcigpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRvUHVibGlzaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzaXRlID0gdGhpcy5nZXRBY3RpdmVTaXRlKCk7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnNldHVwQ29tcGxldGUgfHwgIXNpdGUpIHtcbiAgICAgIHRoaXMub3BlblNldHRpbmdzVGFiKCk7XG4gICAgICBuZXcgTm90aWNlKCdBZGQgYSBzaXRlIGJlZm9yZSBwdWJsaXNoaW5nLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEd1YXJkIGFnYWluc3QgZG91YmxlLWNsaWNrcy5cbiAgICBpZiAodGhpcy5wdWJsaXNoSW5Qcm9ncmVzc1tzaXRlLmlkXSkgcmV0dXJuO1xuICAgIHRoaXMucHVibGlzaEluUHJvZ3Jlc3Nbc2l0ZS5pZF0gPSB0cnVlO1xuICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcblxuICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyBQdWJsaXNoZXIodGhpcy5zZXR0aW5ncywgc2l0ZSwgdGhpcy5hcHAsIChtZXNzYWdlKSA9PiB7XG4gICAgICB0aGlzLnN5bmNTdGF0dXNGcm9tUHJvZ3Jlc3MobWVzc2FnZSk7XG4gICAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHVibGlzaGVyLnB1Ymxpc2goKTtcbiAgICAgIC8vIHB1Ymxpc2hlci50cyBhbHJlYWR5IHdyb3RlIGxhc3RQdWJsaXNoRmFpbGVkL2xhc3RQdWJsaXNoRXJyb3Igb250byBzaXRlLlxuICAgICAgYXdhaXQgdGhpcy5hcHBseVB1Ymxpc2hSZXN1bHQoc2l0ZSwgcmVzdWx0KTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnRvVXNlck1lc3NhZ2UoZXJyLCAnUHVibGlzaGluZyBmYWlsZWQuIFJldmlldyB5b3VyIHNldHVwIGFuZCB0cnkgYWdhaW4uJyk7XG4gICAgICAvLyBQZXJzaXN0IHRoZSBmYWlsdXJlIHNvIGl0IHN1cnZpdmVzIGEgcmVzdGFydC5cbiAgICAgIHNpdGUubGFzdFB1Ymxpc2hGYWlsZWQgPSB0cnVlO1xuICAgICAgc2l0ZS5sYXN0UHVibGlzaEVycm9yID0gbWVzc2FnZTtcbiAgICAgIHNpdGUuaXNQdWJsaXNoZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldEVycm9yKG1lc3NhZ2UpO1xuICAgICAgbmV3IE5vdGljZShtZXNzYWdlLCA4MDAwKTtcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMucHVibGlzaEluUHJvZ3Jlc3Nbc2l0ZS5pZF0gPSBmYWxzZTtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBkb1VucHVibGlzaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzaXRlID0gdGhpcy5nZXRBY3RpdmVTaXRlKCk7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnNldHVwQ29tcGxldGUgfHwgIXNpdGUpIHtcbiAgICAgIHRoaXMub3BlblNldHRpbmdzVGFiKCk7XG4gICAgICBuZXcgTm90aWNlKCdBZGQgYSBzaXRlIGZpcnN0LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHB1Ymxpc2hlciA9IG5ldyBQdWJsaXNoZXIodGhpcy5zZXR0aW5ncywgc2l0ZSwgdGhpcy5hcHAsIChtZXNzYWdlKSA9PiB7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRNZXNzYWdlKGBOb3RlRmxhcmU6ICR7bWVzc2FnZX1gKTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdHVzQmFyLnNldE1lc3NhZ2UoJ05vdGVGbGFyZTogVGFraW5nIHlvdXIgc2l0ZSBvZmZsaW5lLi4uJyk7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgcHVibGlzaGVyLnVucHVibGlzaCgpO1xuICAgICAgc2l0ZS5pc1B1Ymxpc2hlZCA9IGZhbHNlO1xuICAgICAgYXdhaXQgdGhpcy5zYXZlU2V0dGluZ3MoKTtcbiAgICAgIHRoaXMudXBkYXRlU3RhdHVzQmFyKCk7XG4gICAgICBuZXcgTm90aWNlKCdZb3VyIHNpdGUgaXMgbm93IG9mZmxpbmUuIFlvdSBjYW4gcHVibGlzaCBhZ2FpbiBhbnkgdGltZS4nKTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLnRvVXNlck1lc3NhZ2UoZXJyLCAnVW5wdWJsaXNoIGZhaWxlZC4gQ2hlY2sgeW91ciBDbG91ZGZsYXJlIHNldHRpbmdzIGFuZCB0cnkgYWdhaW4uJyk7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRFcnJvcihtZXNzYWdlKTtcbiAgICAgIG5ldyBOb3RpY2UobWVzc2FnZSwgODAwMCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IChhd2FpdCB0aGlzLmxvYWREYXRhKCkpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbDtcbiAgICBjb25zdCB7IHNldHRpbmdzIH0gPSBtaWdyYXRlU2V0dGluZ3MobG9hZGVkKTtcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gIH1cblxuICBhc3luYyBzYXZlU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gUGVyc2lzdCB0b2tlbnMgYXMgT1MtZW5jcnlwdGVkIGNpcGhlcnRleHQ7IG5ldmVyIHdyaXRlIHBsYWludGV4dC4gSWZcbiAgICAvLyBzZWN1cmUgc3RvcmFnZSBpcyB1bmF2YWlsYWJsZSB0aGUgdG9rZW5zIHNpbXBseSBhcmVuJ3QgcGVyc2lzdGVkICh0aGV5XG4gICAgLy8gc3RheSBpbiBtZW1vcnkgZm9yIHRoZSBzZXNzaW9uKSByYXRoZXIgdGhhbiBiZWluZyB3cml0dGVuIGluIHRoZSBjbGVhci5cbiAgICBjb25zdCB7IGdpdGh1YlRva2VuLCBjbG91ZGZsYXJlVG9rZW4sIC4uLnJlc3QgfSA9IHRoaXMuc2V0dGluZ3M7XG4gICAgY29uc3QgcGVyc2lzdGVkOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHsgLi4ucmVzdCB9O1xuICAgIGlmIChpc1NlY3VyZVN0b3JhZ2VBdmFpbGFibGUoKSkge1xuICAgICAgcGVyc2lzdGVkLmdpdGh1YlRva2VuRW5jID0gZ2l0aHViVG9rZW4gPyBlbmNyeXB0U2VjcmV0KGdpdGh1YlRva2VuKSA6ICcnO1xuICAgICAgcGVyc2lzdGVkLmNsb3VkZmxhcmVUb2tlbkVuYyA9IGNsb3VkZmxhcmVUb2tlbiA/IGVuY3J5cHRTZWNyZXQoY2xvdWRmbGFyZVRva2VuKSA6ICcnO1xuICAgIH1cbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHBlcnNpc3RlZCk7XG5cbiAgICAvLyBLZWVwIHRoZSB2YXVsdCByZWdpc3RyeSBpbiBzeW5jIHNvIHNpdGVzIHN1cnZpdmUgcGx1Z2luIHVuaW5zdGFsbC9yZWluc3RhbGwuXG4gICAgLy8gTm9uLWZhdGFsOiBhIHJlZ2lzdHJ5IHdyaXRlIGZhaWx1cmUgbXVzdCBub3QgYmxvY2sgdGhlIHNldHRpbmdzIHNhdmUuXG4gICAgZm9yIChjb25zdCBzaXRlIG9mIHRoaXMuc2V0dGluZ3Muc2l0ZXMpIHtcbiAgICAgIHZvaWQgVmF1bHRSZWdpc3RyeS51cHNlcnQoXG4gICAgICAgIHRoaXMuYXBwLFxuICAgICAgICBzaXRlLFxuICAgICAgICB0aGlzLnNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnksXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViT3duZXIsXG4gICAgICAgIHRoaXMuc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeVByaXZhdGUgfHwgZmFsc2UsXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlU3RhdHVzQmFyKCk7XG4gICAgdGhpcy51cGRhdGVSaWJib25JY29uKCk7XG4gICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICB9XG5cbiAgdXBkYXRlU3RhdHVzQmFyKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdGF0dXNCYXIpIHJldHVybjtcblxuICAgIGNvbnN0IHNpdGUgPSB0aGlzLmdldEFjdGl2ZVNpdGUoKTtcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3Muc2V0dXBDb21wbGV0ZSB8fCAhc2l0ZSkge1xuICAgICAgdGhpcy5zdGF0dXNCYXIuc2V0SWRsZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzaXRlLmlzUHVibGlzaGVkKSB7XG4gICAgICB0aGlzLnN0YXR1c0Jhci5zZXRMaXZlKHNpdGUubGFzdE5vdGVDb3VudCwgc2l0ZS5zaXRlVXJsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXR1c0Jhci5zZXRVbnB1Ymxpc2hlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSaWJib25JY29uKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5yaWJib25FbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgbGl2ZSA9IHRoaXMuaXNBY3RpdmVMaXZlKCk7XG4gICAgc2V0SWNvbih0aGlzLnJpYmJvbkVsLCBsaXZlID8gJ2Nsb3VkLWNoZWNrJyA6ICdjbG91ZC11cGxvYWQnKTtcbiAgICB0aGlzLnJpYmJvbkVsLnNldEF0dHJpYnV0ZShcbiAgICAgICdhcmlhLWxhYmVsJyxcbiAgICAgIGxpdmUgPyAnTm90ZUZsYXJlOiBVbnB1Ymxpc2ggc2l0ZScgOiAnTm90ZUZsYXJlOiBQdWJsaXNoIHNpdGUnLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHN5bmNTdGF0dXNGcm9tUHJvZ3Jlc3MobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdXBsb2FkTWF0Y2ggPSAvVXBsb2FkaW5nIChcXGQrKVxcLyhcXGQrKS8uZXhlYyhtZXNzYWdlKTtcbiAgICBpZiAodXBsb2FkTWF0Y2gpIHtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldFB1Ymxpc2hpbmcoTnVtYmVyKHVwbG9hZE1hdGNoWzFdKSwgTnVtYmVyKHVwbG9hZE1hdGNoWzJdKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmF0ZU1hdGNoID0gL1JhdGUgbGltaXRlZCg/Oi4qPykoXFxkKylzLy5leGVjKG1lc3NhZ2UpO1xuICAgIGlmIChyYXRlTWF0Y2gpIHtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldFJhdGVMaW1pdGVkKE51bWJlcihyYXRlTWF0Y2hbMV0pKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXR1c0Jhci5zZXRNZXNzYWdlKGBOb3RlRmxhcmU6ICR7bWVzc2FnZX1gKTtcbiAgfVxuXG4gIGRlZmF1bHRCYWNrdXBSZXBvc2l0b3J5KCk6IHN0cmluZyB7XG4gICAgY29uc3QgdmF1bHROYW1lID0gdGhpcy5hcHAudmF1bHQuZ2V0TmFtZSgpXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgLnJlcGxhY2UoL1teYS16MC05LV0rL2csICctJylcbiAgICAgIC5yZXBsYWNlKC9eLSt8LSskL2csICcnKTtcbiAgICByZXR1cm4gYCR7dmF1bHROYW1lIHx8ICdvYnNpZGlhbi12YXVsdCd9LWJhY2t1cGA7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGFwcGx5UHVibGlzaFJlc3VsdChzaXRlOiBTaXRlUHJvZmlsZSwgcmVzdWx0OiBQdWJsaXNoUmVzdWx0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgc2l0ZS5sYXN0UHVibGlzaGVkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIHNpdGUuaXNQdWJsaXNoZWQgPSByZXN1bHQuc3VjY2VzcztcbiAgICAvLyBVc2Ugbm90ZUNvdW50ICh2YXVsdCBmaWxlcyBvbmx5KSBcdTIwMTQgbm90IHJlc3VsdC51cGxvYWRlZCB3aGljaCBhbHNvIGNvdW50cyBidWlsZCBmaWxlcy5cbiAgICBzaXRlLmxhc3ROb3RlQ291bnQgPSByZXN1bHQubm90ZUNvdW50O1xuICAgIC8vIGxhc3RQdWJsaXNoRmFpbGVkIGFuZCBsYXN0UHVibGlzaEVycm9yIHdlcmUgYWxyZWFkeSBzZXQgYnkgcHVibGlzaGVyLnRzO1xuICAgIC8vIGVuc3VyZSB0aGV5J3JlIGNvcnJlY3QgZXZlbiBpZiBwdWJsaXNoZXIgZGlkbid0IHNldCB0aGVtIChzaG91bGRuJ3QgaGFwcGVuKS5cbiAgICBzaXRlLmxhc3RQdWJsaXNoRmFpbGVkID0gIXJlc3VsdC5zdWNjZXNzO1xuICAgIHNpdGUubGFzdFB1Ymxpc2hFcnJvciA9IHJlc3VsdC5zdWNjZXNzID8gJycgOiAocmVzdWx0LmVycm9yc1swXSA/PyAnVW5rbm93biBlcnJvcicpO1xuICAgIGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG5cbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgIHRoaXMuc3RhdHVzQmFyLnNldExpdmUocmVzdWx0Lm5vdGVDb3VudCwgc2l0ZS5zaXRlVXJsKTtcbiAgICAgIGNvbnN0IGZpeGVkTm90ZSA9IHJlc3VsdC5maXhlZCA+IDAgPyBgIChhdXRvLWZpeGVkICR7cmVzdWx0LmZpeGVkfSBmcm9udG1hdHRlciBpc3N1ZSR7cmVzdWx0LmZpeGVkID09PSAxID8gJycgOiAncyd9KWAgOiAnJztcbiAgICAgIG5ldyBOb3RpY2UoYFB1Ymxpc2hlZCAke3Jlc3VsdC5ub3RlQ291bnR9IGZpbGUke3Jlc3VsdC5ub3RlQ291bnQgPT09IDEgPyAnJyA6ICdzJ30gdG8gJHtzaXRlLnNpdGVVcmx9JHtmaXhlZE5vdGV9YCwgNjAwMCk7XG4gICAgICAvLyBLaWNrIG9mZiBhIGxpdmUgc3RhdHVzIGZldGNoIHNvIHRoZSBwYW5lbCByZWZsZWN0cyB0aGUgbmV3IGRlcGxveW1lbnQuXG4gICAgICB2b2lkIHRoaXMuZmV0Y2hMaXZlU3RhdHVzKHNpdGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0RXJyb3IgPSByZXN1bHQuZXJyb3JzWzBdID8/ICdQdWJsaXNoaW5nIGZhaWxlZC4gUmV2aWV3IHlvdXIgc2V0dXAgYW5kIHRyeSBhZ2Fpbi4nO1xuICAgIHRoaXMuc3RhdHVzQmFyLnNldEVycm9yKGZpcnN0RXJyb3IpO1xuICAgIG5ldyBOb3RpY2UoYEZhaWxlZCB0byBwdWJsaXNoOiAke2ZpcnN0RXJyb3J9YCwgODAwMCk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggbGl2ZSBHaXRIdWIgc3RhdHVzIGZvciB0aGUgZ2l2ZW4gc2l0ZSBhbmQgY2FjaGUgaXQgaW4gYGxpdmVTdGF0dXNgLlxuICAgKiBUaGUgdmlldyBjYWxscyB0aGlzIG9uIG9wZW4gYW5kIG9uIHRoZSBSZWZyZXNoIGJ1dHRvbi4gTmV2ZXIgdGhyb3dzLlxuICAgKi9cbiAgYXN5bmMgZmV0Y2hMaXZlU3RhdHVzKHNpdGU6IFNpdGVQcm9maWxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVwbyA9IHNpdGUuZ2l0aHViUmVwbyB8fCB0aGlzLnNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnk7XG4gICAgXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmdpdGh1YlRva2VuIHx8ICF0aGlzLnNldHRpbmdzLmdpdGh1Yk93bmVyIHx8ICFyZXBvKSB7XG4gICAgICB0aGlzLmxpdmVTdGF0dXNbc2l0ZS5pZF0gPSB7XG4gICAgICAgIC4uLih0aGlzLmxpdmVTdGF0dXNbc2l0ZS5pZF0gPz8ge30pLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICFyZXBvID8gJ0dpdEh1YiByZXBvc2l0b3J5IG5vdCBjb25maWd1cmVkLicgOiAnR2l0SHViIGFjY291bnQgbm90IGNvbm5lY3RlZC4nLFxuICAgICAgfTtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBicmFuY2ggPSBzaXRlLmdpdGh1YkJyYW5jaCB8fCAnbWFpbic7XG4gICAgY29uc3QgZ2l0aHViID0gbmV3IEdpdEh1YkFwaShcbiAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViVG9rZW4sXG4gICAgICB0aGlzLnNldHRpbmdzLmdpdGh1Yk93bmVyLFxuICAgICAgcmVwbyxcbiAgICAgIGJyYW5jaCxcbiAgICApO1xuXG4gICAgLy8gTWFyayBsb2FkaW5nIHNvIHRoZSB2aWV3IGNhbiBzaG93IGEgc3Bpbm5lci5cbiAgICB0aGlzLmxpdmVTdGF0dXNbc2l0ZS5pZF0gPSB7XG4gICAgICAuLi4odGhpcy5saXZlU3RhdHVzW3NpdGUuaWRdID8/IHt9KSxcbiAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgfTtcbiAgICB0aGlzLnJlZnJlc2hWaWV3KCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgW3JlcG9JbmZvLCB3b3JrZmxvd1J1biwgbGF0ZXN0Q29tbWl0XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgZ2l0aHViLmdldFJlcG9JbmZvKCksXG4gICAgICAgIGdpdGh1Yi5nZXRMYXRlc3RXb3JrZmxvd1J1bignZGVwbG95LnltbCcpLFxuICAgICAgICBnaXRodWIuZ2V0TGF0ZXN0Q29tbWl0KGJyYW5jaCksXG4gICAgICBdKTtcblxuICAgICAgbGV0IGNmV29ya2Zsb3dTdGF0dXMgPSB3b3JrZmxvd1J1bj8uc3RhdHVzID8/ICcnO1xuICAgICAgbGV0IGNmV29ya2Zsb3dDb25jbHVzaW9uID0gd29ya2Zsb3dSdW4/LmNvbmNsdXNpb24gPz8gJyc7XG4gICAgICBsZXQgY2ZXb3JrZmxvd1VybCA9IHdvcmtmbG93UnVuPy5odG1sVXJsID8/ICcnO1xuICAgICAgbGV0IGNmV29ya2Zsb3dVcGRhdGVkQXQgPSB3b3JrZmxvd1J1bj8udXBkYXRlZEF0ID8/ICcnO1xuXG4gICAgICBpZiAoc2l0ZS5ob3N0aW5nUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJyAmJiB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVUb2tlbiAmJiB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50ICYmIHNpdGUuY2xvdWRmbGFyZVByb2plY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjZiA9IG5ldyBDbG91ZGZsYXJlQXBpKHRoaXMuc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuLCB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50KTtcbiAgICAgICAgICBjb25zdCBjZkRlcGxveW1lbnRzID0gYXdhaXQgY2YubGlzdERlcGxveW1lbnRzKHNpdGUuY2xvdWRmbGFyZVByb2plY3QpO1xuICAgICAgICAgIGNvbnN0IGxhdGVzdENmID0gY2ZEZXBsb3ltZW50cz8ucmVzdWx0Py5bMF07XG4gICAgICAgICAgaWYgKGxhdGVzdENmKSB7XG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBsYXRlc3RDZi5zdGF0dXMgYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3F1ZXVlZCcgfHwgc3RhdHVzID09PSAncGVuZGluZycgfHwgc3RhdHVzID09PSAnaW5fcHJvZ3Jlc3MnKSB7XG4gICAgICAgICAgICAgIGNmV29ya2Zsb3dTdGF0dXMgPSAnaW5fcHJvZ3Jlc3MnO1xuICAgICAgICAgICAgICBjZldvcmtmbG93Q29uY2x1c2lvbiA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdzdWNjZXNzJyB8fCBzdGF0dXMgPT09ICdhY3RpdmUnKSB7XG4gICAgICAgICAgICAgIGNmV29ya2Zsb3dTdGF0dXMgPSAnY29tcGxldGVkJztcbiAgICAgICAgICAgICAgY2ZXb3JrZmxvd0NvbmNsdXNpb24gPSAnc3VjY2Vzcyc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2ZhaWx1cmUnIHx8IHN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICBjZldvcmtmbG93U3RhdHVzID0gJ2NvbXBsZXRlZCc7XG4gICAgICAgICAgICAgIGNmV29ya2Zsb3dDb25jbHVzaW9uID0gJ2ZhaWx1cmUnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09ICdjYW5jZWxlZCcpIHtcbiAgICAgICAgICAgICAgY2ZXb3JrZmxvd1N0YXR1cyA9ICdjb21wbGV0ZWQnO1xuICAgICAgICAgICAgICBjZldvcmtmbG93Q29uY2x1c2lvbiA9ICdjYW5jZWxsZWQnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2ZXb3JrZmxvd1N0YXR1cyA9ICdjb21wbGV0ZWQnO1xuICAgICAgICAgICAgICBjZldvcmtmbG93Q29uY2x1c2lvbiA9ICdzdWNjZXNzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNmV29ya2Zsb3dVcmwgPSAobGF0ZXN0Q2YudXJsIGFzIHN0cmluZyB8IHVuZGVmaW5lZCkgfHwgJyc7XG4gICAgICAgICAgICBjZldvcmtmbG93VXBkYXRlZEF0ID0gKGxhdGVzdENmLm1vZGlmaWVkX29uIGFzIHN0cmluZyB8IHVuZGVmaW5lZCkgfHwgKGxhdGVzdENmLmNyZWF0ZWRfb24gYXMgc3RyaW5nIHwgdW5kZWZpbmVkKSB8fCAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGNmRXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdOb3RlRmxhcmU6IGNvdWxkIG5vdCBmZXRjaCBDbG91ZGZsYXJlIHN0YXR1czonLCBjZkVycik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5saXZlU3RhdHVzW3NpdGUuaWRdID0ge1xuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgcmVwb0h0bWxVcmw6IHJlcG9JbmZvPy5odG1sVXJsID8/ICcnLFxuICAgICAgICByZXBvUHVzaGVkQXQ6IHJlcG9JbmZvPy5wdXNoZWRBdCA/PyAnJyxcbiAgICAgICAgd29ya2Zsb3dTdGF0dXM6IGNmV29ya2Zsb3dTdGF0dXMsXG4gICAgICAgIHdvcmtmbG93Q29uY2x1c2lvbjogY2ZXb3JrZmxvd0NvbmNsdXNpb24sXG4gICAgICAgIHdvcmtmbG93VXJsOiBjZldvcmtmbG93VXJsLFxuICAgICAgICB3b3JrZmxvd1VwZGF0ZWRBdDogY2ZXb3JrZmxvd1VwZGF0ZWRBdCxcbiAgICAgICAgY29tbWl0U2hhOiBsYXRlc3RDb21taXQ/LnNoYSA/PyAnJyxcbiAgICAgICAgY29tbWl0TWVzc2FnZTogbGF0ZXN0Q29tbWl0Py5tZXNzYWdlID8/ICcnLFxuICAgICAgICBjb21taXREYXRlOiBsYXRlc3RDb21taXQ/LmRhdGUgPz8gJycsXG4gICAgICAgIGZldGNoZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBlcnJvcjogJycsXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgdGhpcy5saXZlU3RhdHVzW3NpdGUuaWRdID0ge1xuICAgICAgICAuLi4odGhpcy5saXZlU3RhdHVzW3NpdGUuaWRdID8/IHt9KSxcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIGVycm9yOiAoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdTdGF0dXMgZmV0Y2ggZmFpbGVkJyksXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgfVxuXG4gIG9wZW5TZXR0aW5nc1RhYigpOiB2b2lkIHtcbiAgICBjb25zdCBzZXR0aW5nID0gKCh0aGlzLmFwcCBhcyB1bmtub3duKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikuc2V0dGluZyBhc1xuICAgICAgfCB7IG9wZW4/OiAoKSA9PiB2b2lkOyBvcGVuVGFiQnlJZD86IChpZDogc3RyaW5nKSA9PiB2b2lkIH1cbiAgICAgIHwgdW5kZWZpbmVkO1xuICAgIHNldHRpbmc/Lm9wZW4/LigpO1xuICAgIHNldHRpbmc/Lm9wZW5UYWJCeUlkPy4odGhpcy5tYW5pZmVzdC5pZCk7XG4gIH1cblxuICBwcml2YXRlIHRvVXNlck1lc3NhZ2UoZXJyOiB1bmtub3duLCBmYWxsYmFjazogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBtZXNzYWdlID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICcnO1xuICAgIHJldHVybiBtZXNzYWdlIHx8IGZhbGxiYWNrO1xuICB9XG59XG5cbi8qKlxuICogQnVpbGQgdGhlIGluLW1lbW9yeSBzZXR0aW5ncyBmcm9tIHdoYXRldmVyIGlzIGluIGBkYXRhLmpzb25gLCB1cGdyYWRpbmcgdHdvXG4gKiBsZWdhY3kgc2hhcGVzIHNvIGV4aXN0aW5nIHVzZXJzIGtlZXAgd29ya2luZzpcbiAqICAxLiBwbGFpbnRleHQgYGdpdGh1YlRva2VuYC9gY2xvdWRmbGFyZVRva2VuYCBcdTIxOTIgZGVjcnlwdC1vbi1sb2FkIHZpYSBgKkVuY2BcbiAqICAgICAodGhlIHBsYWludGV4dCBpcyBzY3J1YmJlZCBvbiB0aGUgbmV4dCBzYXZlKS5cbiAqICAyLiBmbGF0IHNpbmdsZS1zaXRlIGZpZWxkcyAoYGdpdGh1YlJlcG9gLCBgY2xvdWRmbGFyZVByb2plY3RgLCBcdTIwMjYpIFx1MjE5MiBvbmVcbiAqICAgICBTaXRlUHJvZmlsZSBpbiBgc2l0ZXNbXWAuXG4gKi9cbmZ1bmN0aW9uIG1pZ3JhdGVTZXR0aW5ncyhcbiAgbG9hZGVkOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwsXG4pOiB7IHNldHRpbmdzOiBOb3RlRmxhcmVTZXR0aW5ncyB9IHtcbiAgY29uc3Qgc2V0dGluZ3M6IE5vdGVGbGFyZVNldHRpbmdzID0ge1xuICAgIC4uLkRFRkFVTFRfU0VUVElOR1MsXG4gICAgc2l0ZXM6IFtdLFxuICAgIGJhY2t1cDogeyAuLi5ERUZBVUxUX0JBQ0tVUF9TRVRUSU5HUyB9LFxuICB9O1xuICBpZiAoIWxvYWRlZCkgcmV0dXJuIHsgc2V0dGluZ3MgfTtcblxuICBjb25zdCBzdHIgPSAodjogdW5rbm93bik6IHN0cmluZyA9PiAodHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdiA6ICcnKTtcbiAgc2V0dGluZ3MuZ2l0aHViT3duZXIgPSBzdHIobG9hZGVkLmdpdGh1Yk93bmVyKTtcbiAgc2V0dGluZ3MuY2xvdWRmbGFyZUFjY291bnQgPSBzdHIobG9hZGVkLmNsb3VkZmxhcmVBY2NvdW50KTtcbiAgc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeSA9IHN0cihsb2FkZWQubWFzdGVyUmVwb3NpdG9yeSkgfHwgJ25vdGVmbGFyZS1zaXRlcyc7XG4gIHNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnlQcml2YXRlID0gbG9hZGVkLm1hc3RlclJlcG9zaXRvcnlQcml2YXRlID09PSB0cnVlO1xuICBzZXR0aW5ncy5zZXR1cENvbXBsZXRlID0gbG9hZGVkLnNldHVwQ29tcGxldGUgPT09IHRydWU7XG4gIHNldHRpbmdzLmFjdGl2ZVNpdGVJZCA9IHN0cihsb2FkZWQuYWN0aXZlU2l0ZUlkKTtcbiAgc2V0dGluZ3MuZW5hYmxlQmFja3VwID0gbG9hZGVkLmVuYWJsZUJhY2t1cCA9PT0gdHJ1ZTtcbiAgc2V0dGluZ3MuZW5hYmxlUHVibGlzaCA9IGxvYWRlZC5lbmFibGVQdWJsaXNoICE9PSBmYWxzZTsgLy8gZGVmYXVsdCB0cnVlXG4gIGNvbnN0IHNhdmVkQmFja3VwID0gdHlwZW9mIGxvYWRlZC5iYWNrdXAgPT09ICdvYmplY3QnICYmIGxvYWRlZC5iYWNrdXAgIT09IG51bGxcbiAgICA/IGxvYWRlZC5iYWNrdXAgYXMgUGFydGlhbDxOb3RlRmxhcmVTZXR0aW5nc1snYmFja3VwJ10+XG4gICAgOiBudWxsO1xuICBzZXR0aW5ncy5iYWNrdXAgPSB7XG4gICAgLi4uREVGQVVMVF9CQUNLVVBfU0VUVElOR1MsXG4gICAgLi4uKHNhdmVkQmFja3VwID8/IHt9KSxcbiAgICByZXBvc2l0b3J5OiBzYXZlZEJhY2t1cD8ucmVwb3NpdG9yeSA/PyAnJyxcbiAgICByZXBvVmlzaWJpbGl0eTogc2F2ZWRCYWNrdXA/LnJlcG9WaXNpYmlsaXR5ID8/ICdwcml2YXRlJyxcbiAgICBiYWNrdXBPbkNoYW5nZTogc2F2ZWRCYWNrdXA/LmJhY2t1cE9uQ2hhbmdlID8/IHRydWUsXG4gICAgbGFzdEJhY2t1cEF0OiBzYXZlZEJhY2t1cD8ubGFzdEJhY2t1cEF0ID8/ICcnLFxuICB9O1xuXG4gIGlmIChsb2FkZWQuZ2l0aHViVG9rZW5FbmMpIHtcbiAgICBzZXR0aW5ncy5naXRodWJUb2tlbiA9IGRlY3J5cHRTZWNyZXQoc3RyKGxvYWRlZC5naXRodWJUb2tlbkVuYykpO1xuICB9XG4gIGlmIChsb2FkZWQuY2xvdWRmbGFyZVRva2VuRW5jKSB7XG4gICAgc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuID0gZGVjcnlwdFNlY3JldChzdHIobG9hZGVkLmNsb3VkZmxhcmVUb2tlbkVuYykpO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkobG9hZGVkLnNpdGVzKSkge1xuICAgIHNldHRpbmdzLnNpdGVzID0gKGxvYWRlZC5zaXRlcyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdKS5tYXAoKHMpID0+IHtcbiAgICAgIC8vIE1pZ3JhdGUgbGVnYWN5IHB1Ymxpc2hTY29wZSAoJ2ZvbGRlcicgfCAncGFnZScpIGFuZCBwdWJsaXNoUGF0aCB0byBwdWJsaXNoUGF0aHNcbiAgICAgIGxldCBwdWJsaXNoU2NvcGUgPSBzLnB1Ymxpc2hTY29wZSBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgcHVibGlzaFBhdGhzID0gcy5wdWJsaXNoUGF0aHMgYXMgc3RyaW5nW10gfCB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChwdWJsaXNoU2NvcGUgPT09ICdmb2xkZXInIHx8IHB1Ymxpc2hTY29wZSA9PT0gJ3BhZ2UnKSB7XG4gICAgICAgIHB1Ymxpc2hTY29wZSA9ICdzZWxlY3RlZCc7XG4gICAgICAgIGNvbnN0IGxlZ2FjeVBhdGggPSBzLnB1Ymxpc2hQYXRoIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGxlZ2FjeVBhdGggJiYgIXB1Ymxpc2hQYXRocykge1xuICAgICAgICAgIHB1Ymxpc2hQYXRocyA9IFtsZWdhY3lQYXRoXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNaWdyYXRlIGxlZ2FjeSBkZXBsb3lUYXJnZXQgdG8gaG9zdGluZ1Byb3ZpZGVyLCB0aGVuIGRpc2NhcmQgaXQuXG4gICAgICBsZXQgaG9zdGluZ1Byb3ZpZGVyID0gcy5ob3N0aW5nUHJvdmlkZXIgYXMgU2l0ZVByb2ZpbGVbJ2hvc3RpbmdQcm92aWRlciddIHwgdW5kZWZpbmVkO1xuICAgICAgaWYgKCFob3N0aW5nUHJvdmlkZXIpIHtcbiAgICAgICAgY29uc3QgbGVnYWN5VGFyZ2V0ID0gcy5kZXBsb3lUYXJnZXQgYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBob3N0aW5nUHJvdmlkZXIgPSBsZWdhY3lUYXJnZXQgPT09ICdjbG91ZGZsYXJlJyA/ICdjbG91ZGZsYXJlJyA6ICdnaXRodWItcGFnZXMnO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGRlcGxveVRhcmdldDogX2R0LCAuLi5yZXN0IH0gPSBzO1xuICAgICAgdm9pZCBfZHQ7IC8vIGNvbnN1bWVkIGJ5IG1pZ3JhdGlvbiBhYm92ZVxuXG4gICAgICByZXR1cm4gY3JlYXRlU2l0ZVByb2ZpbGUoe1xuICAgICAgICAuLi4ocmVzdCBhcyBQYXJ0aWFsPFNpdGVQcm9maWxlPiksXG4gICAgICAgIHB1Ymxpc2hTY29wZTogKHB1Ymxpc2hTY29wZSBhcyAndmF1bHQnIHwgJ3NlbGVjdGVkJykgfHwgJ3ZhdWx0JyxcbiAgICAgICAgcHVibGlzaFBhdGhzOiBwdWJsaXNoUGF0aHMgfHwgW10sXG4gICAgICAgIGhvc3RpbmdQcm92aWRlcixcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gRW5zdXJlIHRoZSBhY3RpdmUgaWQgcG9pbnRzIGF0IGEgcmVhbCBzaXRlLlxuICBpZiAoIXNldHRpbmdzLnNpdGVzLnNvbWUoKHMpID0+IHMuaWQgPT09IHNldHRpbmdzLmFjdGl2ZVNpdGVJZCkpIHtcbiAgICBzZXR0aW5ncy5hY3RpdmVTaXRlSWQgPSBzZXR0aW5ncy5zaXRlc1swXT8uaWQgPz8gJyc7XG4gIH1cblxuICByZXR1cm4geyBzZXR0aW5ncyB9O1xufSIsICJpbXBvcnQgeyByZXF1ZXN0VXJsIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgVXBsb2FkRmlsZSwgUHVibGlzaFJlc3VsdCB9IGZyb20gJy4uL2NvcmUvdHlwZXMnO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIGRvUmVxdWVzdCh1cmw6IHN0cmluZywgb3B0aW9uczogeyBtZXRob2Q/OiBzdHJpbmc7IGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+OyBib2R5Pzogc3RyaW5nIH0gPSB7fSkge1xuICBjb25zdCByZXNwID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgdXJsLFxuICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcsXG4gICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgIGJvZHk6IG9wdGlvbnMuYm9keSxcbiAgICB0aHJvdzogZmFsc2VcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgb2s6IHJlc3Auc3RhdHVzID49IDIwMCAmJiByZXNwLnN0YXR1cyA8IDMwMCxcbiAgICBzdGF0dXM6IHJlc3Auc3RhdHVzLFxuICAgIGpzb246IGFzeW5jICgpID0+IHJlc3AuanNvbiBhcyB1bmtub3duLFxuICAgIHRleHQ6IGFzeW5jICgpID0+IHJlc3AudGV4dFxuICB9O1xufVxuXG5jb25zdCBHSVRIVUJfQVBJID0gJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20nO1xuY29uc3QgQkFUQ0hfU0laRSA9IDEwO1xuY29uc3QgUkFURV9MSU1JVF9XQUlUX01TID0gNjAwMDA7XG5cbmV4cG9ydCBjbGFzcyBHaXRIdWJBcGkge1xuICBwcml2YXRlIHRva2VuOiBzdHJpbmc7XG4gIHByaXZhdGUgb3duZXI6IHN0cmluZztcbiAgcHJpdmF0ZSByZXBvOiBzdHJpbmc7XG4gIHByaXZhdGUgYnJhbmNoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdG9rZW46IHN0cmluZyxcbiAgICBvd25lcjogc3RyaW5nLFxuICAgIHJlcG86IHN0cmluZyxcbiAgICBicmFuY2ggPSAnJyxcbiAgKSB7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB0aGlzLnJlcG8gPSByZXBvLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICctJyk7XG4gICAgdGhpcy5icmFuY2ggPSBicmFuY2g7XG4gIH1cblxuICBwcml2YXRlIGdldCBoZWFkZXJzKCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4ge1xuICAgIHJldHVybiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgdG9rZW4gJHt0aGlzLnRva2VufWAsXG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViK2pzb24nLFxuICAgICAgJ1gtR2l0SHViLUFwaS1WZXJzaW9uJzogJzIwMjItMTEtMjgnLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2V0QXV0aGVudGljYXRlZFVzZXIoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgZG9SZXF1ZXN0KGAke0dJVEhVQl9BUEl9L3VzZXJgLCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICBpZiAoIXJlc3Aub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBHaXRIdWIgdG9rZW4gb3IgbWlzc2luZyByZXBvIHBlcm1pc3Npb24nKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IChhd2FpdCByZXNwLmpzb24oKSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgcmV0dXJuIChkYXRhPy5sb2dpbiBhcyBzdHJpbmcpO1xuICB9XG5cbiAgLyoqIFRoZSByZXBvJ3MgZGVmYXVsdCBicmFuY2ggKGUuZy4gYG1haW5gKS4gKi9cbiAgYXN5bmMgZ2V0RGVmYXVsdEJyYW5jaCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBkb1JlcXVlc3QoYCR7R0lUSFVCX0FQSX0vcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb31gLCB7XG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCByZWFkIHJlcG9zaXRvcnkgaW5mbyBmcm9tIEdpdEh1Yi4gQ2hlY2sgdGhlIHRva2VuIGFuZCByZXBvIG5hbWUuJyk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSAoYXdhaXQgcmVzcC5qc29uKCkpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIHJldHVybiAoZGF0YT8uZGVmYXVsdF9icmFuY2ggYXMgc3RyaW5nKSB8fCAnbWFpbic7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGVtcHR5IHB1YmxpYyByZXBvLCBpbml0aWFsaXNlZCB3aXRoIG9uZSBjb21taXQgb24gdGhlIGRlZmF1bHRcbiAgICogYnJhbmNoIChgbWFpbmApLiBOb3RlRmxhcmUgdGhlbiBjb21taXRzIHRoZSB1c2VyJ3MgY29udGVudCBwbHVzIGEgbWRnYXJkZW5cbiAgICogYHBhY2thZ2UuanNvbmAvYG1kZ2FyZGVuLmNvbmZpZy5qc29uYCBvbiB0b3AgXHUyMDE0IHRoZXJlJ3Mgbm8gdGVtcGxhdGUgZm9yaywgc29cbiAgICogdGhlcmUncyBubyB2NC92NSBicmFuY2ggZHJpZnQgdG8gbWFuYWdlLiBJZGVtcG90ZW50OiBhIDQyMiAoYWxyZWFkeSBleGlzdHMpXG4gICAqIGlzIHRyZWF0ZWQgYXMgc3VjY2VzcyBzbyBzZXR1cCBjYW4gYmUgcmUtcnVuLlxuICAgKi9cbiAgYXN5bmMgY3JlYXRlUmVwbyhwcml2YXRlUmVwbyA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChgJHtHSVRIVUJfQVBJfS91c2VyL3JlcG9zYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIG5hbWU6IHRoaXMucmVwbyxcbiAgICAgICAgcHJpdmF0ZTogcHJpdmF0ZVJlcG8sXG4gICAgICAgIGF1dG9faW5pdDogdHJ1ZSxcbiAgICAgICAgZGVzY3JpcHRpb246IHByaXZhdGVSZXBvID8gJ1ByaXZhdGUgdmF1bHQgYmFja3VwIG1hbmFnZWQgYnkgTm90ZUZsYXJlJyA6ICdQdWJsaXNoZWQgd2l0aCBOb3RlRmxhcmUgKG1kZ2FyZGVuKScsXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIGlmIChyZXNwLnN0YXR1cyA9PT0gNDIyKSB7XG4gICAgICAvLyA0MjIgYWxtb3N0IGFsd2F5cyBtZWFucyB0aGUgcmVwbyBuYW1lIGlzIGFscmVhZHkgdGFrZW4gXHUyMDE0IGVpdGhlciBieVxuICAgICAgLy8gdGhpcyB1c2VyIChpZGVtcG90ZW50IHN1Y2Nlc3MpIG9yIGJ5IHNvbWVvbmUgZWxzZSAobXVzdCByZW5hbWUpLlxuICAgICAgY29uc3QgZXJyQm9keSA9IChhd2FpdCByZXNwLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICBjb25zdCBnaE1lc3NhZ2U6IHN0cmluZyA9IChlcnJCb2R5Py5tZXNzYWdlIGFzIHN0cmluZykgPz8gJyc7XG4gICAgICBjb25zdCBlcnJvcnM6IEFycmF5PHsgbWVzc2FnZT86IHN0cmluZyB9PiA9IChlcnJCb2R5Py5lcnJvcnMgYXMgQXJyYXk8eyBtZXNzYWdlPzogc3RyaW5nIH0+KSA/PyBbXTtcbiAgICAgIGNvbnN0IGFscmVhZHlFeGlzdHMgPSBlcnJvcnMuc29tZSgoZSkgPT5cbiAgICAgICAgKGUubWVzc2FnZSA/PyAnJykudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYWxyZWFkeSBleGlzdCcpLFxuICAgICAgKSB8fCBnaE1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYWxyZWFkeSBleGlzdCcpO1xuXG4gICAgICBpZiAoYWxyZWFkeUV4aXN0cyAmJiBhd2FpdCB0aGlzLnJlcG9FeGlzdHMoKSkge1xuICAgICAgICAvLyBUaGUgcmVwbyBiZWxvbmdzIHRvIHRoaXMgYWNjb3VudCBcdTIwMTQgdHJlYXQgYXMgc3VjY2VzcyAocmUtcnVuIG9mIHNldHVwKS5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgQSBHaXRIdWIgcmVwb3NpdG9yeSBuYW1lZCBcIiR7dGhpcy5yZXBvfVwiIGFscmVhZHkgZXhpc3RzLiBgICtcbiAgICAgICAgJ1BsZWFzZSBjaG9vc2UgYSBkaWZmZXJlbnQgc2l0ZSBuYW1lIGFuZCB0cnkgYWdhaW4uJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFyZXNwLm9rKSB7XG4gICAgICBjb25zdCBlcnIgPSAoYXdhaXQgcmVzcC5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSkpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gY3JlYXRlIEdpdEh1YiByZXBvOiAkeyhlcnIgYXMgeyBtZXNzYWdlPzogc3RyaW5nIH0pLm1lc3NhZ2UgPz8gJ1Vua25vd24gZXJyb3InfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIEdpdEh1YiBQYWdlcyBmb3IgdGhlIHJlcG9zaXRvcnkgdXNpbmcgR2l0SHViIEFjdGlvbnMgYXMgdGhlIHNvdXJjZS5cbiAgICogVGhpcyBwcmV2ZW50cyB0aGUgNDA0IGVycm9yIGR1cmluZyB0aGUgZmlyc3QgZGVwbG95LXBhZ2VzIGFjdGlvbi5cbiAgICovXG4gIGFzeW5jIGVuYWJsZUdpdEh1YlBhZ2VzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBkb1JlcXVlc3QoYCR7R0lUSFVCX0FQSX0vcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vcGFnZXNgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLi4udGhpcy5oZWFkZXJzLFxuICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi92bmQuZ2l0aHViLnYzK2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgYnVpbGRfdHlwZTogJ3dvcmtmbG93JyxcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwLm9rICYmIHJlc3Auc3RhdHVzICE9PSA0MDkpIHsgLy8gNDA5IG1lYW5zIGFscmVhZHkgZW5hYmxlZFxuICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3AudGV4dCgpLmNhdGNoKCgpID0+ICcnKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGVuYWJsZSBHaXRIdWIgUGFnZXM6ICR7cmVzcC5zdGF0dXN9ICR7dGV4dH1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBoaWdoLWxldmVsIHJlcG9zaXRvcnkgbWV0YWRhdGEgZm9yIHRoZSBsaXZlIHN0YXR1cyBkYXNoYm9hcmQuXG4gICAqIFJldHVybnMgbnVsbCAobmV2ZXIgdGhyb3dzKSBzbyBjYWxsZXJzIGNhbiBmYWxsIGJhY2sgdG8gY2FjaGVkIGRhdGEuXG4gICAqL1xuICBhc3luYyBnZXRSZXBvSW5mbygpOiBQcm9taXNlPHtcbiAgICBodG1sVXJsOiBzdHJpbmc7XG4gICAgcHVzaGVkQXQ6IHN0cmluZztcbiAgICBpc1ByaXZhdGU6IGJvb2xlYW47XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgfSB8IG51bGw+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChgJHtHSVRIVUJfQVBJfS9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfWAsIHtcbiAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgfSk7XG4gICAgICBpZiAoIXJlc3Aub2spIHJldHVybiBudWxsO1xuICAgICAgY29uc3QgZGF0YSA9IChhd2FpdCByZXNwLmpzb24oKSkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gICAgICByZXR1cm4ge1xuICAgICAgICBodG1sVXJsOiAoZGF0YS5odG1sX3VybCBhcyBzdHJpbmcpIHx8ICcnLFxuICAgICAgICBwdXNoZWRBdDogKGRhdGEucHVzaGVkX2F0IGFzIHN0cmluZykgfHwgJycsXG4gICAgICAgIGlzUHJpdmF0ZTogKGRhdGEucHJpdmF0ZSBhcyBib29sZWFuKSB8fCBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246IChkYXRhLmRlc2NyaXB0aW9uIGFzIHN0cmluZykgfHwgJycsXG4gICAgICB9O1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG1vc3QgcmVjZW50IHdvcmtmbG93IHJ1biBmb3IgdGhlIGdpdmVuIHdvcmtmbG93IGZpbGUuXG4gICAqIGB3b3JrZmxvd0ZpbGVgIGlzIHRoZSBmaWxlbmFtZSB1bmRlciBgLmdpdGh1Yi93b3JrZmxvd3MvYCwgZS5nLiBgZGVwbG95LnltbGAuXG4gICAqIFJldHVybnMgbnVsbCAobmV2ZXIgdGhyb3dzKSBvbiBhbnkgZXJyb3IuXG4gICAqL1xuICBhc3luYyBnZXRMYXRlc3RXb3JrZmxvd1J1bih3b3JrZmxvd0ZpbGU6IHN0cmluZyk6IFByb21pc2U8e1xuICAgIHN0YXR1czogc3RyaW5nOyAgICAgICAvLyAncXVldWVkJyB8ICdpbl9wcm9ncmVzcycgfCAnY29tcGxldGVkJ1xuICAgIGNvbmNsdXNpb246IHN0cmluZzsgICAvLyAnc3VjY2VzcycgfCAnZmFpbHVyZScgfCAnY2FuY2VsbGVkJyB8ICcnICh3aGVuIGluX3Byb2dyZXNzKVxuICAgIGh0bWxVcmw6IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IHN0cmluZztcbiAgICB1cGRhdGVkQXQ6IHN0cmluZztcbiAgfSB8IG51bGw+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChcbiAgICAgICAgYCR7R0lUSFVCX0FQSX0vcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vYWN0aW9ucy93b3JrZmxvd3MvJHtlbmNvZGVVUklDb21wb25lbnQod29ya2Zsb3dGaWxlKX0vcnVucz9wZXJfcGFnZT0xYCxcbiAgICAgICAgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSxcbiAgICAgICk7XG4gICAgICBpZiAoIXJlc3Aub2spIHJldHVybiBudWxsO1xuICAgICAgY29uc3QgZGF0YSA9IChhd2FpdCByZXNwLmpzb24oKSkgYXMgeyB3b3JrZmxvd19ydW5zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXSB9O1xuICAgICAgY29uc3QgcnVuID0gZGF0YS53b3JrZmxvd19ydW5zPy5bMF07XG4gICAgICBpZiAoIXJ1bikgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXM6IChydW4uc3RhdHVzIGFzIHN0cmluZykgfHwgJycsXG4gICAgICAgIGNvbmNsdXNpb246IChydW4uY29uY2x1c2lvbiBhcyBzdHJpbmcpIHx8ICcnLFxuICAgICAgICBodG1sVXJsOiAocnVuLmh0bWxfdXJsIGFzIHN0cmluZykgfHwgJycsXG4gICAgICAgIGNyZWF0ZWRBdDogKHJ1bi5jcmVhdGVkX2F0IGFzIHN0cmluZykgfHwgJycsXG4gICAgICAgIHVwZGF0ZWRBdDogKHJ1bi51cGRhdGVkX2F0IGFzIHN0cmluZykgfHwgJycsXG4gICAgICB9O1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRpcCBjb21taXQgaW5mbyBmb3IgYSBicmFuY2guXG4gICAqIFJldHVybnMgbnVsbCAobmV2ZXIgdGhyb3dzKSBvbiBhbnkgZXJyb3IuXG4gICAqL1xuICBhc3luYyBnZXRMYXRlc3RDb21taXQoYnJhbmNoPzogc3RyaW5nKTogUHJvbWlzZTx7XG4gICAgc2hhOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGRhdGU6IHN0cmluZztcbiAgICBhdXRob3I6IHN0cmluZztcbiAgICBodG1sVXJsOiBzdHJpbmc7XG4gIH0gfCBudWxsPiB7XG4gICAgY29uc3QgcmVmID0gYnJhbmNoIHx8IHRoaXMuYnJhbmNoIHx8ICdtYWluJztcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGRvUmVxdWVzdChcbiAgICAgICAgYCR7R0lUSFVCX0FQSX0vcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vY29tbWl0cy8ke2VuY29kZVVSSUNvbXBvbmVudChyZWYpfWAsXG4gICAgICAgIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0sXG4gICAgICApO1xuICAgICAgaWYgKCFyZXNwLm9rKSByZXR1cm4gbnVsbDtcbiAgICAgIGNvbnN0IGRhdGEgPSAoYXdhaXQgcmVzcC5qc29uKCkpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgICAgY29uc3QgY29tbWl0ID0gZGF0YS5jb21taXQgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBjb21taXRBdXRob3IgPSBjb21taXQ/LmF1dGhvciBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNoYTogKChkYXRhLnNoYSBhcyBzdHJpbmcpIHx8ICcnKS5zbGljZSgwLCA3KSxcbiAgICAgICAgbWVzc2FnZTogKChjb21taXQ/Lm1lc3NhZ2UgYXMgc3RyaW5nKSB8fCAnJykuc3BsaXQoJ1xcbicpWzBdLFxuICAgICAgICBkYXRlOiAoY29tbWl0QXV0aG9yPy5kYXRlIGFzIHN0cmluZykgfHwgJycsXG4gICAgICAgIGF1dGhvcjogKGNvbW1pdEF1dGhvcj8ubmFtZSBhcyBzdHJpbmcpIHx8ICcnLFxuICAgICAgICBodG1sVXJsOiAoZGF0YS5odG1sX3VybCBhcyBzdHJpbmcpIHx8ICcnLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUaGluIEpTT04gd3JhcHBlciBhcm91bmQgdGhlIEdpdEh1YiBSRVNUIEFQSTsgdGhyb3dzIHdpdGggLnN0YXR1cyBvbiBlcnJvci4gKi9cbiAgcHJpdmF0ZSBhc3luYyBnaDxUPihwYXRoOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBib2R5PzogdW5rbm93bik6IFByb21pc2U8VD4ge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBkb1JlcXVlc3QoYCR7R0lUSFVCX0FQSX0ke3BhdGh9YCwge1xuICAgICAgbWV0aG9kLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgYm9keTogYm9keSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwLm9rKSB7XG4gICAgICBjb25zdCBlcnJCb2R5ID0gKGF3YWl0IHJlc3AuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvciggKGVyckJvZHk/Lm1lc3NhZ2UgYXMgc3RyaW5nKSA/PyBgR2l0SHViIHJlcXVlc3QgZmFpbGVkICgke3Jlc3Auc3RhdHVzfSlgICkgYXMgRXJyb3IgJiB7IHN0YXR1cz86IG51bWJlciB9O1xuICAgICAgZXJyLnN0YXR1cyA9IHJlc3Auc3RhdHVzO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICByZXR1cm4gKGF3YWl0IHJlc3AuanNvbigpKSBhcyBUO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBldmVyeSBmaWxlIGFzIGEgU0lOR0xFIGdpdCBjb21taXQgdmlhIHRoZSBHaXQgRGF0YSBBUElcbiAgICogKGJsb2JzIFx1MjE5MiB0cmVlIFx1MjE5MiBjb21taXQgXHUyMTkyIG1vdmUgYnJhbmNoIHJlZiksIGluc3RlYWQgb2Ygb25lIENvbnRlbnRzLUFQSSBQVVRcbiAgICogcGVyIGZpbGUuIE9uZSBjb21taXQgbWVhbnMgQ2xvdWRmbGFyZSBydW5zIGV4YWN0bHkgb25lIGJ1aWxkIHBlciBwdWJsaXNoLFxuICAgKiBhbmQgdGhlcmUgYXJlIG5vIHBlci1maWxlIFNIQSBjb25mbGljdHMgKHRoZSBuZXcgdHJlZSBpcyBsYXllcmVkIG9uIHRoZVxuICAgKiBjdXJyZW50IHRyZWUgd2l0aCBgYmFzZV90cmVlYCksIHdoaWNoIGtpbGxzIHRoZSA0MDkvNDIyIGVycm9ycyBlbnRpcmVseS5cbiAgICovXG4gIGFzeW5jIGNvbW1pdEZpbGVzKFxuICAgIGZpbGVzOiBVcGxvYWRGaWxlW10sXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIG9uUHJvZ3Jlc3M6IChkb25lOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpID0+IHZvaWQsXG4gICAgb25SYXRlTGltaXQ/OiAoc2Vjc0xlZnQ6IG51bWJlcikgPT4gdm9pZCxcbiAgICBtaXJyb3JQcmVmaXggPSAnJyxcbiAgICBvcHRpb25zPzogeyBpc1ByaXZhdGU/OiBib29sZWFuIH1cbiAgKTogUHJvbWlzZTxQdWJsaXNoUmVzdWx0ICYgeyBjb21taXRTaGE/OiBzdHJpbmcgfT4ge1xuICAgIGNvbnN0IHJlc3VsdDogUHVibGlzaFJlc3VsdCAmIHsgY29tbWl0U2hhPzogc3RyaW5nIH0gPSB7IHN1Y2Nlc3M6IHRydWUsIHVwbG9hZGVkOiAwLCBub3RlQ291bnQ6IDAsIGZhaWxlZDogMCwgZXJyb3JzOiBbXSwgZml4ZWQ6IDAsIGlzc3VlczogW10gfTtcbiAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzdWx0O1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMucmVwb0V4aXN0cygpO1xuICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgY29uc3QgaXNQcml2YXRlID0gb3B0aW9ucz8uaXNQcml2YXRlIHx8IGZhbHNlO1xuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVJlcG8oaXNQcml2YXRlKTtcbiAgICAgICAgY29uc3QgcmVhZHkgPSBhd2FpdCB0aGlzLndhaXRGb3JSZXBvKDMwMDAwKTtcbiAgICAgICAgaWYgKCFyZWFkeSkge1xuICAgICAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgcmVzdWx0LmVycm9ycy5wdXNoKCdUaW1lZCBvdXQgd2FpdGluZyBmb3IgcmVwb3NpdG9yeSBjcmVhdGlvbiBvbiBHaXRIdWIuJyk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICByZXN1bHQuZXJyb3JzLnB1c2goYEZhaWxlZCB0byBjaGVjayBvciBjcmVhdGUgcmVwb3NpdG9yeTogJHsoZSBhcyBFcnJvcikubWVzc2FnZX1gKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmJyYW5jaCkge1xuICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgIHJlc3VsdC5lcnJvcnMucHVzaCgnTm8gYnJhbmNoIHNwZWNpZmllZC4gUnVuIHNldHVwIHRvIGRldGVjdCB0aGUgcmVwb3NpdG9yeSBkZWZhdWx0IGJyYW5jaC4nKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGNvbnN0IGJyYW5jaCA9IHRoaXMuYnJhbmNoO1xuICAgIGNvbnN0IHJlZlBhdGggPSBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC9yZWZzL2hlYWRzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KGJyYW5jaCl9YDtcblxuICAgIC8vIDEuIEN1cnJlbnQgYnJhbmNoIHRpcCArIGl0cyBiYXNlIHRyZWUuXG4gICAgbGV0IGhlYWRTaGE6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIGxldCBiYXNlVHJlZVNoYTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGJyYW5jaEV4aXN0cyA9IHRydWU7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVmID0gYXdhaXQgdGhpcy5naDx7IG9iamVjdDogeyBzaGE6IHN0cmluZyB9IH0+KHJlZlBhdGgsICdHRVQnKTtcbiAgICAgIGhlYWRTaGEgPSByZWYub2JqZWN0LnNoYTtcbiAgICAgIGNvbnN0IGhlYWRDb21taXQgPSBhd2FpdCB0aGlzLmdoPHsgdHJlZTogeyBzaGE6IHN0cmluZyB9IH0+KFxuICAgICAgICBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC9jb21taXRzLyR7aGVhZFNoYX1gLFxuICAgICAgICAnR0VUJyxcbiAgICAgICk7XG4gICAgICBiYXNlVHJlZVNoYSA9IGhlYWRDb21taXQudHJlZS5zaGE7XG4gICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICBpZiAoKGVyciBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgLy8gQnJhbmNoIGRvZXNuJ3QgZXhpc3QgXHUyMDE0IGZpcnN0IGNvbW1pdCBzY2VuYXJpby5cbiAgICAgICAgYnJhbmNoRXhpc3RzID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICByZXN1bHQuZXJyb3JzLnB1c2goYENvdWxkIG5vdCByZWFkIGJyYW5jaCBcIiR7YnJhbmNofVwiOiAkeyhlcnIgYXMgRXJyb3IpLm1lc3NhZ2V9YCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMi4gQ3JlYXRlIGEgYmxvYiBwZXIgZmlsZSAoYmF0Y2hlZCwgd2l0aCByYXRlLWxpbWl0IGJhY2tvZmYpLlxuICAgIGNvbnN0IHRyZWVJdGVtczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IG1vZGU6ICcxMDA2NDQnOyB0eXBlOiAnYmxvYic7IHNoYTogc3RyaW5nIHwgbnVsbCB9PiA9IFtdO1xuICAgIGxldCBkb25lID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSArPSBCQVRDSF9TSVpFKSB7XG4gICAgICBjb25zdCBiYXRjaCA9IGZpbGVzLnNsaWNlKGksIGkgKyBCQVRDSF9TSVpFKTtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBiYXRjaC5tYXAoYXN5bmMgKGZpbGUpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGZpbGUuY29udGVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICB0cmVlSXRlbXMucHVzaCh7IHBhdGg6IGZpbGUucGF0aCwgbW9kZTogJzEwMDY0NCcsIHR5cGU6ICdibG9iJywgc2hhOiBudWxsIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2hhID0gYXdhaXQgdGhpcy5jcmVhdGVCbG9iV2l0aFJldHJ5KGZpbGUuY29udGVudCwgb25SYXRlTGltaXQpO1xuICAgICAgICAgICAgICB0cmVlSXRlbXMucHVzaCh7IHBhdGg6IGZpbGUucGF0aCwgbW9kZTogJzEwMDY0NCcsIHR5cGU6ICdibG9iJywgc2hhIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnVwbG9hZGVkKys7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgICByZXN1bHQuZmFpbGVkKys7XG4gICAgICAgICAgICByZXN1bHQuZXJyb3JzLnB1c2goYCR7ZmlsZS5wYXRofTogJHsoZXJyIGFzIEVycm9yKS5tZXNzYWdlfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkb25lKys7XG4gICAgICAgICAgb25Qcm9ncmVzcyhkb25lLCBmaWxlcy5sZW5ndGgpO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICBpZiAoaSArIEJBVENIX1NJWkUgPCBmaWxlcy5sZW5ndGgpIHtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UociA9PiB3aW5kb3cuc2V0VGltZW91dChyLCAxMDApKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LnVwbG9hZGVkID09PSAwKSB7XG4gICAgICByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBOZXZlciByZW1vdmUgcmVtb3RlIGJhY2t1cCBmaWxlcyB3aGVuIGFub3RoZXIgdXBsb2FkIGluIHRoZSBzYW1lIGJhdGNoXG4gICAgLy8gZmFpbGVkLiBBIGxhdGVyIHN1Y2Nlc3NmdWwgcnVuIGNhbiBzYWZlbHkgYXBwbHkgdGhvc2UgZGVsZXRpb25zLlxuICAgIGlmIChyZXN1bHQuZmFpbGVkID4gMCkge1xuICAgICAgZm9yIChsZXQgaW5kZXggPSB0cmVlSXRlbXMubGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgICAgICBpZiAodHJlZUl0ZW1zW2luZGV4XS5zaGEgPT09IG51bGwpIHRyZWVJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHRyZWVJdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAyYi4gTWlycm9yOiB3aGVuIGV2ZXJ5IGZpbGUgdXBsb2FkZWQgY2xlYW5seSwgZGVsZXRlIGFueSBleGlzdGluZyBibG9ic1xuICAgIC8vIHVuZGVyIGBtaXJyb3JQcmVmaXhgIHRoYXQgYXJlbid0IGluIHRoaXMgcHVibGlzaCBcdTIwMTQgdGhpcyBzdHJpcHMgYW55IHByZXZpb3VzXG4gICAgLy8gdGVtcGxhdGUncyBkZW1vIHBhZ2VzIGFuZCBhbnkgbm90ZXMgcmVtb3ZlZC9leGNsdWRlZCBmcm9tIHRoZSB2YXVsdCwgc29cbiAgICAvLyB0aGUgbGl2ZSBzaXRlIG1hdGNoZXMgdGhlIHZhdWx0IGV4YWN0bHkuIFNraXBwZWQgb24gcGFydGlhbCBmYWlsdXJlIChzbyBhXG4gICAgLy8gaGljY3VwIG5ldmVyIHdpcGVzIGNvbnRlbnQpIGFuZCBiZXN0LWVmZm9ydCAoc2tpcCBpZiB0aGUgdHJlZSBjYW4ndCBsaXN0KS5cbiAgICBpZiAobWlycm9yUHJlZml4ICYmIHJlc3VsdC5mYWlsZWQgPT09IDAgJiYgYmFzZVRyZWVTaGEpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZ1bGwgPSBhd2FpdCB0aGlzLmdoPHsgdHJlZTogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IHR5cGU6IHN0cmluZyB9PiB9PihcbiAgICAgICAgICBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC90cmVlcy8ke2Jhc2VUcmVlU2hhfT9yZWN1cnNpdmU9MWAsXG4gICAgICAgICAgJ0dFVCcsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGtlZXAgPSBuZXcgU2V0KGZpbGVzLm1hcChmID0+IGYucGF0aCkpO1xuICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGZ1bGwudHJlZSkge1xuICAgICAgICAgIGlmIChlbnRyeS50eXBlID09PSAnYmxvYicgJiYgZW50cnkucGF0aC5zdGFydHNXaXRoKG1pcnJvclByZWZpeCkgJiYgIWtlZXAuaGFzKGVudHJ5LnBhdGgpKSB7XG4gICAgICAgICAgICB0cmVlSXRlbXMucHVzaCh7IHBhdGg6IGVudHJ5LnBhdGgsIG1vZGU6ICcxMDA2NDQnLCB0eXBlOiAnYmxvYicsIHNoYTogbnVsbCB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBDb3VsZG4ndCByZWFkIHRoZSBleGlzdGluZyB0cmVlIFx1MjAxNCBrZWVwIGdvaW5nIHdpdGggYWRkcy91cGRhdGVzIG9ubHkuXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gMy4gVHJlZSBcdTIxOTIgY29tbWl0IFx1MjE5MiBmYXN0LWZvcndhcmQgdGhlIGJyYW5jaCByZWYuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRyZWUgPSBhd2FpdCB0aGlzLmdoPHsgc2hhOiBzdHJpbmcgfT4oXG4gICAgICAgIGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L3RyZWVzYCxcbiAgICAgICAgJ1BPU1QnLFxuICAgICAgICBiYXNlVHJlZVNoYSA/IHsgYmFzZV90cmVlOiBiYXNlVHJlZVNoYSwgdHJlZTogdHJlZUl0ZW1zIH0gOiB7IHRyZWU6IHRyZWVJdGVtcyB9LFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNvbW1pdCA9IGF3YWl0IHRoaXMuZ2g8eyBzaGE6IHN0cmluZyB9PihcbiAgICAgICAgYC9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9naXQvY29tbWl0c2AsXG4gICAgICAgICdQT1NUJyxcbiAgICAgICAgaGVhZFNoYSA/IHsgbWVzc2FnZSwgdHJlZTogdHJlZS5zaGEsIHBhcmVudHM6IFtoZWFkU2hhXSB9IDogeyBtZXNzYWdlLCB0cmVlOiB0cmVlLnNoYSwgcGFyZW50czogW10gfSxcbiAgICAgICk7XG4gICAgICByZXN1bHQuY29tbWl0U2hhID0gY29tbWl0LnNoYTtcblxuICAgICAgaWYgKGJyYW5jaEV4aXN0cykge1xuICAgICAgICBhd2FpdCB0aGlzLmdoKHJlZlBhdGgsICdQQVRDSCcsIHsgc2hhOiBjb21taXQuc2hhLCBmb3JjZTogZmFsc2UgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCB0aGlzLmdoKGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L3JlZnNgLCAnUE9TVCcsIHtcbiAgICAgICAgICByZWY6IGByZWZzL2hlYWRzLyR7YnJhbmNofWAsXG4gICAgICAgICAgc2hhOiBjb21taXQuc2hhLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICByZXN1bHQuZXJyb3JzLnB1c2goYENvbW1pdCBmYWlsZWQ6ICR7KGVyciBhcyBFcnJvcikubWVzc2FnZX1gKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdC5mYWlsZWQgPiAwKSByZXN1bHQuc3VjY2VzcyA9IGZhbHNlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZUJsb2JXaXRoUmV0cnkoXG4gICAgYmFzZTY0Q29udGVudDogc3RyaW5nLFxuICAgIG9uUmF0ZUxpbWl0PzogKHNlY3NMZWZ0OiBudW1iZXIpID0+IHZvaWQsXG4gICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgbGV0IGxhc3RFcnI6IEVycm9yIHwgbnVsbCA9IG51bGw7XG4gICAgZm9yIChsZXQgYXR0ZW1wdCA9IDA7IGF0dGVtcHQgPCAzOyBhdHRlbXB0KyspIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCB0aGlzLmdoPHsgc2hhOiBzdHJpbmcgfT4oXG4gICAgICAgICAgYC9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9naXQvYmxvYnNgLFxuICAgICAgICAgICdQT1NUJyxcbiAgICAgICAgICB7IGNvbnRlbnQ6IGJhc2U2NENvbnRlbnQsIGVuY29kaW5nOiAnYmFzZTY0JyB9LFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYmxvYi5zaGE7XG4gICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgbGFzdEVyciA9IGVyciBhcyBFcnJvcjtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gKGxhc3RFcnIgYXMgRXJyb3IgJiB7IHN0YXR1cz86IG51bWJlciB9KS5zdGF0dXM7XG4gICAgICAgIGNvbnN0IG1zZyA9IGxhc3RFcnIubWVzc2FnZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcmF0ZUxpbWl0ZWQgPVxuICAgICAgICAgIHN0YXR1cyA9PT0gNDI5IHx8XG4gICAgICAgICAgKHN0YXR1cyA9PT0gNDAzICYmIChtc2cuaW5jbHVkZXMoJ3JhdGUgbGltaXQnKSB8fCBtc2cuaW5jbHVkZXMoJ2FidXNlJykgfHwgbXNnLmluY2x1ZGVzKCdzZWNvbmRhcnknKSkpO1xuICAgICAgICAgIFxuICAgICAgICBpZiAoc3RhdHVzID09PSA0MDQgfHwgc3RhdHVzID09PSA0MDEgfHwgKHN0YXR1cyA9PT0gNDAzICYmICFyYXRlTGltaXRlZCkpIHtcbiAgICAgICAgICB0aHJvdyBsYXN0RXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJhdGVMaW1pdGVkKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy53YWl0V2l0aENvdW50ZG93bihSQVRFX0xJTUlUX1dBSVRfTVMsIG9uUmF0ZUxpbWl0KTtcbiAgICAgICAgfSBlbHNlIGlmIChhdHRlbXB0IDwgMikge1xuICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gd2luZG93LnNldFRpbWVvdXQociwgMTAwMCAqIE1hdGgucG93KDIsIGF0dGVtcHQpKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbGFzdEVyciA/PyBuZXcgRXJyb3IoJ0Jsb2IgY3JlYXRpb24gZmFpbGVkJyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHdhaXRXaXRoQ291bnRkb3duKG1zOiBudW1iZXIsIG9uVGljaz86IChzZWNzTGVmdDogbnVtYmVyKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFvblRpY2spIHtcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gd2luZG93LnNldFRpbWVvdXQociwgbXMpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHNlY3NMZWZ0ID0gTWF0aC5jZWlsKG1zIC8gMTAwMCk7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc2Vjc0xlZnQtLTtcbiAgICAgIGlmIChzZWNzTGVmdCA+PSAwKSBvblRpY2soc2Vjc0xlZnQpO1xuICAgIH0sIDEwMDApO1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gd2luZG93LnNldFRpbWVvdXQociwgbXMpKTtcbiAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH1cblxuICBhc3luYyByZXBvRXhpc3RzKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBkb1JlcXVlc3QoXG4gICAgICBgJHtHSVRIVUJfQVBJfS9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfWAsXG4gICAgICB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9LFxuICAgICk7XG4gICAgcmV0dXJuIHJlc3Aub2s7XG4gIH1cblxuICBhc3luYyBpc1JlcG9Qcml2YXRlKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBkb1JlcXVlc3QoXG4gICAgICBgJHtHSVRIVUJfQVBJfS9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfWAsXG4gICAgICB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9LFxuICAgICk7XG4gICAgaWYgKCFyZXNwLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCB2ZXJpZnkgYmFja3VwIHN0b3JhZ2UgcHJpdmFjeS4nKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3AuanNvbigpIGFzIHsgcHJpdmF0ZT86IGJvb2xlYW4gfTtcbiAgICByZXR1cm4gZGF0YS5wcml2YXRlID09PSB0cnVlO1xuICB9XG5cbiAgYXN5bmMgd2FpdEZvclJlcG8obWF4V2FpdE1zID0gMzAwMDApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgd2hpbGUgKERhdGUubm93KCkgLSBzdGFydCA8IG1heFdhaXRNcykge1xuICAgICAgaWYgKGF3YWl0IHRoaXMucmVwb0V4aXN0cygpKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gd2luZG93LnNldFRpbWVvdXQociwgMjAwMCkpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggdGhlIGZsYXQgZmlsZSB0cmVlIGZvciB0aGUgcmVwb3NpdG9yeSdzIGludGVybmFsIHN0b3JhZ2UgcmVmZXJlbmNlLlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHsgcGF0aCwgc2hhLCB0eXBlIH0gb2JqZWN0cyBmb3IgYWxsIGJsb2JzIChmaWxlcykuXG4gICAqIFVzZWQgYnkgQmFja3VwRW5naW5lIHRvIGF2b2lkIHJlLXVwbG9hZGluZyB1bmNoYW5nZWQgZmlsZXMuXG4gICAqL1xuICBhc3luYyBsaXN0VHJlZShicmFuY2g/OiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PHsgcGF0aDogc3RyaW5nOyBzaGE6IHN0cmluZzsgdHlwZTogc3RyaW5nIH0+PiB7XG4gICAgY29uc3QgcmVmID0gYnJhbmNoIHx8IHRoaXMuYnJhbmNoIHx8ICdtYWluJztcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5naDx7IHRyZWU6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBzaGE6IHN0cmluZzsgdHlwZTogc3RyaW5nIH0+IH0+KFxuICAgICAgYC9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9naXQvdHJlZXMvJHtlbmNvZGVVUklDb21wb25lbnQocmVmKX0/cmVjdXJzaXZlPTFgLFxuICAgICAgJ0dFVCcsXG4gICAgKTtcbiAgICByZXR1cm4gKGRhdGEudHJlZSA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnR5cGUgPT09ICdibG9iJyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgc2l0ZSdzIGVudGlyZSBzdWItZm9sZGVyIChgc2l0ZXMvPHNpdGVJZD4vYCkgZnJvbSB0aGUgbWFzdGVyIHJlcG9cbiAgICogaW4gYSBzaW5nbGUgY29tbWl0IHVzaW5nIG51bGwtU0hBIHRyZWUgZW50cmllcyAodGhlIHNhbWUgbWlycm9yLWRlbGV0aW9uXG4gICAqIG1lY2hhbmlzbSB1c2VkIGJ5IHB1Ymxpc2gpLiBEb2VzIE5PVCBkZWxldGUgdGhlIG1hc3RlciByZXBvIFx1MjAxNCBvdGhlciBzaXRlc1xuICAgKiBtYXkgc3RpbGwgYmUgbGl2aW5nIHRoZXJlLiBCZXN0LWVmZm9ydDogaWYgdGhlIGZvbGRlciBkb2Vzbid0IGV4aXN0IG9yIHRoZVxuICAgKiByZXBvIGlzIHVucmVhY2hhYmxlLCB0aGlzIHJldHVybnMgd2l0aG91dCB0aHJvd2luZy5cbiAgICovXG4gIGFzeW5jIGRlbGV0ZVNpdGVGb2xkZXIoc2l0ZUlkOiBzdHJpbmcsIGJyYW5jaDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcHJlZml4ID0gYHNpdGVzLyR7c2l0ZUlkfS9gO1xuXG4gICAgLy8gUmVzb2x2ZSB0aGUgYnJhbmNoIHRpcC5cbiAgICBsZXQgaGVhZFNoYTogc3RyaW5nO1xuICAgIGxldCBiYXNlVHJlZVNoYTogc3RyaW5nO1xuICAgIGNvbnN0IHJlZlBhdGggPSBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC9yZWZzL2hlYWRzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KGJyYW5jaCl9YDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZWYgPSBhd2FpdCB0aGlzLmdoPHsgb2JqZWN0OiB7IHNoYTogc3RyaW5nIH0gfT4ocmVmUGF0aCwgJ0dFVCcpO1xuICAgICAgaGVhZFNoYSA9IHJlZi5vYmplY3Quc2hhO1xuICAgICAgY29uc3QgaGVhZENvbW1pdCA9IGF3YWl0IHRoaXMuZ2g8eyB0cmVlOiB7IHNoYTogc3RyaW5nIH0gfT4oXG4gICAgICAgIGAvcmVwb3MvJHt0aGlzLm93bmVyfS8ke3RoaXMucmVwb30vZ2l0L2NvbW1pdHMvJHtoZWFkU2hhfWAsXG4gICAgICAgICdHRVQnLFxuICAgICAgKTtcbiAgICAgIGJhc2VUcmVlU2hhID0gaGVhZENvbW1pdC50cmVlLnNoYTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFJlcG8gb3IgYnJhbmNoIGRvZXNuJ3QgZXhpc3QgXHUyMDE0IG5vdGhpbmcgdG8gZGVsZXRlLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEZpbmQgYWxsIGJsb2JzIHVuZGVyIHRoZSBzaXRlIHByZWZpeC5cbiAgICBsZXQgdG9EZWxldGU6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBtb2RlOiAnMTAwNjQ0JzsgdHlwZTogJ2Jsb2InOyBzaGE6IG51bGwgfT4gPSBbXTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZnVsbFRyZWUgPSBhd2FpdCB0aGlzLmdoPHsgdHJlZTogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IHR5cGU6IHN0cmluZyB9PiB9PihcbiAgICAgICAgYC9yZXBvcy8ke3RoaXMub3duZXJ9LyR7dGhpcy5yZXBvfS9naXQvdHJlZXMvJHtiYXNlVHJlZVNoYX0/cmVjdXJzaXZlPTFgLFxuICAgICAgICAnR0VUJyxcbiAgICAgICk7XG4gICAgICB0b0RlbGV0ZSA9IGZ1bGxUcmVlLnRyZWVcbiAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50eXBlID09PSAnYmxvYicgJiYgaXRlbS5wYXRoLnN0YXJ0c1dpdGgocHJlZml4KSlcbiAgICAgICAgLm1hcCgoaXRlbSkgPT4gKHsgcGF0aDogaXRlbS5wYXRoLCBtb2RlOiAnMTAwNjQ0JyBhcyBjb25zdCwgdHlwZTogJ2Jsb2InIGFzIGNvbnN0LCBzaGE6IG51bGwgfSkpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuOyAvLyBDYW4ndCByZWFkIHRoZSB0cmVlIFx1MjAxNCBza2lwIHNpbGVudGx5LlxuICAgIH1cblxuICAgIGlmICh0b0RlbGV0ZS5sZW5ndGggPT09IDApIHJldHVybjsgLy8gTm90aGluZyB1bmRlciB0aGF0IHByZWZpeC5cblxuICAgIC8vIENvbW1pdCB0aGUgZGVsZXRpb25zIGFzIGEgc2luZ2xlIHRyZWUgdXBkYXRlLlxuICAgIGNvbnN0IHRyZWUgPSBhd2FpdCB0aGlzLmdoPHsgc2hhOiBzdHJpbmcgfT4oXG4gICAgICBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC90cmVlc2AsXG4gICAgICAnUE9TVCcsXG4gICAgICB7IGJhc2VfdHJlZTogYmFzZVRyZWVTaGEsIHRyZWU6IHRvRGVsZXRlIH0sXG4gICAgKTtcbiAgICBjb25zdCBjb21taXQgPSBhd2FpdCB0aGlzLmdoPHsgc2hhOiBzdHJpbmcgfT4oXG4gICAgICBgL3JlcG9zLyR7dGhpcy5vd25lcn0vJHt0aGlzLnJlcG99L2dpdC9jb21taXRzYCxcbiAgICAgICdQT1NUJyxcbiAgICAgIHsgbWVzc2FnZTogYE5vdGVGbGFyZTogcmVtb3ZlIHNpdGUgJHtzaXRlSWR9YCwgdHJlZTogdHJlZS5zaGEsIHBhcmVudHM6IFtoZWFkU2hhXSB9LFxuICAgICk7XG4gICAgYXdhaXQgdGhpcy5naChyZWZQYXRoLCAnUEFUQ0gnLCB7IHNoYTogY29tbWl0LnNoYSwgZm9yY2U6IGZhbHNlIH0pO1xuICB9XG5cbn1cbiIsICJpbXBvcnQgeyByZXF1ZXN0VXJsIH0gZnJvbSAnb2JzaWRpYW4nO1xuXG5jb25zdCBDRl9BUEkgPSAnaHR0cHM6Ly9hcGkuY2xvdWRmbGFyZS5jb20vY2xpZW50L3Y0JztcblxuLy8gSW5zdGFsbCBkZXBzIGZpcnN0LCB0aGVuIGJ1aWxkIHdpdGggbWRnYXJkZW4uIEEgYmFyZSBgbnB4IG1kZ2FyZGVuIGJ1aWxkYFxuLy8gbWlnaHQgd29yayBpZiBjYWNoaW5nIGlzIHBlcmZlY3QsIGJ1dCB0aGlzIGd1YXJhbnRlZXMgdGhlIHZlcnNpb24gcGlubmVkIGluXG4vLyBwYWNrYWdlLmpzb24gaXMgaW5zdGFsbGVkIGJlZm9yZSBleGVjdXRpb24uXG4vLyBgbnBtIGNpIHx8IG5wbSBpbnN0YWxsYCBhY3RzIGFzIGEgZmFsbGJhY2sgZm9yIG1pc3NpbmcgbG9ja2ZpbGVzLlxuLy8gV2l0aG91dCB0aGlzLCBucHggd291bGQgaW50ZXJhY3RpdmVseSBwcm9tcHQgXCJOZWVkIHRvIGluc3RhbGwuLi4gT2sgdG8gcHJvY2VlZD8gKHkpXCJcbmNvbnN0IE1ER0FSREVOX0JVSUxEX0NPTU1BTkQgPSAnbnBtIGNpIHx8IG5wbSBpbnN0YWxsICYmIG5weCBtZGdhcmRlbiBidWlsZCc7XG5cbmludGVyZmFjZSBDbG91ZGZsYXJlQXBpRXJyb3Ige1xuICBlcnJvcnM/OiBBcnJheTx7IG1lc3NhZ2U/OiBzdHJpbmcgfT47XG4gIHJlc3VsdD86IHVua25vd247XG59XG5cbmV4cG9ydCBjbGFzcyBDbG91ZGZsYXJlQXBpIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0b2tlbjogc3RyaW5nLFxuICAgIHByaXZhdGUgYWNjb3VudElkOiBzdHJpbmcsXG4gICkge31cblxuICBwcml2YXRlIGdldCBoZWFkZXJzKCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4ge1xuICAgIHJldHVybiB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy50b2tlbn1gLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZXF1ZXN0PFQ+KFxuICAgIHBhdGg6IHN0cmluZyxcbiAgICBtZXRob2QgPSAnR0VUJyxcbiAgICBib2R5PzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gICk6IFByb21pc2U8VD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICAgIHVybDogYCR7Q0ZfQVBJfSR7cGF0aH1gLFxuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgYm9keTogYm9keSA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogdW5kZWZpbmVkLFxuICAgICAgICB0aHJvdzogZmFsc2UsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZGF0YSA9IChyZXNwLmpzb24gPz8ge30pIGFzIENsb3VkZmxhcmVBcGlFcnJvcjtcbiAgICAgIGlmIChyZXNwLnN0YXR1cyA+PSA0MDApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRhdGEuZXJyb3JzPy5bMF0/Lm1lc3NhZ2UgPz8gdGhpcy5tZXNzYWdlRm9yU3RhdHVzKHJlc3Auc3RhdHVzKTtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKG1lc3NhZ2UpIGFzIEVycm9yICYgeyBzdGF0dXM/OiBudW1iZXIgfTtcbiAgICAgICAgZXJyLnN0YXR1cyA9IHJlc3Auc3RhdHVzO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhIGFzIFQ7XG4gICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICcnO1xuICAgICAgaWYgKG1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZmFpbGVkIHRvIGZldGNoJykpIHtcbiAgICAgICAgY29uc3QgZmV0Y2hFcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0NvdWxkIG5vdCByZWFjaCBDbG91ZGZsYXJlLiBDaGVjayB5b3VyIGludGVybmV0IGNvbm5lY3Rpb24sIGZpcmV3YWxsLCBvciBwcm94eSwgdGhlbiB0cnkgYWdhaW4uJyxcbiAgICAgICAgKSBhcyBFcnJvciAmIHsgc3RhdHVzPzogbnVtYmVyIH07XG4gICAgICAgIGZldGNoRXJyLnN0YXR1cyA9IDUwMDtcbiAgICAgICAgdGhyb3cgZmV0Y2hFcnI7XG4gICAgICB9XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtZXNzYWdlRm9yU3RhdHVzKHN0YXR1czogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBpZiAoc3RhdHVzID09PSA0MDEgfHwgc3RhdHVzID09PSA0MDMpIHtcbiAgICAgIHJldHVybiAnQ2xvdWRmbGFyZSByZWplY3RlZCB0aGlzIHRva2VuLiBDcmVhdGUgYW4gQWNjb3VudCBBUEkgVG9rZW4gd2l0aCBDbG91ZGZsYXJlIFBhZ2VzOiBFZGl0IChhbmQgV29ya2VycyBTY3JpcHRzOiBFZGl0KSBwZXJtaXNzaW9ucy4nO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzID09PSA0MDQpIHtcbiAgICAgIHJldHVybiAnQ2xvdWRmbGFyZSBhY2NvdW50IG9yIFBhZ2VzIHByb2plY3Qgbm90IGZvdW5kLiBEb3VibGUtY2hlY2sgdGhlIEFjY291bnQgSUQgYW5kIHByb2plY3QgbmFtZS4nO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzID49IDUwMCkge1xuICAgICAgcmV0dXJuICdDbG91ZGZsYXJlIGlzIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlLiBQbGVhc2UgdHJ5IGFnYWluIGluIGEgbW9tZW50Lic7XG4gICAgfVxuICAgIHJldHVybiAnQ2xvdWRmbGFyZSByZXF1ZXN0IGZhaWxlZC4nO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RzIHRoZSBhY2NvdW50cyB0aGlzIHRva2VuIGNhbiByZWFjaCBhbmQgcmV0dXJucyB0aGUgZmlyc3QgaWQuXG4gICAqIExldHMgdGhlIHdpemFyZCBhdXRvLWRldGVjdCB0aGUgQWNjb3VudCBJRCBzbyB0aGUgdXNlciBuZXZlciBoYXMgdG8gY29weVxuICAgKiB0aGUgMzItY2hhcmFjdGVyIHZhbHVlIG91dCBvZiB0aGUgZGFzaGJvYXJkIGJ5IGhhbmQuIFJlcXVpcmVzIHRoZSB0b2tlbiB0b1xuICAgKiBpbmNsdWRlIEFjY291bnQgU2V0dGluZ3M6IFJlYWQgKGJ1bmRsZWQgaW50byBvdXIgdG9rZW4gdGVtcGxhdGUgbGluaykuXG4gICAqL1xuICBhc3luYyBnZXRBY2NvdW50SWQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5yZXF1ZXN0PHsgcmVzdWx0PzogQXJyYXk8eyBpZD86IHN0cmluZyB9PiB9PignL2FjY291bnRzJyk7XG4gICAgY29uc3QgYWNjb3VudHMgPSBkYXRhLnJlc3VsdCA/PyBbXTtcbiAgICBjb25zdCBpZCA9IGFjY291bnRzWzBdPy5pZDtcbiAgICBpZiAoIWlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDb3VsZCBub3QgcmVhZCBhbnkgQ2xvdWRmbGFyZSBhY2NvdW50IGZyb20gdGhpcyB0b2tlbi4gQWRkIHRoZSBcIkFjY291bnQgU2V0dGluZ3M6IFJlYWRcIiBwZXJtaXNzaW9uLCBvciBwYXN0ZSB5b3VyIEFjY291bnQgSUQgbWFudWFsbHkuJyxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVByb2plY3QoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGdpdGh1Yk93bmVyOiBzdHJpbmcsXG4gICAgcmVwbzogc3RyaW5nLFxuICAgIGJyYW5jaDogc3RyaW5nLFxuICAgIHJvb3REaXI6IHN0cmluZyA9ICcnLFxuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnJlcXVlc3Q8Q2xvdWRmbGFyZUFwaUVycm9yPihcbiAgICAgIGAvYWNjb3VudHMvJHt0aGlzLmFjY291bnRJZH0vcGFnZXMvcHJvamVjdHNgLFxuICAgICAgJ1BPU1QnLFxuICAgICAge1xuICAgICAgICBuYW1lLFxuICAgICAgICBzb3VyY2U6IHtcbiAgICAgICAgICB0eXBlOiAnZ2l0aHViJyxcbiAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIG93bmVyOiBnaXRodWJPd25lcixcbiAgICAgICAgICAgIHJlcG9fbmFtZTogcmVwbyxcbiAgICAgICAgICAgIC8vIFRoZSByZXBvJ3MgZGVmYXVsdCBicmFuY2ggKG1haW4pLiBCdWlsZGluZyBhIG5vbi1leGlzdGVudCBicmFuY2hcbiAgICAgICAgICAgIC8vIHlpZWxkcyBhIGJsYW5rIHNpdGUgLyA1MjIuXG4gICAgICAgICAgICBwcm9kdWN0aW9uX2JyYW5jaDogYnJhbmNoLFxuICAgICAgICAgICAgZGVwbG95bWVudHNfZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBidWlsZF9jb25maWc6IHtcbiAgICAgICAgICBidWlsZF9jb21tYW5kOiBNREdBUkRFTl9CVUlMRF9DT01NQU5ELFxuICAgICAgICAgIGRlc3RpbmF0aW9uX2RpcjogJ3B1YmxpYycsXG4gICAgICAgICAgcm9vdF9kaXI6IHJvb3REaXIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG4gICAgY29uc3QgcmVzdWx0ID0gKGRhdGEucmVzdWx0ID8/IHt9KSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICBjb25zdCByYXdTdWJkb21haW4gPSAocmVzdWx0LnN1YmRvbWFpbiBhcyBzdHJpbmcgfCB1bmRlZmluZWQpID8/IG5hbWU7XG4gICAgY29uc3Qgc3ViZG9tYWluID0gcmF3U3ViZG9tYWluLnJlcGxhY2UoL1xcLnBhZ2VzXFwuZGV2JC8sICcnKTtcbiAgICByZXR1cm4gYCR7c3ViZG9tYWlufS5wYWdlcy5kZXZgO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGFpciB0aGUgYnVpbGQgc2V0dGluZ3Mgb24gYW4gRVhJU1RJTkcgcHJvamVjdCBzbyBhIHJlLXB1Ymxpc2ggc2VsZi1oZWFsc1xuICAgKiBhIHByb2plY3QgdGhhdCB3YXMgY3JlYXRlZCB3aXRoIGEgYmFkIGJ1aWxkIGNvbW1hbmQgb3Igd3JvbmcgYnJhbmNoIFx1MjAxNCB0aGVcbiAgICogdXNlciBuZXZlciBoYXMgdG8gZWRpdCB0aGUgQ2xvdWRmbGFyZSBkYXNoYm9hcmQuIENhbGxlZCBldmVyeSBwdWJsaXNoLlxuICAgKiAtIGJ1aWxkX2NvbW1hbmQgbXVzdCBpbnN0YWxsIGRlcHMgYmVmb3JlIGBucHggbWRnYXJkZW4gYnVpbGRgIChzZWUgYWJvdmUpLlxuICAgKiAtIHByb2R1Y3Rpb25fYnJhbmNoIG11c3QgYmUgdGhlIHJlcG8ncyByZWFsIGRlZmF1bHQgYnJhbmNoIChtYWluKSBvclxuICAgKiAgIENsb3VkZmxhcmUgYnVpbGRzIGEgbm9uLWV4aXN0ZW50IGJyYW5jaCBcdTIxOTIgYmxhbmsgc2l0ZSAvIDUyMi5cbiAgICovXG4gIGFzeW5jIGNvbmZpZ3VyZUJ1aWxkKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBnaXRodWJPd25lcjogc3RyaW5nLFxuICAgIHJlcG86IHN0cmluZyxcbiAgICBicmFuY2g6IHN0cmluZyxcbiAgICByb290RGlyOiBzdHJpbmcgPSAnJyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5yZXF1ZXN0KFxuICAgICAgYC9hY2NvdW50cy8ke3RoaXMuYWNjb3VudElkfS9wYWdlcy9wcm9qZWN0cy8ke25hbWV9YCxcbiAgICAgICdQQVRDSCcsXG4gICAgICB7XG4gICAgICAgIGJ1aWxkX2NvbmZpZzoge1xuICAgICAgICAgIGJ1aWxkX2NvbW1hbmQ6IE1ER0FSREVOX0JVSUxEX0NPTU1BTkQsXG4gICAgICAgICAgZGVzdGluYXRpb25fZGlyOiAncHVibGljJyxcbiAgICAgICAgICByb290X2Rpcjogcm9vdERpcixcbiAgICAgICAgfSxcbiAgICAgICAgc291cmNlOiB7XG4gICAgICAgICAgdHlwZTogJ2dpdGh1YicsXG4gICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBvd25lcjogZ2l0aHViT3duZXIsXG4gICAgICAgICAgICByZXBvX25hbWU6IHJlcG8sXG4gICAgICAgICAgICBwcm9kdWN0aW9uX2JyYW5jaDogYnJhbmNoLFxuICAgICAgICAgICAgZGVwbG95bWVudHNfZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhIGZyZXNoIHByb2R1Y3Rpb24gYnVpbGQuIENvbnRlbnQgY29tbWl0cyBub3JtYWxseSB0cmlnZ2VyIGEgYnVpbGRcbiAgICogdmlhIHRoZSBnaXQgd2ViaG9vaywgYnV0IGZpcmluZyB0aGlzIGV4cGxpY2l0bHkgZ3VhcmFudGVlcyB0aGUgbGF0ZXN0IG5vdGVzXG4gICAqIGFjdHVhbGx5IGdldCBkZXBsb3llZC4gQmVzdC1lZmZvcnQgXHUyMDE0IHRoZSBjYWxsZXIgdHJlYXRzIGZhaWx1cmUgYXMgbm9uLWZhdGFsLlxuICAgKi9cbiAgYXN5bmMgdHJpZ2dlckRlcGxveW1lbnQobmFtZTogc3RyaW5nLCBicmFuY2g6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMucmVxdWVzdChcbiAgICAgIGAvYWNjb3VudHMvJHt0aGlzLmFjY291bnRJZH0vcGFnZXMvcHJvamVjdHMvJHtuYW1lfS9kZXBsb3ltZW50c2AsXG4gICAgICAnUE9TVCcsXG4gICAgICBicmFuY2ggPyB7IGJyYW5jaCB9IDogdW5kZWZpbmVkLFxuICAgICk7XG4gIH1cblxuICBhc3luYyBnZXRQcm9qZWN0KG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMucmVxdWVzdDxDbG91ZGZsYXJlQXBpRXJyb3I+KFxuICAgICAgYC9hY2NvdW50cy8ke3RoaXMuYWNjb3VudElkfS9wYWdlcy9wcm9qZWN0cy8ke25hbWV9YCxcbiAgICApO1xuICAgIGNvbnN0IHJlc3VsdCA9IGRhdGEucmVzdWx0IGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIGNvbnN0IHJhd1N1YmRvbWFpbiA9IChyZXN1bHQ/LnN1YmRvbWFpbiBhcyBzdHJpbmcgfCB1bmRlZmluZWQpID8/IG5hbWU7XG4gICAgY29uc3Qgc3ViZG9tYWluID0gcmF3U3ViZG9tYWluLnJlcGxhY2UoL1xcLnBhZ2VzXFwuZGV2JC8sICcnKTtcbiAgICByZXR1cm4gYCR7c3ViZG9tYWlufS5wYWdlcy5kZXZgO1xuICB9XG5cbiAgYXN5bmMgZW5hYmxlRGVwbG95bWVudChuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnJlcXVlc3QoXG4gICAgICBgL2FjY291bnRzLyR7dGhpcy5hY2NvdW50SWR9L3BhZ2VzL3Byb2plY3RzLyR7bmFtZX1gLFxuICAgICAgJ1BBVENIJyxcbiAgICAgIHtcbiAgICAgICAgZGVwbG95bWVudF9jb25maWdzOiB7IHByb2R1Y3Rpb246IHsgZGVwbG95bWVudF9lbmFibGVkOiB0cnVlIH0gfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXVzZSBhIENsb3VkZmxhcmUgUGFnZXMgZGVwbG95bWVudCBcdTIwMTQgdGFrZXMgdGhlIHNpdGUgb2ZmbGluZSB3aXRob3V0XG4gICAqIGRlbGV0aW5nIHRoZSBwcm9qZWN0IG9yIGFueSBjb250ZW50LiBgZW5hYmxlRGVwbG95bWVudGAgcmVzdG9yZXMgaXQuXG4gICAqIFRoaXMgaXMgdGhlIGNvcnJlY3QgYmFja2VuZCBmb3IgXCJVbnB1Ymxpc2hcIi5cbiAgICovXG4gIGFzeW5jIGRpc2FibGVEZXBsb3ltZW50KG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMucmVxdWVzdChcbiAgICAgIGAvYWNjb3VudHMvJHt0aGlzLmFjY291bnRJZH0vcGFnZXMvcHJvamVjdHMvJHtuYW1lfWAsXG4gICAgICAnUEFUQ0gnLFxuICAgICAge1xuICAgICAgICBkZXBsb3ltZW50X2NvbmZpZ3M6IHsgcHJvZHVjdGlvbjogeyBkZXBsb3ltZW50X2VuYWJsZWQ6IGZhbHNlIH0gfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZVByb2plY3QobmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5yZXF1ZXN0KFxuICAgICAgYC9hY2NvdW50cy8ke3RoaXMuYWNjb3VudElkfS9wYWdlcy9wcm9qZWN0cy8ke25hbWV9YCxcbiAgICAgICdERUxFVEUnLFxuICAgICk7XG4gIH1cblxuICBhc3luYyBsaXN0RGVwbG95bWVudHMobmFtZTogc3RyaW5nKTogUHJvbWlzZTx7IHJlc3VsdD86IEFycmF5PFJlY29yZDxzdHJpbmcsIHVua25vd24+PiB9PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdDx7IHJlc3VsdD86IEFycmF5PFJlY29yZDxzdHJpbmcsIHVua25vd24+PiB9PihcbiAgICAgIGAvYWNjb3VudHMvJHt0aGlzLmFjY291bnRJZH0vcGFnZXMvcHJvamVjdHMvJHtuYW1lfS9kZXBsb3ltZW50c2AsXG4gICAgKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFwcCwgVEZpbGUsIFRGb2xkZXIgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBpc01hdGNoIH0gZnJvbSAnbWljcm9tYXRjaCc7XG5pbXBvcnQgeyBTaXRlUHJvZmlsZSB9IGZyb20gJy4uL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgQVRUQUNITUVOVF9FWFRTIH0gZnJvbSAnLi4vY29yZS9jb25zdGFudHMnO1xuXG5leHBvcnQgY2xhc3MgRmlsZUNvbGxlY3RvciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcHVibGlzaFNjb3BlOiAndmF1bHQnIHwgJ3NlbGVjdGVkJztcbiAgcHJpdmF0ZSByZWFkb25seSBwdWJsaXNoUGF0aHM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYXBwOiBBcHAsXG4gICAgcHJpdmF0ZSBzaXRlOiBTaXRlUHJvZmlsZSxcbiAgKSB7XG4gICAgdGhpcy5wdWJsaXNoU2NvcGUgPSBzaXRlLnB1Ymxpc2hTY29wZSB8fCAndmF1bHQnO1xuICAgIHRoaXMucHVibGlzaFBhdGhzID0gKHNpdGUucHVibGlzaFBhdGhzIHx8IFtdKS5tYXAocCA9PiBwLnRyaW0oKS5yZXBsYWNlKC9eXFwvK3xcXC8rJC9nLCAnJykpLmZpbHRlcihCb29sZWFuKTtcbiAgfVxuXG4gIGFzeW5jIGNvbGxlY3QoKTogUHJvbWlzZTxURmlsZVtdPiB7XG4gICAgY29uc3QgcmVzdWx0OiBURmlsZVtdID0gW107XG5cbiAgICBpZiAodGhpcy5wdWJsaXNoU2NvcGUgPT09ICdzZWxlY3RlZCcpIHtcbiAgICAgIGNvbnN0IGV4cGxpY2l0RmlsZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHRoaXMucHVibGlzaFBhdGhzKSB7XG4gICAgICAgIGNvbnN0IGFic3RyYWN0RmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChwYXRoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChhYnN0cmFjdEZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgIGlmIChhYnN0cmFjdEZpbGUuZXh0ZW5zaW9uID09PSAnbWQnICYmICF0aGlzLmlzRXhjbHVkZWQoYWJzdHJhY3RGaWxlLnBhdGgpKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5zb21lKGYgPT4gZi5wYXRoID09PSBhYnN0cmFjdEZpbGUucGF0aCkpIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYWJzdHJhY3RGaWxlKTtcbiAgICAgICAgICAgICAgZXhwbGljaXRGaWxlcy5hZGQoYWJzdHJhY3RGaWxlLnBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhYnN0cmFjdEZpbGUgaW5zdGFuY2VvZiBURm9sZGVyKSB7XG4gICAgICAgICAgY29uc3QgZm9sZGVyUHJlZml4ID0gcGF0aCArICcvJztcbiAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKSkge1xuICAgICAgICAgICAgaWYgKGZpbGUucGF0aC5zdGFydHNXaXRoKGZvbGRlclByZWZpeCkgJiYgIXRoaXMuaXNFeGNsdWRlZChmaWxlLnBhdGgpKSB7XG4gICAgICAgICAgICAgIGlmIChmaWxlLmV4dGVuc2lvbiA9PT0gJ21kJykge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LnNvbWUoZiA9PiBmLnBhdGggPT09IGZpbGUucGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGZpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLnNpdGUuaW5jbHVkZUF0dGFjaG1lbnRzICYmXG4gICAgICAgICAgICAgICAgQVRUQUNITUVOVF9FWFRTLmhhcyhmaWxlLmV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5zb21lKGYgPT4gZi5wYXRoID09PSBmaWxlLnBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChmaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc2l0ZS5pbmNsdWRlQXR0YWNobWVudHMpIHtcbiAgICAgICAgY29uc3QgZXh0cmFBdHRhY2htZW50czogVEZpbGVbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGV4cGxpY2l0RmlsZXMuaGFzKGZpbGUucGF0aCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRDYWNoZShmaWxlLnBhdGgpO1xuICAgICAgICAgICAgY29uc3QgbGlua3NBbmRFbWJlZHMgPSBbXG4gICAgICAgICAgICAgIC4uLihjYWNoZT8ubGlua3MgfHwgW10pLFxuICAgICAgICAgICAgICAuLi4oY2FjaGU/LmVtYmVkcyB8fCBbXSksXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgbGlua3NBbmRFbWJlZHMpIHtcbiAgICAgICAgICAgICAgY29uc3QgZGVzdEZpbGUgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0KGl0ZW0ubGluaywgZmlsZS5wYXRoKTtcbiAgICAgICAgICAgICAgaWYgKGRlc3RGaWxlICYmIEFUVEFDSE1FTlRfRVhUUy5oYXMoZGVzdEZpbGUuZXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzRXhjbHVkZWQoZGVzdEZpbGUucGF0aCkgJiYgIXJlc3VsdC5zb21lKGYgPT4gZi5wYXRoID09PSBkZXN0RmlsZS5wYXRoKSAmJiAhZXh0cmFBdHRhY2htZW50cy5zb21lKGYgPT4gZi5wYXRoID09PSBkZXN0RmlsZS5wYXRoKSkge1xuICAgICAgICAgICAgICAgICAgZXh0cmFBdHRhY2htZW50cy5wdXNoKGRlc3RGaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnB1c2goLi4uZXh0cmFBdHRhY2htZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIHRoaXMuYXBwLnZhdWx0LmdldEZpbGVzKCkpIHtcbiAgICAgIGlmICh0aGlzLmlzRXhjbHVkZWQoZmlsZS5wYXRoKSkgY29udGludWU7XG5cbiAgICAgIGlmIChmaWxlLmV4dGVuc2lvbiA9PT0gJ21kJykge1xuICAgICAgICByZXN1bHQucHVzaChmaWxlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHRoaXMuc2l0ZS5pbmNsdWRlQXR0YWNobWVudHMgJiZcbiAgICAgICAgQVRUQUNITUVOVF9FWFRTLmhhcyhmaWxlLmV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpKVxuICAgICAgKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGZpbGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhc3luYyByZWFkQXNCYXNlNjQoZmlsZTogVEZpbGUpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWRCaW5hcnkoZmlsZSk7XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICAgIGxldCBiaW5hcnkgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmJ5dGVMZW5ndGg7IGkrKykge1xuICAgICAgYmluYXJ5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYnRvYShiaW5hcnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0V4Y2x1ZGVkKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnNpdGUuZXhjbHVkZVBhdHRlcm5zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBpc01hdGNoKHBhdGgsIHRoaXMuc2l0ZS5leGNsdWRlUGF0dGVybnMsIHsgZG90OiB0cnVlIH0pO1xuICB9XG59XG4iLCAiLy8gU2hhcmVkIGFjcm9zcyBmaWxlQ29sbGVjdG9yICh3aGljaCBmaWxlcyB0byB1cGxvYWQpIGFuZCB0cmFuc2Zvcm1lciAod2hpY2hcbi8vIGVtYmVkcyBhcmUgaW1hZ2VzKS4gS2VlcCB0aGlzIGFzIHRoZSBzaW5nbGUgc291cmNlIG9mIHRydXRoIFx1MjAxNCBib3RoIG1vZHVsZXNcbi8vIG11c3QgYWdyZWUgb24gd2hhdCBjb3VudHMgYXMgYSBwdWJsaXNoYWJsZSBhdHRhY2htZW50LlxuZXhwb3J0IGNvbnN0IEFUVEFDSE1FTlRfRVhUUyA9IG5ldyBTZXQoW1xuICAncG5nJyxcbiAgJ2pwZycsXG4gICdqcGVnJyxcbiAgJ2dpZicsXG4gICdzdmcnLFxuICAnd2VicCcsXG4gICdwZGYnLFxuXSk7XG5cbi8vIE5vZGUgdmVyc2lvbiBwaW5uZWQgZm9yIHRoZSBDbG91ZGZsYXJlIFBhZ2VzIGJ1aWxkLiBtZGdhcmRlbiBuZWVkcyBhIG1vZGVyblxuLy8gTm9kZTsgQ2xvdWRmbGFyZSBvdGhlcndpc2UgZGVmYXVsdHMgdG8gYSB2ZXJ5IG9sZCBvbmUgYW5kIHRoZSBidWlsZCBmYWlscy5cbi8vIFdyaXR0ZW4gdG8gYSBgLm5vZGUtdmVyc2lvbmAgZmlsZSBpbiB0aGUgcmVwbyByb290IG9uIGV2ZXJ5IHB1Ymxpc2guXG5leHBvcnQgY29uc3QgTk9ERV9WRVJTSU9OID0gJzI0JztcblxuLy8gVGhlIG1kZ2FyZGVuIGVuZ2luZSBkZXBlbmRlbmN5IHdyaXR0ZW4gaW50byBlYWNoIHB1Ymxpc2hlZCByZXBvJ3Ncbi8vIHBhY2thZ2UuanNvbiAoQ2xvdWRmbGFyZSBydW5zIGBucG0gaW5zdGFsbGAgdGhlbiBgbnB4IG1kZ2FyZGVuIGJ1aWxkYCkuXG4vLyBEZWZhdWx0cyB0byB0aGUgbnBtIHJlbGVhc2UgXHUyMDE0IHB1Ymxpc2ggbWRnYXJkZW4gdG8gbnBtIGZvciB0aGlzIHRvIHJlc29sdmUuXG4vLyBEdXJpbmcgbG9jYWwgZGV2IG9yIGJlZm9yZSBwdWJsaXNoLCB0aGlzIGNvdWxkIHBvaW50IHRvIGEgZ2l0aHViIGJyYW5jaDpcbi8vICdnaXRodWI6PG93bmVyPi9tZGdhcmRlbicgKG1kZ2FyZGVuJ3MgYHByZXBhcmVgIHNjcmlwdCBidWlsZHMgaXQgb24gaW5zdGFsbCkuXG4vLyAnbGF0ZXN0JyB3aWxsIGZldGNoIHRoZSBuZXdlc3QgdmVyc2lvbiwgYnV0IHBpbm5pbmcgYSB2ZXJzaW9uIGlzIHNhZmVyLlxuXG5leHBvcnQgY29uc3QgTURHQVJERU5fVkVSU0lPTiA9ICdsYXRlc3QnO1xuXG4vKipcbiAqIEdpdEh1YiBBY3Rpb25zIHdvcmtmbG93IFlBTUwgZm9yIHRoZSBcIkdpdEh1YiBBY3Rpb25zXCIgZGVwbG95IHRhcmdldC5cbiAqIFRoaXMgZ2V0cyBjb21taXR0ZWQgdG8gYC5naXRodWIvd29ya2Zsb3dzL2RlcGxveS55bWxgIGluIHRoZSBwdWJsaXNoIHJlcG8uXG4gKiBJdCBpbnN0YWxscyBtZGdhcmRlbiwgYnVpbGRzIHRoZSBzaXRlLCBhbmQgZGVwbG95cyB0byBHaXRIdWIgUGFnZXMuXG4gKlxuICogQWN0aW9uIHZlcnNpb25zIHBpbm5lZCB0byBrbm93biBzdGFibGUgcmVsZWFzZXM6XG4gKiAgIGFjdGlvbnMvY2hlY2tvdXRAdjQsIHNldHVwLW5vZGVAdjQsIGNvbmZpZ3VyZS1wYWdlc0B2NSxcbiAqICAgdXBsb2FkLXBhZ2VzLWFydGlmYWN0QHYzLCBkZXBsb3ktcGFnZXNAdjRcbiAqL1xuZXhwb3J0IGNvbnN0IEdJVEhVQl9BQ1RJT05TX1dPUktGTE9XID0gYG5hbWU6IERlcGxveSB0byBHaXRIdWIgUGFnZXNcblxub246XG4gIHB1c2g6XG4gICAgYnJhbmNoZXM6IFttYWluXVxuICB3b3JrZmxvd19kaXNwYXRjaDpcblxucGVybWlzc2lvbnM6XG4gIGNvbnRlbnRzOiByZWFkXG4gIHBhZ2VzOiB3cml0ZVxuICBpZC10b2tlbjogd3JpdGVcblxuY29uY3VycmVuY3k6XG4gIGdyb3VwOiBcInBhZ2VzXCJcbiAgY2FuY2VsLWluLXByb2dyZXNzOiBmYWxzZVxuXG5qb2JzOlxuICBidWlsZDpcbiAgICBydW5zLW9uOiB1YnVudHUtbGF0ZXN0XG4gICAgc3RlcHM6XG4gICAgICAtIHVzZXM6IGFjdGlvbnMvY2hlY2tvdXRAdjRcbiAgICAgICAgd2l0aDpcbiAgICAgICAgICBmZXRjaC1kZXB0aDogMFxuICAgICAgLSB1c2VzOiBhY3Rpb25zL3NldHVwLW5vZGVAdjRcbiAgICAgICAgd2l0aDpcbiAgICAgICAgICBub2RlLXZlcnNpb246ICdsdHMvKidcbiAgICAgIC0gbmFtZTogU2V0dXAgUGFnZXNcbiAgICAgICAgdXNlczogYWN0aW9ucy9jb25maWd1cmUtcGFnZXNAdjVcbiAgICAgIC0gbmFtZTogQnVpbGQgYWxsIHNpdGVzXG4gICAgICAgIHJ1bjogfFxuICAgICAgICAgIG1rZGlyIC1wIGJ1aWxkX291dHB1dC9zaXRlc1xuICAgICAgICAgIGZvdW5kX3NpdGVzPTBcbiAgICAgICAgICBmb3Igc2l0ZV9kaXIgaW4gc2l0ZXMvKi87IGRvXG4gICAgICAgICAgICBpZiBbIC1mIFwiXFwke3NpdGVfZGlyfXBhY2thZ2UuanNvblwiIF07IHRoZW5cbiAgICAgICAgICAgICAgZWNobyBcIkJ1aWxkaW5nIHNpdGUgaW4gXFwke3NpdGVfZGlyfS4uLlwiXG4gICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICBjZCBcIlxcJHtzaXRlX2Rpcn1cIlxuICAgICAgICAgICAgICAgIG5wbSBjaSB8fCBucG0gaW5zdGFsbFxuICAgICAgICAgICAgICAgIG5weCBtZGdhcmRlbiBidWlsZFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIHNpdGVfaWQ9JChiYXNlbmFtZSBcIlxcJHtzaXRlX2Rpcn1cIilcbiAgICAgICAgICAgICAgY3AgLXIgXCJcXCR7c2l0ZV9kaXJ9cHVibGljXCIgXCJidWlsZF9vdXRwdXQvc2l0ZXMvXFwke3NpdGVfaWR9XCJcbiAgICAgICAgICAgICAgZm91bmRfc2l0ZXM9JCgoZm91bmRfc2l0ZXMgKyAxKSlcbiAgICAgICAgICAgIGZpXG4gICAgICAgICAgZG9uZVxuICAgICAgICAgIGlmIFsgXCIkZm91bmRfc2l0ZXNcIiAtZXEgMCBdOyB0aGVuXG4gICAgICAgICAgICBlY2hvIFwiTm8gc2l0ZXMgZm91bmQgdG8gYnVpbGQuXCJcbiAgICAgICAgICAgIG1rZGlyIC1wIGJ1aWxkX291dHB1dFxuICAgICAgICAgICAgZWNobyBcIjxoMT5ObyBzaXRlcyBwdWJsaXNoZWQgeWV0PC9oMT5cIiA+IGJ1aWxkX291dHB1dC9pbmRleC5odG1sXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgbGF0ZXN0X3NpdGU9XCJcIlxuICAgICAgICAgICAgbGF0ZXN0X3RpbWU9MFxuICAgICAgICAgICAgZm9yIHNpdGVfZGlyIGluIHNpdGVzLyovOyBkb1xuICAgICAgICAgICAgICBpZiBbIC1mIFwiXFwke3NpdGVfZGlyfXBhY2thZ2UuanNvblwiIF07IHRoZW5cbiAgICAgICAgICAgICAgICBtdGltZT0kKGdpdCBsb2cgLTEgLS1mb3JtYXQ9XCIlY3RcIiBcIlxcJHtzaXRlX2Rpcn1cIiAyPi9kZXYvbnVsbCB8fCBlY2hvIDApXG4gICAgICAgICAgICAgICAgaWYgWyBcIiRtdGltZVwiIC1ndCBcIiRsYXRlc3RfdGltZVwiIF07IHRoZW5cbiAgICAgICAgICAgICAgICAgIGxhdGVzdF90aW1lPVwiJG10aW1lXCJcbiAgICAgICAgICAgICAgICAgIGxhdGVzdF9zaXRlPSQoYmFzZW5hbWUgXCJcXCR7c2l0ZV9kaXJ9XCIpXG4gICAgICAgICAgICAgICAgZmlcbiAgICAgICAgICAgICAgZmlcbiAgICAgICAgICAgIGRvbmVcbiAgICAgICAgICAgIGlmIFsgLXogXCIkbGF0ZXN0X3NpdGVcIiBdOyB0aGVuXG4gICAgICAgICAgICAgIGxhdGVzdF9zaXRlPSQobHMgLTEgYnVpbGRfb3V0cHV0L3NpdGVzIHwgaGVhZCAtbiAxKVxuICAgICAgICAgICAgZmlcbiAgICAgICAgICAgIGlmIFsgLW4gXCIkbGF0ZXN0X3NpdGVcIiBdOyB0aGVuXG4gICAgICAgICAgICAgIGVjaG8gXCJEZXBsb3lpbmcgJyRsYXRlc3Rfc2l0ZScgdG8gcm9vdC4uLlwiXG4gICAgICAgICAgICAgIGNwIC1yIFwic2l0ZXMvXFwke2xhdGVzdF9zaXRlfS9wdWJsaWMvLlwiIGJ1aWxkX291dHB1dC9cbiAgICAgICAgICAgIGZpXG4gICAgICAgICAgZmlcbiAgICAgICAgICBtdiBidWlsZF9vdXRwdXQgcHVibGljXG4gICAgICAtIHVzZXM6IGFjdGlvbnMvdXBsb2FkLXBhZ2VzLWFydGlmYWN0QHYzXG4gICAgICAgIHdpdGg6XG4gICAgICAgICAgcGF0aDogcHVibGljXG5cbiAgZGVwbG95OlxuICAgIGVudmlyb25tZW50OlxuICAgICAgbmFtZTogZ2l0aHViLXBhZ2VzXG4gICAgICB1cmw6IFxcJHt7IHN0ZXBzLmRlcGxveW1lbnQub3V0cHV0cy5wYWdlX3VybCB9fVxuICAgIHJ1bnMtb246IHVidW50dS1sYXRlc3RcbiAgICBuZWVkczogYnVpbGRcbiAgICBzdGVwczpcbiAgICAgIC0gbmFtZTogRGVwbG95IHRvIEdpdEh1YiBQYWdlc1xuICAgICAgICBpZDogZGVwbG95bWVudFxuICAgICAgICB1c2VzOiBhY3Rpb25zL2RlcGxveS1wYWdlc0B2NFxuYDsiLCAiaW1wb3J0IHsgcGFyc2VZYW1sLCBzdHJpbmdpZnlZYW1sIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgbm9ybWFsaXplRnJvbnRtYXR0ZXIgfSBmcm9tICcuL2NvbnRlbnRWYWxpZGF0b3InO1xuXG4vLyBBIGZyb250bWF0dGVyIGJsb2NrIGF0IHRoZSB2ZXJ5IHN0YXJ0IG9mIHRoZSBjb250ZW50LlxuY29uc3QgTEVBRElOR19CTE9DS19SRSA9IC9eLS0tWyBcXHRdKlxccj9cXG4oW1xcc1xcU10qPylcXHI/XFxuLS0tWyBcXHRdKihcXHI/XFxufCQpLztcblxuLyoqXG4gKiBQcmVwYXJlcyBhIHZhdWx0IG5vdGUncyB0ZXh0IGZvciB1cGxvYWQuIG1kZ2FyZGVuIHJlc29sdmVzIE9ic2lkaWFuIHdpa2lsaW5rc1xuICogYW5kIGVtYmVkcyBpdHNlbGYsIHNvIHdlIG5vIGxvbmdlciByZXdyaXRlIGxpbmtzIGhlcmUgXHUyMDE0IHdlIG9ubHk6XG4gKiAgIDEuIGd1YXJhbnRlZSBhIHZhbGlkIGxlYWRpbmcgZnJvbnRtYXR0ZXIgYmxvY2sgKGRlZmVuc2l2ZTsgbWRnYXJkZW4gdG9sZXJhdGVzXG4gKiAgICAgIGJhZCBmcm9udG1hdHRlciwgYnV0IGEgY2xlYW4gYmxvY2sgZ2l2ZXMgYSByZWxpYWJsZSB0aXRsZSksIGFuZFxuICogICAyLiBkcm9wIGBwcml2YXRlYC9gZHJhZnRgIGtleXMgc28gdGhlIG5vdGUgcHVibGlzaGVzIChtZGdhcmRlbiBza2lwcyBub3Rlc1xuICogICAgICB0aGF0IHN0aWxsIGNhcnJ5IHRob3NlIGZsYWdzKS5cbiAqIE9ubHkgdGhlIHVwbG9hZGVkIGNvcHkgaXMgY2hhbmdlZCBcdTIwMTQgdGhlIHZhdWx0IG5vdGUgaXMgbmV2ZXIgdG91Y2hlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybWVyIHtcbiAgdHJhbnNmb3JtKGNvbnRlbnQ6IHN0cmluZywgZmlsZVBhdGg6IHN0cmluZywgdGl0bGU/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IG5vdGVUaXRsZSA9IHRpdGxlID8/IGZpbGVQYXRoLnNwbGl0KCcvJykucG9wKCk/LnJlcGxhY2UoL1xcLm1kJC8sICcnKSA/PyAnVW50aXRsZWQnO1xuICAgIGxldCByZXN1bHQgPSBub3JtYWxpemVGcm9udG1hdHRlcihjb250ZW50LCBub3RlVGl0bGUpO1xuICAgIHJlc3VsdCA9IHRoaXMuc3RyaXBQcml2YXRlRnJvbnRtYXR0ZXIocmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBgcHJpdmF0ZWAvYGRyYWZ0YCBrZXlzIGZyb20gdGhlIGxlYWRpbmcgZnJvbnRtYXR0ZXIgYmxvY2suIFBhcnNlcyB0aGVcbiAgICogYmxvY2sgd2l0aCBPYnNpZGlhbidzIFlBTUwgZW5naW5lIChyb2J1c3QgYWdhaW5zdCBxdW90aW5nL25lc3RpbmcpIHJhdGhlclxuICAgKiB0aGFuIHNwbGl0dGluZyBsaW5lcy4gQXNzdW1lcyBhIHZhbGlkIGxlYWRpbmcgYmxvY2sgKGd1YXJhbnRlZWQgYnlcbiAgICogYG5vcm1hbGl6ZUZyb250bWF0dGVyYCB1cHN0cmVhbSk7IGxlYXZlcyBjb250ZW50IHVudG91Y2hlZCBvdGhlcndpc2UuXG4gICAqL1xuICBwcml2YXRlIHN0cmlwUHJpdmF0ZUZyb250bWF0dGVyKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgbSA9IGNvbnRlbnQubWF0Y2goTEVBRElOR19CTE9DS19SRSk7XG4gICAgaWYgKCFtKSByZXR1cm4gY29udGVudDtcblxuICAgIGxldCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IChwYXJzZVlhbWwobVsxXSkgPz8ge30pIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuICAgIGRlbGV0ZSBkYXRhLnByaXZhdGU7XG4gICAgZGVsZXRlIGRhdGEuZHJhZnQ7XG5cbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudCwgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1jYWxsLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLW1lbWJlci1hY2Nlc3MgLS0gT2JzaWRpYW4gc3RyaW5naWZ5WWFtbCB0eXBpbmdzIG1heSBiZSBpbmNvbXBsZXRlXG4gICAgY29uc3QgeWFtbCA9IGtleXMubGVuZ3RoID8gc3RyaW5naWZ5WWFtbChkYXRhKS50cmltRW5kKCkgOiAnJztcbiAgICBjb25zdCBibG9jayA9IHlhbWwgPyBgLS0tXFxuJHt5YW1sfVxcbi0tLWAgOiBgLS0tXFxuLS0tYDtcbiAgICBjb25zdCB0cmFpbGluZyA9IG1bMl0gPyAnXFxuJyA6ICcnO1xuICAgIHJldHVybiBjb250ZW50LnNsaWNlKDAsIG0uaW5kZXgpICsgYmxvY2sgKyB0cmFpbGluZyArIGNvbnRlbnQuc2xpY2UoKG0uaW5kZXggPz8gMCkgKyBtWzBdLmxlbmd0aCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBwYXJzZVlhbWwgfSBmcm9tICdvYnNpZGlhbic7XG5cbi8qKlxuICogUHJlLXB1Ymxpc2ggZnJvbnRtYXR0ZXIgY2hlY2sgKyByZXBhaXIuIG1kZ2FyZGVuIHBhcnNlcyBZQU1MIGZyb250bWF0dGVyIHdpdGhcbiAqIHRoZSBzYW1lIGpzLXlhbWwgZW5naW5lIE9ic2lkaWFuIGV4cG9zZXMgYXMgYHBhcnNlWWFtbGAsIHNvIHdlIGNhbiBjYXRjaCB0aGVcbiAqIGV4YWN0IGZhaWx1cmVzIGhlcmUgXHUyMDE0IGJlZm9yZSBhbnl0aGluZyByZWFjaGVzIENsb3VkZmxhcmUuXG4gKlxuICogVGhlIHJlY3VycmluZyBicmVha2VyOiBhIG5vdGUgdGhhdCBzdGFydHMgKGFmdGVyIGEgYmxhbmsgbGluZSkgd2l0aCBhIHN0cmF5XG4gKiBgLS0tYCBob3Jpem9udGFsIHJ1bGUgYW5kIG5vIGNsb3NpbmcgYC0tLWAuIG1kZ2FyZGVuIHRyZWF0cyBpdCBhcyBhIGZyb250bWF0dGVyXG4gKiBvcGVuZXIsIG5ldmVyIGZpbmRzIHRoZSBjbG9zZSwgYW5kIHRyaWVzIHRvIFlBTUwtcGFyc2UgdGhlIHdob2xlIGJvZHkgXHUyMTkyXG4gKiBcImVuZCBvZiB0aGUgc3RyZWFtIG9yIGEgZG9jdW1lbnQgc2VwYXJhdG9yIGlzIGV4cGVjdGVkXCIuIFRoZSBmaXggaXMgdG8gZW5zdXJlXG4gKiBldmVyeSBwdWJsaXNoZWQgbm90ZSBCRUdJTlMgd2l0aCBhIHZhbGlkIGZyb250bWF0dGVyIGJsb2NrOyB0aGUgc3RyYXkgYC0tLWBcbiAqIHRoZW4gZGVncmFkZXMgdG8gYW4gb3JkaW5hcnkgYm9keSBob3Jpem9udGFsLXJ1bGUuXG4gKi9cblxuZXhwb3J0IHR5cGUgRnJvbnRtYXR0ZXJTdGF0dXMgPSAnY2xlYW4nIHwgJ2ZpeGVkJztcblxuZXhwb3J0IGludGVyZmFjZSBGcm9udG1hdHRlckluc3BlY3Rpb24ge1xuICBzdGF0dXM6IEZyb250bWF0dGVyU3RhdHVzO1xuICByZWFzb24/OiBzdHJpbmc7XG59XG5cbi8vIEEgZnJvbnRtYXR0ZXIgYmxvY2sgYXQgdGhlIHZlcnkgc3RhcnQ6IGAtLS1gIGxpbmUsIGJvZHksIGNsb3NpbmcgYC0tLWAgbGluZS5cbmNvbnN0IExFQURJTkdfQkxPQ0tfUkUgPSAvXi0tLVsgXFx0XSpcXHI/XFxuKFtcXHNcXFNdKj8pXFxyP1xcbi0tLVsgXFx0XSooXFxyP1xcbnwkKS87XG5cbi8qKiBUcnVlIG9ubHkgd2hlbiB0aGUgY29udGVudCBzdGFydHMgd2l0aCBhIHBhcnNlYWJsZSBgLS0tXHUyMDI2LS0tYCBibG9jay4gKi9cbmZ1bmN0aW9uIGhhc1ZhbGlkTGVhZGluZ0Zyb250bWF0dGVyKHJhdzogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IHMgPSByYXcucmVwbGFjZSgvXlxcdWZlZmYvLCAnJyk7XG4gIGNvbnN0IG0gPSBzLm1hdGNoKExFQURJTkdfQkxPQ0tfUkUpO1xuICBpZiAoIW0pIHJldHVybiBmYWxzZTtcbiAgdHJ5IHtcbiAgICBwYXJzZVlhbWwobVsxXSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKiogV2hldGhlciB0aGUgY29udGVudCAqbG9va3MqIGxpa2UgaXQgb3BlbnMgd2l0aCBmcm9udG1hdHRlciAobGF0Y2hlcyBtZGdhcmRlbikuICovXG5mdW5jdGlvbiBsb29rc0xpa2VGcm9udG1hdHRlck9wZW5lcihyYXc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBzdHJpcHBlZCA9IHJhdy5yZXBsYWNlKC9eXFx1ZmVmZi8sICcnKS5yZXBsYWNlKC9eWyBcXHRcXHJcXG5dKy8sICcnKTtcbiAgcmV0dXJuIHN0cmlwcGVkLnN0YXJ0c1dpdGgoJy0tLScpO1xufVxuXG4vKipcbiAqIENsYXNzaWZ5IGEgbm90ZSdzIGZyb250bWF0dGVyIHdpdGhvdXQgbW9kaWZ5aW5nIGl0LiBgY2xlYW5gID0gc2FmZSB0byBwdWJsaXNoXG4gKiBhcy1pczsgYGZpeGVkYCA9IHdvdWxkIGJyZWFrIG1kZ2FyZGVuIGFuZCB3aWxsIGJlIGF1dG8tcmVwYWlyZWQgb24gcHVibGlzaC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc3BlY3RGcm9udG1hdHRlcihyYXc6IHN0cmluZyk6IEZyb250bWF0dGVySW5zcGVjdGlvbiB7XG4gIGlmIChoYXNWYWxpZExlYWRpbmdGcm9udG1hdHRlcihyYXcpKSByZXR1cm4geyBzdGF0dXM6ICdjbGVhbicgfTtcbiAgaWYgKGxvb2tzTGlrZUZyb250bWF0dGVyT3BlbmVyKHJhdykpIHtcbiAgICByZXR1cm4geyBzdGF0dXM6ICdmaXhlZCcsIHJlYXNvbjogJ3N0cmF5IG9yIHVucGFyc2VhYmxlIFx1MjAxQy0tLVx1MjAxRCBhdCB0aGUgdG9wIFx1MjAxNCB3b3VsZCBicmVhayB0aGUgbWRnYXJkZW4gYnVpbGQnIH07XG4gIH1cbiAgLy8gTm8gbGVhZGluZyBmcm9udG1hdHRlciBhbmQgbm8gcmlza3kgb3BlbmVyIFx1MjE5MiBub3RoaW5nIHRvIGRvLlxuICByZXR1cm4geyBzdGF0dXM6ICdjbGVhbicgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gY29udGVudCB0aGF0IGlzIGd1YXJhbnRlZWQgdG8gYmVnaW4gd2l0aCBhIHZhbGlkIGZyb250bWF0dGVyIGJsb2NrLlxuICogSWYgdGhlIG5vdGUgYWxyZWFkeSBkb2VzLCBpdCdzIHJldHVybmVkIHVuY2hhbmdlZDsgb3RoZXJ3aXNlIGEgbWluaW1hbCBibG9ja1xuICogKGB0aXRsZWApIGlzIHByZXBlbmRlZCBzbyBtZGdhcmRlbiBwYXJzZXMgY2xlYW5seS4gT25seSB0aGUgcHVibGlzaGVkIGNvcHkgaXNcbiAqIGFmZmVjdGVkIFx1MjAxNCBuZXZlciB0aGUgdXNlcidzIHZhdWx0IG5vdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVGcm9udG1hdHRlcihyYXc6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChoYXNWYWxpZExlYWRpbmdGcm9udG1hdHRlcihyYXcpKSByZXR1cm4gcmF3O1xuICBjb25zdCBzYWZlVGl0bGUgPSB0aXRsZS5yZXBsYWNlKC9cIi9nLCBcIidcIik7XG4gIHJldHVybiBgLS0tXFxudGl0bGU6IFwiJHtzYWZlVGl0bGV9XCJcXG4tLS1cXG5cXG4ke3Jhd31gO1xufVxuIiwgImltcG9ydCB7IEFwcCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IE5vdGVGbGFyZVNldHRpbmdzLCBQdWJsaXNoUmVzdWx0LCBTaXRlUHJvZmlsZSwgVXBsb2FkRmlsZSB9IGZyb20gJy4uL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgR2l0SHViQXBpIH0gZnJvbSAnLi4vYXBpL2dpdGh1YkFwaSc7XG5pbXBvcnQgeyBDbG91ZGZsYXJlQXBpIH0gZnJvbSAnLi4vYXBpL2Nsb3VkZmxhcmVBcGknO1xuaW1wb3J0IHsgRmlsZUNvbGxlY3RvciB9IGZyb20gJy4vZmlsZUNvbGxlY3Rvcic7XG5pbXBvcnQgeyBUcmFuc2Zvcm1lciB9IGZyb20gJy4vdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgaW5zcGVjdEZyb250bWF0dGVyIH0gZnJvbSAnLi9jb250ZW50VmFsaWRhdG9yJztcbmltcG9ydCB7IEdJVEhVQl9BQ1RJT05TX1dPUktGTE9XLCBNREdBUkRFTl9WRVJTSU9OLCBOT0RFX1ZFUlNJT04gfSBmcm9tICcuLi9jb3JlL2NvbnN0YW50cyc7XG5cbmNvbnN0IFJFQ09OTkVDVF9ISU5UID1cbiAgXCJJZiB0aGUgYnVpbGQgY2FuJ3Qgc3RhcnQsIHJlY29ubmVjdCBDbG91ZGZsYXJlIHRvIEdpdEh1YjogaW5zdGFsbC9hdXRob3JpemUgdGhlIFwiICtcbiAgJ1wiQ2xvdWRmbGFyZSBXb3JrZXJzIGFuZCBQYWdlc1wiIEdpdEh1YiBBcHAgZm9yIHRoaXMgcmVwby4nO1xuXG5cbmZ1bmN0aW9uIHRleHRUb0Jhc2U2NCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBieXRlcyA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZSh0ZXh0KTtcbiAgbGV0IGJpbmFyeSA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgYmluYXJ5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pO1xuICB9XG4gIHJldHVybiBidG9hKGJpbmFyeSk7XG59XG5cbmV4cG9ydCBjbGFzcyBQdWJsaXNoZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNldHRpbmdzOiBOb3RlRmxhcmVTZXR0aW5ncyxcbiAgICBwcml2YXRlIHNpdGU6IFNpdGVQcm9maWxlLFxuICAgIHByaXZhdGUgYXBwOiBBcHAsXG4gICAgcHJpdmF0ZSBvblByb2dyZXNzOiAobXNnOiBzdHJpbmcpID0+IHZvaWQsXG4gICkge31cblxuICAvKiogRWZmZWN0aXZlIGhvc3RpbmcgcHJvdmlkZXIgZm9yIHRoaXMgc2l0ZS4gKi9cbiAgcHJpdmF0ZSBnZXQgaG9zdGluZ1Byb3ZpZGVyKCk6IFNpdGVQcm9maWxlWydob3N0aW5nUHJvdmlkZXInXSB7XG4gICAgcmV0dXJuIHRoaXMuc2l0ZS5ob3N0aW5nUHJvdmlkZXI7XG4gIH1cblxuICBhc3luYyBwdWJsaXNoKCk6IFByb21pc2U8UHVibGlzaFJlc3VsdD4ge1xuICAgIGNvbnN0IHJlcG8gPSB0aGlzLnNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnk7XG4gICAgXG4gICAgLy8gVGhlIGJyYW5jaCBDbG91ZGZsYXJlL0dIIEFjdGlvbnMgYnVpbGRzIGFuZCB3ZSBjb21taXQgdG8gaXMgdGhlIHJlcG8nc1xuICAgIC8vIG93biBkZWZhdWx0IChtYWluKS4gUmUtcmVzb2x2ZSBmcm9tIEdpdEh1YiBpbiBjYXNlIGl0IGRpZmZlcnMuXG4gICAgbGV0IGJyYW5jaCA9IHRoaXMuc2l0ZS5naXRodWJCcmFuY2ggfHwgJ21haW4nO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwcm9iZSA9IG5ldyBHaXRIdWJBcGkoXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViVG9rZW4sXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViT3duZXIsXG4gICAgICAgIHJlcG8sXG4gICAgICApO1xuICAgICAgYnJhbmNoID0gYXdhaXQgcHJvYmUuZ2V0RGVmYXVsdEJyYW5jaCgpO1xuICAgICAgdGhpcy5zaXRlLmdpdGh1YkJyYW5jaCA9IGJyYW5jaDtcblxuICAgICAgY29uc3QgaXNQcml2YXRlID0gYXdhaXQgcHJvYmUuaXNSZXBvUHJpdmF0ZSgpO1xuICAgICAgdGhpcy5zZXR0aW5ncy5tYXN0ZXJSZXBvc2l0b3J5UHJpdmF0ZSA9IGlzUHJpdmF0ZTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEtlZXAgdGhlIHN0b3JlZCBicmFuY2ggYW5kIHByaXZhY3kuXG4gICAgfVxuXG4gICAgY29uc3QgZ2l0aHViID0gbmV3IEdpdEh1YkFwaShcbiAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViVG9rZW4sXG4gICAgICB0aGlzLnNldHRpbmdzLmdpdGh1Yk93bmVyLFxuICAgICAgcmVwbyxcbiAgICAgIGJyYW5jaCxcbiAgICApO1xuICAgIGNvbnN0IGNvbGxlY3RvciA9IG5ldyBGaWxlQ29sbGVjdG9yKHRoaXMuYXBwLCB0aGlzLnNpdGUpO1xuICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gbmV3IFRyYW5zZm9ybWVyKCk7XG5cbiAgICBjb25zdCB1cGxvYWRGaWxlc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBVcGxvYWRGaWxlPigpO1xuICAgIGNvbnN0IGlzc3Vlczogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQgZml4ZWRDb3VudCA9IDA7XG5cbiAgICBjb25zdCByb290RGlyID0gYHNpdGVzLyR7dGhpcy5zaXRlLmlkfWA7XG4gICAgXG4gICAgdGhpcy5vblByb2dyZXNzKCdDb2xsZWN0aW5nIGZpbGVzXHUyMDI2Jyk7XG5cbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IGNvbGxlY3Rvci5jb2xsZWN0KCk7XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBsZXQgY29udGVudDogc3RyaW5nO1xuICAgICAgbGV0IHJlcG9QYXRoOiBzdHJpbmc7XG5cbiAgICAgIGlmIChmaWxlLmV4dGVuc2lvbiA9PT0gJ21kJykge1xuICAgICAgICBjb25zdCByYXcgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICAvLyBQcmVmbGlnaHQ6IGNhdGNoICsgYXV0by1yZXBhaXIgZnJvbnRtYXR0ZXIgdGhhdCB3b3VsZCBjcmFzaCB0aGUgYnVpbGQuXG4gICAgICAgIGNvbnN0IGNoZWNrID0gaW5zcGVjdEZyb250bWF0dGVyKHJhdyk7XG4gICAgICAgIGlmIChjaGVjay5zdGF0dXMgPT09ICdmaXhlZCcpIHtcbiAgICAgICAgICBmaXhlZENvdW50Kys7XG4gICAgICAgICAgaXNzdWVzLnB1c2goYCR7ZmlsZS5wYXRofTogJHtjaGVjay5yZWFzb24gPz8gJ2Zyb250bWF0dGVyIGF1dG8tZml4ZWQnfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gdHJhbnNmb3JtZXIudHJhbnNmb3JtKHJhdywgZmlsZS5wYXRoLCBmaWxlLmJhc2VuYW1lKTtcbiAgICAgICAgY29udGVudCA9IHRleHRUb0Jhc2U2NCh0cmFuc2Zvcm1lZCk7XG4gICAgICAgIHJlcG9QYXRoID0gYCR7cm9vdERpcn0vY29udGVudC8ke2ZpbGUucGF0aH1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCA9IGF3YWl0IGNvbGxlY3Rvci5yZWFkQXNCYXNlNjQoZmlsZSk7XG4gICAgICAgIHJlcG9QYXRoID0gYCR7cm9vdERpcn0vY29udGVudC9hdHRhY2htZW50cy8ke2ZpbGUubmFtZX1gO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXVwbG9hZEZpbGVzTWFwLmhhcyhyZXBvUGF0aCkpIHtcbiAgICAgICAgdXBsb2FkRmlsZXNNYXAuc2V0KHJlcG9QYXRoLCB7IHBhdGg6IHJlcG9QYXRoLCBjb250ZW50IH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlcG8tcm9vdCBmaWxlcyB0aGF0IGRyaXZlIHRoZSBidWlsZCAoc2FtZSBmb3IgYm90aCBkZXBsb3kgdGFyZ2V0cyk6XG4gICAgLy8gIC0gcGFja2FnZS5qc29uICBcdTIwMTQgcHVsbHMgaW4gbWRnYXJkZW4sIGRlZmluZXMgYnVpbGQgc2NyaXB0XG4gICAgLy8gIC0gbWRnYXJkZW4uY29uZmlnLmpzb24gXHUyMDE0IHNpdGUgdGhlbWUgKyBtZXRhZGF0YVxuICAgIC8vICAtIC5ub2RlLXZlcnNpb24gXHUyMDE0IHBpbnMgYSBtb2Rlcm4gTm9kZSBmb3IgdGhlIGJ1aWxkIGVudmlyb25tZW50XG4gICAgdXBsb2FkRmlsZXNNYXAuc2V0KGAke3Jvb3REaXJ9L3BhY2thZ2UuanNvbmAsIHtcbiAgICAgIHBhdGg6IGAke3Jvb3REaXJ9L3BhY2thZ2UuanNvbmAsXG4gICAgICBjb250ZW50OiB0ZXh0VG9CYXNlNjQodGhpcy5idWlsZFBhY2thZ2VKc29uKCkpLFxuICAgIH0pO1xuICAgIHVwbG9hZEZpbGVzTWFwLnNldChgJHtyb290RGlyfS9tZGdhcmRlbi5jb25maWcuanNvbmAsIHtcbiAgICAgIHBhdGg6IGAke3Jvb3REaXJ9L21kZ2FyZGVuLmNvbmZpZy5qc29uYCxcbiAgICAgIGNvbnRlbnQ6IHRleHRUb0Jhc2U2NCh0aGlzLmJ1aWxkTWRnYXJkZW5Db25maWcoKSksXG4gICAgfSk7XG4gICAgdXBsb2FkRmlsZXNNYXAuc2V0KGAke3Jvb3REaXJ9Ly5ub2RlLXZlcnNpb25gLCB7XG4gICAgICBwYXRoOiBgJHtyb290RGlyfS8ubm9kZS12ZXJzaW9uYCxcbiAgICAgIGNvbnRlbnQ6IHRleHRUb0Jhc2U2NChgJHtOT0RFX1ZFUlNJT059XFxuYCksXG4gICAgfSk7XG5cbiAgICAvLyBGb3IgR2l0SHViIEFjdGlvbnMgLyBHaXRIdWIgUGFnZXM6IGNvbW1pdCB0aGUgZGVwbG95IHdvcmtmbG93IHNvIHRoZVxuICAgIC8vIGJ1aWxkIHRyaWdnZXJzIG9uIHB1c2guIFdpdGhvdXQgdGhpcyBmaWxlLCBubyB3b3JrZmxvdyBydW5zIGFuZCB0aGVcbiAgICAvLyBzaXRlIHN0YXlzIGJsYW5rIGZvcmV2ZXIuXG4gICAgaWYgKHRoaXMuaG9zdGluZ1Byb3ZpZGVyID09PSAnZ2l0aHViLXBhZ2VzJykge1xuICAgICAgdXBsb2FkRmlsZXNNYXAuc2V0KCcuZ2l0aHViL3dvcmtmbG93cy9kZXBsb3kueW1sJywge1xuICAgICAgICBwYXRoOiAnLmdpdGh1Yi93b3JrZmxvd3MvZGVwbG95LnltbCcsXG4gICAgICAgIGNvbnRlbnQ6IHRleHRUb0Jhc2U2NChHSVRIVUJfQUNUSU9OU19XT1JLRkxPVyksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB1cGxvYWRGaWxlcyA9IEFycmF5LmZyb20odXBsb2FkRmlsZXNNYXAudmFsdWVzKCkpO1xuXG4gICAgdGhpcy5vblByb2dyZXNzKGBVcGxvYWRpbmcgMC8ke3VwbG9hZEZpbGVzLmxlbmd0aH0uLi5gKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdpdGh1Yi5jb21taXRGaWxlcyhcbiAgICAgIHVwbG9hZEZpbGVzLFxuICAgICAgYE5vdGVGbGFyZTogcHVibGlzaCAke3VwbG9hZEZpbGVzLmxlbmd0aH0gZmlsZXNgLFxuICAgICAgKGRvbmUsIHRvdGFsKSA9PiB0aGlzLm9uUHJvZ3Jlc3MoYFVwbG9hZGluZyAke2RvbmV9LyR7dG90YWx9Li4uYCksXG4gICAgICAoc2Vjc0xlZnQpID0+IHRoaXMub25Qcm9ncmVzcyhgUmF0ZSBsaW1pdGVkIFx1MjAxNCAke3NlY3NMZWZ0fXMuLi5gKSxcbiAgICAgIC8vIE1pcnJvciBjb250ZW50LyBzbyBub3RlcyByZW1vdmVkIG9yIGV4Y2x1ZGVkIGZyb20gdGhlIHZhdWx0IGRpc2FwcGVhclxuICAgICAgLy8gZnJvbSB0aGUgcHVibGlzaGVkIHNpdGUgdG9vLlxuICAgICAgYCR7cm9vdERpcn0vY29udGVudC9gLFxuICAgICAgeyBpc1ByaXZhdGU6IHRoaXMuc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeVByaXZhdGUgfHwgZmFsc2UgfVxuICAgICk7XG5cbiAgICByZXN1bHQuZml4ZWQgPSBmaXhlZENvdW50O1xuICAgIHJlc3VsdC5pc3N1ZXMgPSBpc3N1ZXM7XG4gICAgLy8gbm90ZUNvdW50ID0gdmF1bHQgZmlsZXMgb25seSAobm90ZXMgKyBhdHRhY2htZW50cyksIGV4Y2x1ZGluZyBidWlsZCBmaWxlcyBsaWtlXG4gICAgLy8gcGFja2FnZS5qc29uLCBtZGdhcmRlbi5jb25maWcuanNvbiwgLm5vZGUtdmVyc2lvbiwgYW5kIHRoZSBHSCBBY3Rpb25zIHdvcmtmbG93LlxuICAgIHJlc3VsdC5ub3RlQ291bnQgPSBmaWxlcy5sZW5ndGg7XG5cbiAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiYgdGhpcy5ob3N0aW5nUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJykge1xuICAgICAgY29uc3QgY2xvdWRmbGFyZSA9IG5ldyBDbG91ZGZsYXJlQXBpKFxuICAgICAgICB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVUb2tlbixcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jbG91ZGZsYXJlQWNjb3VudCxcbiAgICAgICk7XG5cbiAgICAgIC8vIEVuYWJsZSBDbG91ZGZsYXJlIGRlcGxveW1lbnQgKGhhbmRsZXMgYm90aCBmaXJzdCBwdWJsaXNoIGFuZCByZS1wdWJsaXNoIGFmdGVyIHVucHVibGlzaClcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGNsb3VkZmxhcmUuZW5hYmxlRGVwbG95bWVudCh0aGlzLnNpdGUuY2xvdWRmbGFyZVByb2plY3QpO1xuICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2U7XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IChlcnIgYXMgRXJyb3IgJiB7IHN0YXR1cz86IG51bWJlciB9KS5zdGF0dXM7XG4gICAgICAgIGlmIChzdGF0dXMgPT09IDQwNCB8fCBtc2cudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygncHJvamVjdCBub3QgZm91bmQnKSkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBjbG91ZGZsYXJlLmNyZWF0ZVByb2plY3QoXG4gICAgICAgICAgICAgIHRoaXMuc2l0ZS5jbG91ZGZsYXJlUHJvamVjdCxcbiAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5naXRodWJPd25lcixcbiAgICAgICAgICAgICAgcmVwbyxcbiAgICAgICAgICAgICAgYnJhbmNoLFxuICAgICAgICAgICAgICByb290RGlyXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8gUHJvamVjdCBjcmVhdGlvbiBzdWNjZWVkczsgZGVwbG95bWVudCBpcyBhdXRvbWF0aWNhbGx5IGVuYWJsZWQgYnkgZGVmYXVsdC5cbiAgICAgICAgICB9IGNhdGNoIChjcmVhdGVFcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgQ2xvdWRmbGFyZSByZWNvdmVyeSBmYWlsZWQ6ICR7KGNyZWF0ZUVyciBhcyBFcnJvcikubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5lcnJvcnMucHVzaChgQ2xvdWRmbGFyZTogJHttc2d9YCk7XG4gICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZXBhaXIgdGhlIFBhZ2VzIGJ1aWxkIHNldHRpbmdzIGV2ZXJ5IHB1Ymxpc2ggc28gYSBwcm9qZWN0IGNyZWF0ZWQgZWFybGllclxuICAgICAgLy8gd2l0aCBhIGJhZCBidWlsZCBjb21tYW5kIG9yIHN0YWxlIGJyYW5jaCBzZWxmLWhlYWxzLlxuICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgY2xvdWRmbGFyZS5jb25maWd1cmVCdWlsZChcbiAgICAgICAgICAgIHRoaXMuc2l0ZS5jbG91ZGZsYXJlUHJvamVjdCxcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZ2l0aHViT3duZXIsXG4gICAgICAgICAgICByZXBvLFxuICAgICAgICAgICAgYnJhbmNoLFxuICAgICAgICAgICAgcm9vdERpcixcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICByZXN1bHQuZXJyb3JzLnB1c2goYENsb3VkZmxhcmUgYnVpbGQgY29uZmlnOiAkeyhlcnIgYXMgRXJyb3IpLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBjbG91ZGZsYXJlLnRyaWdnZXJEZXBsb3ltZW50KHRoaXMuc2l0ZS5jbG91ZGZsYXJlUHJvamVjdCwgYnJhbmNoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgcmVzdWx0LmVycm9ycy5wdXNoKGBDbG91ZGZsYXJlIGJ1aWxkOiAkeyhlcnIgYXMgRXJyb3IpLm1lc3NhZ2V9LiAke1JFQ09OTkVDVF9ISU5UfWApO1xuICAgICAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXcml0ZSBwdWJsaXNoIG91dGNvbWUgYmFjayBvbnRvIHRoZSBwcm9maWxlIHNvIGl0IHN1cnZpdmVzIGEgcmVzdGFydC5cbiAgICAvLyBtYWluLnRzIHdpbGwgY2FsbCBzYXZlU2V0dGluZ3MoKSBhZnRlciB0aGlzIHJldHVybnMuXG4gICAgdGhpcy5zaXRlLmxhc3RQdWJsaXNoRmFpbGVkID0gIXJlc3VsdC5zdWNjZXNzO1xuICAgIHRoaXMuc2l0ZS5sYXN0UHVibGlzaEVycm9yID0gcmVzdWx0LnN1Y2Nlc3MgPyAnJyA6IChyZXN1bHQuZXJyb3JzWzBdID8/ICdVbmtub3duIGVycm9yJyk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqIHBhY2thZ2UuanNvbiBmb3IgdGhlIHB1Ymxpc2hlZCByZXBvIHNvIENsb3VkZmxhcmUgY2FuIGBucHggbWRnYXJkZW4gYnVpbGRgLiAqL1xuICBwcml2YXRlIGJ1aWxkUGFja2FnZUpzb24oKTogc3RyaW5nIHtcbiAgICBjb25zdCBwa2cgPSB7XG4gICAgICBuYW1lOiB0aGlzLnNpdGUubmFtZSB8fCAnbXktbWRnYXJkZW4nLFxuICAgICAgcHJpdmF0ZTogdHJ1ZSxcbiAgICAgIHNjcmlwdHM6IHsgYnVpbGQ6ICdtZGdhcmRlbiBidWlsZCcgfSxcbiAgICAgIGRlcGVuZGVuY2llczogeyBtZGdhcmRlbjogTURHQVJERU5fVkVSU0lPTiB9LFxuICAgIH07XG4gICAgcmV0dXJuIGAke0pTT04uc3RyaW5naWZ5KHBrZywgbnVsbCwgMil9XFxuYDtcbiAgfVxuXG4gIC8qKiBtZGdhcmRlbi5jb25maWcuanNvbiBnZW5lcmF0ZWQgZnJvbSB0aGlzIHNpdGUncyBwcm9maWxlIChwbHVnaW4tbWFuYWdlZCkuICovXG4gIHByaXZhdGUgYnVpbGRNZGdhcmRlbkNvbmZpZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IHZhdWx0TmFtZSA9IHRoaXMuYXBwLnZhdWx0LmdldE5hbWUoKTtcbiAgICBjb25zdCBob3N0ID0gdGhpcy5zaXRlLnNpdGVVcmwucmVwbGFjZSgvXmh0dHBzPzpcXC9cXC8vLCAnJyk7XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgc2l0ZToge1xuICAgICAgICB0aXRsZTogdGhpcy5zaXRlLnNpZGViYXJUaXRsZSB8fCB0aGlzLnNpdGUubmFtZSB8fCB2YXVsdE5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnNpdGUuc2l0ZURlc2NyaXB0aW9uIHx8IGBOb3RlcyBwdWJsaXNoZWQgZnJvbSAke3ZhdWx0TmFtZX1gLFxuICAgICAgICBiYXNlVXJsOiBob3N0ID8gYGh0dHBzOi8vJHtob3N0fWAgOiAnJyxcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIGF1dGhvcjogdGhpcy5zaXRlLmF1dGhvck5hbWUgfHwgJycsXG4gICAgICB9LFxuICAgICAgdGhlbWU6IHsgZGFya01vZGU6ICd0b2dnbGUnIH0sXG4gICAgICBuYXY6IFtcbiAgICAgICAgeyB0aXRsZTogJ0hvbWUnLCB1cmw6ICcvJyB9LFxuICAgICAgICB7IHRpdGxlOiAnVGFncycsIHVybDogJy90YWdzLycgfSxcbiAgICAgIF0sXG4gICAgICBmZWF0dXJlczoge1xuICAgICAgICBzZWFyY2g6IHRydWUsXG4gICAgICAgIGJhY2tsaW5rczogdHJ1ZSxcbiAgICAgICAgdGFnczogdHJ1ZSxcbiAgICAgICAgZ3JhcGg6IHRydWUsXG4gICAgICAgIG1hdGg6IHRydWUsXG4gICAgICAgIHN5bnRheEhpZ2hsaWdodDogdHJ1ZSxcbiAgICAgICAgcnNzOiB0cnVlLFxuICAgICAgICBzaXRlbWFwOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGJ1aWxkOiB7IGNvbnRlbnREaXI6ICdjb250ZW50Jywgb3V0RGlyOiAncHVibGljJyB9LFxuICAgIH07XG4gICAgcmV0dXJuIGAke0pTT04uc3RyaW5naWZ5KGNvbmZpZywgbnVsbCwgMil9XFxuYDtcbiAgfVxuXG4gIGFzeW5jIHVucHVibGlzaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5ob3N0aW5nUHJvdmlkZXIgIT09ICdjbG91ZGZsYXJlJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnB1Ymxpc2ggdmlhIEFQSSBpcyBvbmx5IHN1cHBvcnRlZCBmb3IgQ2xvdWRmbGFyZSBQYWdlcyBzaXRlcy4nKTtcbiAgICB9XG4gICAgY29uc3QgY2xvdWRmbGFyZSA9IG5ldyBDbG91ZGZsYXJlQXBpKFxuICAgICAgdGhpcy5zZXR0aW5ncy5jbG91ZGZsYXJlVG9rZW4sXG4gICAgICB0aGlzLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50LFxuICAgICk7XG4gICAgLy8gUGF1c2UgdGhlIGRlcGxveW1lbnQgXHUyMDE0IHRha2VzIHRoZSBzaXRlIG9mZmxpbmUgd2l0aG91dCBkZWxldGluZyB0aGUgcHJvamVjdFxuICAgIC8vIG9yIGFueSBjb250ZW50LiBSZS1wdWJsaXNoaW5nIHNpbXBseSByZS1lbmFibGVzIGl0IHZpYSBlbmFibGVEZXBsb3ltZW50LlxuICAgIGF3YWl0IGNsb3VkZmxhcmUuZGlzYWJsZURlcGxveW1lbnQodGhpcy5zaXRlLmNsb3VkZmxhcmVQcm9qZWN0KTtcbiAgfVxuXG59XG4iLCAiaW1wb3J0IHsgQXBwLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgTm90ZUZsYXJlUGx1Z2luIGZyb20gJy4uLy4uLy4uL21haW4nO1xuaW1wb3J0IHsgU2V0dXBTdGVwIH0gZnJvbSAnLi4vLi4vY29yZS90eXBlcyc7XG5pbXBvcnQgeyByZW5kZXJXaXphcmQgfSBmcm9tICcuL3dpemFyZC93aXphcmRSZW5kZXJlcic7XG5pbXBvcnQgeyByZW5kZXJDb25uZWN0aW9uc1NlY3Rpb24sIHJlbmRlckJhY2t1cFNlY3Rpb24sIHJlbmRlclNpdGVzU2VjdGlvbiB9IGZyb20gJy4vbWFuYWdlJztcbmltcG9ydCB7IG9wZW5DbG91ZGZsYXJlQ29ubmVjdEZsb3cgfSBmcm9tICcuL21hbmFnZS9jb25uZWN0aW9uc1NlY3Rpb24nO1xuaW1wb3J0IHsgUmVzZXRNb2RhbCB9IGZyb20gJy4vbW9kYWxzJztcblxuZXhwb3J0IGNsYXNzIE5vdGVGbGFyZVNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIHB1YmxpYyBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbjtcbiAgcHVibGljIHdpemFyZFN0ZXA6IFNldHVwU3RlcDtcbiAgcHVibGljIGlzQ2xvdWRmbGFyZUNvbm5lY3RGbG93T3BlbiA9IGZhbHNlO1xuICBwdWJsaWMgaGFzSW5pdGlhbGl6ZWRXaXphcmQgPSBmYWxzZTtcblxuICBnZXRTZXR0aW5nRGVmaW5pdGlvbnMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHsgaWQ6ICdwdWJsaXNoJywgbmFtZTogJ1B1Ymxpc2gnLCBkZXNjcmlwdGlvbjogJ0NvbmZpZ3VyZSBwdWJsaXNoaW5nIHRvIENsb3VkZmxhcmUgYW5kIEdpdEh1YiBQYWdlcycgfSxcbiAgICAgIHsgaWQ6ICdiYWNrdXAnLCBuYW1lOiAnQXV0b21hdGVkIEJhY2t1cCcsIGRlc2NyaXB0aW9uOiAnQ29uZmlndXJlIGF1dG9tYXRpYyBwcml2YXRlIHJlcG9zaXRvcnkgYmFja3VwcycgfSxcbiAgICAgIHsgaWQ6ICdjb25uZWN0aW9ucycsIG5hbWU6ICdDb25uZWN0aW9ucycsIGRlc2NyaXB0aW9uOiAnTWFuYWdlIGNvbm5lY3RlZCBHaXRIdWIgYW5kIENsb3VkZmxhcmUgYWNjb3VudHMnIH1cbiAgICBdO1xuICB9XG5cbiAgLy8gUGVuZGluZyBjb25maWcgYWNyb3NzIHdpemFyZCBzdGVwc1xuICBwdWJsaWMgcGVuZGluZ05hbWUgPSAnJztcbiAgcHVibGljIHBlbmRpbmdTY29wZTogJ3ZhdWx0JyB8ICdzZWxlY3RlZCcgPSAndmF1bHQnO1xuICBwdWJsaWMgcGVuZGluZ1BhdGhzOiBzdHJpbmdbXSA9IFtdO1xuICBwdWJsaWMgcGVuZGluZ1Byb3ZpZGVyOiAnZ2l0aHViLXBhZ2VzJyB8ICdjbG91ZGZsYXJlJyB8ICduZXRsaWZ5JyB8ICd2ZXJjZWwnID0gJ2Nsb3VkZmxhcmUnO1xuXG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbikge1xuICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB0aGlzLndpemFyZFN0ZXAgPSB0aGlzLmdldEluaXRpYWxXaXphcmRTdGVwKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5pdGlhbFdpemFyZFN0ZXAoKTogU2V0dXBTdGVwIHtcbiAgICBjb25zdCBzID0gdGhpcy5wbHVnaW4uc2V0dGluZ3M7XG4gICAgaWYgKHMuZ2l0aHViVG9rZW4gJiYgcy5naXRodWJPd25lcikgcmV0dXJuICdob3N0aW5nJztcbiAgICByZXR1cm4gJ2dpdGh1Yic7XG4gIH1cblxuICBvdmVycmlkZSBkaXNwbGF5KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgIGNvbnN0IHMgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncztcblxuICAgIHRyeSB7XG4gICAgICBpZiAoIXMuc2V0dXBDb21wbGV0ZSkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzSW5pdGlhbGl6ZWRXaXphcmQpIHtcbiAgICAgICAgICB0aGlzLndpemFyZFN0ZXAgPSB0aGlzLmdldEluaXRpYWxXaXphcmRTdGVwKCk7XG4gICAgICAgICAgdGhpcy5oYXNJbml0aWFsaXplZFdpemFyZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyV2l6YXJkKHRoaXMsIGNvbnRhaW5lckVsKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0Nsb3VkZmxhcmVDb25uZWN0Rmxvd09wZW4pIHtcbiAgICAgICAgb3BlbkNsb3VkZmxhcmVDb25uZWN0Rmxvdyh0aGlzLCBjb250YWluZXJFbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnkgeyByZW5kZXJDb25uZWN0aW9uc1NlY3Rpb24odGhpcywgY29udGFpbmVyRWwpOyB9XG4gICAgICAgIGNhdGNoIChlKSB7IHRoaXMucmVuZGVyU2VjdGlvbkVycm9yKGNvbnRhaW5lckVsLCAnQ29ubmVjdGlvbnMnLCBlKTsgfVxuICAgICAgICB0cnkgeyByZW5kZXJCYWNrdXBTZWN0aW9uKHRoaXMsIGNvbnRhaW5lckVsKTsgfVxuICAgICAgICBjYXRjaCAoZSkgeyB0aGlzLnJlbmRlclNlY3Rpb25FcnJvcihjb250YWluZXJFbCwgJ0JhY2t1cCcsIGUpOyB9XG4gICAgICAgIHRyeSB7IHJlbmRlclNpdGVzU2VjdGlvbih0aGlzLCBjb250YWluZXJFbCk7IH1cbiAgICAgICAgY2F0Y2ggKGUpIHsgdGhpcy5yZW5kZXJTZWN0aW9uRXJyb3IoY29udGFpbmVyRWwsICdTaXRlcycsIGUpOyB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICB0aGlzLnJlbmRlclNlY3Rpb25FcnJvcihjb250YWluZXJFbCwgJ1NldHRpbmdzJywgZXJyKTtcbiAgICB9XG5cbiAgICAvLyBBbHdheXMgcmVuZGVyIHRoZSByZXNldCBmb290ZXIsIGV2ZW4gaWYgYSBzZWN0aW9uIGFib3ZlIHRocmV3LlxuICAgIHRoaXMucmVuZGVyUmVzZXRGb290ZXIoY29udGFpbmVyRWwpO1xuICB9XG5cbiAgLyoqIERpc3BsYXkgYW4gaW5saW5lIGVycm9yIHdoZW4gYSBzZXR0aW5ncyBzZWN0aW9uIGZhaWxzIHRvIHJlbmRlci4gKi9cbiAgcHJpdmF0ZSByZW5kZXJTZWN0aW9uRXJyb3IoZWw6IEhUTUxFbGVtZW50LCBzZWN0aW9uOiBzdHJpbmcsIGVycjogdW5rbm93bik6IHZvaWQge1xuICAgIGNvbnN0IG1zZyA9IGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKTtcbiAgICBjb25zb2xlLmVycm9yKGBOb3RlRmxhcmU6ICR7c2VjdGlvbn0gc2VjdGlvbiByZW5kZXIgZXJyb3I6YCwgZXJyKTtcbiAgICBjb25zdCBwID0gZWwuY3JlYXRlRWwoJ3AnLCB7IGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicgfSk7XG4gICAgcC5zZXRUZXh0KGBcdTI2QTAgTm90ZUZsYXJlICgke3NlY3Rpb259KTogJHttc2d9YCk7XG4gICAgcC5zZXRDc3NTdHlsZXMoeyBjb2xvcjogJ3ZhcigtLXRleHQtZXJyb3IpJywgbWFyZ2luQm90dG9tOiAnOHB4JyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuQ2xvdWRmbGFyZUNvbm5lY3RGbG93KCk6IHZvaWQge1xuICAgIHRoaXMuaXNDbG91ZGZsYXJlQ29ubmVjdEZsb3dPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHVibGljIGNsb3NlU2V0dGluZ3MoKTogdm9pZCB7XG4gICAgY29uc3Qgc2V0dGluZyA9ICh0aGlzLmFwcCBhcyB1bmtub3duIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KS5zZXR0aW5nIGFzXG4gICAgICB8IHsgY2xvc2U/OiAoKSA9PiB2b2lkIH1cbiAgICAgIHwgdW5kZWZpbmVkO1xuICAgIHNldHRpbmc/LmNsb3NlPy4oKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyUmVzZXRGb290ZXIoZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgZGl2aWRlciA9IGVsLmNyZWF0ZURpdignbmYtcmVzZXQtZm9vdGVyJyk7XG5cbiAgICBjb25zdCBkYW5nZXJIZWFkaW5nID0gbmV3IFNldHRpbmcoZGl2aWRlcik7XG4gICAgZGFuZ2VySGVhZGluZy5zZXROYW1lKCdEYW5nZXIgem9uZScpO1xuICAgIGRhbmdlckhlYWRpbmcuc2V0SGVhZGluZygpO1xuXG4gICAgY29uc3QgcmVzZXRTZXR0aW5nID0gbmV3IFNldHRpbmcoZGl2aWRlcik7XG4gICAgcmVzZXRTZXR0aW5nLnNldE5hbWUoJ0hhcmQgcmVzZXQgTm90ZUZsYXJlJyk7XG4gICAgcmVzZXRTZXR0aW5nLnNldERlc2MoXG4gICAgICAnQ2xlYXJzIGFsbCBOb3RlRmxhcmUgZGF0YSBcdTIwMTQgdG9rZW5zLCBldmVyeSBzaXRlLCBhbmQgYWxsIGNvbmZpZ3VyYXRpb24uICcgK1xuICAgICAgJ1lvdXIgR2l0SHViIHJlcG9zIGFuZCBDbG91ZGZsYXJlIHByb2plY3RzIGFyZSBOT1QgZGVsZXRlZCBhbmQgY2FuIGJlIHJlY29ubmVjdGVkIGFueSB0aW1lLicsXG4gICAgKTtcbiAgICByZXNldFNldHRpbmcuYWRkQnV0dG9uKChiKSA9PiB7XG4gICAgICBiLnNldEJ1dHRvblRleHQoJ0hhcmQgcmVzZXQnKTtcbiAgICAgIGIuYnV0dG9uRWwuYWRkQ2xhc3MoJ21vZC13YXJuaW5nJyk7XG4gICAgICBiLm9uQ2xpY2soKCkgPT5cbiAgICAgICAgbmV3IFJlc2V0TW9kYWwodGhpcy5hcHAsIHRoaXMucGx1Z2luLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy53aXphcmRTdGVwID0gJ2dpdGh1Yic7XG4gICAgICAgICAgdGhpcy5wZW5kaW5nTmFtZSA9ICcnO1xuICAgICAgICAgIHRoaXMucGVuZGluZ1Njb3BlID0gJ3ZhdWx0JztcbiAgICAgICAgICB0aGlzLnBlbmRpbmdQYXRocyA9IFtdO1xuICAgICAgICAgIHRoaXMucGVuZGluZ1Byb3ZpZGVyID0gJ2Nsb3VkZmxhcmUnO1xuICAgICAgICAgIHRoaXMuaGFzSW5pdGlhbGl6ZWRXaXphcmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9KS5vcGVuKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgTm90ZUZsYXJlU2V0dGluZ3NUYWIgfSBmcm9tICcuLi9zZXR0aW5nc1RhYic7XG5pbXBvcnQgeyBHaXRIdWJBcGkgfSBmcm9tICcuLi8uLi8uLi9hcGkvZ2l0aHViQXBpJztcbmltcG9ydCB7IGNyZWF0ZUVycm9yRWwsIHNob3dFcnJvciwgaGlkZUVycm9yLCBidXN5LCBpZGxlIH0gZnJvbSAnLi4vc2V0dGluZ3NIZWxwZXJzJztcblxuY29uc3QgR0lUSFVCX1RPS0VOX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20vc2V0dGluZ3MvdG9rZW5zL25ldz9zY29wZXM9cmVwbyx3b3JrZmxvdyZkZXNjcmlwdGlvbj1Ob3RlRmxhcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU3RlcEdpdEh1Yih0YWI6IE5vdGVGbGFyZVNldHRpbmdzVGFiLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBoZWFkaW5nID0gbmV3IFNldHRpbmcoZWwpO1xuICAgIGhlYWRpbmcuc2V0TmFtZSgnQ29ubmVjdCBHaXRIdWInKTtcbiAgICBoZWFkaW5nLnNldEhlYWRpbmcoKTtcblxuICAgIGVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyxcbiAgICAgIHRleHQ6ICdHaXRIdWIgc3RvcmVzIHlvdXIgc2l0ZSBhbmQgdmF1bHQgYmFja3VwLiBZb3VyIHRva2VuIGlzIGVuY3J5cHRlZCBpbiB5b3VyIE9TIGtleWNoYWluIFx1MjAxNCBuZXZlciBsb2dnZWQuJyxcbiAgICB9KTtcblxuICAgIGxldCB0b2tlblZhbHVlID0gdGFiLnBsdWdpbi5zZXR0aW5ncy5naXRodWJUb2tlbjtcblxuICAgIGNvbnN0IHRva2VuU2V0dGluZyA9IG5ldyBTZXR0aW5nKGVsKS5zZXROYW1lKCdQZXJzb25hbCBhY2Nlc3MgdG9rZW4nKTtcbiAgICB0b2tlblNldHRpbmcuZGVzY0VsLmFwcGVuZFRleHQoJ0NyZWF0ZSBvbmUgd2l0aCAnKTtcbiAgICB0b2tlblNldHRpbmcuZGVzY0VsLmNyZWF0ZUVsKCdzdHJvbmcnLCB7IHRleHQ6ICdyZXBvJyB9KTtcbiAgICB0b2tlblNldHRpbmcuZGVzY0VsLmFwcGVuZFRleHQoJyArICcpO1xuICAgIHRva2VuU2V0dGluZy5kZXNjRWwuY3JlYXRlRWwoJ3N0cm9uZycsIHsgdGV4dDogJ3dvcmtmbG93JyB9KTtcbiAgICB0b2tlblNldHRpbmcuZGVzY0VsLmFwcGVuZFRleHQoJyBzY29wZXMuICcpO1xuICAgIHRva2VuU2V0dGluZy5kZXNjRWwuY3JlYXRlRWwoJ2EnLCB7XG4gICAgICB0ZXh0OiAnQ3JlYXRlIHRva2VuIFx1MjE5NycsXG4gICAgICBocmVmOiBHSVRIVUJfVE9LRU5fVVJMLFxuICAgICAgYXR0cjogeyB0YXJnZXQ6ICdfYmxhbmsnLCByZWw6ICdub29wZW5lcicgfSxcbiAgICB9KTtcbiAgICB0b2tlblNldHRpbmcuYWRkVGV4dCgodGV4dCkgPT4ge1xuICAgICAgdGV4dC5zZXRQbGFjZWhvbGRlcignZ2hwX1x1MjAyNicpO1xuICAgICAgdGV4dC5pbnB1dEVsLnR5cGUgPSAncGFzc3dvcmQnO1xuICAgICAgdGV4dC5zZXRWYWx1ZSh0b2tlblZhbHVlKTtcbiAgICAgIHRleHQub25DaGFuZ2UoKHYpID0+IHtcbiAgICAgICAgdG9rZW5WYWx1ZSA9IHYudHJpbSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlcnJvckVsID0gY3JlYXRlRXJyb3JFbChlbCk7XG5cbiAgICBuZXcgU2V0dGluZyhlbCkuYWRkQnV0dG9uKChidG4pID0+IHtcbiAgICAgIGJ0bi5zZXRCdXR0b25UZXh0KCdWZXJpZnkgJiBjb250aW51ZScpLnNldEN0YSgpO1xuICAgICAgYnRuLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKCF0b2tlblZhbHVlKSByZXR1cm4gc2hvd0Vycm9yKGVycm9yRWwsICdQbGVhc2UgZW50ZXIgeW91ciBHaXRIdWIgdG9rZW4uJyk7XG4gICAgICAgICAgaGlkZUVycm9yKGVycm9yRWwpO1xuICAgICAgICAgIGJ1c3koYnRuLCAnVmVyaWZ5aW5nXHUyMDI2Jyk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJuYW1lID0gYXdhaXQgbmV3IEdpdEh1YkFwaSh0b2tlblZhbHVlLCAnJywgJycpLmdldEF1dGhlbnRpY2F0ZWRVc2VyKCk7XG4gICAgICAgICAgICB0YWIucGx1Z2luLnNldHRpbmdzLmdpdGh1YlRva2VuID0gdG9rZW5WYWx1ZTtcbiAgICAgICAgICAgIHRhYi5wbHVnaW4uc2V0dGluZ3MuZ2l0aHViT3duZXIgPSB1c2VybmFtZTtcbiAgICAgICAgICAgIGF3YWl0IHRhYi5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB0YWIud2l6YXJkU3RlcCA9ICdob3N0aW5nJztcbiAgICAgICAgICAgIHRhYi5yZW5kZXIoKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IChlcnIgYXMgRXJyb3IpLm1lc3NhZ2U7XG4gICAgICAgICAgICBzaG93RXJyb3IoXG4gICAgICAgICAgICAgIGVycm9yRWwsXG4gICAgICAgICAgICAgIC9pbnZhbGlkL2kudGVzdChtc2cpXG4gICAgICAgICAgICAgICAgPyAnVG9rZW4gaW52YWxpZCBvciBtaXNzaW5nIHRoZSByZXBvIHNjb3BlLiBDaGVjayBpdCBhbmQgdHJ5IGFnYWluLidcbiAgICAgICAgICAgICAgICA6IG1zZyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZGxlKGJ0biwgJ1ZlcmlmeSAmIGNvbnRpbnVlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCAiLyoqXG4gKiBTaGFyZWQgVUkgaGVscGVycyBmb3IgdGhlIHNldHRpbmdzIHdpemFyZCBhbmQgbWFuYWdlIHBhbmVsLlxuICogUHVyZSBmdW5jdGlvbnMgd2l0aCBubyBwbHVnaW4gZGVwZW5kZW5jeSBcdTIwMTQgcGFzc2VkIGFzIGNhbGxiYWNrc1xuICogc28gZWFjaCBzdGVwIGZpbGUgY2FuIGNhbGwgYnVzeS9pZGxlL2Vycm9yIHdpdGhvdXQgY291cGxpbmcgdG8gdGhlIHRhYiBjbGFzcy5cbiAqL1xuaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnb2JzaWRpYW4nO1xuXG4vKiogQXBwZW5kIGEgaGlkZGVuIGVycm9yIHBhcmFncmFwaCB0byBgY29udGFpbmVyYCBhbmQgcmV0dXJuIGl0LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVycm9yRWwoY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgY29uc3QgZWwgPSBjb250YWluZXIuY3JlYXRlRWwoJ3AnLCB7IGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicgfSk7XG4gIGVsLnNldENzc1N0eWxlcyh7IGNvbG9yOiAndmFyKC0tdGV4dC1lcnJvciknIH0pO1xuICBlbC5oaWRlKCk7XG4gIHJldHVybiBlbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihlbDogSFRNTEVsZW1lbnQsIG1zZzogc3RyaW5nKTogdm9pZCB7XG4gIGVsLnNldFRleHQobXNnKTtcbiAgZWwuc2hvdygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZUVycm9yKGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICBlbC5oaWRlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidXN5KGJ0bjogQnV0dG9uQ29tcG9uZW50LCBsYWJlbDogc3RyaW5nKTogdm9pZCB7XG4gIGJ0bi5zZXREaXNhYmxlZCh0cnVlKS5zZXRCdXR0b25UZXh0KGxhYmVsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlkbGUoYnRuOiBCdXR0b25Db21wb25lbnQsIGxhYmVsOiBzdHJpbmcpOiB2b2lkIHtcbiAgYnRuLnNldERpc2FibGVkKGZhbHNlKS5zZXRCdXR0b25UZXh0KGxhYmVsKTtcbn1cbiIsICJpbXBvcnQgeyBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgeyBOb3RlRmxhcmVTZXR0aW5nc1RhYiB9IGZyb20gJy4uL3NldHRpbmdzVGFiJztcbmltcG9ydCB7IENsb3VkZmxhcmVBcGkgfSBmcm9tICcuLi8uLi8uLi9hcGkvY2xvdWRmbGFyZUFwaSc7XG5pbXBvcnQgeyBidWlsZENsb3VkZmxhcmVUb2tlblVybCwgc2x1Z2lmeSwgcHJvdmlzaW9uU2l0ZSB9IGZyb20gJy4uL21vZGFscy9oZWxwZXJzJztcbmltcG9ydCB7IGNyZWF0ZUVycm9yRWwsIHNob3dFcnJvciwgaGlkZUVycm9yLCBidXN5LCBpZGxlIH0gZnJvbSAnLi4vc2V0dGluZ3NIZWxwZXJzJztcbmltcG9ydCB7IFBhdGhTdWdnZXN0TW9kYWwgfSBmcm9tICcuLi9tb2RhbHMvcGF0aFN1Z2dlc3RNb2RhbCc7XG5cbmNvbnN0IENMT1VERkxBUkVfQVBQX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20vYXBwcy9jbG91ZGZsYXJlLXdvcmtlcnMtYW5kLXBhZ2VzL2luc3RhbGxhdGlvbnMvbmV3JztcbmNvbnN0IENMT1VERkxBUkVfVE9LRU5fVVJMID0gYnVpbGRDbG91ZGZsYXJlVG9rZW5VcmwoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclN0ZXBIb3N0aW5nKHRhYjogTm90ZUZsYXJlU2V0dGluZ3NUYWIsIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGhlYWRpbmcgPSBuZXcgU2V0dGluZyhlbCk7XG4gICAgaGVhZGluZy5zZXROYW1lKCdDaG9vc2UgaG9zdGluZyAmIGNyZWF0ZSB5b3VyIHNpdGUnKTtcbiAgICBoZWFkaW5nLnNldEhlYWRpbmcoKTtcblxuICAgIGVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyxcbiAgICAgIHRleHQ6ICdQaWNrIHdoZXJlIE5vdGVGbGFyZSBzaG91bGQgaG9zdCB5b3VyIHNpdGUuIEdpdEh1YiBQYWdlcyBpcyBmcmVlIGFuZCB3b3JrcyBvdXQgb2YgdGhlIGJveC4gQ2xvdWRmbGFyZSBhZGRzIGEgZ2xvYmFsIENETiBhbmQgaW5zdGFudCBkZXBsb3kgY29udHJvbHMuJyxcbiAgICB9KTtcblxuICAgIC8vIFNpdGUgbmFtZVxuICAgIGxldCBzaXRlTmFtZSA9IHRhYi5wZW5kaW5nTmFtZSB8fCAnbXktbm90ZXMnO1xuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLnNldE5hbWUoJ1NpdGUgbmFtZScpXG4gICAgICAuc2V0RGVzYygnVXNlZCBmb3IgeW91ciByZXBvc2l0b3J5IGFuZCBzaXRlIGFkZHJlc3MuIExvd2VyY2FzZSBsZXR0ZXJzLCBudW1iZXJzLCBhbmQgZGFzaGVzLicpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT4ge1xuICAgICAgICB0ZXh0LnNldFBsYWNlaG9sZGVyKCdteS1ub3RlcycpO1xuICAgICAgICB0ZXh0LnNldFZhbHVlKHNpdGVOYW1lKTtcbiAgICAgICAgdGV4dC5vbkNoYW5nZSgodikgPT4ge1xuICAgICAgICAgIHNpdGVOYW1lID0gdjtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIC8vIE1hc3RlciByZXBvIG5hbWVcbiAgICBsZXQgbWFzdGVyUmVwbyA9IHRhYi5wbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeSB8fCAnbm90ZWZsYXJlLXNpdGVzJztcbiAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5zZXROYW1lKCdHaXRIdWIgcmVwb3NpdG9yeSBuYW1lJylcbiAgICAgIC5zZXREZXNjKCdBbGwgeW91ciBOb3RlRmxhcmUgc2l0ZXMgd2lsbCBsaXZlIGluc2lkZSB0aGlzIHNpbmdsZSByZXBvc2l0b3J5LicpXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT4ge1xuICAgICAgICB0ZXh0LnNldFBsYWNlaG9sZGVyKCdub3RlZmxhcmUtc2l0ZXMnKTtcbiAgICAgICAgdGV4dC5zZXRWYWx1ZShtYXN0ZXJSZXBvKTtcbiAgICAgICAgdGV4dC5vbkNoYW5nZSgodikgPT4ge1xuICAgICAgICAgIG1hc3RlclJlcG8gPSB2LnRyaW0oKTtcbiAgICAgICAgICAvLyBLZWVwIHRoZSBDRiBhdXRob3JpemUgaGludCBpbiBzeW5jIHdpdGggd2hhdCB0aGUgdXNlciB0eXBlc1xuICAgICAgICAgIHVwZGF0ZUNmQXBwSGludCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gXHUyNTAwXHUyNTAwIEhvc3RpbmcgcHJvdmlkZXIgc2VsZWN0b3IgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gICAgLy8gVGhpcyB3cml0ZXMgdGFiLnBlbmRpbmdQcm92aWRlciBzbyB0aGUgcmVzdCBvZiB0aGUgd2l6YXJkIGtub3dzIHRoZSBjaG9pY2UuXG4gICAgbGV0IHNlbGVjdGVkUHJvdmlkZXIgPSB0YWIucGVuZGluZ1Byb3ZpZGVyO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuc2V0TmFtZSgnSG9zdGluZyBwcm92aWRlcicpXG4gICAgICAuc2V0RGVzYygnR2l0SHViIFBhZ2VzIGlzIGZyZWUgd2l0aCBubyBleHRyYSBzZXR1cC4gQ2xvdWRmbGFyZSBQYWdlcyBhZGRzIGEgQ0ROIGFuZCByZWFsLXRpbWUgZGVwbG95IGNvbnRyb2xzIChyZXF1aXJlcyBhIGZyZWUgQ2xvdWRmbGFyZSBhY2NvdW50KS4nKVxuICAgICAgLmFkZERyb3Bkb3duKChkKSA9PiB7XG4gICAgICAgIGQuYWRkT3B0aW9uKCdnaXRodWItcGFnZXMnLCAnR2l0SHViIFBhZ2VzIChmcmVlLCBubyBzZXR1cCByZXF1aXJlZCknKTtcbiAgICAgICAgZC5hZGRPcHRpb24oJ2Nsb3VkZmxhcmUnLCAnQ2xvdWRmbGFyZSBQYWdlcyAoQ0ROLCBkZXBsb3kgY29udHJvbHMpJyk7XG4gICAgICAgIGQuc2V0VmFsdWUoc2VsZWN0ZWRQcm92aWRlcik7XG4gICAgICAgIGQub25DaGFuZ2UoKHYpID0+IHtcbiAgICAgICAgICBzZWxlY3RlZFByb3ZpZGVyID0gdiBhcyAnZ2l0aHViLXBhZ2VzJyB8ICdjbG91ZGZsYXJlJztcbiAgICAgICAgICB0YWIucGVuZGluZ1Byb3ZpZGVyID0gc2VsZWN0ZWRQcm92aWRlcjtcbiAgICAgICAgICAvLyBTaG93L2hpZGUgQ0YgY3JlZGVudGlhbHMgc2VjdGlvbiBiYXNlZCBvbiB0aGUgY2hvc2VuIHByb3ZpZGVyXG4gICAgICAgICAgY2ZTZWN0aW9uLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6IHNlbGVjdGVkUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJyA/ICdibG9jaycgOiAnbm9uZScgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAvLyBQdWJsaXNoIHNjb3BlXG4gICAgbGV0IHNjb3BlID0gdGFiLnBlbmRpbmdTY29wZTtcbiAgICBsZXQgcGF0aHMgPSBbLi4udGFiLnBlbmRpbmdQYXRoc107XG5cbiAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5zZXROYW1lKCdQdWJsaXNoIHNjb3BlJylcbiAgICAgIC5zZXREZXNjKCdQdWJsaXNoIHRoZSBlbnRpcmUgdmF1bHQgb3Igb25seSBzZWxlY3RlZCBmaWxlcyBhbmQgZm9sZGVycy4nKVxuICAgICAgLmFkZERyb3Bkb3duKChkKSA9PiB7XG4gICAgICAgIGQuYWRkT3B0aW9uKCd2YXVsdCcsICdGdWxsIHZhdWx0Jyk7XG4gICAgICAgIGQuYWRkT3B0aW9uKCdzZWxlY3RlZCcsICdTZWxlY3RlZCBmaWxlcyAvIGZvbGRlcnMnKTtcbiAgICAgICAgZC5zZXRWYWx1ZShzY29wZSk7XG4gICAgICAgIGQub25DaGFuZ2UoKHYpID0+IHtcbiAgICAgICAgICBzY29wZSA9IHYgYXMgJ3ZhdWx0JyB8ICdzZWxlY3RlZCc7XG4gICAgICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IHBhdGhzQ29udGFpbmVyID0gZWwuY3JlYXRlRGl2KCdub3RlZmxhcmUtcGF0aHMtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcmVuZGVyUGF0aHMgPSAoKSA9PiB7XG4gICAgICBwYXRoc0NvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgaWYgKHNjb3BlID09PSAndmF1bHQnKSB7XG4gICAgICAgIHBhdGhzQ29udGFpbmVyLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGF0aHNDb250YWluZXIuc2V0Q3NzU3R5bGVzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KTtcbiAgICAgIGlmIChwYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcGF0aHNDb250YWluZXIuY3JlYXRlRWwoJ3AnLCB7IHRleHQ6ICdObyBpdGVtcyBzZWxlY3RlZC4nLCBjbHM6ICdub3RlZmxhcmUtbXV0ZWQnIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHBhdGhzQ29udGFpbmVyLmNyZWF0ZUVsKCd1bCcsIHsgY2xzOiAnbm90ZWZsYXJlLXBhdGgtbGlzdCcgfSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBsaSA9IGxpc3QuY3JlYXRlRWwoJ2xpJyk7XG4gICAgICAgICAgbGkuc2V0Q3NzU3R5bGVzKHsgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAnNHB4JyB9KTtcbiAgICAgICAgICBsaS5jcmVhdGVTcGFuKHsgdGV4dDogcGF0aHNbaV0gfSk7XG4gICAgICAgICAgY29uc3QgcmIgPSBsaS5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnXHUyNzE1JyB9KTtcbiAgICAgICAgICByYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgcGF0aHMuc3BsaWNlKGksIDEpOyByZW5kZXJQYXRocygpOyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgYWRkUm93ID0gcGF0aHNDb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICBhZGRSb3cuc2V0Q3NzU3R5bGVzKHsgbWFyZ2luVG9wOiAnOHB4JyB9KTtcbiAgICAgIGNvbnN0IGFkZEJ0biA9IGFkZFJvdy5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnQnJvd3NlIHZhdWx0XHUyMDI2JyB9KTtcbiAgICAgIGFkZEJ0bi5zZXRDc3NTdHlsZXMoeyB3aWR0aDogJzEwMCUnIH0pO1xuICAgICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBuZXcgUGF0aFN1Z2dlc3RNb2RhbCh0YWIuYXBwLCAocCkgPT4ge1xuICAgICAgICAgIGlmICghcGF0aHMuaW5jbHVkZXMocCkpIHsgcGF0aHMucHVzaChwKTsgcmVuZGVyUGF0aHMoKTsgfVxuICAgICAgICB9KS5vcGVuKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHJlbmRlclBhdGhzKCk7XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgQ2xvdWRmbGFyZSBjcmVkZW50aWFscyBzZWN0aW9uIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIC8vIE9ubHkgdmlzaWJsZSB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgQ2xvdWRmbGFyZSBhcyB0aGUgaG9zdGluZyBwcm92aWRlci5cbiAgICBjb25zdCBjZlNlY3Rpb24gPSBlbC5jcmVhdGVEaXYoJ25mLWNmLXNlY3Rpb24nKTtcbiAgICBjZlNlY3Rpb24uc2V0Q3NzU3R5bGVzKHsgZGlzcGxheTogc2VsZWN0ZWRQcm92aWRlciA9PT0gJ2Nsb3VkZmxhcmUnID8gJ2Jsb2NrJyA6ICdub25lJyB9KTtcblxuICAgIGxldCBjZlRva2VuID0gdGFiLnBsdWdpbi5zZXR0aW5ncy5jbG91ZGZsYXJlVG9rZW47XG4gICAgbGV0IGNmQWNjb3VudCA9IHRhYi5wbHVnaW4uc2V0dGluZ3MuY2xvdWRmbGFyZUFjY291bnQ7XG5cbiAgICAvLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBDRiBBcHAgYXV0aG9yaXplIGhpbnQgZWxlbWVudCBzbyB3ZSBjYW4gdXBkYXRlXG4gICAgLy8gaXQgaW4gcmVhbC10aW1lIHdoZW4gdGhlIHVzZXIgY2hhbmdlcyB0aGUgcmVwb3NpdG9yeSBuYW1lIGFib3ZlLlxuICAgIGxldCBjZkFwcEhpbnRFbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCB1cGRhdGVDZkFwcEhpbnQgPSAoKSA9PiB7XG4gICAgICBpZiAoY2ZBcHBIaW50RWwpIHtcbiAgICAgICAgY2ZBcHBIaW50RWwuc2V0VGV4dChcbiAgICAgICAgICBgR3JhbnQgdGhlIFwiQ2xvdWRmbGFyZSBXb3JrZXJzIGFuZCBQYWdlc1wiIGFwcCBhY2Nlc3MgdG86ICR7dGFiLnBsdWdpbi5zZXR0aW5ncy5naXRodWJPd25lcn0vJHttYXN0ZXJSZXBvIHx8ICdub3RlZmxhcmUtc2l0ZXMnfWAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG5ldyBTZXR0aW5nKGNmU2VjdGlvbilcbiAgICAgIC5zZXROYW1lKCcxLiBDcmVhdGUgYSBDbG91ZGZsYXJlIEFQSSB0b2tlbicpXG4gICAgICAuc2V0RGVzYygnQ3JlYXRlcyBhIHRva2VuIHdpdGggUGFnZXMsIFdvcmtlcnMsIGFuZCBBY2NvdW50IHBlcm1pc3Npb25zIHByZS1maWxsZWQuJylcbiAgICAgIC5hZGRCdXR0b24oKGIpID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdDcmVhdGUgVG9rZW4gXHUyMTk3Jyk7XG4gICAgICAgIGIub25DbGljaygoKSA9PiB7IHdpbmRvdy5vcGVuKENMT1VERkxBUkVfVE9LRU5fVVJMLCAnX2JsYW5rJyk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBjZkFwcFNldHRpbmcgPSBuZXcgU2V0dGluZyhjZlNlY3Rpb24pXG4gICAgICAuc2V0TmFtZSgnMi4gQXV0aG9yaXplIENsb3VkZmxhcmUgb24gR2l0SHViJylcbiAgICAgIC5zZXREZXNjKGBHcmFudCB0aGUgXCJDbG91ZGZsYXJlIFdvcmtlcnMgYW5kIFBhZ2VzXCIgYXBwIGFjY2VzcyB0bzogJHt0YWIucGx1Z2luLnNldHRpbmdzLmdpdGh1Yk93bmVyfS8ke21hc3RlclJlcG8gfHwgJ25vdGVmbGFyZS1zaXRlcyd9YClcbiAgICAgIC5hZGRCdXR0b24oKGIpID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdBdXRob3JpemUgXHUyMTk3Jyk7XG4gICAgICAgIGIub25DbGljaygoKSA9PiB7IHdpbmRvdy5vcGVuKENMT1VERkxBUkVfQVBQX1VSTCwgJ19ibGFuaycpOyB9KTtcbiAgICAgIH0pO1xuICAgIC8vIFN0b3JlIGRlc2NyaXB0aW9uIGVsZW1lbnQgcmVmIGZvciBsaXZlIHVwZGF0ZXMgd2hlbiBtYXN0ZXJSZXBvIGZpZWxkIGNoYW5nZXNcbiAgICBjZkFwcEhpbnRFbCA9IGNmQXBwU2V0dGluZy5kZXNjRWw7XG5cbiAgICBuZXcgU2V0dGluZyhjZlNlY3Rpb24pXG4gICAgICAuc2V0TmFtZSgnQ2xvdWRmbGFyZSBBUEkgdG9rZW4nKVxuICAgICAgLnNldERlc2MoJ1N0b3JlZCBlbmNyeXB0ZWQgaW4geW91ciBPUyBrZXljaGFpbi4nKVxuICAgICAgLmFkZFRleHQoKHQpID0+IHtcbiAgICAgICAgdC5zZXRQbGFjZWhvbGRlcignUGFzdGUgQVBJIHRva2VuXHUyMDI2Jyk7XG4gICAgICAgIHQuaW5wdXRFbC50eXBlID0gJ3Bhc3N3b3JkJztcbiAgICAgICAgdC5zZXRWYWx1ZShjZlRva2VuKTtcbiAgICAgICAgdC5vbkNoYW5nZSgodikgPT4geyBjZlRva2VuID0gdi50cmltKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjZlNlY3Rpb24pXG4gICAgICAuc2V0TmFtZSgnQ2xvdWRmbGFyZSBhY2NvdW50IElEJylcbiAgICAgIC5zZXREZXNjKCdPcHRpb25hbCBcdTIwMTQgZGV0ZWN0ZWQgYXV0b21hdGljYWxseSBmcm9tIHlvdXIgdG9rZW4uJylcbiAgICAgIC5hZGRUZXh0KCh0KSA9PiB7XG4gICAgICAgIHQuc2V0UGxhY2Vob2xkZXIoJ0F1dG8tZGV0ZWN0ZWQnKTtcbiAgICAgICAgdC5zZXRWYWx1ZShjZkFjY291bnQpO1xuICAgICAgICB0Lm9uQ2hhbmdlKCh2KSA9PiB7IGNmQWNjb3VudCA9IHYudHJpbSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgZXJyb3JFbCA9IGNyZWF0ZUVycm9yRWwoZWwpO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuYWRkQnV0dG9uKChiYWNrKSA9PiB7XG4gICAgICAgIGJhY2suc2V0QnV0dG9uVGV4dCgnQmFjaycpO1xuICAgICAgICBiYWNrLm9uQ2xpY2soKCkgPT4geyB0YWIud2l6YXJkU3RlcCA9ICdnaXRodWInOyB0YWIucmVuZGVyKCk7IH0pO1xuICAgICAgfSlcbiAgICAgIC5hZGRCdXR0b24oKGJ0bikgPT4ge1xuICAgICAgICBidG4uc2V0QnV0dG9uVGV4dCgnQ29udGludWUnKS5zZXRDdGEoKTtcbiAgICAgICAgYnRuLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVTbHVnID0gc2x1Z2lmeShzaXRlTmFtZSk7XG4gICAgICAgICAgICBpZiAoIW5hbWVTbHVnKSByZXR1cm4gc2hvd0Vycm9yKGVycm9yRWwsICdQbGVhc2UgZW50ZXIgYSBzaXRlIG5hbWUuJyk7XG4gICAgICAgICAgICBpZiAoIW1hc3RlclJlcG8udHJpbSgpKSByZXR1cm4gc2hvd0Vycm9yKGVycm9yRWwsICdQbGVhc2UgZW50ZXIgYSByZXBvc2l0b3J5IG5hbWUuJyk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRQcm92aWRlciA9PT0gJ2Nsb3VkZmxhcmUnICYmICFjZlRva2VuKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzaG93RXJyb3IoZXJyb3JFbCwgJ1BsZWFzZSBwYXN0ZSB5b3VyIENsb3VkZmxhcmUgQVBJIHRva2VuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGlkZUVycm9yKGVycm9yRWwpO1xuICAgICAgICAgICAgYnVzeShidG4sICdTZXR0aW5nIHVwXHUyMDI2Jyk7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIC8vIFNhdmUgbWFzdGVyIHJlcG8gbmFtZSBiZWZvcmUgcHJvdmlzaW9uaW5nXG4gICAgICAgICAgICAgIHRhYi5wbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeSA9IG1hc3RlclJlcG8udHJpbSgpO1xuXG4gICAgICAgICAgICAgIC8vIFJlc29sdmUgQ2xvdWRmbGFyZSBhY2NvdW50IGlmIENsb3VkZmxhcmUgd2FzIGNob3NlblxuICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRQcm92aWRlciA9PT0gJ2Nsb3VkZmxhcmUnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFjY291bnRJZCA9IGNmQWNjb3VudDtcbiAgICAgICAgICAgICAgICBpZiAoIWFjY291bnRJZCkge1xuICAgICAgICAgICAgICAgICAgYnVzeShidG4sICdEZXRlY3RpbmcgQ2xvdWRmbGFyZSBhY2NvdW50XHUyMDI2Jyk7XG4gICAgICAgICAgICAgICAgICBhY2NvdW50SWQgPSBhd2FpdCBuZXcgQ2xvdWRmbGFyZUFwaShjZlRva2VuLCAnJykuZ2V0QWNjb3VudElkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhYi5wbHVnaW4uc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuID0gY2ZUb2tlbjtcbiAgICAgICAgICAgICAgICB0YWIucGx1Z2luLnNldHRpbmdzLmNsb3VkZmxhcmVBY2NvdW50ID0gYWNjb3VudElkO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRhYi5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBidXN5KGJ0biwgJ0NyZWF0aW5nIHlvdXIgc2l0ZVx1MjAyNicpO1xuICAgICAgICAgICAgICBjb25zdCBzaXRlID0gYXdhaXQgcHJvdmlzaW9uU2l0ZShcbiAgICAgICAgICAgICAgICB0YWIucGx1Z2luLFxuICAgICAgICAgICAgICAgIHNpdGVOYW1lLFxuICAgICAgICAgICAgICAgIHsgcHVibGlzaFNjb3BlOiBzY29wZSwgcHVibGlzaFBhdGhzOiBwYXRocyB9LFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJvdmlkZXIsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRhYi5wbHVnaW4uc2V0dGluZ3Muc2l0ZXMucHVzaChzaXRlKTtcbiAgICAgICAgICAgICAgdGFiLnBsdWdpbi5zZXR0aW5ncy5hY3RpdmVTaXRlSWQgPSBzaXRlLmlkO1xuICAgICAgICAgICAgICB0YWIucGx1Z2luLnNldHRpbmdzLmVuYWJsZVB1Ymxpc2ggPSB0cnVlO1xuICAgICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXG4gICAgICAgICAgICAgIHRhYi5wZW5kaW5nTmFtZSA9IHNpdGVOYW1lO1xuICAgICAgICAgICAgICB0YWIucGVuZGluZ1Njb3BlID0gc2NvcGU7XG4gICAgICAgICAgICAgIHRhYi5wZW5kaW5nUGF0aHMgPSBwYXRocztcbiAgICAgICAgICAgICAgdGFiLnBlbmRpbmdQcm92aWRlciA9IHNlbGVjdGVkUHJvdmlkZXI7XG4gICAgICAgICAgICAgIHRhYi53aXphcmRTdGVwID0gJ2JhY2t1cCc7XG4gICAgICAgICAgICAgIHRhYi5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgICAgICAgICBzaG93RXJyb3IoZXJyb3JFbCwgKGVyciBhcyBFcnJvcikubWVzc2FnZSk7XG4gICAgICAgICAgICAgIGlkbGUoYnRuLCAnQ29udGludWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xufVxuIiwgIlxuaW1wb3J0IHsgR2l0SHViQXBpIH0gZnJvbSAnLi4vLi4vLi4vYXBpL2dpdGh1YkFwaSc7XG5pbXBvcnQgeyBDbG91ZGZsYXJlQXBpIH0gZnJvbSAnLi4vLi4vLi4vYXBpL2Nsb3VkZmxhcmVBcGknO1xuaW1wb3J0IHsgY3JlYXRlU2l0ZVByb2ZpbGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NldHRpbmdzJztcbmltcG9ydCB7IFNpdGVQcm9maWxlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS90eXBlcyc7XG5pbXBvcnQgdHlwZSBOb3RlRmxhcmVQbHVnaW4gZnJvbSAnLi4vLi4vLi4vLi4vbWFpbic7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQ2xvdWRmbGFyZVRva2VuVXJsKCk6IHN0cmluZyB7XG4gIGNvbnN0IHBlcm1zID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KFtcbiAgICB7IGtleTogJ3BhZ2UnLCB0eXBlOiAnZWRpdCcgfSxcbiAgICB7IGtleTogJ3dvcmtlcnNfc2NyaXB0cycsIHR5cGU6ICdlZGl0JyB9LFxuICAgIHsga2V5OiAnYWNjb3VudF9zZXR0aW5ncycsIHR5cGU6ICdyZWFkJyB9LFxuICBdKSk7XG4gIHJldHVybiBgaHR0cHM6Ly9kYXNoLmNsb3VkZmxhcmUuY29tL3Byb2ZpbGUvYXBpLXRva2Vucz9wZXJtaXNzaW9uR3JvdXBLZXlzPSR7cGVybXN9JmFjY291bnRJZD0qJnpvbmVJZD1hbGwmbmFtZT1Ob3RlRmxhcmVgO1xufVxuXG4vKiogTm9ybWFsaXNlIGEgc2l0ZSBuYW1lIGludG8gYSB2YWxpZCBHaXRIdWIgcmVwbyAvIFBhZ2VzIHByb2plY3Qgc2x1Zy4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzbHVnaWZ5KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmFsdWVcbiAgICAudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKClcbiAgICAucmVwbGFjZSgvW15hLXowLTktXSsvZywgJy0nKVxuICAgIC5yZXBsYWNlKC9eLSt8LSskL2csICcnKVxuICAgIC5zbGljZSgwLCA2MCk7XG59XG5cbi8qKiBUdXJucyBhIHJhdyBDbG91ZGZsYXJlIGVycm9yIGludG8gYW4gYWN0aW9uYWJsZSBzZXR1cCBtZXNzYWdlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsb3VkZmxhcmVTZXR1cEhpbnQocmF3TWVzc2FnZTogc3RyaW5nLCByZXBvU2x1Zzogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgbG93ZXIgPSByYXdNZXNzYWdlLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChsb3dlci5pbmNsdWRlcygncmVqZWN0ZWQgdGhpcyB0b2tlbicpIHx8IGxvd2VyLmluY2x1ZGVzKCdwZXJtaXNzaW9uJykgfHwgbG93ZXIuaW5jbHVkZXMoJ2F1dGhlbnRpY2F0aW9uJykpIHtcbiAgICByZXR1cm4gJ0Nsb3VkZmxhcmUgcmVqZWN0ZWQgdGhpcyB0b2tlbi4gTWFrZSBzdXJlIGl0IGhhcyB0aGUgQ2xvdWRmbGFyZSBQYWdlczogRWRpdCBwZXJtaXNzaW9uLCB0aGVuIHRyeSBhZ2Fpbi4nO1xuICB9XG4gIHJldHVybiBgQ291bGRuJ3QgY3JlYXRlIHRoZSBQYWdlcyBwcm9qZWN0LiBNb3N0IGxpa2VseSB0aGUgQ2xvdWRmbGFyZSBHaXRIdWIgQXBwIGlzbid0IGF1dGhvcml6ZWQgZm9yICR7cmVwb1NsdWd9IHlldCBcdTIwMTQgdXNlIFx1MjAxQ0F1dGhvcml6ZSBDbG91ZGZsYXJlIG9uIEdpdEh1Ylx1MjAxRCwgZ3JhbnQgYWNjZXNzIHRvIHRoYXQgcmVwbywgdGhlbiB0cnkgYWdhaW4uIChDbG91ZGZsYXJlIHNhaWQ6ICR7cmF3TWVzc2FnZX0pYDtcbn1cblxuXG4vKipcbiAqIEVuZC10by1lbmQgc2l0ZSBjcmVhdGlvbiwgc2hhcmVkIGJ5IHRoZSBmaXJzdC1ydW4gd2l6YXJkIGFuZCB0aGUgXCJBZGQgc2l0ZVwiXG4gKiBtb2RhbDogY3JlYXRlIGEgZnJlc2ggR2l0SHViIHJlcG8sIHRoZW4gYSBDbG91ZGZsYXJlIFBhZ2VzIHByb2plY3QgcG9pbnRlZCBhdFxuICogaXQuIFRoZSBmaXJzdCBwdWJsaXNoIGNvbW1pdHMgdGhlIHVzZXIncyBjb250ZW50IHBsdXMgYSBtZGdhcmRlblxuICogcGFja2FnZS5qc29uL2NvbmZpZywgd2hpY2ggQ2xvdWRmbGFyZSBidWlsZHMgd2l0aCBgbnB4IG1kZ2FyZGVuIGJ1aWxkYC4gUmV1c2VzXG4gKiB0aGUgc2hhcmVkIEdpdEh1Yi9DbG91ZGZsYXJlIGNyZWRlbnRpYWxzIGFscmVhZHkgb24gdGhlIHBsdWdpbiBzZXR0aW5ncy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByb3Zpc2lvblNpdGUoXG4gIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luLFxuICBuYW1lOiBzdHJpbmcsXG4gIHByb2ZpbGVQYXJhbXM6IFBhcnRpYWw8U2l0ZVByb2ZpbGU+LFxuICBob3N0aW5nUHJvdmlkZXI6IFNpdGVQcm9maWxlWydob3N0aW5nUHJvdmlkZXInXSA9ICdnaXRodWItcGFnZXMnLFxuKTogUHJvbWlzZTxTaXRlUHJvZmlsZT4ge1xuICBjb25zdCBzbHVnID0gc2x1Z2lmeShuYW1lKTtcbiAgaWYgKCFzbHVnKSB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBlbnRlciBhIHNpdGUgbmFtZS4nKTtcblxuICBjb25zdCBvd25lciA9IHBsdWdpbi5zZXR0aW5ncy5naXRodWJPd25lcjtcbiAgY29uc3QgcmVwbyA9IHBsdWdpbi5zZXR0aW5ncy5tYXN0ZXJSZXBvc2l0b3J5O1xuICBpZiAoIXJlcG8pIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGNvbmZpZ3VyZSBhIE1hc3RlciBSZXBvc2l0b3J5IGluIHNldHRpbmdzIGZpcnN0LicpO1xuXG4gIGNvbnN0IHNpdGUgPSBjcmVhdGVTaXRlUHJvZmlsZSh7XG4gICAgbmFtZSxcbiAgICBob3N0aW5nUHJvdmlkZXIsXG4gICAgLi4ucHJvZmlsZVBhcmFtcyxcbiAgfSk7XG5cbiAgY29uc3QgZ2ggPSBuZXcgR2l0SHViQXBpKHBsdWdpbi5zZXR0aW5ncy5naXRodWJUb2tlbiwgb3duZXIsIHJlcG8pO1xuICBhd2FpdCBnaC5jcmVhdGVSZXBvKCk7XG4gIGlmICghKGF3YWl0IGdoLndhaXRGb3JSZXBvKDMwMDAwKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcG9zaXRvcnkgY3JlYXRpb24gdGltZWQgb3V0IFx1MjAxNCBwbGVhc2UgdHJ5IGFnYWluLicpO1xuICB9XG5cbiAgaWYgKGhvc3RpbmdQcm92aWRlciA9PT0gJ2dpdGh1Yi1wYWdlcycpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZ2guZW5hYmxlR2l0SHViUGFnZXMoKTtcbiAgICB9IGNhdGNoIChlOiB1bmtub3duKSB7XG4gICAgICAvLyBEb24ndCBmYWlsIHNldHVwLCBqdXN0IGxldCB0aGVtIGtub3cgdGhleSBtaWdodCBuZWVkIHRvIGRvIGl0IG1hbnVhbGx5XG4gICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBhdXRvLWVuYWJsZSBHaXRIdWIgUGFnZXM6JywgZSk7XG4gICAgfVxuICB9XG5cbiAgbGV0IGJyYW5jaCA9ICdtYWluJztcbiAgdHJ5IHtcbiAgICBicmFuY2ggPSBhd2FpdCBnaC5nZXREZWZhdWx0QnJhbmNoKCk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIEtlZXAgdGhlIGJyYW5jaC5cbiAgfVxuICBzaXRlLmdpdGh1YkJyYW5jaCA9IGJyYW5jaDtcbiAgc2l0ZS5naXRodWJSZXBvID0gcmVwbztcblxuICBsZXQgc2l0ZVVybCA9ICcnO1xuXG4gIGlmIChob3N0aW5nUHJvdmlkZXIgPT09ICdnaXRodWItcGFnZXMnKSB7XG4gICAgLy8gR2l0SHViIFBhZ2VzIFVSTCBpcyBkZXRlcm1pbmlzdGljIFx1MjAxNCBubyBBUEkgY2FsbCBuZWVkZWQuXG4gICAgc2l0ZVVybCA9IGAke293bmVyfS5naXRodWIuaW8vJHtyZXBvfWA7XG4gICAgLy8gY2xvdWRmbGFyZVByb2plY3QgaW50ZW50aW9uYWxseSBsZWZ0IGJsYW5rIGZvciBHaXRIdWIgUGFnZXMgc2l0ZXMuXG4gIH0gZWxzZSB7XG4gICAgLy8gQ2xvdWRmbGFyZSBQYWdlczogY3JlYXRlIChvciByZWNvdmVyKSBhIFBhZ2VzIHByb2plY3QuXG4gICAgY29uc3QgY2YgPSBuZXcgQ2xvdWRmbGFyZUFwaShwbHVnaW4uc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuLCBwbHVnaW4uc2V0dGluZ3MuY2xvdWRmbGFyZUFjY291bnQpO1xuICAgIGNvbnN0IHJvb3REaXIgPSBgc2l0ZXMvJHtzaXRlLmlkfWA7XG4gICAgLy8gTWFrZSBwcm9qZWN0IG5hbWUgdW5pcXVlIHNpbmNlIG11bHRpcGxlIHNpdGVzIHNoYXJlIHRoZSBzYW1lIHJlcG9cbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHNsdWdpZnkoYCR7cmVwb30tJHtzbHVnfWApO1xuICAgIHRyeSB7XG4gICAgICBzaXRlVXJsID0gYXdhaXQgY2YuY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSwgb3duZXIsIHJlcG8sIGJyYW5jaCwgcm9vdERpcik7XG4gICAgICBzaXRlLmNsb3VkZmxhcmVQcm9qZWN0ID0gcHJvamVjdE5hbWU7XG4gICAgfSBjYXRjaCAoY3JlYXRlRXJyOiB1bmtub3duKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzaXRlVXJsID0gYXdhaXQgY2YuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgIHNpdGUuY2xvdWRmbGFyZVByb2plY3QgPSBwcm9qZWN0TmFtZTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoY2xvdWRmbGFyZVNldHVwSGludCgoY3JlYXRlRXJyIGFzIEVycm9yKS5tZXNzYWdlLCBgJHtvd25lcn0vJHtyZXBvfWApKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzaXRlLnNpdGVVcmwgPSBzaXRlVXJsO1xuICByZXR1cm4gc2l0ZTtcbn1cbiIsICJpbXBvcnQgeyBBcHAsIEZ1enp5U3VnZ2VzdE1vZGFsLCBUQWJzdHJhY3RGaWxlLCBURmlsZSwgVEZvbGRlciB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGNsYXNzIFBhdGhTdWdnZXN0TW9kYWwgZXh0ZW5kcyBGdXp6eVN1Z2dlc3RNb2RhbDxUQWJzdHJhY3RGaWxlPiB7XG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwcml2YXRlIG9uQ2hvb3NlOiAocGF0aDogc3RyaW5nKSA9PiB2b2lkKSB7XG4gICAgc3VwZXIoYXBwKTtcbiAgICB0aGlzLnNldFBsYWNlaG9sZGVyKCdTZWFyY2ggZm9yIGEgZmlsZSBvciBmb2xkZXIuLi4nKTtcbiAgfVxuICBcbiAgZ2V0SXRlbXMoKTogVEFic3RyYWN0RmlsZVtdIHtcbiAgICByZXR1cm4gdGhpcy5hcHAudmF1bHQuZ2V0QWxsTG9hZGVkRmlsZXMoKS5maWx0ZXIoZiA9PiBcbiAgICAgIGYucGF0aCAhPT0gJy8nICYmIFxuICAgICAgIWYucGF0aC5zdGFydHNXaXRoKCcuJykgJiZcbiAgICAgICFmLnBhdGguaW5jbHVkZXMoJy8uJykgJiZcbiAgICAgIChmIGluc3RhbmNlb2YgVEZvbGRlciB8fCAoZiBpbnN0YW5jZW9mIFRGaWxlICYmIGYuZXh0ZW5zaW9uID09PSAnbWQnKSlcbiAgICApO1xuICB9XG4gIFxuICBnZXRJdGVtVGV4dChpdGVtOiBUQWJzdHJhY3RGaWxlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbS5wYXRoO1xuICB9XG4gIFxuICBvbkNob29zZUl0ZW0oaXRlbTogVEFic3RyYWN0RmlsZSwgX2V2dDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hvb3NlKGl0ZW0ucGF0aCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgeyBOb3RlRmxhcmVTZXR0aW5nc1RhYiB9IGZyb20gJy4uL3NldHRpbmdzVGFiJztcbmltcG9ydCB7IGNyZWF0ZUVycm9yRWwsIGhpZGVFcnJvciB9IGZyb20gJy4uL3NldHRpbmdzSGVscGVycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTdGVwQmFja3VwKHRhYjogTm90ZUZsYXJlU2V0dGluZ3NUYWIsIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGhlYWRpbmcgPSBuZXcgU2V0dGluZyhlbCk7XG4gICAgaGVhZGluZy5zZXROYW1lKCdBdXRvbWF0aWMgYmFja3VwIChvcHRpb25hbCknKTtcbiAgICBoZWFkaW5nLnNldEhlYWRpbmcoKTtcblxuICAgIGVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyxcbiAgICAgIHRleHQ6ICdOb3RlRmxhcmUgY2FuIHNpbGVudGx5IG1pcnJvciB5b3VyIGVudGlyZSB2YXVsdCB0byBhIHByaXZhdGUgR2l0SHViIHJlcG9zaXRvcnkuIE5vIG1hbnVhbCBzdGVwcyBcdTIwMTQgaXQgcnVucyBpbiB0aGUgYmFja2dyb3VuZC4nLFxuICAgIH0pO1xuXG4gICAgbGV0IGVuYWJsZUJhY2t1cCA9IHRhYi5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQmFja3VwO1xuICAgIGxldCByZXBvVmlzaWJpbGl0eSA9IHRhYi5wbHVnaW4uc2V0dGluZ3MuYmFja3VwLnJlcG9WaXNpYmlsaXR5ID8/ICdwcml2YXRlJztcblxuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLnNldE5hbWUoJ0VuYWJsZSBhdXRvbWF0aWMgYmFja3VwJylcbiAgICAgIC5zZXREZXNjKCdSdW4gYSBiYWNrdXAgYWZ0ZXIgdmF1bHQgY2hhbmdlcyBhbmQvb3Igb24gYSBzY2hlZHVsZS4nKVxuICAgICAgLmFkZFRvZ2dsZSgodCkgPT4ge1xuICAgICAgICB0LnNldFZhbHVlKGVuYWJsZUJhY2t1cCk7XG4gICAgICAgIHQub25DaGFuZ2UoKHYpID0+IHtcbiAgICAgICAgICBlbmFibGVCYWNrdXAgPSB2O1xuICAgICAgICAgIHZpc2liaWxpdHlTZWN0aW9uLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6IHYgPyAnYmxvY2snIDogJ25vbmUnIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgdmlzaWJpbGl0eVNlY3Rpb24gPSBlbC5jcmVhdGVEaXYoKTtcbiAgICB2aXNpYmlsaXR5U2VjdGlvbi5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiBlbmFibGVCYWNrdXAgPyAnYmxvY2snIDogJ25vbmUnIH0pO1xuXG4gICAgbmV3IFNldHRpbmcodmlzaWJpbGl0eVNlY3Rpb24pXG4gICAgICAuc2V0TmFtZSgnQmFja3VwIHJlcG9zaXRvcnkgdmlzaWJpbGl0eScpXG4gICAgICAuc2V0RGVzYygnUHJpdmF0ZSBrZWVwcyB5b3VyIG5vdGVzIGNvbmZpZGVudGlhbC4gUHVibGljIG1ha2VzIHRoZSByZXBvIHZpc2libGUgb24gR2l0SHViIChub3QgcmVjb21tZW5kZWQgZm9yIHBlcnNvbmFsIG5vdGVzKS4nKVxuICAgICAgLmFkZERyb3Bkb3duKChkKSA9PiB7XG4gICAgICAgIGQuYWRkT3B0aW9uKCdwcml2YXRlJywgJ1x1RDgzRFx1REQxMiBQcml2YXRlIChyZWNvbW1lbmRlZCknKTtcbiAgICAgICAgZC5hZGRPcHRpb24oJ3B1YmxpYycsICdcdUQ4M0NcdURGMTAgUHVibGljJyk7XG4gICAgICAgIGQuc2V0VmFsdWUocmVwb1Zpc2liaWxpdHkpO1xuICAgICAgICBkLm9uQ2hhbmdlKCh2KSA9PiB7IHJlcG9WaXNpYmlsaXR5ID0gdiBhcyAncHJpdmF0ZScgfCAncHVibGljJzsgfSk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGVycm9yRWwgPSBjcmVhdGVFcnJvckVsKGVsKTtcblxuICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgLmFkZEJ1dHRvbigoYmFjaykgPT4ge1xuICAgICAgICBiYWNrLnNldEJ1dHRvblRleHQoJ0JhY2snKTtcbiAgICAgICAgYmFjay5vbkNsaWNrKCgpID0+IHsgdGFiLndpemFyZFN0ZXAgPSAnaG9zdGluZyc7IHRhYi5yZW5kZXIoKTsgfSk7XG4gICAgICB9KVxuICAgICAgLmFkZEJ1dHRvbigoYnRuKSA9PiB7XG4gICAgICAgIGJ0bi5zZXRCdXR0b25UZXh0KCdGaW5pc2ggc2V0dXAnKS5zZXRDdGEoKTtcbiAgICAgICAgYnRuLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGhpZGVFcnJvcihlcnJvckVsKTtcbiAgICAgICAgICAgIHRhYi5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQmFja3VwID0gZW5hYmxlQmFja3VwO1xuICAgICAgICAgICAgdGFiLnBsdWdpbi5zZXR0aW5ncy5iYWNrdXAucmVwb1Zpc2liaWxpdHkgPSByZXBvVmlzaWJpbGl0eTtcbiAgICAgICAgICAgIGlmIChlbmFibGVCYWNrdXAgJiYgIXRhYi5wbHVnaW4uc2V0dGluZ3MuYmFja3VwLnJlcG9zaXRvcnkpIHtcbiAgICAgICAgICAgICAgLy8gVXNlIHRoZSB2YXVsdC1kZXJpdmVkIGJhY2t1cCByZXBvIG5hbWUgXHUyMDE0IE5PVCB0aGUgcHVibGlzaCBtYXN0ZXIgcmVwby5cbiAgICAgICAgICAgICAgdGFiLnBsdWdpbi5zZXR0aW5ncy5iYWNrdXAucmVwb3NpdG9yeSA9IHRhYi5wbHVnaW4uZGVmYXVsdEJhY2t1cFJlcG9zaXRvcnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhYi5wbHVnaW4uc2V0dGluZ3Muc2V0dXBDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGFiLndpemFyZFN0ZXAgPSAnZG9uZSc7XG4gICAgICAgICAgICB0YWIucmVuZGVyKCk7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbn1cbiIsICJpbXBvcnQgeyBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgeyBOb3RlRmxhcmVTZXR0aW5nc1RhYiB9IGZyb20gJy4uL3NldHRpbmdzVGFiJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclN0ZXBEb25lKHRhYjogTm90ZUZsYXJlU2V0dGluZ3NUYWIsIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHNpdGUgPSB0YWIucGx1Z2luLmdldEFjdGl2ZVNpdGUoKTtcblxuICAgIGNvbnN0IGhlYWRpbmcgPSBuZXcgU2V0dGluZyhlbCk7XG4gICAgaGVhZGluZy5zZXROYW1lKCdZb3VcXCdyZSBhbGwgc2V0ISBcdUQ4M0NcdURGODknKTtcbiAgICBoZWFkaW5nLnNldEhlYWRpbmcoKTtcblxuICAgIGNvbnN0IGRvbmVNc2cgPSBuZXcgU2V0dGluZyhlbCkuc2V0TmFtZShcbiAgICAgIHNpdGUgPyAnWW91ciBzaXRlIGlzIHJlYWR5IHRvIHB1Ymxpc2gnIDogJ0F1dG9tYXRpYyBiYWNrdXAgaXMgcmVhZHknLFxuICAgICk7XG4gICAgaWYgKHNpdGU/LnNpdGVVcmwpIHtcbiAgICAgIGRvbmVNc2cuZGVzY0VsLmFwcGVuZFRleHQoJ1lvdXIgc2l0ZSB3aWxsIGJlIGxpdmUgYXQ6ICcpO1xuICAgICAgZG9uZU1zZy5kZXNjRWwuY3JlYXRlRWwoJ2EnLCB7XG4gICAgICAgIHRleHQ6IGBodHRwczovLyR7c2l0ZS5zaXRlVXJsfWAsXG4gICAgICAgIGhyZWY6IGBodHRwczovLyR7c2l0ZS5zaXRlVXJsfWAsXG4gICAgICAgIGF0dHI6IHsgdGFyZ2V0OiAnX2JsYW5rJywgcmVsOiAnbm9vcGVuZXInIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9uZU1zZy5zZXREZXNjKCdOb3RlRmxhcmUgd2lsbCBwcm90ZWN0IHlvdXIgdmF1bHQgcXVpZXRseSB1c2luZyB5b3VyIGNob3NlbiBzY2hlZHVsZS4nKTtcbiAgICB9XG5cbiAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5hZGRCdXR0b24oKGxhdGVyKSA9PiB7XG4gICAgICAgIGxhdGVyLnNldEJ1dHRvblRleHQoc2l0ZSA/IFwiSSdsbCBwdWJsaXNoIGxhdGVyXCIgOiAnT3BlbiBjb25maWd1cmF0aW9uJyk7XG4gICAgICAgIGxhdGVyLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRhYi5oYXNJbml0aWFsaXplZFdpemFyZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHNpdGUpIHRhYi5jbG9zZVNldHRpbmdzKCk7XG4gICAgICAgICAgICBlbHNlIHRhYi5yZW5kZXIoKTtcbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuYWRkQnV0dG9uKChidG4pID0+IHtcbiAgICAgICAgYnRuLnNldEJ1dHRvblRleHQoc2l0ZSA/ICdQdWJsaXNoIG5vdycgOiAnQmFjayB1cCBub3cnKS5zZXRDdGEoKTtcbiAgICAgICAgYnRuLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRhYi5oYXNJbml0aWFsaXplZFdpemFyZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGFiLmNsb3NlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIGlmIChzaXRlKSBhd2FpdCB0YWIucGx1Z2luLmRvUHVibGlzaCgpO1xuICAgICAgICAgICAgZWxzZSBhd2FpdCB0YWIucGx1Z2luLmRvQmFja3VwKGZhbHNlKTtcbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xufVxuIiwgImltcG9ydCB0eXBlIHsgTm90ZUZsYXJlU2V0dGluZ3NUYWIgfSBmcm9tICcuLi9zZXR0aW5nc1RhYic7XG5pbXBvcnQgeyByZW5kZXJTdGVwR2l0SHViIH0gZnJvbSAnLi9zdGVwR2l0SHViJztcbmltcG9ydCB7IHJlbmRlclN0ZXBIb3N0aW5nIH0gZnJvbSAnLi9zdGVwSG9zdGluZyc7XG5pbXBvcnQgeyByZW5kZXJTdGVwQmFja3VwIH0gZnJvbSAnLi9zdGVwQmFja3VwJztcbmltcG9ydCB7IHJlbmRlclN0ZXBEb25lIH0gZnJvbSAnLi9zdGVwRG9uZSc7XG5pbXBvcnQgeyBTZXR1cFN0ZXAgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcldpemFyZCh0YWI6IE5vdGVGbGFyZVNldHRpbmdzVGFiLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgcmVuZGVyV2l6YXJkU3RlcHModGFiLCBlbCk7XG4gIGlmICh0YWIud2l6YXJkU3RlcCA9PT0gJ2dpdGh1YicpIHJlbmRlclN0ZXBHaXRIdWIodGFiLCBlbCk7XG4gIGVsc2UgaWYgKHRhYi53aXphcmRTdGVwID09PSAnaG9zdGluZycpIHJlbmRlclN0ZXBIb3N0aW5nKHRhYiwgZWwpO1xuICBlbHNlIGlmICh0YWIud2l6YXJkU3RlcCA9PT0gJ2JhY2t1cCcpIHJlbmRlclN0ZXBCYWNrdXAodGFiLCBlbCk7XG4gIGVsc2UgcmVuZGVyU3RlcERvbmUodGFiLCBlbCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcldpemFyZFN0ZXBzKHRhYjogTm90ZUZsYXJlU2V0dGluZ3NUYWIsIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IHN0ZXBzOiBBcnJheTx7IGtleTogU2V0dXBTdGVwOyBsYWJlbDogc3RyaW5nIH0+ID0gW1xuICAgICAgeyBrZXk6ICdnaXRodWInLCBsYWJlbDogJ0dpdEh1YicgfSxcbiAgICAgIHsga2V5OiAnaG9zdGluZycsIGxhYmVsOiAnSG9zdGluZycgfSxcbiAgICAgIHsga2V5OiAnYmFja3VwJywgbGFiZWw6ICdCYWNrdXAnIH0sXG4gICAgICB7IGtleTogJ2RvbmUnLCBsYWJlbDogJ0RvbmUnIH0sXG4gICAgXTtcbiAgICBjb25zdCBvcmRlciA9IHN0ZXBzLm1hcCgocykgPT4gcy5rZXkpO1xuICAgIGNvbnN0IGN1cnJlbnRJZHggPSBvcmRlci5pbmRleE9mKHRhYi53aXphcmRTdGVwKTtcblxuICAgIGNvbnN0IHdyYXBwZXIgPSBlbC5jcmVhdGVEaXYoJ25mLXdpemFyZC1zdGVwcycpO1xuICAgIHN0ZXBzLmZvckVhY2goKHsgbGFiZWwgfSwgaSkgPT4ge1xuICAgICAgY29uc3QgZG90ID0gd3JhcHBlci5jcmVhdGVEaXYoJ25mLXN0ZXAtZG90Jyk7XG4gICAgICBpZiAoaSA8IGN1cnJlbnRJZHgpIGRvdC5hZGRDbGFzcygnY29tcGxldGVkJyk7XG4gICAgICBlbHNlIGlmIChpID09PSBjdXJyZW50SWR4KSBkb3QuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgY29uc3QgbGFiZWxFbCA9IGRvdC5jcmVhdGVTcGFuKCduZi1zdGVwLWxhYmVsJyk7XG4gICAgICBsYWJlbEVsLnNldFRleHQobGFiZWwpO1xuICAgIH0pO1xufVxuIiwgImltcG9ydCB7IFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgdHlwZSB7IE5vdGVGbGFyZVNldHRpbmdzVGFiIH0gZnJvbSAnLi4vc2V0dGluZ3NUYWInO1xuaW1wb3J0IHsgYnVpbGRDbG91ZGZsYXJlVG9rZW5VcmwgfSBmcm9tICcuLi9tb2RhbHMvaGVscGVycyc7XG5pbXBvcnQgeyBDbG91ZGZsYXJlQXBpIH0gZnJvbSAnLi4vLi4vLi4vYXBpL2Nsb3VkZmxhcmVBcGknO1xuaW1wb3J0IHsgY3JlYXRlRXJyb3JFbCwgc2hvd0Vycm9yLCBoaWRlRXJyb3IsIGJ1c3ksIGlkbGUgfSBmcm9tICcuLi9zZXR0aW5nc0hlbHBlcnMnO1xuaW1wb3J0IHsgcmVuZGVyUmVzdG9yZUZyb21SZWdpc3RyeSB9IGZyb20gJy4vcmVzdG9yZVNlY3Rpb24nO1xuXG5jb25zdCBDTE9VREZMQVJFX0FQUF9VUkwgPSAnaHR0cHM6Ly9naXRodWIuY29tL2FwcHMvY2xvdWRmbGFyZS13b3JrZXJzLWFuZC1wYWdlcy9pbnN0YWxsYXRpb25zL25ldyc7XG5jb25zdCBDTE9VREZMQVJFX1RPS0VOX1VSTCA9IGJ1aWxkQ2xvdWRmbGFyZVRva2VuVXJsKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJDb25uZWN0aW9uc1NlY3Rpb24odGFiOiBOb3RlRmxhcmVTZXR0aW5nc1RhYiwgZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgcyA9IHRhYi5wbHVnaW4uc2V0dGluZ3M7XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgU2VjdGlvbiAxOiBDb25uZWN0aW9ucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICBjb25zdCBjb25uSGVhZGluZyA9IG5ldyBTZXR0aW5nKGVsKTtcbiAgICBjb25uSGVhZGluZy5zZXROYW1lKCdDb25uZWN0aW9ucycpO1xuICAgIGNvbm5IZWFkaW5nLnNldEhlYWRpbmcoKTtcblxuICAgIC8vIEdpdEh1YiByb3dcbiAgICBjb25zdCBnaFNldHRpbmcgPSBuZXcgU2V0dGluZyhlbCkuc2V0TmFtZSgnR2l0SHViJyk7XG4gICAgaWYgKHMuZ2l0aHViVG9rZW4gJiYgcy5naXRodWJPd25lcikge1xuICAgICAgZ2hTZXR0aW5nLnNldERlc2MoYENvbm5lY3RlZCBhcyBAJHtzLmdpdGh1Yk93bmVyfWApO1xuICAgICAgZ2hTZXR0aW5nLmFkZEJ1dHRvbigoYikgPT4ge1xuICAgICAgICBiLnNldEJ1dHRvblRleHQoJ0Rpc2Nvbm5lY3QnKTtcbiAgICAgICAgYi5idXR0b25FbC5hZGRDbGFzcygnbW9kLXdhcm5pbmcnKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBzLmdpdGh1YlRva2VuID0gJyc7XG4gICAgICAgICAgICBzLmdpdGh1Yk93bmVyID0gJyc7XG4gICAgICAgICAgICBzLnNldHVwQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGF3YWl0IHRhYi5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB0YWIuaGFzSW5pdGlhbGl6ZWRXaXphcmQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRhYi53aXphcmRTdGVwID0gJ2dpdGh1Yic7XG4gICAgICAgICAgICB0YWIucmVuZGVyKCk7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2hTZXR0aW5nLnNldERlc2MoJ05vdCBjb25uZWN0ZWQnKTtcbiAgICAgIGdoU2V0dGluZy5hZGRCdXR0b24oKGIpID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdDb25uZWN0Jykuc2V0Q3RhKCk7XG4gICAgICAgIGIub25DbGljaygoKSA9PiB7IHRhYi5oYXNJbml0aWFsaXplZFdpemFyZCA9IGZhbHNlOyB0YWIud2l6YXJkU3RlcCA9ICdnaXRodWInOyB0YWIucmVuZGVyKCk7IH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQ2xvdWRmbGFyZSByb3dcbiAgICBjb25zdCBjZlNldHRpbmcgPSBuZXcgU2V0dGluZyhlbCkuc2V0TmFtZSgnQ2xvdWRmbGFyZScpO1xuICAgIGlmIChzLmNsb3VkZmxhcmVUb2tlbikge1xuICAgICAgY29uc3QgYWNjb3VudEhpbnQgPSBzLmNsb3VkZmxhcmVBY2NvdW50XG4gICAgICAgID8gYEFjY291bnQ6ICR7cy5jbG91ZGZsYXJlQWNjb3VudC5zbGljZSgwLCA4KX1cdTIwMjZgXG4gICAgICAgIDogJ0Nvbm5lY3RlZCc7XG4gICAgICBjZlNldHRpbmcuc2V0RGVzYyhhY2NvdW50SGludCk7XG4gICAgICAvLyBSZWNvbm5lY3QgaXMgbmVlZGVkIHdoZW4gdGhlIENsb3VkZmxhcmUgXHUyMTk0IEdpdEh1YiBBcHAgYXV0aG9yaXphdGlvblxuICAgICAgLy8gaXMgcmV2b2tlZCAoZS5nLiBhZnRlciBkZWxldGluZyBhbmQgcmVjcmVhdGluZyB0aGUgcmVwbykuXG4gICAgICBjZlNldHRpbmcuYWRkQnV0dG9uKChiKSA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnUmVjb25uZWN0IHRvIEdpdEh1YicpO1xuICAgICAgICBiLnNldFRvb2x0aXAoJ09wZW4gQ2xvdWRmbGFyZSBcdTIxOTQgR2l0SHViIEFwcCBhdXRob3JpemF0aW9uIGlmIHlvdXIgYnVpbGRzIGFyZSBkaXNjb25uZWN0ZWQnKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHsgd2luZG93Lm9wZW4oQ0xPVURGTEFSRV9BUFBfVVJMLCAnX2JsYW5rJyk7IH0pO1xuICAgICAgfSk7XG4gICAgICBjZlNldHRpbmcuYWRkQnV0dG9uKChiKSA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnRGlzY29ubmVjdCcpO1xuICAgICAgICBiLmJ1dHRvbkVsLmFkZENsYXNzKCdtb2Qtd2FybmluZycpO1xuICAgICAgICBiLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHMuY2xvdWRmbGFyZVRva2VuID0gJyc7XG4gICAgICAgICAgICBzLmNsb3VkZmxhcmVBY2NvdW50ID0gJyc7XG4gICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGFiLnJlbmRlcigpO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNmU2V0dGluZy5zZXREZXNjKCdOb3QgY29ubmVjdGVkIFx1MjAxNCByZXF1aXJlZCBmb3IgQ2xvdWRmbGFyZSBQYWdlcyBob3N0aW5nJyk7XG4gICAgICBjZlNldHRpbmcuYWRkQnV0dG9uKChiKSA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnQ29ubmVjdCcpO1xuICAgICAgICBiLm9uQ2xpY2soKCkgPT4geyB0YWIub3BlbkNsb3VkZmxhcmVDb25uZWN0RmxvdygpOyB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFJlc3RvcmUgZnJvbSB2YXVsdCByZWdpc3RyeSAoc2hvd24gb25seSB3aGVuIHNpdGVzIGV4aXN0IGluIHJlZ2lzdHJ5IGJ1dCBub3QgaW4gc2V0dGluZ3MpXG4gICAgdm9pZCByZW5kZXJSZXN0b3JlRnJvbVJlZ2lzdHJ5KHRhYiwgZWwpO1xuXG4gICAgLy8gUmVzZXQgaXMgaW4gdGhlIHBlcnNpc3RlbnQgZm9vdGVyIGJlbG93IFx1MjAxNCByZW1vdmVkIGZyb20gaGVyZSB0byBhdm9pZCBkdXBsaWNhdGlvbi5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5DbG91ZGZsYXJlQ29ubmVjdEZsb3codGFiOiBOb3RlRmxhcmVTZXR0aW5nc1RhYiwgY29udGFpbmVyRWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgcyA9IHRhYi5wbHVnaW4uc2V0dGluZ3M7XG5cbiAgICBjb25zdCBoZWFkaW5nID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpO1xuICAgIGhlYWRpbmcuc2V0TmFtZSgnQ29ubmVjdCBDbG91ZGZsYXJlJyk7XG4gICAgaGVhZGluZy5zZXRIZWFkaW5nKCk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicsXG4gICAgICB0ZXh0OiAnVHdvIHF1aWNrIG9uZS10aW1lIHN0ZXBzIGluIHlvdXIgYnJvd3NlcjonLFxuICAgIH0pO1xuXG4gICAgY29uc3QgY2ZTZWN0aW9uID0gY29udGFpbmVyRWwuY3JlYXRlRGl2KCk7XG4gICAgY29uc3QgcmVwb1NsdWcgPSBgJHtzLmdpdGh1Yk93bmVyfS8ke3MubWFzdGVyUmVwb3NpdG9yeSB8fCAnbm90ZWZsYXJlLXNpdGVzJ31gO1xuXG4gICAgbmV3IFNldHRpbmcoY2ZTZWN0aW9uKVxuICAgICAgLnNldE5hbWUoJzEuIENyZWF0ZSBhIENsb3VkZmxhcmUgQVBJIHRva2VuJylcbiAgICAgIC5zZXREZXNjKCdDcmVhdGVzIGEgdG9rZW4gd2l0aCBQYWdlcywgV29ya2VycywgYW5kIEFjY291bnQgcGVybWlzc2lvbnMgcHJlLWZpbGxlZC4nKVxuICAgICAgLmFkZEJ1dHRvbigoYikgPT4ge1xuICAgICAgICBiLnNldEJ1dHRvblRleHQoJ0NyZWF0ZSBUb2tlbiBcdTIxOTcnKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHsgd2luZG93Lm9wZW4oQ0xPVURGTEFSRV9UT0tFTl9VUkwsICdfYmxhbmsnKTsgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNmU2VjdGlvbilcbiAgICAgIC5zZXROYW1lKCcyLiBBdXRob3JpemUgQ2xvdWRmbGFyZSBvbiBHaXRIdWInKVxuICAgICAgLnNldERlc2MoYEdyYW50IHRoZSBcIkNsb3VkZmxhcmUgV29ya2VycyBhbmQgUGFnZXNcIiBhcHAgYWNjZXNzIHRvOiAke3JlcG9TbHVnfWApXG4gICAgICAuYWRkQnV0dG9uKChiKSA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnQXV0aG9yaXplIFx1MjE5NycpO1xuICAgICAgICBiLm9uQ2xpY2soKCkgPT4geyB3aW5kb3cub3BlbihDTE9VREZMQVJFX0FQUF9VUkwsICdfYmxhbmsnKTsgfSk7XG4gICAgICB9KTtcblxuICAgIGxldCBjZlRva2VuID0gJyc7XG4gICAgbGV0IGNmQWNjb3VudCA9ICcnO1xuXG4gICAgbmV3IFNldHRpbmcoY2ZTZWN0aW9uKVxuICAgICAgLnNldE5hbWUoJ0Nsb3VkZmxhcmUgQVBJIHRva2VuJylcbiAgICAgIC5zZXREZXNjKCdTdG9yZWQgZW5jcnlwdGVkIGluIHlvdXIgT1Mga2V5Y2hhaW4uJylcbiAgICAgIC5hZGRUZXh0KCh0KSA9PiB7XG4gICAgICAgIHQuc2V0UGxhY2Vob2xkZXIoJ1Bhc3RlIEFQSSB0b2tlblx1MjAyNicpO1xuICAgICAgICB0LmlucHV0RWwudHlwZSA9ICdwYXNzd29yZCc7XG4gICAgICAgIHQub25DaGFuZ2UoKHYpID0+IHsgY2ZUb2tlbiA9IHYudHJpbSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY2ZTZWN0aW9uKVxuICAgICAgLnNldE5hbWUoJ0Nsb3VkZmxhcmUgYWNjb3VudCBJRCcpXG4gICAgICAuc2V0RGVzYygnT3B0aW9uYWwgXHUyMDE0IGRldGVjdGVkIGF1dG9tYXRpY2FsbHkgZnJvbSB5b3VyIHRva2VuLicpXG4gICAgICAuYWRkVGV4dCgodCkgPT4ge1xuICAgICAgICB0LnNldFBsYWNlaG9sZGVyKCdBdXRvLWRldGVjdGVkJyk7XG4gICAgICAgIHQub25DaGFuZ2UoKHYpID0+IHsgY2ZBY2NvdW50ID0gdi50cmltKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBlcnJvckVsID0gY3JlYXRlRXJyb3JFbChjb250YWluZXJFbCk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5hZGRCdXR0b24oKGJhY2spID0+IHtcbiAgICAgICAgYmFjay5zZXRCdXR0b25UZXh0KCdDYW5jZWwnKTtcbiAgICAgICAgYmFjay5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB0YWIuaXNDbG91ZGZsYXJlQ29ubmVjdEZsb3dPcGVuID0gZmFsc2U7XG4gICAgICAgICAgdGFiLnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuYWRkQnV0dG9uKChidG4pID0+IHtcbiAgICAgICAgYnRuLnNldEJ1dHRvblRleHQoJ1NhdmUgJiBjb25uZWN0Jykuc2V0Q3RhKCk7XG4gICAgICAgIGJ0bi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNmVG9rZW4pIHJldHVybiBzaG93RXJyb3IoZXJyb3JFbCwgJ1BsZWFzZSBwYXN0ZSB5b3VyIENsb3VkZmxhcmUgQVBJIHRva2VuLicpO1xuICAgICAgICAgICAgaGlkZUVycm9yKGVycm9yRWwpO1xuICAgICAgICAgICAgYnVzeShidG4sICdWZXJpZnlpbmdcdTIwMjYnKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGxldCBhY2NvdW50SWQgPSBjZkFjY291bnQ7XG4gICAgICAgICAgICAgIGlmICghYWNjb3VudElkKSB7XG4gICAgICAgICAgICAgICAgYnVzeShidG4sICdEZXRlY3RpbmcgYWNjb3VudFx1MjAyNicpO1xuICAgICAgICAgICAgICAgIGFjY291bnRJZCA9IGF3YWl0IG5ldyBDbG91ZGZsYXJlQXBpKGNmVG9rZW4sICcnKS5nZXRBY2NvdW50SWQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzLmNsb3VkZmxhcmVUb2tlbiA9IGNmVG9rZW47XG4gICAgICAgICAgICAgIHMuY2xvdWRmbGFyZUFjY291bnQgPSBhY2NvdW50SWQ7XG4gICAgICAgICAgICAgIGF3YWl0IHRhYi5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgIHRhYi5pc0Nsb3VkZmxhcmVDb25uZWN0Rmxvd09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGFiLnJlbmRlcigpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgICAgIHNob3dFcnJvcihlcnJvckVsLCAoZXJyIGFzIEVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgaWRsZShidG4sICdTYXZlICYgY29ubmVjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cbiIsICJpbXBvcnQgeyBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgeyBOb3RlRmxhcmVTZXR0aW5nc1RhYiB9IGZyb20gJy4uL3NldHRpbmdzVGFiJztcbmltcG9ydCB7IFZhdWx0UmVnaXN0cnkgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3ZhdWx0UmVnaXN0cnknO1xuaW1wb3J0IHsgUmVnaXN0cnlFbnRyeSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlRXJyb3JFbCwgc2hvd0Vycm9yIH0gZnJvbSAnLi4vc2V0dGluZ3NIZWxwZXJzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbmRlclJlc3RvcmVGcm9tUmVnaXN0cnkodGFiOiBOb3RlRmxhcmVTZXR0aW5nc1RhYiwgZWw6IEhUTUxFbGVtZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcyA9IHRhYi5wbHVnaW4uc2V0dGluZ3M7XG4gICAgY29uc3QgcmVnaXN0cnkgPSBhd2FpdCBWYXVsdFJlZ2lzdHJ5LmxvYWQodGFiLmFwcCk7XG4gICAgY29uc3QgZXhpc3RpbmdJZHMgPSBuZXcgU2V0PHN0cmluZz4ocy5zaXRlcy5tYXAoKHNpdGUpID0+IHNpdGUuaWQpKTtcbiAgICBjb25zdCBvcnBoYW5lZCA9IFZhdWx0UmVnaXN0cnkuYnVpbGRSZXN0b3JlZFByb2ZpbGVzKHJlZ2lzdHJ5LmVudHJpZXMsIGV4aXN0aW5nSWRzKTtcblxuICAgIGlmIChvcnBoYW5lZC5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGNvbnN0IHJlc3RvcmVTZWN0aW9uID0gZWwuY3JlYXRlRGl2KCduZi1yZXN0b3JlLXNlY3Rpb24nKTtcblxuICAgIGNvbnN0IHJlc3RvcmVIZWFkaW5nID0gbmV3IFNldHRpbmcocmVzdG9yZVNlY3Rpb24pO1xuICAgIHJlc3RvcmVIZWFkaW5nLnNldE5hbWUoJ1ByZXZpb3VzIHNpdGVzIGZvdW5kJyk7XG4gICAgcmVzdG9yZUhlYWRpbmcuc2V0SGVhZGluZygpO1xuXG4gICAgcmVzdG9yZVNlY3Rpb24uY3JlYXRlRWwoJ3AnLCB7XG4gICAgICBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nLFxuICAgICAgdGV4dDogYE5vdGVGbGFyZSBmb3VuZCAke29ycGhhbmVkLmxlbmd0aH0gc2l0ZSR7b3JwaGFuZWQubGVuZ3RoID09PSAxID8gJycgOiAncyd9IGZyb20gYSBwcmV2aW91cyBpbnN0YWxsYXRpb24gaW4geW91ciB2YXVsdCByZWdpc3RyeS4gUmVzdG9yZSB0aGVtIHRvIGNvbnRpbnVlIHVzaW5nIHlvdXIgZXhpc3RpbmcgR2l0SHViIHJlcG9zIGFuZCBDbG91ZGZsYXJlIHByb2plY3RzLmAsXG4gICAgfSk7XG5cbiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIG9ycGhhbmVkKSB7XG4gICAgICBjb25zdCBsYWJlbCA9XG4gICAgICAgIGAke2VudHJ5Lm5hbWUgfHwgZW50cnkubWFzdGVyUmVwb3NpdG9yeX0gXHUwMEI3ICR7ZW50cnkuaG9zdGluZ1Byb3ZpZGVyID09PSAnY2xvdWRmbGFyZScgPyAnQ2xvdWRmbGFyZSBQYWdlcycgOiAnR2l0SHViIFBhZ2VzJ31gICtcbiAgICAgICAgKGVudHJ5LnNpdGVVcmwgPyBgIFx1MDBCNyAke2VudHJ5LnNpdGVVcmx9YCA6ICcnKTtcbiAgICAgIHJlc3RvcmVTZWN0aW9uLmNyZWF0ZUVsKCdwJywgeyBjbHM6ICdzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb24nLCB0ZXh0OiBgXHUyMDIyICR7bGFiZWx9YCB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBlcnJvckVsID0gY3JlYXRlRXJyb3JFbChyZXN0b3JlU2VjdGlvbik7XG5cbiAgICBuZXcgU2V0dGluZyhyZXN0b3JlU2VjdGlvbikuYWRkQnV0dG9uKChiKSA9PiB7XG4gICAgICBiLnNldEJ1dHRvblRleHQoYFJlc3RvcmUgJHtvcnBoYW5lZC5sZW5ndGh9IHNpdGUke29ycGhhbmVkLmxlbmd0aCA9PT0gMSA/ICcnIDogJ3MnfWApLnNldEN0YSgpO1xuICAgICAgYi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGIuc2V0RGlzYWJsZWQodHJ1ZSkuc2V0QnV0dG9uVGV4dCgnUmVzdG9yaW5nXHUyMDI2Jyk7XG4gICAgICAgICAgZXJyb3JFbC5oaWRlKCk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2Ygb3JwaGFuZWQpIHtcbiAgICAgICAgICAgICAgcy5tYXN0ZXJSZXBvc2l0b3J5ID0gcy5tYXN0ZXJSZXBvc2l0b3J5IHx8IGVudHJ5Lm1hc3RlclJlcG9zaXRvcnk7XG4gICAgICAgICAgICAgIHMuZ2l0aHViT3duZXIgPSBzLmdpdGh1Yk93bmVyIHx8IGVudHJ5LmdpdGh1Yk93bmVyO1xuICAgICAgICAgICAgICBzLm1hc3RlclJlcG9zaXRvcnlQcml2YXRlID0gcy5tYXN0ZXJSZXBvc2l0b3J5UHJpdmF0ZSB8fCBlbnRyeS5tYXN0ZXJSZXBvc2l0b3J5UHJpdmF0ZSB8fCBmYWxzZTtcbiAgICAgICAgICAgICAgLy8gUmVidWlsZCBhIGxpZ2h0d2VpZ2h0IFNpdGVQcm9maWxlIGZyb20gdGhlIHJlZ2lzdHJ5IGVudHJ5LlxuICAgICAgICAgICAgICBjb25zdCB7IGNyZWF0ZVNpdGVQcm9maWxlOiBjcmVhdGUgfSA9IGF3YWl0IGltcG9ydCgnLi4vLi4vLi4vY29yZS9zZXR0aW5ncycpO1xuICAgICAgICAgICAgICBjb25zdCByZXN0b3JlZFNpdGUgPSBjcmVhdGUoe1xuICAgICAgICAgICAgICAgIGlkOiBlbnRyeS5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgICAgICAgIGdpdGh1YlJlcG86IGVudHJ5Lm1hc3RlclJlcG9zaXRvcnksXG4gICAgICAgICAgICAgICAgZ2l0aHViQnJhbmNoOiBlbnRyeS5naXRodWJCcmFuY2gsXG4gICAgICAgICAgICAgICAgY2xvdWRmbGFyZVByb2plY3Q6IGVudHJ5LmNsb3VkZmxhcmVQcm9qZWN0LFxuICAgICAgICAgICAgICAgIHNpdGVVcmw6IGVudHJ5LnNpdGVVcmwsXG4gICAgICAgICAgICAgICAgaG9zdGluZ1Byb3ZpZGVyOiBlbnRyeS5ob3N0aW5nUHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgbGFzdFB1Ymxpc2hlZDogZW50cnkubGFzdFB1Ymxpc2hlZCxcbiAgICAgICAgICAgICAgICBpc1B1Ymxpc2hlZDogISFlbnRyeS5sYXN0UHVibGlzaGVkLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgcy5zaXRlcy5wdXNoKHJlc3RvcmVkU2l0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLmFjdGl2ZVNpdGVJZCA9IHMuYWN0aXZlU2l0ZUlkIHx8IHMuc2l0ZXNbMF0/LmlkIHx8ICcnO1xuICAgICAgICAgICAgcy5lbmFibGVQdWJsaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRhYi5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB0YWIucmVuZGVyKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgICBzaG93RXJyb3IoZXJyb3JFbCwgKGVyciBhcyBFcnJvcikubWVzc2FnZSk7XG4gICAgICAgICAgICBiLnNldERpc2FibGVkKGZhbHNlKS5zZXRCdXR0b25UZXh0KGBSZXN0b3JlICR7b3JwaGFuZWQubGVuZ3RofSBzaXRlJHtvcnBoYW5lZC5sZW5ndGggPT09IDEgPyAnJyA6ICdzJ31gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbn1cbiIsICJpbXBvcnQgeyBBcHAgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBSZWdpc3RyeUVudHJ5LCBWYXVsdFJlZ2lzdHJ5IGFzIFZhdWx0UmVnaXN0cnlEYXRhLCBTaXRlUHJvZmlsZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFBlcnNpc3RzIG1pbmltYWwgc2l0ZSByZWZlcmVuY2VzIHRvIGAubm90ZWZsYXJlL3JlZ2lzdHJ5Lmpzb25gIGluIHRoZSB2YXVsdFxuICogcm9vdC4gVGhpcyBmaWxlIHN1cnZpdmVzIHBsdWdpbiB1bmluc3RhbGwvcmVpbnN0YWxsLCBsZXR0aW5nIHVzZXJzIHJlc3RvcmVcbiAqIHRoZWlyIGV4aXN0aW5nIEdpdEh1YiByZXBvcyBhbmQgQ2xvdWRmbGFyZSBwcm9qZWN0cyB3aXRob3V0IHJlLXByb3Zpc2lvbmluZy5cbiAqXG4gKiBUaGUgcmVnaXN0cnkgaXMgaW50ZW50aW9uYWxseSBOT1QgY2xlYXJlZCBvbiBIYXJkIFJlc2V0IFx1MjAxNCB0aGUgcmVzZXQgd2lwZXMgdGhlXG4gKiBwbHVnaW4ncyBpbnRlcm5hbCBzZXR0aW5ncyAodG9rZW5zLCBzaXRlIHByb2ZpbGVzKSBidXQgbGVhdmVzIHRoZSByZWdpc3RyeSBzb1xuICogdGhlIHVzZXIgY2FuIGltbWVkaWF0ZWx5IHJlc3RvcmUgdGhlaXIgc2l0ZXMgYWZ0ZXIgcmVjb25uZWN0aW5nIGNyZWRlbnRpYWxzLlxuICovXG5cbmNvbnN0IFJFR0lTVFJZX0RJUiA9ICcubm90ZWZsYXJlJztcbmNvbnN0IFJFR0lTVFJZX1BBVEggPSAnLm5vdGVmbGFyZS9yZWdpc3RyeS5qc29uJztcblxuZXhwb3J0IGNsYXNzIFZhdWx0UmVnaXN0cnkge1xuICAvKiogTG9hZCB0aGUgcmVnaXN0cnkgZnJvbSBkaXNrLCByZXR1cm5pbmcgYW4gZW1wdHkgcmVnaXN0cnkgaWYgbm90IGZvdW5kLiAqL1xuICBzdGF0aWMgYXN5bmMgbG9hZChhcHA6IEFwcCk6IFByb21pc2U8VmF1bHRSZWdpc3RyeURhdGE+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmF3ID0gYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIucmVhZChSRUdJU1RSWV9QQVRIKTtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UocmF3KSBhcyBWYXVsdFJlZ2lzdHJ5RGF0YTtcbiAgICAgIGlmIChwYXJzZWQudmVyc2lvbiA9PT0gMSAmJiBBcnJheS5pc0FycmF5KHBhcnNlZC5lbnRyaWVzKSkge1xuICAgICAgICByZXR1cm4gcGFyc2VkO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gRmlsZSBkb2Vzbid0IGV4aXN0IG9yIGlzIGNvcnJ1cHRlZCBcdTIwMTQgc3RhcnQgZnJlc2guXG4gICAgfVxuICAgIHJldHVybiB7IHZlcnNpb246IDEsIGVudHJpZXM6IFtdIH07XG4gIH1cblxuICAvKiogV3JpdGUgdGhlIHJlZ2lzdHJ5IHRvIGRpc2ssIGNyZWF0aW5nIHRoZSBgLm5vdGVmbGFyZS9gIGRpcmVjdG9yeSBpZiBuZWVkZWQuICovXG4gIHN0YXRpYyBhc3luYyBzYXZlKGFwcDogQXBwLCByZWdpc3RyeTogVmF1bHRSZWdpc3RyeURhdGEpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKFJFR0lTVFJZX0RJUik7XG4gICAgICBpZiAoIWV4aXN0cykge1xuICAgICAgICBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci5ta2RpcihSRUdJU1RSWV9ESVIpO1xuICAgICAgfVxuICAgICAgYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUoUkVHSVNUUllfUEFUSCwgSlNPTi5zdHJpbmdpZnkocmVnaXN0cnksIG51bGwsIDIpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIE5vbi1mYXRhbCBcdTIwMTQgdGhlIG1hbmFnZSBwYW5lbCB3aWxsIHN0aWxsIHdvcmssIHRoZSByZWdpc3RyeSBqdXN0IHdvbid0IHBlcnNpc3QuXG4gICAgICBjb25zb2xlLndhcm4oJ05vdGVGbGFyZTogY291bGQgbm90IHdyaXRlIHZhdWx0IHJlZ2lzdHJ5OicsIGVycik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBvciB1cGRhdGUgYSBzaW5nbGUgc2l0ZSBlbnRyeSBkZXJpdmVkIGZyb20gYSBgU2l0ZVByb2ZpbGVgLlxuICAgKiBDYWxsZWQgYXV0b21hdGljYWxseSBieSBgc2F2ZVNldHRpbmdzKClgIHNvIHRoZSByZWdpc3RyeSBzdGF5cyBpbiBzeW5jLlxuICAgKi9cbiAgc3RhdGljIGFzeW5jIHVwc2VydChcbiAgICBhcHA6IEFwcCxcbiAgICBzaXRlOiBTaXRlUHJvZmlsZSxcbiAgICBtYXN0ZXJSZXBvc2l0b3J5OiBzdHJpbmcsXG4gICAgZ2l0aHViT3duZXI6IHN0cmluZyxcbiAgICBtYXN0ZXJSZXBvc2l0b3J5UHJpdmF0ZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcmVnaXN0cnkgPSBhd2FpdCBWYXVsdFJlZ2lzdHJ5LmxvYWQoYXBwKTtcbiAgICBjb25zdCBlbnRyeTogUmVnaXN0cnlFbnRyeSA9IHtcbiAgICAgIGlkOiBzaXRlLmlkLFxuICAgICAgbmFtZTogc2l0ZS5uYW1lLFxuICAgICAgbWFzdGVyUmVwb3NpdG9yeSxcbiAgICAgIGdpdGh1Yk93bmVyLFxuICAgICAgZ2l0aHViQnJhbmNoOiBzaXRlLmdpdGh1YkJyYW5jaCxcbiAgICAgIGNsb3VkZmxhcmVQcm9qZWN0OiBzaXRlLmNsb3VkZmxhcmVQcm9qZWN0LFxuICAgICAgc2l0ZVVybDogc2l0ZS5zaXRlVXJsLFxuICAgICAgaG9zdGluZ1Byb3ZpZGVyOiBzaXRlLmhvc3RpbmdQcm92aWRlcixcbiAgICAgIGxhc3RQdWJsaXNoZWQ6IHNpdGUubGFzdFB1Ymxpc2hlZCxcbiAgICAgIG1hc3RlclJlcG9zaXRvcnlQcml2YXRlLFxuICAgIH07XG4gICAgY29uc3QgaWR4ID0gcmVnaXN0cnkuZW50cmllcy5maW5kSW5kZXgoKGUpID0+IGUuaWQgPT09IHNpdGUuaWQpO1xuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgcmVnaXN0cnkuZW50cmllc1tpZHhdID0gZW50cnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlZ2lzdHJ5LmVudHJpZXMucHVzaChlbnRyeSk7XG4gICAgfVxuICAgIGF3YWl0IFZhdWx0UmVnaXN0cnkuc2F2ZShhcHAsIHJlZ2lzdHJ5KTtcbiAgfVxuXG4gIC8qKiBSZW1vdmUgYSBzaXRlIGZyb20gdGhlIHJlZ2lzdHJ5IGJ5IElELiAqL1xuICBzdGF0aWMgYXN5bmMgcmVtb3ZlKGFwcDogQXBwLCBzaXRlSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJlZ2lzdHJ5ID0gYXdhaXQgVmF1bHRSZWdpc3RyeS5sb2FkKGFwcCk7XG4gICAgcmVnaXN0cnkuZW50cmllcyA9IHJlZ2lzdHJ5LmVudHJpZXMuZmlsdGVyKChlKSA9PiBlLmlkICE9PSBzaXRlSWQpO1xuICAgIGF3YWl0IFZhdWx0UmVnaXN0cnkuc2F2ZShhcHAsIHJlZ2lzdHJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWJ1aWxkIGBTaXRlUHJvZmlsZWAgc3R1YnMgZnJvbSByZWdpc3RyeSBlbnRyaWVzIHRoYXQgYXJlbid0IGFscmVhZHkgaW5cbiAgICogYGV4aXN0aW5nU2l0ZUlkc2AuIFVzZWQgZHVyaW5nIHJlc3RvcmUtYWZ0ZXItcmVpbnN0YWxsOiBjcmVhdGVzIGxpZ2h0d2VpZ2h0XG4gICAqIHByb2ZpbGVzIHdpdGggbm8gY3JlZGVudGlhbCBkYXRhIChjcmVkZW50aWFscyBjb21lIGZyb20gdGhlIE9TIGtleWNoYWluIHZpYVxuICAgKiB0aGUgcGx1Z2luJ3Mgbm9ybWFsIGxvYWQgcGF0aCkuXG4gICAqL1xuICBzdGF0aWMgYnVpbGRSZXN0b3JlZFByb2ZpbGVzKFxuICAgIGVudHJpZXM6IFJlZ2lzdHJ5RW50cnlbXSxcbiAgICBleGlzdGluZ1NpdGVJZHM6IFNldDxzdHJpbmc+LFxuICApOiBSZWdpc3RyeUVudHJ5W10ge1xuICAgIHJldHVybiBlbnRyaWVzLmZpbHRlcigoZSkgPT4gIWV4aXN0aW5nU2l0ZUlkcy5oYXMoZS5pZCkpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIHsgTm90ZUZsYXJlU2V0dGluZ3NUYWIgfSBmcm9tICcuLi9zZXR0aW5nc1RhYic7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJCYWNrdXBTZWN0aW9uKHRhYjogTm90ZUZsYXJlU2V0dGluZ3NUYWIsIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICBjb25zdCBzID0gdGFiLnBsdWdpbi5zZXR0aW5ncztcbiAgY29uc3QgYmFja3VwSGVhZGluZyA9IG5ldyBTZXR0aW5nKGVsKTtcbiAgYmFja3VwSGVhZGluZy5zZXROYW1lKCdCYWNrdXAgJiBTdG9yYWdlJyk7XG4gIGJhY2t1cEhlYWRpbmcuc2V0SGVhZGluZygpO1xuXG4gICAgY29uc3QgYmFja3VwUmVwb05hbWUgPSBzLmJhY2t1cC5yZXBvc2l0b3J5IHx8IHRhYi5wbHVnaW4uZGVmYXVsdEJhY2t1cFJlcG9zaXRvcnkoKTtcbiAgICBjb25zdCBiYWNrdXBVcmwgPSBgaHR0cHM6Ly9naXRodWIuY29tLyR7cy5naXRodWJPd25lcn0vJHtiYWNrdXBSZXBvTmFtZX1gO1xuXG4gICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAuc2V0TmFtZSgnR2l0SHViIHJlcG9zaXRvcnknKVxuICAgICAgLnNldERlc2MoYFB1Ymxpc2ggcmVwbzogJHtzLmdpdGh1Yk93bmVyfS8ke3MubWFzdGVyUmVwb3NpdG9yeSB8fCAnbm90ZWZsYXJlLXNpdGVzJ30gKHlvdXIgc2l0ZSBzb3VyY2UpLiBCYWNrdXAgcmVwbzogJHtzLmdpdGh1Yk93bmVyfS8ke2JhY2t1cFJlcG9OYW1lfSAoeW91ciB2YXVsdCBtaXJyb3IsIGtlcHQgc2VwYXJhdGUpLmApXG4gICAgICAuYWRkVGV4dCgodCkgPT4ge1xuICAgICAgICB0LnNldFZhbHVlKGJhY2t1cFJlcG9OYW1lKTtcbiAgICAgICAgdC5zZXREaXNhYmxlZCh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgbGlua1NldHRpbmcgPSBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5zZXROYW1lKCdWaWV3IGJhY2t1cCBvbiBHaXRIdWInKVxuICAgICAgLnNldERlc2MoJ09wZW4geW91ciBwcml2YXRlIHZhdWx0IG1pcnJvciBpbiB0aGUgYnJvd3Nlci4nKTtcbiAgICBsaW5rU2V0dGluZy5jb250cm9sRWwuY3JlYXRlRWwoJ2EnLCB7XG4gICAgICB0ZXh0OiAnT3BlbiBSZXBvc2l0b3J5IFx1MjE5NycsXG4gICAgICBocmVmOiBiYWNrdXBVcmwsXG4gICAgfSk7XG4gICAgLy8gT3BlbiBpbiBkZWZhdWx0IGJyb3dzZXIgaW5zdGVhZCBvZiBPYnNpZGlhblxuICAgIGxpbmtTZXR0aW5nLmNvbnRyb2xFbC5xdWVyeVNlbGVjdG9yKCdhJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5vcGVuKGJhY2t1cFVybCk7XG4gICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgIC5zZXROYW1lKCdFbmFibGUgYXV0b21hdGljIGJhY2t1cCcpXG4gICAgICAuc2V0RGVzYygnU2lsZW50bHkgbWlycm9yIHlvdXIgdmF1bHQgdG8gYSBwcml2YXRlIEdpdEh1YiByZXBvc2l0b3J5IGluIHRoZSBiYWNrZ3JvdW5kLicpXG4gICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+IHtcbiAgICAgICAgdG9nZ2xlLnNldFZhbHVlKHMuZW5hYmxlQmFja3VwKTtcbiAgICAgICAgdG9nZ2xlLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHMuZW5hYmxlQmFja3VwID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgIXMuYmFja3VwLnJlcG9zaXRvcnkpIHtcbiAgICAgICAgICAgICAgcy5iYWNrdXAucmVwb3NpdG9yeSA9IHRhYi5wbHVnaW4uZGVmYXVsdEJhY2t1cFJlcG9zaXRvcnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHRhYi5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB0YWIucmVuZGVyKCk7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIGlmIChzLmVuYWJsZUJhY2t1cCkge1xuICAgICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAgIC5zZXROYW1lKCdSZXBvc2l0b3J5IHZpc2liaWxpdHknKVxuICAgICAgICAuc2V0RGVzYygnUHJpdmF0ZSBrZWVwcyB5b3VyIG5vdGVzIGNvbmZpZGVudGlhbC4gUHVibGljIG1ha2VzIHRoZSBiYWNrdXAgcmVwbyB2aXNpYmxlIG9uIEdpdEh1Yi4nKVxuICAgICAgICAuYWRkRHJvcGRvd24oKGQpID0+IHtcbiAgICAgICAgICBkLmFkZE9wdGlvbigncHJpdmF0ZScsICdcdUQ4M0RcdUREMTIgUHJpdmF0ZSAocmVjb21tZW5kZWQpJyk7XG4gICAgICAgICAgZC5hZGRPcHRpb24oJ3B1YmxpYycsICdcdUQ4M0NcdURGMTAgUHVibGljJyk7XG4gICAgICAgICAgZC5zZXRWYWx1ZShzLmJhY2t1cC5yZXBvVmlzaWJpbGl0eSA/PyAncHJpdmF0ZScpO1xuICAgICAgICAgIGQub25DaGFuZ2UoKHYpID0+IHtcbiAgICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgcy5iYWNrdXAucmVwb1Zpc2liaWxpdHkgPSB2IGFzICdwcml2YXRlJyB8ICdwdWJsaWMnO1xuICAgICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIG5ldyBTZXR0aW5nKGVsKVxuICAgICAgICAuc2V0TmFtZSgnQmFjayB1cCBhZnRlciBjaGFuZ2VzJylcbiAgICAgICAgLnNldERlc2MoJ1J1biBhIGJhY2t1cCAzMCBzZWNvbmRzIGFmdGVyIHZhdWx0IGZpbGVzIGFyZSBtb2RpZmllZC4nKVxuICAgICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+IHtcbiAgICAgICAgICB0b2dnbGUuc2V0VmFsdWUocy5iYWNrdXAuYmFja3VwT25DaGFuZ2UpO1xuICAgICAgICAgIHRvZ2dsZS5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgcy5iYWNrdXAuYmFja3VwT25DaGFuZ2UgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGFiLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgICAgLnNldE5hbWUoJ1NjaGVkdWxlJylcbiAgICAgICAgLnNldERlc2MoJ1BlcmlvZGljIGJhY2t1cHMgcnVuIHdoaWxlIE9ic2lkaWFuIGlzIG9wZW4uJylcbiAgICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgICAgIGRyb3Bkb3duLmFkZE9wdGlvbignMCcsICdPZmYnKTtcbiAgICAgICAgICBkcm9wZG93bi5hZGRPcHRpb24oJzE1JywgJ0V2ZXJ5IDE1IG1pbnV0ZXMnKTtcbiAgICAgICAgICBkcm9wZG93bi5hZGRPcHRpb24oJzMwJywgJ0V2ZXJ5IDMwIG1pbnV0ZXMnKTtcbiAgICAgICAgICBkcm9wZG93bi5hZGRPcHRpb24oJzYwJywgJ0V2ZXJ5IGhvdXInKTtcbiAgICAgICAgICBkcm9wZG93bi5hZGRPcHRpb24oJzM2MCcsICdFdmVyeSA2IGhvdXJzJyk7XG4gICAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKCcxNDQwJywgJ0RhaWx5Jyk7XG4gICAgICAgICAgZHJvcGRvd24uc2V0VmFsdWUoU3RyaW5nKHMuYmFja3VwLmludGVydmFsTWludXRlcykpO1xuICAgICAgICAgIGRyb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBzLmJhY2t1cC5pbnRlcnZhbE1pbnV0ZXMgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICBhd2FpdCB0YWIucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGJhY2t1cFN0YXR1cyA9IHMuYmFja3VwLmxhc3RCYWNrdXBFcnJvclxuICAgICAgICA/IGBOZWVkcyBhdHRlbnRpb246ICR7cy5iYWNrdXAubGFzdEJhY2t1cEVycm9yfWBcbiAgICAgICAgOiBzLmJhY2t1cC5sYXN0QmFja3VwQXRcbiAgICAgICAgICA/IGBMYXN0IGJhY2t1cDogJHtuZXcgRGF0ZShzLmJhY2t1cC5sYXN0QmFja3VwQXQpLnRvTG9jYWxlU3RyaW5nKCl9YFxuICAgICAgICAgIDogJ05vIGJhY2t1cCBoYXMgcnVuIHlldC4nO1xuXG4gICAgICBuZXcgU2V0dGluZyhlbClcbiAgICAgICAgLnNldE5hbWUoJ0JhY2t1cCBzdGF0dXMnKVxuICAgICAgICAuc2V0RGVzYyhiYWNrdXBTdGF0dXMpXG4gICAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4ge1xuICAgICAgICAgIGJ1dHRvbi5zZXRCdXR0b25UZXh0KCdCYWNrIHVwIG5vdycpLnNldEN0YSgpO1xuICAgICAgICAgIGJ1dHRvbi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgYnV0dG9uLnNldERpc2FibGVkKHRydWUpLnNldEJ1dHRvblRleHQoJ0JhY2tpbmcgdXBcdTIwMjYnKTtcbiAgICAgICAgICAgICAgYXdhaXQgdGFiLnBsdWdpbi5kb0JhY2t1cChmYWxzZSk7XG4gICAgICAgICAgICAgIHRhYi5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgeyBOb3RlRmxhcmVTZXR0aW5nc1RhYiB9IGZyb20gJy4uL3NldHRpbmdzVGFiJztcbmltcG9ydCB7IEVkaXRTaXRlTW9kYWwsIFJlbW92ZVNpdGVNb2RhbCwgQWRkU2l0ZU1vZGFsIH0gZnJvbSAnLi4vbW9kYWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNpdGVzU2VjdGlvbih0YWI6IE5vdGVGbGFyZVNldHRpbmdzVGFiLCBlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgY29uc3QgcyA9IHRhYi5wbHVnaW4uc2V0dGluZ3M7XG4gIGlmIChzLmVuYWJsZVB1Ymxpc2gpIHtcbiAgICBjb25zdCBzaXRlc0hlYWRpbmcgPSBuZXcgU2V0dGluZyhlbCk7XG4gICAgc2l0ZXNIZWFkaW5nLnNldE5hbWUoJ1NpdGVzJyk7XG4gICAgc2l0ZXNIZWFkaW5nLnNldEhlYWRpbmcoKTtcblxuICAgICAgbmV3IFNldHRpbmcoZWwpXG4gICAgICAgIC5zZXROYW1lKCdQYW5lbCBsb2NhdGlvbicpXG4gICAgICAgIC5zZXREZXNjKCdXaGVyZSB0aGUgTm90ZUZsYXJlIHBhbmVsIG9wZW5zIGJ5IGRlZmF1bHQuJylcbiAgICAgICAgLmFkZERyb3Bkb3duKChkKSA9PiB7XG4gICAgICAgICAgZC5hZGRPcHRpb24oJ2xlZnQnLCAnTGVmdCBzaWRlYmFyJyk7XG4gICAgICAgICAgZC5hZGRPcHRpb24oJ3JpZ2h0JywgJ1JpZ2h0IHNpZGViYXInKTtcbiAgICAgICAgICBkLmFkZE9wdGlvbigndGFiJywgJ01haW4gd29ya3NwYWNlIHRhYicpO1xuICAgICAgICAgIGQuc2V0VmFsdWUocy5kZWZhdWx0Vmlld0xvY2F0aW9uID8/ICdsZWZ0Jyk7XG4gICAgICAgICAgZC5vbkNoYW5nZSgodikgPT4ge1xuICAgICAgICAgICAgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBzLmRlZmF1bHRWaWV3TG9jYXRpb24gPSB2IGFzICdsZWZ0JyB8ICdyaWdodCcgfCAndGFiJztcbiAgICAgICAgICAgICAgYXdhaXQgdGFiLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBpZiAocy5zaXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZWwuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyxcbiAgICAgICAgICB0ZXh0OiAnTm8gc2l0ZXMgeWV0IFx1MjAxNCBhZGQgb25lIHRvIGdldCBzdGFydGVkLicsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCBzaXRlIG9mIHMuc2l0ZXMpIHtcbiAgICAgICAgICBjb25zdCBpc0xpdmUgPSBzaXRlLmlzUHVibGlzaGVkO1xuICAgICAgICAgIGNvbnN0IHByb3ZpZGVyTGFiZWwgPVxuICAgICAgICAgICAgc2l0ZS5ob3N0aW5nUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJ1xuICAgICAgICAgICAgICA/ICdDbG91ZGZsYXJlIFBhZ2VzJ1xuICAgICAgICAgICAgICA6ICdHaXRIdWIgUGFnZXMnO1xuICAgICAgICAgIGNvbnN0IHN0YXR1c1RleHQgPSBzaXRlLmxhc3RQdWJsaXNoZWRcbiAgICAgICAgICAgID8gYExhc3QgcHVibGlzaGVkICR7bmV3IERhdGUoc2l0ZS5sYXN0UHVibGlzaGVkKS50b0xvY2FsZVN0cmluZygpfSBcdTAwQjcgJHtzaXRlLmxhc3ROb3RlQ291bnR9IG5vdGVzYFxuICAgICAgICAgICAgOiAnTm90IHB1Ymxpc2hlZCB5ZXQnO1xuXG4gICAgICAgICAgY29uc3Qgc2l0ZVNldHRpbmcgPSBuZXcgU2V0dGluZyhlbClcbiAgICAgICAgICAgIC5zZXROYW1lKHNpdGUubmFtZSB8fCBzaXRlLmNsb3VkZmxhcmVQcm9qZWN0IHx8ICdTaXRlJylcbiAgICAgICAgICAgIC5zZXREZXNjKGAke2lzTGl2ZSA/ICdcdUQ4M0RcdURGRTIgTGl2ZScgOiAnXHUyNkFBIE9mZmxpbmUnfSBcdTAwQjcgJHtwcm92aWRlckxhYmVsfSBcdTAwQjcgJHtzdGF0dXNUZXh0fWApO1xuXG4gICAgICAgICAgY29uc3QgY2ZDb25uZWN0ZWQgPSAhIXRhYi5wbHVnaW4uc2V0dGluZ3MuY2xvdWRmbGFyZVRva2VuO1xuICAgICAgICAgIHNpdGVTZXR0aW5nLmFkZERyb3Bkb3duKChkKSA9PiB7XG4gICAgICAgICAgICBkLmFkZE9wdGlvbignZ2l0aHViLXBhZ2VzJywgJ0dpdEh1YiBQYWdlcycpO1xuICAgICAgICAgICAgaWYgKGNmQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgIGQuYWRkT3B0aW9uKCdjbG91ZGZsYXJlJywgJ0Nsb3VkZmxhcmUgUGFnZXMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE9ubHkgc2V0ICdjbG91ZGZsYXJlJyBpZiB0aGUgb3B0aW9uIGV4aXN0czsgb3RoZXJ3aXNlIGZhbGwgYmFjayB0byBnaXRodWItcGFnZXMuXG4gICAgICAgICAgICBjb25zdCBzdG9yZWRQcm92aWRlciA9IHNpdGUuaG9zdGluZ1Byb3ZpZGVyIHx8ICdnaXRodWItcGFnZXMnO1xuICAgICAgICAgICAgZC5zZXRWYWx1ZShjZkNvbm5lY3RlZCA/IHN0b3JlZFByb3ZpZGVyIDogJ2dpdGh1Yi1wYWdlcycpO1xuICAgICAgICAgICAgZC5vbkNoYW5nZSgodikgPT4ge1xuICAgICAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2l0ZS5ob3N0aW5nUHJvdmlkZXIgPSB2IGFzICdnaXRodWItcGFnZXMnIHwgJ2Nsb3VkZmxhcmUnO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRhYi5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgdGFiLnJlbmRlcigpO1xuICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoc2l0ZS5zaXRlVXJsKSB7XG4gICAgICAgICAgICBzaXRlU2V0dGluZy5hZGRFeHRyYUJ1dHRvbigoYikgPT5cbiAgICAgICAgICAgICAgYlxuICAgICAgICAgICAgICAgIC5zZXRJY29uKCdleHRlcm5hbC1saW5rJylcbiAgICAgICAgICAgICAgICAuc2V0VG9vbHRpcCgnT3BlbiBzaXRlJylcbiAgICAgICAgICAgICAgICAub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihgaHR0cHM6Ly8ke3NpdGUuc2l0ZVVybH1gLCAnX2JsYW5rJyk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNpdGVTZXR0aW5nLmFkZEJ1dHRvbigoYikgPT5cbiAgICAgICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnRWRpdCcpLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBuZXcgRWRpdFNpdGVNb2RhbCh0YWIuYXBwLCB0YWIucGx1Z2luLCBzaXRlLCAoKSA9PiB0YWIucmVuZGVyKCkpLm9wZW4oKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBzaXRlU2V0dGluZy5hZGRCdXR0b24oKGIpID0+IHtcbiAgICAgICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnUmVtb3ZlJyk7XG4gICAgICAgICAgICBiLmJ1dHRvbkVsLmFkZENsYXNzKCdtb2Qtd2FybmluZycpO1xuICAgICAgICAgICAgYi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgbmV3IFJlbW92ZVNpdGVNb2RhbCh0YWIuYXBwLCB0YWIucGx1Z2luLCBzaXRlLCAoKSA9PiB0YWIucmVuZGVyKCkpLm9wZW4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5ldyBTZXR0aW5nKGVsKS5hZGRCdXR0b24oKGIpID0+XG4gICAgICAgIGJcbiAgICAgICAgICAuc2V0QnV0dG9uVGV4dCgnQWRkIHNpdGUnKVxuICAgICAgICAgIC5zZXRDdGEoKVxuICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgIG5ldyBBZGRTaXRlTW9kYWwodGFiLmFwcCwgdGFiLnBsdWdpbiwgKCkgPT4gdGFiLnJlbmRlcigpKS5vcGVuKCk7XG4gICAgICAgICAgfSksXG4gICAgICApO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgdHlwZSBOb3RlRmxhcmVQbHVnaW4gZnJvbSAnLi4vLi4vLi4vLi4vbWFpbic7XG5pbXBvcnQgeyBTaXRlUHJvZmlsZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgUGF0aFN1Z2dlc3RNb2RhbCB9IGZyb20gJy4vcGF0aFN1Z2dlc3RNb2RhbCc7XG5pbXBvcnQgeyBzbHVnaWZ5LCBwcm92aXNpb25TaXRlIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuZXhwb3J0IGNsYXNzIEFkZFNpdGVNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgcGx1Z2luOiBOb3RlRmxhcmVQbHVnaW4sIHByaXZhdGUgb25Eb25lOiAoKSA9PiB2b2lkKSB7XG4gICAgc3VwZXIoYXBwKTtcbiAgfVxuXG4gIG9uT3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLnRpdGxlRWwuc2V0VGV4dCgnQWRkIGEgc2l0ZScpO1xuICAgIGxldCBuYW1lID0gJyc7XG4gICAgbGV0IHNjb3BlOiAndmF1bHQnIHwgJ3NlbGVjdGVkJyA9ICd2YXVsdCc7XG4gICAgbGV0IHBhdGhzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxldCBhdXRob3JOYW1lID0gJyc7XG4gICAgbGV0IHNpZGViYXJUaXRsZSA9ICcnO1xuICAgIGxldCBzaXRlRGVzY3JpcHRpb24gPSAnJztcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1NpdGUgbmFtZScpXG4gICAgICAuc2V0RGVzYygnVXNlZCBhcyB0aGUgR2l0SHViIHJlcG9zaXRvcnkgbmFtZSBhbmQgc2l0ZSBpZGVudGlmaWVyLicpXG4gICAgICAuYWRkVGV4dCh0ID0+IHtcbiAgICAgICAgdC5zZXRQbGFjZWhvbGRlcignbXktYmxvZycpO1xuICAgICAgICB0Lm9uQ2hhbmdlKHYgPT4geyBuYW1lID0gdjsgfSk7XG4gICAgICB9KTtcblxuICAgIGxldCBob3N0aW5nUHJvdmlkZXI6IFNpdGVQcm9maWxlWydob3N0aW5nUHJvdmlkZXInXSA9ICdnaXRodWItcGFnZXMnO1xuICAgIGNvbnN0IGNmQ29ubmVjdGVkID0gISF0aGlzLnBsdWdpbi5zZXR0aW5ncy5jbG91ZGZsYXJlVG9rZW47XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdIb3N0aW5nIHByb3ZpZGVyJylcbiAgICAgIC5zZXREZXNjKCdXaGVyZSB0byBob3N0IHRoaXMgc2l0ZS4nKVxuICAgICAgLmFkZERyb3Bkb3duKGQgPT4ge1xuICAgICAgICBkLmFkZE9wdGlvbignZ2l0aHViLXBhZ2VzJywgJ0dpdEh1YiBQYWdlcycpO1xuICAgICAgICBpZiAoY2ZDb25uZWN0ZWQpIHtcbiAgICAgICAgICBkLmFkZE9wdGlvbignY2xvdWRmbGFyZScsICdDbG91ZGZsYXJlIFBhZ2VzJyk7XG4gICAgICAgIH1cbiAgICAgICAgZC5zZXRWYWx1ZShob3N0aW5nUHJvdmlkZXIpO1xuICAgICAgICBkLm9uQ2hhbmdlKHYgPT4ge1xuICAgICAgICAgIGhvc3RpbmdQcm92aWRlciA9IHYgYXMgU2l0ZVByb2ZpbGVbJ2hvc3RpbmdQcm92aWRlciddO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuc2V0TmFtZSgnUHVibGlzaCBzY29wZScpXG4gICAgICAuc2V0RGVzYygnQ29uZmlndXJlIHdoYXQgdG8gcHVibGlzaDogdGhlIGVudGlyZSB2YXVsdCBvciBzZWxlY3RlZCBmaWxlcy9mb2xkZXJzLicpXG4gICAgICAuYWRkRHJvcGRvd24oZCA9PiB7XG4gICAgICAgIGQuYWRkT3B0aW9uKCd2YXVsdCcsICdGdWxsIFZhdWx0Jyk7XG4gICAgICAgIGQuYWRkT3B0aW9uKCdzZWxlY3RlZCcsICdTZWxlY3RlZCBGaWxlcy9Gb2xkZXJzJyk7XG4gICAgICAgIGQuc2V0VmFsdWUoJ3ZhdWx0Jyk7XG4gICAgICAgIGQub25DaGFuZ2UodiA9PiB7XG4gICAgICAgICAgc2NvcGUgPSB2IGFzICd2YXVsdCcgfCAnc2VsZWN0ZWQnO1xuICAgICAgICAgIHVwZGF0ZVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IHBhdGhzQ29udGFpbmVyID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRGl2KCdub3RlZmxhcmUtcGF0aHMtY29udGFpbmVyJyk7XG4gICAgXG4gICAgY29uc3QgcmVuZGVyUGF0aHMgPSAoKSA9PiB7XG4gICAgICBwYXRoc0NvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgaWYgKHNjb3BlID09PSAndmF1bHQnKSB7XG4gICAgICAgIHBhdGhzQ29udGFpbmVyLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGF0aHNDb250YWluZXIuc2V0Q3NzU3R5bGVzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KTtcbiAgICAgIFxuICAgICAgaWYgKHBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBwYXRoc0NvbnRhaW5lci5jcmVhdGVFbCgncCcsIHsgdGV4dDogJ05vIGZpbGVzIG9yIGZvbGRlcnMgc2VsZWN0ZWQuJywgY2xzOiAnbm90ZWZsYXJlLW11dGVkJyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBwYXRoc0NvbnRhaW5lci5jcmVhdGVFbCgndWwnLCB7IGNsczogJ25vdGVmbGFyZS1wYXRoLWxpc3QnIH0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgbGkgPSBsaXN0LmNyZWF0ZUVsKCdsaScpO1xuICAgICAgICAgIGxpLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogJzRweCcgfSk7XG4gICAgICAgICAgbGkuY3JlYXRlU3Bhbih7IHRleHQ6IHBhdGhzW2ldIH0pO1xuICAgICAgICAgIGNvbnN0IHJlbW92ZUJ0biA9IGxpLmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdcdTI3MTUnIH0pO1xuICAgICAgICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHBhdGhzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgYWRkUm93ID0gcGF0aHNDb250YWluZXIuY3JlYXRlRGl2KCdub3RlZmxhcmUtYWRkLXBhdGgtcm93Jyk7XG4gICAgICBhZGRSb3cuc2V0Q3NzU3R5bGVzKHsgbWFyZ2luVG9wOiAnOHB4JyB9KTtcbiAgICAgIFxuICAgICAgY29uc3QgYWRkQnRuID0gYWRkUm93LmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdCcm93c2UgVmF1bHQuLi4nIH0pO1xuICAgICAgYWRkQnRuLnNldENzc1N0eWxlcyh7IHdpZHRoOiAnMTAwJScgfSk7XG4gICAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIG5ldyBQYXRoU3VnZ2VzdE1vZGFsKHRoaXMuYXBwLCAoc2VsZWN0ZWRQYXRoKSA9PiB7XG4gICAgICAgICAgaWYgKHNlbGVjdGVkUGF0aC50cmltKCkgJiYgIXBhdGhzLmluY2x1ZGVzKHNlbGVjdGVkUGF0aC50cmltKCkpKSB7XG4gICAgICAgICAgICBwYXRocy5wdXNoKHNlbGVjdGVkUGF0aC50cmltKCkpO1xuICAgICAgICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLm9wZW4oKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCB1cGRhdGVWaXNpYmlsaXR5ID0gKCkgPT4ge1xuICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICB9O1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuc2V0TmFtZSgnQXV0aG9yIG5hbWUnKVxuICAgICAgLnNldERlc2MoJ0F1dGhvciBuYW1lIHdyaXR0ZW4gdG8gc2l0ZSBtZXRhZGF0YSAob3B0aW9uYWwpLicpXG4gICAgICAuYWRkVGV4dCh0ID0+IHtcbiAgICAgICAgdC5zZXRQbGFjZWhvbGRlcignWW91ciBOYW1lJyk7XG4gICAgICAgIHQub25DaGFuZ2UodiA9PiB7IGF1dGhvck5hbWUgPSB2LnRyaW0oKTsgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1NpZGViYXIgdGl0bGUnKVxuICAgICAgLnNldERlc2MoJ1RpdGxlIHNob3duIGluIHRoZSBzaWRlYmFyIChvcHRpb25hbCwgZGVmYXVsdHMgdG8gc2l0ZSBuYW1lKS4nKVxuICAgICAgLmFkZFRleHQodCA9PiB7XG4gICAgICAgIHQuc2V0UGxhY2Vob2xkZXIoJ015IERpZ2l0YWwgR2FyZGVuJyk7XG4gICAgICAgIHQub25DaGFuZ2UodiA9PiB7IHNpZGViYXJUaXRsZSA9IHYudHJpbSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuc2V0TmFtZSgnU2l0ZSBkZXNjcmlwdGlvbicpXG4gICAgICAuc2V0RGVzYygnRGVzY3JpcHRpb24gb2YgeW91ciBzaXRlIChvcHRpb25hbCkuJylcbiAgICAgIC5hZGRUZXh0KHQgPT4ge1xuICAgICAgICB0LnNldFBsYWNlaG9sZGVyKCdOb3RlcyBhbmQgdGhvdWdodHNcdTIwMjYnKTtcbiAgICAgICAgdC5vbkNoYW5nZSh2ID0+IHsgc2l0ZURlc2NyaXB0aW9uID0gdi50cmltKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICB1cGRhdGVWaXNpYmlsaXR5KCk7XG5cbiAgICBjb25zdCBlcnJvckVsID0gdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoJ3AnLCB7IGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicgfSk7XG4gICAgZXJyb3JFbC5zZXRDc3NTdHlsZXMoeyBjb2xvcjogJ3ZhcigtLXRleHQtZXJyb3IpJyB9KTtcbiAgICBlcnJvckVsLmhpZGUoKTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnQ2FuY2VsJykub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdDcmVhdGUgc2l0ZScpLnNldEN0YSgpO1xuICAgICAgICBiLm9uQ2xpY2soKCkgPT4geyB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKCFzbHVnaWZ5KG5hbWUpKSB7XG4gICAgICAgICAgICBlcnJvckVsLnNldFRleHQoJ1BsZWFzZSBlbnRlciBhIHNpdGUgbmFtZS4nKTtcbiAgICAgICAgICAgIGVycm9yRWwuc2hvdygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvckVsLmhpZGUoKTtcbiAgICAgICAgICBiLnNldERpc2FibGVkKHRydWUpLnNldEJ1dHRvblRleHQoJ0NyZWF0aW5nXHUyMDI2Jyk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNpdGUgPSBhd2FpdCBwcm92aXNpb25TaXRlKHRoaXMucGx1Z2luLCBuYW1lLCB7XG4gICAgICAgICAgICAgIHB1Ymxpc2hTY29wZTogc2NvcGUsXG4gICAgICAgICAgICAgIHB1Ymxpc2hQYXRoczogcGF0aHMsXG4gICAgICAgICAgICAgIGF1dGhvck5hbWUsXG4gICAgICAgICAgICAgIHNpZGViYXJUaXRsZSxcbiAgICAgICAgICAgICAgc2l0ZURlc2NyaXB0aW9uLFxuICAgICAgICAgICAgfSwgaG9zdGluZ1Byb3ZpZGVyKTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNpdGVzLnB1c2goc2l0ZSk7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hY3RpdmVTaXRlSWQgPSBzaXRlLmlkO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICBuZXcgTm90aWNlKGBTaXRlIFx1MjAxQyR7c2l0ZS5uYW1lfVx1MjAxRCBjcmVhdGVkLmApO1xuICAgICAgICAgICAgdGhpcy5vbkRvbmUoKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgICAgICAgIGVycm9yRWwuc2V0VGV4dCgoZXJyIGFzIEVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgIGVycm9yRWwuc2hvdygpO1xuICAgICAgICAgICAgYi5zZXREaXNhYmxlZChmYWxzZSkuc2V0QnV0dG9uVGV4dCgnQ3JlYXRlIHNpdGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7IH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBvbkNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgdHlwZSBOb3RlRmxhcmVQbHVnaW4gZnJvbSAnLi4vLi4vLi4vLi4vbWFpbic7XG5pbXBvcnQgeyBTaXRlUHJvZmlsZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgR2l0SHViQXBpIH0gZnJvbSAnLi4vLi4vLi4vYXBpL2dpdGh1YkFwaSc7XG5pbXBvcnQgeyBDbG91ZGZsYXJlQXBpIH0gZnJvbSAnLi4vLi4vLi4vYXBpL2Nsb3VkZmxhcmVBcGknO1xuaW1wb3J0IHsgVmF1bHRSZWdpc3RyeSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdmF1bHRSZWdpc3RyeSc7XG5cbmV4cG9ydCBjbGFzcyBSZW1vdmVTaXRlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIHByaXZhdGUgZGVsZXRpbmcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBhcHA6IEFwcCxcbiAgICBwcml2YXRlIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luLFxuICAgIHByaXZhdGUgc2l0ZTogU2l0ZVByb2ZpbGUsXG4gICAgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQsXG4gICkge1xuICAgIHN1cGVyKGFwcCk7XG4gIH1cblxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy50aXRsZUVsLnNldFRleHQoJ0RlbGV0ZSB0aGlzIHNpdGU/Jyk7XG4gICAgY29uc3Qgc2l0ZU5hbWUgPSB0aGlzLnNpdGUubmFtZSB8fCB0aGlzLnNpdGUuZ2l0aHViUmVwbyB8fCAnVW5uYW1lZCBzaXRlJztcblxuICAgIHRoaXMuY29udGVudEVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgdGV4dDogYFwiJHtzaXRlTmFtZX1cIiB3aWxsIGJlIHBlcm1hbmVudGx5IGRlbGV0ZWQgZnJvbSBOb3RlRmxhcmUuYCxcbiAgICB9KTtcblxuICAgIC8vIFNob3cgYSBjbGVhciwgcHJvbWluZW50IHN1bW1hcnkgb2Ygd2hhdCB0aGUgZGVsZXRlIG9wZXJhdGlvbiB3aWxsIGRvXG4gICAgY29uc3Qgc3VtbWFyeURpdiA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdigpO1xuICAgIHN1bW1hcnlEaXYuc2V0Q3NzU3R5bGVzKHtcbiAgICAgIG1hcmdpblRvcDogJzhweCcsXG4gICAgICBwYWRkaW5nOiAnMTBweCAxMnB4JyxcbiAgICAgIGJvcmRlckxlZnQ6ICc0cHggc29saWQgdmFyKC0tdGV4dC13YXJuaW5nKScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlciknLFxuICAgICAgYm9yZGVyUmFkaXVzOiAndmFyKC0tcmFkaXVzLXMpJyxcbiAgICAgIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxuICAgIH0pO1xuICAgIHN1bW1hcnlEaXYuY3JlYXRlRWwoJ3N0cm9uZycsIHsgdGV4dDogJ1doYXQgd2lsbCBiZSBkZWxldGVkOicgfSk7XG4gICAgY29uc3Qgc3RlcHNMaXN0ID0gc3VtbWFyeURpdi5jcmVhdGVFbCgndWwnKTtcbiAgICBzdGVwc0xpc3Quc2V0Q3NzU3R5bGVzKHsgbWFyZ2luOiAnNnB4IDAgMCAwJywgcGFkZGluZ0xlZnQ6ICcxLjJlbScgfSk7XG4gICAgY29uc3QgZ2hTdGVwID0gc3RlcHNMaXN0LmNyZWF0ZUVsKCdsaScpO1xuICAgIGdoU3RlcC5zZXRUZXh0KCdcdTI3MDUgU2l0ZSBmb2xkZXIgcmVtb3ZlZCBmcm9tIEdpdEh1YiByZXBvc2l0b3J5ICh2aWEgQVBJKScpO1xuICAgIGlmICh0aGlzLnNpdGUuaG9zdGluZ1Byb3ZpZGVyID09PSAnY2xvdWRmbGFyZScpIHtcbiAgICAgIGNvbnN0IGNmU3RlcCA9IHN0ZXBzTGlzdC5jcmVhdGVFbCgnbGknKTtcbiAgICAgIGNmU3RlcC5zZXRUZXh0KCdcdTI3MDUgQ2xvdWRmbGFyZSBQYWdlcyBwcm9qZWN0IGRlbGV0ZWQgKHZpYSBBUEkpJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ZXBzTGlzdC5jcmVhdGVFbCgnbGknKS5zZXRUZXh0KCdcdTI2QTBcdUZFMEYgR2l0SHViIFBhZ2VzIGRlcGxveW1lbnQgXHUyMDE0IE5PVCBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuIERpc2FibGUgaXQgbWFudWFsbHk6Jyk7XG4gICAgICBjb25zdCBtYW51YWxOb3RlID0gc3RlcHNMaXN0LmNyZWF0ZUVsKCdsaScpO1xuICAgICAgbWFudWFsTm90ZS5zZXRDc3NTdHlsZXMoeyBsaXN0U3R5bGVUeXBlOiAnbm9uZScsIHBhZGRpbmdMZWZ0OiAnMWVtJywgY29sb3I6ICd2YXIoLS10ZXh0LW11dGVkKScsIGZvbnRTaXplOiAndmFyKC0tZm9udC11aS1zbWFsbGVyKScgfSk7XG4gICAgICBtYW51YWxOb3RlLnNldFRleHQoJ0dpdEh1YiByZXBvIFx1MjE5MiBTZXR0aW5ncyBcdTIxOTIgUGFnZXMgXHUyMTkyIFNvdXJjZSBcdTIxOTIgTm9uZSBcdTIxOTIgU2F2ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHByb2dyZXNzRWwgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbCgncCcsIHsgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyB9KTtcbiAgICBwcm9ncmVzc0VsLmhpZGUoKTtcblxuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbCgncCcsIHsgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyB9KTtcbiAgICBlcnJvckVsLnNldENzc1N0eWxlcyh7IGNvbG9yOiAndmFyKC0tdGV4dC1lcnJvciknIH0pO1xuICAgIGVycm9yRWwuaGlkZSgpO1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuYWRkQnV0dG9uKChiKSA9PiBiLnNldEJ1dHRvblRleHQoJ0NhbmNlbCcpLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKSlcbiAgICAgIC5hZGRCdXR0b24oKGIpID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdEZWxldGUnKTtcbiAgICAgICAgYi5idXR0b25FbC5hZGRDbGFzcygnbW9kLXdhcm5pbmcnKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWxldGluZykgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5kZWxldGluZyA9IHRydWU7XG4gICAgICAgICAgICBiLnNldERpc2FibGVkKHRydWUpLnNldEJ1dHRvblRleHQoJ0RlbGV0aW5nXHUyMDI2Jyk7XG4gICAgICAgICAgICBlcnJvckVsLmhpZGUoKTtcbiAgICAgICAgICAgIHByb2dyZXNzRWwuc2hvdygpO1xuXG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5wbHVnaW4uc2V0dGluZ3M7XG4gICAgICAgICAgICBjb25zdCBnaCA9IG5ldyBHaXRIdWJBcGkoXG4gICAgICAgICAgICAgIHMuZ2l0aHViVG9rZW4sXG4gICAgICAgICAgICAgIHMuZ2l0aHViT3duZXIsXG4gICAgICAgICAgICAgIHMubWFzdGVyUmVwb3NpdG9yeSxcbiAgICAgICAgICAgICAgdGhpcy5zaXRlLmdpdGh1YkJyYW5jaCB8fCAnbWFpbicsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBTdGVwIDE6IENsb3VkZmxhcmUgY2xlYW51cFxuICAgICAgICAgICAgaWYgKHRoaXMuc2l0ZS5ob3N0aW5nUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJyAmJiBzLmNsb3VkZmxhcmVUb2tlbikge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzRWwuc2V0VGV4dCgnRGVsZXRpbmcgQ2xvdWRmbGFyZSBQYWdlcyBwcm9qZWN0XHUyMDI2Jyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2YgPSBuZXcgQ2xvdWRmbGFyZUFwaShzLmNsb3VkZmxhcmVUb2tlbiwgcy5jbG91ZGZsYXJlQWNjb3VudCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgY2YuZGVsZXRlUHJvamVjdCh0aGlzLnNpdGUuY2xvdWRmbGFyZVByb2plY3QpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdOb3RlRmxhcmU6IGNvdWxkIG5vdCBkZWxldGUgQ2xvdWRmbGFyZSBwcm9qZWN0OicsIGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN0ZXAgMjogR2l0SHViIGZvbGRlciBjbGVhbnVwXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBwcm9ncmVzc0VsLnNldFRleHQoJ1JlbW92aW5nIHNpdGUgZnJvbSBHaXRIdWIgcmVwb3NpdG9yeVx1MjAyNicpO1xuICAgICAgICAgICAgICBhd2FpdCBnaC5kZWxldGVTaXRlRm9sZGVyKHRoaXMuc2l0ZS5pZCwgdGhpcy5zaXRlLmdpdGh1YkJyYW5jaCB8fCAnbWFpbicpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ05vdGVGbGFyZTogY291bGQgbm90IGRlbGV0ZSBHaXRIdWIgc2l0ZSBmb2xkZXI6JywgZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN0ZXAgMzogVmF1bHQgcmVnaXN0cnlcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHByb2dyZXNzRWwuc2V0VGV4dCgnVXBkYXRpbmcgdmF1bHQgcmVnaXN0cnlcdTIwMjYnKTtcbiAgICAgICAgICAgICAgYXdhaXQgVmF1bHRSZWdpc3RyeS5yZW1vdmUodGhpcy5hcHAsIHRoaXMuc2l0ZS5pZCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybignTm90ZUZsYXJlOiBjb3VsZCBub3QgdXBkYXRlIHZhdWx0IHJlZ2lzdHJ5OicsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTdGVwIDQ6IFJlbW92ZSBmcm9tIHBsdWdpbiBzZXR0aW5nc1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgY29uc3QgczIgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncztcbiAgICAgICAgICAgICAgczIuc2l0ZXMgPSBzMi5zaXRlcy5maWx0ZXIoKHgpID0+IHguaWQgIT09IHRoaXMuc2l0ZS5pZCk7XG4gICAgICAgICAgICAgIGlmIChzMi5hY3RpdmVTaXRlSWQgPT09IHRoaXMuc2l0ZS5pZCkge1xuICAgICAgICAgICAgICAgIHMyLmFjdGl2ZVNpdGVJZCA9IHMyLnNpdGVzWzBdPy5pZCA/PyAnJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICBuZXcgTm90aWNlKGBTaXRlIFwiJHtzaXRlTmFtZX1cIiBkZWxldGVkLmApO1xuICAgICAgICAgICAgICB0aGlzLm9uRG9uZSgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICAgICAgICAgIGVycm9yRWwuc2V0VGV4dCgoZXJyIGFzIEVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgZXJyb3JFbC5zaG93KCk7XG4gICAgICAgICAgICAgIHByb2dyZXNzRWwuaGlkZSgpO1xuICAgICAgICAgICAgICBiLnNldERpc2FibGVkKGZhbHNlKS5zZXRCdXR0b25UZXh0KCdEZWxldGUnKTtcbiAgICAgICAgICAgICAgdGhpcy5kZWxldGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBvbkNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBcHAsIE1vZGFsLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgTm90ZUZsYXJlUGx1Z2luIGZyb20gJy4uLy4uLy4uLy4uL21haW4nO1xuXG5leHBvcnQgY2xhc3MgVW5wdWJsaXNoTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwcml2YXRlIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luLCBwcml2YXRlIG9uRG9uZTogKCkgPT4gdm9pZCkge1xuICAgIHN1cGVyKGFwcCk7XG4gIH1cblxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy50aXRsZUVsLnNldFRleHQoJ1VucHVibGlzaCB5b3VyIHNpdGU/Jyk7XG4gICAgdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICB0ZXh0OiAnWW91ciBzaXRlIHdpbGwgZ28gb2ZmbGluZS4gRmlsZXMgaW4gR2l0SHViIHJlbWFpbiB1bnRvdWNoZWQgXHUyMDE0IHlvdSBjYW4gcmUtcHVibGlzaCBhbnkgdGltZS4nLFxuICAgIH0pO1xuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnQ2FuY2VsJykub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdVbnB1Ymxpc2gnKTtcbiAgICAgICAgYi5idXR0b25FbC5hZGRDbGFzcygnbW9kLXdhcm5pbmcnKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5kb1VucHVibGlzaCgpO1xuICAgICAgICAgICAgdGhpcy5vbkRvbmUoKTtcbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25DbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICB9XG59XG5cbi8qKlxuICogSW5mbyBtb2RhbCBmb3IgR2l0SHViIFBhZ2VzIG1hbnVhbCB1bnB1Ymxpc2guXG4gKiBHaXRIdWIgUGFnZXMgY2Fubm90IGJlIHBhdXNlZCB2aWEgQVBJIHNvIHRoaXMgc2hvd3MgdGhlIHVzZXIgZXhhY3RseVxuICogaG93IHRvIGRpc2FibGUgaXQgdGhlbXNlbHZlcyBpbiB0aGUgR2l0SHViIHJlcG8gc2V0dGluZ3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBHaXRIdWJQYWdlc1VucHVibGlzaE1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSBwYWdlc1NldHRpbmdzVXJsOiBzdHJpbmcpIHtcbiAgICBzdXBlcihhcHApO1xuICB9XG5cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIHRoaXMudGl0bGVFbC5zZXRUZXh0KCdEaXNhYmxlIEdpdEh1YiBQYWdlcyAoTWFudWFsKScpO1xuICAgIHRoaXMuY29udGVudEVsLmNyZWF0ZUVsKCdwJywge1xuICAgICAgdGV4dDogJ0dpdEh1YiBQYWdlcyBjYW5ub3QgYmUgcGF1c2VkIHZpYSB0aGUgR2l0SHViIEFQSS4gVG8gdGFrZSB5b3VyIHNpdGUgb2ZmbGluZSwgZm9sbG93IHRoZXNlIHN0ZXBzOicsXG4gICAgfSk7XG4gICAgY29uc3Qgc3RlcHMgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbCgnb2wnKTtcbiAgICBzdGVwcy5zZXRDc3NTdHlsZXMoeyBwYWRkaW5nTGVmdDogJzEuNGVtJyB9KTtcbiAgICBzdGVwcy5jcmVhdGVFbCgnbGknLCB7IHRleHQ6ICdDbGljayB0aGUgYnV0dG9uIGJlbG93IHRvIG9wZW4geW91ciByZXBvc2l0b3J5IFBhZ2VzIHNldHRpbmdzLicgfSk7XG4gICAgc3RlcHMuY3JlYXRlRWwoJ2xpJywgeyB0ZXh0OiAnVW5kZXIgXHUyMDFDU291cmNlXHUyMDFELCBjaGFuZ2UgdGhlIHNlbGVjdGlvbiBmcm9tIFx1MjAxQ0dpdEh1YiBBY3Rpb25zXHUyMDFEIHRvIFx1MjAxQ05vbmVcdTIwMUQuJyB9KTtcbiAgICBzdGVwcy5jcmVhdGVFbCgnbGknLCB7IHRleHQ6ICdDbGljayBTYXZlLiBZb3VyIHNpdGUgd2lsbCBiZSBvZmZsaW5lIHdpdGhpbiBhIG1pbnV0ZS4nIH0pO1xuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnQ2FuY2VsJykub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdPcGVuIEdpdEh1YiBQYWdlcyBzZXR0aW5ncyBcdTIxOTcnKS5zZXRDdGEoKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHsgd2luZG93Lm9wZW4odGhpcy5wYWdlc1NldHRpbmdzVXJsLCAnX2JsYW5rJyk7IHRoaXMuY2xvc2UoKTsgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG9uQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFwcCwgTW9kYWwsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgdHlwZSBOb3RlRmxhcmVQbHVnaW4gZnJvbSAnLi4vLi4vLi4vLi4vbWFpbic7XG5pbXBvcnQgeyBERUZBVUxUX1NFVFRJTkdTIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXR0aW5ncyc7XG5cbmV4cG9ydCBjbGFzcyBSZXNldE1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbiwgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQpIHtcbiAgICBzdXBlcihhcHApO1xuICB9XG5cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIHRoaXMudGl0bGVFbC5zZXRUZXh0KCdSZXNldCBOb3RlRmxhcmU/Jyk7XG4gICAgdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICB0ZXh0OiAnVGhpcyBjbGVhcnMgYWxsIE5vdGVGbGFyZSBzZXR0aW5ncyAodG9rZW5zIGFuZCBldmVyeSBzaXRlKS4gWW91ciBHaXRIdWIgcmVwb3MgYW5kIENsb3VkZmxhcmUgcHJvamVjdHMgd2lsbCBOT1QgYmUgZGVsZXRlZC4nLFxuICAgIH0pO1xuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnQ2FuY2VsJykub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdSZXNldCcpO1xuICAgICAgICBiLmJ1dHRvbkVsLmFkZENsYXNzKCdtb2Qtd2FybmluZycpO1xuICAgICAgICBiLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgIHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5wbHVnaW4uc2V0dGluZ3MsIHtcbiAgICAgICAgICAgICAgLi4uREVGQVVMVF9TRVRUSU5HUyxcbiAgICAgICAgICAgICAgc2l0ZXM6IFtdLFxuICAgICAgICAgICAgICBiYWNrdXA6IHsgLi4uREVGQVVMVF9TRVRUSU5HUy5iYWNrdXAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB0aGlzLm9uRG9uZSgpO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBvbkNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBcHAsIE1vZGFsLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHR5cGUgTm90ZUZsYXJlUGx1Z2luIGZyb20gJy4uLy4uLy4uLy4uL21haW4nO1xuaW1wb3J0IHsgU2l0ZVByb2ZpbGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3R5cGVzJztcbmltcG9ydCB7IFBhdGhTdWdnZXN0TW9kYWwgfSBmcm9tICcuL3BhdGhTdWdnZXN0TW9kYWwnO1xuaW1wb3J0IHsgQ2hhbmdlUmVwb01vZGFsIH0gZnJvbSAnLi9jaGFuZ2VSZXBvTW9kYWwnO1xuXG5cbmV4cG9ydCBjbGFzcyBFZGl0U2l0ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhcHA6IEFwcCxcbiAgICBwcml2YXRlIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luLFxuICAgIHByaXZhdGUgc2l0ZTogU2l0ZVByb2ZpbGUsXG4gICAgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQsXG4gICkge1xuICAgIHN1cGVyKGFwcCk7XG4gIH1cblxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgcyA9IHRoaXMuc2l0ZTtcbiAgICB0aGlzLnRpdGxlRWwuc2V0VGV4dChgU2V0dGluZ3MgZm9yICR7cy5uYW1lIHx8IHMuY2xvdWRmbGFyZVByb2plY3QgfHwgJ1NpdGUnfWApO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICAgIGNvbnN0IHMgPSB0aGlzLnNpdGU7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCkuc2V0TmFtZSgnUHVibGlzaGluZyBydWxlcycpLnNldEhlYWRpbmcoKTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ0dpdEh1YiByZXBvc2l0b3J5JylcbiAgICAgIC5zZXREZXNjKCdUaGUgcmVwb3NpdG9yeSBsaW5rZWQgdG8gdGhpcyBzaXRlLicpXG4gICAgICAuYWRkVGV4dCh0ID0+IHtcbiAgICAgICAgdC5zZXRWYWx1ZShzLmdpdGh1YlJlcG8gfHwgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeSk7XG4gICAgICAgIHQuc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICB9KVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnQ2hhbmdlIFJlcG8nKS5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgbmV3IENoYW5nZVJlcG9Nb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4sIHMsICgpID0+IHRoaXMucmVuZGVyKCkpLm9wZW4oKTtcbiAgICAgIH0pKTtcblxuICAgIGxldCB1cGRhdGVWaXNpYmlsaXR5OiAoKSA9PiB2b2lkO1xuICAgIFxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1B1Ymxpc2ggc2NvcGUnKVxuICAgICAgLnNldERlc2MoJ0NvbmZpZ3VyZSB3aGF0IHRvIHB1Ymxpc2g6IHRoZSBlbnRpcmUgdmF1bHQgb3Igc2VsZWN0ZWQgZmlsZXMvZm9sZGVycy4nKVxuICAgICAgLmFkZERyb3Bkb3duKGQgPT4ge1xuICAgICAgICBkLmFkZE9wdGlvbigndmF1bHQnLCAnRnVsbCBWYXVsdCcpO1xuICAgICAgICBkLmFkZE9wdGlvbignc2VsZWN0ZWQnLCAnU2VsZWN0ZWQgRmlsZXMvRm9sZGVycycpO1xuICAgICAgICBkLnNldFZhbHVlKHMucHVibGlzaFNjb3BlIHx8ICd2YXVsdCcpO1xuICAgICAgICBkLm9uQ2hhbmdlKCh2KSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBzLnB1Ymxpc2hTY29wZSA9IHYgYXMgJ3ZhdWx0JyB8ICdzZWxlY3RlZCc7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgdXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgICAgICB9KSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgcGF0aHNDb250YWluZXIgPSB0aGlzLmNvbnRlbnRFbC5jcmVhdGVEaXYoJ25vdGVmbGFyZS1wYXRocy1jb250YWluZXInKTtcbiAgICBcbiAgICBjb25zdCByZW5kZXJQYXRocyA9ICgpID0+IHtcbiAgICAgIHBhdGhzQ29udGFpbmVyLmVtcHR5KCk7XG4gICAgICBpZiAoKHMucHVibGlzaFNjb3BlIHx8ICd2YXVsdCcpID09PSAndmF1bHQnKSB7XG4gICAgICAgIHBhdGhzQ29udGFpbmVyLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGF0aHNDb250YWluZXIuc2V0Q3NzU3R5bGVzKHsgZGlzcGxheTogJ2Jsb2NrJyB9KTtcbiAgICAgIFxuICAgICAgY29uc3QgcGF0aHMgPSBzLnB1Ymxpc2hQYXRocyB8fCBbXTtcbiAgICAgIGlmIChwYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcGF0aHNDb250YWluZXIuY3JlYXRlRWwoJ3AnLCB7IHRleHQ6ICdObyBmaWxlcyBvciBmb2xkZXJzIHNlbGVjdGVkLicsIGNsczogJ25vdGVmbGFyZS1tdXRlZCcgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBsaXN0ID0gcGF0aHNDb250YWluZXIuY3JlYXRlRWwoJ3VsJywgeyBjbHM6ICdub3RlZmxhcmUtcGF0aC1saXN0JyB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGxpID0gbGlzdC5jcmVhdGVFbCgnbGknKTtcbiAgICAgICAgICBsaS5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206ICc0cHgnIH0pO1xuICAgICAgICAgIFxuICAgICAgICAgIGxpLmNyZWF0ZVNwYW4oeyB0ZXh0OiBwYXRoc1tpXSB9KTtcbiAgICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBsaS5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnXHUyNzE1JyB9KTtcbiAgICAgICAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHMucHVibGlzaFBhdGhzPy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgICAgICAgfSkoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgYWRkUm93ID0gcGF0aHNDb250YWluZXIuY3JlYXRlRGl2KCdub3RlZmxhcmUtYWRkLXBhdGgtcm93Jyk7XG4gICAgICBhZGRSb3cuc2V0Q3NzU3R5bGVzKHsgbWFyZ2luVG9wOiAnOHB4JyB9KTtcbiAgICAgIFxuICAgICAgY29uc3QgYWRkQnRuID0gYWRkUm93LmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdCcm93c2UgVmF1bHQuLi4nIH0pO1xuICAgICAgYWRkQnRuLnNldENzc1N0eWxlcyh7IHdpZHRoOiAnMTAwJScgfSk7XG4gICAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIG5ldyBQYXRoU3VnZ2VzdE1vZGFsKHRoaXMuYXBwLCAoc2VsZWN0ZWRQYXRoKSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRQYXRoLnRyaW0oKSkge1xuICAgICAgICAgICAgaWYgKCFzLnB1Ymxpc2hQYXRocykgcy5wdWJsaXNoUGF0aHMgPSBbXTtcbiAgICAgICAgICAgIGlmICghcy5wdWJsaXNoUGF0aHMuaW5jbHVkZXMoc2VsZWN0ZWRQYXRoLnRyaW0oKSkpIHtcbiAgICAgICAgICAgICAgcy5wdWJsaXNoUGF0aHMucHVzaChzZWxlY3RlZFBhdGgudHJpbSgpKTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpOyB9KS5vcGVuKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdXBkYXRlVmlzaWJpbGl0eSA9ICgpID0+IHtcbiAgICAgIHJlbmRlclBhdGhzKCk7XG4gICAgfTtcbiAgICB1cGRhdGVWaXNpYmlsaXR5KCk7XG5cbiAgICAvLyBDdXN0b21pemF0aW9uc1xuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKS5zZXROYW1lKCdTaXRlIEN1c3RvbWl6YXRpb24nKS5zZXRIZWFkaW5nKCk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdTaXRlIG5hbWUnKVxuICAgICAgLnNldERlc2MoJ0ludGVybmFsIG5hbWUgZm9yIHRoaXMgc2l0ZS4nKVxuICAgICAgLmFkZFRleHQodCA9PiB7XG4gICAgICAgIHQuc2V0VmFsdWUocy5uYW1lIHx8ICcnKTtcbiAgICAgICAgdC5vbkNoYW5nZSgodikgPT4geyB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgcy5uYW1lID0gdi50cmltKCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdBdXRob3IgbmFtZScpXG4gICAgICAuc2V0RGVzYygnVGhlIGF1dGhvciBuYW1lIHdyaXR0ZW4gdG8gdGhlIHNpdGUgbWV0YWRhdGEuJylcbiAgICAgIC5hZGRUZXh0KHQgPT4ge1xuICAgICAgICB0LnNldFBsYWNlaG9sZGVyKCdZb3VyIE5hbWUnKTtcbiAgICAgICAgdC5zZXRWYWx1ZShzLmF1dGhvck5hbWUgfHwgJycpO1xuICAgICAgICB0Lm9uQ2hhbmdlKCh2KSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBzLmF1dGhvck5hbWUgPSB2LnRyaW0oKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgfSkoKTsgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ1NpZGViYXIgdGl0bGUnKVxuICAgICAgLnNldERlc2MoJ1RpdGxlIHNob3duIGluIHRoZSBzaWRlYmFyLiBEZWZhdWx0cyB0byB0aGUgc2l0ZSBuYW1lLicpXG4gICAgICAuYWRkVGV4dCh0ID0+IHtcbiAgICAgICAgdC5zZXRQbGFjZWhvbGRlcignTXkgRGlnaXRhbCBHYXJkZW4nKTtcbiAgICAgICAgdC5zZXRWYWx1ZShzLnNpZGViYXJUaXRsZSB8fCAnJyk7XG4gICAgICAgIHQub25DaGFuZ2UoKHYpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHMuc2lkZWJhclRpdGxlID0gdi50cmltKCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdTaXRlIGRlc2NyaXB0aW9uJylcbiAgICAgIC5zZXREZXNjKCdEZXNjcmlwdGlvbiBvZiB5b3VyIHNpdGUuJylcbiAgICAgIC5hZGRUZXh0KHQgPT4ge1xuICAgICAgICB0LnNldFBsYWNlaG9sZGVyKCdOb3RlcyBhbmQgdGhvdWdodHNcdTIwMjYnKTtcbiAgICAgICAgdC5zZXRWYWx1ZShzLnNpdGVEZXNjcmlwdGlvbiB8fCAnJyk7XG4gICAgICAgIHQub25DaGFuZ2UoKHYpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHMuc2l0ZURlc2NyaXB0aW9uID0gdi50cmltKCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdFeGNsdWRlIHBhdHRlcm5zJylcbiAgICAgIC5zZXREZXNjKCdPbmUgZ2xvYiBwZXIgbGluZS4gTWF0Y2hpbmcgZmlsZXMgYXJlIG5vdCBwdWJsaXNoZWQgKGUuZy4gcHJpdmF0ZS8qKiwgKi5wcml2YXRlLm1kKS4nKVxuICAgICAgLmFkZFRleHRBcmVhKGFyZWEgPT4ge1xuICAgICAgICBhcmVhLnNldFZhbHVlKHMuZXhjbHVkZVBhdHRlcm5zLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgYXJlYS5pbnB1dEVsLnJvd3MgPSA0O1xuICAgICAgICBhcmVhLm9uQ2hhbmdlKCh2KSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBzLmV4Y2x1ZGVQYXR0ZXJucyA9IHYuc3BsaXQoJ1xcbicpLm1hcCh4ID0+IHgudHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5zZXROYW1lKCdJbmNsdWRlIGF0dGFjaG1lbnRzJylcbiAgICAgIC5zZXREZXNjKCdVcGxvYWQgaW1hZ2VzIGFuZCBQREZzIGFsb25nc2lkZSB5b3VyIG5vdGVzLicpXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB7XG4gICAgICAgIHRvZ2dsZS5zZXRWYWx1ZShzLmluY2x1ZGVBdHRhY2htZW50cyk7XG4gICAgICAgIHRvZ2dsZS5vbkNoYW5nZSgodikgPT4geyB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgcy5pbmNsdWRlQXR0YWNobWVudHMgPSB2O1xuICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICB9KSgpOyB9KTtcbiAgICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpXG4gICAgICAuYWRkQnV0dG9uKGIgPT4gYi5zZXRCdXR0b25UZXh0KCdEb25lJykuc2V0Q3RhKCkub25DbGljaygoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5vbkRvbmUoKTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIG9uQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZW50RWwuZW1wdHkoKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB0eXBlIE5vdGVGbGFyZVBsdWdpbiBmcm9tICcuLi8uLi8uLi8uLi9tYWluJztcbmltcG9ydCB7IFNpdGVQcm9maWxlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVTaXRlUHJvZmlsZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2V0dGluZ3MnO1xuXG5leHBvcnQgY2xhc3MgQ2hhbmdlUmVwb01vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhcHA6IEFwcCxcbiAgICBwcml2YXRlIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luLFxuICAgIHByaXZhdGUgc2l0ZTogU2l0ZVByb2ZpbGUsXG4gICAgcHJpdmF0ZSBvbkRvbmU6ICgpID0+IHZvaWQsXG4gICkge1xuICAgIHN1cGVyKGFwcCk7XG4gIH1cblxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy50aXRsZUVsLnNldFRleHQoJ0NoYW5nZSBSZXBvc2l0b3J5Jyk7XG4gICAgbGV0IG5ld1JlcG8gPSAnJztcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ05ldyByZXBvc2l0b3J5IG5hbWUnKVxuICAgICAgLnNldERlc2MoJ0VudGVyIHRoZSBuZXcgR2l0SHViIHJlcG9zaXRvcnkgbmFtZS4nKVxuICAgICAgLmFkZFRleHQodCA9PiB7XG4gICAgICAgIHQuc2V0VmFsdWUodGhpcy5zaXRlLmdpdGh1YlJlcG8gfHwgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeSk7XG4gICAgICAgIHQub25DaGFuZ2UodiA9PiB7IG5ld1JlcG8gPSB2LnRyaW0oKTsgfSk7XG4gICAgICB9KTtcblxuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLnNldE5hbWUoJ01pZ3JhdGUgb3IgQ3JlYXRlIE5ldycpXG4gICAgICAuc2V0RGVzYygnTWlncmF0ZSB3aWxsIHVwZGF0ZSB0aGlzIHNpdGUuIENyZWF0ZSBOZXcgd2lsbCBjbG9uZSB0aGlzIHByb2ZpbGUgZm9yIHRoZSBuZXcgcmVwby4nKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnTWlncmF0ZScpLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICBpZiAoIW5ld1JlcG8pIHJldHVybjtcbiAgICAgICAgdGhpcy5zaXRlLmdpdGh1YlJlcG8gPSBuZXdSZXBvO1xuICAgICAgICB2b2lkIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIG5ldyBOb3RpY2UoJ1JlcG9zaXRvcnkgdXBkYXRlZC4gUHVibGlzaCB0byBwcm92aXNpb24gdGhlIG5ldyByZXBvLicpO1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICB0aGlzLm9uRG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IGIuc2V0QnV0dG9uVGV4dCgnQ3JlYXRlIE5ldycpLnNldEN0YSgpLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICBpZiAoIW5ld1JlcG8pIHJldHVybjtcbiAgICAgICAgY29uc3QgbmV3U2l0ZSA9IGNyZWF0ZVNpdGVQcm9maWxlKHtcbiAgICAgICAgICAuLi50aGlzLnNpdGUsXG4gICAgICAgICAgbmFtZTogYCR7dGhpcy5zaXRlLm5hbWV9IChDb3B5KWAsXG4gICAgICAgICAgZ2l0aHViUmVwbzogbmV3UmVwbyxcbiAgICAgICAgICBjbG91ZGZsYXJlUHJvamVjdDogJycsXG4gICAgICAgICAgc2l0ZVVybDogJycsXG4gICAgICAgICAgaXNQdWJsaXNoZWQ6IGZhbHNlLFxuICAgICAgICAgIGxhc3RQdWJsaXNoZWQ6ICcnLFxuICAgICAgICAgIGxhc3ROb3RlQ291bnQ6IDAsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaXRlcy5wdXNoKG5ld1NpdGUpO1xuICAgICAgICB2b2lkIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIG5ldyBOb3RpY2UoJ05ldyBzaXRlIHByb2ZpbGUgY3JlYXRlZC4nKTtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgdGhpcy5vbkRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gIH1cblxuICBvbkNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XG4gIH1cbn1cbiIsICJleHBvcnQgY2xhc3MgU3RhdHVzQmFyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQpIHt9XG5cbiAgc2V0SWRsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldCgnTm90ZUZsYXJlOiBOb3Qgc2V0IHVwJyk7XG4gICAgdGhpcy5lbC50aXRsZSA9ICcnO1xuICB9XG5cbiAgc2V0VW5wdWJsaXNoZWQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXQoJ05vdGVGbGFyZTogVW5wdWJsaXNoZWQnKTtcbiAgICB0aGlzLmVsLnRpdGxlID0gJyc7XG4gIH1cblxuICBzZXRQdWJsaXNoaW5nKG46IG51bWJlciwgdG90YWw6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2V0KGBOb3RlRmxhcmU6IFVwbG9hZGluZyAke259LyR7dG90YWx9Li4uYCk7XG4gIH1cblxuICBzZXRMaXZlKG5vdGVDb3VudDogbnVtYmVyLCB1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc2V0KGBOb3RlRmxhcmU6IExpdmUgXHUyMDE0ICR7bm90ZUNvdW50fSBub3RlcyBcdTIxOTdgKTtcbiAgICB0aGlzLmVsLnRpdGxlID0gdXJsID8gYGh0dHBzOi8vJHt1cmx9YCA6ICcnO1xuICB9XG5cbiAgc2V0RXJyb3IobXNnOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNldChgTm90ZUZsYXJlOiBFcnJvciBcdTIwMTQgJHttc2d9YCk7XG4gIH1cblxuICBzZXRSYXRlTGltaXRlZChzZWNzTGVmdDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZXQoYE5vdGVGbGFyZTogUmF0ZSBsaW1pdGVkIFx1MjAxNCAke3NlY3NMZWZ0fXNgKTtcbiAgfVxuXG4gIHNldE1lc3NhZ2UobXNnOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNldChtc2cpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXQodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5lbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBJdGVtVmlldywgV29ya3NwYWNlTGVhZiwgc2V0SWNvbiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IEFkZFNpdGVNb2RhbCwgVW5wdWJsaXNoTW9kYWwsIEVkaXRTaXRlTW9kYWwsIFJlbW92ZVNpdGVNb2RhbCwgUGF0aFN1Z2dlc3RNb2RhbCwgR2l0SHViUGFnZXNVbnB1Ymxpc2hNb2RhbCB9IGZyb20gJy4vc2V0dGluZ3MvbW9kYWxzJztcbmltcG9ydCB0eXBlIE5vdGVGbGFyZVBsdWdpbiBmcm9tICcuLi8uLi9tYWluJztcbmltcG9ydCB0eXBlIHsgTGl2ZVNpdGVTdGF0dXMgfSBmcm9tICcuLi8uLi9tYWluJztcbmltcG9ydCB7IFNpdGVQcm9maWxlIH0gZnJvbSAnLi4vY29yZS90eXBlcyc7XG5cblxuZXhwb3J0IGNvbnN0IFZJRVdfVFlQRV9OT1RFRkxBUkUgPSAnbm90ZWZsYXJlLXBhbmVsJztcblxuY29uc3QgQ0xPVURGTEFSRV9BUFBfVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9hcHBzL2Nsb3VkZmxhcmUtd29ya2Vycy1hbmQtcGFnZXMvaW5zdGFsbGF0aW9ucy9uZXcnO1xuXG4vKiogRm9ybWF0IGFuIElTTyBkYXRlIHN0cmluZyB0byBhIHJlbGF0aXZlIHRpbWUgbGlrZSBcIjMgbWluIGFnb1wiLiAqL1xuZnVuY3Rpb24gcmVsYXRpdmVUaW1lKGlzbzogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKCFpc28pIHJldHVybiAnJztcbiAgY29uc3QgZGlmZk1zID0gRGF0ZS5ub3coKSAtIG5ldyBEYXRlKGlzbykuZ2V0VGltZSgpO1xuICBpZiAoaXNOYU4oZGlmZk1zKSkgcmV0dXJuICcnO1xuICBjb25zdCBtaW5zID0gTWF0aC5mbG9vcihkaWZmTXMgLyA2MDAwMCk7XG4gIGlmIChtaW5zIDwgMSkgcmV0dXJuICdqdXN0IG5vdyc7XG4gIGlmIChtaW5zIDwgNjApIHJldHVybiBgJHttaW5zfSBtaW4gYWdvYDtcbiAgY29uc3QgaHJzID0gTWF0aC5mbG9vcihtaW5zIC8gNjApO1xuICBpZiAoaHJzIDwgMjQpIHJldHVybiBgJHtocnN9aCBhZ29gO1xuICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcihocnMgLyAyNCk7XG4gIHJldHVybiBgJHtkYXlzfWQgYWdvYDtcbn1cblxuLyoqXG4gKiBGb2N1c2VkIHB1Ymxpc2hpbmcgcGFuZWwuIEJhY2t1cCBydW5zIHF1aWV0bHkgaW4gdGhlIGJhY2tncm91bmQgYW5kIGlzXG4gKiBjb25maWd1cmVkIGZyb20gTm90ZUZsYXJlIHNldHRpbmdzLlxuICovXG5leHBvcnQgY2xhc3MgTm90ZUZsYXJlVmlldyBleHRlbmRzIEl0ZW1WaWV3IHtcbiAgY29uc3RydWN0b3IobGVhZjogV29ya3NwYWNlTGVhZiwgcHJpdmF0ZSBwbHVnaW46IE5vdGVGbGFyZVBsdWdpbikge1xuICAgIHN1cGVyKGxlYWYpO1xuICB9XG5cbiAgZ2V0Vmlld1R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gVklFV19UWVBFX05PVEVGTEFSRTtcbiAgfVxuXG4gIGdldERpc3BsYXlUZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdOb3RlRmxhcmUnO1xuICB9XG5cbiAgZ2V0SWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBsdWdpbi5nZXRBY3RpdmVTaXRlKCk/LmlzUHVibGlzaGVkID8gJ2Nsb3VkLWNoZWNrJyA6ICdjbG91ZC11cGxvYWQnO1xuICB9XG5cbiAgYXN5bmMgb25PcGVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMucmVuZGVyKCk7XG4gICAgLy8gRmV0Y2ggbGl2ZSBzdGF0dXMgaW4gYmFja2dyb3VuZCB3aGVuIHBhbmVsIG9wZW5zLlxuICAgIGNvbnN0IHNpdGUgPSB0aGlzLnBsdWdpbi5nZXRBY3RpdmVTaXRlKCk7XG4gICAgaWYgKHNpdGUpIHZvaWQgdGhpcy5wbHVnaW4uZmV0Y2hMaXZlU3RhdHVzKHNpdGUpO1xuICB9XG5cbiAgYXN5bmMgb25DbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBub3RoaW5nIHRvIGNsZWFuIHVwXG4gIH1cblxuICByZWZyZXNoKCk6IHZvaWQge1xuICAgIHZvaWQgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVuZGVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLmNvbnRhaW5lckVsLmNoaWxkcmVuWzFdIGFzIEhUTUxFbGVtZW50O1xuICAgIHJvb3QuZW1wdHkoKTtcbiAgICByb290LmFkZENsYXNzKCdub3RlZmxhcmUtdmlldycpO1xuXG4gICAgY29uc3QgcyA9IHRoaXMucGx1Z2luLnNldHRpbmdzO1xuICAgIFxuICAgIGlmICghcy5zZXR1cENvbXBsZXRlKSB7XG4gICAgICByb290LmNyZWF0ZUVsKCdwJywge1xuICAgICAgICB0ZXh0OiAnRmluaXNoIHNldHVwIHRvIHB1Ymxpc2ggeW91ciBub3RlcyBhbmQgcHJvdGVjdCB5b3VyIHZhdWx0IHdpdGggYXV0b21hdGljIGJhY2t1cHMuJyxcbiAgICAgICAgY2xzOiAnc2V0dGluZy1pdGVtLWRlc2NyaXB0aW9uJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgc2V0dXBCdG4gPSByb290LmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdPcGVuIHNldHVwJywgY2xzOiAnbW9kLWN0YScgfSk7XG4gICAgICBzZXR1cEJ0bi5zZXRDc3NTdHlsZXMoeyBtYXJnaW5Ub3A6ICcxMHB4JyB9KTtcbiAgICAgIHNldHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5wbHVnaW4ub3BlblNldHRpbmdzVGFiKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRlbnQgPSByb290LmNyZWF0ZURpdih7IGNsczogJ25vdGVmbGFyZS10YWItY29udGVudCcgfSk7XG4gICAgaWYgKHMuZW5hYmxlUHVibGlzaCkge1xuICAgICAgYXdhaXQgdGhpcy5yZW5kZXJQdWJsaXNoKGNvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiYWNrdXAgPSBjb250ZW50LmNyZWF0ZURpdigpO1xuICAgICAgYmFja3VwLmNyZWF0ZUVsKCdoMycsIHsgdGV4dDogJ1lvdXIgdmF1bHQgaXMgcHJvdGVjdGVkJyB9KTtcbiAgICAgIGJhY2t1cC5jcmVhdGVFbCgncCcsIHtcbiAgICAgICAgdGV4dDogcy5iYWNrdXAubGFzdEJhY2t1cEF0XG4gICAgICAgICAgPyBgTGFzdCBiYWNrdXA6ICR7bmV3IERhdGUocy5iYWNrdXAubGFzdEJhY2t1cEF0KS50b0xvY2FsZVN0cmluZygpfWBcbiAgICAgICAgICA6ICdZb3VyIGZpcnN0IGJhY2t1cCB3aWxsIHJ1biBhdXRvbWF0aWNhbGx5LicsXG4gICAgICAgIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHNldHRpbmdzQnV0dG9uID0gYmFja3VwLmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdCYWNrdXAgb3B0aW9ucycsIGNsczogJ21vZC1jdGEnIH0pO1xuICAgICAgc2V0dGluZ3NCdXR0b24uc2V0Q3NzU3R5bGVzKHsgbWFyZ2luVG9wOiAnMTBweCcgfSk7XG4gICAgICBzZXR0aW5nc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMucGx1Z2luLm9wZW5TZXR0aW5nc1RhYigpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlbmRlclB1Ymxpc2gocm9vdDogSFRNTEVsZW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzID0gdGhpcy5wbHVnaW4uc2V0dGluZ3M7XG4gICAgY29uc3Qgc2l0ZSA9IHRoaXMucGx1Z2luLmdldEFjdGl2ZVNpdGUoKTtcblxuICAgIGlmICghc2l0ZSkge1xuICAgICAgcm9vdC5jcmVhdGVFbCgncCcsIHtcbiAgICAgICAgdGV4dDogJ05vIHB1Ymxpc2ggc2l0ZXMgY29uZmlndXJlZC4nLFxuICAgICAgICBjbHM6ICdub3RlZmxhcmUtbXV0ZWQnLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBjcmVhdGVCdG4gPSByb290LmNyZWF0ZUVsKCdidXR0b24nLCB7IHRleHQ6ICdRdWljayBjcmVhdGUgc2l0ZScsIGNsczogJ21vZC1jdGEnIH0pO1xuICAgICAgY3JlYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBuZXcgQWRkU2l0ZU1vZGFsKHRoaXMuYXBwLCB0aGlzLnBsdWdpbiwgKCkgPT4gdGhpcy5yZWZyZXNoKCkpLm9wZW4oKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFx1MjUwMFx1MjUwMCBTaW5nbGUgc291cmNlIG9mIHRydXRoOiBkZXJpdmUgYWxsIHN0YXR1cyBmcm9tIHBlcnNpc3RlZCBTaXRlUHJvZmlsZSBcdTI1MDBcdTI1MDBcbiAgICBjb25zdCBpc1B1Ymxpc2hpbmcgPSAhIXRoaXMucGx1Z2luLnB1Ymxpc2hJblByb2dyZXNzW3NpdGUuaWRdO1xuICAgIGNvbnN0IGhhc0ZhaWxlZCA9IHNpdGUubGFzdFB1Ymxpc2hGYWlsZWQgJiYgIWlzUHVibGlzaGluZztcbiAgICBjb25zdCBpc0xpdmUgPSBzaXRlLmlzUHVibGlzaGVkICYmICFoYXNGYWlsZWQ7XG4gICAgY29uc3QgbGl2ZSA9IHRoaXMucGx1Z2luLmxpdmVTdGF0dXNbc2l0ZS5pZF0gPz8gbnVsbDtcblxuICAgIC8vIFx1MjUwMFx1MjUwMCBIZWFkZXI6IFNpdGUgc3dpdGNoZXIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gICAgbmV3IFNldHRpbmcocm9vdClcbiAgICAgIC5zZXROYW1lKCdDdXJyZW50IHNpdGUnKVxuICAgICAgLmFkZERyb3Bkb3duKGQgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHNwIG9mIHMuc2l0ZXMpIHtcbiAgICAgICAgICBkLmFkZE9wdGlvbihzcC5pZCwgc3AubmFtZSB8fCBzcC5naXRodWJSZXBvKTtcbiAgICAgICAgfVxuICAgICAgICBkLnNldFZhbHVlKHNpdGUuaWQpO1xuICAgICAgICBkLm9uQ2hhbmdlKChpZCkgPT4geyB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgcy5hY3RpdmVTaXRlSWQgPSBpZDtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB2b2lkIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0pKCk7IH0pO1xuICAgICAgfSlcbiAgICAgIC5hZGRCdXR0b24oYiA9PiB7XG4gICAgICAgIGIuc2V0SWNvbigncGx1cycpLnNldFRvb2x0aXAoJ0NyZWF0ZSBhbm90aGVyIHNpdGUnKS5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICBuZXcgQWRkU2l0ZU1vZGFsKHRoaXMuYXBwLCB0aGlzLnBsdWdpbiwgKCkgPT4gdGhpcy5yZWZyZXNoKCkpLm9wZW4oKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIC8vIFx1MjUwMFx1MjUwMCBMaXZlIFN0YXR1cyBEYXNoYm9hcmQgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gICAgdGhpcy5yZW5kZXJTdGF0dXNEYXNoYm9hcmQocm9vdCwgc2l0ZSwgaXNMaXZlLCBoYXNGYWlsZWQsIGlzUHVibGlzaGluZywgbGl2ZSk7XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgQ2xvdWRmbGFyZSByZWNvbm5lY3Qgd2FybmluZyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICBpZiAoXG4gICAgICBzaXRlLmhvc3RpbmdQcm92aWRlciA9PT0gJ2Nsb3VkZmxhcmUnICYmXG4gICAgICBzaXRlLmxhc3RQdWJsaXNoRXJyb3IgJiZcbiAgICAgIC9kaXNjb25uZWN0fGdpdCBhY2NvdW50L2kudGVzdChzaXRlLmxhc3RQdWJsaXNoRXJyb3IpXG4gICAgKSB7XG4gICAgICBjb25zdCB3YXJuQmFubmVyID0gcm9vdC5jcmVhdGVEaXYoJ25mLWNmLXdhcm4tYmFubmVyJyk7XG4gICAgICB3YXJuQmFubmVyLmNyZWF0ZUVsKCdzdHJvbmcnLCB7IHRleHQ6ICdcdTI2QTAgQ2xvdWRmbGFyZSBkaXNjb25uZWN0ZWQgZnJvbSBHaXRIdWInIH0pO1xuICAgICAgd2FybkJhbm5lci5jcmVhdGVFbCgncCcsIHtcbiAgICAgICAgdGV4dDogJ1lvdXIgbGFzdCBidWlsZCBmYWlsZWQgYmVjYXVzZSBDbG91ZGZsYXJlIGxvc3QgYWNjZXNzIHRvIHlvdXIgR2l0SHViIHJlcG9zaXRvcnkuIENsaWNrIGJlbG93IHRvIHJlLWF1dGhvcml6ZSwgdGhlbiBwdWJsaXNoIGFnYWluLicsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJlY29ubmVjdEJ0biA9IHdhcm5CYW5uZXIuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogJ1JlLWF1dGhvcml6ZSBDbG91ZGZsYXJlIFx1MjE5NycsIGNsczogJ21vZC1jdGEnIH0pO1xuICAgICAgcmVjb25uZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyB3aW5kb3cub3BlbihDTE9VREZMQVJFX0FQUF9VUkwsICdfYmxhbmsnKTsgfSk7XG4gICAgfVxuXG4gICAgLy8gXHUyNTAwXHUyNTAwIFNpdGUgUHVibGlzaCBTY29wZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICBsZXQgdXBkYXRlVmlzaWJpbGl0eTogKCkgPT4gdm9pZDtcblxuICAgIG5ldyBTZXR0aW5nKHJvb3QpXG4gICAgICAuc2V0TmFtZSgnUHVibGlzaCBzY29wZScpXG4gICAgICAuc2V0RGVzYygnQ29uZmlndXJlIHdoYXQgdG8gcHVibGlzaDogdGhlIGVudGlyZSB2YXVsdCBvciBzZWxlY3RlZCBmaWxlcy9mb2xkZXJzLicpXG4gICAgICAuYWRkRHJvcGRvd24oZCA9PiB7XG4gICAgICAgIGQuYWRkT3B0aW9uKCd2YXVsdCcsICdGdWxsIFZhdWx0Jyk7XG4gICAgICAgIGQuYWRkT3B0aW9uKCdzZWxlY3RlZCcsICdTZWxlY3RlZCBGaWxlcy9Gb2xkZXJzJyk7XG4gICAgICAgIGQuc2V0VmFsdWUoc2l0ZS5wdWJsaXNoU2NvcGUgfHwgJ3ZhdWx0Jyk7XG4gICAgICAgIGQub25DaGFuZ2UoKHYpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHNpdGUucHVibGlzaFNjb3BlID0gdiBhcyAndmF1bHQnIHwgJ3NlbGVjdGVkJztcbiAgICAgICAgICB1cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIH0pKCk7IH0pO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBwYXRoc0NvbnRhaW5lciA9IHJvb3QuY3JlYXRlRGl2KCdub3RlZmxhcmUtcGF0aHMtY29udGFpbmVyJyk7XG4gICAgcGF0aHNDb250YWluZXIuc2V0Q3NzU3R5bGVzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAnMCcsXG4gICAgICBwYWRkaW5nUmlnaHQ6ICcwJyxcbiAgICAgIHBhZGRpbmdCb3R0b206ICcxZW0nXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgcmVuZGVyUGF0aHMgPSAoKSA9PiB7XG4gICAgICBwYXRoc0NvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgaWYgKChzaXRlLnB1Ymxpc2hTY29wZSB8fCAndmF1bHQnKSA9PT0gJ3ZhdWx0Jykge1xuICAgICAgICBwYXRoc0NvbnRhaW5lci5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHBhdGhzQ29udGFpbmVyLnNldENzc1N0eWxlcyh7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGFkZFJvdyA9IHBhdGhzQ29udGFpbmVyLmNyZWF0ZURpdignbm90ZWZsYXJlLWFkZC1wYXRoLXJvdycpO1xuICAgICAgYWRkUm93LnNldENzc1N0eWxlcyh7IG1hcmdpblRvcDogJzhweCcgfSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGFkZEJ0biA9IGFkZFJvdy5jcmVhdGVFbCgnYnV0dG9uJywgeyB0ZXh0OiAnQnJvd3NlIFZhdWx0Li4uJyB9KTtcbiAgICAgIGFkZEJ0bi5zZXRDc3NTdHlsZXMoeyB3aWR0aDogJzEwMCUnIH0pO1xuICAgICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBuZXcgUGF0aFN1Z2dlc3RNb2RhbCh0aGlzLmFwcCwgKHNlbGVjdGVkUGF0aCkgPT4geyB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKCFzaXRlLnB1Ymxpc2hQYXRocykgc2l0ZS5wdWJsaXNoUGF0aHMgPSBbXTtcbiAgICAgICAgICBpZiAoIXNpdGUucHVibGlzaFBhdGhzLmluY2x1ZGVzKHNlbGVjdGVkUGF0aCkpIHtcbiAgICAgICAgICAgIHNpdGUucHVibGlzaFBhdGhzLnB1c2goc2VsZWN0ZWRQYXRoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKCk7IH0pLm9wZW4oKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwYXRocyA9IHNpdGUucHVibGlzaFBhdGhzIHx8IFtdO1xuICAgICAgaWYgKHBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zdCBwID0gcGF0aHNDb250YWluZXIuY3JlYXRlRWwoJ3AnLCB7IHRleHQ6ICdObyBmaWxlcyBvciBmb2xkZXJzIHNlbGVjdGVkLicsIGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbicgfSk7XG4gICAgICAgIHAuc2V0Q3NzU3R5bGVzKHsgbWFyZ2luVG9wOiAnMTJweCcgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjaGlwQ29udGFpbmVyID0gcGF0aHNDb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIGNoaXBDb250YWluZXIuc2V0Q3NzU3R5bGVzKHtcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgZmxleFdyYXA6ICd3cmFwJyxcbiAgICAgICAgICBnYXA6ICc4cHgnLFxuICAgICAgICAgIG1hcmdpblRvcDogJzEycHgnLFxuICAgICAgICAgIG1heEhlaWdodDogJzE1MHB4JyxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgICBwYWRkaW5nOiAnNHB4IDAnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjaGlwID0gY2hpcENvbnRhaW5lci5jcmVhdGVEaXYoKTtcbiAgICAgICAgICBjaGlwLnNldENzc1N0eWxlcyh7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGdhcDogJzZweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNHB4IDhweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1mb3JtLWZpZWxkKScsXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJ3ZhcigtLXJhZGl1cy1zKScsXG4gICAgICAgICAgICBmb250U2l6ZTogJ3ZhcigtLWZvbnQtdWktc21hbGxlciknXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgaWNvblNwYW4gPSBjaGlwLmNyZWF0ZVNwYW4oKTtcbiAgICAgICAgICBjb25zdCBhYnN0cmFjdEZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgocGF0aHNbaV0pO1xuICAgICAgICAgIGNvbnN0IGlzRm9sZGVyID0gYWJzdHJhY3RGaWxlICYmICdjaGlsZHJlbicgaW4gYWJzdHJhY3RGaWxlO1xuICAgICAgICAgIHNldEljb24oaWNvblNwYW4sIGlzRm9sZGVyID8gJ2ZvbGRlcicgOiAnZmlsZS10ZXh0Jyk7XG4gICAgICAgICAgaWNvblNwYW4uc2V0Q3NzU3R5bGVzKHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS10ZXh0LW11dGVkKScsXG4gICAgICAgICAgICB3aWR0aDogJzE0cHgnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTRweCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBcbiAgICAgICAgICBjaGlwLmNyZWF0ZVNwYW4oeyB0ZXh0OiBwYXRoc1tpXSB9KTtcbiAgICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBjaGlwLmNyZWF0ZVNwYW4oeyBjbHM6ICdjbGlja2FibGUtaWNvbicgfSk7XG4gICAgICAgICAgc2V0SWNvbihyZW1vdmVCdG4sICd4Jyk7XG4gICAgICAgICAgcmVtb3ZlQnRuLnNldENzc1N0eWxlcyh7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwJyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTRweCcsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxNHB4J1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgdm9pZCAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgc2l0ZS5wdWJsaXNoUGF0aHM/LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICAgICAgICB9KSgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB1cGRhdGVWaXNpYmlsaXR5ID0gKCkgPT4ge1xuICAgICAgcmVuZGVyUGF0aHMoKTtcbiAgICB9O1xuICAgIHVwZGF0ZVZpc2liaWxpdHkoKTtcblxuICAgIC8vIFx1MjUwMFx1MjUwMCBBZHZhbmNlZCBDdXN0b21pemF0aW9uIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuICAgIG5ldyBTZXR0aW5nKHJvb3QpXG4gICAgICAuc2V0TmFtZSgnQWR2YW5jZWQnKVxuICAgICAgLnNldERlc2MoJ0NvbmZpZ3VyZSBtZXRhZGF0YSwgc3R5bGluZywgYW5kIGV4Y2x1c2lvbnMgZm9yIHRoaXMgc2l0ZS4nKVxuICAgICAgLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdFZGl0Jykub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgbmV3IEVkaXRTaXRlTW9kYWwodGhpcy5hcHAsIHRoaXMucGx1Z2luLCBzaXRlLCAoKSA9PiB0aGlzLnJlZnJlc2goKSkub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gXHUyNTAwXHUyNTAwIEFjdGlvbnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gICAgdGhpcy5yZW5kZXJBY3Rpb25zKHJvb3QsIHNpdGUsIGlzTGl2ZSwgaGFzRmFpbGVkLCBpc1B1Ymxpc2hpbmcpO1xuICB9XG5cbiAgLyoqIFJlbmRlciB0aGUgbGl2ZSBzdGF0dXMgZGFzaGJvYXJkIGNhcmQuICovXG4gIHByaXZhdGUgcmVuZGVyU3RhdHVzRGFzaGJvYXJkKFxuICAgIHJvb3Q6IEhUTUxFbGVtZW50LFxuICAgIHNpdGU6IFNpdGVQcm9maWxlLFxuICAgIGlzTGl2ZTogYm9vbGVhbixcbiAgICBoYXNGYWlsZWQ6IGJvb2xlYW4sXG4gICAgaXNQdWJsaXNoaW5nOiBib29sZWFuLFxuICAgIGxpdmU6IExpdmVTaXRlU3RhdHVzIHwgbnVsbCxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY2FyZCA9IHJvb3QuY3JlYXRlRGl2KCduZi1zdGF0dXMtY2FyZCcpO1xuICAgIGNhcmQuc2V0Q3NzU3R5bGVzKHtcbiAgICAgIG1hcmdpbkJvdHRvbTogJzEycHgnLFxuICAgICAgcGFkZGluZzogJzEycHggMTRweCcsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJ3ZhcigtLXJhZGl1cy1tKScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnktYWx0KScsXG4gICAgfSk7XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgUm93IDE6IFN0YXR1cyBiYWRnZSArIFJlZnJlc2ggXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gICAgY29uc3QgaGVhZGVyUm93ID0gY2FyZC5jcmVhdGVEaXYoKTtcbiAgICBoZWFkZXJSb3cuc2V0Q3NzU3R5bGVzKHtcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxuICAgIH0pO1xuXG4gICAgLy8gRGVyaXZlIHRoZSBiYWRnZSBmcm9tIHNpbmdsZSBzb3VyY2Ugb2YgdHJ1dGhcbiAgICBsZXQgYmFkZ2VFbW9qaSA9ICdcdTI2QUEnO1xuICAgIGxldCBiYWRnZVRleHQgPSAnT2ZmbGluZSc7XG4gICAgbGV0IGJhZGdlQ29sb3IgPSAndmFyKC0tdGV4dC1tdXRlZCknO1xuXG4gICAgaWYgKGlzUHVibGlzaGluZykge1xuICAgICAgYmFkZ2VFbW9qaSA9ICdcdUQ4M0RcdUREMzUnO1xuICAgICAgYmFkZ2VUZXh0ID0gJ1B1Ymxpc2hpbmdcdTIwMjYnO1xuICAgICAgYmFkZ2VDb2xvciA9ICd2YXIoLS10ZXh0LWFjY2VudCknO1xuICAgIH0gZWxzZSBpZiAoaGFzRmFpbGVkKSB7XG4gICAgICBiYWRnZUVtb2ppID0gJ1x1RDgzRFx1REQzNCc7XG4gICAgICBiYWRnZVRleHQgPSAnTGFzdCBwdWJsaXNoIGZhaWxlZCc7XG4gICAgICBiYWRnZUNvbG9yID0gJ3ZhcigtLXRleHQtZXJyb3IpJztcbiAgICB9IGVsc2UgaWYgKGlzTGl2ZSkge1xuICAgICAgLy8gSWYgd2UgaGF2ZSBsaXZlIGRhdGEsIHNob3cgdGhlIGFjdHVhbCB3b3JrZmxvdyBjb25jbHVzaW9uXG4gICAgICBpZiAobGl2ZSAmJiAhbGl2ZS5sb2FkaW5nICYmIGxpdmUud29ya2Zsb3dTdGF0dXMgPT09ICdjb21wbGV0ZWQnKSB7XG4gICAgICAgIGlmIChsaXZlLndvcmtmbG93Q29uY2x1c2lvbiA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgYmFkZ2VFbW9qaSA9ICdcdUQ4M0RcdURGRTInO1xuICAgICAgICAgIGJhZGdlVGV4dCA9ICdMaXZlJztcbiAgICAgICAgICBiYWRnZUNvbG9yID0gJ3ZhcigtLXRleHQtc3VjY2VzcyknO1xuICAgICAgICB9IGVsc2UgaWYgKGxpdmUud29ya2Zsb3dDb25jbHVzaW9uID09PSAnZmFpbHVyZScpIHtcbiAgICAgICAgICBiYWRnZUVtb2ppID0gJ1x1RDgzRFx1REQzNCc7XG4gICAgICAgICAgYmFkZ2VUZXh0ID0gc2l0ZS5ob3N0aW5nUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJyA/ICdCdWlsZCBmYWlsZWQgb24gQ2xvdWRmbGFyZScgOiAnQnVpbGQgZmFpbGVkIG9uIEdpdEh1Yic7XG4gICAgICAgICAgYmFkZ2VDb2xvciA9ICd2YXIoLS10ZXh0LWVycm9yKSc7XG4gICAgICAgIH0gZWxzZSBpZiAobGl2ZS53b3JrZmxvd0NvbmNsdXNpb24gPT09ICdjYW5jZWxsZWQnKSB7XG4gICAgICAgICAgYmFkZ2VFbW9qaSA9ICdcdUQ4M0RcdURGRTEnO1xuICAgICAgICAgIGJhZGdlVGV4dCA9ICdCdWlsZCBjYW5jZWxsZWQnO1xuICAgICAgICAgIGJhZGdlQ29sb3IgPSAndmFyKC0tY29sb3IteWVsbG93KSc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobGl2ZSAmJiBsaXZlLndvcmtmbG93U3RhdHVzID09PSAnaW5fcHJvZ3Jlc3MnKSB7XG4gICAgICAgIGJhZGdlRW1vamkgPSAnXHVEODNEXHVERDM1JztcbiAgICAgICAgYmFkZ2VUZXh0ID0gc2l0ZS5ob3N0aW5nUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJyA/ICdCdWlsZGluZyBvbiBDbG91ZGZsYXJlXHUyMDI2JyA6ICdCdWlsZGluZyBvbiBHaXRIdWJcdTIwMjYnO1xuICAgICAgICBiYWRnZUNvbG9yID0gJ3ZhcigtLXRleHQtYWNjZW50KSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYWRnZUVtb2ppID0gJ1x1RDgzRFx1REZFMic7XG4gICAgICAgIGJhZGdlVGV4dCA9ICdMaXZlJztcbiAgICAgICAgYmFkZ2VDb2xvciA9ICd2YXIoLS10ZXh0LXN1Y2Nlc3MpJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBiYWRnZUVsID0gaGVhZGVyUm93LmNyZWF0ZVNwYW4oKTtcbiAgICBiYWRnZUVsLnNldENzc1N0eWxlcyh7IGZvbnRXZWlnaHQ6ICc2MDAnLCBjb2xvcjogYmFkZ2VDb2xvciwgZm9udFNpemU6ICd2YXIoLS1mb250LXVpLW1lZGl1bSknIH0pO1xuICAgIGJhZGdlRWwuc2V0VGV4dChgJHtiYWRnZUVtb2ppfSAke2JhZGdlVGV4dH1gKTtcblxuICAgIC8vIFJlZnJlc2ggYnV0dG9uIChyaWdodCBzaWRlKVxuICAgIGNvbnN0IHJlZnJlc2hCdG4gPSBoZWFkZXJSb3cuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogbGl2ZT8ubG9hZGluZyA/ICdcdTIwMjYnIDogJ1x1MjFCQiBSZWZyZXNoJyB9KTtcbiAgICByZWZyZXNoQnRuLnNldENzc1N0eWxlcyh7IGZvbnRTaXplOiAndmFyKC0tZm9udC11aS1zbWFsbGVyKScsIHBhZGRpbmc6ICcycHggOHB4JyB9KTtcbiAgICBpZiAobGl2ZT8ubG9hZGluZykgcmVmcmVzaEJ0bi5zZXRBdHRyKCdkaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgcmVmcmVzaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IHMgPSB0aGlzLnBsdWdpbi5nZXRBY3RpdmVTaXRlKCk7XG4gICAgICBpZiAocykgdm9pZCB0aGlzLnBsdWdpbi5mZXRjaExpdmVTdGF0dXMocyk7XG4gICAgfSk7XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgUm93IDI6IERldGFpbHMgZ3JpZCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICBjb25zdCBncmlkID0gY2FyZC5jcmVhdGVEaXYoKTtcbiAgICBncmlkLnNldENzc1N0eWxlcyh7XG4gICAgICBkaXNwbGF5OiAnZ3JpZCcsXG4gICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAnMWZyIDFmcicsXG4gICAgICBnYXA6ICc2cHggMTZweCcsXG4gICAgICBmb250U2l6ZTogJ3ZhcigtLWZvbnQtdWktc21hbGxlciknLFxuICAgICAgY29sb3I6ICd2YXIoLS10ZXh0LW11dGVkKScsXG4gICAgfSk7XG5cbiAgICBjb25zdCBhZGRSb3cgPSAobGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZywgaHJlZj86IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgbGFiZWxFbCA9IGdyaWQuY3JlYXRlU3Bhbih7IHRleHQ6IGxhYmVsIH0pO1xuICAgICAgbGFiZWxFbC5zZXRDc3NTdHlsZXMoeyBmb250V2VpZ2h0OiAnNTAwJywgY29sb3I6ICd2YXIoLS10ZXh0LW5vcm1hbCknIH0pO1xuICAgICAgaWYgKGhyZWYgJiYgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgbGlua0VsID0gZ3JpZC5jcmVhdGVFbCgnYScsIHsgdGV4dDogdmFsdWUsIGhyZWYgfSk7XG4gICAgICAgIGxpbmtFbC5zZXRDc3NTdHlsZXMoeyBjb2xvcjogJ3ZhcigtLXRleHQtYWNjZW50KScsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCB3aGl0ZVNwYWNlOiAnbm93cmFwJywgZGlzcGxheTogJ2Jsb2NrJyB9KTtcbiAgICAgICAgbGlua0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB3aW5kb3cub3BlbihocmVmLCAnX2JsYW5rJyk7IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsRWwgPSBncmlkLmNyZWF0ZVNwYW4oeyB0ZXh0OiB2YWx1ZSB8fCAnXHUyMDE0JyB9KTtcbiAgICAgICAgdmFsRWwuc2V0Q3NzU3R5bGVzKHsgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIHdoaXRlU3BhY2U6ICdub3dyYXAnIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBTaXRlIFVSTFxuICAgIGFkZFJvdygnU2l0ZSBVUkwnLCBzaXRlLnNpdGVVcmwgPyBzaXRlLnNpdGVVcmwgOiAnXHUyMDE0Jywgc2l0ZS5zaXRlVXJsID8gYGh0dHBzOi8vJHtzaXRlLnNpdGVVcmwucmVwbGFjZSgvXmh0dHBzPzpcXC9cXC8vLCAnJyl9YCA6IHVuZGVmaW5lZCk7XG5cbiAgICAvLyBIb3N0XG4gICAgY29uc3QgaG9zdExhYmVsID0gc2l0ZS5ob3N0aW5nUHJvdmlkZXIgPT09ICdjbG91ZGZsYXJlJyA/ICdDbG91ZGZsYXJlIFBhZ2VzJ1xuICAgICAgOiBzaXRlLmhvc3RpbmdQcm92aWRlciA9PT0gJ2dpdGh1Yi1wYWdlcycgPyAnR2l0SHViIFBhZ2VzJ1xuICAgICAgOiBzaXRlLmhvc3RpbmdQcm92aWRlcjtcbiAgICBhZGRSb3coJ0hvc3QnLCBob3N0TGFiZWwpO1xuXG4gICAgaWYgKGxpdmUgJiYgIWxpdmUubG9hZGluZykge1xuICAgICAgLy8gUmVwb3NpdG9yeSBsaW5rXG4gICAgICBhZGRSb3coXG4gICAgICAgICdSZXBvc2l0b3J5JyxcbiAgICAgICAgYCR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2l0aHViT3duZXJ9LyR7dGhpcy5wbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeX1gLFxuICAgICAgICBsaXZlLnJlcG9IdG1sVXJsIHx8IGBodHRwczovL2dpdGh1Yi5jb20vJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5naXRodWJPd25lcn0vJHt0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXN0ZXJSZXBvc2l0b3J5fWAsXG4gICAgICApO1xuXG4gICAgICAvLyBMYXN0IHB1c2ggdGltZVxuICAgICAgYWRkUm93KCdMYXN0IHB1c2gnLCBsaXZlLnJlcG9QdXNoZWRBdCA/IHJlbGF0aXZlVGltZShsaXZlLnJlcG9QdXNoZWRBdCkgOiAnXHUyMDE0Jyk7XG5cbiAgICAgIC8vIENvbW1pdFxuICAgICAgaWYgKGxpdmUuY29tbWl0U2hhKSB7XG4gICAgICAgIGFkZFJvdyhcbiAgICAgICAgICAnTGFzdCBjb21taXQnLFxuICAgICAgICAgIGAke2xpdmUuY29tbWl0U2hhfSR7bGl2ZS5jb21taXRNZXNzYWdlID8gYCBcdTIwMTQgJHtsaXZlLmNvbW1pdE1lc3NhZ2Uuc2xpY2UoMCwgNDApfWAgOiAnJ31gLFxuICAgICAgICAgIGxpdmUuY29tbWl0U2hhID8gYGh0dHBzOi8vZ2l0aHViLmNvbS8ke3RoaXMucGx1Z2luLnNldHRpbmdzLmdpdGh1Yk93bmVyfS8ke3RoaXMucGx1Z2luLnNldHRpbmdzLm1hc3RlclJlcG9zaXRvcnl9L2NvbW1pdHNgIDogdW5kZWZpbmVkLFxuICAgICAgICApO1xuICAgICAgICBhZGRSb3coJ0NvbW1pdHRlZCcsIHJlbGF0aXZlVGltZShsaXZlLmNvbW1pdERhdGUpKTtcbiAgICAgIH1cblxuICAgICAgLy8gV29ya2Zsb3cgcnVuXG4gICAgICBpZiAoKHNpdGUuaG9zdGluZ1Byb3ZpZGVyID09PSAnZ2l0aHViLXBhZ2VzJyB8fCBzaXRlLmhvc3RpbmdQcm92aWRlciA9PT0gJ2Nsb3VkZmxhcmUnKSAmJiBsaXZlLndvcmtmbG93U3RhdHVzKSB7XG4gICAgICAgIGNvbnN0IHdmTGFiZWwgPSBsaXZlLndvcmtmbG93U3RhdHVzID09PSAnaW5fcHJvZ3Jlc3MnID8gJ1x1RDgzRFx1REQwNCBCdWlsZGluZ1x1MjAyNidcbiAgICAgICAgICA6IGxpdmUud29ya2Zsb3dDb25jbHVzaW9uID09PSAnc3VjY2VzcycgPyAnXHUyNzA1IFBhc3NlZCdcbiAgICAgICAgICA6IGxpdmUud29ya2Zsb3dDb25jbHVzaW9uID09PSAnZmFpbHVyZScgPyAnXHUyNzRDIEZhaWxlZCdcbiAgICAgICAgICA6IGxpdmUud29ya2Zsb3dDb25jbHVzaW9uID09PSAnY2FuY2VsbGVkJyA/ICdcdTI2RDQgQ2FuY2VsbGVkJ1xuICAgICAgICAgIDogbGl2ZS53b3JrZmxvd1N0YXR1cztcbiAgICAgICAgYWRkUm93KCdCdWlsZCcsIHdmTGFiZWwsIGxpdmUud29ya2Zsb3dVcmwgfHwgdW5kZWZpbmVkKTtcbiAgICAgICAgYWRkUm93KCdCdWlsZCByYW4nLCByZWxhdGl2ZVRpbWUobGl2ZS53b3JrZmxvd1VwZGF0ZWRBdCkpO1xuICAgICAgfVxuXG4gICAgICAvLyBGZXRjaGVkIGF0XG4gICAgICBpZiAobGl2ZS5mZXRjaGVkQXQpIHtcbiAgICAgICAgY29uc3QgZmV0Y2hlZEVsID0gY2FyZC5jcmVhdGVFbCgncCcsIHsgdGV4dDogYFN0YXR1cyBmZXRjaGVkICR7cmVsYXRpdmVUaW1lKGxpdmUuZmV0Y2hlZEF0KX1gIH0pO1xuICAgICAgICBmZXRjaGVkRWwuc2V0Q3NzU3R5bGVzKHsgbWFyZ2luOiAnOHB4IDAgMCAwJywgZm9udFNpemU6ICd2YXIoLS1mb250LXVpLXNtYWxsZXIpJywgY29sb3I6ICd2YXIoLS10ZXh0LWZhaW50KScgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChsaXZlPy5sb2FkaW5nKSB7XG4gICAgICBjb25zdCBsb2FkaW5nRWwgPSBjYXJkLmNyZWF0ZUVsKCdwJywgeyB0ZXh0OiAnRmV0Y2hpbmcgbGl2ZSBzdGF0dXNcdTIwMjYnIH0pO1xuICAgICAgbG9hZGluZ0VsLnNldENzc1N0eWxlcyh7IG1hcmdpbjogJzZweCAwIDAgMCcsIGZvbnRTaXplOiAndmFyKC0tZm9udC11aS1zbWFsbGVyKScsIGNvbG9yOiAndmFyKC0tdGV4dC1tdXRlZCknIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBsaXZlIGRhdGEgeWV0IFx1MjAxNCBzaG93IGNhY2hlZCBpbmZvXG4gICAgICBhZGRSb3coXG4gICAgICAgICdSZXBvc2l0b3J5JyxcbiAgICAgICAgYCR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2l0aHViT3duZXJ9LyR7dGhpcy5wbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeX1gLFxuICAgICAgICBgaHR0cHM6Ly9naXRodWIuY29tLyR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2l0aHViT3duZXJ9LyR7dGhpcy5wbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeX1gLFxuICAgICAgKTtcbiAgICAgIGlmIChzaXRlLmxhc3RQdWJsaXNoZWQpIHtcbiAgICAgICAgYWRkUm93KCdMYXN0IHB1Ymxpc2hlZCcsIHJlbGF0aXZlVGltZShzaXRlLmxhc3RQdWJsaXNoZWQpKTtcbiAgICAgICAgYWRkUm93KCdOb3RlcycsIFN0cmluZyhzaXRlLmxhc3ROb3RlQ291bnQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgRXJyb3IgZGlzcGxheSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICBpZiAoaGFzRmFpbGVkICYmIHNpdGUubGFzdFB1Ymxpc2hFcnJvcikge1xuICAgICAgY29uc3QgZXJyRWwgPSBjYXJkLmNyZWF0ZUVsKCdwJywgeyB0ZXh0OiBgXHUyNkEwICR7c2l0ZS5sYXN0UHVibGlzaEVycm9yfWAgfSk7XG4gICAgICBlcnJFbC5zZXRDc3NTdHlsZXMoe1xuICAgICAgICBtYXJnaW46ICc4cHggMCAwIDAnLFxuICAgICAgICBmb250U2l6ZTogJ3ZhcigtLWZvbnQtdWktc21hbGxlciknLFxuICAgICAgICBjb2xvcjogJ3ZhcigtLXRleHQtZXJyb3IpJyxcbiAgICAgICAgd29yZEJyZWFrOiAnYnJlYWstd29yZCcsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBcdTI1MDBcdTI1MDAgQmFja3VwIHN0YXR1cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlQmFja3VwKSB7XG4gICAgICBjb25zdCBiYWNrdXBFbCA9IGNhcmQuY3JlYXRlRWwoJ3AnKTtcbiAgICAgIGJhY2t1cEVsLnNldENzc1N0eWxlcyh7IG1hcmdpbjogJzhweCAwIDAgMCcsIGZvbnRTaXplOiAndmFyKC0tZm9udC11aS1zbWFsbGVyKScsIGNvbG9yOiAndmFyKC0tdGV4dC1tdXRlZCknLCBib3JkZXJUb3A6ICcxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpJywgcGFkZGluZ1RvcDogJzhweCcgfSk7XG4gICAgICBjb25zdCBiYWNrdXBUZXh0ID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MuYmFja3VwLmxhc3RCYWNrdXBFcnJvclxuICAgICAgICA/IGBCYWNrdXA6IFx1MjZBMCAke3RoaXMucGx1Z2luLnNldHRpbmdzLmJhY2t1cC5sYXN0QmFja3VwRXJyb3J9YFxuICAgICAgICA6IHRoaXMucGx1Z2luLnNldHRpbmdzLmJhY2t1cC5sYXN0QmFja3VwQXRcbiAgICAgICAgICA/IGBCYWNrdXA6IFx1MjcxMyAke3JlbGF0aXZlVGltZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5iYWNrdXAubGFzdEJhY2t1cEF0KX1gXG4gICAgICAgICAgOiAnQmFja3VwOiBub3QgcnVuIHlldCc7XG4gICAgICBiYWNrdXBFbC5zZXRUZXh0KGJhY2t1cFRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBSZW5kZXIgdGhlIFB1Ymxpc2ggLyBVbnB1Ymxpc2ggLyBEZWxldGUgYWN0aW9uIGJ1dHRvbnMuICovXG4gIHByaXZhdGUgcmVuZGVyQWN0aW9ucyhcbiAgICByb290OiBIVE1MRWxlbWVudCxcbiAgICBzaXRlOiBTaXRlUHJvZmlsZSxcbiAgICBpc0xpdmU6IGJvb2xlYW4sXG4gICAgaGFzRmFpbGVkOiBib29sZWFuLFxuICAgIGlzUHVibGlzaGluZzogYm9vbGVhbixcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYWN0aW9uQm94ID0gcm9vdC5jcmVhdGVEaXYoJ25mLWFjdGlvbnMtYm94Jyk7XG4gICAgYWN0aW9uQm94LnNldENzc1N0eWxlcyh7XG4gICAgICBtYXJnaW5Ub3A6ICc4cHgnLFxuICAgICAgcGFkZGluZzogJzEycHgnLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1iYWNrZ3JvdW5kLXByaW1hcnktYWx0KScsXG4gICAgICBib3JkZXJSYWRpdXM6ICd2YXIoLS1yYWRpdXMtcyknLFxuICAgICAgbWFyZ2luQm90dG9tOiAnMTVweCdcbiAgICB9KTtcblxuICAgIGNvbnN0IGFjdGlvbkhlYWRpbmcgPSBuZXcgU2V0dGluZyhhY3Rpb25Cb3gpLnNldE5hbWUoJ0FjdGlvbnMnKS5zZXRIZWFkaW5nKCk7XG4gICAgYWN0aW9uSGVhZGluZy5zZXR0aW5nRWwuc2V0Q3NzU3R5bGVzKHsgYm9yZGVyOiAnbm9uZScsIHBhZGRpbmc6ICcwJywgbWFyZ2luQm90dG9tOiAnMTJweCcgfSk7XG4gICAgXG4gICAgY29uc3QgYWN0aW9uU2V0dGluZyA9IG5ldyBTZXR0aW5nKGFjdGlvbkJveCk7XG4gICAgYWN0aW9uU2V0dGluZy5zZXR0aW5nRWwuc2V0Q3NzU3R5bGVzKHsgYm9yZGVyOiAnbm9uZScsIHBhZGRpbmc6ICcwJyB9KTtcbiAgICBhY3Rpb25TZXR0aW5nLmluZm9FbC5zZXRDc3NTdHlsZXMoeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgYWN0aW9uU2V0dGluZy5jb250cm9sRWwuc2V0Q3NzU3R5bGVzKHtcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgZ2FwOiAnOHB4JyxcbiAgICAgIGZsZXhXcmFwOiAnd3JhcCcsXG4gICAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgICAgIHdpZHRoOiAnMTAwJSdcbiAgICB9KTtcblxuICAgIC8vIFx1MjUwMFx1MjUwMCBCdXR0b24gbGFiZWw6IHNpbmdsZSBzb3VyY2Ugb2YgdHJ1dGggZnJvbSBwZXJzaXN0ZWQgU2l0ZVByb2ZpbGUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXG4gICAgLy8gaGFzRmFpbGVkIFx1MjE5MiBcIlJlcHVibGlzaFwiXG4gICAgLy8gaXNMaXZlIChuZXZlciBmYWlsZWQpIFx1MjE5MiBcIlVwZGF0ZVwiXG4gICAgLy8gbmV2ZXIgcHVibGlzaGVkIFx1MjE5MiBcIlB1Ymxpc2hcIlxuICAgIGNvbnN0IHB1Ymxpc2hMYWJlbCA9IGlzUHVibGlzaGluZ1xuICAgICAgPyAnUHVibGlzaGluZ1x1MjAyNidcbiAgICAgIDogaGFzRmFpbGVkXG4gICAgICAgID8gJ1JlcHVibGlzaCdcbiAgICAgICAgOiBpc0xpdmVcbiAgICAgICAgICA/ICdVcGRhdGUnXG4gICAgICAgICAgOiAnUHVibGlzaCc7XG5cbiAgICBjb25zdCBob3N0aW5nUHJvdmlkZXIgPSBzaXRlLmhvc3RpbmdQcm92aWRlcjtcblxuICAgIGFjdGlvblNldHRpbmdcbiAgICAgIC5hZGRCdXR0b24oYiA9PiB7XG4gICAgICAgIGIuc2V0QnV0dG9uVGV4dChwdWJsaXNoTGFiZWwpO1xuICAgICAgICBpZiAoaXNQdWJsaXNoaW5nKSB7XG4gICAgICAgICAgYi5zZXREaXNhYmxlZCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiLnNldEN0YSgpO1xuICAgICAgICB9XG4gICAgICAgIGIub25DbGljaygoKSA9PiB7IHZvaWQgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBiLnNldERpc2FibGVkKHRydWUpO1xuICAgICAgICAgIGIuc2V0QnV0dG9uVGV4dCgnUHVibGlzaGluZ1x1MjAyNicpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5kb1B1Ymxpc2goKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdm9pZCB0aGlzLnJlbmRlcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkoKTsgfSk7XG4gICAgICB9KVxuICAgICAgLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgaWYgKGhvc3RpbmdQcm92aWRlciA9PT0gJ2Nsb3VkZmxhcmUnKSB7XG4gICAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdVbnB1Ymxpc2gnKTtcbiAgICAgICAgICBpZiAoIWlzTGl2ZSB8fCBpc1B1Ymxpc2hpbmcpIHtcbiAgICAgICAgICAgIGIuc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGIuYnV0dG9uRWwuYWRkQ2xhc3MoJ21vZC13YXJuaW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGIub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICBuZXcgVW5wdWJsaXNoTW9kYWwodGhpcy5hcHAsIHRoaXMucGx1Z2luLCAoKSA9PiB0aGlzLnJlZnJlc2goKSkub3BlbigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEdpdEh1YiBQYWdlcyBjYW5ub3QgYmUgcGF1c2VkIHZpYSBBUEkuXG4gICAgICAgICAgYi5zZXRCdXR0b25UZXh0KCdVbnB1Ymxpc2ggKE1hbnVhbCknKTtcbiAgICAgICAgICBpZiAoIWlzTGl2ZSB8fCBpc1B1Ymxpc2hpbmcpIHtcbiAgICAgICAgICAgIGIuc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGIuYnV0dG9uRWwuYWRkQ2xhc3MoJ21vZC13YXJuaW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGIub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICB2b2lkIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIC8vIE1hcmsgdGhlIHNpdGUgb2ZmbGluZSBsb2NhbGx5IHNvIHRoZSBwYW5lbCByZWZsZWN0cyB0aGUgY2hhbmdlLlxuICAgICAgICAgICAgICAvLyBUaGUgdXNlciBtdXN0IHN0aWxsIG1hbnVhbGx5IGRpc2FibGUgR2l0SHViIFBhZ2VzIGluIHRoZWlyIHJlcG9cbiAgICAgICAgICAgICAgLy8gc2V0dGluZ3MgXHUyMDE0IHRoaXMganVzdCBrZWVwcyBOb3RlRmxhcmUncyBzdGF0ZSBjb25zaXN0ZW50LlxuICAgICAgICAgICAgICBzaXRlLmlzUHVibGlzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICBuZXcgR2l0SHViUGFnZXNVbnB1Ymxpc2hNb2RhbChcbiAgICAgICAgICAgICAgICB0aGlzLmFwcCxcbiAgICAgICAgICAgICAgICBgaHR0cHM6Ly9naXRodWIuY29tLyR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZ2l0aHViT3duZXJ9LyR7dGhpcy5wbHVnaW4uc2V0dGluZ3MubWFzdGVyUmVwb3NpdG9yeX0vc2V0dGluZ3MvcGFnZXNgLFxuICAgICAgICAgICAgICApLm9wZW4oKTtcbiAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmFkZEJ1dHRvbihiID0+IHtcbiAgICAgICAgY29uc3QgZGVsZXRlVG9vbHRpcCA9IGhvc3RpbmdQcm92aWRlciA9PT0gJ2Nsb3VkZmxhcmUnXG4gICAgICAgICAgPyAnUmVtb3ZlcyB0aGUgQ2xvdWRmbGFyZSBQYWdlcyBwcm9qZWN0IChBUEkpIGFuZCB0aGUgc2l0ZSBmb2xkZXIgZnJvbSBHaXRIdWInXG4gICAgICAgICAgOiAnUmVtb3ZlcyB0aGUgc2l0ZSBmb2xkZXIgZnJvbSBHaXRIdWIuIEdpdEh1YiBQYWdlcyBsaW5rIG1heSByZW1haW4gXHUyMDE0IGRpc2FibGUgaXQgbWFudWFsbHkgaW4gcmVwbyBTZXR0aW5ncyBcdTIxOTIgUGFnZXMnO1xuICAgICAgICBiLnNldEJ1dHRvblRleHQoJ0RlbGV0ZScpO1xuICAgICAgICBiLnNldFRvb2x0aXAoZGVsZXRlVG9vbHRpcCk7XG4gICAgICAgIGlmIChpc1B1Ymxpc2hpbmcpIGIuc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICAgIGVsc2UgYi5idXR0b25FbC5hZGRDbGFzcygnbW9kLXdhcm5pbmcnKTtcbiAgICAgICAgYi5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICBuZXcgUmVtb3ZlU2l0ZU1vZGFsKHRoaXMuYXBwLCB0aGlzLnBsdWdpbiwgc2l0ZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgfSkub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG59IiwgIi8qKlxuICogVG9rZW4gc3RvcmFnZSBiYWNrZWQgYnkgRWxlY3Ryb24gYHNhZmVTdG9yYWdlYCwgd2hpY2ggZW5jcnlwdHMvZGVjcnlwdHMgd2l0aCBhXG4gKiBrZXkgaGVsZCBpbiB0aGUgT1Mga2V5Y2hhaW4gKG1hY09TIEtleWNoYWluIC8gV2luZG93cyBEUEFQSSAvIExpbnV4IGxpYnNlY3JldCkuXG4gKlxuICogV2UgcGVyc2lzdCBPTkxZIHRoZSBjaXBoZXJ0ZXh0IChiYXNlNjQpIGluIGBkYXRhLmpzb25gOyB0aGUgcGxhaW50ZXh0IHRva2VuXG4gKiBsaXZlcyBpbiBtZW1vcnkgYXQgcnVudGltZSBhbmQgaXMgbmV2ZXIgd3JpdHRlbiB0byBkaXNrLiBUaGlzIGtlZXBzIHRoZSB1c2VyJ3NcbiAqIEdpdEh1Yi9DbG91ZGZsYXJlIHRva2VucyBvdXQgb2YgdGhlIHBsYWludGV4dCBzZXR0aW5ncyBmaWxlLlxuICovXG5cbmludGVyZmFjZSBTYWZlU3RvcmFnZSB7XG4gIGlzRW5jcnlwdGlvbkF2YWlsYWJsZSgpOiBib29sZWFuO1xuICBlbmNyeXB0U3RyaW5nKHBsYWluOiBzdHJpbmcpOiBCdWZmZXI7XG4gIGRlY3J5cHRTdHJpbmcoYnVmOiBCdWZmZXIpOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTYWZlU3RvcmFnZSgpOiBTYWZlU3RvcmFnZSB8IG51bGwge1xuICB0cnkge1xuICAgIC8vIE9ic2lkaWFuJ3MgcmVuZGVyZXIgaGFzIG5vZGVJbnRlZ3JhdGlvbiwgc28gYHJlcXVpcmUoJ2VsZWN0cm9uJylgIHdvcmtzLlxuICAgIC8vIE5ld2VyIEVsZWN0cm9uIGV4cG9zZXMgYHNhZmVTdG9yYWdlYCBkaXJlY3RseTsgb2xkZXIgdmVyc2lvbnMgb25seSB2aWEgdGhlXG4gICAgLy8gZGVwcmVjYXRlZCBgcmVtb3RlYCBtb2R1bGUgXHUyMDE0IHRyeSBib3RoLCBmYWxsIGJhY2sgdG8gbnVsbCBpZiBuZWl0aGVyLlxuICAgIC8vIE9ic2lkaWFuIHBsdWdpbiBleGVjdXRpb24gZW52aXJvbm1lbnQgcHJvdmlkZXMgcmVxdWlyZSgnZWxlY3Ryb24nKS5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlcywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1jYWxsIC0tIHJlcXVpcmVkIHRvIGFjY2VzcyBlbGVjdHJvbiBzYWZlU3RvcmFnZSBpbiBPYnNpZGlhblxuICAgIGNvbnN0IGVsZWN0cm9uID0gcmVxdWlyZSgnZWxlY3Ryb24nKSBhcyB1bmtub3duIGFzIHtcbiAgICAgIHNhZmVTdG9yYWdlPzogU2FmZVN0b3JhZ2U7XG4gICAgICByZW1vdGU/OiB7IHNhZmVTdG9yYWdlPzogU2FmZVN0b3JhZ2UgfTtcbiAgICB9O1xuICAgIHJldHVybiBlbGVjdHJvbi5zYWZlU3RvcmFnZSA/PyBlbGVjdHJvbi5yZW1vdGU/LnNhZmVTdG9yYWdlID8/IG51bGw7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmNvbnN0IHNhZmVTdG9yYWdlID0gcmVzb2x2ZVNhZmVTdG9yYWdlKCk7XG5cbi8qKiBUcnVlIHdoZW4gdGhlIE9TLWJhY2tlZCBlbmNyeXB0aW9uIGlzIHVzYWJsZSAoZS5nLiBhIGtleXJpbmcgaXMgcHJlc2VudCkuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTZWN1cmVTdG9yYWdlQXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICB0cnkge1xuICAgIHJldHVybiAhIXNhZmVTdG9yYWdlICYmIHNhZmVTdG9yYWdlLmlzRW5jcnlwdGlvbkF2YWlsYWJsZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqIEVuY3J5cHQgYSB0b2tlbiB0byBhIGJhc2U2NCBzdHJpbmcuIEVtcHR5IGluIFx1MjE5MiBlbXB0eSBvdXQuIFRocm93cyBpZiB1bmF2YWlsYWJsZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmNyeXB0U2VjcmV0KHBsYWluOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoIXBsYWluKSByZXR1cm4gJyc7XG4gIGlmICghaXNTZWN1cmVTdG9yYWdlQXZhaWxhYmxlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlY3VyZSBzdG9yYWdlIGlzIHVuYXZhaWxhYmxlIG9uIHRoaXMgc3lzdGVtLicpO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWNhbGwsIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtbWVtYmVyLWFjY2VzcywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1yZXR1cm4gLS0gU2FmZVN0b3JhZ2UgdHlwaW5ncyBhcmUgaW5jb21wbGV0ZVxuICByZXR1cm4gc2FmZVN0b3JhZ2UhLmVuY3J5cHRTdHJpbmcocGxhaW4pLnRvU3RyaW5nKCdiYXNlNjQnKTtcbn1cblxuLyoqIERlY3J5cHQgYSBiYXNlNjQgY2lwaGVydGV4dCBiYWNrIHRvIHRoZSB0b2tlbi4gUmV0dXJucyAnJyBvbiBhbnkgZmFpbHVyZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNyeXB0U2VjcmV0KGI2NDogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKCFiNjQpIHJldHVybiAnJztcbiAgaWYgKCFpc1NlY3VyZVN0b3JhZ2VBdmFpbGFibGUoKSkgcmV0dXJuICcnO1xuICB0cnkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWNhbGwsIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtcmV0dXJuLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLW1lbWJlci1hY2Nlc3MgLS0gQnVmZmVyIHR5cGluZ3MgbWF5IGJlIG1pc3NpbmcgaW4gT2JzaWRpYW4gY29udGV4dFxuICAgIHJldHVybiBzYWZlU3RvcmFnZSEuZGVjcnlwdFN0cmluZyhCdWZmZXIuZnJvbShiNjQsICdiYXNlNjQnKSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuIiwgImltcG9ydCB7IEFwcCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IEdpdEh1YkFwaSB9IGZyb20gJy4uL2FwaS9naXRodWJBcGknO1xuaW1wb3J0IHsgQmFja3VwUmVzdWx0LCBOb3RlRmxhcmVTZXR0aW5ncywgVXBsb2FkRmlsZSB9IGZyb20gJy4uL2NvcmUvdHlwZXMnO1xuXG5jb25zdCBERUZBVUxUX0lHTk9SRV9QQVRURVJOUyA9IFtcbiAgJy5EU19TdG9yZScsXG4gICdUaHVtYnMuZGInLFxuICAnZGVza3RvcC5pbmknLFxuICAnLnRyYXNoLycsXG4gICdub2RlX21vZHVsZXMvJyxcbl07XG5cbmludGVyZmFjZSBMb2NhbEJhY2t1cEZpbGUge1xuICBjb250ZW50OiBzdHJpbmc7XG4gIHNoYTogc3RyaW5nO1xufVxuXG4vKipcbiAqIE1pcnJvcnMgdGhlIHNlbGVjdGVkIHZhdWx0IGNvbnRlbnQgdG8gcHJpdmF0ZSByZW1vdGUgc3RvcmFnZS5cbiAqIFRoZSBsb2NhbCB2YXVsdCBpcyBhdXRob3JpdGF0aXZlOyB0aGVyZSBpcyBubyBwdWxsLCBjb25mbGljdCwgYnJhbmNoLCBvclxuICogbWFudWFsIGNvbW1pdCB3b3JrZmxvdyBleHBvc2VkIHRvIHVzZXJzLlxuICovXG5leHBvcnQgY2xhc3MgQmFja3VwRW5naW5lIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhcHA6IEFwcCxcbiAgICBwcml2YXRlIHNldHRpbmdzOiBOb3RlRmxhcmVTZXR0aW5ncyxcbiAgICBwcml2YXRlIG9uUHJvZ3Jlc3M6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQgPSAoKSA9PiB7fSxcbiAgKSB7fVxuXG4gIGFzeW5jIGJhY2t1cCgpOiBQcm9taXNlPEJhY2t1cFJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3VsdDogQmFja3VwUmVzdWx0ID0geyBzdWNjZXNzOiB0cnVlLCB1cGRhdGVkOiAwLCBlcnJvcnM6IFtdIH07XG4gICAgY29uc3QgeyBnaXRodWJPd25lciwgZ2l0aHViVG9rZW4sIGJhY2t1cCB9ID0gdGhpcy5zZXR0aW5ncztcblxuICAgIGlmICghZ2l0aHViVG9rZW4gfHwgIWdpdGh1Yk93bmVyIHx8ICFiYWNrdXAucmVwb3NpdG9yeSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIHVwZGF0ZWQ6IDAsXG4gICAgICAgIGVycm9yczogWydCYWNrdXAgaXMgbm90IGNvbmZpZ3VyZWQuIE9wZW4gTm90ZUZsYXJlIHNldHRpbmdzIHRvIGZpbmlzaCBzZXR1cC4nXSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGlzUHJpdmF0ZSA9IGJhY2t1cC5yZXBvVmlzaWJpbGl0eSAhPT0gJ3B1YmxpYyc7XG4gICAgICBsZXQgZ2l0aHViID0gbmV3IEdpdEh1YkFwaShnaXRodWJUb2tlbiwgZ2l0aHViT3duZXIsIGJhY2t1cC5yZXBvc2l0b3J5LCAnbWFpbicpO1xuICAgICAgY29uc3QgcmVwb3NpdG9yeUV4aXN0cyA9IGF3YWl0IGdpdGh1Yi5yZXBvRXhpc3RzKCk7XG4gICAgICBpZiAoIXJlcG9zaXRvcnlFeGlzdHMpIHtcbiAgICAgICAgdGhpcy5vblByb2dyZXNzKCdQcmVwYXJpbmcgYmFja3VwIHN0b3JhZ2VcdTIwMjYnKTtcbiAgICAgICAgYXdhaXQgZ2l0aHViLmNyZWF0ZVJlcG8oaXNQcml2YXRlKTtcbiAgICAgICAgaWYgKCEoYXdhaXQgZ2l0aHViLndhaXRGb3JSZXBvKDMwMDAwKSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RpbWVkIG91dCB3aGlsZSBwcmVwYXJpbmcgYmFja3VwIHN0b3JhZ2UuJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNQcml2YXRlICYmICEoYXdhaXQgZ2l0aHViLmlzUmVwb1ByaXZhdGUoKSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdCYWNrdXAgc3RvcHBlZCBiZWNhdXNlIGl0cyBzdG9yYWdlIGxvY2F0aW9uIGlzIHB1YmxpYy4gUmVuYW1lIHRoYXQgcmVwb3NpdG9yeSBpbiBHaXRIdWIgb3IgbWFrZSBpdCBwcml2YXRlLCB0aGVuIHRyeSBhZ2Fpbi4nLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBsZXQgYnJhbmNoID0gJ21haW4nO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYnJhbmNoID0gYXdhaXQgZ2l0aHViLmdldERlZmF1bHRCcmFuY2goKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBSZXBvc2l0b3JpZXMgY3JlYXRlZCBieSBOb3RlRmxhcmUgdXNlIG1haW4uXG4gICAgICB9XG4gICAgICBnaXRodWIgPSBuZXcgR2l0SHViQXBpKGdpdGh1YlRva2VuLCBnaXRodWJPd25lciwgYmFja3VwLnJlcG9zaXRvcnksIGJyYW5jaCk7XG5cbiAgICAgIGNvbnN0IGxvY2FsRmlsZXMgPSBhd2FpdCB0aGlzLmNvbGxlY3RMb2NhbEZpbGVzKCk7XG4gICAgICBjb25zdCByZW1vdGVGaWxlcyA9IGF3YWl0IHRoaXMuZ2V0UmVtb3RlRmlsZXMoZ2l0aHViKTtcbiAgICAgIGNvbnN0IHVwbG9hZHM6IFVwbG9hZEZpbGVbXSA9IFtdO1xuXG4gICAgICBmb3IgKGNvbnN0IFtwYXRoLCBsb2NhbF0gb2YgbG9jYWxGaWxlcykge1xuICAgICAgICBpZiAocmVtb3RlRmlsZXMuZ2V0KHBhdGgpICE9PSBsb2NhbC5zaGEpIHtcbiAgICAgICAgICB1cGxvYWRzLnB1c2goeyBwYXRoLCBjb250ZW50OiBsb2NhbC5jb250ZW50IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlbW90ZUZpbGVzLmRlbGV0ZShwYXRoKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHJlbW90ZUZpbGVzLmtleXMoKSkge1xuICAgICAgICAvLyBTa2lwIGRlbGV0aW9uIGlmIHRoZSBmaWxlIHN0aWxsIGV4aXN0cyBsb2NhbGx5IGJ1dCB3YXMgdHJhbnNpZW50bHkgdW5yZWFkYWJsZS5cbiAgICAgICAgY29uc3QgbG9jYWxGaWxlRXhpc3RzID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHBhdGgpICE9PSBudWxsO1xuICAgICAgICBpZiAoIXRoaXMuaXNJZ25vcmVkKHBhdGgpICYmICFsb2NhbEZpbGVFeGlzdHMpIHtcbiAgICAgICAgICB1cGxvYWRzLnB1c2goeyBwYXRoLCBjb250ZW50OiBudWxsIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh1cGxvYWRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xuICAgICAgY29uc3QgY29tbWl0dGVkID0gYXdhaXQgZ2l0aHViLmNvbW1pdEZpbGVzKFxuICAgICAgICB1cGxvYWRzLFxuICAgICAgICBgTm90ZUZsYXJlIGJhY2t1cCBcdTAwQjcgJHt0aW1lc3RhbXB9YCxcbiAgICAgICAgKGRvbmUsIHRvdGFsKSA9PiB0aGlzLm9uUHJvZ3Jlc3MoYEJhY2tpbmcgdXAgJHtkb25lfS8ke3RvdGFsfVx1MjAyNmApLFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICcnLFxuICAgICAgICB7IGlzUHJpdmF0ZTogdHJ1ZSB9LFxuICAgICAgKTtcblxuICAgICAgcmVzdWx0LnN1Y2Nlc3MgPSBjb21taXR0ZWQuc3VjY2VzcztcbiAgICAgIHJlc3VsdC51cGRhdGVkID0gY29tbWl0dGVkLnVwbG9hZGVkO1xuICAgICAgcmVzdWx0LmVycm9ycyA9IGNvbW1pdHRlZC5lcnJvcnM7XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIHJlc3VsdC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICByZXN1bHQuZXJyb3JzLnB1c2goZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnQmFja3VwIGZhaWxlZC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjb2xsZWN0TG9jYWxGaWxlcygpOiBQcm9taXNlPE1hcDxzdHJpbmcsIExvY2FsQmFja3VwRmlsZT4+IHtcbiAgICBjb25zdCBmaWxlcyA9IG5ldyBNYXA8c3RyaW5nLCBMb2NhbEJhY2t1cEZpbGU+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKSkge1xuICAgICAgaWYgKHRoaXMuaXNJZ25vcmVkKGZpbGUucGF0aCkpIGNvbnRpbnVlO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWRCaW5hcnkoZmlsZSkpO1xuICAgICAgICBmaWxlcy5zZXQoZmlsZS5wYXRoLCB7XG4gICAgICAgICAgY29udGVudDogdGhpcy50b0Jhc2U2NChieXRlcyksXG4gICAgICAgICAgc2hhOiBhd2FpdCB0aGlzLmNvbXB1dGVHaXRCbG9iU2hhKGJ5dGVzKSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gQSB0cmFuc2llbnRseSB1bnJlYWRhYmxlIGZpbGUgaXMgc2tpcHBlZCB3aXRob3V0IGRlbGV0aW5nIGl0cyBiYWNrdXAuXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRSZW1vdGVGaWxlcyhnaXRodWI6IEdpdEh1YkFwaSk6IFByb21pc2U8TWFwPHN0cmluZywgc3RyaW5nPj4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0cmVlID0gYXdhaXQgZ2l0aHViLmxpc3RUcmVlKCk7XG4gICAgICByZXR1cm4gbmV3IE1hcChcbiAgICAgICAgdHJlZVxuICAgICAgICAgIC5maWx0ZXIoKGZpbGUpID0+ICF0aGlzLmlzSWdub3JlZChmaWxlLnBhdGgpKVxuICAgICAgICAgIC5tYXAoKGZpbGUpID0+IFtmaWxlLnBhdGgsIGZpbGUuc2hhXSksXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICBjb25zdCBzdGF0dXMgPSAoZXJyb3IgYXMgRXJyb3IgJiB7IHN0YXR1cz86IG51bWJlciB9KS5zdGF0dXM7XG4gICAgICBpZiAoc3RhdHVzID09PSA0MDQgfHwgKGVycm9yIGFzIEVycm9yKS5tZXNzYWdlLmluY2x1ZGVzKCc0MDQnKSkgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNJZ25vcmVkKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNvbmZpZ0RpciA9IHRoaXMuYXBwLnZhdWx0LmNvbmZpZ0RpcjtcbiAgICBpZiAocGF0aCA9PT0gY29uZmlnRGlyIHx8IHBhdGguc3RhcnRzV2l0aChgJHtjb25maWdEaXJ9L2ApKSByZXR1cm4gdHJ1ZTtcbiAgICBcbiAgICByZXR1cm4gREVGQVVMVF9JR05PUkVfUEFUVEVSTlMuc29tZSgocGF0dGVybikgPT4ge1xuICAgICAgaWYgKHBhdHRlcm4uZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICByZXR1cm4gcGF0aCA9PT0gcGF0dGVybi5zbGljZSgwLCAtMSkgfHwgcGF0aC5zdGFydHNXaXRoKHBhdHRlcm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhdGggPT09IHBhdHRlcm4gfHwgcGF0aC5lbmRzV2l0aCgnLycgKyBwYXR0ZXJuKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdG9CYXNlNjQoYnl0ZXM6IFVpbnQ4QXJyYXkpOiBzdHJpbmcge1xuICAgIGxldCBiaW5hcnkgPSAnJztcbiAgICBjb25zdCBjaHVua1NpemUgPSAweDgwMDA7XG4gICAgZm9yIChsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgYnl0ZXMubGVuZ3RoOyBvZmZzZXQgKz0gY2h1bmtTaXplKSB7XG4gICAgICBiaW5hcnkgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSguLi5ieXRlcy5zdWJhcnJheShvZmZzZXQsIG9mZnNldCArIGNodW5rU2l6ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gYnRvYShiaW5hcnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjb21wdXRlR2l0QmxvYlNoYShjb250ZW50OiBVaW50OEFycmF5KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBoZWFkZXIgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoYGJsb2IgJHtjb250ZW50LmJ5dGVMZW5ndGh9XFwwYCk7XG4gICAgY29uc3QgcGF5bG9hZCA9IG5ldyBVaW50OEFycmF5KGhlYWRlci5sZW5ndGggKyBjb250ZW50Lmxlbmd0aCk7XG4gICAgcGF5bG9hZC5zZXQoaGVhZGVyKTtcbiAgICBwYXlsb2FkLnNldChjb250ZW50LCBoZWFkZXIubGVuZ3RoKTtcbiAgICBjb25zdCBoYXNoID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoJ1NIQS0xJywgcGF5bG9hZCk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoaGFzaCkpXG4gICAgICAubWFwKChieXRlKSA9PiBieXRlLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpKVxuICAgICAgLmpvaW4oJycpO1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgTm90ZUZsYXJlUGx1Z2luIGZyb20gJy4uLy4uL21haW4nO1xuXG5leHBvcnQgY2xhc3MgQmFja3VwU2NoZWR1bGVyIHtcbiAgcHJpdmF0ZSBiYWNrdXBEZWJvdW5jZVRpbWVyOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsdWdpbjogTm90ZUZsYXJlUGx1Z2luKSB7fVxuXG4gIHB1YmxpYyByZWdpc3RlckF1dG9tYXRpb24oKTogdm9pZCB7XG4gICAgY29uc3QgeyBhcHAgfSA9IHRoaXMucGx1Z2luO1xuICAgIGNvbnN0IHF1ZXVlQWZ0ZXJDaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUJhY2t1cCB8fCAhdGhpcy5wbHVnaW4uc2V0dGluZ3MuYmFja3VwLmJhY2t1cE9uQ2hhbmdlKSByZXR1cm47XG4gICAgICBpZiAodGhpcy5iYWNrdXBEZWJvdW5jZVRpbWVyICE9PSBudWxsKSB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuYmFja3VwRGVib3VuY2VUaW1lcik7XG4gICAgICB0aGlzLmJhY2t1cERlYm91bmNlVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYmFja3VwRGVib3VuY2VUaW1lciA9IG51bGw7XG4gICAgICAgIHZvaWQgdGhpcy5wbHVnaW4uZG9CYWNrdXAodHJ1ZSk7XG4gICAgICB9LCAzMDAwMCk7XG4gICAgfTtcblxuICAgIHRoaXMucGx1Z2luLnJlZ2lzdGVyRXZlbnQoYXBwLnZhdWx0Lm9uKCdjcmVhdGUnLCBxdWV1ZUFmdGVyQ2hhbmdlKSk7XG4gICAgdGhpcy5wbHVnaW4ucmVnaXN0ZXJFdmVudChhcHAudmF1bHQub24oJ21vZGlmeScsIHF1ZXVlQWZ0ZXJDaGFuZ2UpKTtcbiAgICB0aGlzLnBsdWdpbi5yZWdpc3RlckV2ZW50KGFwcC52YXVsdC5vbignZGVsZXRlJywgcXVldWVBZnRlckNoYW5nZSkpO1xuICAgIHRoaXMucGx1Z2luLnJlZ2lzdGVyRXZlbnQoYXBwLnZhdWx0Lm9uKCdyZW5hbWUnLCBxdWV1ZUFmdGVyQ2hhbmdlKSk7XG4gICAgXG4gICAgdGhpcy5wbHVnaW4ucmVnaXN0ZXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYmFja3VwRGVib3VuY2VUaW1lciAhPT0gbnVsbCkgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLmJhY2t1cERlYm91bmNlVGltZXIpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wbHVnaW4ucmVnaXN0ZXJJbnRlcnZhbCh3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdm9pZCB0aGlzLnJ1blNjaGVkdWxlZEJhY2t1cElmRHVlKCk7XG4gICAgfSwgNjAwMDApKTtcbiAgICBcbiAgICBhcHAud29ya3NwYWNlLm9uTGF5b3V0UmVhZHkoKCkgPT4gdm9pZCB0aGlzLnJ1blNjaGVkdWxlZEJhY2t1cElmRHVlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBydW5TY2hlZHVsZWRCYWNrdXBJZkR1ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHNldHRpbmdzIH0gPSB0aGlzLnBsdWdpbjtcbiAgICBjb25zdCB7IGJhY2t1cCB9ID0gc2V0dGluZ3M7XG4gICAgaWYgKCFzZXR0aW5ncy5zZXR1cENvbXBsZXRlIHx8ICFzZXR0aW5ncy5lbmFibGVCYWNrdXAgfHwgYmFja3VwLmludGVydmFsTWludXRlcyA8PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdEF0dGVtcHQgPSBiYWNrdXAubGFzdEJhY2t1cEF0dGVtcHRBdFxuICAgICAgPyBuZXcgRGF0ZShiYWNrdXAubGFzdEJhY2t1cEF0dGVtcHRBdCkuZ2V0VGltZSgpXG4gICAgICA6IDA7XG4gICAgY29uc3QgaW50ZXJ2YWxNcyA9IGJhY2t1cC5pbnRlcnZhbE1pbnV0ZXMgKiA2MCAqIDEwMDA7XG4gICAgaWYgKCFsYXN0QXR0ZW1wdCB8fCBEYXRlLm5vdygpIC0gbGFzdEF0dGVtcHQgPj0gaW50ZXJ2YWxNcykge1xuICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uZG9CYWNrdXAodHJ1ZSk7XG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUVBLFlBQVEsWUFBWSxTQUFPO0FBQ3pCLFVBQUksT0FBTyxRQUFRLFVBQVU7QUFDM0IsZUFBTyxPQUFPLFVBQVUsR0FBRztBQUFBLE1BQzdCO0FBQ0EsVUFBSSxPQUFPLFFBQVEsWUFBWSxJQUFJLEtBQUssTUFBTSxJQUFJO0FBQ2hELGVBQU8sT0FBTyxVQUFVLE9BQU8sR0FBRyxDQUFDO0FBQUEsTUFDckM7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQU1BLFlBQVEsT0FBTyxDQUFDLE1BQU0sU0FBUyxLQUFLLE1BQU0sS0FBSyxDQUFBQSxVQUFRQSxNQUFLLFNBQVMsSUFBSTtBQU16RSxZQUFRLGVBQWUsQ0FBQyxLQUFLLEtBQUssT0FBTyxHQUFHLFVBQVU7QUFDcEQsVUFBSSxVQUFVO0FBQU8sZUFBTztBQUM1QixVQUFJLENBQUMsUUFBUSxVQUFVLEdBQUcsS0FBSyxDQUFDLFFBQVEsVUFBVSxHQUFHO0FBQUcsZUFBTztBQUMvRCxjQUFTLE9BQU8sR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLE9BQU8sSUFBSSxLQUFNO0FBQUEsSUFDekQ7QUFNQSxZQUFRLGFBQWEsQ0FBQyxPQUFPLElBQUksR0FBRyxTQUFTO0FBQzNDLFlBQU0sT0FBTyxNQUFNLE1BQU0sQ0FBQztBQUMxQixVQUFJLENBQUM7QUFBTTtBQUVYLFVBQUssUUFBUSxLQUFLLFNBQVMsUUFBUyxLQUFLLFNBQVMsVUFBVSxLQUFLLFNBQVMsU0FBUztBQUNqRixZQUFJLEtBQUssWUFBWSxNQUFNO0FBQ3pCLGVBQUssUUFBUSxPQUFPLEtBQUs7QUFDekIsZUFBSyxVQUFVO0FBQUEsUUFDakI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQU1BLFlBQVEsZUFBZSxVQUFRO0FBQzdCLFVBQUksS0FBSyxTQUFTO0FBQVMsZUFBTztBQUNsQyxVQUFLLEtBQUssVUFBVSxJQUFJLEtBQUssVUFBVSxNQUFPLEdBQUc7QUFDL0MsYUFBSyxVQUFVO0FBQ2YsZUFBTztBQUFBLE1BQ1Q7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQU1BLFlBQVEsaUJBQWlCLFdBQVM7QUFDaEMsVUFBSSxNQUFNLFNBQVM7QUFBUyxlQUFPO0FBQ25DLFVBQUksTUFBTSxZQUFZLFFBQVEsTUFBTTtBQUFRLGVBQU87QUFDbkQsVUFBSyxNQUFNLFVBQVUsSUFBSSxNQUFNLFVBQVUsTUFBTyxHQUFHO0FBQ2pELGNBQU0sVUFBVTtBQUNoQixlQUFPO0FBQUEsTUFDVDtBQUNBLFVBQUksTUFBTSxTQUFTLFFBQVEsTUFBTSxVQUFVLE1BQU07QUFDL0MsY0FBTSxVQUFVO0FBQ2hCLGVBQU87QUFBQSxNQUNUO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFNQSxZQUFRLGdCQUFnQixVQUFRO0FBQzlCLFVBQUksS0FBSyxTQUFTLFVBQVUsS0FBSyxTQUFTLFNBQVM7QUFDakQsZUFBTztBQUFBLE1BQ1Q7QUFDQSxhQUFPLEtBQUssU0FBUyxRQUFRLEtBQUssVUFBVTtBQUFBLElBQzlDO0FBTUEsWUFBUSxTQUFTLFdBQVMsTUFBTSxPQUFPLENBQUMsS0FBSyxTQUFTO0FBQ3BELFVBQUksS0FBSyxTQUFTO0FBQVEsWUFBSSxLQUFLLEtBQUssS0FBSztBQUM3QyxVQUFJLEtBQUssU0FBUztBQUFTLGFBQUssT0FBTztBQUN2QyxhQUFPO0FBQUEsSUFDVCxHQUFHLENBQUMsQ0FBQztBQU1MLFlBQVEsVUFBVSxJQUFJLFNBQVM7QUFDN0IsWUFBTSxTQUFTLENBQUM7QUFFaEIsWUFBTSxPQUFPLFNBQU87QUFDbEIsaUJBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxRQUFRLEtBQUs7QUFDbkMsZ0JBQU0sTUFBTSxJQUFJLENBQUM7QUFFakIsY0FBSSxNQUFNLFFBQVEsR0FBRyxHQUFHO0FBQ3RCLGlCQUFLLEdBQUc7QUFDUjtBQUFBLFVBQ0Y7QUFFQSxjQUFJLFFBQVEsUUFBVztBQUNyQixtQkFBTyxLQUFLLEdBQUc7QUFBQSxVQUNqQjtBQUFBLFFBQ0Y7QUFDQSxlQUFPO0FBQUEsTUFDVDtBQUVBLFdBQUssSUFBSTtBQUNULGFBQU87QUFBQSxJQUNUO0FBQUE7QUFBQTs7O0FDekhBO0FBQUEsa0RBQUFDLFNBQUE7QUFBQTtBQUVBLFFBQU0sUUFBUTtBQUVkLElBQUFBLFFBQU8sVUFBVSxDQUFDLEtBQUssVUFBVSxDQUFDLE1BQU07QUFDdEMsWUFBTSxZQUFZLENBQUMsTUFBTSxTQUFTLENBQUMsTUFBTTtBQUN2QyxjQUFNLGVBQWUsUUFBUSxpQkFBaUIsTUFBTSxlQUFlLE1BQU07QUFDekUsY0FBTSxjQUFjLEtBQUssWUFBWSxRQUFRLFFBQVEsa0JBQWtCO0FBQ3ZFLFlBQUksU0FBUztBQUViLFlBQUksS0FBSyxPQUFPO0FBQ2QsZUFBSyxnQkFBZ0IsZ0JBQWdCLE1BQU0sY0FBYyxJQUFJLEdBQUc7QUFDOUQsbUJBQU8sT0FBTyxLQUFLO0FBQUEsVUFDckI7QUFDQSxpQkFBTyxLQUFLO0FBQUEsUUFDZDtBQUVBLFlBQUksS0FBSyxPQUFPO0FBQ2QsaUJBQU8sS0FBSztBQUFBLFFBQ2Q7QUFFQSxZQUFJLEtBQUssT0FBTztBQUNkLHFCQUFXLFNBQVMsS0FBSyxPQUFPO0FBQzlCLHNCQUFVLFVBQVUsS0FBSztBQUFBLFVBQzNCO0FBQUEsUUFDRjtBQUNBLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTyxVQUFVLEdBQUc7QUFBQSxJQUN0QjtBQUFBO0FBQUE7OztBQzlCQTtBQUFBLDZDQUFBQyxTQUFBO0FBQUE7QUFTQSxJQUFBQSxRQUFPLFVBQVUsU0FBUyxLQUFLO0FBQzdCLFVBQUksT0FBTyxRQUFRLFVBQVU7QUFDM0IsZUFBTyxNQUFNLFFBQVE7QUFBQSxNQUN2QjtBQUNBLFVBQUksT0FBTyxRQUFRLFlBQVksSUFBSSxLQUFLLE1BQU0sSUFBSTtBQUNoRCxlQUFPLE9BQU8sV0FBVyxPQUFPLFNBQVMsQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUc7QUFBQSxNQUNoRTtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUE7QUFBQTs7O0FDakJBO0FBQUEsa0RBQUFDLFNBQUE7QUFBQTtBQVNBLFFBQU0sV0FBVztBQUVqQixRQUFNLGVBQWUsQ0FBQyxLQUFLLEtBQUssWUFBWTtBQUMxQyxVQUFJLFNBQVMsR0FBRyxNQUFNLE9BQU87QUFDM0IsY0FBTSxJQUFJLFVBQVUsMERBQTBEO0FBQUEsTUFDaEY7QUFFQSxVQUFJLFFBQVEsVUFBVSxRQUFRLEtBQUs7QUFDakMsZUFBTyxPQUFPLEdBQUc7QUFBQSxNQUNuQjtBQUVBLFVBQUksU0FBUyxHQUFHLE1BQU0sT0FBTztBQUMzQixjQUFNLElBQUksVUFBVSw0REFBNEQ7QUFBQSxNQUNsRjtBQUVBLFVBQUksT0FBTyxFQUFFLFlBQVksTUFBTSxHQUFHLFFBQVE7QUFDMUMsVUFBSSxPQUFPLEtBQUssZ0JBQWdCLFdBQVc7QUFDekMsYUFBSyxhQUFhLEtBQUssZ0JBQWdCO0FBQUEsTUFDekM7QUFFQSxVQUFJLFFBQVEsT0FBTyxLQUFLLFVBQVU7QUFDbEMsVUFBSSxZQUFZLE9BQU8sS0FBSyxTQUFTO0FBQ3JDLFVBQUksVUFBVSxPQUFPLEtBQUssT0FBTztBQUNqQyxVQUFJLE9BQU8sT0FBTyxLQUFLLElBQUk7QUFDM0IsVUFBSSxXQUFXLE1BQU0sTUFBTSxNQUFNLE1BQU0sUUFBUSxZQUFZLFVBQVU7QUFFckUsVUFBSSxhQUFhLE1BQU0sZUFBZSxRQUFRLEdBQUc7QUFDL0MsZUFBTyxhQUFhLE1BQU0sUUFBUSxFQUFFO0FBQUEsTUFDdEM7QUFFQSxVQUFJLElBQUksS0FBSyxJQUFJLEtBQUssR0FBRztBQUN6QixVQUFJLElBQUksS0FBSyxJQUFJLEtBQUssR0FBRztBQUV6QixVQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHO0FBQ3pCLFlBQUksU0FBUyxNQUFNLE1BQU07QUFDekIsWUFBSSxLQUFLLFNBQVM7QUFDaEIsaUJBQU8sSUFBSSxNQUFNO0FBQUEsUUFDbkI7QUFDQSxZQUFJLEtBQUssU0FBUyxPQUFPO0FBQ3ZCLGlCQUFPO0FBQUEsUUFDVDtBQUNBLGVBQU8sTUFBTSxNQUFNO0FBQUEsTUFDckI7QUFFQSxVQUFJLFdBQVcsV0FBVyxHQUFHLEtBQUssV0FBVyxHQUFHO0FBQ2hELFVBQUksUUFBUSxFQUFFLEtBQUssS0FBSyxHQUFHLEVBQUU7QUFDN0IsVUFBSSxZQUFZLENBQUM7QUFDakIsVUFBSSxZQUFZLENBQUM7QUFFakIsVUFBSSxVQUFVO0FBQ1osY0FBTSxXQUFXO0FBQ2pCLGNBQU0sU0FBUyxPQUFPLE1BQU0sR0FBRyxFQUFFO0FBQUEsTUFDbkM7QUFFQSxVQUFJLElBQUksR0FBRztBQUNULFlBQUksU0FBUyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSTtBQUNuQyxvQkFBWSxnQkFBZ0IsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLE9BQU8sSUFBSTtBQUM1RCxZQUFJLE1BQU0sSUFBSTtBQUFBLE1BQ2hCO0FBRUEsVUFBSSxLQUFLLEdBQUc7QUFDVixvQkFBWSxnQkFBZ0IsR0FBRyxHQUFHLE9BQU8sSUFBSTtBQUFBLE1BQy9DO0FBRUEsWUFBTSxZQUFZO0FBQ2xCLFlBQU0sWUFBWTtBQUNsQixZQUFNLFNBQVMsZ0JBQWdCLFdBQVcsV0FBVyxJQUFJO0FBRXpELFVBQUksS0FBSyxZQUFZLE1BQU07QUFDekIsY0FBTSxTQUFTLElBQUksTUFBTSxNQUFNO0FBQUEsTUFDakMsV0FBVyxLQUFLLFNBQVMsU0FBVSxVQUFVLFNBQVMsVUFBVSxTQUFVLEdBQUc7QUFDM0UsY0FBTSxTQUFTLE1BQU0sTUFBTSxNQUFNO0FBQUEsTUFDbkM7QUFFQSxtQkFBYSxNQUFNLFFBQVEsSUFBSTtBQUMvQixhQUFPLE1BQU07QUFBQSxJQUNmO0FBRUEsYUFBUyxnQkFBZ0IsS0FBSyxLQUFLLFNBQVM7QUFDMUMsVUFBSSxlQUFlLGVBQWUsS0FBSyxLQUFLLEtBQUssT0FBTyxPQUFPLEtBQUssQ0FBQztBQUNyRSxVQUFJLGVBQWUsZUFBZSxLQUFLLEtBQUssSUFBSSxPQUFPLE9BQU8sS0FBSyxDQUFDO0FBQ3BFLFVBQUksY0FBYyxlQUFlLEtBQUssS0FBSyxNQUFNLE1BQU0sT0FBTyxLQUFLLENBQUM7QUFDcEUsVUFBSSxjQUFjLGFBQWEsT0FBTyxXQUFXLEVBQUUsT0FBTyxZQUFZO0FBQ3RFLGFBQU8sWUFBWSxLQUFLLEdBQUc7QUFBQSxJQUM3QjtBQUVBLGFBQVMsY0FBYyxLQUFLLEtBQUs7QUFDL0IsVUFBSSxRQUFRO0FBQ1osVUFBSSxRQUFRO0FBRVosVUFBSSxPQUFPLFdBQVcsS0FBSyxLQUFLO0FBQ2hDLFVBQUksUUFBUSxvQkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDO0FBRXpCLGFBQU8sT0FBTyxRQUFRLFFBQVEsS0FBSztBQUNqQyxjQUFNLElBQUksSUFBSTtBQUNkLGlCQUFTO0FBQ1QsZUFBTyxXQUFXLEtBQUssS0FBSztBQUFBLE1BQzlCO0FBRUEsYUFBTyxXQUFXLE1BQU0sR0FBRyxLQUFLLElBQUk7QUFFcEMsYUFBTyxNQUFNLFFBQVEsUUFBUSxLQUFLO0FBQ2hDLGNBQU0sSUFBSSxJQUFJO0FBQ2QsaUJBQVM7QUFDVCxlQUFPLFdBQVcsTUFBTSxHQUFHLEtBQUssSUFBSTtBQUFBLE1BQ3RDO0FBRUEsY0FBUSxDQUFDLEdBQUcsS0FBSztBQUNqQixZQUFNLEtBQUssT0FBTztBQUNsQixhQUFPO0FBQUEsSUFDVDtBQVNBLGFBQVMsZUFBZSxPQUFPLE1BQU0sU0FBUztBQUM1QyxVQUFJLFVBQVUsTUFBTTtBQUNsQixlQUFPLEVBQUUsU0FBUyxPQUFPLE9BQU8sQ0FBQyxHQUFHLFFBQVEsRUFBRTtBQUFBLE1BQ2hEO0FBRUEsVUFBSSxTQUFTLElBQUksT0FBTyxJQUFJO0FBQzVCLFVBQUksU0FBUyxPQUFPO0FBQ3BCLFVBQUksVUFBVTtBQUNkLFVBQUksUUFBUTtBQUVaLGVBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxLQUFLO0FBQy9CLFlBQUksQ0FBQyxZQUFZLFNBQVMsSUFBSSxPQUFPLENBQUM7QUFFdEMsWUFBSSxlQUFlLFdBQVc7QUFDNUIscUJBQVc7QUFBQSxRQUViLFdBQVcsZUFBZSxPQUFPLGNBQWMsS0FBSztBQUNsRCxxQkFBVyxpQkFBaUIsWUFBWSxXQUFXLE9BQU87QUFBQSxRQUU1RCxPQUFPO0FBQ0w7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLFVBQUksT0FBTztBQUNULG1CQUFXLFFBQVEsY0FBYyxPQUFPLFFBQVE7QUFBQSxNQUNsRDtBQUVBLGFBQU8sRUFBRSxTQUFTLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTztBQUFBLElBQzNDO0FBRUEsYUFBUyxnQkFBZ0IsS0FBSyxLQUFLLEtBQUssU0FBUztBQUMvQyxVQUFJLFNBQVMsY0FBYyxLQUFLLEdBQUc7QUFDbkMsVUFBSSxTQUFTLENBQUM7QUFDZCxVQUFJLFFBQVE7QUFDWixVQUFJO0FBRUosZUFBUyxJQUFJLEdBQUcsSUFBSSxPQUFPLFFBQVEsS0FBSztBQUN0QyxZQUFJQyxPQUFNLE9BQU8sQ0FBQztBQUNsQixZQUFJLE1BQU0sZUFBZSxPQUFPLEtBQUssR0FBRyxPQUFPQSxJQUFHLEdBQUcsT0FBTztBQUM1RCxZQUFJLFFBQVE7QUFFWixZQUFJLENBQUMsSUFBSSxZQUFZLFFBQVEsS0FBSyxZQUFZLElBQUksU0FBUztBQUN6RCxjQUFJLEtBQUssTUFBTSxTQUFTLEdBQUc7QUFDekIsaUJBQUssTUFBTSxJQUFJO0FBQUEsVUFDakI7QUFFQSxlQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLGVBQUssU0FBUyxLQUFLLFVBQVUsYUFBYSxLQUFLLEtBQUs7QUFDcEQsa0JBQVFBLE9BQU07QUFDZDtBQUFBLFFBQ0Y7QUFFQSxZQUFJLElBQUksVUFBVTtBQUNoQixrQkFBUSxTQUFTQSxNQUFLLEtBQUssT0FBTztBQUFBLFFBQ3BDO0FBRUEsWUFBSSxTQUFTLFFBQVEsSUFBSSxVQUFVLGFBQWEsSUFBSSxLQUFLO0FBQ3pELGVBQU8sS0FBSyxHQUFHO0FBQ2YsZ0JBQVFBLE9BQU07QUFDZCxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU87QUFBQSxJQUNUO0FBRUEsYUFBUyxlQUFlLEtBQUssWUFBWSxRQUFRLGNBQWMsU0FBUztBQUN0RSxVQUFJLFNBQVMsQ0FBQztBQUVkLGVBQVMsT0FBTyxLQUFLO0FBQ25CLFlBQUksRUFBRSxPQUFPLElBQUk7QUFHakIsWUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsWUFBWSxVQUFVLE1BQU0sR0FBRztBQUM1RCxpQkFBTyxLQUFLLFNBQVMsTUFBTTtBQUFBLFFBQzdCO0FBR0EsWUFBSSxnQkFBZ0IsU0FBUyxZQUFZLFVBQVUsTUFBTSxHQUFHO0FBQzFELGlCQUFPLEtBQUssU0FBUyxNQUFNO0FBQUEsUUFDN0I7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFNQSxhQUFTLElBQUksR0FBRyxHQUFHO0FBQ2pCLFVBQUksTUFBTSxDQUFDO0FBQ1gsZUFBUyxJQUFJLEdBQUcsSUFBSSxFQUFFLFFBQVE7QUFBSyxZQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hELGFBQU87QUFBQSxJQUNUO0FBRUEsYUFBUyxRQUFRLEdBQUcsR0FBRztBQUNyQixhQUFPLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLO0FBQUEsSUFDbEM7QUFFQSxhQUFTLFNBQVMsS0FBSyxLQUFLLEtBQUs7QUFDL0IsYUFBTyxJQUFJLEtBQUssU0FBTyxJQUFJLEdBQUcsTUFBTSxHQUFHO0FBQUEsSUFDekM7QUFFQSxhQUFTLFdBQVcsS0FBSyxLQUFLO0FBQzVCLGFBQU8sT0FBTyxPQUFPLEdBQUcsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxPQUFPLEdBQUcsQ0FBQztBQUFBLElBQzVEO0FBRUEsYUFBUyxXQUFXLFNBQVMsT0FBTztBQUNsQyxhQUFPLFVBQVcsVUFBVSxLQUFLLElBQUksSUFBSSxLQUFLO0FBQUEsSUFDaEQ7QUFFQSxhQUFTLGFBQWEsUUFBUTtBQUM1QixVQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sRUFBRSxJQUFJO0FBQzdCLFVBQUksUUFBUSxRQUFRLEdBQUc7QUFDckIsZUFBTyxJQUFJLFNBQVMsT0FBTyxNQUFNLE9BQU8sR0FBRztBQUFBLE1BQzdDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxhQUFTLGlCQUFpQixHQUFHLEdBQUcsU0FBUztBQUN2QyxhQUFPLElBQUksQ0FBQyxHQUFJLElBQUksTUFBTSxJQUFLLEtBQUssR0FBRyxHQUFHLENBQUM7QUFBQSxJQUM3QztBQUVBLGFBQVMsV0FBVyxLQUFLO0FBQ3ZCLGFBQU8sWUFBWSxLQUFLLEdBQUc7QUFBQSxJQUM3QjtBQUVBLGFBQVMsU0FBUyxPQUFPLEtBQUssU0FBUztBQUNyQyxVQUFJLENBQUMsSUFBSSxVQUFVO0FBQ2pCLGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxPQUFPLEtBQUssSUFBSSxJQUFJLFNBQVMsT0FBTyxLQUFLLEVBQUUsTUFBTTtBQUNyRCxVQUFJLFFBQVEsUUFBUSxlQUFlO0FBRW5DLGNBQVEsTUFBTTtBQUFBLFFBQ1osS0FBSztBQUNILGlCQUFPO0FBQUEsUUFDVCxLQUFLO0FBQ0gsaUJBQU8sUUFBUSxPQUFPO0FBQUEsUUFDeEIsS0FBSztBQUNILGlCQUFPLFFBQVEsV0FBVztBQUFBLFFBQzVCLFNBQVM7QUFDUCxpQkFBTyxRQUFRLE9BQU8sSUFBSSxNQUFNLEtBQUssSUFBSTtBQUFBLFFBQzNDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFNQSxpQkFBYSxRQUFRLENBQUM7QUFDdEIsaUJBQWEsYUFBYSxNQUFPLGFBQWEsUUFBUSxDQUFDO0FBTXZELElBQUFELFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQy9SakI7QUFBQSw4Q0FBQUUsU0FBQTtBQUFBO0FBU0EsUUFBTSxPQUFPLFFBQVEsTUFBTTtBQUMzQixRQUFNLGVBQWU7QUFFckIsUUFBTSxXQUFXLFNBQU8sUUFBUSxRQUFRLE9BQU8sUUFBUSxZQUFZLENBQUMsTUFBTSxRQUFRLEdBQUc7QUFFckYsUUFBTSxZQUFZLGNBQVk7QUFDNUIsYUFBTyxXQUFTLGFBQWEsT0FBTyxPQUFPLEtBQUssSUFBSSxPQUFPLEtBQUs7QUFBQSxJQUNsRTtBQUVBLFFBQU0sZUFBZSxXQUFTO0FBQzVCLGFBQU8sT0FBTyxVQUFVLFlBQWEsT0FBTyxVQUFVLFlBQVksVUFBVTtBQUFBLElBQzlFO0FBRUEsUUFBTSxXQUFXLFNBQU8sT0FBTyxVQUFVLENBQUMsR0FBRztBQUU3QyxRQUFNLFFBQVEsV0FBUztBQUNyQixVQUFJLFFBQVEsR0FBRyxLQUFLO0FBQ3BCLFVBQUksUUFBUTtBQUNaLFVBQUksTUFBTSxDQUFDLE1BQU07QUFBSyxnQkFBUSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxVQUFJLFVBQVU7QUFBSyxlQUFPO0FBQzFCLGFBQU8sTUFBTSxFQUFFLEtBQUssTUFBTTtBQUFJO0FBQzlCLGFBQU8sUUFBUTtBQUFBLElBQ2pCO0FBRUEsUUFBTSxZQUFZLENBQUMsT0FBTyxLQUFLLFlBQVk7QUFDekMsVUFBSSxPQUFPLFVBQVUsWUFBWSxPQUFPLFFBQVEsVUFBVTtBQUN4RCxlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU8sUUFBUSxjQUFjO0FBQUEsSUFDL0I7QUFFQSxRQUFNLE1BQU0sQ0FBQyxPQUFPLFdBQVcsYUFBYTtBQUMxQyxVQUFJLFlBQVksR0FBRztBQUNqQixZQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sTUFBTSxNQUFNO0FBQ3BDLFlBQUk7QUFBTSxrQkFBUSxNQUFNLE1BQU0sQ0FBQztBQUMvQixnQkFBUyxPQUFPLE1BQU0sU0FBUyxPQUFPLFlBQVksSUFBSSxXQUFXLEdBQUc7QUFBQSxNQUN0RTtBQUNBLFVBQUksYUFBYSxPQUFPO0FBQ3RCLGVBQU8sT0FBTyxLQUFLO0FBQUEsTUFDckI7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQU0sV0FBVyxDQUFDLE9BQU8sY0FBYztBQUNyQyxVQUFJLFdBQVcsTUFBTSxDQUFDLE1BQU0sTUFBTSxNQUFNO0FBQ3hDLFVBQUksVUFBVTtBQUNaLGdCQUFRLE1BQU0sTUFBTSxDQUFDO0FBQ3JCO0FBQUEsTUFDRjtBQUNBLGFBQU8sTUFBTSxTQUFTO0FBQVcsZ0JBQVEsTUFBTTtBQUMvQyxhQUFPLFdBQVksTUFBTSxRQUFTO0FBQUEsSUFDcEM7QUFFQSxRQUFNLGFBQWEsQ0FBQyxPQUFPLFNBQVMsV0FBVztBQUM3QyxZQUFNLFVBQVUsS0FBSyxDQUFDLEdBQUcsTUFBTSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQ3pELFlBQU0sVUFBVSxLQUFLLENBQUMsR0FBRyxNQUFNLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUM7QUFFekQsVUFBSSxTQUFTLFFBQVEsVUFBVSxLQUFLO0FBQ3BDLFVBQUksWUFBWTtBQUNoQixVQUFJLFlBQVk7QUFDaEIsVUFBSTtBQUVKLFVBQUksTUFBTSxVQUFVLFFBQVE7QUFDMUIsb0JBQVksTUFBTSxVQUFVLElBQUksT0FBSyxTQUFTLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEtBQUssR0FBRztBQUFBLE1BQzVFO0FBRUEsVUFBSSxNQUFNLFVBQVUsUUFBUTtBQUMxQixvQkFBWSxLQUFLLE1BQU0sR0FBRyxNQUFNLFVBQVUsSUFBSSxPQUFLLFNBQVMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUM7QUFBQSxNQUMzRjtBQUVBLFVBQUksYUFBYSxXQUFXO0FBQzFCLGlCQUFTLEdBQUcsU0FBUyxJQUFJLFNBQVM7QUFBQSxNQUNwQyxPQUFPO0FBQ0wsaUJBQVMsYUFBYTtBQUFBLE1BQ3hCO0FBRUEsVUFBSSxRQUFRLE1BQU07QUFDaEIsZUFBTyxJQUFJLE1BQU0sR0FBRyxNQUFNO0FBQUEsTUFDNUI7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQU0sVUFBVSxDQUFDLEdBQUcsR0FBRyxXQUFXLFlBQVk7QUFDNUMsVUFBSSxXQUFXO0FBQ2IsZUFBTyxhQUFhLEdBQUcsR0FBRyxFQUFFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQztBQUFBLE1BQ3ZEO0FBRUEsVUFBSSxRQUFRLE9BQU8sYUFBYSxDQUFDO0FBQ2pDLFVBQUksTUFBTTtBQUFHLGVBQU87QUFFcEIsVUFBSSxPQUFPLE9BQU8sYUFBYSxDQUFDO0FBQ2hDLGFBQU8sSUFBSSxLQUFLLElBQUksSUFBSTtBQUFBLElBQzFCO0FBRUEsUUFBTSxVQUFVLENBQUMsT0FBTyxLQUFLLFlBQVk7QUFDdkMsVUFBSSxNQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ3hCLFlBQUksT0FBTyxRQUFRLFNBQVM7QUFDNUIsWUFBSSxTQUFTLFFBQVEsVUFBVSxLQUFLO0FBQ3BDLGVBQU8sT0FBTyxJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sTUFBTSxLQUFLLEdBQUc7QUFBQSxNQUNoRTtBQUNBLGFBQU8sYUFBYSxPQUFPLEtBQUssT0FBTztBQUFBLElBQ3pDO0FBRUEsUUFBTSxhQUFhLElBQUksU0FBUztBQUM5QixhQUFPLElBQUksV0FBVyw4QkFBOEIsS0FBSyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQUEsSUFDM0U7QUFFQSxRQUFNLGVBQWUsQ0FBQyxPQUFPLEtBQUssWUFBWTtBQUM1QyxVQUFJLFFBQVEsaUJBQWlCO0FBQU0sY0FBTSxXQUFXLENBQUMsT0FBTyxHQUFHLENBQUM7QUFDaEUsYUFBTyxDQUFDO0FBQUEsSUFDVjtBQUVBLFFBQU0sY0FBYyxDQUFDLE1BQU0sWUFBWTtBQUNyQyxVQUFJLFFBQVEsaUJBQWlCLE1BQU07QUFDakMsY0FBTSxJQUFJLFVBQVUsa0JBQWtCLElBQUksa0JBQWtCO0FBQUEsTUFDOUQ7QUFDQSxhQUFPLENBQUM7QUFBQSxJQUNWO0FBRUEsUUFBTSxjQUFjLENBQUMsT0FBTyxLQUFLLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTTtBQUMxRCxVQUFJLElBQUksT0FBTyxLQUFLO0FBQ3BCLFVBQUksSUFBSSxPQUFPLEdBQUc7QUFFbEIsVUFBSSxDQUFDLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLFVBQVUsQ0FBQyxHQUFHO0FBQ2hELFlBQUksUUFBUSxpQkFBaUI7QUFBTSxnQkFBTSxXQUFXLENBQUMsT0FBTyxHQUFHLENBQUM7QUFDaEUsZUFBTyxDQUFDO0FBQUEsTUFDVjtBQUdBLFVBQUksTUFBTTtBQUFHLFlBQUk7QUFDakIsVUFBSSxNQUFNO0FBQUcsWUFBSTtBQUVqQixVQUFJLGFBQWEsSUFBSTtBQUNyQixVQUFJLGNBQWMsT0FBTyxLQUFLO0FBQzlCLFVBQUksWUFBWSxPQUFPLEdBQUc7QUFDMUIsVUFBSSxhQUFhLE9BQU8sSUFBSTtBQUM1QixhQUFPLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxHQUFHLENBQUM7QUFFakMsVUFBSSxTQUFTLE1BQU0sV0FBVyxLQUFLLE1BQU0sU0FBUyxLQUFLLE1BQU0sVUFBVTtBQUN2RSxVQUFJLFNBQVMsU0FBUyxLQUFLLElBQUksWUFBWSxRQUFRLFVBQVUsUUFBUSxXQUFXLE1BQU0sSUFBSTtBQUMxRixVQUFJLFdBQVcsV0FBVyxTQUFTLFVBQVUsT0FBTyxLQUFLLE9BQU8sTUFBTTtBQUN0RSxVQUFJLFNBQVMsUUFBUSxhQUFhLFVBQVUsUUFBUTtBQUVwRCxVQUFJLFFBQVEsV0FBVyxTQUFTLEdBQUc7QUFDakMsZUFBTyxRQUFRLFNBQVMsT0FBTyxNQUFNLEdBQUcsU0FBUyxLQUFLLE1BQU0sR0FBRyxNQUFNLE9BQU87QUFBQSxNQUM5RTtBQUVBLFVBQUksUUFBUSxFQUFFLFdBQVcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxFQUFFO0FBQzNDLFVBQUksT0FBTyxTQUFPLE1BQU0sTUFBTSxJQUFJLGNBQWMsV0FBVyxFQUFFLEtBQUssS0FBSyxJQUFJLEdBQUcsQ0FBQztBQUMvRSxVQUFJLFFBQVEsQ0FBQztBQUNiLFVBQUksUUFBUTtBQUVaLGFBQU8sYUFBYSxLQUFLLElBQUksS0FBSyxHQUFHO0FBQ25DLFlBQUksUUFBUSxZQUFZLFFBQVEsT0FBTyxHQUFHO0FBQ3hDLGVBQUssQ0FBQztBQUFBLFFBQ1IsT0FBTztBQUNMLGdCQUFNLEtBQUssSUFBSSxPQUFPLEdBQUcsS0FBSyxHQUFHLFFBQVEsUUFBUSxDQUFDO0FBQUEsUUFDcEQ7QUFDQSxZQUFJLGFBQWEsSUFBSSxPQUFPLElBQUk7QUFDaEM7QUFBQSxNQUNGO0FBRUEsVUFBSSxRQUFRLFlBQVksTUFBTTtBQUM1QixlQUFPLE9BQU8sSUFDVixXQUFXLE9BQU8sU0FBUyxNQUFNLElBQ2pDLFFBQVEsT0FBTyxNQUFNLEVBQUUsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDO0FBQUEsTUFDdEQ7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQU0sY0FBYyxDQUFDLE9BQU8sS0FBSyxPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU07QUFDMUQsVUFBSyxDQUFDLFNBQVMsS0FBSyxLQUFLLE1BQU0sU0FBUyxLQUFPLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxTQUFTLEdBQUk7QUFDaEYsZUFBTyxhQUFhLE9BQU8sS0FBSyxPQUFPO0FBQUEsTUFDekM7QUFFQSxVQUFJLFNBQVMsUUFBUSxjQUFjLFNBQU8sT0FBTyxhQUFhLEdBQUc7QUFDakUsVUFBSSxJQUFJLEdBQUcsS0FBSyxHQUFHLFdBQVcsQ0FBQztBQUMvQixVQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDO0FBRTdCLFVBQUksYUFBYSxJQUFJO0FBQ3JCLFVBQUksTUFBTSxLQUFLLElBQUksR0FBRyxDQUFDO0FBQ3ZCLFVBQUksTUFBTSxLQUFLLElBQUksR0FBRyxDQUFDO0FBRXZCLFVBQUksUUFBUSxXQUFXLFNBQVMsR0FBRztBQUNqQyxlQUFPLFFBQVEsS0FBSyxLQUFLLE9BQU8sT0FBTztBQUFBLE1BQ3pDO0FBRUEsVUFBSSxRQUFRLENBQUM7QUFDYixVQUFJLFFBQVE7QUFFWixhQUFPLGFBQWEsS0FBSyxJQUFJLEtBQUssR0FBRztBQUNuQyxjQUFNLEtBQUssT0FBTyxHQUFHLEtBQUssQ0FBQztBQUMzQixZQUFJLGFBQWEsSUFBSSxPQUFPLElBQUk7QUFDaEM7QUFBQSxNQUNGO0FBRUEsVUFBSSxRQUFRLFlBQVksTUFBTTtBQUM1QixlQUFPLFFBQVEsT0FBTyxNQUFNLEVBQUUsTUFBTSxPQUFPLFFBQVEsQ0FBQztBQUFBLE1BQ3REO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFNLE9BQU8sQ0FBQyxPQUFPLEtBQUssTUFBTSxVQUFVLENBQUMsTUFBTTtBQUMvQyxVQUFJLE9BQU8sUUFBUSxhQUFhLEtBQUssR0FBRztBQUN0QyxlQUFPLENBQUMsS0FBSztBQUFBLE1BQ2Y7QUFFQSxVQUFJLENBQUMsYUFBYSxLQUFLLEtBQUssQ0FBQyxhQUFhLEdBQUcsR0FBRztBQUM5QyxlQUFPLGFBQWEsT0FBTyxLQUFLLE9BQU87QUFBQSxNQUN6QztBQUVBLFVBQUksT0FBTyxTQUFTLFlBQVk7QUFDOUIsZUFBTyxLQUFLLE9BQU8sS0FBSyxHQUFHLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFBQSxNQUNoRDtBQUVBLFVBQUksU0FBUyxJQUFJLEdBQUc7QUFDbEIsZUFBTyxLQUFLLE9BQU8sS0FBSyxHQUFHLElBQUk7QUFBQSxNQUNqQztBQUVBLFVBQUksT0FBTyxFQUFFLEdBQUcsUUFBUTtBQUN4QixVQUFJLEtBQUssWUFBWTtBQUFNLGFBQUssT0FBTztBQUN2QyxhQUFPLFFBQVEsS0FBSyxRQUFRO0FBRTVCLFVBQUksQ0FBQyxTQUFTLElBQUksR0FBRztBQUNuQixZQUFJLFFBQVEsUUFBUSxDQUFDLFNBQVMsSUFBSTtBQUFHLGlCQUFPLFlBQVksTUFBTSxJQUFJO0FBQ2xFLGVBQU8sS0FBSyxPQUFPLEtBQUssR0FBRyxJQUFJO0FBQUEsTUFDakM7QUFFQSxVQUFJLFNBQVMsS0FBSyxLQUFLLFNBQVMsR0FBRyxHQUFHO0FBQ3BDLGVBQU8sWUFBWSxPQUFPLEtBQUssTUFBTSxJQUFJO0FBQUEsTUFDM0M7QUFFQSxhQUFPLFlBQVksT0FBTyxLQUFLLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJO0FBQUEsSUFDbEU7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUN2UGpCO0FBQUEsZ0RBQUFDLFNBQUE7QUFBQTtBQUVBLFFBQU0sT0FBTztBQUNiLFFBQU0sUUFBUTtBQUVkLFFBQU0sVUFBVSxDQUFDLEtBQUssVUFBVSxDQUFDLE1BQU07QUFDckMsWUFBTSxPQUFPLENBQUMsTUFBTSxTQUFTLENBQUMsTUFBTTtBQUNsQyxjQUFNLGVBQWUsTUFBTSxlQUFlLE1BQU07QUFDaEQsY0FBTSxjQUFjLEtBQUssWUFBWSxRQUFRLFFBQVEsa0JBQWtCO0FBQ3ZFLGNBQU0sVUFBVSxpQkFBaUIsUUFBUSxnQkFBZ0I7QUFDekQsY0FBTSxTQUFTLFFBQVEsa0JBQWtCLE9BQU8sT0FBTztBQUN2RCxZQUFJLFNBQVM7QUFFYixZQUFJLEtBQUssV0FBVyxNQUFNO0FBQ3hCLGlCQUFPLFNBQVMsS0FBSztBQUFBLFFBQ3ZCO0FBRUEsWUFBSSxLQUFLLFlBQVksTUFBTTtBQUN6QixrQkFBUSxJQUFJLGdCQUFnQixRQUFRLEtBQUssS0FBSztBQUM5QyxpQkFBTyxTQUFTLEtBQUs7QUFBQSxRQUN2QjtBQUVBLFlBQUksS0FBSyxTQUFTLFFBQVE7QUFDeEIsaUJBQU8sVUFBVSxTQUFTLEtBQUssUUFBUTtBQUFBLFFBQ3pDO0FBRUEsWUFBSSxLQUFLLFNBQVMsU0FBUztBQUN6QixpQkFBTyxVQUFVLFNBQVMsS0FBSyxRQUFRO0FBQUEsUUFDekM7QUFFQSxZQUFJLEtBQUssU0FBUyxTQUFTO0FBQ3pCLGlCQUFPLEtBQUssS0FBSyxTQUFTLFVBQVUsS0FBSyxVQUFVLEtBQUssUUFBUTtBQUFBLFFBQ2xFO0FBRUEsWUFBSSxLQUFLLE9BQU87QUFDZCxpQkFBTyxLQUFLO0FBQUEsUUFDZDtBQUVBLFlBQUksS0FBSyxTQUFTLEtBQUssU0FBUyxHQUFHO0FBQ2pDLGdCQUFNLE9BQU8sTUFBTSxPQUFPLEtBQUssS0FBSztBQUNwQyxnQkFBTSxRQUFRLEtBQUssR0FBRyxNQUFNLEVBQUUsR0FBRyxTQUFTLE1BQU0sT0FBTyxTQUFTLE1BQU0sYUFBYSxLQUFLLENBQUM7QUFFekYsY0FBSSxNQUFNLFdBQVcsR0FBRztBQUN0QixtQkFBTyxLQUFLLFNBQVMsS0FBSyxNQUFNLFNBQVMsSUFBSSxJQUFJLEtBQUssTUFBTTtBQUFBLFVBQzlEO0FBQUEsUUFDRjtBQUVBLFlBQUksS0FBSyxPQUFPO0FBQ2QscUJBQVcsU0FBUyxLQUFLLE9BQU87QUFDOUIsc0JBQVUsS0FBSyxPQUFPLElBQUk7QUFBQSxVQUM1QjtBQUFBLFFBQ0Y7QUFFQSxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU8sS0FBSyxHQUFHO0FBQUEsSUFDakI7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUMzRGpCO0FBQUEsK0NBQUFDLFNBQUE7QUFBQTtBQUVBLFFBQU0sT0FBTztBQUNiLFFBQU0sWUFBWTtBQUNsQixRQUFNLFFBQVE7QUFFZCxRQUFNLFNBQVMsQ0FBQyxRQUFRLElBQUksUUFBUSxJQUFJLFVBQVUsVUFBVTtBQUMxRCxZQUFNLFNBQVMsQ0FBQztBQUVoQixjQUFRLENBQUMsRUFBRSxPQUFPLEtBQUs7QUFDdkIsY0FBUSxDQUFDLEVBQUUsT0FBTyxLQUFLO0FBRXZCLFVBQUksQ0FBQyxNQUFNO0FBQVEsZUFBTztBQUMxQixVQUFJLENBQUMsTUFBTSxRQUFRO0FBQ2pCLGVBQU8sVUFBVSxNQUFNLFFBQVEsS0FBSyxFQUFFLElBQUksU0FBTyxJQUFJLEdBQUcsR0FBRyxJQUFJO0FBQUEsTUFDakU7QUFFQSxpQkFBVyxRQUFRLE9BQU87QUFDeEIsWUFBSSxNQUFNLFFBQVEsSUFBSSxHQUFHO0FBQ3ZCLHFCQUFXLFNBQVMsTUFBTTtBQUN4QixtQkFBTyxLQUFLLE9BQU8sT0FBTyxPQUFPLE9BQU8sQ0FBQztBQUFBLFVBQzNDO0FBQUEsUUFDRixPQUFPO0FBQ0wsbUJBQVMsT0FBTyxPQUFPO0FBQ3JCLGdCQUFJLFlBQVksUUFBUSxPQUFPLFFBQVE7QUFBVSxvQkFBTSxJQUFJLEdBQUc7QUFDOUQsbUJBQU8sS0FBSyxNQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sTUFBTSxLQUFLLE9BQU8sSUFBSSxPQUFPLEdBQUc7QUFBQSxVQUMxRTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQ0EsYUFBTyxNQUFNLFFBQVEsTUFBTTtBQUFBLElBQzdCO0FBRUEsUUFBTSxTQUFTLENBQUMsS0FBSyxVQUFVLENBQUMsTUFBTTtBQUNwQyxZQUFNLGFBQWEsUUFBUSxlQUFlLFNBQVksTUFBTyxRQUFRO0FBRXJFLFlBQU0sT0FBTyxDQUFDLE1BQU0sU0FBUyxDQUFDLE1BQU07QUFDbEMsYUFBSyxRQUFRLENBQUM7QUFFZCxZQUFJLElBQUk7QUFDUixZQUFJLElBQUksT0FBTztBQUVmLGVBQU8sRUFBRSxTQUFTLFdBQVcsRUFBRSxTQUFTLFVBQVUsRUFBRSxRQUFRO0FBQzFELGNBQUksRUFBRTtBQUNOLGNBQUksRUFBRTtBQUFBLFFBQ1I7QUFFQSxZQUFJLEtBQUssV0FBVyxLQUFLLFFBQVE7QUFDL0IsWUFBRSxLQUFLLE9BQU8sRUFBRSxJQUFJLEdBQUcsVUFBVSxNQUFNLE9BQU8sQ0FBQyxDQUFDO0FBQ2hEO0FBQUEsUUFDRjtBQUVBLFlBQUksS0FBSyxTQUFTLFdBQVcsS0FBSyxZQUFZLFFBQVEsS0FBSyxNQUFNLFdBQVcsR0FBRztBQUM3RSxZQUFFLEtBQUssT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCO0FBQUEsUUFDRjtBQUVBLFlBQUksS0FBSyxTQUFTLEtBQUssU0FBUyxHQUFHO0FBQ2pDLGdCQUFNLE9BQU8sTUFBTSxPQUFPLEtBQUssS0FBSztBQUVwQyxjQUFJLE1BQU0sYUFBYSxHQUFHLE1BQU0sUUFBUSxNQUFNLFVBQVUsR0FBRztBQUN6RCxrQkFBTSxJQUFJLFdBQVcscUdBQXFHO0FBQUEsVUFDNUg7QUFFQSxjQUFJLFFBQVEsS0FBSyxHQUFHLE1BQU0sT0FBTztBQUNqQyxjQUFJLE1BQU0sV0FBVyxHQUFHO0FBQ3RCLG9CQUFRLFVBQVUsTUFBTSxPQUFPO0FBQUEsVUFDakM7QUFFQSxZQUFFLEtBQUssT0FBTyxFQUFFLElBQUksR0FBRyxLQUFLLENBQUM7QUFDN0IsZUFBSyxRQUFRLENBQUM7QUFDZDtBQUFBLFFBQ0Y7QUFFQSxjQUFNLFVBQVUsTUFBTSxhQUFhLElBQUk7QUFDdkMsWUFBSSxRQUFRLEtBQUs7QUFDakIsWUFBSSxRQUFRO0FBRVosZUFBTyxNQUFNLFNBQVMsV0FBVyxNQUFNLFNBQVMsVUFBVSxNQUFNLFFBQVE7QUFDdEUsa0JBQVEsTUFBTTtBQUNkLGtCQUFRLE1BQU07QUFBQSxRQUNoQjtBQUVBLGlCQUFTLElBQUksR0FBRyxJQUFJLEtBQUssTUFBTSxRQUFRLEtBQUs7QUFDMUMsZ0JBQU0sUUFBUSxLQUFLLE1BQU0sQ0FBQztBQUUxQixjQUFJLE1BQU0sU0FBUyxXQUFXLEtBQUssU0FBUyxTQUFTO0FBQ25ELGdCQUFJLE1BQU07QUFBRyxvQkFBTSxLQUFLLEVBQUU7QUFDMUIsa0JBQU0sS0FBSyxFQUFFO0FBQ2I7QUFBQSxVQUNGO0FBRUEsY0FBSSxNQUFNLFNBQVMsU0FBUztBQUMxQixjQUFFLEtBQUssT0FBTyxFQUFFLElBQUksR0FBRyxPQUFPLE9BQU8sQ0FBQztBQUN0QztBQUFBLFVBQ0Y7QUFFQSxjQUFJLE1BQU0sU0FBUyxNQUFNLFNBQVMsUUFBUTtBQUN4QyxrQkFBTSxLQUFLLE9BQU8sTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFDM0M7QUFBQSxVQUNGO0FBRUEsY0FBSSxNQUFNLE9BQU87QUFDZixpQkFBSyxPQUFPLElBQUk7QUFBQSxVQUNsQjtBQUFBLFFBQ0Y7QUFFQSxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU8sTUFBTSxRQUFRLEtBQUssR0FBRyxDQUFDO0FBQUEsSUFDaEM7QUFFQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNoSGpCO0FBQUEsa0RBQUFDLFNBQUE7QUFBQTtBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBLE1BQ2YsWUFBWTtBQUFBO0FBQUEsTUFHWixRQUFRO0FBQUE7QUFBQSxNQUNSLFFBQVE7QUFBQTtBQUFBO0FBQUEsTUFHUixrQkFBa0I7QUFBQTtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUE7QUFBQSxNQUNsQixrQkFBa0I7QUFBQTtBQUFBLE1BRWxCLHVCQUF1QjtBQUFBO0FBQUEsTUFDdkIsd0JBQXdCO0FBQUE7QUFBQSxNQUV4QixlQUFlO0FBQUE7QUFBQTtBQUFBLE1BR2YsZ0JBQWdCO0FBQUE7QUFBQSxNQUNoQixTQUFTO0FBQUE7QUFBQSxNQUNULGdCQUFnQjtBQUFBO0FBQUEsTUFDaEIsZUFBZTtBQUFBO0FBQUEsTUFDZixzQkFBc0I7QUFBQTtBQUFBLE1BQ3RCLHdCQUF3QjtBQUFBO0FBQUEsTUFDeEIsWUFBWTtBQUFBO0FBQUEsTUFDWixZQUFZO0FBQUE7QUFBQSxNQUNaLGFBQWE7QUFBQTtBQUFBLE1BQ2IsVUFBVTtBQUFBO0FBQUEsTUFDVixtQkFBbUI7QUFBQTtBQUFBLE1BQ25CLFlBQVk7QUFBQTtBQUFBLE1BQ1osdUJBQXVCO0FBQUE7QUFBQSxNQUN2QixnQkFBZ0I7QUFBQTtBQUFBLE1BQ2hCLG9CQUFvQjtBQUFBO0FBQUEsTUFDcEIsV0FBVztBQUFBO0FBQUEsTUFDWCxtQkFBbUI7QUFBQTtBQUFBLE1BQ25CLHlCQUF5QjtBQUFBO0FBQUEsTUFDekIsdUJBQXVCO0FBQUE7QUFBQSxNQUN2QiwwQkFBMEI7QUFBQTtBQUFBLE1BQzFCLGdCQUFnQjtBQUFBO0FBQUEsTUFDaEIscUJBQXFCO0FBQUE7QUFBQSxNQUNyQixjQUFjO0FBQUE7QUFBQSxNQUNkLFdBQVc7QUFBQTtBQUFBLE1BQ1gsb0JBQW9CO0FBQUE7QUFBQSxNQUNwQiwwQkFBMEI7QUFBQTtBQUFBLE1BQzFCLHdCQUF3QjtBQUFBO0FBQUEsTUFDeEIsMkJBQTJCO0FBQUE7QUFBQSxNQUMzQixnQkFBZ0I7QUFBQTtBQUFBLE1BQ2hCLG1CQUFtQjtBQUFBO0FBQUEsTUFDbkIsWUFBWTtBQUFBO0FBQUEsTUFDWixVQUFVO0FBQUE7QUFBQSxNQUNWLGlCQUFpQjtBQUFBO0FBQUEsTUFDakIsb0JBQW9CO0FBQUE7QUFBQSxNQUNwQiwrQkFBK0I7QUFBQTtBQUFBLElBQ2pDO0FBQUE7QUFBQTs7O0FDeERBO0FBQUEsOENBQUFDLFNBQUE7QUFBQTtBQUVBLFFBQU0sWUFBWTtBQU1sQixRQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixJQUFJO0FBTUosUUFBTSxRQUFRLENBQUMsT0FBTyxVQUFVLENBQUMsTUFBTTtBQUNyQyxVQUFJLE9BQU8sVUFBVSxVQUFVO0FBQzdCLGNBQU0sSUFBSSxVQUFVLG1CQUFtQjtBQUFBLE1BQ3pDO0FBRUEsWUFBTSxPQUFPLFdBQVcsQ0FBQztBQUN6QixZQUFNLE1BQU0sT0FBTyxLQUFLLGNBQWMsV0FBVyxLQUFLLElBQUksWUFBWSxLQUFLLFNBQVMsSUFBSTtBQUN4RixVQUFJLE1BQU0sU0FBUyxLQUFLO0FBQ3RCLGNBQU0sSUFBSSxZQUFZLGlCQUFpQixNQUFNLE1BQU0sOEJBQThCLEdBQUcsR0FBRztBQUFBLE1BQ3pGO0FBRUEsWUFBTSxNQUFNLEVBQUUsTUFBTSxRQUFRLE9BQU8sT0FBTyxDQUFDLEVBQUU7QUFDN0MsWUFBTSxRQUFRLENBQUMsR0FBRztBQUNsQixVQUFJLFFBQVE7QUFDWixVQUFJLE9BQU87QUFDWCxVQUFJLFdBQVc7QUFDZixZQUFNLFNBQVMsTUFBTTtBQUNyQixVQUFJLFFBQVE7QUFDWixVQUFJLFFBQVE7QUFDWixVQUFJO0FBTUosWUFBTSxVQUFVLE1BQU0sTUFBTSxPQUFPO0FBQ25DLFlBQU0sT0FBTyxVQUFRO0FBQ25CLFlBQUksS0FBSyxTQUFTLFVBQVUsS0FBSyxTQUFTLE9BQU87QUFDL0MsZUFBSyxPQUFPO0FBQUEsUUFDZDtBQUVBLFlBQUksUUFBUSxLQUFLLFNBQVMsVUFBVSxLQUFLLFNBQVMsUUFBUTtBQUN4RCxlQUFLLFNBQVMsS0FBSztBQUNuQjtBQUFBLFFBQ0Y7QUFFQSxjQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLGFBQUssU0FBUztBQUNkLGFBQUssT0FBTztBQUNaLGVBQU87QUFDUCxlQUFPO0FBQUEsTUFDVDtBQUVBLFdBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQixhQUFPLFFBQVEsUUFBUTtBQUNyQixnQkFBUSxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQzlCLGdCQUFRLFFBQVE7QUFNaEIsWUFBSSxVQUFVLGlDQUFpQyxVQUFVLHFCQUFxQjtBQUM1RTtBQUFBLFFBQ0Y7QUFNQSxZQUFJLFVBQVUsZ0JBQWdCO0FBQzVCLGVBQUssRUFBRSxNQUFNLFFBQVEsUUFBUSxRQUFRLGVBQWUsUUFBUSxNQUFNLFFBQVEsRUFBRSxDQUFDO0FBQzdFO0FBQUEsUUFDRjtBQU1BLFlBQUksVUFBVSwyQkFBMkI7QUFDdkMsZUFBSyxFQUFFLE1BQU0sUUFBUSxPQUFPLE9BQU8sTUFBTSxDQUFDO0FBQzFDO0FBQUEsUUFDRjtBQU1BLFlBQUksVUFBVSwwQkFBMEI7QUFDdEM7QUFFQSxjQUFJO0FBRUosaUJBQU8sUUFBUSxXQUFXLE9BQU8sUUFBUSxJQUFJO0FBQzNDLHFCQUFTO0FBRVQsZ0JBQUksU0FBUywwQkFBMEI7QUFDckM7QUFDQTtBQUFBLFlBQ0Y7QUFFQSxnQkFBSSxTQUFTLGdCQUFnQjtBQUMzQix1QkFBUyxRQUFRO0FBQ2pCO0FBQUEsWUFDRjtBQUVBLGdCQUFJLFNBQVMsMkJBQTJCO0FBQ3RDO0FBRUEsa0JBQUksYUFBYSxHQUFHO0FBQ2xCO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBRUEsZUFBSyxFQUFFLE1BQU0sUUFBUSxNQUFNLENBQUM7QUFDNUI7QUFBQSxRQUNGO0FBTUEsWUFBSSxVQUFVLHVCQUF1QjtBQUNuQyxrQkFBUSxLQUFLLEVBQUUsTUFBTSxTQUFTLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDekMsZ0JBQU0sS0FBSyxLQUFLO0FBQ2hCLGVBQUssRUFBRSxNQUFNLFFBQVEsTUFBTSxDQUFDO0FBQzVCO0FBQUEsUUFDRjtBQUVBLFlBQUksVUFBVSx3QkFBd0I7QUFDcEMsY0FBSSxNQUFNLFNBQVMsU0FBUztBQUMxQixpQkFBSyxFQUFFLE1BQU0sUUFBUSxNQUFNLENBQUM7QUFDNUI7QUFBQSxVQUNGO0FBQ0Esa0JBQVEsTUFBTSxJQUFJO0FBQ2xCLGVBQUssRUFBRSxNQUFNLFFBQVEsTUFBTSxDQUFDO0FBQzVCLGtCQUFRLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDOUI7QUFBQSxRQUNGO0FBTUEsWUFBSSxVQUFVLHFCQUFxQixVQUFVLHFCQUFxQixVQUFVLGVBQWU7QUFDekYsZ0JBQU0sT0FBTztBQUNiLGNBQUk7QUFFSixjQUFJLFFBQVEsZUFBZSxNQUFNO0FBQy9CLG9CQUFRO0FBQUEsVUFDVjtBQUVBLGlCQUFPLFFBQVEsV0FBVyxPQUFPLFFBQVEsSUFBSTtBQUMzQyxnQkFBSSxTQUFTLGdCQUFnQjtBQUMzQix1QkFBUyxPQUFPLFFBQVE7QUFDeEI7QUFBQSxZQUNGO0FBRUEsZ0JBQUksU0FBUyxNQUFNO0FBQ2pCLGtCQUFJLFFBQVEsZUFBZTtBQUFNLHlCQUFTO0FBQzFDO0FBQUEsWUFDRjtBQUVBLHFCQUFTO0FBQUEsVUFDWDtBQUVBLGVBQUssRUFBRSxNQUFNLFFBQVEsTUFBTSxDQUFDO0FBQzVCO0FBQUEsUUFDRjtBQU1BLFlBQUksVUFBVSx1QkFBdUI7QUFDbkM7QUFFQSxnQkFBTSxTQUFTLEtBQUssU0FBUyxLQUFLLE1BQU0sTUFBTSxFQUFFLE1BQU0sT0FBTyxNQUFNLFdBQVc7QUFDOUUsZ0JBQU0sUUFBUTtBQUFBLFlBQ1osTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLFlBQ1A7QUFBQSxZQUNBO0FBQUEsWUFDQSxRQUFRO0FBQUEsWUFDUixRQUFRO0FBQUEsWUFDUixPQUFPLENBQUM7QUFBQSxVQUNWO0FBRUEsa0JBQVEsS0FBSyxLQUFLO0FBQ2xCLGdCQUFNLEtBQUssS0FBSztBQUNoQixlQUFLLEVBQUUsTUFBTSxRQUFRLE1BQU0sQ0FBQztBQUM1QjtBQUFBLFFBQ0Y7QUFNQSxZQUFJLFVBQVUsd0JBQXdCO0FBQ3BDLGNBQUksTUFBTSxTQUFTLFNBQVM7QUFDMUIsaUJBQUssRUFBRSxNQUFNLFFBQVEsTUFBTSxDQUFDO0FBQzVCO0FBQUEsVUFDRjtBQUVBLGdCQUFNLE9BQU87QUFDYixrQkFBUSxNQUFNLElBQUk7QUFDbEIsZ0JBQU0sUUFBUTtBQUVkLGVBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQjtBQUVBLGtCQUFRLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFDOUI7QUFBQSxRQUNGO0FBTUEsWUFBSSxVQUFVLGNBQWMsUUFBUSxHQUFHO0FBQ3JDLGNBQUksTUFBTSxTQUFTLEdBQUc7QUFDcEIsa0JBQU0sU0FBUztBQUNmLGtCQUFNLE9BQU8sTUFBTSxNQUFNLE1BQU07QUFDL0Isa0JBQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLFFBQVEsT0FBTyxVQUFVLEtBQUssRUFBRSxDQUFDO0FBQUEsVUFDaEU7QUFFQSxlQUFLLEVBQUUsTUFBTSxTQUFTLE1BQU0sQ0FBQztBQUM3QixnQkFBTTtBQUNOO0FBQUEsUUFDRjtBQU1BLFlBQUksVUFBVSxZQUFZLFFBQVEsS0FBSyxNQUFNLFdBQVcsR0FBRztBQUN6RCxnQkFBTSxXQUFXLE1BQU07QUFFdkIsY0FBSSxVQUFVLEtBQUssU0FBUyxXQUFXLEdBQUc7QUFDeEMsaUJBQUssRUFBRSxNQUFNLFFBQVEsTUFBTSxDQUFDO0FBQzVCO0FBQUEsVUFDRjtBQUVBLGNBQUksS0FBSyxTQUFTLE9BQU87QUFDdkIsa0JBQU0sUUFBUSxDQUFDO0FBQ2YsaUJBQUssU0FBUztBQUNkLGlCQUFLLE9BQU87QUFFWixnQkFBSSxNQUFNLE1BQU0sV0FBVyxLQUFLLE1BQU0sTUFBTSxXQUFXLEdBQUc7QUFDeEQsb0JBQU0sVUFBVTtBQUNoQixvQkFBTSxTQUFTO0FBQ2YsbUJBQUssT0FBTztBQUNaO0FBQUEsWUFDRjtBQUVBLGtCQUFNO0FBQ04sa0JBQU0sT0FBTyxDQUFDO0FBQ2Q7QUFBQSxVQUNGO0FBRUEsY0FBSSxLQUFLLFNBQVMsU0FBUztBQUN6QixxQkFBUyxJQUFJO0FBRWIsa0JBQU0sU0FBUyxTQUFTLFNBQVMsU0FBUyxDQUFDO0FBQzNDLG1CQUFPLFNBQVMsS0FBSyxRQUFRO0FBQzdCLG1CQUFPO0FBQ1Asa0JBQU07QUFDTjtBQUFBLFVBQ0Y7QUFFQSxlQUFLLEVBQUUsTUFBTSxPQUFPLE1BQU0sQ0FBQztBQUMzQjtBQUFBLFFBQ0Y7QUFNQSxhQUFLLEVBQUUsTUFBTSxRQUFRLE1BQU0sQ0FBQztBQUFBLE1BQzlCO0FBR0EsU0FBRztBQUNELGdCQUFRLE1BQU0sSUFBSTtBQUVsQixZQUFJLE1BQU0sU0FBUyxRQUFRO0FBQ3pCLGdCQUFNLE1BQU0sUUFBUSxVQUFRO0FBQzFCLGdCQUFJLENBQUMsS0FBSyxPQUFPO0FBQ2Ysa0JBQUksS0FBSyxTQUFTO0FBQVEscUJBQUssU0FBUztBQUN4QyxrQkFBSSxLQUFLLFNBQVM7QUFBUyxxQkFBSyxVQUFVO0FBQzFDLGtCQUFJLENBQUMsS0FBSztBQUFPLHFCQUFLLE9BQU87QUFDN0IsbUJBQUssVUFBVTtBQUFBLFlBQ2pCO0FBQUEsVUFDRixDQUFDO0FBR0QsZ0JBQU0sU0FBUyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQ3JDLGdCQUFNQyxTQUFRLE9BQU8sTUFBTSxRQUFRLEtBQUs7QUFFeEMsaUJBQU8sTUFBTSxPQUFPQSxRQUFPLEdBQUcsR0FBRyxNQUFNLEtBQUs7QUFBQSxRQUM5QztBQUFBLE1BQ0YsU0FBUyxNQUFNLFNBQVM7QUFFeEIsV0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BCLGFBQU87QUFBQSxJQUNUO0FBRUEsSUFBQUQsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDMVVqQjtBQUFBLDBDQUFBRSxTQUFBO0FBQUE7QUFFQSxRQUFNLFlBQVk7QUFDbEIsUUFBTSxVQUFVO0FBQ2hCLFFBQU0sU0FBUztBQUNmLFFBQU0sUUFBUTtBQWdCZCxRQUFNLFNBQVMsQ0FBQyxPQUFPLFVBQVUsQ0FBQyxNQUFNO0FBQ3RDLFVBQUksU0FBUyxDQUFDO0FBRWQsVUFBSSxNQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ3hCLG1CQUFXLFdBQVcsT0FBTztBQUMzQixnQkFBTSxTQUFTLE9BQU8sT0FBTyxTQUFTLE9BQU87QUFDN0MsY0FBSSxNQUFNLFFBQVEsTUFBTSxHQUFHO0FBQ3pCLG1CQUFPLEtBQUssR0FBRyxNQUFNO0FBQUEsVUFDdkIsT0FBTztBQUNMLG1CQUFPLEtBQUssTUFBTTtBQUFBLFVBQ3BCO0FBQUEsUUFDRjtBQUFBLE1BQ0YsT0FBTztBQUNMLGlCQUFTLENBQUMsRUFBRSxPQUFPLE9BQU8sT0FBTyxPQUFPLE9BQU8sQ0FBQztBQUFBLE1BQ2xEO0FBRUEsVUFBSSxXQUFXLFFBQVEsV0FBVyxRQUFRLFFBQVEsWUFBWSxNQUFNO0FBQ2xFLGlCQUFTLENBQUMsR0FBRyxJQUFJLElBQUksTUFBTSxDQUFDO0FBQUEsTUFDOUI7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQWdCQSxXQUFPLFFBQVEsQ0FBQyxPQUFPLFVBQVUsQ0FBQyxNQUFNLE1BQU0sT0FBTyxPQUFPO0FBZ0I1RCxXQUFPLFlBQVksQ0FBQyxPQUFPLFVBQVUsQ0FBQyxNQUFNO0FBQzFDLFVBQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsZUFBTyxVQUFVLE9BQU8sTUFBTSxPQUFPLE9BQU8sR0FBRyxPQUFPO0FBQUEsTUFDeEQ7QUFDQSxhQUFPLFVBQVUsT0FBTyxPQUFPO0FBQUEsSUFDakM7QUFpQkEsV0FBTyxVQUFVLENBQUMsT0FBTyxVQUFVLENBQUMsTUFBTTtBQUN4QyxVQUFJLE9BQU8sVUFBVSxVQUFVO0FBQzdCLGdCQUFRLE9BQU8sTUFBTSxPQUFPLE9BQU87QUFBQSxNQUNyQztBQUNBLGFBQU8sUUFBUSxPQUFPLE9BQU87QUFBQSxJQUMvQjtBQW1CQSxXQUFPLFNBQVMsQ0FBQyxPQUFPLFVBQVUsQ0FBQyxNQUFNO0FBQ3ZDLFVBQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsZ0JBQVEsT0FBTyxNQUFNLE9BQU8sT0FBTztBQUFBLE1BQ3JDO0FBRUEsVUFBSSxTQUFTLE9BQU8sT0FBTyxPQUFPO0FBR2xDLFVBQUksUUFBUSxZQUFZLE1BQU07QUFDNUIsaUJBQVMsT0FBTyxPQUFPLE9BQU87QUFBQSxNQUNoQztBQUdBLFVBQUksUUFBUSxZQUFZLE1BQU07QUFDNUIsaUJBQVMsQ0FBQyxHQUFHLElBQUksSUFBSSxNQUFNLENBQUM7QUFBQSxNQUM5QjtBQUVBLGFBQU87QUFBQSxJQUNUO0FBa0JBLFdBQU8sU0FBUyxDQUFDLE9BQU8sVUFBVSxDQUFDLE1BQU07QUFDdkMsVUFBSSxVQUFVLE1BQU0sTUFBTSxTQUFTLEdBQUc7QUFDcEMsZUFBTyxDQUFDLEtBQUs7QUFBQSxNQUNmO0FBRUEsYUFBTyxRQUFRLFdBQVcsT0FDdEIsT0FBTyxRQUFRLE9BQU8sT0FBTyxJQUM3QixPQUFPLE9BQU8sT0FBTyxPQUFPO0FBQUEsSUFDbEM7QUFNQSxJQUFBQSxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUN6S2pCLElBQUFDLHFCQUFBO0FBQUEscURBQUFDLFNBQUE7QUFBQTtBQUVBLFFBQU0sT0FBTyxRQUFRLE1BQU07QUFDM0IsUUFBTSxZQUFZO0FBQ2xCLFFBQU0sZUFBZSxLQUFLLFNBQVM7QUFFbkMsUUFBTSxnQ0FBZ0M7QUFNdEMsUUFBTSxjQUFjO0FBQ3BCLFFBQU0sZUFBZTtBQUNyQixRQUFNLGdCQUFnQjtBQUN0QixRQUFNLGdCQUFnQjtBQUN0QixRQUFNLFdBQVc7QUFDakIsUUFBTSxRQUFRO0FBQ2QsUUFBTSxhQUFhLE1BQU0sYUFBYTtBQUN0QyxRQUFNLGVBQWUsUUFBUSxhQUFhO0FBQzFDLFFBQU0sYUFBYSxHQUFHLFdBQVcsUUFBUSxVQUFVO0FBQ25ELFFBQU0sU0FBUyxNQUFNLFdBQVc7QUFDaEMsUUFBTSxVQUFVLE1BQU0sWUFBWSxHQUFHLFVBQVU7QUFDL0MsUUFBTSxlQUFlLE1BQU0sV0FBVyxRQUFRLFVBQVU7QUFDeEQsUUFBTSxnQkFBZ0IsTUFBTSxVQUFVO0FBQ3RDLFFBQU0sZUFBZSxNQUFNLGFBQWE7QUFDeEMsUUFBTSxPQUFPLEdBQUcsS0FBSztBQUVyQixRQUFNLGNBQWM7QUFBQSxNQUNsQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQU1BLFFBQU0sZ0JBQWdCO0FBQUEsTUFDcEIsR0FBRztBQUFBLE1BRUgsZUFBZSxJQUFJLFNBQVM7QUFBQSxNQUM1QixPQUFPO0FBQUEsTUFDUCxNQUFNLEdBQUcsWUFBWTtBQUFBLE1BQ3JCLFlBQVksR0FBRyxXQUFXLFlBQVksU0FBUztBQUFBLE1BQy9DLFFBQVEsTUFBTSxXQUFXO0FBQUEsTUFDekIsU0FBUyxZQUFZLFNBQVMsS0FBSyxXQUFXLFlBQVksU0FBUztBQUFBLE1BQ25FLGNBQWMsTUFBTSxXQUFXLFlBQVksU0FBUztBQUFBLE1BQ3BELGVBQWUsTUFBTSxXQUFXLFlBQVksU0FBUztBQUFBLE1BQ3JELGNBQWMsTUFBTSxTQUFTO0FBQUEsTUFDN0IsY0FBYyxTQUFTLFNBQVM7QUFBQSxNQUNoQyxZQUFZLE9BQU8sU0FBUztBQUFBLElBQzlCO0FBTUEsUUFBTSxxQkFBcUI7QUFBQSxNQUN6QixXQUFXO0FBQUEsTUFDWCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsSUFDVjtBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBLE1BQ2Y7QUFBQSxNQUNBLFlBQVksT0FBTztBQUFBLE1BQ25CO0FBQUE7QUFBQSxNQUdBLGlCQUFpQjtBQUFBLE1BQ2pCLHlCQUF5QjtBQUFBLE1BQ3pCLHFCQUFxQjtBQUFBLE1BQ3JCLDZCQUE2QjtBQUFBLE1BQzdCLDRCQUE0QjtBQUFBLE1BQzVCLHdCQUF3QjtBQUFBO0FBQUEsTUFHeEIsY0FBYztBQUFBLFFBQ1osV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsWUFBWTtBQUFBLE1BQ2Q7QUFBQTtBQUFBLE1BR0EsUUFBUTtBQUFBO0FBQUEsTUFDUixRQUFRO0FBQUE7QUFBQTtBQUFBLE1BR1Isa0JBQWtCO0FBQUE7QUFBQSxNQUNsQixrQkFBa0I7QUFBQTtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUE7QUFBQSxNQUVsQix1QkFBdUI7QUFBQTtBQUFBLE1BQ3ZCLHdCQUF3QjtBQUFBO0FBQUEsTUFFeEIsZUFBZTtBQUFBO0FBQUE7QUFBQSxNQUdmLGdCQUFnQjtBQUFBO0FBQUEsTUFDaEIsU0FBUztBQUFBO0FBQUEsTUFDVCxxQkFBcUI7QUFBQTtBQUFBLE1BQ3JCLHNCQUFzQjtBQUFBO0FBQUEsTUFDdEIsd0JBQXdCO0FBQUE7QUFBQSxNQUN4QixZQUFZO0FBQUE7QUFBQSxNQUNaLFlBQVk7QUFBQTtBQUFBLE1BQ1osVUFBVTtBQUFBO0FBQUEsTUFDVixtQkFBbUI7QUFBQTtBQUFBLE1BQ25CLFlBQVk7QUFBQTtBQUFBLE1BQ1osdUJBQXVCO0FBQUE7QUFBQSxNQUN2QixnQkFBZ0I7QUFBQTtBQUFBLE1BQ2hCLG9CQUFvQjtBQUFBO0FBQUEsTUFDcEIsbUJBQW1CO0FBQUE7QUFBQSxNQUNuQixXQUFXO0FBQUE7QUFBQSxNQUNYLG1CQUFtQjtBQUFBO0FBQUEsTUFDbkIseUJBQXlCO0FBQUE7QUFBQSxNQUN6Qix1QkFBdUI7QUFBQTtBQUFBLE1BQ3ZCLDBCQUEwQjtBQUFBO0FBQUEsTUFDMUIsZ0JBQWdCO0FBQUE7QUFBQSxNQUNoQixxQkFBcUI7QUFBQTtBQUFBLE1BQ3JCLGNBQWM7QUFBQTtBQUFBLE1BQ2QsV0FBVztBQUFBO0FBQUEsTUFDWCxvQkFBb0I7QUFBQTtBQUFBLE1BQ3BCLDBCQUEwQjtBQUFBO0FBQUEsTUFDMUIsd0JBQXdCO0FBQUE7QUFBQSxNQUN4QiwyQkFBMkI7QUFBQTtBQUFBLE1BQzNCLGdCQUFnQjtBQUFBO0FBQUEsTUFDaEIsbUJBQW1CO0FBQUE7QUFBQSxNQUNuQixZQUFZO0FBQUE7QUFBQSxNQUNaLFVBQVU7QUFBQTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUE7QUFBQSxNQUNqQixvQkFBb0I7QUFBQTtBQUFBLE1BQ3BCLCtCQUErQjtBQUFBO0FBQUEsTUFFL0IsS0FBSyxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFNVixhQUFhLE9BQU87QUFDbEIsZUFBTztBQUFBLFVBQ0wsS0FBSyxFQUFFLE1BQU0sVUFBVSxNQUFNLGFBQWEsT0FBTyxLQUFLLE1BQU0sSUFBSSxJQUFJO0FBQUEsVUFDcEUsS0FBSyxFQUFFLE1BQU0sU0FBUyxNQUFNLE9BQU8sT0FBTyxLQUFLO0FBQUEsVUFDL0MsS0FBSyxFQUFFLE1BQU0sUUFBUSxNQUFNLE9BQU8sT0FBTyxLQUFLO0FBQUEsVUFDOUMsS0FBSyxFQUFFLE1BQU0sUUFBUSxNQUFNLE9BQU8sT0FBTyxLQUFLO0FBQUEsVUFDOUMsS0FBSyxFQUFFLE1BQU0sTUFBTSxNQUFNLE9BQU8sT0FBTyxJQUFJO0FBQUEsUUFDN0M7QUFBQSxNQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFNQSxVQUFVLE9BQU87QUFDZixlQUFPLFVBQVUsT0FBTyxnQkFBZ0I7QUFBQSxNQUMxQztBQUFBLElBQ0Y7QUFBQTtBQUFBOzs7QUN2TEEsSUFBQUMsaUJBQUE7QUFBQTtBQUFBO0FBRUEsUUFBTSxPQUFPLFFBQVEsTUFBTTtBQUMzQixRQUFNLFFBQVEsUUFBUSxhQUFhO0FBQ25DLFFBQU07QUFBQSxNQUNKO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixJQUFJO0FBRUosWUFBUSxXQUFXLFNBQU8sUUFBUSxRQUFRLE9BQU8sUUFBUSxZQUFZLENBQUMsTUFBTSxRQUFRLEdBQUc7QUFDdkYsWUFBUSxnQkFBZ0IsU0FBTyxvQkFBb0IsS0FBSyxHQUFHO0FBQzNELFlBQVEsY0FBYyxTQUFPLElBQUksV0FBVyxLQUFLLFFBQVEsY0FBYyxHQUFHO0FBQzFFLFlBQVEsY0FBYyxTQUFPLElBQUksUUFBUSw0QkFBNEIsTUFBTTtBQUMzRSxZQUFRLGlCQUFpQixTQUFPLElBQUksUUFBUSxpQkFBaUIsR0FBRztBQUVoRSxZQUFRLG9CQUFvQixTQUFPO0FBQ2pDLGFBQU8sSUFBSSxRQUFRLHdCQUF3QixXQUFTO0FBQ2xELGVBQU8sVUFBVSxPQUFPLEtBQUs7QUFBQSxNQUMvQixDQUFDO0FBQUEsSUFDSDtBQUVBLFlBQVEsc0JBQXNCLE1BQU07QUFDbEMsWUFBTSxPQUFPLFFBQVEsUUFBUSxNQUFNLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxJQUFJLE1BQU07QUFDM0QsVUFBSSxLQUFLLFdBQVcsS0FBSyxLQUFLLENBQUMsS0FBSyxLQUFNLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLEtBQUssSUFBSztBQUN6RSxlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsWUFBUSxZQUFZLGFBQVc7QUFDN0IsVUFBSSxXQUFXLE9BQU8sUUFBUSxZQUFZLFdBQVc7QUFDbkQsZUFBTyxRQUFRO0FBQUEsTUFDakI7QUFDQSxhQUFPLFVBQVUsUUFBUSxLQUFLLFFBQVE7QUFBQSxJQUN4QztBQUVBLFlBQVEsYUFBYSxDQUFDLE9BQU8sTUFBTSxZQUFZO0FBQzdDLFlBQU0sTUFBTSxNQUFNLFlBQVksTUFBTSxPQUFPO0FBQzNDLFVBQUksUUFBUTtBQUFJLGVBQU87QUFDdkIsVUFBSSxNQUFNLE1BQU0sQ0FBQyxNQUFNO0FBQU0sZUFBTyxRQUFRLFdBQVcsT0FBTyxNQUFNLE1BQU0sQ0FBQztBQUMzRSxhQUFPLEdBQUcsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssTUFBTSxNQUFNLEdBQUcsQ0FBQztBQUFBLElBQ3BEO0FBRUEsWUFBUSxlQUFlLENBQUMsT0FBTyxRQUFRLENBQUMsTUFBTTtBQUM1QyxVQUFJLFNBQVM7QUFDYixVQUFJLE9BQU8sV0FBVyxJQUFJLEdBQUc7QUFDM0IsaUJBQVMsT0FBTyxNQUFNLENBQUM7QUFDdkIsY0FBTSxTQUFTO0FBQUEsTUFDakI7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFlBQVEsYUFBYSxDQUFDLE9BQU8sUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU07QUFDeEQsWUFBTSxVQUFVLFFBQVEsV0FBVyxLQUFLO0FBQ3hDLFlBQU0sU0FBUyxRQUFRLFdBQVcsS0FBSztBQUV2QyxVQUFJLFNBQVMsR0FBRyxPQUFPLE1BQU0sS0FBSyxJQUFJLE1BQU07QUFDNUMsVUFBSSxNQUFNLFlBQVksTUFBTTtBQUMxQixpQkFBUyxVQUFVLE1BQU07QUFBQSxNQUMzQjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUE7QUFBQTs7O0FDL0RBO0FBQUEsZ0RBQUFDLFNBQUE7QUFBQTtBQUVBLFFBQU0sUUFBUTtBQUNkLFFBQU07QUFBQSxNQUNKO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUNBO0FBQUE7QUFBQSxJQUNGLElBQUk7QUFFSixRQUFNLGtCQUFrQixVQUFRO0FBQzlCLGFBQU8sU0FBUyxzQkFBc0IsU0FBUztBQUFBLElBQ2pEO0FBRUEsUUFBTSxRQUFRLFdBQVM7QUFDckIsVUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixjQUFNLFFBQVEsTUFBTSxhQUFhLFdBQVc7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFtQkEsUUFBTSxPQUFPLENBQUMsT0FBTyxZQUFZO0FBQy9CLFlBQU0sT0FBTyxXQUFXLENBQUM7QUFFekIsWUFBTSxTQUFTLE1BQU0sU0FBUztBQUM5QixZQUFNLFlBQVksS0FBSyxVQUFVLFFBQVEsS0FBSyxjQUFjO0FBQzVELFlBQU0sVUFBVSxDQUFDO0FBQ2pCLFlBQU0sU0FBUyxDQUFDO0FBQ2hCLFlBQU0sUUFBUSxDQUFDO0FBRWYsVUFBSSxNQUFNO0FBQ1YsVUFBSSxRQUFRO0FBQ1osVUFBSSxRQUFRO0FBQ1osVUFBSSxZQUFZO0FBQ2hCLFVBQUksVUFBVTtBQUNkLFVBQUksWUFBWTtBQUNoQixVQUFJLFNBQVM7QUFDYixVQUFJLFlBQVk7QUFDaEIsVUFBSSxhQUFhO0FBQ2pCLFVBQUksZUFBZTtBQUNuQixVQUFJLGNBQWM7QUFDbEIsVUFBSSxVQUFVO0FBQ2QsVUFBSSxpQkFBaUI7QUFDckIsVUFBSSxXQUFXO0FBQ2YsVUFBSSxTQUFTO0FBQ2IsVUFBSTtBQUNKLFVBQUk7QUFDSixVQUFJLFFBQVEsRUFBRSxPQUFPLElBQUksT0FBTyxHQUFHLFFBQVEsTUFBTTtBQUVqRCxZQUFNLE1BQU0sTUFBTSxTQUFTO0FBQzNCLFlBQU0sT0FBTyxNQUFNLElBQUksV0FBVyxRQUFRLENBQUM7QUFDM0MsWUFBTSxVQUFVLE1BQU07QUFDcEIsZUFBTztBQUNQLGVBQU8sSUFBSSxXQUFXLEVBQUUsS0FBSztBQUFBLE1BQy9CO0FBRUEsYUFBTyxRQUFRLFFBQVE7QUFDckIsZUFBTyxRQUFRO0FBQ2YsWUFBSTtBQUVKLFlBQUksU0FBUyxxQkFBcUI7QUFDaEMsd0JBQWMsTUFBTSxjQUFjO0FBQ2xDLGlCQUFPLFFBQVE7QUFFZixjQUFJLFNBQVMsdUJBQXVCO0FBQ2xDLDJCQUFlO0FBQUEsVUFDakI7QUFDQTtBQUFBLFFBQ0Y7QUFFQSxZQUFJLGlCQUFpQixRQUFRLFNBQVMsdUJBQXVCO0FBQzNEO0FBRUEsaUJBQU8sSUFBSSxNQUFNLFNBQVMsT0FBTyxRQUFRLElBQUk7QUFDM0MsZ0JBQUksU0FBUyxxQkFBcUI7QUFDaEMsNEJBQWMsTUFBTSxjQUFjO0FBQ2xDLHNCQUFRO0FBQ1I7QUFBQSxZQUNGO0FBRUEsZ0JBQUksU0FBUyx1QkFBdUI7QUFDbEM7QUFDQTtBQUFBLFlBQ0Y7QUFFQSxnQkFBSSxpQkFBaUIsUUFBUSxTQUFTLGFBQWEsT0FBTyxRQUFRLE9BQU8sVUFBVTtBQUNqRix3QkFBVSxNQUFNLFVBQVU7QUFDMUIsdUJBQVMsTUFBTSxTQUFTO0FBQ3hCLHlCQUFXO0FBRVgsa0JBQUksY0FBYyxNQUFNO0FBQ3RCO0FBQUEsY0FDRjtBQUVBO0FBQUEsWUFDRjtBQUVBLGdCQUFJLGlCQUFpQixRQUFRLFNBQVMsWUFBWTtBQUNoRCx3QkFBVSxNQUFNLFVBQVU7QUFDMUIsdUJBQVMsTUFBTSxTQUFTO0FBQ3hCLHlCQUFXO0FBRVgsa0JBQUksY0FBYyxNQUFNO0FBQ3RCO0FBQUEsY0FDRjtBQUVBO0FBQUEsWUFDRjtBQUVBLGdCQUFJLFNBQVMsd0JBQXdCO0FBQ25DO0FBRUEsa0JBQUksV0FBVyxHQUFHO0FBQ2hCLCtCQUFlO0FBQ2YsMEJBQVUsTUFBTSxVQUFVO0FBQzFCLDJCQUFXO0FBQ1g7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFFQSxjQUFJLGNBQWMsTUFBTTtBQUN0QjtBQUFBLFVBQ0Y7QUFFQTtBQUFBLFFBQ0Y7QUFFQSxZQUFJLFNBQVMsb0JBQW9CO0FBQy9CLGtCQUFRLEtBQUssS0FBSztBQUNsQixpQkFBTyxLQUFLLEtBQUs7QUFDakIsa0JBQVEsRUFBRSxPQUFPLElBQUksT0FBTyxHQUFHLFFBQVEsTUFBTTtBQUU3QyxjQUFJLGFBQWE7QUFBTTtBQUN2QixjQUFJLFNBQVMsWUFBWSxVQUFXLFFBQVEsR0FBSTtBQUM5QyxxQkFBUztBQUNUO0FBQUEsVUFDRjtBQUVBLHNCQUFZLFFBQVE7QUFDcEI7QUFBQSxRQUNGO0FBRUEsWUFBSSxLQUFLLFVBQVUsTUFBTTtBQUN2QixnQkFBTSxnQkFBZ0IsU0FBUyxhQUMxQixTQUFTLFdBQ1QsU0FBUyxpQkFDVCxTQUFTLHNCQUNULFNBQVM7QUFFZCxjQUFJLGtCQUFrQixRQUFRLEtBQUssTUFBTSx1QkFBdUI7QUFDOUQscUJBQVMsTUFBTSxTQUFTO0FBQ3hCLHdCQUFZLE1BQU0sWUFBWTtBQUM5Qix1QkFBVztBQUNYLGdCQUFJLFNBQVMseUJBQXlCLFVBQVUsT0FBTztBQUNyRCwrQkFBaUI7QUFBQSxZQUNuQjtBQUVBLGdCQUFJLGNBQWMsTUFBTTtBQUN0QixxQkFBTyxJQUFJLE1BQU0sU0FBUyxPQUFPLFFBQVEsSUFBSTtBQUMzQyxvQkFBSSxTQUFTLHFCQUFxQjtBQUNoQyxnQ0FBYyxNQUFNLGNBQWM7QUFDbEMseUJBQU8sUUFBUTtBQUNmO0FBQUEsZ0JBQ0Y7QUFFQSxvQkFBSSxTQUFTLHdCQUF3QjtBQUNuQywyQkFBUyxNQUFNLFNBQVM7QUFDeEIsNkJBQVc7QUFDWDtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUNBO0FBQUEsWUFDRjtBQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFFQSxZQUFJLFNBQVMsZUFBZTtBQUMxQixjQUFJLFNBQVM7QUFBZSx5QkFBYSxNQUFNLGFBQWE7QUFDNUQsbUJBQVMsTUFBTSxTQUFTO0FBQ3hCLHFCQUFXO0FBRVgsY0FBSSxjQUFjLE1BQU07QUFDdEI7QUFBQSxVQUNGO0FBQ0E7QUFBQSxRQUNGO0FBRUEsWUFBSSxTQUFTLG9CQUFvQjtBQUMvQixtQkFBUyxNQUFNLFNBQVM7QUFDeEIscUJBQVc7QUFFWCxjQUFJLGNBQWMsTUFBTTtBQUN0QjtBQUFBLFVBQ0Y7QUFDQTtBQUFBLFFBQ0Y7QUFFQSxZQUFJLFNBQVMsMEJBQTBCO0FBQ3JDLGlCQUFPLElBQUksTUFBTSxTQUFTLE9BQU8sUUFBUSxJQUFJO0FBQzNDLGdCQUFJLFNBQVMscUJBQXFCO0FBQ2hDLDRCQUFjLE1BQU0sY0FBYztBQUNsQyxzQkFBUTtBQUNSO0FBQUEsWUFDRjtBQUVBLGdCQUFJLFNBQVMsMkJBQTJCO0FBQ3RDLDBCQUFZLE1BQU0sWUFBWTtBQUM5Qix1QkFBUyxNQUFNLFNBQVM7QUFDeEIseUJBQVc7QUFDWDtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBRUEsY0FBSSxjQUFjLE1BQU07QUFDdEI7QUFBQSxVQUNGO0FBRUE7QUFBQSxRQUNGO0FBRUEsWUFBSSxLQUFLLGFBQWEsUUFBUSxTQUFTLHlCQUF5QixVQUFVLE9BQU87QUFDL0Usb0JBQVUsTUFBTSxVQUFVO0FBQzFCO0FBQ0E7QUFBQSxRQUNGO0FBRUEsWUFBSSxLQUFLLFlBQVksUUFBUSxTQUFTLHVCQUF1QjtBQUMzRCxtQkFBUyxNQUFNLFNBQVM7QUFFeEIsY0FBSSxjQUFjLE1BQU07QUFDdEIsbUJBQU8sSUFBSSxNQUFNLFNBQVMsT0FBTyxRQUFRLElBQUk7QUFDM0Msa0JBQUksU0FBUyx1QkFBdUI7QUFDbEMsOEJBQWMsTUFBTSxjQUFjO0FBQ2xDLHVCQUFPLFFBQVE7QUFDZjtBQUFBLGNBQ0Y7QUFFQSxrQkFBSSxTQUFTLHdCQUF3QjtBQUNuQywyQkFBVztBQUNYO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFDQTtBQUFBLFVBQ0Y7QUFDQTtBQUFBLFFBQ0Y7QUFFQSxZQUFJLFdBQVcsTUFBTTtBQUNuQixxQkFBVztBQUVYLGNBQUksY0FBYyxNQUFNO0FBQ3RCO0FBQUEsVUFDRjtBQUVBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLEtBQUssVUFBVSxNQUFNO0FBQ3ZCLG9CQUFZO0FBQ1osaUJBQVM7QUFBQSxNQUNYO0FBRUEsVUFBSSxPQUFPO0FBQ1gsVUFBSSxTQUFTO0FBQ2IsVUFBSSxPQUFPO0FBRVgsVUFBSSxRQUFRLEdBQUc7QUFDYixpQkFBUyxJQUFJLE1BQU0sR0FBRyxLQUFLO0FBQzNCLGNBQU0sSUFBSSxNQUFNLEtBQUs7QUFDckIscUJBQWE7QUFBQSxNQUNmO0FBRUEsVUFBSSxRQUFRLFdBQVcsUUFBUSxZQUFZLEdBQUc7QUFDNUMsZUFBTyxJQUFJLE1BQU0sR0FBRyxTQUFTO0FBQzdCLGVBQU8sSUFBSSxNQUFNLFNBQVM7QUFBQSxNQUM1QixXQUFXLFdBQVcsTUFBTTtBQUMxQixlQUFPO0FBQ1AsZUFBTztBQUFBLE1BQ1QsT0FBTztBQUNMLGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxRQUFRLFNBQVMsTUFBTSxTQUFTLE9BQU8sU0FBUyxLQUFLO0FBQ3ZELFlBQUksZ0JBQWdCLEtBQUssV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLEdBQUc7QUFDckQsaUJBQU8sS0FBSyxNQUFNLEdBQUcsRUFBRTtBQUFBLFFBQ3pCO0FBQUEsTUFDRjtBQUVBLFVBQUksS0FBSyxhQUFhLE1BQU07QUFDMUIsWUFBSTtBQUFNLGlCQUFPLE1BQU0sa0JBQWtCLElBQUk7QUFFN0MsWUFBSSxRQUFRLGdCQUFnQixNQUFNO0FBQ2hDLGlCQUFPLE1BQU0sa0JBQWtCLElBQUk7QUFBQSxRQUNyQztBQUFBLE1BQ0Y7QUFFQSxZQUFNLFFBQVE7QUFBQSxRQUNaO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBRUEsVUFBSSxLQUFLLFdBQVcsTUFBTTtBQUN4QixjQUFNLFdBQVc7QUFDakIsWUFBSSxDQUFDLGdCQUFnQixJQUFJLEdBQUc7QUFDMUIsaUJBQU8sS0FBSyxLQUFLO0FBQUEsUUFDbkI7QUFDQSxjQUFNLFNBQVM7QUFBQSxNQUNqQjtBQUVBLFVBQUksS0FBSyxVQUFVLFFBQVEsS0FBSyxXQUFXLE1BQU07QUFDL0MsWUFBSTtBQUVKLGlCQUFTLE1BQU0sR0FBRyxNQUFNLFFBQVEsUUFBUSxPQUFPO0FBQzdDLGdCQUFNLElBQUksWUFBWSxZQUFZLElBQUk7QUFDdEMsZ0JBQU0sSUFBSSxRQUFRLEdBQUc7QUFDckIsZ0JBQU0sUUFBUSxNQUFNLE1BQU0sR0FBRyxDQUFDO0FBQzlCLGNBQUksS0FBSyxRQUFRO0FBQ2YsZ0JBQUksUUFBUSxLQUFLLFVBQVUsR0FBRztBQUM1QixxQkFBTyxHQUFHLEVBQUUsV0FBVztBQUN2QixxQkFBTyxHQUFHLEVBQUUsUUFBUTtBQUFBLFlBQ3RCLE9BQU87QUFDTCxxQkFBTyxHQUFHLEVBQUUsUUFBUTtBQUFBLFlBQ3RCO0FBQ0Esa0JBQU0sT0FBTyxHQUFHLENBQUM7QUFDakIsa0JBQU0sWUFBWSxPQUFPLEdBQUcsRUFBRTtBQUFBLFVBQ2hDO0FBQ0EsY0FBSSxRQUFRLEtBQUssVUFBVSxJQUFJO0FBQzdCLGtCQUFNLEtBQUssS0FBSztBQUFBLFVBQ2xCO0FBQ0Esc0JBQVk7QUFBQSxRQUNkO0FBRUEsWUFBSSxhQUFhLFlBQVksSUFBSSxNQUFNLFFBQVE7QUFDN0MsZ0JBQU0sUUFBUSxNQUFNLE1BQU0sWUFBWSxDQUFDO0FBQ3ZDLGdCQUFNLEtBQUssS0FBSztBQUVoQixjQUFJLEtBQUssUUFBUTtBQUNmLG1CQUFPLE9BQU8sU0FBUyxDQUFDLEVBQUUsUUFBUTtBQUNsQyxrQkFBTSxPQUFPLE9BQU8sU0FBUyxDQUFDLENBQUM7QUFDL0Isa0JBQU0sWUFBWSxPQUFPLE9BQU8sU0FBUyxDQUFDLEVBQUU7QUFBQSxVQUM5QztBQUFBLFFBQ0Y7QUFFQSxjQUFNLFVBQVU7QUFDaEIsY0FBTSxRQUFRO0FBQUEsTUFDaEI7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ3RZakIsSUFBQUMsaUJBQUE7QUFBQSxpREFBQUMsU0FBQTtBQUFBO0FBRUEsUUFBTSxZQUFZO0FBQ2xCLFFBQU0sUUFBUTtBQU1kLFFBQU07QUFBQSxNQUNKO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsSUFBSTtBQU1KLFFBQU0sY0FBYyxDQUFDLE1BQU0sWUFBWTtBQUNyQyxVQUFJLE9BQU8sUUFBUSxnQkFBZ0IsWUFBWTtBQUM3QyxlQUFPLFFBQVEsWUFBWSxHQUFHLE1BQU0sT0FBTztBQUFBLE1BQzdDO0FBRUEsV0FBSyxLQUFLO0FBQ1YsWUFBTSxRQUFRLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQztBQUVoQyxVQUFJO0FBRUYsWUFBSSxPQUFPLEtBQUs7QUFBQSxNQUNsQixTQUFTLElBQUk7QUFDWCxlQUFPLEtBQUssSUFBSSxPQUFLLE1BQU0sWUFBWSxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUk7QUFBQSxNQUN0RDtBQUVBLGFBQU87QUFBQSxJQUNUO0FBTUEsUUFBTSxjQUFjLENBQUMsTUFBTSxTQUFTO0FBQ2xDLGFBQU8sV0FBVyxJQUFJLE1BQU0sSUFBSSxnQkFBZ0IsSUFBSTtBQUFBLElBQ3REO0FBRUEsUUFBTSxnQkFBZ0IsV0FBUztBQUM3QixZQUFNLFFBQVEsQ0FBQztBQUNmLFVBQUksVUFBVTtBQUNkLFVBQUksUUFBUTtBQUNaLFVBQUksUUFBUTtBQUNaLFVBQUksUUFBUTtBQUNaLFVBQUksVUFBVTtBQUVkLGlCQUFXLE1BQU0sT0FBTztBQUN0QixZQUFJLFlBQVksTUFBTTtBQUNwQixtQkFBUztBQUNULG9CQUFVO0FBQ1Y7QUFBQSxRQUNGO0FBRUEsWUFBSSxPQUFPLE1BQU07QUFDZixtQkFBUztBQUNULG9CQUFVO0FBQ1Y7QUFBQSxRQUNGO0FBRUEsWUFBSSxPQUFPLEtBQUs7QUFDZCxrQkFBUSxVQUFVLElBQUksSUFBSTtBQUMxQixtQkFBUztBQUNUO0FBQUEsUUFDRjtBQUVBLFlBQUksVUFBVSxHQUFHO0FBQ2YsY0FBSSxPQUFPLEtBQUs7QUFDZDtBQUFBLFVBQ0YsV0FBVyxPQUFPLE9BQU8sVUFBVSxHQUFHO0FBQ3BDO0FBQUEsVUFDRixXQUFXLFlBQVksR0FBRztBQUN4QixnQkFBSSxPQUFPLEtBQUs7QUFDZDtBQUFBLFlBQ0YsV0FBVyxPQUFPLE9BQU8sUUFBUSxHQUFHO0FBQ2xDO0FBQUEsWUFDRixXQUFXLE9BQU8sT0FBTyxVQUFVLEdBQUc7QUFDcEMsb0JBQU0sS0FBSyxLQUFLO0FBQ2hCLHNCQUFRO0FBQ1I7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFFQSxpQkFBUztBQUFBLE1BQ1g7QUFFQSxZQUFNLEtBQUssS0FBSztBQUNoQixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQU0sZ0JBQWdCLFlBQVU7QUFDOUIsVUFBSSxVQUFVO0FBRWQsaUJBQVcsTUFBTSxRQUFRO0FBQ3ZCLFlBQUksWUFBWSxNQUFNO0FBQ3BCLG9CQUFVO0FBQ1Y7QUFBQSxRQUNGO0FBRUEsWUFBSSxPQUFPLE1BQU07QUFDZixvQkFBVTtBQUNWO0FBQUEsUUFDRjtBQUVBLFlBQUksaUJBQWlCLEtBQUssRUFBRSxHQUFHO0FBQzdCLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQU0sd0JBQXdCLFlBQVU7QUFDdEMsVUFBSSxRQUFRLE9BQU8sS0FBSztBQUN4QixVQUFJLFVBQVU7QUFFZCxhQUFPLFlBQVksTUFBTTtBQUN2QixrQkFBVTtBQUVWLFlBQUksd0JBQXdCLEtBQUssS0FBSyxHQUFHO0FBQ3ZDLGtCQUFRLE1BQU0sTUFBTSxHQUFHLEVBQUU7QUFDekIsb0JBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUVBLFVBQUksQ0FBQyxjQUFjLEtBQUssR0FBRztBQUN6QjtBQUFBLE1BQ0Y7QUFFQSxhQUFPLE1BQU0sUUFBUSxVQUFVLElBQUk7QUFBQSxJQUNyQztBQUVBLFFBQU0sK0JBQStCLGNBQVk7QUFDL0MsWUFBTSxTQUFTLFNBQVMsSUFBSSxxQkFBcUIsRUFBRSxPQUFPLE9BQU87QUFFakUsZUFBUyxJQUFJLEdBQUcsSUFBSSxPQUFPLFFBQVEsS0FBSztBQUN0QyxpQkFBUyxJQUFJLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQzFDLGdCQUFNLElBQUksT0FBTyxDQUFDO0FBQ2xCLGdCQUFNLElBQUksT0FBTyxDQUFDO0FBQ2xCLGdCQUFNLE9BQU8sRUFBRSxDQUFDO0FBRWhCLGNBQUksQ0FBQyxRQUFRLE1BQU0sS0FBSyxPQUFPLEVBQUUsTUFBTSxLQUFLLE1BQU0sS0FBSyxPQUFPLEVBQUUsTUFBTSxHQUFHO0FBQ3ZFO0FBQUEsVUFDRjtBQUVBLGNBQUksTUFBTSxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsR0FBRztBQUNqRCxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBTSx1QkFBdUIsQ0FBQyxTQUFTLGFBQWEsU0FBUztBQUMzRCxVQUFLLFFBQVEsQ0FBQyxNQUFNLE9BQU8sUUFBUSxDQUFDLE1BQU0sT0FBUSxRQUFRLENBQUMsTUFBTSxLQUFLO0FBQ3BFO0FBQUEsTUFDRjtBQUVBLFVBQUksVUFBVTtBQUNkLFVBQUksUUFBUTtBQUNaLFVBQUksUUFBUTtBQUNaLFVBQUksVUFBVTtBQUVkLGVBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxRQUFRLEtBQUs7QUFDdkMsY0FBTSxLQUFLLFFBQVEsQ0FBQztBQUVwQixZQUFJLFlBQVksTUFBTTtBQUNwQixvQkFBVTtBQUNWO0FBQUEsUUFDRjtBQUVBLFlBQUksT0FBTyxNQUFNO0FBQ2Ysb0JBQVU7QUFDVjtBQUFBLFFBQ0Y7QUFFQSxZQUFJLE9BQU8sS0FBSztBQUNkLGtCQUFRLFVBQVUsSUFBSSxJQUFJO0FBQzFCO0FBQUEsUUFDRjtBQUVBLFlBQUksVUFBVSxHQUFHO0FBQ2Y7QUFBQSxRQUNGO0FBRUEsWUFBSSxPQUFPLEtBQUs7QUFDZDtBQUNBO0FBQUEsUUFDRjtBQUVBLFlBQUksT0FBTyxPQUFPLFVBQVUsR0FBRztBQUM3QjtBQUNBO0FBQUEsUUFDRjtBQUVBLFlBQUksVUFBVSxHQUFHO0FBQ2Y7QUFBQSxRQUNGO0FBRUEsWUFBSSxPQUFPLEtBQUs7QUFDZDtBQUNBO0FBQUEsUUFDRjtBQUVBLFlBQUksT0FBTyxLQUFLO0FBQ2Q7QUFFQSxjQUFJLFVBQVUsR0FBRztBQUNmLGdCQUFJLGVBQWUsUUFBUSxNQUFNLFFBQVEsU0FBUyxHQUFHO0FBQ25EO0FBQUEsWUFDRjtBQUVBLG1CQUFPO0FBQUEsY0FDTCxNQUFNLFFBQVEsQ0FBQztBQUFBLGNBQ2YsTUFBTSxRQUFRLE1BQU0sR0FBRyxDQUFDO0FBQUEsY0FDeEIsS0FBSztBQUFBLFlBQ1A7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsUUFBTSwrQkFBK0IsYUFBVztBQUM5QyxVQUFJLFFBQVE7QUFDWixZQUFNLFFBQVEsQ0FBQztBQUVmLGFBQU8sUUFBUSxRQUFRLFFBQVE7QUFDN0IsY0FBTSxRQUFRLHFCQUFxQixRQUFRLE1BQU0sS0FBSyxHQUFHLEtBQUs7QUFFOUQsWUFBSSxDQUFDLFNBQVMsTUFBTSxTQUFTLEtBQUs7QUFDaEM7QUFBQSxRQUNGO0FBRUEsY0FBTSxXQUFXLGNBQWMsTUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFBQyxZQUFVQSxRQUFPLEtBQUssQ0FBQztBQUN0RSxZQUFJLFNBQVMsV0FBVyxHQUFHO0FBQ3pCO0FBQUEsUUFDRjtBQUVBLGNBQU0sU0FBUyxzQkFBc0IsU0FBUyxDQUFDLENBQUM7QUFDaEQsWUFBSSxDQUFDLFVBQVUsT0FBTyxXQUFXLEdBQUc7QUFDbEM7QUFBQSxRQUNGO0FBRUEsY0FBTSxLQUFLLE1BQU07QUFDakIsaUJBQVMsTUFBTSxNQUFNO0FBQUEsTUFDdkI7QUFFQSxVQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCO0FBQUEsTUFDRjtBQUVBLFlBQU0sU0FBUyxNQUFNLFdBQVcsSUFDNUIsTUFBTSxZQUFZLE1BQU0sQ0FBQyxDQUFDLElBQzFCLElBQUksTUFBTSxJQUFJLFFBQU0sTUFBTSxZQUFZLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBRXZELGFBQU8sR0FBRyxNQUFNO0FBQUEsSUFDbEI7QUFFQSxRQUFNLDJCQUEyQixhQUFXO0FBQzFDLFVBQUksUUFBUTtBQUNaLFVBQUksUUFBUSxRQUFRLEtBQUs7QUFDekIsVUFBSSxRQUFRLHFCQUFxQixLQUFLO0FBRXRDLGFBQU8sT0FBTztBQUNaO0FBQ0EsZ0JBQVEsTUFBTSxLQUFLLEtBQUs7QUFDeEIsZ0JBQVEscUJBQXFCLEtBQUs7QUFBQSxNQUNwQztBQUVBLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBTSx5QkFBeUIsQ0FBQyxNQUFNLFlBQVk7QUFDaEQsVUFBSSxRQUFRLHdCQUF3QixPQUFPO0FBQ3pDLGVBQU8sRUFBRSxPQUFPLE1BQU07QUFBQSxNQUN4QjtBQUVBLFlBQU0sTUFDSixPQUFPLFFBQVEsd0JBQXdCLFdBQ25DLFFBQVEsc0JBQ1IsVUFBVTtBQUVoQixZQUFNLFdBQVcsY0FBYyxJQUFJLEVBQUUsSUFBSSxZQUFVLE9BQU8sS0FBSyxDQUFDO0FBRWhFLFVBQUksU0FBUyxTQUFTLEdBQUc7QUFDdkIsWUFDRSxTQUFTLEtBQUssWUFBVSxXQUFXLEVBQUUsS0FDckMsU0FBUyxLQUFLLFlBQVUsVUFBVSxLQUFLLE1BQU0sQ0FBQyxLQUM5Qyw2QkFBNkIsUUFBUSxHQUNyQztBQUNBLGlCQUFPLEVBQUUsT0FBTyxLQUFLO0FBQUEsUUFDdkI7QUFBQSxNQUNGO0FBRUEsaUJBQVcsVUFBVSxVQUFVO0FBQzdCLGNBQU0sYUFBYSw2QkFBNkIsTUFBTTtBQUN0RCxZQUFJLFlBQVk7QUFDZCxpQkFBTyxFQUFFLE9BQU8sTUFBTSxXQUFXO0FBQUEsUUFDbkM7QUFFQSxZQUFJLHlCQUF5QixNQUFNLElBQUksS0FBSztBQUMxQyxpQkFBTyxFQUFFLE9BQU8sS0FBSztBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUVBLGFBQU8sRUFBRSxPQUFPLE1BQU07QUFBQSxJQUN4QjtBQVNBLFFBQU0sUUFBUSxDQUFDLE9BQU8sWUFBWTtBQUNoQyxVQUFJLE9BQU8sVUFBVSxVQUFVO0FBQzdCLGNBQU0sSUFBSSxVQUFVLG1CQUFtQjtBQUFBLE1BQ3pDO0FBRUEsY0FBUSxhQUFhLEtBQUssS0FBSztBQUUvQixZQUFNLE9BQU8sRUFBRSxHQUFHLFFBQVE7QUFDMUIsWUFBTSxNQUFNLE9BQU8sS0FBSyxjQUFjLFdBQVcsS0FBSyxJQUFJLFlBQVksS0FBSyxTQUFTLElBQUk7QUFFeEYsVUFBSSxNQUFNLE1BQU07QUFDaEIsVUFBSSxNQUFNLEtBQUs7QUFDYixjQUFNLElBQUksWUFBWSxpQkFBaUIsR0FBRyxxQ0FBcUMsR0FBRyxFQUFFO0FBQUEsTUFDdEY7QUFFQSxZQUFNLE1BQU0sRUFBRSxNQUFNLE9BQU8sT0FBTyxJQUFJLFFBQVEsS0FBSyxXQUFXLEdBQUc7QUFDakUsWUFBTSxTQUFTLENBQUMsR0FBRztBQUVuQixZQUFNLFVBQVUsS0FBSyxVQUFVLEtBQUs7QUFDcEMsWUFBTSxRQUFRLE1BQU0sVUFBVSxPQUFPO0FBR3JDLFlBQU0saUJBQWlCLFVBQVUsVUFBVSxLQUFLO0FBQ2hELFlBQU0sZ0JBQWdCLFVBQVUsYUFBYSxjQUFjO0FBRTNELFlBQU07QUFBQSxRQUNKO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLElBQUk7QUFFSixZQUFNLFdBQVcsQ0FBQUMsVUFBUTtBQUN2QixlQUFPLElBQUksT0FBTyxTQUFTLFlBQVksR0FBR0EsTUFBSyxNQUFNLGFBQWEsV0FBVztBQUFBLE1BQy9FO0FBRUEsWUFBTSxRQUFRLEtBQUssTUFBTSxLQUFLO0FBQzlCLFlBQU0sYUFBYSxLQUFLLE1BQU0sUUFBUTtBQUN0QyxVQUFJLE9BQU8sS0FBSyxTQUFTLE9BQU8sU0FBUyxJQUFJLElBQUk7QUFFakQsVUFBSSxLQUFLLFNBQVM7QUFDaEIsZUFBTyxJQUFJLElBQUk7QUFBQSxNQUNqQjtBQUdBLFVBQUksT0FBTyxLQUFLLFVBQVUsV0FBVztBQUNuQyxhQUFLLFlBQVksS0FBSztBQUFBLE1BQ3hCO0FBRUEsWUFBTSxRQUFRO0FBQUEsUUFDWjtBQUFBLFFBQ0EsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLFFBQ1AsS0FBSyxLQUFLLFFBQVE7QUFBQSxRQUNsQixVQUFVO0FBQUEsUUFDVixRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxVQUFVO0FBQUEsUUFDVixRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixVQUFVO0FBQUEsUUFDVjtBQUFBLE1BQ0Y7QUFFQSxjQUFRLE1BQU0sYUFBYSxPQUFPLEtBQUs7QUFDdkMsWUFBTSxNQUFNO0FBRVosWUFBTSxXQUFXLENBQUM7QUFDbEIsWUFBTSxTQUFTLENBQUM7QUFDaEIsWUFBTSxRQUFRLENBQUM7QUFDZixVQUFJLE9BQU87QUFDWCxVQUFJO0FBTUosWUFBTSxNQUFNLE1BQU0sTUFBTSxVQUFVLE1BQU07QUFDeEMsWUFBTSxPQUFPLE1BQU0sT0FBTyxDQUFDLElBQUksTUFBTSxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzFELFlBQU0sVUFBVSxNQUFNLFVBQVUsTUFBTSxNQUFNLEVBQUUsTUFBTSxLQUFLLEtBQUs7QUFDOUQsWUFBTSxZQUFZLE1BQU0sTUFBTSxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQ25ELFlBQU0sVUFBVSxDQUFDQyxTQUFRLElBQUksTUFBTSxNQUFNO0FBQ3ZDLGNBQU0sWUFBWUE7QUFDbEIsY0FBTSxTQUFTO0FBQUEsTUFDakI7QUFFQSxZQUFNLFNBQVMsV0FBUztBQUN0QixjQUFNLFVBQVUsTUFBTSxVQUFVLE9BQU8sTUFBTSxTQUFTLE1BQU07QUFDNUQsZ0JBQVEsTUFBTSxLQUFLO0FBQUEsTUFDckI7QUFFQSxZQUFNLFNBQVMsTUFBTTtBQUNuQixZQUFJLFFBQVE7QUFFWixlQUFPLEtBQUssTUFBTSxRQUFRLEtBQUssQ0FBQyxNQUFNLE9BQU8sS0FBSyxDQUFDLE1BQU0sTUFBTTtBQUM3RCxrQkFBUTtBQUNSLGdCQUFNO0FBQ047QUFBQSxRQUNGO0FBRUEsWUFBSSxRQUFRLE1BQU0sR0FBRztBQUNuQixpQkFBTztBQUFBLFFBQ1Q7QUFFQSxjQUFNLFVBQVU7QUFDaEIsY0FBTTtBQUNOLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxZQUFZLFVBQVE7QUFDeEIsY0FBTSxJQUFJO0FBQ1YsY0FBTSxLQUFLLElBQUk7QUFBQSxNQUNqQjtBQUVBLFlBQU0sWUFBWSxVQUFRO0FBQ3hCLGNBQU0sSUFBSTtBQUNWLGNBQU0sSUFBSTtBQUFBLE1BQ1o7QUFVQSxZQUFNLE9BQU8sU0FBTztBQUNsQixZQUFJLEtBQUssU0FBUyxZQUFZO0FBQzVCLGdCQUFNLFVBQVUsTUFBTSxTQUFTLE1BQU0sSUFBSSxTQUFTLFdBQVcsSUFBSSxTQUFTO0FBQzFFLGdCQUFNLFlBQVksSUFBSSxZQUFZLFFBQVMsU0FBUyxXQUFXLElBQUksU0FBUyxVQUFVLElBQUksU0FBUztBQUVuRyxjQUFJLElBQUksU0FBUyxXQUFXLElBQUksU0FBUyxXQUFXLENBQUMsV0FBVyxDQUFDLFdBQVc7QUFDMUUsa0JBQU0sU0FBUyxNQUFNLE9BQU8sTUFBTSxHQUFHLENBQUMsS0FBSyxPQUFPLE1BQU07QUFDeEQsaUJBQUssT0FBTztBQUNaLGlCQUFLLFFBQVE7QUFDYixpQkFBSyxTQUFTO0FBQ2Qsa0JBQU0sVUFBVSxLQUFLO0FBQUEsVUFDdkI7QUFBQSxRQUNGO0FBRUEsWUFBSSxTQUFTLFVBQVUsSUFBSSxTQUFTLFNBQVM7QUFDM0MsbUJBQVMsU0FBUyxTQUFTLENBQUMsRUFBRSxTQUFTLElBQUk7QUFBQSxRQUM3QztBQUVBLFlBQUksSUFBSSxTQUFTLElBQUk7QUFBUSxpQkFBTyxHQUFHO0FBQ3ZDLFlBQUksUUFBUSxLQUFLLFNBQVMsVUFBVSxJQUFJLFNBQVMsUUFBUTtBQUN2RCxlQUFLLFNBQVMsSUFBSTtBQUNsQixlQUFLLFVBQVUsS0FBSyxVQUFVLE1BQU0sSUFBSTtBQUN4QztBQUFBLFFBQ0Y7QUFFQSxZQUFJLE9BQU87QUFDWCxlQUFPLEtBQUssR0FBRztBQUNmLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxjQUFjLENBQUMsTUFBTUEsV0FBVTtBQUNuQyxjQUFNLFFBQVEsRUFBRSxHQUFHLGNBQWNBLE1BQUssR0FBRyxZQUFZLEdBQUcsT0FBTyxHQUFHO0FBRWxFLGNBQU0sT0FBTztBQUNiLGNBQU0sU0FBUyxNQUFNO0FBQ3JCLGNBQU0sU0FBUyxNQUFNO0FBQ3JCLGNBQU0sYUFBYSxNQUFNO0FBQ3pCLGNBQU0sY0FBYyxPQUFPO0FBQzNCLGNBQU0sVUFBVSxLQUFLLFVBQVUsTUFBTSxNQUFNLE1BQU07QUFFakQsa0JBQVUsUUFBUTtBQUNsQixhQUFLLEVBQUUsTUFBTSxPQUFBQSxRQUFPLFFBQVEsTUFBTSxTQUFTLEtBQUssU0FBUyxDQUFDO0FBQzFELGFBQUssRUFBRSxNQUFNLFNBQVMsU0FBUyxNQUFNLE9BQU8sUUFBUSxHQUFHLE9BQU8sQ0FBQztBQUMvRCxpQkFBUyxLQUFLLEtBQUs7QUFBQSxNQUNyQjtBQUVBLFlBQU0sZUFBZSxXQUFTO0FBQzVCLGNBQU0sVUFBVSxNQUFNLE1BQU0sTUFBTSxZQUFZLE1BQU0sUUFBUSxDQUFDO0FBQzdELGNBQU0sT0FBTyxNQUFNLE1BQU0sTUFBTSxhQUFhLEdBQUcsTUFBTSxLQUFLO0FBQzFELGNBQU0sV0FBVyx1QkFBdUIsTUFBTSxJQUFJO0FBRWxELGFBQUssTUFBTSxTQUFTLFVBQVUsTUFBTSxTQUFTLFdBQVcsU0FBUyxPQUFPO0FBQ3RFLGdCQUFNLGFBQWEsU0FBUyxjQUN2QixNQUFNLFNBQVMsS0FBSyxhQUFhLEtBQUssVUFBVSxJQUFJLFNBQVMsVUFBVSxNQUFNLFNBQVMsY0FDdkY7QUFDSixnQkFBTSxPQUFPLE9BQU8sTUFBTSxXQUFXO0FBRXJDLGVBQUssT0FBTztBQUNaLGVBQUssUUFBUTtBQUNiLGVBQUssU0FBUyxjQUFjLE1BQU0sWUFBWSxPQUFPO0FBRXJELG1CQUFTLElBQUksTUFBTSxjQUFjLEdBQUcsSUFBSSxPQUFPLFFBQVEsS0FBSztBQUMxRCxtQkFBTyxDQUFDLEVBQUUsUUFBUTtBQUNsQixtQkFBTyxDQUFDLEVBQUUsU0FBUztBQUNuQixtQkFBTyxPQUFPLENBQUMsRUFBRTtBQUFBLFVBQ25CO0FBRUEsZ0JBQU0sU0FBUyxNQUFNLFNBQVMsS0FBSztBQUNuQyxnQkFBTSxZQUFZO0FBRWxCLGVBQUssRUFBRSxNQUFNLFNBQVMsU0FBUyxNQUFNLE9BQU8sUUFBUSxHQUFHLENBQUM7QUFDeEQsb0JBQVUsUUFBUTtBQUNsQjtBQUFBLFFBQ0Y7QUFFQSxZQUFJLFNBQVMsTUFBTSxTQUFTLEtBQUssVUFBVSxNQUFNO0FBQ2pELFlBQUk7QUFFSixZQUFJLE1BQU0sU0FBUyxVQUFVO0FBQzNCLGNBQUksY0FBYztBQUVsQixjQUFJLE1BQU0sU0FBUyxNQUFNLE1BQU0sU0FBUyxLQUFLLE1BQU0sTUFBTSxTQUFTLEdBQUcsR0FBRztBQUN0RSwwQkFBYyxTQUFTLElBQUk7QUFBQSxVQUM3QjtBQUVBLGNBQUksZ0JBQWdCLFFBQVEsSUFBSSxLQUFLLFFBQVEsS0FBSyxVQUFVLENBQUMsR0FBRztBQUM5RCxxQkFBUyxNQUFNLFFBQVEsT0FBTyxXQUFXO0FBQUEsVUFDM0M7QUFFQSxjQUFJLE1BQU0sTUFBTSxTQUFTLEdBQUcsTUFBTSxPQUFPLFVBQVUsTUFBTSxlQUFlLEtBQUssSUFBSSxHQUFHO0FBTWxGLGtCQUFNLGFBQWEsTUFBTSxNQUFNLEVBQUUsR0FBRyxTQUFTLFdBQVcsTUFBTSxDQUFDLEVBQUU7QUFFakUscUJBQVMsTUFBTSxRQUFRLElBQUksVUFBVSxJQUFJLFdBQVc7QUFBQSxVQUN0RDtBQUVBLGNBQUksTUFBTSxLQUFLLFNBQVMsT0FBTztBQUM3QixrQkFBTSxpQkFBaUI7QUFBQSxVQUN6QjtBQUFBLFFBQ0Y7QUFFQSxhQUFLLEVBQUUsTUFBTSxTQUFTLFNBQVMsTUFBTSxPQUFPLE9BQU8sQ0FBQztBQUNwRCxrQkFBVSxRQUFRO0FBQUEsTUFDcEI7QUFNQSxVQUFJLEtBQUssY0FBYyxTQUFTLENBQUMsc0JBQXNCLEtBQUssS0FBSyxHQUFHO0FBQ2xFLFlBQUksY0FBYztBQUVsQixZQUFJLFNBQVMsTUFBTSxRQUFRLDZCQUE2QixDQUFDLEdBQUcsS0FBSyxPQUFPLE9BQU8sTUFBTSxVQUFVO0FBQzdGLGNBQUksVUFBVSxNQUFNO0FBQ2xCLDBCQUFjO0FBQ2QsbUJBQU87QUFBQSxVQUNUO0FBRUEsY0FBSSxVQUFVLEtBQUs7QUFDakIsZ0JBQUksS0FBSztBQUNQLHFCQUFPLE1BQU0sU0FBUyxPQUFPLE1BQU0sT0FBTyxLQUFLLE1BQU0sSUFBSTtBQUFBLFlBQzNEO0FBQ0EsZ0JBQUksVUFBVSxHQUFHO0FBQ2YscUJBQU8sY0FBYyxPQUFPLE1BQU0sT0FBTyxLQUFLLE1BQU0sSUFBSTtBQUFBLFlBQzFEO0FBQ0EsbUJBQU8sTUFBTSxPQUFPLE1BQU0sTUFBTTtBQUFBLFVBQ2xDO0FBRUEsY0FBSSxVQUFVLEtBQUs7QUFDakIsbUJBQU8sWUFBWSxPQUFPLE1BQU0sTUFBTTtBQUFBLFVBQ3hDO0FBRUEsY0FBSSxVQUFVLEtBQUs7QUFDakIsZ0JBQUksS0FBSztBQUNQLHFCQUFPLE1BQU0sU0FBUyxPQUFPLE9BQU87QUFBQSxZQUN0QztBQUNBLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGlCQUFPLE1BQU0sSUFBSSxLQUFLLENBQUM7QUFBQSxRQUN6QixDQUFDO0FBRUQsWUFBSSxnQkFBZ0IsTUFBTTtBQUN4QixjQUFJLEtBQUssYUFBYSxNQUFNO0FBQzFCLHFCQUFTLE9BQU8sUUFBUSxPQUFPLEVBQUU7QUFBQSxVQUNuQyxPQUFPO0FBQ0wscUJBQVMsT0FBTyxRQUFRLFFBQVEsT0FBSztBQUNuQyxxQkFBTyxFQUFFLFNBQVMsTUFBTSxJQUFJLFNBQVUsSUFBSSxPQUFPO0FBQUEsWUFDbkQsQ0FBQztBQUFBLFVBQ0g7QUFBQSxRQUNGO0FBRUEsWUFBSSxXQUFXLFNBQVMsS0FBSyxhQUFhLE1BQU07QUFDOUMsZ0JBQU0sU0FBUztBQUNmLGlCQUFPO0FBQUEsUUFDVDtBQUVBLGNBQU0sU0FBUyxNQUFNLFdBQVcsUUFBUSxPQUFPLE9BQU87QUFDdEQsZUFBTztBQUFBLE1BQ1Q7QUFNQSxhQUFPLENBQUMsSUFBSSxHQUFHO0FBQ2IsZ0JBQVEsUUFBUTtBQUVoQixZQUFJLFVBQVUsTUFBVTtBQUN0QjtBQUFBLFFBQ0Y7QUFNQSxZQUFJLFVBQVUsTUFBTTtBQUNsQixnQkFBTSxPQUFPLEtBQUs7QUFFbEIsY0FBSSxTQUFTLE9BQU8sS0FBSyxTQUFTLE1BQU07QUFDdEM7QUFBQSxVQUNGO0FBRUEsY0FBSSxTQUFTLE9BQU8sU0FBUyxLQUFLO0FBQ2hDO0FBQUEsVUFDRjtBQUVBLGNBQUksQ0FBQyxNQUFNO0FBQ1QscUJBQVM7QUFDVCxpQkFBSyxFQUFFLE1BQU0sUUFBUSxNQUFNLENBQUM7QUFDNUI7QUFBQSxVQUNGO0FBR0EsZ0JBQU0sUUFBUSxPQUFPLEtBQUssVUFBVSxDQUFDO0FBQ3JDLGNBQUksVUFBVTtBQUVkLGNBQUksU0FBUyxNQUFNLENBQUMsRUFBRSxTQUFTLEdBQUc7QUFDaEMsc0JBQVUsTUFBTSxDQUFDLEVBQUU7QUFDbkIsa0JBQU0sU0FBUztBQUNmLGdCQUFJLFVBQVUsTUFBTSxHQUFHO0FBQ3JCLHVCQUFTO0FBQUEsWUFDWDtBQUFBLFVBQ0Y7QUFFQSxjQUFJLEtBQUssYUFBYSxNQUFNO0FBQzFCLG9CQUFRLFFBQVE7QUFBQSxVQUNsQixPQUFPO0FBQ0wscUJBQVMsUUFBUTtBQUFBLFVBQ25CO0FBRUEsY0FBSSxNQUFNLGFBQWEsR0FBRztBQUN4QixpQkFBSyxFQUFFLE1BQU0sUUFBUSxNQUFNLENBQUM7QUFDNUI7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQU9BLFlBQUksTUFBTSxXQUFXLE1BQU0sVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPO0FBQ3RGLGNBQUksS0FBSyxVQUFVLFNBQVMsVUFBVSxLQUFLO0FBQ3pDLGtCQUFNLFFBQVEsS0FBSyxNQUFNLE1BQU0sQ0FBQztBQUNoQyxnQkFBSSxNQUFNLFNBQVMsR0FBRyxHQUFHO0FBQ3ZCLG1CQUFLLFFBQVE7QUFFYixrQkFBSSxNQUFNLFNBQVMsR0FBRyxHQUFHO0FBQ3ZCLHNCQUFNLE1BQU0sS0FBSyxNQUFNLFlBQVksR0FBRztBQUN0QyxzQkFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLEdBQUcsR0FBRztBQUNuQyxzQkFBTUMsUUFBTyxLQUFLLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDckMsc0JBQU0sUUFBUSxtQkFBbUJBLEtBQUk7QUFDckMsb0JBQUksT0FBTztBQUNULHVCQUFLLFFBQVEsTUFBTTtBQUNuQix3QkFBTSxZQUFZO0FBQ2xCLDBCQUFRO0FBRVIsc0JBQUksQ0FBQyxJQUFJLFVBQVUsT0FBTyxRQUFRLElBQUksTUFBTSxHQUFHO0FBQzdDLHdCQUFJLFNBQVM7QUFBQSxrQkFDZjtBQUNBO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFFQSxjQUFLLFVBQVUsT0FBTyxLQUFLLE1BQU0sT0FBUyxVQUFVLE9BQU8sS0FBSyxNQUFNLEtBQU07QUFDMUUsb0JBQVEsS0FBSyxLQUFLO0FBQUEsVUFDcEI7QUFFQSxjQUFJLFVBQVUsUUFBUSxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTztBQUNoRSxvQkFBUSxLQUFLLEtBQUs7QUFBQSxVQUNwQjtBQUVBLGNBQUksS0FBSyxVQUFVLFFBQVEsVUFBVSxPQUFPLEtBQUssVUFBVSxLQUFLO0FBQzlELG9CQUFRO0FBQUEsVUFDVjtBQUVBLGVBQUssU0FBUztBQUNkLGlCQUFPLEVBQUUsTUFBTSxDQUFDO0FBQ2hCO0FBQUEsUUFDRjtBQU9BLFlBQUksTUFBTSxXQUFXLEtBQUssVUFBVSxLQUFLO0FBQ3ZDLGtCQUFRLE1BQU0sWUFBWSxLQUFLO0FBQy9CLGVBQUssU0FBUztBQUNkLGlCQUFPLEVBQUUsTUFBTSxDQUFDO0FBQ2hCO0FBQUEsUUFDRjtBQU1BLFlBQUksVUFBVSxLQUFLO0FBQ2pCLGdCQUFNLFNBQVMsTUFBTSxXQUFXLElBQUksSUFBSTtBQUN4QyxjQUFJLEtBQUssZUFBZSxNQUFNO0FBQzVCLGlCQUFLLEVBQUUsTUFBTSxRQUFRLE1BQU0sQ0FBQztBQUFBLFVBQzlCO0FBQ0E7QUFBQSxRQUNGO0FBTUEsWUFBSSxVQUFVLEtBQUs7QUFDakIsb0JBQVUsUUFBUTtBQUNsQixlQUFLLEVBQUUsTUFBTSxTQUFTLE1BQU0sQ0FBQztBQUM3QjtBQUFBLFFBQ0Y7QUFFQSxZQUFJLFVBQVUsS0FBSztBQUNqQixjQUFJLE1BQU0sV0FBVyxLQUFLLEtBQUssbUJBQW1CLE1BQU07QUFDdEQsa0JBQU0sSUFBSSxZQUFZLFlBQVksV0FBVyxHQUFHLENBQUM7QUFBQSxVQUNuRDtBQUVBLGdCQUFNLFVBQVUsU0FBUyxTQUFTLFNBQVMsQ0FBQztBQUM1QyxjQUFJLFdBQVcsTUFBTSxXQUFXLFFBQVEsU0FBUyxHQUFHO0FBQ2xELHlCQUFhLFNBQVMsSUFBSSxDQUFDO0FBQzNCO0FBQUEsVUFDRjtBQUVBLGVBQUssRUFBRSxNQUFNLFNBQVMsT0FBTyxRQUFRLE1BQU0sU0FBUyxNQUFNLE1BQU0sQ0FBQztBQUNqRSxvQkFBVSxRQUFRO0FBQ2xCO0FBQUEsUUFDRjtBQU1BLFlBQUksVUFBVSxLQUFLO0FBQ2pCLGNBQUksS0FBSyxjQUFjLFFBQVEsQ0FBQyxVQUFVLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFDekQsZ0JBQUksS0FBSyxjQUFjLFFBQVEsS0FBSyxtQkFBbUIsTUFBTTtBQUMzRCxvQkFBTSxJQUFJLFlBQVksWUFBWSxXQUFXLEdBQUcsQ0FBQztBQUFBLFlBQ25EO0FBRUEsb0JBQVEsS0FBSyxLQUFLO0FBQUEsVUFDcEIsT0FBTztBQUNMLHNCQUFVLFVBQVU7QUFBQSxVQUN0QjtBQUVBLGVBQUssRUFBRSxNQUFNLFdBQVcsTUFBTSxDQUFDO0FBQy9CO0FBQUEsUUFDRjtBQUVBLFlBQUksVUFBVSxLQUFLO0FBQ2pCLGNBQUksS0FBSyxjQUFjLFFBQVMsUUFBUSxLQUFLLFNBQVMsYUFBYSxLQUFLLE1BQU0sV0FBVyxHQUFJO0FBQzNGLGlCQUFLLEVBQUUsTUFBTSxRQUFRLE9BQU8sUUFBUSxLQUFLLEtBQUssR0FBRyxDQUFDO0FBQ2xEO0FBQUEsVUFDRjtBQUVBLGNBQUksTUFBTSxhQUFhLEdBQUc7QUFDeEIsZ0JBQUksS0FBSyxtQkFBbUIsTUFBTTtBQUNoQyxvQkFBTSxJQUFJLFlBQVksWUFBWSxXQUFXLEdBQUcsQ0FBQztBQUFBLFlBQ25EO0FBRUEsaUJBQUssRUFBRSxNQUFNLFFBQVEsT0FBTyxRQUFRLEtBQUssS0FBSyxHQUFHLENBQUM7QUFDbEQ7QUFBQSxVQUNGO0FBRUEsb0JBQVUsVUFBVTtBQUVwQixnQkFBTSxZQUFZLEtBQUssTUFBTSxNQUFNLENBQUM7QUFDcEMsY0FBSSxLQUFLLFVBQVUsUUFBUSxVQUFVLENBQUMsTUFBTSxPQUFPLENBQUMsVUFBVSxTQUFTLEdBQUcsR0FBRztBQUMzRSxvQkFBUSxJQUFJLEtBQUs7QUFBQSxVQUNuQjtBQUVBLGVBQUssU0FBUztBQUNkLGlCQUFPLEVBQUUsTUFBTSxDQUFDO0FBSWhCLGNBQUksS0FBSyxvQkFBb0IsU0FBUyxNQUFNLGNBQWMsU0FBUyxHQUFHO0FBQ3BFO0FBQUEsVUFDRjtBQUVBLGdCQUFNLFVBQVUsTUFBTSxZQUFZLEtBQUssS0FBSztBQUM1QyxnQkFBTSxTQUFTLE1BQU0sT0FBTyxNQUFNLEdBQUcsQ0FBQyxLQUFLLE1BQU0sTUFBTTtBQUl2RCxjQUFJLEtBQUssb0JBQW9CLE1BQU07QUFDakMsa0JBQU0sVUFBVTtBQUNoQixpQkFBSyxRQUFRO0FBQ2I7QUFBQSxVQUNGO0FBR0EsZUFBSyxRQUFRLElBQUksT0FBTyxHQUFHLE9BQU8sSUFBSSxLQUFLLEtBQUs7QUFDaEQsZ0JBQU0sVUFBVSxLQUFLO0FBQ3JCO0FBQUEsUUFDRjtBQU1BLFlBQUksVUFBVSxPQUFPLEtBQUssWUFBWSxNQUFNO0FBQzFDLG9CQUFVLFFBQVE7QUFFbEIsZ0JBQU0sT0FBTztBQUFBLFlBQ1gsTUFBTTtBQUFBLFlBQ047QUFBQSxZQUNBLFFBQVE7QUFBQSxZQUNSLGFBQWEsTUFBTSxPQUFPO0FBQUEsWUFDMUIsYUFBYSxNQUFNLE9BQU87QUFBQSxVQUM1QjtBQUVBLGlCQUFPLEtBQUssSUFBSTtBQUNoQixlQUFLLElBQUk7QUFDVDtBQUFBLFFBQ0Y7QUFFQSxZQUFJLFVBQVUsS0FBSztBQUNqQixnQkFBTSxRQUFRLE9BQU8sT0FBTyxTQUFTLENBQUM7QUFFdEMsY0FBSSxLQUFLLFlBQVksUUFBUSxDQUFDLE9BQU87QUFDbkMsaUJBQUssRUFBRSxNQUFNLFFBQVEsT0FBTyxRQUFRLE1BQU0sQ0FBQztBQUMzQztBQUFBLFVBQ0Y7QUFFQSxjQUFJLFNBQVM7QUFFYixjQUFJLE1BQU0sU0FBUyxNQUFNO0FBQ3ZCLGtCQUFNLE1BQU0sT0FBTyxNQUFNO0FBQ3pCLGtCQUFNLFFBQVEsQ0FBQztBQUVmLHFCQUFTLElBQUksSUFBSSxTQUFTLEdBQUcsS0FBSyxHQUFHLEtBQUs7QUFDeEMscUJBQU8sSUFBSTtBQUNYLGtCQUFJLElBQUksQ0FBQyxFQUFFLFNBQVMsU0FBUztBQUMzQjtBQUFBLGNBQ0Y7QUFDQSxrQkFBSSxJQUFJLENBQUMsRUFBRSxTQUFTLFFBQVE7QUFDMUIsc0JBQU0sUUFBUSxJQUFJLENBQUMsRUFBRSxLQUFLO0FBQUEsY0FDNUI7QUFBQSxZQUNGO0FBRUEscUJBQVMsWUFBWSxPQUFPLElBQUk7QUFDaEMsa0JBQU0sWUFBWTtBQUFBLFVBQ3BCO0FBRUEsY0FBSSxNQUFNLFVBQVUsUUFBUSxNQUFNLFNBQVMsTUFBTTtBQUMvQyxrQkFBTSxNQUFNLE1BQU0sT0FBTyxNQUFNLEdBQUcsTUFBTSxXQUFXO0FBQ25ELGtCQUFNLE9BQU8sTUFBTSxPQUFPLE1BQU0sTUFBTSxXQUFXO0FBQ2pELGtCQUFNLFFBQVEsTUFBTSxTQUFTO0FBQzdCLG9CQUFRLFNBQVM7QUFDakIsa0JBQU0sU0FBUztBQUNmLHVCQUFXLEtBQUssTUFBTTtBQUNwQixvQkFBTSxVQUFXLEVBQUUsVUFBVSxFQUFFO0FBQUEsWUFDakM7QUFBQSxVQUNGO0FBRUEsZUFBSyxFQUFFLE1BQU0sU0FBUyxPQUFPLE9BQU8sQ0FBQztBQUNyQyxvQkFBVSxRQUFRO0FBQ2xCLGlCQUFPLElBQUk7QUFDWDtBQUFBLFFBQ0Y7QUFNQSxZQUFJLFVBQVUsS0FBSztBQUNqQixjQUFJLFNBQVMsU0FBUyxHQUFHO0FBQ3ZCLHFCQUFTLFNBQVMsU0FBUyxDQUFDLEVBQUU7QUFBQSxVQUNoQztBQUNBLGVBQUssRUFBRSxNQUFNLFFBQVEsTUFBTSxDQUFDO0FBQzVCO0FBQUEsUUFDRjtBQU1BLFlBQUksVUFBVSxLQUFLO0FBQ2pCLGNBQUksU0FBUztBQUViLGdCQUFNLFFBQVEsT0FBTyxPQUFPLFNBQVMsQ0FBQztBQUN0QyxjQUFJLFNBQVMsTUFBTSxNQUFNLFNBQVMsQ0FBQyxNQUFNLFVBQVU7QUFDakQsa0JBQU0sUUFBUTtBQUNkLHFCQUFTO0FBQUEsVUFDWDtBQUVBLGVBQUssRUFBRSxNQUFNLFNBQVMsT0FBTyxPQUFPLENBQUM7QUFDckM7QUFBQSxRQUNGO0FBTUEsWUFBSSxVQUFVLEtBQUs7QUFLakIsY0FBSSxLQUFLLFNBQVMsU0FBUyxNQUFNLFVBQVUsTUFBTSxRQUFRLEdBQUc7QUFDMUQsa0JBQU0sUUFBUSxNQUFNLFFBQVE7QUFDNUIsa0JBQU0sV0FBVztBQUNqQixrQkFBTSxTQUFTO0FBQ2YsbUJBQU8sSUFBSTtBQUNYLG1CQUFPO0FBQ1A7QUFBQSxVQUNGO0FBRUEsZUFBSyxFQUFFLE1BQU0sU0FBUyxPQUFPLFFBQVEsY0FBYyxDQUFDO0FBQ3BEO0FBQUEsUUFDRjtBQU1BLFlBQUksVUFBVSxLQUFLO0FBQ2pCLGNBQUksTUFBTSxTQUFTLEtBQUssS0FBSyxTQUFTLE9BQU87QUFDM0MsZ0JBQUksS0FBSyxVQUFVO0FBQUssbUJBQUssU0FBUztBQUN0QyxrQkFBTSxRQUFRLE9BQU8sT0FBTyxTQUFTLENBQUM7QUFDdEMsaUJBQUssT0FBTztBQUNaLGlCQUFLLFVBQVU7QUFDZixpQkFBSyxTQUFTO0FBQ2Qsa0JBQU0sT0FBTztBQUNiO0FBQUEsVUFDRjtBQUVBLGNBQUssTUFBTSxTQUFTLE1BQU0sV0FBWSxLQUFLLEtBQUssU0FBUyxTQUFTLEtBQUssU0FBUyxTQUFTO0FBQ3ZGLGlCQUFLLEVBQUUsTUFBTSxRQUFRLE9BQU8sUUFBUSxZQUFZLENBQUM7QUFDakQ7QUFBQSxVQUNGO0FBRUEsZUFBSyxFQUFFLE1BQU0sT0FBTyxPQUFPLFFBQVEsWUFBWSxDQUFDO0FBQ2hEO0FBQUEsUUFDRjtBQU1BLFlBQUksVUFBVSxLQUFLO0FBQ2pCLGdCQUFNLFVBQVUsUUFBUSxLQUFLLFVBQVU7QUFDdkMsY0FBSSxDQUFDLFdBQVcsS0FBSyxjQUFjLFFBQVEsS0FBSyxNQUFNLE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSztBQUM1RSx3QkFBWSxTQUFTLEtBQUs7QUFDMUI7QUFBQSxVQUNGO0FBRUEsY0FBSSxRQUFRLEtBQUssU0FBUyxTQUFTO0FBQ2pDLGtCQUFNLE9BQU8sS0FBSztBQUNsQixnQkFBSSxTQUFTO0FBRWIsZ0JBQUksU0FBUyxPQUFPLENBQUMsTUFBTSxvQkFBb0IsR0FBRztBQUNoRCxvQkFBTSxJQUFJLE1BQU0seURBQXlEO0FBQUEsWUFDM0U7QUFFQSxnQkFBSyxLQUFLLFVBQVUsT0FBTyxDQUFDLFNBQVMsS0FBSyxJQUFJLEtBQU8sU0FBUyxPQUFPLENBQUMsZUFBZSxLQUFLLFVBQVUsQ0FBQyxHQUFJO0FBQ3ZHLHVCQUFTLEtBQUssS0FBSztBQUFBLFlBQ3JCO0FBRUEsaUJBQUssRUFBRSxNQUFNLFFBQVEsT0FBTyxPQUFPLENBQUM7QUFDcEM7QUFBQSxVQUNGO0FBRUEsY0FBSSxLQUFLLFFBQVEsU0FBUyxLQUFLLFNBQVMsV0FBVyxLQUFLLFNBQVMsUUFBUTtBQUN2RSxpQkFBSyxFQUFFLE1BQU0sU0FBUyxPQUFPLFFBQVEsYUFBYSxDQUFDO0FBQ25EO0FBQUEsVUFDRjtBQUVBLGVBQUssRUFBRSxNQUFNLFNBQVMsT0FBTyxRQUFRLE1BQU0sQ0FBQztBQUM1QztBQUFBLFFBQ0Y7QUFNQSxZQUFJLFVBQVUsS0FBSztBQUNqQixjQUFJLEtBQUssY0FBYyxRQUFRLEtBQUssTUFBTSxLQUFLO0FBQzdDLGdCQUFJLEtBQUssQ0FBQyxNQUFNLE9BQU8sQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRztBQUM5QywwQkFBWSxVQUFVLEtBQUs7QUFDM0I7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUVBLGNBQUksS0FBSyxhQUFhLFFBQVEsTUFBTSxVQUFVLEdBQUc7QUFDL0MsbUJBQU87QUFDUDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBTUEsWUFBSSxVQUFVLEtBQUs7QUFDakIsY0FBSSxLQUFLLGNBQWMsUUFBUSxLQUFLLE1BQU0sT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLO0FBQ2hFLHdCQUFZLFFBQVEsS0FBSztBQUN6QjtBQUFBLFVBQ0Y7QUFFQSxjQUFLLFFBQVEsS0FBSyxVQUFVLE9BQVEsS0FBSyxVQUFVLE9BQU87QUFDeEQsaUJBQUssRUFBRSxNQUFNLFFBQVEsT0FBTyxRQUFRLGFBQWEsQ0FBQztBQUNsRDtBQUFBLFVBQ0Y7QUFFQSxjQUFLLFNBQVMsS0FBSyxTQUFTLGFBQWEsS0FBSyxTQUFTLFdBQVcsS0FBSyxTQUFTLFlBQWEsTUFBTSxTQUFTLEdBQUc7QUFDN0csaUJBQUssRUFBRSxNQUFNLFFBQVEsTUFBTSxDQUFDO0FBQzVCO0FBQUEsVUFDRjtBQUVBLGVBQUssRUFBRSxNQUFNLFFBQVEsT0FBTyxhQUFhLENBQUM7QUFDMUM7QUFBQSxRQUNGO0FBTUEsWUFBSSxVQUFVLEtBQUs7QUFDakIsY0FBSSxLQUFLLGNBQWMsUUFBUSxLQUFLLE1BQU0sT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLO0FBQ2hFLGlCQUFLLEVBQUUsTUFBTSxNQUFNLFNBQVMsTUFBTSxPQUFPLFFBQVEsR0FBRyxDQUFDO0FBQ3JEO0FBQUEsVUFDRjtBQUVBLGVBQUssRUFBRSxNQUFNLFFBQVEsTUFBTSxDQUFDO0FBQzVCO0FBQUEsUUFDRjtBQU1BLFlBQUksVUFBVSxLQUFLO0FBQ2pCLGNBQUksVUFBVSxPQUFPLFVBQVUsS0FBSztBQUNsQyxvQkFBUSxLQUFLLEtBQUs7QUFBQSxVQUNwQjtBQUVBLGdCQUFNLFFBQVEsd0JBQXdCLEtBQUssVUFBVSxDQUFDO0FBQ3RELGNBQUksT0FBTztBQUNULHFCQUFTLE1BQU0sQ0FBQztBQUNoQixrQkFBTSxTQUFTLE1BQU0sQ0FBQyxFQUFFO0FBQUEsVUFDMUI7QUFFQSxlQUFLLEVBQUUsTUFBTSxRQUFRLE1BQU0sQ0FBQztBQUM1QjtBQUFBLFFBQ0Y7QUFNQSxZQUFJLFNBQVMsS0FBSyxTQUFTLGNBQWMsS0FBSyxTQUFTLE9BQU87QUFDNUQsZUFBSyxPQUFPO0FBQ1osZUFBSyxPQUFPO0FBQ1osZUFBSyxTQUFTO0FBQ2QsZUFBSyxTQUFTO0FBQ2QsZ0JBQU0sWUFBWTtBQUNsQixnQkFBTSxXQUFXO0FBQ2pCLGtCQUFRLEtBQUs7QUFDYjtBQUFBLFFBQ0Y7QUFFQSxZQUFJLE9BQU8sVUFBVTtBQUNyQixZQUFJLEtBQUssY0FBYyxRQUFRLFVBQVUsS0FBSyxJQUFJLEdBQUc7QUFDbkQsc0JBQVksUUFBUSxLQUFLO0FBQ3pCO0FBQUEsUUFDRjtBQUVBLFlBQUksS0FBSyxTQUFTLFFBQVE7QUFDeEIsY0FBSSxLQUFLLGVBQWUsTUFBTTtBQUM1QixvQkFBUSxLQUFLO0FBQ2I7QUFBQSxVQUNGO0FBRUEsZ0JBQU0sUUFBUSxLQUFLO0FBQ25CLGdCQUFNLFNBQVMsTUFBTTtBQUNyQixnQkFBTSxVQUFVLE1BQU0sU0FBUyxXQUFXLE1BQU0sU0FBUztBQUN6RCxnQkFBTSxZQUFZLFdBQVcsT0FBTyxTQUFTLFVBQVUsT0FBTyxTQUFTO0FBRXZFLGNBQUksS0FBSyxTQUFTLFNBQVMsQ0FBQyxXQUFZLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxNQUFNLE1BQU87QUFDcEUsaUJBQUssRUFBRSxNQUFNLFFBQVEsT0FBTyxRQUFRLEdBQUcsQ0FBQztBQUN4QztBQUFBLFVBQ0Y7QUFFQSxnQkFBTSxVQUFVLE1BQU0sU0FBUyxNQUFNLE1BQU0sU0FBUyxXQUFXLE1BQU0sU0FBUztBQUM5RSxnQkFBTSxZQUFZLFNBQVMsV0FBVyxNQUFNLFNBQVMsVUFBVSxNQUFNLFNBQVM7QUFDOUUsY0FBSSxDQUFDLFdBQVcsTUFBTSxTQUFTLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVztBQUNoRSxpQkFBSyxFQUFFLE1BQU0sUUFBUSxPQUFPLFFBQVEsR0FBRyxDQUFDO0FBQ3hDO0FBQUEsVUFDRjtBQUdBLGlCQUFPLEtBQUssTUFBTSxHQUFHLENBQUMsTUFBTSxPQUFPO0FBQ2pDLGtCQUFNLFFBQVEsTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUNuQyxnQkFBSSxTQUFTLFVBQVUsS0FBSztBQUMxQjtBQUFBLFlBQ0Y7QUFDQSxtQkFBTyxLQUFLLE1BQU0sQ0FBQztBQUNuQixvQkFBUSxPQUFPLENBQUM7QUFBQSxVQUNsQjtBQUVBLGNBQUksTUFBTSxTQUFTLFNBQVMsSUFBSSxHQUFHO0FBQ2pDLGlCQUFLLE9BQU87QUFDWixpQkFBSyxTQUFTO0FBQ2QsaUJBQUssU0FBUyxTQUFTLElBQUk7QUFDM0Isa0JBQU0sU0FBUyxLQUFLO0FBQ3BCLGtCQUFNLFdBQVc7QUFDakIsb0JBQVEsS0FBSztBQUNiO0FBQUEsVUFDRjtBQUVBLGNBQUksTUFBTSxTQUFTLFdBQVcsTUFBTSxLQUFLLFNBQVMsU0FBUyxDQUFDLGFBQWEsSUFBSSxHQUFHO0FBQzlFLGtCQUFNLFNBQVMsTUFBTSxPQUFPLE1BQU0sR0FBRyxFQUFFLE1BQU0sU0FBUyxLQUFLLFFBQVEsTUFBTTtBQUN6RSxrQkFBTSxTQUFTLE1BQU0sTUFBTSxNQUFNO0FBRWpDLGlCQUFLLE9BQU87QUFDWixpQkFBSyxTQUFTLFNBQVMsSUFBSSxLQUFLLEtBQUssZ0JBQWdCLE1BQU07QUFDM0QsaUJBQUssU0FBUztBQUNkLGtCQUFNLFdBQVc7QUFDakIsa0JBQU0sVUFBVSxNQUFNLFNBQVMsS0FBSztBQUNwQyxvQkFBUSxLQUFLO0FBQ2I7QUFBQSxVQUNGO0FBRUEsY0FBSSxNQUFNLFNBQVMsV0FBVyxNQUFNLEtBQUssU0FBUyxTQUFTLEtBQUssQ0FBQyxNQUFNLEtBQUs7QUFDMUUsa0JBQU0sTUFBTSxLQUFLLENBQUMsTUFBTSxTQUFTLE9BQU87QUFFeEMsa0JBQU0sU0FBUyxNQUFNLE9BQU8sTUFBTSxHQUFHLEVBQUUsTUFBTSxTQUFTLEtBQUssUUFBUSxNQUFNO0FBQ3pFLGtCQUFNLFNBQVMsTUFBTSxNQUFNLE1BQU07QUFFakMsaUJBQUssT0FBTztBQUNaLGlCQUFLLFNBQVMsR0FBRyxTQUFTLElBQUksQ0FBQyxHQUFHLGFBQWEsSUFBSSxhQUFhLEdBQUcsR0FBRztBQUN0RSxpQkFBSyxTQUFTO0FBRWQsa0JBQU0sVUFBVSxNQUFNLFNBQVMsS0FBSztBQUNwQyxrQkFBTSxXQUFXO0FBRWpCLG9CQUFRLFFBQVEsUUFBUSxDQUFDO0FBRXpCLGlCQUFLLEVBQUUsTUFBTSxTQUFTLE9BQU8sS0FBSyxRQUFRLEdBQUcsQ0FBQztBQUM5QztBQUFBLFVBQ0Y7QUFFQSxjQUFJLE1BQU0sU0FBUyxTQUFTLEtBQUssQ0FBQyxNQUFNLEtBQUs7QUFDM0MsaUJBQUssT0FBTztBQUNaLGlCQUFLLFNBQVM7QUFDZCxpQkFBSyxTQUFTLFFBQVEsYUFBYSxJQUFJLFNBQVMsSUFBSSxDQUFDLEdBQUcsYUFBYTtBQUNyRSxrQkFBTSxTQUFTLEtBQUs7QUFDcEIsa0JBQU0sV0FBVztBQUNqQixvQkFBUSxRQUFRLFFBQVEsQ0FBQztBQUN6QixpQkFBSyxFQUFFLE1BQU0sU0FBUyxPQUFPLEtBQUssUUFBUSxHQUFHLENBQUM7QUFDOUM7QUFBQSxVQUNGO0FBR0EsZ0JBQU0sU0FBUyxNQUFNLE9BQU8sTUFBTSxHQUFHLENBQUMsS0FBSyxPQUFPLE1BQU07QUFHeEQsZUFBSyxPQUFPO0FBQ1osZUFBSyxTQUFTLFNBQVMsSUFBSTtBQUMzQixlQUFLLFNBQVM7QUFHZCxnQkFBTSxVQUFVLEtBQUs7QUFDckIsZ0JBQU0sV0FBVztBQUNqQixrQkFBUSxLQUFLO0FBQ2I7QUFBQSxRQUNGO0FBRUEsY0FBTSxRQUFRLEVBQUUsTUFBTSxRQUFRLE9BQU8sUUFBUSxLQUFLO0FBRWxELFlBQUksS0FBSyxTQUFTLE1BQU07QUFDdEIsZ0JBQU0sU0FBUztBQUNmLGNBQUksS0FBSyxTQUFTLFNBQVMsS0FBSyxTQUFTLFNBQVM7QUFDaEQsa0JBQU0sU0FBUyxRQUFRLE1BQU07QUFBQSxVQUMvQjtBQUNBLGVBQUssS0FBSztBQUNWO0FBQUEsUUFDRjtBQUVBLFlBQUksU0FBUyxLQUFLLFNBQVMsYUFBYSxLQUFLLFNBQVMsWUFBWSxLQUFLLFVBQVUsTUFBTTtBQUNyRixnQkFBTSxTQUFTO0FBQ2YsZUFBSyxLQUFLO0FBQ1Y7QUFBQSxRQUNGO0FBRUEsWUFBSSxNQUFNLFVBQVUsTUFBTSxTQUFTLEtBQUssU0FBUyxXQUFXLEtBQUssU0FBUyxPQUFPO0FBQy9FLGNBQUksS0FBSyxTQUFTLE9BQU87QUFDdkIsa0JBQU0sVUFBVTtBQUNoQixpQkFBSyxVQUFVO0FBQUEsVUFFakIsV0FBVyxLQUFLLFFBQVEsTUFBTTtBQUM1QixrQkFBTSxVQUFVO0FBQ2hCLGlCQUFLLFVBQVU7QUFBQSxVQUVqQixPQUFPO0FBQ0wsa0JBQU0sVUFBVTtBQUNoQixpQkFBSyxVQUFVO0FBQUEsVUFDakI7QUFFQSxjQUFJLEtBQUssTUFBTSxLQUFLO0FBQ2xCLGtCQUFNLFVBQVU7QUFDaEIsaUJBQUssVUFBVTtBQUFBLFVBQ2pCO0FBQUEsUUFDRjtBQUVBLGFBQUssS0FBSztBQUFBLE1BQ1o7QUFFQSxhQUFPLE1BQU0sV0FBVyxHQUFHO0FBQ3pCLFlBQUksS0FBSyxtQkFBbUI7QUFBTSxnQkFBTSxJQUFJLFlBQVksWUFBWSxXQUFXLEdBQUcsQ0FBQztBQUNuRixjQUFNLFNBQVMsTUFBTSxXQUFXLE1BQU0sUUFBUSxHQUFHO0FBQ2pELGtCQUFVLFVBQVU7QUFBQSxNQUN0QjtBQUVBLGFBQU8sTUFBTSxTQUFTLEdBQUc7QUFDdkIsWUFBSSxLQUFLLG1CQUFtQjtBQUFNLGdCQUFNLElBQUksWUFBWSxZQUFZLFdBQVcsR0FBRyxDQUFDO0FBQ25GLGNBQU0sU0FBUyxNQUFNLFdBQVcsTUFBTSxRQUFRLEdBQUc7QUFDakQsa0JBQVUsUUFBUTtBQUFBLE1BQ3BCO0FBRUEsYUFBTyxNQUFNLFNBQVMsR0FBRztBQUN2QixZQUFJLEtBQUssbUJBQW1CO0FBQU0sZ0JBQU0sSUFBSSxZQUFZLFlBQVksV0FBVyxHQUFHLENBQUM7QUFDbkYsY0FBTSxTQUFTLE1BQU0sV0FBVyxNQUFNLFFBQVEsR0FBRztBQUNqRCxrQkFBVSxRQUFRO0FBQUEsTUFDcEI7QUFFQSxVQUFJLEtBQUssa0JBQWtCLFNBQVMsS0FBSyxTQUFTLFVBQVUsS0FBSyxTQUFTLFlBQVk7QUFDcEYsYUFBSyxFQUFFLE1BQU0sZUFBZSxPQUFPLElBQUksUUFBUSxHQUFHLGFBQWEsSUFBSSxDQUFDO0FBQUEsTUFDdEU7QUFHQSxVQUFJLE1BQU0sY0FBYyxNQUFNO0FBQzVCLGNBQU0sU0FBUztBQUVmLG1CQUFXLFNBQVMsTUFBTSxRQUFRO0FBQ2hDLGdCQUFNLFVBQVUsTUFBTSxVQUFVLE9BQU8sTUFBTSxTQUFTLE1BQU07QUFFNUQsY0FBSSxNQUFNLFFBQVE7QUFDaEIsa0JBQU0sVUFBVSxNQUFNO0FBQUEsVUFDeEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLGFBQU87QUFBQSxJQUNUO0FBUUEsVUFBTSxZQUFZLENBQUMsT0FBTyxZQUFZO0FBQ3BDLFlBQU0sT0FBTyxFQUFFLEdBQUcsUUFBUTtBQUMxQixZQUFNLE1BQU0sT0FBTyxLQUFLLGNBQWMsV0FBVyxLQUFLLElBQUksWUFBWSxLQUFLLFNBQVMsSUFBSTtBQUN4RixZQUFNLE1BQU0sTUFBTTtBQUNsQixVQUFJLE1BQU0sS0FBSztBQUNiLGNBQU0sSUFBSSxZQUFZLGlCQUFpQixHQUFHLHFDQUFxQyxHQUFHLEVBQUU7QUFBQSxNQUN0RjtBQUVBLGNBQVEsYUFBYSxLQUFLLEtBQUs7QUFDL0IsWUFBTSxRQUFRLE1BQU0sVUFBVSxPQUFPO0FBR3JDLFlBQU07QUFBQSxRQUNKO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLElBQUksVUFBVSxVQUFVLEtBQUs7QUFFN0IsWUFBTSxRQUFRLEtBQUssTUFBTSxVQUFVO0FBQ25DLFlBQU0sV0FBVyxLQUFLLE1BQU0sZ0JBQWdCO0FBQzVDLFlBQU0sVUFBVSxLQUFLLFVBQVUsS0FBSztBQUNwQyxZQUFNLFFBQVEsRUFBRSxTQUFTLE9BQU8sUUFBUSxHQUFHO0FBQzNDLFVBQUksT0FBTyxLQUFLLFNBQVMsT0FBTyxRQUFRO0FBRXhDLFVBQUksS0FBSyxTQUFTO0FBQ2hCLGVBQU8sSUFBSSxJQUFJO0FBQUEsTUFDakI7QUFFQSxZQUFNLFdBQVcsQ0FBQUYsVUFBUTtBQUN2QixZQUFJQSxNQUFLLGVBQWU7QUFBTSxpQkFBTztBQUNyQyxlQUFPLElBQUksT0FBTyxTQUFTLFlBQVksR0FBR0EsTUFBSyxNQUFNLGFBQWEsV0FBVztBQUFBLE1BQy9FO0FBRUEsWUFBTSxTQUFTLFNBQU87QUFDcEIsZ0JBQVEsS0FBSztBQUFBLFVBQ1gsS0FBSztBQUNILG1CQUFPLEdBQUcsS0FBSyxHQUFHLFFBQVEsR0FBRyxJQUFJO0FBQUEsVUFFbkMsS0FBSztBQUNILG1CQUFPLEdBQUcsV0FBVyxHQUFHLFFBQVEsR0FBRyxJQUFJO0FBQUEsVUFFekMsS0FBSztBQUNILG1CQUFPLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxXQUFXLEdBQUcsUUFBUSxHQUFHLElBQUk7QUFBQSxVQUV4RCxLQUFLO0FBQ0gsbUJBQU8sR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLGFBQWEsR0FBRyxRQUFRLEdBQUcsUUFBUSxHQUFHLElBQUk7QUFBQSxVQUVyRSxLQUFLO0FBQ0gsbUJBQU8sUUFBUSxTQUFTLElBQUk7QUFBQSxVQUU5QixLQUFLO0FBQ0gsbUJBQU8sTUFBTSxLQUFLLEdBQUcsU0FBUyxJQUFJLENBQUMsR0FBRyxhQUFhLEtBQUssUUFBUSxHQUFHLFFBQVEsR0FBRyxJQUFJO0FBQUEsVUFFcEYsS0FBSztBQUNILG1CQUFPLE1BQU0sS0FBSyxHQUFHLFNBQVMsSUFBSSxDQUFDLEdBQUcsYUFBYSxLQUFLLFFBQVEsR0FBRyxJQUFJLEdBQUcsV0FBVyxHQUFHLFFBQVEsR0FBRyxJQUFJO0FBQUEsVUFFekcsS0FBSztBQUNILG1CQUFPLE1BQU0sS0FBSyxHQUFHLFNBQVMsSUFBSSxDQUFDLEdBQUcsYUFBYSxLQUFLLFdBQVcsR0FBRyxRQUFRLEdBQUcsSUFBSTtBQUFBLFVBRXZGLFNBQVM7QUFDUCxrQkFBTSxRQUFRLGlCQUFpQixLQUFLLEdBQUc7QUFDdkMsZ0JBQUksQ0FBQztBQUFPO0FBRVosa0JBQU1HLFVBQVMsT0FBTyxNQUFNLENBQUMsQ0FBQztBQUM5QixnQkFBSSxDQUFDQTtBQUFRO0FBRWIsbUJBQU9BLFVBQVMsY0FBYyxNQUFNLENBQUM7QUFBQSxVQUN2QztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsWUFBTSxTQUFTLE1BQU0sYUFBYSxPQUFPLEtBQUs7QUFDOUMsVUFBSSxTQUFTLE9BQU8sTUFBTTtBQUUxQixVQUFJLFVBQVUsS0FBSyxrQkFBa0IsTUFBTTtBQUN6QyxrQkFBVSxHQUFHLGFBQWE7QUFBQSxNQUM1QjtBQUVBLGFBQU87QUFBQSxJQUNUO0FBRUEsSUFBQUwsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDLzJDakI7QUFBQSxxREFBQU0sU0FBQTtBQUFBO0FBRUEsUUFBTSxPQUFPLFFBQVEsTUFBTTtBQUMzQixRQUFNLE9BQU87QUFDYixRQUFNLFFBQVE7QUFDZCxRQUFNLFFBQVE7QUFDZCxRQUFNLFlBQVk7QUFDbEIsUUFBTSxXQUFXLFNBQU8sT0FBTyxPQUFPLFFBQVEsWUFBWSxDQUFDLE1BQU0sUUFBUSxHQUFHO0FBd0I1RSxRQUFNLFlBQVksQ0FBQyxNQUFNLFNBQVMsY0FBYyxVQUFVO0FBQ3hELFVBQUksTUFBTSxRQUFRLElBQUksR0FBRztBQUN2QixjQUFNLE1BQU0sS0FBSyxJQUFJLFdBQVMsVUFBVSxPQUFPLFNBQVMsV0FBVyxDQUFDO0FBQ3BFLGNBQU0sZUFBZSxTQUFPO0FBQzFCLHFCQUFXQyxZQUFXLEtBQUs7QUFDekIsa0JBQU1DLFNBQVFELFNBQVEsR0FBRztBQUN6QixnQkFBSUM7QUFBTyxxQkFBT0E7QUFBQSxVQUNwQjtBQUNBLGlCQUFPO0FBQUEsUUFDVDtBQUNBLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxVQUFVLFNBQVMsSUFBSSxLQUFLLEtBQUssVUFBVSxLQUFLO0FBRXRELFVBQUksU0FBUyxNQUFPLE9BQU8sU0FBUyxZQUFZLENBQUMsU0FBVTtBQUN6RCxjQUFNLElBQUksVUFBVSwyQ0FBMkM7QUFBQSxNQUNqRTtBQUVBLFlBQU0sT0FBTyxXQUFXLENBQUM7QUFDekIsWUFBTSxRQUFRLE1BQU0sVUFBVSxPQUFPO0FBQ3JDLFlBQU0sUUFBUSxVQUNWLFVBQVUsVUFBVSxNQUFNLE9BQU8sSUFDakMsVUFBVSxPQUFPLE1BQU0sU0FBUyxPQUFPLElBQUk7QUFFL0MsWUFBTSxRQUFRLE1BQU07QUFDcEIsYUFBTyxNQUFNO0FBRWIsVUFBSSxZQUFZLE1BQU07QUFDdEIsVUFBSSxLQUFLLFFBQVE7QUFDZixjQUFNLGFBQWEsRUFBRSxHQUFHLFNBQVMsUUFBUSxNQUFNLFNBQVMsTUFBTSxVQUFVLEtBQUs7QUFDN0Usb0JBQVksVUFBVSxLQUFLLFFBQVEsWUFBWSxXQUFXO0FBQUEsTUFDNUQ7QUFFQSxZQUFNLFVBQVUsQ0FBQyxPQUFPLGVBQWUsVUFBVTtBQUMvQyxjQUFNLEVBQUUsU0FBQUQsVUFBUyxPQUFPLE9BQU8sSUFBSSxVQUFVLEtBQUssT0FBTyxPQUFPLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RixjQUFNLFNBQVMsRUFBRSxNQUFNLE9BQU8sT0FBTyxPQUFPLE9BQU8sUUFBUSxPQUFPLFNBQUFBLFNBQVE7QUFFMUUsWUFBSSxPQUFPLEtBQUssYUFBYSxZQUFZO0FBQ3ZDLGVBQUssU0FBUyxNQUFNO0FBQUEsUUFDdEI7QUFFQSxZQUFJQSxhQUFZLE9BQU87QUFDckIsaUJBQU8sVUFBVTtBQUNqQixpQkFBTyxlQUFlLFNBQVM7QUFBQSxRQUNqQztBQUVBLFlBQUksVUFBVSxLQUFLLEdBQUc7QUFDcEIsY0FBSSxPQUFPLEtBQUssYUFBYSxZQUFZO0FBQ3ZDLGlCQUFLLFNBQVMsTUFBTTtBQUFBLFVBQ3RCO0FBQ0EsaUJBQU8sVUFBVTtBQUNqQixpQkFBTyxlQUFlLFNBQVM7QUFBQSxRQUNqQztBQUVBLFlBQUksT0FBTyxLQUFLLFlBQVksWUFBWTtBQUN0QyxlQUFLLFFBQVEsTUFBTTtBQUFBLFFBQ3JCO0FBQ0EsZUFBTyxlQUFlLFNBQVM7QUFBQSxNQUNqQztBQUVBLFVBQUksYUFBYTtBQUNmLGdCQUFRLFFBQVE7QUFBQSxNQUNsQjtBQUVBLGFBQU87QUFBQSxJQUNUO0FBbUJBLGNBQVUsT0FBTyxDQUFDLE9BQU8sT0FBTyxTQUFTLEVBQUUsTUFBTSxNQUFNLElBQUksQ0FBQyxNQUFNO0FBQ2hFLFVBQUksT0FBTyxVQUFVLFVBQVU7QUFDN0IsY0FBTSxJQUFJLFVBQVUsK0JBQStCO0FBQUEsTUFDckQ7QUFFQSxVQUFJLFVBQVUsSUFBSTtBQUNoQixlQUFPLEVBQUUsU0FBUyxPQUFPLFFBQVEsR0FBRztBQUFBLE1BQ3RDO0FBRUEsWUFBTSxPQUFPLFdBQVcsQ0FBQztBQUN6QixZQUFNLFNBQVMsS0FBSyxXQUFXLFFBQVEsTUFBTSxpQkFBaUI7QUFDOUQsVUFBSSxRQUFRLFVBQVU7QUFDdEIsVUFBSSxTQUFVLFNBQVMsU0FBVSxPQUFPLEtBQUssSUFBSTtBQUVqRCxVQUFJLFVBQVUsT0FBTztBQUNuQixpQkFBUyxTQUFTLE9BQU8sS0FBSyxJQUFJO0FBQ2xDLGdCQUFRLFdBQVc7QUFBQSxNQUNyQjtBQUVBLFVBQUksVUFBVSxTQUFTLEtBQUssWUFBWSxNQUFNO0FBQzVDLFlBQUksS0FBSyxjQUFjLFFBQVEsS0FBSyxhQUFhLE1BQU07QUFDckQsa0JBQVEsVUFBVSxVQUFVLE9BQU8sT0FBTyxTQUFTLEtBQUs7QUFBQSxRQUMxRCxPQUFPO0FBQ0wsa0JBQVEsTUFBTSxLQUFLLE1BQU07QUFBQSxRQUMzQjtBQUFBLE1BQ0Y7QUFFQSxhQUFPLEVBQUUsU0FBUyxRQUFRLEtBQUssR0FBRyxPQUFPLE9BQU87QUFBQSxJQUNsRDtBQWdCQSxjQUFVLFlBQVksQ0FBQyxPQUFPLE1BQU0sU0FBUyxRQUFRLE1BQU0sVUFBVSxPQUFPLE1BQU07QUFDaEYsWUFBTSxRQUFRLGdCQUFnQixTQUFTLE9BQU8sVUFBVSxPQUFPLE1BQU0sT0FBTztBQUM1RSxhQUFPLE1BQU0sS0FBSyxLQUFLLFNBQVMsS0FBSyxDQUFDO0FBQUEsSUFDeEM7QUFtQkEsY0FBVSxVQUFVLENBQUMsS0FBSyxVQUFVLFlBQVksVUFBVSxVQUFVLE9BQU8sRUFBRSxHQUFHO0FBZ0JoRixjQUFVLFFBQVEsQ0FBQyxTQUFTLFlBQVk7QUFDdEMsVUFBSSxNQUFNLFFBQVEsT0FBTztBQUFHLGVBQU8sUUFBUSxJQUFJLE9BQUssVUFBVSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQy9FLGFBQU8sTUFBTSxTQUFTLEVBQUUsR0FBRyxTQUFTLFdBQVcsTUFBTSxDQUFDO0FBQUEsSUFDeEQ7QUE2QkEsY0FBVSxPQUFPLENBQUMsT0FBTyxZQUFZLEtBQUssT0FBTyxPQUFPO0FBY3hELGNBQVUsWUFBWSxDQUFDLE9BQU8sU0FBUyxlQUFlLE9BQU8sY0FBYyxVQUFVO0FBQ25GLFVBQUksaUJBQWlCLE1BQU07QUFDekIsZUFBTyxNQUFNO0FBQUEsTUFDZjtBQUVBLFlBQU0sT0FBTyxXQUFXLENBQUM7QUFDekIsWUFBTSxVQUFVLEtBQUssV0FBVyxLQUFLO0FBQ3JDLFlBQU0sU0FBUyxLQUFLLFdBQVcsS0FBSztBQUVwQyxVQUFJLFNBQVMsR0FBRyxPQUFPLE1BQU0sTUFBTSxNQUFNLElBQUksTUFBTTtBQUNuRCxVQUFJLFNBQVMsTUFBTSxZQUFZLE1BQU07QUFDbkMsaUJBQVMsT0FBTyxNQUFNO0FBQUEsTUFDeEI7QUFFQSxZQUFNLFFBQVEsVUFBVSxRQUFRLFFBQVEsT0FBTztBQUMvQyxVQUFJLGdCQUFnQixNQUFNO0FBQ3hCLGNBQU0sUUFBUTtBQUFBLE1BQ2hCO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFxQkEsY0FBVSxTQUFTLENBQUMsT0FBTyxVQUFVLENBQUMsR0FBRyxlQUFlLE9BQU8sY0FBYyxVQUFVO0FBQ3JGLFVBQUksQ0FBQyxTQUFTLE9BQU8sVUFBVSxVQUFVO0FBQ3ZDLGNBQU0sSUFBSSxVQUFVLDZCQUE2QjtBQUFBLE1BQ25EO0FBRUEsVUFBSSxTQUFTLEVBQUUsU0FBUyxPQUFPLFdBQVcsS0FBSztBQUUvQyxVQUFJLFFBQVEsY0FBYyxVQUFVLE1BQU0sQ0FBQyxNQUFNLE9BQU8sTUFBTSxDQUFDLE1BQU0sTUFBTTtBQUN6RSxlQUFPLFNBQVMsTUFBTSxVQUFVLE9BQU8sT0FBTztBQUFBLE1BQ2hEO0FBRUEsVUFBSSxDQUFDLE9BQU8sUUFBUTtBQUNsQixpQkFBUyxNQUFNLE9BQU8sT0FBTztBQUFBLE1BQy9CO0FBRUEsYUFBTyxVQUFVLFVBQVUsUUFBUSxTQUFTLGNBQWMsV0FBVztBQUFBLElBQ3ZFO0FBbUJBLGNBQVUsVUFBVSxDQUFDLFFBQVEsWUFBWTtBQUN2QyxVQUFJO0FBQ0YsY0FBTSxPQUFPLFdBQVcsQ0FBQztBQUN6QixlQUFPLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxLQUFLLFNBQVMsTUFBTSxHQUFHO0FBQUEsTUFDbEUsU0FBUyxLQUFLO0FBQ1osWUFBSSxXQUFXLFFBQVEsVUFBVTtBQUFNLGdCQUFNO0FBQzdDLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQU9BLGNBQVUsWUFBWTtBQU10QixJQUFBRCxRQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNyVmpCLElBQUFHLHFCQUFBO0FBQUEsNkNBQUFDLFNBQUE7QUFBQTtBQUVBLElBQUFBLFFBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ0ZqQjtBQUFBLDhDQUFBQyxTQUFBO0FBQUE7QUFFQSxRQUFNLE9BQU8sUUFBUSxNQUFNO0FBQzNCLFFBQU0sU0FBUztBQUNmLFFBQU0sWUFBWTtBQUNsQixRQUFNLFFBQVE7QUFFZCxRQUFNLGdCQUFnQixPQUFLLE1BQU0sTUFBTSxNQUFNO0FBQzdDLFFBQU0sWUFBWSxPQUFLO0FBQ3JCLFlBQU0sUUFBUSxFQUFFLFFBQVEsR0FBRztBQUMzQixhQUFPLFFBQVEsTUFBTSxFQUFFLFFBQVEsS0FBSyxLQUFLLElBQUk7QUFBQSxJQUMvQztBQW9CQSxRQUFNLGFBQWEsQ0FBQyxNQUFNLFVBQVUsWUFBWTtBQUM5QyxpQkFBVyxDQUFDLEVBQUUsT0FBTyxRQUFRO0FBQzdCLGFBQU8sQ0FBQyxFQUFFLE9BQU8sSUFBSTtBQUVyQixVQUFJLE9BQU8sb0JBQUksSUFBSTtBQUNuQixVQUFJLE9BQU8sb0JBQUksSUFBSTtBQUNuQixVQUFJLFFBQVEsb0JBQUksSUFBSTtBQUNwQixVQUFJLFlBQVk7QUFFaEIsVUFBSSxXQUFXLFdBQVM7QUFDdEIsY0FBTSxJQUFJLE1BQU0sTUFBTTtBQUN0QixZQUFJLFdBQVcsUUFBUSxVQUFVO0FBQy9CLGtCQUFRLFNBQVMsS0FBSztBQUFBLFFBQ3hCO0FBQUEsTUFDRjtBQUVBLGVBQVMsSUFBSSxHQUFHLElBQUksU0FBUyxRQUFRLEtBQUs7QUFDeEMsWUFBSUMsV0FBVSxVQUFVLE9BQU8sU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxTQUFTLEdBQUcsSUFBSTtBQUMzRSxZQUFJLFVBQVVBLFNBQVEsTUFBTSxXQUFXQSxTQUFRLE1BQU07QUFDckQsWUFBSTtBQUFTO0FBRWIsaUJBQVMsUUFBUSxNQUFNO0FBQ3JCLGNBQUksVUFBVUEsU0FBUSxNQUFNLElBQUk7QUFFaEMsY0FBSSxRQUFRLFVBQVUsQ0FBQyxRQUFRLFVBQVUsUUFBUTtBQUNqRCxjQUFJLENBQUM7QUFBTztBQUVaLGNBQUksU0FBUztBQUNYLGlCQUFLLElBQUksUUFBUSxNQUFNO0FBQUEsVUFDekIsT0FBTztBQUNMLGlCQUFLLE9BQU8sUUFBUSxNQUFNO0FBQzFCLGlCQUFLLElBQUksUUFBUSxNQUFNO0FBQUEsVUFDekI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLFVBQUksU0FBUyxjQUFjLFNBQVMsU0FBUyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJO0FBQ2xFLFVBQUksVUFBVSxPQUFPLE9BQU8sVUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7QUFFbkQsVUFBSSxXQUFXLFFBQVEsV0FBVyxHQUFHO0FBQ25DLFlBQUksUUFBUSxhQUFhLE1BQU07QUFDN0IsZ0JBQU0sSUFBSSxNQUFNLHlCQUF5QixTQUFTLEtBQUssSUFBSSxDQUFDLEdBQUc7QUFBQSxRQUNqRTtBQUVBLFlBQUksUUFBUSxXQUFXLFFBQVEsUUFBUSxhQUFhLE1BQU07QUFDeEQsaUJBQU8sUUFBUSxXQUFXLFNBQVMsSUFBSSxPQUFLLEVBQUUsUUFBUSxPQUFPLEVBQUUsQ0FBQyxJQUFJO0FBQUEsUUFDdEU7QUFBQSxNQUNGO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFNQSxlQUFXLFFBQVE7QUFxQm5CLGVBQVcsVUFBVSxDQUFDLFNBQVMsWUFBWSxVQUFVLFNBQVMsT0FBTztBQW1CckUsZUFBVyxVQUFVLENBQUMsS0FBSyxVQUFVLFlBQVksVUFBVSxVQUFVLE9BQU8sRUFBRSxHQUFHO0FBTWpGLGVBQVcsTUFBTSxXQUFXO0FBbUI1QixlQUFXLE1BQU0sQ0FBQyxNQUFNLFVBQVUsVUFBVSxDQUFDLE1BQU07QUFDakQsaUJBQVcsQ0FBQyxFQUFFLE9BQU8sUUFBUSxFQUFFLElBQUksTUFBTTtBQUN6QyxVQUFJLFNBQVMsb0JBQUksSUFBSTtBQUNyQixVQUFJLFFBQVEsQ0FBQztBQUViLFVBQUksV0FBVyxXQUFTO0FBQ3RCLFlBQUksUUFBUTtBQUFVLGtCQUFRLFNBQVMsS0FBSztBQUM1QyxjQUFNLEtBQUssTUFBTSxNQUFNO0FBQUEsTUFDekI7QUFFQSxVQUFJLFVBQVUsSUFBSSxJQUFJLFdBQVcsTUFBTSxVQUFVLEVBQUUsR0FBRyxTQUFTLFNBQVMsQ0FBQyxDQUFDO0FBRTFFLGVBQVMsUUFBUSxPQUFPO0FBQ3RCLFlBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxHQUFHO0FBQ3RCLGlCQUFPLElBQUksSUFBSTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUNBLGFBQU8sQ0FBQyxHQUFHLE1BQU07QUFBQSxJQUNuQjtBQXNCQSxlQUFXLFdBQVcsQ0FBQyxLQUFLLFNBQVMsWUFBWTtBQUMvQyxVQUFJLE9BQU8sUUFBUSxVQUFVO0FBQzNCLGNBQU0sSUFBSSxVQUFVLHVCQUF1QixLQUFLLFFBQVEsR0FBRyxDQUFDLEdBQUc7QUFBQSxNQUNqRTtBQUVBLFVBQUksTUFBTSxRQUFRLE9BQU8sR0FBRztBQUMxQixlQUFPLFFBQVEsS0FBSyxPQUFLLFdBQVcsU0FBUyxLQUFLLEdBQUcsT0FBTyxDQUFDO0FBQUEsTUFDL0Q7QUFFQSxVQUFJLE9BQU8sWUFBWSxVQUFVO0FBQy9CLFlBQUksY0FBYyxHQUFHLEtBQUssY0FBYyxPQUFPLEdBQUc7QUFDaEQsaUJBQU87QUFBQSxRQUNUO0FBRUEsWUFBSSxJQUFJLFNBQVMsT0FBTyxLQUFNLElBQUksV0FBVyxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUMsRUFBRSxTQUFTLE9BQU8sR0FBSTtBQUNyRixpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBRUEsYUFBTyxXQUFXLFFBQVEsS0FBSyxTQUFTLEVBQUUsR0FBRyxTQUFTLFVBQVUsS0FBSyxDQUFDO0FBQUEsSUFDeEU7QUFzQkEsZUFBVyxZQUFZLENBQUMsS0FBSyxVQUFVLFlBQVk7QUFDakQsVUFBSSxDQUFDLE1BQU0sU0FBUyxHQUFHLEdBQUc7QUFDeEIsY0FBTSxJQUFJLFVBQVUsNkNBQTZDO0FBQUEsTUFDbkU7QUFDQSxVQUFJLE9BQU8sV0FBVyxPQUFPLEtBQUssR0FBRyxHQUFHLFVBQVUsT0FBTztBQUN6RCxVQUFJLE1BQU0sQ0FBQztBQUNYLGVBQVMsT0FBTztBQUFNLFlBQUksR0FBRyxJQUFJLElBQUksR0FBRztBQUN4QyxhQUFPO0FBQUEsSUFDVDtBQXFCQSxlQUFXLE9BQU8sQ0FBQyxNQUFNLFVBQVUsWUFBWTtBQUM3QyxVQUFJLFFBQVEsQ0FBQyxFQUFFLE9BQU8sSUFBSTtBQUUxQixlQUFTLFdBQVcsQ0FBQyxFQUFFLE9BQU8sUUFBUSxHQUFHO0FBQ3ZDLFlBQUlBLFdBQVUsVUFBVSxPQUFPLE9BQU8sR0FBRyxPQUFPO0FBQ2hELFlBQUksTUFBTSxLQUFLLFVBQVFBLFNBQVEsSUFBSSxDQUFDLEdBQUc7QUFDckMsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBMEJBLGVBQVcsUUFBUSxDQUFDLE1BQU0sVUFBVSxZQUFZO0FBQzlDLFVBQUksUUFBUSxDQUFDLEVBQUUsT0FBTyxJQUFJO0FBRTFCLGVBQVMsV0FBVyxDQUFDLEVBQUUsT0FBTyxRQUFRLEdBQUc7QUFDdkMsWUFBSUEsV0FBVSxVQUFVLE9BQU8sT0FBTyxHQUFHLE9BQU87QUFDaEQsWUFBSSxDQUFDLE1BQU0sTUFBTSxVQUFRQSxTQUFRLElBQUksQ0FBQyxHQUFHO0FBQ3ZDLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQTZCQSxlQUFXLE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWTtBQUMzQyxVQUFJLE9BQU8sUUFBUSxVQUFVO0FBQzNCLGNBQU0sSUFBSSxVQUFVLHVCQUF1QixLQUFLLFFBQVEsR0FBRyxDQUFDLEdBQUc7QUFBQSxNQUNqRTtBQUVBLGFBQU8sQ0FBQyxFQUFFLE9BQU8sUUFBUSxFQUFFLE1BQU0sT0FBSyxVQUFVLEdBQUcsT0FBTyxFQUFFLEdBQUcsQ0FBQztBQUFBLElBQ2xFO0FBcUJBLGVBQVcsVUFBVSxDQUFDLE1BQU0sT0FBTyxZQUFZO0FBQzdDLFVBQUksUUFBUSxNQUFNLFVBQVUsT0FBTztBQUNuQyxVQUFJLFFBQVEsVUFBVSxPQUFPLE9BQU8sSUFBSSxHQUFHLEVBQUUsR0FBRyxTQUFTLFNBQVMsS0FBSyxDQUFDO0FBQ3hFLFVBQUksUUFBUSxNQUFNLEtBQUssUUFBUSxNQUFNLGVBQWUsS0FBSyxJQUFJLEtBQUs7QUFFbEUsVUFBSSxPQUFPO0FBQ1QsZUFBTyxNQUFNLE1BQU0sQ0FBQyxFQUFFLElBQUksT0FBSyxNQUFNLFNBQVMsS0FBSyxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBa0JBLGVBQVcsU0FBUyxJQUFJLFNBQVMsVUFBVSxPQUFPLEdBQUcsSUFBSTtBQWdCekQsZUFBVyxPQUFPLElBQUksU0FBUyxVQUFVLEtBQUssR0FBRyxJQUFJO0FBZ0JyRCxlQUFXLFFBQVEsQ0FBQyxVQUFVLFlBQVk7QUFDeEMsVUFBSSxNQUFNLENBQUM7QUFDWCxlQUFTLFdBQVcsQ0FBQyxFQUFFLE9BQU8sWUFBWSxDQUFDLENBQUMsR0FBRztBQUM3QyxpQkFBUyxPQUFPLE9BQU8sT0FBTyxPQUFPLEdBQUcsT0FBTyxHQUFHO0FBQ2hELGNBQUksS0FBSyxVQUFVLE1BQU0sS0FBSyxPQUFPLENBQUM7QUFBQSxRQUN4QztBQUFBLE1BQ0Y7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQW1CQSxlQUFXLFNBQVMsQ0FBQyxTQUFTLFlBQVk7QUFDeEMsVUFBSSxPQUFPLFlBQVk7QUFBVSxjQUFNLElBQUksVUFBVSxtQkFBbUI7QUFDeEUsVUFBSyxXQUFXLFFBQVEsWUFBWSxRQUFTLENBQUMsVUFBVSxPQUFPLEdBQUc7QUFDaEUsZUFBTyxDQUFDLE9BQU87QUFBQSxNQUNqQjtBQUNBLGFBQU8sT0FBTyxTQUFTLE9BQU87QUFBQSxJQUNoQztBQU1BLGVBQVcsY0FBYyxDQUFDLFNBQVMsWUFBWTtBQUM3QyxVQUFJLE9BQU8sWUFBWTtBQUFVLGNBQU0sSUFBSSxVQUFVLG1CQUFtQjtBQUN4RSxhQUFPLFdBQVcsT0FBTyxTQUFTLEVBQUUsR0FBRyxTQUFTLFFBQVEsS0FBSyxDQUFDO0FBQUEsSUFDaEU7QUFPQSxlQUFXLFlBQVk7QUFDdkIsSUFBQUQsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDemRqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWdDTyxTQUFTLGtCQUFrQixVQUFnQyxDQUFDLEdBQWdCO0FBQ2pGLFNBQU87QUFBQSxJQUNMLElBQ0UsT0FBTyxXQUFXLGVBQWUsZ0JBQWdCLFNBQzdDLE9BQU8sV0FBVyxJQUNsQixRQUFRLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUFBLElBQ2xFLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLFNBQVM7QUFBQSxJQUNULGNBQWMsUUFBUSxnQkFBZ0I7QUFBQSxJQUN0QyxjQUFjLFFBQVEsZ0JBQWdCLENBQUM7QUFBQSxJQUN2QyxZQUFZO0FBQUEsSUFDWixjQUFjO0FBQUEsSUFDZCxpQkFBaUI7QUFBQSxJQUNqQixpQkFBaUIsQ0FBQyxHQUFHLHdCQUF3QjtBQUFBLElBQzdDLG9CQUFvQjtBQUFBLElBQ3BCLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQSxJQUNmLG1CQUFtQjtBQUFBLElBQ25CLGtCQUFrQjtBQUFBLElBQ2xCLGlCQUFpQjtBQUFBLElBQ2pCLEdBQUc7QUFBQSxFQUNMO0FBQ0Y7QUExREEsSUFHYSwwQkFFQSx5QkFVQTtBQWZiO0FBQUE7QUFHTyxJQUFNLDJCQUEyQixDQUFDLGNBQWMsZ0JBQWdCLGNBQWM7QUFFOUUsSUFBTSwwQkFBMEM7QUFBQSxNQUNyRCxZQUFZO0FBQUEsTUFDWixnQkFBZ0I7QUFBQSxNQUNoQixnQkFBZ0I7QUFBQSxNQUNoQixpQkFBaUI7QUFBQSxNQUNqQixxQkFBcUI7QUFBQSxNQUNyQixjQUFjO0FBQUEsTUFDZCxpQkFBaUI7QUFBQSxJQUNuQjtBQUVPLElBQU0sbUJBQXNDO0FBQUEsTUFDakQsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIsT0FBTyxDQUFDO0FBQUEsTUFDUixjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsTUFDZixRQUFRLEVBQUUsR0FBRyx3QkFBd0I7QUFBQSxNQUNyQyxrQkFBa0I7QUFBQSxNQUNsQix5QkFBeUI7QUFBQSxNQUN6QixxQkFBcUI7QUFBQSxJQUN2QjtBQUFBO0FBQUE7OztBQzdCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBQUUsb0JBQXVEOzs7QUNBdkQsc0JBQTJCO0FBSTNCLGVBQWUsVUFBVSxLQUFhLFVBQWdGLENBQUMsR0FBRztBQUN4SCxRQUFNLE9BQU8sVUFBTSw0QkFBVztBQUFBLElBQzVCO0FBQUEsSUFDQSxRQUFRLFFBQVEsVUFBVTtBQUFBLElBQzFCLFNBQVMsUUFBUTtBQUFBLElBQ2pCLE1BQU0sUUFBUTtBQUFBLElBQ2QsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNELFNBQU87QUFBQSxJQUNMLElBQUksS0FBSyxVQUFVLE9BQU8sS0FBSyxTQUFTO0FBQUEsSUFDeEMsUUFBUSxLQUFLO0FBQUEsSUFDYixNQUFNLFlBQVksS0FBSztBQUFBLElBQ3ZCLE1BQU0sWUFBWSxLQUFLO0FBQUEsRUFDekI7QUFDRjtBQUVBLElBQU0sYUFBYTtBQUNuQixJQUFNLGFBQWE7QUFDbkIsSUFBTSxxQkFBcUI7QUFFcEIsSUFBTSxZQUFOLE1BQWdCO0FBQUEsRUFNckIsWUFDRSxPQUNBLE9BQ0EsTUFDQSxTQUFTLElBQ1Q7QUFDQSxTQUFLLFFBQVE7QUFDYixTQUFLLFFBQVE7QUFDYixTQUFLLE9BQU8sS0FBSyxLQUFLLEVBQUUsUUFBUSxRQUFRLEdBQUc7QUFDM0MsU0FBSyxTQUFTO0FBQUEsRUFDaEI7QUFBQSxFQUVBLElBQVksVUFBa0M7QUFDNUMsV0FBTztBQUFBLE1BQ0wsZUFBZSxTQUFTLEtBQUssS0FBSztBQUFBLE1BQ2xDLFFBQVE7QUFBQSxNQUNSLHdCQUF3QjtBQUFBLE1BQ3hCLGdCQUFnQjtBQUFBLElBQ2xCO0FBQUEsRUFDRjtBQUFBLEVBRUEsTUFBTSx1QkFBd0M7QUFDNUMsVUFBTSxPQUFPLE1BQU0sVUFBVSxHQUFHLFVBQVUsU0FBUyxFQUFFLFNBQVMsS0FBSyxRQUFRLENBQUM7QUFDNUUsUUFBSSxDQUFDLEtBQUssSUFBSTtBQUNaLFlBQU0sSUFBSSxNQUFNLGlEQUFpRDtBQUFBLElBQ25FO0FBQ0EsVUFBTSxPQUFRLE1BQU0sS0FBSyxLQUFLO0FBQzlCLFdBQVEsNkJBQU07QUFBQSxFQUNoQjtBQUFBO0FBQUEsRUFHQSxNQUFNLG1CQUFvQztBQUN4QyxVQUFNLE9BQU8sTUFBTSxVQUFVLEdBQUcsVUFBVSxVQUFVLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJO0FBQUEsTUFDN0UsU0FBUyxLQUFLO0FBQUEsSUFDaEIsQ0FBQztBQUNELFFBQUksQ0FBQyxLQUFLLElBQUk7QUFDWixZQUFNLElBQUksTUFBTSw0RUFBNEU7QUFBQSxJQUM5RjtBQUNBLFVBQU0sT0FBUSxNQUFNLEtBQUssS0FBSztBQUM5QixZQUFRLDZCQUFNLG1CQUE2QjtBQUFBLEVBQzdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVNBLE1BQU0sV0FBVyxjQUFjLE9BQXNCO0FBL0V2RDtBQWdGSSxVQUFNLE9BQU8sTUFBTSxVQUFVLEdBQUcsVUFBVSxlQUFlO0FBQUEsTUFDdkQsUUFBUTtBQUFBLE1BQ1IsU0FBUyxLQUFLO0FBQUEsTUFDZCxNQUFNLEtBQUssVUFBVTtBQUFBLFFBQ25CLE1BQU0sS0FBSztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1QsV0FBVztBQUFBLFFBQ1gsYUFBYSxjQUFjLDhDQUE4QztBQUFBLE1BQzNFLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxRQUFJLEtBQUssV0FBVyxLQUFLO0FBR3ZCLFlBQU0sVUFBVyxNQUFNLEtBQUssS0FBSyxFQUFFLE1BQU0sT0FBTyxDQUFDLEVBQUU7QUFDbkQsWUFBTSxhQUFxQix3Q0FBUyxZQUFULFlBQStCO0FBQzFELFlBQU0sVUFBdUMsd0NBQVMsV0FBVCxZQUFtRCxDQUFDO0FBQ2pHLFlBQU0sZ0JBQWdCLE9BQU87QUFBQSxRQUFLLENBQUMsTUFBRztBQWpHNUMsY0FBQUM7QUFrR1MsbUJBQUFBLE1BQUEsRUFBRSxZQUFGLE9BQUFBLE1BQWEsSUFBSSxZQUFZLEVBQUUsU0FBUyxlQUFlO0FBQUE7QUFBQSxNQUMxRCxLQUFLLFVBQVUsWUFBWSxFQUFFLFNBQVMsZUFBZTtBQUVyRCxVQUFJLGlCQUFpQixNQUFNLEtBQUssV0FBVyxHQUFHO0FBRTVDO0FBQUEsTUFDRjtBQUNBLFlBQU0sSUFBSTtBQUFBLFFBQ1IsOEJBQThCLEtBQUssSUFBSTtBQUFBLE1BRXpDO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxLQUFLLElBQUk7QUFDWixZQUFNLE1BQU8sTUFBTSxLQUFLLEtBQUssRUFBRSxNQUFNLE9BQU8sQ0FBQyxFQUFFO0FBQy9DLFlBQU0sSUFBSSxNQUFNLGtDQUFrQyxTQUE2QixZQUE3QixZQUF3QyxlQUFlLEVBQUU7QUFBQSxJQUM3RztBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTUEsTUFBTSxvQkFBbUM7QUFDdkMsVUFBTSxPQUFPLE1BQU0sVUFBVSxHQUFHLFVBQVUsVUFBVSxLQUFLLEtBQUssSUFBSSxLQUFLLElBQUksVUFBVTtBQUFBLE1BQ25GLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxRQUNQLEdBQUcsS0FBSztBQUFBLFFBQ1IsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLE1BQU0sS0FBSyxVQUFVO0FBQUEsUUFDbkIsWUFBWTtBQUFBLE1BQ2QsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELFFBQUksQ0FBQyxLQUFLLE1BQU0sS0FBSyxXQUFXLEtBQUs7QUFDbkMsWUFBTSxPQUFPLE1BQU0sS0FBSyxLQUFLLEVBQUUsTUFBTSxNQUFNLEVBQUU7QUFDN0MsWUFBTSxJQUFJLE1BQU0sa0NBQWtDLEtBQUssTUFBTSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3pFO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNQSxNQUFNLGNBS0k7QUFDUixRQUFJO0FBQ0YsWUFBTSxPQUFPLE1BQU0sVUFBVSxHQUFHLFVBQVUsVUFBVSxLQUFLLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSTtBQUFBLFFBQzdFLFNBQVMsS0FBSztBQUFBLE1BQ2hCLENBQUM7QUFDRCxVQUFJLENBQUMsS0FBSztBQUFJLGVBQU87QUFDckIsWUFBTSxPQUFRLE1BQU0sS0FBSyxLQUFLO0FBQzlCLGFBQU87QUFBQSxRQUNMLFNBQVUsS0FBSyxZQUF1QjtBQUFBLFFBQ3RDLFVBQVcsS0FBSyxhQUF3QjtBQUFBLFFBQ3hDLFdBQVksS0FBSyxXQUF1QjtBQUFBLFFBQ3hDLGFBQWMsS0FBSyxlQUEwQjtBQUFBLE1BQy9DO0FBQUEsSUFDRixTQUFRO0FBQ04sYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT0EsTUFBTSxxQkFBcUIsY0FNakI7QUFqTFo7QUFrTEksUUFBSTtBQUNGLFlBQU0sT0FBTyxNQUFNO0FBQUEsUUFDakIsR0FBRyxVQUFVLFVBQVUsS0FBSyxLQUFLLElBQUksS0FBSyxJQUFJLHNCQUFzQixtQkFBbUIsWUFBWSxDQUFDO0FBQUEsUUFDcEcsRUFBRSxTQUFTLEtBQUssUUFBUTtBQUFBLE1BQzFCO0FBQ0EsVUFBSSxDQUFDLEtBQUs7QUFBSSxlQUFPO0FBQ3JCLFlBQU0sT0FBUSxNQUFNLEtBQUssS0FBSztBQUM5QixZQUFNLE9BQU0sVUFBSyxrQkFBTCxtQkFBcUI7QUFDakMsVUFBSSxDQUFDO0FBQUssZUFBTztBQUNqQixhQUFPO0FBQUEsUUFDTCxRQUFTLElBQUksVUFBcUI7QUFBQSxRQUNsQyxZQUFhLElBQUksY0FBeUI7QUFBQSxRQUMxQyxTQUFVLElBQUksWUFBdUI7QUFBQSxRQUNyQyxXQUFZLElBQUksY0FBeUI7QUFBQSxRQUN6QyxXQUFZLElBQUksY0FBeUI7QUFBQSxNQUMzQztBQUFBLElBQ0YsU0FBUTtBQUNOLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNQSxNQUFNLGdCQUFnQixRQU1aO0FBQ1IsVUFBTSxNQUFNLFVBQVUsS0FBSyxVQUFVO0FBQ3JDLFFBQUk7QUFDRixZQUFNLE9BQU8sTUFBTTtBQUFBLFFBQ2pCLEdBQUcsVUFBVSxVQUFVLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSSxZQUFZLG1CQUFtQixHQUFHLENBQUM7QUFBQSxRQUNqRixFQUFFLFNBQVMsS0FBSyxRQUFRO0FBQUEsTUFDMUI7QUFDQSxVQUFJLENBQUMsS0FBSztBQUFJLGVBQU87QUFDckIsWUFBTSxPQUFRLE1BQU0sS0FBSyxLQUFLO0FBQzlCLFlBQU0sU0FBUyxLQUFLO0FBQ3BCLFlBQU0sZUFBZSxpQ0FBUTtBQUM3QixhQUFPO0FBQUEsUUFDTCxNQUFPLEtBQUssT0FBa0IsSUFBSSxNQUFNLEdBQUcsQ0FBQztBQUFBLFFBQzVDLFdBQVcsaUNBQVEsWUFBc0IsSUFBSSxNQUFNLElBQUksRUFBRSxDQUFDO0FBQUEsUUFDMUQsT0FBTyw2Q0FBYyxTQUFtQjtBQUFBLFFBQ3hDLFNBQVMsNkNBQWMsU0FBbUI7QUFBQSxRQUMxQyxTQUFVLEtBQUssWUFBdUI7QUFBQSxNQUN4QztBQUFBLElBQ0YsU0FBUTtBQUNOLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFHQSxNQUFjLEdBQU0sTUFBYyxRQUFnQixNQUE0QjtBQXpPaEY7QUEwT0ksVUFBTSxPQUFPLE1BQU0sVUFBVSxHQUFHLFVBQVUsR0FBRyxJQUFJLElBQUk7QUFBQSxNQUNuRDtBQUFBLE1BQ0EsU0FBUyxLQUFLO0FBQUEsTUFDZCxNQUFNLFNBQVMsU0FBWSxTQUFZLEtBQUssVUFBVSxJQUFJO0FBQUEsSUFDNUQsQ0FBQztBQUNELFFBQUksQ0FBQyxLQUFLLElBQUk7QUFDWixZQUFNLFVBQVcsTUFBTSxLQUFLLEtBQUssRUFBRSxNQUFNLE9BQU8sQ0FBQyxFQUFFO0FBQ25ELFlBQU0sTUFBTSxJQUFJLE9BQVEsd0NBQVMsWUFBVCxZQUErQiwwQkFBMEIsS0FBSyxNQUFNLEdBQUk7QUFDaEcsVUFBSSxTQUFTLEtBQUs7QUFDbEIsWUFBTTtBQUFBLElBQ1I7QUFDQSxXQUFRLE1BQU0sS0FBSyxLQUFLO0FBQUEsRUFDMUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU0EsTUFBTSxZQUNKLE9BQ0EsU0FDQSxZQUNBLGFBQ0EsZUFBZSxJQUNmLFNBQ2lEO0FBQ2pELFVBQU0sU0FBaUQsRUFBRSxTQUFTLE1BQU0sVUFBVSxHQUFHLFdBQVcsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQyxFQUFFO0FBQy9JLFFBQUksTUFBTSxXQUFXO0FBQUcsYUFBTztBQUUvQixRQUFJO0FBQ0YsWUFBTSxTQUFTLE1BQU0sS0FBSyxXQUFXO0FBQ3JDLFVBQUksQ0FBQyxRQUFRO0FBQ1gsY0FBTSxhQUFZLG1DQUFTLGNBQWE7QUFDeEMsY0FBTSxLQUFLLFdBQVcsU0FBUztBQUMvQixjQUFNLFFBQVEsTUFBTSxLQUFLLFlBQVksR0FBSztBQUMxQyxZQUFJLENBQUMsT0FBTztBQUNWLGlCQUFPLFVBQVU7QUFDakIsaUJBQU8sT0FBTyxLQUFLLHNEQUFzRDtBQUN6RSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRixTQUFTLEdBQUc7QUFDVixhQUFPLFVBQVU7QUFDakIsYUFBTyxPQUFPLEtBQUsseUNBQTBDLEVBQVksT0FBTyxFQUFFO0FBQ2xGLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxDQUFDLEtBQUssUUFBUTtBQUNoQixhQUFPLFVBQVU7QUFDakIsYUFBTyxPQUFPLEtBQUsseUVBQXlFO0FBQzVGLGFBQU87QUFBQSxJQUNUO0FBQ0EsVUFBTSxTQUFTLEtBQUs7QUFDcEIsVUFBTSxVQUFVLFVBQVUsS0FBSyxLQUFLLElBQUksS0FBSyxJQUFJLG1CQUFtQixtQkFBbUIsTUFBTSxDQUFDO0FBRzlGLFFBQUksVUFBeUI7QUFDN0IsUUFBSSxjQUE2QjtBQUNqQyxRQUFJLGVBQWU7QUFFbkIsUUFBSTtBQUNGLFlBQU0sTUFBTSxNQUFNLEtBQUssR0FBZ0MsU0FBUyxLQUFLO0FBQ3JFLGdCQUFVLElBQUksT0FBTztBQUNyQixZQUFNLGFBQWEsTUFBTSxLQUFLO0FBQUEsUUFDNUIsVUFBVSxLQUFLLEtBQUssSUFBSSxLQUFLLElBQUksZ0JBQWdCLE9BQU87QUFBQSxRQUN4RDtBQUFBLE1BQ0Y7QUFDQSxvQkFBYyxXQUFXLEtBQUs7QUFBQSxJQUNoQyxTQUFTLEtBQWM7QUFDckIsVUFBSyxJQUFnQyxXQUFXLEtBQUs7QUFFbkQsdUJBQWU7QUFBQSxNQUNqQixPQUFPO0FBQ0wsZUFBTyxVQUFVO0FBQ2pCLGVBQU8sT0FBTyxLQUFLLDBCQUEwQixNQUFNLE1BQU8sSUFBYyxPQUFPLEVBQUU7QUFDakYsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBR0EsVUFBTSxZQUF1RixDQUFDO0FBQzlGLFFBQUksT0FBTztBQUNYLGFBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUssWUFBWTtBQUNqRCxZQUFNLFFBQVEsTUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVO0FBQzNDLFlBQU0sUUFBUTtBQUFBLFFBQ1osTUFBTSxJQUFJLE9BQU8sU0FBUztBQUN4QixjQUFJO0FBQ0YsZ0JBQUksS0FBSyxZQUFZLE1BQU07QUFDekIsd0JBQVUsS0FBSyxFQUFFLE1BQU0sS0FBSyxNQUFNLE1BQU0sVUFBVSxNQUFNLFFBQVEsS0FBSyxLQUFLLENBQUM7QUFBQSxZQUM3RSxPQUFPO0FBQ0wsb0JBQU0sTUFBTSxNQUFNLEtBQUssb0JBQW9CLEtBQUssU0FBUyxXQUFXO0FBQ3BFLHdCQUFVLEtBQUssRUFBRSxNQUFNLEtBQUssTUFBTSxNQUFNLFVBQVUsTUFBTSxRQUFRLElBQUksQ0FBQztBQUFBLFlBQ3ZFO0FBQ0EsbUJBQU87QUFBQSxVQUNULFNBQVMsS0FBYztBQUNyQixtQkFBTztBQUNQLG1CQUFPLE9BQU8sS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFNLElBQWMsT0FBTyxFQUFFO0FBQUEsVUFDOUQ7QUFDQTtBQUNBLHFCQUFXLE1BQU0sTUFBTSxNQUFNO0FBQUEsUUFDL0IsQ0FBQztBQUFBLE1BQ0g7QUFDQSxVQUFJLElBQUksYUFBYSxNQUFNLFFBQVE7QUFDakMsY0FBTSxJQUFJLFFBQVEsT0FBSyxPQUFPLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFBQSxNQUNsRDtBQUFBLElBQ0Y7QUFFQSxRQUFJLE9BQU8sYUFBYSxHQUFHO0FBQ3pCLGFBQU8sVUFBVTtBQUNqQixhQUFPO0FBQUEsSUFDVDtBQUlBLFFBQUksT0FBTyxTQUFTLEdBQUc7QUFDckIsZUFBUyxRQUFRLFVBQVUsU0FBUyxHQUFHLFNBQVMsR0FBRyxTQUFTO0FBQzFELFlBQUksVUFBVSxLQUFLLEVBQUUsUUFBUTtBQUFNLG9CQUFVLE9BQU8sT0FBTyxDQUFDO0FBQUEsTUFDOUQ7QUFDQSxVQUFJLFVBQVUsV0FBVyxHQUFHO0FBQzFCLGVBQU8sVUFBVTtBQUNqQixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFPQSxRQUFJLGdCQUFnQixPQUFPLFdBQVcsS0FBSyxhQUFhO0FBQ3RELFVBQUk7QUFDRixjQUFNLE9BQU8sTUFBTSxLQUFLO0FBQUEsVUFDdEIsVUFBVSxLQUFLLEtBQUssSUFBSSxLQUFLLElBQUksY0FBYyxXQUFXO0FBQUEsVUFDMUQ7QUFBQSxRQUNGO0FBQ0EsY0FBTSxPQUFPLElBQUksSUFBSSxNQUFNLElBQUksT0FBSyxFQUFFLElBQUksQ0FBQztBQUMzQyxtQkFBVyxTQUFTLEtBQUssTUFBTTtBQUM3QixjQUFJLE1BQU0sU0FBUyxVQUFVLE1BQU0sS0FBSyxXQUFXLFlBQVksS0FBSyxDQUFDLEtBQUssSUFBSSxNQUFNLElBQUksR0FBRztBQUN6RixzQkFBVSxLQUFLLEVBQUUsTUFBTSxNQUFNLE1BQU0sTUFBTSxVQUFVLE1BQU0sUUFBUSxLQUFLLEtBQUssQ0FBQztBQUFBLFVBQzlFO0FBQUEsUUFDRjtBQUFBLE1BQ0YsU0FBUTtBQUFBLE1BRVI7QUFBQSxJQUNGO0FBR0EsUUFBSTtBQUNGLFlBQU0sT0FBTyxNQUFNLEtBQUs7QUFBQSxRQUN0QixVQUFVLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSTtBQUFBLFFBQ2pDO0FBQUEsUUFDQSxjQUFjLEVBQUUsV0FBVyxhQUFhLE1BQU0sVUFBVSxJQUFJLEVBQUUsTUFBTSxVQUFVO0FBQUEsTUFDaEY7QUFDQSxZQUFNLFNBQVMsTUFBTSxLQUFLO0FBQUEsUUFDeEIsVUFBVSxLQUFLLEtBQUssSUFBSSxLQUFLLElBQUk7QUFBQSxRQUNqQztBQUFBLFFBQ0EsVUFBVSxFQUFFLFNBQVMsTUFBTSxLQUFLLEtBQUssU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxNQUFNLEtBQUssS0FBSyxTQUFTLENBQUMsRUFBRTtBQUFBLE1BQ3JHO0FBQ0EsYUFBTyxZQUFZLE9BQU87QUFFMUIsVUFBSSxjQUFjO0FBQ2hCLGNBQU0sS0FBSyxHQUFHLFNBQVMsU0FBUyxFQUFFLEtBQUssT0FBTyxLQUFLLE9BQU8sTUFBTSxDQUFDO0FBQUEsTUFDbkUsT0FBTztBQUNMLGNBQU0sS0FBSyxHQUFHLFVBQVUsS0FBSyxLQUFLLElBQUksS0FBSyxJQUFJLGFBQWEsUUFBUTtBQUFBLFVBQ2xFLEtBQUssY0FBYyxNQUFNO0FBQUEsVUFDekIsS0FBSyxPQUFPO0FBQUEsUUFDZCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsU0FBUyxLQUFjO0FBQ3JCLGFBQU8sVUFBVTtBQUNqQixhQUFPLE9BQU8sS0FBSyxrQkFBbUIsSUFBYyxPQUFPLEVBQUU7QUFDN0QsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLE9BQU8sU0FBUztBQUFHLGFBQU8sVUFBVTtBQUN4QyxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsTUFBYyxvQkFDWixlQUNBLGFBQ2lCO0FBQ2pCLFFBQUksVUFBd0I7QUFDNUIsYUFBUyxVQUFVLEdBQUcsVUFBVSxHQUFHLFdBQVc7QUFDNUMsVUFBSTtBQUNGLGNBQU0sT0FBTyxNQUFNLEtBQUs7QUFBQSxVQUN0QixVQUFVLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSTtBQUFBLFVBQ2pDO0FBQUEsVUFDQSxFQUFFLFNBQVMsZUFBZSxVQUFVLFNBQVM7QUFBQSxRQUMvQztBQUNBLGVBQU8sS0FBSztBQUFBLE1BQ2QsU0FBUyxLQUFjO0FBQ3JCLGtCQUFVO0FBQ1YsY0FBTSxTQUFVLFFBQXdDO0FBQ3hELGNBQU0sTUFBTSxRQUFRLFFBQVEsWUFBWTtBQUV4QyxjQUFNLGNBQ0osV0FBVyxPQUNWLFdBQVcsUUFBUSxJQUFJLFNBQVMsWUFBWSxLQUFLLElBQUksU0FBUyxPQUFPLEtBQUssSUFBSSxTQUFTLFdBQVc7QUFFckcsWUFBSSxXQUFXLE9BQU8sV0FBVyxPQUFRLFdBQVcsT0FBTyxDQUFDLGFBQWM7QUFDeEUsZ0JBQU07QUFBQSxRQUNSO0FBRUEsWUFBSSxhQUFhO0FBQ2YsZ0JBQU0sS0FBSyxrQkFBa0Isb0JBQW9CLFdBQVc7QUFBQSxRQUM5RCxXQUFXLFVBQVUsR0FBRztBQUN0QixnQkFBTSxJQUFJLFFBQVEsT0FBSyxPQUFPLFdBQVcsR0FBRyxNQUFPLEtBQUssSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQUEsUUFDMUU7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLFVBQU0sNEJBQVcsSUFBSSxNQUFNLHNCQUFzQjtBQUFBLEVBQ25EO0FBQUEsRUFFQSxNQUFjLGtCQUFrQixJQUFZLFFBQW9EO0FBQzlGLFFBQUksQ0FBQyxRQUFRO0FBQ1gsWUFBTSxJQUFJLFFBQVEsT0FBSyxPQUFPLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDL0M7QUFBQSxJQUNGO0FBQ0EsUUFBSSxXQUFXLEtBQUssS0FBSyxLQUFLLEdBQUk7QUFDbEMsVUFBTSxXQUFXLE9BQU8sWUFBWSxNQUFNO0FBQ3hDO0FBQ0EsVUFBSSxZQUFZO0FBQUcsZUFBTyxRQUFRO0FBQUEsSUFDcEMsR0FBRyxHQUFJO0FBQ1AsVUFBTSxJQUFJLFFBQVEsT0FBSyxPQUFPLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDL0MsV0FBTyxjQUFjLFFBQVE7QUFBQSxFQUMvQjtBQUFBLEVBRUEsTUFBTSxhQUErQjtBQUNuQyxVQUFNLE9BQU8sTUFBTTtBQUFBLE1BQ2pCLEdBQUcsVUFBVSxVQUFVLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSTtBQUFBLE1BQzlDLEVBQUUsU0FBUyxLQUFLLFFBQVE7QUFBQSxJQUMxQjtBQUNBLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUVBLE1BQU0sZ0JBQWtDO0FBQ3RDLFVBQU0sT0FBTyxNQUFNO0FBQUEsTUFDakIsR0FBRyxVQUFVLFVBQVUsS0FBSyxLQUFLLElBQUksS0FBSyxJQUFJO0FBQUEsTUFDOUMsRUFBRSxTQUFTLEtBQUssUUFBUTtBQUFBLElBQzFCO0FBQ0EsUUFBSSxDQUFDLEtBQUssSUFBSTtBQUNaLFlBQU0sSUFBSSxNQUFNLDBDQUEwQztBQUFBLElBQzVEO0FBQ0EsVUFBTSxPQUFPLE1BQU0sS0FBSyxLQUFLO0FBQzdCLFdBQU8sS0FBSyxZQUFZO0FBQUEsRUFDMUI7QUFBQSxFQUVBLE1BQU0sWUFBWSxZQUFZLEtBQXlCO0FBQ3JELFVBQU0sUUFBUSxLQUFLLElBQUk7QUFDdkIsV0FBTyxLQUFLLElBQUksSUFBSSxRQUFRLFdBQVc7QUFDckMsVUFBSSxNQUFNLEtBQUssV0FBVztBQUFHLGVBQU87QUFDcEMsWUFBTSxJQUFJLFFBQVEsT0FBSyxPQUFPLFdBQVcsR0FBRyxHQUFJLENBQUM7QUFBQSxJQUNuRDtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT0EsTUFBTSxTQUFTLFFBQThFO0FBbmYvRjtBQW9mSSxVQUFNLE1BQU0sVUFBVSxLQUFLLFVBQVU7QUFDckMsVUFBTSxPQUFPLE1BQU0sS0FBSztBQUFBLE1BQ3RCLFVBQVUsS0FBSyxLQUFLLElBQUksS0FBSyxJQUFJLGNBQWMsbUJBQW1CLEdBQUcsQ0FBQztBQUFBLE1BQ3RFO0FBQUEsSUFDRjtBQUNBLGFBQVEsVUFBSyxTQUFMLFlBQWEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUyxNQUFNO0FBQUEsRUFDaEU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU0EsTUFBTSxpQkFBaUIsUUFBZ0IsUUFBK0I7QUFDcEUsVUFBTSxTQUFTLFNBQVMsTUFBTTtBQUc5QixRQUFJO0FBQ0osUUFBSTtBQUNKLFVBQU0sVUFBVSxVQUFVLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSSxtQkFBbUIsbUJBQW1CLE1BQU0sQ0FBQztBQUU5RixRQUFJO0FBQ0YsWUFBTSxNQUFNLE1BQU0sS0FBSyxHQUFnQyxTQUFTLEtBQUs7QUFDckUsZ0JBQVUsSUFBSSxPQUFPO0FBQ3JCLFlBQU0sYUFBYSxNQUFNLEtBQUs7QUFBQSxRQUM1QixVQUFVLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSSxnQkFBZ0IsT0FBTztBQUFBLFFBQ3hEO0FBQUEsTUFDRjtBQUNBLG9CQUFjLFdBQVcsS0FBSztBQUFBLElBQ2hDLFNBQVE7QUFFTjtBQUFBLElBQ0Y7QUFHQSxRQUFJLFdBQTZFLENBQUM7QUFDbEYsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLEtBQUs7QUFBQSxRQUMxQixVQUFVLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSSxjQUFjLFdBQVc7QUFBQSxRQUMxRDtBQUFBLE1BQ0Y7QUFDQSxpQkFBVyxTQUFTLEtBQ2pCLE9BQU8sQ0FBQyxTQUFTLEtBQUssU0FBUyxVQUFVLEtBQUssS0FBSyxXQUFXLE1BQU0sQ0FBQyxFQUNyRSxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sS0FBSyxNQUFNLE1BQU0sVUFBbUIsTUFBTSxRQUFpQixLQUFLLEtBQUssRUFBRTtBQUFBLElBQ25HLFNBQVE7QUFDTjtBQUFBLElBQ0Y7QUFFQSxRQUFJLFNBQVMsV0FBVztBQUFHO0FBRzNCLFVBQU0sT0FBTyxNQUFNLEtBQUs7QUFBQSxNQUN0QixVQUFVLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSTtBQUFBLE1BQ2pDO0FBQUEsTUFDQSxFQUFFLFdBQVcsYUFBYSxNQUFNLFNBQVM7QUFBQSxJQUMzQztBQUNBLFVBQU0sU0FBUyxNQUFNLEtBQUs7QUFBQSxNQUN4QixVQUFVLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSTtBQUFBLE1BQ2pDO0FBQUEsTUFDQSxFQUFFLFNBQVMsMEJBQTBCLE1BQU0sSUFBSSxNQUFNLEtBQUssS0FBSyxTQUFTLENBQUMsT0FBTyxFQUFFO0FBQUEsSUFDcEY7QUFDQSxVQUFNLEtBQUssR0FBRyxTQUFTLFNBQVMsRUFBRSxLQUFLLE9BQU8sS0FBSyxPQUFPLE1BQU0sQ0FBQztBQUFBLEVBQ25FO0FBRUY7OztBQ3RqQkEsSUFBQUMsbUJBQTJCO0FBRTNCLElBQU0sU0FBUztBQU9mLElBQU0seUJBQXlCO0FBT3hCLElBQU0sZ0JBQU4sTUFBb0I7QUFBQSxFQUN6QixZQUNVLE9BQ0EsV0FDUjtBQUZRO0FBQ0E7QUFBQSxFQUNQO0FBQUEsRUFFSCxJQUFZLFVBQWtDO0FBQzVDLFdBQU87QUFBQSxNQUNMLGVBQWUsVUFBVSxLQUFLLEtBQUs7QUFBQSxNQUNuQyxnQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQWMsUUFDWixNQUNBLFNBQVMsT0FDVCxNQUNZO0FBakNoQjtBQWtDSSxRQUFJO0FBQ0YsWUFBTSxPQUFPLFVBQU0sNkJBQVc7QUFBQSxRQUM1QixLQUFLLEdBQUcsTUFBTSxHQUFHLElBQUk7QUFBQSxRQUNyQjtBQUFBLFFBQ0EsU0FBUyxLQUFLO0FBQUEsUUFDZCxNQUFNLE9BQU8sS0FBSyxVQUFVLElBQUksSUFBSTtBQUFBLFFBQ3BDLE9BQU87QUFBQSxNQUNULENBQUM7QUFFRCxZQUFNLFFBQVEsVUFBSyxTQUFMLFlBQWEsQ0FBQztBQUM1QixVQUFJLEtBQUssVUFBVSxLQUFLO0FBQ3RCLGNBQU0sV0FBVSxzQkFBSyxXQUFMLG1CQUFjLE9BQWQsbUJBQWtCLFlBQWxCLFlBQTZCLEtBQUssaUJBQWlCLEtBQUssTUFBTTtBQUM5RSxjQUFNLE1BQU0sSUFBSSxNQUFNLE9BQU87QUFDN0IsWUFBSSxTQUFTLEtBQUs7QUFDbEIsY0FBTTtBQUFBLE1BQ1I7QUFFQSxhQUFPO0FBQUEsSUFDVCxTQUFTLEtBQWM7QUFDckIsWUFBTSxVQUFVLGVBQWUsUUFBUSxJQUFJLFVBQVU7QUFDckQsVUFBSSxRQUFRLFlBQVksRUFBRSxTQUFTLGlCQUFpQixHQUFHO0FBQ3JELGNBQU0sV0FBVyxJQUFJO0FBQUEsVUFDbkI7QUFBQSxRQUNGO0FBQ0EsaUJBQVMsU0FBUztBQUNsQixjQUFNO0FBQUEsTUFDUjtBQUNBLFlBQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBRVEsaUJBQWlCLFFBQXdCO0FBQy9DLFFBQUksV0FBVyxPQUFPLFdBQVcsS0FBSztBQUNwQyxhQUFPO0FBQUEsSUFDVDtBQUNBLFFBQUksV0FBVyxLQUFLO0FBQ2xCLGFBQU87QUFBQSxJQUNUO0FBQ0EsUUFBSSxVQUFVLEtBQUs7QUFDakIsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUUEsTUFBTSxlQUFnQztBQXBGeEM7QUFxRkksVUFBTSxPQUFPLE1BQU0sS0FBSyxRQUE2QyxXQUFXO0FBQ2hGLFVBQU0sWUFBVyxVQUFLLFdBQUwsWUFBZSxDQUFDO0FBQ2pDLFVBQU0sTUFBSyxjQUFTLENBQUMsTUFBVixtQkFBYTtBQUN4QixRQUFJLENBQUMsSUFBSTtBQUNQLFlBQU0sSUFBSTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxNQUFNLGNBQ0osTUFDQSxhQUNBLE1BQ0EsUUFDQSxVQUFrQixJQUNEO0FBdEdyQjtBQXVHSSxVQUFNLE9BQU8sTUFBTSxLQUFLO0FBQUEsTUFDdEIsYUFBYSxLQUFLLFNBQVM7QUFBQSxNQUMzQjtBQUFBLE1BQ0E7QUFBQSxRQUNFO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDTixNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsWUFDTixPQUFPO0FBQUEsWUFDUCxXQUFXO0FBQUE7QUFBQTtBQUFBLFlBR1gsbUJBQW1CO0FBQUEsWUFDbkIscUJBQXFCO0FBQUEsVUFDdkI7QUFBQSxRQUNGO0FBQUEsUUFDQSxjQUFjO0FBQUEsVUFDWixlQUFlO0FBQUEsVUFDZixpQkFBaUI7QUFBQSxVQUNqQixVQUFVO0FBQUEsUUFDWjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0EsVUFBTSxVQUFVLFVBQUssV0FBTCxZQUFlLENBQUM7QUFDaEMsVUFBTSxnQkFBZ0IsWUFBTyxjQUFQLFlBQTJDO0FBQ2pFLFVBQU0sWUFBWSxhQUFhLFFBQVEsaUJBQWlCLEVBQUU7QUFDMUQsV0FBTyxHQUFHLFNBQVM7QUFBQSxFQUNyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVVBLE1BQU0sZUFDSixNQUNBLGFBQ0EsTUFDQSxRQUNBLFVBQWtCLElBQ0g7QUFDZixVQUFNLEtBQUs7QUFBQSxNQUNULGFBQWEsS0FBSyxTQUFTLG1CQUFtQixJQUFJO0FBQUEsTUFDbEQ7QUFBQSxNQUNBO0FBQUEsUUFDRSxjQUFjO0FBQUEsVUFDWixlQUFlO0FBQUEsVUFDZixpQkFBaUI7QUFBQSxVQUNqQixVQUFVO0FBQUEsUUFDWjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFlBQ04sT0FBTztBQUFBLFlBQ1AsV0FBVztBQUFBLFlBQ1gsbUJBQW1CO0FBQUEsWUFDbkIscUJBQXFCO0FBQUEsVUFDdkI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT0EsTUFBTSxrQkFBa0IsTUFBYyxRQUErQjtBQUNuRSxVQUFNLEtBQUs7QUFBQSxNQUNULGFBQWEsS0FBSyxTQUFTLG1CQUFtQixJQUFJO0FBQUEsTUFDbEQ7QUFBQSxNQUNBLFNBQVMsRUFBRSxPQUFPLElBQUk7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQU0sV0FBVyxNQUErQjtBQXRMbEQ7QUF1TEksVUFBTSxPQUFPLE1BQU0sS0FBSztBQUFBLE1BQ3RCLGFBQWEsS0FBSyxTQUFTLG1CQUFtQixJQUFJO0FBQUEsSUFDcEQ7QUFDQSxVQUFNLFNBQVMsS0FBSztBQUNwQixVQUFNLGdCQUFnQixzQ0FBUSxjQUFSLFlBQTRDO0FBQ2xFLFVBQU0sWUFBWSxhQUFhLFFBQVEsaUJBQWlCLEVBQUU7QUFDMUQsV0FBTyxHQUFHLFNBQVM7QUFBQSxFQUNyQjtBQUFBLEVBRUEsTUFBTSxpQkFBaUIsTUFBNkI7QUFDbEQsVUFBTSxLQUFLO0FBQUEsTUFDVCxhQUFhLEtBQUssU0FBUyxtQkFBbUIsSUFBSTtBQUFBLE1BQ2xEO0FBQUEsTUFDQTtBQUFBLFFBQ0Usb0JBQW9CLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixLQUFLLEVBQUU7QUFBQSxNQUNqRTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT0EsTUFBTSxrQkFBa0IsTUFBNkI7QUFDbkQsVUFBTSxLQUFLO0FBQUEsTUFDVCxhQUFhLEtBQUssU0FBUyxtQkFBbUIsSUFBSTtBQUFBLE1BQ2xEO0FBQUEsTUFDQTtBQUFBLFFBQ0Usb0JBQW9CLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixNQUFNLEVBQUU7QUFBQSxNQUNsRTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxNQUFNLGNBQWMsTUFBNkI7QUFDL0MsVUFBTSxLQUFLO0FBQUEsTUFDVCxhQUFhLEtBQUssU0FBUyxtQkFBbUIsSUFBSTtBQUFBLE1BQ2xEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQU0sZ0JBQWdCLE1BQW9FO0FBQ3hGLFdBQU8sS0FBSztBQUFBLE1BQ1YsYUFBYSxLQUFLLFNBQVMsbUJBQW1CLElBQUk7QUFBQSxJQUNwRDtBQUFBLEVBQ0Y7QUFDRjs7O0FDck9BLElBQUFDLG1CQUFvQztBQUNwQyx3QkFBd0I7OztBQ0VqQixJQUFNLGtCQUFrQixvQkFBSSxJQUFJO0FBQUEsRUFDckM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixDQUFDO0FBS00sSUFBTSxlQUFlO0FBU3JCLElBQU0sbUJBQW1CO0FBV3pCLElBQU0sMEJBQTBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUQvQmhDLElBQU0sZ0JBQU4sTUFBb0I7QUFBQSxFQUl6QixZQUNVLEtBQ0EsTUFDUjtBQUZRO0FBQ0E7QUFFUixTQUFLLGVBQWUsS0FBSyxnQkFBZ0I7QUFDekMsU0FBSyxnQkFBZ0IsS0FBSyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksT0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLGNBQWMsRUFBRSxDQUFDLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDM0c7QUFBQSxFQUVBLE1BQU0sVUFBNEI7QUFDaEMsVUFBTSxTQUFrQixDQUFDO0FBRXpCLFFBQUksS0FBSyxpQkFBaUIsWUFBWTtBQUNwQyxZQUFNLGdCQUFnQixvQkFBSSxJQUFZO0FBRXRDLGlCQUFXLFFBQVEsS0FBSyxjQUFjO0FBQ3BDLGNBQU0sZUFBZSxLQUFLLElBQUksTUFBTSxzQkFBc0IsSUFBSTtBQUU5RCxZQUFJLHdCQUF3Qix3QkFBTztBQUNqQyxjQUFJLGFBQWEsY0FBYyxRQUFRLENBQUMsS0FBSyxXQUFXLGFBQWEsSUFBSSxHQUFHO0FBQzFFLGdCQUFJLENBQUMsT0FBTyxLQUFLLE9BQUssRUFBRSxTQUFTLGFBQWEsSUFBSSxHQUFHO0FBQ25ELHFCQUFPLEtBQUssWUFBWTtBQUN4Qiw0QkFBYyxJQUFJLGFBQWEsSUFBSTtBQUFBLFlBQ3JDO0FBQUEsVUFDRjtBQUFBLFFBQ0YsV0FBVyx3QkFBd0IsMEJBQVM7QUFDMUMsZ0JBQU0sZUFBZSxPQUFPO0FBQzVCLHFCQUFXLFFBQVEsS0FBSyxJQUFJLE1BQU0sU0FBUyxHQUFHO0FBQzVDLGdCQUFJLEtBQUssS0FBSyxXQUFXLFlBQVksS0FBSyxDQUFDLEtBQUssV0FBVyxLQUFLLElBQUksR0FBRztBQUNyRSxrQkFBSSxLQUFLLGNBQWMsTUFBTTtBQUMzQixvQkFBSSxDQUFDLE9BQU8sS0FBSyxPQUFLLEVBQUUsU0FBUyxLQUFLLElBQUksR0FBRztBQUMzQyx5QkFBTyxLQUFLLElBQUk7QUFBQSxnQkFDbEI7QUFBQSxjQUNGLFdBQ0UsS0FBSyxLQUFLLHNCQUNWLGdCQUFnQixJQUFJLEtBQUssVUFBVSxZQUFZLENBQUMsR0FDaEQ7QUFDQSxvQkFBSSxDQUFDLE9BQU8sS0FBSyxPQUFLLEVBQUUsU0FBUyxLQUFLLElBQUksR0FBRztBQUMzQyx5QkFBTyxLQUFLLElBQUk7QUFBQSxnQkFDbEI7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLFVBQUksS0FBSyxLQUFLLG9CQUFvQjtBQUNoQyxjQUFNLG1CQUE0QixDQUFDO0FBQ25DLG1CQUFXLFFBQVEsUUFBUTtBQUN6QixjQUFJLGNBQWMsSUFBSSxLQUFLLElBQUksR0FBRztBQUNoQyxrQkFBTSxRQUFRLEtBQUssSUFBSSxjQUFjLFNBQVMsS0FBSyxJQUFJO0FBQ3ZELGtCQUFNLGlCQUFpQjtBQUFBLGNBQ3JCLElBQUksK0JBQU8sVUFBUyxDQUFDO0FBQUEsY0FDckIsSUFBSSwrQkFBTyxXQUFVLENBQUM7QUFBQSxZQUN4QjtBQUVBLHVCQUFXLFFBQVEsZ0JBQWdCO0FBQ2pDLG9CQUFNLFdBQVcsS0FBSyxJQUFJLGNBQWMscUJBQXFCLEtBQUssTUFBTSxLQUFLLElBQUk7QUFDakYsa0JBQUksWUFBWSxnQkFBZ0IsSUFBSSxTQUFTLFVBQVUsWUFBWSxDQUFDLEdBQUc7QUFDckUsb0JBQUksQ0FBQyxLQUFLLFdBQVcsU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssT0FBSyxFQUFFLFNBQVMsU0FBUyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxPQUFLLEVBQUUsU0FBUyxTQUFTLElBQUksR0FBRztBQUMzSSxtQ0FBaUIsS0FBSyxRQUFRO0FBQUEsZ0JBQ2hDO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUNBLGVBQU8sS0FBSyxHQUFHLGdCQUFnQjtBQUFBLE1BQ2pDO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFFQSxlQUFXLFFBQVEsS0FBSyxJQUFJLE1BQU0sU0FBUyxHQUFHO0FBQzVDLFVBQUksS0FBSyxXQUFXLEtBQUssSUFBSTtBQUFHO0FBRWhDLFVBQUksS0FBSyxjQUFjLE1BQU07QUFDM0IsZUFBTyxLQUFLLElBQUk7QUFBQSxNQUNsQixXQUNFLEtBQUssS0FBSyxzQkFDVixnQkFBZ0IsSUFBSSxLQUFLLFVBQVUsWUFBWSxDQUFDLEdBQ2hEO0FBQ0EsZUFBTyxLQUFLLElBQUk7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsTUFBTSxhQUFhLE1BQThCO0FBQy9DLFVBQU0sU0FBUyxNQUFNLEtBQUssSUFBSSxNQUFNLFdBQVcsSUFBSTtBQUNuRCxVQUFNLFFBQVEsSUFBSSxXQUFXLE1BQU07QUFDbkMsUUFBSSxTQUFTO0FBQ2IsYUFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFlBQVksS0FBSztBQUN6QyxnQkFBVSxPQUFPLGFBQWEsTUFBTSxDQUFDLENBQUM7QUFBQSxJQUN4QztBQUNBLFdBQU8sS0FBSyxNQUFNO0FBQUEsRUFDcEI7QUFBQSxFQUVRLFdBQVcsTUFBdUI7QUFDeEMsUUFBSSxLQUFLLEtBQUssZ0JBQWdCLFdBQVc7QUFBRyxhQUFPO0FBQ25ELGVBQU8sMkJBQVEsTUFBTSxLQUFLLEtBQUssaUJBQWlCLEVBQUUsS0FBSyxLQUFLLENBQUM7QUFBQSxFQUMvRDtBQUNGOzs7QUU5R0EsSUFBQUMsbUJBQXlDOzs7QUNBekMsSUFBQUMsbUJBQTBCO0FBdUIxQixJQUFNLG1CQUFtQjtBQUd6QixTQUFTLDJCQUEyQixLQUFzQjtBQUN4RCxRQUFNLElBQUksSUFBSSxRQUFRLFdBQVcsRUFBRTtBQUNuQyxRQUFNLElBQUksRUFBRSxNQUFNLGdCQUFnQjtBQUNsQyxNQUFJLENBQUM7QUFBRyxXQUFPO0FBQ2YsTUFBSTtBQUNGLG9DQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ2QsV0FBTztBQUFBLEVBQ1QsU0FBUTtBQUNOLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFHQSxTQUFTLDJCQUEyQixLQUFzQjtBQUN4RCxRQUFNLFdBQVcsSUFBSSxRQUFRLFdBQVcsRUFBRSxFQUFFLFFBQVEsZUFBZSxFQUFFO0FBQ3JFLFNBQU8sU0FBUyxXQUFXLEtBQUs7QUFDbEM7QUFNTyxTQUFTLG1CQUFtQixLQUFvQztBQUNyRSxNQUFJLDJCQUEyQixHQUFHO0FBQUcsV0FBTyxFQUFFLFFBQVEsUUFBUTtBQUM5RCxNQUFJLDJCQUEyQixHQUFHLEdBQUc7QUFDbkMsV0FBTyxFQUFFLFFBQVEsU0FBUyxRQUFRLHdGQUF5RTtBQUFBLEVBQzdHO0FBRUEsU0FBTyxFQUFFLFFBQVEsUUFBUTtBQUMzQjtBQVFPLFNBQVMscUJBQXFCLEtBQWEsT0FBdUI7QUFDdkUsTUFBSSwyQkFBMkIsR0FBRztBQUFHLFdBQU87QUFDNUMsUUFBTSxZQUFZLE1BQU0sUUFBUSxNQUFNLEdBQUc7QUFDekMsU0FBTztBQUFBLFVBQWdCLFNBQVM7QUFBQTtBQUFBO0FBQUEsRUFBYSxHQUFHO0FBQ2xEOzs7QUQvREEsSUFBTUMsb0JBQW1CO0FBV2xCLElBQU0sY0FBTixNQUFrQjtBQUFBLEVBQ3ZCLFVBQVUsU0FBaUIsVUFBa0IsT0FBd0I7QUFoQnZFO0FBaUJJLFVBQU0sYUFBWSw4QkFBUyxjQUFTLE1BQU0sR0FBRyxFQUFFLElBQUksTUFBeEIsbUJBQTJCLFFBQVEsU0FBUyxRQUFyRCxZQUE0RDtBQUM5RSxRQUFJLFNBQVMscUJBQXFCLFNBQVMsU0FBUztBQUNwRCxhQUFTLEtBQUssd0JBQXdCLE1BQU07QUFDNUMsV0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFRLHdCQUF3QixTQUF5QjtBQTdCM0Q7QUE4QkksVUFBTSxJQUFJLFFBQVEsTUFBTUEsaUJBQWdCO0FBQ3hDLFFBQUksQ0FBQztBQUFHLGFBQU87QUFFZixRQUFJO0FBQ0osUUFBSTtBQUNGLGNBQVEscUNBQVUsRUFBRSxDQUFDLENBQUMsTUFBZCxZQUFtQixDQUFDO0FBQUEsSUFDOUIsU0FBUTtBQUNOLGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTyxLQUFLO0FBQ1osV0FBTyxLQUFLO0FBRVosVUFBTSxPQUFPLE9BQU8sS0FBSyxJQUFJO0FBRTdCLFVBQU0sT0FBTyxLQUFLLGFBQVMsZ0NBQWMsSUFBSSxFQUFFLFFBQVEsSUFBSTtBQUMzRCxVQUFNLFFBQVEsT0FBTztBQUFBLEVBQVEsSUFBSTtBQUFBLE9BQVU7QUFBQTtBQUMzQyxVQUFNLFdBQVcsRUFBRSxDQUFDLElBQUksT0FBTztBQUMvQixXQUFPLFFBQVEsTUFBTSxHQUFHLEVBQUUsS0FBSyxJQUFJLFFBQVEsV0FBVyxRQUFRLFFBQU8sT0FBRSxVQUFGLFlBQVcsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNO0FBQUEsRUFDbEc7QUFDRjs7O0FFeENBLElBQU0saUJBQ0o7QUFJRixTQUFTLGFBQWEsTUFBc0I7QUFDMUMsUUFBTSxRQUFRLElBQUksWUFBWSxFQUFFLE9BQU8sSUFBSTtBQUMzQyxNQUFJLFNBQVM7QUFDYixXQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0FBQ3JDLGNBQVUsT0FBTyxhQUFhLE1BQU0sQ0FBQyxDQUFDO0FBQUEsRUFDeEM7QUFDQSxTQUFPLEtBQUssTUFBTTtBQUNwQjtBQUVPLElBQU0sWUFBTixNQUFnQjtBQUFBLEVBQ3JCLFlBQ1UsVUFDQSxNQUNBLEtBQ0EsWUFDUjtBQUpRO0FBQ0E7QUFDQTtBQUNBO0FBQUEsRUFDUDtBQUFBO0FBQUEsRUFHSCxJQUFZLGtCQUFrRDtBQUM1RCxXQUFPLEtBQUssS0FBSztBQUFBLEVBQ25CO0FBQUEsRUFFQSxNQUFNLFVBQWtDO0FBcEMxQztBQXFDSSxVQUFNLE9BQU8sS0FBSyxTQUFTO0FBSTNCLFFBQUksU0FBUyxLQUFLLEtBQUssZ0JBQWdCO0FBQ3ZDLFFBQUk7QUFDRixZQUFNLFFBQVEsSUFBSTtBQUFBLFFBQ2hCLEtBQUssU0FBUztBQUFBLFFBQ2QsS0FBSyxTQUFTO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFDQSxlQUFTLE1BQU0sTUFBTSxpQkFBaUI7QUFDdEMsV0FBSyxLQUFLLGVBQWU7QUFFekIsWUFBTSxZQUFZLE1BQU0sTUFBTSxjQUFjO0FBQzVDLFdBQUssU0FBUywwQkFBMEI7QUFBQSxJQUMxQyxTQUFRO0FBQUEsSUFFUjtBQUVBLFVBQU0sU0FBUyxJQUFJO0FBQUEsTUFDakIsS0FBSyxTQUFTO0FBQUEsTUFDZCxLQUFLLFNBQVM7QUFBQSxNQUNkO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFDQSxVQUFNLFlBQVksSUFBSSxjQUFjLEtBQUssS0FBSyxLQUFLLElBQUk7QUFDdkQsVUFBTSxjQUFjLElBQUksWUFBWTtBQUVwQyxVQUFNLGlCQUFpQixvQkFBSSxJQUF3QjtBQUNuRCxVQUFNLFNBQW1CLENBQUM7QUFDMUIsUUFBSSxhQUFhO0FBRWpCLFVBQU0sVUFBVSxTQUFTLEtBQUssS0FBSyxFQUFFO0FBRXJDLFNBQUssV0FBVyx3QkFBbUI7QUFFbkMsVUFBTSxRQUFRLE1BQU0sVUFBVSxRQUFRO0FBQ3RDLGVBQVcsUUFBUSxPQUFPO0FBQ3hCLFVBQUk7QUFDSixVQUFJO0FBRUosVUFBSSxLQUFLLGNBQWMsTUFBTTtBQUMzQixjQUFNLE1BQU0sTUFBTSxLQUFLLElBQUksTUFBTSxLQUFLLElBQUk7QUFFMUMsY0FBTSxRQUFRLG1CQUFtQixHQUFHO0FBQ3BDLFlBQUksTUFBTSxXQUFXLFNBQVM7QUFDNUI7QUFDQSxpQkFBTyxLQUFLLEdBQUcsS0FBSyxJQUFJLE1BQUssV0FBTSxXQUFOLFlBQWdCLHdCQUF3QixFQUFFO0FBQUEsUUFDekU7QUFDQSxjQUFNLGNBQWMsWUFBWSxVQUFVLEtBQUssS0FBSyxNQUFNLEtBQUssUUFBUTtBQUN2RSxrQkFBVSxhQUFhLFdBQVc7QUFDbEMsbUJBQVcsR0FBRyxPQUFPLFlBQVksS0FBSyxJQUFJO0FBQUEsTUFDNUMsT0FBTztBQUNMLGtCQUFVLE1BQU0sVUFBVSxhQUFhLElBQUk7QUFDM0MsbUJBQVcsR0FBRyxPQUFPLHdCQUF3QixLQUFLLElBQUk7QUFBQSxNQUN4RDtBQUVBLFVBQUksQ0FBQyxlQUFlLElBQUksUUFBUSxHQUFHO0FBQ2pDLHVCQUFlLElBQUksVUFBVSxFQUFFLE1BQU0sVUFBVSxRQUFRLENBQUM7QUFBQSxNQUMxRDtBQUFBLElBQ0Y7QUFNQSxtQkFBZSxJQUFJLEdBQUcsT0FBTyxpQkFBaUI7QUFBQSxNQUM1QyxNQUFNLEdBQUcsT0FBTztBQUFBLE1BQ2hCLFNBQVMsYUFBYSxLQUFLLGlCQUFpQixDQUFDO0FBQUEsSUFDL0MsQ0FBQztBQUNELG1CQUFlLElBQUksR0FBRyxPQUFPLHlCQUF5QjtBQUFBLE1BQ3BELE1BQU0sR0FBRyxPQUFPO0FBQUEsTUFDaEIsU0FBUyxhQUFhLEtBQUssb0JBQW9CLENBQUM7QUFBQSxJQUNsRCxDQUFDO0FBQ0QsbUJBQWUsSUFBSSxHQUFHLE9BQU8sa0JBQWtCO0FBQUEsTUFDN0MsTUFBTSxHQUFHLE9BQU87QUFBQSxNQUNoQixTQUFTLGFBQWEsR0FBRyxZQUFZO0FBQUEsQ0FBSTtBQUFBLElBQzNDLENBQUM7QUFLRCxRQUFJLEtBQUssb0JBQW9CLGdCQUFnQjtBQUMzQyxxQkFBZSxJQUFJLGdDQUFnQztBQUFBLFFBQ2pELE1BQU07QUFBQSxRQUNOLFNBQVMsYUFBYSx1QkFBdUI7QUFBQSxNQUMvQyxDQUFDO0FBQUEsSUFDSDtBQUVBLFVBQU0sY0FBYyxNQUFNLEtBQUssZUFBZSxPQUFPLENBQUM7QUFFdEQsU0FBSyxXQUFXLGVBQWUsWUFBWSxNQUFNLEtBQUs7QUFFdEQsVUFBTSxTQUFTLE1BQU0sT0FBTztBQUFBLE1BQzFCO0FBQUEsTUFDQSxzQkFBc0IsWUFBWSxNQUFNO0FBQUEsTUFDeEMsQ0FBQyxNQUFNLFVBQVUsS0FBSyxXQUFXLGFBQWEsSUFBSSxJQUFJLEtBQUssS0FBSztBQUFBLE1BQ2hFLENBQUMsYUFBYSxLQUFLLFdBQVcsdUJBQWtCLFFBQVEsTUFBTTtBQUFBO0FBQUE7QUFBQSxNQUc5RCxHQUFHLE9BQU87QUFBQSxNQUNWLEVBQUUsV0FBVyxLQUFLLFNBQVMsMkJBQTJCLE1BQU07QUFBQSxJQUM5RDtBQUVBLFdBQU8sUUFBUTtBQUNmLFdBQU8sU0FBUztBQUdoQixXQUFPLFlBQVksTUFBTTtBQUV6QixRQUFJLE9BQU8sV0FBVyxLQUFLLG9CQUFvQixjQUFjO0FBQzNELFlBQU0sYUFBYSxJQUFJO0FBQUEsUUFDckIsS0FBSyxTQUFTO0FBQUEsUUFDZCxLQUFLLFNBQVM7QUFBQSxNQUNoQjtBQUdBLFVBQUk7QUFDRixjQUFNLFdBQVcsaUJBQWlCLEtBQUssS0FBSyxpQkFBaUI7QUFBQSxNQUMvRCxTQUFTLEtBQWM7QUFDckIsY0FBTSxNQUFPLElBQWM7QUFDM0IsY0FBTSxTQUFVLElBQW9DO0FBQ3BELFlBQUksV0FBVyxPQUFPLElBQUksWUFBWSxFQUFFLFNBQVMsbUJBQW1CLEdBQUc7QUFDckUsY0FBSTtBQUNGLGtCQUFNLFdBQVc7QUFBQSxjQUNmLEtBQUssS0FBSztBQUFBLGNBQ1YsS0FBSyxTQUFTO0FBQUEsY0FDZDtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBRUYsU0FBUyxXQUFvQjtBQUMzQixtQkFBTyxPQUFPLEtBQUssK0JBQWdDLFVBQW9CLE9BQU8sRUFBRTtBQUNoRixtQkFBTyxVQUFVO0FBQUEsVUFDbkI7QUFBQSxRQUNGLE9BQU87QUFDTCxpQkFBTyxPQUFPLEtBQUssZUFBZSxHQUFHLEVBQUU7QUFDdkMsaUJBQU8sVUFBVTtBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUlBLFVBQUksT0FBTyxTQUFTO0FBQ2xCLFlBQUk7QUFDRixnQkFBTSxXQUFXO0FBQUEsWUFDZixLQUFLLEtBQUs7QUFBQSxZQUNWLEtBQUssU0FBUztBQUFBLFlBQ2Q7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGLFNBQVMsS0FBYztBQUNyQixpQkFBTyxPQUFPLEtBQUssNEJBQTZCLElBQWMsT0FBTyxFQUFFO0FBQ3ZFLGlCQUFPLFVBQVU7QUFBQSxRQUNuQjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLE9BQU8sU0FBUztBQUNsQixZQUFJO0FBQ0YsZ0JBQU0sV0FBVyxrQkFBa0IsS0FBSyxLQUFLLG1CQUFtQixNQUFNO0FBQUEsUUFDeEUsU0FBUyxLQUFjO0FBQ3JCLGlCQUFPLE9BQU8sS0FBSyxxQkFBc0IsSUFBYyxPQUFPLEtBQUssY0FBYyxFQUFFO0FBQ25GLGlCQUFPLFVBQVU7QUFBQSxRQUNuQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBSUEsU0FBSyxLQUFLLG9CQUFvQixDQUFDLE9BQU87QUFDdEMsU0FBSyxLQUFLLG1CQUFtQixPQUFPLFVBQVUsTUFBTSxZQUFPLE9BQU8sQ0FBQyxNQUFmLFlBQW9CO0FBRXhFLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQSxFQUdRLG1CQUEyQjtBQUNqQyxVQUFNLE1BQU07QUFBQSxNQUNWLE1BQU0sS0FBSyxLQUFLLFFBQVE7QUFBQSxNQUN4QixTQUFTO0FBQUEsTUFDVCxTQUFTLEVBQUUsT0FBTyxpQkFBaUI7QUFBQSxNQUNuQyxjQUFjLEVBQUUsVUFBVSxpQkFBaUI7QUFBQSxJQUM3QztBQUNBLFdBQU8sR0FBRyxLQUFLLFVBQVUsS0FBSyxNQUFNLENBQUMsQ0FBQztBQUFBO0FBQUEsRUFDeEM7QUFBQTtBQUFBLEVBR1Esc0JBQThCO0FBQ3BDLFVBQU0sWUFBWSxLQUFLLElBQUksTUFBTSxRQUFRO0FBQ3pDLFVBQU0sT0FBTyxLQUFLLEtBQUssUUFBUSxRQUFRLGdCQUFnQixFQUFFO0FBQ3pELFVBQU0sU0FBUztBQUFBLE1BQ2IsTUFBTTtBQUFBLFFBQ0osT0FBTyxLQUFLLEtBQUssZ0JBQWdCLEtBQUssS0FBSyxRQUFRO0FBQUEsUUFDbkQsYUFBYSxLQUFLLEtBQUssbUJBQW1CLHdCQUF3QixTQUFTO0FBQUEsUUFDM0UsU0FBUyxPQUFPLFdBQVcsSUFBSSxLQUFLO0FBQUEsUUFDcEMsVUFBVTtBQUFBLFFBQ1YsUUFBUSxLQUFLLEtBQUssY0FBYztBQUFBLE1BQ2xDO0FBQUEsTUFDQSxPQUFPLEVBQUUsVUFBVSxTQUFTO0FBQUEsTUFDNUIsS0FBSztBQUFBLFFBQ0gsRUFBRSxPQUFPLFFBQVEsS0FBSyxJQUFJO0FBQUEsUUFDMUIsRUFBRSxPQUFPLFFBQVEsS0FBSyxTQUFTO0FBQUEsTUFDakM7QUFBQSxNQUNBLFVBQVU7QUFBQSxRQUNSLFFBQVE7QUFBQSxRQUNSLFdBQVc7QUFBQSxRQUNYLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLGlCQUFpQjtBQUFBLFFBQ2pCLEtBQUs7QUFBQSxRQUNMLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxPQUFPLEVBQUUsWUFBWSxXQUFXLFFBQVEsU0FBUztBQUFBLElBQ25EO0FBQ0EsV0FBTyxHQUFHLEtBQUssVUFBVSxRQUFRLE1BQU0sQ0FBQyxDQUFDO0FBQUE7QUFBQSxFQUMzQztBQUFBLEVBRUEsTUFBTSxZQUEyQjtBQUMvQixRQUFJLEtBQUssb0JBQW9CLGNBQWM7QUFDekMsWUFBTSxJQUFJLE1BQU0saUVBQWlFO0FBQUEsSUFDbkY7QUFDQSxVQUFNLGFBQWEsSUFBSTtBQUFBLE1BQ3JCLEtBQUssU0FBUztBQUFBLE1BQ2QsS0FBSyxTQUFTO0FBQUEsSUFDaEI7QUFHQSxVQUFNLFdBQVcsa0JBQWtCLEtBQUssS0FBSyxpQkFBaUI7QUFBQSxFQUNoRTtBQUVGOzs7QVA3UUE7OztBUUZBLElBQUFDLG9CQUErQzs7O0FDQS9DLElBQUFDLG1CQUF3Qjs7O0FDUWpCLFNBQVMsY0FBYyxXQUFxQztBQUNqRSxRQUFNLEtBQUssVUFBVSxTQUFTLEtBQUssRUFBRSxLQUFLLDJCQUEyQixDQUFDO0FBQ3RFLEtBQUcsYUFBYSxFQUFFLE9BQU8sb0JBQW9CLENBQUM7QUFDOUMsS0FBRyxLQUFLO0FBQ1IsU0FBTztBQUNUO0FBRU8sU0FBUyxVQUFVLElBQWlCLEtBQW1CO0FBQzVELEtBQUcsUUFBUSxHQUFHO0FBQ2QsS0FBRyxLQUFLO0FBQ1Y7QUFFTyxTQUFTLFVBQVUsSUFBdUI7QUFDL0MsS0FBRyxLQUFLO0FBQ1Y7QUFFTyxTQUFTLEtBQUssS0FBc0IsT0FBcUI7QUFDOUQsTUFBSSxZQUFZLElBQUksRUFBRSxjQUFjLEtBQUs7QUFDM0M7QUFFTyxTQUFTLEtBQUssS0FBc0IsT0FBcUI7QUFDOUQsTUFBSSxZQUFZLEtBQUssRUFBRSxjQUFjLEtBQUs7QUFDNUM7OztBRHpCQSxJQUFNLG1CQUFtQjtBQUVsQixTQUFTLGlCQUFpQixLQUEyQixJQUF1QjtBQUMvRSxRQUFNLFVBQVUsSUFBSSx5QkFBUSxFQUFFO0FBQzlCLFVBQVEsUUFBUSxnQkFBZ0I7QUFDaEMsVUFBUSxXQUFXO0FBRW5CLEtBQUcsU0FBUyxLQUFLO0FBQUEsSUFDZixLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsTUFBSSxhQUFhLElBQUksT0FBTyxTQUFTO0FBRXJDLFFBQU0sZUFBZSxJQUFJLHlCQUFRLEVBQUUsRUFBRSxRQUFRLHVCQUF1QjtBQUNwRSxlQUFhLE9BQU8sV0FBVyxrQkFBa0I7QUFDakQsZUFBYSxPQUFPLFNBQVMsVUFBVSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3ZELGVBQWEsT0FBTyxXQUFXLEtBQUs7QUFDcEMsZUFBYSxPQUFPLFNBQVMsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNELGVBQWEsT0FBTyxXQUFXLFdBQVc7QUFDMUMsZUFBYSxPQUFPLFNBQVMsS0FBSztBQUFBLElBQ2hDLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU0sRUFBRSxRQUFRLFVBQVUsS0FBSyxXQUFXO0FBQUEsRUFDNUMsQ0FBQztBQUNELGVBQWEsUUFBUSxDQUFDLFNBQVM7QUFDN0IsU0FBSyxlQUFlLFlBQU87QUFDM0IsU0FBSyxRQUFRLE9BQU87QUFDcEIsU0FBSyxTQUFTLFVBQVU7QUFDeEIsU0FBSyxTQUFTLENBQUMsTUFBTTtBQUNuQixtQkFBYSxFQUFFLEtBQUs7QUFBQSxJQUN0QixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsUUFBTSxVQUFVLGNBQWMsRUFBRTtBQUVoQyxNQUFJLHlCQUFRLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUTtBQUNqQyxRQUFJLGNBQWMsbUJBQW1CLEVBQUUsT0FBTztBQUM5QyxRQUFJLFFBQVEsTUFBTTtBQUNoQixZQUFNLFlBQVk7QUFDaEIsWUFBSSxDQUFDO0FBQVksaUJBQU8sVUFBVSxTQUFTLGlDQUFpQztBQUM1RSxrQkFBVSxPQUFPO0FBQ2pCLGFBQUssS0FBSyxpQkFBWTtBQUN0QixZQUFJO0FBQ0YsZ0JBQU0sV0FBVyxNQUFNLElBQUksVUFBVSxZQUFZLElBQUksRUFBRSxFQUFFLHFCQUFxQjtBQUM5RSxjQUFJLE9BQU8sU0FBUyxjQUFjO0FBQ2xDLGNBQUksT0FBTyxTQUFTLGNBQWM7QUFDbEMsZ0JBQU0sSUFBSSxPQUFPLGFBQWE7QUFDOUIsY0FBSSxhQUFhO0FBQ2pCLGNBQUksT0FBTztBQUFBLFFBQ2IsU0FBUyxLQUFjO0FBQ3JCLGdCQUFNLE1BQU8sSUFBYztBQUMzQjtBQUFBLFlBQ0U7QUFBQSxZQUNBLFdBQVcsS0FBSyxHQUFHLElBQ2YscUVBQ0E7QUFBQSxVQUNOO0FBQ0EsZUFBSyxLQUFLLG1CQUFtQjtBQUFBLFFBQy9CO0FBQUEsTUFDRixHQUFHO0FBQUEsSUFDTCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0w7OztBRXBFQSxJQUFBQyxtQkFBd0I7OztBQ0d4QjtBQUtPLFNBQVMsMEJBQWtDO0FBQ2hELFFBQU0sUUFBUSxtQkFBbUIsS0FBSyxVQUFVO0FBQUEsSUFDOUMsRUFBRSxLQUFLLFFBQVEsTUFBTSxPQUFPO0FBQUEsSUFDNUIsRUFBRSxLQUFLLG1CQUFtQixNQUFNLE9BQU87QUFBQSxJQUN2QyxFQUFFLEtBQUssb0JBQW9CLE1BQU0sT0FBTztBQUFBLEVBQzFDLENBQUMsQ0FBQztBQUNGLFNBQU8sc0VBQXNFLEtBQUs7QUFDcEY7QUFHTyxTQUFTLFFBQVEsT0FBdUI7QUFDN0MsU0FBTyxNQUNKLEtBQUssRUFDTCxZQUFZLEVBQ1osUUFBUSxnQkFBZ0IsR0FBRyxFQUMzQixRQUFRLFlBQVksRUFBRSxFQUN0QixNQUFNLEdBQUcsRUFBRTtBQUNoQjtBQUdPLFNBQVMsb0JBQW9CLFlBQW9CLFVBQTBCO0FBQ2hGLFFBQU0sUUFBUSxXQUFXLFlBQVk7QUFDckMsTUFBSSxNQUFNLFNBQVMscUJBQXFCLEtBQUssTUFBTSxTQUFTLFlBQVksS0FBSyxNQUFNLFNBQVMsZ0JBQWdCLEdBQUc7QUFDN0csV0FBTztBQUFBLEVBQ1Q7QUFDQSxTQUFPLGlHQUFpRyxRQUFRLDRIQUE2RyxVQUFVO0FBQ3pPO0FBVUEsZUFBc0IsY0FDcEIsUUFDQSxNQUNBLGVBQ0Esa0JBQWtELGdCQUM1QjtBQUN0QixRQUFNLE9BQU8sUUFBUSxJQUFJO0FBQ3pCLE1BQUksQ0FBQztBQUFNLFVBQU0sSUFBSSxNQUFNLDJCQUEyQjtBQUV0RCxRQUFNLFFBQVEsT0FBTyxTQUFTO0FBQzlCLFFBQU0sT0FBTyxPQUFPLFNBQVM7QUFDN0IsTUFBSSxDQUFDO0FBQU0sVUFBTSxJQUFJLE1BQU0seURBQXlEO0FBRXBGLFFBQU0sT0FBTyxrQkFBa0I7QUFBQSxJQUM3QjtBQUFBLElBQ0E7QUFBQSxJQUNBLEdBQUc7QUFBQSxFQUNMLENBQUM7QUFFRCxRQUFNLEtBQUssSUFBSSxVQUFVLE9BQU8sU0FBUyxhQUFhLE9BQU8sSUFBSTtBQUNqRSxRQUFNLEdBQUcsV0FBVztBQUNwQixNQUFJLENBQUUsTUFBTSxHQUFHLFlBQVksR0FBSyxHQUFJO0FBQ2xDLFVBQU0sSUFBSSxNQUFNLHdEQUFtRDtBQUFBLEVBQ3JFO0FBRUEsTUFBSSxvQkFBb0IsZ0JBQWdCO0FBQ3RDLFFBQUk7QUFDRixZQUFNLEdBQUcsa0JBQWtCO0FBQUEsSUFDN0IsU0FBUyxHQUFZO0FBRW5CLGNBQVEsS0FBSyx1Q0FBdUMsQ0FBQztBQUFBLElBQ3ZEO0FBQUEsRUFDRjtBQUVBLE1BQUksU0FBUztBQUNiLE1BQUk7QUFDRixhQUFTLE1BQU0sR0FBRyxpQkFBaUI7QUFBQSxFQUNyQyxTQUFRO0FBQUEsRUFFUjtBQUNBLE9BQUssZUFBZTtBQUNwQixPQUFLLGFBQWE7QUFFbEIsTUFBSSxVQUFVO0FBRWQsTUFBSSxvQkFBb0IsZ0JBQWdCO0FBRXRDLGNBQVUsR0FBRyxLQUFLLGNBQWMsSUFBSTtBQUFBLEVBRXRDLE9BQU87QUFFTCxVQUFNLEtBQUssSUFBSSxjQUFjLE9BQU8sU0FBUyxpQkFBaUIsT0FBTyxTQUFTLGlCQUFpQjtBQUMvRixVQUFNLFVBQVUsU0FBUyxLQUFLLEVBQUU7QUFFaEMsVUFBTSxjQUFjLFFBQVEsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFO0FBQzdDLFFBQUk7QUFDRixnQkFBVSxNQUFNLEdBQUcsY0FBYyxhQUFhLE9BQU8sTUFBTSxRQUFRLE9BQU87QUFDMUUsV0FBSyxvQkFBb0I7QUFBQSxJQUMzQixTQUFTLFdBQW9CO0FBQzNCLFVBQUk7QUFDRixrQkFBVSxNQUFNLEdBQUcsV0FBVyxXQUFXO0FBQ3pDLGFBQUssb0JBQW9CO0FBQUEsTUFDM0IsU0FBUTtBQUNOLGNBQU0sSUFBSSxNQUFNLG9CQUFxQixVQUFvQixTQUFTLEdBQUcsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQUEsTUFDdkY7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLE9BQUssVUFBVTtBQUNmLFNBQU87QUFDVDs7O0FDbEhBLElBQUFDLG1CQUFzRTtBQUUvRCxJQUFNLG1CQUFOLGNBQStCLG1DQUFpQztBQUFBLEVBQ3JFLFlBQVksS0FBa0IsVUFBa0M7QUFDOUQsVUFBTSxHQUFHO0FBRG1CO0FBRTVCLFNBQUssZUFBZSxnQ0FBZ0M7QUFBQSxFQUN0RDtBQUFBLEVBRUEsV0FBNEI7QUFDMUIsV0FBTyxLQUFLLElBQUksTUFBTSxrQkFBa0IsRUFBRTtBQUFBLE1BQU8sT0FDL0MsRUFBRSxTQUFTLE9BQ1gsQ0FBQyxFQUFFLEtBQUssV0FBVyxHQUFHLEtBQ3RCLENBQUMsRUFBRSxLQUFLLFNBQVMsSUFBSSxNQUNwQixhQUFhLDRCQUFZLGFBQWEsMEJBQVMsRUFBRSxjQUFjO0FBQUEsSUFDbEU7QUFBQSxFQUNGO0FBQUEsRUFFQSxZQUFZLE1BQTZCO0FBQ3ZDLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUVBLGFBQWEsTUFBcUIsTUFBd0M7QUFDeEUsU0FBSyxTQUFTLEtBQUssSUFBSTtBQUFBLEVBQ3pCO0FBQ0Y7OztBRmpCQSxJQUFNLHFCQUFxQjtBQUMzQixJQUFNLHVCQUF1Qix3QkFBd0I7QUFFOUMsU0FBUyxrQkFBa0IsS0FBMkIsSUFBdUI7QUFDaEYsUUFBTSxVQUFVLElBQUkseUJBQVEsRUFBRTtBQUM5QixVQUFRLFFBQVEsbUNBQW1DO0FBQ25ELFVBQVEsV0FBVztBQUVuQixLQUFHLFNBQVMsS0FBSztBQUFBLElBQ2YsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUdELE1BQUksV0FBVyxJQUFJLGVBQWU7QUFDbEMsTUFBSSx5QkFBUSxFQUFFLEVBQ1gsUUFBUSxXQUFXLEVBQ25CLFFBQVEsb0ZBQW9GLEVBQzVGLFFBQVEsQ0FBQyxTQUFTO0FBQ2pCLFNBQUssZUFBZSxVQUFVO0FBQzlCLFNBQUssU0FBUyxRQUFRO0FBQ3RCLFNBQUssU0FBUyxDQUFDLE1BQU07QUFDbkIsaUJBQVc7QUFBQSxJQUNiLENBQUM7QUFBQSxFQUNILENBQUM7QUFHSCxNQUFJLGFBQWEsSUFBSSxPQUFPLFNBQVMsb0JBQW9CO0FBQ3pELE1BQUkseUJBQVEsRUFBRSxFQUNYLFFBQVEsd0JBQXdCLEVBQ2hDLFFBQVEsbUVBQW1FLEVBQzNFLFFBQVEsQ0FBQyxTQUFTO0FBQ2pCLFNBQUssZUFBZSxpQkFBaUI7QUFDckMsU0FBSyxTQUFTLFVBQVU7QUFDeEIsU0FBSyxTQUFTLENBQUMsTUFBTTtBQUNuQixtQkFBYSxFQUFFLEtBQUs7QUFFcEIsc0JBQWdCO0FBQUEsSUFDbEIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUlILE1BQUksbUJBQW1CLElBQUk7QUFFM0IsTUFBSSx5QkFBUSxFQUFFLEVBQ1gsUUFBUSxrQkFBa0IsRUFDMUIsUUFBUSwySUFBMkksRUFDbkosWUFBWSxDQUFDLE1BQU07QUFDbEIsTUFBRSxVQUFVLGdCQUFnQix3Q0FBd0M7QUFDcEUsTUFBRSxVQUFVLGNBQWMseUNBQXlDO0FBQ25FLE1BQUUsU0FBUyxnQkFBZ0I7QUFDM0IsTUFBRSxTQUFTLENBQUMsTUFBTTtBQUNoQix5QkFBbUI7QUFDbkIsVUFBSSxrQkFBa0I7QUFFdEIsZ0JBQVUsYUFBYSxFQUFFLFNBQVMscUJBQXFCLGVBQWUsVUFBVSxPQUFPLENBQUM7QUFBQSxJQUMxRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBR0gsTUFBSSxRQUFRLElBQUk7QUFDaEIsTUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLFlBQVk7QUFFaEMsTUFBSSx5QkFBUSxFQUFFLEVBQ1gsUUFBUSxlQUFlLEVBQ3ZCLFFBQVEsOERBQThELEVBQ3RFLFlBQVksQ0FBQyxNQUFNO0FBQ2xCLE1BQUUsVUFBVSxTQUFTLFlBQVk7QUFDakMsTUFBRSxVQUFVLFlBQVksMEJBQTBCO0FBQ2xELE1BQUUsU0FBUyxLQUFLO0FBQ2hCLE1BQUUsU0FBUyxDQUFDLE1BQU07QUFDaEIsY0FBUTtBQUNSLGtCQUFZO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUgsUUFBTSxpQkFBaUIsR0FBRyxVQUFVLDJCQUEyQjtBQUMvRCxRQUFNLGNBQWMsTUFBTTtBQUN4QixtQkFBZSxNQUFNO0FBQ3JCLFFBQUksVUFBVSxTQUFTO0FBQ3JCLHFCQUFlLGFBQWEsRUFBRSxTQUFTLE9BQU8sQ0FBQztBQUMvQztBQUFBLElBQ0Y7QUFDQSxtQkFBZSxhQUFhLEVBQUUsU0FBUyxRQUFRLENBQUM7QUFDaEQsUUFBSSxNQUFNLFdBQVcsR0FBRztBQUN0QixxQkFBZSxTQUFTLEtBQUssRUFBRSxNQUFNLHNCQUFzQixLQUFLLGtCQUFrQixDQUFDO0FBQUEsSUFDckYsT0FBTztBQUNMLFlBQU0sT0FBTyxlQUFlLFNBQVMsTUFBTSxFQUFFLEtBQUssc0JBQXNCLENBQUM7QUFDekUsZUFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSztBQUNyQyxjQUFNLEtBQUssS0FBSyxTQUFTLElBQUk7QUFDN0IsV0FBRyxhQUFhLEVBQUUsU0FBUyxRQUFRLGdCQUFnQixpQkFBaUIsWUFBWSxVQUFVLGNBQWMsTUFBTSxDQUFDO0FBQy9HLFdBQUcsV0FBVyxFQUFFLE1BQU0sTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNoQyxjQUFNLEtBQUssR0FBRyxTQUFTLFVBQVUsRUFBRSxNQUFNLFNBQUksQ0FBQztBQUM5QyxXQUFHLGlCQUFpQixTQUFTLE1BQU07QUFBRSxnQkFBTSxPQUFPLEdBQUcsQ0FBQztBQUFHLHNCQUFZO0FBQUEsUUFBRyxDQUFDO0FBQUEsTUFDM0U7QUFBQSxJQUNGO0FBQ0EsVUFBTSxTQUFTLGVBQWUsVUFBVTtBQUN4QyxXQUFPLGFBQWEsRUFBRSxXQUFXLE1BQU0sQ0FBQztBQUN4QyxVQUFNLFNBQVMsT0FBTyxTQUFTLFVBQVUsRUFBRSxNQUFNLHFCQUFnQixDQUFDO0FBQ2xFLFdBQU8sYUFBYSxFQUFFLE9BQU8sT0FBTyxDQUFDO0FBQ3JDLFdBQU8saUJBQWlCLFNBQVMsTUFBTTtBQUNyQyxVQUFJLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxNQUFNO0FBQ25DLFlBQUksQ0FBQyxNQUFNLFNBQVMsQ0FBQyxHQUFHO0FBQUUsZ0JBQU0sS0FBSyxDQUFDO0FBQUcsc0JBQVk7QUFBQSxRQUFHO0FBQUEsTUFDMUQsQ0FBQyxFQUFFLEtBQUs7QUFBQSxJQUNWLENBQUM7QUFBQSxFQUNIO0FBQ0EsY0FBWTtBQUlaLFFBQU0sWUFBWSxHQUFHLFVBQVUsZUFBZTtBQUM5QyxZQUFVLGFBQWEsRUFBRSxTQUFTLHFCQUFxQixlQUFlLFVBQVUsT0FBTyxDQUFDO0FBRXhGLE1BQUksVUFBVSxJQUFJLE9BQU8sU0FBUztBQUNsQyxNQUFJLFlBQVksSUFBSSxPQUFPLFNBQVM7QUFJcEMsTUFBSSxjQUFrQztBQUN0QyxRQUFNLGtCQUFrQixNQUFNO0FBQzVCLFFBQUksYUFBYTtBQUNmLGtCQUFZO0FBQUEsUUFDViwyREFBMkQsSUFBSSxPQUFPLFNBQVMsV0FBVyxJQUFJLGNBQWMsaUJBQWlCO0FBQUEsTUFDL0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLE1BQUkseUJBQVEsU0FBUyxFQUNsQixRQUFRLGtDQUFrQyxFQUMxQyxRQUFRLDBFQUEwRSxFQUNsRixVQUFVLENBQUMsTUFBTTtBQUNoQixNQUFFLGNBQWMscUJBQWdCO0FBQ2hDLE1BQUUsUUFBUSxNQUFNO0FBQUUsYUFBTyxLQUFLLHNCQUFzQixRQUFRO0FBQUEsSUFBRyxDQUFDO0FBQUEsRUFDbEUsQ0FBQztBQUVILFFBQU0sZUFBZSxJQUFJLHlCQUFRLFNBQVMsRUFDdkMsUUFBUSxtQ0FBbUMsRUFDM0MsUUFBUSwyREFBMkQsSUFBSSxPQUFPLFNBQVMsV0FBVyxJQUFJLGNBQWMsaUJBQWlCLEVBQUUsRUFDdkksVUFBVSxDQUFDLE1BQU07QUFDaEIsTUFBRSxjQUFjLGtCQUFhO0FBQzdCLE1BQUUsUUFBUSxNQUFNO0FBQUUsYUFBTyxLQUFLLG9CQUFvQixRQUFRO0FBQUEsSUFBRyxDQUFDO0FBQUEsRUFDaEUsQ0FBQztBQUVILGdCQUFjLGFBQWE7QUFFM0IsTUFBSSx5QkFBUSxTQUFTLEVBQ2xCLFFBQVEsc0JBQXNCLEVBQzlCLFFBQVEsdUNBQXVDLEVBQy9DLFFBQVEsQ0FBQyxNQUFNO0FBQ2QsTUFBRSxlQUFlLHVCQUFrQjtBQUNuQyxNQUFFLFFBQVEsT0FBTztBQUNqQixNQUFFLFNBQVMsT0FBTztBQUNsQixNQUFFLFNBQVMsQ0FBQyxNQUFNO0FBQUUsZ0JBQVUsRUFBRSxLQUFLO0FBQUEsSUFBRyxDQUFDO0FBQUEsRUFDM0MsQ0FBQztBQUVILE1BQUkseUJBQVEsU0FBUyxFQUNsQixRQUFRLHVCQUF1QixFQUMvQixRQUFRLHlEQUFvRCxFQUM1RCxRQUFRLENBQUMsTUFBTTtBQUNkLE1BQUUsZUFBZSxlQUFlO0FBQ2hDLE1BQUUsU0FBUyxTQUFTO0FBQ3BCLE1BQUUsU0FBUyxDQUFDLE1BQU07QUFBRSxrQkFBWSxFQUFFLEtBQUs7QUFBQSxJQUFHLENBQUM7QUFBQSxFQUM3QyxDQUFDO0FBRUgsUUFBTSxVQUFVLGNBQWMsRUFBRTtBQUVoQyxNQUFJLHlCQUFRLEVBQUUsRUFDWCxVQUFVLENBQUMsU0FBUztBQUNuQixTQUFLLGNBQWMsTUFBTTtBQUN6QixTQUFLLFFBQVEsTUFBTTtBQUFFLFVBQUksYUFBYTtBQUFVLFVBQUksT0FBTztBQUFBLElBQUcsQ0FBQztBQUFBLEVBQ2pFLENBQUMsRUFDQSxVQUFVLENBQUMsUUFBUTtBQUNsQixRQUFJLGNBQWMsVUFBVSxFQUFFLE9BQU87QUFDckMsUUFBSSxRQUFRLE1BQU07QUFDaEIsWUFBTSxZQUFZO0FBQ2hCLGNBQU0sV0FBVyxRQUFRLFFBQVE7QUFDakMsWUFBSSxDQUFDO0FBQVUsaUJBQU8sVUFBVSxTQUFTLDJCQUEyQjtBQUNwRSxZQUFJLENBQUMsV0FBVyxLQUFLO0FBQUcsaUJBQU8sVUFBVSxTQUFTLGlDQUFpQztBQUNuRixZQUFJLHFCQUFxQixnQkFBZ0IsQ0FBQyxTQUFTO0FBQ2pELGlCQUFPLFVBQVUsU0FBUyx5Q0FBeUM7QUFBQSxRQUNyRTtBQUNBLGtCQUFVLE9BQU87QUFDakIsYUFBSyxLQUFLLGtCQUFhO0FBRXZCLFlBQUk7QUFFRixjQUFJLE9BQU8sU0FBUyxtQkFBbUIsV0FBVyxLQUFLO0FBR3ZELGNBQUkscUJBQXFCLGNBQWM7QUFDckMsZ0JBQUksWUFBWTtBQUNoQixnQkFBSSxDQUFDLFdBQVc7QUFDZCxtQkFBSyxLQUFLLG9DQUErQjtBQUN6QywwQkFBWSxNQUFNLElBQUksY0FBYyxTQUFTLEVBQUUsRUFBRSxhQUFhO0FBQUEsWUFDaEU7QUFDQSxnQkFBSSxPQUFPLFNBQVMsa0JBQWtCO0FBQ3RDLGdCQUFJLE9BQU8sU0FBUyxvQkFBb0I7QUFDeEMsa0JBQU0sSUFBSSxPQUFPLGFBQWE7QUFBQSxVQUNoQztBQUVBLGVBQUssS0FBSywwQkFBcUI7QUFDL0IsZ0JBQU0sT0FBTyxNQUFNO0FBQUEsWUFDakIsSUFBSTtBQUFBLFlBQ0o7QUFBQSxZQUNBLEVBQUUsY0FBYyxPQUFPLGNBQWMsTUFBTTtBQUFBLFlBQzNDO0FBQUEsVUFDRjtBQUNBLGNBQUksT0FBTyxTQUFTLE1BQU0sS0FBSyxJQUFJO0FBQ25DLGNBQUksT0FBTyxTQUFTLGVBQWUsS0FBSztBQUN4QyxjQUFJLE9BQU8sU0FBUyxnQkFBZ0I7QUFDcEMsZ0JBQU0sSUFBSSxPQUFPLGFBQWE7QUFFOUIsY0FBSSxjQUFjO0FBQ2xCLGNBQUksZUFBZTtBQUNuQixjQUFJLGVBQWU7QUFDbkIsY0FBSSxrQkFBa0I7QUFDdEIsY0FBSSxhQUFhO0FBQ2pCLGNBQUksT0FBTztBQUFBLFFBQ2IsU0FBUyxLQUFjO0FBQ3JCLG9CQUFVLFNBQVUsSUFBYyxPQUFPO0FBQ3pDLGVBQUssS0FBSyxVQUFVO0FBQUEsUUFDdEI7QUFBQSxNQUNGLEdBQUc7QUFBQSxJQUNMLENBQUM7QUFBQSxFQUNILENBQUM7QUFDUDs7O0FHek9BLElBQUFDLG1CQUF3QjtBQUlqQixTQUFTLGlCQUFpQixLQUEyQixJQUF1QjtBQUpuRjtBQUtJLFFBQU0sVUFBVSxJQUFJLHlCQUFRLEVBQUU7QUFDOUIsVUFBUSxRQUFRLDZCQUE2QjtBQUM3QyxVQUFRLFdBQVc7QUFFbkIsS0FBRyxTQUFTLEtBQUs7QUFBQSxJQUNmLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxFQUNSLENBQUM7QUFFRCxNQUFJLGVBQWUsSUFBSSxPQUFPLFNBQVM7QUFDdkMsTUFBSSxrQkFBaUIsU0FBSSxPQUFPLFNBQVMsT0FBTyxtQkFBM0IsWUFBNkM7QUFFbEUsTUFBSSx5QkFBUSxFQUFFLEVBQ1gsUUFBUSx5QkFBeUIsRUFDakMsUUFBUSx3REFBd0QsRUFDaEUsVUFBVSxDQUFDLE1BQU07QUFDaEIsTUFBRSxTQUFTLFlBQVk7QUFDdkIsTUFBRSxTQUFTLENBQUMsTUFBTTtBQUNoQixxQkFBZTtBQUNmLHdCQUFrQixhQUFhLEVBQUUsU0FBUyxJQUFJLFVBQVUsT0FBTyxDQUFDO0FBQUEsSUFDbEUsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVILFFBQU0sb0JBQW9CLEdBQUcsVUFBVTtBQUN2QyxvQkFBa0IsYUFBYSxFQUFFLFNBQVMsZUFBZSxVQUFVLE9BQU8sQ0FBQztBQUUzRSxNQUFJLHlCQUFRLGlCQUFpQixFQUMxQixRQUFRLDhCQUE4QixFQUN0QyxRQUFRLHNIQUFzSCxFQUM5SCxZQUFZLENBQUMsTUFBTTtBQUNsQixNQUFFLFVBQVUsV0FBVyxpQ0FBMEI7QUFDakQsTUFBRSxVQUFVLFVBQVUsa0JBQVc7QUFDakMsTUFBRSxTQUFTLGNBQWM7QUFDekIsTUFBRSxTQUFTLENBQUMsTUFBTTtBQUFFLHVCQUFpQjtBQUFBLElBQTJCLENBQUM7QUFBQSxFQUNuRSxDQUFDO0FBRUgsUUFBTSxVQUFVLGNBQWMsRUFBRTtBQUVoQyxNQUFJLHlCQUFRLEVBQUUsRUFDWCxVQUFVLENBQUMsU0FBUztBQUNuQixTQUFLLGNBQWMsTUFBTTtBQUN6QixTQUFLLFFBQVEsTUFBTTtBQUFFLFVBQUksYUFBYTtBQUFXLFVBQUksT0FBTztBQUFBLElBQUcsQ0FBQztBQUFBLEVBQ2xFLENBQUMsRUFDQSxVQUFVLENBQUMsUUFBUTtBQUNsQixRQUFJLGNBQWMsY0FBYyxFQUFFLE9BQU87QUFDekMsUUFBSSxRQUFRLE1BQU07QUFDaEIsWUFBTSxZQUFZO0FBQ2hCLGtCQUFVLE9BQU87QUFDakIsWUFBSSxPQUFPLFNBQVMsZUFBZTtBQUNuQyxZQUFJLE9BQU8sU0FBUyxPQUFPLGlCQUFpQjtBQUM1QyxZQUFJLGdCQUFnQixDQUFDLElBQUksT0FBTyxTQUFTLE9BQU8sWUFBWTtBQUUxRCxjQUFJLE9BQU8sU0FBUyxPQUFPLGFBQWEsSUFBSSxPQUFPLHdCQUF3QjtBQUFBLFFBQzdFO0FBQ0EsWUFBSSxPQUFPLFNBQVMsZ0JBQWdCO0FBQ3BDLGNBQU0sSUFBSSxPQUFPLGFBQWE7QUFDOUIsWUFBSSxhQUFhO0FBQ2pCLFlBQUksT0FBTztBQUFBLE1BQ2IsR0FBRztBQUFBLElBQ0wsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNQOzs7QUNsRUEsSUFBQUMsb0JBQXdCO0FBR2pCLFNBQVMsZUFBZSxLQUEyQixJQUF1QjtBQUM3RSxRQUFNLE9BQU8sSUFBSSxPQUFPLGNBQWM7QUFFdEMsUUFBTSxVQUFVLElBQUksMEJBQVEsRUFBRTtBQUM5QixVQUFRLFFBQVEsMkJBQXFCO0FBQ3JDLFVBQVEsV0FBVztBQUVuQixRQUFNLFVBQVUsSUFBSSwwQkFBUSxFQUFFLEVBQUU7QUFBQSxJQUM5QixPQUFPLGtDQUFrQztBQUFBLEVBQzNDO0FBQ0EsTUFBSSw2QkFBTSxTQUFTO0FBQ2pCLFlBQVEsT0FBTyxXQUFXLDZCQUE2QjtBQUN2RCxZQUFRLE9BQU8sU0FBUyxLQUFLO0FBQUEsTUFDM0IsTUFBTSxXQUFXLEtBQUssT0FBTztBQUFBLE1BQzdCLE1BQU0sV0FBVyxLQUFLLE9BQU87QUFBQSxNQUM3QixNQUFNLEVBQUUsUUFBUSxVQUFVLEtBQUssV0FBVztBQUFBLElBQzVDLENBQUM7QUFBQSxFQUNILE9BQU87QUFDTCxZQUFRLFFBQVEsdUVBQXVFO0FBQUEsRUFDekY7QUFFQSxNQUFJLDBCQUFRLEVBQUUsRUFDWCxVQUFVLENBQUMsVUFBVTtBQUNwQixVQUFNLGNBQWMsT0FBTyx1QkFBdUIsb0JBQW9CO0FBQ3RFLFVBQU0sUUFBUSxNQUFNO0FBQ2xCLFlBQU0sWUFBWTtBQUNoQixZQUFJLHVCQUF1QjtBQUMzQixZQUFJO0FBQU0sY0FBSSxjQUFjO0FBQUE7QUFDdkIsY0FBSSxPQUFPO0FBQUEsTUFDbEIsR0FBRztBQUFBLElBQ0wsQ0FBQztBQUFBLEVBQ0gsQ0FBQyxFQUNBLFVBQVUsQ0FBQyxRQUFRO0FBQ2xCLFFBQUksY0FBYyxPQUFPLGdCQUFnQixhQUFhLEVBQUUsT0FBTztBQUMvRCxRQUFJLFFBQVEsTUFBTTtBQUNoQixZQUFNLFlBQVk7QUFDaEIsWUFBSSx1QkFBdUI7QUFDM0IsWUFBSSxjQUFjO0FBQ2xCLFlBQUk7QUFBTSxnQkFBTSxJQUFJLE9BQU8sVUFBVTtBQUFBO0FBQ2hDLGdCQUFNLElBQUksT0FBTyxTQUFTLEtBQUs7QUFBQSxNQUN0QyxHQUFHO0FBQUEsSUFDTCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ1A7OztBQ3ZDTyxTQUFTLGFBQWEsS0FBMkIsSUFBdUI7QUFDN0Usb0JBQWtCLEtBQUssRUFBRTtBQUN6QixNQUFJLElBQUksZUFBZTtBQUFVLHFCQUFpQixLQUFLLEVBQUU7QUFBQSxXQUNoRCxJQUFJLGVBQWU7QUFBVyxzQkFBa0IsS0FBSyxFQUFFO0FBQUEsV0FDdkQsSUFBSSxlQUFlO0FBQVUscUJBQWlCLEtBQUssRUFBRTtBQUFBO0FBQ3pELG1CQUFlLEtBQUssRUFBRTtBQUM3QjtBQUVBLFNBQVMsa0JBQWtCLEtBQTJCLElBQXVCO0FBQ3pFLFFBQU0sUUFBa0Q7QUFBQSxJQUN0RCxFQUFFLEtBQUssVUFBVSxPQUFPLFNBQVM7QUFBQSxJQUNqQyxFQUFFLEtBQUssV0FBVyxPQUFPLFVBQVU7QUFBQSxJQUNuQyxFQUFFLEtBQUssVUFBVSxPQUFPLFNBQVM7QUFBQSxJQUNqQyxFQUFFLEtBQUssUUFBUSxPQUFPLE9BQU87QUFBQSxFQUMvQjtBQUNBLFFBQU0sUUFBUSxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRztBQUNwQyxRQUFNLGFBQWEsTUFBTSxRQUFRLElBQUksVUFBVTtBQUUvQyxRQUFNLFVBQVUsR0FBRyxVQUFVLGlCQUFpQjtBQUM5QyxRQUFNLFFBQVEsQ0FBQyxFQUFFLE1BQU0sR0FBRyxNQUFNO0FBQzlCLFVBQU0sTUFBTSxRQUFRLFVBQVUsYUFBYTtBQUMzQyxRQUFJLElBQUk7QUFBWSxVQUFJLFNBQVMsV0FBVztBQUFBLGFBQ25DLE1BQU07QUFBWSxVQUFJLFNBQVMsUUFBUTtBQUNoRCxVQUFNLFVBQVUsSUFBSSxXQUFXLGVBQWU7QUFDOUMsWUFBUSxRQUFRLEtBQUs7QUFBQSxFQUN2QixDQUFDO0FBQ0w7OztBQ2pDQSxJQUFBQyxvQkFBd0I7OztBQ0F4QixJQUFBQyxvQkFBd0I7OztBQ2F4QixJQUFNLGVBQWU7QUFDckIsSUFBTSxnQkFBZ0I7QUFFZixJQUFNLGdCQUFOLE1BQU0sZUFBYztBQUFBO0FBQUEsRUFFekIsYUFBYSxLQUFLLEtBQXNDO0FBQ3RELFFBQUk7QUFDRixZQUFNLE1BQU0sTUFBTSxJQUFJLE1BQU0sUUFBUSxLQUFLLGFBQWE7QUFDdEQsWUFBTSxTQUFTLEtBQUssTUFBTSxHQUFHO0FBQzdCLFVBQUksT0FBTyxZQUFZLEtBQUssTUFBTSxRQUFRLE9BQU8sT0FBTyxHQUFHO0FBQ3pELGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRixTQUFRO0FBQUEsSUFFUjtBQUNBLFdBQU8sRUFBRSxTQUFTLEdBQUcsU0FBUyxDQUFDLEVBQUU7QUFBQSxFQUNuQztBQUFBO0FBQUEsRUFHQSxhQUFhLEtBQUssS0FBVSxVQUE0QztBQUN0RSxRQUFJO0FBQ0YsWUFBTSxTQUFTLE1BQU0sSUFBSSxNQUFNLFFBQVEsT0FBTyxZQUFZO0FBQzFELFVBQUksQ0FBQyxRQUFRO0FBQ1gsY0FBTSxJQUFJLE1BQU0sUUFBUSxNQUFNLFlBQVk7QUFBQSxNQUM1QztBQUNBLFlBQU0sSUFBSSxNQUFNLFFBQVEsTUFBTSxlQUFlLEtBQUssVUFBVSxVQUFVLE1BQU0sQ0FBQyxDQUFDO0FBQUEsSUFDaEYsU0FBUyxLQUFLO0FBRVosY0FBUSxLQUFLLDhDQUE4QyxHQUFHO0FBQUEsSUFDaEU7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1BLGFBQWEsT0FDWCxLQUNBLE1BQ0Esa0JBQ0EsYUFDQSx5QkFDZTtBQUNmLFVBQU0sV0FBVyxNQUFNLGVBQWMsS0FBSyxHQUFHO0FBQzdDLFVBQU0sUUFBdUI7QUFBQSxNQUMzQixJQUFJLEtBQUs7QUFBQSxNQUNULE1BQU0sS0FBSztBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQSxjQUFjLEtBQUs7QUFBQSxNQUNuQixtQkFBbUIsS0FBSztBQUFBLE1BQ3hCLFNBQVMsS0FBSztBQUFBLE1BQ2QsaUJBQWlCLEtBQUs7QUFBQSxNQUN0QixlQUFlLEtBQUs7QUFBQSxNQUNwQjtBQUFBLElBQ0Y7QUFDQSxVQUFNLE1BQU0sU0FBUyxRQUFRLFVBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxLQUFLLEVBQUU7QUFDOUQsUUFBSSxPQUFPLEdBQUc7QUFDWixlQUFTLFFBQVEsR0FBRyxJQUFJO0FBQUEsSUFDMUIsT0FBTztBQUNMLGVBQVMsUUFBUSxLQUFLLEtBQUs7QUFBQSxJQUM3QjtBQUNBLFVBQU0sZUFBYyxLQUFLLEtBQUssUUFBUTtBQUFBLEVBQ3hDO0FBQUE7QUFBQSxFQUdBLGFBQWEsT0FBTyxLQUFVLFFBQStCO0FBQzNELFVBQU0sV0FBVyxNQUFNLGVBQWMsS0FBSyxHQUFHO0FBQzdDLGFBQVMsVUFBVSxTQUFTLFFBQVEsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLE1BQU07QUFDakUsVUFBTSxlQUFjLEtBQUssS0FBSyxRQUFRO0FBQUEsRUFDeEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFBLE9BQU8sc0JBQ0wsU0FDQSxpQkFDaUI7QUFDakIsV0FBTyxRQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLElBQUksRUFBRSxFQUFFLENBQUM7QUFBQSxFQUN6RDtBQUNGOzs7QUQzRkEsZUFBc0IsMEJBQTBCLEtBQTJCLElBQWdDO0FBQ3ZHLFFBQU0sSUFBSSxJQUFJLE9BQU87QUFDckIsUUFBTSxXQUFXLE1BQU0sY0FBYyxLQUFLLElBQUksR0FBRztBQUNqRCxRQUFNLGNBQWMsSUFBSSxJQUFZLEVBQUUsTUFBTSxJQUFJLENBQUMsU0FBUyxLQUFLLEVBQUUsQ0FBQztBQUNsRSxRQUFNLFdBQVcsY0FBYyxzQkFBc0IsU0FBUyxTQUFTLFdBQVc7QUFFbEYsTUFBSSxTQUFTLFdBQVc7QUFBRztBQUUzQixRQUFNLGlCQUFpQixHQUFHLFVBQVUsb0JBQW9CO0FBRXhELFFBQU0saUJBQWlCLElBQUksMEJBQVEsY0FBYztBQUNqRCxpQkFBZSxRQUFRLHNCQUFzQjtBQUM3QyxpQkFBZSxXQUFXO0FBRTFCLGlCQUFlLFNBQVMsS0FBSztBQUFBLElBQzNCLEtBQUs7QUFBQSxJQUNMLE1BQU0sbUJBQW1CLFNBQVMsTUFBTSxRQUFRLFNBQVMsV0FBVyxJQUFJLEtBQUssR0FBRztBQUFBLEVBQ2xGLENBQUM7QUFFRCxhQUFXLFNBQVMsVUFBVTtBQUM1QixVQUFNLFFBQ0osR0FBRyxNQUFNLFFBQVEsTUFBTSxnQkFBZ0IsU0FBTSxNQUFNLG9CQUFvQixlQUFlLHFCQUFxQixjQUFjLE1BQ3hILE1BQU0sVUFBVSxTQUFNLE1BQU0sT0FBTyxLQUFLO0FBQzNDLG1CQUFlLFNBQVMsS0FBSyxFQUFFLEtBQUssNEJBQTRCLE1BQU0sVUFBSyxLQUFLLEdBQUcsQ0FBQztBQUFBLEVBQ3RGO0FBRUEsUUFBTSxVQUFVLGNBQWMsY0FBYztBQUU1QyxNQUFJLDBCQUFRLGNBQWMsRUFBRSxVQUFVLENBQUMsTUFBTTtBQUMzQyxNQUFFLGNBQWMsV0FBVyxTQUFTLE1BQU0sUUFBUSxTQUFTLFdBQVcsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFLE9BQU87QUFDN0YsTUFBRSxRQUFRLE1BQU07QUFDZCxZQUFNLFlBQVk7QUFyQzFCO0FBc0NVLFVBQUUsWUFBWSxJQUFJLEVBQUUsY0FBYyxpQkFBWTtBQUM5QyxnQkFBUSxLQUFLO0FBQ2IsWUFBSTtBQUNGLHFCQUFXLFNBQVMsVUFBVTtBQUM1QixjQUFFLG1CQUFtQixFQUFFLG9CQUFvQixNQUFNO0FBQ2pELGNBQUUsY0FBYyxFQUFFLGVBQWUsTUFBTTtBQUN2QyxjQUFFLDBCQUEwQixFQUFFLDJCQUEyQixNQUFNLDJCQUEyQjtBQUUxRixrQkFBTSxFQUFFLG1CQUFtQixPQUFPLElBQUksTUFBTTtBQUM1QyxrQkFBTSxlQUFlLE9BQU87QUFBQSxjQUMxQixJQUFJLE1BQU07QUFBQSxjQUNWLE1BQU0sTUFBTTtBQUFBLGNBQ1osWUFBWSxNQUFNO0FBQUEsY0FDbEIsY0FBYyxNQUFNO0FBQUEsY0FDcEIsbUJBQW1CLE1BQU07QUFBQSxjQUN6QixTQUFTLE1BQU07QUFBQSxjQUNmLGlCQUFpQixNQUFNO0FBQUEsY0FDdkIsZUFBZSxNQUFNO0FBQUEsY0FDckIsYUFBYSxDQUFDLENBQUMsTUFBTTtBQUFBLFlBQ3ZCLENBQUM7QUFDRCxjQUFFLE1BQU0sS0FBSyxZQUFZO0FBQUEsVUFDM0I7QUFDQSxZQUFFLGVBQWUsRUFBRSxrQkFBZ0IsT0FBRSxNQUFNLENBQUMsTUFBVCxtQkFBWSxPQUFNO0FBQ3JELFlBQUUsZ0JBQWdCO0FBQ2xCLGdCQUFNLElBQUksT0FBTyxhQUFhO0FBQzlCLGNBQUksT0FBTztBQUFBLFFBQ2IsU0FBUyxLQUFjO0FBQ3JCLG9CQUFVLFNBQVUsSUFBYyxPQUFPO0FBQ3pDLFlBQUUsWUFBWSxLQUFLLEVBQUUsY0FBYyxXQUFXLFNBQVMsTUFBTSxRQUFRLFNBQVMsV0FBVyxJQUFJLEtBQUssR0FBRyxFQUFFO0FBQUEsUUFDekc7QUFBQSxNQUNGLEdBQUc7QUFBQSxJQUNMLENBQUM7QUFBQSxFQUNILENBQUM7QUFDTDs7O0FEaEVBLElBQU1DLHNCQUFxQjtBQUMzQixJQUFNQyx3QkFBdUIsd0JBQXdCO0FBRTlDLFNBQVMseUJBQXlCLEtBQTJCLElBQXVCO0FBQ3ZGLFFBQU0sSUFBSSxJQUFJLE9BQU87QUFHckIsUUFBTSxjQUFjLElBQUksMEJBQVEsRUFBRTtBQUNsQyxjQUFZLFFBQVEsYUFBYTtBQUNqQyxjQUFZLFdBQVc7QUFHdkIsUUFBTSxZQUFZLElBQUksMEJBQVEsRUFBRSxFQUFFLFFBQVEsUUFBUTtBQUNsRCxNQUFJLEVBQUUsZUFBZSxFQUFFLGFBQWE7QUFDbEMsY0FBVSxRQUFRLGlCQUFpQixFQUFFLFdBQVcsRUFBRTtBQUNsRCxjQUFVLFVBQVUsQ0FBQyxNQUFNO0FBQ3pCLFFBQUUsY0FBYyxZQUFZO0FBQzVCLFFBQUUsU0FBUyxTQUFTLGFBQWE7QUFDakMsUUFBRSxRQUFRLE1BQU07QUFDZCxjQUFNLFlBQVk7QUFDaEIsWUFBRSxjQUFjO0FBQ2hCLFlBQUUsY0FBYztBQUNoQixZQUFFLGdCQUFnQjtBQUNsQixnQkFBTSxJQUFJLE9BQU8sYUFBYTtBQUM5QixjQUFJLHVCQUF1QjtBQUMzQixjQUFJLGFBQWE7QUFDakIsY0FBSSxPQUFPO0FBQUEsUUFDYixHQUFHO0FBQUEsTUFDTCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxPQUFPO0FBQ0wsY0FBVSxRQUFRLGVBQWU7QUFDakMsY0FBVSxVQUFVLENBQUMsTUFBTTtBQUN6QixRQUFFLGNBQWMsU0FBUyxFQUFFLE9BQU87QUFDbEMsUUFBRSxRQUFRLE1BQU07QUFBRSxZQUFJLHVCQUF1QjtBQUFPLFlBQUksYUFBYTtBQUFVLFlBQUksT0FBTztBQUFBLE1BQUcsQ0FBQztBQUFBLElBQ2hHLENBQUM7QUFBQSxFQUNIO0FBR0EsUUFBTSxZQUFZLElBQUksMEJBQVEsRUFBRSxFQUFFLFFBQVEsWUFBWTtBQUN0RCxNQUFJLEVBQUUsaUJBQWlCO0FBQ3JCLFVBQU0sY0FBYyxFQUFFLG9CQUNsQixZQUFZLEVBQUUsa0JBQWtCLE1BQU0sR0FBRyxDQUFDLENBQUMsV0FDM0M7QUFDSixjQUFVLFFBQVEsV0FBVztBQUc3QixjQUFVLFVBQVUsQ0FBQyxNQUFNO0FBQ3pCLFFBQUUsY0FBYyxxQkFBcUI7QUFDckMsUUFBRSxXQUFXLGlGQUE0RTtBQUN6RixRQUFFLFFBQVEsTUFBTTtBQUFFLGVBQU8sS0FBS0QscUJBQW9CLFFBQVE7QUFBQSxNQUFHLENBQUM7QUFBQSxJQUNoRSxDQUFDO0FBQ0QsY0FBVSxVQUFVLENBQUMsTUFBTTtBQUN6QixRQUFFLGNBQWMsWUFBWTtBQUM1QixRQUFFLFNBQVMsU0FBUyxhQUFhO0FBQ2pDLFFBQUUsUUFBUSxNQUFNO0FBQ2QsY0FBTSxZQUFZO0FBQ2hCLFlBQUUsa0JBQWtCO0FBQ3BCLFlBQUUsb0JBQW9CO0FBQ3RCLGdCQUFNLElBQUksT0FBTyxhQUFhO0FBQzlCLGNBQUksT0FBTztBQUFBLFFBQ2IsR0FBRztBQUFBLE1BQ0wsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0gsT0FBTztBQUNMLGNBQVUsUUFBUSw0REFBdUQ7QUFDekUsY0FBVSxVQUFVLENBQUMsTUFBTTtBQUN6QixRQUFFLGNBQWMsU0FBUztBQUN6QixRQUFFLFFBQVEsTUFBTTtBQUFFLFlBQUksMEJBQTBCO0FBQUEsTUFBRyxDQUFDO0FBQUEsSUFDdEQsQ0FBQztBQUFBLEVBQ0g7QUFHQSxPQUFLLDBCQUEwQixLQUFLLEVBQUU7QUFHMUM7QUFFTyxTQUFTLDBCQUEwQixLQUEyQixhQUFnQztBQUNqRyxRQUFNLElBQUksSUFBSSxPQUFPO0FBRXJCLFFBQU0sVUFBVSxJQUFJLDBCQUFRLFdBQVc7QUFDdkMsVUFBUSxRQUFRLG9CQUFvQjtBQUNwQyxVQUFRLFdBQVc7QUFFbkIsY0FBWSxTQUFTLEtBQUs7QUFBQSxJQUN4QixLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsUUFBTSxZQUFZLFlBQVksVUFBVTtBQUN4QyxRQUFNLFdBQVcsR0FBRyxFQUFFLFdBQVcsSUFBSSxFQUFFLG9CQUFvQixpQkFBaUI7QUFFNUUsTUFBSSwwQkFBUSxTQUFTLEVBQ2xCLFFBQVEsa0NBQWtDLEVBQzFDLFFBQVEsMEVBQTBFLEVBQ2xGLFVBQVUsQ0FBQyxNQUFNO0FBQ2hCLE1BQUUsY0FBYyxxQkFBZ0I7QUFDaEMsTUFBRSxRQUFRLE1BQU07QUFBRSxhQUFPLEtBQUtDLHVCQUFzQixRQUFRO0FBQUEsSUFBRyxDQUFDO0FBQUEsRUFDbEUsQ0FBQztBQUVILE1BQUksMEJBQVEsU0FBUyxFQUNsQixRQUFRLG1DQUFtQyxFQUMzQyxRQUFRLDJEQUEyRCxRQUFRLEVBQUUsRUFDN0UsVUFBVSxDQUFDLE1BQU07QUFDaEIsTUFBRSxjQUFjLGtCQUFhO0FBQzdCLE1BQUUsUUFBUSxNQUFNO0FBQUUsYUFBTyxLQUFLRCxxQkFBb0IsUUFBUTtBQUFBLElBQUcsQ0FBQztBQUFBLEVBQ2hFLENBQUM7QUFFSCxNQUFJLFVBQVU7QUFDZCxNQUFJLFlBQVk7QUFFaEIsTUFBSSwwQkFBUSxTQUFTLEVBQ2xCLFFBQVEsc0JBQXNCLEVBQzlCLFFBQVEsdUNBQXVDLEVBQy9DLFFBQVEsQ0FBQyxNQUFNO0FBQ2QsTUFBRSxlQUFlLHVCQUFrQjtBQUNuQyxNQUFFLFFBQVEsT0FBTztBQUNqQixNQUFFLFNBQVMsQ0FBQyxNQUFNO0FBQUUsZ0JBQVUsRUFBRSxLQUFLO0FBQUEsSUFBRyxDQUFDO0FBQUEsRUFDM0MsQ0FBQztBQUVILE1BQUksMEJBQVEsU0FBUyxFQUNsQixRQUFRLHVCQUF1QixFQUMvQixRQUFRLHlEQUFvRCxFQUM1RCxRQUFRLENBQUMsTUFBTTtBQUNkLE1BQUUsZUFBZSxlQUFlO0FBQ2hDLE1BQUUsU0FBUyxDQUFDLE1BQU07QUFBRSxrQkFBWSxFQUFFLEtBQUs7QUFBQSxJQUFHLENBQUM7QUFBQSxFQUM3QyxDQUFDO0FBRUgsUUFBTSxVQUFVLGNBQWMsV0FBVztBQUV6QyxNQUFJLDBCQUFRLFdBQVcsRUFDcEIsVUFBVSxDQUFDLFNBQVM7QUFDbkIsU0FBSyxjQUFjLFFBQVE7QUFDM0IsU0FBSyxRQUFRLE1BQU07QUFDakIsVUFBSSw4QkFBOEI7QUFDbEMsVUFBSSxPQUFPO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDSCxDQUFDLEVBQ0EsVUFBVSxDQUFDLFFBQVE7QUFDbEIsUUFBSSxjQUFjLGdCQUFnQixFQUFFLE9BQU87QUFDM0MsUUFBSSxRQUFRLE1BQU07QUFDaEIsWUFBTSxZQUFZO0FBQ2hCLFlBQUksQ0FBQztBQUFTLGlCQUFPLFVBQVUsU0FBUyx5Q0FBeUM7QUFDakYsa0JBQVUsT0FBTztBQUNqQixhQUFLLEtBQUssaUJBQVk7QUFDdEIsWUFBSTtBQUNGLGNBQUksWUFBWTtBQUNoQixjQUFJLENBQUMsV0FBVztBQUNkLGlCQUFLLEtBQUsseUJBQW9CO0FBQzlCLHdCQUFZLE1BQU0sSUFBSSxjQUFjLFNBQVMsRUFBRSxFQUFFLGFBQWE7QUFBQSxVQUNoRTtBQUNBLFlBQUUsa0JBQWtCO0FBQ3BCLFlBQUUsb0JBQW9CO0FBQ3RCLGdCQUFNLElBQUksT0FBTyxhQUFhO0FBQzlCLGNBQUksOEJBQThCO0FBQ2xDLGNBQUksT0FBTztBQUFBLFFBQ2IsU0FBUyxLQUFjO0FBQ3JCLG9CQUFVLFNBQVUsSUFBYyxPQUFPO0FBQ3pDLGVBQUssS0FBSyxnQkFBZ0I7QUFBQSxRQUM1QjtBQUFBLE1BQ0YsR0FBRztBQUFBLElBQ0wsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNMOzs7QUczS0YsSUFBQUUsb0JBQXdCO0FBR2pCLFNBQVMsb0JBQW9CLEtBQTJCLElBQXVCO0FBSHRGO0FBSUUsUUFBTSxJQUFJLElBQUksT0FBTztBQUNyQixRQUFNLGdCQUFnQixJQUFJLDBCQUFRLEVBQUU7QUFDcEMsZ0JBQWMsUUFBUSxrQkFBa0I7QUFDeEMsZ0JBQWMsV0FBVztBQUV2QixRQUFNLGlCQUFpQixFQUFFLE9BQU8sY0FBYyxJQUFJLE9BQU8sd0JBQXdCO0FBQ2pGLFFBQU0sWUFBWSxzQkFBc0IsRUFBRSxXQUFXLElBQUksY0FBYztBQUV2RSxNQUFJLDBCQUFRLEVBQUUsRUFDWCxRQUFRLG1CQUFtQixFQUMzQixRQUFRLGlCQUFpQixFQUFFLFdBQVcsSUFBSSxFQUFFLG9CQUFvQixpQkFBaUIscUNBQXFDLEVBQUUsV0FBVyxJQUFJLGNBQWMsc0NBQXNDLEVBQzNMLFFBQVEsQ0FBQyxNQUFNO0FBQ2QsTUFBRSxTQUFTLGNBQWM7QUFDekIsTUFBRSxZQUFZLElBQUk7QUFBQSxFQUNwQixDQUFDO0FBRUgsUUFBTSxjQUFjLElBQUksMEJBQVEsRUFBRSxFQUMvQixRQUFRLHVCQUF1QixFQUMvQixRQUFRLGdEQUFnRDtBQUMzRCxjQUFZLFVBQVUsU0FBUyxLQUFLO0FBQUEsSUFDbEMsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELG9CQUFZLFVBQVUsY0FBYyxHQUFHLE1BQXZDLG1CQUEwQyxpQkFBaUIsU0FBUyxDQUFDLE1BQU07QUFDekUsTUFBRSxlQUFlO0FBQ2pCLFdBQU8sS0FBSyxTQUFTO0FBQUEsRUFDdkI7QUFFQSxNQUFJLDBCQUFRLEVBQUUsRUFDWCxRQUFRLHlCQUF5QixFQUNqQyxRQUFRLDhFQUE4RSxFQUN0RixVQUFVLENBQUMsV0FBVztBQUNyQixXQUFPLFNBQVMsRUFBRSxZQUFZO0FBQzlCLFdBQU8sU0FBUyxDQUFDLFVBQVU7QUFDekIsWUFBTSxZQUFZO0FBQ2hCLFVBQUUsZUFBZTtBQUNqQixZQUFJLFNBQVMsQ0FBQyxFQUFFLE9BQU8sWUFBWTtBQUNqQyxZQUFFLE9BQU8sYUFBYSxJQUFJLE9BQU8sd0JBQXdCO0FBQUEsUUFDM0Q7QUFDQSxjQUFNLElBQUksT0FBTyxhQUFhO0FBQzlCLFlBQUksT0FBTztBQUFBLE1BQ2IsR0FBRztBQUFBLElBQ0wsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVILE1BQUksRUFBRSxjQUFjO0FBQ2xCLFFBQUksMEJBQVEsRUFBRSxFQUNYLFFBQVEsdUJBQXVCLEVBQy9CLFFBQVEsd0ZBQXdGLEVBQ2hHLFlBQVksQ0FBQyxNQUFNO0FBdEQ1QixVQUFBQztBQXVEVSxRQUFFLFVBQVUsV0FBVyxpQ0FBMEI7QUFDakQsUUFBRSxVQUFVLFVBQVUsa0JBQVc7QUFDakMsUUFBRSxVQUFTQSxNQUFBLEVBQUUsT0FBTyxtQkFBVCxPQUFBQSxNQUEyQixTQUFTO0FBQy9DLFFBQUUsU0FBUyxDQUFDLE1BQU07QUFDaEIsY0FBTSxZQUFZO0FBQ2hCLFlBQUUsT0FBTyxpQkFBaUI7QUFDMUIsZ0JBQU0sSUFBSSxPQUFPLGFBQWE7QUFBQSxRQUNoQyxHQUFHO0FBQUEsTUFDTCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUgsUUFBSSwwQkFBUSxFQUFFLEVBQ1gsUUFBUSx1QkFBdUIsRUFDL0IsUUFBUSx5REFBeUQsRUFDakUsVUFBVSxDQUFDLFdBQVc7QUFDckIsYUFBTyxTQUFTLEVBQUUsT0FBTyxjQUFjO0FBQ3ZDLGFBQU8sU0FBUyxDQUFDLFVBQVU7QUFDekIsY0FBTSxZQUFZO0FBQ2hCLFlBQUUsT0FBTyxpQkFBaUI7QUFDMUIsZ0JBQU0sSUFBSSxPQUFPLGFBQWE7QUFBQSxRQUNoQyxHQUFHO0FBQUEsTUFDTCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUgsUUFBSSwwQkFBUSxFQUFFLEVBQ1gsUUFBUSxVQUFVLEVBQ2xCLFFBQVEsOENBQThDLEVBQ3RELFlBQVksQ0FBQyxhQUFhO0FBQ3pCLGVBQVMsVUFBVSxLQUFLLEtBQUs7QUFDN0IsZUFBUyxVQUFVLE1BQU0sa0JBQWtCO0FBQzNDLGVBQVMsVUFBVSxNQUFNLGtCQUFrQjtBQUMzQyxlQUFTLFVBQVUsTUFBTSxZQUFZO0FBQ3JDLGVBQVMsVUFBVSxPQUFPLGVBQWU7QUFDekMsZUFBUyxVQUFVLFFBQVEsT0FBTztBQUNsQyxlQUFTLFNBQVMsT0FBTyxFQUFFLE9BQU8sZUFBZSxDQUFDO0FBQ2xELGVBQVMsU0FBUyxDQUFDLFVBQVU7QUFDM0IsY0FBTSxZQUFZO0FBQ2hCLFlBQUUsT0FBTyxrQkFBa0IsT0FBTyxLQUFLO0FBQ3ZDLGdCQUFNLElBQUksT0FBTyxhQUFhO0FBQUEsUUFDaEMsR0FBRztBQUFBLE1BQ0wsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVILFVBQU0sZUFBZSxFQUFFLE9BQU8sa0JBQzFCLG9CQUFvQixFQUFFLE9BQU8sZUFBZSxLQUM1QyxFQUFFLE9BQU8sZUFDUCxnQkFBZ0IsSUFBSSxLQUFLLEVBQUUsT0FBTyxZQUFZLEVBQUUsZUFBZSxDQUFDLEtBQ2hFO0FBRU4sUUFBSSwwQkFBUSxFQUFFLEVBQ1gsUUFBUSxlQUFlLEVBQ3ZCLFFBQVEsWUFBWSxFQUNwQixVQUFVLENBQUMsV0FBVztBQUNyQixhQUFPLGNBQWMsYUFBYSxFQUFFLE9BQU87QUFDM0MsYUFBTyxRQUFRLE1BQU07QUFDbkIsY0FBTSxZQUFZO0FBQ2hCLGlCQUFPLFlBQVksSUFBSSxFQUFFLGNBQWMsa0JBQWE7QUFDcEQsZ0JBQU0sSUFBSSxPQUFPLFNBQVMsS0FBSztBQUMvQixjQUFJLE9BQU87QUFBQSxRQUNiLEdBQUc7QUFBQSxNQUNMLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNMO0FBQ0o7OztBQ3RIQSxJQUFBQyxvQkFBd0I7OztBQ0F4QixJQUFBQyxvQkFBNEM7QUFNckMsSUFBTSxlQUFOLGNBQTJCLHdCQUFNO0FBQUEsRUFDdEMsWUFBWSxLQUFrQixRQUFpQyxRQUFvQjtBQUNqRixVQUFNLEdBQUc7QUFEbUI7QUFBaUM7QUFBQSxFQUUvRDtBQUFBLEVBRUEsU0FBZTtBQUNiLFNBQUssUUFBUSxRQUFRLFlBQVk7QUFDakMsUUFBSSxPQUFPO0FBQ1gsUUFBSSxRQUE4QjtBQUNsQyxRQUFJLFFBQWtCLENBQUM7QUFDdkIsUUFBSSxhQUFhO0FBQ2pCLFFBQUksZUFBZTtBQUNuQixRQUFJLGtCQUFrQjtBQUV0QixRQUFJLDBCQUFRLEtBQUssU0FBUyxFQUN2QixRQUFRLFdBQVcsRUFDbkIsUUFBUSx5REFBeUQsRUFDakUsUUFBUSxPQUFLO0FBQ1osUUFBRSxlQUFlLFNBQVM7QUFDMUIsUUFBRSxTQUFTLE9BQUs7QUFBRSxlQUFPO0FBQUEsTUFBRyxDQUFDO0FBQUEsSUFDL0IsQ0FBQztBQUVILFFBQUksa0JBQWtEO0FBQ3RELFVBQU0sY0FBYyxDQUFDLENBQUMsS0FBSyxPQUFPLFNBQVM7QUFFM0MsUUFBSSwwQkFBUSxLQUFLLFNBQVMsRUFDdkIsUUFBUSxrQkFBa0IsRUFDMUIsUUFBUSwwQkFBMEIsRUFDbEMsWUFBWSxPQUFLO0FBQ2hCLFFBQUUsVUFBVSxnQkFBZ0IsY0FBYztBQUMxQyxVQUFJLGFBQWE7QUFDZixVQUFFLFVBQVUsY0FBYyxrQkFBa0I7QUFBQSxNQUM5QztBQUNBLFFBQUUsU0FBUyxlQUFlO0FBQzFCLFFBQUUsU0FBUyxPQUFLO0FBQ2QsMEJBQWtCO0FBQUEsTUFDcEIsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVILFFBQUksMEJBQVEsS0FBSyxTQUFTLEVBQ3ZCLFFBQVEsZUFBZSxFQUN2QixRQUFRLHdFQUF3RSxFQUNoRixZQUFZLE9BQUs7QUFDaEIsUUFBRSxVQUFVLFNBQVMsWUFBWTtBQUNqQyxRQUFFLFVBQVUsWUFBWSx3QkFBd0I7QUFDaEQsUUFBRSxTQUFTLE9BQU87QUFDbEIsUUFBRSxTQUFTLE9BQUs7QUFDZCxnQkFBUTtBQUNSLHlCQUFpQjtBQUFBLE1BQ25CLENBQUM7QUFBQSxJQUNILENBQUM7QUFFSCxVQUFNLGlCQUFpQixLQUFLLFVBQVUsVUFBVSwyQkFBMkI7QUFFM0UsVUFBTSxjQUFjLE1BQU07QUFDeEIscUJBQWUsTUFBTTtBQUNyQixVQUFJLFVBQVUsU0FBUztBQUNyQix1QkFBZSxhQUFhLEVBQUUsU0FBUyxPQUFPLENBQUM7QUFDL0M7QUFBQSxNQUNGO0FBQ0EscUJBQWUsYUFBYSxFQUFFLFNBQVMsUUFBUSxDQUFDO0FBRWhELFVBQUksTUFBTSxXQUFXLEdBQUc7QUFDdEIsdUJBQWUsU0FBUyxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsS0FBSyxrQkFBa0IsQ0FBQztBQUFBLE1BQ2hHLE9BQU87QUFDTCxjQUFNLE9BQU8sZUFBZSxTQUFTLE1BQU0sRUFBRSxLQUFLLHNCQUFzQixDQUFDO0FBQ3pFLGlCQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0FBQ3JDLGdCQUFNLEtBQUssS0FBSyxTQUFTLElBQUk7QUFDN0IsYUFBRyxhQUFhLEVBQUUsU0FBUyxRQUFRLGdCQUFnQixpQkFBaUIsWUFBWSxVQUFVLGNBQWMsTUFBTSxDQUFDO0FBQy9HLGFBQUcsV0FBVyxFQUFFLE1BQU0sTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNoQyxnQkFBTSxZQUFZLEdBQUcsU0FBUyxVQUFVLEVBQUUsTUFBTSxTQUFJLENBQUM7QUFDckQsb0JBQVUsaUJBQWlCLFNBQVMsTUFBTTtBQUN4QyxrQkFBTSxPQUFPLEdBQUcsQ0FBQztBQUNqQix3QkFBWTtBQUFBLFVBQ2QsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBRUEsWUFBTSxTQUFTLGVBQWUsVUFBVSx3QkFBd0I7QUFDaEUsYUFBTyxhQUFhLEVBQUUsV0FBVyxNQUFNLENBQUM7QUFFeEMsWUFBTSxTQUFTLE9BQU8sU0FBUyxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRSxhQUFPLGFBQWEsRUFBRSxPQUFPLE9BQU8sQ0FBQztBQUNyQyxhQUFPLGlCQUFpQixTQUFTLE1BQU07QUFDckMsWUFBSSxpQkFBaUIsS0FBSyxLQUFLLENBQUMsaUJBQWlCO0FBQy9DLGNBQUksYUFBYSxLQUFLLEtBQUssQ0FBQyxNQUFNLFNBQVMsYUFBYSxLQUFLLENBQUMsR0FBRztBQUMvRCxrQkFBTSxLQUFLLGFBQWEsS0FBSyxDQUFDO0FBQzlCLHdCQUFZO0FBQUEsVUFDZDtBQUFBLFFBQ0YsQ0FBQyxFQUFFLEtBQUs7QUFBQSxNQUNWLENBQUM7QUFBQSxJQUNIO0FBRUEsVUFBTSxtQkFBbUIsTUFBTTtBQUM3QixrQkFBWTtBQUFBLElBQ2Q7QUFFQSxRQUFJLDBCQUFRLEtBQUssU0FBUyxFQUN2QixRQUFRLGFBQWEsRUFDckIsUUFBUSxrREFBa0QsRUFDMUQsUUFBUSxPQUFLO0FBQ1osUUFBRSxlQUFlLFdBQVc7QUFDNUIsUUFBRSxTQUFTLE9BQUs7QUFBRSxxQkFBYSxFQUFFLEtBQUs7QUFBQSxNQUFHLENBQUM7QUFBQSxJQUM1QyxDQUFDO0FBRUgsUUFBSSwwQkFBUSxLQUFLLFNBQVMsRUFDdkIsUUFBUSxlQUFlLEVBQ3ZCLFFBQVEsK0RBQStELEVBQ3ZFLFFBQVEsT0FBSztBQUNaLFFBQUUsZUFBZSxtQkFBbUI7QUFDcEMsUUFBRSxTQUFTLE9BQUs7QUFBRSx1QkFBZSxFQUFFLEtBQUs7QUFBQSxNQUFHLENBQUM7QUFBQSxJQUM5QyxDQUFDO0FBRUgsUUFBSSwwQkFBUSxLQUFLLFNBQVMsRUFDdkIsUUFBUSxrQkFBa0IsRUFDMUIsUUFBUSxzQ0FBc0MsRUFDOUMsUUFBUSxPQUFLO0FBQ1osUUFBRSxlQUFlLDBCQUFxQjtBQUN0QyxRQUFFLFNBQVMsT0FBSztBQUFFLDBCQUFrQixFQUFFLEtBQUs7QUFBQSxNQUFHLENBQUM7QUFBQSxJQUNqRCxDQUFDO0FBRUgscUJBQWlCO0FBRWpCLFVBQU0sVUFBVSxLQUFLLFVBQVUsU0FBUyxLQUFLLEVBQUUsS0FBSywyQkFBMkIsQ0FBQztBQUNoRixZQUFRLGFBQWEsRUFBRSxPQUFPLG9CQUFvQixDQUFDO0FBQ25ELFlBQVEsS0FBSztBQUViLFFBQUksMEJBQVEsS0FBSyxTQUFTLEVBQ3ZCLFVBQVUsT0FBSyxFQUFFLGNBQWMsUUFBUSxFQUFFLFFBQVEsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQ3BFLFVBQVUsT0FBSztBQUNkLFFBQUUsY0FBYyxhQUFhLEVBQUUsT0FBTztBQUN0QyxRQUFFLFFBQVEsTUFBTTtBQUFFLGNBQU0sWUFBWTtBQUNsQyxjQUFJLENBQUMsUUFBUSxJQUFJLEdBQUc7QUFDbEIsb0JBQVEsUUFBUSwyQkFBMkI7QUFDM0Msb0JBQVEsS0FBSztBQUNiO0FBQUEsVUFDRjtBQUNBLGtCQUFRLEtBQUs7QUFDYixZQUFFLFlBQVksSUFBSSxFQUFFLGNBQWMsZ0JBQVc7QUFDN0MsY0FBSTtBQUNGLGtCQUFNLE9BQU8sTUFBTSxjQUFjLEtBQUssUUFBUSxNQUFNO0FBQUEsY0FDbEQsY0FBYztBQUFBLGNBQ2QsY0FBYztBQUFBLGNBQ2Q7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0YsR0FBRyxlQUFlO0FBQ2xCLGlCQUFLLE9BQU8sU0FBUyxNQUFNLEtBQUssSUFBSTtBQUNwQyxpQkFBSyxPQUFPLFNBQVMsZUFBZSxLQUFLO0FBQ3pDLGtCQUFNLEtBQUssT0FBTyxhQUFhO0FBQy9CLGlCQUFLLE1BQU07QUFDWCxnQkFBSSx5QkFBTyxjQUFTLEtBQUssSUFBSSxpQkFBWTtBQUN6QyxpQkFBSyxPQUFPO0FBQUEsVUFDZCxTQUFTLEtBQWM7QUFDckIsb0JBQVEsUUFBUyxJQUFjLE9BQU87QUFDdEMsb0JBQVEsS0FBSztBQUNiLGNBQUUsWUFBWSxLQUFLLEVBQUUsY0FBYyxhQUFhO0FBQUEsVUFDbEQ7QUFBQSxRQUNGLEdBQUc7QUFBQSxNQUFHLENBQUM7QUFBQSxJQUNULENBQUM7QUFBQSxFQUNMO0FBQUEsRUFFQSxVQUFnQjtBQUNkLFNBQUssVUFBVSxNQUFNO0FBQUEsRUFDdkI7QUFDRjs7O0FDM0tBLElBQUFDLG9CQUE0QztBQU9yQyxJQUFNLGtCQUFOLGNBQThCLHdCQUFNO0FBQUEsRUFHekMsWUFDRSxLQUNRLFFBQ0EsTUFDQSxRQUNSO0FBQ0EsVUFBTSxHQUFHO0FBSkQ7QUFDQTtBQUNBO0FBTlYsU0FBUSxXQUFXO0FBQUEsRUFTbkI7QUFBQSxFQUVBLFNBQWU7QUFDYixTQUFLLFFBQVEsUUFBUSxtQkFBbUI7QUFDeEMsVUFBTSxXQUFXLEtBQUssS0FBSyxRQUFRLEtBQUssS0FBSyxjQUFjO0FBRTNELFNBQUssVUFBVSxTQUFTLEtBQUs7QUFBQSxNQUMzQixNQUFNLElBQUksUUFBUTtBQUFBLElBQ3BCLENBQUM7QUFHRCxVQUFNLGFBQWEsS0FBSyxVQUFVLFVBQVU7QUFDNUMsZUFBVyxhQUFhO0FBQUEsTUFDdEIsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFDRCxlQUFXLFNBQVMsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsVUFBTSxZQUFZLFdBQVcsU0FBUyxJQUFJO0FBQzFDLGNBQVUsYUFBYSxFQUFFLFFBQVEsYUFBYSxhQUFhLFFBQVEsQ0FBQztBQUNwRSxVQUFNLFNBQVMsVUFBVSxTQUFTLElBQUk7QUFDdEMsV0FBTyxRQUFRLDZEQUF3RDtBQUN2RSxRQUFJLEtBQUssS0FBSyxvQkFBb0IsY0FBYztBQUM5QyxZQUFNLFNBQVMsVUFBVSxTQUFTLElBQUk7QUFDdEMsYUFBTyxRQUFRLG1EQUE4QztBQUFBLElBQy9ELE9BQU87QUFDTCxnQkFBVSxTQUFTLElBQUksRUFBRSxRQUFRLDZGQUE4RTtBQUMvRyxZQUFNLGFBQWEsVUFBVSxTQUFTLElBQUk7QUFDMUMsaUJBQVcsYUFBYSxFQUFFLGVBQWUsUUFBUSxhQUFhLE9BQU8sT0FBTyxxQkFBcUIsVUFBVSx5QkFBeUIsQ0FBQztBQUNySSxpQkFBVyxRQUFRLGdGQUF1RDtBQUFBLElBQzVFO0FBRUEsVUFBTSxhQUFhLEtBQUssVUFBVSxTQUFTLEtBQUssRUFBRSxLQUFLLDJCQUEyQixDQUFDO0FBQ25GLGVBQVcsS0FBSztBQUVoQixVQUFNLFVBQVUsS0FBSyxVQUFVLFNBQVMsS0FBSyxFQUFFLEtBQUssMkJBQTJCLENBQUM7QUFDaEYsWUFBUSxhQUFhLEVBQUUsT0FBTyxvQkFBb0IsQ0FBQztBQUNuRCxZQUFRLEtBQUs7QUFFYixRQUFJLDBCQUFRLEtBQUssU0FBUyxFQUN2QixVQUFVLENBQUMsTUFBTSxFQUFFLGNBQWMsUUFBUSxFQUFFLFFBQVEsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQ3RFLFVBQVUsQ0FBQyxNQUFNO0FBQ2hCLFFBQUUsY0FBYyxRQUFRO0FBQ3hCLFFBQUUsU0FBUyxTQUFTLGFBQWE7QUFDakMsUUFBRSxRQUFRLE1BQU07QUFDZCxjQUFNLFlBQVk7QUFqRTVCO0FBa0VZLGNBQUksS0FBSztBQUFVO0FBQ25CLGVBQUssV0FBVztBQUNoQixZQUFFLFlBQVksSUFBSSxFQUFFLGNBQWMsZ0JBQVc7QUFDN0Msa0JBQVEsS0FBSztBQUNiLHFCQUFXLEtBQUs7QUFFaEIsZ0JBQU0sSUFBSSxLQUFLLE9BQU87QUFDdEIsZ0JBQU0sS0FBSyxJQUFJO0FBQUEsWUFDYixFQUFFO0FBQUEsWUFDRixFQUFFO0FBQUEsWUFDRixFQUFFO0FBQUEsWUFDRixLQUFLLEtBQUssZ0JBQWdCO0FBQUEsVUFDNUI7QUFHQSxjQUFJLEtBQUssS0FBSyxvQkFBb0IsZ0JBQWdCLEVBQUUsaUJBQWlCO0FBQ25FLGdCQUFJO0FBQ0YseUJBQVcsUUFBUSx5Q0FBb0M7QUFDdkQsb0JBQU0sS0FBSyxJQUFJLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUI7QUFDbkUsb0JBQU0sR0FBRyxjQUFjLEtBQUssS0FBSyxpQkFBaUI7QUFBQSxZQUNwRCxTQUFTLEdBQUc7QUFDVixzQkFBUSxLQUFLLG1EQUFtRCxDQUFDO0FBQUEsWUFDbkU7QUFBQSxVQUNGO0FBR0EsY0FBSTtBQUNGLHVCQUFXLFFBQVEsNENBQXVDO0FBQzFELGtCQUFNLEdBQUcsaUJBQWlCLEtBQUssS0FBSyxJQUFJLEtBQUssS0FBSyxnQkFBZ0IsTUFBTTtBQUFBLFVBQzFFLFNBQVMsR0FBRztBQUNWLG9CQUFRLEtBQUssbURBQW1ELENBQUM7QUFBQSxVQUNuRTtBQUdBLGNBQUk7QUFDRix1QkFBVyxRQUFRLCtCQUEwQjtBQUM3QyxrQkFBTSxjQUFjLE9BQU8sS0FBSyxLQUFLLEtBQUssS0FBSyxFQUFFO0FBQUEsVUFDbkQsU0FBUyxHQUFHO0FBQ1Ysb0JBQVEsS0FBSywrQ0FBK0MsQ0FBQztBQUFBLFVBQy9EO0FBR0EsY0FBSTtBQUNGLGtCQUFNLEtBQUssS0FBSyxPQUFPO0FBQ3ZCLGVBQUcsUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLEtBQUssS0FBSyxFQUFFO0FBQ3ZELGdCQUFJLEdBQUcsaUJBQWlCLEtBQUssS0FBSyxJQUFJO0FBQ3BDLGlCQUFHLGdCQUFlLGNBQUcsTUFBTSxDQUFDLE1BQVYsbUJBQWEsT0FBYixZQUFtQjtBQUFBLFlBQ3ZDO0FBQ0Esa0JBQU0sS0FBSyxPQUFPLGFBQWE7QUFDL0IsaUJBQUssTUFBTTtBQUNYLGdCQUFJLHlCQUFPLFNBQVMsUUFBUSxZQUFZO0FBQ3hDLGlCQUFLLE9BQU87QUFBQSxVQUNkLFNBQVMsS0FBYztBQUNyQixvQkFBUSxRQUFTLElBQWMsT0FBTztBQUN0QyxvQkFBUSxLQUFLO0FBQ2IsdUJBQVcsS0FBSztBQUNoQixjQUFFLFlBQVksS0FBSyxFQUFFLGNBQWMsUUFBUTtBQUMzQyxpQkFBSyxXQUFXO0FBQUEsVUFDbEI7QUFBQSxRQUNGLEdBQUc7QUFBQSxNQUNMLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNMO0FBQUEsRUFFQSxVQUFnQjtBQUNkLFNBQUssVUFBVSxNQUFNO0FBQUEsRUFDdkI7QUFDRjs7O0FDcklBLElBQUFDLG9CQUFvQztBQUc3QixJQUFNLGlCQUFOLGNBQTZCLHdCQUFNO0FBQUEsRUFDeEMsWUFBWSxLQUFrQixRQUFpQyxRQUFvQjtBQUNqRixVQUFNLEdBQUc7QUFEbUI7QUFBaUM7QUFBQSxFQUUvRDtBQUFBLEVBRUEsU0FBZTtBQUNiLFNBQUssUUFBUSxRQUFRLHNCQUFzQjtBQUMzQyxTQUFLLFVBQVUsU0FBUyxLQUFLO0FBQUEsTUFDM0IsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUNELFFBQUksMEJBQVEsS0FBSyxTQUFTLEVBQ3ZCLFVBQVUsT0FBSyxFQUFFLGNBQWMsUUFBUSxFQUFFLFFBQVEsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQ3BFLFVBQVUsT0FBSztBQUNkLFFBQUUsY0FBYyxXQUFXO0FBQzNCLFFBQUUsU0FBUyxTQUFTLGFBQWE7QUFDakMsUUFBRSxRQUFRLE1BQU07QUFDZCxjQUFNLFlBQVk7QUFDaEIsZUFBSyxNQUFNO0FBQ1gsZ0JBQU0sS0FBSyxPQUFPLFlBQVk7QUFDOUIsZUFBSyxPQUFPO0FBQUEsUUFDZCxHQUFHO0FBQUEsTUFDTCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBRUEsVUFBZ0I7QUFDZCxTQUFLLFVBQVUsTUFBTTtBQUFBLEVBQ3ZCO0FBQ0Y7QUFPTyxJQUFNLDRCQUFOLGNBQXdDLHdCQUFNO0FBQUEsRUFDbkQsWUFBWSxLQUFrQixrQkFBMEI7QUFDdEQsVUFBTSxHQUFHO0FBRG1CO0FBQUEsRUFFOUI7QUFBQSxFQUVBLFNBQWU7QUFDYixTQUFLLFFBQVEsUUFBUSwrQkFBK0I7QUFDcEQsU0FBSyxVQUFVLFNBQVMsS0FBSztBQUFBLE1BQzNCLE1BQU07QUFBQSxJQUNSLENBQUM7QUFDRCxVQUFNLFFBQVEsS0FBSyxVQUFVLFNBQVMsSUFBSTtBQUMxQyxVQUFNLGFBQWEsRUFBRSxhQUFhLFFBQVEsQ0FBQztBQUMzQyxVQUFNLFNBQVMsTUFBTSxFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFDL0YsVUFBTSxTQUFTLE1BQU0sRUFBRSxNQUFNLHNHQUF3RSxDQUFDO0FBQ3RHLFVBQU0sU0FBUyxNQUFNLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUN2RixRQUFJLDBCQUFRLEtBQUssU0FBUyxFQUN2QixVQUFVLE9BQUssRUFBRSxjQUFjLFFBQVEsRUFBRSxRQUFRLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUNwRSxVQUFVLE9BQUs7QUFDZCxRQUFFLGNBQWMsbUNBQThCLEVBQUUsT0FBTztBQUN2RCxRQUFFLFFBQVEsTUFBTTtBQUFFLGVBQU8sS0FBSyxLQUFLLGtCQUFrQixRQUFRO0FBQUcsYUFBSyxNQUFNO0FBQUEsTUFBRyxDQUFDO0FBQUEsSUFDakYsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUVBLFVBQWdCO0FBQ2QsU0FBSyxVQUFVLE1BQU07QUFBQSxFQUN2QjtBQUNGOzs7QUNoRUEsSUFBQUMsb0JBQW9DO0FBRXBDO0FBRU8sSUFBTSxhQUFOLGNBQXlCLHdCQUFNO0FBQUEsRUFDcEMsWUFBWSxLQUFrQixRQUFpQyxRQUFvQjtBQUNqRixVQUFNLEdBQUc7QUFEbUI7QUFBaUM7QUFBQSxFQUUvRDtBQUFBLEVBRUEsU0FBZTtBQUNiLFNBQUssUUFBUSxRQUFRLGtCQUFrQjtBQUN2QyxTQUFLLFVBQVUsU0FBUyxLQUFLO0FBQUEsTUFDM0IsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUNELFFBQUksMEJBQVEsS0FBSyxTQUFTLEVBQ3ZCLFVBQVUsT0FBSyxFQUFFLGNBQWMsUUFBUSxFQUFFLFFBQVEsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQ3BFLFVBQVUsT0FBSztBQUNkLFFBQUUsY0FBYyxPQUFPO0FBQ3ZCLFFBQUUsU0FBUyxTQUFTLGFBQWE7QUFDakMsUUFBRSxRQUFRLE1BQU07QUFDZCxjQUFNLFlBQVk7QUFDaEIsZUFBSyxNQUFNO0FBQ1gsaUJBQU8sT0FBTyxLQUFLLE9BQU8sVUFBVTtBQUFBLFlBQ2xDLEdBQUc7QUFBQSxZQUNILE9BQU8sQ0FBQztBQUFBLFlBQ1IsUUFBUSxFQUFFLEdBQUcsaUJBQWlCLE9BQU87QUFBQSxVQUN2QyxDQUFDO0FBQ0QsZ0JBQU0sS0FBSyxPQUFPLGFBQWE7QUFDL0IsZUFBSyxPQUFPO0FBQUEsUUFDZCxHQUFHO0FBQUEsTUFDTCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBRUEsVUFBZ0I7QUFDZCxTQUFLLFVBQVUsTUFBTTtBQUFBLEVBQ3ZCO0FBQ0Y7OztBQ3JDQSxJQUFBQyxvQkFBb0M7OztBQ0FwQyxJQUFBQyxvQkFBNEM7QUFHNUM7QUFFTyxJQUFNLGtCQUFOLGNBQThCLHdCQUFNO0FBQUEsRUFDekMsWUFDRSxLQUNRLFFBQ0EsTUFDQSxRQUNSO0FBQ0EsVUFBTSxHQUFHO0FBSkQ7QUFDQTtBQUNBO0FBQUEsRUFHVjtBQUFBLEVBRUEsU0FBZTtBQUNiLFNBQUssUUFBUSxRQUFRLG1CQUFtQjtBQUN4QyxRQUFJLFVBQVU7QUFFZCxRQUFJLDBCQUFRLEtBQUssU0FBUyxFQUN2QixRQUFRLHFCQUFxQixFQUM3QixRQUFRLHVDQUF1QyxFQUMvQyxRQUFRLE9BQUs7QUFDWixRQUFFLFNBQVMsS0FBSyxLQUFLLGNBQWMsS0FBSyxPQUFPLFNBQVMsZ0JBQWdCO0FBQ3hFLFFBQUUsU0FBUyxPQUFLO0FBQUUsa0JBQVUsRUFBRSxLQUFLO0FBQUEsTUFBRyxDQUFDO0FBQUEsSUFDekMsQ0FBQztBQUVILFFBQUksMEJBQVEsS0FBSyxTQUFTLEVBQ3ZCLFFBQVEsdUJBQXVCLEVBQy9CLFFBQVEscUZBQXFGLEVBQzdGLFVBQVUsT0FBSyxFQUFFLGNBQWMsU0FBUyxFQUFFLFFBQVEsTUFBTTtBQUN2RCxVQUFJLENBQUM7QUFBUztBQUNkLFdBQUssS0FBSyxhQUFhO0FBQ3ZCLFdBQUssS0FBSyxPQUFPLGFBQWEsRUFBRSxLQUFLLE1BQU07QUFDekMsWUFBSSx5QkFBTyx3REFBd0Q7QUFDbkUsYUFBSyxNQUFNO0FBQ1gsYUFBSyxPQUFPO0FBQUEsTUFDZCxDQUFDO0FBQUEsSUFDSCxDQUFDLENBQUMsRUFDRCxVQUFVLE9BQUssRUFBRSxjQUFjLFlBQVksRUFBRSxPQUFPLEVBQUUsUUFBUSxNQUFNO0FBQ25FLFVBQUksQ0FBQztBQUFTO0FBQ2QsWUFBTSxVQUFVLGtCQUFrQjtBQUFBLFFBQ2hDLEdBQUcsS0FBSztBQUFBLFFBQ1IsTUFBTSxHQUFHLEtBQUssS0FBSyxJQUFJO0FBQUEsUUFDdkIsWUFBWTtBQUFBLFFBQ1osbUJBQW1CO0FBQUEsUUFDbkIsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsZUFBZTtBQUFBLFFBQ2YsZUFBZTtBQUFBLE1BQ2pCLENBQUM7QUFDRCxXQUFLLE9BQU8sU0FBUyxNQUFNLEtBQUssT0FBTztBQUN2QyxXQUFLLEtBQUssT0FBTyxhQUFhLEVBQUUsS0FBSyxNQUFNO0FBQ3pDLFlBQUkseUJBQU8sMkJBQTJCO0FBQ3RDLGFBQUssTUFBTTtBQUNYLGFBQUssT0FBTztBQUFBLE1BQ2QsQ0FBQztBQUFBLElBQ0gsQ0FBQyxDQUFDO0FBQUEsRUFDTjtBQUFBLEVBRUEsVUFBZ0I7QUFDZCxTQUFLLFVBQVUsTUFBTTtBQUFBLEVBQ3ZCO0FBQ0Y7OztBRHhETyxJQUFNLGdCQUFOLGNBQTRCLHdCQUFNO0FBQUEsRUFDdkMsWUFDRSxLQUNRLFFBQ0EsTUFDQSxRQUNSO0FBQ0EsVUFBTSxHQUFHO0FBSkQ7QUFDQTtBQUNBO0FBQUEsRUFHVjtBQUFBLEVBRUEsU0FBZTtBQUNiLFVBQU0sSUFBSSxLQUFLO0FBQ2YsU0FBSyxRQUFRLFFBQVEsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixNQUFNLEVBQUU7QUFDOUUsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUFBLEVBRVEsU0FBZTtBQUNyQixTQUFLLFVBQVUsTUFBTTtBQUNyQixVQUFNLElBQUksS0FBSztBQUVmLFFBQUksMEJBQVEsS0FBSyxTQUFTLEVBQUUsUUFBUSxrQkFBa0IsRUFBRSxXQUFXO0FBRW5FLFFBQUksMEJBQVEsS0FBSyxTQUFTLEVBQ3ZCLFFBQVEsbUJBQW1CLEVBQzNCLFFBQVEscUNBQXFDLEVBQzdDLFFBQVEsT0FBSztBQUNaLFFBQUUsU0FBUyxFQUFFLGNBQWMsS0FBSyxPQUFPLFNBQVMsZ0JBQWdCO0FBQ2hFLFFBQUUsWUFBWSxJQUFJO0FBQUEsSUFDcEIsQ0FBQyxFQUNBLFVBQVUsT0FBSyxFQUFFLGNBQWMsYUFBYSxFQUFFLFFBQVEsTUFBTTtBQUMzRCxVQUFJLGdCQUFnQixLQUFLLEtBQUssS0FBSyxRQUFRLEdBQUcsTUFBTSxLQUFLLE9BQU8sQ0FBQyxFQUFFLEtBQUs7QUFBQSxJQUMxRSxDQUFDLENBQUM7QUFFSixRQUFJO0FBRUosUUFBSSwwQkFBUSxLQUFLLFNBQVMsRUFDdkIsUUFBUSxlQUFlLEVBQ3ZCLFFBQVEsd0VBQXdFLEVBQ2hGLFlBQVksT0FBSztBQUNoQixRQUFFLFVBQVUsU0FBUyxZQUFZO0FBQ2pDLFFBQUUsVUFBVSxZQUFZLHdCQUF3QjtBQUNoRCxRQUFFLFNBQVMsRUFBRSxnQkFBZ0IsT0FBTztBQUNwQyxRQUFFLFNBQVMsQ0FBQyxNQUFNO0FBQUUsY0FBTSxZQUFZO0FBQ3BDLFlBQUUsZUFBZTtBQUNqQixnQkFBTSxLQUFLLE9BQU8sYUFBYTtBQUMvQiwyQkFBaUI7QUFBQSxRQUNuQixHQUFHO0FBQUEsTUFBRyxDQUFDO0FBQUEsSUFDVCxDQUFDO0FBRUgsVUFBTSxpQkFBaUIsS0FBSyxVQUFVLFVBQVUsMkJBQTJCO0FBRTNFLFVBQU0sY0FBYyxNQUFNO0FBQ3hCLHFCQUFlLE1BQU07QUFDckIsV0FBSyxFQUFFLGdCQUFnQixhQUFhLFNBQVM7QUFDM0MsdUJBQWUsYUFBYSxFQUFFLFNBQVMsT0FBTyxDQUFDO0FBQy9DO0FBQUEsTUFDRjtBQUNBLHFCQUFlLGFBQWEsRUFBRSxTQUFTLFFBQVEsQ0FBQztBQUVoRCxZQUFNLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQztBQUNqQyxVQUFJLE1BQU0sV0FBVyxHQUFHO0FBQ3RCLHVCQUFlLFNBQVMsS0FBSyxFQUFFLE1BQU0saUNBQWlDLEtBQUssa0JBQWtCLENBQUM7QUFBQSxNQUNoRyxPQUFPO0FBQ0wsY0FBTSxPQUFPLGVBQWUsU0FBUyxNQUFNLEVBQUUsS0FBSyxzQkFBc0IsQ0FBQztBQUN6RSxpQkFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSztBQUNyQyxnQkFBTSxLQUFLLEtBQUssU0FBUyxJQUFJO0FBQzdCLGFBQUcsYUFBYSxFQUFFLFNBQVMsUUFBUSxnQkFBZ0IsaUJBQWlCLFlBQVksVUFBVSxjQUFjLE1BQU0sQ0FBQztBQUUvRyxhQUFHLFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDaEMsZ0JBQU0sWUFBWSxHQUFHLFNBQVMsVUFBVSxFQUFFLE1BQU0sU0FBSSxDQUFDO0FBQ3JELG9CQUFVLGlCQUFpQixTQUFTLE1BQU07QUFBRSxrQkFBTSxZQUFZO0FBN0V4RTtBQThFWSxzQkFBRSxpQkFBRixtQkFBZ0IsT0FBTyxHQUFHO0FBQzFCLG9CQUFNLEtBQUssT0FBTyxhQUFhO0FBQy9CLDBCQUFZO0FBQUEsWUFDZCxHQUFHO0FBQUEsVUFBRyxDQUFDO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFNBQVMsZUFBZSxVQUFVLHdCQUF3QjtBQUNoRSxhQUFPLGFBQWEsRUFBRSxXQUFXLE1BQU0sQ0FBQztBQUV4QyxZQUFNLFNBQVMsT0FBTyxTQUFTLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3BFLGFBQU8sYUFBYSxFQUFFLE9BQU8sT0FBTyxDQUFDO0FBQ3JDLGFBQU8saUJBQWlCLFNBQVMsTUFBTTtBQUNyQyxZQUFJLGlCQUFpQixLQUFLLEtBQUssQ0FBQyxpQkFBaUI7QUFBRSxnQkFBTSxZQUFZO0FBQ25FLGdCQUFJLGFBQWEsS0FBSyxHQUFHO0FBQ3ZCLGtCQUFJLENBQUMsRUFBRTtBQUFjLGtCQUFFLGVBQWUsQ0FBQztBQUN2QyxrQkFBSSxDQUFDLEVBQUUsYUFBYSxTQUFTLGFBQWEsS0FBSyxDQUFDLEdBQUc7QUFDakQsa0JBQUUsYUFBYSxLQUFLLGFBQWEsS0FBSyxDQUFDO0FBQ3ZDLHNCQUFNLEtBQUssT0FBTyxhQUFhO0FBQy9CLDRCQUFZO0FBQUEsY0FDZDtBQUFBLFlBQ0Y7QUFBQSxVQUNGLEdBQUc7QUFBQSxRQUFHLENBQUMsRUFBRSxLQUFLO0FBQUEsTUFDaEIsQ0FBQztBQUFBLElBQ0g7QUFFQSx1QkFBbUIsTUFBTTtBQUN2QixrQkFBWTtBQUFBLElBQ2Q7QUFDQSxxQkFBaUI7QUFHakIsUUFBSSwwQkFBUSxLQUFLLFNBQVMsRUFBRSxRQUFRLG9CQUFvQixFQUFFLFdBQVc7QUFFckUsUUFBSSwwQkFBUSxLQUFLLFNBQVMsRUFDdkIsUUFBUSxXQUFXLEVBQ25CLFFBQVEsOEJBQThCLEVBQ3RDLFFBQVEsT0FBSztBQUNaLFFBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTtBQUN2QixRQUFFLFNBQVMsQ0FBQyxNQUFNO0FBQUUsY0FBTSxZQUFZO0FBQ3BDLFlBQUUsT0FBTyxFQUFFLEtBQUs7QUFDaEIsZ0JBQU0sS0FBSyxPQUFPLGFBQWE7QUFBQSxRQUNqQyxHQUFHO0FBQUEsTUFBRyxDQUFDO0FBQUEsSUFDVCxDQUFDO0FBRUgsUUFBSSwwQkFBUSxLQUFLLFNBQVMsRUFDdkIsUUFBUSxhQUFhLEVBQ3JCLFFBQVEsK0NBQStDLEVBQ3ZELFFBQVEsT0FBSztBQUNaLFFBQUUsZUFBZSxXQUFXO0FBQzVCLFFBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRTtBQUM3QixRQUFFLFNBQVMsQ0FBQyxNQUFNO0FBQUUsY0FBTSxZQUFZO0FBQ3BDLFlBQUUsYUFBYSxFQUFFLEtBQUs7QUFDdEIsZ0JBQU0sS0FBSyxPQUFPLGFBQWE7QUFBQSxRQUNqQyxHQUFHO0FBQUEsTUFBRyxDQUFDO0FBQUEsSUFDVCxDQUFDO0FBRUgsUUFBSSwwQkFBUSxLQUFLLFNBQVMsRUFDdkIsUUFBUSxlQUFlLEVBQ3ZCLFFBQVEsd0RBQXdELEVBQ2hFLFFBQVEsT0FBSztBQUNaLFFBQUUsZUFBZSxtQkFBbUI7QUFDcEMsUUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUU7QUFDL0IsUUFBRSxTQUFTLENBQUMsTUFBTTtBQUFFLGNBQU0sWUFBWTtBQUNwQyxZQUFFLGVBQWUsRUFBRSxLQUFLO0FBQ3hCLGdCQUFNLEtBQUssT0FBTyxhQUFhO0FBQUEsUUFDakMsR0FBRztBQUFBLE1BQUcsQ0FBQztBQUFBLElBQ1QsQ0FBQztBQUVILFFBQUksMEJBQVEsS0FBSyxTQUFTLEVBQ3ZCLFFBQVEsa0JBQWtCLEVBQzFCLFFBQVEsMkJBQTJCLEVBQ25DLFFBQVEsT0FBSztBQUNaLFFBQUUsZUFBZSwwQkFBcUI7QUFDdEMsUUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUU7QUFDbEMsUUFBRSxTQUFTLENBQUMsTUFBTTtBQUFFLGNBQU0sWUFBWTtBQUNwQyxZQUFFLGtCQUFrQixFQUFFLEtBQUs7QUFDM0IsZ0JBQU0sS0FBSyxPQUFPLGFBQWE7QUFBQSxRQUNqQyxHQUFHO0FBQUEsTUFBRyxDQUFDO0FBQUEsSUFDVCxDQUFDO0FBRUgsUUFBSSwwQkFBUSxLQUFLLFNBQVMsRUFDdkIsUUFBUSxrQkFBa0IsRUFDMUIsUUFBUSxzRkFBc0YsRUFDOUYsWUFBWSxVQUFRO0FBQ25CLFdBQUssU0FBUyxFQUFFLGdCQUFnQixLQUFLLElBQUksQ0FBQztBQUMxQyxXQUFLLFFBQVEsT0FBTztBQUNwQixXQUFLLFNBQVMsQ0FBQyxNQUFNO0FBQUUsY0FBTSxZQUFZO0FBQ3ZDLFlBQUUsa0JBQWtCLEVBQUUsTUFBTSxJQUFJLEVBQUUsSUFBSSxPQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxPQUFPO0FBQ25FLGdCQUFNLEtBQUssT0FBTyxhQUFhO0FBQUEsUUFDakMsR0FBRztBQUFBLE1BQUcsQ0FBQztBQUFBLElBQ1QsQ0FBQztBQUVILFFBQUksMEJBQVEsS0FBSyxTQUFTLEVBQ3ZCLFFBQVEscUJBQXFCLEVBQzdCLFFBQVEsOENBQThDLEVBQ3RELFVBQVUsWUFBVTtBQUNuQixhQUFPLFNBQVMsRUFBRSxrQkFBa0I7QUFDcEMsYUFBTyxTQUFTLENBQUMsTUFBTTtBQUFFLGNBQU0sWUFBWTtBQUN6QyxZQUFFLHFCQUFxQjtBQUN2QixnQkFBTSxLQUFLLE9BQU8sYUFBYTtBQUFBLFFBQ2pDLEdBQUc7QUFBQSxNQUFHLENBQUM7QUFBQSxJQUNULENBQUM7QUFFSCxRQUFJLDBCQUFRLEtBQUssU0FBUyxFQUN2QixVQUFVLE9BQUssRUFBRSxjQUFjLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxNQUFNO0FBQzdELFdBQUssTUFBTTtBQUNYLFdBQUssT0FBTztBQUFBLElBQ2QsQ0FBQyxDQUFDO0FBQUEsRUFDTjtBQUFBLEVBRUEsVUFBZ0I7QUFDZCxTQUFLLFVBQVUsTUFBTTtBQUFBLEVBQ3ZCO0FBQ0Y7OztBTDVMTyxTQUFTLG1CQUFtQixLQUEyQixJQUF1QjtBQUNuRixRQUFNLElBQUksSUFBSSxPQUFPO0FBQ3JCLE1BQUksRUFBRSxlQUFlO0FBQ25CLFVBQU0sZUFBZSxJQUFJLDBCQUFRLEVBQUU7QUFDbkMsaUJBQWEsUUFBUSxPQUFPO0FBQzVCLGlCQUFhLFdBQVc7QUFFdEIsUUFBSSwwQkFBUSxFQUFFLEVBQ1gsUUFBUSxnQkFBZ0IsRUFDeEIsUUFBUSw2Q0FBNkMsRUFDckQsWUFBWSxDQUFDLE1BQU07QUFkNUI7QUFlVSxRQUFFLFVBQVUsUUFBUSxjQUFjO0FBQ2xDLFFBQUUsVUFBVSxTQUFTLGVBQWU7QUFDcEMsUUFBRSxVQUFVLE9BQU8sb0JBQW9CO0FBQ3ZDLFFBQUUsVUFBUyxPQUFFLHdCQUFGLFlBQXlCLE1BQU07QUFDMUMsUUFBRSxTQUFTLENBQUMsTUFBTTtBQUNoQixjQUFNLFlBQVk7QUFDaEIsWUFBRSxzQkFBc0I7QUFDeEIsZ0JBQU0sSUFBSSxPQUFPLGFBQWE7QUFBQSxRQUNoQyxHQUFHO0FBQUEsTUFDTCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUgsUUFBSSxFQUFFLE1BQU0sV0FBVyxHQUFHO0FBQ3hCLFNBQUcsU0FBUyxLQUFLO0FBQUEsUUFDZixLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsTUFDUixDQUFDO0FBQUEsSUFDSCxPQUFPO0FBQ0wsaUJBQVcsUUFBUSxFQUFFLE9BQU87QUFDMUIsY0FBTSxTQUFTLEtBQUs7QUFDcEIsY0FBTSxnQkFDSixLQUFLLG9CQUFvQixlQUNyQixxQkFDQTtBQUNOLGNBQU0sYUFBYSxLQUFLLGdCQUNwQixrQkFBa0IsSUFBSSxLQUFLLEtBQUssYUFBYSxFQUFFLGVBQWUsQ0FBQyxTQUFNLEtBQUssYUFBYSxXQUN2RjtBQUVKLGNBQU0sY0FBYyxJQUFJLDBCQUFRLEVBQUUsRUFDL0IsUUFBUSxLQUFLLFFBQVEsS0FBSyxxQkFBcUIsTUFBTSxFQUNyRCxRQUFRLEdBQUcsU0FBUyxtQkFBWSxnQkFBVyxTQUFNLGFBQWEsU0FBTSxVQUFVLEVBQUU7QUFFbkYsY0FBTSxjQUFjLENBQUMsQ0FBQyxJQUFJLE9BQU8sU0FBUztBQUMxQyxvQkFBWSxZQUFZLENBQUMsTUFBTTtBQUM3QixZQUFFLFVBQVUsZ0JBQWdCLGNBQWM7QUFDMUMsY0FBSSxhQUFhO0FBQ2YsY0FBRSxVQUFVLGNBQWMsa0JBQWtCO0FBQUEsVUFDOUM7QUFFQSxnQkFBTSxpQkFBaUIsS0FBSyxtQkFBbUI7QUFDL0MsWUFBRSxTQUFTLGNBQWMsaUJBQWlCLGNBQWM7QUFDeEQsWUFBRSxTQUFTLENBQUMsTUFBTTtBQUNoQixrQkFBTSxZQUFZO0FBQ2hCLG1CQUFLLGtCQUFrQjtBQUN2QixvQkFBTSxJQUFJLE9BQU8sYUFBYTtBQUM5QixrQkFBSSxPQUFPO0FBQUEsWUFDYixHQUFHO0FBQUEsVUFDTCxDQUFDO0FBQUEsUUFDSCxDQUFDO0FBRUQsWUFBSSxLQUFLLFNBQVM7QUFDaEIsc0JBQVk7QUFBQSxZQUFlLENBQUMsTUFDMUIsRUFDRyxRQUFRLGVBQWUsRUFDdkIsV0FBVyxXQUFXLEVBQ3RCLFFBQVEsTUFBTTtBQUNiLHFCQUFPLEtBQUssV0FBVyxLQUFLLE9BQU8sSUFBSSxRQUFRO0FBQUEsWUFDakQsQ0FBQztBQUFBLFVBQ0w7QUFBQSxRQUNGO0FBRUEsb0JBQVk7QUFBQSxVQUFVLENBQUMsTUFDckIsRUFBRSxjQUFjLE1BQU0sRUFBRSxRQUFRLE1BQU07QUFDcEMsZ0JBQUksY0FBYyxJQUFJLEtBQUssSUFBSSxRQUFRLE1BQU0sTUFBTSxJQUFJLE9BQU8sQ0FBQyxFQUFFLEtBQUs7QUFBQSxVQUN4RSxDQUFDO0FBQUEsUUFDSDtBQUVBLG9CQUFZLFVBQVUsQ0FBQyxNQUFNO0FBQzNCLFlBQUUsY0FBYyxRQUFRO0FBQ3hCLFlBQUUsU0FBUyxTQUFTLGFBQWE7QUFDakMsWUFBRSxRQUFRLE1BQU07QUFDZCxnQkFBSSxnQkFBZ0IsSUFBSSxLQUFLLElBQUksUUFBUSxNQUFNLE1BQU0sSUFBSSxPQUFPLENBQUMsRUFBRSxLQUFLO0FBQUEsVUFDMUUsQ0FBQztBQUFBLFFBQ0gsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBRUEsUUFBSSwwQkFBUSxFQUFFLEVBQUU7QUFBQSxNQUFVLENBQUMsTUFDekIsRUFDRyxjQUFjLFVBQVUsRUFDeEIsT0FBTyxFQUNQLFFBQVEsTUFBTTtBQUNiLFlBQUksYUFBYSxJQUFJLEtBQUssSUFBSSxRQUFRLE1BQU0sSUFBSSxPQUFPLENBQUMsRUFBRSxLQUFLO0FBQUEsTUFDakUsQ0FBQztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQ0o7OztBYjdGTyxJQUFNLHVCQUFOLGNBQW1DLG1DQUFpQjtBQUFBLEVBb0J6RCxZQUFZLEtBQVUsUUFBeUI7QUFDN0MsVUFBTSxLQUFLLE1BQU07QUFsQm5CLFNBQU8sOEJBQThCO0FBQ3JDLFNBQU8sdUJBQXVCO0FBVzlCO0FBQUEsU0FBTyxjQUFjO0FBQ3JCLFNBQU8sZUFBcUM7QUFDNUMsU0FBTyxlQUF5QixDQUFDO0FBQ2pDLFNBQU8sa0JBQXdFO0FBSTdFLFNBQUssU0FBUztBQUNkLFNBQUssYUFBYSxLQUFLLHFCQUFxQjtBQUFBLEVBQzlDO0FBQUEsRUFsQkEsd0JBQXdCO0FBQ3RCLFdBQU87QUFBQSxNQUNMLEVBQUUsSUFBSSxXQUFXLE1BQU0sV0FBVyxhQUFhLHNEQUFzRDtBQUFBLE1BQ3JHLEVBQUUsSUFBSSxVQUFVLE1BQU0sb0JBQW9CLGFBQWEsaURBQWlEO0FBQUEsTUFDeEcsRUFBRSxJQUFJLGVBQWUsTUFBTSxlQUFlLGFBQWEsa0RBQWtEO0FBQUEsSUFDM0c7QUFBQSxFQUNGO0FBQUEsRUFjTyx1QkFBa0M7QUFDdkMsVUFBTSxJQUFJLEtBQUssT0FBTztBQUN0QixRQUFJLEVBQUUsZUFBZSxFQUFFO0FBQWEsYUFBTztBQUMzQyxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRVMsVUFBZ0I7QUFDdkIsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUFBLEVBRU8sU0FBZTtBQUNwQixVQUFNLEVBQUUsWUFBWSxJQUFJO0FBQ3hCLGdCQUFZLE1BQU07QUFFbEIsVUFBTSxJQUFJLEtBQUssT0FBTztBQUV0QixRQUFJO0FBQ0YsVUFBSSxDQUFDLEVBQUUsZUFBZTtBQUNwQixZQUFJLENBQUMsS0FBSyxzQkFBc0I7QUFDOUIsZUFBSyxhQUFhLEtBQUsscUJBQXFCO0FBQzVDLGVBQUssdUJBQXVCO0FBQUEsUUFDOUI7QUFDQSxxQkFBYSxNQUFNLFdBQVc7QUFBQSxNQUNoQyxXQUFXLEtBQUssNkJBQTZCO0FBQzNDLGtDQUEwQixNQUFNLFdBQVc7QUFBQSxNQUM3QyxPQUFPO0FBQ0wsWUFBSTtBQUFFLG1DQUF5QixNQUFNLFdBQVc7QUFBQSxRQUFHLFNBQzVDLEdBQUc7QUFBRSxlQUFLLG1CQUFtQixhQUFhLGVBQWUsQ0FBQztBQUFBLFFBQUc7QUFDcEUsWUFBSTtBQUFFLDhCQUFvQixNQUFNLFdBQVc7QUFBQSxRQUFHLFNBQ3ZDLEdBQUc7QUFBRSxlQUFLLG1CQUFtQixhQUFhLFVBQVUsQ0FBQztBQUFBLFFBQUc7QUFDL0QsWUFBSTtBQUFFLDZCQUFtQixNQUFNLFdBQVc7QUFBQSxRQUFHLFNBQ3RDLEdBQUc7QUFBRSxlQUFLLG1CQUFtQixhQUFhLFNBQVMsQ0FBQztBQUFBLFFBQUc7QUFBQSxNQUNoRTtBQUFBLElBQ0YsU0FBUyxLQUFjO0FBQ3JCLFdBQUssbUJBQW1CLGFBQWEsWUFBWSxHQUFHO0FBQUEsSUFDdEQ7QUFHQSxTQUFLLGtCQUFrQixXQUFXO0FBQUEsRUFDcEM7QUFBQTtBQUFBLEVBR1EsbUJBQW1CLElBQWlCLFNBQWlCLEtBQW9CO0FBQy9FLFVBQU0sTUFBTSxlQUFlLFFBQVEsSUFBSSxVQUFVLE9BQU8sR0FBRztBQUMzRCxZQUFRLE1BQU0sY0FBYyxPQUFPLDBCQUEwQixHQUFHO0FBQ2hFLFVBQU0sSUFBSSxHQUFHLFNBQVMsS0FBSyxFQUFFLEtBQUssMkJBQTJCLENBQUM7QUFDOUQsTUFBRSxRQUFRLHFCQUFnQixPQUFPLE1BQU0sR0FBRyxFQUFFO0FBQzVDLE1BQUUsYUFBYSxFQUFFLE9BQU8scUJBQXFCLGNBQWMsTUFBTSxDQUFDO0FBQUEsRUFDcEU7QUFBQSxFQUVPLDRCQUFrQztBQUN2QyxTQUFLLDhCQUE4QjtBQUNuQyxTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsRUFFTyxnQkFBc0I7QUF6Ri9CO0FBMEZJLFVBQU0sVUFBVyxLQUFLLElBQTJDO0FBR2pFLDZDQUFTLFVBQVQ7QUFBQSxFQUNGO0FBQUEsRUFFUSxrQkFBa0IsSUFBdUI7QUFDL0MsVUFBTSxVQUFVLEdBQUcsVUFBVSxpQkFBaUI7QUFFOUMsVUFBTSxnQkFBZ0IsSUFBSSwwQkFBUSxPQUFPO0FBQ3pDLGtCQUFjLFFBQVEsYUFBYTtBQUNuQyxrQkFBYyxXQUFXO0FBRXpCLFVBQU0sZUFBZSxJQUFJLDBCQUFRLE9BQU87QUFDeEMsaUJBQWEsUUFBUSxzQkFBc0I7QUFDM0MsaUJBQWE7QUFBQSxNQUNYO0FBQUEsSUFFRjtBQUNBLGlCQUFhLFVBQVUsQ0FBQyxNQUFNO0FBQzVCLFFBQUUsY0FBYyxZQUFZO0FBQzVCLFFBQUUsU0FBUyxTQUFTLGFBQWE7QUFDakMsUUFBRTtBQUFBLFFBQVEsTUFDUixJQUFJLFdBQVcsS0FBSyxLQUFLLEtBQUssUUFBUSxNQUFNO0FBQzFDLGVBQUssYUFBYTtBQUNsQixlQUFLLGNBQWM7QUFDbkIsZUFBSyxlQUFlO0FBQ3BCLGVBQUssZUFBZSxDQUFDO0FBQ3JCLGVBQUssa0JBQWtCO0FBQ3ZCLGVBQUssdUJBQXVCO0FBQzVCLGVBQUssT0FBTztBQUFBLFFBQ2QsQ0FBQyxFQUFFLEtBQUs7QUFBQSxNQUNWO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNGOzs7QW9CN0hPLElBQU0sWUFBTixNQUFnQjtBQUFBLEVBQ3JCLFlBQW9CLElBQWlCO0FBQWpCO0FBQUEsRUFBa0I7QUFBQSxFQUV0QyxVQUFnQjtBQUNkLFNBQUssSUFBSSx1QkFBdUI7QUFDaEMsU0FBSyxHQUFHLFFBQVE7QUFBQSxFQUNsQjtBQUFBLEVBRUEsaUJBQXVCO0FBQ3JCLFNBQUssSUFBSSx3QkFBd0I7QUFDakMsU0FBSyxHQUFHLFFBQVE7QUFBQSxFQUNsQjtBQUFBLEVBRUEsY0FBYyxHQUFXLE9BQXFCO0FBQzVDLFNBQUssSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLEtBQUssS0FBSztBQUFBLEVBQ2xEO0FBQUEsRUFFQSxRQUFRLFdBQW1CLEtBQW1CO0FBQzVDLFNBQUssSUFBSSwwQkFBcUIsU0FBUyxlQUFVO0FBQ2pELFNBQUssR0FBRyxRQUFRLE1BQU0sV0FBVyxHQUFHLEtBQUs7QUFBQSxFQUMzQztBQUFBLEVBRUEsU0FBUyxLQUFtQjtBQUMxQixTQUFLLElBQUksMkJBQXNCLEdBQUcsRUFBRTtBQUFBLEVBQ3RDO0FBQUEsRUFFQSxlQUFlLFVBQXdCO0FBQ3JDLFNBQUssSUFBSSxrQ0FBNkIsUUFBUSxHQUFHO0FBQUEsRUFDbkQ7QUFBQSxFQUVBLFdBQVcsS0FBbUI7QUFDNUIsU0FBSyxJQUFJLEdBQUc7QUFBQSxFQUNkO0FBQUEsRUFFUSxJQUFJLE1BQW9CO0FBQzlCLFNBQUssR0FBRyxjQUFjO0FBQUEsRUFDeEI7QUFDRjs7O0FDckNBLElBQUFDLG9CQUEwRDtBQU9uRCxJQUFNLHNCQUFzQjtBQUVuQyxJQUFNQyxzQkFBcUI7QUFHM0IsU0FBUyxhQUFhLEtBQXFCO0FBQ3pDLE1BQUksQ0FBQztBQUFLLFdBQU87QUFDakIsUUFBTSxTQUFTLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUUsUUFBUTtBQUNsRCxNQUFJLE1BQU0sTUFBTTtBQUFHLFdBQU87QUFDMUIsUUFBTSxPQUFPLEtBQUssTUFBTSxTQUFTLEdBQUs7QUFDdEMsTUFBSSxPQUFPO0FBQUcsV0FBTztBQUNyQixNQUFJLE9BQU87QUFBSSxXQUFPLEdBQUcsSUFBSTtBQUM3QixRQUFNLE1BQU0sS0FBSyxNQUFNLE9BQU8sRUFBRTtBQUNoQyxNQUFJLE1BQU07QUFBSSxXQUFPLEdBQUcsR0FBRztBQUMzQixRQUFNLE9BQU8sS0FBSyxNQUFNLE1BQU0sRUFBRTtBQUNoQyxTQUFPLEdBQUcsSUFBSTtBQUNoQjtBQU1PLElBQU0sZ0JBQU4sY0FBNEIsMkJBQVM7QUFBQSxFQUMxQyxZQUFZLE1BQTZCLFFBQXlCO0FBQ2hFLFVBQU0sSUFBSTtBQUQ2QjtBQUFBLEVBRXpDO0FBQUEsRUFFQSxjQUFzQjtBQUNwQixXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsaUJBQXlCO0FBQ3ZCLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxVQUFrQjtBQTFDcEI7QUEyQ0ksYUFBTyxVQUFLLE9BQU8sY0FBYyxNQUExQixtQkFBNkIsZUFBYyxnQkFBZ0I7QUFBQSxFQUNwRTtBQUFBLEVBRUEsTUFBTSxTQUF3QjtBQUM1QixVQUFNLEtBQUssT0FBTztBQUVsQixVQUFNLE9BQU8sS0FBSyxPQUFPLGNBQWM7QUFDdkMsUUFBSTtBQUFNLFdBQUssS0FBSyxPQUFPLGdCQUFnQixJQUFJO0FBQUEsRUFDakQ7QUFBQSxFQUVBLE1BQU0sVUFBeUI7QUFBQSxFQUUvQjtBQUFBLEVBRUEsVUFBZ0I7QUFDZCxTQUFLLEtBQUssT0FBTztBQUFBLEVBQ25CO0FBQUEsRUFFQSxNQUFjLFNBQXdCO0FBQ3BDLFVBQU0sT0FBTyxLQUFLLFlBQVksU0FBUyxDQUFDO0FBQ3hDLFNBQUssTUFBTTtBQUNYLFNBQUssU0FBUyxnQkFBZ0I7QUFFOUIsVUFBTSxJQUFJLEtBQUssT0FBTztBQUV0QixRQUFJLENBQUMsRUFBRSxlQUFlO0FBQ3BCLFdBQUssU0FBUyxLQUFLO0FBQUEsUUFDakIsTUFBTTtBQUFBLFFBQ04sS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUNELFlBQU0sV0FBVyxLQUFLLFNBQVMsVUFBVSxFQUFFLE1BQU0sY0FBYyxLQUFLLFVBQVUsQ0FBQztBQUMvRSxlQUFTLGFBQWEsRUFBRSxXQUFXLE9BQU8sQ0FBQztBQUMzQyxlQUFTLGlCQUFpQixTQUFTLE1BQU0sS0FBSyxPQUFPLGdCQUFnQixDQUFDO0FBQ3RFO0FBQUEsSUFDRjtBQUVBLFVBQU0sVUFBVSxLQUFLLFVBQVUsRUFBRSxLQUFLLHdCQUF3QixDQUFDO0FBQy9ELFFBQUksRUFBRSxlQUFlO0FBQ25CLFlBQU0sS0FBSyxjQUFjLE9BQU87QUFBQSxJQUNsQyxPQUFPO0FBQ0wsWUFBTSxTQUFTLFFBQVEsVUFBVTtBQUNqQyxhQUFPLFNBQVMsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsYUFBTyxTQUFTLEtBQUs7QUFBQSxRQUNuQixNQUFNLEVBQUUsT0FBTyxlQUNYLGdCQUFnQixJQUFJLEtBQUssRUFBRSxPQUFPLFlBQVksRUFBRSxlQUFlLENBQUMsS0FDaEU7QUFBQSxRQUNKLEtBQUs7QUFBQSxNQUNQLENBQUM7QUFDRCxZQUFNLGlCQUFpQixPQUFPLFNBQVMsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLEtBQUssVUFBVSxDQUFDO0FBQzNGLHFCQUFlLGFBQWEsRUFBRSxXQUFXLE9BQU8sQ0FBQztBQUNqRCxxQkFBZSxpQkFBaUIsU0FBUyxNQUFNLEtBQUssT0FBTyxnQkFBZ0IsQ0FBQztBQUFBLElBQzlFO0FBQUEsRUFDRjtBQUFBLEVBRUEsTUFBYyxjQUFjLE1BQWtDO0FBakdoRTtBQWtHSSxVQUFNLElBQUksS0FBSyxPQUFPO0FBQ3RCLFVBQU0sT0FBTyxLQUFLLE9BQU8sY0FBYztBQUV2QyxRQUFJLENBQUMsTUFBTTtBQUNULFdBQUssU0FBUyxLQUFLO0FBQUEsUUFDakIsTUFBTTtBQUFBLFFBQ04sS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUNELFlBQU0sWUFBWSxLQUFLLFNBQVMsVUFBVSxFQUFFLE1BQU0scUJBQXFCLEtBQUssVUFBVSxDQUFDO0FBQ3ZGLGdCQUFVLGlCQUFpQixTQUFTLE1BQU07QUFDeEMsWUFBSSxhQUFhLEtBQUssS0FBSyxLQUFLLFFBQVEsTUFBTSxLQUFLLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFBQSxNQUNyRSxDQUFDO0FBQ0Q7QUFBQSxJQUNGO0FBR0EsVUFBTSxlQUFlLENBQUMsQ0FBQyxLQUFLLE9BQU8sa0JBQWtCLEtBQUssRUFBRTtBQUM1RCxVQUFNLFlBQVksS0FBSyxxQkFBcUIsQ0FBQztBQUM3QyxVQUFNLFNBQVMsS0FBSyxlQUFlLENBQUM7QUFDcEMsVUFBTSxRQUFPLFVBQUssT0FBTyxXQUFXLEtBQUssRUFBRSxNQUE5QixZQUFtQztBQUdoRCxRQUFJLDBCQUFRLElBQUksRUFDYixRQUFRLGNBQWMsRUFDdEIsWUFBWSxPQUFLO0FBQ2hCLGlCQUFXLE1BQU0sRUFBRSxPQUFPO0FBQ3hCLFVBQUUsVUFBVSxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsVUFBVTtBQUFBLE1BQzdDO0FBQ0EsUUFBRSxTQUFTLEtBQUssRUFBRTtBQUNsQixRQUFFLFNBQVMsQ0FBQyxPQUFPO0FBQUUsY0FBTSxZQUFZO0FBQ3JDLFlBQUUsZUFBZTtBQUNqQixnQkFBTSxLQUFLLE9BQU8sYUFBYTtBQUMvQixlQUFLLEtBQUssT0FBTztBQUFBLFFBQ25CLEdBQUc7QUFBQSxNQUFHLENBQUM7QUFBQSxJQUNULENBQUMsRUFDQSxVQUFVLE9BQUs7QUFDZCxRQUFFLFFBQVEsTUFBTSxFQUFFLFdBQVcscUJBQXFCLEVBQUUsUUFBUSxNQUFNO0FBQ2hFLFlBQUksYUFBYSxLQUFLLEtBQUssS0FBSyxRQUFRLE1BQU0sS0FBSyxRQUFRLENBQUMsRUFBRSxLQUFLO0FBQUEsTUFDckUsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUdILFNBQUssc0JBQXNCLE1BQU0sTUFBTSxRQUFRLFdBQVcsY0FBYyxJQUFJO0FBRzVFLFFBQ0UsS0FBSyxvQkFBb0IsZ0JBQ3pCLEtBQUssb0JBQ0wsMEJBQTBCLEtBQUssS0FBSyxnQkFBZ0IsR0FDcEQ7QUFDQSxZQUFNLGFBQWEsS0FBSyxVQUFVLG1CQUFtQjtBQUNyRCxpQkFBVyxTQUFTLFVBQVUsRUFBRSxNQUFNLDZDQUF3QyxDQUFDO0FBQy9FLGlCQUFXLFNBQVMsS0FBSztBQUFBLFFBQ3ZCLE1BQU07QUFBQSxNQUNSLENBQUM7QUFDRCxZQUFNLGVBQWUsV0FBVyxTQUFTLFVBQVUsRUFBRSxNQUFNLGtDQUE2QixLQUFLLFVBQVUsQ0FBQztBQUN4RyxtQkFBYSxpQkFBaUIsU0FBUyxNQUFNO0FBQUUsZUFBTyxLQUFLQSxxQkFBb0IsUUFBUTtBQUFBLE1BQUcsQ0FBQztBQUFBLElBQzdGO0FBR0EsUUFBSTtBQUVKLFFBQUksMEJBQVEsSUFBSSxFQUNiLFFBQVEsZUFBZSxFQUN2QixRQUFRLHdFQUF3RSxFQUNoRixZQUFZLE9BQUs7QUFDaEIsUUFBRSxVQUFVLFNBQVMsWUFBWTtBQUNqQyxRQUFFLFVBQVUsWUFBWSx3QkFBd0I7QUFDaEQsUUFBRSxTQUFTLEtBQUssZ0JBQWdCLE9BQU87QUFDdkMsUUFBRSxTQUFTLENBQUMsTUFBTTtBQUFFLGNBQU0sWUFBWTtBQUNwQyxlQUFLLGVBQWU7QUFDcEIsMkJBQWlCO0FBQ2pCLGdCQUFNLEtBQUssT0FBTyxhQUFhO0FBQUEsUUFDakMsR0FBRztBQUFBLE1BQUcsQ0FBQztBQUFBLElBQ1QsQ0FBQztBQUVILFVBQU0saUJBQWlCLEtBQUssVUFBVSwyQkFBMkI7QUFDakUsbUJBQWUsYUFBYTtBQUFBLE1BQzFCLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxNQUNkLGVBQWU7QUFBQSxJQUNqQixDQUFDO0FBRUQsVUFBTSxjQUFjLE1BQU07QUFDeEIscUJBQWUsTUFBTTtBQUNyQixXQUFLLEtBQUssZ0JBQWdCLGFBQWEsU0FBUztBQUM5Qyx1QkFBZSxhQUFhLEVBQUUsU0FBUyxPQUFPLENBQUM7QUFDL0M7QUFBQSxNQUNGO0FBQ0EscUJBQWUsYUFBYSxFQUFFLFNBQVMsUUFBUSxDQUFDO0FBRWhELFlBQU0sU0FBUyxlQUFlLFVBQVUsd0JBQXdCO0FBQ2hFLGFBQU8sYUFBYSxFQUFFLFdBQVcsTUFBTSxDQUFDO0FBRXhDLFlBQU0sU0FBUyxPQUFPLFNBQVMsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEUsYUFBTyxhQUFhLEVBQUUsT0FBTyxPQUFPLENBQUM7QUFDckMsYUFBTyxpQkFBaUIsU0FBUyxNQUFNO0FBQ3JDLFlBQUksaUJBQWlCLEtBQUssS0FBSyxDQUFDLGlCQUFpQjtBQUFFLGdCQUFNLFlBQVk7QUFDbkUsZ0JBQUksQ0FBQyxLQUFLO0FBQWMsbUJBQUssZUFBZSxDQUFDO0FBQzdDLGdCQUFJLENBQUMsS0FBSyxhQUFhLFNBQVMsWUFBWSxHQUFHO0FBQzdDLG1CQUFLLGFBQWEsS0FBSyxZQUFZO0FBQ25DLG9CQUFNLEtBQUssT0FBTyxhQUFhO0FBQy9CLDBCQUFZO0FBQUEsWUFDZDtBQUFBLFVBQ0YsR0FBRztBQUFBLFFBQUcsQ0FBQyxFQUFFLEtBQUs7QUFBQSxNQUNoQixDQUFDO0FBRUQsWUFBTSxRQUFRLEtBQUssZ0JBQWdCLENBQUM7QUFDcEMsVUFBSSxNQUFNLFdBQVcsR0FBRztBQUN0QixjQUFNLElBQUksZUFBZSxTQUFTLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxLQUFLLDJCQUEyQixDQUFDO0FBQ2pILFVBQUUsYUFBYSxFQUFFLFdBQVcsT0FBTyxDQUFDO0FBQUEsTUFDdEMsT0FBTztBQUNMLGNBQU0sZ0JBQWdCLGVBQWUsVUFBVTtBQUMvQyxzQkFBYyxhQUFhO0FBQUEsVUFDekIsU0FBUztBQUFBLFVBQ1QsVUFBVTtBQUFBLFVBQ1YsS0FBSztBQUFBLFVBQ0wsV0FBVztBQUFBLFVBQ1gsV0FBVztBQUFBLFVBQ1gsV0FBVztBQUFBLFVBQ1gsU0FBUztBQUFBLFFBQ1gsQ0FBQztBQUVELGlCQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0FBQ3JDLGdCQUFNLE9BQU8sY0FBYyxVQUFVO0FBQ3JDLGVBQUssYUFBYTtBQUFBLFlBQ2hCLFNBQVM7QUFBQSxZQUNULFlBQVk7QUFBQSxZQUNaLEtBQUs7QUFBQSxZQUNMLFNBQVM7QUFBQSxZQUNULFlBQVk7QUFBQSxZQUNaLFFBQVE7QUFBQSxZQUNSLGNBQWM7QUFBQSxZQUNkLFVBQVU7QUFBQSxVQUNaLENBQUM7QUFFRCxnQkFBTSxXQUFXLEtBQUssV0FBVztBQUNqQyxnQkFBTSxlQUFlLEtBQUssSUFBSSxNQUFNLHNCQUFzQixNQUFNLENBQUMsQ0FBQztBQUNsRSxnQkFBTSxXQUFXLGdCQUFnQixjQUFjO0FBQy9DLHlDQUFRLFVBQVUsV0FBVyxXQUFXLFdBQVc7QUFDbkQsbUJBQVMsYUFBYTtBQUFBLFlBQ3BCLFNBQVM7QUFBQSxZQUNULFlBQVk7QUFBQSxZQUNaLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLFFBQVE7QUFBQSxVQUNWLENBQUM7QUFFRCxlQUFLLFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDbEMsZ0JBQU0sWUFBWSxLQUFLLFdBQVcsRUFBRSxLQUFLLGlCQUFpQixDQUFDO0FBQzNELHlDQUFRLFdBQVcsR0FBRztBQUN0QixvQkFBVSxhQUFhO0FBQUEsWUFDckIsU0FBUztBQUFBLFlBQ1QsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsT0FBTztBQUFBLFlBQ1AsUUFBUTtBQUFBLFVBQ1YsQ0FBQztBQUNELG9CQUFVLGlCQUFpQixTQUFTLE1BQU07QUFBRSxrQkFBTSxZQUFZO0FBaFF4RSxrQkFBQUM7QUFpUVksZUFBQUEsTUFBQSxLQUFLLGlCQUFMLGdCQUFBQSxJQUFtQixPQUFPLEdBQUc7QUFDN0Isb0JBQU0sS0FBSyxPQUFPLGFBQWE7QUFDL0IsMEJBQVk7QUFBQSxZQUNkLEdBQUc7QUFBQSxVQUFHLENBQUM7QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSx1QkFBbUIsTUFBTTtBQUN2QixrQkFBWTtBQUFBLElBQ2Q7QUFDQSxxQkFBaUI7QUFHakIsUUFBSSwwQkFBUSxJQUFJLEVBQ2IsUUFBUSxVQUFVLEVBQ2xCLFFBQVEsNERBQTRELEVBQ3BFLFVBQVUsT0FBSztBQUNkLFFBQUUsY0FBYyxNQUFNLEVBQUUsUUFBUSxNQUFNO0FBQ3BDLFlBQUksY0FBYyxLQUFLLEtBQUssS0FBSyxRQUFRLE1BQU0sTUFBTSxLQUFLLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFBQSxNQUM1RSxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBR0gsU0FBSyxjQUFjLE1BQU0sTUFBTSxRQUFRLFdBQVcsWUFBWTtBQUFBLEVBQ2hFO0FBQUE7QUFBQSxFQUdRLHNCQUNOLE1BQ0EsTUFDQSxRQUNBLFdBQ0EsY0FDQSxNQUNNO0FBQ04sVUFBTSxPQUFPLEtBQUssVUFBVSxnQkFBZ0I7QUFDNUMsU0FBSyxhQUFhO0FBQUEsTUFDaEIsY0FBYztBQUFBLE1BQ2QsU0FBUztBQUFBLE1BQ1QsUUFBUTtBQUFBLE1BQ1IsY0FBYztBQUFBLE1BQ2QsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUdELFVBQU0sWUFBWSxLQUFLLFVBQVU7QUFDakMsY0FBVSxhQUFhO0FBQUEsTUFDckIsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUFBLE1BQ1osZ0JBQWdCO0FBQUEsTUFDaEIsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFHRCxRQUFJLGFBQWE7QUFDakIsUUFBSSxZQUFZO0FBQ2hCLFFBQUksYUFBYTtBQUVqQixRQUFJLGNBQWM7QUFDaEIsbUJBQWE7QUFDYixrQkFBWTtBQUNaLG1CQUFhO0FBQUEsSUFDZixXQUFXLFdBQVc7QUFDcEIsbUJBQWE7QUFDYixrQkFBWTtBQUNaLG1CQUFhO0FBQUEsSUFDZixXQUFXLFFBQVE7QUFFakIsVUFBSSxRQUFRLENBQUMsS0FBSyxXQUFXLEtBQUssbUJBQW1CLGFBQWE7QUFDaEUsWUFBSSxLQUFLLHVCQUF1QixXQUFXO0FBQ3pDLHVCQUFhO0FBQ2Isc0JBQVk7QUFDWix1QkFBYTtBQUFBLFFBQ2YsV0FBVyxLQUFLLHVCQUF1QixXQUFXO0FBQ2hELHVCQUFhO0FBQ2Isc0JBQVksS0FBSyxvQkFBb0IsZUFBZSwrQkFBK0I7QUFDbkYsdUJBQWE7QUFBQSxRQUNmLFdBQVcsS0FBSyx1QkFBdUIsYUFBYTtBQUNsRCx1QkFBYTtBQUNiLHNCQUFZO0FBQ1osdUJBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRixXQUFXLFFBQVEsS0FBSyxtQkFBbUIsZUFBZTtBQUN4RCxxQkFBYTtBQUNiLG9CQUFZLEtBQUssb0JBQW9CLGVBQWUsaUNBQTRCO0FBQ2hGLHFCQUFhO0FBQUEsTUFDZixPQUFPO0FBQ0wscUJBQWE7QUFDYixvQkFBWTtBQUNaLHFCQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFVBQVUsVUFBVSxXQUFXO0FBQ3JDLFlBQVEsYUFBYSxFQUFFLFlBQVksT0FBTyxPQUFPLFlBQVksVUFBVSx3QkFBd0IsQ0FBQztBQUNoRyxZQUFRLFFBQVEsR0FBRyxVQUFVLElBQUksU0FBUyxFQUFFO0FBRzVDLFVBQU0sYUFBYSxVQUFVLFNBQVMsVUFBVSxFQUFFLE9BQU0sNkJBQU0sV0FBVSxXQUFNLGlCQUFZLENBQUM7QUFDM0YsZUFBVyxhQUFhLEVBQUUsVUFBVSwwQkFBMEIsU0FBUyxVQUFVLENBQUM7QUFDbEYsUUFBSSw2QkFBTTtBQUFTLGlCQUFXLFFBQVEsWUFBWSxNQUFNO0FBQ3hELGVBQVcsaUJBQWlCLFNBQVMsTUFBTTtBQUN6QyxZQUFNLElBQUksS0FBSyxPQUFPLGNBQWM7QUFDcEMsVUFBSTtBQUFHLGFBQUssS0FBSyxPQUFPLGdCQUFnQixDQUFDO0FBQUEsSUFDM0MsQ0FBQztBQUdELFVBQU0sT0FBTyxLQUFLLFVBQVU7QUFDNUIsU0FBSyxhQUFhO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QscUJBQXFCO0FBQUEsTUFDckIsS0FBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLElBQ1QsQ0FBQztBQUVELFVBQU0sU0FBUyxDQUFDLE9BQWUsT0FBZSxTQUFrQjtBQUM5RCxZQUFNLFVBQVUsS0FBSyxXQUFXLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0MsY0FBUSxhQUFhLEVBQUUsWUFBWSxPQUFPLE9BQU8scUJBQXFCLENBQUM7QUFDdkUsVUFBSSxRQUFRLE9BQU87QUFDakIsY0FBTSxTQUFTLEtBQUssU0FBUyxLQUFLLEVBQUUsTUFBTSxPQUFPLEtBQUssQ0FBQztBQUN2RCxlQUFPLGFBQWEsRUFBRSxPQUFPLHNCQUFzQixVQUFVLFVBQVUsY0FBYyxZQUFZLFlBQVksVUFBVSxTQUFTLFFBQVEsQ0FBQztBQUN6SSxlQUFPLGlCQUFpQixTQUFTLENBQUMsTUFBTTtBQUFFLFlBQUUsZUFBZTtBQUFHLGlCQUFPLEtBQUssTUFBTSxRQUFRO0FBQUEsUUFBRyxDQUFDO0FBQUEsTUFDOUYsT0FBTztBQUNMLGNBQU0sUUFBUSxLQUFLLFdBQVcsRUFBRSxNQUFNLFNBQVMsU0FBSSxDQUFDO0FBQ3BELGNBQU0sYUFBYSxFQUFFLFVBQVUsVUFBVSxjQUFjLFlBQVksWUFBWSxTQUFTLENBQUM7QUFBQSxNQUMzRjtBQUFBLElBQ0Y7QUFHQSxXQUFPLFlBQVksS0FBSyxVQUFVLEtBQUssVUFBVSxVQUFLLEtBQUssVUFBVSxXQUFXLEtBQUssUUFBUSxRQUFRLGdCQUFnQixFQUFFLENBQUMsS0FBSyxNQUFTO0FBR3RJLFVBQU0sWUFBWSxLQUFLLG9CQUFvQixlQUFlLHFCQUN0RCxLQUFLLG9CQUFvQixpQkFBaUIsaUJBQzFDLEtBQUs7QUFDVCxXQUFPLFFBQVEsU0FBUztBQUV4QixRQUFJLFFBQVEsQ0FBQyxLQUFLLFNBQVM7QUFFekI7QUFBQSxRQUNFO0FBQUEsUUFDQSxHQUFHLEtBQUssT0FBTyxTQUFTLFdBQVcsSUFBSSxLQUFLLE9BQU8sU0FBUyxnQkFBZ0I7QUFBQSxRQUM1RSxLQUFLLGVBQWUsc0JBQXNCLEtBQUssT0FBTyxTQUFTLFdBQVcsSUFBSSxLQUFLLE9BQU8sU0FBUyxnQkFBZ0I7QUFBQSxNQUNySDtBQUdBLGFBQU8sYUFBYSxLQUFLLGVBQWUsYUFBYSxLQUFLLFlBQVksSUFBSSxRQUFHO0FBRzdFLFVBQUksS0FBSyxXQUFXO0FBQ2xCO0FBQUEsVUFDRTtBQUFBLFVBQ0EsR0FBRyxLQUFLLFNBQVMsR0FBRyxLQUFLLGdCQUFnQixXQUFNLEtBQUssY0FBYyxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRTtBQUFBLFVBQ3JGLEtBQUssWUFBWSxzQkFBc0IsS0FBSyxPQUFPLFNBQVMsV0FBVyxJQUFJLEtBQUssT0FBTyxTQUFTLGdCQUFnQixhQUFhO0FBQUEsUUFDL0g7QUFDQSxlQUFPLGFBQWEsYUFBYSxLQUFLLFVBQVUsQ0FBQztBQUFBLE1BQ25EO0FBR0EsV0FBSyxLQUFLLG9CQUFvQixrQkFBa0IsS0FBSyxvQkFBb0IsaUJBQWlCLEtBQUssZ0JBQWdCO0FBQzdHLGNBQU0sVUFBVSxLQUFLLG1CQUFtQixnQkFBZ0IsNkJBQ3BELEtBQUssdUJBQXVCLFlBQVksa0JBQ3hDLEtBQUssdUJBQXVCLFlBQVksa0JBQ3hDLEtBQUssdUJBQXVCLGNBQWMscUJBQzFDLEtBQUs7QUFDVCxlQUFPLFNBQVMsU0FBUyxLQUFLLGVBQWUsTUFBUztBQUN0RCxlQUFPLGFBQWEsYUFBYSxLQUFLLGlCQUFpQixDQUFDO0FBQUEsTUFDMUQ7QUFHQSxVQUFJLEtBQUssV0FBVztBQUNsQixjQUFNLFlBQVksS0FBSyxTQUFTLEtBQUssRUFBRSxNQUFNLGtCQUFrQixhQUFhLEtBQUssU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUMvRixrQkFBVSxhQUFhLEVBQUUsUUFBUSxhQUFhLFVBQVUsMEJBQTBCLE9BQU8sb0JBQW9CLENBQUM7QUFBQSxNQUNoSDtBQUFBLElBQ0YsV0FBVyw2QkFBTSxTQUFTO0FBQ3hCLFlBQU0sWUFBWSxLQUFLLFNBQVMsS0FBSyxFQUFFLE1BQU0sNkJBQXdCLENBQUM7QUFDdEUsZ0JBQVUsYUFBYSxFQUFFLFFBQVEsYUFBYSxVQUFVLDBCQUEwQixPQUFPLG9CQUFvQixDQUFDO0FBQUEsSUFDaEgsT0FBTztBQUVMO0FBQUEsUUFDRTtBQUFBLFFBQ0EsR0FBRyxLQUFLLE9BQU8sU0FBUyxXQUFXLElBQUksS0FBSyxPQUFPLFNBQVMsZ0JBQWdCO0FBQUEsUUFDNUUsc0JBQXNCLEtBQUssT0FBTyxTQUFTLFdBQVcsSUFBSSxLQUFLLE9BQU8sU0FBUyxnQkFBZ0I7QUFBQSxNQUNqRztBQUNBLFVBQUksS0FBSyxlQUFlO0FBQ3RCLGVBQU8sa0JBQWtCLGFBQWEsS0FBSyxhQUFhLENBQUM7QUFDekQsZUFBTyxTQUFTLE9BQU8sS0FBSyxhQUFhLENBQUM7QUFBQSxNQUM1QztBQUFBLElBQ0Y7QUFHQSxRQUFJLGFBQWEsS0FBSyxrQkFBa0I7QUFDdEMsWUFBTSxRQUFRLEtBQUssU0FBUyxLQUFLLEVBQUUsTUFBTSxVQUFLLEtBQUssZ0JBQWdCLEdBQUcsQ0FBQztBQUN2RSxZQUFNLGFBQWE7QUFBQSxRQUNqQixRQUFRO0FBQUEsUUFDUixVQUFVO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDYixDQUFDO0FBQUEsSUFDSDtBQUdBLFFBQUksS0FBSyxPQUFPLFNBQVMsY0FBYztBQUNyQyxZQUFNLFdBQVcsS0FBSyxTQUFTLEdBQUc7QUFDbEMsZUFBUyxhQUFhLEVBQUUsUUFBUSxhQUFhLFVBQVUsMEJBQTBCLE9BQU8scUJBQXFCLFdBQVcsK0NBQStDLFlBQVksTUFBTSxDQUFDO0FBQzFMLFlBQU0sYUFBYSxLQUFLLE9BQU8sU0FBUyxPQUFPLGtCQUMzQyxrQkFBYSxLQUFLLE9BQU8sU0FBUyxPQUFPLGVBQWUsS0FDeEQsS0FBSyxPQUFPLFNBQVMsT0FBTyxlQUMxQixrQkFBYSxhQUFhLEtBQUssT0FBTyxTQUFTLE9BQU8sWUFBWSxDQUFDLEtBQ25FO0FBQ04sZUFBUyxRQUFRLFVBQVU7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR1EsY0FDTixNQUNBLE1BQ0EsUUFDQSxXQUNBLGNBQ007QUFDTixVQUFNLFlBQVksS0FBSyxVQUFVLGdCQUFnQjtBQUNqRCxjQUFVLGFBQWE7QUFBQSxNQUNyQixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsTUFDVCxRQUFRO0FBQUEsTUFDUixpQkFBaUI7QUFBQSxNQUNqQixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUVELFVBQU0sZ0JBQWdCLElBQUksMEJBQVEsU0FBUyxFQUFFLFFBQVEsU0FBUyxFQUFFLFdBQVc7QUFDM0Usa0JBQWMsVUFBVSxhQUFhLEVBQUUsUUFBUSxRQUFRLFNBQVMsS0FBSyxjQUFjLE9BQU8sQ0FBQztBQUUzRixVQUFNLGdCQUFnQixJQUFJLDBCQUFRLFNBQVM7QUFDM0Msa0JBQWMsVUFBVSxhQUFhLEVBQUUsUUFBUSxRQUFRLFNBQVMsSUFBSSxDQUFDO0FBQ3JFLGtCQUFjLE9BQU8sYUFBYSxFQUFFLFNBQVMsT0FBTyxDQUFDO0FBQ3JELGtCQUFjLFVBQVUsYUFBYTtBQUFBLE1BQ25DLFNBQVM7QUFBQSxNQUNULGVBQWU7QUFBQSxNQUNmLEtBQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLE1BQ2hCLE9BQU87QUFBQSxJQUNULENBQUM7QUFNRCxVQUFNLGVBQWUsZUFDakIscUJBQ0EsWUFDRSxjQUNBLFNBQ0UsV0FDQTtBQUVSLFVBQU0sa0JBQWtCLEtBQUs7QUFFN0Isa0JBQ0csVUFBVSxPQUFLO0FBQ2QsUUFBRSxjQUFjLFlBQVk7QUFDNUIsVUFBSSxjQUFjO0FBQ2hCLFVBQUUsWUFBWSxJQUFJO0FBQUEsTUFDcEIsT0FBTztBQUNMLFVBQUUsT0FBTztBQUFBLE1BQ1g7QUFDQSxRQUFFLFFBQVEsTUFBTTtBQUFFLGNBQU0sWUFBWTtBQUNsQyxZQUFFLFlBQVksSUFBSTtBQUNsQixZQUFFLGNBQWMsa0JBQWE7QUFDN0IsY0FBSTtBQUNGLGtCQUFNLEtBQUssT0FBTyxVQUFVO0FBQUEsVUFDOUIsVUFBRTtBQUNBLGlCQUFLLEtBQUssT0FBTztBQUFBLFVBQ25CO0FBQUEsUUFDRixHQUFHO0FBQUEsTUFBRyxDQUFDO0FBQUEsSUFDVCxDQUFDLEVBQ0EsVUFBVSxPQUFLO0FBQ2QsVUFBSSxvQkFBb0IsY0FBYztBQUNwQyxVQUFFLGNBQWMsV0FBVztBQUMzQixZQUFJLENBQUMsVUFBVSxjQUFjO0FBQzNCLFlBQUUsWUFBWSxJQUFJO0FBQUEsUUFDcEIsT0FBTztBQUNMLFlBQUUsU0FBUyxTQUFTLGFBQWE7QUFBQSxRQUNuQztBQUNBLFVBQUUsUUFBUSxNQUFNO0FBQ2QsY0FBSSxlQUFlLEtBQUssS0FBSyxLQUFLLFFBQVEsTUFBTSxLQUFLLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFBQSxRQUN2RSxDQUFDO0FBQUEsTUFDSCxPQUFPO0FBRUwsVUFBRSxjQUFjLG9CQUFvQjtBQUNwQyxZQUFJLENBQUMsVUFBVSxjQUFjO0FBQzNCLFlBQUUsWUFBWSxJQUFJO0FBQUEsUUFDcEIsT0FBTztBQUNMLFlBQUUsU0FBUyxTQUFTLGFBQWE7QUFBQSxRQUNuQztBQUNBLFVBQUUsUUFBUSxNQUFNO0FBQ2QsZ0JBQU0sWUFBWTtBQUloQixpQkFBSyxjQUFjO0FBQ25CLGtCQUFNLEtBQUssT0FBTyxhQUFhO0FBQy9CLGdCQUFJO0FBQUEsY0FDRixLQUFLO0FBQUEsY0FDTCxzQkFBc0IsS0FBSyxPQUFPLFNBQVMsV0FBVyxJQUFJLEtBQUssT0FBTyxTQUFTLGdCQUFnQjtBQUFBLFlBQ2pHLEVBQUUsS0FBSztBQUNQLGlCQUFLLFFBQVE7QUFBQSxVQUNmLEdBQUc7QUFBQSxRQUNMLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDLEVBQ0EsVUFBVSxPQUFLO0FBQ2QsWUFBTSxnQkFBZ0Isb0JBQW9CLGVBQ3RDLCtFQUNBO0FBQ0osUUFBRSxjQUFjLFFBQVE7QUFDeEIsUUFBRSxXQUFXLGFBQWE7QUFDMUIsVUFBSTtBQUFjLFVBQUUsWUFBWSxJQUFJO0FBQUE7QUFDL0IsVUFBRSxTQUFTLFNBQVMsYUFBYTtBQUN0QyxRQUFFLFFBQVEsTUFBTTtBQUNkLFlBQUksZ0JBQWdCLEtBQUssS0FBSyxLQUFLLFFBQVEsTUFBTSxNQUFNO0FBQ3JELGVBQUssUUFBUTtBQUFBLFFBQ2YsQ0FBQyxFQUFFLEtBQUs7QUFBQSxNQUNWLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNMO0FBQ0Y7OztBQzdqQkEsU0FBUyxxQkFBeUM7QUFmbEQ7QUFnQkUsTUFBSTtBQU1GLFVBQU0sV0FBVyxRQUFRLFVBQVU7QUFJbkMsWUFBTyxvQkFBUyxnQkFBVCxhQUF3QixjQUFTLFdBQVQsbUJBQWlCLGdCQUF6QyxZQUF3RDtBQUFBLEVBQ2pFLFNBQVE7QUFDTixXQUFPO0FBQUEsRUFDVDtBQUNGO0FBRUEsSUFBTSxjQUFjLG1CQUFtQjtBQUdoQyxTQUFTLDJCQUFvQztBQUNsRCxNQUFJO0FBQ0YsV0FBTyxDQUFDLENBQUMsZUFBZSxZQUFZLHNCQUFzQjtBQUFBLEVBQzVELFNBQVE7QUFDTixXQUFPO0FBQUEsRUFDVDtBQUNGO0FBR08sU0FBUyxjQUFjLE9BQXVCO0FBQ25ELE1BQUksQ0FBQztBQUFPLFdBQU87QUFDbkIsTUFBSSxDQUFDLHlCQUF5QixHQUFHO0FBQy9CLFVBQU0sSUFBSSxNQUFNLCtDQUErQztBQUFBLEVBQ2pFO0FBRUEsU0FBTyxZQUFhLGNBQWMsS0FBSyxFQUFFLFNBQVMsUUFBUTtBQUM1RDtBQUdPLFNBQVMsY0FBYyxLQUFxQjtBQUNqRCxNQUFJLENBQUM7QUFBSyxXQUFPO0FBQ2pCLE1BQUksQ0FBQyx5QkFBeUI7QUFBRyxXQUFPO0FBQ3hDLE1BQUk7QUFFRixXQUFPLFlBQWEsY0FBYyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7QUFBQSxFQUM5RCxTQUFRO0FBQ04sV0FBTztBQUFBLEVBQ1Q7QUFDRjs7O0FDM0RBLElBQU0sMEJBQTBCO0FBQUEsRUFDOUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFZTyxJQUFNLGVBQU4sTUFBbUI7QUFBQSxFQUN4QixZQUNVLEtBQ0EsVUFDQSxhQUF3QyxNQUFNO0FBQUEsRUFBQyxHQUN2RDtBQUhRO0FBQ0E7QUFDQTtBQUFBLEVBQ1A7QUFBQSxFQUVILE1BQU0sU0FBZ0M7QUFDcEMsVUFBTSxTQUF1QixFQUFFLFNBQVMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEVBQUU7QUFDckUsVUFBTSxFQUFFLGFBQWEsYUFBYSxPQUFPLElBQUksS0FBSztBQUVsRCxRQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLFlBQVk7QUFDdEQsYUFBTztBQUFBLFFBQ0wsU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFFBQ1QsUUFBUSxDQUFDLG9FQUFvRTtBQUFBLE1BQy9FO0FBQUEsSUFDRjtBQUVBLFFBQUk7QUFDRixZQUFNLFlBQVksT0FBTyxtQkFBbUI7QUFDNUMsVUFBSSxTQUFTLElBQUksVUFBVSxhQUFhLGFBQWEsT0FBTyxZQUFZLE1BQU07QUFDOUUsWUFBTSxtQkFBbUIsTUFBTSxPQUFPLFdBQVc7QUFDakQsVUFBSSxDQUFDLGtCQUFrQjtBQUNyQixhQUFLLFdBQVcsZ0NBQTJCO0FBQzNDLGNBQU0sT0FBTyxXQUFXLFNBQVM7QUFDakMsWUFBSSxDQUFFLE1BQU0sT0FBTyxZQUFZLEdBQUssR0FBSTtBQUN0QyxnQkFBTSxJQUFJLE1BQU0sMkNBQTJDO0FBQUEsUUFDN0Q7QUFBQSxNQUNGLFdBQVcsYUFBYSxDQUFFLE1BQU0sT0FBTyxjQUFjLEdBQUk7QUFDdkQsY0FBTSxJQUFJO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsVUFBSSxTQUFTO0FBQ2IsVUFBSTtBQUNGLGlCQUFTLE1BQU0sT0FBTyxpQkFBaUI7QUFBQSxNQUN6QyxTQUFRO0FBQUEsTUFFUjtBQUNBLGVBQVMsSUFBSSxVQUFVLGFBQWEsYUFBYSxPQUFPLFlBQVksTUFBTTtBQUUxRSxZQUFNLGFBQWEsTUFBTSxLQUFLLGtCQUFrQjtBQUNoRCxZQUFNLGNBQWMsTUFBTSxLQUFLLGVBQWUsTUFBTTtBQUNwRCxZQUFNLFVBQXdCLENBQUM7QUFFL0IsaUJBQVcsQ0FBQyxNQUFNLEtBQUssS0FBSyxZQUFZO0FBQ3RDLFlBQUksWUFBWSxJQUFJLElBQUksTUFBTSxNQUFNLEtBQUs7QUFDdkMsa0JBQVEsS0FBSyxFQUFFLE1BQU0sU0FBUyxNQUFNLFFBQVEsQ0FBQztBQUFBLFFBQy9DO0FBQ0Esb0JBQVksT0FBTyxJQUFJO0FBQUEsTUFDekI7QUFFQSxpQkFBVyxRQUFRLFlBQVksS0FBSyxHQUFHO0FBRXJDLGNBQU0sa0JBQWtCLEtBQUssSUFBSSxNQUFNLHNCQUFzQixJQUFJLE1BQU07QUFDdkUsWUFBSSxDQUFDLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxpQkFBaUI7QUFDN0Msa0JBQVEsS0FBSyxFQUFFLE1BQU0sU0FBUyxLQUFLLENBQUM7QUFBQSxRQUN0QztBQUFBLE1BQ0Y7QUFFQSxVQUFJLFFBQVEsV0FBVztBQUFHLGVBQU87QUFFakMsWUFBTSxhQUFZLG9CQUFJLEtBQUssR0FBRSxlQUFlO0FBQzVDLFlBQU0sWUFBWSxNQUFNLE9BQU87QUFBQSxRQUM3QjtBQUFBLFFBQ0EseUJBQXNCLFNBQVM7QUFBQSxRQUMvQixDQUFDLE1BQU0sVUFBVSxLQUFLLFdBQVcsY0FBYyxJQUFJLElBQUksS0FBSyxRQUFHO0FBQUEsUUFDL0Q7QUFBQSxRQUNBO0FBQUEsUUFDQSxFQUFFLFdBQVcsS0FBSztBQUFBLE1BQ3BCO0FBRUEsYUFBTyxVQUFVLFVBQVU7QUFDM0IsYUFBTyxVQUFVLFVBQVU7QUFDM0IsYUFBTyxTQUFTLFVBQVU7QUFBQSxJQUM1QixTQUFTLE9BQWdCO0FBQ3ZCLGFBQU8sVUFBVTtBQUNqQixhQUFPLE9BQU8sS0FBSyxpQkFBaUIsUUFBUSxNQUFNLFVBQVUsZ0JBQWdCO0FBQUEsSUFDOUU7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsTUFBYyxvQkFBMkQ7QUFDdkUsVUFBTSxRQUFRLG9CQUFJLElBQTZCO0FBRS9DLGVBQVcsUUFBUSxLQUFLLElBQUksTUFBTSxTQUFTLEdBQUc7QUFDNUMsVUFBSSxLQUFLLFVBQVUsS0FBSyxJQUFJO0FBQUc7QUFFL0IsVUFBSTtBQUNGLGNBQU0sUUFBUSxJQUFJLFdBQVcsTUFBTSxLQUFLLElBQUksTUFBTSxXQUFXLElBQUksQ0FBQztBQUNsRSxjQUFNLElBQUksS0FBSyxNQUFNO0FBQUEsVUFDbkIsU0FBUyxLQUFLLFNBQVMsS0FBSztBQUFBLFVBQzVCLEtBQUssTUFBTSxLQUFLLGtCQUFrQixLQUFLO0FBQUEsUUFDekMsQ0FBQztBQUFBLE1BQ0gsU0FBUTtBQUFBLE1BRVI7QUFBQSxJQUNGO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLE1BQWMsZUFBZSxRQUFpRDtBQUM1RSxRQUFJO0FBQ0YsWUFBTSxPQUFPLE1BQU0sT0FBTyxTQUFTO0FBQ25DLGFBQU8sSUFBSTtBQUFBLFFBQ1QsS0FDRyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssVUFBVSxLQUFLLElBQUksQ0FBQyxFQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssTUFBTSxLQUFLLEdBQUcsQ0FBQztBQUFBLE1BQ3hDO0FBQUEsSUFDRixTQUFTLE9BQWdCO0FBQ3ZCLFlBQU0sU0FBVSxNQUFzQztBQUN0RCxVQUFJLFdBQVcsT0FBUSxNQUFnQixRQUFRLFNBQVMsS0FBSztBQUFHLGVBQU8sb0JBQUksSUFBSTtBQUMvRSxZQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUVRLFVBQVUsTUFBdUI7QUFDdkMsVUFBTSxZQUFZLEtBQUssSUFBSSxNQUFNO0FBQ2pDLFFBQUksU0FBUyxhQUFhLEtBQUssV0FBVyxHQUFHLFNBQVMsR0FBRztBQUFHLGFBQU87QUFFbkUsV0FBTyx3QkFBd0IsS0FBSyxDQUFDLFlBQVk7QUFDL0MsVUFBSSxRQUFRLFNBQVMsR0FBRyxHQUFHO0FBQ3pCLGVBQU8sU0FBUyxRQUFRLE1BQU0sR0FBRyxFQUFFLEtBQUssS0FBSyxXQUFXLE9BQU87QUFBQSxNQUNqRTtBQUNBLGFBQU8sU0FBUyxXQUFXLEtBQUssU0FBUyxNQUFNLE9BQU87QUFBQSxJQUN4RCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRVEsU0FBUyxPQUEyQjtBQUMxQyxRQUFJLFNBQVM7QUFDYixVQUFNLFlBQVk7QUFDbEIsYUFBUyxTQUFTLEdBQUcsU0FBUyxNQUFNLFFBQVEsVUFBVSxXQUFXO0FBQy9ELGdCQUFVLE9BQU8sYUFBYSxHQUFHLE1BQU0sU0FBUyxRQUFRLFNBQVMsU0FBUyxDQUFDO0FBQUEsSUFDN0U7QUFDQSxXQUFPLEtBQUssTUFBTTtBQUFBLEVBQ3BCO0FBQUEsRUFFQSxNQUFjLGtCQUFrQixTQUFzQztBQUNwRSxVQUFNLFNBQVMsSUFBSSxZQUFZLEVBQUUsT0FBTyxRQUFRLFFBQVEsVUFBVSxJQUFJO0FBQ3RFLFVBQU0sVUFBVSxJQUFJLFdBQVcsT0FBTyxTQUFTLFFBQVEsTUFBTTtBQUM3RCxZQUFRLElBQUksTUFBTTtBQUNsQixZQUFRLElBQUksU0FBUyxPQUFPLE1BQU07QUFDbEMsVUFBTSxPQUFPLE1BQU0sT0FBTyxPQUFPLE9BQU8sU0FBUyxPQUFPO0FBQ3hELFdBQU8sTUFBTSxLQUFLLElBQUksV0FBVyxJQUFJLENBQUMsRUFDbkMsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUUsRUFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDLEVBQ2hELEtBQUssRUFBRTtBQUFBLEVBQ1o7QUFDRjs7O0FDM0tPLElBQU0sa0JBQU4sTUFBc0I7QUFBQSxFQUczQixZQUFvQixRQUF5QjtBQUF6QjtBQUZwQixTQUFRLHNCQUFxQztBQUFBLEVBRUM7QUFBQSxFQUV2QyxxQkFBMkI7QUFDaEMsVUFBTSxFQUFFLElBQUksSUFBSSxLQUFLO0FBQ3JCLFVBQU0sbUJBQW1CLE1BQU07QUFDN0IsVUFBSSxDQUFDLEtBQUssT0FBTyxTQUFTLGdCQUFnQixDQUFDLEtBQUssT0FBTyxTQUFTLE9BQU87QUFBZ0I7QUFDdkYsVUFBSSxLQUFLLHdCQUF3QjtBQUFNLGVBQU8sYUFBYSxLQUFLLG1CQUFtQjtBQUNuRixXQUFLLHNCQUFzQixPQUFPLFdBQVcsTUFBTTtBQUNqRCxhQUFLLHNCQUFzQjtBQUMzQixhQUFLLEtBQUssT0FBTyxTQUFTLElBQUk7QUFBQSxNQUNoQyxHQUFHLEdBQUs7QUFBQSxJQUNWO0FBRUEsU0FBSyxPQUFPLGNBQWMsSUFBSSxNQUFNLEdBQUcsVUFBVSxnQkFBZ0IsQ0FBQztBQUNsRSxTQUFLLE9BQU8sY0FBYyxJQUFJLE1BQU0sR0FBRyxVQUFVLGdCQUFnQixDQUFDO0FBQ2xFLFNBQUssT0FBTyxjQUFjLElBQUksTUFBTSxHQUFHLFVBQVUsZ0JBQWdCLENBQUM7QUFDbEUsU0FBSyxPQUFPLGNBQWMsSUFBSSxNQUFNLEdBQUcsVUFBVSxnQkFBZ0IsQ0FBQztBQUVsRSxTQUFLLE9BQU8sU0FBUyxNQUFNO0FBQ3pCLFVBQUksS0FBSyx3QkFBd0I7QUFBTSxlQUFPLGFBQWEsS0FBSyxtQkFBbUI7QUFBQSxJQUNyRixDQUFDO0FBRUQsU0FBSyxPQUFPLGlCQUFpQixPQUFPLFlBQVksTUFBTTtBQUNwRCxXQUFLLEtBQUssd0JBQXdCO0FBQUEsSUFDcEMsR0FBRyxHQUFLLENBQUM7QUFFVCxRQUFJLFVBQVUsY0FBYyxNQUFNLEtBQUssS0FBSyx3QkFBd0IsQ0FBQztBQUFBLEVBQ3ZFO0FBQUEsRUFFQSxNQUFjLDBCQUF5QztBQUNyRCxVQUFNLEVBQUUsU0FBUyxJQUFJLEtBQUs7QUFDMUIsVUFBTSxFQUFFLE9BQU8sSUFBSTtBQUNuQixRQUFJLENBQUMsU0FBUyxpQkFBaUIsQ0FBQyxTQUFTLGdCQUFnQixPQUFPLG1CQUFtQixHQUFHO0FBQ3BGO0FBQUEsSUFDRjtBQUVBLFVBQU0sY0FBYyxPQUFPLHNCQUN2QixJQUFJLEtBQUssT0FBTyxtQkFBbUIsRUFBRSxRQUFRLElBQzdDO0FBQ0osVUFBTSxhQUFhLE9BQU8sa0JBQWtCLEtBQUs7QUFDakQsUUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLElBQUksZUFBZSxZQUFZO0FBQzFELFlBQU0sS0FBSyxPQUFPLFNBQVMsSUFBSTtBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNGOzs7QWhDcEJBLElBQXFCLGtCQUFyQixjQUE2Qyx5QkFBTztBQUFBLEVBQXBEO0FBQUE7QUFHRSxTQUFRLFdBQStCO0FBQ3ZDLFNBQVEsbUJBQW1CO0FBRTNCO0FBQUEsNkJBQTZDLENBQUM7QUFFOUM7QUFBQSxzQkFBNkMsQ0FBQztBQUFBO0FBQUEsRUFFOUMsTUFBTSxTQUF3QjtBQUM1QixVQUFNLEtBQUssYUFBYTtBQUt4QixRQUFJLEtBQUssU0FBUyxlQUFlLEtBQUssU0FBUyxlQUFlLEtBQUssU0FBUyxNQUFNLFdBQVcsR0FBRztBQUM5RixZQUFNLFdBQVcsTUFBTSxjQUFjLEtBQUssS0FBSyxHQUFHO0FBQ2xELFVBQUksU0FBUyxRQUFRLFNBQVMsR0FBRztBQUMvQixZQUFJO0FBQUEsVUFDRixtQkFBbUIsU0FBUyxRQUFRLE1BQU0sOEJBQThCLFNBQVMsUUFBUSxXQUFXLElBQUksS0FBSyxHQUFHO0FBQUEsVUFDaEg7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMseUJBQXlCLEdBQUc7QUFDL0IsVUFBSTtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFdBQVcsS0FBSyxpQkFBaUI7QUFDdkMsU0FBSyxZQUFZLElBQUksVUFBVSxRQUFRO0FBQ3ZDLFNBQUssZ0JBQWdCO0FBRXJCLFNBQUssYUFBYSxxQkFBcUIsQ0FBQyxTQUFTLElBQUksY0FBYyxNQUFNLElBQUksQ0FBQztBQUc5RSxTQUFLLFdBQVcsS0FBSztBQUFBLE1BQ25CLEtBQUssYUFBYSxJQUFJLGdCQUFnQjtBQUFBLE1BQ3RDO0FBQUEsTUFDQSxNQUFNLEtBQUssS0FBSyxhQUFhO0FBQUEsSUFDL0I7QUFDQSxTQUFLLGlCQUFpQjtBQUV0QixTQUFLLFdBQVc7QUFBQSxNQUNkLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFVBQVUsTUFBTSxLQUFLLEtBQUssYUFBYTtBQUFBLElBQ3pDLENBQUM7QUFDRCxTQUFLLFdBQVc7QUFBQSxNQUNkLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFVBQVUsTUFBTSxLQUFLLEtBQUssVUFBVTtBQUFBLElBQ3RDLENBQUM7QUFDRCxTQUFLLFdBQVc7QUFBQSxNQUNkLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFVBQVUsTUFBTSxLQUFLLEtBQUssWUFBWTtBQUFBLElBQ3hDLENBQUM7QUFDRCxTQUFLLFdBQVc7QUFBQSxNQUNkLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFVBQVUsTUFBTSxLQUFLLEtBQUssU0FBUyxLQUFLO0FBQUEsSUFDMUMsQ0FBQztBQUVELFNBQUssY0FBYyxJQUFJLHFCQUFxQixLQUFLLEtBQUssSUFBSSxDQUFDO0FBRTNELFFBQUksZ0JBQWdCLElBQUksRUFBRSxtQkFBbUI7QUFBQSxFQUMvQztBQUFBO0FBQUEsRUFHQSxnQkFBb0M7QUF2R3RDO0FBd0dJLFVBQU0sRUFBRSxPQUFPLGFBQWEsSUFBSSxLQUFLO0FBQ3JDLFlBQU8saUJBQU0sS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLFlBQVksTUFBdkMsWUFBNEMsTUFBTSxDQUFDLE1BQW5ELFlBQXdEO0FBQUEsRUFDakU7QUFBQSxFQUVRLGVBQXdCO0FBNUdsQztBQTZHSSxZQUFPLGdCQUFLLGNBQWMsTUFBbkIsbUJBQXNCLGdCQUF0QixZQUFxQztBQUFBLEVBQzlDO0FBQUE7QUFBQSxFQUdBLE1BQU0sZUFBOEI7QUFqSHRDO0FBa0hJLFVBQU0sRUFBRSxVQUFVLElBQUksS0FBSztBQUMzQixRQUFJLFFBQTZCLGVBQVUsZ0JBQWdCLG1CQUFtQixFQUFFLENBQUMsTUFBaEQsWUFBcUQ7QUFFdEYsUUFBSSxDQUFDLE1BQU07QUFDVCxZQUFNLE9BQU0sVUFBSyxTQUFTLHdCQUFkLFlBQXFDO0FBQ2pELFVBQUksUUFBUSxTQUFTO0FBQ25CLGVBQU8sVUFBVSxhQUFhLEtBQUs7QUFBQSxNQUNyQyxXQUFXLFFBQVEsT0FBTztBQUN4QixlQUFPLFVBQVUsUUFBUSxLQUFLO0FBQUEsTUFDaEMsT0FBTztBQUNMLGVBQU8sVUFBVSxZQUFZLEtBQUs7QUFBQSxNQUNwQztBQUNBLFVBQUksQ0FBQztBQUFNO0FBQ1gsWUFBTSxLQUFLLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixRQUFRLEtBQUssQ0FBQztBQUFBLElBQ3JFO0FBQ0EsU0FBSyxVQUFVLFdBQVcsSUFBSTtBQUFBLEVBQ2hDO0FBQUEsRUFFUSxjQUFvQjtBQUMxQixTQUFLLElBQUksVUFBVSxnQkFBZ0IsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLFNBQVM7QUFDeEUsWUFBTSxPQUFPLEtBQUs7QUFDbEIsVUFBSSxnQkFBZ0I7QUFBZSxhQUFLLFFBQVE7QUFBQSxJQUNsRCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsTUFBTSxTQUFTLGFBQWEsT0FBc0I7QUEzSXBEO0FBNElJLFFBQUksS0FBSyxrQkFBa0I7QUFDekIsVUFBSSxDQUFDO0FBQVksWUFBSSx5QkFBTyw4QkFBOEI7QUFDMUQ7QUFBQSxJQUNGO0FBQ0EsUUFBSSxDQUFDLEtBQUssU0FBUyxpQkFBaUIsQ0FBQyxLQUFLLFNBQVMsY0FBYztBQUMvRCxVQUFJLENBQUMsWUFBWTtBQUNmLGFBQUssZ0JBQWdCO0FBQ3JCLFlBQUkseUJBQU8sb0RBQW9EO0FBQUEsTUFDakU7QUFDQTtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsS0FBSyxTQUFTLE9BQU8sWUFBWTtBQUNwQyxXQUFLLFNBQVMsT0FBTyxhQUFhLEtBQUssd0JBQXdCO0FBQUEsSUFDakU7QUFFQSxTQUFLLG1CQUFtQjtBQUN4QixTQUFLLFNBQVMsT0FBTyx1QkFBc0Isb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFDbEUsVUFBTSxTQUFTLElBQUksYUFBYSxLQUFLLEtBQUssS0FBSyxVQUFVLENBQUMsWUFBWTtBQUNwRSxVQUFJLENBQUM7QUFBWSxhQUFLLFVBQVUsV0FBVyxjQUFjLE9BQU8sRUFBRTtBQUFBLElBQ3BFLENBQUM7QUFFRCxRQUFJO0FBQ0YsWUFBTSxTQUFTLE1BQU0sT0FBTyxPQUFPO0FBQ25DLFVBQUksQ0FBQyxPQUFPO0FBQVMsY0FBTSxJQUFJLE9BQU0sWUFBTyxPQUFPLENBQUMsTUFBZixZQUFvQixnQkFBZ0I7QUFFekUsV0FBSyxTQUFTLE9BQU8sZ0JBQWUsb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFDM0QsV0FBSyxTQUFTLE9BQU8sa0JBQWtCO0FBQ3ZDLFlBQU0sS0FBSyxhQUFhO0FBRXhCLFVBQUksQ0FBQyxZQUFZO0FBQ2YsY0FBTSxVQUFVLE9BQU8sVUFBVSxJQUM3Qix3QkFBcUIsT0FBTyxPQUFPLFFBQVEsT0FBTyxZQUFZLElBQUksS0FBSyxHQUFHLGFBQzFFO0FBQ0osWUFBSSx5QkFBTyxTQUFTLEdBQUk7QUFBQSxNQUMxQjtBQUFBLElBQ0YsU0FBUyxPQUFnQjtBQUN2QixZQUFNLFVBQVUsS0FBSyxjQUFjLE9BQU8sZ0JBQWdCO0FBQzFELFdBQUssU0FBUyxPQUFPLGtCQUFrQjtBQUN2QyxZQUFNLEtBQUssYUFBYTtBQUN4QixVQUFJLENBQUMsWUFBWTtBQUNmLGFBQUssVUFBVSxTQUFTLE9BQU87QUFDL0IsWUFBSSx5QkFBTyxTQUFTLEdBQUk7QUFBQSxNQUMxQixPQUFPO0FBQ0wsZ0JBQVEsTUFBTSx1Q0FBdUMsT0FBTyxFQUFFO0FBQUEsTUFDaEU7QUFBQSxJQUNGLFVBQUU7QUFDQSxXQUFLLG1CQUFtQjtBQUN4QixVQUFJLENBQUM7QUFBWSxhQUFLLGdCQUFnQjtBQUFBLElBQ3hDO0FBQUEsRUFDRjtBQUFBLEVBRUEsTUFBTSxZQUEyQjtBQUMvQixVQUFNLE9BQU8sS0FBSyxjQUFjO0FBQ2hDLFFBQUksQ0FBQyxLQUFLLFNBQVMsaUJBQWlCLENBQUMsTUFBTTtBQUN6QyxXQUFLLGdCQUFnQjtBQUNyQixVQUFJLHlCQUFPLCtCQUErQjtBQUMxQztBQUFBLElBQ0Y7QUFHQSxRQUFJLEtBQUssa0JBQWtCLEtBQUssRUFBRTtBQUFHO0FBQ3JDLFNBQUssa0JBQWtCLEtBQUssRUFBRSxJQUFJO0FBQ2xDLFNBQUssWUFBWTtBQUVqQixVQUFNLFlBQVksSUFBSSxVQUFVLEtBQUssVUFBVSxNQUFNLEtBQUssS0FBSyxDQUFDLFlBQVk7QUFDMUUsV0FBSyx1QkFBdUIsT0FBTztBQUNuQyxXQUFLLFlBQVk7QUFBQSxJQUNuQixDQUFDO0FBRUQsUUFBSTtBQUNGLFlBQU0sU0FBUyxNQUFNLFVBQVUsUUFBUTtBQUV2QyxZQUFNLEtBQUssbUJBQW1CLE1BQU0sTUFBTTtBQUFBLElBQzVDLFNBQVMsS0FBYztBQUNyQixZQUFNLFVBQVUsS0FBSyxjQUFjLEtBQUsscURBQXFEO0FBRTdGLFdBQUssb0JBQW9CO0FBQ3pCLFdBQUssbUJBQW1CO0FBQ3hCLFdBQUssY0FBYztBQUNuQixXQUFLLFVBQVUsU0FBUyxPQUFPO0FBQy9CLFVBQUkseUJBQU8sU0FBUyxHQUFJO0FBQ3hCLFlBQU0sS0FBSyxhQUFhO0FBQUEsSUFDMUIsVUFBRTtBQUNBLFdBQUssa0JBQWtCLEtBQUssRUFBRSxJQUFJO0FBQ2xDLFdBQUssWUFBWTtBQUFBLElBQ25CO0FBQUEsRUFDRjtBQUFBLEVBRUEsTUFBTSxjQUE2QjtBQUNqQyxVQUFNLE9BQU8sS0FBSyxjQUFjO0FBQ2hDLFFBQUksQ0FBQyxLQUFLLFNBQVMsaUJBQWlCLENBQUMsTUFBTTtBQUN6QyxXQUFLLGdCQUFnQjtBQUNyQixVQUFJLHlCQUFPLG1CQUFtQjtBQUM5QjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFlBQVksSUFBSSxVQUFVLEtBQUssVUFBVSxNQUFNLEtBQUssS0FBSyxDQUFDLFlBQVk7QUFDMUUsV0FBSyxVQUFVLFdBQVcsY0FBYyxPQUFPLEVBQUU7QUFBQSxJQUNuRCxDQUFDO0FBRUQsU0FBSyxVQUFVLFdBQVcsd0NBQXdDO0FBRWxFLFFBQUk7QUFDRixZQUFNLFVBQVUsVUFBVTtBQUMxQixXQUFLLGNBQWM7QUFDbkIsWUFBTSxLQUFLLGFBQWE7QUFDeEIsV0FBSyxnQkFBZ0I7QUFDckIsVUFBSSx5QkFBTywyREFBMkQ7QUFBQSxJQUN4RSxTQUFTLEtBQWM7QUFDckIsWUFBTSxVQUFVLEtBQUssY0FBYyxLQUFLLGlFQUFpRTtBQUN6RyxXQUFLLFVBQVUsU0FBUyxPQUFPO0FBQy9CLFVBQUkseUJBQU8sU0FBUyxHQUFJO0FBQUEsSUFDMUI7QUFBQSxFQUNGO0FBQUEsRUFFQSxNQUFNLGVBQThCO0FBQ2xDLFVBQU0sU0FBVSxNQUFNLEtBQUssU0FBUztBQUNwQyxVQUFNLEVBQUUsU0FBUyxJQUFJLGdCQUFnQixNQUFNO0FBQzNDLFNBQUssV0FBVztBQUFBLEVBQ2xCO0FBQUEsRUFFQSxNQUFNLGVBQThCO0FBSWxDLFVBQU0sRUFBRSxhQUFhLGlCQUFpQixHQUFHLEtBQUssSUFBSSxLQUFLO0FBQ3ZELFVBQU0sWUFBcUMsRUFBRSxHQUFHLEtBQUs7QUFDckQsUUFBSSx5QkFBeUIsR0FBRztBQUM5QixnQkFBVSxpQkFBaUIsY0FBYyxjQUFjLFdBQVcsSUFBSTtBQUN0RSxnQkFBVSxxQkFBcUIsa0JBQWtCLGNBQWMsZUFBZSxJQUFJO0FBQUEsSUFDcEY7QUFDQSxVQUFNLEtBQUssU0FBUyxTQUFTO0FBSTdCLGVBQVcsUUFBUSxLQUFLLFNBQVMsT0FBTztBQUN0QyxXQUFLLGNBQWM7QUFBQSxRQUNqQixLQUFLO0FBQUEsUUFDTDtBQUFBLFFBQ0EsS0FBSyxTQUFTO0FBQUEsUUFDZCxLQUFLLFNBQVM7QUFBQSxRQUNkLEtBQUssU0FBUywyQkFBMkI7QUFBQSxNQUMzQztBQUFBLElBQ0Y7QUFFQSxTQUFLLGdCQUFnQjtBQUNyQixTQUFLLGlCQUFpQjtBQUN0QixTQUFLLFlBQVk7QUFBQSxFQUNuQjtBQUFBLEVBRUEsa0JBQXdCO0FBQ3RCLFFBQUksQ0FBQyxLQUFLO0FBQVc7QUFFckIsVUFBTSxPQUFPLEtBQUssY0FBYztBQUNoQyxRQUFJLENBQUMsS0FBSyxTQUFTLGlCQUFpQixDQUFDLE1BQU07QUFDekMsV0FBSyxVQUFVLFFBQVE7QUFDdkI7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUFLLGFBQWE7QUFDcEIsV0FBSyxVQUFVLFFBQVEsS0FBSyxlQUFlLEtBQUssT0FBTztBQUN2RDtBQUFBLElBQ0Y7QUFFQSxTQUFLLFVBQVUsZUFBZTtBQUFBLEVBQ2hDO0FBQUEsRUFFUSxtQkFBeUI7QUFDL0IsUUFBSSxDQUFDLEtBQUs7QUFBVTtBQUVwQixVQUFNLE9BQU8sS0FBSyxhQUFhO0FBQy9CLG1DQUFRLEtBQUssVUFBVSxPQUFPLGdCQUFnQixjQUFjO0FBQzVELFNBQUssU0FBUztBQUFBLE1BQ1o7QUFBQSxNQUNBLE9BQU8sOEJBQThCO0FBQUEsSUFDdkM7QUFBQSxFQUNGO0FBQUEsRUFFUSx1QkFBdUIsU0FBdUI7QUFDcEQsVUFBTSxjQUFjLHlCQUF5QixLQUFLLE9BQU87QUFDekQsUUFBSSxhQUFhO0FBQ2YsV0FBSyxVQUFVLGNBQWMsT0FBTyxZQUFZLENBQUMsQ0FBQyxHQUFHLE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQztBQUMzRTtBQUFBLElBQ0Y7QUFFQSxVQUFNLFlBQVksNEJBQTRCLEtBQUssT0FBTztBQUMxRCxRQUFJLFdBQVc7QUFDYixXQUFLLFVBQVUsZUFBZSxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDbEQ7QUFBQSxJQUNGO0FBRUEsU0FBSyxVQUFVLFdBQVcsY0FBYyxPQUFPLEVBQUU7QUFBQSxFQUNuRDtBQUFBLEVBRUEsMEJBQWtDO0FBQ2hDLFVBQU0sWUFBWSxLQUFLLElBQUksTUFBTSxRQUFRLEVBQ3RDLFlBQVksRUFDWixRQUFRLGdCQUFnQixHQUFHLEVBQzNCLFFBQVEsWUFBWSxFQUFFO0FBQ3pCLFdBQU8sR0FBRyxhQUFhLGdCQUFnQjtBQUFBLEVBQ3pDO0FBQUEsRUFFQSxNQUFjLG1CQUFtQixNQUFtQixRQUFzQztBQXZWNUY7QUF3VkksU0FBSyxpQkFBZ0Isb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFDNUMsU0FBSyxjQUFjLE9BQU87QUFFMUIsU0FBSyxnQkFBZ0IsT0FBTztBQUc1QixTQUFLLG9CQUFvQixDQUFDLE9BQU87QUFDakMsU0FBSyxtQkFBbUIsT0FBTyxVQUFVLE1BQU0sWUFBTyxPQUFPLENBQUMsTUFBZixZQUFvQjtBQUNuRSxVQUFNLEtBQUssYUFBYTtBQUV4QixRQUFJLE9BQU8sU0FBUztBQUNsQixXQUFLLFVBQVUsUUFBUSxPQUFPLFdBQVcsS0FBSyxPQUFPO0FBQ3JELFlBQU0sWUFBWSxPQUFPLFFBQVEsSUFBSSxnQkFBZ0IsT0FBTyxLQUFLLHFCQUFxQixPQUFPLFVBQVUsSUFBSSxLQUFLLEdBQUcsTUFBTTtBQUN6SCxVQUFJLHlCQUFPLGFBQWEsT0FBTyxTQUFTLFFBQVEsT0FBTyxjQUFjLElBQUksS0FBSyxHQUFHLE9BQU8sS0FBSyxPQUFPLEdBQUcsU0FBUyxJQUFJLEdBQUk7QUFFeEgsV0FBSyxLQUFLLGdCQUFnQixJQUFJO0FBQzlCO0FBQUEsSUFDRjtBQUVBLFVBQU0sY0FBYSxZQUFPLE9BQU8sQ0FBQyxNQUFmLFlBQW9CO0FBQ3ZDLFNBQUssVUFBVSxTQUFTLFVBQVU7QUFDbEMsUUFBSSx5QkFBTyxzQkFBc0IsVUFBVSxJQUFJLEdBQUk7QUFBQSxFQUNyRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNQSxNQUFNLGdCQUFnQixNQUFrQztBQXBYMUQ7QUFxWEksVUFBTSxPQUFPLEtBQUssY0FBYyxLQUFLLFNBQVM7QUFFOUMsUUFBSSxDQUFDLEtBQUssU0FBUyxlQUFlLENBQUMsS0FBSyxTQUFTLGVBQWUsQ0FBQyxNQUFNO0FBQ3JFLFdBQUssV0FBVyxLQUFLLEVBQUUsSUFBSTtBQUFBLFFBQ3pCLElBQUksVUFBSyxXQUFXLEtBQUssRUFBRSxNQUF2QixZQUE0QixDQUFDO0FBQUEsUUFDakMsU0FBUztBQUFBLFFBQ1QsT0FBTyxDQUFDLE9BQU8sc0NBQXNDO0FBQUEsTUFDdkQ7QUFDQSxXQUFLLFlBQVk7QUFDakI7QUFBQSxJQUNGO0FBRUEsVUFBTSxTQUFTLEtBQUssZ0JBQWdCO0FBQ3BDLFVBQU0sU0FBUyxJQUFJO0FBQUEsTUFDakIsS0FBSyxTQUFTO0FBQUEsTUFDZCxLQUFLLFNBQVM7QUFBQSxNQUNkO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFHQSxTQUFLLFdBQVcsS0FBSyxFQUFFLElBQUk7QUFBQSxNQUN6QixJQUFJLFVBQUssV0FBVyxLQUFLLEVBQUUsTUFBdkIsWUFBNEIsQ0FBQztBQUFBLE1BQ2pDLFNBQVM7QUFBQSxJQUNYO0FBQ0EsU0FBSyxZQUFZO0FBRWpCLFFBQUk7QUFDRixZQUFNLENBQUMsVUFBVSxhQUFhLFlBQVksSUFBSSxNQUFNLFFBQVEsSUFBSTtBQUFBLFFBQzlELE9BQU8sWUFBWTtBQUFBLFFBQ25CLE9BQU8scUJBQXFCLFlBQVk7QUFBQSxRQUN4QyxPQUFPLGdCQUFnQixNQUFNO0FBQUEsTUFDL0IsQ0FBQztBQUVELFVBQUksb0JBQW1CLGdEQUFhLFdBQWIsWUFBdUI7QUFDOUMsVUFBSSx3QkFBdUIsZ0RBQWEsZUFBYixZQUEyQjtBQUN0RCxVQUFJLGlCQUFnQixnREFBYSxZQUFiLFlBQXdCO0FBQzVDLFVBQUksdUJBQXNCLGdEQUFhLGNBQWIsWUFBMEI7QUFFcEQsVUFBSSxLQUFLLG9CQUFvQixnQkFBZ0IsS0FBSyxTQUFTLG1CQUFtQixLQUFLLFNBQVMscUJBQXFCLEtBQUssbUJBQW1CO0FBQ3ZJLFlBQUk7QUFDRixnQkFBTSxLQUFLLElBQUksY0FBYyxLQUFLLFNBQVMsaUJBQWlCLEtBQUssU0FBUyxpQkFBaUI7QUFDM0YsZ0JBQU0sZ0JBQWdCLE1BQU0sR0FBRyxnQkFBZ0IsS0FBSyxpQkFBaUI7QUFDckUsZ0JBQU0sWUFBVyxvREFBZSxXQUFmLG1CQUF3QjtBQUN6QyxjQUFJLFVBQVU7QUFDWixrQkFBTSxTQUFTLFNBQVM7QUFDeEIsZ0JBQUksV0FBVyxZQUFZLFdBQVcsYUFBYSxXQUFXLGVBQWU7QUFDM0UsaUNBQW1CO0FBQ25CLHFDQUF1QjtBQUFBLFlBQ3pCLFdBQVcsV0FBVyxhQUFhLFdBQVcsVUFBVTtBQUN0RCxpQ0FBbUI7QUFDbkIscUNBQXVCO0FBQUEsWUFDekIsV0FBVyxXQUFXLGFBQWEsV0FBVyxTQUFTO0FBQ3JELGlDQUFtQjtBQUNuQixxQ0FBdUI7QUFBQSxZQUN6QixXQUFXLFdBQVcsWUFBWTtBQUNoQyxpQ0FBbUI7QUFDbkIscUNBQXVCO0FBQUEsWUFDekIsT0FBTztBQUNMLGlDQUFtQjtBQUNuQixxQ0FBdUI7QUFBQSxZQUN6QjtBQUNBLDRCQUFpQixTQUFTLE9BQThCO0FBQ3hELGtDQUF1QixTQUFTLGVBQXVDLFNBQVMsY0FBcUM7QUFBQSxVQUN2SDtBQUFBLFFBQ0YsU0FBUyxPQUFnQjtBQUN2QixrQkFBUSxLQUFLLGlEQUFpRCxLQUFLO0FBQUEsUUFDckU7QUFBQSxNQUNGO0FBRUEsV0FBSyxXQUFXLEtBQUssRUFBRSxJQUFJO0FBQUEsUUFDekIsU0FBUztBQUFBLFFBQ1QsY0FBYSwwQ0FBVSxZQUFWLFlBQXFCO0FBQUEsUUFDbEMsZUFBYywwQ0FBVSxhQUFWLFlBQXNCO0FBQUEsUUFDcEMsZ0JBQWdCO0FBQUEsUUFDaEIsb0JBQW9CO0FBQUEsUUFDcEIsYUFBYTtBQUFBLFFBQ2IsbUJBQW1CO0FBQUEsUUFDbkIsWUFBVyxrREFBYyxRQUFkLFlBQXFCO0FBQUEsUUFDaEMsZ0JBQWUsa0RBQWMsWUFBZCxZQUF5QjtBQUFBLFFBQ3hDLGFBQVksa0RBQWMsU0FBZCxZQUFzQjtBQUFBLFFBQ2xDLFlBQVcsb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFBQSxRQUNsQyxPQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0YsU0FBUyxLQUFjO0FBQ3JCLFdBQUssV0FBVyxLQUFLLEVBQUUsSUFBSTtBQUFBLFFBQ3pCLElBQUksVUFBSyxXQUFXLEtBQUssRUFBRSxNQUF2QixZQUE0QixDQUFDO0FBQUEsUUFDakMsU0FBUztBQUFBLFFBQ1QsT0FBUSxlQUFlLFFBQVEsSUFBSSxVQUFVO0FBQUEsTUFDL0M7QUFBQSxJQUNGO0FBRUEsU0FBSyxZQUFZO0FBQUEsRUFDbkI7QUFBQSxFQUVBLGtCQUF3QjtBQXBkMUI7QUFxZEksVUFBTSxVQUFZLEtBQUssSUFBNEM7QUFHbkUsNkNBQVMsU0FBVDtBQUNBLDZDQUFTLGdCQUFULGlDQUF1QixLQUFLLFNBQVM7QUFBQSxFQUN2QztBQUFBLEVBRVEsY0FBYyxLQUFjLFVBQTBCO0FBQzVELFVBQU0sVUFBVSxlQUFlLFFBQVEsSUFBSSxVQUFVO0FBQ3JELFdBQU8sV0FBVztBQUFBLEVBQ3BCO0FBQ0Y7QUFVQSxTQUFTLGdCQUNQLFFBQ2lDO0FBNWVuQztBQTZlRSxRQUFNLFdBQThCO0FBQUEsSUFDbEMsR0FBRztBQUFBLElBQ0gsT0FBTyxDQUFDO0FBQUEsSUFDUixRQUFRLEVBQUUsR0FBRyx3QkFBd0I7QUFBQSxFQUN2QztBQUNBLE1BQUksQ0FBQztBQUFRLFdBQU8sRUFBRSxTQUFTO0FBRS9CLFFBQU0sTUFBTSxDQUFDLE1BQXdCLE9BQU8sTUFBTSxXQUFXLElBQUk7QUFDakUsV0FBUyxjQUFjLElBQUksT0FBTyxXQUFXO0FBQzdDLFdBQVMsb0JBQW9CLElBQUksT0FBTyxpQkFBaUI7QUFDekQsV0FBUyxtQkFBbUIsSUFBSSxPQUFPLGdCQUFnQixLQUFLO0FBQzVELFdBQVMsMEJBQTBCLE9BQU8sNEJBQTRCO0FBQ3RFLFdBQVMsZ0JBQWdCLE9BQU8sa0JBQWtCO0FBQ2xELFdBQVMsZUFBZSxJQUFJLE9BQU8sWUFBWTtBQUMvQyxXQUFTLGVBQWUsT0FBTyxpQkFBaUI7QUFDaEQsV0FBUyxnQkFBZ0IsT0FBTyxrQkFBa0I7QUFDbEQsUUFBTSxjQUFjLE9BQU8sT0FBTyxXQUFXLFlBQVksT0FBTyxXQUFXLE9BQ3ZFLE9BQU8sU0FDUDtBQUNKLFdBQVMsU0FBUztBQUFBLElBQ2hCLEdBQUc7QUFBQSxJQUNILEdBQUksb0NBQWUsQ0FBQztBQUFBLElBQ3BCLGFBQVksZ0RBQWEsZUFBYixZQUEyQjtBQUFBLElBQ3ZDLGlCQUFnQixnREFBYSxtQkFBYixZQUErQjtBQUFBLElBQy9DLGlCQUFnQixnREFBYSxtQkFBYixZQUErQjtBQUFBLElBQy9DLGVBQWMsZ0RBQWEsaUJBQWIsWUFBNkI7QUFBQSxFQUM3QztBQUVBLE1BQUksT0FBTyxnQkFBZ0I7QUFDekIsYUFBUyxjQUFjLGNBQWMsSUFBSSxPQUFPLGNBQWMsQ0FBQztBQUFBLEVBQ2pFO0FBQ0EsTUFBSSxPQUFPLG9CQUFvQjtBQUM3QixhQUFTLGtCQUFrQixjQUFjLElBQUksT0FBTyxrQkFBa0IsQ0FBQztBQUFBLEVBQ3pFO0FBRUEsTUFBSSxNQUFNLFFBQVEsT0FBTyxLQUFLLEdBQUc7QUFDL0IsYUFBUyxRQUFTLE9BQU8sTUFBb0MsSUFBSSxDQUFDLE1BQU07QUFFdEUsVUFBSSxlQUFlLEVBQUU7QUFDckIsVUFBSSxlQUFlLEVBQUU7QUFFckIsVUFBSSxpQkFBaUIsWUFBWSxpQkFBaUIsUUFBUTtBQUN4RCx1QkFBZTtBQUNmLGNBQU0sYUFBYSxFQUFFO0FBQ3JCLFlBQUksY0FBYyxDQUFDLGNBQWM7QUFDL0IseUJBQWUsQ0FBQyxVQUFVO0FBQUEsUUFDNUI7QUFBQSxNQUNGO0FBR0EsVUFBSSxrQkFBa0IsRUFBRTtBQUN4QixVQUFJLENBQUMsaUJBQWlCO0FBQ3BCLGNBQU0sZUFBZSxFQUFFO0FBQ3ZCLDBCQUFrQixpQkFBaUIsZUFBZSxlQUFlO0FBQUEsTUFDbkU7QUFFQSxZQUFNLEVBQUUsY0FBYyxLQUFLLEdBQUcsS0FBSyxJQUFJO0FBR3ZDLGFBQU8sa0JBQWtCO0FBQUEsUUFDdkIsR0FBSTtBQUFBLFFBQ0osY0FBZSxnQkFBeUM7QUFBQSxRQUN4RCxjQUFjLGdCQUFnQixDQUFDO0FBQUEsUUFDL0I7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNIO0FBR0EsTUFBSSxDQUFDLFNBQVMsTUFBTSxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sU0FBUyxZQUFZLEdBQUc7QUFDL0QsYUFBUyxnQkFBZSxvQkFBUyxNQUFNLENBQUMsTUFBaEIsbUJBQW1CLE9BQW5CLFlBQXlCO0FBQUEsRUFDbkQ7QUFFQSxTQUFPLEVBQUUsU0FBUztBQUNwQjsiLAogICJuYW1lcyI6IFsibm9kZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtYXgiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAibW9kdWxlIiwgIm1vZHVsZSIsICJpbmRleCIsICJtb2R1bGUiLCAicmVxdWlyZV9jb25zdGFudHMiLCAibW9kdWxlIiwgInJlcXVpcmVfdXRpbHMiLCAibW9kdWxlIiwgInJlcXVpcmVfcGFyc2UiLCAibW9kdWxlIiwgImJyYW5jaCIsICJvcHRzIiwgInZhbHVlIiwgInJlc3QiLCAic291cmNlIiwgIm1vZHVsZSIsICJpc01hdGNoIiwgInN0YXRlIiwgInJlcXVpcmVfcGljb21hdGNoIiwgIm1vZHVsZSIsICJtb2R1bGUiLCAiaXNNYXRjaCIsICJpbXBvcnRfb2JzaWRpYW4iLCAiX2EiLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgIkxFQURJTkdfQkxPQ0tfUkUiLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJDTE9VREZMQVJFX0FQUF9VUkwiLCAiQ0xPVURGTEFSRV9UT0tFTl9VUkwiLCAiaW1wb3J0X29ic2lkaWFuIiwgIl9hIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJpbXBvcnRfb2JzaWRpYW4iLCAiQ0xPVURGTEFSRV9BUFBfVVJMIiwgIl9hIl0KfQo=
