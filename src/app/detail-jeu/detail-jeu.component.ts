import { Component, OnInit } from '@angular/core';
import {JeuxService} from '../jeux.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-detail-jeu',
  templateUrl: './detail-jeu.component.html',
  styleUrls: ['./detail-jeu.component.css']
})
export class DetailJeuComponent implements OnInit {
  jeu$: Observable<any>;
  id = +this.route.snapshot.paramMap.get('id');

  constructor(private jeuxService: JeuxService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.jeu$ = this.jeuxService.getJeu(this.id);
  }

}
