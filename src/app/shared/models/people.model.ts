export interface Person {
    firstName: string;
    lastName: string;
    imgSrc: string;
}


interface PersonName {
    title: string;
    first: string;
    last: string;
};

interface PersonPicture {
    large: string;
    medium: string;
    thumbnail: string;
}

interface PersonInfo {
    seed: string;
    results: number;
    page: number;
    version: string;
}

interface AnyDict {
    [key: string]: any;
}

interface PersonResult extends AnyDict {
    name: PersonName;
    picture: PersonPicture;
}

export interface PersonResponse {
    results: PersonResult[],
    info: PersonInfo,
}

export const mockResponse: PersonResponse = {
    results: [
        {
            name: {
                title: "Miss",
                first: "Emily",
                last: "Smith"
            },
            picture: {
                large: "https://randomuser.me/api/portraits/women/74.jpg",
                medium: "https://randomuser.me/api/portraits/med/women/74.jpg",
                thumbnail: "https://randomuser.me/api/portraits/thumb/women/74.jpg"
            }
        }
    ],
    info: {
        seed: "288bfb421c14e8cd",
        results: 1,
        page: 1,
        version: "1.4"
    }
};