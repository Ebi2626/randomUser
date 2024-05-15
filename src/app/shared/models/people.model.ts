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