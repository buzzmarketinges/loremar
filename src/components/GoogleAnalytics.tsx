"use client";

import { useEffect } from "react";
import { COOKIE_CONSENT_KEY } from "./CookieBanner";

const GA_ID = "G-C4KD3QYF3D";

function loadGA() {
    if (document.getElementById("ga-script")) return;

    const script = document.createElement("script");
    script.id = "ga-script";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
        gtag("js", new Date());
        gtag("config", GA_ID, { anonymize_ip: true });
        (window as any).gtag = gtag;
    };
}

function checkAndLoad() {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === "all") loadGA();
}

export default function GoogleAnalytics() {
    useEffect(() => {
        checkAndLoad();
        window.addEventListener("cookie_consent_updated", checkAndLoad);
        return () => window.removeEventListener("cookie_consent_updated", checkAndLoad);
    }, []);

    return null;
}
