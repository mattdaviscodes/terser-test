const defaultInput = `!function() {
  /**
   * Adds two numbers
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  function add(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }
  
  const math = {
    add,
    sub,
  };

  console.log(math.add(1, 2));
}();`;

const sideEffects = `!function () {
  const MyComponent = React.forwardRef(
    function MyComponent() {
      return 'MyComponent';
    }
  );
}();`;

const deadCodeConditionals = `!function() {
  if (false) {
    console.log('This branch can never be reached!');
  }

  if (true) {
    console.log('This branch will always be reached!');
  }
}();`;

const deadCodeFunctions = `!function() {
  function add(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }

  console.log(add(1, 2));
}();`;

const webpackBootstrap = `!(function(modules) {
  const installedModules = {};

  function __custom_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    const module = {
      exports: {},
    };

    modules[moduleId].call(
      undefined,
      module,
      module.exports,
      __custom_require__
    );

    installedModules[moduleId] = module;

    return module.exports;
  }

  __custom_require__.d = function(
    exports,
    name,
    getter
  ) {
    if (!exports[name]) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
    }
  };

  return __custom_require__(0);
})([
  /* 0 */
  function(module, exports, __custom_require__) {
    const { add } = __custom_require__(1);
    console.log(add(1, 2));
  },

  /* 1 */
  function(module, exports, __custom_require__) {
    function add(a, b) {
      return a + b;
    }

    function sub(a, b) {
      return a - b;
    }

    exports.add = add;
    exports.sub = sub;

    // __custom_require__.d(exports, 'add', function() {
    //   return add;
    // });
  },
]);
`;

export const snippets = {
  default: defaultInput,
  'dead code conditionals': deadCodeConditionals,
  'dead code functions': deadCodeFunctions,
  'tree shaking': webpackBootstrap,
  'side effects': sideEffects,
};
