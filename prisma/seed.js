const {role} = require('./db');

async function seed (){
	const roleMsg = await role.createMany({
		data:[
			{
				role: "client"
			},
			{
				role: "kedai"
			}
		]
	});
	return {roleMsg};
}

seed().then((r)=>console.log(r));