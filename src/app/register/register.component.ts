import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {AuthentificationService} from '../_services/authentification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {first} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    nom: null,
    prenom: null,
    email: null,
    password: null,
    pseudo: null,
    password2: null
  };
  loading = false;
  returnUrl: string;
  error = '';

  register = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    pseudo: new FormControl('', [Validators.required]),
    confirmPass: new FormControl('', [Validators.required, ])
  }, {validators: this.checkPasswords});



  constructor(private messageService: MessageService, private authService: AuthentificationService, private router: Router,
              private route: ActivatedRoute, private http: HttpClient) {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPass').value;

    return password === confirmPassword && password.length >= 6 ? null : { notSame: true };
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get email(): AbstractControl {
    return this.register.get('email');
  }

  get password(): AbstractControl {
    return this.register.get('password');
  }

  get nom(): AbstractControl {
    return this.register.get('nom');
  }

  get prenom(): AbstractControl {
    return this.register.get('prenom');
  }

  get pseudo(): AbstractControl {
    return this.register.get('pseudo');
  }

  onSubmit(): void {
    this.form = {...this.form, ...this.register.value};
    this.loading = true;
    this.http.post('http://localhost:8000/api/auth/register', {
      pseudo: this.form.pseudo,
      nom: this.form.nom,
      prenom: this.form.prenom,
      email: this.form.email,
      password: this.form.password}, httpOptions).subscribe(data => console.log(data));
    this.router.navigate(['/']);
  }

}
