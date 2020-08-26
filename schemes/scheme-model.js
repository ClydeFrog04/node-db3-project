const db = require("./schemeDbConfig");


function find() {
    return db("schemes");
}

async function findById(id) {
    try {
        const scheme = await db("schemes").where({id});
        if (scheme.length) return scheme;
        else return null;
    } catch (e) {
        console.log(e.stack);
        return null;
    }
}

async function findSteps(id) {
    //the step numbers for scheme 1 are incorrect. There are three steps: step1, step2 and step1
    try {
        const steps = await db("steps as s").where("s.scheme_id", id)
            .innerJoin("schemes as sc", "sc.id", "s.scheme_id")
            .select("s.id", "sc.scheme_name", "s.step_number", "s.instructions")
            .orderBy("s.step_number");
        return steps;

    } catch (e) {
        console.log(e.stack);
        return null;
    }
}

async function add(scheme) {
    try {
        const ids = await db("schemes").insert(scheme).returning("id");
        return await findById(ids[0]);
    } catch (e) {
        console.log(e.stack);
        return null;
    }
}

async function update(changes, id) {
    try {
        await db("schemes")
            .where({id})
            .update(changes);
        return await findById(id);
    } catch (e) {
        console.log(e.stack);
    }
}

async function remove(id){
    try {
        const removedItem = await findById(id);
        if(removedItem) {
            await db("schemes").delete().where({id});
            return removedItem;
        }
        else return null;
    } catch (e) {
        console.log(e.stack);
    }
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};
/*remove(id):
Removes the scheme object with the provided id.
Resolves to the removed scheme
Resolves to null on an invalid id.
(Hint: Only worry about removing the scheme. The database is configured to automatically remove all associated steps.)

 */