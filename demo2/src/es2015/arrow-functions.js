var name = 'bbb';
var a = () => {
  this.name = 'aaa';
  console.log(this.name);
};
a();
