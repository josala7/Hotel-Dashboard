import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // Connects i18n with React
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to our website",
          language_switch: "Switch to Arabic",
          home: "Home",
          dashboard: "dashboard",
          bookings: "Bookings",
          cabins: "Cabins",
          users: "Users",
          settings: "Settings",
          account: "Account",
          Cabin: "Cabin",
          Guest: "Guest",
          Dates: "Dates",
          Status: "Status",
          Amount: "Amount",
        },
      },
      ar: {
        translation: {
          welcome: "مرحبًا بك في موقعنا",
          home: "الصفحة الرئيسية",
          language_switch: "التبديل إلى الإنجليزية",
          dashboard: "لوحة التحكم",
          bookings: "الحجوزات",
          cabins: "الأكواخ",
          users: "المستخدمون",
          settings: "الإعدادات",
          account: "الحساب",
          Cabin: "الكابينة",
          Guest: "الضيف",
          Dates: "التواريخ",
          Status: "الحالة",
          Amount: "المبلغ",
        },
      },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if the chosen language is unavailable
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    detection: {
      // Automatically detect and use the browser's preferred language
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"], // Cache the chosen language
    },
  });

export default i18n;
