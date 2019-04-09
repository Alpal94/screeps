module.exports = function() {
	StructureSpawn.prototype.createCustomCreep = 
		function(energy, roleName, id, home) {
			switch(roleName) {
				case 'miner':
				case 'miner2':
					var numberOfParts = Math.floor( energy / 200 );
					var body = [];
					for (let i = 0; i < 3; i++) {
						body.push(WORK);
					}
					for (let i = 0; i < 1; i++) {
						body.push(MOVE);
					}
					break;
				break;
				case 'claimer':
					var body = [];
					body.push(MOVE);
					body.push(MOVE);
					body.push(MOVE);
					body.push(MOVE);
					body.push(CLAIM);
					break;
				break;
				case 'harvester':

					console.log('number of parts');
					console.log(numberOfParts);
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

			return this.createCreep(body, undefined, { role: roleName, working: false , sId: id , home: home});
		};
	StructureSpawn.prototype.createAttackerCreep = 
		function(energy, roleName, id, type, home) {
			console.log("GENERATE ATTACK");
			switch(type) {
				case 'brute':
				default:
					var numberOfAttack = 5;
					var numberOfMove = 25;

					var energyMove = 50;
					var energyAttack = 80;
					var numberOfTough = Math.floor( (energy - numberOfAttack*energyAttack - numberOfMove*energyMove) / 10 );
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
					console.log("WHATS WRONG ATTACK: " + (numberOfTough));
					break;
			}
			return console.log(this.createCreep(body, undefined, { role: roleName, working: false , sId: id , type: type, home: home}));
		};

};
