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
  constructor(private http: HttpClient, private routes: Router) { }
  users: any[] = [];
  listUser() {
    this.http.get<any>('https://reqres.in/api/users?page=1').subscribe(res => {
      this.users = res.data;
    })
  }
  deleteUser(idUser: number) {
    this.http.delete<any>(`https://reqres.in/api/users/${idUser}`).subscribe({
      next: res => {
        // Xóa từ users hiện tại
        this.users = this.users.filter(user => user.id !== idUser);
        // Xóa từ addedUsers nếu có
        const addedUsers = JSON.parse(localStorage.getItem('addedUsers') || '[]');
        const updatedAddedUsers = addedUsers.filter((user: any) => user.id !== idUser);
        localStorage.setItem('addedUsers', JSON.stringify(updatedAddedUsers));
        // Lưu danh sách users hiện tại
        localStorage.setItem('users', JSON.stringify(this.users));
        console.log("Xóa thành công");
      },
      error: err => {
        console.log("Lỗi xóa", err)
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
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const addedUsers = JSON.parse(localStorage.getItem('addedUsers') || '[]');
      const editedUser = JSON.parse(localStorage.getItem('edituser') || 'null');
    
      if (storedUsers.length > 0) {
        this.users = [...storedUsers];
        if (editedUser) {
          const index = this.users.findIndex(user => user.id === editedUser.id);
          if (index !== -1) {
            this.users[index] = editedUser;
          }
        }
    
        if (addedUsers.length > 0) {
          addedUsers.forEach((newUser: any) => {
            const exists = this.users.find(u => u.id === newUser.id);
            if (!exists) this.users.push(newUser);
          });
        }
    
        localStorage.setItem('users', JSON.stringify(this.users));
      } else {
        this.http.get<any>('https://reqres.in/api/users?page=1').subscribe(res => {
          this.users = res.data;
          if (addedUsers.length > 0) {
            this.users = [...this.users, ...addedUsers];
          }
    
          localStorage.setItem('users', JSON.stringify(this.users));
        });
      }
      localStorage.removeItem('edituser');
    }
     
}  

