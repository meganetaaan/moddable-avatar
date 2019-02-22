declare class Preference {
  set(domain: string, key: string, value: PreferenceValue): void;
  get(domain: string, key: string): PreferenceValue;
  delete(domain: string, key: string): void;
  keys(domain: string): string[];
}
type PreferenceValue = string | number | boolean | ArrayBuffer;
export = Preference;
