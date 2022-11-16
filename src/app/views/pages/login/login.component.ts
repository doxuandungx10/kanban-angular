import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Constant } from 'src/app/shared/constants/constant.class';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  validateForm: FormGroup;
  returnUrl: string;
  messageError: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    // this.returnUrl =
    //   this.route.snapshot.queryParams.returnUrl || Constant.ADMIN_DASHBOARD;
    const currentUser = Cookie.get(Constant.TOKEN);
    if (currentUser) {
      this.router.navigate([Constant.ADMIN_DASHBOARD]);
    }
  }

  submitForm(): void {}
}
