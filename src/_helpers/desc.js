module.exports = function (content) {
	let t = content.split(" ");
	let str = '';
	for (let i=0; i<50; i++) {
		str += t[i]+' ';
	}
	console.log(str)
  return str;
}