Hooks.once("init", () => {
	console.log("rage script");
});

function rage_hp_check (combat, update) {
	let rager = combat.nextCombatant.actor;
	console.log(rager);
	let adata = rager.getRollData();
	if (adata.classes.a5eberserker === undefined) {
		return;
	}
	rager.appliedEffects.forEach((effect) => {
		if (effect.name === 'Rage') {
			let maxrhp = adata.classes.a5eberserker.levels*5;
			let addrhp = Math.max(0,rager.system.scale.a5eberserker['rage-hit-points'].value);
			let thp = Math.max(0,adata.attributes.hp.temp);
			let text = "<i style='color:green;'>"+rager.name+" suddenly feels healther</i>";
			let stats = "Current temp hp="+thp+"Max rage temp hp="+maxrhp+"Increase by="+addrhp;
			let chatData = {
				content: text+"<br>"+stats
			};
			ChatMessage.create(chatData);
			rager.update({"data.attributes.hp.temp" : Math.min(maxrhp,addrhp+thp)});
		}
	});
}

Hooks.on("combatTurn", (combat, update, options) => {
	console.log('combat turn');
	rage_hp_check(combat, update);
});

Hooks.on("combatRound", (combat, update, options) => {
	console.log('combat round');
	rage_hp_check(combat, update);
});
