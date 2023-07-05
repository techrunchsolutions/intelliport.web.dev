import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';

import { FbAuthenticationService } from '../../../core/services/authfb.service';
import { AuthenticationService } from '../../../core/services/auth.service';
import { appconfig } from '../../../../environments/environment';
import { LAYOUT_MODE } from '../../../layouts/layouts.model';
import { AuthValidators } from '../auth-validators';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  
  layout_mode!: string;

  // set the currenr year
  year: number = new Date().getFullYear();
  loginForm!: FormGroup;
  inProgress = false;
  returnUrl!: string;
  error = '';
  
  // get hasLoggedIn(): boolean {
  //   return this.oAuthService.hasValidAccessToken();
  // }
  
  protected router: Router;
  protected route: ActivatedRoute;
  protected formBuilder: FormBuilder;
  protected toasterService: ToasterService;
  protected authService: AuthenticationService;
  protected fbAuthService: FbAuthenticationService;

  constructor(protected injector: Injector) {
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.formBuilder = injector.get(FormBuilder);
    this.toasterService = injector.get(ToasterService);
    this.authService = injector.get(AuthenticationService);
    this.fbAuthService = injector.get(FbAuthenticationService);
    // redirect to home if already logged in
    if (this.fbAuthService.currentUserValue) {
      this.router.navigate(['/']);
      document.body.style.backgroundImage = "url('')";
    }
  }

  ngOnInit(): void {
    document.body.style.backgroundImage = "url('')";
    this.layout_mode = LAYOUT_MODE
    if(this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }
    //Validation Set
    this.createForm();
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['admin', Validators.compose([
        // 1. Email Field is Required
        Validators.required,
        // 2. Check whether the entered email is valid email address
        AuthValidators.patternValidator(/^[a-zA-Z0-9_.-]+$/, { pattern: true })
        // AuthValidators.patternValidator(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/, { pattern: true })
      ])],
      password: ['P@ssw0rd', Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. Check whether the entered password has a number
        AuthValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. Check whether the entered password has upper case letter
        AuthValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. Check whether the entered password has a lower-case letter
        AuthValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. Check whether the entered password has a special character
        // AuthValidators.patternValidator(/(?=.*[!@#$%^&*()_+<>?:"'])[!@#$%^&*()_+<>?:"']/, { hasSpecialCharacter: true }),
        // 6. Has a minimum length of 8 characters 1q2w3E*
        Validators.minLength(8)
      ])]
    });
  }
  
  /**
   * Form submit
   */
  onSubmit() {    
    // stop here if form is invalid
    if (this.loginForm.invalid) return;
    this.inProgress = true;
    
    this.authService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      () => {
        // this.inProgress = false;
        // const _hasLoggedIn = this.authService.hasLoggedIn;  
        console.log('Login was successful!');
        if (this.returnUrl.length > 1) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.router.navigate(['/dashboard']);
        }            
      },
      (error: string) => {
        this.inProgress = false;
        this.error = error ? error : '';

        this.toasterService.error(
          this.error = error ? error : '' ||
          'AbpAccount::DefaultErrorMessage',
          null,
          { life: 7000 },
        );
      }
    ),
    finalize(() => (this.inProgress = false));
    
  }
}