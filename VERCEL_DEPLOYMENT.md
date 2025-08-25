# Vercel Deployment Guide for Blog System

This guide explains how to set up the blog system for deployment on Vercel, addressing the read-only file system issue.

## The Problem

Vercel's serverless functions run in a read-only environment, which means you cannot write to the file system in production. This affects our blog system which was initially designed to store blog posts and images in the file system.

## The Solution

We've updated the code to use Vercel's KV (Key-Value) storage for blog posts and Vercel Blob Storage for images when running in production, while still using the file system in development.

## Setup Instructions

### 1. Install Required Dependencies

The following dependencies have been added to the project:

```bash
npm install @vercel/kv @vercel/blob
```

### 2. Set Up Vercel KV

1. Log in to your Vercel dashboard
2. Select your project
3. Go to the "Storage" tab
4. Click "Create" under the KV section
5. Follow the prompts to create a new KV database
6. Once created, Vercel will automatically add the required environment variables to your project

### 3. Set Up Vercel Blob Storage

1. In your Vercel dashboard, go to the "Storage" tab
2. Click "Create" under the Blob section
3. Follow the prompts to create a new Blob store
4. Once created, Vercel will automatically add the required environment variables to your project

### 4. Environment Variables

Ensure the following environment variables are set in your Vercel project:

- `VERCEL_ENV`: Set automatically by Vercel (used to detect production environment)
- `KV_URL`: Set automatically when you create a KV database
- `KV_REST_API_URL`: Set automatically when you create a KV database
- `KV_REST_API_TOKEN`: Set automatically when you create a KV database
- `KV_REST_API_READ_ONLY_TOKEN`: Set automatically when you create a KV database
- `BLOB_READ_WRITE_TOKEN`: Set automatically when you create a Blob store

Also, make sure to set:

- `NEXT_PUBLIC_BASE_URL`: Your production URL (e.g., https://your-site.vercel.app)

### 5. Initial Data Migration

If you already have blog posts in your local development environment, you'll need to migrate them to Vercel KV. You can do this by:

1. Deploy your application to Vercel
2. Create a one-time migration script or manually add your first blog post through the admin interface

## How It Works

The code now checks if it's running in the Vercel production environment:

```javascript
const isVercelProduction = process.env.VERCEL_ENV === 'production';
```

Based on this check:

- In development: Uses the file system for storing blog posts and images
- In production: Uses Vercel KV for storing blog posts and Vercel Blob Storage for images

## Troubleshooting

If you encounter issues:

1. Check that all required environment variables are set in your Vercel project
2. Verify that you've set up both KV and Blob storage in your Vercel dashboard
3. Check the Vercel logs for any specific error messages

For more information, refer to:
- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Vercel Blob Storage Documentation](https://vercel.com/docs/storage/vercel-blob)