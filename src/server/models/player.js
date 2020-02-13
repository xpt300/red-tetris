class Player {
    constructor(name, master) {
        this.name = name
        this.master = master
    }

    get name() {
        return (this.name, this.master)
    }
}