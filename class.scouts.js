var CreepControl = require('creepControlHandler');
var Scout = require('sub.scout.js');

class Scouts extends CreepControl {
	scoutSetup() {
		this.body = this.scoutBody();
		this.scouts = setUpCreeps((name) => {
			const _scout = new Scout(name);
			return _scout;
		});
	}

	/*
	 * Override the creep controllers functions for executeCreeps
	 */
	run() {
		this.executeCreeps();
		this.screepsHealth();
	}

	scoutBody() {
		var body = [];
		return body.push(MOVE);
	}

	executeCreeps() {
		var scouts = this.scouts;
		for(var i = 0; i < scouts.length; i++) {
			const _scout = scouts[i];
			var name = _scout.getName();
			let creep = Game.creeps[name];
			if(creep) {
				_scout.run();
			} else {
				this.scouts.splice(i, 1);
			}
		}
	}
}

module.exports = Scouts;
