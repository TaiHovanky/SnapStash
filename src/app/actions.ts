"use server"

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/connection';
import { deleteFileFromS3, storeFile } from '@/utils/file-storage';
import { ServerActionResult } from '@/types/server-action-result.type';
import { ImageMetadata } from '@/types/image.type';

const PAGE_SIZE = 10;

/**
 * Allows the user to upload an image. Saves image metadata to the database and BLOB to S3 bucket
 * @param {FormData} formData contains file attachment
 * @returns {Promise<ServerActionResult>} object containing success of the server action
 */
export const addImage = async (formData: FormData): Promise<ServerActionResult> => {
  // use zod to validate the formData
  const schema = z.object({
    fileAttachment: z.any(),
  });
  const data = schema.parse({
    fileAttachment: formData.get('fileAttachment')
  });

  try {
    const file: File = data.fileAttachment as File;

    if (!file) {
      return {
        error: true,
        title: "No file was selected for upload",
        description: "Please select a file and try again"
      };
    }

    // Store image metadata in MySQL database
    const fileId: string = uuidv4();
    await db('image').insert({
      image_id: fileId,
      file_name: file.name
    });

    // Store image in S3 bucket
    const bytes = await file.arrayBuffer();
    const buffer:Buffer = Buffer.from(bytes);
    await storeFile(buffer, fileId);

    revalidatePath('/');
    return { error: false, title: "Uploaded successfully" };
  } catch (error) {
    console.log('upload image err', error);
    return { error: true, title: 'Upload failed', description: 'Please try again' };
  }
}

/**
 * Gets a list of images. If no search term provided, gets all images. Otherwise filters by search term
 * @param {string} searchTerm File name that the user was searching for
 * @param {number} pageNumber Page number of the images to be retrieved
 * @returns {Promise<ServerActionResult>} object containing success of the server action
 */
export const findImages = async (searchTerm: string, pageNumber: number): Promise<ImageMetadata[] | ServerActionResult> => {
  const schema = z.object({
    fileName: z.string(),
  });
  const data = schema.parse({
    fileName: searchTerm
  });

  try {
    return await db('image')
      .select()
      .where('file_name', 'like', `%${data.fileName}%`)
      .limit(PAGE_SIZE)
      .offset(pageNumber * PAGE_SIZE);
  } catch (err) {
    console.log('find images err', err);
    return { error: true, title: 'Image search failed' };
  }
}

/**
 * Deletes the image from the database and S3 bucket
 * @param {string} imgId id of the image to be deleted
 * @returns {Promise<ServerActionResult>} object containing success of the server action
 */
export const deleteImage = async (imgId: string): Promise<ServerActionResult> => {
  try {
    await db('image').del().where('image_id', imgId);
    await deleteFileFromS3(imgId);
    revalidatePath('/');
    return { error: false, title: "Deleted image successfully" };
  } catch (err) {
    console.log('delete image err', err);
    return { error: true, title: 'Image deletion failed', description: 'Please try again' };
  }
}