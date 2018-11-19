import { observable, action } from 'mobx'
import { MarkdownFile } from '../lib/types'

export class CurrentFileStore {
  @observable public file: MarkdownFile | undefined

  constructor () {
    this.file = undefined
  }

  @action setCurrentFile = (file: MarkdownFile) => {
    this.file = file
  }

  @action setEmpty = () => {
    this.file = undefined
  }
}
