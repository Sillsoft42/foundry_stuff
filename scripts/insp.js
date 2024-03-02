Hooks.once("init", () => {
	console.warn("inspiration script");
});

function check_for_inspiration (roll) {
	roll.dice[0].results.forEach(function (item) {
		console.log(item);
		if (item.active === true && item.result === 1) {
			let text = "<i style='color:green; font-weight: bold; font-size: 150%'>"+"You've rolled a one.  Gain inspiration"+"</i>";
			let chatData = {
				speaker: ChatMessage.getSpeaker(),
				content: text
			};
			ChatMessage.create(chatData);
		}
	});
}

Hooks.on("dnd5e.rollAttack", async (item, roll) => {
	console.log(roll.dice[0].results);
	check_for_inspiration(roll);
})

Hooks.on("dnd5e.rollAbilitySave", async (actor, roll, abilityId) => {
	console.log(roll.dice[0].results);
	check_for_inspiration(roll);
})
