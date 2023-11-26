Hooks.once("init", () => {
	CONFIG.DND5E.armorClasses.intergratedprotection = {
		label: "Intergrated Protection",
		formula: "@attributes.ac.armor + @attributes.ac.dex + 1"
	};
	CONFIG.DND5E.languages.exotic.children.velf = "Valenar Elf";
	CONFIG.DND5E.languages.exotic.children.drow = "Drow";
});
