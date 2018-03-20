/**
 * Created by jaroslavtkaciuk on 20/04/2017.
 */

class Group {
    constructor(name) {
        this.array = [];
        this.name = name;
    }

    add(object) {
        this.array.push(object);
    }

    getGroupByName(name) {
        for (var i in this.array) {
            if (this.array[i].name === name)
                return this.array[i];
        }
    }


}
