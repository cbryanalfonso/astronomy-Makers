// Generated by https://quicktype.io

export interface AstronomyAPI {
    next:    Next;
    previus: Previus;
    results: Result[];
}

export interface Next {
    next: string;
}

export interface Previus {
    previus: string;
}

export interface Result {
    id:          number;
    explanation: string;
    hdurl:       string;
    title:       string;
    url:         string;
}


// Generated by https://quicktype.io

export interface BusquedaAPI {
    id:          number;
    explanation: string;
    hdurl:       string;
    title:       string;
    url:         string;
}
