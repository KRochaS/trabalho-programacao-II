import { ApiGithubProvider } from './../providers/api-github/api-github';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: string = 'login-token';

      @ViewChild(Nav) nav: Nav;


    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public apiGit: ApiGithubProvider) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // statusBar.styleDefault();
            // splashScreen.hide();
        });
    }


    // buscaOrganizacoes() {
    //     this.apiGit.buscaOrgs().then((orgs: any[]) => {
    //         // console.log(orgs);
    //         this.orgs = orgs;
    //         console.log('Array da Classe com orgs', this.orgs);
    //     }).catch((error) => {
    //         console.log('error', error);
    //     })

    // }


    async abreOrgs(org) {
        try {
            this.apiGit.buscaRepositorios(org);

        } catch (error) {
            console.log(error);
        }
    }

    sair() {
        this.nav.setRoot('login-token');
    }

}
