var roleUpgrader = require('role.testMineralUpgrader');

class MineralHarvester {
	init(spawn, home, role, number) {
		this.home = home;
		this.spawn = spawn;
		this.role = role;
		this.number = number;
		this.creeps = this.setUpCreeps();
	}

	run() {
		console.log("HERE IS NEW CLASS WAY TO WORK");
		console.log(this.creeps);
		this.executeCreeps();
		this.screepsHealth();
	}

	executeCreeps() {
		var creeps = this.creeps;
		for(var i = 0; i < creeps.length; i++) {
			var name = creeps[i];
			let creep = Game.creeps[name];
			console.log(Game.creeps);
			if(creep) {
				console.log(roleUpgrader.run(creep));
			} else {
				this.creeps.splice(i, 1);
			}
		}
	}

	screepsHealth() {
		var numberOfCreeps =  _.sum(Game.creeps, (c) => c.memory.role == this.role && c.memory.home == this.home);
		if(numberOfCreeps < this.number) {
			this.spawnNewCreep();
		}
	}

	spawnNewCreep() {
		var energy = this.spawn.room.energyCapacityAvailable > 800 ? 800 : TheTerminator.room.energyCapacityAvailable; 
		var numberOfParts = Math.floor( energy / 200 );
		var body = [];
		for (let i = 0; i < 1; i++) {
			body.push(WORK);
		}
		for (let i = 0; i < numberOfParts; i++) {
			body.push(CARRY);
		}
		for (let i = 0; i < numberOfParts; i++) {
			body.push(MOVE);
		}

		var creepName = this.role + Game.time;
		this.creeps.push(creepName);
		console.log(creepName);
		return this.spawn.spawnCreep(body, creepName, { memory: {role: this.role, working: false , sId: 0 , home: this.home, memory: {}}});
	}

	setUpCreeps() {
		let creeps = [];
		for(let name in Game.creeps) {
			if(name !== undefined && Game.creeps[name].memory.role == this.role)
				creeps.push(name);
			
		}
		return creeps;
	}
}

module.exports = MineralHarvester;
