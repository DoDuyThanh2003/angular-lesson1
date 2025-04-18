import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute, private routes: Router) { }
  selectedUser: any = {};
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const localUser = users.find((u: any) => u.id == id);
      if (localUser) {
        this.selectedUser = localUser;
        return;
      }
    }
    this.http.get<any>(`https://reqres.in/api/users/${id}`).subscribe(response => {
      this.selectedUser = response.data;
    });
  }
  updateUser(): void {
      this.http.put(`https://reqres.in/api/users/${this.selectedUser.id}`, this.selectedUser)
        .subscribe(response => {
          console.log('User updated!', response);
          const storedUsers = localStorage.getItem('users');
          let users = storedUsers ? JSON.parse(storedUsers) : [];
          const index = users.findIndex((u: any) => u.id === this.selectedUser.id);
          if (index !== -1) {
            users[index] = this.selectedUser;
            localStorage.setItem('users', JSON.stringify(users));
          }
          alert('Cập nhật thành công!');
          this.routes.navigateByUrl('/dasboad');
        });
  }
}
