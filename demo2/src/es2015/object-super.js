let obj = {
  say() {
    return 'Hello';
  },
};

let obj2 = {
  say() {
    return super.say() + 'World!';
  },
};
