// idb.ts

const dbName = "myDatabase";
const storeName = "myStore";

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onerror = () => reject("Error opening IndexedDB.");
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName);
            }
        };
    });
};

export const putData = async (key: string, value: any) => {
    const db = await openDB();
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    store.put(value, key);
};

export const getData = async (key: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const db = await openDB();
        const transaction = db.transaction(storeName);
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error fetching data.");
    });
};


export const deleteData = async (key: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        const db = await openDB();
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);

        request.onsuccess = () => resolve();
        request.onerror = () => reject("Error deleting data.");
    });
};