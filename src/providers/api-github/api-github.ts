import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiGithubProvider {


    organizacoes: any[] = [];
    repositorios: any[] = []
    milestonesLista: any[] = [];
    projetosLista: any[] = [];
    colunasLista: any[] = [];

    orgSelecionada: string;
    repoSelecionado: string;
    milestoneSelecionada: string;
    projetoSelecionado: any;
    colunaSelecionada: any;

    private apiLink = "https://api.github.com";


    constructor(public http: HttpClient,
        public storage: Storage) {

    }

    /**
 * Executa uma requisição HTTP usando o método GET;
* @param url url da requisição.
* @param args parâmetros opcionais de requisição. 
*     Ex.: Se url for https://www.google.com.br/search e args for { q: 'teste' },
*     este método fará uma requisição com a URL https://www.google.com.br/search?q="teste"
* @param options // TODO: 
*/
    async httpGet(url: string, args?: any, options?: any): Promise<any> {
        let thisObj = this;
        if (!url) throw new Error('URL não definida.');

        // verifica se recebeu argumentos
        let noArgs = !args || (Object.keys(args).length === 0 && args.constructor === Object);
        // se recebeu argumentos, os transforma estes argumentos em parâmetros de uma url    
        var argsStr = '';
        if (!noArgs) {
            argsStr = "?" +
                Object.keys(args).map(function (prop) {
                    if (args[prop] == '') {
                        args[prop] = '""';
                    }
                    return [prop, args[prop]].map(encodeURIComponent).join("=");
                }).join("&");
        }
        url += argsStr;
        // executa uma requisição usando o médoto GET


        let token = await this.recuperaLogin();
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
        // TODO: 
        if (options && options.acceptInertia) {
            console.log('AcceptInertia', url)
            headers['Accept'] = 'application/vnd.github.inertia-preview+json';
        }
        let reqOpts = {
            headers: new HttpHeaders(headers)
        }

        // let options = new RequestOptions ({ headers: headers});  
        // TODO: trycatch
        try {
            let ret = await this.http.get(url, reqOpts).toPromise();
            return ret;
        } catch (error) {
            console.error('ERRO NO GET', error);
            throw error;
        }


    }

    async buscaOrgs(): Promise<any> {
        // TODO: trycatch
        try {
            // TODO: armazenar resultado em variável local
            let organizacoes = await this.httpGet(this.apiLink + '/user/orgs', {});
            this.organizacoes = organizacoes;
            return this.organizacoes;
        } catch (error) {
            throw error;
        }
    }

    async buscaRepositorios(org) {
        console.log('ORG', org)
        try {
            this.orgSelecionada = org.login;
            console.log('OrgSelecioanda', this.orgSelecionada);
            this.repositorios = await this.httpGet(org.repos_url, {});
            console.log('Buscando encontrados', this.repositorios);
            return this.repositorios;
        } catch (error) {
            console.error('Erro ao buscar repositórios', error);
            this.repositorios = [];
        }
    }

    async buscaMilestones() {
        if (!this.orgSelecionada) { throw new Error('Organização não selecionada'); }
        if (!this.repoSelecionado) { throw new Error('Repositório não selecionado'); }
        // https://api.github.com/repos/InfocapTI/next/milestones
        let urlMilestone = this.apiLink + '/repos/' + this.orgSelecionada + '/' + this.repoSelecionado + '/milestones'
        console.log('url milestone', urlMilestone);
        try {
            let milestones = await this.httpGet(urlMilestone, {})
            console.log('milestone', milestones);
            this.milestonesLista = milestones;
        } catch (error) {
            console.error('Erro', error);
            throw error;
        }
    }

    async buscaProjetos() {
        if (!this.orgSelecionada) { throw new Error('Organização não selecionados'); }
        if (!this.repoSelecionado) { throw new Error('Repositório não selecionados'); }
        let urlProjetos = this.apiLink + '/repos/' + this.orgSelecionada + '/' + this.repoSelecionado + '/projects';
        console.log('url projetos', urlProjetos);
        try {
            // ATENÇÃO: acceptInertia não é usado em todas as funções de API
            let projetos = await this.httpGet(urlProjetos, {}, { acceptInertia: true });
            console.log('projetos', projetos);
            this.projetosLista = projetos;            
        } catch (error) {
            console.error('Erro', error);            
            throw error;
        }
    }


    async selecionaProjeto() {
        if (!this.orgSelecionada) { throw new Error('Organização não selecionada'); }
        if (!this.repoSelecionado) { throw new Error('Repositório não selecionado'); }
        if (!this.projetoSelecionado) { throw new Error('Projeto não selecionado'); }

        // busca as colunas do projeto
        //  "columns_url": "https://api.github.com/projects/1293434/columns",        

        console.log('projeto selecionado', this.projetoSelecionado);
        try {            
            this.colunasLista = await this.httpGet(this.projetoSelecionado.columns_url, {}, {acceptInertia:true});            
            console.log('colunas', this.colunasLista);
        } catch (error) {
            console.error('Erro', error);            
            throw error;
        }
    }

    async  selecionaColuna  () {     
        // busca o conteúdo das cards

        let requisicoesCards = [];
        // para cada coluna selecionada faz uma requisição
        for(let colunaSeleciona of this.colunaSelecionada){
            let requisicaoCard = this.httpGet(colunaSeleciona.cards_url, {}, { acceptInertia: true });
            requisicoesCards.push(requisicaoCard);               
        }
        // efetua as requisções em paralelo
        let results = await Promise.all(requisicoesCards);

        console.log('Cards da coluna', results);
    }

    async selecionaRepo() {
        if (!this.orgSelecionada) { throw new Error('Organização não selecionada'); }
        try {
            await this.buscaMilestones();
            await this.buscaProjetos();
        } catch (error) {
            console.log(error);
        }
    }


    async selecionaMile() {
        if (!this.orgSelecionada) { throw new Error('Organização não selecionada'); }
        if (!this.repoSelecionado) { throw new Error('Repositório não selecionado'); }

        try {
            await this.salvaMilestone(this.milestoneSelecionada);
            console.log('mile', this.milestoneSelecionada);
        }
        catch (error) {
            console.log(error);
        }
    }



    salvaLogin(token): Promise<any> {

        return this.storage.set('token', token);

    }

    async recuperaLogin(): Promise<any> {

        let token = await this.storage.get('token');
        console.log(token);
        return token;

    }

    async salvaRepositorio(repo) {
        return this.storage.set('repo', repo);
    }

    async salvaMilestone(mile) {
        return this.storage.set('mile', mile)
    }

    async salvaColuna(col) {
        return this.storage.set('colum', col);
    }

    async recuperaRepositorio() {
        let repo = await this.storage.get('repo');

        return repo;
    }

    async recuperaMilestone() {
        let mile = await this.storage.get('mile');

        return mile;
    }

    async recuperaColuna() {
        let col = await this.storage.get('col');

        return col;
    }

}
