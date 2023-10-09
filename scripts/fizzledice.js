Hooks.once("init", () => {
	CONFIG.DND5E.spellProgression.myartificer = "A5E Artificer";
	console.log("hello world");
});

Hooks.on("dnd5e.preItemUsageConsumption", async (item, consume, options, update) => {
	if (item.type != 'spell')
		return [item, consume, options];

	if (item.system.preparation.mode === 'atwill')
		return [item, consume, options];

	const spellLvl = item.system.level;

	if (spellLvl < 1) 
		return [item, consume, options];

	const actor = item.actor;
	let adata = actor.getRollData();
	if (Object.keys(adata.classes).length != 1)
		return [item, consume, options];

	if (adata.classes['a5e-artificer'] === undefined)
		return [item, consume, options];

	let fd = new Roll("@scale.a5e-artificer.fizzle-dice", adata);

	consume.consumeSpellLevel = false;
	consume.consumeSpellSlot = false;
	await fd.evaluate();
	game.dice3d.showForRoll(fd);
	let style = "<i>";
	let text = "As "+actor.name+" fires off the spell, ";
	if (fd.total <= spellLvl) {
		style = "<i style='color:red;'>";
		text += "the pistol jams and can no longer be used";
	} else {
		style = "<i style='color:green;'>";
		text += "the pistol sparks but continues to function";
	}
	let chatData = {
		speaker: ChatMessage.getSpeaker(),
		content: style+text+"</i>"
	};
	ChatMessage.create(chatData);

	return [item, consume, options];
})
