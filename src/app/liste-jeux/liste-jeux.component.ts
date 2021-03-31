import { Component, OnInit } from '@angular/core';
import {JeuxService} from '../jeux.service';
import {noop, Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-liste-jeux',
  templateUrl: './liste-jeux.component.html',
  styleUrls: ['./liste-jeux.component.css']
})
export class ListeJeuxComponent implements OnInit {

  jeux$: Observable<any[]>;
  valTri = '';

  constructor(private jeuxService: JeuxService) {
  }

  ngOnInit(): void {
    const jeux = [];
    this.jeuxService.getJeux().subscribe(str => jeux.push(str), noop, () => this.jeux$ = of(jeux[0]));
    console.log(jeux);
  }

  onTri(): void {
    this.jeux$ = this.jeuxService.getJeux(1);
  }

}
