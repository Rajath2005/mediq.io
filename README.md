# MediQ 🏥

<div align="center">
  <img src="src/components/images/logo.jpg" alt="MediQ Logo" width="200"/>
  
  [![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
</div>

## 🚀 Overview

MediQ is a modern, comprehensive healthcare management platform that empowers users to take control of their health journey. Built with React and modern web technologies, it offers an intuitive interface and powerful features for effective health management.

## 🌗 Dark & Light Mode Support

MediQ supports both **Dark Mode** and **Light Mode** to enhance user comfort and accessibility. The interface automatically adapts based on user preferences or system settings.

<div align="center">
  <img src="src/components/images/light.jpg" alt="MediQ Light Mode" width="400"/>
  &nbsp;&nbsp;&nbsp;
  <img src="src/components/images/dark.jpg" alt="MediQ Dark Mode" width="400"/>
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

Take a look at the key screens and sections of our project! Below you'll find visual previews and brief descriptions to help you get a feel for the design and functionality. Each image is centered and includes a caption for context. For a more dynamic demonstration, a GIF walkthrough is also included at the end.

---

<table>
  <tr>
    <td align="center">
      <img src="src/components/images/login.jpg" alt="Login Page Preview" width="340"/><br/>
      <em>Login page (desktop view)</em>
    </td>
    <td align="center">
      <img src="src/components/images/Sign up .jpg" alt="Sign Up Page Preview" width="340"/><br/>
      <em>Sign up page (desktop view)</em>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <img src="Service.png" alt="Service Section Image" width="600"/><br/>
      <em>Services Section (desktop view)</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="src/AboutUs.png" alt="About Us Image" width="340"/><br/>
      <em>About Us (desktop view)</em>
    </td>
    <td align="center">
      <img src="src/ Our_team.png" alt="Our Team Image" width="340"/><br/>
      <em>Our Team (desktop view)</em>
    </td>
  </tr>
</table>

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

   ## 📁 Project Folder Structure

```bash
📦 mediq.io
├── .gitattributes
├── .gitignore
├── LICENSE
├── README.md
├── command-line
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   ├── styles
│   │   └── SearchPage.css
│   ├── components
│   │   ├── Appointments
│   │   │   └── Appointments.js
│   │   ├── Button.css
│   │   ├── Button.js
│   │   ├── ComponentName.css
│   │   ├── Footer.css
│   │   ├── Footer.js
│   │   ├── Footer.jsx
│   │   ├── Hero.css
│   │   ├── Hero.js
│   │   ├── HeroSection.js
│   │   ├── Loading06.css
│   │   ├── LoadingText.js
│   │   ├── Login.css
│   │   ├── Login.js
│   │   ├── Navbar.css
│   │   ├── Navbar.js
│   │   ├── Preloader.css
│   │   ├── Preloader.js
│   │   ├── Profile
│   │   │   └── Profile.js
│   │   ├── SearchBar.css
│   │   ├── SearchBar.js
│   │   ├── ServicesSection.css
│   │   ├── ServicesSection.js
│   │   ├── Settings
│   │   │   └── Settings.js
│   │   ├── SignInSide.jsx
│   │   ├── Signup.css
│   │   ├── Signup.js
│   │   ├── UserProfileDropdown.css
│   │   ├── UserProfileDropdown.js
│   │   ├── assets
│   │   │   └── images
│   │   │       └── default-avatar.png
│   │   └── images
│   │       ├── Dashboard.jpg
│   │       ├── Sign up .jpg
│   │       ├── back.jpeg
│   │       ├── hero.jpeg
│   │       ├── login.jpg
│   │       └── logo.jpg
│   └── pages
│       ├── AboutUs.css
│       ├── AboutUs.js
│       ├── Appointments.js
│       ├── BookAppointment.js
│       ├── Consultation.js
│       ├── Contact.css
│       ├── Contact.js
│       ├── Profile.js
│       ├── SearchPage.js
│       ├── ServicesPage.js
│       └── OurImages
│           ├── Rajath.jpeg
│           ├── Rithesh.jpeg
│           ├── Sanath.jpeg
│           ├── github.png
│           ├── gmail.png
│           ├── linkedin.png
│           └── sheethal.jpg



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

For any queries, reach out to us at [support@mediq.io](https://rajath2005.github.io/mediq.io/#/contact)
