var roleUpgrader = require('role.upgrader');
var roleHarvester = require('role.harvester');
var roleRepairer = require('role.repairer');

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
		if(creep.memory.sId == 2) {
			var targetRoom = 'E47S7';
			if (creep.room.name != targetRoom) {
				if(creep.pos.x > 1 && creep.room.name == creep.memory.home) {
					var pos = new RoomPosition(1, 34, creep.memory.home); 
					creep.moveTo(pos);
					return;
				}
			    // find exit to target room
			    var exit = creep.room.findExitTo(targetRoom);
			    // move to exit
			    creep.moveTo(creep.pos.findClosestByRange(exit));
			    return;
			}
		}
		if(creep.memory.sId == 3) {
			var targetRoom = 'E49S7';
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

		if(creep.memory.working == true) {
			var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			if (constructionSite != undefined) {
				if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
					creep.moveTo(constructionSite);	
				} else {
				}
			} else {
				if (creep.memory.sId == 1) {
					roleHarvester.run(creep);					
				} else if(creep.memory.sId == 3) {
					roleRepairer.run(creep);
				} else {
					roleUpgrader.run(creep);					
										
				}
			}
		}
		else {
			/*var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}*/
		     	var containers = creep.room.find(FIND_STRUCTURES, {
		        filter: (structure) =>
			        (structure.structureType == STRUCTURE_CONTAINER)  && (structure.store[RESOURCE_ENERGY] > 200) ||
			        (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 200)
			});
			var source = creep.pos.findClosestByPath(containers);
			if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			} else {
			}
			if (source === null || source === undefined) {
				var source = creep.pos.findClosestByPath(FIND_SOURCES, {
			        	filter: (s) => s.energy > 0
		        	});
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				}
			}
		}
	}
}
