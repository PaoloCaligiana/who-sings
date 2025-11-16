import { useLang } from "../i18n/LangContext";
import { translate } from "../i18n/dictionary";

export default function LoginScreen() {
  const { lang } = useLang();

  return (
    <h1>{translate("login.title", lang)}</h1>
  );
}
