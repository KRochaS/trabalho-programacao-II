import { ApiGithubProvider } from './../../providers/api-github/api-github';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
    name: 'home',
    segment: 'home'
})
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    orgs: any[] = [];
    repos: any[] = [];
    repo: string;
    projeto: string;
    milestones: any[] = [];
    milestone: string;
    visaoGeral: boolean = false;

    constructor(public navCtrl: NavController, public apiGit: ApiGithubProvider, public menuCtrl: MenuController, public storage: Storage) {

        // TODO: async await
        apiGit.buscaOrgs().then((orgs: any[]) => {
            // console.log(orgs);
            this.orgs = orgs;
            console.log('Array da Classe com orgs', this.orgs);
        }).catch((error) => {
            console.log('error', error);
        });
    }
    async ionViewDidLoad() {
        this.menuCtrl.enable(true);

    }






}
