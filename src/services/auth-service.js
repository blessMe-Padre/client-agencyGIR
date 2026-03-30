import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

export async function registerUserService(userData) {
    const url = new URL("/api/auth/local/register", baseUrl);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...userData }),
        });

        return response.json();
    } catch (error) {
        console.error("Registration Service Error:", error);
    }
}

export async function loginUserService(userData) {
    const url = new URL("/api/auth/local", baseUrl);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
        });

        return response.json();
    } catch (error) {
        console.error("Login Service Error:", error);
        throw error;
    }
}