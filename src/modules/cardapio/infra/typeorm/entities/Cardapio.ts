import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("cardapio")
export class Cardapio {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
