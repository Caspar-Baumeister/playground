let statusString = function (value: number) {
  if (value === 0) return "Zu prüfen";
  if (value === 1) return "Wird verkauft";
  if (value === 2) return "Eingereicht";
  if (value === 3) return "Abgeschlossen";
};

export default statusString;
