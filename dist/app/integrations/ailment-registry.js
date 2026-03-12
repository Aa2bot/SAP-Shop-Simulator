export class AilmentRegistry {
    constructor() {
        this.ailments = new Map();
    }
    register(ailment) {
        this.ailments.set(ailment.id, ailment);
    }
    get(id) {
        const ailment = this.ailments.get(id);
        if (!ailment)
            throw new Error(`Ailment not found: ${id}`);
        return ailment;
    }
}
