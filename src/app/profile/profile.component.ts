import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {UserInfo} from '../_models/user-info';
import {noop, Observable, of} from 'rxjs';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {JeuxService} from '../jeux.service';
import {AuthentificationService} from '../_services/authentification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loading: boolean;
  user: UserInfo;
  //jeux$: Observable<any[]>;
  // authService: any;
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private messageService: MessageService, public authService: AuthentificationService, private router: Router, private jeuxService: JeuxService) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getProfile().subscribe(
      user => {
        this.user = {...this.user, ...user};
        this.loading = false;
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir le profil de l\'utilisateur' , key: 'main'});
        this.loading = false;
        this.router.navigateByUrl('/');
      });
    const jeux = [];
    //this.jeuxService.getJeux().subscribe(str => jeux.push(str), noop, () => this.jeux$ = of(jeux[0]));
    //this.jeux$ = this.jeuxService.getJeux(user = id);
    //console.log(jeux);
  }

}


