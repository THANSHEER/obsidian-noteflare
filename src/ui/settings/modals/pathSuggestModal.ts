import { App, FuzzySuggestModal, TAbstractFile, TFile, TFolder } from 'obsidian';

export class PathSuggestModal extends FuzzySuggestModal<TAbstractFile> {
  constructor(app: App, private onChoose: (path: string) => void) {
    super(app);
    this.setPlaceholder('Search for a file or folder...');
  }
  
  getItems(): TAbstractFile[] {
    return this.app.vault.getAllLoadedFiles().filter(f => 
      f.path !== '/' && 
      !f.path.startsWith('.') &&
      !f.path.includes('/.') &&
      (f instanceof TFolder || (f instanceof TFile && f.extension === 'md'))
    );
  }
  
  getItemText(item: TAbstractFile): string {
    return item.path;
  }
  
  onChooseItem(item: TAbstractFile, _evt: MouseEvent | KeyboardEvent): void {
    this.onChoose(item.path);
  }
}
