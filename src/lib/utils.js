import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getCookies(name) {
  try {
    const cookie = decodeURIComponent(document.cookie);
    const parts = cookie.split('; ').find(row => row.startsWith(`${name}=`)).split('=')[1];
    if (parts) {
      return JSON.parse(parts);
    }
    return {
      "name":"alien",
      "email":"alien@civitas.ukrida.ac.id",
      "prodi":"Pengetahuan Galaxy",
      "role":"admin",
      "password":"ureserve2025"
    };
  }
  catch (error) {
    return null;
  }
}