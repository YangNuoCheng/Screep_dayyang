var rolePatrolSoldier = {
    // Soldier 要执行边境巡逻任务
    /** @param {Creep} creep **/
    run: function(creep) {
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    // 寻找攻击目标
    if(target) {
        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
            creep.say("发现入侵者")
        }
    }
    else{
        var flags = creep.room.find(FIND_FLAGS);
        creep.moveTo(Math.floor(Math.random()*4))
        // Math.floor(Math.random()*10)
        creep.say("巡逻中")
        // if(creep.harvest(flags[0]) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(flags[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        //     creep.say('巡逻中');
        // }
    }
    }
};
module.exports = rolePatrolSoldier;