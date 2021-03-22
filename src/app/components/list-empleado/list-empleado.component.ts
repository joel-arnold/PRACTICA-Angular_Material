import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css'],
})
export class ListEmpleadoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listaDeEmpleados: Empleado[];
  dataSource = new MatTableDataSource();

  constructor(
    private servicioEmpleado: EmpleadoService,
    public dialog: MatDialog,
    public confirmacion: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarEmpleados();
  }

  ngAfterViewInit() {
    this.dataSource = this.dataSource;
  }

  displayedColumns: string[] = [
    'nombreCompleto',
    'telefono',
    'correo',
    'fechaIngreso',
    'estadoCivil',
    'sexo',
    'acciones',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpleados() {
    this.listaDeEmpleados = this.servicioEmpleado.getEmpleados();
    this.dataSource = new MatTableDataSource(this.listaDeEmpleados);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarEmpleado(indice: number) {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: { mensaje: '¿Está seguro que desea eliminar la persona?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'aceptar') {
        this.servicioEmpleado.eliminarEmpleado(indice);
        this.cargarEmpleados();

        this.confirmacion.open('El empleado fue eliminado con éxito.', '', {
          duration: 3000,
        });
      }
    });
  }
}
