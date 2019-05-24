const fs = require('fs')

const qNumber = 3
const gId = '001'

// { other: '',
//   id: '4',
//   game_id: '001',
//   level: '',
//   question: 'audio/a_chair',
//   question_text: 'a chair',
//   question_type: 'audio',
//   select_type: 'image',
//   answer: 'a',
//   select_a: 'image/chair_picture_1',
//   a_text: '',
//   select_b: 'image/jacket_picture_2',
//   b_text: '',
//   select_c: 'image/eraser_picture_1',
//   c_text: '',
//   select_d: '',
//   d_text: '' }

let res = fs.readFileSync('DEMO-0522.json', 'utf8')
let data = JSON.parse(res)

let ql = getGameQues(gId)
console.log(ql.length);
let ranql = getRandomQues(ql, 6)
console.log(ranql);

function getGameQues(gid) {
  let questList = data
  let qlist = questList.filter(q => q.game_id == gid)
  return qlist
}

function getRandomQues(ql, number = 3) {
  let qarr = JSON.parse(JSON.stringify(ql))
  qarr.sort(() => Math.random()>.5 ? -1 : 1)
  qarr.length = number >= qarr.length ? qarr.length : number
  return qarr
}

// 获取最小值到最大值之前的整数随机数
function getRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return(Min + Math.round(Rand * Range));
}
