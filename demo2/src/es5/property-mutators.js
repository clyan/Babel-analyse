// @babel/plugin-transform-property-mutators
const foo = {
  get bar() {
    return this._bar;
  },
  set bar(value) {
    this._bar = value;
  },
};
