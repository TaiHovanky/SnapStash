"use server"

import { z } from 'zod';
import db from '../db/connection';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { storeFile } from '@/utils/file-storage';

export async function addImage(prevState: any, formData: FormData) {
  const schema = z.object({
    fileAttachment: z.any(),
  })
  const data = schema.parse({
    fileAttachment: formData.get('fileAttachment')
  });

  try {
    const file: File = data.fileAttachment as File;

    if (!file) {
      return { message: "No file was uploaded" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileId = uuidv4();

    await db('image').insert({
      image_id: fileId,
      file_name: file.name
    });
    await storeFile(buffer, fileId);
    return { message: "Saved successfully" };
  } catch (err) {
    console.log('add image err', err);
    return { err };
  }
}

export async function findImages(searchTerm: string) {
  const schema = z.object({
    fileName: z.string(),
  })
  const data = schema.parse({
    fileName: searchTerm
  });

  try {
    return await db('image').select().where('file_name', 'like', `%${data.fileName}%`);
  } catch (err) {
    console.log('find images err', err);
    return { err };
  }
}


export async function deleteImage(imgId: string) {
  try {
    await db('image').del().where('image_id', imgId);
    revalidatePath('/');
    return { message: 'deleted img' }
  } catch (err) {
    console.log('find images err', err);
    return { message: 'failed to delete' };
  }
}