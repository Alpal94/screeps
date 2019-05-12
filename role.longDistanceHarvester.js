var roleUpgrader = require('role.upgrader');

module.exports = {
	run: function (creep, home) {
		var targetRoom = 'E47S7';
		var disableLink = false;
		if(creep.memory.sId == 1) targetRoom = 'E47S7';
		if(creep.memory.sId == 3) { targetRoom = 'E47S7'; disableLink = true; }
		if(creep.memory.sId == 4) { targetRoom = 'E48S6'; console.log(creep.pos + " HERE LONG"); }
		if(creep.memory.memory && creep.memory.memory.target) { targetRoom = creep.memory.memory.target; }

		var homeRoom = creep.memory.home;

		if(creep.memory.working == true && creep.carry.energy == 0) {
		       creep.memory.working = false;
		}
		else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
			creep.memory.working = true;
		}	
		var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if (target != undefined) {
			console.log("kill");
			console.log(creep.attack(target));
		} else {
		}

		if(creep.memory.working == true ) {
			console.log("long working");
		    if(creep.room.name == homeRoom) {
			var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (s) => s.energy < s.energyCapacity && s.structureType != STRUCTURE_TOWER && (s.structureType != STRUCTURE_LINK || !disableLink)
			});
			var test;
			if (structure != undefined) {
				if(test = creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(structure);
				}
			} else {
				var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (s) => s.structureType === STRUCTURE_STORAGE
				});
				if (structure != undefined) {
					if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(structure);
					}
				}
			}
		    } else  {
			var pos = new RoomPosition(5, 8, homeRoom); 
			if(creep.memory.sId == 1 || creep.memory.sId == 3) {
				console.log(creep.moveTo(pos));
			} else {
			    var exit = creep.room.findExitTo(homeRoom);
			    creep.moveTo(creep.pos.findClosestByRange(exit));
			}
		    }

		}
		else {
			if(creep.room.name == targetRoom ) {
				var containers = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) =>
					(structure.structureType === STRUCTURE_CONTAINER)  && (structure.store[RESOURCE_ENERGY] > 0) 
				});
				var source = creep.pos.findClosestByPath(containers);
				if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				}
				if (source === null || source === undefined) {
					console.log("DANGER");
					var source = creep.pos.findClosestByPath(FIND_SOURCES, {
			        		filter: (s) => s.energy > 0
		        		});
					if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
						creep.moveTo(source);
					}
				}
			} else {
				       var pos = new RoomPosition(13, 35, targetRoom); 
				    var exit; 

					if(creep.memory.sId == 4) { console.log(creep.room.name + " HOME " + homeRoom + "LONG TO LONG"); }
				    creep.moveTo(pos);
			}



			/*var dropenergy = creep.room.find(FIND_DROPPED_ENERGY, {
				filter: (d) => d.amount >= 50
			});
			if (dropenergy.length) {
				var pickupDropped = creep.pickup(dropenergy[0]);
				console.log(pickupDropped);
			} else 
			if (dropenergy.length > 0 && (pickupDropped == ERR_NOT_IN_RANGE) ) {
				creep.moveTo(dropenergy[0]);
			}*/
		}
	}

}
