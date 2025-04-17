import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dasboad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dasboad.component.html',
  styleUrl: './dasboad.component.scss'
})
export class DasboadComponent implements OnInit {
  constructor(private http: HttpClient, private routes: Router) {}
  users: any[] = [];
  listUser() {
    this.http.get<any>('https://reqres.in/api/users?page=1').subscribe(res => {
      this.users = res.data;
    })
  }
  deleteUser(idUser: number){
     this.http.delete<any>(`https://reqres.in/api/users/${idUser}`).subscribe({
      next: res => {
        this.users = this.users.filter(user => user.id !== idUser)
        console.log("Xóa thành công")
      },
      error: err => {
        console.log("Lỗi xóa",err)
      }
     })
  }
  updateUser(id: number) {
    this.routes.navigateByUrl(`/app-edit-user/${id}`)
  }
  addUser() {
    this.routes.navigateByUrl('/app-add-user')
  }
  ngOnInit() {
    this.http.get<any>('https://reqres.in/api/users?page=1').subscribe(res => {
      let apiUsers = res.data;
      const addedUsers = JSON.parse(localStorage.getItem('addedUsers') || '[]');
      this.users = [...apiUsers, ...addedUsers];
    });
  }
}
