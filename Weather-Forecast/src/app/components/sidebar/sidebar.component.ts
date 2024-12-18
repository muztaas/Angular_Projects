import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    this.initSidebarToggle();
}

initSidebarToggle(): void {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('content');
  const toggler = document.getElementById('sidebarToggler');

  if (sidebar && content && toggler) {
    toggler.addEventListener('click', () => {
      if (sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');        
      } else {
        sidebar.classList.add('show');
      }
    });

    content.addEventListener('click', () => {
      if (sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
      }
    });
  }
}

}
