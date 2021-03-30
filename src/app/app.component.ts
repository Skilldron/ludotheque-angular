import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {MenuItem, MessageService} from 'primeng/api';
import {AuthentificationService} from './_services/authentification.service';
import {Router} from '@angular/router';


// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ludotheque-client';
  items: MenuItem[];

  constructor(public messageService: MessageService, public authService: AuthentificationService, private router: Router) {
  }

  show(): void {
    const now = moment().format('LL');
    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${this.title}, ${now}`,
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    (this.authService.isLoggedOut$.subscribe(login => {
      if (login){
        this.items = [
          {label: 'Mafia', icon: 'pi pi-fw pi-home'},
          {label: 'Connexion', icon: 'pi pi-fw pi-tag', routerLink: 'login'},
          {label: 'Inscription', icon: 'pi pi-fw pi-pencil', routerLink: 'register'},
          {label: 'Liste-jeux', icon: 'pi pi-fw pi-desktop', routerLink: 'liste-jeux'}

        ];
      }else{
        this.items = [
          {label: 'Mafia', icon: 'pi pi-fw pi-home', routerLink: 'login'},
          {label: 'Déconnexion', icon: 'pi pi-fw pi-times', command: () => this.logout()},
          {label: 'Profil', icon: 'pi pi-fw pi-user', routerLink: 'profile'},
          {label: 'RO', icon: 'pi pi-fw pi-user', routerLink: 'ro'},
          {label: 'Liste-jeux', icon: 'pi pi-fw pi-desktop', routerLink: 'liste-jeux'}
        ];
      }
    }));
  }
}
