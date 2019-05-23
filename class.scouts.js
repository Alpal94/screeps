var CreepControl = require('creepControlHandler');
var Scout = require('sub.scout');

class Scouts extends CreepControl {
	constructor(spawn, home, role, number, creepSoftware, body, groupID) {
		super();
		this.init(spawn, home, role, number, creepSoftware, body);
		this.body = this.scoutBody();
		this.groupID = groupID;
		this.creeps = this.setUpCreeps((name) => {
			const _scout = new Scout(name, groupID);
			return _scout;
		});
	}

	/*
	 * Override the creep controllers functions for executeCreeps
	 */
	run() {
		this.executeCreeps();
		this.manageCreeps();
	}

	manageCreeps() {
		var numberOfLeaders =  _.sum(Game.creeps, (c) => c.memory.role == this.role && c.memory.home == this.home && c.memory.memory.leader == true && c.memory.memory.groupID == this.groupID);
		if(numberOfLeaders < 1) {
			for(var id = 0; id < 9; id++) {
				if(id === 4) continue;
				var noCreeps =  _.sum(Game.creeps, (c) => c.memory.role == this.role && c.memory.home == this.home && c.memory.memory.attackerID == id && c.memory.memory.groupID == this.groupID);
				if(noCreeps < 1) {
					this.spawnNewCreep(this.scoutBody(id), { attackerID: id, groupID: this.groupID });
				}
			}
			this.spawnNewCreep(this.leaderBody(), { leader: true, attackerID: -1, groupID: this.groupID });
		}
	}

	scoutBody(id) {
		var body = [];
		body.push(MOVE);
		return body;
	}
	leaderBody() {
		var body = [];
		body.push(MOVE);
		return body;
	}

	executeCreeps() {
		var scouts = this.creeps;
		for(var i = 0; i < scouts.length; i++) {
			const _scout = scouts[i];
			var name = _scout.getName();
			let creep = Game.creeps[name];
			if(creep) {
				_scout.run();
			} else {
				this.creeps.splice(i, 1);
			}
		}
	}
}

module.exports = Scouts;
