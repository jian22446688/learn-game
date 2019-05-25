
// 获取最小值到最大值之前的整数随机数
module.exports.getRandomNum = function(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return(Min + Math.round(Rand * Range));
}

module.exports.randomsort = function (a, b) {
  return Math.random()>.5 ? -1 : 1; //通过随机产生0到1的数，然后判断是否大于0.5从而影响排序，产生随机性的效果。
}