import { MovimentacaoRepository } from '../repositories/MovimentacaoRepository';
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { MovimentacaoProps } from '../interfaces';

export class MovimentacaoService {
    constructor(
        private movRepo: MovimentacaoRepository,
        private prodRepo: ProdutoRepository
    ) {}

    async registrar(props: MovimentacaoProps) {
        if (props.quantidade <= 0) {
            throw new Error("Quantidade deve ser maior que zero.");
        }

        const produto = await this.prodRepo.buscarPorId(props.produtoId);
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        if (props.tipo === 'SAIDA' && produto.getQuantidade < props.quantidade) {
            throw new Error("Estoque insuficiente.");
        }

        const novoEstoque = props.tipo === 'ENTRADA'
            ? produto.getQuantidade + props.quantidade
            : produto.getQuantidade - props.quantidade;

        // Update stock
        await this.prodRepo.atualizar(props.produtoId, { quantidade: novoEstoque });

        // Register the movement
        await this.movRepo.criar(props);

        // Check low stock
        if (props.tipo === 'SAIDA' && novoEstoque <= produto.getEstoqueMinimo) {
            return {
                sucesso: true,
                alerta: `Atenção: O estoque do produto "${produto.getDescricao}" atingiu o limite mínimo!`
            };
        }

        return { sucesso: true, alerta: null };
    }

    async listar() {
        const lista = await this.movRepo.listarTodos();
        return lista.map(m => ({
            id: m.getId,
            produtoId: m.getProdutoId,
            usuarioId: m.getUsuarioId,
            tipo: m.getTipo,
            quantidade: m.getQuantidade,
            data: m.getData
        }));
    }

    async excluir(id: number) {
        return await this.movRepo.excluir(id);
    }
}