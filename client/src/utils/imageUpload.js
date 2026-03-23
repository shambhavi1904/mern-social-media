export const checkImage = (file) => {
  let err = "";

  if (!file) return (err = "File does not exist.");

  if (file.size > 1024 * 1024) {
    return (err = "File size must be less than 1 Mb.");
  }

  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    return (err = "Image must be jpeg or png.");
  }

  return err;
};

export const imageUpload = async (images) => {
  let imgArr = [];

  for (const item of images) {
    const formData = new FormData();

    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }

    // ✅ YOUR DETAILS
    formData.append("upload_preset", "mern_app"); // your preset
    formData.append("cloud_name", "dfzw5ifoq");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dfzw5ifoq/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.secure_url) {
      console.error("Upload failed:", data);
      continue;
    }

    imgArr.push({
      public_id: data.public_id,
      url: data.secure_url,
    });
  }

  return imgArr;
};