# Sarv Jagat Product Management System (Admin Panel) – Complete Specification

## Project Overview

Develop a modern, responsive, professional Product Management Admin Panel for **Sarv Jagat (SJ)**.

The purpose of this admin panel is to allow internal staff to easily create, edit, update, delete, and manage industrial products that will be displayed on the public website:

* sarvjagat.com
* Product Categories
* Product Listings
* Product Detail Pages

The system must be scalable because new products will be added frequently.

---

# Brand Identity

The design language must follow the existing Sarv Jagat brand.

Reference:

* https://www.sarvjagat.in
* Sarv Jagat Social Media Profiles

Design Style:

* Industrial
* Professional
* Clean
* Modern Manufacturing Company
* B2B Equipment Industry Standard

Must feel premium and trustworthy.

---

# Technology Stack

Database:

MongoDB Atlas

Connection:

mongodb+srv://sarvjagat_db_user:oZJFLfxYNFjy0Kpt@cluster0.3rfov0z.mongodb.net/

Database Name:

sarvjagat

Image Storage:

Store images and videos as Base64 initially.


Authentication:

* Admin Login
* JWT Authentication

---

# Responsive Requirements

Must work perfectly on:

## Desktop

* 1920px
* 1600px
* 1440px
* 1366px

## Tablet

* iPad
* Android Tablets

## Mobile

* Android
* iPhone

Admin panel must be fully usable from mobile devices.

---

# Admin Dashboard

After login, admin should see:

### Dashboard Cards

* Total Products
* Total Categories
* Recently Added Products
* Recently Updated Products

### Quick Actions

* Add Product
* Manage Products
* Manage Categories

---

# Product Categories Module

Products belong to categories.

Examples:

* Screw Air Compressor
* Variable Speed Screw Compressor
* Two Stage Screw Compressor
* Oil Free Compressor
* Reciprocating Compressor
* High Pressure Compressor
* Booster Compressor
* PET Compressor
* Water Cooled Compressor
* Vacuum Pump
* Refrigerated Air Dryer
* Heatless Air Dryer
* Air Receiver Tank
* Air Filters
* Condensate Drain
* Spare Parts

Admin should be able to:

* Create Category
* Edit Category
* Delete Category

---

# Product Module

Admin can:

* Add Product
* Edit Product
* Delete Product
* Duplicate Product
* Publish Product
* Unpublish Product

---

# Product Data Fields

## 1 Product Title

Examples:

* 10 HP 10 Bar SJ Variable Speed Screw Air Compressor
* 30 HP Fixed Speed Screw Compressor
* 100 HP Two Stage PM VFD Compressor

Field Type:

Text

Required:

Yes

---

## 2 Product Slug

Auto Generated

Example:

10-hp-10-bar-sj-variable-speed-screw-air-compressor

Editable

Required

---

## 3 Product Images

Multiple Images

Features:

* Drag and Drop
* Upload Multiple
* Sort Images
* Preview Images

Storage:

Base64

Required:

Minimum 1 Image

---

## 4 Product Videos

Multiple Videos

Storage:

Base64

Optional

---

## 5 Product Price

Field Type:

Number

Optional

Supports:

* INR
* USD

---

## 6 Product Category

Dropdown

Single Selection

Required

---

## 7 Model Number

Examples:

* SJ-RV10
* SJ-R30
* SJ-TS100

Required

---

## 8 Power Rating

Examples:

* 10 HP
* 7.5 KW
* 100 HP

Required

---

## 9 Pressure Rating

Examples:

* 8 Bar
* 10 Bar
* 12 Bar
* 16 Bar

Required

---

## 10 Air Flow

Examples:

* 35 CFM
* 3.7 m³/min
* 500 LPM

Required

---

## 11 Product Description

Rich Text Editor

Features:

* Headings
* Tables
* Bullet Lists
* Images
* Videos

Required

---

## 12 Product Specifications

Dynamic Specification Table

Example:

| Parameter  | Value      |
| ---------- | ---------- |
| Power      | 10 HP      |
| Pressure   | 10 Bar     |
| Air Flow   | 35 CFM     |
| Cooling    | Air Cooled |
| Drive Type | VFD        |

Admin can add unlimited rows.

---

## 13 SEO Title

Required

Max 60 Characters

---

## 14 SEO Description

Required

Max 160 Characters

---

## 15 SEO Keywords

Comma Separated

Optional

---

## 16 Product Status

Values:

* Draft
* Published
* Archived

---

# MongoDB Schema

```javascript
{
  title: String,
  slug: String,

  category: String,

  modelNumber: String,

  powerRating: String,

  pressureRating: String,

  airFlow: String,

  price: Number,

  images: [String],

  videos: [String],

  description: String,

  specifications: [
    {
      key: String,
      value: String
    }
  ],

  seoTitle: String,

  seoDescription: String,

  seoKeywords: [String],

  status: String,

  createdAt: Date,

  updatedAt: Date
}
```

# Product Listing Page

Admin Side

Features:

* Search Product
* Filter Category
* Sort By Date
* Sort By Name
* Pagination

Table Columns:

* Image
* Product Title
* Category
* Model Number
* Status
* Date
* Actions

Actions:

* View
* Edit
* Delete
* Duplicate

# Public Website Structure

Products

↓

Category

↓

Product Listing

↓

Product Detail

Example:

Products

↓

Screw Air Compressors

↓

10 HP Variable Speed Screw Compressor

↓

Product Detail Page

# Product Detail Page Layout

Hero Section

* Product Image Gallery
* Product Name
* Price
* Category
* Model Number

Technical Information

* Power Rating
* Pressure Rating
* Air Flow

Description

Specifications Table

Videos

Related Products

Inquiry Form

# Search Functionality

Global Search

Search By:

* Product Title
* Model Number
* Category
* Description

# Performance Requirements

* Lazy Loading Images
* SEO Optimized
* Server Side Rendering
* Fast Loading
* Mobile Optimized

# Security

* JWT Authentication
* Admin Only Access
* MongoDB Validation



# Final Goal

Create a world-class industrial product management system for Sarv Jagat that enables:

* Fast Product Entry
* Easy Product Updates
* SEO Friendly Product Pages
* Mobile Responsive Management
* Category Based Navigation
* Professional Industrial Brand Appearance
* Scalable Architecture for Thousands of Products
* Direct Integration with sarvjagat.com
* MongoDB Driven Dynamic Website Rendering
* Enterprise Grade User Experience
