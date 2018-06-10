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
    milestones: any[] = [];
    milestone: string;
    visaoGeral: boolean = false;

    constructor(public navCtrl: NavController, public apiGit: ApiGithubProvider, public menuCtrl: MenuController, public storage: Storage) {


        //     apiGit.buscaOrgs().then(function (orgs: any[]) {
        //       this.orgs = orgs;
        //       console.log('ORGS', this.orgs);
        //     }).catch(function (error: Error) {
        //       console.log(error);
        //     })
        //   }

        apiGit.buscaOrgs().then((orgs: any[]) => {
            // console.log(orgs);
            this.orgs = orgs;
            console.log('Array da Classe com orgs', this.orgs);
        }).catch((error) => {
            console.log('error', error);
        })


        // apiGit.buscaRepositorios(this.orgs).then((repos: any[]) => {
        //     this.repos = repos;
        //     console.log('Array com repositorios', this.repos);
        // }).catch((error) => {
        //     console.log(error);
        // })


        //     apiGit.buscaMilestones().then((milestones: any[]) => {
        //         this.milestones = milestones;
        //         console.log('Array de Milestones (sprints): ', this.milestones);
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        // }


        // abrirVisaoGeral() {
        //     this.visaoGeral = !this.visaoGeral;

        //     console.log(this.visaoGeral);
        // }

       




        // }


        // async selecionaRepo() {
        //     try {
        //         await this.apiGit.salvaRepositorio(this.repo);
        //         console.log('repo', this.repo);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // async selecionaMile() {
        //     try {
        //         await this.apiGit.salvaMilestone(this.milestone);
        //         console.log('mile', this.milestone);

        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        }


        ionViewDidLoad() {
            this.menuCtrl.enable(true);
            // try {
            //     this.repo = await this.apiGit.recuperaRepositorio();
            //     console.log(this.repo);
    
            // } catch (error) {
    
            //     console.log(error);
            // }
        }


}
