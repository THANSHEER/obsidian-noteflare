// A simple mock for Obsidian API to allow tests to run without the actual environment
export class App {
  vault = {
    getFiles: jest.fn(() => [] as TFile[]),
    getAbstractFileByPath: jest.fn(() => null as any),
    read: jest.fn(async () => ''),
    readBinary: jest.fn(async () => new ArrayBuffer(0)),
    getName: jest.fn(() => 'Mock Vault'),
    configDir: '.obsidian',
  };
  metadataCache = {
    getCache: jest.fn(() => null as any),
    getFirstLinkpathDest: jest.fn(() => null as any),
  };
  workspace = {
    getLeavesOfType: jest.fn(() => []),
    getRightLeaf: jest.fn(),
    getLeftLeaf: jest.fn(),
    getLeaf: jest.fn(),
    revealLeaf: jest.fn(),
    on: jest.fn(),
  };
}
export class Plugin {
  constructor(public app: App, public manifest: any) {}
  loadData = jest.fn(async () => ({}));
  saveData = jest.fn(async () => {});
  addStatusBarItem = jest.fn(() => ({
    createEl: jest.fn(() => ({
      setCssStyles: jest.fn(),
      setText: jest.fn(),
    })),
  }));
  addRibbonIcon = jest.fn(() => ({
    setAttribute: jest.fn(),
  }));
  addCommand = jest.fn();
  addSettingTab = jest.fn();
  registerView = jest.fn();
  registerEvent = jest.fn();
  register = jest.fn();
  registerInterval = jest.fn();
}
export class PluginSettingTab {
  constructor(public app: App, public plugin: Plugin) {}
}
export class Modal {
  titleEl = { setText: jest.fn() };
  contentEl = {
    empty: jest.fn(),
    createEl: jest.fn(() => ({
      setCssStyles: jest.fn(),
      addEventListener: jest.fn(),
      createEl: jest.fn(() => ({})),
      hide: jest.fn(),
      show: jest.fn(),
      setText: jest.fn(),
    })),
    createDiv: jest.fn(() => ({
      empty: jest.fn(),
      setCssStyles: jest.fn(),
      createEl: jest.fn(() => ({})),
      createDiv: jest.fn(() => ({})),
    })),
  };
  constructor(public app: App) {}
  open() {}
  close() {}
}
export class Notice {
  constructor(public message: string, public duration?: number) {}
}

export class FuzzySuggestModal<T> extends Modal {
  _value?: T;
  setPlaceholder = jest.fn();
}

export class ItemView {
  containerEl = {
    children: [
      null,
      {
        empty: jest.fn(),
        addClass: jest.fn(),
        createEl: jest.fn(() => ({
          setCssStyles: jest.fn(),
          addEventListener: jest.fn(),
        })),
        createDiv: jest.fn(() => ({
          empty: jest.fn(),
          setCssStyles: jest.fn(),
          createEl: jest.fn(() => ({})),
          createDiv: jest.fn(() => ({})),
        })),
      }
    ]
  };
  constructor(public leaf: any) {}
}
export class WorkspaceLeaf {}

export class Setting {
  nameEl: any = { setText: jest.fn() };
  descEl: any = { setText: jest.fn() };
  settingEl: any = { setCssStyles: jest.fn() };
  infoEl: any = { setCssStyles: jest.fn() };
  controlEl: any = { setCssStyles: jest.fn() };
  constructor(public containerEl: any) {}
  setName = jest.fn().mockReturnThis();
  setDesc = jest.fn().mockReturnThis();
  setHeading = jest.fn().mockReturnThis();
  addText = jest.fn().mockReturnThis();
  addButton = jest.fn().mockReturnThis();
  addDropdown = jest.fn().mockReturnThis();
  addToggle = jest.fn().mockReturnThis();
}

export class TAbstractFile {
  path: string = '';
  name: string = '';
}
export class TFile extends TAbstractFile {
  extension: string = '';
  basename: string = '';
}
export class TFolder extends TAbstractFile {}

export const requestUrl = jest.fn();
export const normalizePath = (path: string) => path;
export const setIcon = jest.fn();

export const parseYaml = (yaml: string) => {
  if (!yaml || !yaml.trim()) return {};
  return {};
};
export const stringifyYaml = (obj: object) => {
  return Object.entries(obj).map(([k, v]) => `${k}: ${String(v)}`).join('\n');
};

