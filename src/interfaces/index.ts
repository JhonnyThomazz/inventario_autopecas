export interface UsuarioProps {
    id?: number;
    nome: string;
    email: string;
    senha?: string;
}

export interface ProdutoProps {
    id?: number;
    nome: string;
    marca: string;
    modelo: string;
    quantidade: number;
    estoqueMinimo: number;
}

export interface MovimentacaoProps {
    id?: number;
    produtoId: number;
    usuarioId: number;
    tipo: 'ENTRADA' | 'SAIDA';
    quantidade: number;
    data?: Date;
}