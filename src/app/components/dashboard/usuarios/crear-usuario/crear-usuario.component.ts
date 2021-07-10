import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from '../../../../services/usuario.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  tiposUsuarios: any[] = ['administrador', 'propietario'];
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private _usuarioService: UsuarioService,
              private router: Router,
              private messageService: MessageService) { 
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      torre_apto: ['', Validators.required],
      tipo_usuario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  crearUsuario() {
      if (this.form.invalid) {
        this.messageService.showMessage("LOS CAMPOS MARCADOS EN ROJO DEBEN SER VERIFICADOS");
        return;
      }

          this._usuarioService.crearUsuario(this.form.value).subscribe(
            (response: Usuario) => {
              this.messageService.showMessage("USUARIO GUARDADO EXITOSAMENTE");
              this.router.navigate(["/dashboard/usuarios"]);
            },
            (error: any) => {
              this.messageService.showMessage("ERROR AL GUARDAR EL USUARIO");
              this.router.navigate(["/dashboard/usuarios"]);
            }
          );
        
        (error: any) => {
          this.messageService.showMessage("YA EXISTE UN REGISTRO CON LOS DATOS SUMISTRADOS");
        }

  }

}
