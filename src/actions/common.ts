"use server";

import ImageKit from "imagekit"

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function shareAction(formData: FormData, settings: { type: 'original' | 'wide' | 'square'; sensitive: boolean }) {
  const desc = formData.get("desc") as string;
  const file = formData.get("file") as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const transformation = `w-600 ${settings.type === "square" ? "ar-1-1" : settings.type === "wide" ? "ar-16-9" : ""}`

  imagekit.upload(
    {
      file: buffer,
      fileName: file.name,
      folder: "/posts",
      transformation: {
        pre: transformation
      },
      customMetadata: {
        sensitive: settings.sensitive
      }
    },
    function (error, result) {
      if (error) console.log(error);
      else console.log(result);
    }
  );

  console.log(desc, file);
}
