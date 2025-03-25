# Isotron - ISO 27001 Information Classification Tool

Isotron is a web application designed to help organizations implement and maintain ISO 27001 compliance, with a specific focus on data classification and information security management. The platform serves as an interactive guide and educational resource for employees and stakeholders who need to understand how to properly classify, handle, and protect sensitive information according to information security best practices and standards.

## Project Overview

Isotron provides:

- An interactive document classification guide that walks users through a series of questions to determine the appropriate security classification level
- Detailed training modules that educate users on ISO 27001 principles and information security fundamentals
- Personalized security recommendations based on user inputs and organizational context
- Multilingual support (English, Norwegian, Polish)

The application is tailored for information security officers, compliance managers, and employees handling sensitive information, especially in organizations implementing or maintaining ISO 27001 compliance.

## Technical Implementation

Isotron is built using a modern web development stack:

- **Frontend Framework**: React (v19.0.0) with React Router DOM (v7.2.0) for client-side routing
- **Build Tool**: Vite (v6.2.1) for fast development and optimized production builds
- **Styling**: Tailwind CSS (v3.4.17) for utility-first CSS framework implementation
- **Code Quality**: ESLint (v9.21.0) with React-specific plugins
- **SVG Handling**: Vite SVGR plugin for importing SVG files as React components

The application follows a modular component-based architecture with main features including:

- Interactive classification guide with dynamic question flow
- Training module system with progress tracking
- ISO 27001 information repository
- Light/dark theme support
- Responsive design for various device sizes

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/isotron.git
cd isotron

# Install dependencies
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

This will start Vite's development server with hot module replacement at `http://localhost:5173`

### Building for Production

To build the application for production:

```bash
npm run build
```

This will generate optimized production files in the `dist` directory.

### Deploying to Firebase Hosting

1. Install Firebase CLI if you haven't already:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase in your project:

```bash
firebase init
```

4. Select Firebase Hosting and follow the prompts. When asked for your public directory, enter `dist`.

5. Deploy to Firebase:

```bash
firebase deploy
```

## Project Structure

The application is organized into several key components:

- **Classification Guide**: Walks users through a decision tree to classify sensitive information
- **Training Modules**: Provides educational content on information security principles
- **ISO 27001 Information**: Offers reference materials on the standard's requirements
- **Multilingual Support**: Accommodates international organizations with language options

## Contributors

Contributors
<div align="center">
🔥 **BRANNMURBRIGADEN** 🔥

</div>
<table>
  <tr>
    <td align="center"><a href="https://github.com/username1"><img src="https://img.shields.io/badge/👨‍💻-Jørgen%20Stranden-blue" height="50px" width="200px"/></a></td>
    <td align="center"><a href="https://github.com/username2"><img src="https://img.shields.io/badge/👨‍💻-Ask%20Eigil%20Borg-red" height="50px" width="200px"/></a></td>
    <td align="center"><a href="https://github.com/username3"><img src="https://img.shields.io/badge/👨‍💻-Jakob%20Storaas-green" height="50px" width="200px"/></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/username4"><img src="https://img.shields.io/badge/👨‍💻-Lauritz%20Pedersen-orange" height="50px" width="200px"/></a></td>
    <td align="center"><a href="https://github.com/username5"><img src="https://img.shields.io/badge/👨‍💻-Daniel%20Sandsdalen-purple" height="50px" width="200px"/></a></td>
    <td align="center"><img src="https://img.shields.io/badge/🛡️-Kristiania%20University-yellow" height="50px" width="200px"/></td>
  </tr>
</table>

This project was developed by **"Brannmurbrigaden"** - A group of 5 Cybersecurity students at Kristiania University College