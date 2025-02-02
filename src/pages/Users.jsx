import { useTranslation } from "react-i18next";
import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";

function NewUsers() {
  const { t } = useTranslation();
  return (
    <>
      <Heading as="h2">{t("Create a new user")}</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
