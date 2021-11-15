export interface D3Data {
    name: string;
    value: number;
}

export interface D3Config {
    data: D3Data[];
    margin: number;
    width: number;
    height: number;
    htmlSelector: string;
}