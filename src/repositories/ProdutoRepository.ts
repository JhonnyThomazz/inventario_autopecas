import prisma from '@/src/lib/prisma';
import { ProdutoEntity } from '../entities/ProdutoEntity';
import { ProdutoProps } from '../interfaces';

export class ProdutoRepository {
    async listarTodos(): Promise<ProdutoEntity[]> {
        const prods = await prisma.produto.findMany({ orderBy: { marca: 'asc' } });
        return prods.map(p => new ProdutoEntity({
            id: p.id,
            nome: p.nome,
            marca: p.marca,
            modelo: p.modelo,
            quantidade: p.quantidade,
            estoqueMinimo: p.estoque_minimo
        }));
    }

    async buscarPorId(id: number): Promise<ProdutoEntity | null> {
        const p = await prisma.produto.findUnique({ where: { id } });
        return p ? new ProdutoEntity({
            id: p.id,
            nome: p.nome,
            marca: p.marca,
            modelo: p.modelo,
            quantidade: p.quantidade,
            estoqueMinimo: p.estoque_minimo
        }) : null;
    }

    async criar(props: ProdutoProps): Promise<ProdutoEntity> {
        const p = await prisma.produto.create({
            data: {
                nome: props.nome,
                marca: props.marca,
                modelo: props.modelo,
                quantidade: props.quantidade,
                estoque_minimo: props.estoqueMinimo
            }
        });
        return new ProdutoEntity({
            id: p.id,
            nome: p.nome,
            marca: p.marca,
            modelo: p.modelo,
            quantidade: p.quantidade,
            estoqueMinimo: p.estoque_minimo
        });
    }

    async atualizar(id: number, props: Partial<ProdutoProps>): Promise<ProdutoEntity> {
        const p = await prisma.produto.update({
            where: { id },
            data: {
                nome: props.nome,
                marca: props.marca,
                quantidade: props.quantidade,
                estoque_minimo: props.estoqueMinimo
            }
        });
        return new ProdutoEntity({
            id: p.id,
            nome: p.nome,
            marca: p.marca,
            modelo: p.modelo,
            quantidade: p.quantidade,
            estoqueMinimo: p.estoque_minimo
        });
    }

    async excluir(id: number): Promise<void> {
        await prisma.produto.delete({ where: { id } });
    }
}