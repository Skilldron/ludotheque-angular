import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {MenuItem, MessageService} from 'primeng/api';
import {AuthentificationService} from './_services/authentification.service';


// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ludotheque-client';
  items: MenuItem[];

  constructor(public messageService: MessageService, public authService: AuthentificationService) {
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
  }

  ngOnInit() {
    (this.authService.isLoggedOut$.subscribe(login => {
      if (login){
        this.items = [
          {label: 'Mafia', icon: 'pi pi-fw pi-home'},
          {label: 'Connexion', icon: 'pi pi-fw pi-tag'},
          {label: 'Inscription', icon: 'pi pi-fw pi-pencil'}
        ];
      }else{
        this.items = [
          {label: 'Mafia', icon: 'pi pi-fw pi-home'},
          {label: 'Déconnexion', icon: 'pi pi-fw pi-times'},
          {label: 'Profil', icon: 'pi pi-fw pi-user'}
        ];
      }
    }));
  }
}
