import { Client, Databases, ID, Query, Storage } from "appwrite";
import configs from "../configs/config";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(configs.VITE_APPWRITE_URL)
      .setProject(configs.VITE_APPWRITE_PROJECT_ID);

    this.databases = new Databases(this.client);

    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        configs.VITE_APPWRITE_DATABASE_ID,
        configs.VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        configs.VITE_APPWRITE_DATABASE_ID,
        configs.VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        configs.VITE_APPWRITE_DATABASE_ID,
        configs.VITE_APPWRITE_COLLECTION_ID,
        slug
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        configs.VITE_APPWRITE_DATABASE_ID,
        configs.VITE_APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        configs.VITE_APPWRITE_DATABASE_ID,
        configs.VITE_APPWRITE_COLLECTION_ID,
        queries
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        configs.VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(configs.VITE_APPWRITE_BUCKET_ID, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return "/first%20post.png";
      // return await this.bucket.getFilePreview(configs.VITE_APPWRITE_BUCKET_ID, fileId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const service = new Service();

export default service;
