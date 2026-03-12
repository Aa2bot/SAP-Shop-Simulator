import { Ailment } from '../domain/entities/ailment';

export class AilmentRegistry {
  private ailments = new Map<string, Ailment>();

  register(ailment: Ailment) {
    this.ailments.set(ailment.id, ailment);
  }

  get(id: string) {
    const ailment = this.ailments.get(id);
    if (!ailment) throw new Error(`Ailment not found: ${id}`);
    return ailment;
  }
}
