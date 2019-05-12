const mineralHarvester = new MineralHarvester();
mineralHarvester.init();


module.exports = {
	run: function (creep) {
		mineralHarvester.run(creep);
	}
}

class MineralHarvester {
	init() {
		this.upgrader = require('role.upgrader');
	}
	run(creep) {
		var containers = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) =>
			        (structure.structureType === STRUCTURE_CONTAINER)  && (structure.store[RESOURCE_KEANIUM] > 0) 
			});
		var source = creep.pos.findClosestByPath(containers);
		if((!source || creep.carry.energy > 0) && !(creep.carry.energy === 0 && _.sum(creep.carry) > 0)){
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
		    //console.log("WORKING");
			var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (s) => s.structureType === STRUCTURE_TERMINAL
			});
			if (structure != undefined) {
				if(creep.transfer(structure, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
					creep.moveTo(structure);
				}
			} else {
				var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (s) => s.structureType === STRUCTURE_STORAGE
				});
				if (structure != undefined) {
					if(creep.transfer(structure, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
						creep.moveTo(structure);
					}
				}
			}
		}
		else {

		     	var containers = creep.room.find(FIND_STRUCTURES, {
		        filter: (structure) =>
			        (structure.structureType === STRUCTURE_CONTAINER)  && (structure.store[RESOURCE_KEANIUM] > 0) 
			});
			var source = creep.pos.findClosestByPath(containers);
			if(creep.withdraw(source, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}
			if(!source){
			    this.upgrader.run(creep);
			}
		}

	}
}
