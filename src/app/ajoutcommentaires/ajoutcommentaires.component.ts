import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {AuthentificationService} from '../_services/authentification.service';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Component({
  selector: 'app-ajoutcommentaires',
  templateUrl: './ajoutcommentaires.component.html',
  styleUrls: ['./ajoutcommentaires.component.css']
})
export class AjoutcommentairesComponent implements OnInit {
  @Input() jeu_id; // decorate the property with @Input()

  form: any = {
  commentaire: null,
    note: null
  };

  loading = false;
  returnUrl: string;
  error = '';


  commentaires = new FormGroup({
    commentaire: new FormControl('', [Validators.required, ]),
    note: new FormControl('', [Validators.required, ])
  });


  constructor(private messageService: MessageService, public authService: AuthentificationService, private router: Router,
              private route: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe) {
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get commentaire(): AbstractControl {
    return this.commentaires.get('commentaire');
  }

  get note(): AbstractControl {
    return this.commentaires.get('note');
  }

  onSubmit(): void {
    let today = new Date();
    this.form = {...this.form, ...this.commentaires.value};
    this.loading = true;
    console.log(this.form.commentaire, this.form.note, this.jeu_id, this.datePipe.transform(today, 'yyyy-MM-dd') + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds());
    this.http.post('http://localhost:8000/api/commentaires', {
      note: this.form.note,
      commentaire: this.form.commentaire,
      jeu_id: this.jeu_id,
      date_com: this.datePipe.transform(today, 'yyyy-MM-dd') + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    }, httpOptions).subscribe(data => console.log(data));
    this.router.navigate(['/']);
  }
}


