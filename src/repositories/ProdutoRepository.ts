import prisma from '@/src/lib/prisma';
import { ProdutoEntity } from '../entities/ProdutoEntity';
import { ProdutoProps } from '../interfaces';

export class ProdutoRepository {
    async listarTodos(): Promise<ProdutoEntity[]> {
        const prods = await prisma.produto.findMany({
            orderBy: { descricao: 'asc' }
        });

        return prods.map(p => new ProdutoEntity({
            id: p.id,
            codigo: p.codigo,
            descricao: p.descricao,
            quantidade: p.quantidade,
            valorUnitario: Number(p.valorUnitario),
            estoqueMinimo: p.estoqueMinimo
        }));
    }

    async buscarPorId(id: number): Promise<ProdutoEntity | null> {
        const p = await prisma.produto.findUnique({ where: { id } });

        if (!p) return null;

        return new ProdutoEntity({
            id: p.id,
            codigo: p.codigo,
            descricao: p.descricao,
            quantidade: p.quantidade,
            valorUnitario: Number(p.valorUnitario),
            estoqueMinimo: p.estoqueMinimo
        });
    }

    async criar(props: ProdutoProps): Promise<ProdutoEntity> {
        const p = await prisma.produto.create({
            data: {
                codigo: props.codigo,
                descricao: props.descricao,
                quantidade: props.quantidade,
                valorUnitario: props.valorUnitario,
                estoqueMinimo: props.estoqueMinimo
            }
        });

        return new ProdutoEntity({
            id: p.id,
            codigo: p.codigo,
            descricao: p.descricao,
            quantidade: p.quantidade,
            valorUnitario: Number(p.valorUnitario),
            estoqueMinimo: p.estoqueMinimo
        });
    }

    async atualizar(id: number, props: Partial<ProdutoProps>): Promise<ProdutoEntity> {
        const p = await prisma.produto.update({
            where: { id },
            data: {
                codigo: props.codigo,
                descricao: props.descricao,
                quantidade: props.quantidade,
                valorUnitario: props.valorUnitario,
                estoqueMinimo: props.estoqueMinimo
            }
        });

        return new ProdutoEntity({
            id: p.id,
            codigo: p.codigo,
            descricao: p.descricao,
            quantidade: p.quantidade,
            valorUnitario: Number(p.valorUnitario),
            estoqueMinimo: p.estoqueMinimo
        });
    }

    async excluir(id: number): Promise<void> {
        await prisma.produto.delete({ where: { id } });
    }
}