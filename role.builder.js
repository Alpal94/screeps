var roleUpgrader = require('role.upgrader');

module.exports = {
	run: function (creep) {
		if(creep.memory.sId == 1) {
			var targetRoom = 'E48S6';
			if (creep.room.name != targetRoom) {
			    // find exit to target room
			    var exit = creep.room.findExitTo(targetRoom);
			    // move to exit
			    creep.moveTo(creep.pos.findClosestByRange(exit));
			    return;
			}
		}
		if(creep.memory.working == true && creep.carry.energy == 0) {
		       creep.memory.working = false;
		}
		else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
			creep.memory.working = true;

		}	
		console.log(creep.pos);

		if(creep.memory.working == true) {
			var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			if (constructionSite != undefined) {
				if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
					creep.moveTo(constructionSite);	
				} else {
				}
			} else {
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
			if (source === null || source === undefined) {
				var source = creep.pos.findClosestByPath(FIND_SOURCES);
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				}
			}
		}
	}
}
