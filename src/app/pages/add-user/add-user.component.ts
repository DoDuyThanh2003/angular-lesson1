import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  constructor(private http: HttpClient, private routes: Router) { }
  user: any[] = [];
  newUser = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  }
  listUser() {
    this.http.get<any>('https://reqres.in/api/users?page=1').subscribe(res => {
      this.user = res.data
    })
  }
  creatUser() {
    if (this.newUser.id && this.newUser.avatar && this.newUser.first_name && this.newUser.last_name && this.newUser.email) {
      this.http.post<any>('https://reqres.in/api/users', this.newUser).subscribe({
        next: res => {
          const newUserWithId = { ...this.newUser, id: res.id };
          let savedUsers = JSON.parse(localStorage.getItem('addedUsers') || '[]');
          savedUsers.push(newUserWithId);
          localStorage.setItem('addedUsers', JSON.stringify(savedUsers));
          this.newUser = { id: 0, email: '', first_name: '', last_name: '', avatar: '' }
          this.routes.navigateByUrl('/dasboad');
        },
        error: err => {
          console.log("Error creat user", err)
        }
      })
    }

  }
}
