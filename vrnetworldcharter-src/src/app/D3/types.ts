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

export interface D3PieConfig extends D3Config
{
    radius: number;
}