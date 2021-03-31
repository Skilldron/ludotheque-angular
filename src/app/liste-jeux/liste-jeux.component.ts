import { Component, OnInit } from '@angular/core';
import {JeuxService} from '../jeux.service';
import {noop, Observable, of} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, last, map, take, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-liste-jeux',
  templateUrl: './liste-jeux.component.html',
  styleUrls: ['./liste-jeux.component.css']
})
export class ListeJeuxComponent implements OnInit {

  jeux;

  jeux$: Observable<any[]>;

  agemax = new FormGroup({
    age: new FormControl(), });
  error = '';

  constructor(private jeuxService: JeuxService) {
  }

  get age(): AbstractControl {
    return this.age.get('age');
  }

  ngOnInit(): void {
    this.jeux = [];
    this.jeuxService.getJeux().subscribe(str => this.jeux.push(str), noop, () => this.jeux$ = of(this.jeux[0]));
    console.log(this.jeux);
  }

  onFiltre(): void{
    console.log(this.agemax.value);
    this.jeux$ = this.jeuxService.getAge(this.agemax.value.age);
  }

  onTri(): void {
    this.jeux$ = this.jeuxService.getJeux(1);
    }
}
