import { environment } from '../../environments/environment';

/**
 * Builds a full URL from a relative path or returns the URL as-is if it's already absolute
 * @param path - The path to convert (can be relative or absolute URL)
 * @returns Full URL string
 */
export function getApiUrl(path: string | null | undefined): string {
    if (!path) {
        return '';
    }

    // If it's already a full URL (starts with http:// or https://), return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Otherwise, prepend the API base URL
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${environment.apiUrl}${normalizedPath}`;
}

/**
 * Gets the image URL from an array of images or a single image path
 * @param images - Array of image paths, single image path, or null/undefined
 * @param placeholder - Optional placeholder image path (default: 'assets/images/placeholder.png')
 * @returns Full image URL or placeholder
 */
export function getImageUrl(
    images: any[] | string | undefined | null,
    placeholder: string = 'assets/images/placeholder.png'
): string {
    const firstImage = Array.isArray(images) ? images[0] : images;

    if (firstImage && typeof firstImage === 'string') {
        return getApiUrl(firstImage);
    }

    return placeholder;
}
