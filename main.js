var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
    for(var name in Memory.creeps) {
        // 内存清除的代码
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    // harvester新建
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    if(harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['MyFirstTry'].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }

    // Builder新建
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('builders: ' + builders.length);
    if(harvesters.length < 3) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['MyFirstTry'].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    
    // Upgrader新建
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('upgraders: ' + builders.length);
    if(harvesters.length < 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['MyFirstTry'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }

    if(Game.spawns['MyFirstTry'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['MyFirstTry'].spawning.name];
        Game.spawns['MyFirstTry'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['MyFirstTry'].pos.x + 1, 
            Game.spawns['MyFirstTry'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}