class Scout {
	constructor(name, groupID) {
		this.name = name;
		this.creep = Game.creeps[name];
		this.groupID = groupID;
		this.target = new RoomPosition(8, 17, 'E47S7'); 
		this.directionX = 1;
		this.directionY = 0;
		//console.log(this.creep.pos);
	}

	run(neighbors) {
		var creep = this.creep;
		if(creep.memory.memory.leader) {
			creep.moveTo(this.target);
		} else {
			var leader = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
				filter: function(object) {
					return creep.memory.memory.groupID === groupID && creep.memory.memory.leader
				}
			});
			var targetFormationPos = leader.pos;

			let id = creep.memory.memory.attackerID;
			var leftRight = id % 3 - 1;
			var topDown = Math.floor(id / 3) % 3 - 1;
			if(this.directionX && !this.directionY) {
				targetFormationPos.x += topDown;
				targetFormationPos.y += leftRight;
			} else {
				targetFormationPos.x += leftRight;
				targetFormationPos.y += topDown;
			}
			creep.moveTo(targetFormationPos);

			if(creep.pos === targetFormationPos) {
				creep.moveTo(this.target);
			}
			
		}
	}

	distance(scout, neighbor) {
		return Math.pow(  (scout.x - neighbor.x) * (scout.x - neighbor.x) + (scout.y - neighbor.y) * (scout.y - neighbor.y), 0.5  );
	}

	getName() {
		return this.name;
	}
}

module.exports = Scout;
