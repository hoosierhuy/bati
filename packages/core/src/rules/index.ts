import { RulesMessage } from "./enum";
import rules from "./rules";
import { prepare, type FeaturesOrNamespaces } from "./utils";

export { rules, RulesMessage };

export function execRules<T>(fts: FeaturesOrNamespaces[], rulesMessages: Record<RulesMessage, T>) {
  const sfts = prepare(fts);
  const messages: T[] = [];

  for (const rule of rules) {
    const result = rule(sfts);
    if (typeof result === "number") {
      if (result in rulesMessages) {
        messages.push(rulesMessages[result]);
      } else {
        console.warn("No handler defined for rule", result);
      }
    }
  }

  return messages;
}
