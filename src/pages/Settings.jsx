import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getSettings } from "../services/apiSettings";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import { useTranslation } from "react-i18next";

function Settings() {
  const { t } = useTranslation();

  useEffect(function () {
    getSettings().then((data) => console.log(data));
  }, []);
  return (
    <Row>
      <Heading as="h2">{t("Update hotel settings")}</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
