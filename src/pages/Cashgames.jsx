import CashgameList from "../components/CashgameList";
import { useTranslation } from "react-i18next";

export default function Cashgames() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="m-2 text-lg font-semibold"> {t("cashgames")}: </h1>
      <CashgameList />
    </>
  )
}