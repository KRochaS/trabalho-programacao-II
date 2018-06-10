import { ApiGithubProvider } from './../../providers/api-github/api-github';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';


@IonicPage({
    name: 'login-token',
    segment: 'login-token'
})
@Component({
    selector: 'page-login-token',
    templateUrl: 'login-token.html',
})
export class LoginTokenPage {
    token;

    constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public apiGithub: ApiGithubProvider) {


    }

    async ionViewDidLoad() {
        this.menuCtrl.enable(false);
        try {
          let loginSalvo = await this.apiGithub.salvaLogin('kspksdkpsdfdofdjgg');
          console.log('loginSalvo', loginSalvo);
          let loginRecuperado = await this.apiGithub.recuperaLogin();
          console.log('loginRecuperado', loginRecuperado);
        } catch (error) {
            console.log(error);
        }



    }

    async logar() {
        try {
            let login = await this.apiGithub.salvaLogin(this.token);
            console.log(login);
            this.navCtrl.push('home');
        } catch(error) {
            console.log(error);
        }
        
    }


    async buscaOrgs() {
    try {
        
    } catch (error) {
        
    }
    }

}
