import ColorTableView from './ColorTableView'
export function addColorTableToDropdown({
  dropdownView,
  colors,
  columns,
  removeButtonLabel,
  documentColorsLabel,
  documentColorsCount
}) {
  const locale = dropdownView.locale
  const colorTableView = new ColorTableView(locale, {
    colors,
    columns,
    removeButtonLabel,
    documentColorsLabel,
    documentColorsCount
  })

  dropdownView.colorTableView = colorTableView
  dropdownView.panelView.children.add(colorTableView)

  colorTableView.delegate('execute').to(dropdownView, 'execute')

  return colorTableView
}
