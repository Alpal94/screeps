class MineralHarvester {
	init() {
		this.upgrader = require('role.upgrader');
	}
	run(creep) {
		if (this.ticksToLive < 50 && _.sum(creep.carry) == 0) {
			let spawn = Game.spawns.TheTerminator;
			if (spawn.recycleCreep(creep) == ERR_NOT_IN_RANGE) {
				creep.moveTo(spawn, {reusePath: moveReusePath()});
			}
		}
		var containers = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) =>
			        (structure.structureType === STRUCTURE_CONTAINER)  && (structure.store[RESOURCE_UTRIUM] > 0) 
			});
		var source = creep.pos.findClosestByPath(containers);
		if(creep.carry.energy !== 0) {
			this.upgrader.run(creep);
			return;
		}

		let exploitStorage = false;
		if(creep.memory.working == true && _.sum(creep.carry) == 0) {
		       creep.memory.working = false;
		}
		else if (creep.memory.working == false && _.sum(creep.carry) == creep.carryCapacity) {
			creep.memory.working = true;
		}	

		if(creep.memory.working == true) {
			var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (s) => s.structureType === STRUCTURE_TERMINAL
			});
			if (structure != undefined) {
				if(creep.transfer(structure, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
					creep.moveTo(structure);
				}
			} else {
				var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (s) => s.structureType === STRUCTURE_STORAGE
				});
				if (structure != undefined) {
					if(creep.transfer(structure, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE) {
						creep.moveTo(structure);
					}
				}
			}
		}
		else {

			var source = creep.pos.findClosestByPath(FIND_MINERALS);
			if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}
			if(!source){
			    this.upgrader.run(creep);
			}
		}

	}
}

const mineralHarvester = new MineralHarvester();
mineralHarvester.init();

module.exports = {
	run: function (creep) {
		mineralHarvester.run(creep);
	}
}
