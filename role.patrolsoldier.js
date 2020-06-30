var rolePatrolSoldier = {
    // Soldier 要执行边境巡逻任务
    /** @param {Creep} creep **/
    run: function(creep) {
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    // 寻找攻击目标
    if(target) {
        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
            creep.say("发现入侵者");
        }
    }
    else{
        var flags = creep.room.find(FIND_FLAGS);
        if(Game.time%4==0){
            creep.moveTo(flags[0])
        }
        else if(Game.time%5==0){
            creep.moveTo(flags[3])
        }
        else if(Game.time%7==0){
            creep.moveTo(flags[1])
        }
        else{
            creep.moveTo(flags[2])
        }
        creep.say("巡逻中");
    }
    }
};
module.exports = rolePatrolSoldier;