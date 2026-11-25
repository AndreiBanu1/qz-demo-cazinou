import { useLocation } from "react-router-dom";
import { pageFor, type Lang } from "@/config/pages";

/** The language of the current route. The 404 page is Romanian with English below it. */
export const useLang = (): Lang => pageFor(useLocation().pathname).lang;

export const usePage = () => pageFor(useLocation().pathname);
