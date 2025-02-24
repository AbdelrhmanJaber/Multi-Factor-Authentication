# Multi-Factor-Authentication using nodejs , express and mongoDB

## Description
This project implements a secure Multi-Factor Authentication (MFA) system using Node.js and Express. It includes user registration, login, and MFA setup using Time-based One-Time Passwords (TOTP) with speakeasy and qrcode.

## Features
User Registration & Authentication: Secure password hashing with bcryptjs.
MFA Setup & Verification: Generates a secret key and QR code for TOTP authentication.
Token-Based Authentication: Uses JWT for session management.
MFA Reset: Allows users to disable and reset MFA.

### Installation

To test locally 

1. Clone the repo
```sh
git clone https://github.com/AbdelrhmanJaber/Multi-Factor-Authentication.git
```

2. Install dependencies

```sh
npm install express dotenv passport pass port-local cors bcrypt.js jsonwebtoken mongoose speakeasy qrcode express-session nodemon 
```
