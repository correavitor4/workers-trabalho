onmessage = e => {
    let data = e.data;
    let hash = createHash(data).then(hash => {
        let returnData = {
            hash: '',
            text: ''
        };
        returnData.hash = hash;
        returnData.text = data;
        postMessage(returnData);
    });
}

async function createHash(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
}