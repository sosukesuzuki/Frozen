  import { observable, action } from 'mobx'

  export interface MarkdownFile {
    title: string
    content: string
    id: string
  }

  export class MarkdownFilesStore {
    @observable public files: MarkdownFile[]

    constructor (files: MarkdownFile[]) {
      this.files = files
    }

    @action addFile (file: MarkdownFile) {
      this.files = this.files.concat(file)
    }

    @action removeFile ({ id }: MarkdownFile) {
      this.files = this.files.filter(file => file.id !== id)
    }
  }
