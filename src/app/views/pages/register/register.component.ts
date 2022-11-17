import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerPayload = {
    user: {
      name: '',
      email: '',
      password: ''
    }
  };
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {}

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log('abc');

    if (this.registerForm.invalid) {
      return;
    }
    this.registerPayload.user.name = this.registerForm.get('name')!.value;
    this.registerPayload.user.email = this.registerForm.get('email')!.value;
    this.registerPayload.user.password = this.registerForm.get('password')!.value;

    this.authService.register(this.registerPayload).subscribe({
      next: () => {
        console.log('Register success');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.log('Register fail');
        this.loading = false;
      },
    });
  }
}
