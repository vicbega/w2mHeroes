import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/services/loading.service';
import { delay } from 'rxjs/operators';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HeroesComponent implements OnInit, AfterViewInit {

  @Input() heroes: any | undefined;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageEvent!: PageEvent;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 7, 9];

  loading: boolean = false;

  displayedColumns: string[] = ['id', 'name', 'power', 'live', 'editDelete'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();


  constructor(
    private heroesService: HeroesService,
    private _loading: LoadingService
  ) {
    this, this.dataSource.data = this.heroes;
  }

  ngAfterViewInit() {
    console.log('er');
  }

  ngOnInit() {

    this.listenToLoading();

    this.heroesService.getHeroes()
      .subscribe((resp: any) => {
        this.heroes = resp;
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
      });

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  filterHeroes(value: any) {
    this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
    const filterValue = value.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  deleteHeroe(heroe: HeroeModel, i: number) {

    Swal.fire(
      '¿Está seguro?',
      `Está seguro que desea borrar a ${heroe.name}`,
      'question'
    ).then(resp => {

      if (resp.value) {
        this.heroes.splice(i, 1);
        this.heroesService.deleteHeroe(heroe.id).subscribe();
      }
    });
  }

}