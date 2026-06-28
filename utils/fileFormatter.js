const getUrlExtension = (url) => {
  return url.split(/[#?]/)[0].split(".").pop().trim();
};

const getFilename = (url) => {
  return url.split("/").pop();
};

export const imageUrlToFile = async (imgUrl) => {
  if (!imgUrl) return null;

  try {
    const response = await fetch(imgUrl);

    if (!response.ok) {
      throw new Error("Image fetch failed");
    }

    const blob = await response.blob();

    return new File([blob], getFilename(imgUrl), {
      type: blob.type,
    });
  } catch (err) {
    console.error("imageUrlToFile error:", err);
    return null;
  }
};
