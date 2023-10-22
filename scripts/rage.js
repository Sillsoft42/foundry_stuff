Hooks.once("init", () => {
	console.log("rage script");
});

function rage_hp_check (combat, update) {
	let actor = combat.nextCombatant.actor;
	let adata = actor.getRollData();
	if (adata.classes.a5eberserker === undefined) {
		return;
	}
	actor.appliedEffects.forEach((effect) => {
		if (effect.name === 'Rage') {
			let maxrhp = adata.classes.a5eberserker.levels*5;
			let addrhp = Math.max(0,actor.system.scale.a5eberserker['rage-hit-points'].value);
			let thp = Math.max(0,adata.attributes.hp.temp);
			actor.update({"data.attributes.hp.temp" : Math.min(maxrhp,addrhp+thp)});
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
