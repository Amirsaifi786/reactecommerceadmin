
```markdown
# 🚀 React E-commerce Admin Dashboard

A modern, full-stack responsive Admin Panel built with **React**, **Tailwind CSS**, and **Express**. This dashboard allows administrators to manage product inventories, categories, and image uploads through a clean and intuitive interface.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A045?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 📸 Preview

* **Dynamic Inventory:** Real-time CRUD for products with image previews.
* **Category Management:** Organized product grouping via a dedicated Category model.
* **Responsive UI:** Optimized for mobile, tablet, and desktop screens.

---

## ✨ Features

- **Product CRUD:** Add, Edit, Update, and Delete products with ease.
- **Image Uploads:** Integrated support for product images using `Multer` and `FormData`.
- **Category System:** Dynamic dropdowns populated from the Category database.
- **Live Search:** Instant client-side filtering of products.
- **Notifications:** Beautiful toast alerts for success and error handling via `react-toastify`.
- **Modern UI:** Built using Lucide Icons and Tailwind's glassmorphism-inspired design.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router v6, Tailwind CSS, Lucide Icons.
- **State Management:** React Hooks (`useState`, `useEffect`).
- **Data Fetching:** Axios.
- **Backend (Required):** Node.js, Express.js, MongoDB, Mongoose.
- **File Handling:** Multer (for image storage).

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/Amirsaifi786/reactecommerceadmin.git](https://github.com/Amirsaifi786/reactecommerceadmin.git)
cd reactecommerceadmin

```

### 2. Install dependencies

```bash
npm install

```

### 3. Environment Variables

Create a `.env` file in the root directory and add:

```env
REACT_APP_API_URL=http://localhost:5000

```

### 4. Run the application

```bash
npm start

```

The app will run at `http://localhost:3000`.

---

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components (Modals, Tables)
├── pages/          # Main views (ProductForm, ProductsList)
├── assets/         # Styles and static assets
├── utils/          # API configurations
└── App.js          # Routes and Layout

```

---

## 🔌 API Endpoints (MERN)

The dashboard is designed to interact with the following API structure:

### **Products**

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/products` | Get all products |
| `POST` | `/api/products` | Create product (Multipart/Form-data) |
| `PUT` | `/api/products/:id` | Update product by ID |
| `DELETE` | `/api/products/:id` | Delete product by ID |

### **Categories**

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/categories` | Get all categories |
| `POST` | `/api/categories` | Create a new category |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**.

---

**Developed with ❤️ by [Amir Saifi**](https://www.google.com/search?q=https://github.com/Amirsaifi786)

```
