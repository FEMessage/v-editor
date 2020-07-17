import ColorTableView from '@ckeditor/ckeditor5-font/src/ui/colortableview'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'

import removeButtonIcon from '../../assets/eraser.svg'

export default class ColorTableViewCustom extends ColorTableView {
  _removeColorButton() {
    const buttonView = new ButtonView()

    buttonView.set({
      withText: true,
      icon: removeButtonIcon,
      tooltip: true,
      label: this.removeButtonLabel
    })

    buttonView.class = 'ck-color-table__remove-color'
    buttonView.on('execute', () => {
      this.fire('execute', {value: null})
    })

    return buttonView
  }
}
