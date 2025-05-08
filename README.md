# 📖 **Activity Booking API – Comprehensive README**

Welcome to the **Activity Booking API**! This README provides everything you need: setup instructions, environment configuration, API routes, **sample requests and responses (including edge cases)**, and how to test using Postman or curl.

---

## 🚀 **Setup Instructions**

1️⃣ **Clone the repository**

```bash
git clone https://github.com/SOME-1HING/activity-booking-app
cd activity-booking-app
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Set up environment variables**

Create a `.env` file:

```env
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4️⃣ **Run the server**

```bash
npm start
```

Server runs on **[http://localhost:5000](http://localhost:5000)**

---

## 🌐 **API Routes & Usage Examples**

🔗 Postman Collection: [Open in Postman](https://elements.getpostman.com/redirect?entityId=24091633-c30f9593-c95f-4cae-8054-7d8c055c0bca&entityType=collection)

<details>
<summary>🧑‍💻 User Registration</summary>

**POST** `/api/users/register`

✅ **Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "securePass123"
}
```

🟢 **201 Created:**

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

🔴 **400 Missing Fields:**

```json
{
  "success": false,
  "message": "Missing fields: email, password"
}
```

🔴 **400 Email Exists:**

```json
{
  "success": false,
  "message": "Email already exists"
}
```

🔴 **500 Server Error:**

```json
{
  "success": false,
  "message": "Internal server error"
}
```

</details>

<details>
<summary>🔑 User Login</summary>

**POST** `/api/users/login`

✅ **Request:**

```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

🟢 **200 OK:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<JWT token>"
  }
}
```

🔴 **400 Missing Fields:**

```json
{
  "success": false,
  "message": "Missing fields: email"
}
```

🔴 **404 User Not Found:**

```json
{
  "success": false,
  "message": "User not found"
}
```

🔴 **400 Invalid Credentials:**

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

🔴 **500 Server Error:**

```json
{
  "success": false,
  "message": "Internal server error"
}
```

</details>

<details>
<summary>📋 Get All Activities</summary>

**GET** `/api/activities`

🟢 **200 OK:**

```json
{
  "success": true,
  "message": "Activities retrieved successfully",
  "data": [
    {
      "_id": "activityId1",
      "title": "Yoga Class",
      "description": "Morning yoga session",
      "location": "Park Center",
      "dateTime": "2025-05-10T08:00:00Z"
    },
    {
      "_id": "activityId2",
      "title": "Art Workshop",
      "description": "Beginner painting class",
      "location": "Community Hall",
      "dateTime": "2025-05-11T14:00:00Z"
    }
  ]
}
```

🔴 **500 Server Error:**

```json
{
  "success": false,
  "message": "Internal server error"
}
```

</details>

<details>
<summary>➕ Add Activity</summary>

**POST** `/api/activities/add`

Headers: `Authorization: Bearer <JWT token>`

✅ **Request:**

```json
{
  "title": "Cooking Class",
  "description": "Italian pasta making",
  "location": "Kitchen Studio",
  "dateTime": "2025-05-15T18:00:00Z"
}
```

🟢 **201 Created:**

```json
{
  "success": true,
  "message": "Activity successfully added",
  "data": {
    "activityId": "newActivityId"
  }
}
```

🔴 **400 Missing Fields:**

```json
{
  "success": false,
  "message": "Missing fields: title, description"
}
```

🔴 **401 Unauthorized:**

```json
{
  "success": false,
  "message": "No token, authorization denied"
}
```

🔴 **500 Server Error:**

```json
{
  "success": false,
  "message": "Internal server error"
}
```

</details>

<details>
<summary>📅 Book Activity</summary>

**POST** `/api/activities/book`

Headers: `Authorization: Bearer <JWT token>`

✅ **Request:**

```json
{
  "activityId": "activityId1"
}
```

🟢 **200 OK:**

```json
{
  "success": true,
  "message": "Activity booked successfully"
}
```

🔴 **400 Missing Field:**

```json
{
  "success": false,
  "message": "Missing field: activityId"
}
```

🔴 **404 Activity Not Found:**

```json
{
  "success": false,
  "message": "Activity not found"
}
```

🔴 **401 Unauthorized:**

```json
{
  "success": false,
  "message": "No token, authorization denied"
}
```

🔴 **500 Server Error:**

```json
{
  "success": false,
  "message": "Internal server error"
}
```

</details>

<details>
<summary>📦 Get My Bookings</summary>

**GET** `/api/activities/my-bookings`

Headers: `Authorization: Bearer <JWT token>`

🟢 **200 OK:**

```json
{
  "success": true,
  "message": "User bookings retrieved successfully",
  "data": [
    {
      "_id": "activityId1",
      "title": "Yoga Class",
      "description": "Morning yoga session",
      "location": "Park Center",
      "dateTime": "2025-05-10T08:00:00Z",
      "bookings": [
        { "userId": "userId123" }
      ]
    }
  ]
}
```

🔴 **401 Unauthorized:**

```json
{
  "success": false,
  "message": "No token, authorization denied"
}
```

🔴 **500 Server Error:**

```json
{
  "success": false,
  "message": "Internal server error"
}
```

</details>

---
