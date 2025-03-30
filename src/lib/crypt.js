export function encrypt(array) {
    array = array.map((item) => {
        if (typeof item === "string") {
            return item.charCodeAt(0);
        }
        return item;
    });

    let value = array.join('');
    value = BigInt(value);
    value = value**5394297n % 1847953n;
    return value.toString();
}

export function decrypt(value) {
    try {
        value = BigInt(value);
        value = value**1064673n % 1847953n;
    value = value.toString();
    return String.fromCharCode(value.split('44')[0]);
    }
    catch (error) {
        return null;
    }
}