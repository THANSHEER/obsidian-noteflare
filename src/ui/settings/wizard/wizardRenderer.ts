import type { NoteFlareSettingsTab } from '../settingsTab';
import { renderStepGitHub } from './stepGitHub';
import { renderStepHosting } from './stepHosting';
import { renderStepBackup } from './stepBackup';
import { renderStepDone } from './stepDone';
import { SetupStep } from '../../../core/types';

export function renderWizard(tab: NoteFlareSettingsTab, el: HTMLElement): void {
  renderWizardSteps(tab, el);
  if (tab.wizardStep === 'github') renderStepGitHub(tab, el);
  else if (tab.wizardStep === 'hosting') renderStepHosting(tab, el);
  else if (tab.wizardStep === 'backup') renderStepBackup(tab, el);
  else renderStepDone(tab, el);
}

function renderWizardSteps(tab: NoteFlareSettingsTab, el: HTMLElement): void {
    const steps: Array<{ key: SetupStep; label: string }> = [
      { key: 'github', label: 'GitHub' },
      { key: 'hosting', label: 'Hosting' },
      { key: 'backup', label: 'Backup' },
      { key: 'done', label: 'Done' },
    ];
    const order = steps.map((s) => s.key);
    const currentIdx = order.indexOf(tab.wizardStep);

    const wrapper = el.createDiv('nf-wizard-steps');
    steps.forEach(({ label }, i) => {
      const dot = wrapper.createDiv('nf-step-dot');
      if (i < currentIdx) dot.addClass('completed');
      else if (i === currentIdx) dot.addClass('active');
      const labelEl = dot.createSpan('nf-step-label');
      labelEl.setText(label);
    });
}
