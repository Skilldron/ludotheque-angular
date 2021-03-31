import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

declare var solver: any;

@Component({
  selector: 'app-lp-solver-test',
  templateUrl: './lp-solver-test.component.html',
  styleUrls: ['./lp-solver-test.component.css']
})
export class LpSolverTestComponent implements OnInit {


  readonly probleme = {
    variables: {
      s1: {
        p1: 5,
        p2: 8,
        p3: 5,
        benefice: 4.2
      },
      s2: {
        p1: 7,
        p2: 3,
        p3: 8,
        benefice: 5.1
      }
    },
    ints: {s1: 1, s2: 1},
    binaries: {},
    constraints: {
      p1: {max: 200},
      p2: {max: 250},
      p3: {max: 220}
    },
    opType: 'max',
    optimize: 'benefice'
  };

  sacAdoc = {
    variables: {
      o1: {
        po: 12,
        pr: 10
      },
      o2: {
        po: 11,
        pr: 10
      },
      o3: {
        po: 7,
        pr: 15
      },
      o4: {
        po: 25,
        pr: 32
      },
      o5: {
        po: 10,
        pr: 7
      },
      o6: {
        po: 5,
        pr: 7
      }
    },
    ints: {},
    binaries: {
      o1: 1,
      o2: 1,
      o3: 1,
      o4: 1,
      o5: 1,
      o6: 1
    },
    constraints: {
      po: {max: 40}
    },
    opType: 'max',
    optimize: 'pr'
  };

  constructor(public messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  resolutionProbleme(): void {
    const resultat = solver.Solve(this.sacAdoc);
    console.log(resultat);
    if (resultat.o1) {const nbo1 = resultat.o1; }
    else if (resultat.o2) {const nbo2 = resultat.o2; }
    else if (resultat.o3) {const nbo3 = resultat.o3; }
    else if (resultat.o4) {const nbo4 = resultat.o4; }
    else if (resultat.o5) {const nbo5 = resultat.o5; }
    else if (resultat.o6) {const nbo6 = resultat.o6; }
    /*const nbS1 = resultat.s1;
    const nbS2 = resultat.s2;
    const beneficeTotal = resultat.result;
    const affiche = `Solution : Sachets S1 :  ${nbS1}, Sachets S2 : ${nbS2}, Bénéfice : ${beneficeTotal}`;
    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${affiche}`,
    });*/
    const beneficeTotal = resultat.result;
    const affiche = `Solution : Objet o1 : ${resultat.o1}, Objet o2 : ${resultat.o2}, Objet o3 : ${resultat.o3}, Objet o4: ${resultat.o4}, Objet o5 : ${resultat.o5}, Objet o6 : ${resultat.o6}, Bénéfice : ${beneficeTotal}`;
    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${affiche}`,
    });
  }

}
