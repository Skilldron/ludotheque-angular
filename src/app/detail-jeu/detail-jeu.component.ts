import { Component, OnInit } from '@angular/core';
import {JeuxService} from '../jeux.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-detail-jeu',
  templateUrl: './detail-jeu.component.html',
  styleUrls: ['./detail-jeu.component.css']
})
export class DetailJeuComponent implements OnInit {
  jeu$: Observable<any>;
  id = +this.route.snapshot.paramMap.get('id');

  constructor(private userService: UserService, private jeuxService: JeuxService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.jeu$ = this.jeuxService.getJeu(this.id);
  }

}
