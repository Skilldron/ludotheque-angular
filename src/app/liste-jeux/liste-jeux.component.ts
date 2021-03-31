import { Component, OnInit } from '@angular/core';
import {JeuxService} from '../jeux.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {from, interval, noop, Observable, of, range} from 'rxjs';
import {filter, last, map, take} from 'rxjs/operators';


@Component({
  selector: 'app-liste-jeux',
  templateUrl: './liste-jeux.component.html',
  styleUrls: ['./liste-jeux.component.css']
})
export class ListeJeuxComponent implements OnInit {

  jeux$: Observable<any[]>;

  constructor(private jeuxService: JeuxService) {
  }

  ngOnInit(): void {
    const jeux = [];
    this.jeuxService.getJeux().subscribe(str => jeux.push(str), noop, () => this.jeux$ = of(jeux[0]));
  }

  onTri(): void {
    /*const jeux = [];*/
    this.jeux$ = this.jeuxService.getJeux(1);
    /*this.jeuxService.getJeux().pipe(filter(x => x < jeux.age)).subscribe(str => jeux.push(str), noop, () => this.jeux$ = of(jeux[0]));
    console.log('--------------- age ---------------');*/
  }
}

