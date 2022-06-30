import { CombinedError } from "urql";
import { TMDb_STORAGE_URL } from "../constantes";

export const tmdbImage = (link: string) => `${TMDb_STORAGE_URL}${link}`

/**
 * Check is the error is not auth error
 * @param error 
 * @returns 
 */
export const isAuthError = (error:CombinedError): boolean => error?.message?.includes("Not authenticated")