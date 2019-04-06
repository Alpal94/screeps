var roleRepairer = require("role.repairer");

module.exports = {
	run: function (creep) {
	    //console.log("I WALL REPAIRER am alive")
		if(creep.memory.working == true && creep.carry.energy == 0) {
		       creep.memory.working = false;
		}
		else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
			creep.memory.working = true;
		}	

		if(creep.memory.working == true) {
			var walls = creep.room.find(FIND_STRUCTURES, {
				filter: (s) => s.structureType == STRUCTURE_RAMPART
			});

			var target = undefined;

			for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001) {
				target = creep.pos.findClosestByPath(walls, {
					filter: (w) => w.hits / w.hitsMax < percentage
				});

				if (target != undefined) {
					break;
				}
			}

			if(target != undefined) {
				if(creep.repair(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				} else {  } 
			}
			else {
				roleRepairer.run(creep);	
			}
		}
		else {
		     	var containers = creep.room.find(FIND_STRUCTURES, {
		        filter: (structure) =>
			        (structure.structureType == STRUCTURE_CONTAINER)  && (structure.store[RESOURCE_ENERGY] > 0)
			});
			var source = creep.pos.findClosestByPath(containers);
			if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			} else {
			}
			if (source === null || source === undefined) {
				var source = creep.pos.findClosestByPath(FIND_SOURCES);
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				}
			}
		}
	}
}
