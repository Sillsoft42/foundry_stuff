const effectData = {
  name: "Inspiration!",
  img: "icons/commodities/gems/gem-cut-faceted-princess-purple.webp",
  description: "<p>You have inspiration! Use it!</p>",
  duration: {seconds: 10000},
  changes: [{
    key: "system.attributes.inspiration",
    mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
    value: true,
  }],
	"flags.world.sillsoftinsp": true,
};

async function use_inspriation (actor) {
	const result = await foundry.applications.api.DialogV2.confirm({
		content: "Do you wish to use your inspriation?",
		rejectClose: false,
			window: {
				title: "Use Inspiration",
			},
		position: {
			width: 400,
			height: "auto",
		},
	});
	if (result) {
		const effect = actor.effects.find(e => e.getFlag("world", "sillsoftinsp"));
		if (effect) {
			effect.delete();
		} else {
			actor.system.attributes.inspiration = false;
		}
	}
}

function check_for_inspiration (roll, actor) {
	if (actor.type === "npc") {
		return;
	}
	roll.dice[0].results.forEach(function (item) {
		if (item.active === true && item.result === 1) {
			let text;
			if (actor.system.attributes.inspiration) {
				text = "<i style='color:green; font-weight: bold; font-size: 150%'>"+"You rolled a one but already have inspiration"+"</i>";
				use_inspriation(actor);
			} else {
				text = "<i style='color:green; font-weight: bold; font-size: 150%'>"+"You've rolled a one and gained inspiration"+"</i>";
				getDocumentClass("ActiveEffect").create(effectData,
					{parent: actor}
				);
			}
			if (text) {
				let chatData = {
					speaker: ChatMessage.getSpeaker(),
					content: text
				};
				ChatMessage.create(chatData);
			}
		}
	});
}

export function buildHooks () {
	Hooks.on("dnd5e.rollAttackV2", async (rolls, data) => {
		check_for_inspiration(rolls[0], data.subject.actor);
	});
	Hooks.on("dnd5e.rollSavingThrow", async (rolls, data) => {
		check_for_inspiration(rolls[0], data.subject);
	});
};


