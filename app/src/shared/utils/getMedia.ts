import { MEDIA_BASE_URL } from 'shared/const';

export function getMedia(id?: number) {
  return id !== undefined && id !== null ? `${MEDIA_BASE_URL}/${id}.jpg` : null;
}
