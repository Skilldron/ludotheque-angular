import { Component, OnInit } from '@angular/core';
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
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  form: any = {
    pseudo: null,
    nom: null,
    prenom: null,
    email: null
  };

  loading = false;
  returnUrl: string;
  error = '';


  editprofile = new FormGroup({
    pseudo: new FormControl('', [Validators.required, ]),
    nom: new FormControl('', [Validators.required, ]),
    prenom: new FormControl('', [Validators.required, ]),
    email: new FormControl('', [Validators.required, ])
  });

  constructor(private messageService: MessageService, public authService: AuthentificationService, private router: Router,
              private route: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe) {
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get email(): AbstractControl {
    return this.editprofile.get('email');
  }

  get nom(): AbstractControl {
    return this.editprofile.get('nom');
  }

  get prenom(): AbstractControl {
    return this.editprofile.get('prenom');
  }

  get pseudo(): AbstractControl {
    return this.editprofile.get('pseudo');
  }

  onSubmit(): void {
    const today = new Date();
    this.form = {...this.form, ...this.editprofile.value};
    const userid = this.authService.userValue.id;
    this.loading = true;

    this.http.put(`http://localhost:8000/api/users/${userid}`, {
      pseudo: this.form.pseudo,
      nom: this.form.nom,
      prenom: this.form.prenom,
      email: this.form.email,
      _method: 'PUT'
    }, httpOptions).subscribe(data => console.log(data));
    this.router.navigate(['/']);
  }

}
