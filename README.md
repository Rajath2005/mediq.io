# MediQ 🏥

<div align="center">
  <img src="src/components/images/logo.jpg" alt="MediQ Logo" width="200"/>
  
  [![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
</div>

## 🚀 Overview

MediQ is a modern, comprehensive healthcare management platform that empowers users to take control of their health journey. Built with React and modern web technologies, it offers an intuitive interface and powerful features for effective health management.

<div align="center">
  <img src="src/components/images/Dashboard.jpg" alt="MediQ Dashboard" width="800"/>
</div>

## ✨ Features

### 🎯 Core Features
- **Smart Dashboard**
  - Personalized health metrics visualization
  - Activity tracking and progress reports
  - Custom health goals setting

- **Appointment Management**
  - Easy scheduling system
  - Real-time availability checking
  - Appointment reminders
  
- **Medication Tracking**
  - Automated reminder system
  - Medication history
  - Prescription management

- **Health Resources**
  - Educational content
  - Health tips and articles
  - Video consultations

### 💫 Technical Features
- Responsive design across all devices
- PWA support for offline access
- End-to-end encryption
- Real-time notifications

MediQ is a health-focused React web app that offers users a platform to manage their well-being through tools like a personal dashboard, health tips, and appointment tracking. Now integrated with a **Login and Signup system**, MediQ offers secure and personalized user experiences.

## 🖼️ Project Preview

<p align="center">
  <img src="src/components/images/login.jpg" alt="Login Page Preview" width="600"/>
  <br/>
  <em>Login page (desktop view)</em>
</p>
<p align="center">
  <img src="src/components/images/Sign up .jpg" alt="Login Page Preview" width="600"/>
  <br/>
  <em>Sign up page (desktop view)</em>
</p>

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rajath2005/mediq.io.git
   cd mediq.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## 📁 Project Structure

.
├── ```
├── 📦 
├── ├─ .gitattributes
├── ├─ .gitignore
├── ├─ LICENSE
├── ├─ README.md
├── ├─ command-line
├── ├─ package-lock.json
├── ├─ package.json
├── ├─ postcss.config.js
├── ├─ public
├── │  ├─ favicon.ico
├── │  ├─ index.html
├── │  ├─ logo192.png
├── │  ├─ logo512.png
├── │  ├─ manifest.json
├── │  └─ robots.txt
├── ├─ src
├── │  ├─ App.css
├── │  ├─ App.js
├── │  ├─ App.test.js
├── │  ├─ components
├── │  │  ├─ Appointments
├── │  │  │  └─ Appointments.js
├── │  │  ├─ Button.css
├── │  │  ├─ Button.js
├── │  │  ├─ ComponentName.css
├── │  │  ├─ Footer.css
├── │  │  ├─ Footer.js
├── │  │  ├─ Footer.jsx
├── │  │  ├─ Hero.css
├── │  │  ├─ Hero.js
├── │  │  ├─ HeroSection.js
├── │  │  ├─ Loading06.css
├── │  │  ├─ LoadingText.js
├── │  │  ├─ Login.css
├── │  │  ├─ Login.js
├── │  │  ├─ Navbar.css
├── │  │  ├─ Navbar.js
├── │  │  ├─ Preloader.css
├── │  │  ├─ Preloader.js
├── │  │  ├─ Profile
├── │  │  │  └─ Profile.js
├── │  │  ├─ SearchBar.css
├── │  │  ├─ SearchBar.js
├── │  │  ├─ ServicesSection.css
├── │  │  ├─ ServicesSection.js
├── │  │  ├─ Settings
├── │  │  │  └─ Settings.js
├── │  │  ├─ SignInSide.jsx
├── │  │  ├─ Signup.css
├── │  │  ├─ Signup.js
├── │  │  ├─ UserProfileDropdown.css
├── │  │  ├─ UserProfileDropdown.js
├── │  │  ├─ assets
├── │  │  │  └─ images
├── │  │  │     └─ default-avatar.png
├── │  │  └─ images
├── │  │     ├─ Dashboard.jpg
├── │  │     ├─ Sign up .jpg
├── │  │     ├─ back.jpeg
├── │  │     ├─ hero.jpeg
├── │  │     ├─ login.jpg
├── │  │     └─ logo.jpg
├── │  ├─ index.css
├── │  ├─ index.js
├── │  ├─ logo.svg
├── │  ├─ pages
├── │  │  ├─ AboutUs.css
├── │  │  ├─ AboutUs.js
├── │  │  ├─ Appointments.js
├── │  │  ├─ BookAppointment.js
├── │  │  ├─ Consultation.js
├── │  │  ├─ Contact.css
├── │  │  ├─ Contact.js
├── │  │  ├─ OurImages
├── │  │  │  ├─ Rajath.jpeg
├── │  │  │  ├─ Rithesh.jpeg
├── │  │  │  ├─ Sanath.jpeg
├── │  │  │  ├─ github.png
├── │  │  │  ├─ gmail.png
├── │  │  │  ├─ linkedin.png
├── │  │  │  └─ sheethal.jpg
├── │  │  ├─ Profile.js
├── │  │  ├─ SearchPage.js
├── │  │  └─ ServicesPage.js
├── │  ├─ reportWebVitals.js
├── │  ├─ setupTests.js
├── │  └─ styles
├── │     └─ SearchPage.css
├── └─ tailwind.config.js
├── ```


## 🔧 Configuration

Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=your_api_url
REACT_APP_API_KEY=your_api_key
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

If you find this project helpful, please give it a star ⭐️

## 📧 Contact

For any queries, reach out to us at support@mediq.io
