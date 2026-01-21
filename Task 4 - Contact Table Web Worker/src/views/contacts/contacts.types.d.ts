interface IContactColumn {
  id: string
  label: string
}

interface IContactCell {
  colId: string
  value: string
}

interface IContactRow {
  id: string
  cells: IContactCell[]
}
