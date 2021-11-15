import { CSVIndexedRow, SplittedCSVIndexedArray } from '.'

export function SplitArray(base: CSVIndexedRow[], range: number): any {
  var left = base.length % range // Anteil der Übrig bleibt
  var hLength = base.length - left // range passt hier ohne Rest hinein
  var parts = hLength / range // Soviele Teile müssen später entstehen
  var count = 0 // First Array Count
  var out: SplittedCSVIndexedArray[] = []
  var buffer: any = []

  // Für alle ! vollen ! durchläufe dass Array befüllen
  for (let arrItr = 0; arrItr <= parts - 1; arrItr++) {
    var indexStart = 0
    var indexEnd = 0
    if (count === 0) {
      indexStart = 0
      indexEnd = range
    } else {
      indexStart = range * count + 1
      indexEnd = range * (count + 1)
    }
    count++
    for (let itr = indexStart; itr <= indexEnd; itr++) {
      buffer.push(base[itr])
    }
    out.push(new SplittedCSVIndexedArray(`${indexStart}-${indexEnd}`, buffer))
    buffer = []
  }

  // Rest
  buffer = []
  for (let itr = hLength + 1; itr <= base.length; itr++) {
    buffer.push(base[itr])
  }
  out.push(new SplittedCSVIndexedArray(`${hLength + 1}-${base.length}`, buffer))
  buffer = []

  return out
}
