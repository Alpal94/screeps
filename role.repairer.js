var roleUpgrader = require('role.upgrader');

module.exports = {
	run: function (creep) {
		if(creep.memory.working == true && creep.carry.energy == 0) {
		       creep.memory.working = false;
		}
		else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
			creep.memory.working = true;
		}	

		if(creep.memory.working == true) {
			var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL  && s.structureType != STRUCTURE_RAMPART
			});

			if(structure != undefined) {
				if(creep.repair(structure) == ERR_NOT_IN_RANGE) {
					creep.moveTo(structure);
				} 
			}
			else {
				roleUpgrader.run(creep);	
			}
		}
		else {
				/*var source = creep.pos.findClosestByPath(FIND_SOURCES);
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				}*/
		     	var containers = creep.room.find(FIND_STRUCTURES, {
		        filter: (structure) =>
			        (structure.structureType == STRUCTURE_CONTAINER)  && (structure.store[RESOURCE_ENERGY] > 0)
			});
			var source = creep.pos.findClosestByPath(containers);
			if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			} else {
			}
			if (source === null) {
				var source = creep.pos.findClosestByPath(FIND_SOURCES);
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				}
			}
		}
	}
}
