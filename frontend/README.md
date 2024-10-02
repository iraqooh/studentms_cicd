# Cyber School Frontend

Cyber School is a web application for managing school data including student biodata, school fees, and payments. This repository contains the frontend built with Vue.js and Bootstrap for styling.

## Features

- Display school analytics including the number of registered students, total fees expected, total payments, outstanding fees, and percentage of fees paid.

- List students and view their details, fees, and payments.

- Add new students and manage their school fees and payments.

- Responsive design using Bootstrap.

## Installation

1. Clone the repository: ```git clone https://github.com/iraqooh/cyber_school_frontend_web.git```

2. Navigate to the project directory: ```cd cyber_school_frontend_web```

3. Install the dependencies: ```npm install```

## Usage

1. Start the development server: ```npm run serve```

2. Open your browser and navigate to `http://localhost:8080`.

## API Configuration

The frontend communicates with the backend [API](https://github.com/iraqooh/cyber_school_api). Ensure the API URL is correctly set in the `index.js` file:

```javascript
// src/api/index.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://your-backend-api-url/api/cyber_school', // Update with your backend API URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
```

## Components

1. HomeComponent: Displays school analytics, student list, student biodata, and payment details.

2. AddStudent: Form to add a new student along with school fees and an optional initial payment.

3. AddPayment: Form to add a new payment for a selected student.

4. EditStudent: Form to edit student biodata or delete the student from the database.

5. StudentsComponent, FeesComponent and PaymentsComponent: Display the associated details.

## Routes

The routes for the application are defined in src/router/index.js.

## Styling

The project uses Bootstrap for styling. Ensure Bootstrap CSS and JS are imported in main.js.

## License

This project is licensed under the GNU General Public License.

## Contributors

[Iraku Harry](https://github.com/iraqooh/)

[Atong Abraham Kur](https://github.com/Abram-MrRight)

[Akoldou Samuel](https://github.com/Akoldou)

[Ngong Abraham Kon](https://github.com/Ngongkon)

[Afiti Andrew](https://github.com/1efitiAnndrew)

[Geriga Sunday Drago](https://github.com/SundayDrago)

[Bill Cheptoyek](https://github.com/BILL-CHEPTOYEK)
