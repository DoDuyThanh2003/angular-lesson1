import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports:[FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
      email = 'eve.holt@reqres.in'
      password = 'cityslicka'
      message = ''
      constructor(private http: HttpClient, private router: Router) {}
      login() {
        this.http.post<any>('https://reqres.in/api/login', {
          email: this.email,
          password: this.password
        }).subscribe({
          next: res => {
            localStorage.setItem("token",res.token)
            alert(this.message = "Success Login")
            this.router.navigateByUrl('/dasboad')
          },
          error: () => {
            alert(this.message = "Login failed")
          }
        })
      }
}
