"use server"

import { z } from 'zod';
import db from '../db/connection';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { storeFile } from '@/utils/file-storage';
import { ServerActionResult } from '@/types/server-action-result.type';
import { ImageMetadata } from '@/types/image.type';

export async function addImage(formData: FormData): Promise<ServerActionResult> {
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

    const bytes = await file.arrayBuffer();
    const buffer:Buffer = Buffer.from(bytes);
    const fileId: string = uuidv4();

    await db('image').insert({
      image_id: fileId,
      file_name: file.name
    });
    await storeFile(buffer, fileId);

    revalidatePath('/');
    return { error: false, title: "Uploaded successfully" };
  } catch (error) {
    console.log('upload image err', error);
    return { error: true, title: 'Upload failed', description: 'Please try again' };
  }
}

export async function findImages(searchTerm: string): Promise<ImageMetadata[] | ServerActionResult> {
  const schema = z.object({
    fileName: z.string(),
  });
  const data = schema.parse({
    fileName: searchTerm
  });

  try {
    return await db('image').select().where('file_name', 'like', `%${data.fileName}%`);
  } catch (err) {
    console.log('find images err', err);
    return { error: true, title: 'Image search failed' };
  }
}


export async function deleteImage(imgId: string): Promise<ServerActionResult> {
  try {
    await db('image').del().where('image_id', imgId);
    revalidatePath('/');
    return { error: false, title: "Deleted image successfully" };
  } catch (err) {
    console.log('delete image err', err);
    return { error: true, title: 'Image deletion failed', description: 'Please try again' };
  }
}