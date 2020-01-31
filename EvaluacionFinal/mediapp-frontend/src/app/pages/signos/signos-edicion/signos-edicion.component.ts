import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SignosService } from 'src/app/_service/signos.service';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Signos } from 'src/app/_model/signos';
import { PacienteDialogComponent } from '../paciente-dialog/paciente-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-signos-edicion',
  templateUrl: './signos-edicion.component.html',
  styleUrls: ['./signos-edicion.component.css']
})
export class SignosEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  pacientes: Paciente[] = [];
  myControlPaciente: FormControl = new FormControl();
  pacienteSeleccionado: Paciente;
  pacientesFiltrados: Observable<any[]>;
  
  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private signosService : SignosService,
    private pacienteService : PacienteService,
    private dialog : MatDialog
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'id': new FormControl(),
      'paciente': this.myControlPaciente,
      'fecha' : new FormControl(''),
      'temperatura' : new FormControl(''),
      'pulso': new FormControl(''),
      'ritmoRespiratorio': new FormControl('')
    });

    this.listarPacientes();
    this.pacientesFiltrados = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });

    this.pacienteService.pacienteAutocomplete.subscribe(data => {
      console.log('recibiendo paciente nuevo');
      console.log(data);
      this.myControlPaciente = new FormControl(data);
      this.pacienteSeleccionado = data;
    });
  }

  initForm(){
    if(this.edicion){
      this.signosService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idSignos),
          'paciente': new FormControl(data.paciente),
          'fecha': new FormControl(data.fecha),
          'temperatura': new FormControl(data.temperatura),
          'pulso': new FormControl(data.pulso),
          'ritmoRespiratorio': new FormControl(data.ritmoRespiratorio)
        });
        this.pacienteSeleccionado = data.paciente;
      });
    }
  }

  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  filtrarPacientes(val : any){    
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.dni.includes(val.dni));
    } else {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dni.includes(val));
    }
  }

  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }

  mostrarPaciente(val : Paciente){
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  operar(){

    //TE ASEGURAS QUE EL FORM ESTE VALIDO PARA PROSEGUIR
    if(this.form.invalid){
      return;
    }

    let signos = new Signos();
    signos.idSignos = this.form.value['id'];
    signos.paciente = this.pacienteSeleccionado;
    signos.fecha = this.form.value['fecha'];
    signos.temperatura = this.form.value['temperatura'];
    signos.pulso = this.form.value['pulso'];
    signos.ritmoRespiratorio = this.form.value['ritmoRespiratorio'];

    if(this.edicion){
      //servicio de edicion
      this.signosService.modificar(signos).subscribe( () => {
        this.signosService.listar().subscribe(data => {
          this.signosService.signosCambio.next(data);
          this.signosService.mensajeCambio.next('Registro modificado');
        });
      });
    }else{
      //servicio de registro
      this.signosService.registrar(signos).subscribe( () => {
        this.signosService.listar().subscribe(data => {
          this.signosService.signosCambio.next(data);
          this.signosService.mensajeCambio.next('Registro creado');
        });
      });
    }
    this.router.navigate(['signos']);
  }

  abrirDialogo(){
    this.dialog.open(PacienteDialogComponent, {
      width: '250px'
    });
  }

}
