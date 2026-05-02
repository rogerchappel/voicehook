export class VoicehookError extends Error {
  constructor(message: string, readonly code = 'VOICEHOOK_ERROR') {
    super(message);
    this.name = 'VoicehookError';
  }
}

export class ConfigError extends VoicehookError {
  constructor(message: string) {
    super(message, 'CONFIG_ERROR');
    this.name = 'ConfigError';
  }
}

export class TranscriptError extends VoicehookError {
  constructor(message: string) {
    super(message, 'TRANSCRIPT_ERROR');
    this.name = 'TranscriptError';
  }
}
