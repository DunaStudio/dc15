import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locale === "en" ? "en" : "es";

  const messages = (await import(`./messages/${validLocale}.json`)).default;

  return {
    locale: validLocale,
    messages,
  };
});
