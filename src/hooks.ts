import type { HookDefinition, VoicehookEvent, HookResult } from './models.js';

export function hookMatches(hook: HookDefinition, event: VoicehookEvent): boolean {
  if (hook.enabled === false) return false;
  if (hook.requireWake !== false && !event.wake) return false;
  const text = hook.match.caseSensitive ? event.commandText : event.commandText.toLocaleLowerCase();
  const value = hook.match.caseSensitive ? hook.match.value : hook.match.value?.toLocaleLowerCase();
  if (hook.match.type === 'always') return true;
  if (!value) return false;
  if (hook.match.type === 'includes') return text.includes(value);
  return new RegExp(hook.match.value ?? '', hook.match.caseSensitive ? '' : 'i').test(event.commandText);
}

export function matchingHooks(hooks: HookDefinition[], event: VoicehookEvent): HookDefinition[] {
  return hooks.filter((hook) => hookMatches(hook, event));
}

export function renderHook(hook: HookDefinition, event: VoicehookEvent): HookResult {
  const template = hook.template ?? defaultTemplate(hook.action);
  const rendered = template.replace(/{{\s*(\w+)\s*}}/g, (_, token: string) => replacementFor(token, event));
  return { hookId: hook.id, action: hook.action, ...(hook.targetPath ? { targetPath: hook.targetPath } : {}), rendered };
}

function defaultTemplate(action: string): string {
  if (action === 'emit-json') return '{{json}}';
  return '- [ ] {{commandText}}\n  - heard: {{timestamp}}\n  - source: {{transcriptId}}\n';
}

function replacementFor(token: string, event: VoicehookEvent): string {
  switch (token) {
    case 'id': return event.id;
    case 'timestamp': return event.timestamp;
    case 'commandText': return event.commandText;
    case 'transcriptText': return event.transcript.text;
    case 'transcriptId': return event.transcript.id;
    case 'wakePhrase': return event.wake?.phrase ?? '';
    case 'json': return JSON.stringify(event);
    default: return '';
  }
}
