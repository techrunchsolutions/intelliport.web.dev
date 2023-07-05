import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { appconfig } from '../../../../environments/environment';
import { FbAuthenticationService } from '../../../core/services/authfb.service';
import { UserProfileService } from '../../../core/services/user.service';
import { LAYOUT_MODE } from '../../../layouts/layouts.model';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Register Component
 */
export class RegisterComponent implements OnInit {
  layout_mode!: string;

  signupForm!: FormGroup;
  submitted = false;
  successmsg = false;
  error = '';

  // set the currenr year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private fbAuthService: FbAuthenticationService,
    private userService: UserProfileService) { }

  ngOnInit(): void {

    this.layout_mode = LAYOUT_MODE
    if(this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }

    // Validation Set
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      if (appconfig.defaultauth === 'firebase') {
        this.fbAuthService.register(this.f.email.value, this.f.password.value).then((res: any) => {
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['']);
          }
        })
          .catch((error: string) => {
            this.error = error ? error : '';
          });
      } else {
        this.userService.register(this.signupForm.value)
          .pipe(first())
          .subscribe(
            (data: any) => {
              this.successmsg = true;
              if (this.successmsg) {
                this.router.navigate(['/account/login']);
              }
            },
            (error: any) => {
              this.error = error ? error : '';
            });
      }
    }
  }
}