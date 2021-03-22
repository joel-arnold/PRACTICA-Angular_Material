import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  listaDeEmpleados: Empleado[] = [
    {
      nombreCompleto: 'Joel Arnold',
      correo: 'joelarnold@hotmail.com.ar',
      telefono: 3415325530,
      fechaIngreso: new Date(),
      estadoCivil: 'Casado',
      sexo: 'Masculino',
    },
    {
      nombreCompleto: 'María Monza',
      correo: 'maria-monza@hotmail.com',
      telefono: 3413683044,
      fechaIngreso: new Date(),
      estadoCivil: 'Casado',
      sexo: 'Femenino',
    },
    {
      nombreCompleto: 'Winsy',
      correo: 'winsy@hanimalplanet.com',
      telefono: 3415555555,
      fechaIngreso: new Date(),
      estadoCivil: 'Soltera',
      sexo: 'Otro',
    },
  ];

  constructor() {}

  getEmpleados() {
    return this.listaDeEmpleados.slice();
  }

  eliminarEmpleado(indice: number) {
    this.listaDeEmpleados.splice(indice, 1);
  }
}
