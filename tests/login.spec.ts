import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page'

let loginPage: LoginPage

test.beforeEach(async ({page})=> {
  loginPage = new LoginPage(page)
})

test('must successfully login', async ({ page }) => {
  await loginPage.go();
  await loginPage.signIn('qa', 'cademy');
  await loginPage.userLoggedIn()
});

test('wrong password', async ({ page }) => {
  await loginPage.go();
  await loginPage.signIn('qa', 'abc123');
  await loginPage.toastMessage('Oops! Credenciais inválidas :(');
});


test('mandatory field name', async ({ page }) => {
  await loginPage.go();
  await loginPage.signIn('', 'abc123');
  await loginPage.toastMessage('Informe o seu nome de usuário!');
});

test('mandatory field password', async ({ page }) => {
  await loginPage.go();
  await loginPage.signIn('qa', '');
  await loginPage.toastMessage('  Informe a sua senha secreta!');
});