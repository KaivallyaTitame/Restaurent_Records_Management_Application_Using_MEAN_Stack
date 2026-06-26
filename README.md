# 🍽️ Restaurant Manager - MEAN Stack Application

A modern, full-stack restaurant management application built with MongoDB, Express.js, Angular, and Node.js (MEAN Stack).

![Restaurant Manager](https://img.shields.io/badge/MEAN-Stack-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Angular](https://img.shields.io/badge/Angular-19.2-red)
![Node.js](https://img.shields.io/badge/Node.js-Backend-brightgreen)

## ✨ Features

- 📊 **Dashboard Overview** - View total restaurant count at a glance
- ➕ **Add Restaurants** - Easy-to-use form for adding new restaurant records
- ✏️ **Edit Records** - Update existing restaurant information
- 🗑️ **Delete Records** - Remove restaurants from the database
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✅ **Form Validation** - Client-side validation for data integrity

## 🚀 Tech Stack

### Frontend
- **Angular 19.2** - Modern web framework
- **Bootstrap 5** - Responsive UI components
- **RxJS** - Reactive programming
- **TypeScript** - Type-safe JavaScript

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1** - Web application framework
- **MongoDB** - NoSQL database
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Restaurent_Records_Management_Application_Using_MEAN_Stack
```

### 2. Backend Setup

```bash
cd Server
npm install
```

Create a `.env` file in the Server directory:

```env
MONGODB_URI=mongodb://localhost:27017
PORT=5100
```

For production (MongoDB Atlas):

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/MEAN_Project?retryWrites=true&w=majority
PORT=5100
```

Start the backend server:

```bash
node server.js
```

The server will run on `http://localhost:5100`

### 3. Frontend Setup

```bash
cd Client
npm install
```

Start the Angular development server:

```bash
npx ng serve
```

The application will run on `http://localhost:4200`

## 🌐 Deployment

### Deploy Backend to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to the Server directory:
```bash
cd Server
```

3. Deploy:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `PORT` - 5100 (optional)

### Deploy Frontend to Vercel

1. Navigate to the Client directory:
```bash
cd Client
```

2. Build the application:
```bash
npm run build
```

3. Deploy:
```bash
vercel
```

4. Update the API URL in `src/app/shared/api.service.ts` to point to your deployed backend URL.

## 📁 Project Structure

```
Restaurent_Records_Management_Application_Using_MEAN_Stack/
├── Client/                          # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── restaurent-dash/    # Main dashboard component
│   │   │   └── shared/             # Shared services
│   │   └── ...
│   └── package.json
│
├── Server/                          # Node.js Backend
│   ├── server.js                   # Express server
│   ├── package.json
│   ├── vercel.json                 # Vercel configuration
│   └── .env.example                # Environment variables template
│
└── README.md
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/restaurents` | Get all restaurants |
| POST | `/restaurents` | Add new restaurant |
| PUT | `/restaurents/:id` | Update restaurant by ID |
| DELETE | `/restaurents/:id` | Delete restaurant by ID |

## 📝 Environment Variables

### Backend (.env)

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5100
```

## 🎨 UI Features

- **Gradient Backgrounds** - Beautiful purple gradient theme
- **Animated Icons** - Smooth bouncing animations
- **Hover Effects** - Interactive button and card effects
- **Modern Cards** - Clean, shadow-enhanced card design
- **Responsive Tables** - Mobile-friendly data display
- **Form Validation** - Real-time validation feedback

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use MongoDB Atlas for production databases
- Enable CORS only for trusted origins in production
- Implement authentication for production use

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or MongoDB Atlas credentials are correct
- Check firewall settings for MongoDB Atlas
- Verify connection string format

### CORS Errors
- Update CORS origin in `server.js` to match your frontend URL
- For production, add your Vercel frontend URL to allowed origins

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ using the MEAN Stack

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Happy Coding! 🚀**
