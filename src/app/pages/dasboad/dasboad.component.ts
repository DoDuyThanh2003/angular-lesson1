import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dasboad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dasboad.component.html',
  styleUrl: './dasboad.component.scss'
})
export class DasboadComponent implements OnInit {
  constructor(private http: HttpClient) {}
  users: any[] = [];
  listUser() {
    this.http.get<any>('https://reqres.in/api/users?page=1').subscribe(res => {
      this.users = res.data;
    })
  }
  ngOnInit() {
    this.listUser();
  }
}
