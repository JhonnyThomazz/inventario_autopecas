import { ProdutoProps } from '../interfaces';
export class ProdutoEntity{
    constructor(private props: ProdutoProps) {}
    public get getId() { return this.props.id; }
    public get getNome() { return this.props.nome; }
    public get getMarca() { return this.props.marca; }
    public get getModelo() { return this.props.modelo; }
    public get getQuantidade(){ return this.props.quantidade }
    public get getEstoqueMinimo() { return this.props.estoqueMinimo; }
    public set setQuantidade(NovaQtd: number) { this.props.quantidade = NovaQtd; }
    public isEstoqueBaixo(): boolean { return this.props.quantidade <= this.props.estoqueMinimo; }
}