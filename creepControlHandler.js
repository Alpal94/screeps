class CreepControl {
	constructor(spawn, home, role, number, creepSoftware, body) {
		console.log("Creep control initialising .....");
		this.home = home;
		this.spawn = spawn;
		this.role = role;
		this.number = number;
		this.creeps = this.setUpCreeps((name) => { console.log(name); return name; } );
		this.creepSoftware = creepSoftware;
		this.body = body;
		this.memory = {};
		console.log("Initialisation complete");
	}

	run() {
		this.executeCreeps();
		this.screepsHealth();
	}

	executeCreeps() {
		var creeps = this.creeps;
		for(var i = 0; i < creeps.length; i++) {
			var name = creeps[i];
			let creep = Game.creeps[name];
			if(creep) {
				this.creepSoftware.run(creep);
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
		if(this.body === undefined || this.body === []) {
			for (let i = 0; i < numberOfParts; i++) {
				body.push(WORK);
			}
			for (let i = 0; i < numberOfParts; i++) {
				body.push(CARRY);
			}
			for (let i = 0; i < numberOfParts; i++) {
				body.push(MOVE);
			}
		} else {
			body = this.body;
		}

		var creepName = this.role + Game.time;
		var creepResult = this.spawn.spawnCreep(body, creepName, { memory: {role: this.role, working: false , sId: 0 , home: this.home, memory: this.memory}});
		if(creepResult === OK) {
			this.creeps.push(creepName);
			console.log("NEW CREEP SPAWNED");
		}
	}

	setUpCreeps(operation) {
		let creeps = [];
		for(let name in Game.creeps) {
			let creep = Game.creeps[name];
			if(name !== undefined && creep.memory.role == this.role && creep.memory.home == this.home) {
				creeps.push(operation(name));
			}
			
		}
		return creeps;
	}
}

module.exports = CreepControl;
