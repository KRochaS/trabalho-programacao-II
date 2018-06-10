import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiGithubProvider {

    organizacoes: any[] = [];
    repositorios: any[] = []

    private apiLink = "https://api.github.com";


    constructor(public http: HttpClient,
        public storage: Storage) {

    }

    async buscaOrgs(): Promise<any> {

        this.organizacoes = await this.httpGet(this.apiLink + '/user/orgs', {});


        return this.organizacoes;

    }

    async buscaRepositorios(org) {
        console.log('ORG', org)
        try {
            this.repositorios = await this.httpGet(org.repos_url, {});
            console.log('Buscando encontrados', this.repositorios);
            return this.repositorios;
        } catch (error) {
            console.error('Erro ao buscar repositórios', error);
            this.repositorios = [];
        }
    }

    buscaMilestones() {
        return this.httpGet(this.apiLink + '/repos/InfocapTI/next/milestones', {})
    }


    // buscaColunas() {
    //     return this.httpGet(this.apiLink 
    // }

	/**
 * Executa uma requisição HTTP usando o método GET;
* @param url url da requisição.
* @param args parâmetros opcionais de requisição. 
*     Ex.: Se url for https://www.google.com.br/search e args for { q: 'teste' },
*     este método fará uma requisição com a URL https://www.google.com.br/search?q="teste"
*/
    async httpGet(url: string, args?: any): Promise<any> {
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
        let reqOpts = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        }

        // let options = new RequestOptions ({ headers: headers});  
        return this.http.get(url, reqOpts).toPromise();


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
