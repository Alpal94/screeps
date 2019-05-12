module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
	var homeRoom = 'E48S7';
	var targetRoom = 'E47S8';
	//var targetRoom2 = 'E44S8';
	var targetRoom2 = 'E47S7';



	switch(creep.memory.type) {
		case 'healer':
			const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
				filter: function(object) {
					return object.hits < object.hitsMax || object.memory.type == 'brute';
				}
			});
			if(target) {
				creep.heal(target);
				creep.moveTo(target);
			} else {
				// if in target room
				if (creep.room.name != targetRoom) {
					if(creep.pos.x > 1 && creep.room.name == homeRoom) {
						var pos = new RoomPosition(1, 34, homeRoom); 
						creep.moveTo(pos);
						return;
					}
				    // find exit to target room
				    var exit = creep.room.findExitTo(targetRoom);
				    // move to exit
				    creep.moveTo(creep.pos.findClosestByRange(exit));
				}
				else {
					var pos = new RoomPosition(3, 15, targetRoom); 
					creep.moveTo(pos);
				}
			}

		break;
			case 'brute2':
				executeKillEverything(homeRoom, targetRoom2, creep);
				break;
			case 'brute':
			default:
				executeKillEverything2(homeRoom, targetRoom, creep);
				break;
		}




	    }


		 
	};


	    function executeBrute(homeRoom, targetRoom, creep)  {
		const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(target) {
			creep.attack(target);
			if(creep.attack(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
		} else {
			// if in target room
			if (creep.room.name != targetRoom) {
				if(creep.pos.x > 1 && creep.room.name == homeRoom) {
					var pos = new RoomPosition(1, 34, homeRoom); 
					creep.moveTo(pos);
					return;
				}
			    // find exit to target room
			    var exit = creep.room.findExitTo(targetRoom);
			    // move to exit
			    creep.moveTo(creep.pos.findClosestByRange(exit));
			}
			else {
				var pos = new RoomPosition(30, 30, targetRoom); 
				creep.moveTo(pos);
			}
		}
    }

	    function executeKillEverything(homeRoom, targetRoom, creep)  {
		if(creep.room.name === 'E46S7' &&  targetRoom !== 'E46S7') {
			targetRoom = 'E46S8';
		}
		/*if(creep.room.name === 'E45S7' &&  targetRoom !== 'E45S7') {
			targetRoom = 'E45S8';
		}*/
		if(creep.room.name === 'E45S8' &&  targetRoom !== 'E45S8') {
			targetRoom = 'E44S8';
		}
		const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(navigateRoomE44S8(creep)) {
			if(target) {
				if(creep.attack(target) == ERR_NOT_IN_RANGE) {
					if(target.room.name === targetRoom) creep.moveTo(target);
					else {
						var pos = new RoomPosition(2, 14, targetRoom); 
						creep.moveTo(pos);
					}
				}
			} else {
				// if in target room
				if (creep.room.name != targetRoom) {
					if(creep.pos.x > 1 && creep.room.name == homeRoom) {
						var pos = new RoomPosition(1, 34, homeRoom); 
						creep.moveTo(pos);
						return;
					}
					var pos = new RoomPosition(40, 4, targetRoom); 
					creep.moveTo(pos);
				}
				else {
					if(creep.memory.type === 'brute') {
						var pos = new RoomPosition(2, 14, targetRoom); 
						creep.moveTo(pos);
					} else {
						var pos = new RoomPosition(2, 14, targetRoom); 
						creep.moveTo(pos);
					}
				}
			}
		}
    }

	function navigateRoomE44S8(creep) {
		var room = 'E44S8';
		if(creep.room.name !== room) { return true; }

		if(creep.pos.x > 25 && creep.pos.y < 45) {
			var pos = new RoomPosition(24, 46, room); 
			creep.moveTo(pos);
			return false;
		} else if(creep.pos.y > 44) {
			var pos = new RoomPosition(9, 40, room); 
			creep.moveTo(pos);
			return false;
		} else { 
			return true;
		}
	}
	    function executeKillEverything2(homeRoom, targetRoom, creep)  {
		const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if(target) {
			if(creep.attack(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
		} else {
			// if in target room
			if (creep.room.name == 'E48S8' || creep.room.name == 'E47S8') {
				var pos = new RoomPosition(31, 10, 'E48S9'); 
				creep.moveTo(pos);
			} else if (creep.room.name == 'E48S9' && creep.pos.y < 20) {
				var pos = new RoomPosition(31, 25, 'E48S9'); 
				creep.moveTo(pos);
			} else  if (creep.room.name != targetRoom) {
				var pos = new RoomPosition(31, 2, targetRoom); 
				creep.moveTo(pos);
			} else {
				if(creep.memory.type === 'brute') {
					var pos = new RoomPosition(22, 18, targetRoom); 
					creep.moveTo(pos);
				} else {
					var pos = new RoomPosition(31, 2, targetRoom); 
					creep.moveTo(pos);
				}
			}
		}
    }
