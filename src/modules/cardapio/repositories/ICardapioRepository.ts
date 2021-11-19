import { ICardapioDTO } from "../dtos/ICardapioDTO";
import { Cardapio } from "../infra/typeorm/entities/Cardapio";

export interface ICardapioRepository {
    create({ name, description, value }: ICardapioDTO): Promise<Cardapio>;
    update({ id, name, description, value }): Promise<void>;
    deleteById(id: string): Promise<void>;
    list(): Promise<Cardapio[]>;
    findByNameCardapio(name: string): Promise<Cardapio>;
    findById(id: string): Promise<Cardapio>;
}
