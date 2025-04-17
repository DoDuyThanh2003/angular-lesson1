import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  constructor(private http: HttpClient, private route:ActivatedRoute) {}
  selectedUser: any = {};
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.http.get<any>(`https://reqres.in/api/users/${id}`).subscribe(response => {
      this.selectedUser = response.data;
    });
  }
  updateUser(): void {
    this.http.put(`https://reqres.in/api/users/${this.selectedUser.id}`, this.selectedUser)
      .subscribe(response => {
        console.log('User updated!', response);
        alert('Cập nhật thành công!');
      });
  }
}
