// Helper to render rich text
export function renderRichText(content) {
  if (!content) return null;

  if (Array.isArray(content)) {
    return content.map((item, index) => {
      if (item.type === "paragraph") {
        const text = item.children?.map((child) => child.text).join(" ");
        return <p key={index}>{text}</p>;
      }
      return null;
    });
  }
  return <p>{content}</p>;
}

export const backendBaseUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

export const getStrapiURL = (url) => {
  console.log(url, backendBaseUrl);

  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const path = url.startsWith("/") ? url : `/${url}`;
  return `${backendBaseUrl}${path}`;
};

export function getStrapiMedia(url) {
  if (url == null) {
    return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${process.env.NEXT_PUBLIC_MEDIA_API_URL ||
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    "http://localhost:1337"
    }${url}`;
}
