Hooks.once("init", () => {
	CONFIG.DND5E.armorClasses.intergratedprotection = {
		label: "Intergrated Protection",
		formula: "@attributes.ac.armor + @attributes.ac.dex + 1"
	};
});

