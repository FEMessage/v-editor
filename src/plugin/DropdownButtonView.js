import DropdownButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/dropdownbuttonview'
import IconView from '@ckeditor/ckeditor5-ui/src/icon/iconview'
import dropdownArrowIcon from '../assets/dropdown-arrow.svg'

export default class DropdownButtonViewCustom extends DropdownButtonView {
  _createArrowView() {
    const arrowView = new IconView()

    arrowView.content = dropdownArrowIcon

    arrowView.extendTemplate({
      attributes: {
        class: 'ck-dropdown__arrow'
      }
    })

    return arrowView
  }
}
