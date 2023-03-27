module.exports = {
	ifEq: function (a,b,context){
		if(a==b){
			return context.fn(this);
		}
		return context.inverse(this);
	},
	dumpIfExist: function (a, context){
		if(a){
			return a
		}
	}
};