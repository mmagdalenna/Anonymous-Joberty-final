# 🕵️ Anonymous Joberty
**Platform for anonymous company reviews** - empowering employees to share honest feedback without compromising their identity.


## 🚀 Overview

This project was created as part of the **Mathematical Academy’s "Zero Knowledge Proofs"** course.

**Anonymous Joberty** is a platform designed for posting **anonymous company reviews**, with **user privacy as the highest priority**. It uses advanced cryptographic tools to ensure:

- ✅ Only **current or former employees** can submit a review  
- 🔁 Each verified member is allowed **only one review**, avoiding spam  
- 🛡 All reviews are **truly anonymous** yet **verifiably legitimate**

This mechanism ensures that the overall picture of a company is **objective**, **trustworthy**, and free from manipulation.

---

## 🔐 ZK Semaphore Protocol

At the core of Anonymous Joberty lies the **ZK Semaphore** protocol — a powerful zero-knowledge primitive. It allows users to prove they are a legitimate group member (e.g., an employee) **without revealing their identity**.

Key benefits of using Semaphore:

- Anonymous proof of group membership  
- Enforcement of one-review-per-user  
- On-chain and off-chain compatibility

To make this work in-browser, **Webpack** is used to bundle the Semaphore code and related cryptographic logic so it runs seamlessly on the client side.

---

## 📦 Setup Instructions

1. **Build necessary files with Webpack**  
   ```bash
   npm run build

2. **Start the server**  
   ```bash
   node server.js

3. **Open the app in your browser**
   Navigate to: 
   ```bash
   npm run build
