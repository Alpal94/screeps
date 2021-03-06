module.exports = function() {
	StructureSpawn.prototype.createCustomCreep = 
		function(energy, roleName, id, home, memory) {
			switch(roleName) {
				case 'miner':
				case 'miner2':
				case 'miner_resources':
					var numberOfParts = Math.floor( energy / 200 );
					var body = [];
					for (let i = 0; i < 3; i++) {
						body.push(WORK);
					}
					for (let i = 0; i < 1; i++) {
						body.push(MOVE);
					}
					break;
				case 'claimer':
					var body = [];
					body.push(MOVE);
					body.push(MOVE);
					body.push(MOVE);
					body.push(CLAIM);
					break;
				break;
				case 'harvester':

					var numberOfParts = Math.floor( energy / 200 );
					var body = [];
					for (let i = 0; i < 1; i++) {
						body.push(WORK);
					}
					for (let i = 0; i < numberOfParts; i++) {
						body.push(CARRY);
					}
					for (let i = 0; i < numberOfParts; i++) {
						body.push(MOVE);
					}
					break;
				break;
				case 'mineral_harvester':
					var numberOfParts = Math.floor( energy / 200 );
					var body = [];
					for (let i = 0; i < 1; i++) {
						body.push(WORK);
					}
					for (let i = 0; i < numberOfParts; i++) {
						body.push(CARRY);
					}
					for (let i = 0; i < numberOfParts; i++) {
						body.push(MOVE);
					}
					break;
				break;
				case 'long_distance_harvester':
					var numberOfParts = Math.floor( energy / 200 );
					var body = [];
					if(id == 2) {
						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(WORK);
						}

						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(CARRY);
						}
						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(MOVE);
						} 
					} else {
						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(WORK);
						}
						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(CARRY);
						}
						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(MOVE);
						} 

					}
					break;
				break;
				default:
					var numberOfParts = Math.floor( energy / 200 );
					var body = [];
					for (let i = 0; i < numberOfParts; i++) {
						body.push(WORK);
					}
					for (let i = 0; i < numberOfParts; i++) {
						body.push(CARRY);
					}
					for (let i = 0; i < numberOfParts; i++) {
						body.push(MOVE);
					}
					break;
			}

			return this.createCreep(body, undefined, { role: roleName, working: false , sId: id , home: home, memory: memory});
		};
	StructureSpawn.prototype.createAttackerCreep = 
		function(energy, roleName, id, type, home) {
			switch(type) {
				case 'healer':
					var numberOfHeal = 5;
					var energyMove = 50;
					var energyHeal = 250;
					var numberOfMove = Math.floor( (energy - numberOfHeal*energyHeal) / energyMove );
					var body = [];
					for (let i = 0; i < numberOfHeal - 1; i++) {
						body.push(HEAL);
					}
					for (let i = 0; i < numberOfMove; i++) {
						body.push(MOVE);
					}
					break;
				case 'brute':
				default:
					var numberOfAttack = 10;
					var numberOfMove = 20;

					var energyMove = 50;
					var energyAttack = 80;
					var numberOfTough = 10; //Math.floor( (energy - numberOfAttack*energyAttack - numberOfMove*energyMove) / 10 );
					var body = [];
					for (let i = 0; i < numberOfTough - 1; i++) {
						body.push(TOUGH);
					}
					for (let i = 0; i < numberOfMove; i++) {
						body.push(MOVE);
					}
					for (let i = 0; i < numberOfAttack; i++) {
						body.push(ATTACK);
					}
					break;
			}
			return this.createCreep(body, undefined, { role: roleName, working: false , sId: id , type: type, home: home, memory: memory});
		};

};
