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
  selector: 'app-ajoutjeu',
  templateUrl: './ajoutjeu.component.html',
  styleUrls: ['./ajoutjeu.component.css']
})
export class AjoutjeuComponent implements OnInit {

  form: any = {
    nom: null,
    description: null,
    regles: null,
    categorie:null,
    theme:null,
    editeur:null,
    langue: null,
    age: null,
    duree: null,
    nombre_joueurs: null,
    poids: null
  };

  loading = false;
  returnUrl: string;
  error = '';


  ajoutjeu = new FormGroup({
    nom: new FormControl('', [Validators.required,]),
    description: new FormControl('', [Validators.required,]),
    langue: new FormControl('', [Validators.required,]),
    regles: new FormControl('', [Validators.required,]),
    categorie: new FormControl('', [Validators.required,]),
    age: new FormControl('', [Validators.required,]),
    poids: new FormControl('', [Validators.required,]),
    nombre_joueurs: new FormControl('', [Validators.required,]),
    duree: new FormControl('', [Validators.required,]),
    theme: new FormControl('', [Validators.required,]),
    editeur: new FormControl('', [Validators.required,])
  }, {validators: this.checkContrainte});


  constructor(private messageService: MessageService, private authService: AuthentificationService, private router: Router,
              private route: ActivatedRoute, private http: HttpClient) {
  }
  checkContrainte(group: FormGroup){
    const nom = group.get('nom').value;
    const age = group.get('age').value;
    const nbjoueurs = group.get('nombre_joueurs').value;

    return age >=1 && age <=16 && nom.length >= 10 && nom.length <= 100 && nbjoueurs>=2 && nbjoueurs<=8 ? null : { notSame: false };
}
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get nom(): AbstractControl {
    return this.ajoutjeu.get('nom');
  }

  get description(): AbstractControl {
    return this.ajoutjeu.get('description');
  }

  get editeur(): AbstractControl {
    return this.ajoutjeu.get('editeur');
  }
  get theme(): AbstractControl {
    return this.ajoutjeu.get('theme');
  }
  get langue(): AbstractControl {
    return this.ajoutjeu.get('langue');
  }

  get regles(): AbstractControl {
    return this.ajoutjeu.get('regles');
  }

  get age(): AbstractControl {
    return this.ajoutjeu.get('age');
  }

  get poids(): AbstractControl {
    return this.ajoutjeu.get('poids');
  }

  get nombre_joueurs(): AbstractControl {
    return this.ajoutjeu.get('nombre_joueurs');
  }

  get duree(): AbstractControl {
    return this.ajoutjeu.get('duree');
  }

  onSubmit(): void {
    this.form = {...this.form, ...this.ajoutjeu.value};
    this.loading = true;
    const uid= this.authService.userValue.id
    this.http.post('http://localhost:8000/api/jeux', {
      nom: this.form.nom,
      description: this.form.description,
      theme:this.form.theme,
      editeur: this.form.editeur,
      langue: this.form.langue,
      age: this.form.age,
      poids: this.form.poids,
      nombre_joueurs: this.form.nombre_joueurs,
      categorie: this.form.categorie,
      duree: this.form.duree,
      regles: this.form.regles,
    }, httpOptions).subscribe(data => console.log(data));
    this.router.navigate(['/']);
  }
}

