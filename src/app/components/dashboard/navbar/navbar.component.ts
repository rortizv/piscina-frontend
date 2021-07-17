import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from '../../../services/menu.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];

  constructor(private _menuService: MenuService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.cargarmenu();
  }

  roleAdmin() {
    return this.authService.getRolenameUser();
  }

  cargarmenu() {
    this._menuService.getMenu().subscribe(data => {
      this.menu = data;
      if(!this.roleAdmin()) {
        const index = this.menu.findIndex(item => item.id == '2');
        this.menu.splice(index, 1);
      }
    })
  }

}
