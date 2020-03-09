export async function getJson(url) {
    const req = await window.fetch(url);
    const json = await req.json();
    return json;
}

export function timeout(ms) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });
}