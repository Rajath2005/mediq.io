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
  <img src="public/images/dashboard-preview.png" alt="MediQ Dashboard" width="800"/>
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

```
mediq.io/
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   └── preview/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── HealthMetrics.js
│   │   │   ├── ActivityTracker.js
│   │   │   └── GoalsWidget.js
│   │   ├── Appointments/
│   │   │   ├── Calendar.js
│   │   │   └── BookingForm.js
│   │   ├── Reminders/
│   │   │   ├── MedicationList.js
│   │   │   └── ReminderSettings.js
│   │   └── Resources/
│   │       ├── ArticleList.js
│   │       └── VideoConsult.js
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   │   └── Home.styles.js
│   │   ├── Profile/
│   │   │   ├── Profile.js
│   │   │   └── Profile.styles.js
│   │   └── Settings/
│   ├── contexts/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── tests/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

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
