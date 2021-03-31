import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {AuthentificationService} from '../_services/authentification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DatePipe} from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Component({
  selector: 'app-achatjeu',
  templateUrl: './achatjeu.component.html',
  styleUrls: ['./achatjeu.component.css']
})
export class AchatjeuComponent implements OnInit {
@Input() id_jeu;

  form: any = {
    date: null,
    lieu: null,
    prix: null
  };

  loading = false;
  returnUrl: string;
  error = '';


  achatjeu = new FormGroup({
    date: new FormControl('', [Validators.required, ]),
    lieu: new FormControl('', [Validators.required, ]),
    prix: new FormControl('', [Validators.required, ])
  });

  constructor(private messageService: MessageService, public authService: AuthentificationService, private router: Router,
              private route: ActivatedRoute, private http: HttpClient) {
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get date(): AbstractControl {
    return this.achatjeu.get('date');
  }

  get lieu(): AbstractControl {
    return this.achatjeu.get('lieu');
  }

  get prix(): AbstractControl {
    return this.achatjeu.get('prix');
  }

  onSubmit(): void {
    const userid = this.authService.userValue.id;
    this.form = {...this.form, ...this.achatjeu.value};
    console.log(this.form.date,this.form.lieu,this.form.prix,this.id_jeu,userid);
    this.loading = true;
    this.http.post(`http://localhost:8000/api/users/${userid}/achat`, {
    lieu: this.form.lieu,
    prix: this.form.prix,
    date_achat: this.form.date,
    jeu_id: this.id_jeu
  }, httpOptions).subscribe(data => console.log(data));
    this.router.navigate(['/']);
  }

}
