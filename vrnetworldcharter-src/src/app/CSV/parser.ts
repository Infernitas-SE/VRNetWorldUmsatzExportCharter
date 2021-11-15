import { CSVIndexedRow, MapStringToCSV, AddToCSVRow } from ".";

export default class CSVParser {
    private rows: string[] = [];
    private data: CSVIndexedRow[] = [];

    private SplitOnLineBreaks(content: string) {
        this.rows = content.split(/\r\n/g);
    }

    public Load(content: any) {
        if(content === undefined || content === "") {
            alert("Datei ist leer, oder Format ist nicht kompatibel!");
        }
        this.SplitOnLineBreaks(content);
    }

    public Dump() {
        console.log(this.data.map(r => r));
    }

    public Parse() {
        this.rows.forEach(r => {
            var row = MapStringToCSV(r);
            this.data = AddToCSVRow(this.data, row);
        });
    }

    public CutHeader() {
        this.data.splice(0, 1);
    }
}