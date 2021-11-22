import { IAdicionalDTO } from "../dtos/IAdicionalDTO";
import { Adicional } from "../infra/typeorm/entities/Adicionais";

export interface IAdicionalRepository {
    create({ name, value }: IAdicionalDTO): Promise<Adicional>;
    update(id: string, name: string, value: number): Promise<void>;
    list(): Promise<Adicional[]>;
    deleteById(id: string): Promise<void>;
    findById(id: string): Promise<Adicional>;
    findByName(name: string): Promise<Adicional>;
}
