const getFilename = (value) => {
  try {
    const url = new URL(value);
    return url.pathname.split("/").pop() || "file";
  } catch {
    return value.split("/").pop() || "file";
  }
};

const getStorageFileUrl = (value) => {
  if (!value) return "";

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_STORAGE_BASE_URL is not set");
  }

  return new URL(
    value.replace(/^\/+/, ""),
    `${baseUrl.replace(/\/+$/, "")}/`,
  ).toString();
};

export const imageUrlToFile = async (imgUrl) => {
  if (!imgUrl) return null;

  try {
    const response = await fetch(getStorageFileUrl(imgUrl), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Image fetch failed: ${response.status}`);
    }

    const blob = await response.blob();

    return new File([blob], getFilename(imgUrl), {
      type: blob.type || "application/octet-stream",
    });
  } catch (err) {
    console.error("imageUrlToFile error:", err);
    return null;
  }
};
